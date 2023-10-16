<script>
    import { currently_logged_in } from "../../lib/login.js";
    console.log('isAuthenticated value:', $currently_logged_in);
  </script>

{#if $currently_logged_in}
  logged_in
{:else}
  <a href="/login">Login</a>
{/if}