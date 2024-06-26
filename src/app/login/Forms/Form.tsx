"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import Link from "next/link";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid e-mail")
      .max(100, { message: "E-mail can't be longer than 300 characters." }),
    password: z
      .string()
      .min(6, { message: "Password has to be at least 6 characters long." }),
  });

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await signIn("credentials",  {
      email: values.email,
      password: values.password,
      redirect: false
    });

    if (!response?.error) {
      await router.push('/dashboard')
    }

    toast.success("Account created!");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="matheus.alxds@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your email used to sign in to our app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                This is your password used to sign in to our app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link href="/register" className="block">Dont have an account?</Link>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
