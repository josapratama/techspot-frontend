import { Link, Outlet } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Input } from "@/components/ui/input";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

export function RootRoute() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <header className="bg-blue-800 text-white py-4 fixed w-full z-10 shadow-md">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="font-semibold text-2xl">
                Techspot
              </Link>
              <div className="hidden lg:block w-1/2">
                <Input
                  type="text"
                  placeholder="Search Products"
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/products" className="hover:underline">
                Shop
              </Link>
              <Link to="/cart" className="flex items-center">
                <PiShoppingCartSimpleBold size={25} />
              </Link>
              <span className="hidden lg:block">|</span>
              <Link to="/register" className="hover:underline">
                Daftar
              </Link>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/me" className="hover:underline">
                Me
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="py-[70px]">
        <main>
          <Outlet />
        </main>
      </div>
    </CookiesProvider>
  );
}
