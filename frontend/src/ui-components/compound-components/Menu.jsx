import { twMerge } from 'tailwind-merge';
import useGlobalContext from '../../contexts/useGlobalContext';
import useOutsideClick from '../../hooks/useOutsideClick';

function Menu({ children }) {
  return children;
}

function Toggle({ id, openEl, closeEl }) {
  const { openMenuId, openMenu, closeMenu } = useGlobalContext();
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation(); // This creates a problem if there are multiple windows and in this kind of scenario but if we use global state then it won't pose the problem where two models are open at the same time
    if (openMenuId === '' || id !== openMenuId) openMenu(id);
    else closeMenu();
  }
  return (
    <button onClick={handleClick}>
      {id === openMenuId ? closeEl : openEl}
    </button>
  );
}

function List({ children, id, className }) {
  const { openMenuId, closeMenu } = useGlobalContext();
  const { ref: listRef } = useOutsideClick(closeMenu);

  return (
    <ul
      ref={listRef}
      className={twMerge(
        'absolute right-0 top-full z-50 flex flex-col divide-y divide-neutral-200 rounded-lg bg-neutral-50 p-2 shadow-full',
        className,
        openMenuId === id || 'hidden',
      )}
      // className={`${openMenuId === id || 'hidden'} absolute right-0 top-full mr-2 mt-2 flex flex-col divide-y divide-neutral-200 rounded-lg bg-neutral-50 p-2 shadow-full ${className}`}
    >
      {children}
    </ul>
  );
}

function ListItem({ children, className, ...rest }) {
  return (
    <li
      // className={`px-16 py-3 font-medium hover:text-brand-400 ${className}`}
      className={twMerge(
        'px-16 py-3 font-medium text-neutral-700 hover:text-brand-400',
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.ListItem = ListItem;
export default Menu;
