# Sistema de Gerenciamento de Colaboradores

Sistema completo de gerenciamento de colaboradores desenvolvido com **React**, **TypeScript**, **Material-UI** e **Firebase Firestore**, seguindo o padrão arquitetural **MVVM** (Model-View-ViewModel).

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Material-UI (MUI)** - Biblioteca de componentes React seguindo Material Design
- **@mui/icons-material** - Ícones do Material Design
- **@emotion/react** & **@emotion/styled** - CSS-in-JS para estilização
- **React Router DOM** - Roteamento e navegação

### Backend & Database
- **Firebase Authentication** - Autenticação de usuários com JWT
- **Firebase Firestore** - Banco de dados NoSQL em tempo real
- **Firebase SDK** - Integração com serviços Firebase

### Build & Dev Tools
- **Vite** - Build tool e dev server de alta performance
- **Vitest** - Framework de testes unitários

## 📁 Arquitetura MVVM

O projeto segue rigorosamente o padrão MVVM para separação de responsabilidades:

```
src/
├── components/
│   ├── auth/              # Componentes de autenticação
│   │   └── ProtectedRoute.tsx
│   └── ui/                # Componentes UI (shadcn/ui)
├── config/                # Configurações
│   └── firebase.ts        # Firebase config + Auth
├── contexts/              # React Contexts
│   └── AuthContext.tsx    # Context de autenticação
├── models/                # Modelos de dados e tipos
│   ├── Employee.ts        # Modelo de colaborador
│   └── Department.ts      # Modelo de departamento
├── repositories/          # Camada de acesso a dados
│   ├── EmployeeRepository.ts
│   └── DepartmentRepository.ts
├── viewmodels/            # Lógica de negócio e estado
│   ├── EmployeeViewModel.ts
│   ├── DepartmentViewModel.ts
│   └── FormViewModel.ts
├── views/                 # Componentes React (UI)
│   ├── layouts/           # Layouts da aplicação
│   │   └── MainLayout.tsx
│   └── pages/             # Páginas da aplicação
│       ├── Login.tsx
│       ├── Register.tsx
│       ├── NotFound.tsx
│       ├── EmployeePage.tsx
│       ├── EmployeeList.tsx
│       ├── EmployeeForm.tsx
│       ├── DepartmentPage.tsx
│       ├── DepartmentList.tsx
│       └── DepartmentForm.tsx
├── theme/                 # Configuração do tema
│   └── theme.ts
├── App.tsx                # Componente raiz + rotas
└── main.tsx               # Entry point
```

### Benefícios da Arquitetura MVVM

- **Separação de Responsabilidades**: Cada camada tem um propósito específico
- **Testabilidade**: ViewModels podem ser testados independentemente
- **Reutilização**: Lógica de negócio desacoplada dos componentes visuais
- **Manutenibilidade**: Mudanças em uma camada não afetam outras

## ✨ Funcionalidades

### 🔐 Autenticação
- ✅ **Login** com email e senha (Firebase Authentication)
- ✅ **Cadastro de novos usuários** com validação
- ✅ **Proteção de rotas** privadas com ProtectedRoute
- ✅ **Logout** funcional
- ✅ **Página 404 customizada** para rotas não encontradas
- ✅ **Redirecionamento automático** para login quando não autenticado

### 👥 Gestão de Colaboradores (CRUD Completo)
- ✅ **Criar** colaboradores com formulário multi-etapa
- ✅ **Listar** colaboradores em tabela responsiva
- ✅ **Editar** informações de colaboradores existentes
- ✅ **Deletar** colaboradores individualmente
- ✅ **Exclusão em massa** com seleção múltipla
- ✅ **Filtros de busca** por nome, email e departamento

### Campos do Colaborador
- Nome completo
- E-mail corporativo
- Departamento
- Status (Ativo/Inativo)
- **Cargo** (ex: Desenvolvedor Frontend)
- **Data de admissão**
- **Nível hierárquico** (Júnior, Pleno, Sênior, Gestor)
- **Gestor responsável** (outro colaborador com nível gestor)
- **Salário base**

