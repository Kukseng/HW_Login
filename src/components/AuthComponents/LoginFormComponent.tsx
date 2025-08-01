"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// formSchema Validation using zod
const formValidation = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must contain uppercase, lowercase, number and special character",
    }),
});

export default function LoginFormComponent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // 1. Define form
  const form = useForm<z.infer<typeof formValidation>>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. apply handlesubmission
  async function onSubmit(values: z.infer<typeof formValidation>) {
    try {
      dispatch(loginStart());

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        dispatch(loginFailure(errorData.message || "Failed to login"));
        return;
      }

      const data = await res.json();
      console.log("Login successful:", data);

      // Dispatch success action with user data and tokens
      dispatch(
        loginSuccess({
          user: {
            email: values.email,
            provider: "email",
          },
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        })
      );

      // Wait a moment for state to update, then redirect
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    } catch (error) {
      console.log(error);
      dispatch(loginFailure("An unexpected error occurred"));
    }
  }

  const handleSocialLogin = (provider: "google" | "github" | "facebook") => {
    // Redirect to OAuth provider
    const authUrl = `/api/auth/${provider}`;
    window.location.href = authUrl;
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-gray-600">Sign in to your account</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin("google")}
        >
          <FcGoogle className="mr-2 w-4 h-4" />
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin("github")}
        >
          <FaGithub className="mr-2 w-4 h-4" />
          Continue with GitHub
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin("facebook")}
        >
          <FaFacebook className="mr-2 w-4 h-4" />
          Continue with Facebook
        </Button>
      </div>

      <div className="relative">
        <div className="flex absolute inset-0 items-center">
          <Separator className="w-full" />
        </div>
        <div className="flex relative justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="koko@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Koko123$%$%" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>

      <div className="text-sm text-center">
        <span className="text-gray-600">Don&apos;t have an account? </span>
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </div>
    </div>
  );
}
