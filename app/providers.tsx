import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/features/themes/ThemeProvider";
import { PropsWithChildren } from "react";
// import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
// const queryClient = new QueryClient();

export type ProvidersProps = PropsWithChildren;

export const Providers = (props: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      {props.children}
    </ThemeProvider>
  );
};
