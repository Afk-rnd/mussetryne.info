

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/registered/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.341c1414.js","_app/immutable/chunks/scheduler.a5ccabae.js","_app/immutable/chunks/index.73c8dab1.js"];
export const stylesheets = [];
export const fonts = [];
