import { Search, Menu, LogOut, LucideSearch } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import usePostSearch from "../../hooks/usePostSearch";
import { useState } from "react";

interface HeaderProps {
  heading: string;
  subheading: string;
}

export default function Header({ heading, subheading }: HeaderProps) {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { signOut } = useAuth();

  let navigate = useNavigate();

  const { error, postTitles } = usePostSearch(query);

  function handleSignOut() {
    signOut();
    navigate("/");
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <header className="bg-linear-to-r from-blue-600 to-blue-800 border-b border-blue-700 sticky top-0 z-50">
      <div className="max-w-10xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-blue-700 rounded-lg transition md:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <img
              src="/src/assets/logo_round.png"
              alt="Logo The Bug"
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h1 className="text-2xl font-bold">{heading}</h1>
              <p className="text-blue-200 text-sm">{subheading}</p>
            </div>
          </div>

          <div className="flex flex-1 max-w-[30%] items-center gap-3">
            <div className="flex flex-1 ml-4 sm:flex z-0 relative py-2 rounded-2xl gap-4 bg-[#122B83]">
              <LucideSearch size={24} color="white" className="ml-4" />

              <input
                className="text-white placeholder-blue-300 focus:outline-none bg-transparent w-full"
                placeholder="Buscar discussões..."
                type="text"
                value={query}
                onChange={handleQueryChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                }}
              />

              {isFocused && query && postTitles.length > 0 && (
                <ul className="pt-4 absolute top-[50%] -z-10 left-0 w-full bg-[#122B83] rounded-b-md">
                  {postTitles.map((p) => (
                    <li
                      key={p}
                      className="text-gray-300 hover:text-white px-2 py-1 hover:bg-app-blue cursor-pointer"
                      onClick={() => {}}
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <button
              className="p-2 hover:bg-blue-700 rounded-lg transition cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
