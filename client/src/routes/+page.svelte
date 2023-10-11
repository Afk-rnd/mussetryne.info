<script>
  import { Button, Dropdown, DropdownItem, Avatar } from "flowbite-svelte";
  import { ChevronDownSolid } from "flowbite-svelte-icons";
  import Splash from "../components/splash.svelte";
  const get_bucket_users = () => {
    return ["Alex", "chris", "morten"];
  };
  export let logged_in = false;
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
  <div class="flex items-center justify-center w-screen">
    <Splash />
  </div>
{/if}
