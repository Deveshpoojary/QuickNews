export async function fetchNews(category = '') {
  const url = category
    ? `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${process.env.NEWS_API_KEY}`
    : `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;

  const res = await fetch(url, {
    method: 'GET', // Explicitly specify GET method
  });
  const data = await res.json();
  return data;
}
