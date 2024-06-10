import React from "react";

interface props {
  children: React.ReactNode;
  bg: string;
}

const Card = ({ children, bg = "bg-gray-100" }: props) => {
  return (
    <>
      <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>
    </>
  );
};

export default Card;
