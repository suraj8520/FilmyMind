import { Link } from 'react-router-dom';
import { RiFilmFill } from 'react-icons/ri';
function Logo({ type = 'big', usedFor }) {
  return (
    <Link to="/" className="flex-1">
      <div className="flex w-fit items-center gap-1">
        <RiFilmFill
          size={type === 'small' ? 32 : 42}
          // color={'var(--color-brand-500)'}
          className="text-brand-500"
        />
        <span
          className={`${type === 'small' ? 'text-xl' : 'text-2xl'} ${usedFor === 'header' && 'hidden'} w-fit font-semibold text-neutral-900 sm:block`}
        >
          FILMY MIND
        </span>
      </div>
    </Link>
  );
}
export default Logo;
