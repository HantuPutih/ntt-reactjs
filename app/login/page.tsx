"use client";

import { useRouter } from "next/navigation";
import {useState} from "react";

export default function Page() {
  const router = useRouter();

  const [creds, setCreds] = useState({
    username: 'emilys',
    password: 'emilyspass'
  });

  const onLogin = async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: creds.username,
        password: creds.password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      // setError(data.message ?? "Login failed");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>login to The Mini project,</h1>
      <h2>credentials can be accessed here:</h2>
      <p className="underline text-blue-500"><a href="https://dummyjson.com/users" target="_blank" rel="noopener noreferrer">Dummy JSON Login</a></p>
      <div className="">
        <label>Username:</label>
        <input type="text" value={creds.username} onChange={(e) => setCreds({...creds, username: e.target.value})} />
      </div>
      <div className="">
        <label>Password:</label>
        <input type="password" value={creds.password} onChange={(e) => setCreds({...creds, password: e.target.value})} />
      </div>
      <div className="p-4 rounded-lg bg-amber-200 cursor-pointer">
        <button className="cursor-pointer" onClick={onLogin}>Login</button>
      </div>
    </div>
  )
}