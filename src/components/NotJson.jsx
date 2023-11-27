import React from "react";
import { BiError } from "react-icons/bi";

const NotJson = () => {
  return (
    <div className="col-span-6 flex flex-col items-center justify-center  h-full">
      <BiError className="text-6xl scale-150 text-red-500 font-bold" />
      <h1 className="text-4xl mt-6 font-bold font-mono">
        The schema is not proper json!
      </h1>
    </div>
  );
};

export default NotJson;
