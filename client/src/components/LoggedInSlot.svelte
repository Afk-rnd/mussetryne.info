<script>
    import { currently_logged_in } from "../lib/login.js";
    import { LOGGED_IN_BOOLEAN_STORE_KEY } from "../lib/constants.js";

    let logged_in = false;

    currently_logged_in.subscribe((t) => {
        if (typeof t == "boolean") {
        logged_in = t;
        }
        else if (typeof t == "string"){
        logged_in = t === "true";
        }
    
    });

    if (typeof window !== "undefined") {
        const l = localStorage.getItem(LOGGED_IN_BOOLEAN_STORE_KEY);
        if (l && typeof l == "boolean"){
            logged_in = true;
        }
        else if(typeof(l) == "string" && l == "true") {
            logged_in = true;
        }
    }
    
</script>

{#if logged_in}
    <slot name="logged_in"></slot>
{:else}
    <slot name="not_logged_in"></slot>
{/if}
