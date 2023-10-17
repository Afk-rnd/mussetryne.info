import { writable } from "svelte/store";
import { LOGGED_IN_BOOLEAN_STORE_KEY, LOGGED_IN_USER_STORE_KEY, MUSSE_TOKEN_STORE_KEY } from "./constants.js";

export const mussetoken = writable("");
export const currently_logged_in = writable(false);
export const currently_logged_in_user = writable("");

export const login_set = async (loginDetails) => {
    console.log("currently logged in: " + loginDetails.currently_logged_in)
    console.log("user: " + loginDetails.currently_logged_in_user)
    console.log("token: " + loginDetails.token)
    console.log("loginObject: " + loginDetails)
    currently_logged_in.set(loginDetails.currently_logged_in);
    currently_logged_in_user.set(loginDetails.currently_logged_in_user);
    mussetoken.set(loginDetails.token);

    if (typeof window !== "undefined") {
        localStorage.setItem(LOGGED_IN_BOOLEAN_STORE_KEY, loginDetails.currently_logged_in)
        localStorage.setItem(LOGGED_IN_USER_STORE_KEY, loginDetails.currently_logged_in_user)
        localStorage.setItem(MUSSE_TOKEN_STORE_KEY, loginDetails.token)
    }

    return loginDetails.currently_logged_in;
  };
  
  export const login_reset = () => {
    currently_logged_in.set(false);
    currently_logged_in_user.set("");
    mussetoken.set("");
    if (typeof window !== "undefined") {
        localStorage.setItem(LOGGED_IN_BOOLEAN_STORE_KEY, "false")
        localStorage.setItem(LOGGED_IN_USER_STORE_KEY, "")
        localStorage.setItem(MUSSE_TOKEN_STORE_KEY, "")
    }
  };

/**
 * Handler for when login-request returns no errors.
 * @param {Response} response - The response object returned by fetch() in login().
 */
async function loginNoError(response){
    if (response.status == 200) {
        const json = await response.json();
        const token = json.access_token;
        const token_type = json.token_type;
        const user_email = json.user_email;
        console.log(json);
        
        if(token && token !== "" && token_type === "bearer"){  // TODO: This is not a great check.
            return {token: token, currently_logged_in: true, currently_logged_in_user: user_email};
        }

    } else if (response.status == 401) {
        alert("Feil brukernavn eller passord.");
        return {token: "", currently_logged_in: false, currently_logged_in_user: ""};
    }
}

/**
 * Performs login-request to the server. Returns the token if successful, otherwise returns an empty string.
 * @param {string} url - The url to the server (backend-endpoint for login).
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */
export async function login(url, email, password){
    const data = JSON.stringify({email: email, password: password});
    
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "localhost:42069"
            },
            body: data,
            mode: "cors",
            credentials: "include"
        });

        const loginDetails = await loginNoError(response);
        return loginDetails

    }
    catch(error){
        alert("En feil oppstod. Vennligst prøv igjen.");
        console.log(error);
        return false;
    }

}

/**
 * Stores the token in the local storage. Returns true if successful, otherwise returns false.
 * @param {string} token - The token to be stored.
 */
export function storeToken(token) {
    if (token) {
        // alert("Storing token: " + token)
        mussetoken.set(token);
        // alert("Du er nå logget inn!")
        return true;
    }
    return false;
}

export function isLoggedIn() {
    const t = mussetoken;
    return t ? true : false;
}
