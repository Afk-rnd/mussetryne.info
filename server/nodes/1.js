

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.e2d3c1d5.js","_app/immutable/chunks/scheduler.a5ccabae.js","_app/immutable/chunks/index.73c8dab1.js","_app/immutable/chunks/singletons.eae2d2b0.js","_app/immutable/chunks/index.81df05ee.js"];
export const stylesheets = [];
export const fonts = [];
