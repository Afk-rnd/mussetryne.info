<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    DropdownDivider,
  } from "flowbite-svelte";

  import { logOut } from "../lib/logout.js";
  import { Button, ButtonGroup } from "flowbite-svelte";
  import ProfilePicture from "./ProfilePicture.svelte";

  const handle_click = () => {
    location.href = "/straffefisk";
  };

  const handle_logout = () => {
    logOut();

    console.log("logging out")

    if (typeof(window) !== "undefined" && window !== null){
        localStorage.setItem("mussetoken", "");
        localStorage.setItem("currently_logged_in", "false");
    }

    if (window.location.href !== "http://localhost:5173/"){
        window.location.href = "/";
        return;
    }

    location.reload();
  };

  function logOutRedirect(){
      
  }

</script>

<Navbar>
  <NavBrand href="/">
    <img
      src="https://mussetryne.info/resources/logo.png"
      class="mr-3 h-16 sm:h-22"
      alt="Flowbite Logo"
    />
    <span
      class="self-center font-semibold dark:text-white"
      style="font-size: 10px;"
      >Opplysningssenteret for<br />Medisinsk <br /> Mussetryne</span
    >
  </NavBrand>
  <div class="flex items-center md:order-2">
    <ProfilePicture id="avatar-menu" />
    <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <span class="block text-sm">AFK NORMANN</span>
      <span class="block truncate text-sm font-medium">afk@mussetryne.info</span
      >
    </DropdownHeader>
    <DropdownItem>Dashboard</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem on:click={handle_click}>Straffefisk</DropdownItem>
    <DropdownDivider />
    <DropdownItem on:click={handle_logout}>Sign out</DropdownItem>
  </Dropdown>
  <NavUl>
    <NavLi href="/" active={true}>Hjem</NavLi>
    <NavLi href="/about">Om oss</NavLi>
    <NavLi href="/contact">Kontakt</NavLi>
  </NavUl>
</Navbar>
