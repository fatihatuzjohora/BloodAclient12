import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Root;
