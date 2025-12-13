import { getDocs, collection, doc, updateDoc, arrayUnion, arrayRemove, writeBatch } from 'firebase/firestore';
import { db } from '../config/firebase';

export const syncAllEmployeesWithDepartments = async () => {
  try {
    console.log('🔄 Iniciando sincronização de colaboradores com departamentos...');

    const employeesSnapshot = await getDocs(collection(db, 'employees'));
    const departmentsSnapshot = await getDocs(collection(db, 'departments'));

    const employees = employeesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const departments = departmentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    let syncCount = 0;
    let cleanCount = 0;

    console.log('🧹 Limpando IDs órfãos dos departamentos...');
    const batch = writeBatch(db);

    for (const department of departments) {
      const validEmployeeIds: string[] = [];
      const currentIds = department.employeeIds || [];

      for (const empId of currentIds) {
        const employee = employees.find(emp => emp.id === empId);
        
        if (employee && employee.active) {
          validEmployeeIds.push(empId);
        } else {
          console.log(`🗑️  Removendo ID órfão: ${empId} do departamento ${department.name}`);
          cleanCount++;
        }
      }

      const departmentRef = doc(db, 'departments', department.id);
      batch.update(departmentRef, { employeeIds: validEmployeeIds });
    }

    await batch.commit();
    console.log(`✨ ${cleanCount} IDs órfãos removidos`);

    console.log('🔄 Sincronizando colaboradores ativos...');
    for (const employee of employees) {
      if (employee.active && employee.department) {
        const targetDepartment = departments.find(dept => dept.name === employee.department);
        
        if (targetDepartment) {
          const currentIds = targetDepartment.employeeIds || [];
          
          if (!currentIds.includes(employee.id)) {
            const departmentRef = doc(db, 'departments', targetDepartment.id);
            await updateDoc(departmentRef, {
              employeeIds: arrayUnion(employee.id)
            });
            syncCount++;
            console.log(`✅ ${employee.name} adicionado ao departamento ${targetDepartment.name}`);
          }
        }
      }
    }

    console.log(`🎉 Sincronização concluída! ${syncCount} colaboradores sincronizados, ${cleanCount} IDs órfãos removidos.`);
    return { syncCount, cleanCount };
  } catch (error) {
    console.error('❌ Erro na sincronização:', error);
    throw error;
  }
};