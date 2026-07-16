"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions/user.actions";
import SignIn from "@/app/(auth)/sign-in/page";

const formSchema = z.object({
  email: z.string().email(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter()

  const onSubmit = async(data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
        if(type === 'sign-up'){
            const newUser = await signUp(data)
            setUser(newUser)
        }
        if(type === 'sign-in'){
            const response = await SignIn({
                email: data.email,
                password: data.password
            })
            if(response) router.push('/')
        }
    } catch (error) {
        console.log(error)
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            alt="Horizon logo"
            width={34}
            height={34}
            className="size-[24px]max-xl:size-14"
          />
          <h1 className="text-26 font-ibm-">Horizon</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your bank account to get started"
                : "Enter your credentials to access your account"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* Plaid Link */}</div>
      ) : (
        <>
          <form
            className="space-y-8"
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className="flex gap-4">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label={"First Name"}
                      name="firstName"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      label={"Last Name"}
                      name="lastName"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    label={"Address"}
                    name="address1"
                    placeholder="Enter your specific address"
                  />
                  <CustomInput
                    control={form.control}
                    label={"City"}
                    name="city"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label={"State"}
                      name="state"
                      placeholder="State"
                    />
                    <CustomInput
                      control={form.control}
                      label={"Postal Code"}
                      name="postalCode"
                      placeholder="Postal code"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label={"Date of Birth"}
                      name="dateOfBirth"
                      placeholder="Date of Birth "
                    />
                    <CustomInput
                      control={form.control}
                      label={"SSN"}
                      name="ssn"
                      placeholder="Example: 1234"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                label={"Email"}
                name="email"
                placeholder="Enter your name"
              />
              <CustomInput
                control={form.control}
                label={"Password"}
                name="password"
                placeholder="Enter your password"
              />
            </FieldGroup>
            <div className="flex flex-col gap-4">
              <Button type="submit" className="form-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ) : type === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-up" ? "Sign In" : "Sign Up"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
