// app/providers/ServerProviders.tsx
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

interface ServerProvidersProps {
  children: ReactNode;
}

export default function ServerProviders({ children }: ServerProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"      // adds class="dark" or "light" on <html>
      defaultTheme="light"    // start in dark mode by default
      enableSystem={false}   // ignore OS color scheme
    >
      {children}
    </ThemeProvider>
  );
}
