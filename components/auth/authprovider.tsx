import React, { useEffect, useState } from "react"
import { Auth } from "./auth"
import { IUser } from "../../helpers/interfaces";
// import { Auth, User } from "../../helpers/auth"
// import { Auth, User } from "auth"

const auth = new Auth() // singleton

const redirectKey = "sign_in_redirect"

export interface IUseAuth {
  auth: Auth;
  initializing: boolean;
  user: IUser | null;
  error: {
      message: string;
  };
  setRedirect: (redirect: string) => void;
  getRedirect: () => string | null;
  clearRedirect: () => void;
}

export const AuthContext = React.createContext<
  | {
      auth: Auth
      initializing: boolean
      user: IUser | null
      error: { message: string }
      setRedirect: (redirect: string) => void
      getRedirect: () => string
      clearRedirect: () => void
    }
  | undefined
>(undefined)

AuthContext.displayName = "AuthContext";

function setRedirect(redirect: string) {
  window.sessionStorage.setItem(redirectKey, redirect)
}

function getRedirect(): string {
  let redirect = window.sessionStorage.getItem(redirectKey);
  if(redirect){
    return redirect;
  } else {
    return '/trade'
  }
  // return window.sessionStorage.getItem(redirectKey) ? window.sessionStorage.getItem(redirectKey) : '/trade';
}

function clearRedirect() {
  return window.sessionStorage.removeItem(redirectKey)
}
export function useAuth() {
  const auth = React.useContext(AuthContext)

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return auth
}

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<IUser | null>(null)
  const [error, setError] = useState<{ message: string } | null>(null)
  const [initializing, setInitializing] = useState(true)

  /*
    NOTICE: this is not production ready code!
    just a quick demo of resolving the initial user
  */
  useEffect(() => {
    auth.resolveUser(0.001).onAuthStateChanged((user: IUser | null, error) => {
      // 
      if (user) {
        setUser(user)
        setError(null)
      } else {
        setUser(null)
        if (error) {
          setError(error)
        }
      }
      setInitializing(false)
    })
  }, [])
  const value: any = {
    user,
    error,
    auth,
    initializing,
    setRedirect,
    getRedirect,
    clearRedirect,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
