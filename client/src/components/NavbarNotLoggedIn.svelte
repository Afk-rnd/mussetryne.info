<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Button,
  } from "flowbite-svelte";

  const handle_register_redirect = () => {
    location.href = "/register";
  };
</script>

<Navbar>
  <NavBrand href="/">
    <img src="images/logo.png" class="mr-3 h-16 sm:h-22" alt="Flowbite Logo" />
    <span
      class="self-center font-semibold dark:text-white"
      style="font-size: 10px;"
      >Opplysningssenteret for<br />Medisinsk <br /> Mussetryne</span
    >
  </NavBrand>
  <div class="flex md:order-2">
    <Button size="sm" on:click={handle_register_redirect}>Bli medlem!</Button>
    <NavHamburger />
  </div>
  <NavUl class="order-1 justify-end">
    <NavLi href="/" active={true}>Hjem</NavLi>
    <NavLi href="/about">Om oss</NavLi>
    <NavLi href="/login">Logg inn</NavLi>
  </NavUl>
</Navbar>
