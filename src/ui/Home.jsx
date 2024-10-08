import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
// import userSlice from "../features/user/userSlice";

function Home() {
  const username = useSelector((store) => store.user.username);
  console.log(username);

  return (
    <div className="px-4 my-10 text-center sm:my-16">
      <h1 className="mb-8   text-stone-700 font-semibold text-xl md:text-3xl ">
        The best pizza.
        <br />
        <div className="text-yellow-500">
          Straight out of the oven, straight to you.
        </div>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Countinue ordering {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
