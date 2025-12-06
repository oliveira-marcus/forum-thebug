import { Search, Menu, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router";
import usePostSearch from "../../hooks/usePostSearch";
import { useRef, useState } from "react";
import { useSidebar } from "../../contexts/SidebarProvider";

interface HeaderProps {
  heading: string;
  subheading: string;
}

export default function Header({ heading, subheading }: HeaderProps) {
  const [query, setQuery] = useState<string>("");
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { toggleSidebar } = useSidebar();

  const { signOut } = useAuth();

  let navigate = useNavigate();

  const { error, posts } = usePostSearch(query);

  function handleSignOut() {
    signOut();
    navigate("/");
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="bg-linear-to-r from-blue-600 to-blue-800 border-b border-blue-700 sticky top-0 z-50">
      <div className="max-w-10xl mx-auto px-4 py-3">
        <div className="flex items-center">
          <div
            className={`${
              isMobileSearchActive && "hidden"
            } flex items-center gap-4`}
          >
            <button
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className={`cursor-pointer p-3 rounded-full hover:bg-blue-500 transition`}
            >
              <Menu size={28} />
            </button>

            <div
              className={`${
                isMobileSearchActive && "hidden"
              } flex items-center gap-4`}
            >
              <img
                src="/src/assets/logo_round.png"
                alt="Logo The Bug"
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold">{heading}</h1>
                <p className="text-blue-200 text-sm">{subheading}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center pl-8">
            <div
              className={`${
                isMobileSearchActive && "hidden"
              } sm:hidden h-6 ml-auto`}
            >
              <button
                onClick={() => {
                  setIsMobileSearchActive(true);
                  setTimeout(() => inputRef.current?.focus(), 150);
                }}
              >
                <Search size={24} color="white" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`${!isMobileSearchActive && "hidden"} ${
                isMobileSearchActive && "flex flex-1"
              } sm:flex z-0 mx-auto min-w-56 w-[30%] relative py-2 rounded-2xl gap-4 bg-[#122B83]`}
            >
              <Search size={24} color="white" className="ml-4" />

              <input
                className="text-white placeholder-blue-300 focus:outline-none bg-transparent min-w-44"
                ref={inputRef}
                placeholder="Buscar discussões..."
                type="text"
                value={query}
                onChange={handleQueryChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setIsMobileSearchActive(false);
                    setIsFocused(false);
                  }, 100);
                }}
              />

              {isFocused && query && posts.length > 0 && (
                <ul className="pt-4 absolute top-[50%] -z-10 left-0 w-full bg-[#122B83] rounded-b-md">
                  {posts.map((p) => (
                    <Link
                      to={`/search?q=${encodeURIComponent(p.title.trim())}`}
                    >
                      <li
                        key={p.id}
                        className="text-gray-300 hover:text-white px-2 py-1 hover:bg-app-blue cursor-pointer"
                        onClick={() => {}}
                      >
                        {p.title}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </form>
          </div>

          <div className="ml-auto">
            <button
              className="p-2 hover:bg-blue-700 rounded-lg transition cursor-pointer "
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
