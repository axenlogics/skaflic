// const { auth, initializing, getRedirect, clearRedirect, user, error } =
//     useAuth()
/* eslint-disable react/display-name */
import { useAuth } from "./authprovider"

const withAuth = (Component: any) => (props: any) => {

    const session = useAuth();

    // const session = useSession();
    // const Auth = useAuth()

    // if the component has a render property, we are good
    if (Component.prototype.render) {
        return <Component session={session} {...props} />
    }
    // if the passed component is a function component, there is no need for this wrapper
    throw new Error(
        [
            "You passed a function component, `WithAuth` is not needed.",
            "You can `useSession` directly in your component.",
        ].join("\n")
    )
}
export default withAuth;