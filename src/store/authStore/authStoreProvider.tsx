'use client';

import AuthStore from "./authStore";
import { AuthStoreContext } from "./authStore";



export default function AuthStoreProvider({ children }: {children: React.ReactNode}) {
  return (
    <AuthStoreContext.Provider value={new AuthStore()}>
      {children}
    </AuthStoreContext.Provider>
  );
}