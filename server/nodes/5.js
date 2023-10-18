

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/logged_in/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.bd872ede.js","_app/immutable/chunks/scheduler.a5ccabae.js","_app/immutable/chunks/index.73c8dab1.js","_app/immutable/chunks/login.b5cfc3d5.js","_app/immutable/chunks/index.81df05ee.js"];
export const stylesheets = [];
export const fonts = [];
