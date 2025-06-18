"use client";

import { signinSchema, userSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AuthFormProps {
  type: "signin" | "signup";
  role: "user" | "seller";
}

interface Input {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  role: "user" | "seller";
}

const AuthForm = ({ type, role }: AuthFormProps) => {
  const schema = type === "signin" ? signinSchema : userSchema;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: role,
    },
  });

  const onSubmit: SubmitHandler<Input> = async (data) => {
    if (type === "signin") {
      setLoading(true);
      const loadingToast = toast.loading("Signing in...");

      try {
        const res = await signIn("credentials", {
          ...data,
          role: role,
          redirect: false,
        });
        toast.dismiss(loadingToast);
        if (res?.ok) {
          toast.success("Sign in successfull");
          router.push(role === "seller" ? "/seller" : "/");
          return;
        } else {
          toast.error(res?.error || "Invalid username or password");
        }
      } catch (err) {
        toast.error("Sign in failed");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      console.log(data.firstname + "     " + data.lastname);
      const loadingToast = toast.loading("Signing up...");
      try {
        const res = await axios.post("/api/register", {
          email: data.email,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          phone: data.phone,
          role: role,
        });
        toast.dismiss(loadingToast);
        if (res.status === 200) {
          toast.success("Sign up successfull");
          router.push(role === "seller" ? "/seller/signin" : "/signin");
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error("Sign up failed");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-amber-50 text-sm md:text-base">
      <div className="w-1/2 md:w-[40%] lg:w-[35%] min-h-[50vh] bg-white rounded-2xl border shadow-xl flex flex-col items-center gap-8 p-6">
        <div className="flex flex-col gap-4 items-center">
          <Image src={"/Logo.png"} alt="Logo" height={100} width={100} />
          <h3 className="text-black md:text-xl text-lg">
            {type === "signin" ? "Sign in" : "Create an account"}
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-black flex flex-col gap-2 w-full items-center"
        >
          <input
            type="email"
            {...register("email")}
            className="px-2 md:px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300 border w-[90%] md:w-4/5 border-gray-400 rounded-xl"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <input
            type="password"
            {...register("password")}
            className="px-2 md:px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300 border w-[90%] md:w-4/5 border-gray-400 rounded-xl"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          {type === "signup" && (
            <>
              <input
                type="text"
                placeholder="Firstname"
                className="px-2 md:px-4 py-3 border w-[90%] md:w-4/5 focus:outline-none focus:ring-2 focus:ring-amber-300 border-gray-400 rounded-xl"
                {...register("firstname")}
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs">
                  {errors.firstname.message}
                </p>
              )}
              <input
                type="text"
                placeholder="Lastname"
                className="px-2 md:px-4 py-3 border w-[90%] md:w-4/5 focus:outline-none focus:ring-2 focus:ring-amber-300 border-gray-400 rounded-xl"
                {...register("lastname")}
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs">
                  {errors.lastname.message}
                </p>
              )}
              <input
                type="number"
                placeholder="Phone"
                className="px-2 md:px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-300 border w-[90%] md:w-4/5 border-gray-400 rounded-xl"
                {...register("phone", { valueAsNumber: true })}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </>
          )}
          <button
            disabled={loading}
            type="submit"
            className={`${
              loading
                ? "opacity-50 cursor-not-allowed"
                : " hover:bg-amber-100 duration-200 cursor-pointer"
            } mt-3 px-2 py-3 rounded-xl border border-gray-400 bg-amber-50`}
          >
            {type === "signin" && (<>
              {loading ? "Signing in..." : "Sign in"}
            </>)}
            {type === "signup" && (<>
              {loading ? "Signing up..." : "Sign up"}
            </>)}
          </button>
          {type === "signin" && <p className="text-xs md:text-base">
            Don&apos;t have an account?{" "}
            <Link
              href={role === "seller" ? "/seller/signup" : "/signup"}
              className="cursor-pointer underline text-center"
            >
              Sign up
            </Link>
          </p>}
          {type === "signup" && <p className="text-xs md:text-base">
            Already have an account?{" "}
            <Link
              href={role === "seller" ? "/seller/signin" : "/signin"}
              className="cursor-pointer underline text-center"
            >
              Sign in
            </Link>
          </p>}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
