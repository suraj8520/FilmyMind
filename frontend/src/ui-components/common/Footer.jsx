import Logo from './Logo';

function Footer() {
  return (
    <footer className="flex flex-col items-center gap-1 bg-brand-100 py-5">
      <Logo type="small" />
      <p className="text-center text-xs text-neutral-500">
        Copyright © 2008 - 2024 Filmy Mind. All Rights Reserved.
      </p>
    </footer>
  );
}
export default Footer;
