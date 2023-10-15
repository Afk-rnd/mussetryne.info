import { deleteToken } from "../lib/login.js";
/**
 * Signs out the user by removing the token from localStorage.
 */
export function logOut(){
    // console.log("signing out");
    deleteToken();
}