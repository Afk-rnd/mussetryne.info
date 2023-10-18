import { c as create_ssr_component, g as subscribe } from "../../../chunks/ssr.js";
import { a as currently_logged_in } from "../../../chunks/login.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currently_logged_in, $$unsubscribe_currently_logged_in;
  $$unsubscribe_currently_logged_in = subscribe(currently_logged_in, (value) => $currently_logged_in = value);
  console.log("isAuthenticated value:", $currently_logged_in);
  $$unsubscribe_currently_logged_in();
  return `${$currently_logged_in ? `logged_in` : `<a href="/login" data-svelte-h="svelte-1vxwqu1">Login</a>`}`;
});
export {
  Page as default
};
