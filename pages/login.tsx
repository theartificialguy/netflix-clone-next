import Link from "next/link";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import AuthenticationPageWrapper from "../hoc/AuthenticationPageWrapper";

type RememberMeType = "checked" | "unchecked";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signIn } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };

  const [isChecked, setIsChecked] = useState<RememberMeType>("checked");

  const handleRememberMe = () => {
    setIsChecked((prevState) => {
      return prevState === "unchecked" ? "checked" : "unchecked";
    });
  };

  return (
    <AuthenticationPageWrapper>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-opacity-70 md:space-y-10 rounded-md h-[75vh] w-[400px] md:w-[450px] bg-black py-12 px-16"
      >
        <h1 className="text-3xl font-semibold md:text-4xl">Sign In</h1>

        <div className="flex flex-col space-y-6">
          <label>
            <input
              type="email"
              placeholder="Email"
              className="inputLabel"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label>
            <input
              type="password"
              className="inputLabel"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>

          <div className="h-[1px]" />

          <button
            type="submit"
            className="bg-[#e50914] rounded-sm py-2 px-4 text-base h-12 font-semibold"
          >
            <h2>Sign In</h2>
          </button>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              {isChecked === "checked" ? (
                <FaCheckSquare
                  className="cursor-pointer"
                  onClick={handleRememberMe}
                  color="gray"
                />
              ) : (
                <FaSquare
                  className="cursor-pointer"
                  onClick={handleRememberMe}
                  color="gray"
                />
              )}

              <span className="text-sm text-gray-500">Remember me</span>
            </div>

            <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-400 hover:underline transition duration-200">
              Need help?
            </p>
          </div>

          <div className="h-[2px]" />

          <div className="flex space-x-1">
            <span className="text-base text-gray-500">New to Netflix?</span>
            <button className="text-base text-white hover:underline">
              <Link href="/register">Sign up now</Link>
            </button>
            <span className="text-base text-gray-500">.</span>
          </div>
        </div>
      </form>
    </AuthenticationPageWrapper>
  );
};

export default Login;
