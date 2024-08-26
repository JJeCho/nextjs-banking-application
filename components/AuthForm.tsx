"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/CustomInput";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)


    console.log(values);


    setIsLoading(false);
  }
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Banking
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font semibold text-gray-900">
            {user
              ? "Link Account"
              : type === "sign-in"
              ? "Sign In"
              : "Create Account"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account"
              : type === "sign-in"
              ? "Enter your details to sign in"
              : "Create your account"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your Email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <Button type="submit"
              className="form-btn">
                {
                  isLoading ? (
                    <>
                    <Loader2 
                    size={20}
                    className="animate-spin"
                    /> &nbsp;Loading....</>
                  ) : type ==="sign-in" ?
                  "Sign In" : "Create Account"
                }
              </Button>
            </form>
          </Form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
