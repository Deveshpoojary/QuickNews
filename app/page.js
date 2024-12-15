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
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  const fetchNews = async (query = '', category = 'general') => {
    try {
      if (!NEWS_API_KEY) {
        console.error('Missing NEWS_API_KEY in environment variables.');
        setNews([]);
        return;
      }

      setLoading(true);
      let url;
      if (query) {
        url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&token=${NEWS_API_KEY}`;
      } else if (category === 'crypto') {
        url = `https://gnews.io/api/v4/search?q=crypto&lang=en&token=${NEWS_API_KEY}`;
      } else {
        url = `https://gnews.io/api/v4/top-headlines?topic=${category}&lang=en&country=us&token=${NEWS_API_KEY}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      
      const data = await res.json();
      setNews(data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchTerm('');
    fetchNews('', category);
  }, [category]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchNews(searchTerm);
    }
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
            aria-label="Search news"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            aria-label="Search news button"
          >
            Search
          </button>
        </div>

        {/* Category Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 capitalize text-center">
          {category} News
        </h1>

        {/* News Articles */}
        {loading ? (
          <LoadingSpinner />
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <div
                key={article.url || index}
                className="bg-white shadow-lg rounded-lg p-4"
                aria-labelledby={`news-title-${index}`}
              >
                <img
                  className="rounded-md"
                  src={article.image || '/placeholder.png'}
                  alt={article.title || 'News image'}
                  loading="lazy"
                />
                <h2
                  id={`news-title-${index}`}
                  className="text-lg sm:text-xl font-bold mt-2"
                >
                  {article.title || 'No Title Available'}
                </h2>
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
                  {navigator.share && article.url && (
                    <button
                      onClick={() =>
                        navigator.share({ title: article.title, url: article.url })
                      }
                      className="text-blue-500 hover:underline text-sm"
                      aria-label="Share Article"
                    >
                      Share
                    </button>
                  )}
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
