/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
// import { prepareAutoBatched } from "@reduxjs/toolkit";
const UpdateOrder = ({ order }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="small" disabled={fetcher.state === "submitting"}>
        {fetcher.state === "submitting" ? "Updating..." : "Make Priority"}
      </Button>
      {fetcher.data?.success === false && (
        <p className="text-red-500 mt-2">{fetcher.data.errorMessage}</p>
      )}
    </fetcher.Form>
  );
};

export default UpdateOrder;

// eslint-disable-next-line no-unused-vars
export async function action({ request, params }) {
  console.log("param", params);

  try {
    const data = { priority: true };
    await updateOrder(params.orderid, data);
  } catch (error) {
    console.log(error);
  }

  return null;
}
