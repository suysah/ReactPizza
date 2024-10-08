import LinkBtn from "../../ui/LinkBtn";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector((store) => store.user.username);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  function handleClear() {
    dispatch(clearCart());
  }

  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkBtn to="/menu"> &larr; Back to menu </LinkBtn>

      <h2 className="mt-7 text-xl font-semibold  ">Your cart, {username}</h2>

      <ul className="divide-y divide-stone-200 border-b  mt-3 ">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6  ">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button onClick={handleClear} type="secondary">
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
