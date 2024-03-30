"use client";
import { createSessionID, getDetailAccount, getRequestToken, postLogin } from "@/lib/apis/auth/api";
import { FormSchema, formSchema } from "@/lib/apis/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: FormSchema) {
    const body = {
      ...data,
      request_token: await getRequestToken(),
    };

    try {
      const result = await postLogin(body);
      const getSessionID = await createSessionID(result.request_token);
      const getUserID = await getDetailAccount(getSessionID);
      setCookie("userID", getUserID);
      setCookie("sessionID", getSessionID);
      router.push("/");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div
      className="min-h-screen w-full  flex items-center justify-center bg-cover bg-center bg-[url('https://flixtv.volkovdesign.com/main/img/bg.jpg')]"
      style={{
        backgroundImage: `url(https://flixtv.volkovdesign.com/main/img/bg.jpg)`,
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full flex flex-col place-items-center gap-y-6 bg-primary shadow-lg p-10 rounded-2xl"
      >
        <Image
          src={"https://flixtv.volkovdesign.com/main/img/logo.svg"}
          width={90}
          height={90}
          alt="image"
        />
        <p className="text-sm text-slate-200/50">Log in using your TMDB account.</p>
        <div className="flex flex-col items-start gap-y-6 w-full">
          <input
            className="py-3 px-5 bg-[#151f30] rounded-2xl text-white text-sm w-full outline-none focus:ring duration-300"
            type="text"
            placeholder="Username"
            {...register("username")}
          />
          {errors && <p className="text-xs -mt-2 ml-2 text-rose-500">{errors.username?.message}</p>}

          <input
            className="py-3 px-5 bg-[#151f30] rounded-2xl text-white text-sm w-full outline-none focus:ring duration-300"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors && <p className="text-xs -mt-2 ml-2 text-rose-500">{errors.password?.message}</p>}

          <div className="flex gap-x-4">
            <input
              className="py-1 px-5 ml-4 bg-[#151f30] rounded-2xl text-white text-sm"
              type="checkbox"
            />
            <label htmlFor="remember-me" className="text-sm">
              Remember me
            </label>
          </div>
        </div>
        <button className="bg-[#2f80ed] font-medium text-sm rounded-2xl p-4 w-full">SIGN IN</button>
        <span className="text-sm">or</span>
        <p className="text-sm">
          Don't have an account? <span className="text-font">Sign up!</span>
        </p>
        <span className="underline text-font text-sm">Forgot password?</span>
      </form>
    </div>
  );
};
export default Login;
