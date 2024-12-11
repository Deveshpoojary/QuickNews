const NewsCard = ({ article }) => (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img className="rounded-md" src={article.urlToImage} alt={article.title} />
      <h2 className="text-xl font-bold mt-2">{article.title}</h2>
      <p className="text-gray-600 mt-2">{article.description}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 mt-4 inline-block"
      >
        Read More
      </a>
    </div>
  );
  
  export default NewsCard;
  