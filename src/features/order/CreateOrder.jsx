/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../util/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const {
    username,
    status: addressstatus,
    position,
    address,
  } = useSelector((store) => store.user);

  const isLoadingAddress = addressstatus === "loading";

  const cart = useSelector(getCart);
  const totalcartPrice = useSelector(getTotalPrice);
  const priorityPrice = totalcartPrice * 0.2;
  const totalPrice = withPriority
    ? totalcartPrice + priorityPrice
    : totalcartPrice;

  const dispatch = useDispatch();
  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="py-6 px-4">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="order/new" > */}
      <Form method="POST">
        <div className=" mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
        </div>

        <div className=" mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
        </div>

        <div className="relative  mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={isLoadingAddress}
              className=" input w-full"
              type="text"
              name="address"
              defaultValue={address}
              required
            />
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] z-99">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                {" "}
                Get possition{" "}
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 font-medium
            focus:ring focus:outline-none focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude} `
                : ""
            }
          />

          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            Order Now from {formatCurrency(totalPrice)}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  console.log(order);

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
