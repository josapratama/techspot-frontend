import { Link, Outlet } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Input } from "@/components/ui/input";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

export function RootRoute() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <header className="bg-blue-800 text-white py-4">
        <div className="container">
          <nav>
            <ul className="lg:flex items-center justify-between">
              <li className="">
                <Link to="/" className="font-semibold text-2xl">
                  Tech Spot
                </Link>
              </li>
              <li className=" text-black">
                <Input type="text" placeholder="Search Products" />
              </li>
              <li className="">
                <Link to="/cart">
                  <PiShoppingCartSimpleBold size={25} />
                </Link>
              </li>
              <li className="">
                <Link to="/register">Daftar</Link>
              </li>
              <li className="">
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/me">Me</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <hr />

      <main>
        <Outlet />
      </main>
    </CookiesProvider>
  );
}
