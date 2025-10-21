"use client";
import axiosInstance from "@/lib/axios-interceptor";
import Head from "next/head";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import Cryptr from "cryptr";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const cryptr = new Cryptr(
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "defaultKey"
);

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  //   handle input change...
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  //   handle submit...
  const handleLogin = async () => {
    setIsFetching(true);
    const hashPassword = cryptr.encrypt(loginDetails.password); // hash the password before sending to server for security resonsons...
    try {
      const reqLogin = await axiosInstance.post("/auth/login", {
        email: loginDetails.email,
        password: hashPassword,
      });

      if (reqLogin.data && reqLogin.status === 200) {
        toast.success("Login successful");
        Cookies.set("session_token", reqLogin.data.token, { expires: 1 }); // set cookie for 1 day...
        setIsFetching(false);
        router.push("/");
      }
    } catch (error: any) {
      console.log("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
      setIsFetching(false);
    }
  };
  return (
    <>
      <Head>
        <title>Login - TenTwenty</title>
      </Head>
      <div className="min-h-screen h-screen w-full flex flex-col-reverse 2xl:flex-row xl:flex-row lg:flex-row md:flex-col-reverse md:landscape:flex-row lg:portrait:flex-col-reverse justify-center items-center">
        <div className="2xl:w-1/2 xl:w-1/2 lg:w-1/2 lg:portrait:w-full md:w-full w-full bg-(--base-color) 2xl:p-10 xl:p-10 lg:p-10 md:p-10 md:landscape:p-6 p-6 py-10 2xl:h-full xl:h-full lg:h-full md:h-full h-full flex justify-center items-center">
          <div className="2xl:w-[90%] xl:w-[90%] lg:w-[90%] lg:portrait:w-[90%] md:w-[90%] md:landscape:w-[95%] w-[95%] flex flex-col ">
            <h4 className="font-bold 2xl:text-[1.5dvw] xl:text-[1.5dvw] lg:text-[1.5dvw] lg:portrait:text-[4.5dvw] md:text-[4.5dvw] md:landscape:text-[2dvw] text-[5dvw] text-(--text-mainColor) mb-4">
              Welcome back
            </h4>
            <div className="flex flex-col w-full gap-6">
              <div className="flex flex-col gap-3 w-full">
                <label
                  htmlFor="email"
                  className="text-(--text-mainColor) 2xl:text-[1.1dvw] xl:text-[1.1dvw] lg:text-[1.1dvw] lg:portrait:text-[2.1dvw] md:text-[2.1dvw]  text-[3.5dvw] font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  placeholder="name@example.com..."
                  className="border border-(--border-color) rounded-lg px-3 py-2 active:outline-none focus:outline-(--background-color)/60 w-full placeholder:text-(--text-secondaryColor) text-(--text-mainColor) 2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] lg:portrait:text-[2.5dvw] md:text-[2.5dvw]  text-[3dvw] font-normal"
                  type="email"
                  value={loginDetails.email}
                  name="email"
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label
                  htmlFor="password"
                  className="text-(--text-mainColor) 2xl:text-[1.1dvw] xl:text-[1.1dvw] lg:text-[1.1dvw] lg:portrait:text-[2.1dvw] md:text-[2.1dvw]  text-[3.5dvw] font-medium"
                >
                  Password
                </label>
                <input
                  id="password"
                  placeholder="********"
                  className="border border-(--border-color) rounded-lg px-3 py-2 active:outline-none focus:outline-(--background-color)/60 w-full placeholder:text-(--text-secondaryColor) text-(--text-mainColor) 2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] lg:portrait:text-[2.5dvw] md:text-[2.5dvw]  text-[3dvw] font-normal"
                  type="password"
                  value={loginDetails.password}
                  name="password"
                  onChange={handleOnChange}
                />
              </div>

              <div className="flex justify-start items-center gap-2 px-2">
                <input
                  className="2xl:h-[1dvw] xl:h-[1dvw] lg:h-[1dvw] lg:portrait:h-[2dvw] md:h-[2.2dvw] h-[3.5dvw] 2xl:w-[1dvw] xl:w-[1dvw] lg:w-[1dvw] lg:portrait:w-[2dvw] md:w-[2.2dvw] w-[3.5dvw] border border-(--border-color) cursor-pointer"
                  id="rememberMe"
                  type="checkbox"
                />{" "}
                <label
                  className="text-(--text-secondaryColor) cursor-pointer 2xl:text-[1.1dvw] xl:text-[1.1dvw] lg:text-[1.1dvw] lg:portrait:text-[2.2dvw] md:text-[2.2dvw]  text-[3.5dvw] font-medium"
                  htmlFor="rememberMe"
                >
                  Remember me
                </label>
              </div>
            </div>
            <button
              onClick={handleLogin}
              disabled={!(loginDetails.email && loginDetails.password)}
              className="w-full bg-(--button-color) text-(--base-color) py-3 my-7 rounded-xl cursor-pointer font-medium 2xl:text-[1.2dvw] xl:text-[1.2dvw] lg:text-[1.2dvw] lg:portrait:text-[3dvw] md:text-[3.2dvw]  text-[4.5dvw] hover:opacity-90 transition-opacity ease-linear duration-200 disabled:cursor-not-allowed disabled:opacity-50 flex justify-center items-center gap-5"
            >
              {isFetching && (
                <CircularProgress
                  style={{
                    color: "white",
                  }}
                  size={20}
                />
              )}
              Sign in
            </button>
          </div>
        </div>
        <div className="2xl:w-1/2 xl:w-1/2 lg:w-1/2 lg:portrait:w-full md:w-full w-full bg-(--background-color) 2xl:p-10 xl:p-10 lg:p-10 md:p-10 md:landscape:p-6 p-6 py-10 2xl:h-full xl:h-full lg:h-full md:h-full h-auto flex justify-center items-center">
          <div className="2xl:w-[90%] xl:w-[90%] lg:w-[90%] md:w-[90%] w-[95%] flex flex-col gap-4">
            <h1 className="text-(--base-color) 2x:text-[3dvw] xl:text-[3dvw] lg:text-[3dvw] lg:portrait:text-[5dvw] md:text-[5dvw]  text-[8dvw] font-semibold">
              ticktock
            </h1>
            <p className="text-(--base-color) 2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] lg:portrait:text-[2dvw] md:text-[2dvw]   text-[3dvw] font-normal">
              Introducing ticktock, our cutting-edge timesheet web application
              designed to revolutionize how you manage employee work hours. With
              ticktock, you can effortlessly track and monitor employee
              attendance and productivity from anywhere, anytime, using any
              internet-connected device.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
