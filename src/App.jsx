
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import logo from "./assets/NewsLogo.svg";

const Menu = ({ sources, categories, handleFilter }) => (
  <ul className="lg:flex lg:space-x-4">
    {sources.map((source, index) => (
      <MenuItem key={index} onClick={() => handleFilter("source", source)} text={source} />
    ))}
    {categories.map((category, index) => (
      <MenuItem key={index} onClick={() => handleFilter("category", category)} text={category} />
    ))}
  </ul>
);

const MenuItem = ({ onClick, text }) => (
  <li>
    <button onClick={onClick} className="hover:underline focus:outline-none">{text}</button>
  </li>
);

const App = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sources, setSources] = useState(["BBC", "CNN", "OpenNews"]);
  const [categories, setCategories] = useState(["Business", "Technology", "Entertainment"]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=a994c9097ad9436e903d3f1479268ed8"
      );
      const result = await response.json();
      setArticles(result.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []); // Fetch articles once on component mount

  useEffect(() => {
    const filteredArticles = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.description && article.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredArticles(filteredArticles);
  }, [searchTerm, articles]);

  const handleFilter = (type, value) => {
    let filteredArticles = articles;

    if (type === "source") {
      filteredArticles = articles.filter(article => article.source.name === value);
    } else if (type === "category") {
      filteredArticles = articles.filter(article => article.category === value);
    }

    setFilteredArticles(filteredArticles);
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
              placeholder="Search by title or description"
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
          <Menu sources={sources} categories={categories} handleFilter={handleFilter} />
        </div>
      </nav>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredArticles.map((article, key) => (
            <ArticleCard key={key} article={article} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

const ArticleCard = ({ article }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    <img className="object-cover w-full h-48" src={article.urlToImage} alt="image" />
    <div className="p-4">
      <h4 className="text-lg font-semibold text-blue-600">{article.title}</h4>
      <p className="mb-2 leading-normal">{article.content}</p>
      <a href={article.url} className="inline-block px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">Read more</a>
    </div>
  </div>
);

export default App;
