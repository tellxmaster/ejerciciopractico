import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import Cart from "../cart/Cart";
import useAuthStore from "../../../infrastructure/state/useAuthStore";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="text-[#222831] hover:text-blue-700"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[#222831] hover:text-blue-700"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="text-[#222831] hover:text-blue-700"
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Sign Up
                    </button>
                  </Link>
                </>
              )} */}
              <Link
                to="/clients"
                className="text-[#222831] hover:text-blue-700"
              >
                Clients
              </Link>
              <Link to="/orders" className="text-[#222831] hover:text-blue-700">
                Orders
              </Link>
              <Link to="/" className="text-[#222831] hover:text-blue-700">
                Products
              </Link>
              <Cart />
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-[#222831] focus:outline-none"
            >
              <FaBars size={24} />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center text-[#222831] transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMobileMenu}
          className="absolute top-4 right-4 text-[#222831] focus:outline-none"
        >
          <FaTimes size={24} />
        </button>
        {isAuthenticated ? (
          <button onClick={logout} className="text-[#222831] text-2xl mb-4">
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="text-[#222831] text-2xl mb-4"
              onClick={toggleMobileMenu}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-[#222831] text-2xl mb-4"
              onClick={toggleMobileMenu}
            >
              Sign Up
            </Link>
          </>
        )}
        <Link
          to="/clients"
          className="text-[#222831] text-2xl mb-4"
          onClick={toggleMobileMenu}
        >
          Clients
        </Link>
        <Link
          to="/orders"
          className="text-[#222831] text-2xl mb-4"
          onClick={toggleMobileMenu}
        >
          Orders
        </Link>
        <Link
          to="/items"
          className="text-[#222831] text-2xl mb-4"
          onClick={toggleMobileMenu}
        >
          Items
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
