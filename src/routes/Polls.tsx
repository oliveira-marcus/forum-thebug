import { useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import Tabs from "../components/common/Tabs";
import useFeed from "../hooks/useFeed";
import PostList from "../components/common/Post/PostList";

export default function Polls() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [sortBy, setSortBy] = useState<"date" | "upvotes">("date");

  const { loading, error, feed } = useFeed(1, 20, "Polls", sortBy);

  return (
    <main className="lg:col-span-9 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Enquetes</h1>
        <Link
          to="/enquetes/criar"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" />
          Nova Enquete
        </Link>
      </div>

      {!loading && !error && (
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSortBy={setSortBy}
        />
      )}

      <PostList loading={loading} error={error} feed={feed} />

      {feed?.posts.length === 0 ? (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-12 text-center">
          <p className="text-gray-400 text-lg mb-6">
            Nenhuma enquete encontrada.
          </p>
          <Link
            to="/enquetes/criar"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
            Criar Primeira Enquete
          </Link>
        </div>
      ) : (
        <div className="space-y-3"></div>
      )}
    </main>
  );
}
