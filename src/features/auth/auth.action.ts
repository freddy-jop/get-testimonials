"use server";
import { signIn, signOut } from "@/auth/auth";

export const singOutAction = async () => {
  await signOut();
};

export const singInAction = async () => {
  await signIn();
};
