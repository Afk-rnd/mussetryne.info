<script>
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownSolid } from "flowbite-svelte-icons";
  import Splash from "../components/splash.svelte";
  import { currently_logged_in } from "../lib/login";
  import ProfilePicture from "../components/ProfilePicture.svelte";
  import { LOGGED_IN_BOOLEAN_STORE_KEY } from "../lib/constants";
  import LoggedInSlot from "../components/LoggedInSlot.svelte";

  const get_bucket_users = () => {
    return ["Alex", "chris", "morten"];
  };

  let logged_in = false;

  // Only set token in local storage if in browser:
  if(typeof window !== "undefined"){
    const l = localStorage.getItem(LOGGED_IN_BOOLEAN_STORE_KEY);
    if(l && typeof(l) == "boolean"){
      logged_in = l;
    }
  }

  currently_logged_in.subscribe((t) => {
    if(typeof(t) == "boolean"){
      logged_in = t;
    }
  });

</script>

<LoggedInSlot>
  <div class="content-center" slot="logged_in">
    <Button
      >Gi straffefisk til<ChevronDownSolid
        class="w-3 h-3 ml-2 text-white dark:text-white"
      /></Button
    >
    <Dropdown class="w-48 overflow-y-auto py-1 h-48">
      {#each get_bucket_users() as user}
        <DropdownItem class="flex items-center text-base font-semibold gap-2">
          <ProfilePicture user_email={user}></ProfilePicture>
        </DropdownItem>
      {/each}
    </Dropdown>
  </div>

  <div class="w-screen" slot="not_logged_in">
    <Splash />
  </div>
</LoggedInSlot>
