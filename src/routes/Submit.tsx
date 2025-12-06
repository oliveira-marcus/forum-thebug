import PostContentInput from "../components/common/Post/PostContentInput";
import CategorySelect from "../components/common/Post/CategorySelect";
import TextInput from "../components/common/TextInput";
import { useState } from "react";
import { postService } from "../services/post.service";
import { useNavigate } from "react-router";

import type { CreatePostData } from "../types/post.types";

export default function Submit() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const mapCategory = (c?: string) => {
    if (!c) return ("General" as any);
    const key = c.toLowerCase();
    if (key.includes("event")) return ("Events" as any);
    if (key.includes("finance")) return ("Finances" as any);
    if (key.includes("sport")) return ("Sports" as any);
    return ("General" as any);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      alert("O título é obrigatório");
      return;
    }

    const data: CreatePostData = {
      title: title.trim(),
      content: content.trim(),
      category: mapCategory(category),
    };

    try {
      setIsLoading(true);
      const created = await postService.createPost(data);
      // navigate to created post
      navigate(`/${created.id}`);
    } catch (error) {
      console.error("Erro ao criar post", error);
      alert("Erro ao criar post");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="w-full lg:w-9/12 space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Criar Post</h2>
        <CategorySelect value={category} onChange={setCategory} />

        <TextInput
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <PostContentInput value={content} onChange={(e) => setContent(e.target.value)} />

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-2 py-2 rounded-2xl ml-auto
                       bg-blue-600 hover:bg-blue-500 text-white text-sm
                       transition cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Publicando..." : "Postar"}
          </button>
        </div>
      </form>
    </main>
  );
}
