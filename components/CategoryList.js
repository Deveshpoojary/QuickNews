import Link from 'next/link';

const CategoryList = () => {
  const categories = ['World', 'Sports', 'Technology', 'Business', 'Entertainment'];

  return (
    <div className="bg-gray-100 shadow-md p-4 rounded-md">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/${category.toLowerCase()}`} className="text-blue-500 hover:underline">
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
