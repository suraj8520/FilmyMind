import { RiSearchLine } from 'react-icons/ri';

function SearchBar() {
  return (
    <form className="flex items-center justify-center rounded-xl bg-neutral-200 px-2">
      <input
        type="text"
        className="w-full bg-neutral-200 p-2 focus:outline-none"
        placeholder="Search.."
      />
      <RiSearchLine size={24} className=" text-neutral-500" />
    </form>
  );
}
export default SearchBar;
