<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    DropdownDivider,
  } from "flowbite-svelte";

  import { logOut } from "../lib/logout.js";
  import LoggedInSlot from "./LoggedInSlot.svelte";
  import ProfilePicture from "./ProfilePicture.svelte";
  import NavBarNotLoggedIn from "./NavbarNotLoggedIn.svelte";
  import { currently_logged_in_user } from "../lib/login.js";

  const handle_straffefisk_redirect = () => {
    location.href = "/straffefisk";
  };

  const handle_settings_redirect = () => {
    location.href = "/settings";
  };

  const handle_logout = () => {
    logOut();

    if (window.location.href !== "http://localhost:5173/"){
        window.location.href = "/";
        return;
    }

    location.reload();
  };
  
  let user_email = "";

  currently_logged_in_user.subscribe((t) => {
    if (typeof t === "string") {
      user_email = t;
    }
  });
  

  if (typeof window !== "undefined") {
    const l = localStorage.getItem("currently_logged_in_user");
    if (l && typeof l === "string") {
      user_email = l;
    }
  }

</script>

<LoggedInSlot>
  <div slot="logged_in">
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
          <div id="avatar-menu">
            <ProfilePicture user_email={$currently_logged_in_user} />
          </div>
          <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
      </div>
      <Dropdown placement="bottom" triggeredBy="#avatar-menu">
          <DropdownHeader>
          <span class="block text-sm">{user_email}</span>
          <span class="block truncate text-sm font-medium">{user_email}</span
          >
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem on:click={handle_settings_redirect}>Innstillinger</DropdownItem>
          <DropdownItem on:click={handle_straffefisk_redirect}>Straffefisk</DropdownItem>
          <DropdownDivider />
          <DropdownItem on:click={handle_logout}>Sign out</DropdownItem>
      </Dropdown>
      <NavUl>
          <NavLi href="/" active={true}>Hjem</NavLi>
          <NavLi href="/about">Om oss</NavLi>
          <NavLi href="/contact">Kontakt</NavLi>
      </NavUl>
  </Navbar>
  </div>
  <div slot="not_logged_in">
    <NavBarNotLoggedIn />
  </div>
</LoggedInSlot>
