"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { handleError } from "@/utils/handleError";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const { toast } = useToast();
  const handleData = async () => {
    try {
      const { username, password } = data;
      if (!username || !password) throw "isi password dan username";

      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
        { username, password }
      );
      if (result) localStorage.setItem("token", result.data);
      router.push("/janjipoli");
    } catch (error: any) {
      toast({
        title: handleError(error),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-[1200px] lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] m-auto shadow-lg mt-10 rounded-lg">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                required
                onChange={(e) => {
                  setData({ ...data, username: e.target.value });
                }}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => {
                handleData();
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
