import { ApiCall } from "../../helpers/apicall"
import { IUser } from "../../helpers/interfaces"
import { User } from "../../models/user"
import { store } from "../../redux/Store"

export type UserCB = (user: IUser | null, error: any) => void

// const userEmail = `admin@example.com`
// const userPassword = "admin123"
const temp = { email: 'skaflic@gmail.com', password: '123' }
// export type User = IUser

export class Auth {
  user: IUser | null
  key: string = 'userInfo'

  error: { message: string } | null

  cb: UserCB | null = null;

  constructor() {

    this.user = null
    this.error = null
  }

  onAuthStateChanged(cb: UserCB) {
    this.cb = cb

    return () => {
      this.cb = null
    }
  }

  protected onUserChange(user: IUser | null, error?: { message: string }) {
    this.cb && this.cb(user, error)
  }

  async logInNow(modal: any) {
    let resp = await ApiCall.getInstance().post('account/login', modal, true);
    if (resp !== false) {
      this.user = resp
      
      User.getInstance().save(resp);
      User.getInstance().loadData();
      store.dispatch({ type: 'ISLOGGED_IN', payload: true });

      this.onUserChange(this.user);
      return true;
      // resolve(this.user);
    } else {
      return false;
    }
    // })
  }
  async UpdateUser(user: string) {
    window.localStorage.setItem(this.key, (user))
  }
  async signOut() {
    // 
   let resp = await ApiCall.getInstance().postAuth('account/logout', {logout:1}, false);
    if(resp !== false){
      window.localStorage.removeItem(this.key);
      this.user = null;
      store.dispatch({ type: 'ISLOGGED_IN', payload: false });
      this.onUserChange(this.user);
      User.getInstance().loadData();  
    }
  }

  resolveUser(timeout: number) {
    setTimeout(() => {
      if (window) {
        const signedInUser = window.localStorage.getItem(this.key)
        if (signedInUser && signedInUser !== 'undefined') {
          this.user = JSON.parse(signedInUser)
        }
      } else {
        this.user = null
      }
      this.onUserChange(this.user)
    }, timeout)

    return this
  }
}
