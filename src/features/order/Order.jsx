/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../util/helpers";

import { getOrder } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router";
import { useFetcher } from "react-router-dom";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/menu");
      }
    },
    [fetcher]
  );

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 space-y-8 py-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="bg-red-500 rounded-full py-1 px-3 uppercase font-semibold text-red-50 tracking-wide">
              Priority
            </span>
          )}
          <span className="bg-green-500 rounded-full py-1 px-3 uppercase font-semibold text-green-50 tracking-wide">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-6 py-5">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divider-y divider-stone-200 border-b border-t">
        {cart.map((item) => {
          const pizzaData = fetcher?.data?.find((el) => el.id === item.pizzaId);

          return (
            <OrderItem
              item={item}
              key={item.id}
              isLoadingIngredients={fetcher.state === "loading"}
              ingredients={pizzaData?.ingredients || []}
            />
          );
        })}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold ">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority ? <UpdateOrder /> : null}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderid);
  return order;
}

export default Order;
