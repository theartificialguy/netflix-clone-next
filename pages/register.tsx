import React from "react";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthenticationPageWrapper from "../hoc/AuthenticationPageWrapper";

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signUp } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signUp(email, password);
  };

  return (
    <AuthenticationPageWrapper>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-opacity-70 md:space-y-10 rounded-md h-[75vh] w-[400px] md:w-[450px] bg-black py-12 px-16"
      >
        <h1 className="text-3xl font-semibold md:text-4xl">Sign Up</h1>

        <div className="flex flex-col space-y-6">
          <label>
            <input
              className="inputLabel"
              type="email"
              placeholder="Email"
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
          <label>
            <input
              type="password"
              className="inputLabel"
              placeholder="Re-Enter Password"
              {...register("confirmPassword", { required: true })}
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
            <h2>Sign Up</h2>
          </button>

          <div className="h-[2px]" />

          <div className="flex space-x-1">
            <span className="text-base text-gray-500">
              Already have an account?
            </span>
            <button className="text-base text-white hover:underline">
              {" "}
              <Link href="/login">Sign in</Link>
            </button>
            <span className="text-base text-gray-500">.</span>
          </div>
        </div>
      </form>
    </AuthenticationPageWrapper>
  );
};

export default Register;
