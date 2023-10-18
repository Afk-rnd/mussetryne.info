

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.0ab6185f.js","_app/immutable/chunks/scheduler.a5ccabae.js","_app/immutable/chunks/index.73c8dab1.js","_app/immutable/chunks/DropdownItem.c1264ac9.js","_app/immutable/chunks/ProfilePicture.905c4623.js","_app/immutable/chunks/login.b5cfc3d5.js","_app/immutable/chunks/index.81df05ee.js"];
export const stylesheets = ["_app/immutable/assets/2.2312cf97.css"];
export const fonts = [];
