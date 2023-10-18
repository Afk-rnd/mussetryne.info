

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.7ee1e19b.js","_app/immutable/chunks/scheduler.a5ccabae.js","_app/immutable/chunks/index.73c8dab1.js","_app/immutable/chunks/login.b5cfc3d5.js","_app/immutable/chunks/index.81df05ee.js","_app/immutable/chunks/register.6f9f801d.js"];
export const stylesheets = [];
export const fonts = [];
