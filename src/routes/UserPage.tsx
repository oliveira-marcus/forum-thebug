import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { User } from "../types/user.types";
import { userService } from "../services/user.service";
import type { PostInfo } from "../types/post.types";
import Post from "../components/common/Post/Post";

export default function UserPage() {
  const [user, setUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<PostInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (!userId) {
      setError("User ID inválido.");
      setIsLoading(false);
      return;
    }

    const userIdParsed = parseInt(userId);

    const fetchData = async () => {
      try {
        const [userData, postsData] = await Promise.all([
          userService.getUserById(userIdParsed),
          userService.getUserPosts(userIdParsed),
        ]);

        setUser(userData ?? null);
        setUserPosts(postsData ?? []);
      } catch (err) {
        setError("Erro ao carregar o usuário.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (isLoading) {
    return <div className="text-center py-6">Carregando...</div>;
  }

  if (error || !user) {
    return (
      <main className="w-full lg:w-9/12 space-y-4">
        <div className="text-center py-6 text-red-400">
          {error ?? "Usuário não encontrado"}
        </div>
      </main>
    );
  }

  return (
    <main className="w-full lg:w-9/12 space-y-4">
      <div className="pl-4">
        <h2 className="text-2xl mb-0 text-gray-200 font-bold">{user.username}</h2>
        <p className="text-gray-300">u/{user.username}</p>
      </div>

      <div className="space-y-3">
        {userPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
