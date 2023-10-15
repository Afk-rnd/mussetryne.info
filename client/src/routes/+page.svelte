<script>
  import { Button, Dropdown, DropdownItem, Avatar } from "flowbite-svelte";
  import { ChevronDownSolid } from "flowbite-svelte-icons";
  import Splash from "../components/splash.svelte";
  import { mussetoken } from "../lib/login";
  const get_bucket_users = () => {
    return ["Alex", "chris", "morten"];
  };
  export let logged_in = false;

  let token = "";

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
  <div class="content-center">
    <Button
      >Gi straffefisk til<ChevronDownSolid
        class="w-3 h-3 ml-2 text-white dark:text-white"
      /></Button
    >
    <Dropdown class="w-48 overflow-y-auto py-1 h-48">
      {#each get_bucket_users() as user}
        <DropdownItem class="flex items-center text-base font-semibold gap-2">
          <Avatar src="/images/profile-picture-1.webp" size="xs" />{user}
        </DropdownItem>
      {/each}
    </Dropdown>
  </div>
{:else}
  <div class="w-screen">
    <Splash />
  </div>
{/if}
