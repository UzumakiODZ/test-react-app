import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar.jsx';

const API_KEY = '97696ee973f8472bae4c3399d153b403'; // Replace with your GNews.io API key
const BASE_URL = 'https://gnews.io/api/v4/top-headlines';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('latest');
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Latest'); // Default category
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors

        // Log selectedCategory for debugging
        console.log('Selected Category:', selectedCategory);

        const response = await axios.get(BASE_URL, {
          params: {
            q: selectedCategory, // Use the selected category as the search query
            page,
            lang: 'en',
            token: API_KEY,
          },
        });

        // Log the response data for debugging
        console.log('API Response:', response.data);

        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, page]); // Fetch news when the category or page changes

  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedCategory(e.target.search.value);
    setPage(1);
  };

  return (
    <div className="App">
      <header><Navbar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} /></header>
      
      <h1>ACONEWS</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search news..." />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="news-grid">
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="news-card">
                <img src={article.image || 'default-image.jpg'} alt={article.title} />
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
                <small>{new Date(article.publishedAt).toLocaleDateString()} by {article.source.name}</small>
              </div>
            ))
          ) : (
            <p>No news articles found.</p>
          )}
        </div>
      )}
      <div className="pagination">
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page <= 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
