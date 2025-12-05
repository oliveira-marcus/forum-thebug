# Fórum The Bug - Frontend

Interface web do sistema de fórum colaborativo da Atlética The Bug, desenvolvida com React, TypeScript e Tailwind CSS.

## 📋 Sobre o Projeto

O Fórum The Bug é uma plataforma digital colaborativa desenvolvida para a Atlética The Bug do curso de Sistemas de Informação da UFVJM. O frontend oferece uma interface intuitiva e responsiva para discussões, votações, prestação de contas e participação democrática dos membros.

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS 4** - Framework CSS utilitário
- **React Router 7** - Roteamento do lado do cliente
- **Axios** - Cliente HTTP para comunicação com a API
- **Lucide React** - Biblioteca de ícones
- **Vite** - Build tool e servidor de desenvolvimento

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   └── common/          # Componentes compartilhados
│       ├── Comment/     # Componentes de comentários
│       ├── Enquete/     # Componentes de enquetes/polls
│       └── Post/        # Componentes de posts
├── contexts/            # Contextos React (Auth, etc)
├── hooks/               # Custom hooks
├── layouts/             # Layouts de páginas
├── routes/              # Páginas/rotas da aplicação
├── services/            # Serviços de comunicação com API
├── types/               # Definições de tipos TypeScript
└── utils/               # Funções utilitárias
```

## 🎨 Funcionalidades Principais

### Autenticação
- Sistema de login e registro de usuários
- Autenticação via JWT
- Gerenciamento de sessão com Context API

### Discussões
- Criação e visualização de posts por categoria
- Sistema de comentários com respostas aninhadas
- Upvote e downvote em posts e comentários
- Busca de discussões

### Enquetes
- Criação de enquetes com múltiplas opções
- Votação em tempo real
- Visualização de resultados e porcentagens
- Controle de expiração de enquetes

### Categorias
- **Geral** - Discussões gerais
- **Eventos** - Organização de eventos
- **Finanças** - Prestação de contas e transparência
- **Esportes** - Atividades esportivas
- **Enquetes** - Votações e decisões coletivas

### Perfil de Usuário
- Visualização de posts do usuário
- Histórico de participações

## 🔧 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- API Backend rodando (veja [repositório da API](https://github.com/caioliboreiro/TheBugForumAPI.git)

## 💻 Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/forum-thebug-frontend.git
cd forum-thebug-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API em `src/services/api.ts`:
```typescript
const api = axios.create({
  baseURL: "http://localhost:3000/",
```

4. Execute em modo de desenvolvimento:
```bash
npm run dev
```

5. Acesse a aplicação em `http://localhost:5173`

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

Para visualizar o build localmente:
```bash
npm run preview
```

## 🎯 Rotas da Aplicação

| Rota | Descrição | Autenticação |
|------|-----------|--------------|
| `/login` | Página de login | Pública |
| `/register` | Página de registro | Pública |
| `/` | Feed principal (categoria Geral) | Requerida |
| `/posts/criar` | Criação de novo post | Requerida |
| `/posts/:postId` | Visualização de post específico | Requerida |
| `/enquetes` | Lista de enquetes | Requerida |
| `/enquetes/criar` | Criação de nova enquete | Requerida |
| `/financas` | Posts de finanças | Requerida |
| `/esportes` | Posts de esportes | Requerida |
| `/eventos` | Posts de eventos | Requerida |
| `/users/:userId` | Perfil do usuário | Requerida |

## 🔐 Gerenciamento de Autenticação

O sistema utiliza Context API para gerenciar autenticação:

```typescript
const { token, signIn, signOut } = useAuth();
```

O token JWT é armazenado no localStorage e automaticamente incluído nas requisições via interceptor do Axios.

## 📱 Responsividade

A interface é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:
- **Desktop** - Layout com sidebar lateral
- **Tablet** - Layout adaptado com grid responsivo
- **Mobile** - Layout em coluna única com menu compacto

## 🎨 Temas e Estilização

O projeto utiliza Tailwind CSS com paleta de cores personalizada:
- Fundo principal: `bg-black` e `bg-gray-900`
- Destaque: `bg-blue-600` e variações
- Bordas e separadores: `border-gray-800`

## 🔄 Integração com API

Todos os serviços de comunicação com a API estão organizados em `src/services/`:

- `auth.ts` - Autenticação (login/registro)
- `post.service.ts` - Gerenciamento de posts
- `comment.service.ts` - Gerenciamento de comentários
- `poll.service.ts` - Gerenciamento de enquetes
- `user.service.ts` - Gerenciamento de usuários
- `feed.service.ts` - Feed e listagens

## 🐛 Linting

```bash
npm run lint
```

## 👥 Autores

- **Caio Bruno Gonzaga Liboreiro**
- **Gabriel Macedo Santos**
- **Kayky Nery Alcântara Vieira**
- **Marcus Vinícius de Oliveira Pinto**

## 🎓 Instituição

**Universidade Federal dos Vales do Jequitinhonha e Mucuri (UFVJM)**  
Bacharelado em Sistemas de Informação  
Diamantina - MG

## 📄 Licença

Este projeto faz parte do Trabalho de Conclusão de Curso (TCAC) e é destinado exclusivamente para fins acadêmicos.

---

**Atlética The Bug** - UFVJM © 2025
