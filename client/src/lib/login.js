import { writable } from "svelte/store";

export const mussetoken = writable("");

/**
 * Handler for when login-request returns no errors.
 * @param {Response} response - The response object returned by fetch() in login().
 */
async function loginNoError(response){
    if (response.status == 200) {
        const json = await response.json();
        const token = json.access_token;
        const token_type = json.token_type;
        
        if(token && token !== "" && token_type === "bearer"){  // TODO: This is not a great check.
            const logged_in = storeToken(token);
            return logged_in;
        }

    } else if (response.status == 401) {
        alert("Feil brukernavn eller passord.");
        return false;
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

        const loginSucces = await loginNoError(response);
        return loginSucces;

    }
    catch(error){
        alert("En feil oppstod. Vennligst prøv igjen.");
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

export function deleteToken() {
    mussetoken.set("");
}

export function isLoggedIn() {
    const t = mussetoken;
    return t ? true : false;
}
