import { login_reset } from "../lib/login.js";
/**
 * Signs out the user by removing the token from localStorage.
 */
export function logOut(){
    login_reset();
}