<script>
  import "../app.postcss";
  import Navbar from "../components/navbar.svelte";
  import NotLoggedInnNav from "../components/NavbarNotLoggedIn.svelte";
  
  import { currently_logged_in, mussetoken } from "../lib/login";
  
  let token = "";
  let logged_in = false;

  // Only set token in local storage if in browser:
  if(typeof window !== "undefined"){
    const t = localStorage.getItem("mussetoken");
    if(t && typeof(t) == "string" && t.length > 0){
      token = t;
      logged_in = token.length > 0;
    }

    const l = localStorage.getItem("currently_logged_in");
    if(l && typeof(l) == "string" && l.length > 0){
      logged_in = l == "true";
    }
  }

  // Set value of token and loggged_in when token changes:
  mussetoken.subscribe((t) => {
    if(t && typeof(t) == "string" && t.length > 0){
      token = t;
      logged_in = token.length > 0;
    }
	});

  currently_logged_in.subscribe((t) => {
    if(t && typeof(t) == "boolean"){
      logged_in = t;
    }
  });

</script>

{#if logged_in}
  <Navbar />
{:else}
  <NotLoggedInnNav />
{/if}
<slot />
