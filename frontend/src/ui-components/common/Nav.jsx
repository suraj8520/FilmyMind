import { useState } from 'react';
import { RiCloseFill, RiMenuFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Menu from '../compound-components/Menu';
import { navLinks } from './../../constants/index';

function Nav() {
  const [active, setActive] = useState('home');
  return (
    <nav className="justify-self-center">
      {/** First have a desktop navigation */}
      <ul className="hidden gap-12 lg:flex">
        {navLinks.map((el) => (
          <li
            key={el.path}
            onClick={() => setActive(el.path)}
            className={`${active === el.path ? 'text-brand-500' : 'text-neutral-800'} font-medium  hover:text-brand-400`}
          >
            <Link to={el.path}>{el.title}</Link>
          </li>
        ))}
      </ul>
      {/* as soon as we click on any of the children inside the div with set toggle then that event is also propagated to  the div and then the callback is called. otherwise i might have to set toggle state along with the active state */}
      <div className="relative flex h-full justify-center lg:hidden">
        <Menu>
          <Menu.Toggle
            id="mobile-nav"
            openEl={<RiMenuFill size={32} className="text-neutral-800" />}
            closeEl={<RiCloseFill size={32} className="text-neutral-800" />}
          />

          <Menu.List id="mobile-nav" className={'mt-5'}>
            {navLinks.map((el) => (
              <Menu.ListItem
                key={el.path}
                onClick={() => setActive(el.path)}
                className={`${active === el.path ? 'text-brand-500' : 'text-neutral-800'}`}
              >
                <Link to={el.path}>{el.title}</Link>
              </Menu.ListItem>
            ))}
          </Menu.List>
        </Menu>
      </div>
    </nav>
  );
}
export default Nav;
// function Nav() {
//   const [active, setActive] = useState('home');
//   const [toggle, setToggle] = useState(false);

//   return (
//     <nav>
//       {/** First have a desktop navigation */}
//       <ul className="hidden gap-12 lg:flex ">
//         {navLinks.map((el) => (
//           <li
//             key={el.path}
//             onClick={() => setActive(el.path)}
//             className={`${active === el.path ? 'text-brand-500' : 'text-neutral-800'} font-medium  hover:text-brand-400`}
//           >
//             <Link to={el.path}>{el.title}</Link>
//           </li>
//         ))}
//       </ul>
//       {/* as soon as we click on any of the children inside the div with set toggle then that event is also propagated to  the div and then the callback is called. otherwise i might have to set toggle state along with the active state */}
//       <div onClick={() => setToggle((prev) => !prev)} className="lg:hidden">
//         {!toggle ? (
//           <RiMenu3Fill size={32} className="text-neutral-800" />
//         ) : (
//           <RiCloseFill size={32} className="text-neutral-800" />
//         )}
//         <ul
//           className={`${toggle || 'hidden'} absolute right-0 top-full mr-2 mt-2 flex flex-col divide-y divide-neutral-200 rounded-lg bg-neutral-50 p-2 shadow-sm`}
//         >
//           {navLinks.map((el) => (
//             <li
//               key={el.path}
//               onClick={() => setActive(el.path)}
//               className={`${active === el.path ? 'text-brand-500' : 'text-neutral-800'} px-16 py-3 font-medium hover:text-brand-400`}
//             >
//               <Link to={el.path}>{el.title}</Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// }
// export default Nav;

// NavLink can be used if used normal css
// Use Link in the other cases where you handle the active state
// function NavLinks() {
//   return (
//     <>
//       <li>
//         <NavLink
//           to="/home"
//           className={'font-medium text-neutral-800 hover:text-brand-400'}
//         >
//           Home{' '}
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/blogs"
//           className={'font-medium text-neutral-800 hover:text-brand-400'}
//         >
//           Blogs{' '}
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/about"
//           className={'font-medium text-neutral-800 hover:text-brand-400'}
//         >
//           About{' '}
//         </NavLink>
//       </li>
//     </>
//   );
// }

// function MobileNav() {
//   const [isNavOpen, setIsNavOpen] = useState(false);

//   return (
//     <nav id="mobile-nav">
//       {!isNavOpen ? (
//         <RiMenu3Fill
//           size={32}
//           className="text-neutral-800"
//           onClick={() => setIsNavOpen((prev) => !prev)}
//         />
//       ) : (
//         <RiCloseFill
//           size={32}
//           className="text-neutral-800"
//           onClick={() => setIsNavOpen((prev) => !prev)}
//         />
//       )}
//       <div
//         className={`fade-in absolute right-0 top-full z-10 mr-2 mt-1 flex h-fit w-fit flex-col gap-2 rounded-xl bg-neutral-50 p-8 px-16 shadow-sm duration-500  ${isNavOpen || 'hidden'}`}
//       >
//         <ul className={`flex flex-col gap-5 `}>
//           <NavLinks />
//         </ul>
//       </div>
//     </nav>
//   );
// }
