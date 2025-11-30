import { Search, Bell, Menu } from "lucide-react";

interface HeaderProps {
  heading: string;
  subheading: string;
}

export default function Header({ heading, subheading }: HeaderProps) {
  return (
    <header className="bg-linear-to-r from-blue-600 to-blue-800 border-b border-blue-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/logo_round.png"
              alt="Logo The Bug"
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h1 className="text-2xl font-bold">{heading}</h1>
              <p className="text-blue-200 text-sm">{subheading}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-black/30 rounded-lg px-4 py-2 w-80">
              <Search className="w-5 h-5 text-blue-300 mr-2" />
              <input
                type="text"
                placeholder="Buscar discussões..."
                className="bg-transparent border-none outline-none text-white placeholder-blue-300 w-full"
              />
            </div>
            <button className="p-2 hover:bg-blue-700 rounded-lg transition">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-blue-700 rounded-lg transition md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
