import { c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_object, d as escape_attribute_value, v as validate_component, f as add_attribute, g as subscribe, s as setContext, h as getContext, i as escape } from "../../chunks/ssr.js";
import { B as Button, D as Dropdown, a as DropdownItem } from "../../chunks/DropdownItem.js";
import { t as twMerge, F as Frame, i as is_void, L as LOGGED_IN_USER_STORE_KEY, a as LoggedInSlot, P as ProfilePicture } from "../../chunks/ProfilePicture.js";
import { w as writable } from "../../chunks/index.js";
import { T as ToolbarButton } from "../../chunks/ToolbarButton.js";
import { c as currently_logged_in_user } from "../../chunks/login.js";
const app = "";
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
const DropdownDivider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["divClass"]);
  let { divClass = "my-1 h-px bg-gray-100 dark:bg-gray-600" } = $$props;
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
    $$bindings.divClass(divClass);
  return `<div${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(divClass, $$props.class))
      }
    ],
    {}
  )}></div> `;
});
const DropdownHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["divClass", "divider"]);
  let { divClass = "py-2 px-4 text-gray-700 dark:text-white" } = $$props;
  let { divider = true } = $$props;
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
    $$bindings.divClass(divClass);
  if ($$props.divider === void 0 && $$bindings.divider && divider !== void 0)
    $$bindings.divider(divider);
  return `<div${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(divClass, $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div> ${divider ? `${validate_component(DropdownDivider, "DropdownDivider").$$render($$result, {}, {}, {})}` : ``} `;
});
const NavContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { fluid = false } = $$props;
  if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0)
    $$bindings.fluid(fluid);
  return `<div${add_attribute("class", twMerge("mx-auto flex flex-wrap justify-between items-center ", fluid ? "w-full" : "container", $$props.class), 0)}>${slots.default ? slots.default({}) : ``}</div> `;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["fluid"]);
  let $hidden, $$unsubscribe_hidden;
  let { fluid = false } = $$props;
  let hidden = writable(true);
  $$unsubscribe_hidden = subscribe(hidden, (value) => $hidden = value);
  setContext("navHidden", hidden);
  let toggle = () => hidden.update((hidden2) => !hidden2);
  if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0)
    $$bindings.fluid(fluid);
  {
    {
      $$restProps.color = $$restProps.color ?? "navbar";
    }
  }
  $$unsubscribe_hidden();
  return `${validate_component(Frame, "Frame").$$render(
    $$result,
    Object.assign({}, { tag: "nav" }, $$restProps, {
      class: twMerge("px-2 sm:px-4 py-2.5 w-full", $$props.class)
    }),
    {},
    {
      default: () => {
        return `${validate_component(NavContainer, "NavContainer").$$render($$result, { fluid }, {}, {
          default: () => {
            return `${slots.default ? slots.default({ hidden: $hidden, toggle, NavContainer }) : ``}`;
          }
        })}`;
      }
    }
  )} `;
});
const NavBrand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href"]);
  let { href = "" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  return `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("flex items-center", $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a> `;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "color", "variation", "ariaLabel"]);
  let { size = "24" } = $$props;
  let { color = "currentColor" } = $$props;
  let { variation = "outline" } = $$props;
  let { ariaLabel = "bars 3" } = $$props;
  let viewBox;
  let svgpath;
  let svgoutline = `<path stroke="${color}" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> `;
  let svgsolid = `<path fill="${color}" clip-rule="evenodd" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path> `;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.variation === void 0 && $$bindings.variation && variation !== void 0)
    $$bindings.variation(variation);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  {
    switch (variation) {
      case "outline":
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
        break;
      case "solid":
        svgpath = svgsolid;
        viewBox = "0 0 24 24";
        break;
      default:
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
    }
  }
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { role: "button" },
      { tabindex: "0" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      {
        class: escape_attribute_value($$props.class)
      },
      escape_object($$restProps),
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { fill: "none" },
      { viewBox: escape_attribute_value(viewBox) },
      { "stroke-width": "2" }
    ],
    {}
  )}><!-- HTML_TAG_START -->${svgpath}<!-- HTML_TAG_END --></svg> `;
});
let btnClass = "ml-3 md:hidden";
const NavHamburger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["menuClass"]);
  let { menuClass = "h-6 w-6 shrink-0" } = $$props;
  getContext("navHidden") ?? writable(true);
  if ($$props.menuClass === void 0 && $$bindings.menuClass && menuClass !== void 0)
    $$bindings.menuClass(menuClass);
  return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name: "Open main menu" }, $$restProps, { class: twMerge(btnClass, $$props.class) }), {}, {
    default: () => {
      return `${validate_component(Menu, "Menu").$$render(
        $$result,
        {
          class: twMerge(menuClass, $$props.classMenu)
        },
        {},
        {}
      )}`;
    }
  })} `;
});
const NavLi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let active;
  let liClass;
  let $$restProps = compute_rest_props($$props, ["href", "activeClass", "nonActiveClass"]);
  let { href = "" } = $$props;
  let { activeClass = void 0 } = $$props;
  let { nonActiveClass = void 0 } = $$props;
  const context = getContext("navbarContext") ?? {};
  const activeUrlStore = getContext("activeUrl");
  let navUrl = "";
  activeUrlStore.subscribe((value) => {
    navUrl = value;
  });
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
    $$bindings.activeClass(activeClass);
  if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0)
    $$bindings.nonActiveClass(nonActiveClass);
  active = navUrl ? href === navUrl : false;
  liClass = twMerge(
    "block py-2 pr-4 pl-3 md:p-0 rounded md:border-0",
    active ? activeClass ?? context.activeClass : nonActiveClass ?? context.nonActiveClass,
    $$props.class
  );
  return `<li>${((tag) => {
    return tag ? `<${href ? "a" : "div"}${spread(
      [
        {
          role: escape_attribute_value(href ? void 0 : "link")
        },
        { href: escape_attribute_value(href) },
        escape_object($$restProps),
        { class: escape_attribute_value(liClass) }
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "div")}</li> `;
});
const NavUl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "activeUrl",
    "divClass",
    "ulClass",
    "hidden",
    "slideParams",
    "activeClass",
    "nonActiveClass"
  ]);
  let $hiddenStore, $$unsubscribe_hiddenStore;
  const activeUrlStore = writable("");
  let { activeUrl = "" } = $$props;
  let { divClass = "w-full md:block md:w-auto" } = $$props;
  let { ulClass = "flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium" } = $$props;
  let { hidden = void 0 } = $$props;
  let { slideParams = {
    delay: 250,
    duration: 500,
    easing: quintOut
  } } = $$props;
  let { activeClass = "text-white bg-primary-700 md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-600 md:dark:bg-transparent" } = $$props;
  let { nonActiveClass = "text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" } = $$props;
  setContext("navbarContext", { activeClass, nonActiveClass });
  setContext("activeUrl", activeUrlStore);
  let hiddenStore = getContext("navHidden");
  $$unsubscribe_hiddenStore = subscribe(hiddenStore, (value) => $hiddenStore = value);
  let _hidden;
  let _divClass;
  let _ulClass;
  if ($$props.activeUrl === void 0 && $$bindings.activeUrl && activeUrl !== void 0)
    $$bindings.activeUrl(activeUrl);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
    $$bindings.divClass(divClass);
  if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0)
    $$bindings.ulClass(ulClass);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0)
    $$bindings.hidden(hidden);
  if ($$props.slideParams === void 0 && $$bindings.slideParams && slideParams !== void 0)
    $$bindings.slideParams(slideParams);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
    $$bindings.activeClass(activeClass);
  if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0)
    $$bindings.nonActiveClass(nonActiveClass);
  {
    {
      activeUrlStore.set(activeUrl);
    }
  }
  _hidden = hidden ?? $hiddenStore ?? true;
  _divClass = twMerge(divClass, $$props.class);
  _ulClass = twMerge(
    ulClass,
    // 'divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700',
    $$props.classUl
  );
  $$unsubscribe_hiddenStore();
  return `${!_hidden ? `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(_divClass) },
      { role: "button" },
      { tabindex: "0" }
    ],
    {}
  )}>${validate_component(Frame, "Frame").$$render(
    $$result,
    {
      tag: "ul",
      border: true,
      rounded: true,
      color: "navbarUl",
      class: _ulClass
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}</div>` : `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(_divClass) },
      { hidden: _hidden || null }
    ],
    {}
  )}><ul${add_attribute("class", _ulClass, 0)}>${slots.default ? slots.default({}) : ``}</ul></div>`} `;
});
const NavbarNotLoggedIn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(NavBrand, "NavBrand").$$render($$result, { href: "/" }, {}, {
        default: () => {
          return `<img src="https://mussetryne.info/resources/logo.png" class="mr-3 h-16 sm:h-22" alt="Flowbite Logo"> <span class="self-center font-semibold dark:text-white" style="font-size: 10px;" data-svelte-h="svelte-r8i0gv">Opplysningssenteret for<br>Medisinsk <br> Mussetryne</span>`;
        }
      })} <div class="flex md:order-2">${validate_component(Button, "Button").$$render($$result, { size: "sm" }, {}, {
        default: () => {
          return `Bli medlem!`;
        }
      })} ${validate_component(NavHamburger, "NavHamburger").$$render($$result, {}, {}, {})}</div> ${validate_component(NavUl, "NavUl").$$render($$result, { class: "order-1 justify-end" }, {}, {
        default: () => {
          return `${validate_component(NavLi, "NavLi").$$render($$result, { href: "/", active: true }, {}, {
            default: () => {
              return `Hjem`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/about" }, {}, {
            default: () => {
              return `Om oss`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/login" }, {}, {
            default: () => {
              return `Logg inn`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
const Navbar_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currently_logged_in_user, $$unsubscribe_currently_logged_in_user;
  $$unsubscribe_currently_logged_in_user = subscribe(currently_logged_in_user, (value) => $currently_logged_in_user = value);
  let user_email = "";
  currently_logged_in_user.subscribe((t) => {
    if (typeof t === "string") {
      user_email = t;
    }
  });
  if (typeof window !== "undefined") {
    const l = localStorage.getItem(LOGGED_IN_USER_STORE_KEY);
    if (l && typeof l === "string") {
      user_email = l;
    }
  }
  $$unsubscribe_currently_logged_in_user();
  return `${validate_component(LoggedInSlot, "LoggedInSlot").$$render($$result, {}, {}, {
    not_logged_in: () => {
      return `${validate_component(NavbarNotLoggedIn, "NavBarNotLoggedIn").$$render($$result, { slot: "not_logged_in" }, {}, {})}`;
    },
    logged_in: () => {
      return `${validate_component(Navbar, "Navbar").$$render($$result, { slot: "logged_in" }, {}, {
        default: () => {
          return `${validate_component(NavBrand, "NavBrand").$$render($$result, { href: "/" }, {}, {
            default: () => {
              return `<img src="https://mussetryne.info/resources/logo.png" class="mr-3 h-16 sm:h-22" alt="Flowbite Logo"> <span class="self-center font-semibold dark:text-white" style="font-size: 10px;" data-svelte-h="svelte-8mz9b3">Opplysningssenteret for<br>Medisinsk <br> Mussetryne</span>`;
            }
          })} <div class="flex items-center md:order-2"><div id="avatar-menu">${validate_component(ProfilePicture, "ProfilePicture").$$render($$result, { user_email: $currently_logged_in_user }, {}, {})}</div> ${validate_component(NavHamburger, "NavHamburger").$$render(
            $$result,
            {
              class1: "w-full md:flex md:w-auto md:order-1"
            },
            {},
            {}
          )}</div> ${validate_component(Dropdown, "Dropdown").$$render(
            $$result,
            {
              placement: "bottom",
              triggeredBy: "#avatar-menu"
            },
            {},
            {
              default: () => {
                return `${validate_component(DropdownHeader, "DropdownHeader").$$render($$result, {}, {}, {
                  default: () => {
                    return `<span class="block text-sm">${escape(user_email)}</span> <span class="block truncate text-sm font-medium">${escape(user_email)}</span>`;
                  }
                })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                  default: () => {
                    return `Dashboard`;
                  }
                })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                  default: () => {
                    return `Innstillinger`;
                  }
                })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                  default: () => {
                    return `Straffefisk`;
                  }
                })} ${validate_component(DropdownDivider, "DropdownDivider").$$render($$result, {}, {}, {})} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                  default: () => {
                    return `Logg ut`;
                  }
                })}`;
              }
            }
          )} ${validate_component(NavUl, "NavUl").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(NavLi, "NavLi").$$render($$result, { href: "/", active: true }, {}, {
                default: () => {
                  return `Hjem`;
                }
              })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/about" }, {}, {
                default: () => {
                  return `Om oss`;
                }
              })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/contact" }, {}, {
                default: () => {
                  return `Kontakt`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navbar_1, "Navbar").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
