<script>
    import { Avatar } from "flowbite-svelte";
    import {currently_logged_in} from "../lib/login.js";
    import { authenticatedGetRequest } from "../lib/authenticated.js";
    import { VolumeDownOutline } from "flowbite-svelte-icons";
    import LoggedInSlot from "./LoggedInSlot.svelte";

    export let id = "";
    export let user_email = "";

    let profile_picture = null;
    let logged_in = false;

    async function get_profile_picture(){
        console.log("Getting profile picture");
        profile_picture = await authenticatedGetRequest(
            "http://localhost:42069/profile_picture",
            `user_email=${user_email}`
        );
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
                console.log("Got profile picture");
            })
        };
    });

    if (typeof window !== "undefined") {
        const l = localStorage.getItem("currently_logged_in");
        if (l && typeof l === "boolean") {
            logged_in = l;
            if (logged_in) {
                get_profile_picture().then(() => {
                    console.log("Got profile picture");
                })
            }
        }
    }

</script>

<LoggedInSlot>
    <div slot="logged_in">
        <Avatar id={id} src="{profile_picture}"/>
    </div>
    <div slot="not_logged_in">
        <Avatar id={id} src="https://img.freepik.com/free-vector/anonymous-avatars-grey-circles_78370-2086.jpg?w=740&t=st=1697408450~exp=1697409050~hmac=cf71a368cb3f3e1e4b3ef4772b9022aed60414318e5da47f61006ad8320e91fd"/>
    </div>
</LoggedInSlot>
