<script>
  import "../app.postcss";
  import Navbar from "../components/navbar.svelte";
  import NotLoggedInnNav from "../components/NavbarNotLoggedIn.svelte";
  export let logged_on = false;
</script>

{#if logged_on}
  <Navbar />
{:else}
  <NotLoggedInnNav />
{/if}
<slot />
