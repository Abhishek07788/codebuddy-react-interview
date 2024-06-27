import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-tr from-[#FBAB7E] to-[#F7CE68] p-2 text-black md:py-7">
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
