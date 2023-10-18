import{s as q,a as B,e as d,c as U,i as E,d as h,b as j,o as W,f as z,g as F,h as G,j as I,k as p,l as H,m as J,n as K,t as M,p as O,q as k}from"../chunks/scheduler.a5ccabae.js";import{S as Q,i as X,t as g,c as P,a as w,g as D,b as v,d as T,m as R,e as L}from"../chunks/index.73c8dab1.js";const Y="modulepreload",Z=function(o,e){return new URL(o,e).href},V={},m=function(e,n,i){if(!n||n.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(n.map(f=>{if(f=Z(f,i),f in V)return;V[f]=!0;const t=f.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(!!i)for(let a=r.length-1;a>=0;a--){const u=r[a];if(u.href===f&&(!t||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${s}`))return;const c=document.createElement("link");if(c.rel=t?"stylesheet":Y,t||(c.as="script",c.crossOrigin=""),c.href=f,document.head.appendChild(c),t)return new Promise((a,u)=>{c.addEventListener("load",a),c.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${f}`)))})})).then(()=>e()).catch(f=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=f,window.dispatchEvent(t),!t.defaultPrevented)throw f})},se={};function $(o){let e,n,i;var r=o[1][0];function f(t,s){return{props:{data:t[3],form:t[2]}}}return r&&(e=k(r,f(o)),o[12](e)),{c(){e&&v(e.$$.fragment),n=d()},l(t){e&&T(e.$$.fragment,t),n=d()},m(t,s){e&&R(e,t,s),E(t,n,s),i=!0},p(t,s){if(s&2&&r!==(r=t[1][0])){if(e){D();const l=e;g(l.$$.fragment,1,0,()=>{L(l,1)}),P()}r?(e=k(r,f(t)),t[12](e),v(e.$$.fragment),w(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else if(r){const l={};s&8&&(l.data=t[3]),s&4&&(l.form=t[2]),e.$set(l)}},i(t){i||(e&&w(e.$$.fragment,t),i=!0)},o(t){e&&g(e.$$.fragment,t),i=!1},d(t){t&&h(n),o[12](null),e&&L(e,t)}}}function x(o){let e,n,i;var r=o[1][0];function f(t,s){return{props:{data:t[3],$$slots:{default:[ee]},$$scope:{ctx:t}}}}return r&&(e=k(r,f(o)),o[11](e)),{c(){e&&v(e.$$.fragment),n=d()},l(t){e&&T(e.$$.fragment,t),n=d()},m(t,s){e&&R(e,t,s),E(t,n,s),i=!0},p(t,s){if(s&2&&r!==(r=t[1][0])){if(e){D();const l=e;g(l.$$.fragment,1,0,()=>{L(l,1)}),P()}r?(e=k(r,f(t)),t[11](e),v(e.$$.fragment),w(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else if(r){const l={};s&8&&(l.data=t[3]),s&8215&&(l.$$scope={dirty:s,ctx:t}),e.$set(l)}},i(t){i||(e&&w(e.$$.fragment,t),i=!0)},o(t){e&&g(e.$$.fragment,t),i=!1},d(t){t&&h(n),o[11](null),e&&L(e,t)}}}function ee(o){let e,n,i;var r=o[1][1];function f(t,s){return{props:{data:t[4],form:t[2]}}}return r&&(e=k(r,f(o)),o[10](e)),{c(){e&&v(e.$$.fragment),n=d()},l(t){e&&T(e.$$.fragment,t),n=d()},m(t,s){e&&R(e,t,s),E(t,n,s),i=!0},p(t,s){if(s&2&&r!==(r=t[1][1])){if(e){D();const l=e;g(l.$$.fragment,1,0,()=>{L(l,1)}),P()}r?(e=k(r,f(t)),t[10](e),v(e.$$.fragment),w(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else if(r){const l={};s&16&&(l.data=t[4]),s&4&&(l.form=t[2]),e.$set(l)}},i(t){i||(e&&w(e.$$.fragment,t),i=!0)},o(t){e&&g(e.$$.fragment,t),i=!1},d(t){t&&h(n),o[10](null),e&&L(e,t)}}}function y(o){let e,n=o[6]&&A(o);return{c(){e=z("div"),n&&n.c(),this.h()},l(i){e=F(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var r=G(e);n&&n.l(r),r.forEach(h),this.h()},h(){I(e,"id","svelte-announcer"),I(e,"aria-live","assertive"),I(e,"aria-atomic","true"),p(e,"position","absolute"),p(e,"left","0"),p(e,"top","0"),p(e,"clip","rect(0 0 0 0)"),p(e,"clip-path","inset(50%)"),p(e,"overflow","hidden"),p(e,"white-space","nowrap"),p(e,"width","1px"),p(e,"height","1px")},m(i,r){E(i,e,r),n&&n.m(e,null)},p(i,r){i[6]?n?n.p(i,r):(n=A(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&h(e),n&&n.d()}}}function A(o){let e;return{c(){e=H(o[7])},l(n){e=J(n,o[7])},m(n,i){E(n,e,i)},p(n,i){i&128&&K(e,n[7])},d(n){n&&h(e)}}}function te(o){let e,n,i,r,f;const t=[x,$],s=[];function l(a,u){return a[1][1]?0:1}e=l(o),n=s[e]=t[e](o);let c=o[5]&&y(o);return{c(){n.c(),i=B(),c&&c.c(),r=d()},l(a){n.l(a),i=U(a),c&&c.l(a),r=d()},m(a,u){s[e].m(a,u),E(a,i,u),c&&c.m(a,u),E(a,r,u),f=!0},p(a,[u]){let b=e;e=l(a),e===b?s[e].p(a,u):(D(),g(s[b],1,1,()=>{s[b]=null}),P(),n=s[e],n?n.p(a,u):(n=s[e]=t[e](a),n.c()),w(n,1),n.m(i.parentNode,i)),a[5]?c?c.p(a,u):(c=y(a),c.c(),c.m(r.parentNode,r)):c&&(c.d(1),c=null)},i(a){f||(w(n),f=!0)},o(a){g(n),f=!1},d(a){a&&(h(i),h(r)),s[e].d(a),c&&c.d(a)}}}function ne(o,e,n){let{stores:i}=e,{page:r}=e,{constructors:f}=e,{components:t=[]}=e,{form:s}=e,{data_0:l=null}=e,{data_1:c=null}=e;j(i.page.notify);let a=!1,u=!1,b=null;W(()=>{const _=i.page.subscribe(()=>{a&&(n(6,u=!0),M().then(()=>{n(7,b=document.title||"untitled page")}))});return n(5,a=!0),_});function N(_){O[_?"unshift":"push"](()=>{t[1]=_,n(0,t)})}function S(_){O[_?"unshift":"push"](()=>{t[0]=_,n(0,t)})}function C(_){O[_?"unshift":"push"](()=>{t[0]=_,n(0,t)})}return o.$$set=_=>{"stores"in _&&n(8,i=_.stores),"page"in _&&n(9,r=_.page),"constructors"in _&&n(1,f=_.constructors),"components"in _&&n(0,t=_.components),"form"in _&&n(2,s=_.form),"data_0"in _&&n(3,l=_.data_0),"data_1"in _&&n(4,c=_.data_1)},o.$$.update=()=>{o.$$.dirty&768&&i.page.set(r)},[t,f,s,l,c,a,u,b,i,r,N,S,C]}class oe extends Q{constructor(e){super(),X(this,e,ne,te,q,{stores:8,page:9,constructors:1,components:0,form:2,data_0:3,data_1:4})}}const ae=[()=>m(()=>import("../nodes/0.5650f673.js"),["../nodes/0.5650f673.js","../chunks/scheduler.a5ccabae.js","../chunks/index.73c8dab1.js","../chunks/DropdownItem.c1264ac9.js","../chunks/ProfilePicture.905c4623.js","../chunks/login.b5cfc3d5.js","../chunks/index.81df05ee.js","../chunks/ToolbarButton.20b01382.js","../assets/0.1d235eb0.css"],import.meta.url),()=>m(()=>import("../nodes/1.e2d3c1d5.js"),["../nodes/1.e2d3c1d5.js","../chunks/scheduler.a5ccabae.js","../chunks/index.73c8dab1.js","../chunks/singletons.eae2d2b0.js","../chunks/index.81df05ee.js"],import.meta.url),()=>m(()=>import("../nodes/2.0ab6185f.js"),["../nodes/2.0ab6185f.js","../chunks/scheduler.a5ccabae.js","../chunks/index.73c8dab1.js","../chunks/DropdownItem.c1264ac9.js","../chunks/ProfilePicture.905c4623.js","../chunks/login.b5cfc3d5.js","../chunks/index.81df05ee.js","../assets/2.2312cf97.css"],import.meta.url),()=>m(()=>import("../nodes/3.83a83fe2.js"),["../nodes/3.83a83fe2.js","../chunks/scheduler.a5ccabae.js","../chunks/index.73c8dab1.js"],import.meta.url),()=>m(()=>import("../nodes/4.b95cb562.js"),["../nodes/4.b95cb562.js","../chunks/scheduler.a5ccabae.js","../chunks/index.73c8dab1.js"],import.meta.url),()=>m(()=>import("../nodes/5.bd872ede.js"),["../nodes/5.bd872ede.js","../chunks/scheduler.a5ccabae.js","../chunks/index.73c8dab1.js","../chunks/login.b5cfc3d5.js","../chunks/index.81df05ee.js"],import.meta.url),()=>m(()=>import("../nodes/6.7ee1e19b.js"),["../nodes/6.7ee1e19b.js","../chunks/scheduler.a5ccabae.js","../chunks/index.73c8dab1.js","../chunks/login.b5cfc3d5.js","../chunks/index.81df05ee.js","../chunks/register.6f9f801d.js"],import.meta.url),()=>m(()=>import("../nodes/7.655de018.js"),["../nodes/7.655de018.js","../chunks/scheduler.a5ccabae.js","../chunks/index.73c8dab1.js","../chunks/login.b5cfc3d5.js","../chunks/index.81df05ee.js","../chunks/register.6f9f801d.js"],import.meta.url),()=>m(()=>import("../nodes/8.341c1414.js"),["../nodes/8.341c1414.js","../chunks/scheduler.a5ccabae.js","../chunks/index.73c8dab1.js"],import.meta.url),()=>m(()=>import("../nodes/9.41c9becc.js"),["../nodes/9.41c9becc.js","../chunks/scheduler.a5ccabae.js","../chunks/index.73c8dab1.js","../chunks/ProfilePicture.905c4623.js","../chunks/login.b5cfc3d5.js","../chunks/index.81df05ee.js","../chunks/ToolbarButton.20b01382.js"],import.meta.url),()=>m(()=>import("../nodes/10.7517dc9d.js"),["../nodes/10.7517dc9d.js","../chunks/scheduler.a5ccabae.js","../chunks/index.73c8dab1.js"],import.meta.url)],le=[],fe={"/":[2],"/about":[3],"/contact":[4],"/logged_in":[5],"/login":[6],"/registered":[8],"/register":[7],"/settings":[9],"/straffefisk":[10]},ce={handleError:({error:o})=>{console.error(o)}};export{fe as dictionary,ce as hooks,se as matchers,ae as nodes,oe as root,le as server_loads};
