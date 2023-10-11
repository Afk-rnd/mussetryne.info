import { mussetoken } from "../lib/login.js";
/**
 * Signs out the user by removing the token from localStorage.
 */
export function logOut(){
    // console.log("signing out");
    const token = localStorage.getItem("mussetoken");
    if(token){
        localStorage.removeItem("mussetoken");
    }
}