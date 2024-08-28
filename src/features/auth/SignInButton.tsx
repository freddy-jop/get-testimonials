"use client";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { singInAction } from "./auth.action";

export const SignInButton = () => {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => {
        singInAction();
      }}
    >
      <LogInIcon size={16} className="mr-2" />
      Sign In
    </Button>
  );
};
