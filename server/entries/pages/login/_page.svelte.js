import { c as create_ssr_component, f as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import { m as mussetoken } from "../../../chunks/login.js";
const LoginForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url = "" } = $$props;
  let email = "";
  let password = "";
  mussetoken.subscribe((token) => {
  });
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  return ` <form method="POST" action="localhost:42069/login"> <div class="mb-6"><label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-176mxp">Epostadresse</label> <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="navn@mussetryne.info" required${add_attribute("value", email, 0)}> ${``}</div>  <div class="mb-6"><label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-3or8hc">Passord</label> <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required${add_attribute("value", password, 0)}></div>  <button type="submit" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" data-svelte-h="svelte-1ojoaqb">Logg inn</button></form>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 data-svelte-h="svelte-1wsy7a9">Login</h1> ${validate_component(LoginForm, "LoginForm").$$render($$result, { url: "http://localhost:42069/login" }, {}, {})}`;
});
export {
  Page as default
};
