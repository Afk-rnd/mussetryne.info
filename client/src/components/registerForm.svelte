<script>

    import { login } from "../lib/login.js";"";
    import { register, checkPasswordStrength, checkEmailValid, checkPasswordMatch } from "../lib/register.js";

    // Define urls:
    export let register_url = "";
    export let login_url = "";
    

    // Verify passwords are the same and strong enough:

    let password = "";
    let rPassword = "";
    let passwordMatch = false;
    let isPasswordStrong = true;


    // Verify email is valid:

    let email = "";
    let isEmailValid = true;

    isEmailValid = checkEmail(email);


    /**
     * Handle form submission and register user.
     * @param event - Event object from user submitting form.
     */
    async function handleSubmit(event){
        event.preventDefault();

        if (isEmailValid && isPasswordStrong && passwordMatch) {
            let registered = await register(register_url, email, password);
            if (registered){
                const token = await login(login_url, email, password);

                if (token){
                    localStorage.setItem("mussetoken", token);
                    window.location.href = "/registered";
                }

            }
        }
    }

    /**
     * Helper-function to check if password is strong enough.
     * Updates local variables isPasswordStrong and passwordMatch.
    */
    function checkPassword(){
        isPasswordStrong = checkPasswordStrength(password);
        passwordMatch = checkPasswordMatch(password, rPassword);
    }

    /**
     * Helper-function to check if email is valid.
     * Updates local variable isEmailValid.
    */
    function checkEmail(){
        isEmailValid = checkEmailValid(email);
    }

</script>


<!-- Registration form -->
<form method="POST" action="localhost:42069/register" on:submit={handleSubmit}>

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
        <input bind:value={password} type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required on:change={checkPassword}>
    </div>
    {#if password && !isPasswordStrong}
        <p class="text-red-500 text-sm mt-1">Passordet må være minst 8 tegn langt, og inneholde minst en stor bokstav, en liten bokstav og et tall.</p>
    {/if}

    <!-- Repeat Password -->
    <div class="mb-6">
        <label for="r_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gjenta Passord</label>
        <input bind:value={rPassword} type="password" id="r_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required on:change={checkPassword}>
    </div>
    {#if password && !passwordMatch}
        <p class="text-red-500 text-sm mt-1">Passordene er ikke like.</p>
    {/if}

    <!-- Button -->
    {#if isEmailValid && passwordMatch && isPasswordStrong}
        <button type="submit" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" >Registrer deg</button>
        {:else}
        <button type="submit" class="cursor-not-allowed py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-dark-gray rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center" disabled><s>Registrer deg</s></button>
    {/if}

</form>
