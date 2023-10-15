<script>
    import { Avatar } from "flowbite-svelte";
    import {currently_logged_in} from "../lib/login.js";
    import { authenticatedGetRequest } from "../lib/authenticated.js";

    export let id = "";

    let profile_picture = null;
    let logged_in = false;

    currently_logged_in.subscribe((t) => {
        if (typeof t === "boolean") {
        logged_in = t;
        if (logged_in) {
            profile_picture = authenticatedGetRequest(
            "http://localhost:42069/profile_picture",
            `id=${id}`
            );
            console.log(profile_picture);
        }
        }
    });

    if (typeof window !== "undefined") {
        const l = localStorage.getItem("currently_logged_in");
        if (l && typeof l === "boolean") {
        logged_in = l;
        }
    }

</script>

{#if logged_in}
    <Avatar id={id} src="https://mussetryne.info/resources/avatars/default.png"/>
{:else}
    <Avatar id={id} src="https://mussetryne.info/resources/avatars/default.png"/>
{/if}
