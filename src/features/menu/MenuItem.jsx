/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import { formatCurrency } from "../../util/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItems from "../cart/DeleteItems";
import UpdateOizzaQuuantity from "../cart/UpdateOizzaQuuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    console.log(id);
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? " opacity-70  grayscale" : ""} `}
      />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? (
            <>
              <p>{formatCurrency(unitPrice)}</p>
            </>
          ) : (
            <p className="text-sm uppercase font-medium text-stone-400">
              Sold out
            </p>
          )}
          {isInCart ? (
            <div className="flex gap-3 items-center sm:gap-8">
              <UpdateOizzaQuuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItems pizzaId={id} />
            </div>
          ) : null}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
