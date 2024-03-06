import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('filter') || 'week';
  const [filter, setFilter] = useState(value);

  function handleFilter(e) {
    setFilter(e.target.value);
    searchParams.set('filter', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <select
      className="rounded-md bg-neutral-200 p-2 text-neutral-700 outline-none after:pr-4"
      value={filter}
      onChange={handleFilter}
    >
      <option value={'week'}>Last 7 days</option>
      <option value={'month'}>Last Month</option>
      <option value={'year'}>Last Year</option>
      <option value={'lifetime'}>Life Time</option>
    </select>
  );
}
export default Filter;
