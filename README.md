# Sistema de Gerenciamento de Colaboradores

Sistema completo de gerenciamento de colaboradores desenvolvido com **React**, **TypeScript**, **Material-UI** e **Firebase Firestore**, seguindo o padrão arquitetural **MVVM** (Model-View-ViewModel).

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Material-UI (MUI)** - Biblioteca de componentes React seguindo Material Design
- **@mui/icons-material** - Ícones do Material Design
- **@emotion/react** & **@emotion/styled** - CSS-in-JS para estilização

### Backend & Database
- **Firebase Firestore** - Banco de dados NoSQL em tempo real
- **Firebase SDK** - Integração com serviços Firebase

### Build & Dev Tools
- **Vite** - Build tool e dev server de alta performance
- **ESBuild** - Compilador JavaScript/TypeScript ultra-rápido

## 📁 Arquitetura MVVM

O projeto segue rigorosamente o padrão MVVM para separação de responsabilidades:

```
src/
├── config/              # Configurações (Firebase, etc)
│   └── firebase.ts
├── models/              # Modelos de dados e tipos TypeScript
│   ├── Employee.ts
│   └── initialData.ts
├── repositories/        # Camada de acesso a dados (Firebase)
│   └── EmployeeRepository.ts
├── viewmodels/          # Lógica de negócio e estado
│   ├── EmployeeViewModel.ts
│   └── FormViewModel.ts
├── views/               # Componentes React (UI)
│   ├── layouts/         # Layouts da aplicação
│   │   └── MainLayout.tsx
│   └── pages/           # Páginas da aplicação
│       ├── EmployeeForm.tsx
│       └── EmployeeList.tsx
├── theme/               # Configuração do tema Material-UI
│   └── theme.ts
├── App.tsx              # Componente raiz
└── main.tsx             # Entry point
```

### Benefícios da Arquitetura MVVM

- **Separação de Responsabilidades**: Cada camada tem um propósito específico
- **Testabilidade**: ViewModels podem ser testados independentemente
- **Reutilização**: Lógica de negócio desacoplada dos componentes visuais
- **Manutenibilidade**: Mudanças em uma camada não afetam outras

## ✨ Funcionalidades

### CRUD Completo
- ✅ **Criar** colaboradores com formulário multi-etapa
- ✅ **Listar** colaboradores em tabela responsiva
- ✅ **Editar** informações de colaboradores existentes
- ✅ **Deletar** colaboradores com confirmação

### Validações
- Validação de campos em tempo real
- Validação de email (formato válido)
- Validação de nome (mínimo 3 caracteres)
- Campos obrigatórios com feedback visual
- Mensagens de erro descritivas

### Interface
- Design seguindo Material Design Guidelines
- Formulário multi-etapa com Stepper
- Progress bar visual
- Feedback de estado (Ativo/Inativo) com Chips coloridos
- Avatares com iniciais dos colaboradores
- Interface totalmente responsiva

### Firebase Integration
- Persistência em tempo real no Firestore
- Operações assíncronas com tratamento de erros
- Ordenação por data de criação (mais recentes primeiro)

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
3. Ative o **Firestore Database**:
   - No menu lateral, clique em "Firestore Database"
   - Clique em "Criar banco de dados"
   - Escolha o modo de teste (para desenvolvimento)
   - Selecione a localização do servidor
4. Obtenha as credenciais:
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

O projeto estará disponível em `http://localhost:3000`

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
  id: string;              // ID único gerado pelo Firestore
  name: string;            // Nome completo do colaborador
  email: string;           // E-mail corporativo
  department: string;      // Departamento
  active: boolean;         // Status (ativo/inativo)
  createdAt: string;       // Data de criação (ISO 8601)
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

### Coleção no Firestore

Os dados são armazenados na coleção `employees` com a seguinte estrutura:

```
employees/
  ├── {documentId1}/
  │   ├── name: "João Silva"
  │   ├── email: "joao@flugo.com"
  │   ├── department: "TI"
  │   ├── active: true
  │   └── createdAt: "2024-01-15T10:30:00.000Z"
  ├── {documentId2}/
  │   └── ...
  └── ...
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

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Cria build otimizado para produção |
| `npm run preview` | Visualiza o build de produção localmente |

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

### Firestore Rules

Para produção, configure regras de segurança no Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /employees/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🧪 Validações Implementadas

### Campo Nome
- ✅ Obrigatório
- ✅ Mínimo 3 caracteres
- ✅ Feedback em tempo real

### Campo E-mail
- ✅ Obrigatório
- ✅ Formato válido (regex)
- ✅ Feedback em tempo real

### Campo Departamento
- ✅ Obrigatório
- ✅ Deve selecionar uma opção válida
- ✅ Feedback em tempo real

## 🎯 Boas Práticas Implementadas

### Código
- ✅ TypeScript para type safety
- ✅ Interfaces bem definidas
- ✅ Componentização adequada
- ✅ Hooks customizados (ViewModels)
- ✅ Async/Await para operações assíncronas
- ✅ Tratamento de erros

### Arquitetura
- ✅ Padrão MVVM rigoroso
- ✅ Separação de responsabilidades
- ✅ Repository Pattern para abstração de dados
- ✅ Single Responsibility Principle

### UI/UX
- ✅ Material Design Guidelines
- ✅ Feedback visual em todas as ações
- ✅ Loading states implícitos
- ✅ Mensagens de erro descritivas
- ✅ Interface responsiva

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.

## 👨‍💻 Desenvolvedor

**Alvaro Carlisbino**

Desenvolvedor Full Stack especializado em React, TypeScript e arquiteturas escaláveis.

### 🔗 Links Profissionais

- 💼 [LinkedIn](https://www.linkedin.com/in/alvaro-carlisbino/)
- 🌐 [Portfolio](https://alvaro-carlisbino.vercel.app/)
- 💻 [GitHub](https://github.com/alvaro-carlisbino)

### 📦 Este Projeto

- 🔗 **Repositório**: [github.com/alvaro-carlisbino/desafio-flugo](https://github.com/alvaro-carlisbino/desafio-flugo)
- 🚀 **Demo ao vivo**: Em breve (deploy na Vercel)

---

Desenvolvido com ❤️ e ☕ para o desafio Flugo

**Dúvidas?** Abra uma [issue](https://github.com/alvaro-carlisbino/desafio-flugo/issues) ou entre em contato pelo [LinkedIn](https://www.linkedin.com/in/alvaro-carlisbino/).
