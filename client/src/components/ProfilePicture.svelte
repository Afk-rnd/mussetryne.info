<script>
    import { Avatar } from "flowbite-svelte";
    import {currently_logged_in} from "../lib/login.js";
    import { authenticatedGetRequest } from "../lib/authenticated.js";
    import LoggedInSlot from "./LoggedInSlot.svelte";

    export let user_email = "";

    let profile_picture = null;
    let logged_in = false;

    async function get_profile_picture(){
        try{
            const blob = await authenticatedGetRequest(
                "http://localhost:42069/profile_picture",
                `user_email=${user_email}`
            );
            profile_picture = URL.createObjectURL(blob);
        } catch(error){
            console.log(error);
        }
    }
    

    currently_logged_in.subscribe((t) => {
        if (typeof t === "boolean") {
            logged_in = t;
        }
        else if (typeof t === "string") {
            logged_in = t === "true";
        }
        if (logged_in) {
            get_profile_picture().then(() => {
                
            })
        };
    });

    if (typeof window !== "undefined") {
        const l = localStorage.getItem("currently_logged_in");
        if (l && typeof l === "boolean") {
            logged_in = l;
        }
        else if (l && typeof l === "string") {
            logged_in = l === "true";
        }
        if (logged_in) {
            get_profile_picture().then((img) => {

            })
        }
    }

</script>

<LoggedInSlot>
    <Avatar slot="logged_in" src={profile_picture} />
    <Avatar slot="not_logged_in" rounded/>
</LoggedInSlot>
