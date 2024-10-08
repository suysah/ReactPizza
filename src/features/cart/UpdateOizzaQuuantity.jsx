/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

const UpdateOizzaQuuantity = ({ pizzaId, currentQuantity }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-1 items-center md:gap-2">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm gap-1">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        {" "}
        +{" "}
      </Button>
    </div>
  );
};

export default UpdateOizzaQuuantity;
