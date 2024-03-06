import { Link } from 'react-router-dom';

function Logo({ type = 'big', usedFor }) {
  return (
    <Link to="/" className="flex-1">
      <div className="flex w-fit items-center gap-1">
        <img src="/logo.png" className="w-7 min-w-[36px]" alt="logo" />
        <span
          className={`${type === 'small' ? 'text-xl' : 'text-2xl'} ${usedFor === 'header' && 'hidden'} w-fit font-semibold text-neutral-900 sm:block`}
        >
          Zone
        </span>
      </div>
    </Link>
  );
}
export default Logo;
