/**
 * Checks if the email is valid.
 * @param {string} email - The email to be checked.
 */
export function checkEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Checks if the password and repeated password match. Returns true if they match, otherwise returns false.
 * @param {string} password - The password to be checked.
 */
export function checkPasswordMatch(password, rPassword) {
    return password && rPassword && password == rPassword;
}

/**
 * Checks if the password is strong enough. Returns true if it is strong enough, otherwise returns false.
 * @param {string} password - The password to be checked.
 */
export function checkPasswordStrength(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    return passwordRegex.test(password);
}

/**
 * Performs register-request to the server. Returns true if successful, otherwise returns false.
 * @param {string} url - The url to the server (backend-endpoint for register).
 * @param {string} email - The email of the new user.
 * @param {string} password - The password of the new user.
 */
export async function register(url, email, password){
    const data = JSON.stringify({email: email, password: password});

    return fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: data
    }).then(response => {
        if (response.status == 200) {
            alert("Registrering fullført!")
            return true;
        } else if (response.status == 409) {
            alert("En bruker med denne e-postadressen eksisterer allerede.");
        }
    })
    .catch(error => {
    
    });

alert("En feil oppstod. Vennligst prøv igjen.");
return false;

}
