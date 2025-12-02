import { Home, TrendingUp } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setSortBy?: Dispatch<SetStateAction<"date" | "upvotes">>;
}

export default function Tabs({
  activeTab,
  setActiveTab,
  setSortBy,
}: TabsProps) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-2 flex gap-2">
      <button
        onClick={() => {
          setActiveTab("inicio");
          if (setSortBy) setSortBy("date");
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
          activeTab === "inicio"
            ? "bg-blue-600 text-white"
            : "text-gray-400 hover:text-white hover:bg-gray-800"
        }`}
      >
        <Home className="w-4 h-4" />
        Início
      </button>
      <button
        onClick={() => {
          setActiveTab("populares");
          if (setSortBy) setSortBy("upvotes");
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
          activeTab === "populares"
            ? "bg-blue-600 text-white"
            : "text-gray-400 hover:text-white hover:bg-gray-800"
        }`}
      >
        <TrendingUp className="w-4 h-4" />
        Populares
      </button>
    </div>
  );
}
