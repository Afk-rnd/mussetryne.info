<script>
    import { Badge } from "flowbite-svelte";
    import { authenticatedGetRequest } from "../lib/authenticated";
    import { currently_logged_in } from "../lib/login";

    let confirmed = false;
    let user_email = "";

    async function check_if_approved() {
        const resp = await authenticatedGetRequest("http://localhost:42069/users/me/approved");
        if(resp) {
            confirmed = resp.approved > 0;
        }
    }

    currently_logged_in.subscribe((t) => {
        if (typeof t === "string") {
            user_email = t;
            if(user_email.length > 0) {
                check_if_approved();
            }
        }
    });

    if(typeof window !== "undefined") {
        const l = localStorage.getItem("logged_in_user");
        if(l && typeof l === "string") {
            user_email = l;
            if(user_email.length > 0) {
                check_if_approved();
            }
        }
    }

</script>

<h1>Brukergodkjenning</h1>

<p>Her kan du se om ditt mussetryne er godkjent.</p>

{#if confirmed}
    <Badge color="green">Godkjent mussetryne!</Badge>
{:else}
    <Badge color="red">Mussetryne ikke godkjent.</Badge>
{/if}
