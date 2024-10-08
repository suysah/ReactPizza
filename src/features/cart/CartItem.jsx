/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { formatCurrency } from "../../util/helpers";
import DeleteItems from "./DeleteItems";
import UpdateOizzaQuuantity from "./UpdateOizzaQuuantity";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:justify-between sm:items-center sm:gap-6 ">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateOizzaQuuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItems pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
