import React from "react";
import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  return (
    <div className="flex flex-cl items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-xl shadow-xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-50">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name..."
              className="w-full input input-bordered  h-10"
            />
          </div>
          <div>
            <label className="label p-2  ">
              <span className="text-base label-text text-gray-50">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Your username..."
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label ">
              <span className="text-base label-text text-gray-50">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-gray-50">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <GenderCheckbox />
          <a
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            href="#"
          >
            Already have an account?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;