### 🏢 Gestão de Departamentos (CRUD Completo)
- ✅ **Criar** departamentos
- ✅ **Listar** departamentos
- ✅ **Editar** departamentos
- ✅ **Deletar** departamentos
- ✅ **Adicionar/remover** colaboradores do departamento
- ✅ **Transferir** colaboradores entre departamentos
- ✅ **Validação**: colaborador não pode ficar sem departamento

### 🎨 Interface
- Design moderno seguindo Material Design Guidelines
- Formulário multi-etapa com Stepper visual
- Progress bar em tempo real
- Feedback de estado com Chips coloridos
- Avatares com iniciais dos colaboradores
- **Menu lateral** com navegação entre páginas
- **Indicação visual** da rota ativa
- **Interface totalmente responsiva** (desktop, tablet, mobile)
- **Filtros de busca** com feedback instantâneo
- **Seleção múltipla** com checkboxes

### 🔄 Validações
- Validação de campos em tempo real
- Validação de email (formato válido)
- Validação de nome (mínimo 3 caracteres)
- Validação de senha (mínimo 6 caracteres)
- Confirmação de senha no cadastro
- Campos obrigatórios com feedback visual
- Mensagens de erro descritivas

## 🛠️ Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- Conta no **Firebase** (gratuita)

## 📦 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/alvaro-carlisbino/desafio-flugo.git
cd desafio-flugo
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto ou use um existente
3. Ative o **Authentication**:
   - No menu lateral, clique em "Authentication"
   - Clique em "Get Started"
   - Ative o método "Email/Password"
4. Ative o **Firestore Database**:
   - No menu lateral, clique em "Firestore Database"
   - Clique em "Criar banco de dados"
   - Escolha o modo de teste (para desenvolvimento)
   - Selecione a localização do servidor
5. Obtenha as credenciais:
   - Vá em **Configurações do Projeto** (ícone de engrenagem)
   - Role até "Seus apps" e clique no ícone web `</>`
   - Copie as configurações do Firebase

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e preencha com suas credenciais do Firebase:

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

⚠️ **Importante**: Nunca commite o arquivo `.env` no Git. Ele já está incluído no `.gitignore`.

### 5. Execute o projeto

#### Modo Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`, `5174` ou `5175`

#### Testes

```bash
npm test              # Roda os testes
npm run test:ui       # Interface visual dos testes
npm run test:coverage # Cobertura de testes
```

#### Build de Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`

#### Preview do Build

```bash
npm run preview
```

## 🗂️ Estrutura de Dados

### Employee Model

```typescript
interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  active: boolean;
  createdAt: string;
  position?: string;           // Cargo
  admissionDate?: string;      // Data de admissão
  hierarchyLevel?: 'junior' | 'pleno' | 'senior' | 'gestor';
  managerId?: string;          // ID do gestor responsável
  baseSalary?: number;         // Salário base
}
```

### Department Model

```typescript
interface Department {
  id: string;
  name: string;
  managerId: string;           // ID do gestor do departamento
  employeeIds: string[];       // IDs dos colaboradores
  createdAt: string;
}
```

### Departamentos Disponíveis

- Design
- TI
- Marketing
- Produto
- Recursos Humanos
- Financeiro
- Vendas
- Operações

### Coleções no Firestore

```
employees/
  ├── {documentId}/
  │   ├── name: "João Silva"
  │   ├── email: "joao@flugo.com"
  │   ├── department: "TI"
  │   ├── active: true
  │   ├── position: "Desenvolvedor Frontend"
  │   ├── hierarchyLevel: "pleno"
  │   ├── managerId: "abc123"
  │   ├── baseSalary: 5000
  │   └── createdAt: "2024-01-15T10:30:00.000Z"

departments/
  ├── {documentId}/
  │   ├── name: "Tecnologia"
  │   ├── managerId: "abc123"
  │   ├── employeeIds: ["emp1", "emp2", "emp3"]
  │   └── createdAt: "2024-01-10T08:00:00.000Z"
```

## 🎨 Tema Material-UI

O projeto utiliza um tema customizado do Material-UI com as seguintes cores:

