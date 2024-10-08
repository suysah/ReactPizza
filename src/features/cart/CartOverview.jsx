import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartItems, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../util/helpers";

function CartOverview() {
  const totalPrice = useSelector(getTotalPrice);
  const totalQuantity = useSelector(getTotalCartItems);

  if (!totalQuantity) return;

  return (
    <div
      className="flex items-center justify-between
         p-4 bg-stone-800 text-stone-200 uppercase text-sm sm:p-6 md:text-base "
    >
      {/* {totalQuantity > 0 ? ( */}
      <p className="text-stone-300 space-x-4 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span> {formatCurrency(totalPrice)} </span>
      </p>
      {/* ) : null} */}
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
