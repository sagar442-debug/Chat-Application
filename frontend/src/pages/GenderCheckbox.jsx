import React from "react";

const GenderCheckbox = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer `}>
          <span className="text-gray-50 label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-gray-50 border-[1px] "
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="text-gray-50 label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-gray-50 border-[1px] "
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
