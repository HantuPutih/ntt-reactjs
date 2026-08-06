"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/slices/authSlice";
import { UserSessionInterFace } from "@/types/user";

type AuthInitializerProps = {
  session: UserSessionInterFace;
};

export default function AuthInitializer({ session }: AuthInitializerProps) {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    dispatch(setUser(session));
    initialized.current = true;
  }, [dispatch, session]);

  return null;
}