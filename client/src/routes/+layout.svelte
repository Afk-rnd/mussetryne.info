<script>
  import "../app.postcss";
  import Navbar from "./navbar.svelte";
  import NotLoggedInnNav from "../components/NavbarNotLoggedIn.svelte";
  export let logged_on = false;
  import Navbar from "../components/navbar.svelte";
</script>

{#if logged_on}
  <Navbar />
{:else}
  <NotLoggedInnNav />
{/if}
<slot />
