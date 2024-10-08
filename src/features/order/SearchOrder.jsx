import { useState } from "react";
import { useNavigate } from "react-router";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search order"
        value={query}
        className="border rounded-full px-4 py-2 bg-yellow-100 text-sm
        placeholder:text-stone-400 w-42  transition-all duration-300  
        focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-offset-1 
        sm:focus:w-72  sm:w-64"
      />
    </form>
  );
};

export default SearchOrder;
