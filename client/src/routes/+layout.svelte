<script>
  import "../app.postcss";
  import Navbar from "../components/navbar.svelte";
  import NotLoggedInnNav from "../components/NavbarNotLoggedIn.svelte";
  
  import { mussetoken } from "../lib/login";
  
  let token = "";
  let logged_in = false;

  // Only set token in local storage if in browser:
  if(typeof window !== "undefined"){
    const t = localStorage.getItem("mussetoken");
    if(t && typeof(t) == "string" && t.length > 0){
      token = t;
      logged_in = token.length > 0;
    }
  }

  // Set value of token and loggged_in when token changes:
  mussetoken.subscribe((t) => {
    if(t && typeof(t) == "string" && t.length > 0){
      token = t;
      logged_in = token.length > 0;
    }
	});

</script>

{#if logged_in}
  <Navbar />
{:else}
  <NotLoggedInnNav />
{/if}
<slot />
