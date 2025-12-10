# 🚀 Como Fazer Deploy na Vercel - Passo a Passo

## Pré-requisito
✅ Código já está no GitHub: https://github.com/alvaro-carlisbino/desafio-flugo

---

## PASSO 1: Acessar Vercel

1. Acesse: https://vercel.com/login
2. Faça login com sua conta do **GitHub**
3. Autorize a Vercel a acessar seus repositórios

---

## PASSO 2: Importar o Projeto

1. No dashboard da Vercel, clique em **"Add New..."** (canto superior direito)
2. Selecione **"Project"**
3. Na lista de repositórios, procure por: **desafio-flugo**
4. Clique em **"Import"** ao lado do repositório

---

## PASSO 3: Configurar o Projeto

A Vercel vai detectar automaticamente que é um projeto Vite:

- ✅ **Framework Preset**: Vite (auto-detectado)
- ✅ **Build Command**: `npm run build` (já configurado)
- ✅ **Output Directory**: `dist` (já configurado)
- ✅ **Install Command**: `npm install` (já configurado)

**NÃO MUDE NADA** nesta etapa, está tudo certo!

---

## PASSO 4: ⚠️ IMPORTANTE - Adicionar Variáveis de Ambiente

Antes de fazer deploy, você **PRECISA** adicionar as variáveis do Firebase:

### 4.1 Clique em "Environment Variables" (ou role a página até essa seção)

### 4.2 Adicione TODAS essas variáveis (uma por uma):

#### Variável 1:
```
Name: VITE_FIREBASE_API_KEY
Value: [Cole o valor do seu .env local]
```

#### Variável 2:
```
Name: VITE_FIREBASE_AUTH_DOMAIN
Value: [Cole o valor do seu .env local]
```

#### Variável 3:
```
Name: VITE_FIREBASE_PROJECT_ID
Value: [Cole o valor do seu .env local]
```

#### Variável 4:
```
Name: VITE_FIREBASE_STORAGE_BUCKET
Value: [Cole o valor do seu .env local]
```

#### Variável 5:
```
Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: [Cole o valor do seu .env local]
```

#### Variável 6:
```
Name: VITE_FIREBASE_APP_ID
Value: [Cole o valor do seu .env local]
```

💡 **Dica**: Abra o arquivo `.env` no seu projeto local e copie os valores

⚠️ **ATENÇÃO**:
- Use **exatamente** esses nomes (com `VITE_` no início)
- Cole apenas o **valor**, sem aspas

---

## PASSO 5: Fazer Deploy

1. Após adicionar TODAS as 6 variáveis, clique em **"Deploy"**
2. Aguarde o build (leva 2-3 minutos)
3. ✅ Quando terminar, aparecerá uma tela de sucesso com confetes! 🎉

---

## PASSO 6: Pegar a URL do Projeto

Depois do deploy bem-sucedido:

1. A Vercel vai mostrar uma URL tipo: `https://desafio-flugo-xxxx.vercel.app`
2. Clique em **"Visit"** para ver o site funcionando
3. Copie essa URL

---

## PASSO 7: Atualizar o README

Atualize o README.md com a URL do deploy:

Mude a linha:
```markdown
- 🚀 **Demo ao vivo**: Em breve (deploy na Vercel)
```

Para:
```markdown
- 🚀 **Demo ao vivo**: [desafio-flugo.vercel.app](https://desafio-flugo-xxxx.vercel.app)
```

Depois:
```bash
git add README.md
git commit -m "docs: adicionar link do deploy na Vercel"
git push
```

---

## ✅ CHECKLIST FINAL

Verifique se tudo está funcionando:

- [ ] Site abrindo na URL da Vercel
- [ ] Consegue criar um colaborador
- [ ] Dados aparecem na lista
- [ ] Consegue editar um colaborador
- [ ] Consegue deletar um colaborador
- [ ] Dados persistem ao recarregar a página

Se alguma funcionalidade NÃO funcionar:
1. Vá na Vercel → Seu projeto → Settings → Environment Variables
2. Verifique se TODAS as 6 variáveis estão lá
3. Se faltou alguma, adicione e faça Redeploy

---

## 🎯 INFORMAÇÕES PARA ENVIAR À EMPRESA

Após completar o deploy, envie este email:

```
Assunto: Entrega do Desafio Técnico - Álvaro Carlisbino

Olá,

Segue a entrega do desafio técnico de Sistema de Gerenciamento de Colaboradores:

🔗 Repositório GitHub (público):
https://github.com/alvaro-carlisbino/desafio-flugo

🌐 Aplicação em produção (Vercel):
https://desafio-flugo-xxxx.vercel.app

📚 Documentação completa:
O README.md do repositório contém todas as instruções de instalação,
configuração e execução local do projeto.

🛠️ Stack Tecnológica:
- React 18 + TypeScript
- Material-UI (MUI) - todos os componentes
- Firebase Firestore - persistência de dados
- Arquitetura MVVM
- Vite + ESBuild

✨ Funcionalidades:
- CRUD completo de colaboradores
- Formulário multi-etapa com validações em tempo real
- Todos os campos obrigatórios com feedback visual
- Interface responsiva seguindo Material Design Guidelines
- Persistência em tempo real no Firebase Firestore

Atenciosamente,
Álvaro Carlisbino

LinkedIn: https://www.linkedin.com/in/alvaro-carlisbino/
Portfolio: https://alvaro-carlisbino.vercel.app/
```

---

## 📞 Precisa de Ajuda?

Se tiver algum problema:

1. **Deploy falhou**: Vá em "Deployments" → clique no deployment com erro → veja os logs
2. **Página em branco**: Verifique se adicionou TODAS as variáveis de ambiente
3. **Erro do Firebase**: Verifique se as variáveis estão corretas (sem aspas, sem espaços)

---

**Boa sorte! 🚀**
