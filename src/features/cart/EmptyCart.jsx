import LinkBtn from "../../ui/LinkBtn";

function EmptyCart() {
  return (
    <div className="mt-4">
      <LinkBtn to="/menu">&larr; Back to menu</LinkBtn>

      <p className=" pt-6 text-xl font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
