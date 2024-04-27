import React, { useState } from "react";
 import Footer from "./components/Footer";
 import logo from "./assets/NewsLogo.svg";
const App = () => {
  const Menu = () => (
    <ul className="lg:flex lg:space-x-4">
      <MenuItem href="#" text="BBC" />
      <MenuItem href="#" text="CNN" />
      <MenuItem href="#" text="FoxsNews" />
    </ul>
  );
  
  const MenuItem = ({ href, text }) => (
    <li>
      <a href={href} className="hover:underline">
        {text}
      </a>
    </li>
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
        <nav className="bg-black text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <img src={logo} className="h-10" alt="NewsCast Logo" />
          </div>
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Search by first letters of title"
              className="border rounded py-2 px-4 w-full max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="block text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
          <Menu />
        </div>
      </nav>
    <Footer />
    </>
  )
}

export default App
