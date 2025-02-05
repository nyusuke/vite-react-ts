import { Outlet } from "react-router-dom";
import { Header } from "./Header";

function LayoutWrapper() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default LayoutWrapper;
