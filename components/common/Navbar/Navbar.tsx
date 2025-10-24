import React from "react";

export const Navbar = () => {
  return (
    <>
      <header className=" bg-white px-10 py-3 flex justify-between items-center">
        <h1 className="text-[2dvw] font-bold text-(--text-mainColor)">
          ticktock
        </h1>
        <div className="text-gray-600 text-[1dvw] font-medium">John Doe ▾</div>
      </header>
    </>
  );
};
