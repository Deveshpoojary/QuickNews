import NewsCard from '../components/NewsCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CategoryPage({ news, category }) {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 capitalize">{category} News</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.articles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { category } = context.params;
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${process.env.NEWS_API_KEY}`
  );
  const news = await res.json();
  return { props: { news, category } };
}
