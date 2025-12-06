import { useSearchParams } from "react-router";
import usePostSearch from "../hooks/usePostSearch";
import Post from "../components/common/Post/Post";

export default function SearchPost() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const { error, posts, loading } = usePostSearch(query);

  if (loading) {
    return;
  }

  if (error) {
    return (
      <div className="mt-10 text-center text-red-500 text-xl">
        Erro ao buscar posts.
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="mt-10 text-center text-2xl">
        <p>Não foram encontrados Posts!</p>
      </div>
    );
  }

  return (
    <main className="w-full lg:w-9/12 space-y-4">
      <div className="space-y-3">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
