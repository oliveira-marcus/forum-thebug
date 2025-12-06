import { Plus } from "lucide-react";
import { Link } from "react-router";
import Feed from "../components/feature/Feed";


export default function Polls() {
  return (
    <div className="w-full lg:w-9/12 space-y-4">
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

      <Feed feedType="Polls" />
    </div>
  );
}
