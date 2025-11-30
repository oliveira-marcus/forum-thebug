import { useState } from "react";
import Tabs from "../components/common/Tabs";
import Post from "../components/common/Post/Post";
import type { PostInfo } from "../types/PostInfo";

const ForumTheBug = () => {
  const [activeTab, setActiveTab] = useState("inicio");

  const posts: PostInfo[] = [
  {
    id: 1,
    userId: 1,
    title: "Prestação de Contas - Novembro 2025",
    content:
      "Relatório financeiro completo do mês de novembro com detalhamento de receitas e despesas...",
    type: "financas",
    upvotes: 45,
    downvotes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: 1,
      firstName: "Diretoria",
      lastName: "The Bug",
      username: "diretoria_bug",
      email: "diretoria@thebug.com",
      createdAt: new Date().toISOString()
    },
    _count: {
      comments: 45
    }
  },
  {
    id: 2,
    userId: 2,
    title: "Proposta: Novo uniforme para o InterBugs 2026",
    content:
      "Gostaria de propor uma discussão sobre o design do próximo uniforme da atlética...",
    type: "propostas",
    upvotes: 32,
    downvotes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: 2,
      firstName: "Caio",
      lastName: "Liboreiro",
      username: "caio_liboreiro",
      email: "caio@example.com",
      createdAt: new Date().toISOString()
    },
    _count: {
      comments: 32
    }
  },
  {
    id: 3,
    userId: 3,
    title: "MatchWeek confirmado para Dezembro!",
    content:
      "Pessoal, saiu a confirmação! O MatchWeek acontecerá nos dias 15 e 16 de dezembro...",
    type: "eventos",
    upvotes: 78,
    downvotes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: 3,
      firstName: "Gabriel",
      lastName: "Macedo",
      username: "gabriel_macedo",
      email: "gabriel@example.com",
      createdAt: new Date().toISOString()
    },
    _count: {
      comments: 78
    }
  },
  {
    id: 4,
    userId: 4,
    title: "Enquete: Horário dos treinos de futsal",
    content:
      "Precisamos definir o melhor horário para os treinos. Votem nas opções abaixo!",
    type: "esportes",
    upvotes: 23,
    downvotes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: 4,
      firstName: "Marcus",
      lastName: "Pinto",
      username: "marcus_pinto",
      email: "marcus@example.com",
      createdAt: new Date().toISOString()
    },
    _count: {
      comments: 23
    }
  }
];

  return (
    <main className="lg:col-span-9 space-y-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="space-y-3">
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </main>
  );
};

export default ForumTheBug;
