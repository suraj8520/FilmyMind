import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const classNames = {
  base: 'rounded-xl transition ease-in-out duration-300 flex gap-1 items-center justify-center font-medium tracking-wide',
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  pill: 'rounded-full',
  size: {
    small: 'text-sm px-4 py-2',
    normal: 'px-6 py-2',
    large: 'px-8 py-3 text-xl',
  },
  variant: {
    primary: 'bg-brand-500 text-white hover:bg-brand-600',
    secondary:
      'bg-brand-50 text-brand-700 border border-brand-300 hover:bg-brand-100 hover:text-brand-600 hover:border-brand-400',
    danger: 'bg-red-600 text-red-50 hover:bg-red-700',
  },
};

function Button({
  children,
  to,
  variant = 'primary',
  size = 'normal',
  // disabled = false, // instead of taking this i can just use disabled:cursor-not-allowed cause it's much easier and if the button is disabled it applies this automatically
  pill = false,
  fullWidth = false,
  ...rest
}) {
  if (to)
    return (
      <Link
        to={to}
        className={twMerge(
          classNames.base,
          classNames.size[size],
          classNames.variant[variant],
          classNames.disabled,
          pill && classNames.pill,
          // disabled && classNames.disabled,
          fullWidth && 'w-full',
          'text-center',
        )}
        {...rest}
      >
        {children}
      </Link>
    );
  return (
    <button
      className={twMerge(
        classNames.base,
        classNames.size[size],
        classNames.variant[variant],
        classNames.disabled,
        pill && classNames.pill,
        fullWidth && 'w-full',
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
export default Button;
