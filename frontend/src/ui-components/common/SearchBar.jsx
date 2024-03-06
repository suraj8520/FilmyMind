import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchTerm) return;
    navigate('/search?q=' + searchTerm);
  }

  return (
    <form
      className="flex items-center justify-center rounded-xl bg-neutral-200 px-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="w-full bg-neutral-200 p-2 text-neutral-800 focus:outline-none"
        placeholder="Search.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">
        <RiSearchLine size={24} className=" text-neutral-600" />
      </button>
    </form>
  );
}
export default SearchBar;