```typescript
palette: {
  primary: {
    main: '#22C55E',      // Verde (Flugo)
    light: '#4ADE80',
    dark: '#16A34A',
  },
  secondary: {
    main: '#637381',      // Cinza
  },
}
```

## 🧭 Rotas da Aplicação

| Rota | Descrição | Proteção |
|------|-----------|----------|
| `/` | Página inicial (redireciona para `/employees`) | ✅ Protegida |
| `/login` | Tela de login | ❌ Pública |
| `/register` | Tela de cadastro | ❌ Pública |
| `/employees` | Listagem de colaboradores | ✅ Protegida |
| `/departments` | Listagem de departamentos | ✅ Protegida |
| `/404` | Página não encontrada | ❌ Pública |
| `*` | Qualquer rota não definida → 404 | ❌ Pública |

## 📝 Como Usar o Sistema

### Primeiro Acesso

1. Acesse a aplicação
2. Clique em **"Criar conta"** na tela de login
3. Preencha email e senha (mínimo 6 caracteres)
4. Clique em **"Criar Conta"**
5. Você será redirecionado automaticamente para o sistema

### 🚀 Começar a Usar

O sistema está pronto para uso imediato após a configuração do Firebase!

**Conta Admin**: Use `alvaromathe123@gmail.com` para acesso administrativo (já configurada no Firebase).

**Registro de Novos Usuários**: O sistema permite que a equipe da Flugo crie suas próprias contas:
1. Clique em **"Criar conta"** na tela de login
2. Preencha email corporativo e senha (mín. 6 caracteres)
3. Confirme a senha
4. Clique em **"Criar Conta"** 
5. Acesso automático ao sistema após registro

**Dados Iniciais**: ✅ Sistema tem botão automático para popular dados! Veja instruções abaixo.

### 🌱 Popular Dados Automaticamente

**1. Configure Firestore Rules:**
   - Firebase Console → Seu projeto → Firestore Database → Rules
   - Substitua por: `allow read, write: if request.auth != null;`
   - Clique "Publicar"

**2. Popular dados via interface:**
   - Faça login no sistema
   - Quando a lista de colaboradores estiver vazia, aparecerá o botão **"Popular Dados"**
   - Clique no botão e confirme
   - Aguarde a criação automática de 15 colaboradores e 5 departamentos

**3. Dados criados automaticamente:**
   - **5 Gestores**: Alvaro Matheus, Ana Costa, Ricardo Santos, Lucia Ferreira, Pedro Oliveira
   - **10 Colaboradores**: Níveis júnior/pleno/sênior distribuídos nos departamentos
   - **5 Departamentos**: Tecnologia, RH, Marketing, Financeiro, Vendas
   - **Relacionamentos**: Gestores vinculados aos departamentos, colaboradores organizados

### Permissões do Sistema

- **Todos os usuários** podem criar/editar/excluir colaboradores e departamentos
- **Gestores** são apenas uma classificação hierárquica, não limitam acesso
- **Sistema democrático** - qualquer usuário logado tem acesso completo

### Criar um Departamento

1. Vá em **Departamentos** → **Novo Departamento**
2. Preencha o nome do departamento
3. Selecione um **Gestor Responsável** (precisa ter nível "Gestor")
4. Adicione colaboradores à lista (opcional)
5. Clique em **"Criar Departamento"**

### Transferir Colaborador entre Departamentos

**Opção 1 - Pela edição do colaborador:**
1. Vá em **Colaboradores**
2. Clique em **Editar** no colaborador desejado
3. Altere o campo **Departamento**
4. Salve as alterações

**Opção 2 - Pela edição do departamento:**
1. Vá em **Departamentos**
2. Edite o departamento de origem e remova o colaborador
3. Edite o departamento de destino e adicione o colaborador

## 📄 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Cria build otimizado para produção |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm test` | Executa os testes unitários |
| `npm run test:ui` | Interface visual dos testes (Vitest UI) |
| `npm run test:coverage` | Gera relatório de cobertura de testes |

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em "New Project"
4. Importe seu repositório do GitHub
5. Configure as variáveis de ambiente:
   - Vá em "Environment Variables"
   - Adicione todas as variáveis do arquivo `.env`
   - ⚠️ Use as mesmas chaves (`VITE_FIREBASE_API_KEY`, etc)
