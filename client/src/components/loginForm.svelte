<script>
    import { login, mussetoken, login_set } from "../lib/login.js";
    import { checkEmailValid } from "../lib/register.js";


    export let url = "";    // Define URL to send login request to:


    // Verify email is valid:

    let email = "";
    let isEmailValid = false;

    function checkEmail() {
        isEmailValid = checkEmailValid(email);
    }
    
    // Log-in user:

    let password = "";

    /**
     * Handle form submission and log-in user.
     * Performs no validation, as this is done in the form.
     * Login-request is sent to server, and token is stored in local storage.
     * @param event - Event object from user submitting form.
     */
    async function handleSubmit(event) {
        event.preventDefault();
        if (isEmailValid) {
            try{
                const login_details = await login(url, email, password);
                const logged_in = await login_set(login_details);
                if(logged_in){
                    window.location.href = "/";
                }
            }   
            catch (e){
                console.log(e);
            }
        }
    }

    mussetoken.subscribe(token => {

    });

</script>




<!-- Login-form -->
<form method="POST" action="localhost:42069/login" on:submit={handleSubmit}>
    
    <!-- Email -->
    <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Epostadresse</label>
        <input bind:value={email} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="navn@mussetryne.info" required on:change={checkEmail}>
        {#if email && !isEmailValid}
            <p class="text-red-500 text-sm mt-1">Vennligst skriv inn en gyldig e-postadresse.</p>
        {/if}
    </div>

    <!-- Password -->
    <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passord</label>
        <input bind:value={password} type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    </div>

    <!-- Button -->
    <button type="submit" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" >Logg inn</button>

</form>
