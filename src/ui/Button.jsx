import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Button = ({ disabled, children, to, type, onClick }) => {
  // const className =
  //   "sm:py-4 sm:px-6 bg-yellow-500 px-4 py-3 hover:bg-yellow-300  tracking-wide transition-colors duration-300 border  rounded-full uppercase font-bold text-stone-800 inline-block focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-alloweds";

  const base =
    "bg-yellow-400 text-sm hover:bg-yellow-300  tracking-wide transition-colors duration-300 border  rounded-full uppercase font-bold text-stone-800 inline-block focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-alloweds";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " text-sx px-4 py-2 md:px-5 md:py-2.5",
    round: base + "text-sx px-2.5 py-1 md:px-3.5 md:py-2",
    secondary:
      "text-sm  px-4 py-2.5 md:px-6 md:py-3.5 bg-transparent hover:bg-stone-300 hover:text-stone-800 tracking-wide transition-colors duration-300 border-stone-300 border-2  rounded-full uppercase font-bold text-stone-800 inline-block focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-alloweds",
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
};

export default Button;