6. Clique em "Deploy"

A Vercel detectará automaticamente que é um projeto Vite e configurará tudo.

### Outras Plataformas

O projeto também pode ser deployado em:
- **Netlify**
- **Firebase Hosting**
- **Railway**
- **Render**

## 🔒 Segurança

### Variáveis de Ambiente

- ✅ Todas as credenciais do Firebase estão em variáveis de ambiente
- ✅ O arquivo `.env` não é commitado no Git
- ✅ Arquivo `.env.example` serve como template

### Integridade de Dados

- ✅ **Sincronização automática**: Quando um colaborador é excluído, ele é automaticamente removido de todos os departamentos
- ✅ **Validações rigorosas**: Email único por colaborador, nome único por departamento
- ✅ **Transações atômicas**: Operações de exclusão múltipla são executadas de forma segura
- ✅ **Sistema democrático**: Todos os usuários autenticados têm acesso completo (criar/editar/excluir)
- ✅ **Gestores como classificação**: Nível hierárquico não restringe funcionalidades do sistema

### Firestore Rules

**Para desenvolvimento e produção** (sistema democrático - todos os usuários têm acesso completo):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Esta regra permite que **qualquer usuário autenticado** tenha acesso completo a todas as coleções, refletindo o design do sistema onde gestores são apenas classificações hierárquicas.

### Firebase Authentication

- ✅ Autenticação via email/password com JWT
- ✅ Senhas criptografadas pelo Firebase
- ✅ Proteção de rotas no frontend
- ✅ Sessão persistente (logout manual necessário)

## 🧪 Testes

O projeto conta com testes unitários usando **Vitest**:

### Cobertura Atual
- ✅ 27 testes implementados
- ✅ 100% de aprovação nos testes funcionais
- ✅ Testes de ViewModels
- ✅ Testes de Repositories
- ✅ Testes de Componentes

### Executar Testes

```bash
npm test                  # Modo watch
npm test -- --run         # Execução única
npm run test:ui           # Interface visual
npm run test:coverage     # Relatório de cobertura
```

## 🎯 Boas Práticas Implementadas

### Código
- ✅ TypeScript para type safety
- ✅ Interfaces bem definidas
- ✅ Componentização adequada
- ✅ Hooks customizados (ViewModels)
- ✅ Async/Await para operações assíncronas
- ✅ Tratamento de erros
- ✅ Código testado

### Arquitetura
- ✅ Padrão MVVM rigoroso
- ✅ Separação de responsabilidades
- ✅ Repository Pattern para abstração de dados
- ✅ Context API para estado global (auth)
- ✅ Single Responsibility Principle

### UI/UX
- ✅ Material Design Guidelines
- ✅ Feedback visual em todas as ações
- ✅ Loading states
- ✅ Mensagens de erro descritivas
- ✅ Interface responsiva
- ✅ Navegação intuitiva

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.

## 👨‍💻 Desenvolvedor

**Alvaro Carlisbino**

Desenvolvedor Full Stack especializado em React, TypeScript, Flutter e Golang, com foco em arquiteturas escaláveis e soluções modernas.

### 🔗 Links Profissionais

- 💼 [LinkedIn](https://www.linkedin.com/in/alvaro-carlisbino/)
- 🌐 [Portfolio](https://alvaro-carlisbino.vercel.app/)
- 💻 [GitHub](https://github.com/alvaro-carlisbino)

### 📦 Este Projeto

- 🔗 **Repositório**: [github.com/alvaro-carlisbino/desafio-flugo](https://github.com/alvaro-carlisbino/desafio-flugo)
- 🚀 **Demo ao vivo**: [desafio-flugo-one.vercel.app](https://desafio-flugo-one.vercel.app)
- ⚙️ **CI/CD**: Deploy automático via Vercel (integrado com GitHub)

---

Desenvolvido com ❤️ e ☕ para o desafio Flugo

**Dúvidas?** Abra uma [issue](https://github.com/alvaro-carlisbino/desafio-flugo/issues) ou entre em contato pelo [LinkedIn](https://www.linkedin.com/in/alvaro-carlisbino/).
