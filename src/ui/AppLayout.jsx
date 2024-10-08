import Header from "./Header";
import CartOverView from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router";
import Loader from "./Loader";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen  grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll ">
        <main className=" max-w-3xl m-auto  ">
          <Outlet />
        </main>
      </div>

      <CartOverView />
    </div>
  );
};

export default AppLayout;
