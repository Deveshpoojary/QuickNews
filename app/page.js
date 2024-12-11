'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  const [category, setCategory] = useState('general');
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchNews = async (query = '', category = 'general') => {
    try {
      setLoading(true);
      let url;
      if (query) {
        url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`;
      } else if (category === 'crypto') {
        url = `https://newsapi.org/v2/everything?q=crypto&apiKey=${process.env.NEWS_API_KEY}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setNews(data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchTerm('');
    fetchNews('', category);
  }, [category]);

  const handleSearch = () => {
    fetchNews(searchTerm);
  };

  return (
    <div>
      <Header onCategoryChange={setCategory} />
      <main className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6 flex flex-wrap justify-center items-center gap-2 sm:gap-4">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 min-w-0 sm:w-auto border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Category Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 capitalize text-center">{category} News</h1>

        {/* News Articles */}
        {loading ? (
          <LoadingSpinner />
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <div
                key={`${article.url}-${index}`}
                className="bg-white shadow-lg rounded-lg p-4"
              >
                <img
                  className="rounded-md"
                  src={article.urlToImage || '/placeholder.png'}
                  alt={article.title}
                />
                <h2 className="text-lg sm:text-xl font-bold mt-2">{article.title}</h2>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  {article.description || 'No description available.'}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm"
                  >
                    Read More
                  </a>
                  <button
                    onClick={() =>
                      navigator.share({ title: article.title, url: article.url })
                    }
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No news articles available.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
