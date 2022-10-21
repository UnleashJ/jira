import { ReactNode } from "react";
import { AuthProvider } from "./auto-context";

export const AppProviders = ({children}:{children: ReactNode}) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}