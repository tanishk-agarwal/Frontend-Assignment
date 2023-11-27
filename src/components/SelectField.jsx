import React from "react";
import Description from "./Description";

const SelectField = ({ data , namefield , register}) => {
  return (
    <div className="my-2 bg-gray-50  rounded-lg p-6 w-full grid grid-cols-12">
      <h1 className="font-bold col-span-6 flex items-center">
        {data.label} &nbsp;
        {data.description && <Description desc={data.description} />}
      </h1>
      <select
        // name={namefield}
        {...register(namefield)}
        className="col-span-6 bg-blue-50 p-2 rounded-lg text-sm border border-blue-200 focus:outline-none focus:ring focus:border-blue-300"
      >
        {data.validate.options &&
          data.validate.options.map((selectoption, index) => (
            <option
              key={index}
              value={selectoption.value}
              selected={data.validate.defaultValue === selectoption.value}
            >
              {selectoption.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectField;
