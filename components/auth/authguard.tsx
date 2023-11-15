// import { useAuth } from "components/AuthProvider"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "./authprovider";
import Image from 'next/image';


export function AuthGuard({ children }: { children: JSX.Element }) {
  const { user, initializing, setRedirect } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!initializing) {
      //auth is initialized and there is no user
      if (!user) {
        // remember the page that user tried to access
        setRedirect(router.route)
        router.push("/login")
      }
    }
  }, [initializing, router, user, setRedirect])

  /* show loading indicator while the auth provider is still initializing */
  if (initializing) {
    return <Image className="loader-center" src="/assets/loaders/loader-fast.svg" alt="Loading..." width={100} height={100} />;
    // return;
  }

  // if auth initialized with a valid user show protected page
  if (!initializing && user) {
    return  <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}
