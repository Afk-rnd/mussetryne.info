import { c as create_ssr_component, f as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
function checkEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
const RegisterForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { register_url = "" } = $$props;
  let { login_url = "" } = $$props;
  let password = "";
  let rPassword = "";
  let passwordMatch = false;
  let isPasswordStrong = true;
  let email = "";
  let isEmailValid = true;
  isEmailValid = checkEmail();
  function checkEmail() {
    isEmailValid = checkEmailValid(email);
  }
  if ($$props.register_url === void 0 && $$bindings.register_url && register_url !== void 0)
    $$bindings.register_url(register_url);
  if ($$props.login_url === void 0 && $$bindings.login_url && login_url !== void 0)
    $$bindings.login_url(login_url);
  return ` <form method="POST" action="localhost:42069/register"> <div class="mb-6"><label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-176mxp">Epostadresse</label> <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="navn@mussetryne.info" required${add_attribute("value", email, 0)}> ${``}</div>  <div class="mb-6"><label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-3or8hc">Passord</label> <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required${add_attribute("value", password, 0)}></div> ${``}  <div class="mb-6"><label for="r_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-1wcls9s">Gjenta Passord</label> <input type="password" id="r_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required${add_attribute("value", rPassword, 0)}></div> ${``}  ${isEmailValid && passwordMatch && isPasswordStrong ? `<button type="submit" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" data-svelte-h="svelte-17ogvho">Registrer deg</button>` : `<button type="submit" class="cursor-not-allowed py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-dark-gray rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center" disabled data-svelte-h="svelte-11mlnwu"><s>Registrer deg</s></button>`}</form>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(RegisterForm, "RegisterForm").$$render(
    $$result,
    {
      register_url: "http://localhost:42069/register",
      login_url: "http://localhost:42069/login"
    },
    {},
    {}
  )}</div>`;
});
export {
  Page as default
};
