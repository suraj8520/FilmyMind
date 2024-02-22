import { twMerge } from 'tailwind-merge';

function Tag({ children, className }) {
  return (
    <span
      className={twMerge(
        'inline-block rounded-md bg-brand-100 px-3 py-1 text-xs font-medium uppercase tracking-widest text-brand-500',
        className,
      )}
    >
      {children}
    </span>
  );
}
export default Tag;
