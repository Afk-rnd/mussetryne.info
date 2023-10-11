
import { writable } from "svelte/store";

export const mussetoken = writable();
/**
 * Performs login-request to the server. Returns the token if successful, otherwise returns an empty string.
 * @param {string} url - The url to the server (backend-endpoint for login).
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */
export async function login(url, email, password){
    const data = JSON.stringify({email: email, password: password});
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    }).then(response => {
        console.log(response.status);
        if (response.status == 200) {
            // alert("Du er nå logget inn!")
            return response.json().then(data => {return data.access_token});
        } else if (response.status == 401) {
            alert("Feil brukernavn eller passord.");
            return "";
        }
    }).catch(error => {
        
    });

    alert("En feil oppstod. Vennligst prøv igjen.");
    return "";

}

/**
 * Stores the token in the local storage. Returns true if successful, otherwise returns false.
 * @param {string} token - The token to be stored.
 */
export function storeToken(token) {
    if (token) {
        mussetoken.set(token)
        // alert("Du er nå logget inn!")
        return true;
    }
    return false;
}

export function isLoggedIn() {
    const t = mussetoken;
    return t ? true : false;
}
