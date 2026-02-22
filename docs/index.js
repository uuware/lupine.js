"use strict";(()=>{var qh=Object.create;var In=Object.defineProperty;var Nh=Object.getOwnPropertyDescriptor;var Wh=Object.getOwnPropertyNames;var _h=Object.getPrototypeOf,Uh=Object.prototype.hasOwnProperty;var Lo=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,o)=>(typeof require<"u"?require:t)[o]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var m=(e,t)=>()=>(e&&(t=e(e=0)),t);var S=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),$h=(e,t)=>{for(var o in t)In(e,o,{get:t[o],enumerable:!0})},Vh=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Wh(t))!Uh.call(e,i)&&i!==o&&In(e,i,{get:()=>t[i],enumerable:!(n=Nh(t,i))||n.enumerable});return e};var Gh=(e,t,o)=>(o=e!=null?qh(_h(e)):{},Vh(t||!e||!e.__esModule?In(o,"default",{value:e,enumerable:!0}):o,e));var Ra=m(()=>{"use strict"});var J,Yh,Eo,re,zn,Ao=m(()=>{"use strict";E();J={},Yh=e=>{J.renderPageFunctions=e||{}},Eo=e=>{J.renderPageProps=e},re=()=>J.renderPageProps,zn=e=>{J.router=e,jn()}});function ct(e){let t=e.getElementsByTagName("a");for(var o=0,n=t.length;o<n;o++){let i=t[o].getAttribute("href");if(!i||i.startsWith("javascript:"))continue;if(i.startsWith("#")){t[o].onclick=()=>{var l;let a=decodeURIComponent(i.substring(1));return(l=document.getElementById(a))==null||l.scrollIntoView(!0),!1};continue}let r=new URL(t[o].href,document.baseURI).href;t[o].target!=="_blank"&&r.startsWith(document.location.origin)&&(r=r.substring(document.location.origin.length),t[o].onclick=()=>(J.initializePage(r),!1))}}var Bn=m(()=>{"use strict";Ao()});var dt,Gt,Ro=m(()=>{"use strict";dt=async(e,t)=>{var n;let o=e.firstChild;o&&o.tagName==="STYLE"&&((n=o.parentNode)==null||n.removeChild(o)),await Gt(e),e.innerHTML=t,o&&o.tagName==="STYLE"&&e.insertBefore(o,e.firstChild)},Gt=async e=>{let t=[];e.querySelectorAll("[data-ref]").forEach(o=>{o._lj&&o._lj.onUnload&&t.push(o._lj.onUnload())}),await Promise.all(t)}});var Jh,Rt,me,Yt=m(()=>{"use strict";Jh={Red:"#f44336",Pink:"#e81e63",Purple:"#9c27b0",DeepPurple:"#673ab7",Indigo:"#3f51b5",Blue:"#2196f3",LightBlue:"#03a9f4",Cyan:"#00bcd4",Teal:"#009688",Green:"#4caf50",LightGreen:"#8bc34a",Lime:"#cddc39",DarkYellow:"#bfa40e",Amber:"#ffc107",Orange:"#ff9800",DeepOrange:"#ff5722",Silver:"#c0c0c0",Gray:"#808080",Black:"#000000"},Rt=class Rt{constructor(t,o){this.namespace="";this.color="";this.namespace=t?`[${t}] `:"",o&&(this.color="color:"+o)}static setEnabled(t){t&&!Rt.enabled&&console.log("Logger is enabled."),Rt.enabled=t}log(t,...o){Rt.enabled&&console.log(`%c${this.timestamp()} ${this.namespace}${t}`,this.color,...o)}timestamp(t){return(t||new Date).toJSON().substring(11,23)}warn(t,...o){console.warn(`%c${this.timestamp()} ${this.namespace}${t}`,this.color,...o)}error(t,...o){console.error(`%c${this.timestamp()} ${this.namespace}${t}`,this.color,...o)}};Rt.enabled=!0;me=Rt});function fe(e){let t=0,o=Math.round(Date.now()/1e3),n="";return function(){let i=Math.round(Date.now()/1e3-o).toString(36);return i!==n?(t=0,n=i):t++,`${e}${n}${t.toString(36)}`}}var On=m(()=>{"use strict"});var Me,Do,Da,Xh,Jt=m(()=>{"use strict";Me=(e,t,o=365,n,i,r)=>{let a=new Date(new Date().getTime()+o*24*36e5);document.cookie=e+"="+escape(t)+";expires="+a.toUTCString()+";path="+(n||"/")+(i?";domain="+i:"")+(r?";secure":"")},Do=e=>{let t=document.cookie.split(";");for(let o=0;o<t.length;o++){let n=t[o].trim();if(n.substring(0,e.length+1)==e+"=")return unescape(n.substring(e.length+1))}return null},Da=(e,t,o,n)=>{document.cookie=e+"=;expires=Fri, 02-Jan-1970 00:00:00 GMT;path="+(t||"/")+(o?";domain="+o:"")+(n?";secure":"")},Xh={set:Me,get:Do,clear:Da}});var Fn,Ho,Ha=m(()=>{"use strict";Fn=0,Ho=e=>{console.log("Creating debug-watch socket");let t=location.protocol==="https:"?"wss:":"ws:",o=new WebSocket(`${t}//${location.host}/debug/client`);window.addEventListener("beforeunload",()=>{o.close()}),o.onopen=()=>{o.send(JSON.stringify({message:"get-flag"}))},o.onmessage=n=>{try{let i=JSON.parse(n.data);console.log("Debug socket message:",i),i&&i.flag&&(Fn?Fn!==i.flag&&document.location.reload():Fn=i.flag)}catch{}},o.onclose=()=>{console.log("Debug socket close."),setTimeout(()=>{Ho(e)},3e3)}}});var F,pt=m(()=>{"use strict";F=()=>typeof window=="object"&&typeof document=="object"});var Kh,ut,Dt,qn=m(()=>{"use strict";H();Kh=e=>{Dt.webConfigApi=e},ut=class ut{static initFromData(t){this.initialized=!0,this.cfg=t}static async init(t){var i,r;if(this.initialized&&!t)return;if(this.initialized=!0,typeof document=="object"&&!t){let a=(i=document.querySelector("#web-setting"))==null?void 0:i.textContent;if(a){this.cfg=JSON.parse(a);return}}if(!this.webConfigApi){console.error("WebConfig webConfigApi is not set");return}let o=re().renderPageFunctions.baseUrl(this.webConfigApi),n=await re().renderPageFunctions.fetchData(o);n&&n.json&&n.json.status==="ok"?this.cfg=n.json.result:console.error(((r=n==null?void 0:n.json)==null?void 0:r.message)||"Failed to get web config")}static async get(t,o){await ut.init();let n=ut.cfg[t];if(typeof n>"u")return o;if(typeof o=="number")return Number.parseInt(n);if(typeof o=="boolean")return n.toLocaleLowerCase()==="true"||n==="1";if(typeof o=="object"){if(typeof n=="object")return n;try{return JSON.parse(n)}catch(i){console.error("WebConfig JSON.parse error: ",i)}return o}return n||o}};ut.webConfigApi="",ut.initialized=!1,ut.cfg={};Dt=ut});function zo(e,t){var o;if(!Io){let n=(o=document.querySelector("#web-env"))==null?void 0:o.textContent;n&&(Io=!0,jo(JSON.parse(n)))}if(!Io&&console.warn("webEnv has not been initialized yet!"),typeof be[e]>"u")return t;if(typeof t=="number")return Number.parseInt(be[e]);if(typeof t=="boolean")return be[e].toLocaleLowerCase()==="true"||be[e]==="1";if(typeof t=="object"){if(typeof be[e]=="object")return be[e];try{return JSON.parse(be[e])}catch(n){console.error("webEnv JSON.parse error: ",n)}return t}return be[e]||t}function jo(e){Object.assign(be,e),Io=!0}var be,Io,Nn=m(()=>{"use strict";be={},Io=!1});var Wn=m(()=>{"use strict";Jt();Ha();pt();Yt();On();qn();Nn()});var Xt,_n,Ia,Un,Kt=m(()=>{"use strict";Jt();pt();Xt=e=>F()?Do(e):Ia(e),Ia=e=>_n&&_n.get(e,""),Un=e=>_n=e});var za,ja,q,$n,Bo,j,gt=m(()=>{"use strict";za="en",ja="light",q={defaultPageTitle:"",defaultLang:za,langs:{},defaultTheme:ja,themes:{},appGlobalStyles:new Map},Bo=e=>{$n=e},j=()=>{let e;if(!$n||!(e=$n()))throw new Error("Request context is not initialized");return e}});var ht,Ba,Vn,Gn,xe,Qt,Oo=m(()=>{"use strict";Jt();pt();Kt();gt();ht="theme",Ba="updateTheme",Vn="data-theme",Gn=(e,t)=>{q.defaultTheme=e,q.themes=t},xe=()=>{let e=Xt(ht);return(!e||!q.themes[e])&&(e=q.defaultTheme,F()&&j().themeName&&j().themeName!==q.defaultTheme&&Me(ht,j().themeName)),{themeName:e,themes:q.themes}},Qt=e=>{if(j().themeName=e,!F())return;Me(ht,e),document.documentElement.setAttribute(Vn,e);let t=document.querySelectorAll("iframe");for(let n=0;n<t.length;n++)t[n].contentWindow&&t[n].contentWindow.top===window&&t[n].contentWindow.document.documentElement.setAttribute(Vn,e);let o=new CustomEvent(Ba,{detail:e});window.dispatchEvent(o)}});var mt,Fo=m(()=>{"use strict";mt=function(e){return e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase())}});var Oa,qo,Yn,No=m(()=>{"use strict";Oa=[],qo=()=>{Oa.forEach(e=>{try{e()}catch(t){console.error(t)}})},Yn=e=>{if(typeof document>"u")throw new Error("bindPageLoadedEvent can only be called in the browser");Oa.push(e)}});var Qh,Zh,Fa,Jn,ve,em,Xn,qa,Kn,Qn,M,Na,Zn,Wo=m(()=>{"use strict";Wn();Oo();Fo();No();gt();Qh=(e,t,o)=>{let n=e?`${e}{${t}}`:t;return o&&(n=`${o}{${n}}`),n},Zh=e=>Object.keys(e).map(t=>t.trim()).map(t=>e[t]!=null&&typeof e[t]=="object"||typeof e[t]>"u"||e[t]===""?"":`${mt(t)}:${e[t]};`).join(""),Fa=(e,t,o,n)=>{if(t.length>0){let i=Qh(o,t.join(""),n);e.push(i),t.length=0}},Jn=(e,t,o,n)=>{let i=t.split(",").map(l=>l.trim()).map(l=>(l.startsWith("&")?`${t}${l.substring(1)}`:l).replace(/&/g,e)).join(","),r=[],a=[];for(let l in o){let c=o[l];if(c===null||typeof c!="object")c!==""&&typeof c<"u"&&(t||console.warn(`No className is defined for: ${mt(l)}:${c};`),a.push(`${mt(l)}:${c};`));else if(Fa(r,a,i,n),l.startsWith("@keyframes")){let d=Object.keys(c).map(p=>p+"{"+Zh(c[p])+"}").join("");r.push(`${l}{${d}}`)}else if(l.startsWith("@media")){let d=Jn(e,t,c,l);r.push(...d)}else{let d=t?t.split(",").map(u=>u.trim()).map(u=>l.split(",").map(g=>g.trim()).map(g=>(g.startsWith("&")?u+g.substring(1):u+" "+g).replace(/&/g,e)).join(",")).join(","):l,p=Jn(e,d,c,n);r.push(...p)}}return Fa(r,a,i,n),r},ve=(e,t)=>Jn(e,e?`.${e}`:"",t),em=(e,t)=>{let o=e&&document.querySelector(`.${e}`);if(o){let n=ve(e,t).join("");if(o.firstChild&&o.firstChild.nodeName==="STYLE")o.firstChild.innerHTML=n;else{let i=document.createElement("style");i.innerHTML=n,o.prepend(i)}}else console.warn(`Can't find "${e}" to update styles.`)},Xn=(e,t,o)=>{o||(o=document.createElement("style"),o.id=`sty-${e}`,document.head.appendChild(o)),o.innerText=t},qa=fe("g"),Kn=e=>{if(!j().globalStyleIds.has(e)){let t=qa();j().globalStyleIds.set(e,t)}return j().globalStyleIds.get(e)},Qn=(e,t,o=!1,n=!1)=>{if(typeof document<"u"){let i=document.getElementById(`sty-${e}`);(o||!i)&&Xn(e,ve(n?"":e,t).join(""),i)}else{let i=q.appGlobalStyles;(!i.has(e)||o)&&i.set(e,{topUniqueClassName:e,noTopClassName:n,style:t})}},M=(e,t,o=!1,n=!1)=>{if(typeof document<"u"){let i=document.getElementById(`sty-${e}`);(o||!i)&&Xn(e,ve(n?"":e,t).join(""),i)}else{let i=j().globalStyles;(!i.has(e)||o)&&i.set(e,{topUniqueClassName:e,noTopClassName:n,style:t})}},Na=()=>{let e=xe(),t=[];for(let o in e.themes)t.push(...ve("",{[`[data-theme="${o}" i]`]:e.themes[o]}));return t.join(`
`)};typeof document<"u"&&Yn(()=>{let e=ht,t=document.getElementById(`sty-${e}`);t||Xn(e,Na(),t)});Zn=()=>{let e=[];e.push(`<style id="sty-${ht}">${Na()}</style>`);for(let[t,{topUniqueClassName:o,noTopClassName:n,style:i}]of q.appGlobalStyles){let r=ve(n?"":o,i).join("");e.push(`<style id="sty-${t}">${r}</style>`)}for(let[t,{topUniqueClassName:o,noTopClassName:n,style:i}]of j().globalStyles){let r=ve(n?"":o,i).join("");e.push(`<style id="sty-${t}">${r}</style>`)}return e.join("")}});function om(e,t,o,n,i){let r=[];for(let a in t)if(a==="ref")t[a]&&(t[a].id=_o(t),r.push("data-ref"));else if(!["children","key","_result","_html","_id"].includes(a))if(a==="style")if(typeof t[a]=="object"){let l=`${a}="`;for(let c in t[a])l+=`${mt(c)}:${t[a][c]};`;l+='"',r.push(l)}else r.push(`${a}="${t[a]}"`);else if(a==="css")_o(t);else if(a[0]==="o"&&a[1]==="n")_o(t);else if(a==="defaultChecked")(t[a]===!0||t[a]==="checked")&&r.push('checked="true"');else if(a==="readonly"||a==="disabled"||a==="selected"||a==="checked")t[a]!==void 0&&t[a]!==!1&&t[a]!=="false"&&r.push(`${a}="${t[a]}"`);else if(a==="class"||a==="className"){let l=t[a].split(" ").filter(c=>c&&c!=="");(t.css||t.ref)&&!l.includes(t._id)&&l.unshift(t._id),t.ref&&t.ref.globalCssId&&!l.includes(t.ref.globalCssId)&&l.unshift(t.ref.globalCssId),i&&n?l=l.flatMap(c=>c.includes("&")?[c.replace(/&/g,i),c.replace(/&/g,n)]:[c]):i?l=l.map(c=>c.replace(/&/g,i)):n&&(l=l.map(c=>c.replace(/&/g,n))),r.push(`class="${l.join(" ")}"`)}else a!=="dangerouslySetInnerHTML"&&r.push(`${a}="${t[a]}"`);return t._id&&r.push(t._id),r.join(" ")}async function ti(e,t,o,n){if(typeof t=="string")e.push(t);else if(!(t===!1||t===null||typeof t>"u"))if(typeof t=="number"||typeof t=="boolean")e.push(t.toString());else if(Array.isArray(t))for(let i of t)await ti(e,i,o,n);else t.type&&t.props?(await ce(t.type,t.props,o,n),e.push(...t.props._html),t.props._html.length=0):Wa.warn("Unexpected",t)}var Wa,_a,tm,_o,ei,nm,ce,Uo=m(()=>{"use strict";Yt();On();Wo();Fo();Wa=new me("render-components"),_a=fe("l"),tm=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],_o=e=>(e._id||(e._id=_a()),e._id);ei=0,nm=50;ce=async(e,t,o,n)=>{if(ei++,ei>=nm&&(ei=0,await new Promise(a=>{setTimeout(a,0)})),Array.isArray(t)){let a={type:"Fragment",props:{children:t}};await ce(a.type,a.props,o,n);return}if(t._html=[],typeof e=="function"&&(t._result=e.call(null,t),t._result&&typeof t._result.then=="function"&&(t._result=await t._result),(t._result===null||t._result===void 0||t._result===!1)&&(t._result={type:"Fragment",props:t}),typeof t._result.type=="function")){await ce(t._result.type,t._result.props,o,n),t._result.props._html&&(t._html.push(...t._result.props._html),t._result.props._html.length=0);return}let i=t._result&&t._result.type||e,r=t._result&&t._result.props||t;if(typeof i=="string"){r._id;let a=o;(r.css||r.ref)&&(a=_o(r),!r.class&&!r.className&&(r.class=a));let l=n;r.ref&&r.ref.globalCssId&&(l=r.ref.globalCssId);let c=om(i,r,{type:e,props:t},a,l);if(tm.includes(i.toLowerCase()))(i!=="Fragment"||r.ref)&&t._html.push(`<${i}${c?" ":""}${c} />`);else{if((i!=="Fragment"||r.ref)&&t._html.push(`<${i}${c?" ":""}${c}>`),r.css){let d=ve(a,r.css).join("");t._html.push(`<style id="sty-${a}">${d}</style>`)}r.children||r.children===0?await ti(t._html,r.children,a,l):r.dangerouslySetInnerHTML&&t._html.push(r.dangerouslySetInnerHTML),(i!=="Fragment"||r.ref)&&t._html.push(`</${i}>`)}}else i.name==="Fragment"?await ti(t._html,r.children,o,n):Wa.warn("Unknown type: ",e,t,i,r)}});var te,oi,im,Zt=m(()=>{"use strict";ni();Bn();Ro();Uo();te=async(e,t)=>{await ce(t.type,t.props);let o=e&&(typeof e=="string"?document.querySelector(e):e);o&&(await dt(o,t.props._html.join("")),Le(o,t.type,t.props),ct(o))},oi=async(e,t)=>{var n;await ce(t.type,t.props);let o=e&&(typeof e=="string"?document.querySelector(e):e);if(o){let i=document.createElement("template");await dt(i,t.props._html.join("")),i.content.children.length>1&&console.error("renderComponent should only have one element: ",i.content.children.length);let r=i.content.firstChild;await Gt(o),(n=o.parentNode)==null||n.replaceChild(r,o),Le(r,t.type,t.props),ct(r)}},im=async(e,t,o="after")=>{var i,r;await ce(t.type,t.props);let n=e&&(typeof e=="string"?document.querySelector(e):e);if(n){let a=document.createElement("template");await dt(a,t.props._html.join("")),a.content.children.length>1&&console.error("renderComponent should only have one element: ",a.content.children.length);let l=a.content.firstChild;await Gt(n),n.nextSibling||o==="before"?(i=n.parentNode)==null||i.insertBefore(l,o==="after"?n.nextSibling:n):(r=n.parentNode)==null||r.appendChild(l),Le(l,t.type,t.props),ct(l)}}});var ii,ri=m(()=>{"use strict";Zt();Ro();ii=(e,t,o)=>{let n=t._id;t.ref.current=o,t.ref.onLoad&&Promise.prototype.then.bind(Promise.resolve())(()=>t.ref.onLoad(o)),t.ref.onUnload&&(o._lj=o._lj||{},o._lj.onUnload=async()=>{await t.ref.onUnload(o)}),t.ref.$=i=>i.startsWith("&")?o.querySelector(`.${n}${i.substring(1).replace(/&/g,n)}`):o.querySelector(`.${n} ${i.replace(/&/g,n)}`),t.ref.$all=i=>i.startsWith("&")?o.querySelectorAll(`.${n}${i.substring(1).replace(/&/g,n)}`):o.querySelectorAll(`.${n} ${i.replace(/&/g,n)}`),t.ref.mountInnerComponent=async i=>{typeof i=="object"&&i.type&&i.props?await te(o,i):await dt(o,i)},t.ref.mountOuterComponent=async i=>{await oi(o,i)}}});var ai,Le,ni=m(()=>{"use strict";ri();ai=(e,t)=>{for(let o=0;o<t.length;o++){let n=t[o];n&&n.type&&n.props?Le(e,n.type,n.props):n&&Array.isArray(n)?ai(e,n):typeof n<"u"&&n!==null&&typeof n!="string"&&typeof n!="number"&&typeof n!="boolean"&&console.warn("Unexpected children:",n)}},Le=(e,t,o)=>{let n=o._result&&o._result.props||o;if(n._id){let i=e.querySelector(`[${n._id}]`);if(!i&&e.getAttribute(n._id)===""&&(i=e),i){for(let r in n)if(r==="ref")ii(t,n,i);else if(r[0]==="o"&&r[1]==="n"){let a=r;a.toLowerCase()in i?a=a.toLowerCase().slice(2):a=a.slice(2),i.addEventListener(a,n[r])}}}n.children&&Array.isArray(n.children)?ai(e,n.children):n._result&&n._result.type!=="Fragment"&&n._result.props?Le(e,n._result.type,n._result.props):n.children&&n.children.type&&n.children.props?Le(e,n.children.type,n.children.props):!n.children||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="boolean"||console.warn("Unexpected children:",n.children,t,o)}});var $o,Ua,si,li,rm,$a=m(()=>{"use strict";Jt();pt();Kt();gt();$o="lang",Ua="updateLang",si=(e,t)=>{q.defaultLang=e,q.langs=t},li=()=>{let e=Xt($o);return(!e||!q.langs[e])&&(e=j().langName||q.defaultLang,F()&&j().langName&&j().langName!==q.defaultLang&&Me($o,j().langName)),{langName:e,langs:q.langs}},rm=e=>{if(j().langName=e,!F())return;Me($o,e);let t=new CustomEvent(Ua,{detail:e});window.dispatchEvent(t)}});var ci,Vo,di,Ee,pi,Go,ui=m(()=>{"use strict";gt();ci=e=>{j().pageTitle=e},Vo=()=>j().pageTitle||q.defaultPageTitle,di=e=>{q.defaultPageTitle=e},Ee=(e,t)=>{let o=j().metaData;typeof t>"u"?delete o[e]:o[e]=t},pi=()=>Object.values(Go()).join(`
`),Go=()=>j().metaData});var ye,gi=m(()=>{"use strict";pt();Zt();Yt();ye=class e{constructor(){this.logger=new me("page-router");this.routerData=[];this.subDir=""}setFilter(t){this.filter=t}setSubDir(t){this.subDir=t}setFramePage(t){this.framePage=t}storeRouter(t,o){let n;t==="*"||t===""||t==="/*"?n="*":(n=t,n.startsWith("/")||(n="/"+n),n.endsWith("/")&&n.length>1&&(n=n.substring(0,n.length-1)));let i=0,r=[],a=n.indexOf("/:");if(a>=0){r=n.substring(a+1).split("/"),n=n.substring(0,a);let l=r.findIndex(c=>c.startsWith("?"));i=l>=0?l:r.length}this.routerData.push({path:n,handler:o,parameterVariables:r,parameterLength:i})}use(t,...o){this.storeRouter(t,o)}async callHandle(t,o,n){try{return await t(n)}catch(i){this.logger.error(`Processed path: ${o}, error: ${i.message}`),console.error(i.stack)}return null}async findRoute(t,o,n){for(let i=0,r;r=this.routerData[i];i++)if(r.path==="*"||t===r.path||t.startsWith(r.path+"/")){let a={},l=!0;if(r.parameterVariables.length>0){l=!1;let c=t.substring(r.path.length+1);c.endsWith("/")&&(c=c.substring(0,c.length-1));let d=c.split("/");if(d.length>=r.parameterLength&&d.length<=r.parameterVariables.length){l=!0;for(let[p,u]of r.parameterVariables.entries())if(!u.startsWith(":")&&!u.startsWith("?")&&u!==d[p]){l=!1;break}else(u.startsWith(":")||u.startsWith("?"))&&p<d.length&&(a[u.replace(/[:?]/g,"")]=d[p]);o.urlParameters=a}}if(l){for(let c=0,d;d=r.handler[c];c++)if(d instanceof e){let p=r.path==="*"||t==="/"&&r.path==="/"?t:t.substring(r.path.length),u=await d.handleRoute(p,o,n);if(u)return u}else{let p=await this.callHandle(d,t,o);if(p)return p}return null}}return null}async handleRoute(t,o,n){t.startsWith(this.subDir)&&(t=t.substring(this.subDir.length));let i=null;if(this.filter&&(i=await this.callHandle(this.filter,t,o)),i||(i=await this.findRoute(t,o,n)),i&&this.framePage){let r="."+this.framePage.placeholderClassname;return n&&F()&&document.querySelector(r)?(await te(r,i),null):this.framePage.component(this.framePage.placeholderClassname,i)}return i}}});var am,Va,sm,Yo,Ae,jn,Ga=m(()=>{"use strict";Yt();Wo();Oo();Zt();Uo();gi();No();Kt();ui();Nn();Ao();pt();qn();gt();am=new me("initialize"),Va=async(e,t)=>J.router instanceof ye?J.router.handleRoute(e.url,e,t):await J.router(e),sm=async(e,t)=>{Eo(e),Bo(()=>t.getRequestContext()),jo(t.getWebEnv()),Dt.initFromData(t.getWebSetting()),Un(t.getServerCookie()),qo();let o=await Va(e,!1);if(!o||!o.props)return{content:`Unexpected url: ${e.url}`,title:"",metaData:"",globalCss:"",themeName:xe().themeName};await ce(o.type,o.props);let n=xe(),i=Zn();return{content:o.props._html.join(""),title:Vo(),metaData:pi(),globalCss:i,themeName:n.themeName}};J.generatePage=sm;Yo={pageInitialized:!1,appInitialized:!1},Ae=async e=>{let t={pageTitle:"",metaData:{},themeName:"",langName:"",globalStyles:new Map,globalStyleIds:new Map,coreData:{},devData:{}};Bo(()=>t);let o=Yo.pageInitialized;Yo.pageInitialized=!0,am.log("initializePage: ",e),e&&window.history.pushState({urlPath:e},"",e);let n=e?e.split("?"):[],i=n[0]||document.location.pathname,r=n[1]||document.location.search,a={url:i,query:Object.fromEntries(new URLSearchParams(r)),urlParameters:{},renderPageFunctions:J.renderPageFunctions};Eo(a),!o&&qo();let l=await Va(a,o);if(l===null)return;if(!l||!l.props){document.querySelector(".lupine-root").innerHTML=`Error happened or unexpected url: ${i}`;return}await te(".lupine-root",l),Qt(xe().themeName),document.title=Vo();let c=Go()};J.initializePage=Ae;jn=()=>{if(F()){if(Yo.appInitialized)return;Yo.appInitialized=!0,addEventListener("popstate",e=>{Ae()}),addEventListener("load",e=>{let t=new URLSearchParams(window.location.search).get("redirect");t||(t=new URLSearchParams(window.location.hash.substring(1)).get("redirect")),Ae(t||void 0)})}if(typeof globalThis<"u"){let e=globalThis;e._lupineJs===null&&(e._lupineJs=()=>J)}}});var Ya=m(()=>{"use strict";ni();$a();Bn();ui();ri();Wo();Oo();Ao();Fo();Zt();No();gi();Uo();Ro();Kt();gt();Ga()});var Ja=m(()=>{"use strict"});var Xa=m(()=>{"use strict"});var Ka=m(()=>{"use strict"});var Qa=m(()=>{"use strict"});var Za=m(()=>{"use strict"});var es=m(()=>{"use strict";Ja();Xa();Ka();Qa();Za()});var ts=m(()=>{"use strict"});var os=m(()=>{"use strict";ts()});var H=m(()=>{"use strict";Ra();Ya();Wn();es();os()});var ns,hi,ke,is=m(()=>{"use strict";H();ns=fe("bb-"),hi=class{genBackActionId(){return ns()}getAllBackActionButtons(){let t=document.querySelectorAll('[data-back-action^="bb-"]');return Array.from(t).map(n=>{let i=n.getAttribute("data-back-action")||"";return{el:n,ind:i.substring(3)}}).filter(Boolean).sort((n,i)=>i.ind.localeCompare(n.ind)).map(n=>n.el)}clear(){this.backFn=void 0}attach(t){this.backFn=t}async processBackAction(){if(this.backFn){try{return await this.backFn(),this.clear(),!0}catch(o){console.error("back button back failed",o)}return!1}let t=this.getAllBackActionButtons();return t.length?(t[0].dispatchEvent(new Event("click")),!0):!1}},ke=new hi});var de,mi,rs=m(()=>{"use strict";de=class de{static toString(t){if(t===0)return de.ALPHABET[0];let o="";for(;t>0;){let n=t%de.BASE;o=de.ALPHABET[n]+o,t=Math.floor(t/de.BASE)}return o}static fromString(t){let o=0;for(let n=0;n<t.length;n++)o=o*de.BASE+de.ALPHABET.indexOf(t[n]);return o}};de.ALPHABET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",de.BASE=62;mi=de});var lm,as,cm,ss=m(()=>{"use strict";lm=(e,t)=>new Promise((o,n)=>{let i=new FileReader;i.onloadend=()=>o(t?i.result.split(",")[1]:i.result),i.onerror=n,i.readAsDataURL(e)}),as=e=>{let[t,o]=e.split(","),n=t.match(/data:(.*);base64/),i=n?n[1]:"application/octet-stream",r=atob(o),a=Array.from(r).map(c=>c.charCodeAt(0)),l=new Uint8Array(a);return new Blob([l],{type:i})},cm=e=>{let t=as(e);return URL.createObjectURL(t)}});function dm(e,t){let n=(ls.canvas||(ls.canvas=document.createElement("canvas"))).getContext("2d");return n.font=t,n.measureText(e).width}var ls,cs=m(()=>{"use strict";ls={canvas:null}});var fi,Jo,ds=m(()=>{"use strict";fi=class e{static now(){return Date.now()}static toDate(t){return new Date(Date.parse(t))}static clone(t){return new Date(t.valueOf())}static isLeapYear(t){return t%4===0&&t%100!==0||t%400===0}static daysInMonth(t,o){return o===1?e.isLeapYear(t)?29:28:31-o%7%2}static createDate(t,o,n,i,r,a,l){return new Date(t,o,n,i,r,a,l)}static createUTCDate(t,o,n,i,r,a,l){return new Date(Date.UTC.apply(null,[t,o,n,i,r,a,l]))}static set(t,o,n,i,r,a,l,c){return t||(t=new Date(e.now())),typeof o=="number"&&t.setFullYear(o),typeof n=="number"&&t.setMonth(n),typeof i=="number"&&t.setDate(i),typeof r=="number"&&t.setHours(r),typeof a=="number"&&t.setMinutes(a),typeof l=="number"&&t.setSeconds(l),typeof c=="number"&&t.setMilliseconds(c),t}static add(t,o,n,i,r,a,l,c){return t||(t=new Date(e.now())),typeof o=="number"&&t.setFullYear(t.getFullYear()+o),typeof n=="number"&&t.setMonth(t.getMonth()+n),typeof i=="number"&&t.setDate(t.getDate()+i),typeof r=="number"&&t.setHours(t.getHours()+r),typeof a=="number"&&t.setMinutes(t.getMinutes()+a),typeof l=="number"&&t.setSeconds(t.getSeconds()+l),typeof c=="number"&&t.setMilliseconds(t.getMilliseconds()+c),t}static diff(t,o){let n=o.getFullYear(),i=t.getFullYear()-n,r=t.getMonth()-o.getMonth();r<0&&(i--,r+=12);let a=t.getDate()-o.getDate();a<0&&(r>0?r--:(i--,r=11),a+=e.daysInMonth(n,o.getMonth()));let l=t.valueOf()-o.valueOf(),c=Math.floor(l/1e3),d=Math.floor(c/(60*60))%24,p=Math.floor(c/60)%60,u=c%60,g=l%1e3;return new Jo(i,r,a,d,p,u,g)}static diffString(t,o,n=!1){let i=e.diff(t,o),r="";return i.years!==0&&(r=r+i.years+" years(s), "),(i.years!==0||i.months!==0)&&(r=r+i.months+" month(s), "),(i.years!==0||i.months!==0||i.days!==0)&&(r=r+i.days+" day(s), "),(i.years!==0||i.months!==0||i.days!==0||i.hours!==0)&&(r=r+i.hours+" hour(s), "),(i.years!==0||i.months!==0||i.days!==0||i.hours!==0||i.minutes!==0)&&(r=r+i.minutes+" minute(s), "),(i.years!==0||i.months!==0||i.days!==0||i.hours!==0||i.minutes!==0||i.seconds!==0||!n)&&(r=r+i.seconds+" second(s)",n&&(r+=", ")),n&&(r=r+i.milliseconds+" ms"),r}static toYMD(t,o){return o=typeof o>"u"?"-":o,t.getFullYear()+o+("0"+(t.getMonth()+1)).toString().slice(-2)+o+("0"+t.getDate()).toString().slice(-2)}static toYmdHms(t,o){return o=typeof o>"u"?"-":o,t.getFullYear()+o+("0"+(t.getMonth()+1)).toString().slice(-2)+o+("0"+t.getDate()).toString().slice(-2)+" "+("0"+t.getHours()).toString().slice(-2)+":"+("0"+t.getMinutes()).toString().slice(-2)+":"+("0"+t.getSeconds()).toString().slice(-2)}static toJSONString(t){return t.toJSON()}static showJSONString(t,o="-"){return e.toYmdHms(e.toDate(t),o)}static fromJSONString(t){return e.toDate(t)}static clearTime(t){return t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),t}static clearUTCTime(t){return t.setUTCHours(0),t.setUTCMinutes(0),t.setUTCSeconds(0),t.setUTCMilliseconds(0),t}static format(t,o){o||(o="YYYY-MM-DD"),t||(t=new Date);let n={YYYY:t.getFullYear().toString(),YY:("00"+(t.getFullYear()-100)).toString().slice(-2),MM:("0"+(t.getMonth()+1)).toString().slice(-2),M:(t.getMonth()+1).toString(),DD:("0"+t.getDate()).toString().slice(-2),D:t.getDate().toString(),hh:("0"+t.getHours()).toString().slice(-2),h:t.getHours().toString(),mm:("0"+t.getMinutes()).toString().slice(-2),ss:("0"+t.getSeconds()).toString().slice(-2),SSS:("00"+t.getMilliseconds()).toString().slice(-3),S:Math.floor(t.getMilliseconds()/100).toString().slice(-1)},i=o.match(/(\[[^\[]*\])|(\\)?(YYYY|YY|MM?|DD?|hh?|mm?|ss?|SSS|S|.)/g);for(let a=0,l=i.length;a<l;a++)n[i[a]]&&(i[a]=n[i[a]]);return i.join("")}},Jo=class{constructor(t,o,n,i,r,a,l){this.years=t,this.months=o,this.days=n,this.hours=i,this.minutes=r,this.seconds=a,this.milliseconds=l}}});var bi,xi,pm,ps=m(()=>{"use strict";bi=e=>e&&typeof e=="object"&&!Array.isArray(e),xi=(e,...t)=>{if(!t.length)return e;let o=t.shift();if(bi(e)&&bi(o))for(let n in o)bi(o[n])?(e[n]||Object.assign(e,{[n]:{}}),xi(e[n],o[n])):Object.assign(e,{[n]:o[n]});return xi(e,...t)},pm=e=>JSON.parse(JSON.stringify(e))});var um,us=m(()=>{"use strict";um=(e="skip_console_protection")=>{try{if(localStorage.getItem(e)==="1")return;var t=window.console;if(!t)return;var o=function(){};["log","warn","info","error","debug","table","trace"].forEach(n=>{t[n]=o})}catch{}}});var gm,gs=m(()=>{"use strict";gm=(e="skip_debug_protection",t=2e3)=>{try{if(localStorage.getItem(e)==="1")return;setInterval(()=>{debugger},t)}catch{}}});var vi,hs=m(()=>{"use strict";vi=class{constructor(){}ready(t){if(document.readyState==="complete")setTimeout(t,0);else{let o=function(){document.readyState==="complete"&&(document.removeEventListener("DOMContentLoaded",o),window.removeEventListener("load",o),setTimeout(t,0))};document.addEventListener("DOMContentLoaded",o),window.addEventListener("load",o)}}readyPromise(){return new Promise((t,o)=>{this.ready(()=>{t()})})}}});var yi,ms=m(()=>{"use strict";yi=class{static getValue(t){var o;return(o=document.querySelector(t))==null?void 0:o.value}static setValue(t,o){let n=document.querySelector(t);n&&(n.value=o)}static getChecked(t){var o;return(o=document.querySelector(t))==null?void 0:o.checked}static setChecked(t,o){let n=document.querySelector(t);n&&(n.checked=o)}static joinValues(t,o=" "){return t.filter(Boolean).join(o)}static byId(t){return document.querySelector(`#${t}`)}static bySelector(t){return document.querySelector(t)}}});var ki,hm,mm,fs,fm,bs=m(()=>{"use strict";E();H();ki={downloadSize:1024*200},hm=e=>{ki.downloadSize=e},mm=()=>ki.downloadSize,fs=async(e,t,o,n=3,i="")=>{let r=e+(e.indexOf("?")===-1?"?":"");r+=`&start=${t.toString()}`,r+=`&length=${o.toString()}`;let a=0;for(;a<n;){try{let l=await re().renderPageFunctions.fetchData(r,void 0,!0,!0),c=l.headers.get("file-size"),d=l.headers.get("part-size");return!c||!d?(console.log("downloadFileChunk error",l),null):{fileSize:parseInt(c,10),partSize:parseInt(d,10),arrayBuffer:await l.arrayBuffer()}}catch(l){console.log(`downloadFileChunk error, try: ${a}`,l)}a++,i&&V.sendMessage(i.replace("${tryCount}",a.toString()),"var(--warning-bg-color)")}return null},fm=async(e,t,o=0,n=3,i="Downloading failed, try: ${tryCount}")=>{o<1&&(o=ki.downloadSize);let r=0,a=null;for(;;){let d=await fs(e,r,o,n,i);if(!d)return!1;a===null&&(a=d.fileSize),r+=d.partSize;let p=t(d);if(p!==void 0)return p;if(r>=a)break}return!0}});var bm,xs=m(()=>{"use strict";bm=(e,t)=>{let o=document.createElement("a");return o.setAttribute("href",e),o.setAttribute("download",t||"true"),o.style.display="none",document.body.appendChild(o),o.click(),setTimeout(()=>{document.body.removeChild(o)},3e3),o}});var xm,vs=m(()=>{"use strict";xm=(e,t)=>{let o=URL.createObjectURL(e),n=document.createElement("a");return n.setAttribute("href",o),n.setAttribute("download",t||"true"),n.style.display="none",document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n),URL.revokeObjectURL(o)},3e3),n}});var vm,ys=m(()=>{"use strict";vm=()=>{let e=!1,t=0,o=0,n=null,i=()=>{},r=()=>{},a=()=>{},l=!1,c=0,d=(u,g)=>{let f=g.clientX-u.clientX,b=g.clientY-u.clientY;return Math.sqrt(f*f+b*b)},p=()=>{r(),e=!1,l=!1,n=null};return{setOnMoveCallback:u=>{i=u},setOnMoveEndCallback:u=>{r=u},setOnScaleCallback:u=>{a=u},getDistance:d,getDraggingDom:()=>n,onMouseDown:u=>{if(u.preventDefault(),u.buttons!==1){e=!1,n=null;return}e=!0,l=!1,n=u.currentTarget,t=u.clientX,o=u.clientY},onMouseMove:u=>{if(u.buttons===0&&e&&p(),u.buttons===0||!n){e=!1,n=null;return}i(u.clientX,u.clientY,u.clientX-t,u.clientY-o)},onMouseUp:p,onTouchStart:u=>{u.touches.length===1?(e=!0,l=!1,n=u.currentTarget,t=u.touches[0].clientX,o=u.touches[0].clientY):u.touches.length===2?(c=d(u.touches[0],u.touches[1]),e=!1,l=!0):(e=!1,n=null)},onTouchMove:u=>{if(l){if(u.touches.length===2){u.preventDefault();let f=d(u.touches[0],u.touches[1])/c;a(f)}else p();return}if(u.touches.length===0&&e&&p(),u.touches.length===0||!n){e=!1,n=null;return}i(u.touches[0].clientX,u.touches[0].clientY,u.touches[0].clientX-t,u.touches[0].clientY-o)},onTouchEnd:p}}});var wi,ks=m(()=>{"use strict";wi=class{static loadScript(t,o,n=!1){return new Promise((i,r)=>{if(this.existScript(t,o)){i(t);return}let a=document.createElement("script");a.src=t,o&&(a.id=o),a.onload=()=>{i(t),n&&a.remove()},a.onerror=()=>{r(new Error("Failed to load module script with URL "+t)),n&&a.remove()};let l=document.getElementsByTagName("head")[0];l?l.appendChild(a):document.documentElement.appendChild(a)})}static existScript(t,o){if(o){let i=document.getElementById(o);if(i&&i.tagName==="SCRIPT"){let r=i.src.split("?")[0];if(r.substring(r.length-t.length)===t)return!0}}let n=document.scripts;for(let i=0;i<n.length;i++){let r=n[i].src.split("?")[0];if(r.substring(r.length-t.length)===t)return!0}}static loadCss(t,o){return new Promise((n,i)=>{if(this.existCss(t,o)){n(t);return}if(o){let a=document.getElementById(o);a&&a.tagName==="LINK"&&a.parentNode.removeChild(a)}let r=document.createElement("link");r.rel="stylesheet",r.type="text/css",r.href=t,r.media="all",o&&(r.id=o),r.onload=()=>{n(t)},r.onerror=()=>{i(new Error("Failed to load css with URL "+t))},document.getElementsByTagName("head")[0].appendChild(r)})}static existCss(t,o){if(o){let i=document.getElementById(o);if(i&&i.tagName==="LINK"){let r=i.href.split("?")[0];if(r.substring(r.length-t.length)===t)return!0}}let n=document.styleSheets;for(let i=0;i<n.length;i++){let a=n[i].href.split("?")[0];if(a.substring(a.length-t.length)===t)return!0}}}});var ym,we,km,wm,ws=m(()=>{"use strict";ym={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},we=e=>e.replace(/[&<>'"]/g,t=>ym[t]),km={"&amp;":"&","&lt;":"<","&gt;":">","&#39;":"'","&quot;":'"'},wm=e=>e.replace(/&(?:amp|lt|gt|quot|#39);/g,t=>km[t])});var Sm,Ss=m(()=>{"use strict";Sm=(e,t)=>{let o=t.toUpperCase(),n=e.parentElement;for(;n&&n.tagName!==o&&n.tagName!=="BODY";)n=n.parentElement;return n}});var Cm,Cs=m(()=>{"use strict";Cm=(e,t=2)=>{if(!+e)return"0 Bytes";let o=1024,n=t<0?0:t,i=["Bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],r=Math.floor(Math.log(e)/Math.log(o));return`${parseFloat((e/Math.pow(o,r)).toFixed(n))} ${i[r]}`}});var Si,Ts=m(()=>{"use strict";Si=class e{static queryOne(t,o){if(!t)return null;if(t instanceof e)return t;if(t instanceof Element)return new e(t);let n=(o||document).querySelector(t);return n?new e(n):null}static queryAll(t,o){if(!t)return[];if(t instanceof e)return[t];if(t instanceof Element)return[new e(t)];let n=(o||document).querySelectorAll(t),i=[];for(let r in n)i.push(new e(n[r]));return i}static createElement(t,o){let n=(o||document).createElement(t);return new e(n)}constructor(t,o){if(t instanceof e)this.node=t.node;else if(t instanceof Element)this.node=t;else{let n=t&&(o||document).querySelector(t);if(n)this.node=n;else throw new TypeError("Element is not defined for a new LibDom")}}getElement(){return this.node}$(t,o){let n=e.queryOne(t,this.node);return n&&typeof o<"u"&&("checked"in n.node?n.node.checked=!!o:"value"in n.node?n.node.value=o:"innerHTML"in n.node&&(n.node.innerHTML=""+o)),n}query(t){return e.queryOne(t,this.node)}queryAll(t){return e.queryAll(t,this.node)}on(t,o){return this.node.addEventListener(t,o,!1),this}off(t,o){return this.node.removeEventListener(t,o,!1),this}fire(t){return this.node.dispatchEvent(t),this}isCheckbox(){return this.tagName==="INPUT"&&this.node.type==="checkbox"}isRadio(){return this.tagName==="INPUT"&&this.node.type==="radio"}val(t){return typeof t>"u"?this.node.value:("value"in this.node&&(this.node.value=t),this)}checked(t){return typeof t>"u"?this.node.checked:("checked"in this.node&&(this.node.checked=!!t),this)}selectedIndex(t){return typeof t>"u"?this.node.selectedIndex:("selectedIndex"in this.node&&(this.node.selectedIndex=t),this)}html(t){return typeof t>"u"?this.node.innerHTML:("innerHTML"in this.node&&(this.node.innerHTML=t),this)}css(t,o){return typeof o>"u"?this.node instanceof HTMLElement&&this.node.style.getPropertyValue(t):(this.node instanceof HTMLElement&&(o===null?this.node.style.removeProperty(t):this.node.style.setProperty(t,o)),this)}attribute(t,o){return typeof o>"u"?this.node.getAttribute(t):(o===null?this.node.removeAttribute(t):this.node.setAttribute(t,o),this)}class(t,o){if(!t&&!o)return this.node.className;let n=this.node.classList;return t&&(t instanceof Array?n.add(...t):n.add(t)),o&&(o instanceof Array?n.remove(...o):n.remove(o)),this}appendChild(t){let o=t instanceof e?t.getElement():t;return o&&this.node.appendChild(o),this}removeChild(t){let o=t instanceof e?t.getElement():t;return o&&this.node.removeChild(o),this}removeSelf(){return this.node.remove(),this}get children(){if(!this.node.children)return[];let t=[];for(let o=0;o<this.node.children.length;o++)t.push(new e(this.node.children[o]));return t}get tagName(){return this.node.tagName.toUpperCase()}}});var Ci,Ti,Ps=m(()=>{"use strict";Ci=class{constructor(t,o,n){this.actionId=t;this.message=o;this.extraData=n}},Ti=class{constructor(t=!1){this.passLastMsgWhenSubscribe=t;this.subscriptions={};this.subscriptionValues={};this.lastId=0}subscribe(t,o,n=!0){let i=this.lastId++;return this.subscriptions[t]||(this.subscriptions[t]={}),this.subscriptions[t][i]=o,n&&this.passLastMsgWhenSubscribe&&this.subscriptionValues[t]&&this.notify(o,this.subscriptionValues[t]),()=>{delete this.subscriptions[t][i];var r=!0;for(var a in this.subscriptions[t]){r=!1;break}r&&delete this.subscriptions[t]}}send(t,o){if(t==="*"){for(var n in this.subscriptions)for(var i in this.subscriptions[n])this.notify(this.subscriptions[n][i],o);return}if(this.passLastMsgWhenSubscribe&&(this.subscriptionValues[t]=o),this.subscriptions[t])for(var i in this.subscriptions[t])this.notify(this.subscriptions[t][i],o);if(this.subscriptions["*"])for(var i in this.subscriptions["*"])this.notify(this.subscriptions["*"][i],o)}hasListener(t){if(t==="*")for(var o in this.subscriptions)return!0;else for(var o in this.subscriptions[t])return!0;return!1}notify(t,o){setTimeout(()=>{t(o)},0)}}});var Xo,Ko,Pi,Ms=m(()=>{"use strict";Xo=class{constructor(t){this._unsubscribe=t}unsubscribe(){this._unsubscribe&&this._unsubscribe()}},Ko=class{constructor(){}subscribe(t,o,n){throw new Error("subscribe is not implemented")}},Pi=class extends Ko{constructor(o=!1){super();this.observers=[];this.isStopped=!1;this._hasError=!1;this.lastSaved={};this.passLastMsgWhenSubscribe=o}next(o){if(this.isStopped)throw new Error("Subject is closed");let n=this.observers.length,i=this.observers.slice();for(let r=0;r<n;r++){let a=i[r].next;typeof a<"u"&&typeof o<"u"&&a(o)}this.passLastMsgWhenSubscribe&&typeof o<"u"&&(this.lastSaved.value=o)}error(o){if(this.isStopped)throw new Error("Subject is closed");this._hasError=!0,this.isStopped=!0;let n=this.observers.length,i=this.observers.slice();for(let r=0;r<n;r++){let a=i[r].error;typeof a<"u"&&typeof o<"u"&&a(o)}this.observers.length=0}complete(){if(this.isStopped)throw new Error("Subject is closed");this.isStopped=!0;let o=this.observers.slice(),n=o.length;for(let i=0;i<n;i++){let r=o[i].complete;typeof r<"u"&&r()}this.observers.length!=n&&console.warn(`Subscribe count changed from ${n} to ${this.observers.length}`),this.observers.length=0}hasError(){return this._hasError}unsubscribe(o){let n=this.observers.findIndex(i=>i===o);n>-1&&this.observers.splice(n,1)}subscribe(o,n,i){if(this.isStopped)throw new Error("Subject is stopped");let r={next:o,error:n,complete:i};return this.observers.push(r),this.passLastMsgWhenSubscribe&&typeof r.next<"u"&&typeof this.lastSaved.value<"u"&&r.next(this.lastSaved.value),new Xo(()=>{this.unsubscribe(r)})}asObservable(){return this}}});var Ls,Es=m(()=>{"use strict";Ls={join(...e){var n;let t=e.filter(Boolean).join("/");return t=t.replace(/\/+/g,"/"),((n=e[0])==null?void 0:n.startsWith("/"))?"/"+t.replace(/^\/+/,""):t.replace(/^\/+/,"")},dirname(e){if(!e)return".";e=e.replace(/\/+$/,"");let t=e.lastIndexOf("/");return t===-1?".":t===0?"/":e.slice(0,t)},basename(e,t){if(!e)return"";e=e.replace(/\/+$/,"");let o=e.lastIndexOf("/"),n=o===-1?e:e.slice(o+1);if(t)t&&n.endsWith(t)&&(n=n.slice(0,-t.length));else{let i=e.lastIndexOf(".");i>=0&&(n=n.slice(0,i))}return n},extname(e){if(!e)return"";let t=Ls.basename(e),o=t.lastIndexOf(".");return o>0?t.slice(o):""}}});var Tm,As=m(()=>{"use strict";Tm=e=>new Promise(t=>setTimeout(t,e))});var Mi,Rs=m(()=>{"use strict";Mi=class{constructor(t){this.settings={};this.settings=t}contains(t){return t in this.settings}set(t,o){return this.settings[t]=o}get(t,o){return t in this.settings?this.settings[t]:o}getInt(t,o){if(t in this.settings){let n=parseInt(this.settings[t]);if(!isNaN(n))return n}return o}getBoolean(t,o){return t in this.settings?this.settings[t]==="1"||this.settings[t].toLowerCase()==="true":o}getJson(t,o){if(t in this.settings)try{return JSON.parse(this.settings[t])}catch{}return o}}});var X,Ds=m(()=>{"use strict";X=e=>{e&&(e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,e.returnValue=!1)}});function s(e,t){return{type:e,props:t}}function ae(e){return{type:"Fragment",props:e}}var h=m(()=>{"use strict"});var se,Li,eo,to,Pm,oo,Mm,Lm,Ei=m(()=>{"use strict";H();pe();h();se=class{static async show({title:t,children:o,contentMaxWidth:n,contentMaxHeight:i,closeEvent:r,closeWhenClickOutside:a=!0,confirmButtonText:l="",handleConfirmClicked:c,cancelButtonText:d="Cancel",zIndex:p}){let u=()=>{c?c(b):b("confirm")},g=()=>{b("cancel")},f=k=>{a!==!1&&k.target.classList.contains("act-sheet-box")&&b("cancel")},b=k=>{r==null||r(k),v.current.classList.remove("animation-open"),setTimeout(()=>{x.remove()},300)},x=document.createElement("div"),v={onLoad:async()=>{setTimeout(()=>{v.current.classList.add("animation-open")},1)}},y=s("div",{css:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"var(--cover-mask-bg-color)",".act-sheet-body":{display:"flex",flexDirection:"column",textAlign:"center",position:"fixed",bottom:"0px",left:"0px",width:"100%",maxHeight:i||"100%",color:"var(--primary-color)",padding:"8px",transition:"all 0.3s",transform:"translateY(100%)","&.animation-open":{transform:"translateY(0)"},".act-sheet-title":{padding:"20px 15px 10px 15px",opacity:.5},".act-sheet-content":{display:"flex",flexDirection:"column",flex:1,overflowY:"auto",borderRadius:"8px",backgroundColor:"var(--cover-bg-color)",width:"100%",maxWidth:n||"clamp(200px, 90%, 600px)",margin:"0 auto"},".act-sheet-bottom-item, .act-sheet-item":{backgroundColor:"var(--cover-bg-color)",padding:"20px 0",cursor:"pointer",transition:"all 0.3s ease",width:"100%",maxWidth:n||"clamp(200px, 90%, 600px)",borderTop:"1px solid var(--primary-border-color)"},".act-sheet-bottom-item":{borderRadius:"8px",margin:"0 auto",marginTop:"4px"},".act-sheet-bottom-item:hover, .act-sheet-item:hover":{fontWeight:"bold"},".act-sheet-confirm, .act-sheet-item":{borderRadius:"unset",marginTop:"unset",maxWidth:"unset"}}},class:"act-sheet-box",onClick:f,"data-back-action":ke.genBackActionId(),children:s("div",{ref:v,class:"act-sheet-body",children:[s("div",{class:"act-sheet-content",children:[s("div",{class:"act-sheet-title",children:t}),o,l&&s("div",{class:"act-sheet-bottom-item act-sheet-confirm",onClick:u,children:l})]}),d&&s("div",{class:"act-sheet-bottom-item",onClick:g,children:d})]})});return x.style.position="fixed",x.style.zIndex=p||"var(--layer-actionsheet-window)",document.body.appendChild(x),await te(x,y),b}},Li={YesNo:["Yes","No"],Ok:["OK"]},eo=class{static async show({title:t,contentMaxHeight:o,options:n=Li.Ok,closeEvent:i,handleClicked:r,closeWhenClickOutside:a=!0,confirmButtonText:l,handleConfirmClicked:c,cancelButtonText:d="Cancel"}){let p=await se.show({title:t,children:s("div",{children:n.map((u,g)=>s("div",{class:"act-sheet-item",onClick:()=>r(g,p),children:u},g))}),contentMaxHeight:o,confirmButtonText:l,handleConfirmClicked:c,cancelButtonText:d,closeEvent:i,closeWhenClickOutside:a});return p}},to=class{static async show({title:t,message:o,contentMaxWidth:n,contentMaxHeight:i,closeWhenClickOutside:r=!0,confirmButtonText:a,handleConfirmClicked:l,cancelButtonText:c=""}){let d=await se.show({title:t,children:s("div",{css:{padding:"8px",borderTop:"1px solid var(--primary-border-color)"},onClick:()=>d("select"),children:o}),contentMaxWidth:n,contentMaxHeight:i,confirmButtonText:a,handleConfirmClicked:l,cancelButtonText:c,closeWhenClickOutside:r});return d}},Pm=async({title:e,message:t,contentMaxWidth:o,contentMaxHeight:n,closeWhenClickOutside:i=!0,confirmButtonText:r,zIndex:a})=>new Promise(async(l,c)=>{let d=p=>{l()};await se.show({title:e,children:s("div",{css:{padding:"8px",borderTop:"1px solid var(--primary-border-color)"},children:t}),contentMaxWidth:o,contentMaxHeight:n,confirmButtonText:r,closeEvent:d,closeWhenClickOutside:i,zIndex:a})}),oo=class{static async show({title:t,defaultValue:o,contentMaxHeight:n,closeWhenClickOutside:i=!0,confirmButtonText:r="OK",handleConfirmValue:a,cancelButtonText:l="Cancel"}){let c=o||"";return await se.show({title:t,children:s("div",{css:{padding:"8px",borderTop:"1px solid var(--primary-border-color)"},children:s("input",{class:"input-base w-100p",type:"text",value:c,onInput:p=>c=p.target.value})}),contentMaxHeight:n,confirmButtonText:r,handleConfirmClicked:p=>{a(c,p)},cancelButtonText:l,closeWhenClickOutside:i})}},Mm=async({title:e,defaultValue:t,contentMaxWidth:o,contentMaxHeight:n,closeWhenClickOutside:i=!0,confirmButtonText:r="OK",cancelButtonText:a="Cancel",zIndex:l})=>new Promise(async(c,d)=>{let p=g=>{g!=="confirm"&&c(void 0)},u=t||"";await se.show({title:e,children:s("div",{css:{padding:"8px",borderTop:"1px solid var(--primary-border-color)"},children:s("input",{class:"input-base w-100p",type:"text",value:u,onInput:g=>u=g.target.value})}),contentMaxWidth:o,contentMaxHeight:n,confirmButtonText:r,handleConfirmClicked:g=>{c(u),g("confirm")},closeEvent:p,cancelButtonText:a,closeWhenClickOutside:i,zIndex:l})}),Lm=async({title:e,contentMaxWidth:t,contentMaxHeight:o,options:n=Li.Ok,closeWhenClickOutside:i=!0,cancelButtonText:r="Cancel",zIndex:a})=>new Promise(async(l,c)=>{let d=async(g,f)=>{l(g),f("select")},p=g=>{g!=="select"&&l(-1)},u=await se.show({title:e,children:s("div",{children:n.map((g,f)=>s("div",{class:"act-sheet-item",onClick:()=>d(f,u),children:g},f))}),contentMaxWidth:t,contentMaxHeight:o,cancelButtonText:r,closeEvent:p,closeWhenClickOutside:i,zIndex:a})})});var Qo,Ai,Ri=m(()=>{"use strict";h();Qo=(r=>(r.SmallSmall="button-ss",r.Small="button-s",r.Medium="button-m",r.Large="button-l",r.LargeLarge="button-ll",r))(Qo||{}),Ai=e=>{let t=e.disabled||!1,o=()=>{t||e.onClick&&e.onClick()};e.hook&&(e.hook.setEnabled=r=>{t=!r,n.current.disabled=t},e.hook.getEnabled=()=>!t);let n={},i={all:"unset",cursor:"pointer","-webkit-tap-highlight-color":"rgba(0, 0, 0, 0)",position:"relative",borderRadius:"var(--border-radius-m)",backgroundColor:"rgba(0, 0, 0, 0.75)",boxShadow:"-0.15em -0.15em 0.15em -0.075em rgba(5, 5, 5, 0.25), 0.0375em 0.0375em 0.0675em 0 rgba(5, 5, 5, 0.1)",".button-outer":{position:"relative",zIndex:1,borderRadius:"inherit",transition:"box-shadow 300ms ease",willChange:"box-shadow",boxShadow:"0 0.05em 0.05em -0.01em rgba(5, 5, 5, 1), 0 0.01em 0.01em -0.01em rgba(5, 5, 5, 0.5), 0.15em 0.3em 0.1em -0.01em rgba(5, 5, 5, 0.25)"},".button-inner":{position:"relative",zIndex:2,borderRadius:"inherit",padding:"var(--button-padding)",background:"linear-gradient(135deg, #ffffff, #eeeeee)",transition:"box-shadow 300ms ease, background-image 250ms ease, transform 250ms ease;",willChange:"box-shadow, background-image, transform",overflow:"clip",boxShadow:"0 0 0 0 inset rgba(5, 5, 5, 0.1), -0.05em -0.05em 0.05em 0 inset rgba(5, 5, 5, 0.25), 0 0 0 0 inset rgba(5, 5, 5, 0.1), 0 0 0.05em 0.2em inset rgba(255, 255, 255, 0.25), 0.025em 0.05em 0.1em 0 inset rgba(255, 255, 255, 1), 0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25), -0.075em -0.25em 0.25em 0.1em inset rgba(5, 5, 5, 0.25)"},".button-inner span":{position:"relative",zIndex:4,letterSpacing:"-0.05em",color:"rgba(0, 0, 0, 0);",backgroundImage:"linear-gradient(135deg, rgba(25, 25, 25, 1), rgba(75, 75, 75, 1))",backgroundClip:"text",transition:"transform 250ms ease",display:"block",willChange:"transform",textShadow:"rgba(0, 0, 0, 0.1) 0 0 0.1em",userSelect:"none"},"&:disabled .button-inner span":{backgroundImage:"linear-gradient(135deg, rgba(150, 150, 150, 1), rgba(200, 200, 200, 1))",opacity:.7},"&.button-ss":{borderRadius:"2px"},"&.button-s":{borderRadius:"3px"},"&.button-l":{borderRadius:"6px"},"&.button-ll":{borderRadius:"10px"},"&.button-ss .button-inner":{padding:"0.1rem 0.3rem",fontSize:"0.65rem"},"&.button-s .button-inner":{padding:"0.2rem 0.5rem",fontSize:"0.85rem"},"&.button-l .button-inner":{padding:"0.4rem 1.2rem",fontSize:"1.5rem"},"&.button-ll .button-inner":{padding:"0.5rem 1.5rem",fontSize:"2rem"},"&:active:not(:disabled) .button-outer":{boxShadow:"0 0 0 0 rgba(5, 5, 5, 1), 0 0 0 0 rgba(5, 5, 5, 0.5), 0 0 0 0 rgba(5, 5, 5, 0.25)"},"&:active:not(:disabled) .button-inner":{boxShadow:"0.1em 0.15em 0.05em 0 inset rgba(5, 5, 5, 0.75), -0.025em -0.03em 0.05em 0.025em inset rgba(5, 5, 5, 0.5), 0.25em 0.25em 0.2em 0 inset rgba(5, 5, 5, 0.5), 0 0 0.05em 0.5em inset rgba(255, 255, 255, 0.15), 0 0 0 0 inset rgba(255, 255, 255, 1), 0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25), -0.075em -0.12em 0.2em 0.1em inset rgba(5, 5, 5, 0.25)"},"&:hover:not(:disabled) .button-inner":{transform:"scale(0.99)"},"&:hover:not(:disabled) .button-inner span":{transform:"scale(0.975)"},...e.css};return s("button",{ref:n,css:i,class:["button-push-animation",e.size,e.class].join(" "),disabled:t,onClick:o,children:s("div",{class:"button-outer",children:s("div",{class:"button-inner",children:s("span",{children:e.text})})})})}});var Re,_,ft=m(()=>{"use strict";h();Re=(r=>(r.SmallLarge="button-ss",r.Small="button-s",r.Medium="button-m",r.Large="button-l",r.LargeLarge="button-ll",r))(Re||{}),_=e=>{let t=e.disabled||!1,o=()=>{t||e.onClick&&e.onClick()};e.hook&&(e.hook.setEnabled=i=>{t=!i,n.current.disabled=t},e.hook.getEnabled=()=>!t);let n={};return s("button",{ref:n,class:["button-base",e.size,e.class].join(" "),css:e.css,disabled:t,onClick:o,children:e.text})}});var no,Di,io,Hi,Zo=m(()=>{"use strict";h();no=(i=>(i.Small="22px",i.Medium="30px",i.Large="40px",i.LargeLarge="60px",i))(no||{}),Di=({size:e="30px",color:t="var(--primary-color)"})=>{let o=e==="22px"||e==="30px"?"4px":e==="40px"?"6px":"9px",n={width:e,aspectRatio:1,borderRadius:"50%",background:`radial-gradient(farthest-side,${t} 94%,#0000) top/8px 8px no-repeat, conic-gradient(#0000 30%,${t})`,"-webkit-mask":`radial-gradient(farthest-side,#0000 calc(100% - ${o}),#000 0)`,animation:"spinner01 1s infinite linear","@keyframes spinner01":{"100%":{transform:"rotate(1turn)"}}};return s("div",{css:n})},io=({size:e="30px",color:t="var(--primary-color)"})=>{let o=parseInt(e.replace("px","")),n=Array.from({length:7},(r,a)=>`${(a*o/15/7).toFixed(2)}px`),i={width:e,height:e,display:"flex",placeItems:"center",justifyContent:"center",".spinner02-box":{"--spin02-w":`${o/2-3}px`,width:"4px",height:"4px",borderRadius:"50%",color:t,boxShadow:`
    calc(1*var(--spin02-w))      calc(0*var(--spin02-w))      0 0,
    calc(0.707*var(--spin02-w))  calc(0.707*var(--spin02-w))  0 ${n[1]},
    calc(0*var(--spin02-w))      calc(1*var(--spin02-w))      0 ${n[2]},
    calc(-0.707*var(--spin02-w)) calc(0.707*var(--spin02-w))  0 ${n[3]},
    calc(-1*var(--spin02-w))     calc(0*var(--spin02-w))      0 ${n[4]},
    calc(-0.707*var(--spin02-w)) calc(-0.707*var(--spin02-w)) 0 ${n[5]},
    calc(0*var(--spin02-w))      calc(-1*var(--spin02-w))     0 ${n[6]}`,animation:"spinner02 1s infinite steps(8)"},"@keyframes spinner02":{"100%":{transform:"rotate(1turn)"}}};return s("div",{css:i,children:s("div",{class:"spinner02-box"})})},Hi=({size:e="30px",colorRGB:t="55 55 55"})=>{let o={width:e,height:e,aspectRatio:1,display:"grid",borderRadius:"50%",background:`linear-gradient(0deg, rgb(${t} / 50%) 30%, #0000 0 70%, rgb(${t} / 100%) 0) 50% / 8% 100%, linear-gradient(90deg, rgb(${t} / 25%) 30%, #0000 0 70%, rgb(${t} / 75%) 0) 50% / 100% 8%`,backgroundRepeat:"no-repeat",animation:"spinner03 1s infinite steps(12)","&::before, &::after":{content:'""',gridArea:"1/1",borderRadius:"50%",background:"inherit",opacity:.915,transform:"rotate(30deg)"},"&::after":{opacity:.83,transform:"rotate(60deg)"},"@keyframes spinner03":{"100%":{transform:"rotate(1turn)"}}};return s("div",{css:o})}});var Em,Hs=m(()=>{"use strict";Zo();h();Em=e=>{let t={display:"flex",flexDirection:"column",width:"100%",height:"0px",position:"relative",".drag-spinner":{position:"fixed",top:"0",left:"0",width:"100%",zIndex:"var(--layer-dragged-item)",display:"none",justifyContent:"center",transition:"opacity 0.5s ease",alignItems:"end",backgroundImage:"linear-gradient(to bottom, rgba(200,200,200,0.8), rgba(255,255,255,0))"},"&.show .drag-spinner":{display:"flex"}},o=!1;e.hook&&(e.hook.setCheckEnabled=r=>{e.checkEnabled=r},e.hook.setOnDragRefresh=r=>{e.onDragRefresh=r});let n=()=>{let r=i.$(".drag-spinner");r&&(r.style.opacity="0",setTimeout(()=>{r.style.opacity="1",r.parentElement.classList.remove("show")},300))},i={onLoad:async()=>{let r=document.querySelector(e.container),a=i.current,l=i.$(".drag-spinner");if(!r||!a||!l)return;let c=0,d=0,p="",u=!1,g=150;r.addEventListener("touchstart",f=>{o=e.checkEnabled&&e.onDragRefresh?e.checkEnabled():!1,o&&(c=f.touches[0].clientY,d=f.touches[0].clientX,p="",u=!1)}),r.addEventListener("touchmove",f=>{if(!o)return;let b=f.touches[0].clientY,x=f.touches[0].clientX,v=b-c,T=x-d;p===""&&(Math.abs(v)>Math.abs(T)?p="Y":p="X"),p==="Y"&&(r.scrollTop<=0&&v>5?(u=v>60,v>5?(a.classList.add("show"),l.style.height=`${Math.min(g,v)}px`):(a.classList.remove("show"),l.style.height="0")):(a.classList.remove("show"),l.style.height="0"))}),r.addEventListener("touchend",f=>{var b;o&&(p==="Y"&&(u?(b=e.onDragRefresh)==null||b.call(e,n):n()),p="")})}};return s("div",{css:t,ref:i,class:"drag-refresh-box",children:s("div",{class:"drag-spinner",children:s(io,{size:"40px"})})})}});var Ii,zi=m(()=>{"use strict";h();Ii=e=>{let t=!1,o=e.text,n=()=>{if(t)return;t=!0;let d=c.$("input.editable-label");o=d.value,d.removeAttribute("readonly"),d.classList.remove("not-editable"),d.setSelectionRange(0,0)},i=()=>{let d=c.$("input.editable-label");return d.setAttribute("readonly","readonly"),d.classList.add("not-editable"),o="",t=!1,d},r=d=>{if(t){if(d.key==="Enter")a();else if(d.key==="Escape"){let p=c.$("input.editable-label");p.value=o,i()}}},a=()=>{var u;let d=o,p=i();d!==p.value&&(e.mandtory===!0&&!p.value?p.value=d:(u=e.save)==null||u.call(e,p.value))};e.hook&&(e.hook.updateValue=d=>{let p=c.$("input.editable-label");p.value=d});let l={".not-editable":{borderColor:"transparent",boxShadow:"unset"},"input.editable-label":{width:"100%"}},c={};return s("div",{css:l,ref:c,children:s("input",{class:"input-base editable-label not-editable",onDblClick:n,onKeyDown:r,value:e.text,onBlur:a,readOnly:!0})})}});var K,bt,en=m(()=>{"use strict";H();pe();h();K=class K{static init(){window.addEventListener("mousemove",K.onMousemove.bind(K),!1),document.documentElement.addEventListener("mouseup",K.onMouseup.bind(K),!1)}static async show({title:t,children:o,contentMaxHeight:n,contentMinWidth:i,buttons:r,noMoving:a=!1,noModal:l=!1,closeEvent:c,handleClicked:d,closeWhenClickOutside:p=!1,zIndex:u,contentOverflowY:g="auto"}){let f=C=>{p!==!1&&C.target.classList.contains("fwin-box")&&b()},b=()=>{c==null||c(),k.current.classList.add("transition"),k.current.classList.remove("animation"),setTimeout(()=>{x.remove()},300)},x=document.createElement("div"),v=C=>{a||(this.initialized||(this.initialized=!0,this.init()),K.hostNode=k.current,K.onMousedown.bind(K)(C))},T=!r||r.length===0?["OK","Cancel"]:r,y=C=>{d(C,b)},k={onLoad:async()=>{k.current.classList.add("transition"),setTimeout(()=>{k.current.classList.add("animation")},1),setTimeout(()=>{k.current.classList.remove("transition")},300)}},P={position:l?"":"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:l?"":"var(--cover-mask-bg-color)",".fwin-body":{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%) scale(0.1)",color:"var(--primary-color)",backgroundColor:"var(--cover-bg-color)",border:"var(--primary-border)",borderRadius:"6px",minWidth:i||"",maxWidth:"90%",boxShadow:"var(--cover-box-shadow)",opacity:0,"&.transition":{transition:"all 0.3s"},"&.animation":{transform:"translate(-50%, -50%) scale(1)",opacity:1},"&.animation-close":{transition:"all 0.3s",transform:"translate(-50%, -50%) scale(0)",opacity:0},".fwin-title":{padding:"10px 15px 5px",borderBottom:"var(--primary-border)",".fwin-close":{color:"#aaaaaa",float:"right",fontSize:"26px",fontWeight:"bold",cursor:"pointer",marginTop:"-8px",marginRight:"-10px"},".fwin-close:hover":{transition:"all 300ms ease",color:"#555555"}},".fwin-content":{padding:"15px",maxHeight:n?`min(${n}, calc(100% - 100px))`:"calc(100% - 100px)",overflowY:g},".fwin-bottom":{display:"flex",padding:"5px 15px",borderTop:"var(--primary-border)",justifyContent:"end",">div":{marginLeft:"5px"}}}},z=s("div",{css:P,class:"fwin-box",onClick:f,children:s("div",{ref:k,class:"fwin-body",onMouseDown:v,children:[s("div",{class:"fwin-title",children:[t,s("span",{class:"fwin-close",onClick:b,children:"\xD7"})]}),s("div",{class:"fwin-content",children:o}),s("div",{class:"fwin-bottom",children:T.map((C,O)=>s("button",{class:"button-base button-s mr-m",onClick:()=>{y(O)},children:C}))})]})});return x.style.position="fixed",x.style.zIndex=u||"var(--layer-float-window)",document.body.appendChild(x),await te(x,z),b}static onMousedown(t){if(t.buttons!==1||t.button!==0||t.srcElement.className!=="fwin-title")return;this.pressed=!0,this.startX=t.clientX,this.startY=t.clientY;let o=document.defaultView.getComputedStyle(this.hostNode);this.startTop=parseInt(o.top,10),this.startLeft=parseInt(o.left,10)}static onMousemove(t){if(!this.pressed||t.buttons!==1||t.button!==0||(X(t),t.clientX<0||t.clientY<0||t.clientX>window.innerWidth||t.clientY>window.innerHeight))return;let o=this.startLeft+(t.clientX-this.startX),n=this.startTop+(t.clientY-this.startY);n<=0&&(n=0),o<=0&&(o=0),this.hostNode.style.top=n+"px",this.hostNode.style.left=o+"px"}static onMouseup(){this.pressed&&(this.pressed=!1)}};K.initialized=!1,K.pressed=!1,K.startX=0,K.startY=0,K.startTop=0,K.startLeft=0;bt=K});var Am,Is=m(()=>{"use strict";h();Am=({gridOption:e})=>{let t={display:"grid",...e.options},o=[];e.cells.forEach((i,r)=>{let a=i.name||"cell"+r;t[`.${a}`]=i.option,o.push(s("div",{class:a,children:i.component}))});let n="grid-box"+(e.className?` ${e.className}`:"");return s("div",{css:t,class:n,children:o})}});var Rm,zs=m(()=>{"use strict";Rm=e=>{let t={onLoad:async o=>{let n=await e.html();await t.mountInnerComponent(n)}};return e.hook&&(e.hook.getRef=()=>t,e.hook.render=o=>{t.mountInnerComponent(o)}),{type:"Fragment",props:{ref:t,children:e.initialHtml||""},html:[]}}});var D,ji=m(()=>{"use strict";D=class{constructor(t){this._dirty=!1;this.promise=new Promise(o=>{this.resolve=o}),this._value=t||"",this._ref={onLoad:async o=>{let n=this.resolve;this._dirty&&await this.update(),n()}}}async update(){let t=typeof this._value=="function"?await this._value():this._value;await this._ref.mountInnerComponent(t),this._dirty=!1,this._value=""}async waitUpdate(){await this.promise}set value(t){this._value=t,!this._dirty&&(this._dirty=!0,this._ref.current&&(this.promise=new Promise(async o=>{this.resolve=o,await this.update(),this.resolve()})))}get value(){return this._ref.current?this._ref.current.innerHTML:this._value}get ref(){return this._ref}get node(){let t=typeof this._value=="function";return this._dirty=!!t,{type:"Fragment",props:{ref:this._ref,children:t?"":this._value},html:[]}}}});var Bi,Oi=m(()=>{"use strict";h();Bi=(e,t,o,n,i="input-base",r="100%")=>s("div",{children:[s("div",{style:{paddingBottom:"4px"},children:e}),s("div",{children:s("input",{class:i,style:{width:r},onChange:a=>{var l;return o==null?void 0:o((l=a==null?void 0:a.target)==null?void 0:l.value)},onInput:a=>{var l;return n==null?void 0:n((l=a==null?void 0:a.target)==null?void 0:l.value)},value:t})})]})});var ro,tn=m(()=>{"use strict";h();ro=e=>s("a",{class:["link-item",e.className].join(" "),href:e.url,alt:e.alt||e.text,children:e.text})});var Dm,js=m(()=>{"use strict";tn();h();Dm=({title:e,items:t,className:o,textColor:n="black",backgroundColor:i="#d3d3d3",titleBackgroundColor:r="#b6b6b6"})=>s("div",{css:{width:"100%",margin:"auto",height:"auto",backgroundColor:i,".link-list-title, .link-list-top":{display:"flex",width:"100%",flexWrap:"wrap",padding:"0 16px"},".link-list-title":{backgroundColor:r},".link-list-item":{display:"inline-block",color:n,padding:"8px 16px 8px 0",textDecoration:"none"},".link-list-item:last-child":{paddingRight:"unset"},".link-list-title .link-list-item":{fontSize:"18px"}},class:["link-list-box",o].join(" "),children:[e&&s("div",{class:"link-list-title",children:s("div",{class:"link-list-item",children:e})}),s("div",{class:"link-list-top",children:t.map(l=>s(ro,{className:"link-list-item",url:l.url,alt:l.alt,text:l.text}))})]})});function Hm(e,t,o){let n=Number.parseInt(t)+o;return e===0?`@media only screen and (max-width: ${n}px)`:`@media only screen and (min-width: ${n}px)`}var oe,G,Q,Bs,Os=m(()=>{"use strict";oe=class oe{static get ExtraSmallMax(){return oe._ExtraSmall}static get MobileMax(){return oe._Mobile}static get TabletMax(){return oe._Tablet}static get DesktopMax(){return oe._Desktop}static set ExtraSmallMax(t){oe._ExtraSmall=t}static set MobileMax(t){oe._Mobile=t}static set TabletMax(t){oe._Tablet=t}static set DesktopMax(t){oe._Desktop=t}};oe._ExtraSmall="480px",oe._Mobile="767px",oe._Tablet="991px",oe._Desktop="1399px";G=oe,Q=class{static get ExtraSmallBelow(){return`@media only screen and (max-width: ${G.ExtraSmallMax})`}static get ExtraSmallAbove(){return`@media only screen and (min-width: ${G.ExtraSmallMax})`}static get MobileBelow(){return`@media only screen and (max-width: ${G.MobileMax})`}static get MobileAbove(){return`@media only screen and (min-width: ${G.MobileMax})`}static get TabletBelow(){return`@media only screen and (max-width: ${G.TabletMax})`}static get TabletAbove(){return`@media only screen and (min-width: ${G.TabletMax})`}static get DesktopBelow(){return`@media only screen and (max-width: ${G.DesktopMax})`}static get DesktopAbove(){return`@media only screen and (min-width: ${G.DesktopMax})`}},Bs=(o=>(o[o.Below=0]="Below",o[o.Above=1]="Above",o))(Bs||{})});var ao,on=m(()=>{"use strict";ao={"--layer-inside":"100","--layer-cover":"200","--layer-header-footer":"300","--layer-sidebar":"400","--layer-sidebar-sub":"410","--layer-slider":"500","--layer-modal":"600","--layer-modal-over":"610","--layer-float-window":"700","--layer-actionsheet-window":"710","--layer-menu":"800","--layer-menu-sub":"810","--layer-notice":"900","--layer-tooltip":"2000","--layer-dragged-item":"2100","--layer-guide":"2500","--font-size-base":"16px","--font-weight-base":"","--font-family-base":'system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',"--line-height-base":"1.1","--font-size-h1-l":"2.5rem","--font-size-h1":"2rem","--font-size-h2":"1.5rem","--font-size-h3":"1.17rem","--font-size-h3-5":"1.08rem","--font-size-h4":"1rem","--font-size-h4-5":".91rem","--font-size-h5":".83rem","--font-size-h6":".67rem","--font-size-h6-s":".55rem","--font-size-title":"var(--font-size-h2)","--font-size-subtitle":"var(--font-size-h3-5)","--font-size-paragraph":"var(--font-size-h4)","--font-size-paragraph-s":"var(--font-size-h5)","--input-height":"2.2rem","--input-padding":".3rem .6rem","--button-height":"2.1rem","--button-padding":".3rem .9rem","--space-ss":".15rem","--space-s":".25rem","--space-m":".5rem","--space-l":"1rem","--space-ll":"2rem","--border-radius-s":"2px","--border-radius-m":"4px","--border-radius-l":"8px"}});var Fi,qi=m(()=>{"use strict";on();Fi={...ao,"--theme-name":"dark","--scrollbar-bg":"#1c1c1c","--scrollbar-thumb-bg":"#373636","--scrollbar-active-thumb-bg":"#5b5b5b","--primary-color":"#d8d8d8","--primary-color-disabled":"#7d7d7d","--primary-bg-color":"#000000","--primary-border-color":"#aeaeae","--primary-border":"1px solid var(--primary-border-color)","--primary-opacity":"0.5","--primary-disabled-opacity":"0.7","--primary-accent-color":"#1a588a","--secondary-color":"#747474","--secondary-bg-color":"#1c1c1c","--secondary-border-color":"#494949","--secondary-border":"1px solid var(--secondary-border-color)","--activatable-color-normal":"var(--primary-color)","--activatable-bg-color-normal":"var(--primary-bg-color)","--activatable-color-hover":"#e2e2e2","--activatable-bg-color-hover":"#6d6d6d","--activatable-color-selected":"#c2c2c2","--activatable-bg-color-selected":"#5d5d5d","--menu-font-size":"1rem","--menubar-color":"#eeeeee","--menubar-bg-color":"#000000","--menubar-sub-bg-color":"#f9f9f9","--sidebar-color":"var(--primary-color)","--sidebar-bg-color":"#000000","--sidebar-border":"1px solid #303030","--row-1-bg-color":"#212121","--row-2-bg-color":"#303030","--row-hover-bg-color":"#383838","--success-color":"#04AA6D","--info-color":"#2196F3","--warning-color":"#ff9800","--error-color":"#f44336","--success-bg-color":"#10553b","--info-bg-color":"#1a588a","--warning-bg-color":"#a36305","--error-bg-color":"#882c25","--notice-color-with-bg":"#ececec","--cover-mask-bg-color":"#878a9460","--cover-bg-color":"#202020","--cover-box-shadow":"1px 1px 4px #c6c6c6","--cover-box-shadow-around":"#ffffff 0 0 6px 1px","--input-color":"#bdbdbd","--input-bg-color":"#000000","--input-box-shadow":"0px 0px 0px #000000, 1px 1px 0px 0px #50505045","--input-border-focus":"1px solid #0074d9","--button-color":"#bdbdbd","--button-bg":"-webkit-linear-gradient(top, #282828 0%, #212223 74%, #1a1a1a 100%)","--button-bg-hover":"-webkit-linear-gradient(top, #282828 0%, #313233 74%, #252525 100%)","--button-border":"1px solid #373e48","--button-box-shadow":"unset","--header-color":"#000080","--header-bg-color":"#000000","--ss-group-color":"var(--primary-color)","--ss-group-bg-color":"#232323","--ss-row-btn-color":"#eee","--ss-row-btn-bg-color":"#262626","--ss-row-btn-warn-color":"red","--mobile-header-shadow":"0px -1px 4px 1px #848484"}});var nn,Ni=m(()=>{"use strict";on();nn={...ao,"--theme-name":"light","--scrollbar-bg":"#d5d5d5","--scrollbar-thumb-bg":"#979797","--scrollbar-active-thumb-bg":"#737373","--primary-color":"#303030","--primary-color-disabled":"#a0a0a0","--primary-bg-color":"#ffffff","--primary-border-color":"#858585","--primary-border":"1px solid var(--primary-border-color)","--primary-opacity":"unset","--primary-disabled-opacity":"0.5","--primary-accent-color":"#0a74c9","--secondary-color":"#818181","--secondary-bg-color":"#eeeeee","--secondary-border-color":"#a0a0a0","--secondary-border":"1px solid var(--secondary-border-color)","--activatable-color-normal":"var(--primary-color)","--activatable-bg-color-normal":"var(--primary-bg-color)","--activatable-color-hover":"#1d1d1d","--activatable-bg-color-hover":"#bcbcbc","--activatable-color-selected":"#2d2d2d","--activatable-bg-color-selected":"#dcdcdc","--menu-font-size":"1rem","--menubar-color":"#eeeeee","--menubar-bg-color":"#000000","--menubar-sub-bg-color":"#f9f9f9","--sidebar-color":"var(--primary-color)","--sidebar-bg-color":"#f4f3f4","--sidebar-border":"1px solid #858585","--row-bg-color1":"#ffffff","--row-bg-color2":"#ffffff","--success-color":"#04AA6D","--info-color":"#2196F3","--warning-color":"#ff9800","--error-color":"#f44336","--success-bg-color":"#04AA6D","--info-bg-color":"#2196F3","--warning-bg-color":"#ff9800","--error-bg-color":"#f44336","--notice-color-with-bg":"#ffffff","--cover-mask-bg-color":"#00000060","--cover-bg-color":"#f5f5f5","--cover-box-shadow":"3px 3px 8px #767676","--cover-box-shadow-around":"#000000 2px 4px 20px 1px","--input-color":"#4e4e4e","--input-bg-color":"#ffffff","--input-box-shadow":"0px 0px 0px #000000, 1px 1px 0px 0px #50505045","--input-border-focus":"1px solid #0074d9","--button-color":"#4e4e4e","--button-bg":"-webkit-linear-gradient(top, #ffffff 0%, #f6f6f6 74%, #ededed 100%)","--button-bg-hover":"-webkit-linear-gradient(top, #ffffff 0%, #e6e6e6 74%, #dddddd 100%)","--button-border":"1px solid #f6f6f6","--button-box-shadow":"1px 1px 1px #00000085, 0px 1px 0px 2px #0705053b","--header-color":"#000080","--header-bg-color":"#ffffff","--ss-group-color":"var(--primary-color)","--ss-group-bg-color":"var(--activatable-bg-color-selected)","--ss-row-btn-color":"#eee","--ss-row-btn-bg-color":"#333","--ss-row-btn-warn-color":"red","--mobile-header-shadow":"0 4px 4px var(--primary-border-color)"}});var rn,Fs=m(()=>{"use strict";qi();Ni();rn={light:nn,dark:Fi,lightGreen:{...nn,"--background-primary":"#d8ffe3","--color-primary":"#303030",backgroundPrimary:"",backgroundOnPrimary:"",backgroundSecondary:"#f5f5f7",backgroundOnSecondary:"#e5e5e7"}}});var an=m(()=>{"use strict";Os();on();qi();Ni();Fs()});var Im,zm,qs=m(()=>{"use strict";H();an();tn();h();Im=async e=>(await re().renderPageFunctions.fetchData(`/api/menu/get/${e}`)).json,zm=({menuId:e,items:t,className:o,textColor:n="var(--menubar-color)",backgroundColor:i="var(--menubar-bg-color)",hoverColor:r="var(--activatable-color-hover)",hoverBgColor:a="var(--activatable-bg-color-hover)",maxWidth:l="100%",maxWidthMobileMenu:c=G.TabletMax})=>{let d={width:"100%",maxWidth:l,margin:"auto",backgroundColor:i,position:"relative",".menu-bar-top":{display:"flex",width:"100%",justifyContent:"center"},".menu-bar-item":{display:"inline-block",color:n,padding:"14px 16px",textDecoration:"none",position:"relative"},".menu-bar-item:hover, .menu-bar-sub-box:hover > .menu-bar-item":{color:r,backgroundColor:a},".menu-bar-sub-box .menu-bar-sub":{display:"none",position:"absolute",backgroundColor:"var(--menubar-sub-bg-color)",minWidth:"165px",boxShadow:"0px 8px 16px 0px rgba(0,0,0,0.2)",zIndex:"var(--layer-menu-sub)",flexDirection:"column"},".menu-bar-sub-box > .menu-bar-item":{padding:"14px 26px 14px 16px",width:"100%"},".menu-bar-sub-box > .menu-bar-item::after":{content:'""',position:"absolute",top:"50%",transform:"translateY(-50%)",marginLeft:"6px",width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"5px solid "+n},".menu-bar-sub-box .menu-bar-sub > .menu-bar-item":{color:"black"},".menu-bar-sub-box:hover > .menu-bar-sub":{display:"flex"},".menu-bar-sub-box .menu-bar-sub .menu-bar-item:hover":{color:r,backgroundColor:a},".menu-bar-mobile":{display:"none",position:"relative",backgroundColor:i,padding:"5px 18px 6px",".menu-bar-toggle":{cursor:"pointer",padding:"14px 0 19px 0","span, span::before, span::after":{cursor:"pointer",height:"3px",width:"25px",borderRadius:"1px",background:"#ffffff",position:"absolute",display:"block",transition:"all 300ms ease-in-out"},"span::before, span::after":{content:'""'},"span::before":{top:"-10px"},"span::after":{bottom:"-10px"}},".menu-bar-toggle.active span":{backgroundColor:"transparent"},".menu-bar-toggle.active span::before":{transform:"rotate(45deg)",top:0},".menu-bar-toggle.active span::after":{transform:"rotate(-45deg)",top:0}},["@media only screen and (max-width: "+c+")"]:{".menu-bar-mobile":{display:"block"},".menu-bar-top":{display:"none"},".menu-bar-top.open":{display:"flex",flexDirection:"column"},".menu-bar-top.open .menu-bar-sub-box > .menu-bar-sub":{display:"flex",position:"unset",".menu-bar-item":{paddingLeft:"32px",color:n,backgroundColor:i},".menu-bar-item:hover":{color:r,backgroundColor:a}},".menu-bar-sub-box:hover > .menu-bar-item":{color:n,backgroundColor:i},".menu-bar-sub-box:hover > .menu-bar-item:hover":{color:r,backgroundColor:a}}},p=(f,b)=>s("div",{class:b,children:f.map(x=>x.items?s("div",{class:"menu-bar-sub-box",children:[s("div",{class:"menu-bar-item",children:x.text}),p(x.items,"menu-bar-sub")]}):s(ro,{className:"menu-bar-item",url:x.url,alt:x.alt,text:x.text}))}),u={onLoad:async()=>{if(e){let f=await Im(e);if(f.result&&f.result.items.length>0){let b=f.result.items.map(v=>{let T=v.split("	");return{text:T[5],url:T[4]}}),x=p(b,"menu-bar-top")}}}},g=()=>{u.$(".menu-bar-mobile .menu-bar-toggle").classList.toggle("active"),u.$(".menu-bar-top").classList.toggle("open")};return s("div",{ref:u,css:d,class:["menu-bar-box",o].join(" "),children:[s("div",{class:"menu-bar-mobile",children:s("div",{class:"menu-bar-toggle",onClick:g,children:s("span",{})})}),p(t,"menu-bar-top")]})}});var Ns=m(()=>{"use strict"});var sn,Ws=m(()=>{"use strict";H();pe();an();h();sn=({mobileMenu:e,desktopMenu:t,menuId:o,items:n,className:i,color:r="white",backgroundColor:a="dark",maxWidth:l="100%",maxWidthMobileMenu:c=G.TabletMax,isDevAdmin:d=!1})=>{let p={".menu-sidebar-top":{width:"100%",backgroundColor:"var(--sidebar-bg-color)",maxWidth:l,margin:"auto",position:"relative",display:"flex",justifyContent:"center",flexDirection:"column"},".menu-sidebar-item":{display:"inline-block",color:r,cursor:"pointer",padding:"14px 16px",textDecoration:"none",position:"relative",borderBottom:"var(--sidebar-border)"},".menu-sidebar-item:hover":{color:"var(--activatable-color-hover)",backgroundColor:"var(--activatable-bg-color-hover)"},".menu-sidebar-sub-box .menu-sidebar-sub":{display:"none",minWidth:"165px",zIndex:"var(--layer-sidebar-sub)",flexDirection:"column"},".menu-sidebar-sub-box > .menu-sidebar-item":{padding:"14px 26px 14px 16px",width:"100%"},".menu-sidebar-sub-box > .menu-sidebar-sub > .menu-sidebar-item":{paddingLeft:"32px"},".menu-sidebar-sub-box > .menu-sidebar-item::after":{content:'""',position:"absolute",top:"50%",transform:"translateY(-50%) rotate(-90deg)",marginLeft:"6px",width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"5px solid "+r,right:"10px",transition:"all 300ms ease-in-out"},".menu-sidebar-sub-box.open > .menu-sidebar-item::after":{transform:"rotate(0deg)"},"&.mobile .menu-sidebar-sub-box > .menu-sidebar-item::after":{transform:"rotate(0deg)"},".menu-sidebar-sub-box.open > .menu-sidebar-sub":{display:"flex"},".menu-sidebar-sub-box .menu-sidebar-sub .menu-sidebar-item:hover":{color:"var(--activatable-color-hover)",backgroundColor:"var(--activatable-bg-color-hover)"},".menu-sidebar-mobile":{display:"none",position:"relative",padding:"5px 4px 6px",".menu-sidebar-toggle":{cursor:"pointer",padding:"6px 0 8px 0","span, span::before, span::after":{cursor:"pointer",height:"3px",width:"25px",borderRadius:"1px",background:"var(--primary-color)",position:"absolute",display:"block",transition:"all 300ms ease-in-out"},"span::before, span::after":{content:'""'},"span::before":{top:"-7px"},"span::after":{bottom:"-7px"}},".menu-sidebar-toggle.active span":{backgroundColor:"transparent"},".menu-sidebar-toggle.active span::before":{transform:"rotate(45deg)",top:0},".menu-sidebar-toggle.active span::after":{transform:"rotate(-45deg)",top:0}},"&.mobile":{display:"none"},"&.mobile .menu-sidebar-mobile":{display:"block",width:"33px"},["@media only screen and (max-width: "+c+")"]:{display:"none","&.mobile":{display:"block"},"&.mobile.open":{position:"absolute",width:"100%",height:"100%",top:0,left:0,display:"flex",flexDirection:"column",backgroundColor:"#ccccccc2",zIndex:"var(--layer-sidebar)"},".menu-sidebar-top":{display:"none"},".menu-sidebar-top.open":{display:"flex",flexDirection:"column",flex:1,overflowY:"auto",width:"200px",marginLeft:"unset",justifyContent:"start"},".menu-sidebar-top.open .menu-sidebar-sub-box > .menu-sidebar-sub":{display:"flex",position:"unset",".menu-sidebar-item":{paddingLeft:"32px",color:r,backgroundColor:a},".menu-sidebar-item:hover":{color:"var(--activatable-color-hover)",backgroundColor:"var(--activatable-bg-color-hover)"}},".menu-sidebar-sub-box:hover > .menu-sidebar-item":{backgroundColor:"unset"},".menu-sidebar-sub-box:hover > .menu-sidebar-item:hover":{color:"var(--activatable-color-hover)",backgroundColor:"var(--activatable-bg-color-hover)"}}},u=(T,y)=>s("div",{class:y,children:T.filter(k=>d||!k.devAdmin).map(k=>{if(k.hide===!0)return null;let P={};return k.items?s("div",{ref:P,class:"menu-sidebar-sub-box",onClick:()=>b(P),children:[s("div",{class:"menu-sidebar-item",children:k.text}),u(k.items,"menu-sidebar-sub")]}):k.js?s("a",{class:"menu-sidebar-item",href:"javascript:void(0)",alt:k.alt||k.text,onClick:z=>{X(z),f(z),k.js&&k.js()},children:k.text}):s("a",{class:"menu-sidebar-item",href:k.url,alt:k.alt||k.text,target:"_blank",children:k.text})})}),g={},f=T=>{T.stopPropagation(),g.$(".menu-sidebar-mobile .menu-sidebar-toggle").classList.toggle("active"),g.$(".menu-sidebar-top").classList.toggle("open"),g.current.classList.toggle("open")},b=T=>{T.current.classList.toggle("open")};M("menu-sidebar-box",p);let x=!t&&!e||t&&e?{["@media only screen and (max-width: "+c+")"]:{display:"block",".menu-sidebar-top":{display:"block"}}}:{},v=T=>{g.current.classList.contains("open")&&f(T)};return s("div",{css:x,ref:g,class:["menu-sidebar-box",i,e?"mobile":""].join(" "),onClick:v,children:[s("div",{class:"menu-sidebar-mobile",children:s("div",{class:"menu-sidebar-toggle",onClick:f,children:s("span",{})})}),u(n,"menu-sidebar-top")]})}});var Wi,xt,_i=m(()=>{"use strict";en();Wi=(n=>(n.YesNo="yesno",n.OkCancel="okcancel",n.Ok="ok",n))(Wi||{}),xt=class{static async show({title:t,children:o,contentMaxHeight:n,contentMinWidth:i,buttonType:r="okcancel",noMoving:a=!1,noModal:l=!1,closeEvent:c,handleClicked:d,closeWhenClickOutside:p=!1}){let u=r==="okcancel"?["OK","Cancel"]:r==="yesno"?["Yes","No"]:["OK"];return bt.show({title:t,children:o,contentMaxHeight:n,contentMinWidth:i,buttons:u,noMoving:a,noModal:l,closeEvent:c,handleClicked:d,closeWhenClickOutside:p})}}});function jm(e){return!!(e.name&&e.content)}function Bm(e){return!!(e.property&&e.content)}function Om(e){return!!(e.httpEquiv&&e.content)}var Fm,_s=m(()=>{"use strict";H();pe();h();Fm=e=>(jm(e)?Ee(`name:${e.name}`,`<meta name="${e.name}" content="${we(e.content)}">`):Bm(e)?Ee(`property:${e.property}`,`<meta property="${e.property}" content="${we(e.content)}">`):Om(e)?Ee(`http-equiv:${e.httpEquiv}`,`<meta http-equiv="${e.httpEquiv}" content="${we(e.content)}">`):e.key&&e.string?Ee(`${e.key}`,`${e.string}`):console.warn("Unknown meta data:",e),s(ae,{}))});var qm,Us=m(()=>{"use strict";H();pe();h();qm=({children:e})=>(Ee("name:description",`<meta name="description" content="${we(e)}">`),s(ae,{}))});var so,Ui=m(()=>{"use strict";en();so=class{static async show({title:t,children:o,contentMaxHeight:n,contentMinWidth:i,buttons:r,noMoving:a=!0,noModal:l=!1,closeEvent:c,handleClicked:d,closeWhenClickOutside:p=!0,zIndex:u,contentOverflowY:g}){return bt.show({title:t,children:o,contentMaxHeight:n,contentMinWidth:i,buttons:r,noMoving:a,noModal:l,closeEvent:c,handleClicked:d,closeWhenClickOutside:p,zIndex:u,contentOverflowY:g})}}});var Ht,Nm,V,$i=m(()=>{"use strict";H();Ht=(i=>(i.Success="var(--success-bg-color)",i.Info="var(--info-bg-color)",i.Warning="var(--warning-bg-color)",i.Error="var(--error-bg-color)",i))(Ht||{}),Nm=e=>{switch(e){case"Success":return"var(--success-bg-color)";case"Info":return"var(--info-bg-color)";case"Warning":return"var(--warning-bg-color)";case"Error":return"var(--error-bg-color)"}return"var(--info-bg-color)"},V=class{static init(){M("lj_notification",{position:"fixed",top:0,right:0,height:"auto",overflowY:"auto",maxHeight:"100%",width:"100%",maxWidth:"400px",padding:"0 10px",zIndex:"var(--layer-notice)",">div":{color:"var(--notice-color-with-bg)",padding:"10px 8px",margin:"16px 0",borderRadius:"6px",boxShadow:"var(--cover-box-shadow)",transition:"all 0.5s",transform:"scale(0.1)",opacity:0},".close-btn":{position:"absolute",top:"-2px",right:"3px",color:"var(--notice-color-with-bg)",fontWeight:"bold",fontSize:"22px",lineHeight:"20px",cursor:"pointer",transition:"0.3s"},".close-btn:hover":{color:"black"}});let o=document.querySelector(".lj_notification");o||(o=document.createElement("div"),o.className="lj_notification",document.body.appendChild(o),this.container=o)}static sendMessage(t,o="var(--info-bg-color)",n=!1,i=3e3){this.initialized||(this.initialized=!0,this.init()),this.container.scrollTop=0;let r=document.createElement("div");if(r.innerHTML=t,r.style.backgroundColor=o,this.container.insertBefore(r,this.container.firstChild),setTimeout(()=>{r.style.opacity="1",r.style.transform="scale(1)"},0),n){let a=document.createElement("span");a.innerHTML="&times;",a.className="close-btn",r.appendChild(a),a.onclick=()=>{this.container.removeChild(r)}}else setTimeout(()=>{r.style.opacity="0",r.style.transform="scale(0.1)",setTimeout(()=>{this.container.removeChild(r)},1e3)},i)}};V.initialized=!1});var Wm,$s=m(()=>{"use strict";H();h();Wm=({children:e})=>(ci(e),s(ae,{}))});var Vi,Vs,Gs,_m,Um,Ys=m(()=>{"use strict";H();h();Vi=10,Vs=()=>Vi,Gs=e=>{Vi=e},_m=[10,20,50,100,200,500],Um=({itemsCount:e,pageLimit:t=Vs(),pageIndex:o=0,baseLink:n,onClick:i,textPerpage:r="/Page",textOk:a="Go",textTo:l="To",textPage:c="Page",showControl:d})=>{M("paging-link-box",{display:"flex",justifyContent:"end",alignItems:"center",textAlign:"right",padding:"6px 16px 6px 0",fontSize:"14px",".paging-link-index a, .paging-link-index.current":{padding:"2px 6px",textDecoration:"none"},".paging-link-index.current":{fontWeight:"bold"},"span.paging-link-index a:hover, span.paging-link-go a:hover":{textDecoration:"underline"},".paging-link-ctl-box":{display:"flex",alignItems:"center"},".paging-link-ctl-box .paging-link-jump":{width:"50px",padding:"1px 3px",margin:"0 3px",textAlign:"right"},".paging-link-ctl-box .paging-link-limit":{width:"90px",padding:"1px 3px",margin:"0 3px"},".paging-link-ok":{margin:"0 3px"}}),o=o??(Number.parseInt(re().query.pg_i||"")||0),t=t||Vi;let u=Math.floor(e/t);e>0&&t>0&&(e%t!==0&&u++,o>u&&(o=u-1));let g=x=>{let v=Number(x.target.value||"0");v>0&&(Gs(v),i&&i(o))},f=()=>{let x=Number(b.$(".paging-link-jump").value||"0");x<1&&(x=1),x>u&&(x=u),i&&i(x-1)},b={};return s("div",{ref:b,class:"paging-link-box",children:[o>0?s("span",{class:"paging-link-go",children:s("a",{href:i?"javascript:void(0)":n+"?pg_i="+(o-1),onClick:()=>i&&i(o-1),children:"<"})}):s("span",{class:"paging-link-go disabled",children:"<"}),Array.from({length:u},(x,v)=>v).map(x=>s(ae,{children:x<2||x>=u-2||x>o-3&&x<o+3?x==o?s("span",{class:"paging-link-index current",children:x+1}):s("span",{class:"paging-link-index",children:s("a",{href:i?"javascript:void(0)":n+"?pg_i="+x,onClick:()=>i&&i(x),children:x+1})}):(x==o-4||x==o+4)&&s("span",{class:"paging-link-skip",children:"..."})})),o<u-1?s("span",{class:"paging-link-go",children:s("a",{href:i?"javascript:void(0)":n+"?pg_i="+(o+1),onClick:()=>i&&i(o+1),children:">"})}):s("span",{class:"paging-link-go disabled",children:">"}),d&&s("div",{class:"paging-link-ctl-box",children:[l,s("input",{class:"input-base paging-link-jump input-s",type:"number",value:o+1})," / ",u," ",c,s("button",{class:"button-base button-s paging-link-ok",onClick:f,children:a}),s("select",{class:"input-base paging-link-limit input-s",onChange:g,children:[s("option",{value:"",children:" - "}),_m.map(x=>s("option",{value:x,children:[x,r]}))]})]})]})}});var $m,Js=m(()=>{"use strict";h();$m=({children:e,className:t,css:o})=>{let n={display:"flex",flexDirection:"column",...o};return s("div",{css:n,class:["panel-box",t].join(" "),children:e})}});var lo,Gi,Yi,le,ln=m(()=>{"use strict";pe();h();lo=e=>{let t={};return s("div",{onClick:()=>{t.openMenu&&t.openMenu()},css:{cursor:"pointer",display:"flex",flexDirection:"row",alignItems:"center",fontSize:"24px"},children:s(le,{list:e.list,defaultValue:e.defaultValue,tips:e.tips,minWidth:e.minWidth,maxWidth:e.maxWidth,maxHeight:e.maxHeight,handleSelected:e.handleSelected,handleOpened:e.handleOpened,handleClosed:e.handleClosed,noUpdateLabel:e.noUpdateLabel,hook:t,noTriangleIcon:e.noTriangleIcon})})},Gi=e=>{let t={};return s("button",{class:"button-base",onClick:()=>{t.openMenu&&t.openMenu()},css:{">div":{float:"right",textAlign:"left"}},children:[e.label,":"," ",s(le,{list:e.list,defaultValue:e.defaultValue,tips:e.tips,minWidth:e.minWidth,maxWidth:e.maxWidth,maxHeight:e.maxHeight,handleSelected:e.handleSelected,handleOpened:e.handleOpened,handleClosed:e.handleClosed,noUpdateLabel:e.noUpdateLabel,hook:t,noTriangleIcon:e.noTriangleIcon,align:e.align})]})},Yi=e=>{let t={};return s("div",{onClick:()=>{t.openMenu&&t.openMenu()},css:{cursor:"pointer",">div":{float:"right",textAlign:"left"}},children:[e.label,":"," ",s(le,{list:e.list,defaultValue:e.defaultValue,tips:e.tips,minWidth:e.minWidth,maxWidth:e.maxWidth,maxHeight:e.maxHeight,handleSelected:e.handleSelected,handleOpened:e.handleOpened,handleClosed:e.handleClosed,noUpdateLabel:e.noUpdateLabel,hook:t,noTriangleIcon:e.noTriangleIcon,align:e.align})]})},le=({list:e,defaultValue:t,icon:o,tips:n="",width:i,minWidth:r,maxWidth:a,maxHeight:l,handleSelected:c,handleOpened:d,handleClosed:p,noUpdateLabel:u,hook:g,align:f="right",noTriangleIcon:b})=>{let x={".popup-menu-item":{padding:"0 0 1px 0",display:"inline-block",position:"relative",".triangle-icon":{display:"inline-block",cursor:"pointer",whiteSpace:"nowrap",marginRight:"15px"},".triangle-icon::after":{content:'""',position:"absolute",top:"50%",transform:"translateY(-50%)",marginLeft:"3px",width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"5px solid var(--primary-color)"}},".popup-menu-item:hover":{padding:"1px 0 0 0"},".popup-menu-bottom":{position:"relative",height:"1px",".popup-menu-list":{display:"none",position:"absolute",fontSize:"var(--menu-font-size)",top:0,width:i||"100px",color:"var(--activatable-color-normal)",backgroundColor:"var(--activatable-bg-color-normal)",zIndex:"var(--layer-menu)",borderRadius:"4px",border:"1px solid #ddd",padding:"5px 0px",overflow:"auto","line-height":"1.2em","min-width":r||"max-content","max-width":a||"200px","max-height":l||"300px","box-shadow":"var(--cover-box-shadow)",".menu-focus":{position:"absolute",height:"0px"},".item":{padding:"2px 12px"},".item:hover":{padding:"2px 11px 2px 13px",color:"var(--activatable-color-hover)",backgroundColor:"var(--activatable-bg-color-hover)",cursor:"pointer"},".item.indent1":{paddingLeft:"19px"},".item.indent1:hover":{paddingLeft:"18px"},".item.indent2":{paddingLeft:"35px"},".item.indent2:hover":{paddingLeft:"34px"}},".popup-menu-list.left-align":{left:"2px"},".popup-menu-list.right-align":{right:"2px"},".popup-menu-list.open":{display:"inline-block"}}},v={id:""},T=!1,y=t,k=C=>{X(C),d&&d(),T=!T;let O=v.$(".popup-menu-list");f==="left"?O.classList.add("left-align"):O.classList.add("right-align"),O.classList.toggle("open",T),v.$(".popup-menu-list .menu-focus").focus()};g&&(g.openMenu=k,g.getValue=()=>y,g.setLabel=C=>{!o&&u!==!0&&(v.$(".popup-menu-item .popup-menu-text").innerText=C)});let P=(C,O)=>{X(C),T=!1,v.$(".popup-menu-list").classList.remove("open"),C.target&&(y=C.target.innerText,!o&&u!==!0&&(v.$(".popup-menu-item .popup-menu-text").innerText=C.target.innerText),c&&c(C.target.innerText,O)),p&&p()},z=C=>{setTimeout(()=>{v.$(".popup-menu-list").classList.remove("open"),T&&p&&p(),T=!1},300)};return s("div",{ref:v,css:x,onClick:k,title:n,children:[s("div",{class:"popup-menu-item",children:o||s("span",{class:"popup-menu-text"+(b!==!0?" triangle-icon":""),children:t||"&nbsp;"})}),s("div",{class:"popup-menu-bottom",children:s("div",{class:"popup-menu-list",children:[s("div",{children:e.map(C=>{if(C==="")return s("hr",{});let O=typeof C=="string"?C:C.text,he=typeof C=="string"?0:C.indent;return s("div",{class:"item"+(he?" indent"+he:""),onClick:At=>P(At,C),children:O})})}),s("div",{class:"menu-focus",onBlur:z,tabIndex:0})]})})]})}});var Ji,Xi=m(()=>{"use strict";ji();h();Ji=e=>{let t={position:"fixed",display:"flex",bottom:"0",left:"0",width:"100%",zIndex:"var(--layer-modal-over)",flexDirection:"column",backgroundColor:"#e6e6e6de",padding:"16px",".progress-box":{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",height:"auto",margin:"auto"},".progress-bar":{display:"flex",width:"100%",height:"60px",borderRadius:"4px",overflow:"hidden"},".progress-bar1":{height:"100%",width:"0%",backgroundColor:"#49e57e"},".progress-bar2":{height:"100%",width:"100%",backgroundColor:"#2bb8cd"},".progress-tips":{marginTop:"10px",fontSize:"30px",color:"#49e57e"}};e.hook.onProgress=(r,a,l)=>{r=Math.round(r*100);let c=document.querySelector(".progress-bar1"),d=document.querySelector(".progress-bar2");c.style.width=`${r}%`,d.style.width=`${100-r}%`,i.value=`${r}%`},e.hook.onShow=(r,a)=>{var l,c;a&&(n.value=a),r?(l=o.current)==null||l.classList.remove("d-none"):(c=o.current)==null||c.classList.add("d-none")};let o={},n=new D("Progress"),i=new D("0 %");return s("div",{ref:o,css:t,class:"progress-top d-none",children:s("div",{class:"progress-box",children:[s("div",{class:"progress-title mb-m align-left w-100p",children:n.node}),s("div",{class:"progress-bar",children:[s("div",{class:"progress-bar1"}),s("div",{class:"progress-bar2"})]}),s("div",{class:"progress-tips",children:i.node})]})})}});var cn,Ki=m(()=>{"use strict";E();h();cn=e=>(M("radio-label-component",{display:"flex","& > label":{display:"flex",alignItems:"center"}}),s("div",{class:"radio-label-component"+(e.className?" "+e.className:""),children:s("label",{children:[s("input",{type:"radio",name:e.name,class:"input-base input-s"+(e.radioClassname?" "+e.radioClassname:""),checked:e.checked,disabled:e.disabled,onChange:o=>{var n;return(n=e.onChange)==null?void 0:n.call(e,o.target.checked)}}),s("span",{class:"ml-ss",children:e.label})]})}))});var Qi,Zi=m(()=>{"use strict";h();Qi=({title:e="redirect...",url:t,delaySeconds:o=0})=>s("div",{ref:{onLoad:async i=>{setTimeout(()=>{window.location.href=t},o*1e3)}},children:e})});var $,It,er=m(()=>{"use strict";H();pe();h();$=class ${static init(){M("resizable-splitter",{".resizable-splitter-v-left, .resizable-splitter-v-right":{position:"absolute",top:0,bottom:0,left:0,width:"2px",cursor:"col-resize"},".resizable-splitter-v-right":{left:"unset",right:0},".resizable-splitter-v-left:hover, .resizable-splitter-v-right:hover":{width:"4px",backgroundColor:"#ccc"},".resizable-splitter-h-top, .resizable-splitter-h-bottom":{position:"absolute",top:0,left:0,right:0,height:"2px",cursor:"row-resize"},".resizable-splitter-h-bottom":{top:"unset",bottom:0},".resizable-splitter-h-top:hover, .resizable-splitter-h-bottom:hover":{height:"4px",backgroundColor:"#ccc"}},!1,!0),window.addEventListener("mousemove",$.onMousemove.bind($),!1),document.documentElement.addEventListener("mouseup",$.onMouseup.bind($),!1)}static getSplitterClassName(t,o){return"resizable-splitter-"+(t?o?"v-right":"v-left":o?"h-top":"h-bottom")}static onMousedown(t){if(t.buttons!==1||t.button!==0)return;this.pressed=!0,this.startXorY=this.isVertical?t.clientX:t.clientY;let o=document.defaultView.getComputedStyle(this.hostNode)[this.isVertical?"width":"height"];this.startWidthOrHeight=parseInt(o,10)}static onMousemove(t){if(!(!this.pressed||t.buttons!==1||t.button!==0))if(X(t),this.isVertical){let o=this.startWidthOrHeight+(t.clientX-this.startXorY)*(this.isRightOrTop?1:-1);this.hostNode.style.width=o+"px"}else{let o=this.startWidthOrHeight+(t.clientY-this.startXorY)*(this.isRightOrTop?-1:1);this.hostNode.style.height=o+"px"}}static onMouseup(){this.pressed&&(this.pressed=!1)}static getSplitter(t,o,n){this.initialized||(this.initialized=!0,this.init());let i=this.getSplitterClassName(o,n);return s("div",{onMouseDown:a=>{if($.hostNode=document.querySelector(t),!$.hostNode){console.error(`Can't find element: ${t}`);return}$.isVertical=o,$.isRightOrTop=n,$.onMousedown.bind($)(a)},class:i})}};$.isVertical=!0,$.isRightOrTop=!0,$.initialized=!1,$.startXorY=0,$.startWidthOrHeight=0,$.pressed=!1;It=$});var tr,or=m(()=>{"use strict";h();tr=e=>{let t={width:e.size||"80px",height:e.size||"80px","&circle":{width:"100%",height:"100%",borderRadius:"50%",border:"2px solid #aaa",position:"relative",backgroundColor:"var(--primary-bg-color)",cursor:"pointer"},"&needle":{width:"2px",height:"50%",backgroundColor:"red",position:"absolute",top:"0",left:"50%",transformOrigin:"bottom center",transform:"rotate(90deg)"},"&tips":{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",fontSize:"12px",color:"var(--primary-color)",fontWeight:"600",zIndex:"10"},"&a0, &a90, &a180, &a270":{width:"6px",height:"6px",borderRadius:"50%",backgroundColor:"#333",position:"absolute",top:"0",left:"50%",transform:"translate(-50%, -50%)",fontSize:"12px",color:"#333"},"&a90":{top:"50%",left:"100%"},"&a180":{top:"100%",left:"50%"},"&a270":{top:"50%",left:"0"}},o=0,n=0,i=!1;e.hook&&(e.hook.setAngle=u=>{a(u)});let r=u=>{let g=u.clientX-o,f=u.clientY-n,b=Math.atan2(f,g)*(180/Math.PI);b=(b+450)%360,a(b)},a=u=>{let g=p.$("&needle"),f=p.$("&tips");g.style.transform=`rotate(${u}deg)`,f.textContent=`${u.toFixed(0)}\xB0`,e.onChange(u)},l=u=>{let f=p.$("&circle").getBoundingClientRect();o=f.left+f.width/2,n=f.top+f.height/2,r(u),i=!0},c=u=>{i&&r(u)},d=()=>{i=!1},p={};return s("div",{ref:p,css:t,children:s("div",{class:"&circle",onPointerDown:l,onPointerMove:c,onPointerUp:d,children:[s("div",{class:"&needle"}),s("div",{class:"&tips",children:"90\xB0"}),s("div",{class:"&a0",onClick:()=>a(0)}),s("div",{class:"&a90",onClick:()=>a(90)}),s("div",{class:"&a180",onClick:()=>a(180)}),s("div",{class:"&a270",onClick:()=>a(270)})]})})}});var nr,ir=m(()=>{"use strict";h();nr=(e,t,o,n,i="input-base",r="100%")=>s("div",{css:{select:{height:"auto",overflowY:"auto",width:r}},children:[s("div",{children:e}),s("div",{children:s("select",{class:i,onChange:l=>{var c;return o((c=l==null?void 0:l.target)==null?void 0:c.value)},size:n,children:t.map(l=>s("option",{value:l.value,selected:l.selected,children:l.option}))})})]})});var Vm,Xs=m(()=>{"use strict";E();h();Vm=e=>{M("slide-tab-c-box",{display:"flex",flexDirection:"column",flex:1,fontSize:"12px",borderRadius:"6px",padding:"0px 8px 4px 8px",height:"100%",".slide-tab-c-list":{flex:1,borderRadius:"6px",display:"flex",overflowX:"auto",width:"100%",scrollSnapType:"x mandatory",gap:"8px",paddingBottom:"10px",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"},".slide-tab-c-slide":{width:"100%",overflow:"hidden",position:"relative",minWidth:"100%",flexShrink:0,scrollSnapAlign:"start",height:"100%",overflowY:"auto"},".slide-tab-c-nav":{display:"flex",flexDirection:"row",justifyContent:"center",backgroundColor:"var(--primary-bg-color)",position:"sticky",top:0,zIndex:1},".slide-tab-c-nav-wrap":{display:"flex",flexDirection:"row",justifyContent:"center",padding:"2px 4px",borderRadius:"4px",backgroundColor:"var(--secondary-bg-color)"},".slide-tab-c-nav-item":{cursor:"pointer",padding:"4px 8px",borderRadius:"4px",marginRight:"8px"},".slide-tab-c-nav-item.active":{backgroundColor:"var(--primary-accent-color)",color:"white"}});let o={},n=0,i=!1,r=null,a=()=>{i||(r&&clearTimeout(r),r=setTimeout(()=>{c()},100))},l=p=>{let u=o.$all(".slide-tab-c-nav-item");for(let g=0;g<u.length;g++)u[g].classList.toggle("active",g===p)},c=()=>{let p=o.$(".slide-tab-c-list"),u=p.clientWidth;n=Math.round(p.scrollLeft/u),l(n)},d=p=>{let u=o.$(".slide-tab-c-list"),g=o.$all(".slide-tab-c-slide");if(!u||!g||g.length===0)return;let f=g[p];if(!f)return;let b=f.offsetLeft;i=!0,u.scrollTo({left:b,behavior:"smooth"}),l(p),setTimeout(()=>{i=!1},300)};return s("section",{class:"slide-tab-c-box",ref:o,children:[s("div",{class:"slide-tab-c-nav",children:s("div",{class:"slide-tab-c-nav-wrap",children:e.pages.map((p,u)=>s("div",{class:`slide-tab-c-nav-item ${u===0?"active":""}`,onClick:g=>{g.preventDefault(),d(u)},children:p.title}))})}),s("div",{class:"slide-tab-c-list no-scrollbar-container",onScroll:a,children:e.pages.map(p=>s("div",{class:"slide-tab-c-slide no-scrollbar-container",children:p.content}))})]})}});var rr,ar=m(()=>{"use strict";E();h();rr=e=>{M("stars-box",{display:"flex",flexDirection:"row",".stars-label":{color:"#9d9d9d",cursor:"pointer",display:"flex",alignItems:"center"},".stars-label.active":{color:"blue"},".stars-label .full, .stars-label.active .outline":{display:"none"},".stars-label.active .full, .stars-label .outline":{display:"inline"}});let o=a=>{e.value=a,r.$all(".stars-label").forEach((c,d)=>{c.classList.toggle("active",d<a)})};e.hook&&(e.hook.setValue=a=>{o(a)},e.hook.getValue=()=>e.value);let n=e.fullIcon||s("i",{class:"ifc-icon ma-cards-heart full"}),i=e.outlineIcon||s("i",{class:"ifc-icon ma-cards-heart-outline outline"}),r={};return s("div",{style:{fontSize:e.fontSize||"20px"},ref:r,class:"stars-box",children:Array.from({length:e.maxLength}).map((a,l)=>s("label",{class:"stars-label"+(l<e.value?" active":""),onClick:()=>{var c;o(l+1),(c=e.onChange)==null||c.call(e,l+1)},children:[n,i]}))})}});var De,Ks=m(()=>{"use strict";h();De=({children:e,width:t,height:o,color:n})=>{let i=e||"";return i.startsWith("data:image/svg+xml,")?i=decodeURIComponent(i.slice(19)):i.includes("%")&&i.includes("<svg")&&(i=decodeURIComponent(i)),s("div",{css:{svg:{maxWidth:"100%",maxHeight:"100%",width:t,height:o,fill:n}},dangerouslySetInnerHTML:i})}});var sr,lr=m(()=>{"use strict";E();h();sr=e=>{M("switch-option-box",{display:"flex",flexDirection:"row",borderRadius:"9999px",padding:"2px 4px",fontSize:"0.7rem",backgroundColor:"#e7e7e7",width:"fit-content",".switch-btn":{padding:"4px",borderRadius:"50%",border:"none",background:"transparent",color:"inherit",cursor:"pointer",transition:"all 0.2s"},".switch-btn:first-child":{marginRight:"4px"},".switch-btn.active":{backgroundColor:"#fff",color:"#000000",boxShadow:"2px 1px 2px 1px rgb(189 189 189)"}});let o=i=>{var a;e.defaultOption=i;let r=n.$all(".switch-btn");r[0].classList.toggle("active",i===e.option1),r[1].classList.toggle("active",i===e.option2),(a=e.onChange)==null||a.call(e,i)};e.hook&&(e.hook.setValue=i=>{o(i)},e.hook.getValue=()=>e.defaultOption);let n={};return s("div",{style:{fontSize:e.fontSize},ref:n,class:"switch-option-box",children:[s("button",{onClick:()=>o(e.option1),className:`switch-btn ${e.defaultOption===e.option1?"active":""}`,children:e.option1}),s("button",{onClick:()=>o(e.option2),className:`switch-btn ${e.defaultOption===e.option2?"active":""}`,children:e.option2})]})}});var co,cr=m(()=>{"use strict";H();pe();h();co=({pages:e,defaultIndex:t,topClassName:o,pagePadding:n,hook:i})=>{let r=typeof t=="number"?t:0,a=()=>{let y=v.$(".&tabs > div > .tab.active");y&&y.classList.remove("active");let k=v.$(".&pages > .page.active");k&&k.classList.remove("active")},l=y=>{a();let k=v.$all(".&tabs > div > .tab");y>=0&&y<k.length&&(k[y].classList.add("active"),v.$all(".&pages > .page")[y].classList.add("active"),i!=null&&i.indexChanged&&(i==null||i.indexChanged(y)))},c=y=>{let k=v.$all(".&tabs > div > .tab");if(y>=0&&y<k.length){let P=y===k.length-1?y-1:y,z=k[y].classList.contains("active");k[y].parentNode.remove(),v.$all(".&pages > .page")[y].remove(),z&&l(P)}},d=y=>{X(y);let k=y.target.parentNode,P=Array.prototype.indexOf.call(k.parentNode.parentNode.children,k.parentNode);c(P)},p=async(y,k,P)=>{let z=v.$all(".&tabs > div > .tab"),C=z.length;typeof P=="number"&&P>=0&&P<z.length&&(C=P),a();let O=u(y," active"),he=document.createElement("div"),At=document.createElement("div");if(At.className="page",C===z.length)v.$(".&tabs").appendChild(he),v.$(".&pages").appendChild(At);else{v.$(".&tabs").insertBefore(he,z[C]);let Fh=v.$all(".&pages > .page");v.$(".&pages").insertBefore(At,Fh[C])}await te(he,O),await te(At,k),l(C)},u=(y,k)=>s("div",{onClick:g,class:"tab"+k,children:[y,s("span",{class:"modal-close",onClick:d,children:"\xD7"})]}),g=y=>{X(y);let k=y.target,P=Array.prototype.indexOf.call(k.parentNode.parentNode.children,k.parentNode);l(P)},f=y=>{let k=v.$all(".&tabs > div > .tab");y>=0&&y<k.length&&(k[y].classList.add("flash"),setTimeout(()=>{k[y].classList.remove("flash")},1e3))};i&&(i.updateTitle=(y,k)=>{let P=v.$all(".&tabs > div > .tab");y>=0&&y<P.length&&(P[y].innerHTML=k)},i.updateIndex=l,i.removePage=c,i.newPage=p,i.getIndex=()=>{let y=v.$(".&tabs > div > .tab.active");return y?Array.prototype.indexOf.call(y.parentNode.parentNode.children,y.parentNode):-1},i.getCount=()=>v.$all(".&tabs > div > .tab").length,i.findAndActivate=y=>{let k=v.$all(".&tabs > div > .tab");for(let P=0;P<k.length;P++)if(k[P].innerText===y)return l(P),f(P),!0;return!1});let b={display:"flex","flex-direction":"column",width:"100%",height:"100%","&:not(:has(.pages .page))":{display:"none"},"> .&tabs":{display:"flex",height:"auto","border-bottom":"1px solid grey","overflow-x":"auto","overflow-y":"hidden","scrollbar-width":"thin","scrollbar-color":"#ababab4d #d5d5d552","> div > .tab":{padding:"2px 3px",width:"auto","font-size":"smaller","text-overflow":"ellipsis",overflow:"hidden","white-space":"nowrap",margin:"1px 1px 0 1px",cursor:"pointer",position:"relative","border-top-right-radius":"4px","border-top-left-radius":"4px","border-top":"solid 1px var(--primary-border-color)","border-left":"solid 1px var(--primary-border-color)","border-right":"solid 1px var(--primary-border-color)",color:"var(--activatable-color-normal)",backgroundColor:"var(--activatable-bg-color-normal)"},"> div > .tab:hover":{padding:"3px 3px 1px 3px"},"> div > .tab.flash":{backgroundColor:"red"},"> div > .active":{color:"var(--activatable-color-selected)",backgroundColor:"var(--activatable-bg-color-selected)",marginBottom:"-1px",borderBottom:"1px solid #FFFFFF00"},"> div > .tab > .modal-close":{display:"none",float:"right",fontSize:"12px",fontWeight:"bold",cursor:"pointer",position:"absolute",top:"-4px",right:"1px"},"> div > .tab:hover > .modal-close":{display:"inline-block",color:"#ff0000"}},"> .&pages":{display:"flex",flex:"1",position:"relative","> .page":{display:"none",position:"absolute",padding:n||"0px",overflow:"auto",width:"100%",maxWidth:"100%",height:"100%",overflowX:"auto",overflowY:"auto"},"> .active":{display:"inline-block"}}},x=Kn(b);M(x,b);let v={globalCssId:x};return s("div",{ref:v,css:{"&tabs":{display:"flex"},"&pages":{display:"flex"}},class:o?" "+o:"",children:[s("div",{class:"&tabs tabs",children:e.map((y,k)=>{let P=k===r?" active":"";return s("div",{children:u(y.title,P)})})}),s("div",{class:"&pages pages",children:e.map((y,k)=>s("div",{class:"page"+(k===r?" active":""),children:y.page}))})]})}});var dr,pr=m(()=>{"use strict";H();h();dr=e=>{let t={width:"100%",height:"100%",textAlign:"center",color:e.color||"#22b8ff",padding:e.padding||"10px",fontSize:e.fontSize||"30px",fontWeight:e.fontWeight||"500",".text-glow":{animation:"text-glow-a 1.5s infinite alternate"},"@keyframes text-glow-a":{"0%":{textShadow:"0 0 5px #ff005e, 0 0 10px #ff005e, 0 0 20px #ff005e, 0 0 40px #ff005e, 0 0 80px #ff005e"},"100%":{textShadow:"0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 80px #00d4ff, 0 0 160px #00d4ff"}}};return M("text-glow-top",t),s("div",{class:"text-glow-top",children:s("div",{class:"text-glow",children:e.text})})}});var ur,gr=m(()=>{"use strict";H();h();ur=e=>{let t={width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",color:e.color||"#22b8ff",fontSize:e.fontSize||"30px",fontWeight:e.fontWeight||"500",".text-scale":{animation:"text-scale 1.5s infinite alternate",backgroundColor:e.backgroundColor||"#a1ffe8",padding:e.padding||"10px",borderRadius:"5px"},"@keyframes text-scale":{"0%, 100%":{transform:"scale(1)"},"40%":{transform:"scale(0.7)"}}};return M("text-scale-top",t),s("div",{class:"text-scale-top",children:s("div",{class:"text-scale",children:e.text})})}});var hr,mr=m(()=>{"use strict";H();h();hr=e=>{let t={};e.text.split("").forEach((n,i)=>{t[`.span${i}`]={animationDelay:`${i*.1}s`}});let o={width:"100%",height:"100%",textAlign:"center",color:e.color||"#22b8ff",padding:e.padding||"10px",fontSize:e.fontSize||"20px",fontWeight:e.fontWeight,textShadow:"1px -1px #ffffff, -2px 2px #999, -6px 7px 3px #131f5be6",".text-wave.wave-animetion span":{display:"inline-block",padding:"0 4px",animation:"wave-text 1s ease-in-out infinite"},".text-wave.wave-animetion":{marginTop:"0.6em",...t},"@keyframes wave-text":{"0%":{transform:"translateY(0em)"},"60%":{transform:"translateY(-0.6em)"},"100%":{transform:"translateY(0em)"}}};return M("text-wave-top",o),s("div",{class:"text-wave-top",children:s("div",{class:"text-wave wave-animetion",children:e.text.split("").map((n,i)=>s("span",{class:`span${i}`,children:n}))})})}});var po,Qs=m(()=>{"use strict";H();ln();h();po=({className:e,icon:t,noUpdateLabel:o})=>{let n={display:"flex",flexDirection:"column",alignSelf:"end"},i=l=>{Qt(l)},r=xe(),a=[];for(let l in r.themes)a.push(l);return s("div",{css:n,class:["theme-switch",e].join(" "),title:"Select theme",children:s(le,{list:a,defaultValue:r.themeName,handleSelected:i,icon:t,noUpdateLabel:o})})}});var uo,fr,br,Zs,Gm,zt,go=m(()=>{"use strict";H();h();uo={Small:{w:50,h:50},Medium:{w:70,h:70},Large:{w:90,h:90}},fr=e=>{M("toggle-play-button-component",{width:"100%",height:"100%",borderRadius:"50%",backgroundColor:"#3b29cc",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s",cursor:"pointer","&:hover":{opacity:.8},".play-icon":{width:"50%",height:"50%",transition:"all 0.2s ease-in-out",backgroundColor:"#fff"},"&.toggle-off .play-icon":{clipPath:"polygon(20% 0, 20% 100%, 90% 50%, 90% 50%, 90% 50%, 90% 50%, 90% 50%, 90% 50%, 90% 50%)",translate:"6% 0"},"&.toggle-on .play-icon":{clipPath:"polygon(0 0, 0 100%, 33.33% 100%, 33.33% 0, 66.66% 0, 100% 0, 100% 100%, 66.66% 100%, 66.66% 0)",translate:"0 0"},"&.disabled":{cursor:"not-allowed",backgroundColor:"#5d578b"}});let o=()=>s("div",{class:`toggle-play-button-component toggle-placeholder ${e.checked?"toggle-on":"toggle-off"}${e.disabled?" disabled":""}`,style:{backgroundColor:e.backgroundColor},children:s("div",{class:"play-icon",style:{backgroundColor:e.textColor}})});return e.noWave?s(zt,{...e,children:s(o,{})}):s(zt,{...e,children:s(Zs,{children:s(o,{})})})},br=e=>s(zt,{...e,size:{w:"auto",h:"auto"},children:s("div",{css:{"&.disabled":{cursor:"not-allowed"},"&.toggle-on .on, &.toggle-off .off":{display:"block"},"&.toggle-on .off, &.toggle-off .on":{display:"none"}},class:`toggle-button-component toggle-placeholder ${e.checked?"toggle-on":"toggle-off"}${e.disabled?" disabled":""}`,children:[s("div",{class:"on",children:e.onText}),s("div",{class:"off",children:e.offText})]})}),Zs=e=>(M("toggle-waves-box",{width:"100%",height:"100%","@keyframes pulse-border":{"0%":{transform:"scale(0.6)",opacity:1},"100%":{transform:"scale(1)",opacity:0}},".toggle-waves":{position:"absolute",width:"100%",height:"100%",top:"0",left:"0",borderRadius:"50%",backgroundColor:"#eb205580",opacity:0,animation:"pulse-border 3s ease-in-out infinite"},".toggle-waves-1":{"-webkit-animation-delay":"0s","animation-delay":"0s"},".toggle-waves-2":{"-webkit-animation-delay":"1s","animation-delay":"1s"},".toggle-waves-3":{"-webkit-animation-delay":"2s","animation-delay":"2s"},".toggle-waves-box":{position:"absolute",width:"100%",height:"100%",top:"0",left:"0",padding:"18%"},"&.disabled .toggle-waves":{backgroundColor:"#5d578b"}}),s("div",{class:"toggle-waves-box toggle-placeholder",children:[s("div",{class:"toggle-waves toggle-waves-1"}),s("div",{class:"toggle-waves toggle-waves-2"}),s("div",{class:"toggle-waves toggle-waves-3"}),s("div",{class:"toggle-waves-box",children:e.children})]})),Gm={Small:{w:30,h:30},Medium:{w:50,h:50},Large:{w:70,h:70}},zt=e=>{let t=(a,l)=>{n.$all(".toggle-base-container .toggle-placeholder").forEach(d=>{d.classList.toggle("toggle-on",a),d.classList.toggle("toggle-off",!a),d.classList.toggle("disabled",l)})},o=e.disabled||!1,n={onLoad:async a=>{t(e.checked||!1,o)}},i=a=>{if(o)return;let l=a.target.checked;t(l,o),e.onClick&&e.onClick(l)};return e.hook&&(e.hook.setChecked=a=>{n.$("input.toggle-base-checkbox").checked=a,t(a,o)},e.hook.getChecked=()=>n.$("input.toggle-base-checkbox").checked,e.hook.setEnabled=a=>{o=!a;let l=n.$("input.toggle-base-checkbox");l.disabled=o,t(l.checked,o)},e.hook.getEnabled=()=>!o),M("toggle-base-component",{".toggle-base-box, .toggle-base-container":{position:"relative",width:"100%",height:"100%"},".toggle-base-checkbox":{opacity:0,position:"absolute",pointerEvents:"none"}}),s("div",{ref:n,css:{width:`${typeof e.size.w=="number"?e.size.w+"px":e.size.w}`,height:`${typeof e.size.h=="number"?e.size.h+"px":e.size.h}`},class:"toggle-base-component",children:s("label",{class:"toggle-base-box",children:[s("div",{class:"toggle-base-container",children:e.children}),s("input",{type:"checkbox",class:"toggle-base-checkbox",checked:e.checked||!1,disabled:o,onClick:i})]})})}});var dn,xr,vr=m(()=>{"use strict";H();go();h();dn=(i=>(i.SmallSmall="smallsmall",i.Small="small",i.Medium="medium",i.Large="large",i))(dn||{}),xr=e=>{var a,l;let t=e.size==="smallsmall"?16:e.size==="small"?22:e.size==="large"?42:34,o=e.size==="smallsmall"?"smallsmall":e.size==="small"?"small":e.size==="large"?"large":"",n={width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center","& .ts-slider":{position:"relative",cursor:"pointer",backgroundColor:"var(--toggle-background-color, #c7c7c7)",transition:".4s",borderRadius:"34px",height:"100%",display:"flex",padding:"0 27px 0 37px",alignItems:"center"},"&.smallsmall .ts-slider":{padding:"0 8px 0 22px",fontSize:"0.65rem"},"&.small .ts-slider":{padding:"0 17px 0 27px",fontSize:"0.85rem"},"&.large .ts-slider":{padding:"0 37px 0 57px"},"& .ts-slider .ts-circle":{position:"absolute",content:"",height:"26px",width:"26px",left:"4px",bottom:"4px",backgroundColor:"var(--toggle-ball-color, #fff)",transition:".4s",borderRadius:"50%"},"&.smallsmall .ts-slider .ts-circle":{height:"12px",width:"12px",left:"2px",bottom:"2px"},"&.small .ts-slider .ts-circle":{height:"18px",width:"18px",left:"3px",bottom:"2px"},"&.large .ts-slider .ts-circle":{height:"38px",width:"38px",left:"4px",bottom:"2px"},"&.toggle-on .ts-on-text":{display:"block"},"&.toggle-off .ts-off-text":{display:"block"},"&.toggle-on .ts-slider":{backgroundColor:"var(--primary-accent-color, #0a74c9)",padding:"0 47px 0 17px"},"&.smallsmall.toggle-on .ts-slider":{padding:"0 18px 0 12px"},"&.small.toggle-on .ts-slider":{padding:"0 27px 0 17px"},"&.large.toggle-on .ts-slider":{padding:"0 72px 0 22px"},"&.toggle-on .ts-slider .ts-circle":{left:"unset",right:"3px"},"&.disabled .ts-slider":{cursor:"not-allowed",opacity:"var(--primary-disabled-opacity)"}};M("toggle-switch-theme",{'[data-theme="dark" i]':{"--toggle-ball-color":"#000000","--toggle-background-color":"#262626"}},!1,!0),M("toggle-switch-component",n);let r={"& .ts-on-text, & .ts-off-text":{display:"none",width:e.textWidth}};return s(zt,{...e,size:{w:"auto",h:t},children:s("div",{css:r,class:`toggle-switch-component toggle-placeholder ${e.checked?"toggle-on":"toggle-off"}${e.disabled?" disabled":""} ${o}`,children:s("span",{class:"ts-slider",children:[s("span",{class:"ts-on-text",children:(a=e.text)==null?void 0:a.on}),s("span",{class:"ts-circle"}),s("span",{class:"ts-off-text",children:(l=e.text)==null?void 0:l.off})]})})})}});var el=m(()=>{"use strict"});var yr,kr=m(()=>{"use strict";E();h();yr=e=>{let t={".footer-menu":{display:"none",width:"100%",background:"var(--sidebar-bg-color)",paddingBottom:"env(safe-area-inset-bottom)",minHeight:"50px",justifyContent:"space-around",alignItems:"center",borderTop:"var(--primary-border)"},".footer-menu, .footer-menu a":{textDecoration:"none",color:e.color||"var(--primary-color)"},".footer-menu .footer-menu-item":{padding:"4px 16px 4px 16px",fontSize:"11px",height:"55px",width:"55px",display:"flex",flexWrap:"wrap",alignItems:"center"},".footer-menu .footer-menu-item i":{display:"block",fontSize:"22px",marginBottom:"4px"},".footer-menu .footer-menu-item.footer-menu-topout":{marginTop:"-43px",borderRadius:"50%",backgroundColor:e.topoutBackgroundColor||"#f33939",color:e.topoutColor||"var(--primary-color)"},".footer-menu .footer-menu-item-a":{zIndex:"var(--layer-header-footer)"},".footer-menu .footer-menu-item.active":{color:e.activeColor||"var(--primary-accent-color)"},[Q.TabletBelow]:{".footer-menu":{display:"flex"}}},o=(i,r)=>{let a=document.querySelector(".footer-menu-item.active");a==null||a.classList.remove("active");let l=document.querySelector(`a:nth-child(${i+1}) .footer-menu-item`);l==null||l.classList.add("active")},n=typeof window<"u"?window.location.pathname:"";return s("div",{css:t,class:"footer-menu-box",children:s("div",{class:"footer-menu",children:e.items.map((i,r)=>s("a",{class:"footer-menu-item-a",href:i.href,children:s("div",{class:`footer-menu-item ${i.topout?"footer-menu-topout":""} ${n===i.href?"active":""}`,onClick:()=>o(r,i.href),children:[s("i",{class:`ifc-icon ${i.icon}`}),i.text]})},r))})})}});var tl,Ym,Jm,Xm,wr,Sr=m(()=>{"use strict";E();h();tl="40px",Ym=({onClick:e})=>s("i",{class:"ifc-icon mg-arrow_back_ios_new_outlined mhti-back-icon","data-back-action":ke.genBackActionId(),onClick:t=>e(t)}),Jm=({onClick:e})=>s("i",{class:"ifc-icon ma-close mhti-close-icon",onClick:t=>e(t)}),Xm=()=>s("div",{class:"mhti-empty-icon",style:{width:"28px"}}),wr=({title:e,onBack:t,left:o,right:n,background:i,color:r,noShadow:a})=>{let l={display:"flex",flexDirection:"row",width:"100vw",padding:"6px 0",color:r||"var(--primary-color)",background:i||"var(--activatable-bg-color-normal)",boxShadow:a?"unset":"var(--mobile-header-shadow)",zIndex:"var(--layer-inside)",".mhti-title":{display:"flex",fontSize:"1.3rem",flex:"1",color:"var(--activatable-text-color-normal)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",alignItems:"center",justifyContent:"center"},".mhti-title > *":{display:"flex",width:"100%",alignItems:"center",justifyContent:"center"},".mhti-left, .mhti-right":{height:tl,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16px"},".mhti-left":{paddingLeft:"8px"},".mhti-right":{paddingRight:"8px"},".mhti-left i, .mhti-right i":{fontSize:"28px"}},c=o instanceof D?o:new D(o),d=e instanceof D?e:new D(e),p=n instanceof D?n:new D(n);return s("div",{css:l,class:"mobile-header-title-icon-top",children:[s("div",{class:"mhti-left",children:c.node}),s("div",{class:"mhti-title",children:d.node}),s("div",{class:"mhti-right",children:p.node})]})}});var ol,nl,il,Km,Qm,rl=m(()=>{"use strict";E();Sr();h();ol="40px",nl=({onClick:e})=>s("i",{class:"ifc-icon mg-arrow_back_ios_new_outlined header-back-left-icon","data-back-action":ke.genBackActionId(),onClick:t=>e(t)}),il=({onClick:e})=>s("i",{class:"ifc-icon ma-close header-back-right-icon",onClick:t=>e(t)}),Km=()=>s("div",{class:"header-back-top-empty"}),Qm=({children:e,title:t,onBack:o,left:n,right:i,noHeader:r=!1,background:a,color:l,noShadow:c,contentColor:d,contentBackground:p})=>{n=n||s(nl,{onClick:o}),i=i||s(il,{onClick:o});let u={display:"flex",flexDirection:"column",width:"100%",height:"100%",minHeight:"100%",background:a||"var(--activatable-bg-color-normal)",".header-back-top":{display:"flex",flexDirection:"row",width:"100vw",padding:"6px 0",backgroundColor:"var(--activatable-bg-color-normal)",boxShadow:"var(--mobile-header-shadow)"},".header-back-content":{display:"flex",flex:"1",flexDirection:"column",overflowY:"auto",scrollbarWidth:"none",position:"relative",color:d||"var(--primary-color)",background:p||"var(--activatable-bg-color-normal)","&::-webkit-scrollbar":{display:"none"}},".header-back-title":{fontSize:"15px",flex:"1",color:"var(--activatable-text-color-normal)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},".header-back-left, .header-back-right":{height:ol,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16px",padding:"0 8px"},".header-back-left i, .header-back-right i":{fontSize:"28px"}},g=n instanceof D?n:new D(n),f=t instanceof D?t:new D(t),b=i instanceof D?i:new D(i);return s("div",{ref:{},css:u,class:"header-back-frame",children:[!r&&s(wr,{onBack:o,left:g,title:f,right:b,background:a,color:l,noShadow:c}),s("div",{class:"header-back-content",children:e})]})}});var pn,He,Zm,ef,tf,of,Cr,Tr=m(()=>{"use strict";E();h();pn=class e{constructor(){this.leftContent=new D("");this.centerContent=new D("");this.rightContent=new D("")}static getInstance(){return e.instance||(e.instance=new e),e.instance}setLeftContent(t){this.leftContent.value=t}getLeftContent(){return this.leftContent}setCenterContent(t){this.centerContent.value=t}getCenterContent(){return this.centerContent}setRightContent(t){this.rightContent.value=t}getRightContent(){return this.rightContent}hideHeader(){this.leftContent.value="",this.centerContent.value="",this.rightContent.value=""}},He=pn.getInstance(),Zm=e=>(He.setLeftContent(e.children),s(ae,{})),ef=e=>(He.setCenterContent(e.children),s(ae,{})),tf=e=>(He.setRightContent(e.children),s(ae,{})),of=()=>(He.hideHeader(),s(ae,{})),Cr=e=>s("div",{css:{display:"flex",flexDirection:"row",width:"100%",height:"auto","& > *":{height:"100%"},".mobile-header-center":{flex:1}},class:"mobile-header-component",children:[s("div",{class:"mobile-header-left",children:He.getLeftContent().node}),s("div",{class:"mobile-header-center",children:He.getCenterContent().node}),s("div",{class:"mobile-header-right",children:He.getRightContent().node})]})});var ho,vt,Pr,un=m(()=>{"use strict";E();h();ho=class ho{static show(){let t=document.querySelector(".mobile-side-menu-mask");t.classList.add("show"),setTimeout(()=>{t.classList.add("animate-show")},1);let o=ke.genBackActionId();t.setAttribute("data-back-action",o)}static hide(){let t=document.querySelector(".mobile-side-menu-mask");t.removeAttribute("data-back-action"),t.classList.remove("animate-show"),setTimeout(()=>{t.classList.remove("show")},300)}static addTouchEvent(){if(this.isTouchEventAdded)return;this.isTouchEventAdded=!0;let t=0,o=0,n="",i=!1,r=!1,a=document.querySelector(".mobile-side-menu-mask");document.addEventListener("touchstart",l=>{t=l.touches[0].clientY,o=l.touches[0].clientX,n="",i=!1,r=a==null?void 0:a.classList.contains("show"),r?o>80&&(i=!0):o<40&&(i=!0)}),document.addEventListener("touchmove",l=>{if(i){if(n==="")if(l.touches[0].clientX-o!==0)n="X";else{i=!1;return}if(r){if(l.touches[0].clientX-o<30){ho.hide(),i=!1;return}}else if(l.touches[0].clientX-o>80){ho.show(),i=!1;return}}}),document.addEventListener("touchend",()=>{i=!1,n=""})}};ho.isTouchEventAdded=!1;vt=ho,Pr=e=>s("div",{css:{".mobile-side-menu-mask":{display:"none",flexDirection:"column",position:"fixed",top:"0",left:"0",right:"0",bottom:"0",zIndex:"var(--layer-menu)",backgroundColor:"#000000b0","&.show":{display:"flex"},"&.animate-show .mobile-side-menu":{transform:"scaleX(1)"}},".mobile-side-menu":{display:"flex",flexDirection:"column",padding:"16px",transition:"transform 0.3s ease-in-out",backgroundColor:"var(--primary-bg-color)",width:"70%",maxWidth:"300px",height:"100%",overflowX:"hidden",overflowY:"auto",transformOrigin:"left",transform:"scaleX(0)",boxShadow:"var(--cover-box-shadow)"}},ref:{onLoad:async()=>{vt.addTouchEvent()}},children:s("div",{class:"mobile-side-menu-mask",onClick:i=>{i.target instanceof HTMLDivElement&&i.target.classList.contains("mobile-side-menu-mask")&&vt.hide()},children:s("div",{class:"mobile-side-menu",children:e.children})})})});var nf,al=m(()=>{"use strict";un();h();nf=()=>s("div",{css:{cursor:"pointer",display:"flex",flexDirection:"row",alignItems:"center",fontSize:"28px"},onClick:()=>vt.show(),children:s("i",{class:"ifc-icon bs-list"})})});var rf,sl=m(()=>{"use strict";E();h();rf=e=>s(lo,{list:e.menuItems,defaultValue:"",tips:"",minWidth:"auto",maxWidth:"200px",maxHeight:"300px",align:"right",noTriangleIcon:!0,handleSelected:e.handleSelected,noUpdateLabel:!0})});var ll=m(()=>{"use strict";el();kr();rl();Tr();Sr();un();al();sl()});var Mr=m(()=>{"use strict";Ei();Ri();ft();Hs();zi();en();Is();zs();ji();Oi();tn();js();qs();Ns();Ws();_i();_s();Us();Ui();$i();$s();Ys();Js();ln();Xi();Ki();Zi();er();or();ir();Xs();Zo();ar();Ks();lr();cr();pr();gr();mr();Qs();go();vr();ll()});var Er,af,sf,lf,Lr,cf,cl=m(()=>{"use strict";H();Mr();Er={size:1024*200},af=e=>{Er.size=e},sf=()=>Er.size,lf=async e=>{let t=e+(e.indexOf("?")===-1?"?":"")+"&check-size=1",o=await re().renderPageFunctions.fetchData(t);return o&&o.json.size?o.json.size:0},Lr=async(e,t,o,n,i,r=3,a="")=>{let l=n+(n.indexOf("?")===-1?"?":"");l+=`&chunkNumber=${t.toString()}`,l+=`&totalChunks=${o.toString()}`,i&&(l+=`&key=${i}`);let c=0,d;for(;c<r;){try{if(d=await re().renderPageFunctions.fetchData(l,e),d&&d.json&&(d=d.json),d&&d.status)break}catch(p){console.log(`uploadFileChunk error, try: ${c}`,p)}c++,a&&V.sendMessage(a.replace("${tryCount}",c.toString()),"var(--warning-bg-color)")}return d},cf=async(e,t,o,n=0,i=3,r="")=>{let a="",l=e instanceof File?e.size:e.length;if(n||(n=Er.size),l<=n){let d=await Lr(e,0,1,t,a,i,r);return!d||d.status!=="ok"?d:(o&&o(1,0,l),!0)}let c=Math.ceil(l/n);for(let d=0;d<c;d++){let p=d*n,u=Math.min((d+1)*n,l),g=e.slice(p,u),f=await Lr(g,d,c,t,a,i,r);if(!f||f.status!=="ok")return f;a=f.key,o&&o(Math.round((d+1)/c*100)/100,d,c)}return!0}});var pe=m(()=>{"use strict";is();rs();ss();cs();ds();ps();us();gs();hs();ms();bs();xs();vs();ys();ks();ws();Ss();Cs();Ts();Ps();Ms();Es();As();Rs();Ds();cl()});var dl,pl=m(()=>{"use strict";h();dl=e=>s("div",{css:{display:"flex",padding:"0 32px 16px",".d-footer-cp":{padding:"1px 15px",margin:"auto"}},class:"d-footer-box",children:s("div",{class:"d-footer-cp",children:e.title})})});var ul,gl=m(()=>{"use strict";h();ul=e=>s("div",{css:{display:"flex",flexDirection:"row",width:"100%",height:"100%",".d-header-title":{display:"flex",flex:"1",margin:"8px 16px",textShadow:"-3px -3px 10px white, 3px 3px 10px black",color:"darkblue",fontSize:"22px"},".desktop-menu-bar":{display:"flex",flexDirection:"row",width:"auto",padding:"4px 16px 0",".desktop-menu-item":{display:"flex",padding:"0 8px",height:"fit-content",a:{textDecoration:"none",color:"var(--sidebar-color)",i:{paddingRight:"4px"}}}}},class:"desktop-menu-box",children:[s("div",{class:"flex-1 d-header-title",children:e.title}),s("div",{class:"desktop-menu-bar",children:e.items.map(o=>s("div",{class:"desktop-menu-item",children:s("a",{href:o.href,children:[s("i",{class:`ifc-icon ${o.icon}`}),o.text]})}))})]})});var df,hl=m(()=>{"use strict";E();kr();pl();gl();Tr();un();h();df=async e=>{let t={display:"flex",flexDirection:"column",width:"100%",height:"100%",minHeight:"100%",".frame-top-menu":{display:"flex",flexDirection:"column",width:"100vw",backgroundColor:"var(--activatable-bg-color-normal)"},".frame-content":{display:"flex",flex:"1",flexDirection:"column",overflowY:"auto",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},".content-block":{display:"flex",flex:"1",flexDirection:"column",overflowY:"auto",scrollbarWidth:"none"},".content-block::-webkit-scrollbar":{display:"none"},".content-block .padding-block":{padding:"0 16px"},[Q.TabletBelow]:{".frame-footer .d-footer-box, .frame-top-menu .desktop-menu-box":{display:"none"}}};return s("div",{css:t,class:"responsive-frame",children:[e.sharedContents,s("div",{class:"frame-top-menu",children:[s(ul,{title:e.desktopHeaderTitle,items:e.desktopTopMenu}),s(Cr,{})]}),s("div",{class:"frame-content",children:[s(Pr,{children:e.mobileSideMenuContent}),s("div",{class:"content-block "+e.placeholderClassname,children:e.mainContent}),s("div",{class:"frame-footer",children:[e.desktopFooterTitle&&s(dl,{title:e.desktopFooterTitle}),s(yr,{items:e.mobileBottomMenu})]})]})]})}});var pf,ml=m(()=>{"use strict";h();pf=async(e,t)=>s("div",{css:{display:"flex",flexDirection:"column",width:"100%",height:"100%",position:"relative",".top-frame-box":{display:"flex",flex:"1",flexDirection:"column",height:"100%","padding-top ":"constant(safe-area-inset-top)","padding-top":"env(safe-area-inset-top)"}},children:s("div",{class:"top-frame-box "+e,children:t})})});var uf,fl=m(()=>{"use strict";E();h();uf=e=>{e.hook&&(e.hook.load=i=>{var r;t.value=i,(r=o.current)==null||r.classList.remove("d-none"),setTimeout(()=>{var a;(a=o.current)==null||a.classList.add("show")},100)},e.hook.close=i=>{var r;X(i),(r=o.current)==null||r.classList.remove("show"),setTimeout(async()=>{var a;(a=o.current)==null||a.classList.add("d-none"),t.value="",e.afterClose&&await e.afterClose()},400)},e.hook.addClass=i=>{var r;(r=o.current)==null||r.classList.add(i)},e.hook.isOpened=()=>{var i;return(i=o.current)==null?void 0:i.classList.contains("show")});let t=new D(s("div",{class:"slider-frame-default",children:e.defaultContent||"(No Content)"})),o={},n={display:"flex",flexDirection:"column",position:"fixed",top:"0",left:"0",right:"0",bottom:"0",zIndex:"var(--layer-slider)",transform:e.direction==="bottom"?"translateY(100%)":"translateX(100%)",transition:"transform 0.4s ease-in-out",backgroundColor:"var(--primary-bg-color)","&.show":{transform:e.direction==="bottom"?"translateY(0)":"translateX(0)"},"& > fragment":{height:"100%"},"&.desktop-slide-left":{[Q.TabletAbove]:{".header-back-content":{width:"30%"}}},"&.desktop-slide-right":{[Q.TabletAbove]:{top:"59px",left:"30%",transform:"translateX(0)",".mobile-header-title-icon-top":{width:"100%",boxShadow:"unset"},".header-back-content":{width:"100%"},".mhti-title":{fontSize:"15px"},".mhti-left, .mhti-right":{display:"none"},"&.d-none":{display:"unset !important"}}}};return s("div",{ref:o,css:n,class:"slider-frame d-none",children:t.node})}});var bl=m(()=>{"use strict";hl();ml();fl()});var xl,vl=m(()=>{"use strict";xl={}});var yl,kl=m(()=>{"use strict";h();yl=()=>s("div",{css:{},class:"demo-about-top",children:[s("div",{class:"row-box",children:"This is a demo page for testing components."}),s("div",{class:"row-box"})]})});var Ie,Ar=m(()=>{"use strict";ft();h();Ie={id:"button-demo",text:"Button Demo",args:{text:"Click Me",size:"button-m",disabled:!1},argTypes:{text:{control:"text",description:"The text displayed inside the button"},size:{control:"select",options:Object.values(Re),description:"The size of the button"},disabled:{control:"boolean",description:"Whether the button is disabled"}},render:e=>s(_,{...e}),code:`import { Button, ButtonSize } from 'lupine.components/components/button';

// Basic Usage
<Button 
  text="Click Me" 
  size={ButtonSize.Medium} 
  onClick={() => console.log('Clicked!')} 
/>
`}});var ze,Rr=m(()=>{"use strict";Ri();h();ze={id:"button-push-animation-demo",text:"Button Push Animation Demo",args:{text:"Push Me",size:"button-m",disabled:!1},argTypes:{text:{control:"text",description:"The text displayed inside the button"},size:{control:"select",options:Object.values(Qo),description:"The size of the button"},disabled:{control:"boolean",description:"Whether the button is disabled"}},render:e=>s(Ai,{...e}),code:`import { ButtonPushAnimation, ButtonPushAnimationSize } from 'lupine.components/components/button-push-animation';

<ButtonPushAnimation 
  text="Push Me" 
  size={ButtonPushAnimationSize.Medium} 
  onClick={() => console.log('Pushed!')} 
/>
`}});var je,Dr=m(()=>{"use strict";vr();h();je={id:"toggle-switch-demo",text:"Toggle Switch Demo",args:{size:"medium",disabled:!1,checked:!1,text:{on:"ON",off:"OFF"},textWidth:"30px"},argTypes:{size:{control:"select",options:Object.values(dn),description:"The size of the switch"},disabled:{control:"boolean",description:"Whether the switch is disabled"},checked:{control:"boolean",description:"Whether the switch is turned on"},textWidth:{control:"text",description:"Fixed width for the text to prevent jumping"}},render:e=>s("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:s(xr,{...e})}),code:`import { ToggleSwitch, ToggleSwitchSize } from 'lupine.components/components/toggle-switch';

<ToggleSwitch 
  size={ToggleSwitchSize.Medium} 
  disabled={false} 
  checked={false} 
  text={{ on: 'ON', off: 'OFF' }} 
  textWidth="30px" 
/>
`}});var Be,Hr=m(()=>{"use strict";Zo();h();Be={id:"spinner-demo",text:"Spinner Demo",args:{size:"30px",color:"#0a74c9"},argTypes:{size:{control:"select",options:Object.values(no),description:"Size of the spinner"},color:{control:"text",description:"Color of the spinner (Hex, RGB, or var)"}},render:e=>s("div",{style:{display:"flex",gap:"40px",alignItems:"center",padding:"20px"},children:[s("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[s(Di,{size:e.size,color:e.color}),s("span",{children:"Spinner01"})]}),s("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[s(io,{size:e.size,color:e.color}),s("span",{children:"Spinner02"})]}),s("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[s(Hi,{size:e.size,colorRGB:"10 116 201"}),s("span",{children:"Spinner03"})]})]}),code:`import { Spinner01, Spinner02, Spinner03, SpinnerSize } from 'lupine.components/components/spinner';

{/* Spinner01 */}
<Spinner01 size={SpinnerSize.Medium} color="#0a74c9" />

{/* Spinner02 */}
<Spinner02 size={SpinnerSize.Medium} color="#0a74c9" />

{/* Spinner03 expects an RGB tuple string without the rgb() wrapper */}
<Spinner03 size={SpinnerSize.Medium} colorRGB="10 116 201" />
`}});var Oe,Ir=m(()=>{"use strict";ar();h();Oe={id:"stars-demo",text:"Stars Component Demo",args:{maxLength:5,value:3,fontSize:"30px",fullIcon:s("div",{class:"ifc-icon full",children:"\u2605"}),outlineIcon:s("div",{class:"ifc-icon outline",children:"\u2606"})},argTypes:{maxLength:{control:"number",description:"Total number of stars"},value:{control:"number",description:"Current rating value"},fontSize:{control:"text",description:"Size of the stars (e.g., 20px, 2rem)"}},render:e=>s("div",{style:{padding:"20px"},children:s(rr,{...e})}),code:`import { StarsComponent } from 'lupine.components/components/stars-component';

<StarsComponent 
  maxLength={5} 
  value={3} 
  fontSize="30px" 
  fullIcon={<div class="ifc-icon full">\u2605</div>} 
  outlineIcon={<div class="ifc-icon outline">\u2606</div>} 
/>
`}});var Fe,zr=m(()=>{"use strict";zi();h();Fe={id:"editable-label-demo",text:"Editable Label Demo",args:{text:"Double click to edit me!",mandtory:!1},argTypes:{text:{control:"text",description:"Initial text content"},mandtory:{control:"boolean",description:"If true, value cannot be left empty"}},render:e=>s("div",{style:{padding:"20px",width:"300px"},children:[s("p",{style:{color:"#666",fontSize:"13px",marginBottom:"10px"},children:"Instructions: Double-click the text below to switch to edit mode. Press Enter to save, or Escape to cancel."}),s(Ii,{...e,save:t=>console.log("Saved:",t)})]}),code:`import { EditableLabel } from 'lupine.components/components/editable-label';

<EditableLabel 
  text="Double click to edit me!" 
  mandtory={false} 
  save={(val) => console.log('Saved:', val)} 
/>
`}});var yt,qe,jr=m(()=>{"use strict";Xi();h();yt={},qe={id:"progress-demo",text:"Progress Demo",args:{simulate:!1},argTypes:{simulate:{control:"boolean",description:"Check this to simulate a 3-second progress upload"}},render:e=>s("div",{ref:{onLoad:async()=>{if(e.simulate&&yt.onShow){yt.onShow(!0,"Simulating Upload...");let o=0,n=setInterval(()=>{o+=3,o>100?(clearInterval(n),yt.onShow(!1)):yt.onProgress(o/100)},100)}else!e.simulate&&yt.onShow&&yt.onShow(!1)}},style:{padding:"20px"},children:[s("p",{style:{color:"#666"},children:"Toggle the 'simulate' control to see the fixed progress bar at the bottom of the screen."}),s(Ji,{hook:yt})]}),code:`import { Progress, ProgressHookProps } from 'lupine.components/components/progress';

const progressHook: ProgressHookProps = {};

// 1. Render the component somewhere in your app (usually near the root)
<Progress hook={progressHook} />

// 2. Control it via the hook
progressHook.onShow!(true, 'Uploading...'); // Show progress
progressHook.onProgress!(0.5);              // Set to 50%
progressHook.onShow!(false);                // Hide
`}});var Ne,Br=m(()=>{"use strict";Ki();h();Ne={id:"radio-label-demo",text:"Radio Label Demo",args:{label:"Option A",name:"demo-radio-group",checked:!0,disabled:!1},argTypes:{label:{control:"text",description:"Label text"},name:{control:"text",description:"Radio group name"},checked:{control:"boolean",description:"Is checked?"},disabled:{control:"boolean",description:"Is disabled?"}},render:e=>s("div",{style:{padding:"20px",display:"flex",flexDirection:"column",gap:"10px"},children:[s(cn,{...e}),s(cn,{label:"Option B",name:e.name,disabled:e.disabled})]}),code:`import { RadioLabelComponent } from 'lupine.components/components/radio-label-component';

<RadioLabelComponent 
  label="Option A" 
  name="demo-radio-group" 
  checked={true} 
  disabled={false} 
/>
<RadioLabelComponent 
  label="Option B" 
  name="demo-radio-group" 
  disabled={false} 
/>
`}});var We,Or=m(()=>{"use strict";or();h();We={id:"select-angle-demo",text:"Select Angle Demo",args:{size:"100px",angle:45,onChange:()=>{}},argTypes:{size:{control:"text",description:"Size of the dial container"},angle:{control:"number",description:"Initial angle (0-360)"}},render:e=>s("div",{style:{padding:"20px"},children:[s("p",{style:{color:"#666",marginBottom:"16px"},children:"Drag the needle or click the edge dots to set the angle."}),s(tr,{...e,onChange:t=>console.log("Angle changed:",t)})]}),code:`import { SelectAngleComponent } from 'lupine.components/components/select-angle-component';

<SelectAngleComponent 
  size="100px" 
  angle={45} 
  onChange={(val) => console.log('Angle changed:', val)} 
/>
`}});var _e,Fr=m(()=>{"use strict";lr();h();_e={id:"switch-option-demo",text:"Switch Option Demo",args:{option1:"Day",option2:"Night",defaultOption:"Day",fontSize:"14px"},argTypes:{option1:{control:"text",description:"First option text"},option2:{control:"text",description:"Second option text"},defaultOption:{control:"text",description:"Initial selected option"},fontSize:{control:"text",description:"Font size"}},render:e=>s("div",{style:{padding:"20px"},children:s(sr,{...e,onChange:t=>console.log("Switched to:",t)})}),code:`import { SwitchOptionComponent } from 'lupine.components/components/switch-option-component';

<SwitchOptionComponent 
  option1="Day" 
  option2="Night" 
  defaultOption="Day" 
  fontSize="14px" 
  onChange={(val) => console.log('Switched to:', val)} 
/>
`}});var Ue,qr=m(()=>{"use strict";Ei();ft();h();Ue={id:"action-sheet-demo",text:"Action Sheet Demo",args:{title:"Select an Action",confirmButtonText:"Confirm Option",cancelButtonText:"Cancel Action"},argTypes:{title:{control:"text",description:"Title of the action sheet"},confirmButtonText:{control:"text",description:"Confirm button text"},cancelButtonText:{control:"text",description:"Cancel button text"}},render:e=>s("div",{style:{display:"flex",flexDirection:"column",gap:"20px",padding:"20px"},children:[s(_,{text:"Show Simple Action Sheet",size:"button-m",onClick:()=>{se.show({title:e.title,children:s("div",{style:{padding:"20px"},children:"Custom Content Here"}),confirmButtonText:e.confirmButtonText,cancelButtonText:e.cancelButtonText,handleConfirmClicked:t=>t("confirm")})}}),s(_,{text:"Show Action Sheet Select",size:"button-m",onClick:()=>{eo.show({title:e.title,options:["Option A","Option B","Option C"],confirmButtonText:e.confirmButtonText,cancelButtonText:e.cancelButtonText,handleClicked:(t,o)=>{console.log("Selected index:",t),o("select")}})}}),s(_,{text:"Show Action Sheet Message",size:"button-m",onClick:()=>{to.show({title:e.title,message:"This is a detailed message shown inside the action sheet.",confirmButtonText:e.confirmButtonText,cancelButtonText:e.cancelButtonText})}}),s(_,{text:"Show Action Sheet Input",size:"button-m",onClick:()=>{oo.show({title:e.title,defaultValue:"Default text",confirmButtonText:e.confirmButtonText,cancelButtonText:e.cancelButtonText,handleConfirmValue:(t,o)=>{console.log("Input value:",t),o("confirm")}})}})]}),code:`import { ActionSheet, ActionSheetSelect, ActionSheetMessage, ActionSheetInput } from 'lupine.components/components/action-sheet';

// Simple Action Sheet
ActionSheet.show({
  title: 'Select an Action',
  children: <div style={{ padding: '20px' }}>Custom Content Here</div>,
  confirmButtonText: 'Confirm Option',
  cancelButtonText: 'Cancel Action',
  handleConfirmClicked: (close) => close('confirm'),
});

// Action Sheet Select
ActionSheetSelect.show({
  title: 'Select an Action',
  options: ['Option A', 'Option B', 'Option C'],
  handleClicked: (index, close) => close('select'),
});
`}});var $e,Nr=m(()=>{"use strict";ir();h();$e={id:"select-with-title-demo",text:"Select With Title Demo",args:{title:"Choose a fruit",size:1,width:"200px"},argTypes:{title:{control:"text",description:"Title text shown above"},size:{control:"number",description:"HTML select size attribute"},width:{control:"text",description:"Width of the select"}},render:e=>{let t=[{option:"Apple",value:"apple"},{option:"Banana",value:"banana",selected:!0},{option:"Cherry",value:"cherry"}];return s("div",{style:{padding:"20px"},children:nr(e.title,t,o=>console.log("Selected:",o),e.size,"input-base",e.width)})},code:`import { SelectWithTitle, SelectOptionProps } from 'lupine.components/components/select-with-title';

const options: SelectOptionProps[] = [
  { option: 'Apple', value: 'apple' },
  { option: 'Banana', value: 'banana', selected: true },
  { option: 'Cherry', value: 'cherry' },
];

{SelectWithTitle(
  'Choose a fruit', // title
  options,          // options array
  (val) => console.log('Selected:', val), // onChange
  1,                // size
  'input-base',     // className
  '200px'           // width
)}
`}});var Ve,Wr=m(()=>{"use strict";Oi();h();Ve={id:"input-with-title-demo",text:"Input With Title Demo",args:{title:"Enter your name",defaultValue:"John Doe",width:"250px"},argTypes:{title:{control:"text",description:"Title text shown above input"},defaultValue:{control:"text",description:"Initial default value"},width:{control:"text",description:"Width of the input container"}},render:e=>s("div",{style:{padding:"20px"},children:Bi(e.title,e.defaultValue,t=>console.log("Input onChange:",t),t=>console.log("Input onInput:",t),"input-base",e.width)}),code:`import { InputWithTitle } from 'lupine.components/components/input-with-title';

{InputWithTitle(
  'Enter your name', // title
  'John Doe',        // defaultValue
  (val) => console.log('onChange:', val),
  (val) => console.log('onInput:', val),
  'input-base',      // className
  '250px'            // width
)}
`}});var Ge,_r=m(()=>{"use strict";cr();h();Ge={id:"tabs-demo",text:"Tabs Demo",args:{defaultIndex:0,pagePadding:"16px"},argTypes:{defaultIndex:{control:"number",description:"Index of the active tab on load"},pagePadding:{control:"text",description:"Padding inside each tab page"}},render:e=>s("div",{style:{height:"300px",width:"500px",border:"1px solid #ccc"},children:s(co,{defaultIndex:e.defaultIndex,pagePadding:e.pagePadding,pages:[{title:"Tab 1",page:s("div",{children:"Content for Tab 1"})},{title:"Tab 2",page:s("div",{children:"Content for Tab 2"})},{title:"Tab 3",page:s("div",{style:{color:"red"},children:"Content for Tab 3"})}]})}),code:`import { Tabs } from 'lupine.components/components/tabs';

<Tabs 
  defaultIndex={0} 
  pagePadding="16px" 
  pages={[
    { title: 'Tab 1', page: <div>Content for Tab 1</div> },
    { title: 'Tab 2', page: <div>Content for Tab 2</div> },
    { title: 'Tab 3', page: <div style={{ color: 'red' }}>Content for Tab 3</div> },
  ]} 
/>
`}});var Ye,Ur=m(()=>{"use strict";Ui();ft();h();Ye={id:"modal-demo",text:"Modal Window Demo",args:{title:"Example Modal",noMoving:!0,noModal:!1,contentMinWidth:"300px"},argTypes:{title:{control:"text",description:"Title of the modal"},noMoving:{control:"boolean",description:"Disable dragging?"},noModal:{control:"boolean",description:"If true, it won't block background interaction"},contentMinWidth:{control:"text",description:"Minimum width of modal"}},render:e=>s("div",{style:{padding:"20px"},children:s(_,{text:"Open Modal",size:"button-m",onClick:()=>{so.show({title:e.title,children:s("div",{style:{padding:"20px"},children:"This is the modal content!"}),noMoving:e.noMoving,noModal:e.noModal,contentMinWidth:e.contentMinWidth,buttons:["Cancel","Confirm"],handleClicked:(t,o)=>{console.log("Clicked button:",t),o()}})}})}),code:`import { ModalWindow } from 'lupine.components/components/modal';

ModalWindow.show({
  title: 'Example Modal',
  children: <div style={{ padding: '20px' }}>This is the modal content!</div>,
  buttons: ['Cancel', 'Confirm'],
  handleClicked: (ind, close) => {
    console.log('Clicked button:', ind);
    close();
  },
});
`}});var Je,$r=m(()=>{"use strict";ln();h();Je={id:"popup-menu-demo",text:"Popup Menu Demo",args:{label:"Actions",defaultValue:"Select...",align:"right"},argTypes:{label:{control:"text",description:"Label for button/text triggers"},defaultValue:{control:"text",description:"Default selected text"},align:{control:"select",options:["left","right"],description:"Menu drop alignment"}},render:e=>{let t=["Edit Profile","Settings","","Log Out"];return s("div",{style:{padding:"20px",display:"flex",gap:"40px",alignItems:"flex-start"},children:[s("div",{children:[s("h3",{children:"With Button"}),s(Gi,{label:e.label,list:t,defaultValue:e.defaultValue,align:e.align,handleSelected:o=>console.log("Selected:",o)})]}),s("div",{children:[s("h3",{children:"With Label"}),s(Yi,{label:e.label,list:t,defaultValue:e.defaultValue,align:e.align})]}),s("div",{children:[s("h3",{children:"With Icon"}),s(lo,{list:t,defaultValue:e.defaultValue,align:e.align,icon:s("span",{style:{fontSize:"24px"},children:"\u2699\uFE0F"})})]})]})},code:`import { PopupMenuWithButton, PopupMenuWithLabel, PopupMenuWithIcon } from 'lupine.components/components/popup-menu';

const list = ['Edit Profile', 'Settings', '', 'Log Out'];

{/* With Button */}
<PopupMenuWithButton
  label="Actions"
  list={list}
  defaultValue="Select..."
  align="right"
  handleSelected={(val: string) => console.log('Selected:', val)}
/>

{/* With Icon */}
<PopupMenuWithIcon
  list={list}
  icon={<span style={{ fontSize: '24px' }}>\u2699\uFE0F</span>}
/>
`}});var Xe,Vr=m(()=>{"use strict";$i();ft();h();Xe={id:"notice-message-demo",text:"Notice Message Demo",args:{message:"Action completed successfully!",permanent:!1,showTime:3e3},argTypes:{message:{control:"text",description:"Message content"},permanent:{control:"boolean",description:"If true, stays until manually closed"},showTime:{control:"number",description:"Time in ms to show (if not permanent)"}},render:e=>s("div",{style:{padding:"20px",display:"flex",gap:"10px",flexWrap:"wrap"},children:[s(_,{text:"Show Info",size:"button-m",onClick:()=>V.sendMessage(e.message,"var(--info-bg-color)",e.permanent,e.showTime)}),s(_,{text:"Show Success",size:"button-m",onClick:()=>V.sendMessage(e.message,"var(--success-bg-color)",e.permanent,e.showTime)}),s(_,{text:"Show Warning",size:"button-m",onClick:()=>V.sendMessage(e.message,"var(--warning-bg-color)",e.permanent,e.showTime)}),s(_,{text:"Show Error",size:"button-m",onClick:()=>V.sendMessage(e.message,"var(--error-bg-color)",e.permanent,e.showTime)})]}),code:`import { NotificationMessage, NotificationColor } from 'lupine.components/components/notice-message';

// Show Info
NotificationMessage.sendMessage('Action completed successfully!', NotificationColor.Info);

// Show Success (permanent)
NotificationMessage.sendMessage('Action completed successfully!', NotificationColor.Success, true);
`}});var Ke,Gr=m(()=>{"use strict";er();h();Ke={id:"resizable-splitter-demo",text:"Resizable Splitter Demo",args:{isVertical:!0},argTypes:{isVertical:{control:"boolean",description:"If true, splits left/right. If false, splits top/bottom"}},render:e=>{let t="splitter-demo-box";return e.isVertical?s("div",{style:{display:"flex",width:"600px",height:"400px",border:"1px solid #999",padding:"20px"},children:[s("div",{id:t,style:{width:"200px",height:"100%",backgroundColor:"#eee",position:"relative"},children:[s("div",{style:{padding:"10px"},children:"Left Panel (Drag right edge)"}),It.getSplitter(`#${t}`,!0,!0)]}),s("div",{style:{flex:1,backgroundColor:"#ddd",padding:"10px"},children:"Right Panel (Flex 1)"})]}):s("div",{style:{display:"flex",flexDirection:"column",width:"600px",height:"400px",border:"1px solid #999",padding:"20px"},children:[s("div",{id:t,style:{height:"150px",width:"100%",backgroundColor:"#eee",position:"relative"},children:[s("div",{style:{padding:"10px"},children:"Top Panel (Drag bottom edge)"}),It.getSplitter(`#${t}`,!1,!1)]}),s("div",{style:{flex:1,backgroundColor:"#ddd",padding:"10px"},children:"Bottom Panel (Flex 1)"})]})},code:`import { ResizableSplitter } from 'lupine.components/components/resizable-splitter';

{/* Left/Right Splitter (isVertical=true means the divider line is vertical) */}
<div id="splitter-demo-box" style={{ width: '200px', height: '100%', position: 'relative' }}>
  <div style={{ padding: '10px' }}>Left Panel (Drag right edge)</div>
  {ResizableSplitter.getSplitter('#splitter-demo-box', true, true)}
</div>
`}});var Qe,Yr=m(()=>{"use strict";Zi();h();Qe={id:"redirect-demo",text:"Redirect Demo",args:{title:"Redirecting you soon..."+new Date().toISOString(),url:"#test-redirect",delaySeconds:3},argTypes:{title:{control:"text",description:"Text shown while waiting"},url:{control:"text",description:"URL to redirect to"},delaySeconds:{control:"number",description:"Delay before redirecting"}},render:e=>s("div",{style:{padding:"20px",border:"1px solid #ccc",backgroundColor:"#f9f9f9"},children:[s("p",{style:{color:"#666",marginBottom:"16px"},children:["This component automatically changes the `window.location.href` after the specified delay. In this demo, the iframe will redirect itself to `",e.url,"` after ",e.delaySeconds," seconds."]}),s(Qi,{...e})]}),code:`import { Redirect } from 'lupine.components/components/redirect';

<Redirect 
  title="Redirecting you soon..." 
  url="https://example.com" 
  delaySeconds={3} 
/>
`}});var Ze,Jr=m(()=>{"use strict";mr();h();Ze={id:"text-wave-demo",text:"Text Wave Demo",args:{text:"Loading...",color:"#22b8ff",fontSize:"30px",padding:"20px",fontWeight:"bold"},argTypes:{text:{control:"text",description:"The text to animate"},color:{control:"text",description:"Color of the text"},fontSize:{control:"text",description:"Font size"},padding:{control:"text",description:"Padding around text"},fontWeight:{control:"text",description:"Font weight"}},render:e=>s("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"200px",backgroundColor:"#f0f0f0"},children:s(hr,{...e})}),code:`import { TextWave } from 'lupine.components/components/text-wave';

<TextWave 
  text="Loading..." 
  color="#22b8ff" 
  fontSize="30px" 
  padding="20px" 
  fontWeight="bold" 
/>
`}});var et,Xr=m(()=>{"use strict";gr();h();et={id:"text-scale-demo",text:"Text Scale Demo",args:{text:"Scaling Text!!!",color:"#22b8ff",backgroundColor:"#a1ffe8",fontSize:"35px",padding:"15px 30px",fontWeight:"bold"},argTypes:{text:{control:"text",description:"The text to animate"},color:{control:"text",description:"Color of the text"},backgroundColor:{control:"text",description:"Background color behind text"},fontSize:{control:"text",description:"Font size"},padding:{control:"text",description:"Padding around background"},fontWeight:{control:"text",description:"Font weight"}},render:e=>s("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"200px"},children:s(ur,{...e})}),code:`import { TextScale } from 'lupine.components/components/text-scale';

<TextScale 
  text="Scaling Text!!!" 
  color="#22b8ff" 
  backgroundColor="#a1ffe8" 
  fontSize="35px" 
  padding="15px 30px" 
  fontWeight="bold" 
/>
`}});var tt,Kr=m(()=>{"use strict";pr();h();tt={id:"text-glow-demo",text:"Text Glow Demo",args:{text:"NEON GLOW",color:"#ffffff",fontSize:"40px",padding:"30px",fontWeight:"bold"},argTypes:{text:{control:"text",description:"The text to animate"},color:{control:"text",description:"Color of the base text"},fontSize:{control:"text",description:"Font size"},padding:{control:"text",description:"Padding around text"},fontWeight:{control:"text",description:"Font weight"}},render:e=>s("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"200px",backgroundColor:"#111"},children:s(dr,{...e})}),code:`import { TextGlow } from 'lupine.components/components/text-glow';

<TextGlow 
  text="NEON GLOW" 
  color="#ffffff" 
  fontSize="40px" 
  padding="30px" 
  fontWeight="bold" 
/>
`}});var ot,Qr=m(()=>{"use strict";go();h();ot={id:"toggle-play-button-demo",text:"Toggle Play Button Demo",args:{size:"Medium",disabled:!1,checked:!1,textColor:"#ffffff",backgroundColor:"#3b29cc",noWave:!1},argTypes:{size:{control:"select",options:["Small","Medium","Large"],description:"Size preset"},disabled:{control:"boolean",description:"Disabled state"},checked:{control:"boolean",description:"Is playing?"},textColor:{control:"text",description:"Color of the play icon"},backgroundColor:{control:"text",description:"Background color of the button"},noWave:{control:"boolean",description:"Disable the background wave animation"}},render:e=>{let t={Small:uo.Small,Medium:uo.Medium,Large:uo.Large};return s("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"200px"},children:s(fr,{size:t[e.size],disabled:e.disabled,checked:e.checked,textColor:e.textColor,backgroundColor:e.backgroundColor,noWave:e.noWave,onClick:o=>console.log("Playing:",o)})})},code:`import { TogglePlayButton, TogglePlayButtonSize } from 'lupine.components/components/toggle-base';

<TogglePlayButton 
  size={TogglePlayButtonSize.Medium} 
  disabled={false} 
  checked={false} 
  textColor="#ffffff" 
  backgroundColor="#3b29cc" 
  noWave={false} 
  onClick={(val) => console.log('Playing:', val)} 
/>
`}});var nt,Zr=m(()=>{"use strict";go();h();nt={id:"toggle-button-demo",text:"Toggle Button Demo",args:{onText:"Turn Off",offText:"Turn On",disabled:!1,checked:!1},argTypes:{onText:{control:"text",description:"Text shown when ON"},offText:{control:"text",description:"Text shown when OFF"},disabled:{control:"boolean",description:"Disabled state"},checked:{control:"boolean",description:"Initial state"}},render:e=>s("div",{style:{padding:"20px"},children:s(br,{onText:e.onText,offText:e.offText,disabled:e.disabled,checked:e.checked,onClick:t=>console.log("Toggled:",t)})}),code:`import { ToggleButton } from 'lupine.components/components/toggle-base';

<ToggleButton 
  onText="Turn Off" 
  offText="Turn On" 
  disabled={false} 
  checked={false} 
  onClick={(val) => console.log('Toggled:', val)} 
/>
`}});var it,ea=m(()=>{"use strict";E();_i();ft();h();it={id:"message-box-demo",text:"MessageBox Demo",args:{title:"System Alert",contentMinWidth:"300px"},argTypes:{title:{control:"text",description:"Title of the MessageBox"},contentMinWidth:{control:"text",description:"Minimum width of MessageBox"}},render:e=>s("div",{style:{padding:"20px"},children:[s("p",{style:{color:"#666",marginBottom:"20px"},children:"Test different button configurations for MessageBox."}),s("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"},children:[s(_,{text:"Yes / No Dialog",size:"button-m",onClick:()=>{xt.show({title:e.title,buttonType:"yesno",contentMinWidth:e.contentMinWidth,children:s("div",{style:{padding:"20px"},children:"Are you sure you want to proceed?"}),handleClicked:(t,o)=>{let n=t===0?"Yes":"No";V.sendMessage("You clicked: "+n,"var(--info-bg-color)"),o()}})}}),s(_,{text:"Ok / Cancel Dialog",size:"button-m",onClick:()=>{xt.show({title:e.title,buttonType:"okcancel",contentMinWidth:e.contentMinWidth,children:s("div",{style:{padding:"20px"},children:"Please confirm this action."}),handleClicked:(t,o)=>{let n=t===0?"OK":"Cancel",i=t===0?"var(--success-bg-color)":"var(--warning-bg-color)";V.sendMessage("You clicked: "+n,i),o()}})}}),s(_,{text:"Ok Only",size:"button-m",onClick:()=>{xt.show({title:e.title,buttonType:"ok",contentMinWidth:e.contentMinWidth,children:s("div",{style:{padding:"20px"},children:"Operation completed successfully!"}),handleClicked:(t,o)=>{V.sendMessage("Dialog dismissed","var(--success-bg-color)"),o()}})}})]})]}),code:`import { MessageBox, MessageBoxButtonProps } from 'lupine.components/components/message-box';

// Quick Alert
MessageBox.show({
  title: 'System Alert',
  buttonType: MessageBoxButtonProps.Ok,
  children: <div style={{ padding: '20px' }}>Operation completed successfully!</div>,
  handleClicked: (index, close) => {
    close();
  }
});

// Confirmation Dialog
MessageBox.show({
  title: 'Confirm Action',
  buttonType: MessageBoxButtonProps.OkCancel,
  children: <div style={{ padding: '20px' }}>Are you sure you want to proceed?</div>,
  handleClicked: (index, close) => {
    if (index === 0) {
      console.log('User clicked OK');
    } else {
      console.log('User clicked Cancel');
    }
    close();
  }
});
`}});var wl,Sl=m(()=>{"use strict";h();wl=e=>{let t={height:"100%",width:"100%",display:"flex",flexDirection:"column",".&-iframe-box":{flex:1,minHeight:"200px"},".&-iframe":{width:"100%",height:"100%",border:"dotted 1px red"},".&-control-box":{minHeight:"50px",maxHeight:"50%",overflowY:"auto",borderTop:"1px solid var(--border-color, #ccc)",padding:"var(--space-m, 8px)"}},o=()=>i.$("&-iframe"),n=()=>{if(e.onIframeLoad){let r=o();r.contentWindow&&e.onIframeLoad(r.contentWindow)}},i={};return s("div",{css:t,ref:i,class:"demo-container-top",children:[s("div",{class:"&-iframe-box",children:s("iframe",{class:"&-iframe",src:e.demoUrl,frameBorder:"0",onLoad:n})}),s("div",{class:"&-control-box",children:e.controlBox})]})}});var I,Cl=m(()=>{"use strict";Sl();h();I=e=>{let{story:t}=e,o={...t.args},n="preview",i=null,r=()=>{i&&i._lj_demo_hook&&i._lj_demo_hook.updateArgs(o,n==="code")},a=u=>{i=u,r()},l=(u,g)=>{o[u]=g,r()},c=(u,g)=>{let f=o[u],{control:b,options:x,description:v}=g,T=s("span",{children:["Unknown control: ",b]});return b==="text"?T=s("input",{class:"&-ctl-input input-base",type:"text",value:f||"",onInput:y=>l(u,y.target.value)}):b==="boolean"?T=s("label",{class:"&-ctl-check",children:s("input",{type:"checkbox",checked:!!f,onChange:y=>l(u,y.target.checked)})}):b==="select"&&x?T=s("select",{class:"&-ctl-input input-base",onChange:y=>l(u,y.target.value),children:x.map(y=>s("option",{value:y,selected:y===f,children:y}))}):b==="number"&&(T=s("input",{class:"&-ctl-input input-base",type:"number",value:f||0,onInput:y=>l(u,Number(y.target.value))})),s("div",{class:"&-ctl-item",children:[s("div",{class:"&-ctl-label",children:u}),T,v&&s("div",{class:"&-ctl-desc",children:v})]})},d=()=>{if(!t.argTypes)return s("div",{children:"No argTypes defined for this story."});let u={padding:"8px",".&-header":{display:"flex",alignItems:"center",margin:"0 0 16px 0"},".&-title":{margin:0,fontSize:"16px"},".&-modes":{display:"flex",gap:"4px",backgroundColor:"#f5f5f5",padding:"2px",borderRadius:"4px",marginLeft:"16px"},".&-mode-btn":{border:"none",background:"transparent",padding:"4px 12px",fontSize:"12px",fontWeight:"bold",cursor:"pointer",borderRadius:"2px",color:"#666","&.active":{background:"white",color:"#000",boxShadow:"0 1px 2px rgba(0,0,0,0.1)"}},".&-ctl-check":{display:"flex",alignItems:"center"},".&-ctl-item":{display:"flex",alignItems:"center",marginBottom:"8px"},".&-ctl-label":{width:"120px",fontWeight:"bold",fontSize:"14px"},".&-ctl-input":{flex:1,maxWidth:"300px",padding:"4px 8px",border:"1px solid #ccc",borderRadius:"4px"},".&-ctl-desc":{marginLeft:"8px",fontSize:"12px",color:"#666"}},g={};return s("div",{css:u,ref:g,children:[s("div",{class:"&-header",children:[s("h3",{class:"&-title",children:"Controls"}),s("div",{class:"&-modes",children:[s("button",{class:`&-mode-btn ${n==="preview"?"active":""}`,onClick:()=>{n="preview",r(),g.$("&-mode-btn",!0).forEach(f=>f.classList.remove("active")),g.$("&-mode-btn")[0].classList.add("active")},children:"Preview"}),s("button",{class:`&-mode-btn ${n==="code"?"active":""}`,onClick:()=>{n="code",r(),g.$("&-mode-btn",!0).forEach(f=>f.classList.remove("active")),g.$("&-mode-btn")[1].classList.add("active")},children:"Code"})]})]}),t.argTypes&&Object.keys(t.argTypes).map(f=>{let b=t.argTypes[f];return c(f,b)})]})},p=typeof location<"u"?location.pathname+`/demo?id=${t.id}`:`/demo/demo?id=${t.id}`;return s(wl,{demoUrl:p,onIframeLoad:a,controlBox:d()})}});var gf,Tl,ta,gn,Pl=m(()=>{"use strict";kl();Ar();Rr();Dr();Hr();Ir();zr();jr();Br();Or();Fr();qr();Nr();Wr();_r();Ur();$r();Vr();Gr();Yr();Jr();Xr();Kr();Qr();Zr();ea();Cl();h();gf=[{text:"Contents",zh:"\u5185\u5BB9\u7BA1\u7406"},{text:"Menu List",zh:"\u83DC\u5355\u5217\u8868"},{text:"Page List",zh:"\u9875\u9762\u5217\u8868"},{text:"Process List",zh:"\u6D41\u7A0B\u5217\u8868"},{text:"DB",zh:"\u6570\u636E\u5E93"},{text:"Table List",zh:"\u8868"},{text:"Create Tables",zh:"\u521B\u5EFA\u8868"},{text:"Run SQL",zh:"\u8FD0\u884C SQL"},{text:"Test",zh:"\u6D4B\u8BD5"},{text:"Test Themes",zh:"\u6D4B\u8BD5\u4E3B\u9898"},{text:"Test Component",zh:"\u6D4B\u8BD5\u7EC4\u4EF6"},{text:"Test Animations",zh:"\u6D4B\u8BD5\u52A8\u753B"},{text:"Test Edit",zh:"\u6D4B\u8BD5\u7F16\u8F91"},{text:"Access",zh:"\u7BA1\u7406\u670D\u52A1\u5668"},{text:"Release",zh:"\u53D1\u5E03"},{text:"Tokens",zh:"\u7BA1\u7406\u4EE4\u724C"},{text:"Server Info",zh:"\u670D\u52A1\u5668\u4FE1\u606F"},{text:"Resources",zh:"\u7BA1\u7406\u8D44\u6E90"},{text:"Config",zh:"\u7BA1\u7406\u914D\u7F6E"},{text:"Shell",zh:"\u547D\u4EE4\u7EC8\u7AEF"},{text:"Performance",zh:"\u6027\u80FD"},{text:"Help",zh:"\u5E2E\u52A9"},{text:"About",zh:"\u5173\u4E8E"}],Tl=e=>{let t=gf.find(o=>o.text===e);return t?t.zh:e},ta=class{constructor(){this.consoleTitle="Welcome to Demo Panel";this.maxWidthMobileMenu="700px";this.maxTabsCount=20;this.tabsHook={};this.demoTopMenu=[{id:"basic-demo",text:"Basic",url:"",items:[{id:Ie.id,text:Ie.text,url:"",js:()=>this.addPanel(Ie.text,s(I,{story:Ie}))},{id:ze.id,text:ze.text,url:"",js:()=>this.addPanel(ze.text,s(I,{story:ze}))},{id:je.id,text:je.text,url:"",js:()=>this.addPanel(je.text,s(I,{story:je}))},{id:Be.id,text:Be.text,url:"",js:()=>this.addPanel(Be.text,s(I,{story:Be}))},{id:Oe.id,text:Oe.text,url:"",js:()=>this.addPanel(Oe.text,s(I,{story:Oe}))},{id:Fe.id,text:Fe.text,url:"",js:()=>this.addPanel(Fe.text,s(I,{story:Fe}))},{id:qe.id,text:qe.text,url:"",js:()=>this.addPanel(qe.text,s(I,{story:qe}))},{id:Ze.id,text:Ze.text,url:"",js:()=>this.addPanel(Ze.text,s(I,{story:Ze}))},{id:et.id,text:et.text,url:"",js:()=>this.addPanel(et.text,s(I,{story:et}))},{id:tt.id,text:tt.text,url:"",js:()=>this.addPanel(tt.text,s(I,{story:tt}))},{id:ot.id,text:ot.text,url:"",js:()=>this.addPanel(ot.text,s(I,{story:ot}))},{id:nt.id,text:nt.text,url:"",js:()=>this.addPanel(nt.text,s(I,{story:nt}))}]},{id:"forms-inputs-demo",text:"Forms & Inputs",url:"",items:[{id:Ne.id,text:Ne.text,url:"",js:()=>this.addPanel(Ne.text,s(I,{story:Ne}))},{id:We.id,text:We.text,url:"",js:()=>this.addPanel(We.text,s(I,{story:We}))},{id:_e.id,text:_e.text,url:"",js:()=>this.addPanel(_e.text,s(I,{story:_e}))},{id:Ue.id,text:Ue.text,url:"",js:()=>this.addPanel(Ue.text,s(I,{story:Ue}))},{id:$e.id,text:$e.text,url:"",js:()=>this.addPanel($e.text,s(I,{story:$e}))},{id:Ve.id,text:Ve.text,url:"",js:()=>this.addPanel(Ve.text,s(I,{story:Ve}))}]},{id:"layout-popups-demo",text:"Layout & Popups",url:"",items:[{id:Ge.id,text:Ge.text,url:"",js:()=>this.addPanel(Ge.text,s(I,{story:Ge}))},{id:Ye.id,text:Ye.text,url:"",js:()=>this.addPanel(Ye.text,s(I,{story:Ye}))},{id:it.id,text:it.text,url:"",js:()=>this.addPanel(it.text,s(I,{story:it}))},{id:Je.id,text:Je.text,url:"",js:()=>this.addPanel(Je.text,s(I,{story:Je}))},{id:Xe.id,text:Xe.text,url:"",js:()=>this.addPanel(Xe.text,s(I,{story:Xe}))},{id:Ke.id,text:Ke.text,url:"",js:()=>this.addPanel(Ke.text,s(I,{story:Ke}))},{id:Qe.id,text:Qe.text,url:"",js:()=>this.addPanel(Qe.text,s(I,{story:Qe}))}]},{id:"help",text:"Help",url:"",items:[{id:"about",text:"About",url:"",js:()=>this.addPanel("About",yl())}]}];this.mobileMenuMaxWidth="700px";this.refUpdate=this.getTabsHook()}getConsoleTitle(){return this.consoleTitle}setConsoleTitle(t){this.consoleTitle=t}setMaxWidthMobileMenu(t){this.maxWidthMobileMenu=t}getMaxWidthMobileMenu(){return this.maxWidthMobileMenu}setMaxTabsCount(t){this.maxTabsCount=t}getMaxTabsCount(){return this.maxTabsCount}setTabsHook(t){this.tabsHook=t}getTabsHook(){return this.tabsHook}setAppDemoHookCheckLogin(t){this.AppDemoHookCheckLogin=t}getAppDemoHookCheckLogin(){return this.AppDemoHookCheckLogin}setAppDemoHookLogout(t){this.AppDemoHookLogout=t}getAppDemoHookLogout(){return this.AppDemoHookLogout}setHookBeforeShowMenu(t){this.hookBeforeShowMenu=t}getDemoTopMenu(){return this.hookBeforeShowMenu?this.hookBeforeShowMenu(this.demoTopMenu):this.demoTopMenu}setDemoTopMenu(t){this.demoTopMenu=t}setChineseDemoTopMenu(){this.demoTopMenu.forEach(t=>{var o;t.text=Tl(t.text),(o=t.items)==null||o.forEach(n=>{n.text=Tl(n.text)})})}setMobileMenuMaxWidth(t){this.mobileMenuMaxWidth=t}getMobileMenuMaxWidth(){return this.mobileMenuMaxWidth}insertMenuItem(t,o){let n=-1;o&&(n=this.demoTopMenu.findIndex(i=>i.id===o)),n!==-1?this.demoTopMenu.splice(n,0,...t):this.demoTopMenu.push(...t)}insertSubMenuItem(t,o,n){let i=this.demoTopMenu.findIndex(r=>r.id===o);if(i!==-1){let r=this.demoTopMenu[i].items||[],a=r.findIndex(l=>l.id===n);a!==-1?r.splice(a,0,...t):r.push(...t)}}getMenuItem(t){let o=this.demoTopMenu.findIndex(n=>n.id===t);return o!==-1?this.demoTopMenu[o]:null}getSubMenuItem(t,o){let n=this.demoTopMenu.findIndex(i=>i.id===t);if(n!==-1){let i=this.demoTopMenu[n].items||[],r=i.findIndex(a=>a.id===o);if(r!==-1)return i[r]}return null}async addPanel(t,o){if(this.getTabsHook().getCount()>this.getMaxTabsCount()){alert("You are opening too many pages");return}this.getTabsHook().findAndActivate(t)||await this.getTabsHook().newPage(t,o)}},gn=new ta});var Ml,Ll=m(()=>{"use strict";E();E();vl();Pl();h();Ml=e=>{let t=gn.getTabsHook(),o=gn.getMobileMenuMaxWidth(),n={backgroundColor:"var(--primary-bg-color)",color:"var(--primary-color)",...xl,display:"flex",flexDirection:"column",width:"100%",height:"100%",minHeight:"100%",overflowY:"auto",".f-header":{display:"flex",alignItems:"center",padding:"4px 16px 4px 0px",fontSize:"80%"},".top-logo":{marginLeft:"16px",marginRight:"16px"},".top-title":{flex:"1",fontSize:"160%",margin:"auto"},".top-menu":{display:"flex"},".top-menu .item":{padding:"0px 2px"},".f-body":{flex:"1",display:"flex",borderTop:"var(--primary-border)",minHeight:"0"},".body-menu":{width:"165px",borderRight:"var(--primary-border)",overflowX:"hidden",overflowY:"auto",color:"var(--sidebar-color)",backgroundColor:"var(--sidebar-bg-color)"},".close-menu-icon":{position:"relative"},".close-menu-icon.hide + .body-menu":{display:"none"},".close-menu-icon::after":{content:'""',position:"absolute",top:"-13px",left:"-1px",transform:"rotate(90deg)",width:"0",height:"0",borderLeft:"7px solid transparent",borderRight:"7px solid transparent",borderTop:"7px solid var(--primary-color)",transition:"all 300ms ease-in-out",zIndex:"var(--layer-sidebar)"},["@media only screen and (max-width: "+o+")"]:{".body-menu, .close-menu-icon":{display:"none"}},".body-content":{flex:"1",overflowX:"auto"},".body-tabs":{height:"100%"},...e.css};M("demo-frame-box",n);let i=[],r={},a=gn.getDemoTopMenu(),l=()=>{r.current.classList.toggle("hide")};return s("div",{class:"demo-frame-box",children:[s("div",{class:"f-header",children:[s(sn,{items:a,maxWidthMobileMenu:o,color:"var(--sidebar-color)",backgroundColor:"var(--sidebar-bg-color)",mobileMenu:!0}),s("div",{class:"top-logo",children:"Lupine.js"}),s("div",{class:"top-title",children:e.title}),s("div",{class:"top-menu",children:s(po,{})})]}),s("div",{class:"f-body",children:[s("div",{ref:r,class:"close-menu-icon",onClick:l,title:"Hide / Show Side Menu"}),s("div",{class:"body-menu",children:s(sn,{items:a,maxWidthMobileMenu:o,color:"var(--sidebar-color)",backgroundColor:"var(--sidebar-bg-color)",desktopMenu:!0})}),s("div",{class:"body-content",children:s("div",{class:"body-tabs",children:s(co,{pages:i,hook:t,pagePadding:"8px"})})})]})]})}});var El,Al=m(()=>{"use strict";Ar();Rr();Dr();Hr();Ir();zr();jr();Br();Or();Fr();qr();Nr();Wr();_r();Ur();$r();Vr();Gr();Yr();Jr();Xr();Kr();Qr();Zr();ea();El={[Ie.id]:Ie,[ze.id]:ze,[je.id]:je,[Be.id]:Be,[Oe.id]:Oe,[Fe.id]:Fe,[qe.id]:qe,[Ne.id]:Ne,[We.id]:We,[_e.id]:_e,[Ue.id]:Ue,[$e.id]:$e,[Ve.id]:Ve,[Ge.id]:Ge,[Ye.id]:Ye,[Je.id]:Je,[Xe.id]:Xe,[Ke.id]:Ke,[Qe.id]:Qe,[Ze.id]:Ze,[et.id]:et,[tt.id]:tt,[ot.id]:ot,[nt.id]:nt,[it.id]:it}});var oa,Rl=m(()=>{"use strict";E();Al();h();oa=async e=>{let t=new D(s("div",{css:{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100vh",color:"var(--text-color, #333)"},children:"Loading component preview..."}));if(F()){let i=new URL(window.location.href).searchParams.get("id"),r=i?El[i]:null;if(r){let a=(l,c)=>c&&r.code?s("pre",{style:{margin:0,padding:"20px",backgroundColor:"#f5f5f5",width:"100%",height:"100%",overflow:"auto"},children:s("code",{children:we(r.code)})}):c&&!r.code?s("div",{children:"Code snippet not available for this demo."}):r.render(l);t.value=a(r.args,!1),window._lj_demo_hook={updateArgs:(l,c=!1)=>{t.value=a(l,c)}}}else t.value=s("div",{children:"Component not found"})}return s("div",{css:{width:"100%",height:"100%",margin:0,padding:"var(--space-m, 16px)",boxSizing:"border-box",display:"flex",justifyContent:"center",alignItems:"center",overflow:"hidden"},children:t.node})}});var Dl,mo,Hl=m(()=>{"use strict";E();Ll();Rl();h();Dl=async e=>e.query.id?s(oa,{...e}):s(Ml,{title:"Components Demo"}),mo=new ye;mo.use("/demo",oa);mo.use("/*",Dl)});var zl,Il=m(()=>{zl="/lupine.js/pub_assets/buttons_morden-25ZEA3QP.gif"});var jl,N,Ul,mf,ff,$l,L,ne,Bl,Ol,Fl,ql,Nl,Wl,_l,Vl=m(()=>{"use strict";H();Il();jl=18,N=(e,t)=>`background-position: ${(e+1)*-jl}px ${(t+1)*-jl}px;`,Ul={name:"EN",Size:"Size",fontsize:"Font Size",bold:"Bold",italic:"Italic",underline:"Underline",left:"Left Align",center:"Center Align",right:"Right Align",justify:"Justify Align",ol:"Insert Ordered List",ul:"Insert Unordered List",strikethrough:"Strike Through",indent:"Indent Text",outdent:"Remove Indent",removeformat:"Remove Formatting",textColor:"Text Color",backColor:"Background Color",image:"Image",undo:"Undo",redo:"Redo",Link:"Edit Link",UnLink:"Remove Link",OK:"OK",Cancel:"Cancel"},mf={name:"CN",Size:"\u5B57\u53F7",fontsize:"\u5B57\u53F7",bold:"\u7C97\u4F53",italic:"\u659C\u4F53",underline:"\u4E0B\u5212\u7EBF",left:"\u5DE6\u5BF9\u9F50",center:"\u5C45\u4E2D\u5BF9\u9F50",right:"\u53F3\u5BF9\u9F50",justify:"\u4E24\u7AEF\u5BF9\u9F50",ol:"\u63D2\u5165\u6709\u5E8F\u5217\u8868",ul:"\u63D2\u5165\u65E0\u5E8F\u5217\u8868",strikethrough:"\u5220\u9664\u7EBF",indent:"\u7F29\u8FDB",outdent:"\u53D6\u6D88\u7F29\u8FDB",removeformat:"\u6E05\u9664\u683C\u5F0F",textColor:"\u6587\u672C\u989C\u8272",backColor:"\u80CC\u666F\u989C\u8272",image:"\u56FE\u7247",undo:"\u64A4\u9500",redo:"\u91CD\u505A",Link:"\u7F16\u8F91\u94FE\u63A5",UnLink:"\u79FB\u9664\u94FE\u63A5",OK:"\u786E\u5B9A",Cancel:"\u53D6\u6D88"},ff={},$l=fe("he-"),L=class L{constructor(t,o,n,i){this.m_buttons=[];this.m_id="";this.m_focus=!1;this.selector=t,this.m_buttons=n,L._lang=i||L._lang,this.init(o),window.HEditor=L}static setLang(t){L._lang=t}static setLabel(t){L._label=t}static setIconPath(t){L._iconPath=t}static setPickupImageHook(t){L._PickupImageHook=t}static lang(t){return L._lang[t]||t}static label(t){return L._label[t]||t}static addPlugin(t,o){L._plugins[t.toUpperCase()]=o}static getEditor(t,o,n,i){let r=typeof t=="string"?document.querySelector(t):t;if(!r){console.warn(`HEditor: ${t} not found`);return}let a=r;if(a._edt)return a._edt;let l=new L(t,o,n,i);return a._edt=l,l}static getEditorById(t){let o=document.querySelector(`[_eid="${t}"]`);if(!o||!o._edt){console.warn(`HEditor: ${t} not found`);return}return o._edt}static processSelectedChanged(t,o,n,i){let r=L.getEditorById(o),a=L._plugins[n.toUpperCase()];a.onSelectedChanged(r,a,i,t.options[t.selectedIndex].text,t.value),t.selectedIndex=0}static processButtonClick(t,o,n,i){let r=L.getEditorById(o),a=L._plugins[n.toUpperCase()];a.onButtonClick(r,a,i)}onBlur(){this.m_focus=!1}onFocus(){this.m_focus=!0,this.m_range=null}onMDown(t){this.m_focus=!0;let o=t.target,n=o.nodeName.toUpperCase();if(this.m_drag&&this.m_drag.o&&(this.m_drag.o.style.cursor=this.m_drag.c,this.m_drag=null),n=="IMG"){this.selObj(o),this.m_drag={ty:-1,o,x:t.clientX,y:t.clientY,w:o.offsetWidth,h:o.offsetHeight,c:o.style.cursor};let i=o.getBoundingClientRect();(t.clientX>=i.right-10||t.clientY>=i.bottom-10)&&(t.preventDefault(),this.m_drag.ty=0)}}onMMove(t){var r;let o=t.target,n=o.nodeName.toUpperCase(),i=t.buttons==1;if(this.m_drag&&this.m_drag.o){if(this.m_drag.ty>=0&&!i)return this.onMUp(t);if((r=window.getSelection())==null||r.removeAllRanges(),this.m_drag.ty==0?(t.preventDefault(),this.m_drag.ty=1):this.m_drag.ty<0&&i&&(t.clientX!=this.m_drag.x||t.clientY!=this.m_drag.y)&&(this.m_drag.o.style.cursor=this.m_drag.c),this.m_drag.ty==1){let a=this.m_drag.w+t.clientX-this.m_drag.x,l=this.m_drag.h+t.clientY-this.m_drag.y;a<5&&(a=5),l<5&&(l=5),this.m_drag.o.width=a,this.m_drag.o.height=l}}if(n=="IMG"){let a=o.getBoundingClientRect();t.clientX>=a.right-10&&t.clientY<=a.bottom-20?o.style.cursor="w-resize":t.clientX<=a.right-20&&t.clientY>=a.bottom-10?o.style.cursor="ns-resize":t.clientX>=a.right-20&&t.clientY>=a.bottom-20?o.style.cursor="nw-resize":o.style.cursor=""}}onMUp(t){let o=t.target,n=o.nodeName.toUpperCase();this.m_drag&&this.m_drag.o&&(this.m_drag.o.style.cursor=this.m_drag.c,this.m_drag.ty=-1),n=="IMG"&&this.selObj(o)}onDblClick(){}setFocus(){this.m_win.focus(),this.onFocus()}onBeforedeactivate(){this.m_range=this.m_doc.selection.createRange(),this.m_focus=!1}execCommand(t,o){this.setFocus(),this.m_doc.execCommand(t,!1,o)}pickupColor(t){let o=document.querySelector(`.${this.m_id}_color`);o.addEventListener("change",()=>{t(o.value)},{once:!0}),o.click()}pickupImage(t){if(!L._PickupImageHook){alert("HEditor: PickupImageHook not set");return}L._PickupImageHook(t)}init(t){let o=typeof this.selector=="string"?document.querySelector(this.selector):this.selector;if(!o){console.warn(`HEditor: ${this.selector} not found`);return}let n=o.getAttribute("_eid");n||(n=$l(),o.setAttribute("_eid",n)),this.m_id=n;let i=`<div id="${n}_pp" style="display:flex;flex-direction:column;height:100%;width:100%;position:relative;">
<style>
.h_editor_icon {
  background-image:url(${L._iconPath});background-repeat:no-repeat;display:inline-block;height:18px;width:18px;overflow:hidden;margin-top:1px;
}
</style>
<div id="${n}_p" style="flex: 0 0 auto;width:100%;border: 1px solid #ccc;display:flex;font-size:14px;"></div>
<input style='height:0;width:0;padding:0;margin:0;border:0;' class='${n}_color' type='color' />
<iframe id="${n}_ifrm" style="flex: 1 1 auto;min-height:0;width:100%;border: 1px solid #ccc;" allowTransparency="true" scrolling="auto" frameborder=0></iframe>
</div>`;o.innerHTML=i,this.m_p=o.querySelector(`#${n}_p`),this.m_ifrm=o.querySelector(`#${n}_ifrm`),this.reset(t),this.setPanel(),o.style.resize="both",o.style.overflow="auto"}reset(t){let o=this.m_ifrm.contentDocument||this.m_ifrm.contentWindow.document;o.designMode="On",o.open(),o.write(`<html><head></head><body style="margin:0!important;background-color:transparent!important;width:100%;height:100%;">${t||"<br>"}</body></html>`),o.close(),this.m_doc=o,this.m_win=this.m_ifrm.contentWindow,this.m_win.addEventListener("blur",this.onBlur.bind(this)),this.m_win.addEventListener("focus",this.onFocus.bind(this)),this.m_doc.addEventListener("mousedown",this.onMDown.bind(this)),this.m_doc.addEventListener("mousemove",this.onMMove.bind(this)),this.m_doc.addEventListener("mouseup",this.onMUp.bind(this)),this.m_win.addEventListener("dblclick",this.onDblClick.bind(this))}setPanel(){let t="";if(this.m_buttons&&this.m_buttons.length>0)for(let o of this.m_buttons)for(let n in L._plugins)t+=this.createPanel(n,L._plugins[n].buttons,o);else for(let o in L._plugins)t+=this.createPanel(o,L._plugins[o].buttons);this.m_p.innerHTML=t}createPanel(t,o,n){let i="";for(let r in o){if(n&&r!=n)continue;let a=o[r];if(r=="-")i+='<br style="clear:both;">';else if(a.list){i+=`<div style="" title="${L.lang(a.name)}"><select onchange="HEditor.processSelectedChanged(this,'${this.m_id}', '${t}','${r}')" style="${a.width?"width:"+a.width+";":""}">`;for(let l in a.list)i+=`<option value="${l}">${L.lang(a.list[l])}</option>`;i+="</select></div>"}else{let l=L.label(a.label);i+=`<div style="display:flex;cursor:pointer;border: 1px solid #aaaaaa;background-color:#efefef;${a.style||""}" onmouseover="this.style.backgroundColor='#cccccc';" onmouseout="this.style.backgroundColor='#efefef';"><div title="${L.lang(a.name)}" style="margin:auto 0;" onclick="HEditor.processButtonClick(this,'${this.m_id}','${t}','${r}')">${l}</div></div>`}}return i}getHtml(){return this.m_doc.body.innerHTML}setHtml(t){this.m_doc.body.innerHTML=t||"<br>"}pasteHTML(t){this.setFocus(),this.m_doc.execCommand("InsertHtml",!1,t)}selObj(t){window.setTimeout(()=>{let o=this.m_win.getSelection(),n=this.m_doc.createRange();n.selectNode(t),o.removeAllRanges(),o.addRange(n)},100)}getCurrentLink(){var i;let t=this.m_win.getSelection();if(!t||t.rangeCount===0)return null;let o=t.anchorNode;return o?(i=o.nodeType===Node.ELEMENT_NODE?o:o.parentElement)==null?void 0:i.closest("a"):null}showPanel(t){var n;if(!t){(n=this.m_p.parentNode.querySelector(`#${this.m_id}_userpanel`))==null||n.remove();return}let o=document.createElement("div");return o.innerHTML=t,o.id=`${this.m_id}_userpanel`,o.style.cssText="position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;z-index:10000;background-color:#d3d1d1fc;",this.m_p.parentNode.appendChild(o),o}};L._plugins={},L._lang=Ul,L._label=ff,L._iconPath=zl;ne=L,Bl={name:"font",buttons:{fontsize:{name:"fontsize",label:"Size",command:"fontsize",width:"50px",list:{0:"Size",1:"1&nbsp;(10px)",2:"2&nbsp;(13px)",3:"3&nbsp;(16px)",4:"4&nbsp;(18px)",5:"5&nbsp;(24px)",6:"6&nbsp;(32px)"}}},onSelectedChanged:(e,t,o,n,i)=>{o=="fontsize"&&i&&e.execCommand("fontsize",i)}};ne.addPlugin(Bl.name,Bl);Ol={name:"basic",buttons:{bold:{name:"bold",label:`<span class="h_editor_icon" style="${N(3,2)}"></span>`},italic:{name:"italic",label:`<span class="h_editor_icon" style="${N(2,2)}"></span>`},underline:{name:"underline",label:`<span class="h_editor_icon" style="${N(2,0)}"></span>`},strikethrough:{name:"strikethrough",label:`<span class="h_editor_icon" style="${N(3,0)}"></span>`},left:{name:"left",label:`<span class="h_editor_icon" style="${N(0,0)}"></span>`,style:"margin-left: 3px"},center:{name:"center",label:`<span class="h_editor_icon" style="${N(1,1)}"></span>`},right:{name:"right",label:`<span class="h_editor_icon" style="${N(1,0)}"></span>`},justify:{name:"justify",label:`<span class="h_editor_icon" style="${N(0,1)}"></span>`},ol:{name:"ol",label:`<span class="h_editor_icon" style="${N(0,3)}"></span>`,style:"margin-left: 3px"},ul:{name:"ul",label:`<span class="h_editor_icon" style="${N(1,3)}"></span>`},indent:{name:"indent",label:`<span class="h_editor_icon" style="${N(0,2)}"></span>`},outdent:{name:"outdent",label:`<span class="h_editor_icon" style="${N(1,2)}"></span>`},removeformat:{name:"removeformat",label:`<span class="h_editor_icon" style="${N(0,5)}"></span>`,style:"margin-left: 3px;margin-right: 3px;"}},onButtonClick:(e,t,o)=>{o=="bold"?e.execCommand("bold"):o=="italic"?e.execCommand("italic"):o=="underline"?e.execCommand("underline"):o=="left"?e.execCommand("justifyleft"):o=="center"?e.execCommand("justifycenter"):o=="right"?e.execCommand("justifyright"):o=="justify"?e.execCommand("justifyfull"):o=="ol"?e.execCommand("insertorderedlist","OL"):o=="ul"?e.execCommand("insertunorderedlist","UL"):o=="strikethrough"?e.execCommand("strikeThrough"):o=="removeformat"?e.execCommand("removeformat"):o=="indent"?e.execCommand("indent"):o=="outdent"&&e.execCommand("outdent")}};ne.addPlugin(Ol.name,Ol);Fl={name:"color",buttons:{textColor:{name:"textColor",label:`<span class="h_editor_icon" style="${N(3,3)}"></span>`},backColor:{name:"backColor",label:`<span class="h_editor_icon" style="${N(2,3)}"></span>`}},onButtonClick:(e,t,o)=>{o=="textColor"?e.pickupColor(n=>{e.execCommand("forecolor",n)}):o=="backColor"&&e.pickupColor(n=>{e.execCommand("hilitecolor",n)})}};ne.addPlugin(Fl.name,Fl);ql={name:"image",buttons:{image:{name:"image",label:`<span class="h_editor_icon" style="${N(6,3)}"></span>`,style:"margin-left: 3px;"}},onButtonClick:(e,t,o)=>{o=="image"&&e.pickupImage(async n=>{e.execCommand("insertImage",[n])})}};ne.addPlugin(ql.name,ql);Nl={name:"link",buttons:{link:{name:"Link",label:`<span class="h_editor_icon" style="${N(6,1)}"></span>`},unlink:{name:"Unlink",label:`<span class="h_editor_icon" style="${N(2,5)}"></span>`}},onButtonClick:(e,t,o)=>{var n,i;if(o=="link"){let r=e.getCurrentLink(),a=(r==null?void 0:r.getAttribute("href"))||"",l=e.showPanel(`<div><button onclick="HEditor.processButtonClick(this,'${e.m_id}','link','ok')">${ne.lang("OK")}</button><button onclick="HEditor.processButtonClick(this,'${e.m_id}','link','cancel')">${ne.lang("Cancel")}</button></div>
        <input style='width:100%;' value='${a}' />`);t.panel=l}else if(o=="unlink")e.execCommand("unlink");else if(o=="ok"){let r=(i=(n=t.panel)==null?void 0:n.querySelector("input"))==null?void 0:i.value;if(!r){e.execCommand("unlink");return}e.showPanel("");let a=e.getCurrentLink();if(a){a.setAttribute("href",r);return}e.execCommand("createLink",r)}else o=="cancel"&&e.showPanel("")}};ne.addPlugin(Nl.name,Nl);Wl={name:"html",buttons:{html:{name:"html",label:`<span class="h_editor_icon" style="${N(7,0)}"></span>`,style:"margin-left: 3px;"}},onButtonClick:(e,t,o)=>{var n,i;if(o=="html"){let r=e.showPanel(`<div><button onclick="HEditor.processButtonClick(this,'${e.m_id}','html','ok')">${ne.lang("OK")}</button><button onclick="HEditor.processButtonClick(this,'${e.m_id}','html','cancel')">${ne.lang("Cancel")}</button></div>
        <textarea style='flex:1;'>${e.getHtml()}</textarea>`);t.panel=r}else o=="ok"?(e.showPanel(""),e.setHtml(((i=(n=t.panel)==null?void 0:n.querySelector("textarea"))==null?void 0:i.value)||"")):o=="cancel"&&e.showPanel("")}};ne.addPlugin(Wl.name,Wl);_l={name:"undo",buttons:{undo:{name:"undo",label:`<span class="h_editor_icon" style="${N(4,2)}"></span>`,style:"margin-left: 3px"},redo:{name:"redo",label:`<span class="h_editor_icon" style="${N(5,2)}"></span>`}},onButtonClick:(e,t,o)=>{o=="undo"?e.execCommand("undo"):o=="redo"&&e.execCommand("redo")}};ne.addPlugin(_l.name,_l)});var Gl={};$h(Gl,{ActionSheet:()=>se,ActionSheetInput:()=>oo,ActionSheetInputPromise:()=>Mm,ActionSheetMessage:()=>to,ActionSheetMessagePromise:()=>Pm,ActionSheetSelect:()=>eo,ActionSheetSelectOptionsProps:()=>Li,ActionSheetSelectPromise:()=>Lm,Base62:()=>mi,Button:()=>_,ButtonPushAnimation:()=>Ai,ButtonPushAnimationSize:()=>Qo,ButtonSize:()=>Re,ConsoleColors:()=>Jh,DateUtils:()=>fi,DemoIndexPage:()=>Dl,DiffDate:()=>Jo,DocumentReady:()=>vi,DomUtils:()=>yi,DragFresh:()=>Em,DynamicalLoad:()=>wi,EditableLabel:()=>Ii,FloatWindow:()=>bt,Grid:()=>Am,HEditor:()=>ne,HEditorLangCn:()=>mf,HEditorLangEn:()=>Ul,HeaderWithBackFrame:()=>Qm,HeaderWithBackFrameEmpty:()=>Km,HeaderWithBackFrameHeight:()=>ol,HeaderWithBackFrameLeft:()=>nl,HeaderWithBackFrameRight:()=>il,HtmlLoad:()=>Rm,HtmlVar:()=>D,InputWithTitle:()=>Bi,LinkItem:()=>ro,LinkList:()=>Dm,LiteDom:()=>Si,Logger:()=>me,MediaQueryDirection:()=>Bs,MediaQueryMaxWidth:()=>G,MediaQueryRange:()=>Q,MenuBar:()=>zm,MenuSidebar:()=>sn,MessageBox:()=>xt,MessageBoxButtonProps:()=>Wi,MessageHub:()=>Ti,MessageHubData:()=>Ci,MetaData:()=>Fm,MetaDescription:()=>qm,MobileFooterMenu:()=>yr,MobileHeadeBackIcon:()=>Ym,MobileHeadeCloseIcon:()=>Jm,MobileHeadeIconHeight:()=>tl,MobileHeaderCenter:()=>ef,MobileHeaderComponent:()=>Cr,MobileHeaderEmptyIcon:()=>Xm,MobileHeaderHelper:()=>pn,MobileHeaderHide:()=>of,MobileHeaderLeft:()=>Zm,MobileHeaderRight:()=>tf,MobileHeaderTitleIcon:()=>wr,MobileSideMenu:()=>Pr,MobileSideMenuHelper:()=>vt,MobileTopSysIcon:()=>nf,MobileTopSysMenu:()=>rf,ModalWindow:()=>so,NotificationColor:()=>Ht,NotificationMessage:()=>V,Observable:()=>Ko,PageRouter:()=>ye,PageTitle:()=>Wm,PagingLink:()=>Um,Panel:()=>$m,PopupMenu:()=>le,PopupMenuWithButton:()=>Gi,PopupMenuWithIcon:()=>lo,PopupMenuWithLabel:()=>Yi,Progress:()=>Ji,RadioLabelComponent:()=>cn,Redirect:()=>Qi,ResizableSplitter:()=>It,ResponsiveFrame:()=>df,SelectAngleComponent:()=>tr,SelectWithTitle:()=>nr,SimpleStorage:()=>Mi,SlideTabComponent:()=>Vm,SliderFrame:()=>uf,Spinner01:()=>Di,Spinner02:()=>io,Spinner03:()=>Hi,SpinnerSize:()=>no,StarsComponent:()=>rr,Subject:()=>Pi,Subscription:()=>Xo,Svg:()=>De,SwitchOptionComponent:()=>sr,Tabs:()=>co,TextGlow:()=>dr,TextScale:()=>ur,TextWave:()=>hr,ThemeSelector:()=>po,ToggleBase:()=>zt,ToggleBaseSize:()=>Gm,ToggleButton:()=>br,TogglePlayButton:()=>fr,TogglePlayButtonSize:()=>uo,ToggleSwitch:()=>xr,ToggleSwitchSize:()=>dn,ToggleWaveFrame:()=>Zs,TopFrame:()=>pf,WebConfig:()=>Dt,_lupineJs:()=>J,addMetaDataTags:()=>Ee,adjustedMediaQueryRange:()=>Hm,appData:()=>q,backActionHelper:()=>ke,backActionUniqueId:()=>ns,base64ToUrl:()=>cm,baseThemes:()=>rn,bindAppGlobalStyle:()=>Qn,bindAttributes:()=>Le,bindAttributesChildren:()=>ai,bindGlobalStyle:()=>M,bindLang:()=>si,bindLinks:()=>ct,bindPageLoadedEvent:()=>Yn,bindRef:()=>ii,bindRenderPageFunctions:()=>Yh,bindRequestContext:()=>Bo,bindRouter:()=>zn,bindTheme:()=>Gn,bindWebConfigApi:()=>Kh,blobFromBase64:()=>as,blobToBase64:()=>lm,calculateTextWidth:()=>dm,callPageLoadedEvent:()=>qo,callUnload:()=>Gt,camelToHyphens:()=>mt,checkUploadedFileSize:()=>lf,clearCookie:()=>Da,cloneJson:()=>pm,cookie:()=>Xh,createDragUtil:()=>vm,darkThemes:()=>Fi,debugWatch:()=>Ho,decodeHtml:()=>wm,deepMerge:()=>xi,defaultLang:()=>za,defaultTheme:()=>ja,demoPageRouter:()=>mo,disableConsole:()=>um,disableDebug:()=>gm,domUniqueId:()=>_a,downloadFile:()=>fm,downloadFileChunk:()=>fs,downloadLink:()=>bm,downloadStream:()=>xm,encodeHtml:()=>we,findParentTag:()=>Sm,formatBytes:()=>Cm,generateAllGlobalStyles:()=>Zn,getCookie:()=>Do,getCurrentLang:()=>li,getCurrentTheme:()=>xe,getDefaultPageLimit:()=>Vs,getDownloadChunkSize:()=>mm,getEitherCookie:()=>Xt,getGlobalStylesId:()=>Kn,getMetaDataObject:()=>Go,getMetaDataTags:()=>pi,getPageTitle:()=>Vo,getRenderPageProps:()=>re,getRequestContext:()=>j,getServerCookie:()=>Ia,getUploadChunkSize:()=>sf,globalStyleUniqueId:()=>qa,hEditorUniqueId:()=>$l,initServerCookies:()=>Un,initWebEnv:()=>jo,initializeApp:()=>jn,initializePage:()=>Ae,isFrontEnd:()=>F,langCookieName:()=>$o,lightThemes:()=>nn,mobileHeaderHelper:()=>He,mountInnerComponent:()=>te,mountOuterComponent:()=>oi,mountSiblingComponent:()=>im,notificationColorFromValue:()=>Nm,pathUtils:()=>Ls,processStyle:()=>ve,promiseTimeout:()=>Tm,renderComponentAsync:()=>ce,replaceInnerhtml:()=>dt,setCookie:()=>Me,setDefaultPageLimit:()=>Gs,setDefaultPageTitle:()=>di,setDownloadChunkSize:()=>hm,setPageTitle:()=>ci,setRenderPageProps:()=>Eo,setUploadChunkSize:()=>af,sharedThemes:()=>ao,stopPropagation:()=>X,themeAttributeName:()=>Vn,themeCookieName:()=>ht,uniqueIdGenerator:()=>fe,updateLang:()=>rm,updateLangEventName:()=>Ua,updateStyles:()=>em,updateTheme:()=>Qt,updateThemeEventName:()=>Ba,uploadFile:()=>cf,uploadFileChunk:()=>Lr,webEnv:()=>zo});var E=m(()=>{"use strict";H();pe();an();Mr();bl();Hl();Vl()});var bc=S(()=>{});var yo=S((LA,vc)=>{var eb=Object.prototype.toString;vc.exports=function(t){if(t===void 0)return"undefined";if(t===null)return"null";var o=typeof t;if(o==="boolean")return"boolean";if(o==="string")return"string";if(o==="number")return"number";if(o==="symbol")return"symbol";if(o==="function")return rb(t)?"generatorfunction":"function";if(tb(t))return"array";if(lb(t))return"buffer";if(sb(t))return"arguments";if(nb(t))return"date";if(ob(t))return"error";if(ib(t))return"regexp";switch(xc(t)){case"Symbol":return"symbol";case"Promise":return"promise";case"WeakMap":return"weakmap";case"WeakSet":return"weakset";case"Map":return"map";case"Set":return"set";case"Int8Array":return"int8array";case"Uint8Array":return"uint8array";case"Uint8ClampedArray":return"uint8clampedarray";case"Int16Array":return"int16array";case"Uint16Array":return"uint16array";case"Int32Array":return"int32array";case"Uint32Array":return"uint32array";case"Float32Array":return"float32array";case"Float64Array":return"float64array"}if(ab(t))return"generator";switch(o=eb.call(t),o){case"[object Object]":return"object";case"[object Map Iterator]":return"mapiterator";case"[object Set Iterator]":return"setiterator";case"[object String Iterator]":return"stringiterator";case"[object Array Iterator]":return"arrayiterator"}return o.slice(8,-1).toLowerCase().replace(/\s/g,"")};function xc(e){return typeof e.constructor=="function"?e.constructor.name:null}function tb(e){return Array.isArray?Array.isArray(e):e instanceof Array}function ob(e){return e instanceof Error||typeof e.message=="string"&&e.constructor&&typeof e.constructor.stackTraceLimit=="number"}function nb(e){return e instanceof Date?!0:typeof e.toDateString=="function"&&typeof e.getDate=="function"&&typeof e.setDate=="function"}function ib(e){return e instanceof RegExp?!0:typeof e.flags=="string"&&typeof e.ignoreCase=="boolean"&&typeof e.multiline=="boolean"&&typeof e.global=="boolean"}function rb(e,t){return xc(e)==="GeneratorFunction"}function ab(e){return typeof e.throw=="function"&&typeof e.return=="function"&&typeof e.next=="function"}function sb(e){try{if(typeof e.length=="number"&&typeof e.callee=="function")return!0}catch(t){if(t.message.indexOf("callee")!==-1)return!0}return!1}function lb(e){return e.constructor&&typeof e.constructor.isBuffer=="function"?e.constructor.isBuffer(e):!1}});var kc=S((EA,yc)=>{"use strict";yc.exports=function(t){return typeof t<"u"&&t!==null&&(typeof t=="object"||typeof t=="function")}});var Cc=S((AA,Sc)=>{"use strict";var wc=kc();Sc.exports=function(t){wc(t)||(t={});for(var o=arguments.length,n=1;n<o;n++){var i=arguments[n];wc(i)&&cb(t,i)}return t};function cb(e,t){for(var o in t)db(t,o)&&(e[o]=t[o])}function db(e,t){return Object.prototype.hasOwnProperty.call(e,t)}});var Mc=S((RA,Pc)=>{"use strict";var pb=yo(),ub=Cc();Pc.exports=function(e,t){typeof t=="function"&&(t={parse:t});var o=hb(e),n={section_delimiter:"---",parse:fb},i=ub({},n,t),r=i.section_delimiter,a=o.content.split(/\r?\n/),l=null,c=Tc(),d=[],p=[];function u(T){o.content=T,l=[],d=[]}function g(T){p.length&&(c.key=mb(p[0],r),c.content=T,i.parse(c,l),l.push(c),c=Tc(),d=[],p=[])}for(var f=0;f<a.length;f++){var b=a[f],x=p.length,v=b.trim();if(gb(v,r)){if(v.length===3&&f!==0){if(x===0||x===2){d.push(b);continue}p.push(v),c.data=d.join(`
`),d=[];continue}l===null&&u(d.join(`
`)),x===2&&g(d.join(`
`)),p.push(v);continue}d.push(b)}return l===null?u(d.join(`
`)):g(d.join(`
`)),o.sections=l,o};function gb(e,t){return!(e.slice(0,t.length)!==t||e.charAt(t.length+1)===t.slice(-1))}function hb(e){if(pb(e)!=="object"&&(e={content:e}),typeof e.content!="string"&&!bb(e.content))throw new TypeError("expected a buffer or string");return e.content=e.content.toString(),e.sections=[],e}function mb(e,t){return e?e.slice(t.length).trim():""}function Tc(){return{key:"",data:"",content:""}}function fb(e){return e}function bb(e){return e&&e.constructor&&typeof e.constructor.isBuffer=="function"?e.constructor.isBuffer(e):!1}});var Ct=S((DA,St)=>{"use strict";function Lc(e){return typeof e>"u"||e===null}function xb(e){return typeof e=="object"&&e!==null}function vb(e){return Array.isArray(e)?e:Lc(e)?[]:[e]}function yb(e,t){var o,n,i,r;if(t)for(r=Object.keys(t),o=0,n=r.length;o<n;o+=1)i=r[o],e[i]=t[i];return e}function kb(e,t){var o="",n;for(n=0;n<t;n+=1)o+=e;return o}function wb(e){return e===0&&Number.NEGATIVE_INFINITY===1/e}St.exports.isNothing=Lc;St.exports.isObject=xb;St.exports.toArray=vb;St.exports.repeat=kb;St.exports.isNegativeZero=wb;St.exports.extend=yb});var Bt=S((HA,Ec)=>{"use strict";function ko(e,t){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=t,this.message=(this.reason||"(unknown reason)")+(this.mark?" "+this.mark.toString():""),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}ko.prototype=Object.create(Error.prototype);ko.prototype.constructor=ko;ko.prototype.toString=function(t){var o=this.name+": ";return o+=this.reason||"(unknown reason)",!t&&this.mark&&(o+=" "+this.mark.toString()),o};Ec.exports=ko});var Dc=S((IA,Rc)=>{"use strict";var Ac=Ct();function ma(e,t,o,n,i){this.name=e,this.buffer=t,this.position=o,this.line=n,this.column=i}ma.prototype.getSnippet=function(t,o){var n,i,r,a,l;if(!this.buffer)return null;for(t=t||4,o=o||75,n="",i=this.position;i>0&&`\0\r
\x85\u2028\u2029`.indexOf(this.buffer.charAt(i-1))===-1;)if(i-=1,this.position-i>o/2-1){n=" ... ",i+=5;break}for(r="",a=this.position;a<this.buffer.length&&`\0\r
\x85\u2028\u2029`.indexOf(this.buffer.charAt(a))===-1;)if(a+=1,a-this.position>o/2-1){r=" ... ",a-=5;break}return l=this.buffer.slice(i,a),Ac.repeat(" ",t)+n+l+r+`
`+Ac.repeat(" ",t+this.position-i+n.length)+"^"};ma.prototype.toString=function(t){var o,n="";return this.name&&(n+='in "'+this.name+'" '),n+="at line "+(this.line+1)+", column "+(this.column+1),t||(o=this.getSnippet(),o&&(n+=`:
`+o)),n};Rc.exports=ma});var U=S((zA,Ic)=>{"use strict";var Hc=Bt(),Sb=["kind","resolve","construct","instanceOf","predicate","represent","defaultStyle","styleAliases"],Cb=["scalar","sequence","mapping"];function Tb(e){var t={};return e!==null&&Object.keys(e).forEach(function(o){e[o].forEach(function(n){t[String(n)]=o})}),t}function Pb(e,t){if(t=t||{},Object.keys(t).forEach(function(o){if(Sb.indexOf(o)===-1)throw new Hc('Unknown option "'+o+'" is met in definition of "'+e+'" YAML type.')}),this.tag=e,this.kind=t.kind||null,this.resolve=t.resolve||function(){return!0},this.construct=t.construct||function(o){return o},this.instanceOf=t.instanceOf||null,this.predicate=t.predicate||null,this.represent=t.represent||null,this.defaultStyle=t.defaultStyle||null,this.styleAliases=Tb(t.styleAliases||null),Cb.indexOf(this.kind)===-1)throw new Hc('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}Ic.exports=Pb});var Tt=S((jA,jc)=>{"use strict";var zc=Ct(),wn=Bt(),Mb=U();function fa(e,t,o){var n=[];return e.include.forEach(function(i){o=fa(i,t,o)}),e[t].forEach(function(i){o.forEach(function(r,a){r.tag===i.tag&&r.kind===i.kind&&n.push(a)}),o.push(i)}),o.filter(function(i,r){return n.indexOf(r)===-1})}function Lb(){var e={scalar:{},sequence:{},mapping:{},fallback:{}},t,o;function n(i){e[i.kind][i.tag]=e.fallback[i.tag]=i}for(t=0,o=arguments.length;t<o;t+=1)arguments[t].forEach(n);return e}function Ot(e){this.include=e.include||[],this.implicit=e.implicit||[],this.explicit=e.explicit||[],this.implicit.forEach(function(t){if(t.loadKind&&t.loadKind!=="scalar")throw new wn("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")}),this.compiledImplicit=fa(this,"implicit",[]),this.compiledExplicit=fa(this,"explicit",[]),this.compiledTypeMap=Lb(this.compiledImplicit,this.compiledExplicit)}Ot.DEFAULT=null;Ot.create=function(){var t,o;switch(arguments.length){case 1:t=Ot.DEFAULT,o=arguments[0];break;case 2:t=arguments[0],o=arguments[1];break;default:throw new wn("Wrong number of arguments for Schema.create function")}if(t=zc.toArray(t),o=zc.toArray(o),!t.every(function(n){return n instanceof Ot}))throw new wn("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");if(!o.every(function(n){return n instanceof Mb}))throw new wn("Specified list of YAML types (or a single Type object) contains a non-Type object.");return new Ot({include:t,explicit:o})};jc.exports=Ot});var Oc=S((BA,Bc)=>{"use strict";var Eb=U();Bc.exports=new Eb("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return e!==null?e:""}})});var qc=S((OA,Fc)=>{"use strict";var Ab=U();Fc.exports=new Ab("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return e!==null?e:[]}})});var Wc=S((FA,Nc)=>{"use strict";var Rb=U();Nc.exports=new Rb("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return e!==null?e:{}}})});var Sn=S((qA,_c)=>{"use strict";var Db=Tt();_c.exports=new Db({explicit:[Oc(),qc(),Wc()]})});var $c=S((NA,Uc)=>{"use strict";var Hb=U();function Ib(e){if(e===null)return!0;var t=e.length;return t===1&&e==="~"||t===4&&(e==="null"||e==="Null"||e==="NULL")}function zb(){return null}function jb(e){return e===null}Uc.exports=new Hb("tag:yaml.org,2002:null",{kind:"scalar",resolve:Ib,construct:zb,predicate:jb,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"}},defaultStyle:"lowercase"})});var Gc=S((WA,Vc)=>{"use strict";var Bb=U();function Ob(e){if(e===null)return!1;var t=e.length;return t===4&&(e==="true"||e==="True"||e==="TRUE")||t===5&&(e==="false"||e==="False"||e==="FALSE")}function Fb(e){return e==="true"||e==="True"||e==="TRUE"}function qb(e){return Object.prototype.toString.call(e)==="[object Boolean]"}Vc.exports=new Bb("tag:yaml.org,2002:bool",{kind:"scalar",resolve:Ob,construct:Fb,predicate:qb,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"})});var Jc=S((_A,Yc)=>{"use strict";var Nb=Ct(),Wb=U();function _b(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function Ub(e){return 48<=e&&e<=55}function $b(e){return 48<=e&&e<=57}function Vb(e){if(e===null)return!1;var t=e.length,o=0,n=!1,i;if(!t)return!1;if(i=e[o],(i==="-"||i==="+")&&(i=e[++o]),i==="0"){if(o+1===t)return!0;if(i=e[++o],i==="b"){for(o++;o<t;o++)if(i=e[o],i!=="_"){if(i!=="0"&&i!=="1")return!1;n=!0}return n&&i!=="_"}if(i==="x"){for(o++;o<t;o++)if(i=e[o],i!=="_"){if(!_b(e.charCodeAt(o)))return!1;n=!0}return n&&i!=="_"}for(;o<t;o++)if(i=e[o],i!=="_"){if(!Ub(e.charCodeAt(o)))return!1;n=!0}return n&&i!=="_"}if(i==="_")return!1;for(;o<t;o++)if(i=e[o],i!=="_"){if(i===":")break;if(!$b(e.charCodeAt(o)))return!1;n=!0}return!n||i==="_"?!1:i!==":"?!0:/^(:[0-5]?[0-9])+$/.test(e.slice(o))}function Gb(e){var t=e,o=1,n,i,r=[];return t.indexOf("_")!==-1&&(t=t.replace(/_/g,"")),n=t[0],(n==="-"||n==="+")&&(n==="-"&&(o=-1),t=t.slice(1),n=t[0]),t==="0"?0:n==="0"?t[1]==="b"?o*parseInt(t.slice(2),2):t[1]==="x"?o*parseInt(t,16):o*parseInt(t,8):t.indexOf(":")!==-1?(t.split(":").forEach(function(a){r.unshift(parseInt(a,10))}),t=0,i=1,r.forEach(function(a){t+=a*i,i*=60}),o*t):o*parseInt(t,10)}function Yb(e){return Object.prototype.toString.call(e)==="[object Number]"&&e%1===0&&!Nb.isNegativeZero(e)}Yc.exports=new Wb("tag:yaml.org,2002:int",{kind:"scalar",resolve:Vb,construct:Gb,predicate:Yb,represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0"+e.toString(8):"-0"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}})});var Qc=S((UA,Kc)=>{"use strict";var Xc=Ct(),Jb=U(),Xb=new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Kb(e){return!(e===null||!Xb.test(e)||e[e.length-1]==="_")}function Qb(e){var t,o,n,i;return t=e.replace(/_/g,"").toLowerCase(),o=t[0]==="-"?-1:1,i=[],"+-".indexOf(t[0])>=0&&(t=t.slice(1)),t===".inf"?o===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:t===".nan"?NaN:t.indexOf(":")>=0?(t.split(":").forEach(function(r){i.unshift(parseFloat(r,10))}),t=0,n=1,i.forEach(function(r){t+=r*n,n*=60}),o*t):o*parseFloat(t,10)}var Zb=/^[-+]?[0-9]+e/;function ex(e,t){var o;if(isNaN(e))switch(t){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(t){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(t){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(Xc.isNegativeZero(e))return"-0.0";return o=e.toString(10),Zb.test(o)?o.replace("e",".e"):o}function tx(e){return Object.prototype.toString.call(e)==="[object Number]"&&(e%1!==0||Xc.isNegativeZero(e))}Kc.exports=new Jb("tag:yaml.org,2002:float",{kind:"scalar",resolve:Kb,construct:Qb,predicate:tx,represent:ex,defaultStyle:"lowercase"})});var ba=S(($A,Zc)=>{"use strict";var ox=Tt();Zc.exports=new ox({include:[Sn()],implicit:[$c(),Gc(),Jc(),Qc()]})});var xa=S((VA,ed)=>{"use strict";var nx=Tt();ed.exports=new nx({include:[ba()]})});var id=S((GA,nd)=>{"use strict";var ix=U(),td=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),od=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function rx(e){return e===null?!1:td.exec(e)!==null||od.exec(e)!==null}function ax(e){var t,o,n,i,r,a,l,c=0,d=null,p,u,g;if(t=td.exec(e),t===null&&(t=od.exec(e)),t===null)throw new Error("Date resolve error");if(o=+t[1],n=+t[2]-1,i=+t[3],!t[4])return new Date(Date.UTC(o,n,i));if(r=+t[4],a=+t[5],l=+t[6],t[7]){for(c=t[7].slice(0,3);c.length<3;)c+="0";c=+c}return t[9]&&(p=+t[10],u=+(t[11]||0),d=(p*60+u)*6e4,t[9]==="-"&&(d=-d)),g=new Date(Date.UTC(o,n,i,r,a,l,c)),d&&g.setTime(g.getTime()-d),g}function sx(e){return e.toISOString()}nd.exports=new ix("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:rx,construct:ax,instanceOf:Date,represent:sx})});var ad=S((YA,rd)=>{"use strict";var lx=U();function cx(e){return e==="<<"||e===null}rd.exports=new lx("tag:yaml.org,2002:merge",{kind:"scalar",resolve:cx})});var cd=S((JA,ld)=>{"use strict";var Pt;try{sd=Lo,Pt=sd("buffer").Buffer}catch{}var sd,dx=U(),va=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function px(e){if(e===null)return!1;var t,o,n=0,i=e.length,r=va;for(o=0;o<i;o++)if(t=r.indexOf(e.charAt(o)),!(t>64)){if(t<0)return!1;n+=6}return n%8===0}function ux(e){var t,o,n=e.replace(/[\r\n=]/g,""),i=n.length,r=va,a=0,l=[];for(t=0;t<i;t++)t%4===0&&t&&(l.push(a>>16&255),l.push(a>>8&255),l.push(a&255)),a=a<<6|r.indexOf(n.charAt(t));return o=i%4*6,o===0?(l.push(a>>16&255),l.push(a>>8&255),l.push(a&255)):o===18?(l.push(a>>10&255),l.push(a>>2&255)):o===12&&l.push(a>>4&255),Pt?Pt.from?Pt.from(l):new Pt(l):l}function gx(e){var t="",o=0,n,i,r=e.length,a=va;for(n=0;n<r;n++)n%3===0&&n&&(t+=a[o>>18&63],t+=a[o>>12&63],t+=a[o>>6&63],t+=a[o&63]),o=(o<<8)+e[n];return i=r%3,i===0?(t+=a[o>>18&63],t+=a[o>>12&63],t+=a[o>>6&63],t+=a[o&63]):i===2?(t+=a[o>>10&63],t+=a[o>>4&63],t+=a[o<<2&63],t+=a[64]):i===1&&(t+=a[o>>2&63],t+=a[o<<4&63],t+=a[64],t+=a[64]),t}function hx(e){return Pt&&Pt.isBuffer(e)}ld.exports=new dx("tag:yaml.org,2002:binary",{kind:"scalar",resolve:px,construct:ux,predicate:hx,represent:gx})});var pd=S((KA,dd)=>{"use strict";var mx=U(),fx=Object.prototype.hasOwnProperty,bx=Object.prototype.toString;function xx(e){if(e===null)return!0;var t=[],o,n,i,r,a,l=e;for(o=0,n=l.length;o<n;o+=1){if(i=l[o],a=!1,bx.call(i)!=="[object Object]")return!1;for(r in i)if(fx.call(i,r))if(!a)a=!0;else return!1;if(!a)return!1;if(t.indexOf(r)===-1)t.push(r);else return!1}return!0}function vx(e){return e!==null?e:[]}dd.exports=new mx("tag:yaml.org,2002:omap",{kind:"sequence",resolve:xx,construct:vx})});var gd=S((QA,ud)=>{"use strict";var yx=U(),kx=Object.prototype.toString;function wx(e){if(e===null)return!0;var t,o,n,i,r,a=e;for(r=new Array(a.length),t=0,o=a.length;t<o;t+=1){if(n=a[t],kx.call(n)!=="[object Object]"||(i=Object.keys(n),i.length!==1))return!1;r[t]=[i[0],n[i[0]]]}return!0}function Sx(e){if(e===null)return[];var t,o,n,i,r,a=e;for(r=new Array(a.length),t=0,o=a.length;t<o;t+=1)n=a[t],i=Object.keys(n),r[t]=[i[0],n[i[0]]];return r}ud.exports=new yx("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:wx,construct:Sx})});var md=S((ZA,hd)=>{"use strict";var Cx=U(),Tx=Object.prototype.hasOwnProperty;function Px(e){if(e===null)return!0;var t,o=e;for(t in o)if(Tx.call(o,t)&&o[t]!==null)return!1;return!0}function Mx(e){return e!==null?e:{}}hd.exports=new Cx("tag:yaml.org,2002:set",{kind:"mapping",resolve:Px,construct:Mx})});var Ft=S((eR,fd)=>{"use strict";var Lx=Tt();fd.exports=new Lx({include:[xa()],implicit:[id(),ad()],explicit:[cd(),pd(),gd(),md()]})});var xd=S((tR,bd)=>{"use strict";var Ex=U();function Ax(){return!0}function Rx(){}function Dx(){return""}function Hx(e){return typeof e>"u"}bd.exports=new Ex("tag:yaml.org,2002:js/undefined",{kind:"scalar",resolve:Ax,construct:Rx,predicate:Hx,represent:Dx})});var yd=S((oR,vd)=>{"use strict";var Ix=U();function zx(e){if(e===null||e.length===0)return!1;var t=e,o=/\/([gim]*)$/.exec(e),n="";return!(t[0]==="/"&&(o&&(n=o[1]),n.length>3||t[t.length-n.length-1]!=="/"))}function jx(e){var t=e,o=/\/([gim]*)$/.exec(e),n="";return t[0]==="/"&&(o&&(n=o[1]),t=t.slice(1,t.length-n.length-1)),new RegExp(t,n)}function Bx(e){var t="/"+e.source+"/";return e.global&&(t+="g"),e.multiline&&(t+="m"),e.ignoreCase&&(t+="i"),t}function Ox(e){return Object.prototype.toString.call(e)==="[object RegExp]"}vd.exports=new Ix("tag:yaml.org,2002:js/regexp",{kind:"scalar",resolve:zx,construct:jx,predicate:Ox,represent:Bx})});var Sd=S((nR,wd)=>{"use strict";var Cn;try{kd=Lo,Cn=kd("esprima")}catch{typeof window<"u"&&(Cn=window.esprima)}var kd,Fx=U();function qx(e){if(e===null)return!1;try{var t="("+e+")",o=Cn.parse(t,{range:!0});return!(o.type!=="Program"||o.body.length!==1||o.body[0].type!=="ExpressionStatement"||o.body[0].expression.type!=="ArrowFunctionExpression"&&o.body[0].expression.type!=="FunctionExpression")}catch{return!1}}function Nx(e){var t="("+e+")",o=Cn.parse(t,{range:!0}),n=[],i;if(o.type!=="Program"||o.body.length!==1||o.body[0].type!=="ExpressionStatement"||o.body[0].expression.type!=="ArrowFunctionExpression"&&o.body[0].expression.type!=="FunctionExpression")throw new Error("Failed to resolve function");return o.body[0].expression.params.forEach(function(r){n.push(r.name)}),i=o.body[0].expression.body.range,o.body[0].expression.body.type==="BlockStatement"?new Function(n,t.slice(i[0]+1,i[1]-1)):new Function(n,"return "+t.slice(i[0],i[1]))}function Wx(e){return e.toString()}function _x(e){return Object.prototype.toString.call(e)==="[object Function]"}wd.exports=new Fx("tag:yaml.org,2002:js/function",{kind:"scalar",resolve:qx,construct:Nx,predicate:_x,represent:Wx})});var wo=S((rR,Td)=>{"use strict";var Cd=Tt();Td.exports=Cd.DEFAULT=new Cd({include:[Ft()],explicit:[xd(),yd(),Sd()]})});var $d=S((aR,So)=>{"use strict";var Te=Ct(),Dd=Bt(),Ux=Dc(),Hd=Ft(),$x=wo(),st=Object.prototype.hasOwnProperty,Tn=1,Id=2,zd=3,Pn=4,ya=1,Vx=2,Pd=3,Gx=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Yx=/[\x85\u2028\u2029]/,Jx=/[,\[\]\{\}]/,jd=/^(?:!|!!|![a-z\-]+!)$/i,Bd=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function Md(e){return Object.prototype.toString.call(e)}function ge(e){return e===10||e===13}function Lt(e){return e===9||e===32}function ie(e){return e===9||e===32||e===10||e===13}function qt(e){return e===44||e===91||e===93||e===123||e===125}function Xx(e){var t;return 48<=e&&e<=57?e-48:(t=e|32,97<=t&&t<=102?t-97+10:-1)}function Kx(e){return e===120?2:e===117?4:e===85?8:0}function Qx(e){return 48<=e&&e<=57?e-48:-1}function Ld(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"\x85":e===95?"\xA0":e===76?"\u2028":e===80?"\u2029":""}function Zx(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function Od(e,t,o){t==="__proto__"?Object.defineProperty(e,t,{configurable:!0,enumerable:!0,writable:!0,value:o}):e[t]=o}var Fd=new Array(256),qd=new Array(256);for(Mt=0;Mt<256;Mt++)Fd[Mt]=Ld(Mt)?1:0,qd[Mt]=Ld(Mt);var Mt;function ev(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||$x,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.json=t.json||!1,this.listener=t.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.documents=[]}function Nd(e,t){return new Dd(t,new Ux(e.filename,e.input,e.position,e.line,e.position-e.lineStart))}function w(e,t){throw Nd(e,t)}function Mn(e,t){e.onWarning&&e.onWarning.call(null,Nd(e,t))}var Ed={YAML:function(t,o,n){var i,r,a;t.version!==null&&w(t,"duplication of %YAML directive"),n.length!==1&&w(t,"YAML directive accepts exactly one argument"),i=/^([0-9]+)\.([0-9]+)$/.exec(n[0]),i===null&&w(t,"ill-formed argument of the YAML directive"),r=parseInt(i[1],10),a=parseInt(i[2],10),r!==1&&w(t,"unacceptable YAML version of the document"),t.version=n[0],t.checkLineBreaks=a<2,a!==1&&a!==2&&Mn(t,"unsupported YAML version of the document")},TAG:function(t,o,n){var i,r;n.length!==2&&w(t,"TAG directive accepts exactly two arguments"),i=n[0],r=n[1],jd.test(i)||w(t,"ill-formed tag handle (first argument) of the TAG directive"),st.call(t.tagMap,i)&&w(t,'there is a previously declared suffix for "'+i+'" tag handle'),Bd.test(r)||w(t,"ill-formed tag prefix (second argument) of the TAG directive"),t.tagMap[i]=r}};function at(e,t,o,n){var i,r,a,l;if(t<o){if(l=e.input.slice(t,o),n)for(i=0,r=l.length;i<r;i+=1)a=l.charCodeAt(i),a===9||32<=a&&a<=1114111||w(e,"expected valid JSON character");else Gx.test(l)&&w(e,"the stream contains non-printable characters");e.result+=l}}function Ad(e,t,o,n){var i,r,a,l;for(Te.isObject(o)||w(e,"cannot merge mappings; the provided source object is unacceptable"),i=Object.keys(o),a=0,l=i.length;a<l;a+=1)r=i[a],st.call(t,r)||(Od(t,r,o[r]),n[r]=!0)}function Nt(e,t,o,n,i,r,a,l){var c,d;if(Array.isArray(i))for(i=Array.prototype.slice.call(i),c=0,d=i.length;c<d;c+=1)Array.isArray(i[c])&&w(e,"nested arrays are not supported inside keys"),typeof i=="object"&&Md(i[c])==="[object Object]"&&(i[c]="[object Object]");if(typeof i=="object"&&Md(i)==="[object Object]"&&(i="[object Object]"),i=String(i),t===null&&(t={}),n==="tag:yaml.org,2002:merge")if(Array.isArray(r))for(c=0,d=r.length;c<d;c+=1)Ad(e,t,r[c],o);else Ad(e,t,r,o);else!e.json&&!st.call(o,i)&&st.call(t,i)&&(e.line=a||e.line,e.position=l||e.position,w(e,"duplicated mapping key")),Od(t,i,r),delete o[i];return t}function ka(e){var t;t=e.input.charCodeAt(e.position),t===10?e.position++:t===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):w(e,"a line break is expected"),e.line+=1,e.lineStart=e.position}function W(e,t,o){for(var n=0,i=e.input.charCodeAt(e.position);i!==0;){for(;Lt(i);)i=e.input.charCodeAt(++e.position);if(t&&i===35)do i=e.input.charCodeAt(++e.position);while(i!==10&&i!==13&&i!==0);if(ge(i))for(ka(e),i=e.input.charCodeAt(e.position),n++,e.lineIndent=0;i===32;)e.lineIndent++,i=e.input.charCodeAt(++e.position);else break}return o!==-1&&n!==0&&e.lineIndent<o&&Mn(e,"deficient indentation"),n}function Ln(e){var t=e.position,o;return o=e.input.charCodeAt(t),!!((o===45||o===46)&&o===e.input.charCodeAt(t+1)&&o===e.input.charCodeAt(t+2)&&(t+=3,o=e.input.charCodeAt(t),o===0||ie(o)))}function wa(e,t){t===1?e.result+=" ":t>1&&(e.result+=Te.repeat(`
`,t-1))}function tv(e,t,o){var n,i,r,a,l,c,d,p,u=e.kind,g=e.result,f;if(f=e.input.charCodeAt(e.position),ie(f)||qt(f)||f===35||f===38||f===42||f===33||f===124||f===62||f===39||f===34||f===37||f===64||f===96||(f===63||f===45)&&(i=e.input.charCodeAt(e.position+1),ie(i)||o&&qt(i)))return!1;for(e.kind="scalar",e.result="",r=a=e.position,l=!1;f!==0;){if(f===58){if(i=e.input.charCodeAt(e.position+1),ie(i)||o&&qt(i))break}else if(f===35){if(n=e.input.charCodeAt(e.position-1),ie(n))break}else{if(e.position===e.lineStart&&Ln(e)||o&&qt(f))break;if(ge(f))if(c=e.line,d=e.lineStart,p=e.lineIndent,W(e,!1,-1),e.lineIndent>=t){l=!0,f=e.input.charCodeAt(e.position);continue}else{e.position=a,e.line=c,e.lineStart=d,e.lineIndent=p;break}}l&&(at(e,r,a,!1),wa(e,e.line-c),r=a=e.position,l=!1),Lt(f)||(a=e.position+1),f=e.input.charCodeAt(++e.position)}return at(e,r,a,!1),e.result?!0:(e.kind=u,e.result=g,!1)}function ov(e,t){var o,n,i;if(o=e.input.charCodeAt(e.position),o!==39)return!1;for(e.kind="scalar",e.result="",e.position++,n=i=e.position;(o=e.input.charCodeAt(e.position))!==0;)if(o===39)if(at(e,n,e.position,!0),o=e.input.charCodeAt(++e.position),o===39)n=e.position,e.position++,i=e.position;else return!0;else ge(o)?(at(e,n,i,!0),wa(e,W(e,!1,t)),n=i=e.position):e.position===e.lineStart&&Ln(e)?w(e,"unexpected end of the document within a single quoted scalar"):(e.position++,i=e.position);w(e,"unexpected end of the stream within a single quoted scalar")}function nv(e,t){var o,n,i,r,a,l;if(l=e.input.charCodeAt(e.position),l!==34)return!1;for(e.kind="scalar",e.result="",e.position++,o=n=e.position;(l=e.input.charCodeAt(e.position))!==0;){if(l===34)return at(e,o,e.position,!0),e.position++,!0;if(l===92){if(at(e,o,e.position,!0),l=e.input.charCodeAt(++e.position),ge(l))W(e,!1,t);else if(l<256&&Fd[l])e.result+=qd[l],e.position++;else if((a=Kx(l))>0){for(i=a,r=0;i>0;i--)l=e.input.charCodeAt(++e.position),(a=Xx(l))>=0?r=(r<<4)+a:w(e,"expected hexadecimal character");e.result+=Zx(r),e.position++}else w(e,"unknown escape sequence");o=n=e.position}else ge(l)?(at(e,o,n,!0),wa(e,W(e,!1,t)),o=n=e.position):e.position===e.lineStart&&Ln(e)?w(e,"unexpected end of the document within a double quoted scalar"):(e.position++,n=e.position)}w(e,"unexpected end of the stream within a double quoted scalar")}function iv(e,t){var o=!0,n,i=e.tag,r,a=e.anchor,l,c,d,p,u,g={},f,b,x,v;if(v=e.input.charCodeAt(e.position),v===91)c=93,u=!1,r=[];else if(v===123)c=125,u=!0,r={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=r),v=e.input.charCodeAt(++e.position);v!==0;){if(W(e,!0,t),v=e.input.charCodeAt(e.position),v===c)return e.position++,e.tag=i,e.anchor=a,e.kind=u?"mapping":"sequence",e.result=r,!0;o||w(e,"missed comma between flow collection entries"),b=f=x=null,d=p=!1,v===63&&(l=e.input.charCodeAt(e.position+1),ie(l)&&(d=p=!0,e.position++,W(e,!0,t))),n=e.line,Wt(e,t,Tn,!1,!0),b=e.tag,f=e.result,W(e,!0,t),v=e.input.charCodeAt(e.position),(p||e.line===n)&&v===58&&(d=!0,v=e.input.charCodeAt(++e.position),W(e,!0,t),Wt(e,t,Tn,!1,!0),x=e.result),u?Nt(e,r,g,b,f,x):d?r.push(Nt(e,null,g,b,f,x)):r.push(f),W(e,!0,t),v=e.input.charCodeAt(e.position),v===44?(o=!0,v=e.input.charCodeAt(++e.position)):o=!1}w(e,"unexpected end of the stream within a flow collection")}function rv(e,t){var o,n,i=ya,r=!1,a=!1,l=t,c=0,d=!1,p,u;if(u=e.input.charCodeAt(e.position),u===124)n=!1;else if(u===62)n=!0;else return!1;for(e.kind="scalar",e.result="";u!==0;)if(u=e.input.charCodeAt(++e.position),u===43||u===45)ya===i?i=u===43?Pd:Vx:w(e,"repeat of a chomping mode identifier");else if((p=Qx(u))>=0)p===0?w(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):a?w(e,"repeat of an indentation width identifier"):(l=t+p-1,a=!0);else break;if(Lt(u)){do u=e.input.charCodeAt(++e.position);while(Lt(u));if(u===35)do u=e.input.charCodeAt(++e.position);while(!ge(u)&&u!==0)}for(;u!==0;){for(ka(e),e.lineIndent=0,u=e.input.charCodeAt(e.position);(!a||e.lineIndent<l)&&u===32;)e.lineIndent++,u=e.input.charCodeAt(++e.position);if(!a&&e.lineIndent>l&&(l=e.lineIndent),ge(u)){c++;continue}if(e.lineIndent<l){i===Pd?e.result+=Te.repeat(`
`,r?1+c:c):i===ya&&r&&(e.result+=`
`);break}for(n?Lt(u)?(d=!0,e.result+=Te.repeat(`
`,r?1+c:c)):d?(d=!1,e.result+=Te.repeat(`
`,c+1)):c===0?r&&(e.result+=" "):e.result+=Te.repeat(`
`,c):e.result+=Te.repeat(`
`,r?1+c:c),r=!0,a=!0,c=0,o=e.position;!ge(u)&&u!==0;)u=e.input.charCodeAt(++e.position);at(e,o,e.position,!1)}return!0}function Rd(e,t){var o,n=e.tag,i=e.anchor,r=[],a,l=!1,c;for(e.anchor!==null&&(e.anchorMap[e.anchor]=r),c=e.input.charCodeAt(e.position);c!==0&&!(c!==45||(a=e.input.charCodeAt(e.position+1),!ie(a)));){if(l=!0,e.position++,W(e,!0,-1)&&e.lineIndent<=t){r.push(null),c=e.input.charCodeAt(e.position);continue}if(o=e.line,Wt(e,t,zd,!1,!0),r.push(e.result),W(e,!0,-1),c=e.input.charCodeAt(e.position),(e.line===o||e.lineIndent>t)&&c!==0)w(e,"bad indentation of a sequence entry");else if(e.lineIndent<t)break}return l?(e.tag=n,e.anchor=i,e.kind="sequence",e.result=r,!0):!1}function av(e,t,o){var n,i,r,a,l=e.tag,c=e.anchor,d={},p={},u=null,g=null,f=null,b=!1,x=!1,v;for(e.anchor!==null&&(e.anchorMap[e.anchor]=d),v=e.input.charCodeAt(e.position);v!==0;){if(n=e.input.charCodeAt(e.position+1),r=e.line,a=e.position,(v===63||v===58)&&ie(n))v===63?(b&&(Nt(e,d,p,u,g,null),u=g=f=null),x=!0,b=!0,i=!0):b?(b=!1,i=!0):w(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,v=n;else if(Wt(e,o,Id,!1,!0))if(e.line===r){for(v=e.input.charCodeAt(e.position);Lt(v);)v=e.input.charCodeAt(++e.position);if(v===58)v=e.input.charCodeAt(++e.position),ie(v)||w(e,"a whitespace character is expected after the key-value separator within a block mapping"),b&&(Nt(e,d,p,u,g,null),u=g=f=null),x=!0,b=!1,i=!1,u=e.tag,g=e.result;else if(x)w(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=l,e.anchor=c,!0}else if(x)w(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=l,e.anchor=c,!0;else break;if((e.line===r||e.lineIndent>t)&&(Wt(e,t,Pn,!0,i)&&(b?g=e.result:f=e.result),b||(Nt(e,d,p,u,g,f,r,a),u=g=f=null),W(e,!0,-1),v=e.input.charCodeAt(e.position)),e.lineIndent>t&&v!==0)w(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return b&&Nt(e,d,p,u,g,null),x&&(e.tag=l,e.anchor=c,e.kind="mapping",e.result=d),x}function sv(e){var t,o=!1,n=!1,i,r,a;if(a=e.input.charCodeAt(e.position),a!==33)return!1;if(e.tag!==null&&w(e,"duplication of a tag property"),a=e.input.charCodeAt(++e.position),a===60?(o=!0,a=e.input.charCodeAt(++e.position)):a===33?(n=!0,i="!!",a=e.input.charCodeAt(++e.position)):i="!",t=e.position,o){do a=e.input.charCodeAt(++e.position);while(a!==0&&a!==62);e.position<e.length?(r=e.input.slice(t,e.position),a=e.input.charCodeAt(++e.position)):w(e,"unexpected end of the stream within a verbatim tag")}else{for(;a!==0&&!ie(a);)a===33&&(n?w(e,"tag suffix cannot contain exclamation marks"):(i=e.input.slice(t-1,e.position+1),jd.test(i)||w(e,"named tag handle cannot contain such characters"),n=!0,t=e.position+1)),a=e.input.charCodeAt(++e.position);r=e.input.slice(t,e.position),Jx.test(r)&&w(e,"tag suffix cannot contain flow indicator characters")}return r&&!Bd.test(r)&&w(e,"tag name cannot contain such characters: "+r),o?e.tag=r:st.call(e.tagMap,i)?e.tag=e.tagMap[i]+r:i==="!"?e.tag="!"+r:i==="!!"?e.tag="tag:yaml.org,2002:"+r:w(e,'undeclared tag handle "'+i+'"'),!0}function lv(e){var t,o;if(o=e.input.charCodeAt(e.position),o!==38)return!1;for(e.anchor!==null&&w(e,"duplication of an anchor property"),o=e.input.charCodeAt(++e.position),t=e.position;o!==0&&!ie(o)&&!qt(o);)o=e.input.charCodeAt(++e.position);return e.position===t&&w(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(t,e.position),!0}function cv(e){var t,o,n;if(n=e.input.charCodeAt(e.position),n!==42)return!1;for(n=e.input.charCodeAt(++e.position),t=e.position;n!==0&&!ie(n)&&!qt(n);)n=e.input.charCodeAt(++e.position);return e.position===t&&w(e,"name of an alias node must contain at least one character"),o=e.input.slice(t,e.position),st.call(e.anchorMap,o)||w(e,'unidentified alias "'+o+'"'),e.result=e.anchorMap[o],W(e,!0,-1),!0}function Wt(e,t,o,n,i){var r,a,l,c=1,d=!1,p=!1,u,g,f,b,x;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,r=a=l=Pn===o||zd===o,n&&W(e,!0,-1)&&(d=!0,e.lineIndent>t?c=1:e.lineIndent===t?c=0:e.lineIndent<t&&(c=-1)),c===1)for(;sv(e)||lv(e);)W(e,!0,-1)?(d=!0,l=r,e.lineIndent>t?c=1:e.lineIndent===t?c=0:e.lineIndent<t&&(c=-1)):l=!1;if(l&&(l=d||i),(c===1||Pn===o)&&(Tn===o||Id===o?b=t:b=t+1,x=e.position-e.lineStart,c===1?l&&(Rd(e,x)||av(e,x,b))||iv(e,b)?p=!0:(a&&rv(e,b)||ov(e,b)||nv(e,b)?p=!0:cv(e)?(p=!0,(e.tag!==null||e.anchor!==null)&&w(e,"alias node should not have any properties")):tv(e,b,Tn===o)&&(p=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):c===0&&(p=l&&Rd(e,x))),e.tag!==null&&e.tag!=="!")if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&w(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),u=0,g=e.implicitTypes.length;u<g;u+=1)if(f=e.implicitTypes[u],f.resolve(e.result)){e.result=f.construct(e.result),e.tag=f.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else st.call(e.typeMap[e.kind||"fallback"],e.tag)?(f=e.typeMap[e.kind||"fallback"][e.tag],e.result!==null&&f.kind!==e.kind&&w(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+f.kind+'", not "'+e.kind+'"'),f.resolve(e.result)?(e.result=f.construct(e.result),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):w(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")):w(e,"unknown tag !<"+e.tag+">");return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||p}function dv(e){var t=e.position,o,n,i,r=!1,a;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap={},e.anchorMap={};(a=e.input.charCodeAt(e.position))!==0&&(W(e,!0,-1),a=e.input.charCodeAt(e.position),!(e.lineIndent>0||a!==37));){for(r=!0,a=e.input.charCodeAt(++e.position),o=e.position;a!==0&&!ie(a);)a=e.input.charCodeAt(++e.position);for(n=e.input.slice(o,e.position),i=[],n.length<1&&w(e,"directive name must not be less than one character in length");a!==0;){for(;Lt(a);)a=e.input.charCodeAt(++e.position);if(a===35){do a=e.input.charCodeAt(++e.position);while(a!==0&&!ge(a));break}if(ge(a))break;for(o=e.position;a!==0&&!ie(a);)a=e.input.charCodeAt(++e.position);i.push(e.input.slice(o,e.position))}a!==0&&ka(e),st.call(Ed,n)?Ed[n](e,n,i):Mn(e,'unknown document directive "'+n+'"')}if(W(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,W(e,!0,-1)):r&&w(e,"directives end mark is expected"),Wt(e,e.lineIndent-1,Pn,!1,!0),W(e,!0,-1),e.checkLineBreaks&&Yx.test(e.input.slice(t,e.position))&&Mn(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&Ln(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,W(e,!0,-1));return}if(e.position<e.length-1)w(e,"end of the stream or a document separator is expected");else return}function Wd(e,t){e=String(e),t=t||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var o=new ev(e,t),n=e.indexOf("\0");for(n!==-1&&(o.position=n,w(o,"null byte is not allowed in input")),o.input+="\0";o.input.charCodeAt(o.position)===32;)o.lineIndent+=1,o.position+=1;for(;o.position<o.length-1;)dv(o);return o.documents}function _d(e,t,o){t!==null&&typeof t=="object"&&typeof o>"u"&&(o=t,t=null);var n=Wd(e,o);if(typeof t!="function")return n;for(var i=0,r=n.length;i<r;i+=1)t(n[i])}function Ud(e,t){var o=Wd(e,t);if(o.length!==0){if(o.length===1)return o[0];throw new Dd("expected a single document in the stream, but found more")}}function pv(e,t,o){return typeof t=="object"&&t!==null&&typeof o>"u"&&(o=t,t=null),_d(e,t,Te.extend({schema:Hd},o))}function uv(e,t){return Ud(e,Te.extend({schema:Hd},t))}So.exports.loadAll=_d;So.exports.load=Ud;So.exports.safeLoadAll=pv;So.exports.safeLoad=uv});var hp=S((sR,Pa)=>{"use strict";var To=Ct(),Po=Bt(),gv=wo(),hv=Ft(),Zd=Object.prototype.toString,ep=Object.prototype.hasOwnProperty,mv=9,Co=10,fv=13,bv=32,xv=33,vv=34,tp=35,yv=37,kv=38,wv=39,Sv=42,op=44,Cv=45,np=58,Tv=61,Pv=62,Mv=63,Lv=64,ip=91,rp=93,Ev=96,ap=123,Av=124,sp=125,Y={};Y[0]="\\0";Y[7]="\\a";Y[8]="\\b";Y[9]="\\t";Y[10]="\\n";Y[11]="\\v";Y[12]="\\f";Y[13]="\\r";Y[27]="\\e";Y[34]='\\"';Y[92]="\\\\";Y[133]="\\N";Y[160]="\\_";Y[8232]="\\L";Y[8233]="\\P";var Rv=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"];function Dv(e,t){var o,n,i,r,a,l,c;if(t===null)return{};for(o={},n=Object.keys(t),i=0,r=n.length;i<r;i+=1)a=n[i],l=String(t[a]),a.slice(0,2)==="!!"&&(a="tag:yaml.org,2002:"+a.slice(2)),c=e.compiledTypeMap.fallback[a],c&&ep.call(c.styleAliases,l)&&(l=c.styleAliases[l]),o[a]=l;return o}function Vd(e){var t,o,n;if(t=e.toString(16).toUpperCase(),e<=255)o="x",n=2;else if(e<=65535)o="u",n=4;else if(e<=4294967295)o="U",n=8;else throw new Po("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+o+To.repeat("0",n-t.length)+t}function Hv(e){this.schema=e.schema||gv,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=To.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=Dv(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function Gd(e,t){for(var o=To.repeat(" ",t),n=0,i=-1,r="",a,l=e.length;n<l;)i=e.indexOf(`
`,n),i===-1?(a=e.slice(n),n=l):(a=e.slice(n,i+1),n=i+1),a.length&&a!==`
`&&(r+=o),r+=a;return r}function Sa(e,t){return`
`+To.repeat(" ",e.indent*t)}function Iv(e,t){var o,n,i;for(o=0,n=e.implicitTypes.length;o<n;o+=1)if(i=e.implicitTypes[o],i.resolve(t))return!0;return!1}function Ta(e){return e===bv||e===mv}function _t(e){return 32<=e&&e<=126||161<=e&&e<=55295&&e!==8232&&e!==8233||57344<=e&&e<=65533&&e!==65279||65536<=e&&e<=1114111}function zv(e){return _t(e)&&!Ta(e)&&e!==65279&&e!==fv&&e!==Co}function Yd(e,t){return _t(e)&&e!==65279&&e!==op&&e!==ip&&e!==rp&&e!==ap&&e!==sp&&e!==np&&(e!==tp||t&&zv(t))}function jv(e){return _t(e)&&e!==65279&&!Ta(e)&&e!==Cv&&e!==Mv&&e!==np&&e!==op&&e!==ip&&e!==rp&&e!==ap&&e!==sp&&e!==tp&&e!==kv&&e!==Sv&&e!==xv&&e!==Av&&e!==Tv&&e!==Pv&&e!==wv&&e!==vv&&e!==yv&&e!==Lv&&e!==Ev}function lp(e){var t=/^\n* /;return t.test(e)}var cp=1,dp=2,pp=3,up=4,En=5;function Bv(e,t,o,n,i){var r,a,l,c=!1,d=!1,p=n!==-1,u=-1,g=jv(e.charCodeAt(0))&&!Ta(e.charCodeAt(e.length-1));if(t)for(r=0;r<e.length;r++){if(a=e.charCodeAt(r),!_t(a))return En;l=r>0?e.charCodeAt(r-1):null,g=g&&Yd(a,l)}else{for(r=0;r<e.length;r++){if(a=e.charCodeAt(r),a===Co)c=!0,p&&(d=d||r-u-1>n&&e[u+1]!==" ",u=r);else if(!_t(a))return En;l=r>0?e.charCodeAt(r-1):null,g=g&&Yd(a,l)}d=d||p&&r-u-1>n&&e[u+1]!==" "}return!c&&!d?g&&!i(e)?cp:dp:o>9&&lp(e)?En:d?up:pp}function Ov(e,t,o,n){e.dump=function(){if(t.length===0)return"''";if(!e.noCompatMode&&Rv.indexOf(t)!==-1)return"'"+t+"'";var i=e.indent*Math.max(1,o),r=e.lineWidth===-1?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-i),a=n||e.flowLevel>-1&&o>=e.flowLevel;function l(c){return Iv(e,c)}switch(Bv(t,a,e.indent,r,l)){case cp:return t;case dp:return"'"+t.replace(/'/g,"''")+"'";case pp:return"|"+Jd(t,e.indent)+Xd(Gd(t,i));case up:return">"+Jd(t,e.indent)+Xd(Gd(Fv(t,r),i));case En:return'"'+qv(t,r)+'"';default:throw new Po("impossible error: invalid scalar style")}}()}function Jd(e,t){var o=lp(e)?String(t):"",n=e[e.length-1]===`
`,i=n&&(e[e.length-2]===`
`||e===`
`),r=i?"+":n?"":"-";return o+r+`
`}function Xd(e){return e[e.length-1]===`
`?e.slice(0,-1):e}function Fv(e,t){for(var o=/(\n+)([^\n]*)/g,n=function(){var d=e.indexOf(`
`);return d=d!==-1?d:e.length,o.lastIndex=d,Kd(e.slice(0,d),t)}(),i=e[0]===`
`||e[0]===" ",r,a;a=o.exec(e);){var l=a[1],c=a[2];r=c[0]===" ",n+=l+(!i&&!r&&c!==""?`
`:"")+Kd(c,t),i=r}return n}function Kd(e,t){if(e===""||e[0]===" ")return e;for(var o=/ [^ ]/g,n,i=0,r,a=0,l=0,c="";n=o.exec(e);)l=n.index,l-i>t&&(r=a>i?a:l,c+=`
`+e.slice(i,r),i=r+1),a=l;return c+=`
`,e.length-i>t&&a>i?c+=e.slice(i,a)+`
`+e.slice(a+1):c+=e.slice(i),c.slice(1)}function qv(e){for(var t="",o,n,i,r=0;r<e.length;r++){if(o=e.charCodeAt(r),o>=55296&&o<=56319&&(n=e.charCodeAt(r+1),n>=56320&&n<=57343)){t+=Vd((o-55296)*1024+n-56320+65536),r++;continue}i=Y[o],t+=!i&&_t(o)?e[r]:i||Vd(o)}return t}function Nv(e,t,o){var n="",i=e.tag,r,a;for(r=0,a=o.length;r<a;r+=1)Et(e,t,o[r],!1,!1)&&(r!==0&&(n+=","+(e.condenseFlow?"":" ")),n+=e.dump);e.tag=i,e.dump="["+n+"]"}function Wv(e,t,o,n){var i="",r=e.tag,a,l;for(a=0,l=o.length;a<l;a+=1)Et(e,t+1,o[a],!0,!0)&&((!n||a!==0)&&(i+=Sa(e,t)),e.dump&&Co===e.dump.charCodeAt(0)?i+="-":i+="- ",i+=e.dump);e.tag=r,e.dump=i||"[]"}function _v(e,t,o){var n="",i=e.tag,r=Object.keys(o),a,l,c,d,p;for(a=0,l=r.length;a<l;a+=1)p="",a!==0&&(p+=", "),e.condenseFlow&&(p+='"'),c=r[a],d=o[c],Et(e,t,c,!1,!1)&&(e.dump.length>1024&&(p+="? "),p+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),Et(e,t,d,!1,!1)&&(p+=e.dump,n+=p));e.tag=i,e.dump="{"+n+"}"}function Uv(e,t,o,n){var i="",r=e.tag,a=Object.keys(o),l,c,d,p,u,g;if(e.sortKeys===!0)a.sort();else if(typeof e.sortKeys=="function")a.sort(e.sortKeys);else if(e.sortKeys)throw new Po("sortKeys must be a boolean or a function");for(l=0,c=a.length;l<c;l+=1)g="",(!n||l!==0)&&(g+=Sa(e,t)),d=a[l],p=o[d],Et(e,t+1,d,!0,!0,!0)&&(u=e.tag!==null&&e.tag!=="?"||e.dump&&e.dump.length>1024,u&&(e.dump&&Co===e.dump.charCodeAt(0)?g+="?":g+="? "),g+=e.dump,u&&(g+=Sa(e,t)),Et(e,t+1,p,!0,u)&&(e.dump&&Co===e.dump.charCodeAt(0)?g+=":":g+=": ",g+=e.dump,i+=g));e.tag=r,e.dump=i||"{}"}function Qd(e,t,o){var n,i,r,a,l,c;for(i=o?e.explicitTypes:e.implicitTypes,r=0,a=i.length;r<a;r+=1)if(l=i[r],(l.instanceOf||l.predicate)&&(!l.instanceOf||typeof t=="object"&&t instanceof l.instanceOf)&&(!l.predicate||l.predicate(t))){if(e.tag=o?l.tag:"?",l.represent){if(c=e.styleMap[l.tag]||l.defaultStyle,Zd.call(l.represent)==="[object Function]")n=l.represent(t,c);else if(ep.call(l.represent,c))n=l.represent[c](t,c);else throw new Po("!<"+l.tag+'> tag resolver accepts not "'+c+'" style');e.dump=n}return!0}return!1}function Et(e,t,o,n,i,r){e.tag=null,e.dump=o,Qd(e,o,!1)||Qd(e,o,!0);var a=Zd.call(e.dump);n&&(n=e.flowLevel<0||e.flowLevel>t);var l=a==="[object Object]"||a==="[object Array]",c,d;if(l&&(c=e.duplicates.indexOf(o),d=c!==-1),(e.tag!==null&&e.tag!=="?"||d||e.indent!==2&&t>0)&&(i=!1),d&&e.usedDuplicates[c])e.dump="*ref_"+c;else{if(l&&d&&!e.usedDuplicates[c]&&(e.usedDuplicates[c]=!0),a==="[object Object]")n&&Object.keys(e.dump).length!==0?(Uv(e,t,e.dump,i),d&&(e.dump="&ref_"+c+e.dump)):(_v(e,t,e.dump),d&&(e.dump="&ref_"+c+" "+e.dump));else if(a==="[object Array]"){var p=e.noArrayIndent&&t>0?t-1:t;n&&e.dump.length!==0?(Wv(e,p,e.dump,i),d&&(e.dump="&ref_"+c+e.dump)):(Nv(e,p,e.dump),d&&(e.dump="&ref_"+c+" "+e.dump))}else if(a==="[object String]")e.tag!=="?"&&Ov(e,e.dump,t,r);else{if(e.skipInvalid)return!1;throw new Po("unacceptable kind of an object to dump "+a)}e.tag!==null&&e.tag!=="?"&&(e.dump="!<"+e.tag+"> "+e.dump)}return!0}function $v(e,t){var o=[],n=[],i,r;for(Ca(e,o,n),i=0,r=n.length;i<r;i+=1)t.duplicates.push(o[n[i]]);t.usedDuplicates=new Array(r)}function Ca(e,t,o){var n,i,r;if(e!==null&&typeof e=="object")if(i=t.indexOf(e),i!==-1)o.indexOf(i)===-1&&o.push(i);else if(t.push(e),Array.isArray(e))for(i=0,r=e.length;i<r;i+=1)Ca(e[i],t,o);else for(n=Object.keys(e),i=0,r=n.length;i<r;i+=1)Ca(e[n[i]],t,o)}function gp(e,t){t=t||{};var o=new Hv(t);return o.noRefs||$v(e,o),Et(o,0,e,!0,!0)?o.dump+`
`:""}function Vv(e,t){return gp(e,To.extend({schema:hv},t))}Pa.exports.dump=gp;Pa.exports.safeDump=Vv});var fp=S((lR,B)=>{"use strict";var An=$d(),mp=hp();function Rn(e){return function(){throw new Error("Function "+e+" is deprecated and cannot be used.")}}B.exports.Type=U();B.exports.Schema=Tt();B.exports.FAILSAFE_SCHEMA=Sn();B.exports.JSON_SCHEMA=ba();B.exports.CORE_SCHEMA=xa();B.exports.DEFAULT_SAFE_SCHEMA=Ft();B.exports.DEFAULT_FULL_SCHEMA=wo();B.exports.load=An.load;B.exports.loadAll=An.loadAll;B.exports.safeLoad=An.safeLoad;B.exports.safeLoadAll=An.safeLoadAll;B.exports.dump=mp.dump;B.exports.safeDump=mp.safeDump;B.exports.YAMLException=Bt();B.exports.MINIMAL_SCHEMA=Sn();B.exports.SAFE_SCHEMA=Ft();B.exports.DEFAULT_SCHEMA=wo();B.exports.scan=Rn("scan");B.exports.parse=Rn("parse");B.exports.compose=Rn("compose");B.exports.addConstructor=Rn("addConstructor")});var xp=S((cR,bp)=>{"use strict";var Gv=fp();bp.exports=Gv});var Ma=S((exports,module)=>{"use strict";var yaml=xp(),engines=exports=module.exports;engines.yaml={parse:yaml.safeLoad.bind(yaml),stringify:yaml.safeDump.bind(yaml)};engines.json={parse:JSON.parse.bind(JSON),stringify:function(e,t){let o=Object.assign({replacer:null,space:2},t);return JSON.stringify(e,o.replacer,o.space)}};engines.javascript={parse:function parse(str,options,wrap){try{return wrap!==!1&&(str=`(function() {
return `+str.trim()+`;
}());`),eval(str)||{}}catch(e){if(wrap!==!1&&/(unexpected|identifier)/i.test(e.message))return parse(str,options,!1);throw new SyntaxError(e)}},stringify:function(){throw new Error("stringifying JavaScript is not supported")}}});var yp=S((dR,vp)=>{"use strict";vp.exports=function(e){return typeof e=="string"&&e.charAt(0)==="\uFEFF"?e.slice(1):e}});var Dn=S(Pe=>{"use strict";var kp=yp(),wp=yo();Pe.define=function(e,t,o){Reflect.defineProperty(e,t,{enumerable:!1,configurable:!0,writable:!0,value:o})};Pe.isBuffer=function(e){return wp(e)==="buffer"};Pe.isObject=function(e){return wp(e)==="object"};Pe.toBuffer=function(e){return typeof e=="string"?Buffer.from(e):e};Pe.toString=function(e){if(Pe.isBuffer(e))return kp(String(e));if(typeof e!="string")throw new TypeError("expected input to be a string or buffer");return kp(e)};Pe.arrayify=function(e){return e?Array.isArray(e)?e:[e]:[]};Pe.startsWith=function(e,t,o){return typeof o!="number"&&(o=t.length),e.slice(0,o)===t}});var Mo=S((uR,Sp)=>{"use strict";var Yv=Ma(),Jv=Dn();Sp.exports=function(e){let t=Object.assign({},e);return t.delimiters=Jv.arrayify(t.delims||t.delimiters||"---"),t.delimiters.length===1&&t.delimiters.push(t.delimiters[0]),t.language=(t.language||t.lang||"yaml").toLowerCase(),t.engines=Object.assign({},Yv,t.parsers,t.engines),t}});var La=S((gR,Cp)=>{"use strict";Cp.exports=function(e,t){let o=t.engines[e]||t.engines[Xv(e)];if(typeof o>"u")throw new Error('gray-matter engine "'+e+'" is not registered');return typeof o=="function"&&(o={parse:o}),o};function Xv(e){switch(e.toLowerCase()){case"js":case"javascript":return"javascript";case"coffee":case"coffeescript":case"cson":return"coffee";case"yaml":case"yml":return"yaml";default:return e}}});var Ea=S((hR,Tp)=>{"use strict";var Kv=yo(),Qv=La(),Zv=Mo();Tp.exports=function(e,t,o){if(t==null&&o==null)switch(Kv(e)){case"object":t=e.data,o={};break;case"string":return e;default:throw new TypeError("expected file to be a string or object")}let n=e.content,i=Zv(o);if(t==null){if(!i.data)return e;t=i.data}let r=e.language||i.language,a=Qv(r,i);if(typeof a.stringify!="function")throw new TypeError('expected "'+r+'.stringify" to be a function');t=Object.assign({},e.data,t);let l=i.delimiters[0],c=i.delimiters[1],d=a.stringify(t,o).trim(),p="";return d!=="{}"&&(p=Ut(l)+Ut(d)+Ut(c)),typeof e.excerpt=="string"&&e.excerpt!==""&&n.indexOf(e.excerpt.trim())===-1&&(p+=Ut(e.excerpt)+Ut(c)),p+Ut(n)};function Ut(e){return e.slice(-1)!==`
`?e+`
`:e}});var Mp=S((mR,Pp)=>{"use strict";var ey=Mo();Pp.exports=function(e,t){let o=ey(t);if(e.data==null&&(e.data={}),typeof o.excerpt=="function")return o.excerpt(e,o);let n=e.data.excerpt_separator||o.excerpt_separator;if(n==null&&(o.excerpt===!1||o.excerpt==null))return e;let i=typeof o.excerpt=="string"?o.excerpt:n||o.delimiters[0],r=e.content.indexOf(i);return r!==-1&&(e.excerpt=e.content.slice(0,r)),e}});var Ap=S((fR,Ep)=>{"use strict";var Lp=yo(),ty=Ea(),$t=Dn();Ep.exports=function(e){return Lp(e)!=="object"&&(e={content:e}),Lp(e.data)!=="object"&&(e.data={}),e.contents&&e.content==null&&(e.content=e.contents),$t.define(e,"orig",$t.toBuffer(e.content)),$t.define(e,"language",e.language||""),$t.define(e,"matter",e.matter||""),$t.define(e,"stringify",function(t,o){return o&&o.language&&(e.language=o.language),ty(e,t,o)}),e.content=$t.toString(e.content),e.isEmpty=!1,e.excerpt="",e}});var Dp=S((bR,Rp)=>{"use strict";var oy=La(),ny=Mo();Rp.exports=function(e,t,o){let n=ny(o),i=oy(e,n);if(typeof i.parse!="function")throw new TypeError('expected "'+e+'.parse" to be a function');return i.parse(t,n)}});var jp=S((xR,zp)=>{"use strict";var iy=bc(),ry=Mc(),Aa=Mo(),ay=Ea(),Hp=Mp(),sy=Ma(),ly=Ap(),cy=Dp(),Ip=Dn();function ee(e,t){if(e==="")return{data:{},content:e,excerpt:"",orig:e};let o=ly(e),n=ee.cache[o.content];if(!t){if(n)return o=Object.assign({},n),o.orig=n.orig,o;ee.cache[o.content]=o}return dy(o,t)}function dy(e,t){let o=Aa(t),n=o.delimiters[0],i=`
`+o.delimiters[1],r=e.content;o.language&&(e.language=o.language);let a=n.length;if(!Ip.startsWith(r,n,a))return Hp(e,o),e;if(r.charAt(a)===n.slice(-1))return e;r=r.slice(a);let l=r.length,c=ee.language(r,o);c.name&&(e.language=c.name,r=r.slice(c.raw.length));let d=r.indexOf(i);return d===-1&&(d=l),e.matter=r.slice(0,d),e.matter.replace(/^\s*#[^\n]+/gm,"").trim()===""?(e.isEmpty=!0,e.empty=e.content,e.data={}):e.data=cy(e.language,e.matter,o),d===l?e.content="":(e.content=r.slice(d+i.length),e.content[0]==="\r"&&(e.content=e.content.slice(1)),e.content[0]===`
`&&(e.content=e.content.slice(1))),Hp(e,o),(o.sections===!0||typeof o.section=="function")&&ry(e,o.section),e}ee.engines=sy;ee.stringify=function(e,t,o){return typeof e=="string"&&(e=ee(e,o)),ay(e,t,o)};ee.read=function(e,t){let o=iy.readFileSync(e,"utf8"),n=ee(o,t);return n.path=e,n};ee.test=function(e,t){return Ip.startsWith(e,Aa(t).delimiters[0])};ee.language=function(e,t){let n=Aa(t).delimiters[0];ee.test(e)&&(e=e.slice(n.length));let i=e.slice(0,e.search(/\r?\n/));return{raw:i,name:i?i.trim():""}};ee.cache={};ee.clearCache=function(){ee.cache={}};zp.exports=ee});E();H();E();var Yl=`<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>\r
    <path d='M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z' />\r
</svg>\r
`;E();var rt={},Jl=e=>{rt.data=e},Xl=()=>rt.data,Kl=()=>rt.sidebarScroll||0,hn=e=>{rt.sidebarScroll=e},Ql=e=>{rt.subDir=e},jt=()=>rt.subDir||"",Zl=e=>{rt.langs=e},ec=()=>rt.langs||[{title:"English",id:"en"},{title:"Chinese",id:"zh"}];function aa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var wt=aa();function ac(e){wt=e}var xo={exec:()=>null};function A(e,t=""){let o=typeof e=="string"?e:e.source,n={replace:(i,r)=>{let a=typeof r=="string"?r:r.source;return a=a.replace(Z.caret,"$1"),o=o.replace(i,a),n},getRegex:()=>new RegExp(o,t)};return n}var Z={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},xf=/^(?:[ \t]*(?:\n|$))+/,vf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,yf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,vo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,kf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,sa=/(?:[*+-]|\d{1,9}[.)])/,sc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,lc=A(sc).replace(/bull/g,sa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),wf=A(sc).replace(/bull/g,sa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),la=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Sf=/^[^\n]+/,ca=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Cf=A(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ca).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Tf=A(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,sa).getRegex(),yn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",da=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Pf=A("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",da).replace("tag",yn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),cc=A(la).replace("hr",vo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yn).getRegex(),Mf=A(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",cc).getRegex(),pa={blockquote:Mf,code:vf,def:Cf,fences:yf,heading:kf,hr:vo,html:Pf,lheading:lc,list:Tf,newline:xf,paragraph:cc,table:xo,text:Sf},tc=A("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",vo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yn).getRegex(),Lf={...pa,lheading:wf,table:tc,paragraph:A(la).replace("hr",vo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",tc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yn).getRegex()},Ef={...pa,html:A(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",da).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:xo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:A(la).replace("hr",vo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",lc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Af=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Rf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,dc=/^( {2,}|\\)\n(?!\s*$)/,Df=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,kn=/[\p{P}\p{S}]/u,ua=/[\s\p{P}\p{S}]/u,pc=/[^\s\p{P}\p{S}]/u,Hf=A(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ua).getRegex(),uc=/(?!~)[\p{P}\p{S}]/u,If=/(?!~)[\s\p{P}\p{S}]/u,zf=/(?:[^\s\p{P}\p{S}]|~)/u,jf=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,gc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Bf=A(gc,"u").replace(/punct/g,kn).getRegex(),Of=A(gc,"u").replace(/punct/g,uc).getRegex(),hc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ff=A(hc,"gu").replace(/notPunctSpace/g,pc).replace(/punctSpace/g,ua).replace(/punct/g,kn).getRegex(),qf=A(hc,"gu").replace(/notPunctSpace/g,zf).replace(/punctSpace/g,If).replace(/punct/g,uc).getRegex(),Nf=A("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,pc).replace(/punctSpace/g,ua).replace(/punct/g,kn).getRegex(),Wf=A(/\\(punct)/,"gu").replace(/punct/g,kn).getRegex(),_f=A(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Uf=A(da).replace("(?:-->|$)","-->").getRegex(),$f=A("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Uf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),bn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Vf=A(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",bn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),mc=A(/^!?\[(label)\]\[(ref)\]/).replace("label",bn).replace("ref",ca).getRegex(),fc=A(/^!?\[(ref)\](?:\[\])?/).replace("ref",ca).getRegex(),Gf=A("reflink|nolink(?!\\()","g").replace("reflink",mc).replace("nolink",fc).getRegex(),ga={_backpedal:xo,anyPunctuation:Wf,autolink:_f,blockSkip:jf,br:dc,code:Rf,del:xo,emStrongLDelim:Bf,emStrongRDelimAst:Ff,emStrongRDelimUnd:Nf,escape:Af,link:Vf,nolink:fc,punctuation:Hf,reflink:mc,reflinkSearch:Gf,tag:$f,text:Df,url:xo},Yf={...ga,link:A(/^!?\[(label)\]\((.*?)\)/).replace("label",bn).getRegex(),reflink:A(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",bn).getRegex()},na={...ga,emStrongRDelimAst:qf,emStrongLDelim:Of,url:A(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Jf={...na,br:A(dc).replace("{2,}","*").getRegex(),text:A(na.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},mn={normal:pa,gfm:Lf,pedantic:Ef},fo={normal:ga,gfm:na,breaks:Jf,pedantic:Yf},Xf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},oc=e=>Xf[e];function ue(e,t){if(t){if(Z.escapeTest.test(e))return e.replace(Z.escapeReplace,oc)}else if(Z.escapeTestNoEncode.test(e))return e.replace(Z.escapeReplaceNoEncode,oc);return e}function nc(e){try{e=encodeURI(e).replace(Z.percentDecode,"%")}catch{return null}return e}function ic(e,t){var r;let o=e.replace(Z.findPipe,(a,l,c)=>{let d=!1,p=l;for(;--p>=0&&c[p]==="\\";)d=!d;return d?"|":" |"}),n=o.split(Z.splitPipe),i=0;if(n[0].trim()||n.shift(),n.length>0&&!((r=n.at(-1))!=null&&r.trim())&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;i<n.length;i++)n[i]=n[i].trim().replace(Z.slashPipe,"|");return n}function bo(e,t,o){let n=e.length;if(n===0)return"";let i=0;for(;i<n;){let r=e.charAt(n-i-1);if(r===t&&!o)i++;else if(r!==t&&o)i++;else break}return e.slice(0,n-i)}function Kf(e,t){if(e.indexOf(t[1])===-1)return-1;let o=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])o++;else if(e[n]===t[1]&&(o--,o<0))return n;return o>0?-2:-1}function rc(e,t,o,n,i){let r=t.href,a=t.title||null,l=e[1].replace(i.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:o,href:r,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function Qf(e,t,o){let n=e.match(o.other.indentCodeCompensation);if(n===null)return t;let i=n[1];return t.split(`
`).map(r=>{let a=r.match(o.other.beginningSpace);if(a===null)return r;let[l]=a;return l.length>=i.length?r.slice(i.length):r}).join(`
`)}var xn=class{options;rules;lexer;constructor(e){this.options=e||wt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let o=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?o:bo(o,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let o=t[0],n=Qf(o,t[3]||"",this.rules);return{type:"code",raw:o,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let o=t[2].trim();if(this.rules.other.endingHash.test(o)){let n=bo(o,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(o=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:o,tokens:this.lexer.inline(o)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:bo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let o=bo(t[0],`
`).split(`
`),n="",i="",r=[];for(;o.length>0;){let a=!1,l=[],c;for(c=0;c<o.length;c++)if(this.rules.other.blockquoteStart.test(o[c]))l.push(o[c]),a=!0;else if(!a)l.push(o[c]);else break;o=o.slice(c);let d=l.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,i=i?`${i}
${p}`:p;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,r,!0),this.lexer.state.top=u,o.length===0)break;let g=r.at(-1);if((g==null?void 0:g.type)==="code")break;if((g==null?void 0:g.type)==="blockquote"){let f=g,b=f.raw+`
`+o.join(`
`),x=this.blockquote(b);r[r.length-1]=x,n=n.substring(0,n.length-f.raw.length)+x.raw,i=i.substring(0,i.length-f.text.length)+x.text;break}else if((g==null?void 0:g.type)==="list"){let f=g,b=f.raw+`
`+o.join(`
`),x=this.list(b);r[r.length-1]=x,n=n.substring(0,n.length-g.raw.length)+x.raw,i=i.substring(0,i.length-f.raw.length)+x.raw,o=b.substring(r.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:r,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let o=t[1].trim(),n=o.length>1,i={type:"list",raw:"",ordered:n,start:n?+o.slice(0,-1):"",loose:!1,items:[]};o=n?`\\d{1,9}\\${o.slice(-1)}`:`\\${o}`,this.options.pedantic&&(o=n?o:"[*+-]");let r=this.rules.other.listItemRegex(o),a=!1;for(;e;){let c=!1,d="",p="";if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),g=e.split(`
`,1)[0],f=!u.trim(),b=0;if(this.options.pedantic?(b=2,p=u.trimStart()):f?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,p=u.slice(b),b+=t[1].length),f&&this.rules.other.blankLine.test(g)&&(d+=g+`
`,e=e.substring(g.length+1),c=!0),!c){let T=this.rules.other.nextBulletRegex(b),y=this.rules.other.hrRegex(b),k=this.rules.other.fencesBeginRegex(b),P=this.rules.other.headingBeginRegex(b),z=this.rules.other.htmlBeginRegex(b);for(;e;){let C=e.split(`
`,1)[0],O;if(g=C,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),O=g):O=g.replace(this.rules.other.tabCharGlobal,"    "),k.test(g)||P.test(g)||z.test(g)||T.test(g)||y.test(g))break;if(O.search(this.rules.other.nonSpaceChar)>=b||!g.trim())p+=`
`+O.slice(b);else{if(f||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||k.test(u)||P.test(u)||y.test(u))break;p+=`
`+g}!f&&!g.trim()&&(f=!0),d+=C+`
`,e=e.substring(C.length+1),u=O.slice(b)}}i.loose||(a?i.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0));let x=null,v;this.options.gfm&&(x=this.rules.other.listIsTask.exec(p),x&&(v=x[0]!=="[ ] ",p=p.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:d,task:!!x,checked:v,loose:!1,text:p,tokens:[]}),i.raw+=d}let l=i.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){let d=i.items[c].tokens.filter(u=>u.type==="space"),p=d.length>0&&d.some(u=>this.rules.other.anyLine.test(u.raw));i.loose=p}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let o=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:o,raw:t[0],href:n,title:i}}}table(e){var a;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let o=ic(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(a=t[3])!=null&&a.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],r={type:"table",raw:t[0],header:[],align:[],rows:[]};if(o.length===n.length){for(let l of n)this.rules.other.tableAlignRight.test(l)?r.align.push("right"):this.rules.other.tableAlignCenter.test(l)?r.align.push("center"):this.rules.other.tableAlignLeft.test(l)?r.align.push("left"):r.align.push(null);for(let l=0;l<o.length;l++)r.header.push({text:o[l],tokens:this.lexer.inline(o[l]),header:!0,align:r.align[l]});for(let l of i)r.rows.push(ic(l,r.header.length).map((c,d)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:r.align[d]})));return r}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let o=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:o,tokens:this.lexer.inline(o)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let o=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(o)){if(!this.rules.other.endAngleBracket.test(o))return;let r=bo(o.slice(0,-1),"\\");if((o.length-r.length)%2===0)return}else{let r=Kf(t[2],"()");if(r===-2)return;if(r>-1){let l=(t[0].indexOf("!")===0?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let n=t[2],i="";if(this.options.pedantic){let r=this.rules.other.pedanticHrefTitle.exec(n);r&&(n=r[1],i=r[3])}else i=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(o)?n=n.slice(1):n=n.slice(1,-1)),rc(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let o;if((o=this.rules.inline.reflink.exec(e))||(o=this.rules.inline.nolink.exec(e))){let n=(o[2]||o[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[n.toLowerCase()];if(!i){let r=o[0].charAt(0);return{type:"text",raw:r,text:r}}return rc(o,i,o[0],this.lexer,this.rules)}}emStrong(e,t,o=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!n||n[3]&&o.match(this.rules.other.unicodeAlphaNumeric))return;if(!(n[1]||n[2]||"")||!o||this.rules.inline.punctuation.exec(o)){let r=[...n[0]].length-1,a,l,c=r,d=0,p=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(p.lastIndex=0,t=t.slice(-1*e.length+r);(n=p.exec(t))!=null;){if(a=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!a)continue;if(l=[...a].length,n[3]||n[4]){c+=l;continue}else if((n[5]||n[6])&&r%3&&!((r+l)%3)){d+=l;continue}if(c-=l,c>0)continue;l=Math.min(l,l+c+d);let u=[...n[0]][0].length,g=e.slice(0,r+n.index+u+l);if(Math.min(r,l)%2){let b=g.slice(1,-1);return{type:"em",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}let f=g.slice(2,-2);return{type:"strong",raw:g,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let o=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(o),i=this.rules.other.startingSpaceChar.test(o)&&this.rules.other.endingSpaceChar.test(o);return n&&i&&(o=o.substring(1,o.length-1)),{type:"codespan",raw:t[0],text:o}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let o,n;return t[2]==="@"?(o=t[1],n="mailto:"+o):(o=t[1],n=o),{type:"link",raw:t[0],text:o,href:n,tokens:[{type:"text",raw:o,text:o}]}}}url(e){var o;let t;if(t=this.rules.inline.url.exec(e)){let n,i;if(t[2]==="@")n=t[0],i="mailto:"+n;else{let r;do r=t[0],t[0]=((o=this.rules.inline._backpedal.exec(t[0]))==null?void 0:o[0])??"";while(r!==t[0]);n=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let o=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:o}}}},Se=class ia{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||wt,this.options.tokenizer=this.options.tokenizer||new xn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let o={other:Z,block:mn.normal,inline:fo.normal};this.options.pedantic?(o.block=mn.pedantic,o.inline=fo.pedantic):this.options.gfm&&(o.block=mn.gfm,this.options.breaks?o.inline=fo.breaks:o.inline=fo.gfm),this.tokenizer.rules=o}static get rules(){return{block:mn,inline:fo}}static lex(t,o){return new ia(o).lex(t)}static lexInline(t,o){return new ia(o).inlineTokens(t)}lex(t){t=t.replace(Z.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let o=0;o<this.inlineQueue.length;o++){let n=this.inlineQueue[o];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,o=[],n=!1){var i,r,a;for(this.options.pedantic&&(t=t.replace(Z.tabCharGlobal,"    ").replace(Z.spaceLine,""));t;){let l;if((r=(i=this.options.extensions)==null?void 0:i.block)!=null&&r.some(d=>(l=d.call({lexer:this},t,o))?(t=t.substring(l.raw.length),o.push(l),!0):!1))continue;if(l=this.tokenizer.space(t)){t=t.substring(l.raw.length);let d=o.at(-1);l.raw.length===1&&d!==void 0?d.raw+=`
`:o.push(l);continue}if(l=this.tokenizer.code(t)){t=t.substring(l.raw.length);let d=o.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+l.raw,d.text+=`
`+l.text,this.inlineQueue.at(-1).src=d.text):o.push(l);continue}if(l=this.tokenizer.fences(t)){t=t.substring(l.raw.length),o.push(l);continue}if(l=this.tokenizer.heading(t)){t=t.substring(l.raw.length),o.push(l);continue}if(l=this.tokenizer.hr(t)){t=t.substring(l.raw.length),o.push(l);continue}if(l=this.tokenizer.blockquote(t)){t=t.substring(l.raw.length),o.push(l);continue}if(l=this.tokenizer.list(t)){t=t.substring(l.raw.length),o.push(l);continue}if(l=this.tokenizer.html(t)){t=t.substring(l.raw.length),o.push(l);continue}if(l=this.tokenizer.def(t)){t=t.substring(l.raw.length);let d=o.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+l.raw,d.text+=`
`+l.raw,this.inlineQueue.at(-1).src=d.text):this.tokens.links[l.tag]||(this.tokens.links[l.tag]={href:l.href,title:l.title});continue}if(l=this.tokenizer.table(t)){t=t.substring(l.raw.length),o.push(l);continue}if(l=this.tokenizer.lheading(t)){t=t.substring(l.raw.length),o.push(l);continue}let c=t;if((a=this.options.extensions)!=null&&a.startBlock){let d=1/0,p=t.slice(1),u;this.options.extensions.startBlock.forEach(g=>{u=g.call({lexer:this},p),typeof u=="number"&&u>=0&&(d=Math.min(d,u))}),d<1/0&&d>=0&&(c=t.substring(0,d+1))}if(this.state.top&&(l=this.tokenizer.paragraph(c))){let d=o.at(-1);n&&(d==null?void 0:d.type)==="paragraph"?(d.raw+=`
`+l.raw,d.text+=`
`+l.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):o.push(l),n=c.length!==t.length,t=t.substring(l.raw.length);continue}if(l=this.tokenizer.text(t)){t=t.substring(l.raw.length);let d=o.at(-1);(d==null?void 0:d.type)==="text"?(d.raw+=`
`+l.raw,d.text+=`
`+l.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):o.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return this.state.top=!0,o}inline(t,o=[]){return this.inlineQueue.push({src:t,tokens:o}),o}inlineTokens(t,o=[]){var l,c,d;let n=t,i=null;if(this.tokens.links){let p=Object.keys(this.tokens.links);if(p.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)p.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,i.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)n=n.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let r=!1,a="";for(;t;){r||(a=""),r=!1;let p;if((c=(l=this.options.extensions)==null?void 0:l.inline)!=null&&c.some(g=>(p=g.call({lexer:this},t,o))?(t=t.substring(p.raw.length),o.push(p),!0):!1))continue;if(p=this.tokenizer.escape(t)){t=t.substring(p.raw.length),o.push(p);continue}if(p=this.tokenizer.tag(t)){t=t.substring(p.raw.length),o.push(p);continue}if(p=this.tokenizer.link(t)){t=t.substring(p.raw.length),o.push(p);continue}if(p=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(p.raw.length);let g=o.at(-1);p.type==="text"&&(g==null?void 0:g.type)==="text"?(g.raw+=p.raw,g.text+=p.text):o.push(p);continue}if(p=this.tokenizer.emStrong(t,n,a)){t=t.substring(p.raw.length),o.push(p);continue}if(p=this.tokenizer.codespan(t)){t=t.substring(p.raw.length),o.push(p);continue}if(p=this.tokenizer.br(t)){t=t.substring(p.raw.length),o.push(p);continue}if(p=this.tokenizer.del(t)){t=t.substring(p.raw.length),o.push(p);continue}if(p=this.tokenizer.autolink(t)){t=t.substring(p.raw.length),o.push(p);continue}if(!this.state.inLink&&(p=this.tokenizer.url(t))){t=t.substring(p.raw.length),o.push(p);continue}let u=t;if((d=this.options.extensions)!=null&&d.startInline){let g=1/0,f=t.slice(1),b;this.options.extensions.startInline.forEach(x=>{b=x.call({lexer:this},f),typeof b=="number"&&b>=0&&(g=Math.min(g,b))}),g<1/0&&g>=0&&(u=t.substring(0,g+1))}if(p=this.tokenizer.inlineText(u)){t=t.substring(p.raw.length),p.raw.slice(-1)!=="_"&&(a=p.raw.slice(-1)),r=!0;let g=o.at(-1);(g==null?void 0:g.type)==="text"?(g.raw+=p.raw,g.text+=p.text):o.push(p);continue}if(t){let g="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return o}},vn=class{options;parser;constructor(e){this.options=e||wt}space(e){return""}code({text:e,lang:t,escaped:o}){var r;let n=(r=(t||"").match(Z.notSpaceStart))==null?void 0:r[0],i=e.replace(Z.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ue(n)+'">'+(o?i:ue(i,!0))+`</code></pre>
`:"<pre><code>"+(o?i:ue(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,o=e.start,n="";for(let a=0;a<e.items.length;a++){let l=e.items[a];n+=this.listitem(l)}let i=t?"ol":"ul",r=t&&o!==1?' start="'+o+'"':"";return"<"+i+r+`>
`+n+"</"+i+`>
`}listitem(e){var o;let t="";if(e.task){let n=this.checkbox({checked:!!e.checked});e.loose?((o=e.tokens[0])==null?void 0:o.type)==="paragraph"?(e.tokens[0].text=n+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=n+" "+ue(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:!0}):t+=n+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",o="";for(let i=0;i<e.header.length;i++)o+=this.tablecell(e.header[i]);t+=this.tablerow({text:o});let n="";for(let i=0;i<e.rows.length;i++){let r=e.rows[i];o="";for(let a=0;a<r.length;a++)o+=this.tablecell(r[a]);n+=this.tablerow({text:o})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),o=e.header?"th":"td";return(e.align?`<${o} align="${e.align}">`:`<${o}>`)+t+`</${o}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ue(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:o}){let n=this.parser.parseInline(o),i=nc(e);if(i===null)return n;e=i;let r='<a href="'+e+'"';return t&&(r+=' title="'+ue(t)+'"'),r+=">"+n+"</a>",r}image({href:e,title:t,text:o,tokens:n}){n&&(o=this.parser.parseInline(n,this.parser.textRenderer));let i=nc(e);if(i===null)return ue(o);e=i;let r=`<img src="${e}" alt="${o}"`;return t&&(r+=` title="${ue(t)}"`),r+=">",r}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ue(e.text)}},ha=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Ce=class ra{options;renderer;textRenderer;constructor(t){this.options=t||wt,this.options.renderer=this.options.renderer||new vn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ha}static parse(t,o){return new ra(o).parse(t)}static parseInline(t,o){return new ra(o).parseInline(t)}parse(t,o=!0){var i,r;let n="";for(let a=0;a<t.length;a++){let l=t[a];if((r=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&r[l.type]){let d=l,p=this.options.extensions.renderers[d.type].call({parser:this},d);if(p!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(d.type)){n+=p||"";continue}}let c=l;switch(c.type){case"space":{n+=this.renderer.space(c);continue}case"hr":{n+=this.renderer.hr(c);continue}case"heading":{n+=this.renderer.heading(c);continue}case"code":{n+=this.renderer.code(c);continue}case"table":{n+=this.renderer.table(c);continue}case"blockquote":{n+=this.renderer.blockquote(c);continue}case"list":{n+=this.renderer.list(c);continue}case"html":{n+=this.renderer.html(c);continue}case"paragraph":{n+=this.renderer.paragraph(c);continue}case"text":{let d=c,p=this.renderer.text(d);for(;a+1<t.length&&t[a+1].type==="text";)d=t[++a],p+=`
`+this.renderer.text(d);o?n+=this.renderer.paragraph({type:"paragraph",raw:p,text:p,tokens:[{type:"text",raw:p,text:p,escaped:!0}]}):n+=p;continue}default:{let d='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return n}parseInline(t,o=this.renderer){var i,r;let n="";for(let a=0;a<t.length;a++){let l=t[a];if((r=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&r[l.type]){let d=this.options.extensions.renderers[l.type].call({parser:this},l);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(l.type)){n+=d||"";continue}}let c=l;switch(c.type){case"escape":{n+=o.text(c);break}case"html":{n+=o.html(c);break}case"link":{n+=o.link(c);break}case"image":{n+=o.image(c);break}case"strong":{n+=o.strong(c);break}case"em":{n+=o.em(c);break}case"codespan":{n+=o.codespan(c);break}case"br":{n+=o.br(c);break}case"del":{n+=o.del(c);break}case"text":{n+=o.text(c);break}default:{let d='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return n}},fn=class{options;block;constructor(e){this.options=e||wt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Se.lex:Se.lexInline}provideParser(){return this.block?Ce.parse:Ce.parseInline}},Zf=class{defaults=aa();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Ce;Renderer=vn;TextRenderer=ha;Lexer=Se;Tokenizer=xn;Hooks=fn;constructor(...e){this.use(...e)}walkTokens(e,t){var n,i;let o=[];for(let r of e)switch(o=o.concat(t.call(this,r)),r.type){case"table":{let a=r;for(let l of a.header)o=o.concat(this.walkTokens(l.tokens,t));for(let l of a.rows)for(let c of l)o=o.concat(this.walkTokens(c.tokens,t));break}case"list":{let a=r;o=o.concat(this.walkTokens(a.items,t));break}default:{let a=r;(i=(n=this.defaults.extensions)==null?void 0:n.childTokens)!=null&&i[a.type]?this.defaults.extensions.childTokens[a.type].forEach(l=>{let c=a[l].flat(1/0);o=o.concat(this.walkTokens(c,t))}):a.tokens&&(o=o.concat(this.walkTokens(a.tokens,t)))}}return o}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(o=>{let n={...o};if(n.async=this.defaults.async||n.async||!1,o.extensions&&(o.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let r=t.renderers[i.name];r?t.renderers[i.name]=function(...a){let l=i.renderer.apply(this,a);return l===!1&&(l=r.apply(this,a)),l}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let r=t[i.level];r?r.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),n.extensions=t),o.renderer){let i=this.defaults.renderer||new vn(this.defaults);for(let r in o.renderer){if(!(r in i))throw new Error(`renderer '${r}' does not exist`);if(["options","parser"].includes(r))continue;let a=r,l=o.renderer[a],c=i[a];i[a]=(...d)=>{let p=l.apply(i,d);return p===!1&&(p=c.apply(i,d)),p||""}}n.renderer=i}if(o.tokenizer){let i=this.defaults.tokenizer||new xn(this.defaults);for(let r in o.tokenizer){if(!(r in i))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;let a=r,l=o.tokenizer[a],c=i[a];i[a]=(...d)=>{let p=l.apply(i,d);return p===!1&&(p=c.apply(i,d)),p}}n.tokenizer=i}if(o.hooks){let i=this.defaults.hooks||new fn;for(let r in o.hooks){if(!(r in i))throw new Error(`hook '${r}' does not exist`);if(["options","block"].includes(r))continue;let a=r,l=o.hooks[a],c=i[a];fn.passThroughHooks.has(r)?i[a]=d=>{if(this.defaults.async)return Promise.resolve(l.call(i,d)).then(u=>c.call(i,u));let p=l.call(i,d);return c.call(i,p)}:i[a]=(...d)=>{let p=l.apply(i,d);return p===!1&&(p=c.apply(i,d)),p}}n.hooks=i}if(o.walkTokens){let i=this.defaults.walkTokens,r=o.walkTokens;n.walkTokens=function(a){let l=[];return l.push(r.call(this,a)),i&&(l=l.concat(i.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Se.lex(e,t??this.defaults)}parser(e,t){return Ce.parse(e,t??this.defaults)}parseMarkdown(e){return(o,n)=>{let i={...n},r={...this.defaults,...i},a=this.onError(!!r.silent,!!r.async);if(this.defaults.async===!0&&i.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof o>"u"||o===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof o!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(o)+", string expected"));r.hooks&&(r.hooks.options=r,r.hooks.block=e);let l=r.hooks?r.hooks.provideLexer():e?Se.lex:Se.lexInline,c=r.hooks?r.hooks.provideParser():e?Ce.parse:Ce.parseInline;if(r.async)return Promise.resolve(r.hooks?r.hooks.preprocess(o):o).then(d=>l(d,r)).then(d=>r.hooks?r.hooks.processAllTokens(d):d).then(d=>r.walkTokens?Promise.all(this.walkTokens(d,r.walkTokens)).then(()=>d):d).then(d=>c(d,r)).then(d=>r.hooks?r.hooks.postprocess(d):d).catch(a);try{r.hooks&&(o=r.hooks.preprocess(o));let d=l(o,r);r.hooks&&(d=r.hooks.processAllTokens(d)),r.walkTokens&&this.walkTokens(d,r.walkTokens);let p=c(d,r);return r.hooks&&(p=r.hooks.postprocess(p)),p}catch(d){return a(d)}}}onError(e,t){return o=>{if(o.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+ue(o.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(o);throw o}}},kt=new Zf;function R(e,t){return kt.parse(e,t)}R.options=R.setOptions=function(e){return kt.setOptions(e),R.defaults=kt.defaults,ac(R.defaults),R};R.getDefaults=aa;R.defaults=wt;R.use=function(...e){return kt.use(...e),R.defaults=kt.defaults,ac(R.defaults),R};R.walkTokens=function(e,t){return kt.walkTokens(e,t)};R.parseInline=kt.parseInline;R.Parser=Ce;R.parser=Ce.parse;R.Renderer=vn;R.TextRenderer=ha;R.Lexer=Se;R.lexer=Se.lex;R.Tokenizer=xn;R.Hooks=fn;R.parse=R;var gA=R.options,hA=R.setOptions,mA=R.use,fA=R.walkTokens,bA=R.parseInline;var xA=Ce.parse,vA=Se.lex;var py=Gh(jp());E();var Vt=e=>{let t=document.querySelector(".press-frame-sidemenu");t&&hn(t.scrollTop),Ae(lt(e))},lt=e=>{let t=ec(),o=jt(),n=e;return o&&!n.startsWith(o+"/")&&!n.includes("//")&&(n=`${o}${n}`),n||"/"};h();var Bp=e=>{var i;let t=e.langs||[],o=((i=t.find(r=>r.id===e.currentLang))==null?void 0:i.text)||"Language",n=r=>{let a=t.find(l=>l.text===r);if(a&&a.id!==e.currentLang){let l=window.location.pathname,c=jt();c&&l.startsWith(c)&&(l=l.substring(c.length));let d=t.map(u=>u.id).join("|"),p=new RegExp(`^/(${d})(\\/|$)`);p.test(l)?l=l.replace(p,`/${a.id}$2`):l=`/${a.id}${l==="/"?"/":l}`,l=`${c}${l}`,Ae(l)}};return s("div",{class:["lang-switcher",e.className].join(" "),children:s(le,{list:t.map(r=>r.text),defaultValue:o,icon:s(De,{children:Yl}),handleSelected:n,align:"right"})})};E();var Op=`<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>\r
    <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z' />\r
</svg>`;var Fp=`<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>\r
    <!-- Sun (Top-Left): Unchanged -->\r
    <path d="M7 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM7 0h1v2.5H7zM7 11.5h1V14H7zM0 7h2.5v1H0zM11.5 7H14v1h-2.5zM2.05 2.05l1.768 1.768.707-.707L2.757 1.343zM10.243 10.243l1.768 1.768.707-.707-1.768-1.768zM2.05 12.95L1.343 12.243l1.768-1.768.707.707zM12.95 2.05l-1.768 1.768-.707-.707 1.768-1.768z" />\r
    \r
    <!-- Moon (Bottom-Right): Rotated ~30 degrees CCW to 'hug' the sun -->\r
    <g transform="rotate(-30, 16, 16)">\r
        <path d="M23 16c0 3.866-3.134 7-7 7-3.866 0-7-3.134-7-7 0-.46.04-.92.1-1.36 1.1 3.2 4.1 5.5 7.4 5.5 1.9 0 3.6-.6 5-1.7 1-.9 1.5-2.1 1.5-3.44 0-1.8-1.1-3.3-2.6-3.9 1.6 1.5 2.6 3.6 2.6 5.9z" />\r
    </g>\r
</svg>\r
`;h();var qp=e=>s("header",{css:{width:"100%",display:"flex",alignItems:"center",padding:"0.75rem 2rem",justifyContent:"space-between",".press-navbar-left":{display:"flex",alignItems:"center",".title":{fontWeight:"bold",fontSize:"1.2rem",marginRight:"1rem"},".nav":{display:"flex",gap:"1rem"}},".press-navbar-right":{display:"flex",alignItems:"center",gap:"1.25rem",".navbar-item":{display:"flex",alignItems:"center",textDecoration:"none",transition:"color 0.2s","&:hover":{color:"var(--press-brand-color)"}}}},class:"press-navbar",children:[s("div",{class:"press-navbar-left",children:[s("div",{class:"title",children:s("a",{href:lt("/"+e.currentLang),children:e.title})}),s("nav",{class:"nav",children:e.nav.map(o=>s("a",{href:lt(o.link),target:o.target,children:o.text}))})]}),s("div",{class:"press-navbar-right",children:[e.langs.length>1&&s(Bp,{className:"navbar-item",currentLang:e.currentLang,langs:e.langs||[]}),s(po,{className:"navbar-item",icon:s(De,{children:Fp}),noUpdateLabel:!0}),e.github&&e.github.url&&s("a",{href:e.github.url,target:"_blank",rel:"noopener noreferrer",class:"navbar-item",title:e.github.title,children:s(De,{children:Op})})]})]});h();var Np=e=>e.headings.length===0?null:s("div",{css:{".&-title":{fontWeight:"bold",fontSize:"0.8rem",textTransform:"uppercase",letterSpacing:"0.05em",color:"var(--primary-color)",marginBottom:"0.8rem"},".&-list":{listStyle:"none",padding:0,margin:0,borderLeft:"1px solid var(--press-border-color)"},".&-item":{padding:"0.2rem 0 0.2rem 1rem",fontSize:"0.85rem","&.level-3":{paddingLeft:"2rem"},a:{display:"block",transition:"color 0.2s",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}},children:[s("div",{class:"&-title",children:"On this page"}),s("ul",{class:"&-list",children:e.headings.map(o=>s("li",{class:`&-item level-${o.level}`,children:s("a",{href:`#${o.id}`,children:o.text})}))})]});h();var Wp=e=>{var i;let{hero:t,features:o}=e.data||{};return s("div",{css:{".&-hero":{padding:"64px 32px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"},".&-hero-name":{fontSize:"56px",lineHeight:"64px",fontWeight:"bold",background:"linear-gradient(135deg, var(--press-brand-color) 30%, #4facfe 100%)","-webkit-background-clip":"text","-webkit-text-fill-color":"transparent"},".&-hero-text":{fontSize:"56px",lineHeight:"64px",fontWeight:"bold",marginTop:"8px"},".&-hero-tagline":{fontSize:"24px",lineHeight:"36px",color:"var(--secondary-color)",marginTop:"24px",maxWidth:"576px"},".&-hero-actions":{display:"flex",gap:"12px",marginTop:"48px"},".&-button":{display:"inline-block",padding:"0 20px",lineHeight:"38px",borderRadius:"20px",fontWeight:"600",textDecoration:"none",fontSize:"14px"},".&-button.brand":{backgroundColor:"var(--press-brand-color)",color:"#fff"},".&-button.alt":{backgroundColor:"var(--secondary-bg-color)",color:"var(--primary-color)",border:"1px solid var(--press-border-color)"},".&-features":{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(256px, 1fr))",gap:"24px",padding:"48px 32px",maxWidth:"1152px",margin:"0 auto"},".&-feature-card":{backgroundColor:"var(--secondary-bg-color)",padding:"24px",borderRadius:"12px",border:"1px solid var(--press-border-color)"},".&-feature-title":{fontSize:"20px",fontWeight:"bold",marginBottom:"8px"},".&-feature-details":{fontSize:"14px",color:"var(--secondary-color)",lineHeight:"22px"}},children:[s("section",{class:"&-hero",children:[s("h1",{class:"&-hero-name",children:t.name}),s("p",{class:"&-hero-text",children:t.text}),s("p",{class:"&-hero-tagline",children:t.tagline}),s("div",{class:"&-hero-actions",children:(i=t.actions)==null?void 0:i.map(r=>s("a",{href:lt(r.link),class:`&-button ${r.theme}`,children:r.text}))})]}),o&&s("section",{class:"&-features",children:o.map(r=>s("div",{class:"&-feature-card",children:[s("h2",{class:"&-feature-title",children:r.title}),s("p",{class:"&-feature-details",children:r.details})]}))})]})};H();E();h();var _p=e=>{F()&&(window.lpPressLoad=Vt);let o={display:"flex",flexDirection:"column",width:"100%",height:"100%",minHeight:"100%",position:"relative",...{h1:{fontSize:"1.7rem"},h2:{fontSize:"1.4rem"},h3:{fontSize:"1.2rem"},"h1, h2, h3":{borderBottom:"1px solid var(--press-border-color)",paddingBottom:"0.3em",marginTop:"1.5em",position:"relative",scrollMarginTop:"80px",fontWeight:"bold","&:first-child":{marginTop:0},"&:hover .header-anchor":{opacity:1}},".header-anchor":{position:"absolute",left:"-1.5rem",width:"1rem",opacity:0,textDecoration:"none",color:"var(--press-brand-color)",fontSize:"0.8em",transition:"opacity 0.2s"},ol:{listStyleType:"disc"},"li, p":{margin:"0.5em 0"},pre:{backgroundColor:"var(--secondary-bg-color)",padding:"1rem",borderRadius:"8px",overflowX:"auto"},code:{fontFamily:"var(--font-family-mono, monospace)"},img:{maxWidth:"100%",boxShadow:"var(--cover-box-shadow)"}},...e.css,".press-frame-box":{display:"flex",flex:"1",flexDirection:"column",height:"100%",width:"100%",maxWidth:G.DesktopMax,margin:"auto","padding-top ":"constant(safe-area-inset-top)","padding-top":"env(safe-area-inset-top)"},".press-frame-header":{display:"flex",flexDirection:"column",alignItems:"center",padding:"4px 16px 4px 0px",width:"100%"},".press-frame-main":{display:"flex",flex:"1",flexDirection:"row",overflowY:"auto",scrollbarWidth:"none",borderTop:"1px solid var(--press-border-color)",minHeight:"0",scrollBehavior:"smooth","&::-webkit-scrollbar":{display:"none"}},".press-frame-main .padding-block":{padding:"0 16px"},".press-frame-content":{display:"flex",flex:"1",flexDirection:"column",overflowY:"auto",scrollbarWidth:"none"},".press-frame-sidemenu":{width:e.sidemenuWidth||"260px",display:"flex",borderRight:"1px solid var(--press-border-color)",overflowX:"hidden",overflowY:"auto",color:"var(--sidebar-color)",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},[Q.TabletBelow]:{".press-frame-sidemenu":{display:"none"}}};return s("div",{ref:{onLoad:async i=>{ct(i);let r=i.querySelector(".press-frame-sidemenu");r&&(r.scrollTop=Kl(),r.addEventListener("scroll",()=>{hn(r.scrollTop)}))}},css:o,class:"press-frame",children:s("div",{class:"press-frame-box",children:[s("div",{class:"press-frame-header",children:e.header}),s("div",{class:"press-frame-main",children:[!e.hideSidemenu&&s("div",{class:"press-frame-sidemenu",children:e.sidemenu}),s("div",{class:"press-frame-content",children:e.content})]})]})})};h();var Up=e=>{let t={},o={width:"100%",padding:"0 8px 8px",height:"max-content",".&-item":{marginBottom:"0.5rem",display:"block",color:"var(--text-color)",textDecoration:"none","&:hover":{color:"var(--primary-accent-color)"},transition:"color 0.2s"},".&-item.active":{color:"var(--primary-accent-color)",fontWeight:"bold"},".&-group-title":{fontWeight:"bold",marginTop:"0.5rem",marginBottom:"0.5rem",fontSize:"15px","&.group-level-0":{marginTop:"1.5rem",fontSize:"19px"},"&.group-level-1":{marginTop:"0.75rem",fontSize:"17px"}}},n=a=>{let l=a||window.location.href,c=t.$all("&-item");c&&c.forEach(d=>{d.classList.remove("active");let p=d.getAttribute("data-link");p&&l.endsWith(p)&&(d.classList.add("active"),d.scrollIntoView({behavior:"smooth",block:"nearest"}))})};t.onLoad=async()=>{n()};let i=e.sidebar||[],r=1;return s("aside",{css:o,ref:t,children:i.map((a,l)=>{let c={paddingLeft:`${a.level*r}rem`};if(a.type==="group")return s("div",{class:"&-group-title"+(" group-level-"+a.level),style:c,children:a.text},l);{let d=lt(a.link);return s("a",{class:"&-item",style:c,href:"javascript:void(0)","data-link":d,onClick:()=>(n(d),Vt(d),!1),children:a.text},l)}})})};E();var $p=`<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>\r
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />\r
</svg>\r
`;h();var Vp=e=>{let t={display:"flex",flex:1,maxWidth:"100vw",margin:"0 auto",width:"100%",".press-content":{flex:1,padding:e.isHome?"0":"2rem 4rem",width:"100%",margin:e.isHome?"0":"0 auto",minWidth:0,a:{textDecoration:"underline"}},".page-heading-container":{width:"240px",minWidth:"240px",padding:"2rem 1rem",position:"sticky",top:"64px",maxHeight:"calc(100vh - 64px)",overflowY:"auto",alignSelf:"flex-start",display:e.isHome||e.headings.length===0?"none":"block"},".markdown-body":{lineHeight:1.6},".press-mobile-toc":{display:"none",borderRadius:"6px",alignItems:"center",padding:"4px",position:"fixed",top:"74px",right:"7px",zIndex:90,fontSize:"0.9rem",cursor:"pointer",textTransform:"uppercase",backgroundColor:"var(--primary-bg-color)"},".press-mobile-sidebar":{display:"none",borderRadius:"6px",alignItems:"center",padding:"4px",position:"fixed",top:"74px",left:"7px",zIndex:90,fontSize:"0.9rem",cursor:"pointer",[Q.TabletBelow]:{display:"flex"}},[Q.MobileBelow]:{".page-heading-container":{display:"none"},".press-mobile-toc":{display:"flex"},".press-content":{padding:e.isHome?"0":"2rem 1rem"}}};return s("main",{css:t,children:[!e.isHome&&e.sidebar.length>0&&s("div",{class:"press-mobile-sidebar",children:s(le,{list:e.sidebar.map(o=>({text:o.text,id:o.link||"",url:o.link||"",indent:o.level,visible:!!o.type,disabled:o.type==="group",bold:o.type==="group"})),defaultValue:"Menu",tips:"",width:"max-content",maxHeight:"400px",align:"left",handleSelected:(o,n)=>{n&&n.url&&Vt(n.url)},noUpdateLabel:!0,icon:s(De,{children:$p})})}),s("main",{class:"press-content",children:e.isHome?s(Wp,{data:e.data}):s("article",{class:"markdown-body",children:e.children})}),s("aside",{class:"page-heading-container",children:s(Np,{headings:e.headings})}),!e.isHome&&e.headings.length>0&&s("div",{class:"press-mobile-toc",children:s(le,{list:e.headings.map(o=>({text:o.text,id:o.id,indent:o.level-2})),defaultValue:"On this page",tips:"",width:"max-content",maxHeight:"300px",align:"right",handleSelected:o=>{var r;let n=o.trim(),i=e.headings.find(a=>a.text===n);i&&((r=document.getElementById(i.id))==null||r.scrollIntoView(!0))},noUpdateLabel:!0})})]})};h();var Gp=e=>{var a;let t=((a=e.data)==null?void 0:a.layout)==="home",o=e.headings||[],n=e.lang||li().langName,i=e.sidebar||[],r=s(Vp,{sidebar:i,isHome:t,headings:o,data:e.data,children:e.children});return s(_p,{header:s(qp,{title:e.title,nav:e.nav,langs:e.langs||[],currentLang:n,github:e.github}),sidemenu:s(Up,{sidebar:i}),content:r,hideSidemenu:t,sidemenuWidth:e.sidemenuWidth})};E();h();var Yp=async e=>{var k,P;if(!F())return s("div",{});let t=jt(),o=Xl(),n=window.location.pathname;t&&n.startsWith(t)&&(n=n.substring(t.length));let r=n.split("/")[1],a=((k=o["/"])==null?void 0:k.data)||{},l=Array.isArray(a.lang)?a.lang:[{title:"English",id:"en"},{title:"Chinese",id:"zh"}];Zl(l);let c=l.map(z=>z.id),d=c.includes(r)?r:c[0]||"en";Promise.resolve().then(()=>(E(),Gl)).then(z=>{z.getCurrentLang().langName!==d&&z.updateLang(d)});let p=n;p===""||p==="/"?p=`/${d}/index`:(p.endsWith("/")&&p.length>1&&(p=p.substring(0,p.length-1)),p===`/${d}`&&(p=`/${d}/index`));let u=o[p];if(!u&&window.location.pathname[0]==="/"&&!window.location.pathname.startsWith(t+"/")){window.location.href=window.location.href;return}let g=u?u.html:`<h1>404 - Page Not Found</h1><p>Path: ${p}</p>`,f=((P=o[`/${d}/index`])==null?void 0:P.data)||{},b=f.nav||[],x=f.sidebar||[],v=f.title||"Lupine.js",T=f.styles||{};M("customer-css",T,!1,!0);let y=l.map(z=>{var he;let C=((he=o[`${z.id}/index`])==null?void 0:he.data)||{},O=Array.isArray(C.lang)?C.lang[0]:C.lang||{};return{text:O.text||O.title||O.label||z.title,id:z.id}});return s(Gp,{title:v,nav:b,sidebar:x,lang:d,langs:y,data:u==null?void 0:u.data,headings:u==null?void 0:u.headings,sidemenuWidth:f["sidemenu-width"],github:{url:f["github-link"],title:f["github-title"]},children:g})};E();var Jp={light:{...rn.light,"--press-border-color":"#e2e2e3","--press-brand-color":"#3eaf7c"},dark:{...rn.dark,"--press-border-color":"#2e2e32","--press-brand-color":"#3eaf7c"}};var Xp={a:{textDecoration:"none",color:"inherit","&:hover":{color:"var(--press-brand-color)"}},body:{backgroundColor:"var(--primary-bg-color)",color:"var(--primary-color)",fontSize:"var(--font-size-base)",lineHeight:"var(--line-height-base)",fontFamily:"var(--font-family-base)",fontWeight:"var(--font-weight-base)"}};var Kp="";var Qp=`<p>The &quot;Write Once, Run Everywhere&quot; dream is often promised but rarely delivered without significant compromises. Heavy frameworks, conditional spaghetti code, and poor performance usually plague cross-platform attempts.</p>
<p><strong>Lupine.js</strong> changes the game. It is designed from the ground up to be a <strong>Universal Framework</strong>. By leveraging <strong>Capacitor</strong> for Mobile and <strong>Electron</strong> for Desktop, you can deploy your application to the Web, iOS, Android, Windows, macOS, and Linux \u2014 all from a single TypeScript codebase.</p>
<p><img src="/lupine.js/assets/architecture_cross_platform.png" alt="Lupine.js Architecture"></p>
<p>In this guide, we will walk through how to take a standard Lupine.js web application and expand it to Mobile and Desktop, using a will be online soon real-world production app <strong>Lupine Sample App</strong> (Sample App) as a reference.</p>
<h2 id="1-the-core-a-responsive-web-app"><a class="header-anchor" href="#1-the-core-a-responsive-web-app">#</a>1. The Core: A Responsive Web App</h2><p>Before we touch any native code, we need a responsive web application. Lupine.js makes this easy with built-in responsive tools working alongside its CSS-in-JS engine.</p>
<h3 id="responsive-styling"><a class="header-anchor" href="#responsive-styling">#</a>Responsive Styling</h3><p>Instead of writing separate CSS files for mobile, use <code>MediaQueryRange</code> directly in your component styles:</p>
<pre><code class="language-tsx">import { MediaQueryRange, CssProps } from &#39;lupine.web&#39;;

const css: CssProps = {
  // Default (Desktop) styles
  padding: &#39;50px&#39;,
  fontSize: &#39;18px&#39;,

  // Mobile overrides
  [MediaQueryRange.MobileBelow]: {
    padding: &#39;10px&#39;,
    fontSize: &#39;14px&#39;,
    flexDirection: &#39;column&#39;,
  },
};
</code></pre>
<h3 id="adaptive-frames"><a class="header-anchor" href="#adaptive-frames">#</a>Adaptive Frames</h3><p>For navigation, the <code>ResponsiveFrame</code> component automatically switches between a Desktop Top-Menu and a Mobile Bottom-Bar based on the device.</p>
<pre><code class="language-tsx">&lt;ResponsiveFrame
  desktopHeaderTitle=&#39;My App&#39;
  // ... desktop menu items
  mobileBottomMenu={[
    { title: &#39;Home&#39;, icon: &lt;HomeIcon /&gt;, link: &#39;/home&#39; },
    { title: &#39;Me&#39;, icon: &lt;UserIcon /&gt;, link: &#39;/me&#39; },
  ]}
  mainContent={&lt;PageComponent /&gt;}
/&gt;
</code></pre>
<h2 id="2-going-mobile-ios-android"><a class="header-anchor" href="#2-going-mobile-ios-android">#</a>2. Going Mobile (iOS &amp; Android)</h2><p>Lupine.js uses <strong>Capacitor</strong> to wrap your web app into a native mobile binary. This allows you to access native features (Camera, Filesystem) while keeping your web workflow.</p>
<h3 id="step-2-1-setup-capacitor"><a class="header-anchor" href="#step-2-1-setup-capacitor">#</a>Step 2.1: Setup Capacitor</h3><p>In your project root, install the necessary dependencies:</p>
<pre><code class="language-bash"># Core Capacitor libs
npm install @capacitor/cli@latest @capacitor/core@latest
npm install @capacitor/android @capacitor/ios

# Useful plugins (Camera, Filesystem, etc.)
npm install @capacitor/camera @capacitor/filesystem @capacitor/share
npm install @capacitor-community/keep-awake

# Initialize
npx cap init [MyAppName] [com.example.app]
</code></pre>
<h3 id="step-2-2-add-platforms"><a class="header-anchor" href="#step-2-2-add-platforms">#</a>Step 2.2: Add Platforms</h3><pre><code class="language-bash"># Add Android
npx cap add android

# Add iOS (requires Xcode on Mac)
npx cap add ios
</code></pre>
<h3 id="step-2-3-configure-mobile-environment"><a class="header-anchor" href="#step-2-3-configure-mobile-environment">#</a>Step 2.3: Configure Mobile Environment</h3><p>Mobile apps run from the local file system (<code>file://</code>), so they cannot use relative paths for API calls. create a <code>.env.mobile</code> file:</p>
<pre><code class="language-ini"># .env.mobile
WEB.API_BASE_URL=https://api.your-production-site.com
</code></pre>
<h3 id="step-2-4-build-sync"><a class="header-anchor" href="#step-2-4-build-sync">#</a>Step 2.4: Build &amp; Sync</h3><p>Add a script to your <code>package.json</code> to build for mobile:</p>
<pre><code class="language-json">&quot;scripts&quot;: {
  &quot;build-mobile&quot;: &quot;node ./dev/dev-watch --env=.env.mobile --dev=0 --mobile=1&quot;
}
</code></pre>
<p>Then build and sync to the native projects:</p>
<pre><code class="language-bash">npm run build-mobile
npx cap sync
npx cap open android  # Opens Android Studio
</code></pre>
<h3 id="step-2-5-native-logic-optional"><a class="header-anchor" href="#step-2-5-native-logic-optional">#</a>Step 2.5: Native Logic (Optional)</h3><p>You can use the <code>#if MOBILE</code> compiler directive to write platform-specific code without bloating your web bundle:</p>
<pre><code class="language-javascript">// #if MOBILE
import { Camera } from &#39;@capacitor/camera&#39;;

const takePhoto = async () =&gt; {
  const image = await Camera.getPhoto({ ... });
  // processing...
};
// #else
const takePhoto = async () =&gt; {
  alert(&quot;Camera not supported on Web!&quot;);
};
// #endif
</code></pre>
<h2 id="3-going-desktop-windows-mac-linux"><a class="header-anchor" href="#3-going-desktop-windows-mac-linux">#</a>3. Going Desktop (Windows, Mac, Linux)</h2><p>For desktop, Lupine.js integrates with <strong>Electron</strong>.</p>
<h3 id="structure"><a class="header-anchor" href="#structure">#</a>Structure</h3><p>Every Lupine project comes with an <code>electron</code> folder containing the main process logic.</p>
<ul>
<li><code>electron/main.js</code>: The entry point for the Electron app.</li>
<li><code>electron/preload.js</code>: Bridge for secure communication between Renderer (Web) and Main process.</li>
</ul>
<h3 id="building-for-desktop"><a class="header-anchor" href="#building-for-desktop">#</a>Building for Desktop</h3><p>Lupine allows you to package your app into an <code>.exe</code>, <code>.dmg</code>, or <code>.snap</code> file using <code>electron-builder</code>.</p>
<p>Run the build commands provided in <code>package.json</code>:</p>
<pre><code class="language-bash"># Build for Windows
npm run app:build-win

# Build for Mac
npm run app:build-mac
</code></pre>
<p>The build process will:</p>
<ol>
<li>Compile your Lupine.js web app into static files.</li>
<li>Bundle these files with the Electron runtime.</li>
<li>Output a standalone installer.</li>
</ol>
<h2 id="conclusion"><a class="header-anchor" href="#conclusion">#</a>Conclusion</h2><p>With <strong>Lupine.js</strong>, you don&#39;t need three separate teams for Web, Mobile, and Desktop. You can maintain <strong>one</strong> codebase, use <strong>one</strong> set of components, and deploy everywhere.</p>
<p>Whether you are building a SaaS platform, a consumer app, or an internal tool, Lupine.js gives you the reach of a native app with the speed of web development.</p>
`;var Zp=`<h1 id="zero-dependencies-native-power-mastering-css-in-js-in-lupine-js"><a class="header-anchor" href="#zero-dependencies-native-power-mastering-css-in-js-in-lupine-js">#</a>Zero Dependencies, Native Power - Mastering CSS-in-JS in Lupine.js</h1><p>In modern frontend development, we often face a dilemma: suffer through the maintenance headache of separate CSS files, or import heavy CSS-in-JS libraries (like Styled-components or Emotion) that bloat your bundle size.</p>
<p><strong>Lupine.js takes a different path.</strong></p>
<p>It comes with an ultra-lightweight CSS-in-JS engine <strong>built right in</strong>. No extra dependencies required. It allows you to write styles comfortably within your components, supporting nesting, media queries, and keyframe animations\u2014all with incredible runtime efficiency.</p>
<p>Let&#39;s dive into how it works and how to use it elegantly in your projects.</p>
<p><img src="/lupine.js/assets/css-in-js.png" alt="Lupine.js CSS-in-JS"></p>
<h2 id="1-say-goodbye-to-classname-hell"><a class="header-anchor" href="#1-say-goodbye-to-classname-hell">#</a>1. Say Goodbye to ClassName Hell</h2><p>Traditional CSS development often involves constant context switching between <code>.css</code> files and <code>.tsx</code> files, struggling to invent unique class names. In Lupine.js, everything stays within the component.</p>
<p>Simply define a plain object and pass it to the <code>css</code> prop:</p>
<pre><code class="language-tsx">const MyButton = () =&gt; {
  const btnStyle = {
    backgroundColor: &#39;#0070f3&#39;,
    color: &#39;white&#39;,
    padding: &#39;10px 20px&#39;,
    borderRadius: &#39;5px&#39;,
    border: &#39;none&#39;,
    cursor: &#39;pointer&#39;,

    // Nesting like SCSS!
    &#39;&amp;:hover&#39;: {
      backgroundColor: &#39;#0051a2&#39;,
    },

    // Pseudo-elements? Easy.
    &#39;&amp;::before&#39;: {
      content: &#39;&quot;\u{1F680} &quot;&#39;,
    },
  };

  return &lt;button css={btnStyle}&gt;Launch&lt;/button&gt;;
};
</code></pre>
<p>Lupine automatically generates a unique Class ID (like <code>.L12345</code>) for you and injects the styles. You never have to worry about global namespace collisions again.</p>
<h2 id="2-powerful-nesting-just-like-scss"><a class="header-anchor" href="#2-powerful-nesting-just-like-scss">#</a>2. Powerful Nesting (Just like SCSS)</h2><p>Inspired by SCSS/Less, Lupine&#39;s style engine fully supports the powerful <code>&amp;</code> parent selector.</p>
<h3 id="selecting-children"><a class="header-anchor" href="#selecting-children">#</a>Selecting Children</h3><p>Stop writing long, fragile selector chains like <code>div &gt; span &gt; a</code>:</p>
<pre><code class="language-tsx">const cardStyle = {
  padding: &#39;20px&#39;,
  boxShadow: &#39;0 4px 14px rgba(0,0,0,0.1)&#39;,

  // Only applies to h3 tags INSIDE this component
  h3: {
    marginTop: 0,
    color: &#39;#333&#39;,
  },

  // Select specific classes
  &#39;.description&#39;: {
    color: &#39;#666&#39;,
    fontSize: &#39;14px&#39;,
  },
};

&lt;div css={cardStyle}&gt;
  &lt;h3&gt;Title&lt;/h3&gt;
  &lt;p class=&#39;description&#39;&gt;This is the description...&lt;/p&gt;
&lt;/div&gt;;
</code></pre>
<h3 id="combined-selectors"><a class="header-anchor" href="#combined-selectors">#</a>Combined Selectors</h3><p>This is incredibly useful for handling complex component states:</p>
<pre><code class="language-tsx">const itemStyle = {
  color: &#39;#888&#39;,

  // When it also has the .active class
  &#39;&amp;.active&#39;: {
    color: &#39;#0070f3&#39;,
    fontWeight: &#39;bold&#39;,
  },
};
</code></pre>
<h2 id="3-responsive-design-co-located-media-queries"><a class="header-anchor" href="#3-responsive-design-co-located-media-queries">#</a>3. Responsive Design: Co-located Media Queries</h2><p>In Lupine, media queries aren&#39;t code blocks that live far away from your component logic. You can write them right next to the properties they affect.</p>
<pre><code class="language-tsx">const responsiveBox = {
  width: &#39;100%&#39;,
  padding: &#39;20px&#39;,
  backgroundColor: &#39;lightblue&#39;,

  // Styles for desktop
  &#39;@media (min-width: 768px)&#39;: {
    width: &#39;50%&#39;, // Becomes half width on larger screens
    backgroundColor: &#39;lightgreen&#39;,

    // You can even nest inside media queries!
    &#39;&amp;:hover&#39;: {
      backgroundColor: &#39;green&#39;,
    },
  },
};
</code></pre>
<p>This co-location makes the logic of &quot;how this component behaves on different screens&quot; highly cohesive and delightful to maintain.</p>
<h2 id="4-animation-master-built-in-keyframes"><a class="header-anchor" href="#4-animation-master-built-in-keyframes">#</a>4. Animation Master: Built-in Keyframes</h2><p>Previously, defining a simple animation meant polluting your global CSS with <code>@keyframes</code>. Lupine lets you define them locally:</p>
<pre><code class="language-tsx">const spinnerStyle = {
  width: &#39;40px&#39;,
  height: &#39;40px&#39;,
  border: &#39;4px solid #f3f3f3&#39;,
  borderTop: &#39;4px solid #3498db&#39;,
  borderRadius: &#39;50%&#39;,

  // Define Keyframes directly
  &#39;@keyframes spin&#39;: {
    &#39;0%&#39;: { transform: &#39;rotate(0deg)&#39; },
    &#39;100%&#39;: { transform: &#39;rotate(360deg)&#39; },
  },

  // Reference the name defined above
  animation: &#39;spin 1s linear infinite&#39;,
};
</code></pre>
<p>The engine handles scoping automatically, so your <code>spin</code> animation will never clash with another component&#39;s animation of the same name.</p>
<h2 id="5-dynamic-style-updates"><a class="header-anchor" href="#5-dynamic-style-updates">#</a>5. Dynamic Style Updates</h2><p>Since it&#39;s CSS-in-JS, it shouldn&#39;t just be static\u2014it needs to handle dynamic changes. Lupine provides a low-level <code>updateStyles</code> API that allows you to modify styles programmatically.</p>
<blockquote>
<p><strong>Note</strong>: For simple dynamic changes (like toggles or theme switches), simply toggling a <code>class</code> or using inline <code>style={{ ... }}</code> is usually preferred. But when you need to dynamically update <strong>pseudo-classes</strong> (like hover colors) or <strong>media queries</strong>, <code>updateStyles</code> is your best friend.</p>
</blockquote>
<pre><code class="language-tsx">import { updateStyles, RefProps } from &#39;lupine.web&#39;;

const DynamicComponent = () =&gt; {
  // Define initial style object
  const css: any = {
    color: &#39;blue&#39;,
    &#39;&amp;:hover&#39;: { color: &#39;darkblue&#39; }, // !!! Dynamic hover color, impossible with inline styles !!!
  };

  const ref: RefProps = { id: &#39;&#39; }; // Used to capture the unique ID generated by Lupine

  const toggleTheme = () =&gt; {
    // Modify the style object
    css.color = &#39;red&#39;;
    css[&#39;&amp;:hover&#39;].color = &#39;darkred&#39;;

    // Apply updates
    // ref.id gets the ID (e.g., L123), updateStyles finds the &lt;style&gt; tag and updates it
    updateStyles(\`\${ref.id}\`, css);
  };

  return (
    &lt;div ref={ref} css={css} onClick={toggleTheme}&gt;
      Click me to change theme (including hover!)
    &lt;/div&gt;
  );
};
</code></pre>
<h2 id="6-global-styles-bindglobalstyle"><a class="header-anchor" href="#6-global-styles-bindglobalstyle">#</a>6. Global Styles: bindGlobalStyle</h2><p>While component-scoping is great, sometimes you really do need global styles (like Reset CSS or global font definitions). <code>bindGlobalStyle</code> ensures your global styles are injected only once, even if the component is rendered multiple times.</p>
<pre><code class="language-tsx">import { bindGlobalStyle } from &#39;lupine.web&#39;;

// Define global utility classes
const globalUtils = {
  &#39;.text-center&#39;: { textAlign: &#39;center&#39; },
  &#39;.flex-center&#39;: { display: &#39;flex&#39;, justifyContent: &#39;center&#39; },
};

// Inject into &lt;head&gt; with ID &#39;global-utils&#39;
bindGlobalStyle(&#39;global-utils&#39;, globalUtils);
</code></pre>
<h2 id="7-the-traditionalist-importing-css-files"><a class="header-anchor" href="#7-the-traditionalist-importing-css-files">#</a>7. The Traditionalist: Importing .css Files</h2><p>Of course, Lupine.js hasn&#39;t forgotten the most basic need. If you have a massive legacy project to migrate, or you simply prefer writing standard <code>.css</code> files, that&#39;s completely fine.</p>
<p>You can import CSS files directly in any <code>.tsx</code> file:</p>
<pre><code class="language-tsx">// In your entry file, like index.tsx
import &#39;./styles/global.css&#39;;
import &#39;./styles/app.css&#39;;

// Order matters: styles in global.css will be loaded first
</code></pre>
<p>The build system automatically extracts all imported CSS and bundles them into a single file. For production builds, Lupine automatically injects a tag like <code>&lt;link rel=&quot;stylesheet&quot; href=&quot;/index.css?t=...&quot; /&gt;</code> into your <code>index.html</code>, ensuring your styles are correctly loaded and cached.</p>
<h2 id="conclusion"><a class="header-anchor" href="#conclusion">#</a>Conclusion</h2><p>Lupine.js&#39;s CSS-in-JS engine isn&#39;t trying to replace every way of writing CSS. Instead, it offers a choice that is <strong>burden-free, high-performance, and developer-friendly</strong>.</p>
<ul>
<li><strong>Zero Dependencies</strong>: No need to install anything extra.</li>
<li><strong>High Performance</strong>: Styles can be generated during SSR, eliminating FOUC.</li>
<li><strong>Full Featured</strong>: Nesting, media queries, and animations are all there.</li>
<li><strong>Dev Experience</strong>: Strong TypeScript support means you get autocomplete for your CSS.</li>
</ul>
<p>Next time you build a UI, try defining <code>const css = { ... }</code> directly in your component and experience the fluid, &quot;native&quot; feel of Lupine.js!</p>
`;var eu=`<h1 id="10-minutes-build-a-stunning-personal-cv-website-with-markdown"><a class="header-anchor" href="#10-minutes-build-a-stunning-personal-cv-website-with-markdown">#</a>10 Minutes! Build a Stunning Personal CV Website with Markdown</h1><p>Finding a good job starts with a great CV. If you can turn that CV into a professional personal website, it&#39;s even better and sure to catch a recruiter&#39;s eye.</p>
<p>This article introduces how to use the <strong>CV Starter</strong> template provided by the <strong>Lupine.js</strong> framework to generate a beautiful, responsive resume website just by writing simple Markdown files. It comes with black and white theme switching, multi-language support, and can be <strong>hosted for free on GitHub Pages</strong>.</p>
<p><img src="/lupine.js/assets/cv-generator.png" alt="Lupine.js CV Starter"></p>
<p>To give you a better idea of what you can build, we have prepared a complete demo project. You can visit the repository or fork it directly as your starting point:</p>
<ul>
<li><strong>Source Repository</strong>: <a href="https://github.com/uuware/lupine-template-cv-starter">https://github.com/uuware/lupine-template-cv-starter</a></li>
</ul>
<p>You can also view the live demo here:</p>
<ul>
<li><strong>Live Demo</strong>: <a href="https://uuware.github.io/lupine-template-cv-starter/">https://uuware.github.io/lupine-template-cv-starter/</a></li>
</ul>
<h2 id="why-choose-lupine-cv-starter"><a class="header-anchor" href="#why-choose-lupine-cv-starter">#</a>Why Choose Lupine CV Starter?</h2><ul>
<li><strong>Minimalist Markdown</strong>: Focus on content, writing your CV just like writing a document.</li>
<li><strong>Beautiful Design</strong>: A fresh and professional default theme that supports both <strong>Light</strong> and <strong>Dark</strong> modes.</li>
<li><strong>Multi-language Support</strong>: Easily build bilingual resumes to show your international perspective.</li>
<li><strong>Mobile Responsive</strong>: Perfectly adapted for mobile desktops, displaying elegantly anytime, anywhere.</li>
<li><strong>Free Hosting</strong>: Pure static pages that can be deployed directly to GitHub Pages with zero cost.</li>
</ul>
<h2 id="quick-start"><a class="header-anchor" href="#quick-start">#</a>\u{1F680} Quick Start</h2><h3 id="1-create-project"><a class="header-anchor" href="#1-create-project">#</a>1. Create Project</h3><p>Initialize your CV project with just one command:</p>
<pre><code class="language-bash">npx create-lupine@latest my-cv
</code></pre>
<p>Select the <strong><code>cv-starter</code></strong> template when prompted.</p>
<h3 id="2-start-preview"><a class="header-anchor" href="#2-start-preview">#</a>2. Start Preview</h3><p>Enter the project directory and start the local development server:</p>
<pre><code class="language-bash">cd my-cv
npm install
npm run dev
</code></pre>
<p>Now, open your browser and you&#39;ll see a complete resume prototype containing <strong>Profile, Experience, Projects, Skills, and Education</strong> sections!</p>
<h2 id="customize-your-cv"><a class="header-anchor" href="#customize-your-cv">#</a>\u{1F4DD} Customize Your CV</h2><p>The template has already pre-set a standard resume structure for you; you only need to add, delete, or modify it according to your situation.</p>
<h3 id="modify-content"><a class="header-anchor" href="#modify-content">#</a>Modify Content</h3><p>All content is located in the <code>web/markdown</code> directory.</p>
<ul>
<li><code>zh/</code>: Chinese version content</li>
<li><code>en/</code>: English version content</li>
</ul>
<p>You can modify the Markdown files directly. Even better, you can carefully write just one language version (like English) and <strong>let AI help you translate it into another language</strong>. Current AI is very good at handling Markdown formats and translation quality is usually high, saving you a lot of time.</p>
<h3 id="manage-directory-sidebar"><a class="header-anchor" href="#manage-directory-sidebar">#</a>Manage Directory &amp; Sidebar</h3><p>When you add or delete a page (e.g., adding an &quot;Open Source&quot; section), you need to tell the website how to display the sidebar navigation.</p>
<p>Open the <code>index.md</code> file under the language root directory (e.g., <code>web/markdown/en/index.md</code>) and modify the <code>sidebar</code> configuration:</p>
<pre><code class="language-yaml">sidebar:
  - text: Details
    items:
      - /en/01-experience/index
      - /en/02-projects/index
      - /en/03-skills/index
      - /en/04-education/index
      # - /en/05-open-source/index  &lt;-- New page
</code></pre>
<p>After saving the file, the browser page will update automatically. What you see is what you get.</p>
<h3 id="configure-top-navigation-optional"><a class="header-anchor" href="#configure-top-navigation-optional">#</a>Configure Top Navigation (Optional)</h3><p>Since resumes usually don&#39;t contain many pages, the template does not enable the top navigation menu by default. If you want to show navigation at the top of the page, you can add the <code>nav</code> configuration in <code>index.md</code>:</p>
<pre><code class="language-yaml">nav:
  - text: Experience
    link: /en/01-experience/index
  - text: Projects
    link: /en/02-projects/index
</code></pre>
<p>This way, your configured menu items will appear on the left side of the Header.</p>
<h3 id="personalization-settings"><a class="header-anchor" href="#personalization-settings">#</a>Personalization Settings</h3><p>In the Frontmatter of <code>index.md</code>, you can make more personalized settings.</p>
<h4 id="github-link"><a class="header-anchor" href="#github-link">#</a>GitHub Link</h4><p>The right side of the Header shows the GitHub project link by default. If you want to modify or hide it:</p>
<pre><code class="language-yaml"># Modify link
github-title: View on GitHub
github-link: https://github.com/yourusername/my-cv
# Or delete these two lines directly to hide
</code></pre>
<h4 id="custom-styles"><a class="header-anchor" href="#custom-styles">#</a>Custom Styles</h4><p>Want to change the theme color? Want to adjust the sidebar width? No problem! You can directly override CSS variables via the <code>styles</code> attribute in <code>index.md</code>:</p>
<pre><code class="language-yaml">styles:
  &#39;:root&#39;: { &#39;--primary-accent-color&#39;: &#39;#0ac92a&#39; } # Change primary color to green
  # body: { font-family: &#39;Inter&#39;, sans-serif; }    # Change global font
</code></pre>
<p>For more style configurations, please refer to <a href="https://uuware.github.io/lupine.js/en/articles/introduce-lupine.press">this introduction about Lupine.Press</a>.</p>
<h2 id="conclusion"><a class="header-anchor" href="#conclusion">#</a>Conclusion</h2><p>Building your CV website with Lupine.js is not just about showcasing your skills\u2014it&#39;s a statement of your passion for technology. If you find this template helpful or interesting, we&#39;d love your support! Please consider giving us a star on GitHub \u2B50\uFE0F</p>
<p>\u{1F449} <strong><a href="https://github.com/uuware/lupine.js">https://github.com/uuware/lupine.js</a></strong></p>
<p>Wish you get your dream Offer soon!</p>
`;var tu=`<p>Building a modern web application in 2026 often feels like choosing between &quot;heavy &amp; powerful&quot; (Next.js, Remix) or &quot;light &amp; limited&quot; (Vanilla JS, micro-libraries). But what if you could have the best of both worlds?</p>
<p>Meet <strong>Lupine.js</strong> \u2014 a <strong>7kb</strong> (gzipped) full-stack framework that brings Server-Side Rendering (SSR), CSS-in-JS, and a React-like TSX experience without the massive bundle size.</p>
<p>In this article, I&#39;ll show you how to build a lightning-fast, SEO-ready web app using Lupine.js.</p>
<p><img src="/lupine.js/assets/ssr.png" alt="Lupine.js Architecture"></p>
<h2 id="why-lupine-js"><a class="header-anchor" href="#why-lupine-js">#</a>Why Lupine.js?</h2><ul>
<li><strong>\u26A1 Blazing Fast</strong>: No Virtual DOM overhead. Direct DOM manipulation with intelligent binding.</li>
<li><strong>\u{1FAB6} Tiny Footprint</strong>: ~7kb gzipped for a fully functional &quot;Hello World&quot; with SSR and Routing.</li>
<li><strong>\u{1F9E9} React-like Syntax</strong>: Uses JSX/TSX. If you know React, you already know 90% of Lupine.</li>
<li><strong>\u{1F578}\uFE0F Native SSR</strong>: Server-Side Rendering is a first-class citizen, not an afterthought. SEO is automatic.</li>
<li><strong>\u{1F3A8} Built-in CSS-in-JS</strong>: Scoped styles, nesting, and media queries without extra libraries.</li>
</ul>
<h2 id="1-get-started-in-seconds"><a class="header-anchor" href="#1-get-started-in-seconds">#</a>1. Get Started in Seconds</h2><p>Lupine.js provides a CLI tool to scaffold your project instantly.</p>
<pre><code class="language-bash">npx create-lupine@latest my-app
cd my-app
npm install
npm run dev
</code></pre>
<p>Visit <code>http://localhost:11080</code> and you&#39;ll see your server-rendered app running.</p>
<h2 id="2-the-hello-world-that-renders-on-the-server"><a class="header-anchor" href="#2-the-hello-world-that-renders-on-the-server">#</a>2. The &quot;Hello World&quot; (That Renders on the Server)</h2><p>Lupine.js components look familiar. Here is a simple counter component (<code>src/pages/home.tsx</code>):</p>
<pre><code class="language-tsx">import { HtmlVar, CssProps } from &#39;lupine.web&#39;;

export const HomePage = () =&gt; {
  // 1. Reactive State (Signals)
  // &#39;0&#39; is the initial value.
  const count = new HtmlVar(&#39;0&#39;);

  // 2. CSS-in-JS (Built-in!)
  const css: CssProps = {
    textAlign: &#39;center&#39;,
    padding: &#39;50px&#39;,
    h1: {
      color: &#39;#333&#39;,
      fontSize: &#39;2.5rem&#39;,
    },
    button: {
      padding: &#39;10px 20px&#39;,
      fontSize: &#39;1.2rem&#39;,
      cursor: &#39;pointer&#39;,
      &#39;&amp;:hover&#39;: {
        backgroundColor: &#39;#eee&#39;,
      },
    },
  };

  return (
    &lt;div css={css}&gt;
      &lt;h1&gt;Hello Lupine.js!&lt;/h1&gt;
      &lt;p&gt;Current Count: {count.node}&lt;/p&gt;

      {/* Direct DOM update, no VDOM diffing */}
      &lt;button
        onClick={() =&gt; {
          const current = Number(count.value);
          count.value = (current + 1).toString();
        }}
      &gt;
        Increment
      &lt;/button&gt;
    &lt;/div&gt;
  );
};
</code></pre>
<h3 id="what-s-happening-here"><a class="header-anchor" href="#what-s-happening-here">#</a>What&#39;s happening here?</h3><ol>
<li><strong><code>HtmlVar</code></strong>: This is Lupine&#39;s version of Signals. It binds directly to the text node. When you update <code>count.value</code>, only that specific text node updates. No re-rendering of the component!</li>
<li><strong><code>css</code> prop</strong>: Styles are scoped automatically. SSR injects the critical CSS into the <code>&lt;head&gt;</code> so there&#39;s <strong>no Flash of Unstyled Content (FOUC)</strong>.</li>
</ol>
<h2 id="3-zero-config-seo-with-ssr"><a class="header-anchor" href="#3-zero-config-seo-with-ssr">#</a>3. Zero-Config SEO with SSR</h2><p>One of the biggest pain points in modern SPAs is SEO. Lupine handles this natively. You don&#39;t need <code>react-helmet</code> or complex layouts.</p>
<pre><code class="language-tsx">import { MetaData, PageProps } from &#39;lupine.web&#39;;

export const ProductPage = async (props: PageProps) =&gt; {
  // 1. Fetch data (runs on Server during SSR, or Client during navigation)
  // Note: Standard fetch works!
  const product = await fetch(\`https://api.example.com/products/\${props.urlParameters[&#39;id&#39;]}\`).then((res) =&gt;
    res.json()
  );

  return (
    &lt;div&gt;
      {/* 2. Define SEO Metadata directly in the component */}
      &lt;MetaData property=&#39;og:title&#39; content={product.name} /&gt;
      &lt;MetaData property=&#39;og:description&#39; content={product.description} /&gt;
      &lt;MetaData property=&#39;og:image&#39; content={product.imageUrl} /&gt;

      &lt;h1&gt;{product.name}&lt;/h1&gt;
      &lt;p&gt;{product.description}&lt;/p&gt;
    &lt;/div&gt;
  );
};
</code></pre>
<p>When a crawler (Googlebot, Twitter card) hits this URL, Lupine&#39;s server renders the HTML with all these meta tags populated <strong>before</strong> sending it back.</p>
<h2 id="4-powerful-routing"><a class="header-anchor" href="#4-powerful-routing">#</a>4. Powerful Routing</h2><p>Lupine&#39;s <code>PageRouter</code> supports nested routes, middleware, and layouts out of the box.</p>
<pre><code class="language-tsx">import { PageRouter, bindRouter } from &#39;lupine.web&#39;;

const router = new PageRouter();

// Middleware (e.g., Auth check)
router.setFilter(async (props) =&gt; {
  // Check auth logic...
  return null; // continue
});

// Route Definitions
router.use(&#39;/home&#39;, HomePage);
router.use(&#39;/product/:id&#39;, ProductPage);
router.use(&#39;*&#39;, NotFoundPage);

// Bind to app
bindRouter(router);
</code></pre>
<h2 id="conclusion"><a class="header-anchor" href="#conclusion">#</a>Conclusion</h2><p>Lupine.js isn&#39;t trying to replace React for massive enterprise ecosystem apps. But for <strong>blogs, landing pages, dashboards, and innovative web apps</strong> where speed and bundle size matter, it&#39;s a breath of fresh air.</p>
<p>It brings the <strong>Developer Experience (DX) of 2026</strong> back to the <strong>Performance of 2010</strong>.</p>
<p><strong>Give it a try and let me know what you think!</strong></p>
<hr>
<p>\u{1F517} <strong>Github</strong>: <a href="https://github.com/uuware/lupine.js">https://github.com/uuware/lupine.js</a>
\u2B50 <strong>Star us if you like lightweight web tech!</strong></p>
`;var ou=`<h1 id="introducing-lupine-js-the-unreasonably-efficient-web-framework"><a class="header-anchor" href="#introducing-lupine-js-the-unreasonably-efficient-web-framework">#</a>Introducing Lupine.js: The &quot;Unreasonably&quot; Efficient Web Framework</h1><p>In a world dominated by massive meta-frameworks and complex build chains, <strong>Lupine.js</strong> asks a simple question: <em>What if we could have the power of a modern full-stack framework without the bloat?</em></p>
<p>Lupine.js is a <strong>lightweight (7kb gzipped)</strong>, <strong>full-stack</strong> web framework that combines a React-like frontend with an Express-like backend. It is designed from scratch for speed, simplicity, and efficiency.</p>
<p><img src="/lupine.js/assets/og-image.png" alt="Lupine.js"></p>
<h2 id="why-lupine-js"><a class="header-anchor" href="#why-lupine-js">#</a>Why Lupine.js?</h2><h3 id="1-extremely-lightweight-frontend"><a class="header-anchor" href="#1-extremely-lightweight-frontend">#</a>1. \u{1FAB6} Extremely Lightweight Frontend</h3><p>The <code>lupine.web</code> frontend package is tiny\u2014just <strong>7kb gzipped</strong>. Yet, it retains the developer experience you know and love: <strong>TSX syntax</strong> (React JSX), components, and hooks. There is no heavy runtime to download, meaning your pages load instantly even on slow connections.</p>
<h3 id="2-built-in-server-side-rendering-ssr"><a class="header-anchor" href="#2-built-in-server-side-rendering-ssr">#</a>2. \u26A1 Built-in Server-Side Rendering (SSR)</h3><p>Most frameworks treat SSR as an add-on. In Lupine, SSR is a <strong>first-class citizen</strong>. The <code>lupine.api</code> backend is optimized to render your frontend pages on the server automatically.</p>
<ul>
<li><strong>No FOUC</strong>: Critical CSS is injected server-side.</li>
<li><strong>Zero-Config SEO</strong>: Meta tags (<code>og:image</code>, <code>description</code>) are calculated before the page leaves the server.</li>
<li><strong>Sharing Ready</strong>: Your links look great on Twitter/Facebook out of the box.</li>
</ul>
<h3 id="3-native-css-in-js-engine"><a class="header-anchor" href="#3-native-css-in-js-engine">#</a>3. \u{1F3A8} Native CSS-in-JS Engine</h3><p>Say goodbye to configuring PostCSS, Tailwind, or styled-components. Lupine includes a powerful CSS-in-JS engine built right in.</p>
<ul>
<li><strong>Scoped Styles</strong>: Styles are automatically scoped to your component.</li>
<li><strong>Nesting</strong>: Support for <code>.parent &amp;</code> syntax.</li>
<li><strong>Performance</strong>: Styles are extracted and injected efficiently during SSR.</li>
</ul>
<pre><code class="language-tsx">const Button = () =&gt; {
  const css = {
    backgroundColor: &#39;#0ac92a&#39;,
    &#39;&amp;:hover&#39;: {
      backgroundColor: &#39;#08a823&#39;,
    },
  };
  return &lt;button css={css}&gt;Click Me&lt;/button&gt;;
};
</code></pre>
<h3 id="4-full-stack-in-one-place"><a class="header-anchor" href="#4-full-stack-in-one-place">#</a>4. \u{1F680} Full-Stack in One Place</h3><p>Lupine isn&#39;t just a frontend library; it&#39;s a complete app solution.</p>
<ul>
<li><strong>Backend (<code>lupine.api</code>)</strong>: An efficient, minimalist Node.js framework similar to Express.</li>
<li><strong>Frontend (<code>lupine.web</code>)</strong>: A reactive UI library.</li>
<li><strong>Dev Experience</strong>: Run <code>npm run dev</code> and debug both frontend and backend in a single VS Code session.</li>
</ul>
<h2 id="quick-start"><a class="header-anchor" href="#quick-start">#</a>Quick Start</h2><p>Ready to give it a try? You can scaffold a new project in seconds.</p>
<h3 id="step-1-create-a-project"><a class="header-anchor" href="#step-1-create-a-project">#</a>Step 1: Create a Project</h3><p>Use our CLI tool to create a new app.</p>
<pre><code class="language-bash">npx create-lupine@latest my-awesome-app
</code></pre>
<h3 id="step-2-run-it"><a class="header-anchor" href="#step-2-run-it">#</a>Step 2: Run it</h3><p>Enter the directory and start the dev server.</p>
<pre><code class="language-bash">cd my-awesome-app
npm install
npm run dev
</code></pre>
<p>Visit <code>http://localhost:11080</code> and you&#39;ll see your first Lupine app running!</p>
<h2 id="code-frequency-activity"><a class="header-anchor" href="#code-frequency-activity">#</a>Code Frequency &amp; Activity</h2><p>Lupine is actively developed. You can check our code frequency and contributions directly on GitHub:
\u{1F449} <a href="https://github.com/uuware/lupine.js">https://github.com/uuware/lupine.js</a></p>
<h2 id="conclusion"><a class="header-anchor" href="#conclusion">#</a>Conclusion</h2><p>Lupine.js is perfect for developers who want:</p>
<ul>
<li><strong>Control</strong>: Understand every part of your stack.</li>
<li><strong>Speed</strong>: Deliver the fastest possible experience to users.</li>
<li><strong>Simplicity</strong>: No hidden magic, just clean code.</li>
</ul>
<p>Give <strong>Lupine.js</strong> a star on GitHub and try it for your next project!</p>
`;var nu=`<h1 id="lupine-press-built-for-doc-speed"><a class="header-anchor" href="#lupine-press-built-for-doc-speed">#</a>Lupine.Press: Built for Doc Speed</h1><p>Writing documentation shouldn&#39;t be painful. But in the current ecosystem, we often have to choose between &quot;complex configuration&quot; and &quot;ugly default styles&quot;.</p>
<p><strong>Lupine.Press</strong> is here to break this deadlock.</p>
<p>It is a documentation framework built on <strong>Lupine.js</strong>, inheriting the latter&#39;s <strong>&quot;ultra-lightweight&quot;</strong> and <strong>&quot;high-performance&quot;</strong> DNA. It lets you build professional, responsive, and multi-language documentation sites with simple Markdown.</p>
<p><img src="/lupine.js/assets/lupine.press.png" alt="Lupine.Press"></p>
<p>To give you a better idea of what you can build, we have prepared a complete demo project. You can visit the repository or fork it directly as your starting point:</p>
<ul>
<li><strong>Source Repository</strong>: <a href="https://github.com/uuware/lupine-template-doc-starter">https://github.com/uuware/lupine-template-doc-starter</a></li>
</ul>
<p>You can also view the live demo here:</p>
<ul>
<li><strong>Live Demo</strong>: <a href="https://uuware.github.io/lupine-template-doc-starter/">https://uuware.github.io/lupine-template-doc-starter/</a></li>
</ul>
<h2 id="why-choose-lupine-press"><a class="header-anchor" href="#why-choose-lupine-press">#</a>Why Choose Lupine.Press?</h2><h3 id="1-incredible-speed"><a class="header-anchor" href="#1-incredible-speed">#</a>1. \u26A1 Incredible Speed</h3><p>Need I say more? Based on the Lupine.js core (only 7kb), your documentation site will load incredibly fast. No bloated hydration process, content appears instantly.</p>
<h3 id="2-markdown-driven-just-works"><a class="header-anchor" href="#2-markdown-driven-just-works">#</a>2. \u{1F4DD} Markdown-Driven Just Works</h3><p>In Lupine.Press, file structure is routing.</p>
<ul>
<li>Just drop a <code>guide.md</code> in the directory, and it automatically becomes the <code>/guide</code> page.</li>
<li>Sidebar configuration? Write it directly in the Frontmatter of <code>index.md</code>.</li>
<li>Multiple languages? Just create <code>en</code> and <code>zh</code> folders, and the framework automatically handles switching.</li>
</ul>
<h3 id="3-professional-design-out-of-the-box"><a class="header-anchor" href="#3-professional-design-out-of-the-box">#</a>3. \u{1F3A8} Professional Design Out-of-the-Box</h3><p>You don&#39;t need to know CSS to have a beautiful documentation site. The <code>PressFrame</code> component comes built-in with:</p>
<ul>
<li><strong>Responsive Sidebar</strong>: Automatically collapses on mobile.</li>
<li><strong>Light/Dark Mode</strong>: Follows system preference or switch manually.</li>
<li><strong>Syntax Highlighting</strong>: Built-in support.</li>
</ul>
<h3 id="4-flexible-extensibility"><a class="header-anchor" href="#4-flexible-extensibility">#</a>4. \u{1F6E0}\uFE0F Flexible Extensibility</h3><p>Although it&#39;s lightweight, it&#39;s not &quot;rigid&quot;. Because fundamentally it is a Lupine.js application. You can always:</p>
<ul>
<li>Embed React-style components within Markdown.</li>
<li>Use <code>bindGlobalStyle</code> to customize global styles.</li>
<li>Write custom layouts.</li>
</ul>
<h2 id="deployment-hack-spa-on-github-pages"><a class="header-anchor" href="#deployment-hack-spa-on-github-pages">#</a>Deployment Hack: SPA on GitHub Pages?</h2><p>As we all know, static hosting services like GitHub Pages are not friendly to Single Page Applications (SPA). Because they don&#39;t know that <code>/guide/started</code> should actually point to <code>index.html</code>, they often return a <strong>404</strong> directly.</p>
<p>Lupine.Press provides a clever solution.</p>
<h3 id="the-smart-404-html"><a class="header-anchor" href="#the-smart-404-html">#</a>The Smart <code>404.html</code></h3><p>We have built-in magical code in <code>docs/404.html</code>:</p>
<pre><code class="language-html">&lt;script type=&quot;text/javascript&quot;&gt;
  // Single Page Apps for GitHub Pages
  if (window.location.pathname.includes(&#39;/lupine.js/&#39;)) {
    // Take the current path as a parameter and redirect back to the homepage
    window.location.href = &#39;/lupine.js/?redirect=&#39; + window.location.pathname;
  }
&lt;/script&gt;
</code></pre>
<p>Combined with the frontend routing&#39;s automatic recovery logic, this means:</p>
<ol>
<li>User visits deep link <code>/guide/started</code>.</li>
<li>GitHub Pages returns the 404 page.</li>
<li>Script immediately redirects the page to <code>/?redirect=/guide/started</code>.</li>
<li>Lupine.js app starts, reads the <code>redirect</code> parameter, and seamlessly restores the page the user wanted to see.</li>
</ol>
<p><strong>The result: You can host a perfectly experienced SPA documentation site on GitHub Pages for free!</strong></p>
<h2 id="quick-start"><a class="header-anchor" href="#quick-start">#</a>Quick Start</h2><p>Get your documentation site with just one command:</p>
<pre><code class="language-bash">npx create-lupine@latest my-docs
# Select &#39;doc-starter&#39; template
</code></pre>
<p>Start the project:</p>
<pre><code class="language-bash">cd my-docs
npm install
npm run dev
</code></pre>
<p>Now, focus on writing!</p>
<h2 id="deploying-to-github-pages"><a class="header-anchor" href="#deploying-to-github-pages">#</a>Deploying to GitHub Pages</h2><p>Under <code>apps/[your-project-name]/web</code>, you will find a folder named <code>github-pj-name</code>. Please rename this folder to your actual GitHub repository name. Next, perform a global search for <code>github-pj-name</code> and replace all occurrences with your GitHub repository name. This is necessary because GitHub Pages uses the URL structure <code>[github-account].github.io/[github-repository-name]/</code>.</p>
<p>After editing your documentation, run <code>npm run build</code>. Once you confirm there are no compilation errors, run <code>npm run cp-docs</code>. This command copies the static files from the <code>build</code> directory to the <code>/docs</code> directory. Commit and push all changes to your GitHub repository. Then, go to your repository&#39;s Settings &gt; Pages. Under &quot;Build and deployment&quot;, select the <strong>main</strong> branch and the <strong>/docs</strong> folder, then click Save. You will soon be able to access your documentation site at <code>https://[github-account].github.io/[github-repository-name]/</code>.</p>
<p>If you want to display this link in the &quot;About&quot; section of your repository, click the settings icon (gear) next to &quot;About&quot;, and check &quot;Use your GitHub Pages website&quot;.</p>
`;var iu=`<p>Server-Side Rendering (SSR) has evolved from a &quot;nice-to-have&quot; for SEO into a critical component of modern web architecture for performance and user experience.</p>
<p>In 2026, developers usually reach for <strong>Next.js</strong> (for React) or <strong>Angular SSR</strong> (formerly Universal). But how do these heavyweights compare to a purpose-built lightweight framework like <strong>Lupine.js</strong>?</p>
<p>This article dives deep into the architectural differences, hydration costs, and developer experience of each.</p>
<p><img src="/lupine.js/assets/ssr.png" alt="Lupine.js Architecture"></p>
<h2 id="1-the-architecture-of-rendering"><a class="header-anchor" href="#1-the-architecture-of-rendering">#</a>1. The Architecture of Rendering</h2><h3 id="react-via-next-js-remix"><a class="header-anchor" href="#react-via-next-js-remix">#</a>React (via Next.js/Remix)</h3><p>React itself is a UI library. To get SSR, you typically use a meta-framework.</p>
<ul>
<li><strong>Mechanism</strong>: The server renders the component tree to an HTML string.</li>
<li><strong>The Cost</strong>: On the client, React must download the entire JS bundle, re-run the component logic to rebuild the Virtual DOM (VDOM), and then &quot;hydrate&quot; (attach event listeners) to the existing HTML.</li>
<li><strong>Evolution</strong>: React Server Components (RSC) have reduced the bundle size by keeping some logic on the server, but the complexity of streaming, suspense boundaries, and client/server component split is high.</li>
</ul>
<h3 id="angular-ssr-modern-hydration"><a class="header-anchor" href="#angular-ssr-modern-hydration">#</a>Angular (SSR / Modern Hydration)</h3><p>Angular has moved towards &quot;Destructive Hydration&quot; (replaying events) and partial hydration.</p>
<ul>
<li><strong>Mechanism</strong>: Angular serializes the state transfer (TransferState) so the client doesn&#39;t need to re-fetch data.</li>
<li><strong>The Cost</strong>: Historically, Angular SSR caused a &quot;flicker&quot; because it would destroy the server HTML and re-render. Modern versions use non-destructive hydration, but the framework overhead (Zone.js, dependency injection system) remains significant for the initial executing thread.</li>
</ul>
<h3 id="lupine-js"><a class="header-anchor" href="#lupine-js">#</a>Lupine.js</h3><p>Lupine takes a fundamentally different approach. It is designed as a <strong>Full-Stack Component Framework</strong> from line one.</p>
<ul>
<li><strong>Mechanism</strong>: The <code>serverSideRenderPage</code> function (in <code>lupine.api</code>) executes the component logic directly. It identifies &quot;slots&quot; for critical resources (CSS, Meta, Title).</li>
<li><strong>No VDOM</strong>: Lupine doesn&#39;t use a Virtual DOM. On the server, it concatenates strings efficiently. On the client, it binds directly to the DOM nodes.</li>
<li><strong>The Result</strong>: The server sends a fully styled HTML page. The client script (~7kb) loads and simply &quot;binds&quot; to the existing elements. There is no heavy &quot;re-calculation&quot; of a component tree because there is no VDOM to rebuild.</li>
</ul>
<h2 id="2-dealing-with-the-fouc-flash-of-unstyled-content"><a class="header-anchor" href="#2-dealing-with-the-fouc-flash-of-unstyled-content">#</a>2. Dealing with &quot;The FOUC&quot; (Flash of Unstyled Content)</h2><h3 id="the-problem"><a class="header-anchor" href="#the-problem">#</a>The Problem</h3><p>SSR HTML arrives first. Then functionality loads. Then styles load. If styles load late, the user sees a broken page for milliseconds (FOUC).</p>
<h3 id="react-next-js"><a class="header-anchor" href="#react-next-js">#</a>React / Next.js</h3><p>Next.js collects styles (e.g., from CSS Modules or Tailwind) and injects them. However, if using runtime CSS-in-JS (like older styled-components), there can be a performance penalty as styles are recalculated during hydration.</p>
<h3 id="lupine-js"><a class="header-anchor" href="#lupine-js">#</a>Lupine.js</h3><p>Lupine&#39;s <code>BindStyles</code> and <code>CssProps</code> engine collects all static and dynamic styles used during the server render pass.
It automatically generates a critical CSS block and injects it into the <code>&lt;head&gt;</code> of the initial HTML response.
<strong>Result</strong>: The page is paint-perfect from the very first byte. No JS is needed for the layout to look correct.</p>
<h2 id="3-data-fetching-hydration"><a class="header-anchor" href="#3-data-fetching-hydration">#</a>3. Data Fetching &amp; Hydration</h2><p>How do you get data from the DB to the screen?</p>
<h3 id="react-next-js-app-router"><a class="header-anchor" href="#react-next-js-app-router">#</a>React (Next.js App Router)</h3><pre><code class="language-tsx">// Server Component
async function Page() {
  const data = await db.query();
  return &lt;ClientComponent data={data} /&gt;;
}
</code></pre>
<ul>
<li><strong>Pros</strong>: Powerful co-location of data and UI.</li>
<li><strong>Cons</strong>: Rigid boundary between Server and Client components. You cannot use state or effects in Server Components.</li>
</ul>
<h3 id="lupine-js"><a class="header-anchor" href="#lupine-js">#</a>Lupine.js</h3><p>Lupine allows <code>async</code> components at the page level, which works seamlessly on both Server and Client (during SPA navigation).</p>
<pre><code class="language-tsx">// Works on Server (SSR) AND Client (SPA Transition)
export const ProductPage = async (props: PageProps) =&gt; {
  // SSR: Fetches on server, sends HTML.
  // CSR: Fetches on client, updates DOM.
  const data = await fetch(\`/api/products/\${props.urlParameters.id}\`);

  return &lt;div&gt;{data.title}&lt;/div&gt;;
};
</code></pre>
<ul>
<li><strong>Design Philosophy</strong>: &quot;Isomorphic Logic&quot;. You write one function. It runs efficiently in both environments without you thinking about &quot;serialization boundaries&quot; or &quot;client wrappers&quot;.</li>
</ul>
<h2 id="4-performance-bundle-size"><a class="header-anchor" href="#4-performance-bundle-size">#</a>4. Performance &amp; Bundle Size</h2><p>This is the starkest difference.</p>
<table>
<thead>
<tr>
<th align="left">Metric</th>
<th align="left">Next.js / React</th>
<th align="left">Angular</th>
<th align="left">Lupine.js</th>
</tr>
</thead>
<tbody><tr>
<td align="left"><strong>Hello World Size</strong></td>
<td align="left">~70kb - 200kb</td>
<td align="left">~100kb+</td>
<td align="left"><strong>~7kb</strong></td>
</tr>
<tr>
<td align="left"><strong>Hydration Strategy</strong></td>
<td align="left">VDOM Reconciliation</td>
<td align="left">Zone.js / Event Replay</td>
<td align="left"><strong>Direct Node Binding</strong></td>
</tr>
<tr>
<td align="left"><strong>Complexity</strong></td>
<td align="left">High (Server Actions, RSC)</td>
<td align="left">High (Modules, DI)</td>
<td align="left"><strong>Low (Functions, Signals)</strong></td>
</tr>
</tbody></table>
<h2 id="conclusion-when-to-use-what"><a class="header-anchor" href="#conclusion-when-to-use-what">#</a>Conclusion: When to use what?</h2><ul>
<li><strong>Choose React/Next.js</strong> if: You have a large team of React devs, need a massive ecosystem of third-party libraries, and Vercel integration is a priority.</li>
<li><strong>Choose Angular</strong> if: You are building enterprise-grade software with strict strict typing, dependency injection needs, and large teams.</li>
<li><strong>Choose Lupine.js</strong> if:<ul>
<li><strong>Performance is paramount.</strong> You want the fastest First Contentful Paint (FCP) possible.</li>
<li><strong>Simplicity matters.</strong> You don&#39;t want to configure Webpack, Babel, or complex routing middleware.</li>
<li><strong>SEO is critical.</strong> You want simple, predictable Meta tag handling.</li>
<li><strong>You want Full-Stack control.</strong> One framework for Backend and Frontend.</li>
</ul>
</li>
</ul>
<p>Lupine.js proves that you don&#39;t need a heavy framework to build a modern, high-performance SSR application in 2026. Sometimes, less truly is more.</p>
`;var ru=`<h1 id="api-reference"><a class="header-anchor" href="#api-reference">#</a>API Reference</h1><h2 id="lupine-api-backend"><a class="header-anchor" href="#lupine-api-backend">#</a>Lupine.api (Backend)</h2><h3 id="architecture-workflow"><a class="header-anchor" href="#architecture-workflow">#</a>\u{1F3D7}\uFE0F Architecture &amp; Workflow</h3><p>Lupine.js runs a single server instance that can serve multiple domains and applications simultaneously.</p>
<p><strong>1. App Definition</strong>
Apps are defined in the <code>.env</code> file via the <code>APPS</code> variable (e.g., <code>APPS=doc,demo.app</code>). Domain mapping is also configured here (e.g., <code>DOMAINS@demo.app=example.com</code>).</p>
<p><strong>2. Compilation</strong>
During build/dev, <code>dev-watch.js</code> reads <code>lupine.json</code> in each app directory to find <code>webEntryPoints</code> and compiles them.</p>
<p><strong>3. Request Flow</strong>
When a request arrives:</p>
<ol>
<li><strong>App Resolution</strong>: <code>AppHelper</code> identifies the target App based on the request hostname.</li>
<li><strong>Module Loading</strong>: It loads the corresponding <code>ApiModule</code> (defined in <code>api/src/index.ts</code>).</li>
<li><strong>Routing</strong>: The <code>RootApi</code> tries to match API routes. If no match, it falls back to <code>StaticServer</code>.</li>
</ol>
<p><strong>4. Static Server &amp; SSR</strong>
The <code>StaticServer</code>:</p>
<ul>
<li>Checks if a static file exists.</li>
<li>If NOT found, it triggers <strong>SSR</strong> (<code>serverSideRenderPage</code>).</li>
</ul>
<p>This ensures a single entry point seamlessly handles APIs, Static Assets, and SSR.</p>
<h3 id="apimodule"><a class="header-anchor" href="#apimodule">#</a>\u{1F4E1} ApiModule</h3><p>Main module for the backend service. Each app with a backend must implement an <code>ApiModule</code>.</p>
<pre><code class="language-typescript">import { ApiModule } from &#39;lupine.api&#39;;
import { RootApi } from &#39;./service/root-api&#39;;

export const apiModule = new ApiModule(new RootApi());
</code></pre>
<h3 id="rootapi-staticserver"><a class="header-anchor" href="#rootapi-staticserver">#</a>\u{1F333} RootApi &amp; StaticServer</h3><p>The <code>RootApi</code> is the entry point for your application&#39;s logic. It typically mounts your specific APIs and the <code>StaticServer</code> to handle file requests and SSR fallback.</p>
<pre><code class="language-typescript">// src/service/root-api.ts
import { IApiBase, ApiRouter, StaticServer } from &#39;lupine.api&#39;;

export class RootApi implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    this.mountRoutes();
  }

  protected mountRoutes() {
    // 1. Mount your App API
    this.router.use(&#39;/api&#39;, new Api().getRouter());

    // 2. Mount Static Server (Handles static files + SSR)
    // IMPORTANT: Must be last to catch non-API requests
    const staticServer = new StaticServer();
    this.router.use(&#39;*&#39;, staticServer.processRequest.bind(staticServer));
  }
}
</code></pre>
<h3 id="health-check-example"><a class="header-anchor" href="#health-check-example">#</a>\u{1F3E5} Health Check Example</h3><p>Here is a simple example of an API endpoint (e.g., for health checks).</p>
<pre><code class="language-typescript">// src/service/api.ts
import { IApiBase, ApiRouter, ServerRequest } from &#39;lupine.api&#39;;
import { ServerResponse } from &#39;http&#39;;

export class Api implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    this.router.use(&#39;/health-check&#39;, this.healthCheck.bind(this));
  }

  async healthCheck(req: ServerRequest, res: ServerResponse) {
    res.writeHead(200, { &#39;Content-Type&#39;: &#39;application/json&#39; });
    res.write(JSON.stringify({ status: &#39;OK&#39;, uptime: process.uptime() }));
    res.end();
    return true; // Return true to indicate request was handled
  }

  public getRouter() {
    return this.router;
  }
}
</code></pre>
`;var au=`<h1 id="css-in-js"><a class="header-anchor" href="#css-in-js">#</a>CSS-in-JS</h1><p>Lupine.js features a built-in, lightweight <strong>CSS-in-JS</strong> engine. It supports powerful features like nesting, pseudo-selectors, media queries, and scoped animations, all without needing external libraries like styled-components or emotion.</p>
<h2 id="1-basic-usage"><a class="header-anchor" href="#1-basic-usage">#</a>1. \u{1F423} Basic Usage</h2><p>You can pass a CSS object directly to the <code>css</code> prop of any element. Lupine will automatically generate a unique class ID, preventing style conflicts.</p>
<pre><code class="language-tsx">const MyComponent = () =&gt; {
  const css: CssProps = {
    // Basic properties use camelCase
    backgroundColor: &#39;#f0f0f0&#39;,
    padding: &#39;20px&#39;,
    borderRadius: &#39;8px&#39;,

    // Nested selectors
    h1: {
      color: &#39;blue&#39;,
    },

    // Pseudo-classes
    &#39;&amp;:hover&#39;: {
      backgroundColor: &#39;#e0e0e0&#39;,
    },
  };

  return (
    &lt;div css={css}&gt;
      &lt;h1&gt;Hello&lt;/h1&gt;
    &lt;/div&gt;
  );
};
</code></pre>
<h2 id="2-advanced-features"><a class="header-anchor" href="#2-advanced-features">#</a>2. \u{1F680} Advanced Features</h2><h3 id="2-1-nesting-parent-selector"><a class="header-anchor" href="#2-1-nesting-parent-selector">#</a>2.1 \u{1F38E} Nesting &amp; Parent Selector (<code>&amp;</code>)</h3><p>Similar to SCSS/Less, use <code>&amp;</code> to refer to the parent selector.</p>
<pre><code class="language-tsx">const css: CssProps = {
  color: &#39;black&#39;,

  // Target children
  &#39;.child&#39;: { fontWeight: &#39;bold&#39; },

  // Self state
  &#39;&amp;:hover&#39;: { color: &#39;red&#39; },

  // Multiple selectors
  &#39;&amp;:hover, &amp;.active&#39;: {
    border: &#39;1px solid blue&#39;,
  },
};
</code></pre>
<h3 id="2-2-scoping-with-dynamic-component-id"><a class="header-anchor" href="#2-2-scoping-with-dynamic-component-id">#</a>2.2 \u{1F6E1}\uFE0F Scoping with <code>&amp;</code> (Dynamic Component ID)</h3><p>Lupine uses a clever substitution system for <code>&amp;</code> (or <code>$</code>).</p>
<ol>
<li><p><strong>Prefixing</strong>: If a selector starts with <code>&amp;</code> (e.g., <code>&amp;-item</code>), it is effectively treating the component&#39;s unique ID as a prefix.</p>
<ul>
<li><code>&amp;-item</code> -&gt; <code>.LUPINE_ID-item</code></li>
<li>This is great for BEM-like naming without long manual names.</li>
</ul>
</li>
<li><p><strong>Replacement</strong>: If <code>&amp;</code> is used elsewhere (e.g., <code>.parent &amp;</code>), it inserts the unique ID there.</p>
</li>
</ol>
<pre><code class="language-tsx">// Using &quot;$-item&quot; or &quot;&amp;-item&quot; pattern for scoped classes
const css = {
  // Defines a scoped class like .L123-item
  &#39;&amp;-item&#39;: {
    color: &#39;gray&#39;,
  },

  // You can also reference it as .&amp;-item, meaning .L123 .L123-item (nested)
  &#39;.&amp;-item&#39;: {
    color: &#39;black&#39;, // stronger specificity if needed
  },
};

return (
  &lt;div css={css}&gt;
    {/* Apply the scoped class */}
    &lt;a class=&#39;&amp;-item&#39;&gt;Link&lt;/a&gt;
  &lt;/div&gt;
);
</code></pre>
<h3 id="2-3-one-line-multiple-definitions"><a class="header-anchor" href="#2-3-one-line-multiple-definitions">#</a>2.3 \u26A1 One-Line Multiple Definitions</h3><p>You can define multiple properties in one line for simpler syntax in some cases, or handle multiple selectors in one key.</p>
<pre><code class="language-tsx">const css = {
  // Multiple selectors sharing styles
  &#39;.header, .footer&#39;: {
    background: &#39;#333&#39;,
    color: &#39;white&#39;,
  },
};
</code></pre>
<h3 id="2-4-media-queries-media"><a class="header-anchor" href="#2-4-media-queries-media">#</a>2.4 \u{1F4F1} Media Queries (<code>@media</code>)</h3><p>Media queries can be nested <em>inside</em> the selector or used at the top level.</p>
<pre><code class="language-tsx">const css = {
  fontSize: &#39;16px&#39;,

  // Nested inside component logic
  &#39;@media (max-width: 600px)&#39;: {
    fontSize: &#39;14px&#39;,
    padding: &#39;10px&#39;,
  },
};
// Or use helper constants like [MediaQueryRange.DesktopAbove]
</code></pre>
<h3 id="2-5-keyframes-keyframes"><a class="header-anchor" href="#2-5-keyframes-keyframes">#</a>2.5 \u{1F3AC} Keyframes (<code>@keyframes</code>)</h3><p>Define animations locally within the component.</p>
<pre><code class="language-tsx">const css = {
  &#39;@keyframes slide-in&#39;: {
    &#39;0%&#39;: { transform: &#39;translateX(-100%)&#39; },
    &#39;100%&#39;: { transform: &#39;translateX(0)&#39; },
  },
  animation: &#39;slide-in 0.5s ease-out&#39;,
};
</code></pre>
<h2 id="3-global-styles-bindglobalstyle"><a class="header-anchor" href="#3-global-styles-bindglobalstyle">#</a>3. \u{1F30F} Global Styles (<code>bindGlobalStyle</code>)</h2><p>Sometimes you want styles that are <strong>reused</strong> or <strong>global</strong>, but you still want to define them in TypeScript/JS. <code>bindGlobalStyle</code> ensures the style is generated only once and injected into <code>&lt;head&gt;</code>, even if the component is used multiple times.</p>
<blockquote>
<p><strong>Ideal for:</strong> Animations, Utility classes, Reset CSS.</p>
</blockquote>
<pre><code class="language-tsx">import { bindGlobalStyle } from &#39;lupine.web&#39;;

const TextWave = () =&gt; {
  // 1. Define Style
  const css = {
    &#39;@keyframes wave&#39;: {
      /* ... */
    },
    &#39;.wave-text&#39;: { animation: &#39;wave 1s infinite&#39; },
  };

  // 2. Bind it globally with a unique key &#39;text-wave-style&#39;
  // This ensures it&#39;s only injected ONCE in the page
  bindGlobalStyle(&#39;text-wave-style&#39;, css);

  return (
    // 3. Use the classes defined above
    &lt;div class=&#39;text-wave-style&#39;&gt;
      &lt;span class=&#39;wave-text&#39;&gt;Hello&lt;/span&gt;
    &lt;/div&gt;
  );
};
</code></pre>
`;var su=`<h1 id="dashboard"><a class="header-anchor" href="#dashboard">#</a>Dashboard</h1><p>lupine.api includes a built-in extensible dashboard for managing your API services. The dashboard features a management sidebar on the left and a multi-tab content area on the right.</p>
<h2 id="features"><a class="header-anchor" href="#features">#</a>Features</h2><p>The dashboard provides comprehensive backend management capabilities, categorized as follows:</p>
<h3 id="1-database-management-db"><a class="header-anchor" href="#1-database-management-db">#</a>1. Database Management (DB)</h3><p>Tools for direct database manipulation, useful for debugging and maintenance.</p>
<ul>
<li><strong>Table List</strong>: Browse database tables and view data.</li>
<li><strong>Create Tables</strong>: Run preset scripts to initialize or repair database table structures.</li>
<li><strong>Run SQL</strong>: execute arbitrary SQL statements and view results in JSON format.</li>
</ul>
<h3 id="2-operations-server-management-access-server-info"><a class="header-anchor" href="#2-operations-server-management-access-server-info">#</a>2. Operations &amp; Server Management (Access &amp; Server Info)</h3><p>Core operations toolkit for remote management and monitoring.</p>
<h4 id="release-management"><a class="header-anchor" href="#release-management">#</a>Release Management</h4><p>Powerful tools for multi-node/multi-environment deployment.</p>
<ul>
<li><strong>Sync</strong>: Support synchronizing code or resources from a source environment (From) to a target environment (To).</li>
<li><strong>Full Stack Update</strong>: Selectively update Server (core), Api (logic), Env (variables), etc.</li>
<li><strong>Web Update</strong>: Independently update frontend resources by sub-folder.</li>
<li><strong>Controls</strong>:<ul>
<li><strong>Check</strong>: Verify update status.</li>
<li><strong>Refresh Cache</strong>: Refresh server cache (Remote/Local).</li>
<li><strong>Restart App</strong>: Restart the application (Remote/Local).</li>
<li><strong>Run Cmd</strong>: Execute Shell commands directly on the server.</li>
</ul>
</li>
<li><strong>Logs</strong>: View and download history logs of release operations.</li>
</ul>
<h4 id="utilities"><a class="header-anchor" href="#utilities">#</a>Utilities</h4><ul>
<li><strong>Tokens</strong>: Manage API access tokens.</li>
<li><strong>Shell</strong>: WebSocket-based online terminal for real-time server interaction.</li>
<li><strong>Resources</strong>: Browse, upload, and download files from the server filesystem.</li>
<li><strong>Config</strong>: View and hot-patch system runtime configurations.</li>
<li><strong>Performance</strong>: Monitor server metrics like CPU and Memory usage.</li>
</ul>
<h3 id="3-development-testing-test"><a class="header-anchor" href="#3-development-testing-test">#</a>3. Development &amp; Testing (Test)</h3><p>Tools for debugging components and UI during development.</p>
<ul>
<li><strong>Test Themes</strong>: Preview and test different UI theme configurations.</li>
<li><strong>Test Component</strong>: Test interaction and rendering of generic UI components.</li>
<li><strong>Test Animations</strong>: Demo and debug CSS/JS animations.</li>
<li><strong>Test Edit</strong>: Test rich text editor or form editing features.</li>
</ul>
<hr>
<h2 id="extension-development"><a class="header-anchor" href="#extension-development">#</a>Extension Development</h2><p>The Dashboard is highly extensible. Core logic resides in the <code>packages/lupine.api/admin</code> directory.</p>
<h3 id="menu-configuration"><a class="header-anchor" href="#menu-configuration">#</a>Menu Configuration</h3><p>Menus are configured via the <code>adminTopMenu</code> array in <code>admin-frame-helper.tsx</code>. You can easily add new menu items:</p>
<pre><code class="language-typescript">const myMenu = {
  id: &#39;my-feature&#39;,
  text: &#39;My Feature&#39;,
  items: [
    {
      id: &#39;my-page&#39;,
      text: &#39;My Page&#39;,
      js: () =&gt; this.addPanel(&#39;My Page&#39;, &lt;MyComponent /&gt;),
    },
  ],
};
</code></pre>
<h3 id="page-development"><a class="header-anchor" href="#page-development">#</a>Page Development</h3><p>Each management page is a standard <code>lupine.components</code> component. Use <code>AdminPanel</code> and <code>Tabs</code> components to manage the multi-tab experience.</p>
`;var lu=`<h2 id="icons-font-customization"><a class="header-anchor" href="#icons-font-customization">#</a>Icons Font Customization</h2><p>Lupine.js seamlessly integrates with my other independent project, <a href="https://github.com/uuware/icons-font-customization">Icons Font Customization</a>, to provide you with over 78,000 high-quality free icons.</p>
<p><a href="https://github.com/uuware/icons-font-customization">Icons Font Customization</a> is a powerful icon collection and tool that allows you to:</p>
<ul>
<li><strong>Massive Collection</strong>: Access over 78,000+ icons from sources like Font Awesome, Material Design, and more.</li>
<li><strong>Full Customization</strong>: Mix and match icons from different sources, selecting only what you truly need, thereby drastically reducing the font file size.</li>
<li><strong>Custom Styles</strong>: Adjust icon color, background, and size before generation.</li>
<li><strong>Automatic Generation</strong>: Generate font files (woff2, woff, ttf) and accompanying CSS/HTML with a single click.</li>
</ul>
<p>Please visit the project to view documentation and all available icons: <a href="https://github.com/uuware/icons-font-customization">Icons Font Customization</a>.</p>
`;var cu="";var du=`<h1 id="high-performance-list-rendering-editing"><a class="header-anchor" href="#high-performance-list-rendering-editing">#</a>High Performance List Rendering &amp; Editing</h1><p>Lupine.js adopts a unique <strong>&quot;Component-Level Rendering&quot;</strong> strategy that differs significantly from traditional Virtual DOM frameworks like React or Vue. This approach is particularly powerful for handling large lists and complex data grids (e.g., in Admin Panels).</p>
<h2 id="1-why-it-is-fast"><a class="header-anchor" href="#1-why-it-is-fast">#</a>1. \u26A1 Why it is Fast?</h2><p>In traditional frameworks (like React), when you update an item in a list:</p>
<ol>
<li>You call <code>setState</code>.</li>
<li>The framework re-renders the <strong>entire List component</strong>.</li>
<li>It runs a &quot;Diffing Algorithm&quot; to compare the new virtual tree of 100+ items against the old one.</li>
<li>Finally, it updates the DOM for the one changed item.</li>
</ol>
<p><strong>In Lupine.js, we skip steps 2 and 3 entirely.</strong></p>
<p>Because Lupine uses <strong>Manual Reactivity (<a href="javascript:lpPressLoad('/en/lupine.components/html-var')">HtmlVar</a>)</strong>, you can update a specific DOM element directly by setting <code>dom.value = &lt;&gt;...&lt;/&gt;</code>, without triggering a top-down re-render. This is similar to a highly optimized React component using <code>React.memo</code>, but it is the <strong>default behavior</strong> here, not an opt-in optimization.</p>
<h2 id="2-the-spot-update-strategy"><a class="header-anchor" href="#2-the-spot-update-strategy">#</a>2. \u{1F3AF} The &quot;Spot-Update&quot; Strategy</h2><p>Each row in your list acts as an isolated island. It holds its own <code>HtmlVar</code> and <code>ref</code>. When data changes, you only call <code>.value = ...</code> on that specific row&#39;s variable. The rest of the page remains static string HTML, costing <strong>zero</strong> performance overhead to maintain.</p>
<h3 id="benefits"><a class="header-anchor" href="#benefits">#</a>Benefits</h3><ul>
<li><strong>Zero Diffing Cost</strong>: Changing one row costs <code>O(1)</code>, not <code>O(N)</code> where N is the list size.</li>
<li><strong>Predictable Performance</strong>: No &quot;wasted renders&quot;.</li>
<li><strong>Low Memory Footprint</strong>: We don&#39;t maintain a heavy Virtual DOM tree in memory for the static parts of your list.</li>
</ul>
<hr>
<h2 id="3-code-example-editable-list"><a class="header-anchor" href="#3-code-example-editable-list">#</a>3. \u{1F4BB} Code Example: Editable List</h2><p>Here is how you implement a high-performance editable list.</p>
<h3 id="step-1-the-list-container-parent"><a class="header-anchor" href="#step-1-the-list-container-parent">#</a>\u{1F4E6} Step 1: The List Container (Parent)</h3><p>The parent component renders the list initially but does <em>not</em> need to re-render when a child changes.</p>
<pre><code class="language-tsx">// BookList.tsx
export const BookList = () =&gt; {
  // 1. Initial Data Load
  let items = getSampleData();

  // 2. Render Static List
  // Notice: We don&#39;t need a state for the whole list if we only edit items!
  return (
    &lt;div class=&#39;list&#39;&gt;
      {items.map((item) =&gt; (
        &lt;BookShowItem key={item.id} item={item} /&gt;
      ))}
    &lt;/div&gt;
  );
};
</code></pre>
<h3 id="step-2-the-optimized-row-child"><a class="header-anchor" href="#step-2-the-optimized-row-child">#</a>\u26A1 Step 2: The Optimized Row (Child)</h3><p>The child component wraps its content in <code>HtmlVar</code>. This allows it to &quot;redraw itself&quot; independently.</p>
<pre><code class="language-tsx">// BookShowItem.tsx
import { HtmlVar, RefProps } from &#39;lupine.components&#39;;

export const BookShowItem = (props: { item: SampleDataProps }) =&gt; {
  const ref: RefProps = { id: &#39;&#39; };

  // 1. Define the internal render logic
  const makeDom = (item: SampleDataProps) =&gt; (
    &lt;div class=&#39;row-box&#39;&gt;
      &lt;div&gt;Name: {item.name}&lt;/div&gt;
      &lt;button onClick={onEdit}&gt;Edit&lt;/button&gt;
    &lt;/div&gt;
  );

  // 2. Create a &quot;Reactive Box&quot; for this row
  const dom = new HtmlVar(makeDom(props.item));

  // 3. Update Logic: Only updates this specific DOM!
  const update = (newItem: SampleDataProps) =&gt; {
    // Manually trigger the update for this row ONLY
    dom.value = makeDom(newItem);
  };

  const onEdit = () =&gt; {
    // Show modal, get new data, then call update(newItem)
    showEditModal(props.item, (newItem) =&gt; {
      update(newItem);
    });
  };

  return (
    &lt;div ref={ref} class=&#39;sample-data-row&#39;&gt;
      {dom.node} {/* Using dom.node embeds the reactive slot */}
    &lt;/div&gt;
  );
};
</code></pre>
<h3 id="step-3-inline-editing-advanced"><a class="header-anchor" href="#step-3-inline-editing-advanced">#</a>\u270F\uFE0F Step 3: Inline Editing (Advanced)</h3><p>You can even swap the &quot;View Mode&quot; with &quot;Edit Mode&quot; completely for a single row, without touching others.</p>
<pre><code class="language-tsx">// Inside BookShowItem
const onToggleEdit = () =&gt; {
  if (isEditing) {
    dom.value = makeViewMode(item);
  } else {
    dom.value = makeEditMode(item);
  }
  isEditing = !isEditing;
};
</code></pre>
<h2 id="summary"><a class="header-anchor" href="#summary">#</a>Summary</h2><p>While this approach requires writing a bit more &quot;explicit&quot; code (defining <code>HtmlVar</code> and <code>makeDom</code>), it gives you <strong>control</strong> and <strong>performance</strong> that are hard to beat in heavy data applications. You are effectively acting as your own &quot;Compiler&quot;, telling the browser exactly what to update and when.</p>
`;var pu=`<h1 id="mobile-desktop-adaptation"><a class="header-anchor" href="#mobile-desktop-adaptation">#</a>Mobile &amp; Desktop Adaptation</h1><p>One of the core design philosophies of Lupine.js is &quot;One Codebase, Multiple Platforms.&quot; With built-in responsive design tools and components, you can easily build applications that adapt to Web, Mobile (iOS/Android), and Desktop (Electron).</p>
<h2 id="1-responsive-layout-media-query"><a class="header-anchor" href="#1-responsive-layout-media-query">#</a>1. Responsive Layout (Media Query)</h2><p><code>lupine.components</code> provides powerful media query tools to help you adjust layouts based on screen width.</p>
<h3 id="breakpoints"><a class="header-anchor" href="#breakpoints">#</a>Breakpoints</h3><p>The system predefines the following breakpoints (customizable in <code>MediaQueryMaxWidth</code>):</p>
<ul>
<li><strong>ExtraSmall</strong>: &lt; 480px</li>
<li><strong>Mobile</strong>: &lt; 767px (Grid: col-1)</li>
<li><strong>Tablet</strong>: &lt; 991px (Grid: col-1-md)</li>
<li><strong>Desktop</strong>: &lt; 1399px (Grid: col-1-lg)</li>
</ul>
<h3 id="usage-in-css-in-js"><a class="header-anchor" href="#usage-in-css-in-js">#</a>Usage in CSS-in-JS</h3><p>You can use <code>MediaQueryRange</code> to write responsive styles easily:</p>
<pre><code class="language-tsx">import { MediaQueryRange, MediaQueryMaxWidth } from &#39;lupine.components&#39;;

const css: CssProps = {
  width: &#39;100%&#39;,
  // Default desktop style
  maxWidth: MediaQueryMaxWidth.DesktopMax,

  // Adjustments for ExtraSmall screens (Mobile Portrait)
  [MediaQueryRange.ExtraSmallBelow]: {
    padding: &#39;10px&#39;,
    fontSize: &#39;14px&#39;,
  },

  // Adjustments for Tablet and below
  [MediaQueryRange.TabletBelow]: {
    flexDirection: &#39;column&#39;,
  },
};
</code></pre>
<h2 id="2-adaptive-frames"><a class="header-anchor" href="#2-adaptive-frames">#</a>2. Adaptive Frames</h2><p>Lupine provides frame components specifically designed for building responsive applications.</p>
<h3 id="responsiveframe"><a class="header-anchor" href="#responsiveframe">#</a>ResponsiveFrame</h3><p><code>ResponsiveFrame</code> is the ultimate solution for handling hybrid layouts. It automatically switches UI structure based on the device type:</p>
<ul>
<li><strong>Desktop</strong>: Displays top menu (<code>DesktopHeader</code>), footer (<code>DesktopFooter</code>), and sidebar.</li>
<li><strong>Mobile</strong>: Automatically switches to a mobile layout, hiding desktop-specific elements and enabling mobile-specific navigation (<code>MobileBottomMenu</code>).</li>
</ul>
<pre><code class="language-tsx">&lt;ResponsiveFrame
  desktopHeaderTitle=&quot;My App&quot;
  desktopTopMenu={[...]}
  mobileBottomMenu={[...]}
  mainContent={&lt;MyPageContent /&gt;}
/&gt;
</code></pre>
<h3 id="sliderframe"><a class="header-anchor" href="#sliderframe">#</a>SliderFrame</h3><p><code>SliderFrame</code> implements the common &quot;slide-in&quot; interaction experience found in mobile apps. It is typically used for sliding in detail pages from the right or menus from the bottom.</p>
<ul>
<li>Supports <code>Right-to-Left</code> and <code>Bottom-to-Top</code> animations.</li>
<li>Configurable as a slide-out panel on Desktop.</li>
</ul>
<h2 id="3-mobile-navigation-interaction"><a class="header-anchor" href="#3-mobile-navigation-interaction">#</a>3. Mobile Navigation &amp; Interaction</h2><h3 id="global-back-button-handling-backactionhelper"><a class="header-anchor" href="#global-back-button-handling-backactionhelper">#</a>Global Back Button Handling (BackActionHelper)</h3><p>Handling the physical back button is crucial in mobile apps (especially Android). <code>BackActionHelper</code> provides a global queue to manage back actions, ensuring a smooth user experience.</p>
<p><strong>Usage Example</strong>:</p>
<pre><code class="language-typescript">import { backActionHelper } from &#39;lupine.components&#39;;

// Listen for hardware back button (usually in index.ts or app-listeners.ts)
App.addListener(&#39;backButton&#39;, async () =&gt; {
  // If helper handled the back action (e.g., closed a modal), return
  if (await backActionHelper.processBackAction()) {
    return;
  }
  // Otherwise, exit app or perform other logic
});
</code></pre>
<h3 id="actionsheet"><a class="header-anchor" href="#actionsheet">#</a>ActionSheet</h3><p><code>ActionSheet</code> is a very common bottom modal component in mobile apps, used for option selection, information prompts, or simple inputs.</p>
<ul>
<li><strong>ActionSheetSelect</strong>: Bottom options menu.</li>
<li><strong>ActionSheetInput</strong>: Bottom input box.</li>
<li><strong>ActionSheetMessage</strong>: Bottom message prompt.</li>
</ul>
<pre><code class="language-tsx">import { ActionSheetSelectPromise } from &#39;lupine.components&#39;;

const handleSelect = async () =&gt; {
  const index = await ActionSheetSelectPromise({
    title: &#39;Choose Action&#39;,
    options: [&#39;Edit&#39;, &#39;Delete&#39;, &#39;Share&#39;],
    cancelButtonText: &#39;Cancel&#39;,
  });

  if (index === 0) {
    // Edit logic
  }
};
</code></pre>
<h3 id="mobileheader"><a class="header-anchor" href="#mobileheader">#</a>MobileHeader</h3><p><code>MobileHeaderComponent</code> provides flexible header customization. You can dynamically update the Left, Center, and Right areas of the header using <code>MobileHeaderHelper</code> or helper components.</p>
<pre><code class="language-tsx">// Dynamically update Header inside a page component
&lt;MobileHeaderCenter&gt;
  &lt;MobileHeaderTitleIcon title=&#39;User Settings&#39; left={&lt;BackIcon /&gt;} right={&lt;SaveIcon /&gt;} /&gt;
&lt;/MobileHeaderCenter&gt;
</code></pre>
<h3 id="slidetabcomponent"><a class="header-anchor" href="#slidetabcomponent">#</a>SlideTabComponent</h3><p>A tab switching component that supports gesture-based left/right sliding, providing a smooth experience close to native applications.</p>
<pre><code class="language-tsx">&lt;SlideTabComponent
  pages={[
    { title: &#39;Hot&#39;, content: &lt;HotList /&gt; },
    { title: &#39;New&#39;, content: &lt;NewList /&gt; },
  ]}
/&gt;

## 4. Mobile Deployment

Lupine.js recommends using **Capacitor** to wrap your web application as a native mobile app.

### Mobile Configuration

Since mobile apps typically run as standalone files (using the \`file://\` protocol), API requests cannot utilize relative paths like they do on the Web. You should configure \`.env.mobile\` to specify absolute API endpoints.

**Build Command**:
\`\`\`bash
# Build using .env.mobile configuration
npm run build-mobile
</code></pre>
<p>This corresponds to the script in <code>package.json</code>:
<code>node ./dev/dev-watch --env=.env.mobile --dev=0 --mobile=1</code></p>
<h3 id="conditional-compilation"><a class="header-anchor" href="#conditional-compilation">#</a>Conditional Compilation</h3><p>Lupine provides the <code>pluginIfelse</code> plugin, allowing you to write platform-specific logic. This is particularly useful for handling mobile-specific API endpoints or behaviors.</p>
<p><strong>Usage Example</strong>:</p>
<pre><code class="language-javascript">// #if MOBILE
const apiBase = &#39;https://api.myapp.com&#39;;
// #else
const apiBase = &#39;/api&#39;;
// #endif

// #if DEV
console.log(&#39;Debug mode&#39;);
// #endif
</code></pre>
<blockquote>
<p>Only code blocks matching the condition will be included in the final bundle, reducing bundle size and preventing runtime errors.</p>
</blockquote>
<h3 id="adding-ios-and-android"><a class="header-anchor" href="#adding-ios-and-android">#</a>Adding iOS and Android</h3><p>Please refer to the official Capacitor documentation for detailed steps on adding platforms:
<a href="https://capacitorjs.com/docs/getting-started">https://capacitorjs.com/docs/getting-started</a></p>
<h2 id="5-desktop-deployment"><a class="header-anchor" href="#5-desktop-deployment">#</a>5. Desktop Deployment</h2><p>Lupine.js uses <strong>Electron</strong> to build cross-platform desktop applications.</p>
<h3 id="desktop-structure"><a class="header-anchor" href="#desktop-structure">#</a>Desktop Structure</h3><p>When you create a new Lupine project, it automatically includes an <code>electron</code> directory (e.g., <code>apps/your-app/electron</code>), which contains the necessary main process code and resources for the desktop app.</p>
<ul>
<li>Your Web code runs directly as the Electron renderer process.</li>
<li><code>lupine.components</code> automatically detects the runtime environment and adapts the UI for desktop (e.g., hiding unnecessary mobile tabs).</li>
</ul>
<h3 id="build-commands"><a class="header-anchor" href="#build-commands">#</a>Build Commands</h3><p><code>package.json</code> provides preset build scripts for compiling installers for different platforms:</p>
<pre><code class="language-bash"># Windows
npm run app1:build-win

# Linux
npm run app1:build-linux

# macOS
npm run app1:build-mac
</code></pre>
<p>You can find and customize these commands in the <code>scripts</code> section of your <code>package.json</code>.</p>
`;var uu=`<h1 id="page-router"><a class="header-anchor" href="#page-router">#</a>Page Router</h1><p>The <code>PageRouter</code> in <strong>Lupine.web</strong> is a powerful client-side routing system designed to be <strong>isomorphic</strong> in logic to the backend <code>ApiRouter</code> (in <code>lupine.api</code>). It supports nested routing, middleware filters, dynamic parameters, and layout frames.</p>
<h2 id="1-versus-other-frameworks"><a class="header-anchor" href="#1-versus-other-frameworks">#</a>1. \u2696\uFE0F Versus Other Frameworks</h2><p>Compared to generic routers (like <code>react-router</code> or <code>vue-router</code>):</p>
<ul>
<li><strong>Logic Parity</strong>: It shares the exact same routing philosophy as the backend <code>ApiRouter</code>. If you know how to write a backend API in Lupine, you know how to write a frontend route.</li>
<li><strong>True Nesting</strong>: You can mount a full <code>PageRouter</code> instance onto a specific path of another router (e.g., <code>router.use(&#39;/user&#39;, userRouter)</code>), enabling true modularity.</li>
<li><strong>Built-in Layouts</strong>: <code>setFramePage</code> treats layouts as first-class citizens, injecting content into a specific placeholder class.</li>
</ul>
<h2 id="2-basic-usage"><a class="header-anchor" href="#2-basic-usage">#</a>2. \u{1F423} Basic Usage</h2><p>The simplest way to start is to map paths to Page Components.</p>
<pre><code class="language-tsx">import { PageRouter, bindRouter } from &#39;lupine.web&#39;;

// 1. Create Router
const pageRouter = new PageRouter();

// 2. Define Routes
pageRouter.use(&#39;/home&#39;, HomePage);
pageRouter.use(&#39;/about&#39;, AboutPage);
// Wildcard for 404
pageRouter.use(&#39;*&#39;, NotFoundPage);

// 3. Bind to the System
bindRouter(pageRouter);
</code></pre>
<h2 id="3-dynamic-parameters"><a class="header-anchor" href="#3-dynamic-parameters">#</a>3. \u{1F527} Dynamic Parameters</h2><p>Lupine supports both mandatory and optional parameters directly in the URL string. All captured parameters are available in <code>props.urlParameters</code>.</p>
<h3 id="syntax"><a class="header-anchor" href="#syntax">#</a>Syntax</h3><ul>
<li><code>/:id</code> : Mandatory parameter.</li>
<li><code>/?id</code> : Optional parameter. (All subsequent parameters must also be optional).</li>
<li><code>?key=value</code> : Standard query strings are also supported (parsed separately).</li>
</ul>
<h3 id="example"><a class="header-anchor" href="#example">#</a>Example</h3><pre><code class="language-tsx">// Define:
pageRouter.use(&#39;/share/:type/:id/&#39;, ShareContentPage);

// Usage inside ShareContentPage:
export const ShareContentPage = (props: PageProps) =&gt; {
  // Access parameters
  const type = props.urlParameters[&#39;type&#39;];
  const id = props.urlParameters[&#39;id&#39;];

  return (
    &lt;div&gt;
      Viewing {type} with ID: {id}
    &lt;/div&gt;
  );
};
</code></pre>
<h2 id="4-advanced-features"><a class="header-anchor" href="#4-advanced-features">#</a>4. \u{1F680} Advanced Features</h2><h3 id="4-1-nested-routers-modularity"><a class="header-anchor" href="#4-1-nested-routers-modularity">#</a>4.1 \u{1F38E} Nested Routers (Modularity)</h3><p>You can break your application into sub-modules.</p>
<pre><code class="language-tsx">// 1. Create a sub-router for User Profile area
const userPageRouter = new PageRouter();
userPageRouter.use(&#39;/profile&#39;, UserProfilePage);
userPageRouter.use(&#39;/settings&#39;, UserSettingsPage);

// 2. Mount it to the main router under &#39;/user&#39;
const mainRouter = new PageRouter();
mainRouter.use(&#39;/user&#39;, userPageRouter);

// Now URLs are: /user/profile, /user/settings
</code></pre>
<h3 id="4-2-middleware-filters-auth"><a class="header-anchor" href="#4-2-middleware-filters-auth">#</a>4.2 \u{1F6E1}\uFE0F Middleware Filters (Auth)</h3><p>You can attach a &quot;Filter&quot; function that runs before <em>any</em> route resolution. If the filter handles the request (e.g., redirects to login) or returns a node, routing stops. If it returns <code>null</code>, routing continues.</p>
<pre><code class="language-tsx">// Global Filter
pageRouter.setFilter(checkAgreement);

// Route-Specific Filter (Middleware Pattern)
const checkAuth = async (props) =&gt; {
  if (!isLoggedIn()) {
    // Render Login Page or Redirect
    return &lt;LoginPage /&gt;;
  }
  return null; // Continue to next handler
};

// Usage: checkAuth runs first, then UserMinePage
userPageRouter.use(&#39;/mine&#39;, checkAuth, UserMinePage);
</code></pre>
<h3 id="4-3-frame-pages-layouts"><a class="header-anchor" href="#4-3-frame-pages-layouts">#</a>4.3 \u{1F5BC}\uFE0F Frame Pages (Layouts)</h3><p>Unlike React Router where you nest <code>&lt;Outlet /&gt;</code>, Lupine uses a <code>setFramePage</code> method to define a &quot;Wrapper&quot; or &quot;Layout&quot; for all routes within that Router.</p>
<pre><code class="language-tsx">// 1. Define the Frame
const TopFrame = (placeholderClass, childNode) =&gt; {
  return (
    &lt;div class=&#39;app-container&#39;&gt;
      &lt;Header /&gt;
      &lt;Sidebar /&gt;
      {/* Content injection point */}
      &lt;div class={placeholderClass}&gt;{childNode}&lt;/div&gt;
    &lt;/div&gt;
  );
};

// 2. Apply to Router
const pageRouter = new PageRouter();
pageRouter.setFramePage({
  component: TopFrame,
  placeholderClassname: &#39;app-content-area&#39;, // matches class above
});

pageRouter.use(&#39;/dashboard&#39;, DashboardPage);
// Result: DashboardPage is rendered INSIDE TopFrame&#39;s &#39;app-content-area&#39; div.
</code></pre>
<h3 id="4-4-sub-directory-deployment"><a class="header-anchor" href="#4-4-sub-directory-deployment">#</a>4.4 \u{1F4C2} Sub-Directory Deployment</h3><p>If your app is deployed to <code>example.com/my-app/</code>, you need to tell the router to ignore the <code>/my-app</code> prefix.</p>
<pre><code class="language-typescript">// If physical path exists, router needs to know to ignore it
pageRouter.setSubDir(&#39;/my-app&#39;);
</code></pre>
`;var gu=`<h1 id="server-side-rendering-ssr"><a class="header-anchor" href="#server-side-rendering-ssr">#</a>Server Side Rendering (SSR)</h1><p>Lupine.js was designed from scratch with <strong>Server-Side Rendering (SSR)</strong> as a first-class citizen. Unlike many SPA frameworks where SSR is an afterthought or requires complex meta-frameworks (like Next.js for React), Lupine integrates SSR directly into its core architecture (<code>lupine.api</code> and <code>lupine.web</code>).</p>
<h2 id="1-how-it-works"><a class="header-anchor" href="#1-how-it-works">#</a>1. \u2699\uFE0F How it Works</h2><p>When a user requests a URL that doesn&#39;t map to a static file (like an image or JS file), the <code>serverSideRenderPage</code> function takes over.</p>
<h3 id="the-flow"><a class="header-anchor" href="#the-flow">#</a>The Flow:</h3><ol>
<li><strong>Request Interception</strong>: The server intercepts the HTTP request.</li>
<li><strong>Environment Injection</strong>: It injects server-side environment variables (starting with <code>WEB.</code>) into the runtime.</li>
<li><strong>Page Generation</strong>: It calls <code>_lupineJs.generatePage</code> to execute your frontend logic <strong>on the server</strong>.</li>
<li><strong>HTML Construction</strong>: It stitches together the final HTML, including:<ul>
<li><strong>Theme &amp; Styles</strong>: Critical CSS and current theme are injected directly, preventing &quot;Flash of Unstyled Content&quot; (FOUC).</li>
<li><strong>Meta Data</strong>: SEO titles and descriptions are calculated and inserted.</li>
<li><strong>State Hydration</strong>: After the page loads, the frontend automatically binds events.</li>
</ul>
</li>
</ol>
<h2 id="2-zero-configuration-seo"><a class="header-anchor" href="#2-zero-configuration-seo">#</a>2. \u{1F50D} Zero-Configuration SEO</h2><p>One of the biggest benefits of Lupine&#39;s SSR is automatic SEO support. By using components like <code>MetaData</code>, your page tells search engines exactly what they need to know <strong>before</strong> any JavaScript runs on the client.</p>
<h3 id="example-social-sharing-opengraph"><a class="header-anchor" href="#example-social-sharing-opengraph">#</a>Example: Social Sharing (OpenGraph)</h3><p>In <code>share-content.tsx</code>, you can dynamically set meta tags based on the content being viewed:</p>
<pre><code class="language-tsx">export const ShareContentPage = async (props: PageProps) =&gt; {
  // 1. Fetch data (works on server too!)
  const record = await fetchRecord(props.urlParameters[&#39;id&#39;]);

  // 2. Define SEO/Social Metadata
  return (
    &lt;div&gt;
      &lt;MetaData property=&#39;og:title&#39; content={record.title} /&gt;
      &lt;MetaData property=&#39;og:description&#39; content={record.description} /&gt;
      &lt;MetaData property=&#39;og:image&#39; content={record.imageUrl} /&gt;
      &lt;MetaData property=&#39;og:url&#39; content={props.url} /&gt;

      &lt;h1&gt;{record.title}&lt;/h1&gt;
      {/* ... content ... */}
    &lt;/div&gt;
  );
};
</code></pre>
<h2 id="3-environment-variables"><a class="header-anchor" href="#3-environment-variables">#</a>3. \u{1F6E0}\uFE0F Environment Variables</h2><p>Lupine automatically bridges your server environment to your frontend.</p>
<h3 id="defining-variables"><a class="header-anchor" href="#defining-variables">#</a>Defining Variables</h3><p>In your <code>.env</code> file, variables starting with <code>WEB.</code> are marked for the frontend:</p>
<pre><code class="language-ini"># .env
WEB.API_BASE_URL=https://api.example.com
WEB.SITE_NAME=My Awesome App
SECRET_KEY=xxxx  &lt;-- This stays on the server!
</code></pre>
<h3 id="accessing-variables"><a class="header-anchor" href="#accessing-variables">#</a>Accessing Variables</h3><p>During SSR (and subsequently in the browser), these are available via <code>getWebEnv()</code>:</p>
<pre><code class="language-typescript">// Any component
import { getWebEnv } from &#39;lupine.web&#39;;

const env = getWebEnv();
console.log(env.API_BASE_URL); // &quot;https://api.example.com&quot;
</code></pre>
<h2 id="4-webconfig-dynamic-runtime-configuration"><a class="header-anchor" href="#4-webconfig-dynamic-runtime-configuration">#</a>4. \u2699\uFE0F WebConfig: Dynamic Runtime Configuration</h2><p>Sometimes you need configurations that can change at runtime (like Admin settings for &quot;Max Rows per Page&quot; or &quot;Maintenance Mode&quot;) without redeploying. Lupine provides <code>WebConfig</code> for this.</p>
<p><strong>Mechanism:</strong></p>
<ol>
<li><strong>SSR Injection</strong>: On the first page load, the server fetches these configs and injects them into a <code>&lt;script id=&quot;web-setting&quot;&gt;</code> tag.</li>
<li><strong>Hydration</strong>: <code>WebConfig.init()</code> (called automatically) reads this script tag effectively &quot;hydrating&quot; the config synchronously.</li>
<li><strong>Async Fallback</strong>: If the app runs as a pure SPA (client-side only navigation), <code>WebConfig.get()</code> fetches from the API if cache is missing.</li>
</ol>
<h3 id="usage"><a class="header-anchor" href="#usage">#</a>Usage</h3><p><strong>Binding the API (Entry Point):</strong></p>
<pre><code class="language-tsx">// src/index.tsx
bindWebConfigApi(&#39;/api/admin/web-config&#39;);
</code></pre>
<p><strong>Using Configs (Component):</strong></p>
<pre><code class="language-tsx">// admin-poster-page.tsx
const PosterList = async () =&gt; {
  // Async access ensures data is ready
  const maxRows = await WebConfig.get(&#39;poster_max_rows&#39;, 10);
  const category = await WebConfig.get(&#39;current_category&#39;, &#39;default&#39;);

  // ... use config ...
};
</code></pre>
<blockquote>
<p>[!IMPORTANT]
Since <code>WebConfig</code> might need to fetch data (on client-side navigation), it is designed as an <strong>Async API</strong>. Always use <code>await WebConfig.get(...)</code>.</p>
</blockquote>
<h2 id="5-intelligent-caching-performance"><a class="header-anchor" href="#5-intelligent-caching-performance">#</a>5. \u26A1 Intelligent Caching &amp; Performance</h2><p>Lupine&#39;s SSR isn&#39;t just about rendering; it&#39;s about speed.</p>
<ul>
<li><strong>Template Caching</strong>: The server caches the structure of your <code>index.html</code> to minimize file system reads. It identifies &quot;slots&quot; for Title, Meta, CSS, and Content (<code>packages/lupine.api/src/api/server-render.ts</code>).</li>
<li><strong>CSS &amp; Theme Injection</strong>: By calculating the critical CSS server-side (<code>generateAllGlobalStyles</code>), the browser receives a fully styled page instantly. Even if JavaScript is disabled or slow to load, the user sees a perfect UI.</li>
</ul>
`;var hu=`<h1 id="theme"><a class="header-anchor" href="#theme">#</a>\u{1F317} Theme</h1><p>Lupine.js provides built-in support for multiple themes (e.g., Light and Dark modes) with seamless SSR integration.</p>
<h2 id="1-setup"><a class="header-anchor" href="#1-setup">#</a>1. \u{1F3C1} Setup</h2><p>You need to bind your themes at the application entry point (usually <code>index.tsx</code>).</p>
<h3 id="bindtheme"><a class="header-anchor" href="#bindtheme">#</a><code>bindTheme</code></h3><p>Connects your theme definitions to the Lupine runtime.</p>
<pre><code class="language-tsx">// src/index.tsx
import { bindTheme } from &#39;lupine.web&#39;;
import { lightThemes, darkThemes } from &#39;./themes&#39;;

// Bind default theme and available themes
bindTheme(&#39;light&#39;, {
  light: lightThemes,
  dark: darkThemes,
});
</code></pre>
<ul>
<li><strong>Why</strong>: This allows the system to know available themes and the default one.</li>
<li><strong>Where</strong>: Call this before rendering your app.</li>
</ul>
<h2 id="2-usage"><a class="header-anchor" href="#2-usage">#</a>2. \u{1F3AE} Usage</h2><h3 id="accessing-updating"><a class="header-anchor" href="#accessing-updating">#</a>Accessing &amp; Updating</h3><p>You can get the current theme or switch themes using provided helpers.</p>
<pre><code class="language-tsx">import { getCurrentTheme, updateTheme } from &#39;lupine.web&#39;;

// Get current theme info
const { themeName, themes } = getCurrentTheme();

// Switch to dark mode
const onSwitch = () =&gt; {
  updateTheme(&#39;dark&#39;);
};
</code></pre>
<h3 id="themeselector-component"><a class="header-anchor" href="#themeselector-component">#</a><code>ThemeSelector</code> Component</h3><p>Lupine provides a built-in <code>ThemeSelector</code> component for easy theme switching.</p>
<pre><code class="language-tsx">import { ThemeSelector } from &#39;lupine.components&#39;;

const Header = () =&gt; (
  &lt;header&gt;
    &lt;h1&gt;My App&lt;/h1&gt;
    &lt;ThemeSelector /&gt;
  &lt;/header&gt;
);
</code></pre>
<h2 id="3-server-side-rendering-ssr"><a class="header-anchor" href="#3-server-side-rendering-ssr">#</a>3. \u26A1 Server-Side Rendering (SSR)</h2><p>One of Lupine&#39;s strongest features is its <strong>FOUC-free</strong> (Flash of Unstyled Content) theme support during SSR.</p>
<ul>
<li><strong>Cookie Injection</strong>: The current theme is stored in a cookie.</li>
<li><strong>Server Processing</strong>: During SSR, the server reads this cookie.</li>
<li><strong>Style Injection</strong>: The server generates the CSS variables for the active theme and injects them directly into the HTML&#39;s <code>&lt;style&gt;</code> tag.</li>
</ul>
<p>This ensures that when the user loads the page, it is already styled correctly (e.g., dark background) before any JavaScript runs on the client.</p>
<h2 id="4-admin-tools"><a class="header-anchor" href="#4-admin-tools">#</a>4. \u{1F6E0}\uFE0F Admin Tools</h2><p>To visualize your themes and debugging colors, you can use the admin helper component.</p>
<pre><code class="language-tsx">// Helper to list all theme colors for comparison
import { TestThemes } from &#39;lupine.api/admin&#39;;
</code></pre>
<p>This component renders a grid showing how your defined colors look across different themes, helping you find the right keys and contrast.</p>
`;var mu=`<h1 id="installation2"><a class="header-anchor" href="#installation2">#</a>Installation2</h1><p>Lupine.js is a full-featured web application framework that includes both frontend and backend. The frontend, Lupine.web, is an extremely lightweight framework using React TSX syntax. The backend, Lupine.api, is a highly efficient and minimalistic framework similar to Express.</p>
<h2 id="quick-start"><a class="header-anchor" href="#quick-start">#</a>Quick Start</h2><h3 id="1-create-a-project"><a class="header-anchor" href="#1-create-a-project">#</a>1. Create a Project</h3><p>The simplest way is to use the <code>create-lupine</code> command to create a new application. You can choose a template during creation.</p>
<pre><code class="language-bash">npx create-lupine@latest my-app
</code></pre>
<p>If you want to understand lupine.js more deeply, you can clone the repository from github, which makes it easier to view the core code locally.</p>
<pre><code class="language-bash">git clone https://github.com/uuware/lupine.js.git
</code></pre>
<h3 id="2-install-dependencies"><a class="header-anchor" href="#2-install-dependencies">#</a>2. Install dependencies</h3><pre><code class="language-bash">npm install
</code></pre>
<h3 id="3-configure-environment"><a class="header-anchor" href="#3-configure-environment">#</a>3. Configure Environment</h3><p>If you created the project using <code>create-lupine</code>, the <code>.env</code> file is already generated.</p>
<p>If you created the project using <code>git clone</code>, you need to configure the environment.</p>
<p>Copy the <code>.env.sample</code> file to a new file named <code>.env</code>.</p>
<p>For projects created using <code>git clone</code>, you also need to use the sample script in the <code>.env</code> file to generate keys for the following variables:</p>
<pre><code class="language-properties">ADMIN_PASS=
CRYPTO_KEY=
DEV_ADMIN_PASS=
DEV_CRYPTO_KEY=
</code></pre>
<h3 id="4-run-the-development-application"><a class="header-anchor" href="#4-run-the-development-application">#</a>4. Run the development application</h3><pre><code class="language-bash">npm run dev
</code></pre>
<p>You can now verify the development application at <a href="http://localhost:11080">http://localhost:11080</a>.</p>
<hr>
<h2 id="local-https-setup"><a class="header-anchor" href="#local-https-setup">#</a>Local HTTPS Setup</h2><p>For local HTTPS support, we recommend using <a href="https://github.com/FiloSottile/mkcert">mkcert</a>.</p>
<ol>
<li>Download <code>mkcert</code> (e.g., <code>mkcert-v1.4.4-windows-amd64.exe</code>).</li>
<li>Open an admin console and run:<pre><code class="language-bash">./mkcert-v1.4.4-windows-amd64 -install
</code></pre>
</li>
<li>Generate the certificate (for new setups):<pre><code class="language-bash">mkcert example.com &quot;*.example.com&quot; localhost 127.0.0.1 ::1
</code></pre>
</li>
<li>Copy the generated certificate files to the <code>/dev</code> folder.</li>
<li>Update your <code>.env</code> file to allow local API calls with self-signed certificates:<pre><code class="language-properties">NODE_TLS_REJECT_UNAUTHORIZED=0
</code></pre>
</li>
</ol>
<h3 id="alternative-self-signed-certificate-via-openssl"><a class="header-anchor" href="#alternative-self-signed-certificate-via-openssl">#</a>Alternative: Self-Signed Certificate via OpenSSL</h3><p>If you prefer OpenSSL:</p>
<pre><code class="language-bash">openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout cert.key -out cert.pem -sha256
</code></pre>
<p>On Windows, you might use:
<code>&quot;C:\\Program Files\\Git\\usr\\bin\\openssl.exe&quot;</code></p>
<hr>
<h2 id="debugging"><a class="header-anchor" href="#debugging">#</a>Debugging</h2><h3 id="debug-backend-only"><a class="header-anchor" href="#debug-backend-only">#</a>Debug Backend Only</h3><p>Open a <strong>Javascript Debug Terminal</strong> in VS Code and run:</p>
<pre><code class="language-bash">npm run dev
</code></pre>
<h3 id="debug-frontend-backend"><a class="header-anchor" href="#debug-frontend-backend">#</a>Debug Frontend &amp; Backend</h3><ol>
<li>Go to the <strong>Run and Debug</strong> sidebar in VS Code.</li>
<li>Select <strong>&quot;Lupine.js: Frontend &amp; Backend&quot;</strong> from the dropdown.</li>
<li>Set breakpoints in your FE or BE code and start debugging.</li>
</ol>
<hr>
<h2 id="adding-a-new-app"><a class="header-anchor" href="#adding-a-new-app">#</a>Adding a New App</h2><p>Lupine can run multiple apps under the same port. To add a new app locally:</p>
<ol>
<li><strong>Copy</strong>: Duplicate any app folder under <code>/apps</code> and rename it.</li>
<li><strong>Update Config</strong>: Update the <code>apps\\&lt;your-app&gt;\\lupine.json</code> file with the new app name.</li>
<li><strong>Register App</strong>: Add the new app name to <code>APPS=</code> in your <code>.env</code> file.</li>
<li><strong>Virtual Domain</strong>: Add a virtual domain for the app in <code>DOMAINS@[APP-NAME]=</code> in your <code>.env</code> file.</li>
<li><strong>Build</strong>: The new app&#39;s source will be built to <code>dist\\server_root</code>.</li>
</ol>
<h3 id="local-virtual-domain-setup"><a class="header-anchor" href="#local-virtual-domain-setup">#</a>Local Virtual Domain Setup</h3><p>To access multiple apps on the same port (e.g., <code>app1.sample-domain.com</code>), modify your hosts file:</p>
<pre><code class="language-text">127.0.0.1 app1.sample-domain.com
</code></pre>
<p><strong>Hosts file location:</strong></p>
<ul>
<li><strong>Windows</strong>: <code>C:\\Windows\\System32\\Drivers\\etc\\hosts</code></li>
<li><strong>Linux/macOS</strong>: <code>/etc/hosts</code></li>
</ul>
<h3 id="creating-a-sub-folder-app"><a class="header-anchor" href="#creating-a-sub-folder-app">#</a>Creating a Sub-folder App</h3><p>To create a sub-application within an existing app (e.g., <code>admin_dev</code>):</p>
<ol>
<li>Create a folder: <code>apps\\[your-app-name]\\web\\src\\admin_dev</code></li>
<li>Add <code>index.html</code> and <code>index.tsx</code>.</li>
<li>Update <code>apps\\[your-app-name]\\lupine.json</code> entries:<pre><code class="language-json">{
  &quot;index&quot;: &quot;web/src/admin_dev/index.tsx&quot;,
  &quot;html&quot;: &quot;web/src/admin_dev/index.html&quot;,
  &quot;outdir&quot;: &quot;/admin_dev&quot;
}
</code></pre>
</li>
</ol>
<hr>
<h2 id="important-global-variables-in-ssr"><a class="header-anchor" href="#important-global-variables-in-ssr">#</a>Important: Global Variables in SSR</h2><p>Since Lupine uses Server Side Rendering (SSR), global variables in frontend code are <strong>shared by all users</strong>. Use them with extreme caution.</p>
<p><strong>Bad Practice:</strong>
The following code is dangerous because <code>cacheUser</code> is shared:</p>
<pre><code class="language-typescript">const cacheUser: { user: null | Promise&lt;UserInfoType | null&gt; } = { user: null };
export const getUserInfo = (refresh?: boolean): Promise&lt;UserInfoType | null&gt; =&gt; {
  if (!cacheUser.user || refresh) {
    cacheUser.user = new Promise(async (resolve, reject) =&gt; {
      // ...
    });
  }
  return cacheUser.user;
};
</code></pre>
<p><strong>Good Practice:</strong>
Initialize user-specific data within component lifecycle events (like <code>onLoad</code>) which only execute on the client-side.</p>
<pre><code class="language-tsx">const cacheUser: { user: null | Promise&lt;UserInfoType | null&gt; } = { user: null };
export const UserInfo = (props?: any) =&gt; {
  const ref: RefProps = {
    onLoad: async () =&gt; {
      // Safe to assign here for the client
      cacheUser.user = ...
    },
  };
  return (
    &lt;div css={css} class=&#39;user-info-box&#39; ref={ref}&gt;
      ...
    &lt;/div&gt;
  );
};
</code></pre>
`;var fu=`<h1 id="introduction-to-lupine-js"><a class="header-anchor" href="#introduction-to-lupine-js">#</a>Introduction to Lupine.js</h1><p>Lupine.js is a full-featured web application framework that includes both Front-End and Back-End services.</p>
<ul>
<li><strong>Front-End</strong>: <code>lupine.web</code> is an extremely lightweight framework using React TSX syntax, allowing React developers to get started with zero learning curve.</li>
<li><strong>Back-End</strong>: <code>lupine.api</code> is a highly efficient and simplified framework (similar to Express) that supports Server-Side Rendering (SSR) natively from scratch.</li>
<li><strong>Cross-Platform</strong>: With Capacitor and Electron, you can maintain a single codebase to deploy Web, iOS, Android, and Desktop applications simultaneously.</li>
</ul>
<h2 id="core-essentials"><a class="header-anchor" href="#core-essentials">#</a>Core Essentials</h2><p>Lupine.js is designed for <strong>Simplicity</strong> and <strong>High Performance</strong>. Here are our core features:</p>
<h3 id="server-side-rendering-ssr-first-essentials-ssr"><a class="header-anchor" href="#server-side-rendering-ssr-first-essentials-ssr">#</a><a href="javascript:lpPressLoad('/en/essentials/ssr')">\u26A1 Server-Side Rendering (SSR) First</a></h3><p>Lupine is built for SSR from day one. It automatically handles style injection, SEO metadata, and state hydration, ensuring your app has blazing fast initial load times and is search engine friendly.</p>
<h3 id="built-in-css-in-js-essentials-css-in-js"><a class="header-anchor" href="#built-in-css-in-js-essentials-css-in-js">#</a><a href="javascript:lpPressLoad('/en/essentials/css-in-js')">\u{1F3A8} Built-in CSS-in-JS</a></h3><p>Say goodbye to complex CSS configurations. Lupine comes with a powerful built-in styling system supporting scoped styles, nested selectors, media queries, and dynamic styling\u2014all with zero runtime overhead.</p>
<h3 id="powerful-page-router-essentials-page-route"><a class="header-anchor" href="#powerful-page-router-essentials-page-route">#</a><a href="javascript:lpPressLoad('/en/essentials/page-route')">\u{1F6E3}\uFE0F Powerful Page Router</a></h3><p>A flexible functional routing system supporting nested routes, route guards, parameter parsing, and middleware, providing a solid foundation for complex Single Page Applications (SPA).</p>
<h3 id="theme-system-essentials-theme"><a class="header-anchor" href="#theme-system-essentials-theme">#</a><a href="javascript:lpPressLoad('/en/essentials/theme')">\u{1F317} Theme System</a></h3><p>Out-of-the-box theme support (Light/Dark modes). Lupine ensures correct theme variables are injected during SSR, completely eliminating the &quot;Flash of Unstyled Content&quot; (FOUC) issue.</p>
<h3 id="high-performance-list-rendering-essentials-list"><a class="header-anchor" href="#high-performance-list-rendering-essentials-list">#</a><a href="javascript:lpPressLoad('/en/essentials/list')">\u{1F4DD} High-Performance List Rendering</a></h3><p>Our unique Spot-Update technology allows direct DOM updates when rendering and editing large lists, bypassing expensive React Virtual DOM re-calculations.</p>
<h3 id="full-stack-development-essentials-api"><a class="header-anchor" href="#full-stack-development-essentials-api">#</a><a href="javascript:lpPressLoad('/en/essentials/api')">\u{1F4E1} Full-Stack Development</a></h3><p>Integrated front-end and back-end design. <code>lupine.api</code> offers a minimalist way to define APIs that work seamlessly with the front-end, making full-stack development easier than ever.</p>
<h3 id="ai-assisted-development"><a class="header-anchor" href="#ai-assisted-development">#</a>\u{1F916} AI Assisted Development</h3><p>We provide a dedicated <code>AI_CONTEXT.md</code> file in the project root. When asking AI to write code for this project, please provide this file to the AI first. It contains critical rules (e.g., &quot;No React Hooks&quot;) and design patterns unique to Lupine.js.</p>
<h4 id="example-prompt"><a class="header-anchor" href="#example-prompt">#</a>Example Prompt</h4><blockquote>
<p>&quot;Read <code>AI_CONTEXT.md</code> first. Create a &#39;User Profile&#39; component that includes a standard settings list (Avatar, Name, Email) and a save button.&quot;</p>
</blockquote>
`;var bu="";var xu=`<h1 id="api-module-src-api"><a class="header-anchor" href="#api-module-src-api">#</a>API Module (<code>src/api</code>)</h1><p>The API Module provides the framework for writing the business logic of your application. It acts similarly to Express.js but is optimized for the lupine ecosystem.</p>
<h2 id="key-features"><a class="header-anchor" href="#key-features">#</a>Key Features</h2><ul>
<li><strong>ApiRouter</strong>: A flexible router supporting GET, POST, and middleware-like filters.</li>
<li><strong>Context Isolation</strong>: Uses <code>AsyncStorage</code> to safely manage request-scoped data (like sessions or database transactions) across async operations.</li>
<li><strong>Database Integration</strong>: Built-in helpers for database connections (e.g., SQLite via <code>better-sqlite3</code>).</li>
</ul>
<h2 id="usage-example"><a class="header-anchor" href="#usage-example">#</a>Usage Example</h2><p>An application&#39;s API entry point (e.g., <code>apps/demo.app/api/src/index.ts</code>) typically exports an instance of <code>ApiModule</code>.</p>
<p><strong>1. Entry Point (<code>index.ts</code>):</strong></p>
<pre><code class="language-typescript">import { ApiModule } from &#39;lupine.api&#39;;
import { RootApi } from &#39;./service/root-api&#39;;

// Export apiModule so the server can load it dynamically
export const apiModule = new ApiModule(new RootApi());
</code></pre>
<p><strong>2. Root API Service (<code>service/root-api.ts</code>):</strong></p>
<pre><code class="language-typescript">import { ApiRouter, IApiBase, IApiRouter } from &#39;lupine.api&#39;;

export class RootApi implements IApiBase {
  getRouter(): IApiRouter {
    const router = new ApiRouter();

    // Define routes
    router.get(&#39;/hello&#39;, async (req, res) =&gt; {
      res.write(JSON.stringify({ message: &#39;Hello World&#39; }));
      res.end();
      return true; // Return true to indicate request was handled
    });

    // Sub-routers can be mounted
    // router.use(&#39;/users&#39;, new UserApi().getRouter());

    return router;
  }
}
</code></pre>
`;var vu=`<h1 id="server-src-app"><a class="header-anchor" href="#server-src-app">#</a>Server (<code>src/app</code>)</h1><p>The server component is responsible for handling incoming network requests, managing SSL certificates, and dispatching requests to the appropriate application based on domain configuration. It supports clustering logic to utilize multi-core CPUs efficiently.</p>
<h2 id="key-features"><a class="header-anchor" href="#key-features">#</a>Key Features</h2><ul>
<li><strong>Multi-App &amp; Multi-Domain</strong>: Host multiple independent applications on a single server instance, routing traffic based on domain names.</li>
<li><strong>Cluster Support</strong>: Automatically forks worker processes to match CPU cores for high performance.</li>
<li><strong>SSL/TLS</strong>: Built-in support for HTTPS with custom certificate paths.</li>
<li><strong>Environment Management</strong>: Loads configuration from <code>.env</code> files.</li>
</ul>
<h2 id="usage-example"><a class="header-anchor" href="#usage-example">#</a>Usage Example</h2><p>See <code>apps/server/src/index.ts</code> for a complete example.</p>
<pre><code class="language-typescript">import { appStart, loadEnv, ServerEnvKeys } from &#39;lupine.api&#39;;
import * as path from &#39;path&#39;;

const initAndStartServer = async () =&gt; {
  // 1. Load Environment Variables
  await loadEnv(&#39;.env&#39;);

  // 2. Configure Applications
  const serverRootPath = path.resolve(process.env[ServerEnvKeys.SERVER_ROOT_PATH]!);
  const webRootMap = [
    {
      appName: &#39;demo.app&#39;,
      hosts: [&#39;localhost&#39;, &#39;example.com&#39;],
      // Standard directory structure expected by lupine.api
      webPath: path.join(serverRootPath, &#39;demo.app_web&#39;),
      dataPath: path.join(serverRootPath, &#39;demo.app_data&#39;),
      apiPath: path.join(serverRootPath, &#39;demo.app_api&#39;),
      dbType: &#39;sqlite&#39;,
      dbConfig: { filename: &#39;sqlite3.db&#39; },
    },
  ];

  // 3. Start Server
  await appStart.start({
    debug: process.env.NODE_ENV === &#39;development&#39;,
    apiConfig: {
      serverRoot: serverRootPath,
      webHostMap: webRootMap,
    },
    serverConfig: {
      httpPort: 8080,
      httpsPort: 8443,
      // sslKeyPath: &#39;...&#39;,
      // sslCrtPath: &#39;...&#39;,
    },
  });
};

initAndStartServer();
</code></pre>
`;var yu=`<h1 id="lupine-api-dashboard"><a class="header-anchor" href="#lupine-api-dashboard">#</a>lupine.api dashboard</h1><p>Please refer to <a href="javascript:lpPressLoad('/en/essentials/dashboard')">Dashboard</a></p>
`;var ku=`<h1 id="lupine-api"><a class="header-anchor" href="#lupine-api">#</a>lupine.api</h1><p>lupine.api is a fast, lightweight, and flexible node.js based server framework. It is designed to work seamlessly with <a href="https://github.com/uuware/lupine.web">lupine.web</a> to provide Server-Side Rendering (SSR) and modern API capabilities.</p>
<p>The project consists of two main parts:</p>
<ol>
<li><strong>Server (<code>src/app</code>)</strong>: A robust HTTP/HTTPS server that manages multiple applications, domains, and processes.</li>
<li><strong>API Module (<code>src/api</code>)</strong>: A framework for building the backend logic for individual applications.</li>
</ol>
<p>Explore the documentation:</p>
<ul>
<li><a href="javascript:lpPressLoad('/en/lupine.api/app')">Server Architecture</a></li>
<li><a href="javascript:lpPressLoad('/en/lupine.api/api')">API Framework</a></li>
<li><a href="javascript:lpPressLoad('/en/lupine.api/dashboard')">Admin Dashboard</a></li>
</ul>
`;var wu=`<h1 id="dateutils"><a class="header-anchor" href="#dateutils">#</a>DateUtils</h1><p>Comprehensive date manipulation utilities.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { DateUtils } from &#39;lupine.components&#39;;

const now = DateUtils.now();
const date = DateUtils.toDate(&#39;2023-01-01T12:00:00Z&#39;);
const ymd = DateUtils.toYMD(date, &#39;/&#39;); // 2023/01/01
const formatted = DateUtils.format(date, &#39;YYYY-MM-DD hh:mm:ss&#39;);

// Difference between two dates
const diff = DateUtils.diffString(new Date(), date);
console.log(diff); // e.g., &quot;2 day(s), 4 hour(s)&quot;
</code></pre>
`;var Su=`<h1 id="domutils"><a class="header-anchor" href="#domutils">#</a>DomUtils</h1><p>Helper functions for common DOM operations, mostly shorthand for <code>querySelector</code>.</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { DomUtils } from &#39;lupine.components&#39;;

// Get input value
const value = DomUtils.getValue(&#39;#my-input&#39;);

// Trigger click on a hidden file input
const fDom = DomUtils.bySelector(&#39;.up-file&#39;) as HTMLInputElement;
fDom.click();
</code></pre>
`;var Cu=`<h1 id="downloadstream"><a class="header-anchor" href="#downloadstream">#</a>downloadStream</h1><p>Download a <code>Blob</code> as a file by creating a temporary anchor tag.</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { downloadStream } from &#39;lupine.components&#39;;

const onDownload = async (name: string) =&gt; {
  const response = await fetch(&#39;/api/download?file=&#39; + name);
  const blob = await response.blob();
  downloadStream(blob, name);
};
</code></pre>
`;var Tu=`<h1 id="dragutil"><a class="header-anchor" href="#dragutil">#</a>DragUtil</h1><p>Helper for implementing drag-and-drop or touch-move functionality.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { createDragUtil } from &#39;lupine.components&#39;;

const dragUtil = createDragUtil();
dragUtil.setOnMoveCallback((clientX, clientY, movedX, movedY) =&gt; {
  console.log(\`Moved by \${movedX}, \${movedY}\`);
  // Update element position here
});

// Bind to events
&lt;div onMouseDown={dragUtil.onMouseDown} onMouseMove={dragUtil.onMouseMove} onMouseUp={dragUtil.onMouseUp}&gt;
  Drag Me
&lt;/div&gt;;
</code></pre>
`;var Pu=`<h1 id="dynamicalload"><a class="header-anchor" href="#dynamicalload">#</a>DynamicalLoad</h1><p>Dynamically load external Scripts or CSS files. Used for lazy loading third-party SDKs.</p>
<p><strong>Usage Example (from <code>wx-share.ts</code>):</strong></p>
<pre><code class="language-typescript">import { DynamicalLoad } from &#39;lupine.components&#39;;

// Load WeChat JS-SDK dynamically
if (typeof wx === &#39;undefined&#39;) {
  await DynamicalLoad.loadScript(&#39;//res.wx.qq.com/open/js/jweixin-1.6.0.js&#39;, &#39;jweixin&#39;);
}
</code></pre>
`;var Mu=`<h1 id="formatbytes"><a class="header-anchor" href="#formatbytes">#</a>formatBytes</h1><p>Format file size in bytes into human-readable strings (KB, MB, GB, etc.).</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { formatBytes } from &#39;lupine.components&#39;;

const sizeStr = formatBytes(1024 * 1024 * 5); // &quot;5 MB&quot;
const sizeStr2 = formatBytes(123456); // &quot;120.56 KB&quot;
</code></pre>
`;var Lu=`<h1 id="lupine-components-libs"><a class="header-anchor" href="#lupine-components-libs">#</a>lupine.components libs</h1><p>This directory contains a suite of utility libraries designed for efficient web development.</p>
<h2 id="utilities"><a class="header-anchor" href="#utilities">#</a>Utilities</h2><ul>
<li><a href="javascript:lpPressLoad('/en/lupine.components-libs/date-utils')">DateUtils</a></li>
<li><a href="javascript:lpPressLoad('/en/lupine.components-libs/simple-storage')">SimpleStorage</a></li>
<li><a href="javascript:lpPressLoad('/en/lupine.components-libs/dynamical-load')">DynamicalLoad</a></li>
<li><a href="javascript:lpPressLoad('/en/lupine.components-libs/format-bytes')">formatBytes</a></li>
</ul>
<h2 id="dom-ui-helpers"><a class="header-anchor" href="#dom-ui-helpers">#</a>DOM &amp; UI Helpers</h2><ul>
<li><a href="javascript:lpPressLoad('/en/lupine.components-libs/dom-utils')">DomUtils</a></li>
<li><a href="javascript:lpPressLoad('/en/lupine.components-libs/lite-dom')">LiteDom</a></li>
<li><a href="javascript:lpPressLoad('/en/lupine.components-libs/drag-util')">DragUtil</a></li>
</ul>
<h2 id="network-files"><a class="header-anchor" href="#network-files">#</a>Network &amp; Files</h2><ul>
<li><a href="javascript:lpPressLoad('/en/lupine.components-libs/upload-file')">uploadFile</a></li>
<li><a href="javascript:lpPressLoad('/en/lupine.components-libs/download-stream')">downloadStream</a></li>
</ul>
<h2 id="event-state"><a class="header-anchor" href="#event-state">#</a>Event &amp; State</h2><ul>
<li><a href="javascript:lpPressLoad('/en/lupine.components-libs/message-hub')">MessageHub</a></li>
<li><a href="javascript:lpPressLoad('/en/lupine.components-libs/observable')">Observable</a></li>
</ul>
`;var Eu=`<h1 id="litedom"><a class="header-anchor" href="#litedom">#</a>LiteDom</h1><p>A lightweight, chainable DOM wrapper similar to jQuery.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { LiteDom } from &#39;lupine.components&#39;;

const el = new LiteDom(&#39;#my-element&#39;);
el.css(&#39;color&#39;, &#39;red&#39;)
  .html(&#39;Hello World&#39;)
  .on(&#39;click&#39;, () =&gt; {
    console.log(&#39;Clicked!&#39;);
  });
</code></pre>
`;var Au=`<h1 id="messagehub"><a class="header-anchor" href="#messagehub">#</a>MessageHub</h1><p>A publish-subscribe event bus for communication between components.</p>
<p><strong>Usage Example (from <code>admin-test-animations.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { MessageHub, MessageHubData } from &#39;lupine.components&#39;;

const hub = new MessageHub();

// Subscribe to messages
hub.subscribe(&#39;test-event&#39;, (data: any) =&gt; {
  console.log(&#39;Received:&#39;, data);
});

// Send message
hub.send(&#39;test-event&#39;, { text: &#39;Hello&#39; });
</code></pre>
`;var Ru=`<h1 id="observable"><a class="header-anchor" href="#observable">#</a>Observable</h1><p>Implementation of the Observable pattern, inspired by RxJS.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { Subject } from &#39;lupine.components&#39;;

const subject = new Subject&lt;string&gt;();

const subscription = subject.subscribe((value) =&gt; {
  console.log(&#39;Observer A received:&#39;, value);
});

subject.next(&#39;Hello&#39;);
subject.next(&#39;World&#39;);

subscription.unsubscribe();
</code></pre>
`;var Du=`<h1 id="simplestorage"><a class="header-anchor" href="#simplestorage">#</a>SimpleStorage</h1><p>A wrapper for <code>localStorage</code> (or similar key-value storage) offering typed getters.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { SimpleStorage } from &#39;lupine.components&#39;;

// Assuming initialized with some storage object like localStorage
const storage = new SimpleStorage(localStorage as any);

storage.set(&#39;theme&#39;, &#39;dark&#39;);
const theme = storage.get(&#39;theme&#39;, &#39;light&#39;); // returns &#39;dark&#39;
const isDebug = storage.getBoolean(&#39;debug&#39;, false);
</code></pre>
`;var Hu=`<h1 id="uploadfile"><a class="header-anchor" href="#uploadfile">#</a>uploadFile</h1><p>Handle file uploads with chunking support, progress tracking, and retries.</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { uploadFile } from &#39;lupine.components&#39;;

const onUploadProgress = (percentage: number, chunkNumber: number, totalChunks: number) =&gt; {
  console.log(\`Progress: \${percentage * 100}%\`);
};

const onFileChange = async (e: Event) =&gt; {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const result = await uploadFile(file, &#39;/api/upload?name=&#39; + file.name, onUploadProgress);

  if (result === true) {
    console.log(&#39;Upload success&#39;);
  }
};
</code></pre>
`;var Iu=`<h1 id="action-sheet"><a class="header-anchor" href="#action-sheet">#</a>Action Sheet</h1><p>A sliding window from the bottom on mobile devices, used for displaying new pages or setting options.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { ActionSheetSelect, NotificationMessage, NotificationColor } from &#39;lupine.components&#39;;

ActionSheetSelect.show({
  title: &#39;Select Action&#39;,
  options: [&#39;Option A&#39;, &#39;Option B&#39;, &#39;Option C&#39;],
  handleClicked: (index, close) =&gt; {
    NotificationMessage.sendMessage(&#39;Selected index: &#39; + index, NotificationColor.Success);
    close();
  },
});
</code></pre>
`;var zu=`<h1 id="button"><a class="header-anchor" href="#button">#</a>Button</h1><p>Basic buttons with multiple sizes and push animation.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Button, ButtonSize } from &#39;lupine.components&#39;;

&lt;Button text=&#39;Submit&#39; size={ButtonSize.Large} onClick={() =&gt; {}} /&gt;
&lt;Button text=&#39;Search&#39; size={ButtonSize.Medium} onClick={() =&gt; {}} /&gt;
&lt;Button text=&#39;Cancel&#39; size={ButtonSize.Small} onClick={() =&gt; {}} /&gt;
</code></pre>
`;var ju=`<h1 id="dragfresh"><a class="header-anchor" href="#dragfresh">#</a>DragFresh</h1><p>Drag-to-refresh component, commonly used at the top of mobile lists.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { DragFresh } from &#39;lupine.components&#39;;

&lt;DragFresh
  onRefresh={async () =&gt; {
    // Perform refresh logic
    await fetchData();
  }}
&gt;
  &lt;ListContent /&gt;
&lt;/DragFresh&gt;;
</code></pre>
`;var Bu=`<h1 id="editablelabel"><a class="header-anchor" href="#editablelabel">#</a>EditableLabel</h1><p>Label that becomes editable on double-click and triggers a save event on blur.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { EditableLabel } from &#39;lupine.components&#39;;

&lt;EditableLabel
  value=&#39;Click to edit me&#39;
  onSave={(newValue) =&gt; {
    console.log(&#39;Saved new value:&#39;, newValue);
  }}
/&gt;;
</code></pre>
`;var Ou=`<h1 id="floatwindow"><a class="header-anchor" href="#floatwindow">#</a>FloatWindow</h1><p>A draggable popup window. Supports modal and non-modal modes.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { FloatWindow } from &#39;lupine.components&#39;;

// Show a non-modal window
FloatWindow.show({
  title: &#39;Toolbox&#39;,
  buttons: [&#39;OK&#39;],
  handleClicked: (index, close) =&gt; {
    close();
  },
  children: &lt;div&gt;This is the content of a non-modal float window.&lt;/div&gt;,
  noModal: true,
});
</code></pre>
`;var Fu=`<h1 id="grid"><a class="header-anchor" href="#grid">#</a>Grid</h1><p>Responsive grid layout for displaying complex layouts.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Grid } from &#39;lupine.components&#39;;

&lt;Grid columns={3} gap=&#39;10px&#39;&gt;
  &lt;div&gt;Item 1&lt;/div&gt;
  &lt;div&gt;Item 2&lt;/div&gt;
  &lt;div&gt;Item 3&lt;/div&gt;
&lt;/Grid&gt;;
</code></pre>
`;var qu=`<h1 id="htmlload"><a class="header-anchor" href="#htmlload">#</a>HtmlLoad</h1><p>Component for asynchronously loading and displaying remote HTML content.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { HtmlLoad } from &#39;lupine.components&#39;;

&lt;HtmlLoad url=&#39;/api/v1/content/article-1&#39; /&gt;;
</code></pre>
`;var Nu=`<h1 id="htmlvar"><a class="header-anchor" href="#htmlvar">#</a>HtmlVar</h1><p><code>HtmlVar</code> is the core primitive for reactivity in Lupine.js. Unlike modern frameworks that attempt to automatically detect state changes, <code>HtmlVar</code> gives you a manual &quot;handle&quot; to a specific DOM slot that you can update at any time.</p>
<h2 id="1-correct-usage"><a class="header-anchor" href="#1-correct-usage">#</a>1. Correct Usage</h2><p><code>HtmlVar</code> is not a Component you render (like <code>&lt;HtmlVar /&gt;</code>). It is a <strong>Class</strong> that you instantiate.</p>
<ol>
<li>Create an instance: <code>const dom = new HtmlVar(initialValue)</code>.</li>
<li>Embed its node in your JSX: <code>{dom.node}</code>.</li>
<li>Update it explicitly: <code>dom.value = newValue</code>.</li>
</ol>
<h3 id="example"><a class="header-anchor" href="#example">#</a>Example</h3><pre><code class="language-tsx">import { HtmlVar, RefProps } from &#39;lupine.components&#39;;

const TestButton = () =&gt; {
  // 1. Create the reactive variable
  const dom = new HtmlVar(&#39;&#39;);

  // 2. Define actions that update it
  const onClick = async () =&gt; {
    // This triggers a Spot Update on the DOM element below
    dom.value = &#39;You clicked the button.&#39;;
  };

  const ref: RefProps = {
    onLoad: async () =&gt; {
      dom.value = &#39;This value is set in onLoad event.&#39;;
    },
  };

  return (
    &lt;div ref={ref} class=&#39;row-box pt-m&#39;&gt;
      &lt;button onClick={onClick} class=&#39;button-base&#39;&gt;
        Click me!
      &lt;/button&gt;
      {/* 3. Drop the &quot;Anchor&quot; here */}
      &lt;div class=&#39;pl-m&#39;&gt;{dom.node}&lt;/div&gt;
    &lt;/div&gt;
  );
};
</code></pre>
<h2 id="2-comparison-with-modern-frameworks"><a class="header-anchor" href="#2-comparison-with-modern-frameworks">#</a>2. Comparison with Modern Frameworks</h2><p>If you come from React, Vue, or SolidJS, this might look verbose.</p>
<table>
<thead>
<tr>
<th align="left">Framework</th>
<th align="left">Mechanism</th>
<th align="left">Code Syntax</th>
</tr>
</thead>
<tbody><tr>
<td align="left"><strong>React</strong></td>
<td align="left">Virtual DOM Diffing</td>
<td align="left"><code>const [val, setVal] = useState(0);</code></td>
</tr>
<tr>
<td align="left"><strong>SolidJS</strong></td>
<td align="left">Fine-Grained Signals</td>
<td align="left"><code>const [val, setVal] = createSignal(0);</code></td>
</tr>
<tr>
<td align="left"><strong>Lupine.js</strong></td>
<td align="left"><strong>Manual Spot Replacement</strong></td>
<td align="left"><code>const val = new HtmlVar(0); val.value = 1;</code></td>
</tr>
</tbody></table>
<p><strong>The Trade-off:</strong></p>
<ul>
<li><strong>Modern Frameworks</strong>: Focus on &quot;Developer Experience&quot;. You change state, the magic happens.</li>
<li><strong>Lupine.js</strong>: Focuses on &quot;Explicit Performance&quot;. You tell the browser exactly <em>which</em> <code>&lt;div&gt;</code> to update. There is no guesswork or accidental re-renders.</li>
</ul>
<h2 id="3-recommended-helper-val-t"><a class="header-anchor" href="#3-recommended-helper-val-t">#</a>3. Recommended Helper: <code>val&lt;T&gt;</code></h2><p>If you prefer the modern syntax of &quot;Signals&quot;, you can use the <code>val</code> helper. It is functionally identical to <code>HtmlVar</code> but offers a syntactic sugar that feels like &quot;Automatic Updates&quot;.</p>
<pre><code class="language-tsx">// 1. Define the helper (or import it from lib)
export function val&lt;T&gt;(initial: T) {
  const internal = new HtmlVar(initial);
  // Getter
  const signal = () =&gt; internal.value;
  // Setter
  signal.set = (v: T) =&gt; {
    internal.value = v;
  };
  // Renderable Node
  signal.jsx = () =&gt; internal.node;
  return signal;
}

// 2. Usage
const Counter = () =&gt; {
  const count = val(0);

  return (
    &lt;div&gt;
      &lt;button onclick={() =&gt; count.set(count() + 1)}&gt;Add&lt;/button&gt;

      {/* Looks like a modern framework! */}
      &lt;span&gt;{count.jsx()}&lt;/span&gt;
    &lt;/div&gt;
  );
};
</code></pre>
<p>In fact, whether you use <code>HtmlVar</code> class directly or the <code>val()</code> wrapper, the underlying mechanism is the same: <strong>Surgical updates to DOM fragments without diffing.</strong></p>
`;var Wu=`<h1 id="lupine-components"><a class="header-anchor" href="#lupine-components">#</a>lupine.components</h1><p>lupine.components is a collection of React-like, extremely fast, small size and lightweight frontend components for lupine.web.
It provides a rich set of common desktop and mobile components designed for high-performance UI development.</p>
<h2 id="core-features"><a class="header-anchor" href="#core-features">#</a>Core Features</h2><ul>
<li><strong>Ultra Lightweight</strong>: No bloated code, ensuring fast application loading.</li>
<li><strong>React-Syntax Driven</strong>: Supports TSX syntax for a familiar development experience.</li>
<li><strong>Cross-Platform</strong>: Components are natively responsive for desktop and mobile interactions.</li>
<li><strong>Zero Dependencies</strong>: Keeps the dependency tree clean and easy to maintain.</li>
</ul>
<h2 id="quick-start"><a class="header-anchor" href="#quick-start">#</a>Quick Start</h2><p>You can explore component details and implementation examples using the sidebar on the left.</p>
`;var _u=`<h1 id="inputwithtitle"><a class="header-anchor" href="#inputwithtitle">#</a>InputWithTitle</h1><p>Input field combined with a title.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { InputWithTitle } from &#39;lupine.components&#39;;

const input = InputWithTitle(&#39;Username&#39;, &#39;Enter your name&#39;, (value) =&gt; {
  console.log(&#39;Value entered:&#39;, value);
});
</code></pre>
`;var Uu=`<h1 id="menubar"><a class="header-anchor" href="#menubar">#</a>Menubar</h1><p>Horizontal navigation bar with dropdown support.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Menubar } from &#39;lupine.components&#39;;

const menuItems = [
  { text: &#39;Home&#39;, link: &#39;/&#39; },
  {
    text: &#39;Products&#39;,
    children: [
      { text: &#39;Lupine.js&#39;, link: &#39;/lupine&#39; },
      { text: &#39;Components&#39;, link: &#39;/components&#39; },
    ],
  },
];

&lt;Menubar items={menuItems} /&gt;;
</code></pre>
`;var $u=`<h1 id="menusidebar"><a class="header-anchor" href="#menusidebar">#</a>MenuSidebar</h1><p>Vertical sidebar menu with multi-level support, desktop and mobile adaptive.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { MenuSidebar } from &#39;lupine.components&#39;;

const myMenu = [
  { text: &#39;Dashboard&#39;, icon: &#39;dashboard&#39;, onClick: () =&gt; navigate(&#39;/admin&#39;) },
  {
    text: &#39;Settings&#39;,
    icon: &#39;settings&#39;,
    children: [
      { text: &#39;Profile&#39;, onClick: () =&gt; navigate(&#39;/profile&#39;) },
      { text: &#39;Security&#39;, onClick: () =&gt; navigate(&#39;/security&#39;) },
    ],
  },
];

&lt;MenuSidebar items={myMenu} desktopMenu={true} /&gt;;
</code></pre>
`;var Vu=`<h1 id="messagebox"><a class="header-anchor" href="#messagebox">#</a>MessageBox</h1><p>Predefined dialogs (like Yes/No, Ok/Cancel) for quick alerts.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { MessageBox, MessageBoxButtonProps } from &#39;lupine.components&#39;;

MessageBox.show({
  title: &#39;Delete Confirmation&#39;,
  buttonType: MessageBoxButtonProps.YesNo,
  contentMinWidth: &#39;200px&#39;,
  handleClicked: (index, close) =&gt; {
    if (index === 0) {
      // Yes
      console.log(&#39;User confirmed&#39;);
    }
    close();
  },
  children: &lt;div&gt;Are you sure you want to delete this item?&lt;/div&gt;,
});
</code></pre>
`;var Gu=`<h1 id="modal"><a class="header-anchor" href="#modal">#</a>Modal</h1><p>A popup window with or without modal effect, used for blocking interactions. It is draggable.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { ModalWindow } from &#39;lupine.components&#39;;

ModalWindow.show({
  title: &#39;Notification&#39;,
  buttons: [&#39;OK&#39;, &#39;Cancel&#39;],
  closeWhenClickOutside: true,
  contentMinWidth: &#39;300px&#39;,
  handleClicked: (index, close) =&gt; {
    console.log(&#39;Button index clicked:&#39;, index);
    close();
  },
  children: &lt;div&gt;This is the content of a modal dialog.&lt;/div&gt;,
});
</code></pre>
`;var Yu=`<h1 id="noticemessage"><a class="header-anchor" href="#noticemessage">#</a>NoticeMessage</h1><p>A core component used to display global notification messages at the top of the page. Supports multiple color levels.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { NotificationMessage, NotificationColor } from &#39;lupine.components&#39;;

// Success notification
NotificationMessage.sendMessage(&#39;Data saved successfully&#39;, NotificationColor.Success);

// Error notification (Permanent)
NotificationMessage.sendMessage(&#39;Network error, please check&#39;, NotificationColor.Error, true);
</code></pre>
`;var Ju=`<h1 id="paginglink"><a class="header-anchor" href="#paginglink">#</a>PagingLink</h1><p>Pagination component for displaying and navigating to different page numbers.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { PagingLink } from &#39;lupine.components&#39;;

&lt;PagingLink
  totalCount={100}
  pageSize={10}
  currentPage={1}
  onPageChange={(page) =&gt; console.log(&#39;Navigate to page:&#39;, page)}
/&gt;;
</code></pre>
`;var Xu=`<h1 id="popupmenu"><a class="header-anchor" href="#popupmenu">#</a>PopupMenu</h1><p>Popup menu triggered by click or hover. Used for displaying options.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { PopupMenuWithButton } from &#39;lupine.components&#39;;

const options = [&#39;Settings&#39;, &#39;Messages&#39;, &#39;Logout&#39;];

&lt;PopupMenuWithButton label=&#39;My Account&#39; list={options} handleSelected={(value) =&gt; console.log(&#39;Selected:&#39;, value)} /&gt;;
</code></pre>
`;var Ku=`<h1 id="progress"><a class="header-anchor" href="#progress">#</a>Progress</h1><p>Used to display the progress of uploads, downloads, or other time-consuming operations.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Progress } from &#39;lupine.components&#39;;

&lt;Progress value={75} max={100} showText={true} /&gt;;
</code></pre>
`;var Qu=`<h1 id="radiolabel"><a class="header-anchor" href="#radiolabel">#</a>RadioLabel</h1><p>Radio button group labels.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">// Used with input-label class
&lt;label class=&#39;input-label&#39;&gt;
  &lt;input class=&#39;input-base&#39; type=&#39;radio&#39; name=&#39;group1&#39; /&gt;
  Option A
&lt;/label&gt;
&lt;label class=&#39;input-label&#39;&gt;
  &lt;input class=&#39;input-base&#39; type=&#39;radio&#39; name=&#39;group1&#39; checked /&gt;
  Option B
&lt;/label&gt;
</code></pre>
`;var Zu=`<h1 id="redirect"><a class="header-anchor" href="#redirect">#</a>Redirect</h1><p>Redirection component for page navigation.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Redirect } from &#39;lupine.components&#39;;

&lt;Redirect to=&#39;/login&#39; /&gt;;
</code></pre>
`;var eg=`<h1 id="resizablesplitter"><a class="header-anchor" href="#resizablesplitter">#</a>ResizableSplitter</h1><p>Splitter that allows dragging to resize two components.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { ResizableSplitter } from &#39;lupine.components&#39;;

&lt;ResizableSplitter left={&lt;div&gt;Left Content&lt;/div&gt;} right={&lt;div&gt;Right Content&lt;/div&gt;} minWidth=&#39;200px&#39; /&gt;;
</code></pre>
`;var tg=`<h1 id="selectangle"><a class="header-anchor" href="#selectangle">#</a>SelectAngle</h1><p>360-degree angle selector.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SelectAngle } from &#39;lupine.components&#39;;

&lt;SelectAngle value={90} onChange={(angle) =&gt; console.log(&#39;Selected angle:&#39;, angle)} /&gt;;
</code></pre>
`;var og=`<h1 id="selectwithtitle"><a class="header-anchor" href="#selectwithtitle">#</a>SelectWithTitle</h1><p>Dropdown select list combined with a title.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SelectWithTitle } from &#39;lupine.components&#39;;

const options = [
  { option: &#39;Option 1&#39;, value: &#39;1&#39; },
  { option: &#39;Option 2&#39;, value: &#39;2&#39;, selected: true },
];

const select = SelectWithTitle(&#39;Select Level&#39;, options, (value) =&gt; {
  console.log(&#39;Selected value:&#39;, value);
});
</code></pre>
`;var ng=`<h1 id="slidetab"><a class="header-anchor" href="#slidetab">#</a>SlideTab</h1><p>Auto-switching tab component with sliding support.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SlideTab } from &#39;lupine.components&#39;;

const items = [
  { title: &#39;Slide 1&#39;, children: &lt;div&gt;Content 1&lt;/div&gt; },
  { title: &#39;Slide 2&#39;, children: &lt;div&gt;Content 2&lt;/div&gt; },
];

&lt;SlideTab items={items} autoPlay={true} interval={3000} /&gt;;
</code></pre>
`;var ig=`<h1 id="spinner"><a class="header-anchor" href="#spinner">#</a>Spinner</h1><p>A spinning loading animation, commonly used while waiting for data to load.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Spinner } from &#39;lupine.components&#39;;

&lt;Spinner size=&#39;30px&#39; color=&#39;var(--primary-color)&#39; /&gt;;
</code></pre>
`;var rg=`<h1 id="stars"><a class="header-anchor" href="#stars">#</a>Stars</h1><p>Star rating component.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Stars } from &#39;lupine.components&#39;;

&lt;Stars value={4.5} onChanged={(score) =&gt; console.log(&#39;Score changed to:&#39;, score)} /&gt;;
</code></pre>
`;var ag=`<h1 id="svgicon"><a class="header-anchor" href="#svgicon">#</a>SvgIcon</h1><p>High-performance native SVG icon component, supporting icons via path or name.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SvgIcon } from &#39;lupine.components&#39;;

&lt;SvgIcon name=&#39;home&#39; size={24} /&gt;
&lt;SvgIcon name=&#39;settings&#39; color=&#39;red&#39; /&gt;
</code></pre>
`;var sg=`<h1 id="switchoption"><a class="header-anchor" href="#switchoption">#</a>SwitchOption</h1><p>Switch option component. Allows switching between two text options.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SwitchOption } from &#39;lupine.components&#39;;

&lt;SwitchOption options={[&#39;Option 1&#39;, &#39;Option 2&#39;]} onChanged={(index) =&gt; console.log(&#39;Current index:&#39;, index)} /&gt;;
</code></pre>
`;var lg=`<h1 id="tabs"><a class="header-anchor" href="#tabs">#</a>Tabs</h1><p>Standard tab component for switching between different content in the same area.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Tabs, TabsPageProps } from &#39;lupine.components&#39;;

const pages: TabsPageProps[] = [
  { title: &#39;Overview&#39;, children: &lt;Overview /&gt; },
  { title: &#39;Details&#39;, children: &lt;Details /&gt; },
];

&lt;Tabs pages={pages} pagePadding=&#39;16px&#39; /&gt;;
</code></pre>
`;var cg=`<h1 id="textglow"><a class="header-anchor" href="#textglow">#</a>TextGlow</h1><p>Glowing animation text component.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { TextGlow } from &#39;lupine.components&#39;;

&lt;TextGlow text=&#39;Glowing Text&#39; /&gt;;
</code></pre>
`;var dg=`<h1 id="textscale"><a class="header-anchor" href="#textscale">#</a>TextScale</h1><p>Text component with scaling animation effect.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { TextScale } from &#39;lupine.components&#39;;

&lt;TextScale text=&#39;Scaling Text&#39; /&gt;;
</code></pre>
`;var pg=`<h1 id="textwave"><a class="header-anchor" href="#textwave">#</a>TextWave</h1><p>Text component with waving animation effect.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { TextWave } from &#39;lupine.components&#39;;

&lt;TextWave text=&#39;Waving Text&#39; /&gt;;
</code></pre>
`;var ug=`<h1 id="togglebase"><a class="header-anchor" href="#togglebase">#</a>ToggleBase</h1><p>Base class for toggle components, used to implement custom toggle components.</p>
<h2 id="description"><a class="header-anchor" href="#description">#</a>Description</h2><p>This is an internal base class, generally not used directly in applications unless you want to implement custom toggle interaction logic.</p>
`;var gg=`<h1 id="toggleswitch"><a class="header-anchor" href="#toggleswitch">#</a>ToggleSwitch</h1><p>Toggle switch, commonly used for settings.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { ToggleSwitch, ToggleSwitchSize } from &#39;lupine.components&#39;;

&lt;ToggleSwitch checked={true} size={ToggleSwitchSize.Medium} text={{ on: &#39;On&#39;, off: &#39;Off&#39; }} textWidth=&#39;60px&#39; /&gt;;
</code></pre>
`;var hg="";var mg=`<h1 id="lupine-press"><a class="header-anchor" href="#lupine-press">#</a>lupine.press</h1><p><code>lupine.press</code> is a lightweight, high-performance documentation site framework built on top of <code>lupine.web</code>. It provides a complete solution for rendering Markdown-based documentation websites with a responsive layout, sidebar navigation, and theming support.</p>
<p>It is designed to work seamlessly with the <code>lupine</code> ecosystem, powering documentation sites like the official Lupine.js documentation.</p>
<h2 id="features"><a class="header-anchor" href="#features">#</a>Features</h2><ul>
<li><strong>Responsive Layout</strong>: Built-in <code>PressFrame</code> provides a standard documentation layout with a header, responsive sidebar, and content area.</li>
<li><strong>Markdown Rendering</strong>: Optimized for rendering content generated from Markdown files, including syntax highlighting and standard typography.</li>
<li><strong>Sidebar Navigation</strong>: Automatically generates a multi-level sidebar based on your configuration.</li>
<li><strong>Theming</strong>: Built-in support for multiple themes (e.g., light/dark mode) via <code>lupine.components</code> theme system.</li>
<li><strong>Routing</strong>: explicit integration with <code>PageRouter</code> for handling client-side navigation.</li>
<li><strong>Multilingual Support</strong>: Automatically scans markdown files from multilingual directories and supports language switching.</li>
<li><strong>Styles Support</strong>: You can set styles in markdown files.</li>
</ul>
<h2 id="usage-guide"><a class="header-anchor" href="#usage-guide">#</a>Usage Guide</h2><h3 id="1-create-a-project"><a class="header-anchor" href="#1-create-a-project">#</a>1. Create a Project</h3><p>To use <code>lupine.press</code>, you typically set up a <code>lupine.web</code> application and configure it to use <code>PressPage</code> as the main route handler.
The easiest way is to use the <code>create-lupine</code> command to create a new <code>lupine.press</code> application.</p>
<pre><code class="language-bash">npx create-lupine@latest my-docs
</code></pre>
<p>Then select <code>doc-starter</code> template.</p>
<h3 id="2-basic-setup"><a class="header-anchor" href="#2-basic-setup">#</a>2. Basic Setup</h3><p>You can see these configurations in the created application.
In your application entry point (e.g., <code>src/index.tsx</code>), you can see the necessary binding configurations and router settings.</p>
<pre><code class="language-typescript">import { bindRouter, PageRouter, bindTheme, bindLang, setDefaultPageTitle } from &#39;lupine.components&#39;;
import { bindPressData, PressPage, pressThemes } from &#39;lupine.press&#39;;
import { markdownConfig } from &#39;./markdown-config&#39;; // Your generated markdown data

// 1. Initialize core settings
bindLang(&#39;en&#39;, {}); // Set default language
bindTheme(&#39;light&#39;, pressThemes); // Bind themes (includes specific styles for press)
setDefaultPageTitle(&#39;My Documentation&#39;);

// 2. Bind documentation data
// markdownConfig is a dictionary containing HTML content and metadata generated from markdown files.
bindPressData(markdownConfig);

// 3. Configure Router
const pageRouter = new PageRouter();
// Route all requests to PressPage, which handles looking up content in markdownConfig
pageRouter.use(&#39;*&#39;, PressPage);

// 4. Start the application
bindRouter(pageRouter);
</code></pre>
<h3 id="3-data-structure-markdownconfig"><a class="header-anchor" href="#3-data-structure-markdownconfig">#</a>3. Data Structure (<code>markdownConfig</code>)</h3><p>The <code>bindPressData</code> function expects a configuration object where keys are route paths (e.g., <code>/guide/started</code>) and values contain the content and metadata.</p>
<p>Typically, this data is generated at build time from your Markdown files.</p>
<pre><code class="language-typescript">export const markdownConfig = {
  &#39;/en/guide/started&#39;: {
    html: &#39;&lt;h1&gt;Getting Started&lt;/h1&gt;&lt;p&gt;...&lt;/p&gt;&#39;, // Pre-rendered HTML content
    data: {
      title: &#39;Getting Started&#39;,
      sidebar: [
        // Sidebar configuration for this page context
        { type: &#39;group&#39;, text: &#39;Guide&#39;, level: 0 },
        { type: &#39;link&#39;, text: &#39;Installation&#39;, link: &#39;/en/guide/install&#39;, level: 1 },
      ],
    },
    headings: [{ level: 2, text: &#39;Prerequisites&#39;, id: &#39;prerequisites&#39; }],
  },
  // ... other pages
};
</code></pre>
<h2 id="markdown-file-structure-association"><a class="header-anchor" href="#markdown-file-structure-association">#</a>Markdown File Structure &amp; Association</h2><h3 id="top-level-configuration"><a class="header-anchor" href="#top-level-configuration">#</a>Top-level Configuration</h3><p>A <code>index.md</code> file must exist in the top-level directory of your Markdown files. This file uses the <code>lang</code> field to specify all supported languages for the site.</p>
<pre><code class="language-yaml">---
lang:
  - title: English
    id: en
  - title: \u7B80\u4F53\u4E2D\u6587
    id: zh
---
</code></pre>
<h3 id="multilingual-configuration"><a class="header-anchor" href="#multilingual-configuration">#</a>Multilingual Configuration</h3><p>Each language ID (e.g., <code>en</code>, <code>zh</code>) corresponds to a subdirectory, which must contain its own <code>index.md</code> file. This file configures global settings for that language version, such as layout, page title, and sidebar width. All Markdown content files for that language should be stored within this directory or its subdirectories.</p>
<p>The <code>index.md</code> supports defining:</p>
<ul>
<li><strong>Hero &amp; Features</strong>: Homepage hero banner and feature introduction.</li>
<li><strong>Nav</strong>: Top navigation links.</li>
<li><strong>GitHub</strong>: Repository links.</li>
<li><strong>Sidebar</strong>: Sidebar menu configuration (Core parameter).</li>
</ul>
<h3 id="sidebar-configuration"><a class="header-anchor" href="#sidebar-configuration">#</a>Sidebar Configuration</h3><p>The <code>sidebar</code> parameter is an array that supports three configuration patterns:</p>
<ol>
<li><strong>Submenu Pattern (<code>submenu</code>)</strong>:
Points to a subdirectory. The system will automatically expand the <code>sidebar</code> configuration defined in that subdirectory&#39;s <code>index.md</code> and merge its content into the current level.</li>
<li><strong>Group Pattern (<code>text</code> + <code>items</code>)</strong>:
Defines a menu group. <code>text</code> is the group title, and <code>items</code> is the list of links under this group.</li>
<li><strong>Flat Pattern (<code>items</code> only)</strong>:
Defines <code>items</code> without <code>text</code>. In this case, all links in <code>items</code> will be displayed directly at the current level without grouping.</li>
</ol>
<h2 id="architecture"><a class="header-anchor" href="#architecture">#</a>Architecture</h2><ul>
<li><strong><code>PressFrame</code></strong>: The main layout component. It handles the specific CSS and structure for a documentation site, ensuring the sidebar and content area scroll independently.</li>
<li><strong><code>PressPage</code></strong>: The &quot;controller&quot; component. It looks up the current URL in the bound <code>markdownConfig</code>, retrieves the corresponding HTML and metadata, and renders the <code>PressFrame</code> with the correct sidebar and content.</li>
<li><strong><code>pressLoad</code></strong>: A navigation utility to handle link clicks within the documentation, ensuring smooth client-side transitions.</li>
</ul>
<h2 id="styles"><a class="header-anchor" href="#styles">#</a>Styles</h2><p>styles can define font, color styles and will be applied to all pages.</p>
<pre><code class="language-css">styles:
  &#39;:root&#39;: { &#39;--primary-accent-color&#39;: &#39;#0ac92a&#39; }
  body: { font-family: var(--font-family-base); }
</code></pre>
`;var fg=`<h1 id="lupine-web"><a class="header-anchor" href="#lupine-web">#</a>lupine.web</h1><p><strong>lupine.web</strong> is a React-like, extremely fast, small-size, and lightweight frontend framework.</p>
<p>Explore the documentation:</p>
<ul>
<li><a href="javascript:lpPressLoad('/en/lupine.web/overview')">Overview</a></li>
</ul>
`;var bg=`<h1 id="lupine-web"><a class="header-anchor" href="#lupine-web">#</a>lupine.web</h1><p><strong>lupine.web</strong> is a React-like, extremely fast, small-size, and lightweight frontend framework designed for modern web development. It focuses on performance, simplicity, and a full-stack experience when paired with <code>lupine.api</code>.</p>
<h2 id="why-lupine-web"><a class="header-anchor" href="#why-lupine-web">#</a>Why lupine.web?</h2><h3 id="zero-dependency-lightweight"><a class="header-anchor" href="#zero-dependency-lightweight">#</a>\u{1F680} Zero-Dependency &amp; Lightweight</h3><p>We believe in keeping things simple. <code>lupine.web</code> has <strong>zero external dependencies</strong>, resulting in a tiny bundle size and lightning-fast load times. It uses TSX syntax, so if you know React, you already feel at home.</p>
<h3 id="built-in-css-in-js-essentials-css-in-js"><a class="header-anchor" href="#built-in-css-in-js-essentials-css-in-js">#</a>\u{1F3A8} Built-in CSS-in-JS <a href="javascript:lpPressLoad('/en/essentials/css-in-js')">\u{1F517}</a></h3><p>Forget about setting up complex CSS loaders or external styling libraries. <code>lupine.web</code> comes with a powerful, built-in CSS-in-JS solution.</p>
<ul>
<li><strong>Scoped Styles</strong>: Styles are automatically scoped to your components to prevent collisions.</li>
<li><strong>Nesting Support</strong>: Write cleaner CSS with nested selectors (e.g., <code>&amp;:hover</code>, <code>&amp; &gt; span</code>).</li>
<li><strong>Theming</strong>: Native support for light/dark modes and custom themes.</li>
</ul>
<pre><code class="language-tsx">const MyButton = (props) =&gt; (
  &lt;button
    css={{
      backgroundColor: &#39;blue&#39;,
      color: &#39;white&#39;,
      &#39;&amp;:hover&#39;: { backgroundColor: &#39;darkblue&#39; },
      [MediaQueryRange.Mobile]: { width: &#39;100%&#39; },
    }}
  &gt;
    {props.children}
  &lt;/button&gt;
);
</code></pre>
<h3 id="powerful-router-essentials-page-route"><a class="header-anchor" href="#powerful-router-essentials-page-route">#</a>\u{1F6E3}\uFE0F Powerful Router <a href="javascript:lpPressLoad('/en/essentials/page-route')">\u{1F517}</a></h3><p>Our functional router is designed for flexibility and control.</p>
<ul>
<li><strong>Route Guards</strong>: Easily implement authentication checks or permissions.</li>
<li><strong>Nested Routes</strong>: Organize your application with sub-routers for modular architecture.</li>
<li><strong>SSR Ready</strong>: Routes work seamlessly on both server and client.</li>
</ul>
<pre><code class="language-typescript">const pageRouter = new PageRouter();
// Middleware/Guard example
pageRouter.setFilter(async (props) =&gt; {
  if (!checkAuth(props)) return &lt;Redirect to=&#39;/login&#39; /&gt;;
  return null; // Pass
});
pageRouter.use(&#39;/dashboard/*&#39;, DashboardRouter);
</code></pre>
<h3 id="server-side-rendering-ssr-first-essentials-ssr"><a class="header-anchor" href="#server-side-rendering-ssr-first-essentials-ssr">#</a>\u26A1 Server-Side Rendering (SSR) First <a href="javascript:lpPressLoad('/en/essentials/ssr')">\u{1F517}</a></h3><p>Visual performance is critical. <code>lupine.web</code> is built with SSR in mind from day one.</p>
<ul>
<li><strong>No Flashing</strong>: Content is rendered on the server, ensuring users see the page immediately.</li>
<li><strong>SEO Friendly</strong>: Fully customizable Metadata and Open Graph (OG) tags for social sharing.</li>
<li><strong>Hydration</strong>: The client takes over smoothly without re-rendering the entire tree.</li>
</ul>
<h3 id="internationalization-i18n"><a class="header-anchor" href="#internationalization-i18n">#</a>\u{1F30D} Internationalization (i18n)</h3><p>Go global with ease. Built-in support for multi-language applications allows you to switch languages dynamically without complex configuration.</p>
<h3 id="environment-configuration"><a class="header-anchor" href="#environment-configuration">#</a>\u{1F6E0}\uFE0F Environment Configuration</h3><p>Manage your application environments efficiently. <code>lupine.web</code> supports loading environment variables (from <code>.env</code> files via <code>lupine.api</code>) and injecting strictly filtered configurations into the frontend.</p>
`;var xg=`<p>\u201C\u4E00\u6B21\u7F16\u5199\uFF0C\u5230\u5904\u8FD0\u884C\u201D\u7684\u68A6\u60F3\u5F80\u5F80\u4F34\u968F\u7740\u5DE8\u5927\u7684\u59A5\u534F\u3002\u6C89\u91CD\u7684\u6846\u67B6\u3001\u6DF7\u4E71\u7684\u6761\u4EF6\u5224\u65AD\u4EE3\u7801\u4EE5\u53CA\u7CDF\u7CD5\u7684\u6027\u80FD\uFF0C\u901A\u5E38\u662F\u8DE8\u5E73\u53F0\u5F00\u53D1\u7684\u5669\u68A6\u3002</p>
<p><strong>Lupine.js</strong> \u6539\u53D8\u4E86\u8FD9\u4E00\u5207\u3002\u5B83\u4ECE\u5E95\u5C42\u8BBE\u8BA1\u5F00\u59CB\u5C31\u662F\u4E00\u4E2A<strong>\u901A\u7528\u6846\u67B6</strong>\u3002\u901A\u8FC7\u5229\u7528 <strong>Capacitor</strong> (\u79FB\u52A8\u7AEF) \u548C <strong>Electron</strong> (\u684C\u9762\u7AEF)\uFF0C\u4F60\u53EF\u4EE5\u5229\u7528\u540C\u4E00\u5957 TypeScript \u4EE3\u7801\u5E93\uFF0C\u5C06\u5E94\u7528\u53D1\u5E03\u5230 Web\u3001iOS\u3001Android\u3001Windows\u3001macOS \u548C Linux\u3002</p>
<p><img src="/lupine.js/assets/architecture_cross_platform.png" alt="Lupine.js \u67B6\u6784"></p>
<p>\u5728\u672C\u6307\u5357\u4E2D\uFF0C\u6211\u4EEC\u5C06\u4EE5\u5373\u5C06\u771F\u5B9E\u4E0A\u7EBF\u7684 <strong>Lupine \u793A\u4F8B\u5E94\u7528</strong> \u5E94\u7528\u4E3A\u4F8B\uFF0C\u6F14\u793A\u5982\u4F55\u5C06\u4E00\u4E2A\u6807\u7684 Lupine.js Web \u5E94\u7528\u6269\u5C55\u5230\u79FB\u52A8\u7AEF\u548C\u684C\u9762\u7AEF\u3002</p>
<h2 id="1-\u6838\u5FC3-\u54CD\u5E94\u5F0F-web-\u5E94\u7528"><a class="header-anchor" href="#1-\u6838\u5FC3-\u54CD\u5E94\u5F0F-web-\u5E94\u7528">#</a>1. \u6838\u5FC3\uFF1A\u54CD\u5E94\u5F0F Web \u5E94\u7528</h2><p>\u5728\u63A5\u89E6\u4EFB\u4F55\u539F\u751F\u4EE3\u7801\u4E4B\u524D\uFF0C\u6211\u4EEC\u9700\u8981\u4E00\u4E2A\u54CD\u5E94\u5F0F\u7684 Web \u5E94\u7528\u3002Lupine.js \u901A\u8FC7\u5185\u7F6E\u7684\u54CD\u5E94\u5F0F\u5DE5\u5177\u548C CSS-in-JS \u5F15\u64CE\uFF0C\u8BA9\u8FD9\u4E00\u5207\u53D8\u5F97\u7B80\u5355\u3002</p>
<h3 id="\u54CD\u5E94\u5F0F\u6837\u5F0F"><a class="header-anchor" href="#\u54CD\u5E94\u5F0F\u6837\u5F0F">#</a>\u54CD\u5E94\u5F0F\u6837\u5F0F</h3><p>\u4F60\u4E0D\u9700\u8981\u4E3A\u79FB\u52A8\u7AEF\u7F16\u5199\u5355\u72EC\u7684 CSS \u6587\u4EF6\uFF0C\u800C\u662F\u76F4\u63A5\u5728\u7EC4\u4EF6\u6837\u5F0F\u4E2D\u4F7F\u7528 <code>MediaQueryRange</code>\uFF1A</p>
<pre><code class="language-tsx">import { MediaQueryRange, CssProps } from &#39;lupine.web&#39;;

const css: CssProps = {
  // \u9ED8\u8BA4 (\u684C\u9762) \u6837\u5F0F
  padding: &#39;50px&#39;,
  fontSize: &#39;18px&#39;,

  // \u79FB\u52A8\u7AEF\u8986\u76D6\u6837\u5F0F
  [MediaQueryRange.MobileBelow]: {
    padding: &#39;10px&#39;,
    fontSize: &#39;14px&#39;,
    flexDirection: &#39;column&#39;,
  },
};
</code></pre>
<h3 id="\u81EA\u9002\u5E94\u6846\u67B6-layout"><a class="header-anchor" href="#\u81EA\u9002\u5E94\u6846\u67B6-layout">#</a>\u81EA\u9002\u5E94\u6846\u67B6 Layout</h3><p>\u5BF9\u4E8E\u5BFC\u822A\uFF0C<code>ResponsiveFrame</code> \u7EC4\u4EF6\u4F1A\u6839\u636E\u8BBE\u5907\u81EA\u52A8\u5728\u201C\u684C\u9762\u9876\u90E8\u83DC\u5355\u201D\u548C\u201C\u79FB\u52A8\u7AEF\u5E95\u90E8\u5BFC\u822A\u680F\u201D\u4E4B\u95F4\u5207\u6362\u3002</p>
<pre><code class="language-tsx">&lt;ResponsiveFrame
  desktopHeaderTitle=&#39;\u6211\u7684\u5E94\u7528&#39;
  // ... \u684C\u9762\u83DC\u5355\u9879
  mobileBottomMenu={[
    { title: &#39;\u9996\u9875&#39;, icon: &lt;HomeIcon /&gt;, link: &#39;/home&#39; },
    { title: &#39;\u6211\u7684&#39;, icon: &lt;UserIcon /&gt;, link: &#39;/me&#39; },
  ]}
  mainContent={&lt;PageComponent /&gt;}
/&gt;
</code></pre>
<h2 id="2-\u8FDB\u519B\u79FB\u52A8\u7AEF-ios-android"><a class="header-anchor" href="#2-\u8FDB\u519B\u79FB\u52A8\u7AEF-ios-android">#</a>2. \u8FDB\u519B\u79FB\u52A8\u7AEF (iOS &amp; Android)</h2><p>Lupine.js \u4F7F\u7528 <strong>Capacitor</strong> \u5C06\u4F60\u7684 Web \u5E94\u7528\u5305\u88C5\u6210\u539F\u751F App\u3002\u8FD9\u8BA9\u4F60\u65E2\u80FD\u8BBF\u95EE\u539F\u751F\u529F\u80FD\uFF08\u76F8\u673A\u3001\u6587\u4EF6\u7CFB\u7EDF\uFF09\uFF0C\u53C8\u80FD\u4FDD\u6301 Web \u5F00\u53D1\u7684\u6D41\u7545\u5DE5\u4F5C\u6D41\u3002</p>
<h3 id="\u6B65\u9AA4-2-1-\u5B89\u88C5-capacitor"><a class="header-anchor" href="#\u6B65\u9AA4-2-1-\u5B89\u88C5-capacitor">#</a>\u6B65\u9AA4 2.1: \u5B89\u88C5 Capacitor</h3><p>\u5728\u9879\u76EE\u6839\u76EE\u5F55\uFF0C\u5B89\u88C5\u5FC5\u8981\u7684\u4F9D\u8D56\uFF1A</p>
<pre><code class="language-bash"># Capacitor \u6838\u5FC3\u5E93
npm install @capacitor/cli@latest @capacitor/core@latest
npm install @capacitor/android @capacitor/ios

# \u5E38\u7528\u63D2\u4EF6 (\u76F8\u673A, \u6587\u4EF6\u7CFB\u7EDF\u7B49)
npm install @capacitor/camera @capacitor/filesystem @capacitor/share
npm install @capacitor-community/keep-awake

# \u521D\u59CB\u5316
npx cap init [MyAppName] [com.example.app]
</code></pre>
<h3 id="\u6B65\u9AA4-2-2-\u6DFB\u52A0\u5E73\u53F0"><a class="header-anchor" href="#\u6B65\u9AA4-2-2-\u6DFB\u52A0\u5E73\u53F0">#</a>\u6B65\u9AA4 2.2: \u6DFB\u52A0\u5E73\u53F0</h3><pre><code class="language-bash"># \u6DFB\u52A0 Android
npx cap add android

# \u6DFB\u52A0 iOS (\u9700\u8981 Mac \u548C Xcode)
npx cap add ios
</code></pre>
<h3 id="\u6B65\u9AA4-2-3-\u914D\u7F6E\u79FB\u52A8\u7AEF\u73AF\u5883"><a class="header-anchor" href="#\u6B65\u9AA4-2-3-\u914D\u7F6E\u79FB\u52A8\u7AEF\u73AF\u5883">#</a>\u6B65\u9AA4 2.3: \u914D\u7F6E\u79FB\u52A8\u7AEF\u73AF\u5883</h3><p>\u79FB\u52A8\u7AEF\u5E94\u7528\u901A\u5E38\u901A\u8FC7\u672C\u5730\u6587\u4EF6\u7CFB\u7EDF (<code>file://</code>) \u8FD0\u884C\uFF0C\u56E0\u6B64\u65E0\u6CD5\u50CF Web \u90A3\u6837\u4F7F\u7528\u76F8\u5BF9\u8DEF\u5F84\u8BF7\u6C42 API\u3002\u4F60\u9700\u8981\u521B\u5EFA\u4E00\u4E2A <code>.env.mobile</code> \u6587\u4EF6\uFF1A</p>
<pre><code class="language-ini"># .env.mobile
WEB.API_BASE_URL=https://api.your-production-site.com
</code></pre>
<h3 id="\u6B65\u9AA4-2-4-\u6784\u5EFA\u4E0E\u540C\u6B65"><a class="header-anchor" href="#\u6B65\u9AA4-2-4-\u6784\u5EFA\u4E0E\u540C\u6B65">#</a>\u6B65\u9AA4 2.4: \u6784\u5EFA\u4E0E\u540C\u6B65</h3><p>\u5728 <code>package.json</code> \u4E2D\u6DFB\u52A0\u6784\u5EFA\u811A\u672C\uFF1A</p>
<pre><code class="language-json">&quot;scripts&quot;: {
  &quot;build-mobile&quot;: &quot;node ./dev/dev-watch --env=.env.mobile --dev=0 --mobile=1&quot;
}
</code></pre>
<p>\u7136\u540E\u6267\u884C\u6784\u5EFA\u5E76\u540C\u6B65\u5230\u539F\u751F\u9879\u76EE\uFF1A</p>
<pre><code class="language-bash">npm run build-mobile
npx cap sync
npx cap open android  # \u6253\u5F00 Android Studio
</code></pre>
<h3 id="\u6B65\u9AA4-2-5-\u539F\u751F\u903B\u8F91-\u53EF\u9009"><a class="header-anchor" href="#\u6B65\u9AA4-2-5-\u539F\u751F\u903B\u8F91-\u53EF\u9009">#</a>\u6B65\u9AA4 2.5: \u539F\u751F\u903B\u8F91 (\u53EF\u9009)</h3><p>\u4F60\u53EF\u4EE5\u4F7F\u7528 <code>#if MOBILE</code> \u7F16\u8BD1\u6307\u4EE4\u6765\u7F16\u5199\u5E73\u53F0\u7279\u5B9A\u4EE3\u7801\uFF0C\u800C\u4E14\u4E0D\u4F1A\u5BFC\u81F4 Web \u5305\u4F53\u79EF\u81A8\u80C0\uFF1A</p>
<pre><code class="language-javascript">// #if MOBILE
import { Camera } from &#39;@capacitor/camera&#39;;

const takePhoto = async () =&gt; {
  const image = await Camera.getPhoto({ ... });
  // \u5904\u7406\u56FE\u7247...
};
// #else
const takePhoto = async () =&gt; {
  alert(&quot;\u76F8\u673A\u4EC5\u5728\u79FB\u52A8\u7AEF App \u4E2D\u53EF\u7528\uFF01&quot;);
};
// #endif
</code></pre>
<h2 id="3-\u8FDB\u519B\u684C\u9762\u7AEF-windows-mac-linux"><a class="header-anchor" href="#3-\u8FDB\u519B\u684C\u9762\u7AEF-windows-mac-linux">#</a>3. \u8FDB\u519B\u684C\u9762\u7AEF (Windows, Mac, Linux)</h2><p>\u5BF9\u4E8E\u684C\u9762\u7AEF\uFF0CLupine.js \u96C6\u6210\u4E86 <strong>Electron</strong>\u3002</p>
<h3 id="\u7ED3\u6784"><a class="header-anchor" href="#\u7ED3\u6784">#</a>\u7ED3\u6784</h3><p>\u6BCF\u4E2A Lupine \u9879\u76EE\u90FD\u81EA\u5E26\u4E00\u4E2A <code>electron</code> \u76EE\u5F55\uFF0C\u5305\u542B\u4E3B\u8FDB\u7A0B\u903B\u8F91\uFF1A</p>
<ul>
<li><code>electron/main.js</code>: Electron \u5E94\u7528\u7684\u5165\u53E3\u70B9\u3002</li>
<li><code>electron/preload.js</code>: \u6E32\u67D3\u8FDB\u7A0B (Web) \u548C \u4E3B\u8FDB\u7A0B \u4E4B\u95F4\u7684\u5B89\u5168\u901A\u4FE1\u6865\u6881\u3002</li>
</ul>
<h3 id="\u6784\u5EFA\u684C\u9762\u5E94\u7528"><a class="header-anchor" href="#\u6784\u5EFA\u684C\u9762\u5E94\u7528">#</a>\u6784\u5EFA\u684C\u9762\u5E94\u7528</h3><p>Lupine \u5141\u8BB8\u4F60\u4F7F\u7528 <code>electron-builder</code> \u5C06\u5E94\u7528\u6253\u5305\u4E3A <code>.exe</code>, <code>.dmg</code>, \u6216 <code>.snap</code> \u5B89\u88C5\u5305\u3002</p>
<p>\u8FD0\u884C <code>package.json</code> \u4E2D\u9884\u8BBE\u7684\u6784\u5EFA\u547D\u4EE4\uFF1A</p>
<pre><code class="language-bash"># \u6784\u5EFA Windows \u7248
npm run app:build-win

# \u6784\u5EFA Mac \u7248
npm run app:build-mac
</code></pre>
<p>\u6784\u5EFA\u8FC7\u7A0B\u5C06\u4F1A\uFF1A</p>
<ol>
<li>\u5C06 Lupine.js Web \u5E94\u7528\u7F16\u8BD1\u4E3A\u9759\u6001\u6587\u4EF6\u3002</li>
<li>\u5C06\u8FD9\u4E9B\u6587\u4EF6\u4E0E Electron \u8FD0\u884C\u65F6\u6346\u7ED1\u3002</li>
<li>\u8F93\u51FA\u72EC\u7ACB\u7684\u5B89\u88C5\u7A0B\u5E8F\u3002</li>
</ol>
<h2 id="\u603B\u7ED3"><a class="header-anchor" href="#\u603B\u7ED3">#</a>\u603B\u7ED3</h2><p>\u4F7F\u7528 <strong>Lupine.js</strong>\uFF0C\u4F60\u4E0D\u9700\u8981\u4E3A Web\u3001\u79FB\u52A8\u7AEF\u548C\u684C\u9762\u7AEF\u7EC4\u5EFA\u4E09\u4E2A\u72EC\u7ACB\u7684\u56E2\u961F\u3002\u4F60\u53EF\u4EE5\u7EF4\u62A4<strong>\u4E00\u5957</strong>\u4EE3\u7801\u5E93\uFF0C\u4F7F\u7528<strong>\u4E00\u5957</strong>\u7EC4\u4EF6\uFF0C\u7136\u540E\u53D1\u5E03\u5230\u6240\u6709\u5E73\u53F0\u3002</p>
<p>\u65E0\u8BBA\u4F60\u662F\u6784\u5EFA SaaS \u5E73\u53F0\u3001\u6D88\u8D39\u8005 App \u8FD8\u662F\u5185\u90E8\u5DE5\u5177\uFF0CLupine.js \u90FD\u80FD\u8BA9\u4F60\u540C\u65F6\u62E5\u6709\u539F\u751F\u5E94\u7528\u7684\u89E6\u8FBE\u7387\u548C Web \u5F00\u53D1\u7684\u9AD8\u6548\u7387\u3002</p>
`;var vg=`<h1 id="\u96F6\u4F9D\u8D56-lupine-js-\u5982\u4F55\u5B9E\u73B0\u539F\u751F-css-in-js"><a class="header-anchor" href="#\u96F6\u4F9D\u8D56-lupine-js-\u5982\u4F55\u5B9E\u73B0\u539F\u751F-css-in-js">#</a>\u96F6\u4F9D\u8D56\uFF0CLupine.js \u5982\u4F55\u5B9E\u73B0\u539F\u751F CSS-in-JS\uFF1F</h1><p>\u5728\u73B0\u4EE3\u524D\u7AEF\u5F00\u53D1\u4E2D\uFF0C\u6211\u4EEC\u5E38\u5E38\u9762\u4E34\u4E00\u4E2A\u4E24\u96BE\u7684\u9009\u62E9\uFF1A\u662F\u5FCD\u53D7 CSS \u6587\u4EF6\u5206\u79BB\u5E26\u6765\u7684\u7EF4\u62A4\u75DB\u82E6\uFF0C\u8FD8\u662F\u5F15\u5165\u5E9E\u5927\u7684 CSS-in-JS \u5E93\uFF08\u5982 Styled-components \u6216 Emotion\uFF09\u5BFC\u81F4\u5305\u4F53\u79EF\u5267\u589E\uFF1F</p>
<p><strong>Lupine.js \u9009\u62E9\u4E86\u4E00\u6761\u4E0D\u540C\u7684\u8DEF\u3002</strong></p>
<p>\u5B83\u5185\u7F6E\u4E86\u4E00\u4E2A\u8D85\u8F7B\u91CF\u7EA7\u7684 CSS-in-JS \u5F15\u64CE\uFF0C<strong>\u65E0\u9700\u4EFB\u4F55\u989D\u5916\u4F9D\u8D56</strong>\uFF0C\u5373\u53EF\u8BA9\u4F60\u5728\u7EC4\u4EF6\u5185\u90E8\u8212\u9002\u5730\u7F16\u5199\u6837\u5F0F\u3002\u5B83\u4E0D\u4EC5\u652F\u6301\u5D4C\u5957\u3001\u5A92\u4F53\u67E5\u8BE2\u3001\u5173\u952E\u5E27\u52A8\u753B\uFF0C\u8FD8\u62E5\u6709\u6781\u9AD8\u7684\u8FD0\u884C\u6548\u7387\u3002</p>
<p>\u8BA9\u6211\u4EEC\u6765\u770B\u770B\u5B83\u662F\u5982\u4F55\u5DE5\u4F5C\u7684\uFF0C\u4EE5\u53CA\u5982\u4F55\u5728\u4F60\u7684\u9879\u76EE\u4E2D\u4F18\u96C5\u5730\u4F7F\u7528\u5B83\u3002</p>
<p><img src="/lupine.js/assets/css-in-js.png" alt="Lupine.js CSS-in-JS"></p>
<h2 id="1-\u544A\u522B-classname-\u7684\u70E6\u607C"><a class="header-anchor" href="#1-\u544A\u522B-classname-\u7684\u70E6\u607C">#</a>1. \u544A\u522B className \u7684\u70E6\u607C</h2><p>\u4F20\u7EDF\u7684 CSS \u5F00\u53D1\u5F80\u5F80\u9700\u8981\u4F60\u5728 <code>.css</code> \u6587\u4EF6\u548C <code>.tsx</code> \u6587\u4EF6\u4E4B\u95F4\u53CD\u590D\u6A2A\u8DF3\uFF0C\u8FD8\u8981\u6316\u7A7A\u5FC3\u601D\u7ED9 class \u8D77\u540D\u3002\u800C\u5728 Lupine.js \u4E2D\uFF0C\u4E00\u5207\u90FD\u5728\u7EC4\u4EF6\u5185\u90E8\u89E3\u51B3\u3002</p>
<p>\u4F60\u53EA\u9700\u8981\u5B9A\u4E49\u4E00\u4E2A\u7B80\u5355\u7684\u5BF9\u8C61\uFF0C\u4F20\u9012\u7ED9 <code>css</code> \u5C5E\u6027\uFF1A</p>
<pre><code class="language-tsx">const MyButton = () =&gt; {
  const btnStyle = {
    backgroundColor: &#39;#0070f3&#39;,
    color: &#39;white&#39;,
    padding: &#39;10px 20px&#39;,
    borderRadius: &#39;5px&#39;,
    border: &#39;none&#39;,
    cursor: &#39;pointer&#39;,

    // \u50CF SCSS \u4E00\u6837\u5D4C\u5957\uFF01
    &#39;&amp;:hover&#39;: {
      backgroundColor: &#39;#0051a2&#39;,
    },

    // \u8F7B\u677E\u641E\u5B9A\u4F2A\u5143\u7D20
    &#39;&amp;::before&#39;: {
      content: &#39;&quot;\u{1F680} &quot;&#39;,
    },
  };

  return &lt;button css={btnStyle}&gt;\u70B9\u51FB\u53D1\u5C04&lt;/button&gt;;
};
</code></pre>
<p>Lupine \u4F1A\u81EA\u52A8\u4E3A\u4F60\u751F\u6210\u4E00\u4E2A\u552F\u4E00\u7684 Class ID\uFF08\u7C7B\u4F3C\u4E8E <code>.L12345</code>\uFF09\uFF0C\u5E76\u5C06\u6837\u5F0F\u6CE8\u5165\u5230\u9875\u9762\u4E2D\uFF0C\u4F60\u5B8C\u5168\u4E0D\u7528\u62C5\u5FC3\u5168\u5C40\u6837\u5F0F\u51B2\u7A81\u3002</p>
<h2 id="2-\u50CF-scss-\u4E00\u6837\u5F3A\u5927\u7684\u5D4C\u5957\u529F\u80FD"><a class="header-anchor" href="#2-\u50CF-scss-\u4E00\u6837\u5F3A\u5927\u7684\u5D4C\u5957\u529F\u80FD">#</a>2. \u50CF SCSS \u4E00\u6837\u5F3A\u5927\u7684\u5D4C\u5957\u529F\u80FD</h2><p>Lupine \u7684\u6837\u5F0F\u5F15\u64CE\u6DF1\u53D7 SCSS/Less \u7684\u542F\u53D1\uFF0C\u652F\u6301\u5F3A\u5927\u7684 <code>&amp;</code> \u7B26\u53F7\u5F15\u7528\u7236\u7EA7\u3002</p>
<h3 id="\u5D4C\u5957\u5B50\u5143\u7D20"><a class="header-anchor" href="#\u5D4C\u5957\u5B50\u5143\u7D20">#</a>\u5D4C\u5957\u5B50\u5143\u7D20</h3><p>\u4E0D\u8981\u518D\u5199\u53C8\u81ED\u53C8\u957F\u7684 <code>div &gt; span &gt; a</code> \u4E86\uFF1A</p>
<pre><code class="language-tsx">const cardStyle = {
  padding: &#39;20px&#39;,
  boxShadow: &#39;0 4px 14px rgba(0,0,0,0.1)&#39;,

  // \u53EA\u6709\u5F53 h3 \u5728\u8FD9\u4E2A\u7EC4\u4EF6\u5185\u65F6\u624D\u751F\u6548
  h3: {
    marginTop: 0,
    color: &#39;#333&#39;,
  },

  // \u9009\u4E2D\u7279\u5B9A\u7684 class
  &#39;.description&#39;: {
    color: &#39;#666&#39;,
    fontSize: &#39;14px&#39;,
  },
};

&lt;div css={cardStyle}&gt;
  &lt;h3&gt;\u6807\u9898&lt;/h3&gt;
  &lt;p class=&#39;description&#39;&gt;\u8FD9\u662F\u63CF\u8FF0\u5185\u5BB9...&lt;/p&gt;
&lt;/div&gt;;
</code></pre>
<h3 id="\u7EC4\u5408\u9009\u62E9\u5668"><a class="header-anchor" href="#\u7EC4\u5408\u9009\u62E9\u5668">#</a>\u7EC4\u5408\u9009\u62E9\u5668</h3><p>\u8FD9\u5728\u5904\u7406\u590D\u6742\u7684\u7EC4\u4EF6\u72B6\u6001\u65F6\u975E\u5E38\u6709\u7528\uFF1A</p>
<pre><code class="language-tsx">const itemStyle = {
  color: &#39;#888&#39;,

  // \u5F53\u540C\u65F6\u62E5\u6709 .active \u7C7B\u65F6
  &#39;&amp;.active&#39;: {
    color: &#39;#0070f3&#39;,
    fontWeight: &#39;bold&#39;,
  },
};
</code></pre>
<h2 id="3-\u54CD\u5E94\u5F0F\u8BBE\u8BA1-\u5A92\u4F53\u67E5\u8BE2\u4ECE\u672A\u5982\u6B64\u7B80\u5355"><a class="header-anchor" href="#3-\u54CD\u5E94\u5F0F\u8BBE\u8BA1-\u5A92\u4F53\u67E5\u8BE2\u4ECE\u672A\u5982\u6B64\u7B80\u5355">#</a>3. \u54CD\u5E94\u5F0F\u8BBE\u8BA1\uFF1A\u5A92\u4F53\u67E5\u8BE2\u4ECE\u672A\u5982\u6B64\u7B80\u5355</h2><p>\u5728 Lupine \u4E2D\uFF0C\u5A92\u4F53\u67E5\u8BE2\u4E0D\u518D\u662F\u6E38\u79BB\u4E8E\u7EC4\u4EF6\u4E4B\u5916\u7684\u4EE3\u7801\u5757\u3002\u4F60\u53EF\u4EE5\u5C06\u5B83\u4EEC\u76F4\u63A5\u628A\u5B83\u4EEC\u5199\u5728\u9700\u8981\u751F\u6548\u7684\u5C5E\u6027\u65C1\u8FB9\u3002</p>
<pre><code class="language-tsx">const responsiveBox = {
  width: &#39;100%&#39;,
  padding: &#39;20px&#39;,
  backgroundColor: &#39;lightblue&#39;,

  // \u9488\u5BF9\u684C\u9762\u7AEF\u7684\u6837\u5F0F
  &#39;@media (min-width: 768px)&#39;: {
    width: &#39;50%&#39;, // \u5728\u5927\u5C4F\u4E0A\u53D8\u4E3A\u4E00\u534A\u5BBD\u5EA6
    backgroundColor: &#39;lightgreen&#39;,

    // \u751A\u81F3\u53EF\u4EE5\u5728\u5A92\u4F53\u67E5\u8BE2\u91CC\u7EE7\u7EED\u5D4C\u5957\uFF01
    &#39;&amp;:hover&#39;: {
      backgroundColor: &#39;green&#39;,
    },
  },
};
</code></pre>
<p>\u8FD9\u79CD\u5199\u6CD5\u8BA9\u201C\u7EC4\u4EF6\u5728\u4E0D\u540C\u5C4F\u5E55\u4E0B\u7684\u8868\u73B0\u201D\u8FD9\u4E00\u903B\u8F91\u9AD8\u5EA6\u5185\u805A\uFF0C\u7EF4\u62A4\u8D77\u6765\u975E\u5E38\u8212\u670D\u3002</p>
<h2 id="4-\u52A8\u753B\u5927\u5E08-\u5185\u7F6E-keyframes-\u652F\u6301"><a class="header-anchor" href="#4-\u52A8\u753B\u5927\u5E08-\u5185\u7F6E-keyframes-\u652F\u6301">#</a>4. \u52A8\u753B\u5927\u5E08\uFF1A\u5185\u7F6E Keyframes \u652F\u6301</h2><p>\u4EE5\u524D\u4E3A\u4E86\u5199\u4E2A\u7B80\u5355\u7684\u52A8\u753B\uFF0C\u4F60\u53EF\u80FD\u5F97\u53BB\u5168\u5C40 CSS \u91CC\u5B9A\u4E49 <code>@keyframes</code>\u3002Lupine \u8BA9\u4F60\u76F4\u63A5\u5728\u7EC4\u4EF6\u91CC\u5B9A\u4E49\u5173\u952E\u5E27\uFF1A</p>
<pre><code class="language-tsx">const spinnerStyle = {
  width: &#39;40px&#39;,
  height: &#39;40px&#39;,
  border: &#39;4px solid #f3f3f3&#39;,
  borderTop: &#39;4px solid #3498db&#39;,
  borderRadius: &#39;50%&#39;,

  // \u76F4\u63A5\u5B9A\u4E49 Keyframes
  &#39;@keyframes spin&#39;: {
    &#39;0%&#39;: { transform: &#39;rotate(0deg)&#39; },
    &#39;100%&#39;: { transform: &#39;rotate(360deg)&#39; },
  },

  // \u76F4\u63A5\u5F15\u7528\u4E0A\u9762\u5B9A\u4E49\u7684\u540D\u5B57
  animation: &#39;spin 1s linear infinite&#39;,
};
</code></pre>
<p>\u5F15\u64CE\u4F1A\u81EA\u52A8\u5904\u7406\u4F5C\u7528\u57DF\uFF0C\u4F60\u7684 <code>spin</code> \u52A8\u753B\u7EDD\u4E0D\u4F1A\u6C61\u67D3\u5176\u4ED6\u7EC4\u4EF6\u7684\u540C\u540D\u52A8\u753B\u3002</p>
<h2 id="5-\u52A8\u6001\u6837\u5F0F\u66F4\u65B0"><a class="header-anchor" href="#5-\u52A8\u6001\u6837\u5F0F\u66F4\u65B0">#</a>5. \u52A8\u6001\u6837\u5F0F\u66F4\u65B0</h2><p>\u65E2\u7136\u662F CSS-in-JS\uFF0C\u4E0D\u4EC5\u8981\u9759\u6001\u7F16\u8BD1\uFF0C\u8FD8\u8981\u80FD\u52A8\u6001\u53D8\u5316\u3002Lupine \u63D0\u4F9B\u4E86\u4E00\u4E2A\u5E95\u5C42\u7684 <code>updateStyles</code> API\uFF0C\u5141\u8BB8\u4F60\u6839\u636E\u903B\u8F91\u52A8\u6001\u4FEE\u6539\u6837\u5F0F\u3002</p>
<blockquote>
<p><strong>\u6CE8\u610F</strong>\uFF1A\u5BF9\u4E8E\u7B80\u5355\u7684\u52A8\u6001\u53D8\u5316\uFF08\u5982\u5F00\u5173\u3001\u989C\u8272\u5207\u6362\uFF09\uFF0C\u901A\u5E38\u5EFA\u8BAE\u5207\u6362 <code>class</code> \u6216\u4F7F\u7528 <code>style={{ ... }}</code> \u884C\u5185\u6837\u5F0F\u3002\u4F46\u5982\u679C\u4F60\u9700\u8981\u52A8\u6001\u4FEE\u6539<strong>\u4F2A\u7C7B</strong>\uFF08\u5982 hover \u989C\u8272\uFF09\u6216<strong>\u5A92\u4F53\u67E5\u8BE2</strong>\uFF0C<code>updateStyles</code> \u5C31\u6D3E\u4E0A\u7528\u573A\u4E86\u3002</p>
</blockquote>
<pre><code class="language-tsx">import { updateStyles, RefProps } from &#39;lupine.web&#39;;

const DynamicComponent = () =&gt; {
  // \u5B9A\u4E49\u521D\u59CB\u6837\u5F0F\u5BF9\u8C61
  const css: any = {
    color: &#39;blue&#39;,
    &#39;&amp;:hover&#39;: { color: &#39;darkblue&#39; }, // \uFF01\uFF01\uFF01\u52A8\u6001\u4FEE\u6539 hover \u989C\u8272\uFF0C\u884C\u5185\u6837\u5F0F\u505A\u4E0D\u5230\uFF01\uFF01\uFF01
  };

  const ref: RefProps = {}; // \u7528\u6765\u83B7\u53D6\u7EC4\u4EF6\u751F\u6210\u7684\u552F\u4E00 ID

  const toggleTheme = () =&gt; {
    // \u4FEE\u6539\u6837\u5F0F\u5BF9\u8C61
    css.color = &#39;red&#39;;
    css[&#39;&amp;:hover&#39;].color = &#39;darkred&#39;;

    // \u5E94\u7528\u66F4\u65B0
    // ref.id \u4F1A\u62FF\u5230\u7C7B\u4F3C L123 \u7684 ID\uFF0CupdateStyles \u4F1A\u627E\u5230\u5BF9\u5E94\u7684 &lt;style&gt; \u6807\u7B7E\u5E76\u66F4\u65B0\u5B83
    updateStyles(\`\${ref.id}\`, css);
  };

  return (
    &lt;div ref={ref} css={css} onClick={toggleTheme}&gt;
      \u70B9\u6211\u6539\u53D8\u4E3B\u9898\u8272\uFF08\u5305\u62EC Hover \u989C\u8272\uFF01\uFF09
    &lt;/div&gt;
  );
};
</code></pre>
<h2 id="6-\u5168\u5C40\u6837\u5F0F-bindglobalstyle"><a class="header-anchor" href="#6-\u5168\u5C40\u6837\u5F0F-bindglobalstyle">#</a>6. \u5168\u5C40\u6837\u5F0F\uFF1AbindGlobalStyle</h2><p>\u867D\u7136\u7EC4\u4EF6\u5316\u5F88\u597D\uFF0C\u4F46\u6709\u65F6\u6211\u4EEC\u786E\u5B9E\u9700\u8981\u5168\u5C40\u6837\u5F0F\uFF08\u6BD4\u5982 Reset CSS\u3001\u5168\u5C40\u5B57\u4F53\u5B9A\u4E49\u7B49\uFF09\u3002<code>bindGlobalStyle</code> \u53EF\u4EE5\u786E\u4FDD\u4F60\u7684\u5168\u5C40\u6837\u5F0F\u53EA\u88AB\u6CE8\u5165\u4E00\u6B21\uFF0C\u54EA\u6015\u7EC4\u4EF6\u88AB\u6E32\u67D3\u4E86\u591A\u6B21\u3002</p>
<pre><code class="language-tsx">import { bindGlobalStyle } from &#39;lupine.web&#39;;

// \u6BD4\u5982\u5B9A\u4E49\u4E00\u4E2A\u5168\u5C40\u7684\u5DE5\u5177\u7C7B
const globalUtils = {
  &#39;.text-center&#39;: { textAlign: &#39;center&#39; },
  &#39;.flex-center&#39;: { display: &#39;flex&#39;, justifyContent: &#39;center&#39; },
};

// \u6CE8\u5165\u5230 &lt;head&gt; \u4E2D\uFF0CID \u4E3A &#39;global-utils&#39;
bindGlobalStyle(&#39;global-utils&#39;, globalUtils);
</code></pre>
<h2 id="7-\u4F20\u7EDF\u6D3E-\u5BFC\u5165-css-\u6587\u4EF6"><a class="header-anchor" href="#7-\u4F20\u7EDF\u6D3E-\u5BFC\u5165-css-\u6587\u4EF6">#</a>7. \u4F20\u7EDF\u6D3E\uFF1A\u5BFC\u5165 .css \u6587\u4EF6</h2><p>\u5F53\u7136\uFF0CLupine.js \u5E76\u6CA1\u6709\u5FD8\u8BB0\u8FD9\u4E00\u6700\u57FA\u7840\u7684\u9700\u6C42\u3002\u5982\u679C\u4F60\u6709\u4E00\u4E2A\u5E9E\u5927\u7684\u65E7\u9879\u76EE\u9700\u8981\u8FC1\u79FB\uFF0C\u6216\u8005\u5C31\u662F\u559C\u6B22\u5199 <code>.css</code> \u6587\u4EF6\uFF0C\u5B8C\u5168\u6CA1\u6709\u95EE\u9898\u3002</p>
<p>\u4F60\u53EF\u4EE5\u5728\u4EFB\u4F55 <code>.tsx</code> \u6587\u4EF6\u4E2D\u76F4\u63A5\u5BFC\u5165 CSS \u6587\u4EF6\uFF1A</p>
<pre><code class="language-tsx">// \u5728\u5165\u53E3\u6587\u4EF6 index.tsx \u4E2D
import &#39;./styles/global.css&#39;;
import &#39;./styles/app.css&#39;;

// \u987A\u5E8F\u5F88\u91CD\u8981\uFF1Aglobal.css \u7684\u6837\u5F0F\u4F1A\u5148\u88AB\u52A0\u8F7D
</code></pre>
<p>\u6784\u5EFA\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u5C06\u6240\u6709\u5BFC\u5165\u7684 CSS \u63D0\u53D6\u5E76\u538B\u7F29\u6210\u4E00\u4E2A\u6587\u4EF6\u3002\u5BF9\u4E8E\u751F\u4EA7\u73AF\u5883\u6784\u5EFA\uFF0CLupine \u4F1A\u81EA\u52A8\u5728 <code>index.html</code> \u4E2D\u6CE8\u5165\u7C7B\u4F3C <code>&lt;link rel=&quot;stylesheet&quot; href=&quot;/index.css?t=...&quot; /&gt;</code> \u7684\u6807\u7B7E\uFF0C\u786E\u4FDD\u4F60\u7684\u6837\u5F0F\u88AB\u6B63\u786E\u52A0\u8F7D\u548C\u7F13\u5B58\u3002</p>
<h2 id="\u603B\u7ED3"><a class="header-anchor" href="#\u603B\u7ED3">#</a>\u603B\u7ED3</h2><p>Lupine.js \u7684 CSS-in-JS \u5F15\u64CE\u5E76\u4E0D\u662F\u4E3A\u4E86\u53D6\u4EE3\u6240\u6709 CSS \u5199\u6CD5\uFF0C\u800C\u662F\u63D0\u4F9B\u4E86\u4E00\u79CD<strong>\u96F6\u8D1F\u62C5\u3001\u9AD8\u6027\u80FD\u4E14\u5F00\u53D1\u4F53\u9A8C\u6781\u4F73</strong>\u7684\u9009\u62E9\u3002</p>
<ul>
<li><strong>\u96F6\u4F9D\u8D56</strong>\uFF1A\u4E0D\u9700\u8981\u5B89\u88C5\u4EFB\u4F55\u989D\u5916\u7684\u5305\u3002</li>
<li><strong>\u9AD8\u6027\u80FD</strong>\uFF1A\u6837\u5F0F\u5728 SSR \u9636\u6BB5\u5373\u53EF\u751F\u6210\uFF0C\u65E0\u8FD0\u884C\u65F6\u95EA\u70C1\u3002</li>
<li><strong>\u5168\u529F\u80FD</strong>\uFF1A\u5D4C\u5957\u3001\u5A92\u4F53\u67E5\u8BE2\u3001\u52A8\u753B\u4E00\u5E94\u4FF1\u5168\u3002</li>
<li><strong>\u5F00\u53D1\u723D</strong>\uFF1A\u5F3A\u7C7B\u578B\u7684 TypeScript \u652F\u6301\uFF0C\u5199 CSS \u4E5F\u6709\u4EE3\u7801\u63D0\u793A\u3002</li>
</ul>
<p>\u4E0B\u6B21\u6784\u5EFA UI \u65F6\uFF0C\u4E0D\u59A8\u8BD5\u8BD5\u76F4\u63A5\u5728\u7EC4\u4EF6\u91CC <code>const css = { ... }</code>\uFF0C\u4F53\u9A8C\u4E00\u4E0B\u8FD9\u79CD\u201C\u539F\u751F\u201D\u7684\u6D41\u7545\u611F\u5427\uFF01</p>
`;var yg=`<h1 id="\u5341\u5206\u949F-\u7528-markdown-\u6781\u901F\u6784\u5EFA\u9AD8\u989C\u503C\u7684\u4E2A\u4EBA\u7B80\u5386\u7F51\u7AD9"><a class="header-anchor" href="#\u5341\u5206\u949F-\u7528-markdown-\u6781\u901F\u6784\u5EFA\u9AD8\u989C\u503C\u7684\u4E2A\u4EBA\u7B80\u5386\u7F51\u7AD9">#</a>\u5341\u5206\u949F\uFF01\u7528 Markdown \u6781\u901F\u6784\u5EFA\u9AD8\u989C\u503C\u7684\u4E2A\u4EBA\u7B80\u5386\u7F51\u7AD9</h1><p>\u60F3\u627E\u4E00\u4EFD\u597D\u5DE5\u4F5C\uFF0C\u5199\u4E00\u4EFD\u597D\u7684\u5DE5\u4F5C\u7B80\u5386\uFF08CV\uFF09\u81F3\u5173\u91CD\u8981\u3002\u5982\u679C\u80FD\u628A\u8FD9\u4EFD\u7B80\u5386\u505A\u6210\u4E00\u4E2A\u4E13\u4E1A\u7684\u4E2A\u4EBA\u7F51\u7AD9\uFF0C\u90A3\u66F4\u662F\u9526\u4E0A\u6DFB\u82B1\uFF0C\u80FD\u8BA9\u62DB\u8058\u8005\u773C\u524D\u4E00\u4EAE\u3002</p>
<p>\u8FD9\u7BC7\u6587\u7AE0\u5C06\u4ECB\u7ECD\u5982\u4F55\u5229\u7528 <strong>Lupine.js</strong> \u6846\u67B6\u63D0\u4F9B\u7684 <strong>CV Starter</strong> \u6A21\u677F\uFF0C\u53EA\u9700\u8981\u5199\u7B80\u5355\u7684 Markdown \u6587\u4EF6\uFF0C\u5C31\u80FD\u751F\u6210\u4E00\u4E2A\u6F02\u4EAE\u7684\u3001\u54CD\u5E94\u5F0F\u7684\u7B80\u5386\u7F51\u7AD9\u3002\u5B83\u81EA\u5E26\u9ED1\u767D\u4E3B\u9898\u5207\u6362\u3001\u591A\u8BED\u8A00\u652F\u6301\uFF0C\u5E76\u4E14\u53EF\u4EE5<strong>\u514D\u8D39\u6258\u7BA1\u5728 GitHub Pages \u4E0A</strong>\u3002</p>
<p><img src="/lupine.js/assets/cv-generator-zh.png" alt="Lupine.js CV Starter"></p>
<p>\u4E3A\u4E86\u8BA9\u60A8\u66F4\u76F4\u89C2\u5730\u4E86\u89E3\u6548\u679C\uFF0C\u6211\u4EEC\u4E3A\u60A8\u51C6\u5907\u4E86\u4E00\u4E2A\u5B8C\u6574\u7684\u6F14\u793A\u9879\u76EE\u3002\u60A8\u53EF\u4EE5\u76F4\u63A5\u8BBF\u95EE\u6E90\u7801\u4ED3\u5E93\uFF0C\u751A\u81F3\u76F4\u63A5 Fork \u5B83\u4F5C\u4E3A\u60A8\u7684\u8D77\u70B9\uFF1A</p>
<ul>
<li><strong>\u6E90\u7801\u4ED3\u5E93</strong>: <a href="https://github.com/uuware/lupine-template-cv-starter">https://github.com/uuware/lupine-template-cv-starter</a></li>
</ul>
<p>\u60A8\u4E5F\u53EF\u4EE5\u70B9\u51FB\u4E0B\u65B9\u94FE\u63A5\uFF0C\u5728\u7EBF\u67E5\u770B\u8BE5\u9879\u76EE\u7684\u5B9E\u9645\u8FD0\u884C\u6548\u679C\uFF1A</p>
<ul>
<li><strong>\u5728\u7EBF\u6F14\u793A</strong>: <a href="https://uuware.github.io/lupine-template-cv-starter/">https://uuware.github.io/lupine-template-cv-starter/</a></li>
</ul>
<h2 id="\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-cv-starter"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-cv-starter">#</a>\u4E3A\u4EC0\u4E48\u9009\u62E9 Lupine CV Starter\uFF1F</h2><ul>
<li><strong>\u6781\u7B80 Markdown</strong>: \u4E13\u6CE8\u4E8E\u5185\u5BB9\uFF0C\u50CF\u5199\u6587\u6863\u4E00\u6837\u5199\u7B80\u5386\u3002</li>
<li><strong>\u9AD8\u989C\u503C\u8BBE\u8BA1</strong>: \u9ED8\u8BA4\u4E3B\u9898\u6E05\u65B0\u4E13\u4E1A\uFF0C\u652F\u6301<strong>\u6D45\u8272\u4E3B\u9898</strong>\u548C<strong>\u6DF1\u8272\u4E3B\u9898</strong>\u3002</li>
<li><strong>\u591A\u8BED\u8A00\u652F\u6301</strong>: \u8F7B\u677E\u6784\u5EFA\u4E2D\u82F1\u6587\u53CC\u8BED\u7B80\u5386\uFF0C\u5C55\u73B0\u56FD\u9645\u5316\u89C6\u91CE\u3002</li>
<li><strong>\u79FB\u52A8\u7AEF\u9002\u914D</strong>: \u5B8C\u7F8E\u9002\u914D\u624B\u673A\u684C\u9762\uFF0C\u968F\u65F6\u968F\u5730\u4F18\u96C5\u5C55\u793A\u3002</li>
<li><strong>\u514D\u8D39\u6258\u7BA1</strong>: \u7EAF\u9759\u6001\u9875\u9762\uFF0C\u53EF\u76F4\u63A5\u90E8\u7F72\u5230 GitHub Pages\uFF0C\u96F6\u6210\u672C\u4E0A\u7EBF\u3002</li>
</ul>
<h2 id="\u5FEB\u901F\u5F00\u59CB"><a class="header-anchor" href="#\u5FEB\u901F\u5F00\u59CB">#</a>\u{1F680} \u5FEB\u901F\u5F00\u59CB</h2><h3 id="1-\u521B\u5EFA\u9879\u76EE"><a class="header-anchor" href="#1-\u521B\u5EFA\u9879\u76EE">#</a>1. \u521B\u5EFA\u9879\u76EE</h3><p>\u53EA\u9700\u4E00\u884C\u547D\u4EE4\uFF0C\u5373\u53EF\u521D\u59CB\u5316\u4F60\u7684\u7B80\u5386\u9879\u76EE\uFF1A</p>
<pre><code class="language-bash">npx create-lupine@latest my-cv
</code></pre>
<p>\u5728\u63D0\u793A\u4E2D\u9009\u62E9 <strong><code>cv-starter</code></strong> \u6A21\u677F\u3002</p>
<h3 id="2-\u542F\u52A8\u9884\u89C8"><a class="header-anchor" href="#2-\u542F\u52A8\u9884\u89C8">#</a>2. \u542F\u52A8\u9884\u89C8</h3><p>\u8FDB\u5165\u9879\u76EE\u76EE\u5F55\u5E76\u542F\u52A8\u672C\u5730\u5F00\u53D1\u670D\u52A1\u5668\uFF1A</p>
<pre><code class="language-bash">cd my-cv
npm install
npm run dev
</code></pre>
<p>\u73B0\u5728\uFF0C\u6253\u5F00\u6D4F\u89C8\u5668\uFF0C\u4F60\u5C31\u80FD\u770B\u5230\u4E00\u4E2A\u5305\u542B<strong>\u4E2A\u4EBA\u7B80\u4ECB\u3001\u5DE5\u4F5C\u7ECF\u5386\u3001\u9879\u76EE\u7ECF\u9A8C\u3001\u4E13\u4E1A\u6280\u80FD\u3001\u6559\u80B2\u80CC\u666F</strong>\u7B49\u5B8C\u6574\u677F\u5757\u7684\u7B80\u5386\u96CF\u5F62\u4E86\uFF01</p>
<h2 id="\u5B9A\u5236\u4F60\u7684\u7B80\u5386"><a class="header-anchor" href="#\u5B9A\u5236\u4F60\u7684\u7B80\u5386">#</a>\u{1F4DD} \u5B9A\u5236\u4F60\u7684\u7B80\u5386</h2><p>\u6A21\u677F\u5DF2\u7ECF\u4E3A\u4F60\u9884\u8BBE\u4E86\u6807\u51C6\u7684\u7B80\u5386\u7ED3\u6784\uFF0C\u4F60\u53EA\u9700\u8981\u6839\u636E\u81EA\u5DF1\u7684\u60C5\u51B5\u8FDB\u884C\u589E\u5220\u6539\u67E5\u3002</p>
<h3 id="\u4FEE\u6539\u5185\u5BB9"><a class="header-anchor" href="#\u4FEE\u6539\u5185\u5BB9">#</a>\u4FEE\u6539\u5185\u5BB9</h3><p>\u6240\u6709\u7684\u5185\u5BB9\u90FD\u4F4D\u4E8E <code>web/markdown</code> \u76EE\u5F55\u4E0B\u3002</p>
<ul>
<li><code>zh/</code>: \u4E2D\u6587\u7248\u7B80\u5386\u5185\u5BB9</li>
<li><code>en/</code>: \u82F1\u6587\u7248\u7B80\u5386\u5185\u5BB9</li>
</ul>
<p>\u4F60\u53EF\u4EE5\u76F4\u63A5\u4FEE\u6539 Markdown \u6587\u4EF6\u3002\u66F4\u68D2\u7684\u662F\uFF0C\u4F60\u5B8C\u5168\u53EF\u4EE5\u53EA\u7CBE\u5FC3\u64B0\u5199\u4E00\u4E2A\u8BED\u8A00\u7248\u672C\uFF08\u6BD4\u5982\u4E2D\u6587\uFF09\uFF0C\u7136\u540E<strong>\u8BA9 AI \u5E2E\u4F60\u7FFB\u8BD1\u6210\u53E6\u4E00\u4E2A\u8BED\u8A00</strong>\u3002\u73B0\u5728\u7684 AI \u975E\u5E38\u64C5\u957F\u5904\u7406 Markdown \u683C\u5F0F\uFF0C\u7FFB\u8BD1\u8D28\u91CF\u901A\u5E38\u5F88\u9AD8\uFF0C\u8FD9\u80FD\u4E3A\u4F60\u8282\u7701\u5927\u91CF\u65F6\u95F4\u3002</p>
<h3 id="\u7BA1\u7406\u76EE\u5F55\u4E0E\u4FA7\u8FB9\u680F"><a class="header-anchor" href="#\u7BA1\u7406\u76EE\u5F55\u4E0E\u4FA7\u8FB9\u680F">#</a>\u7BA1\u7406\u76EE\u5F55\u4E0E\u4FA7\u8FB9\u680F</h3><p>\u5F53\u4F60\u6DFB\u52A0\u6216\u5220\u9664\u4E86\u67D0\u4E2A\u9875\u9762\uFF08\u4F8B\u5982\u6DFB\u52A0\u4E86\u201C\u5F00\u6E90\u8D21\u732E\u201D\u7AE0\u8282\uFF09\uFF0C\u4F60\u9700\u8981\u544A\u8BC9\u7F51\u7AD9\u5982\u4F55\u663E\u793A\u4FA7\u8FB9\u680F\u5BFC\u822A\u3002</p>
<p>\u6253\u5F00\u8BED\u8A00\u6839\u76EE\u5F55\u4E0B\u7684 <code>index.md</code> \u6587\u4EF6\uFF08\u4F8B\u5982 <code>web/markdown/zh/index.md</code>\uFF09\uFF0C\u627E\u5230 <code>sidebar</code> \u914D\u7F6E\u9879\u8FDB\u884C\u4FEE\u6539\uFF1A</p>
<pre><code class="language-yaml">sidebar:
  - text: \u8BE6\u7EC6\u4ECB\u7ECD
    items:
      - /zh/01-experience/index
      - /zh/02-projects/index
      - /zh/03-skills/index
      - /zh/04-education/index
      # - /zh/05-open-source/index  &lt;-- \u65B0\u589E\u7684\u9875\u9762
</code></pre>
<p>\u4FDD\u5B58\u6587\u4EF6\u540E\uFF0C\u6D4F\u89C8\u5668\u9875\u9762\u4F1A\u81EA\u52A8\u66F4\u65B0\uFF0C\u6240\u89C1\u5373\u6240\u5F97\u3002</p>
<h3 id="\u914D\u7F6E\u9876\u90E8\u5BFC\u822A-\u53EF\u9009"><a class="header-anchor" href="#\u914D\u7F6E\u9876\u90E8\u5BFC\u822A-\u53EF\u9009">#</a>\u914D\u7F6E\u9876\u90E8\u5BFC\u822A (\u53EF\u9009)</h3><p>\u7531\u4E8E\u7B80\u5386\u901A\u5E38\u5305\u542B\u7684\u9875\u9762\u4E0D\u591A\uFF0C\u6A21\u677F\u9ED8\u8BA4\u6CA1\u6709\u5F00\u542F\u9876\u90E8\u5BFC\u822A\u83DC\u5355\u3002\u5982\u679C\u4F60\u5E0C\u671B\u5728\u9875\u9762\u9876\u90E8\u4E5F\u663E\u793A\u5BFC\u822A\uFF0C\u53EF\u4EE5\u5728 <code>index.md</code> \u4E2D\u6DFB\u52A0 <code>nav</code> \u914D\u7F6E\uFF1A</p>
<pre><code class="language-yaml">nav:
  - text: \u5DE5\u4F5C\u7ECF\u5386
    link: /zh/01-experience/index
  - text: \u9879\u76EE\u7ECF\u9A8C
    link: /zh/02-projects/index
</code></pre>
<p>\u8FD9\u6837\uFF0CHeader \u5DE6\u4FA7\u5C31\u4F1A\u51FA\u73B0\u4F60\u914D\u7F6E\u7684\u83DC\u5355\u9879\u3002</p>
<h3 id="\u4E2A\u6027\u5316\u8BBE\u7F6E"><a class="header-anchor" href="#\u4E2A\u6027\u5316\u8BBE\u7F6E">#</a>\u4E2A\u6027\u5316\u8BBE\u7F6E</h3><p>\u5728 <code>index.md</code> \u7684 Frontmatter \u4E2D\uFF0C\u4F60\u8FD8\u53EF\u4EE5\u8FDB\u884C\u66F4\u591A\u4E2A\u6027\u5316\u8BBE\u7F6E\u3002</p>
<h4 id="github-\u94FE\u63A5"><a class="header-anchor" href="#github-\u94FE\u63A5">#</a>GitHub \u94FE\u63A5</h4><p>Header \u53F3\u4FA7\u9ED8\u8BA4\u663E\u793A GitHub \u9879\u76EE\u94FE\u63A5\u3002\u5982\u679C\u4F60\u60F3\u4FEE\u6539\u6216\u9690\u85CF\u5B83\uFF1A</p>
<pre><code class="language-yaml"># \u4FEE\u6539\u94FE\u63A5
github-title: View on GitHub
github-link: https://github.com/yourusername/my-cv
# \u6216\u8005\u76F4\u63A5\u5220\u9664\u8FD9\u4E24\u884C\u4EE5\u9690\u85CF
</code></pre>
<h4 id="\u81EA\u5B9A\u4E49\u6837\u5F0F"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u6837\u5F0F">#</a>\u81EA\u5B9A\u4E49\u6837\u5F0F</h4><p>\u60F3\u6362\u4E2A\u4E3B\u9898\u8272\uFF1F\u60F3\u8C03\u6574\u4FA7\u8FB9\u680F\u5BBD\u5EA6\uFF1F\u6CA1\u95EE\u9898\uFF01\u4F60\u53EF\u4EE5\u5728 <code>index.md</code> \u4E2D\u901A\u8FC7 <code>styles</code> \u5C5E\u6027\u76F4\u63A5\u8986\u76D6 CSS \u53D8\u91CF\uFF1A</p>
<pre><code class="language-yaml">styles:
  &#39;:root&#39;: { &#39;--primary-accent-color&#39;: &#39;#0ac92a&#39; } # \u4FEE\u6539\u4E3B\u8272\u8C03\u4E3A\u7EFF\u8272
  # body: { font-family: &#39;Inter&#39;, sans-serif; }    # \u4FEE\u6539\u5168\u5C40\u5B57\u4F53
</code></pre>
<p>\u5173\u4E8E\u66F4\u591A\u6837\u5F0F\u914D\u7F6E\uFF0C\u53EF\u4EE5\u53C2\u8003 <a href="https://uuware.github.io/lupine.js/zh/articles/introduce-lupine.press">\u8FD9\u7BC7\u5173\u4E8E Lupine.Press \u7684\u4ECB\u7ECD</a>\u3002</p>
<h2 id="\u7ED3\u8BED"><a class="header-anchor" href="#\u7ED3\u8BED">#</a>\u7ED3\u8BED</h2><p>\u4F7F\u7528 Lupine.js \u6784\u5EFA\u7B80\u5386\u7F51\u7AD9\uFF0C\u4E0D\u4EC5\u662F\u5C55\u793A\u4E13\u4E1A\u6280\u80FD\u7684\u6700\u4F73\u65B9\u5F0F\uFF0C\u66F4\u4F53\u73B0\u4E86\u60A8\u5BF9\u6280\u672F\u7684\u70ED\u60C5\u4E0E\u8FFD\u6C42\u3002\u5982\u679C\u60A8\u559C\u6B22\u8FD9\u4E2A\u6A21\u7248\uFF0C\u6216\u8005\u5B83\u5BF9\u60A8\u6709\u6240\u5E2E\u52A9\uFF0C\u6B22\u8FCE\u5728 GitHub \u4E0A\u4E3A\u6211\u4EEC\u70B9\u4EAE\u4E00\u9897\u661F \u2B50\uFE0F</p>
<p>\u{1F449} <strong><a href="https://github.com/uuware/lupine.js">https://github.com/uuware/lupine.js</a></strong></p>
<p>\u795D\u4F60\u65E9\u65E5\u62FF\u5230\u5FC3\u4EEA\u7684 Offer\uFF01</p>
`;var kg=`<p>\u5728 2026 \u5E74\u6784\u5EFA\u73B0\u4EE3 Web \u5E94\u7528\uFF0C\u5F80\u5F80\u8981\u5728\u201C\u6C89\u91CD\u4F46\u5F3A\u5927\u201D\uFF08\u5982 Next.js, Remix\uFF09\u4E0E\u201C\u8F7B\u91CF\u4F46\u53D7\u9650\u201D\uFF08\u5982 Vanilla JS, \u5FAE\u578B\u5E93\uFF09\u4E4B\u95F4\u505A\u9009\u62E9\u3002\u4F46\u5982\u679C\u4F60\u80FD\u540C\u65F6\u62E5\u6709\u4E24\u8005\u7684\u4F18\u70B9\u5462\uFF1F</p>
<p>\u9047\u89C1 <strong>Lupine.js</strong> \u2014\u2014 \u4E00\u4E2A <strong>7kb</strong> (gzipped) \u7684\u5168\u6808\u6846\u67B6\uFF0C\u5B83\u5E26\u6765\u4E86\u670D\u52A1\u7AEF\u6E32\u67D3 (SSR)\u3001CSS-in-JS \u4EE5\u53CA\u7C7B React \u7684 TSX \u5F00\u53D1\u4F53\u9A8C\uFF0C\u5374\u6CA1\u6709\u4EFB\u4F55\u81C3\u80BF\u7684\u6253\u5305\u4F53\u79EF\u3002</p>
<p>\u5728\u672C\u6587\u4E2D\uFF0C\u6211\u5C06\u5C55\u793A\u5982\u4F55\u4F7F\u7528 Lupine.js \u6784\u5EFA\u4E00\u4E2A\u95EA\u7535\u822C\u5FEB\u901F\u3001SEO \u53CB\u597D\u7684 Web \u5E94\u7528\u3002</p>
<p><img src="/lupine.js/assets/ssr.png" alt="Lupine.js Architecture"></p>
<h2 id="\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-js"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-js">#</a>\u4E3A\u4EC0\u4E48\u9009\u62E9 Lupine.js\uFF1F</h2><ul>
<li><strong>\u26A1 \u6781\u901F\u6027\u80FD</strong>: \u6CA1\u6709\u865A\u62DF DOM (Virtual DOM) \u7684\u5F00\u9500\u3002\u901A\u8FC7\u667A\u80FD\u7ED1\u5B9A\u76F4\u63A5\u64CD\u4F5C DOM\u3002</li>
<li><strong>\u{1FAB6} \u6781\u5C0F\u4F53\u79EF</strong>: \u4E00\u4E2A\u529F\u80FD\u5B8C\u5907\u3001\u5305\u542B SSR \u548C\u8DEF\u7531\u7684 &quot;Hello World&quot; \u5E94\u7528\uFF0Cgzip \u540E\u4EC5\u9700 ~7kb\u3002</li>
<li><strong>\u{1F9E9} \u7C7B React \u8BED\u6CD5</strong>: \u4F7F\u7528 JSX/TSX\u3002\u5982\u679C\u4F60\u719F\u6089 React\uFF0C\u901A\u8FC7 Lupine \u4E0A\u624B\u51E0\u4E4E\u53EA\u9700\u51E0\u5206\u949F\u3002</li>
<li><strong>\u{1F578}\uFE0F \u539F\u751F SSR</strong>: \u670D\u52A1\u7AEF\u6E32\u67D3\u662F\u7684\u4E00\u7B49\u516C\u6C11\uFF0C\u800C\u975E\u4E8B\u540E\u8865\u5145\u3002\u5185\u7F6E\u81EA\u52A8\u5316\u7684 SEO \u652F\u6301\u3002</li>
<li><strong>\u{1F3A8} \u5185\u7F6E CSS-in-JS</strong>: \u652F\u6301\u4F5C\u7528\u57DF\u6837\u5F0F\u3001\u5D4C\u5957\u548C\u5A92\u4F53\u67E5\u8BE2\uFF0C\u65E0\u9700\u5F15\u5165\u4EFB\u4F55\u989D\u5916\u5E93\u3002</li>
</ul>
<h2 id="1-\u51E0\u79D2\u949F\u5185\u5F00\u59CB"><a class="header-anchor" href="#1-\u51E0\u79D2\u949F\u5185\u5F00\u59CB">#</a>1. \u51E0\u79D2\u949F\u5185\u5F00\u59CB</h2><p>Lupine.js \u63D0\u4F9B\u4E86\u4E00\u4E2A\u547D\u4EE4\u884C\u5DE5\u5177 (CLI) \u6765\u5FEB\u901F\u751F\u6210\u9879\u76EE\u811A\u624B\u67B6\u3002</p>
<pre><code class="language-bash">npx create-lupine@latest my-app
cd my-app
npm install
npm run dev
</code></pre>
<p>\u8BBF\u95EE <code>http://localhost:11080</code>\uFF0C\u4F60\u5C31\u80FD\u770B\u5230\u4F60\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u5E94\u7528\u6B63\u5728\u8FD0\u884C\u4E86\u3002</p>
<h2 id="2-hello-world-\u4EA6\u5728\u670D\u52A1\u7AEF\u6E32\u67D3"><a class="header-anchor" href="#2-hello-world-\u4EA6\u5728\u670D\u52A1\u7AEF\u6E32\u67D3">#</a>2. &quot;Hello World&quot; (\u4EA6\u5728\u670D\u52A1\u7AEF\u6E32\u67D3)</h2><p>Lupine.js \u7EC4\u4EF6\u770B\u8D77\u6765\u975E\u5E38\u4EB2\u5207\u3002\u8FD9\u662F\u4E00\u4E2A\u7B80\u5355\u7684\u8BA1\u6570\u5668\u7EC4\u4EF6 (<code>src/pages/home.tsx</code>)\uFF1A</p>
<pre><code class="language-tsx">import { HtmlVar, CssProps } from &#39;lupine.web&#39;;

export const HomePage = () =&gt; {
  // 1. \u54CD\u5E94\u5F0F\u72B6\u6001 (Signals)
  // &#39;0&#39; \u662F\u521D\u59CB\u503C\u3002
  const count = new HtmlVar(&#39;0&#39;);

  // 2. CSS-in-JS (\u5185\u7F6E\u652F\u6301!)
  const css: CssProps = {
    textAlign: &#39;center&#39;,
    padding: &#39;50px&#39;,
    h1: {
      color: &#39;#333&#39;,
      fontSize: &#39;2.5rem&#39;,
    },
    button: {
      padding: &#39;10px 20px&#39;,
      fontSize: &#39;1.2rem&#39;,
      cursor: &#39;pointer&#39;,
      &#39;&amp;:hover&#39;: {
        backgroundColor: &#39;#eee&#39;,
      },
    },
  };

  return (
    &lt;div css={css}&gt;
      &lt;h1&gt;Hello Lupine.js!&lt;/h1&gt;
      &lt;p&gt;Current Count: {count.node}&lt;/p&gt;

      {/* \u76F4\u63A5 DOM \u66F4\u65B0\uFF0C\u65E0 VDOM diffing */}
      &lt;button
        onClick={() =&gt; {
          const current = Number(count.value);
          count.value = (current + 1).toString();
        }}
      &gt;
        Increment
      &lt;/button&gt;
    &lt;/div&gt;
  );
};
</code></pre>
<h3 id="\u8FD9\u91CC\u53D1\u751F\u4E86\u4EC0\u4E48"><a class="header-anchor" href="#\u8FD9\u91CC\u53D1\u751F\u4E86\u4EC0\u4E48">#</a>\u8FD9\u91CC\u53D1\u751F\u4E86\u4EC0\u4E48\uFF1F</h3><ol>
<li><strong><code>HtmlVar</code></strong>: \u8FD9\u662F Lupine \u7248\u672C\u7684 Signals\uFF08\u4FE1\u53F7\u91CF\uFF09\u3002\u5B83\u76F4\u63A5\u7ED1\u5B9A\u5230\u6587\u672C\u8282\u70B9\u3002\u5F53\u4F60\u66F4\u65B0 <code>count.value</code> \u65F6\uFF0C\u53EA\u6709\u90A3\u4E2A\u7279\u5B9A\u7684\u6587\u672C\u8282\u70B9\u4F1A\u66F4\u65B0\u3002\u7EC4\u4EF6\u672C\u8EAB\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF01</li>
<li><strong><code>css</code> \u5C5E\u6027</strong>: \u6837\u5F0F\u4F1A\u81EA\u52A8\u8FDB\u884C\u4F5C\u7528\u57DF\u9694\u79BB\u3002SSR \u4F1A\u5C06\u5173\u952E CSS \u6CE8\u5165\u5230 <code>&lt;head&gt;</code> \u4E2D\uFF0C\u56E0\u6B64<strong>\u5B8C\u5168\u6CA1\u6709\u6837\u5F0F\u95EA\u70C1 (FOUC)</strong>\u3002</li>
</ol>
<h2 id="3-\u96F6\u914D\u7F6E-ssr-\u4E0E-seo"><a class="header-anchor" href="#3-\u96F6\u914D\u7F6E-ssr-\u4E0E-seo">#</a>3. \u96F6\u914D\u7F6E SSR \u4E0E SEO</h2><p>\u73B0\u4EE3 SPA \u5F00\u53D1\u4E2D\u6700\u5927\u7684\u75DB\u70B9\u4E4B\u4E00\u5C31\u662F SEO\u3002Lupine \u539F\u751F\u89E3\u51B3\u4E86\u8FD9\u4E2A\u95EE\u9898\u3002\u4F60\u4E0D\u9700\u8981 <code>react-helmet</code> \u6216\u590D\u6742\u7684\u5E03\u5C40\u914D\u7F6E\u3002</p>
<pre><code class="language-tsx">import { MetaData, PageProps } from &#39;lupine.web&#39;;

export const ProductPage = async (props: PageProps) =&gt; {
  // 1. \u83B7\u53D6\u6570\u636E (\u5728 SSR \u671F\u95F4\u8FD0\u884C\u4E8E\u670D\u52A1\u7AEF\uFF0C\u6216\u8005\u5728\u9875\u9762\u5BFC\u822A\u65F6\u8FD0\u884C\u4E8E\u5BA2\u6237\u7AEF)
  // \u6CE8\u610F\uFF1A\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u6807\u51C6 fetch\uFF01
  const product = await fetch(\`https://api.example.com/products/\${props.urlParameters[&#39;id&#39;]}\`).then((res) =&gt;
    res.json()
  );

  return (
    &lt;div&gt;
      {/* 2. \u76F4\u63A5\u5728\u7EC4\u4EF6\u4E2D\u5B9A\u4E49 SEO \u5143\u6570\u636E */}
      &lt;MetaData property=&#39;og:title&#39; content={product.name} /&gt;
      &lt;MetaData property=&#39;og:description&#39; content={product.description} /&gt;
      &lt;MetaData property=&#39;og:image&#39; content={product.imageUrl} /&gt;

      &lt;h1&gt;{product.name}&lt;/h1&gt;
      &lt;p&gt;{product.description}&lt;/p&gt;
    &lt;/div&gt;
  );
};
</code></pre>
<p>\u5F53\u722C\u866B\uFF08\u5982 Googlebot, Twitter card\uFF09\u8BBF\u95EE\u8FD9\u4E2A URL \u65F6\uFF0CLupine \u7684\u670D\u52A1\u7AEF\u4F1A\u5728\u8FD4\u56DE HTML \u4E4B\u524D\u6E32\u67D3\u597D\u6240\u6709\u8FD9\u4E9B\u5143\u6807\u7B7E\u3002</p>
<h2 id="4-\u5F3A\u5927\u7684\u8DEF\u7531\u7CFB\u7EDF"><a class="header-anchor" href="#4-\u5F3A\u5927\u7684\u8DEF\u7531\u7CFB\u7EDF">#</a>4. \u5F3A\u5927\u7684\u8DEF\u7531\u7CFB\u7EDF</h2><p>Lupine \u7684 <code>PageRouter</code> \u5F00\u7BB1\u5373\u652F\u6301\u5D4C\u5957\u8DEF\u7531\u3001\u4E2D\u95F4\u4EF6 (Middleware) \u548C\u5E03\u5C40 (Layouts)\u3002</p>
<pre><code class="language-tsx">import { PageRouter, bindRouter } from &#39;lupine.web&#39;;

const router = new PageRouter();

// \u4E2D\u95F4\u4EF6 (\u4F8B\u5982\uFF1AAuth \u68C0\u67E5)
router.setFilter(async (props) =&gt; {
  // \u68C0\u67E5\u767B\u5F55\u903B\u8F91...
  return null; // \u7EE7\u7EED\u8DEF\u7531
});

// \u5B9A\u4E49\u8DEF\u7531
router.use(&#39;/home&#39;, HomePage);
router.use(&#39;/product/:id&#39;, ProductPage);
router.use(&#39;*&#39;, NotFoundPage);

// \u7ED1\u5B9A\u5230\u5E94\u7528
bindRouter(router);
</code></pre>
<h2 id="\u603B\u7ED3"><a class="header-anchor" href="#\u603B\u7ED3">#</a>\u603B\u7ED3</h2><p>Lupine.js \u65E0\u610F\u5728\u5E9E\u5927\u7684\u4F01\u4E1A\u7EA7\u751F\u6001\u5E94\u7528\u4E2D\u53D6\u4EE3 React\u3002\u4F46\u5BF9\u4E8E<strong>\u535A\u5BA2\u3001\u843D\u5730\u9875\u3001\u4EEA\u8868\u76D8 (Dashboards) \u548C\u8FFD\u6C42\u521B\u65B0\u7684 Web \u5E94\u7528</strong>\uFF0C\u5982\u679C\u901F\u5EA6\u548C\u5305\u4F53\u79EF\u81F3\u5173\u91CD\u8981\uFF0C\u90A3\u4E48 Lupine.js \u5C06\u662F\u4E00\u80A1\u6E05\u65B0\u7684\u7A7A\u6C14\u3002</p>
<p>\u5B83\u5C06 <strong>2026 \u5E74\u7684\u5F00\u53D1\u4F53\u9A8C (DX)</strong> \u5E26\u56DE\u4E86 <strong>2010 \u5E74\u7684\u6781\u81F4\u6027\u80FD</strong>\u3002</p>
<p><strong>\u8BD5\u4E00\u8BD5\u5427\uFF0C\u671F\u5F85\u4F60\u7684\u53CD\u9988\uFF01</strong></p>
<hr>
<p>\u{1F517} <strong>Github</strong>: <a href="https://github.com/uuware/lupine.js">https://github.com/uuware/lupine.js</a>
\u2B50 <strong>\u5982\u679C\u559C\u6B22\u8F7B\u91CF\u7EA7 Web \u6280\u672F\uFF0C\u8BF7\u7ED9\u6211\u4EEC\u70B9\u4E2A Star\uFF01</strong></p>
`;var wg=`<h1 id="\u4ECB\u7ECD-lupine-js-\u4E00\u6B3E-\u6781\u5176-\u9AD8\u6548\u7684-web-\u6846\u67B6"><a class="header-anchor" href="#\u4ECB\u7ECD-lupine-js-\u4E00\u6B3E-\u6781\u5176-\u9AD8\u6548\u7684-web-\u6846\u67B6">#</a>\u4ECB\u7ECD Lupine.js\uFF1A\u4E00\u6B3E&quot;\u6781\u5176&quot;\u9AD8\u6548\u7684 Web \u6846\u67B6</h1><p>\u5728\u4E00\u4E2A\u88AB\u5E9E\u5927\u7684\u5143\u6846\u67B6 (Meta-frameworks) \u548C\u590D\u6742\u6784\u5EFA\u94FE\u4E3B\u5BFC\u7684\u4E16\u754C\u91CC\uFF0C<strong>Lupine.js</strong> \u63D0\u51FA\u4E86\u4E00\u4E2A\u7B80\u5355\u7684\u95EE\u9898\uFF1A<em>\u5982\u679C\u6211\u4EEC\u80FD\u62E5\u6709\u73B0\u4EE3\u5168\u6808\u6846\u67B6\u7684\u5A01\u529B\uFF0C\u5374\u4E0D\u9700\u8981\u90A3\u4E9B\u81C3\u80BF\u7684\u8D1F\u62C5\uFF0C\u4F1A\u600E\u6837\uFF1F</em></p>
<p>Lupine.js \u662F\u4E00\u4E2A <strong>\u8F7B\u91CF\u7EA7 (7kb gzipped)</strong> \u7684 <strong>\u5168\u6808</strong> Web \u6846\u67B6\uFF0C\u5B83\u7ED3\u5408\u4E86\u7C7B React \u7684\u524D\u7AEF\u4F53\u9A8C\u548C\u7C7B Express \u7684\u540E\u7AEF\u67B6\u6784\u3002\u5B83\u662F\u5B8C\u5168\u4ECE\u96F6\u5F00\u59CB\u8BBE\u8BA1\uFF0C\u65E8\u5728\u5B9E\u73B0\u6781\u81F4\u7684\u901F\u5EA6\u3001\u7B80\u6D01\u548C\u9AD8\u6548\u3002</p>
<p><img src="/lupine.js/assets/og-image.png" alt="Lupine.js"></p>
<h2 id="\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-js"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-js">#</a>\u4E3A\u4EC0\u4E48\u9009\u62E9 Lupine.js\uFF1F</h2><h3 id="1-\u6781\u5176\u8F7B\u91CF\u7684\u524D\u7AEF"><a class="header-anchor" href="#1-\u6781\u5176\u8F7B\u91CF\u7684\u524D\u7AEF">#</a>1. \u{1FAB6} \u6781\u5176\u8F7B\u91CF\u7684\u524D\u7AEF</h3><p><code>lupine.web</code> \u524D\u7AEF\u5305\u6781\u5176\u5C0F\u5DE7\u2014\u2014\u4EC5 <strong>7kb gzipped</strong>\u3002\u7136\u800C\uFF0C\u5B83\u4FDD\u7559\u4E86\u4F60\u719F\u6089\u548C\u559C\u7231\u7684\u5F00\u53D1\u4F53\u9A8C\uFF1A<strong>TSX \u8BED\u6CD5</strong> (React JSX)\u3001\u7EC4\u4EF6\u548C Hooks\u3002\u6CA1\u6709\u6C89\u91CD\u7684\u8FD0\u884C\u65F6\u9700\u8981\u4E0B\u8F7D\uFF0C\u8FD9\u610F\u5473\u7740\u5373\u4F7F\u5728\u6162\u901F\u7F51\u7EDC\u4E0B\uFF0C\u4F60\u7684\u9875\u9762\u4E5F\u80FD\u77AC\u95F4\u52A0\u8F7D\u3002</p>
<h3 id="2-\u5185\u7F6E\u670D\u52A1\u7AEF\u6E32\u67D3-ssr"><a class="header-anchor" href="#2-\u5185\u7F6E\u670D\u52A1\u7AEF\u6E32\u67D3-ssr">#</a>2. \u26A1 \u5185\u7F6E\u670D\u52A1\u7AEF\u6E32\u67D3 (SSR)</h3><p>\u5927\u591A\u6570\u6846\u67B6\u5C06 SSR \u89C6\u4E3A\u9644\u52A0\u529F\u80FD\u3002\u5728 Lupine \u4E2D\uFF0CSSR \u662F <strong>\u4E00\u7B49\u516C\u6C11</strong>\u3002<code>lupine.api</code> \u540E\u7AEF\u7ECF\u8FC7\u4F18\u5316\uFF0C\u80FD\u591F\u81EA\u52A8\u5728\u670D\u52A1\u5668\u4E0A\u6E32\u67D3\u4F60\u7684\u524D\u7AEF\u9875\u9762\u3002</p>
<ul>
<li><strong>\u65E0\u6837\u5F0F\u95EA\u70C1 (No FOUC)</strong>: \u5173\u952E CSS \u7531\u670D\u52A1\u7AEF\u6CE8\u5165\u3002</li>
<li><strong>\u96F6\u914D\u7F6E SEO</strong>: Meta \u6807\u7B7E (<code>og:image</code>, <code>description</code>) \u5728\u9875\u9762\u79BB\u5F00\u670D\u52A1\u5668\u524D\u5C31\u5DF2\u7ECF\u8BA1\u7B97\u5B8C\u6BD5\u3002</li>
<li><strong>\u793E\u4EA4\u5206\u4EAB\u5C31\u7EEA</strong>: \u5206\u4EAB\u5230 Twitter/\u5FAE\u4FE1/Facebook \u7684\u94FE\u63A5\u5F00\u7BB1\u5373\u7528\uFF0C\u6548\u679C\u5B8C\u7F8E\u3002</li>
</ul>
<h3 id="3-\u539F\u751F-css-in-js-\u5F15\u64CE"><a class="header-anchor" href="#3-\u539F\u751F-css-in-js-\u5F15\u64CE">#</a>3. \u{1F3A8} \u539F\u751F CSS-in-JS \u5F15\u64CE</h3><p>\u544A\u522B\u914D\u7F6E PostCSS\u3001Tailwind \u6216 styled-components \u7684\u70E6\u607C\u3002Lupine \u5185\u7F6E\u4E86\u4E00\u4E2A\u5F3A\u5927\u7684 CSS-in-JS \u5F15\u64CE\u3002</p>
<ul>
<li><strong>\u6837\u5F0F\u9694\u79BB</strong>: \u6837\u5F0F\u81EA\u52A8\u9694\u79BB\u5230\u4F60\u7684\u7EC4\u4EF6\u3002</li>
<li><strong>\u5D4C\u5957\u652F\u6301</strong>: \u652F\u6301 <code>.parent &amp;</code> \u8BED\u6CD5\u3002</li>
<li><strong>\u9AD8\u6027\u80FD</strong>: \u6837\u5F0F\u5728 SSR \u671F\u95F4\u88AB\u9AD8\u6548\u63D0\u53D6\u548C\u6CE8\u5165\u3002</li>
</ul>
<pre><code class="language-tsx">const Button = () =&gt; {
  const css = {
    backgroundColor: &#39;#0ac92a&#39;,
    &#39;&amp;:hover&#39;: {
      backgroundColor: &#39;#08a823&#39;,
    },
  };
  return &lt;button css={css}&gt;\u70B9\u51FB\u6211&lt;/button&gt;;
};
</code></pre>
<h3 id="4-\u5168\u6808\u5408\u4E00"><a class="header-anchor" href="#4-\u5168\u6808\u5408\u4E00">#</a>4. \u{1F680} \u5168\u6808\u5408\u4E00</h3><p>Lupine \u4E0D\u4EC5\u4EC5\u662F\u4E00\u4E2A\u524D\u7AEF\u5E93\uFF1B\u5B83\u662F\u5B8C\u6574\u7684\u5E94\u7528\u89E3\u51B3\u65B9\u6848\u3002</p>
<ul>
<li><strong>\u540E\u7AEF (<code>lupine.api</code>)</strong>: \u4E00\u4E2A\u9AD8\u6548\u3001\u6781\u7B80\u7684 Node.js \u6846\u67B6\uFF0C\u7C7B\u4F3C\u4E8E Express\u3002</li>
<li><strong>\u524D\u7AEF (<code>lupine.web</code>)</strong>: \u4E00\u4E2A\u54CD\u5E94\u5F0F\u7684 UI \u5E93\u3002</li>
<li><strong>\u5F00\u53D1\u4F53\u9A8C</strong>: \u8FD0\u884C <code>npm run dev</code>\uFF0C\u5373\u53EF\u5728\u540C\u4E00\u4E2A VS Code \u4F1A\u8BDD\u4E2D\u540C\u65F6\u8C03\u8BD5\u524D\u7AEF\u548C\u540E\u7AEF\u3002</li>
</ul>
<h2 id="\u5FEB\u901F\u5F00\u59CB"><a class="header-anchor" href="#\u5FEB\u901F\u5F00\u59CB">#</a>\u5FEB\u901F\u5F00\u59CB</h2><p>\u51C6\u5907\u597D\u5C1D\u8BD5\u4E86\u5417\uFF1F\u51E0\u79D2\u949F\u5C31\u80FD\u642D\u5EFA\u4E00\u4E2A\u65B0\u7684\u9879\u76EE\u3002</p>
<h3 id="\u7B2C\u4E00\u6B65-\u521B\u5EFA\u9879\u76EE"><a class="header-anchor" href="#\u7B2C\u4E00\u6B65-\u521B\u5EFA\u9879\u76EE">#</a>\u7B2C\u4E00\u6B65\uFF1A\u521B\u5EFA\u9879\u76EE</h3><p>\u4F7F\u7528\u6211\u4EEC\u7684 CLI \u5DE5\u5177\u521B\u5EFA\u4E00\u4E2A\u65B0\u5E94\u7528\u3002</p>
<pre><code class="language-bash">npx create-lupine@latest my-awesome-app
</code></pre>
<h3 id="\u7B2C\u4E8C\u6B65-\u8FD0\u884C\u9879\u76EE"><a class="header-anchor" href="#\u7B2C\u4E8C\u6B65-\u8FD0\u884C\u9879\u76EE">#</a>\u7B2C\u4E8C\u6B65\uFF1A\u8FD0\u884C\u9879\u76EE</h3><p>\u8FDB\u5165\u76EE\u5F55\u5E76\u542F\u52A8\u5F00\u53D1\u670D\u52A1\u5668\u3002</p>
<pre><code class="language-bash">cd my-awesome-app
npm install
npm run dev
</code></pre>
<p>\u8BBF\u95EE <code>http://localhost:11080</code>\uFF0C\u4F60\u5C06\u770B\u5230\u4F60\u7684\u7B2C\u4E00\u4E2A Lupine \u5E94\u7528\u6B63\u5728\u8FD0\u884C\uFF01</p>
<h2 id="\u4EE3\u7801\u6D3B\u8DC3\u5EA6"><a class="header-anchor" href="#\u4EE3\u7801\u6D3B\u8DC3\u5EA6">#</a>\u4EE3\u7801\u6D3B\u8DC3\u5EA6</h2><p>Lupine \u6B63\u5728\u79EF\u6781\u5F00\u53D1\u4E2D\u3002\u4F60\u53EF\u4EE5\u76F4\u63A5\u5728 GitHub \u4E0A\u67E5\u770B\u6211\u4EEC\u7684\u4EE3\u7801\u9891\u7387\u548C\u8D21\u732E\uFF1A
\u{1F449} <a href="https://github.com/uuware/lupine.js">https://github.com/uuware/lupine.js</a></p>
<h2 id="\u603B\u7ED3"><a class="header-anchor" href="#\u603B\u7ED3">#</a>\u603B\u7ED3</h2><p>Lupine.js \u975E\u5E38\u9002\u5408\u8FD9\u6837\u7684\u5F00\u53D1\u8005\uFF1A</p>
<ul>
<li><strong>\u638C\u63A7\u529B</strong>: \u60F3\u8981\u4E86\u89E3\u6280\u672F\u6808\u7684\u6BCF\u4E00\u4E2A\u90E8\u5206\u3002</li>
<li><strong>\u901F\u5EA6</strong>: \u60F3\u4E3A\u7528\u6237\u63D0\u4F9B\u6700\u5FEB\u7684\u4F53\u9A8C\u3002</li>
<li><strong>\u7B80\u6D01</strong>: \u6CA1\u6709\u9690\u85CF\u7684\u9B54\u6CD5\uFF0C\u53EA\u6709\u5E72\u51C0\u7684\u4EE3\u7801\u3002</li>
</ul>
<p>\u7ED9 <strong>Lupine.js</strong> \u5728 GitHub \u4E0A\u70B9\u4E2A Star\uFF0C\u5E76\u5728\u4F60\u7684\u4E0B\u4E00\u4E2A\u9879\u76EE\u4E2D\u5C1D\u8BD5\u4E00\u4E0B\u5427\uFF01</p>
`;var Sg=`<h1 id="lupine-press-\u4E3A\u6781\u901F\u6587\u6863\u800C\u751F"><a class="header-anchor" href="#lupine-press-\u4E3A\u6781\u901F\u6587\u6863\u800C\u751F">#</a>Lupine.Press\uFF1A\u4E3A\u6781\u901F\u6587\u6863\u800C\u751F</h1><p>\u5199\u6587\u6863\u4E0D\u5E94\u8BE5\u662F\u4E00\u4EF6\u75DB\u82E6\u7684\u4E8B\u3002\u4F46\u5728\u73B0\u6709\u7684\u751F\u6001\u4E2D\uFF0C\u6211\u4EEC\u5F80\u5F80\u9700\u8981\u5728\u201C\u590D\u6742\u7684\u914D\u7F6E\u201D\u548C\u201C\u4E11\u964B\u7684\u9ED8\u8BA4\u6837\u5F0F\u201D\u4E4B\u95F4\u505A\u9009\u62E9\u3002</p>
<p><strong>Lupine.Press</strong> \u7684\u51FA\u73B0\uFF0C\u5C31\u662F\u4E3A\u4E86\u6253\u7834\u8FD9\u4E2A\u50F5\u5C40\u3002</p>
<p>\u5B83\u662F\u57FA\u4E8E <strong>Lupine.js</strong> \u6784\u5EFA\u7684\u6587\u6863\u6846\u67B6\uFF0C\u7EE7\u627F\u4E86\u540E\u8005 <strong>\u201C\u6781\u81F4\u8F7B\u91CF\u201D</strong> \u548C <strong>\u201C\u9AD8\u6027\u80FD\u201D</strong> \u7684\u57FA\u56E0\u3002\u5B83\u80FD\u8BA9\u4F60\u7528\u6700\u7B80\u5355\u7684 Markdown\uFF0C\u6784\u5EFA\u51FA\u4E13\u4E1A\u3001\u54CD\u5E94\u5F0F\u4E14\u652F\u6301\u591A\u8BED\u8A00\u7684\u6587\u6863\u7F51\u7AD9\u3002</p>
<p><img src="/lupine.js/assets/lupine.press.png" alt="Lupine.Press"></p>
<p>\u4E3A\u4E86\u8BA9\u60A8\u66F4\u76F4\u89C2\u5730\u4E86\u89E3\u6548\u679C\uFF0C\u6211\u4EEC\u4E3A\u60A8\u51C6\u5907\u4E86\u4E00\u4E2A\u5B8C\u6574\u7684\u6F14\u793A\u9879\u76EE\u3002\u60A8\u53EF\u4EE5\u76F4\u63A5\u8BBF\u95EE\u6E90\u7801\u4ED3\u5E93\uFF0C\u751A\u81F3\u76F4\u63A5 Fork \u5B83\u4F5C\u4E3A\u60A8\u7684\u8D77\u70B9\uFF1A</p>
<ul>
<li><strong>\u6E90\u7801\u4ED3\u5E93</strong>: <a href="https://github.com/uuware/lupine-template-doc-starter">https://github.com/uuware/lupine-template-doc-starter</a></li>
</ul>
<p>\u60A8\u4E5F\u53EF\u4EE5\u70B9\u51FB\u4E0B\u65B9\u94FE\u63A5\uFF0C\u5728\u7EBF\u67E5\u770B\u8BE5\u9879\u76EE\u7684\u5B9E\u9645\u8FD0\u884C\u6548\u679C\uFF1A</p>
<ul>
<li><strong>\u5728\u7EBF\u6F14\u793A</strong>: <a href="https://uuware.github.io/lupine-template-doc-starter/">https://uuware.github.io/lupine-template-doc-starter/</a></li>
</ul>
<h2 id="\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-press"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-press">#</a>\u4E3A\u4EC0\u4E48\u9009\u62E9 Lupine.Press\uFF1F</h2><h3 id="1-\u96BE\u4EE5\u7F6E\u4FE1\u7684\u5FEB"><a class="header-anchor" href="#1-\u96BE\u4EE5\u7F6E\u4FE1\u7684\u5FEB">#</a>1. \u26A1 \u96BE\u4EE5\u7F6E\u4FE1\u7684\u5FEB</h3><p>\u8FD9\u5C31\u4E0D\u7528\u591A\u8BF4\u4E86\u3002\u57FA\u4E8E Lupine.js \u6838\u5FC3\uFF08\u4EC5 7kb\uFF09\uFF0C\u4F60\u7684\u6587\u6863\u7F51\u7AD9\u52A0\u8F7D\u901F\u5EA6\u4F1A\u5FEB\u5F97\u60CA\u4EBA\u3002\u6CA1\u6709\u81C3\u80BF\u7684 hydration \u8FC7\u7A0B\uFF0C\u5185\u5BB9\u5373\u523B\u5448\u73B0\u3002</p>
<h3 id="2-markdown-\u9A71\u52A8\u7684\u4E00\u5207"><a class="header-anchor" href="#2-markdown-\u9A71\u52A8\u7684\u4E00\u5207">#</a>2. \u{1F4DD} Markdown \u9A71\u52A8\u7684\u4E00\u5207</h3><p>\u5728 Lupine.Press \u4E2D\uFF0C\u6587\u4EF6\u7ED3\u6784\u5373\u8DEF\u7531\u3002</p>
<ul>
<li>\u53EA\u8981\u5728\u76EE\u5F55\u4E0B\u653E\u4E00\u4E2A <code>guide.md</code>\uFF0C\u5B83\u5C31\u4F1A\u81EA\u52A8\u53D8\u6210 <code>/guide</code> \u9875\u9762\u3002</li>
<li>\u4FA7\u8FB9\u680F\u914D\u7F6E\uFF1F\u76F4\u63A5\u5199\u5728 <code>index.md</code> \u7684 Frontmatter \u91CC\u3002</li>
<li>\u591A\u8BED\u8A00\uFF1F\u53EA\u9700\u5EFA\u7ACB <code>en</code> \u548C <code>zh</code> \u6587\u4EF6\u5939\uFF0C\u6846\u67B6\u81EA\u52A8\u5904\u7406\u5207\u6362\u3002</li>
</ul>
<h3 id="3-\u5F00\u7BB1\u5373\u7528\u7684\u4E13\u4E1A\u8BBE\u8BA1"><a class="header-anchor" href="#3-\u5F00\u7BB1\u5373\u7528\u7684\u4E13\u4E1A\u8BBE\u8BA1">#</a>3. \u{1F3A8} \u5F00\u7BB1\u5373\u7528\u7684\u4E13\u4E1A\u8BBE\u8BA1</h3><p>\u4F60\u4E0D\u9700\u8981\u61C2 CSS \u4E5F\u80FD\u62E5\u6709\u6F02\u4EAE\u7684\u6587\u6863\u7AD9\u3002<code>PressFrame</code> \u7EC4\u4EF6\u5185\u7F6E\u4E86\uFF1A</p>
<ul>
<li><strong>\u54CD\u5E94\u5F0F\u4FA7\u8FB9\u680F</strong>\uFF1A\u5728\u79FB\u52A8\u7AEF\u81EA\u52A8\u6298\u53E0\u3002</li>
<li><strong>\u4EAE\u8272/\u6697\u8272\u6A21\u5F0F</strong>\uFF1A\u81EA\u52A8\u8DDF\u968F\u7CFB\u7EDF\u6216\u624B\u52A8\u5207\u6362\u3002</li>
<li><strong>\u4EE3\u7801\u9AD8\u4EAE</strong>\uFF1A\u5185\u7F6E\u652F\u6301\u3002</li>
</ul>
<h3 id="4-\u7075\u6D3B\u7684\u6269\u5C55\u6027"><a class="header-anchor" href="#4-\u7075\u6D3B\u7684\u6269\u5C55\u6027">#</a>4. \u{1F6E0}\uFE0F \u7075\u6D3B\u7684\u6269\u5C55\u6027</h3><p>\u867D\u7136\u5B83\u5F88\u8F7B\uFF0C\u4F46\u5B83\u4E0D\u201C\u6B7B\u677F\u201D\u3002\u56E0\u4E3A\u672C\u8D28\u4E0A\u5B83\u5C31\u662F\u4E00\u4E2A Lupine.js \u5E94\u7528\u3002\u4F60\u53EF\u4EE5\u968F\u65F6\uFF1A</p>
<ul>
<li>\u5728 Markdown \u91CC\u5D4C\u5165 React \u98CE\u683C\u7684\u7EC4\u4EF6\u3002</li>
<li>\u4F7F\u7528 <code>bindGlobalStyle</code> \u81EA\u5B9A\u4E49\u5168\u5C40\u6837\u5F0F\u3002</li>
<li>\u7F16\u5199\u81EA\u5B9A\u4E49\u7684 Layout\u3002</li>
</ul>
<h2 id="\u90E8\u7F72\u9ED1\u79D1\u6280-github-pages-\u4E5F\u80FD\u8DD1-spa"><a class="header-anchor" href="#\u90E8\u7F72\u9ED1\u79D1\u6280-github-pages-\u4E5F\u80FD\u8DD1-spa">#</a>\u90E8\u7F72\u9ED1\u79D1\u6280\uFF1AGitHub Pages \u4E5F\u80FD\u8DD1 SPA\uFF1F</h2><p>\u4F17\u6240\u5468\u77E5\uFF0CGitHub Pages \u7B49\u9759\u6001\u6258\u7BA1\u670D\u52A1\u5BF9\u5355\u9875\u5E94\u7528\uFF08SPA\uFF09\u7684\u652F\u6301\u5E76\u4E0D\u53CB\u597D\u3002\u56E0\u4E3A\u5B83\u4EEC\u4E0D\u77E5\u9053 <code>/guide/started</code> \u5176\u5B9E\u5E94\u8BE5\u6307\u5411 <code>index.html</code>\uFF0C\u5F80\u5F80\u4F1A\u76F4\u63A5\u8FD4\u56DE <strong>404</strong>\u3002</p>
<p>Lupine.Press \u63D0\u4F9B\u4E86\u4E00\u4E2A\u806A\u660E\u7684\u89E3\u51B3\u65B9\u6848\u3002</p>
<h3 id="\u806A\u660E\u4EBA\u90FD\u77E5\u9053\u7684-404-html"><a class="header-anchor" href="#\u806A\u660E\u4EBA\u90FD\u77E5\u9053\u7684-404-html">#</a>\u806A\u660E\u4EBA\u90FD\u77E5\u9053\u7684 <code>404.html</code></h3><p>\u6211\u4EEC\u5728 <code>docs/404.html</code> \u4E2D\u5185\u7F6E\u4E86\u4E00\u6BB5\u795E\u5947\u7684\u4EE3\u7801\uFF1A</p>
<pre><code class="language-html">&lt;script type=&quot;text/javascript&quot;&gt;
  // Single Page Apps for GitHub Pages
  if (window.location.pathname.includes(&#39;/lupine.js/&#39;)) {
    // \u5C06\u5F53\u524D\u8DEF\u5F84\u4F5C\u4E3A\u53C2\u6570\uFF0C\u91CD\u5B9A\u5411\u56DE\u9996\u9875
    window.location.href = &#39;/lupine.js/?redirect=&#39; + window.location.pathname;
  }
&lt;/script&gt;
</code></pre>
<p>\u914D\u5408\u524D\u7AEF\u8DEF\u7531\u7684\u81EA\u52A8\u6062\u590D\u903B\u8F91\uFF0C\u8FD9\u610F\u5473\u7740\uFF1A</p>
<ol>
<li>\u7528\u6237\u8BBF\u95EE\u6DF1\u5C42\u94FE\u63A5 <code>/guide/started</code>\u3002</li>
<li>GitHub Pages \u8FD4\u56DE 404 \u9875\u9762\u3002</li>
<li>\u811A\u672C\u7ACB\u523B\u5C06\u9875\u9762\u91CD\u5B9A\u5411\u4E3A <code>/?redirect=/guide/started</code>\u3002</li>
<li>Lupine.js \u5E94\u7528\u542F\u52A8\uFF0C\u8BFB\u53D6 <code>redirect</code> \u53C2\u6570\uFF0C\u65E0\u7F1D\u6062\u590D\u5230\u7528\u6237\u60F3\u770B\u7684\u9875\u9762\u3002</li>
</ol>
<p><strong>\u7ED3\u679C\u5C31\u662F\uFF1A\u4F60\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528 GitHub Pages \u6258\u7BA1\u4E00\u4E2A\u4F53\u9A8C\u5B8C\u7F8E\u7684 SPA \u6587\u6863\u7AD9\uFF01</strong></p>
<h2 id="\u5FEB\u901F\u4E0A\u624B"><a class="header-anchor" href="#\u5FEB\u901F\u4E0A\u624B">#</a>\u5FEB\u901F\u4E0A\u624B</h2><p>\u53EA\u9700\u4E00\u884C\u547D\u4EE4\uFF0C\u7ACB\u523B\u62E5\u6709\u4F60\u7684\u6587\u6863\u7AD9\uFF1A</p>
<pre><code class="language-bash">npx create-lupine@latest my-docs
# \u9009\u62E9 &#39;doc-starter&#39; \u6A21\u677F
</code></pre>
<p>\u542F\u52A8\u9879\u76EE\uFF1A</p>
<pre><code class="language-bash">cd my-docs
npm install
npm run dev
</code></pre>
<p>\u73B0\u5728\uFF0C\u5F00\u59CB\u4E13\u6CE8\u4E8E\u5199\u4F5C\u5427\uFF01</p>
<h2 id="\u53D1\u5E03\u5230-github-pages"><a class="header-anchor" href="#\u53D1\u5E03\u5230-github-pages">#</a>\u53D1\u5E03\u5230 GitHub Pages</h2><p>\u5728 <code>apps/[\u60A8\u7684\u9879\u76EE\u540D]/web</code> \u76EE\u5F55\u4E0B\uFF0C\u60A8\u4F1A\u627E\u5230\u4E00\u4E2A\u540D\u4E3A <code>github-pj-name</code> \u7684\u6587\u4EF6\u5939\u3002\u8BF7\u5C06\u5176\u91CD\u547D\u540D\u4E3A\u60A8\u7684 GitHub \u9879\u76EE\u540D\u79F0\u3002\u63A5\u7740\uFF0C\u5728\u5168\u5C40\u8303\u56F4\u5185\u641C\u7D22 <code>github-pj-name</code> \u5E76\u5C06\u5176\u5168\u90E8\u66FF\u6362\u4E3A\u60A8\u7684 GitHub \u9879\u76EE\u540D\u79F0\u3002\u8FD9\u662F\u4E3A\u4E86\u9002\u914D GitHub Pages \u7684\u8DEF\u5F84\u7ED3\u6784\uFF1A<code>[github-account].github.io/[github-pj-name]/</code>\u3002</p>
<p>\u7F16\u8F91\u5B8C\u6587\u6863\u540E\uFF0C\u8BF7\u6267\u884C <code>npm run build</code>\u3002\u786E\u8BA4\u7F16\u8BD1\u65E0\u8BEF\u540E\uFF0C\u8FD0\u884C <code>npm run cp-docs</code>\u3002\u6B64\u547D\u4EE4\u4F1A\u5C06 <code>build</code> \u76EE\u5F55\u4E0B\u7684\u9759\u6001\u6587\u4EF6\u590D\u5236\u5230 <code>/docs</code> \u76EE\u5F55\u3002\u5C06\u6240\u6709\u66F4\u6539\u63D0\u4EA4\u5230 GitHub \u4ED3\u5E93\u540E\uFF0C\u8FDB\u5165\u4ED3\u5E93\u7684 Settings -&gt; Pages \u8BBE\u7F6E\u9875\u3002\u5728 Build and deployment \u4E0B\uFF0C\u9009\u62E9 <strong>main</strong> \u5206\u652F\u548C <strong>/docs</strong> \u6587\u4EF6\u5939\uFF0C\u7136\u540E\u70B9\u51FB\u4FDD\u5B58\u3002\u7A0D\u540E\u60A8\u5373\u53EF\u901A\u8FC7 <code>https://[github-account].github.io/[github-pj-name]/</code> \u8BBF\u95EE\u60A8\u7684\u6587\u6863\u7F51\u7AD9\u3002</p>
<p>\u82E5\u8981\u5728\u4ED3\u5E93\u4E3B\u9875\u7684 About \u533A\u57DF\u663E\u793A\u6B64\u94FE\u63A5\uFF0C\u70B9\u51FB About \u65C1\u7684\u8BBE\u7F6E\u56FE\u6807 (\u9F7F\u8F6E)\uFF0C\u52FE\u9009 &quot;Use your GitHub Pages website&quot; \u5373\u53EF\u3002</p>
`;var Cg=`<p>\u670D\u52A1\u7AEF\u6E32\u67D3 (SSR) \u5DF2\u7ECF\u4ECE\u901A\u8FC7 SEO \u9526\u4E0A\u6DFB\u82B1\u7684\u201C\u53EF\u9009\u9879\u201D\uFF0C\u53D8\u6210\u4E86\u73B0\u4EE3 Web \u67B6\u6784\u4E2D\u63D0\u5347\u6027\u80FD\u548C\u7528\u6237\u4F53\u9A8C\u7684\u201C\u5FC5\u9009\u9879\u201D\u3002</p>
<p>\u5728 2026 \u5E74\uFF0C\u5F00\u53D1\u8005\u901A\u5E38\u4F1A\u9996\u9009 <strong>Next.js</strong> (React \u751F\u6001) \u6216 <strong>Angular SSR</strong> (\u524D\u8EAB\u662F Universal)\u3002\u4F46\u662F\uFF0C\u8FD9\u4E9B\u91CD\u91CF\u7EA7\u6846\u67B6\u4E0E\u50CF <strong>Lupine.js</strong> \u8FD9\u6837\u4E13\u4E3A\u6027\u80FD\u6253\u9020\u7684\u8F7B\u91CF\u7EA7\u6846\u67B6\u76F8\u6BD4\uFF0C\u7A76\u7ADF\u8868\u73B0\u5982\u4F55\uFF1F</p>
<p>\u672C\u6587\u5C06\u6DF1\u5EA6\u89E3\u6790\u5B83\u4EEC\u5728\u67B6\u6784\u8BBE\u8BA1\u3001\u6C34\u5408 (Hydration) \u6210\u672C\u4EE5\u53CA\u5F00\u53D1\u4F53\u9A8C\u4E0A\u7684\u5DEE\u5F02\u3002</p>
<p><img src="/lupine.js/assets/ssr.png" alt="Lupine.js Architecture"></p>
<h2 id="1-\u6E32\u67D3\u67B6\u6784\u5BF9\u6BD4"><a class="header-anchor" href="#1-\u6E32\u67D3\u67B6\u6784\u5BF9\u6BD4">#</a>1. \u6E32\u67D3\u67B6\u6784\u5BF9\u6BD4</h2><h3 id="react-next-js-remix"><a class="header-anchor" href="#react-next-js-remix">#</a>React (Next.js/Remix)</h3><p>React \u672C\u8EAB\u53EA\u662F\u4E00\u4E2A UI \u5E93\u3002\u8981\u5B9E\u73B0 SSR\uFF0C\u4F60\u901A\u5E38\u9700\u8981\u5F15\u5165\u4E00\u4E2A\u5143\u6846\u67B6 (Meta-framework)\u3002</p>
<ul>
<li><strong>\u673A\u5236</strong>: \u670D\u52A1\u7AEF\u5C06\u7EC4\u4EF6\u6811\u6E32\u67D3\u6210 HTML \u5B57\u7B26\u4E32\u3002</li>
<li><strong>\u6210\u672C</strong>: \u5728\u5BA2\u6237\u7AEF\uFF0CReact \u5FC5\u987B\u4E0B\u8F7D\u5B8C\u6574\u7684 JS \u5305\uFF0C\u91CD\u65B0\u8FD0\u884C\u7EC4\u4EF6\u903B\u8F91\u4EE5\u6784\u5EFA\u865A\u62DF DOM (VDOM)\uFF0C\u7136\u540E\u8FDB\u884C\u201C\u6C34\u5408\u201D (Hydrate) \u2014\u2014 \u5373\u628A\u4E8B\u4EF6\u76D1\u542C\u5668\u6302\u8F7D\u5230\u73B0\u6709\u7684 HTML \u4E0A\u3002</li>
<li><strong>\u6F14\u8FDB</strong>: React \u670D\u52A1\u7AEF\u7EC4\u4EF6 (RSC) \u901A\u8FC7\u4FDD\u7559\u90E8\u5206\u903B\u8F91\u5728\u670D\u52A1\u7AEF\u6765\u51CF\u5C11\u5305\u4F53\u79EF\uFF0C\u4F46\u968F\u4E4B\u800C\u6765\u7684\u662F\u6D41\u5F0F\u4F20\u8F93\u3001Suspense \u8FB9\u754C\u4EE5\u53CA\u5BA2\u6237\u7AEF/\u670D\u52A1\u7AEF\u7EC4\u4EF6\u62C6\u5206\u7684\u9AD8\u590D\u6742\u5EA6\u3002</li>
</ul>
<h3 id="angular-ssr-modern-hydration"><a class="header-anchor" href="#angular-ssr-modern-hydration">#</a>Angular (SSR / Modern Hydration)</h3><p>Angular \u5DF2\u7ECF\u8F6C\u5411\u201C\u975E\u7834\u574F\u6027\u6C34\u5408\u201D\u548C\u90E8\u5206\u6C34\u5408\u3002</p>
<ul>
<li><strong>\u673A\u5236</strong>: Angular \u4F7F\u7528 TransferState \u5E8F\u5217\u5316\u72B6\u6001\u4F20\u8F93\uFF0C\u907F\u514D\u5BA2\u6237\u7AEF\u91CD\u590D\u8BF7\u6C42\u6570\u636E\u3002</li>
<li><strong>\u6210\u672C</strong>: \u5386\u53F2\u4E0A\uFF0CAngular SSR \u4F1A\u5BFC\u81F4\u201C\u95EA\u70C1\u201D\uFF0C\u56E0\u4E3A\u5B83\u4F1A\u9500\u6BC1\u670D\u52A1\u7AEF HTML \u5E76\u91CD\u65B0\u6E32\u67D3\u3002\u73B0\u4EE3\u7248\u672C\u867D\u7136\u4FEE\u590D\u4E86\u8FD9\u4E2A\u95EE\u9898\uFF0C\u4F46\u6846\u67B6\u672C\u8EAB\u7684\u5F00\u9500 (Zone.js, \u4F9D\u8D56\u6CE8\u5165\u7CFB\u7EDF) \u5BF9\u4E8E\u6D4F\u89C8\u5668\u4E3B\u7EBF\u7A0B\u6765\u8BF4\u4ECD\u7136\u662F\u4E00\u4E2A\u4E0D\u5C0F\u7684\u8D1F\u62C5\u3002</li>
</ul>
<h3 id="lupine-js"><a class="header-anchor" href="#lupine-js">#</a>Lupine.js</h3><p>Lupine \u91C7\u53D6\u4E86\u6839\u672C\u4E0D\u540C\u7684\u67B6\u6784\u3002\u5B83\u4ECE\u7B2C\u4E00\u884C\u4EE3\u7801\u5F00\u59CB\uFF0C\u5C31\u662F\u4F5C\u4E3A\u4E00\u4E2A<strong>\u5168\u6808\u7EC4\u4EF6\u6846\u67B6</strong>\u8BBE\u8BA1\u7684\u3002</p>
<ul>
<li><strong>\u673A\u5236</strong>: <code>serverSideRenderPage</code> \u51FD\u6570 (\u5728 <code>lupine.api</code> \u4E2D) \u76F4\u63A5\u6267\u884C\u7EC4\u4EF6\u903B\u8F91\u3002\u5B83\u7CBE\u51C6\u8BC6\u522B\u5E76\u9884\u7559\u4E86\u5173\u952E\u8D44\u6E90\uFF08CSS, Meta, Title\uFF09\u7684\u201C\u63D2\u69FD\u201D\u3002</li>
<li><strong>\u65E0 VDOM</strong>: Lupine <strong>\u4E0D\u4F7F\u7528\u865A\u62DF DOM</strong>\u3002\u5728\u670D\u52A1\u7AEF\uFF0C\u5B83\u9AD8\u6548\u5730\u62FC\u63A5\u5B57\u7B26\u4E32\u3002\u5728\u5BA2\u6237\u7AEF\uFF0C\u5B83\u76F4\u63A5\u7ED1\u5B9A\u5230\u771F\u5B9E\u7684 DOM \u8282\u70B9\u3002</li>
<li><strong>\u7ED3\u679C</strong>: \u670D\u52A1\u7AEF\u53D1\u9001\u7684\u662F\u5B8C\u5168\u6837\u5F0F\u5316\u7684 HTML \u9875\u9762\u3002\u5BA2\u6237\u7AEF\u811A\u672C (~7kb) \u52A0\u8F7D\u540E\uFF0C\u4EC5\u4EC5\u662F\u201C\u7ED1\u5B9A\u201D\u5230\u73B0\u6709\u5143\u7D20\u4E0A\u3002\u56E0\u4E3A\u6CA1\u6709 VDOM \u9700\u8981\u91CD\u5EFA\uFF0C\u6240\u4EE5\u6CA1\u6709\u7E41\u91CD\u7684\u201C\u91CD\u8BA1\u7B97\u201D\u8FC7\u7A0B\u3002</li>
</ul>
<h2 id="2-\u89E3\u51B3-fouc-\u65E0\u6837\u5F0F\u5185\u5BB9\u95EA\u70C1"><a class="header-anchor" href="#2-\u89E3\u51B3-fouc-\u65E0\u6837\u5F0F\u5185\u5BB9\u95EA\u70C1">#</a>2. \u89E3\u51B3 &quot;FOUC&quot; (\u65E0\u6837\u5F0F\u5185\u5BB9\u95EA\u70C1)</h2><h3 id="\u95EE\u9898"><a class="header-anchor" href="#\u95EE\u9898">#</a>\u95EE\u9898</h3><p>SSR \u7684 HTML \u5148\u5230\u8FBE\u6D4F\u89C8\u5668\uFF0C\u7136\u540E\u529F\u80FD\u52A0\u8F7D\uFF0C\u6700\u540E\u6837\u5F0F\u52A0\u8F7D\u3002\u5982\u679C\u6837\u5F0F\u52A0\u8F7D\u665A\u4E86\uFF0C\u7528\u6237\u5C31\u4F1A\u770B\u5230\u51E0\u6BEB\u79D2\u7684\u9875\u9762\u9519\u4E71 (FOUC)\u3002</p>
<h3 id="react-next-js"><a class="header-anchor" href="#react-next-js">#</a>React / Next.js</h3><p>Next.js \u4F1A\u6536\u96C6\u6837\u5F0F\uFF08\u4F8B\u5982\u6765\u81EA CSS Modules \u6216 Tailwind\uFF09\u5E76\u6CE8\u5165\u3002\u4F46\u662F\uFF0C\u5982\u679C\u4F7F\u7528\u8FD0\u884C\u65F6\u7684 CSS-in-JS\uFF08\u50CF\u65E7\u7248\u7684 styled-components\uFF09\uFF0C\u5728\u6C34\u5408\u671F\u95F4\u91CD\u65B0\u8BA1\u7B97\u6837\u5F0F\u53EF\u80FD\u4F1A\u5E26\u6765\u6027\u80FD\u60E9\u7F5A\u3002</p>
<h3 id="lupine-js"><a class="header-anchor" href="#lupine-js">#</a>Lupine.js</h3><p>Lupine \u7684 <code>BindStyles</code> \u548C <code>CssProps</code> \u5F15\u64CE\u4F1A\u5728\u670D\u52A1\u7AEF\u6E32\u67D3\u671F\u95F4\u6536\u96C6\u6240\u6709\u9759\u6001\u548C\u52A8\u6001\u6837\u5F0F\u3002
\u5B83\u4F1A\u81EA\u52A8\u751F\u6210\u5173\u952E CSS \u4EE3\u7801\u5757\uFF0C\u5E76\u76F4\u63A5\u6CE8\u5165\u5230\u521D\u59CB HTML \u54CD\u5E94\u7684 <code>&lt;head&gt;</code> \u4E2D\u3002
<strong>\u7ED3\u679C</strong>: \u9875\u9762\u4ECE\u7B2C\u4E00\u4E2A\u5B57\u8282\u5F00\u59CB\u5C31\u662F\u5B8C\u7F8E\u7684\u3002\u65E0\u9700\u7B49\u5F85 JS \u52A0\u8F7D\uFF0C\u5E03\u5C40\u5C31\u662F\u6B63\u786E\u7684\u3002</p>
<h2 id="3-\u6570\u636E\u83B7\u53D6\u4E0E\u6C34\u5408"><a class="header-anchor" href="#3-\u6570\u636E\u83B7\u53D6\u4E0E\u6C34\u5408">#</a>3. \u6570\u636E\u83B7\u53D6\u4E0E\u6C34\u5408</h2><p>\u5982\u4F55\u4ECE\u6570\u636E\u5E93\u83B7\u53D6\u6570\u636E\u5E76\u663E\u793A\u5728\u5C4F\u5E55\u4E0A\uFF1F</p>
<h3 id="react-next-js-app-router"><a class="header-anchor" href="#react-next-js-app-router">#</a>React (Next.js App Router)</h3><pre><code class="language-tsx">// Server Component
async function Page() {
  const data = await db.query();
  return &lt;ClientComponent data={data} /&gt;;
}
</code></pre>
<ul>
<li><strong>\u4F18\u70B9</strong>: \u6570\u636E\u548C UI \u7D27\u5BC6\u914D\u5408 (Co-location)\u3002</li>
<li><strong>\u7F3A\u70B9</strong>: \u670D\u52A1\u7AEF\u7EC4\u4EF6\u548C\u5BA2\u6237\u7AEF\u7EC4\u4EF6\u4E4B\u95F4\u6709\u4E25\u683C\u7684\u8FB9\u754C\u3002\u4F60\u4E0D\u80FD\u5728\u670D\u52A1\u7AEF\u7EC4\u4EF6\u4E2D\u4F7F\u7528 State \u6216 Effect\u3002</li>
</ul>
<h3 id="lupine-js"><a class="header-anchor" href="#lupine-js">#</a>Lupine.js</h3><p>Lupine \u652F\u6301\u9875\u9762\u7EA7\u7684 <code>async</code> \u7EC4\u4EF6\uFF0C\u8FD9\u4F7F\u5F97\u540C\u4E00\u5957\u903B\u8F91\u53EF\u4EE5\u65E0\u7F1D\u8FD0\u884C\u5728\u670D\u52A1\u7AEF\u548C\u5BA2\u6237\u7AEF\uFF08SPA \u5BFC\u822A\u671F\u95F4\uFF09\u3002</p>
<pre><code class="language-tsx">// \u65E2\u8FD0\u884C\u5728\u670D\u52A1\u7AEF (SSR)\uFF0C\u4E5F\u8FD0\u884C\u5728\u5BA2\u6237\u7AEF (SPA \u5207\u6362)
export const ProductPage = async (props: PageProps) =&gt; {
  // SSR: \u5728\u670D\u52A1\u7AEF\u8BF7\u6C42\uFF0C\u53D1\u9001 HTML\u3002
  // CSR: \u5728\u5BA2\u6237\u7AEF\u8BF7\u6C42\uFF0C\u66F4\u65B0 DOM\u3002
  const data = await fetch(\`/api/products/\${props.urlParameters.id}\`);

  return &lt;div&gt;{data.title}&lt;/div&gt;;
};
</code></pre>
<ul>
<li><strong>\u8BBE\u8BA1\u54F2\u5B66</strong>: &quot;\u540C\u6784\u903B\u8F91 (Isomorphic Logic)&quot;\u3002\u4F60\u53EA\u5199\u4E00\u4E2A\u51FD\u6570\u3002\u5B83\u5728\u4E24\u79CD\u73AF\u5883\u4E2D\u90FD\u80FD\u9AD8\u6548\u8FD0\u884C\uFF0C\u4F60\u65E0\u9700\u5173\u5FC3\u201C\u5E8F\u5217\u5316\u8FB9\u754C\u201D\u6216\u201C\u5BA2\u6237\u7AEF\u5305\u88C5\u5668\u201D\u3002</li>
</ul>
<h2 id="4-\u6027\u80FD\u4E0E\u5305\u4F53\u79EF"><a class="header-anchor" href="#4-\u6027\u80FD\u4E0E\u5305\u4F53\u79EF">#</a>4. \u6027\u80FD\u4E0E\u5305\u4F53\u79EF</h2><p>\u8FD9\u662F\u6700\u663E\u8457\u7684\u5DEE\u5F02\u3002</p>
<table>
<thead>
<tr>
<th align="left">\u6307\u6807</th>
<th align="left">Next.js / React</th>
<th align="left">Angular</th>
<th align="left">Lupine.js</th>
</tr>
</thead>
<tbody><tr>
<td align="left"><strong>Hello World \u4F53\u79EF</strong></td>
<td align="left">~70kb - 200kb</td>
<td align="left">~100kb+</td>
<td align="left"><strong>~7kb</strong></td>
</tr>
<tr>
<td align="left"><strong>\u6C34\u5408\u7B56\u7565</strong></td>
<td align="left">VDOM \u534F\u8C03 (Reconciliation)</td>
<td align="left">Zone.js / \u4E8B\u4EF6\u56DE\u653E</td>
<td align="left"><strong>\u76F4\u63A5\u8282\u70B9\u7ED1\u5B9A</strong></td>
</tr>
<tr>
<td align="left"><strong>\u590D\u6742\u5EA6</strong></td>
<td align="left">\u9AD8 (Server Actions, RSC)</td>
<td align="left">\u9AD8 (\u6A21\u5757, DI)</td>
<td align="left"><strong>\u4F4E (\u51FD\u6570, \u4FE1\u53F7\u91CF)</strong></td>
</tr>
</tbody></table>
<h2 id="\u603B\u7ED3-\u5982\u4F55\u9009\u62E9"><a class="header-anchor" href="#\u603B\u7ED3-\u5982\u4F55\u9009\u62E9">#</a>\u603B\u7ED3: \u5982\u4F55\u9009\u62E9\uFF1F</h2><ul>
<li><strong>\u9009\u62E9 React/Next.js \u5982\u679C</strong>: \u4F60\u6709\u5E9E\u5927\u7684 React \u5F00\u53D1\u56E2\u961F\uFF0C\u9700\u8981\u6D77\u91CF\u7684\u7B2C\u4E09\u65B9\u5E93\u751F\u6001\uFF0C\u4E14\u6781\u5EA6\u4F9D\u8D56 Vercel \u7B49\u5E73\u53F0\u7684\u96C6\u6210\u3002</li>
<li><strong>\u9009\u62E9 Angular \u5982\u679C</strong>: \u4F60\u5728\u6784\u5EFA\u4F01\u4E1A\u7EA7\u8F6F\u4EF6\uFF0C\u9700\u8981\u4E25\u683C\u7684\u7C7B\u578B\u7EA6\u675F\u3001\u4F9D\u8D56\u6CE8\u5165\u7CFB\u7EDF\uFF0C\u4E14\u56E2\u961F\u89C4\u6A21\u8F83\u5927\u3002</li>
<li><strong>\u9009\u62E9 Lupine.js \u5982\u679C</strong>:<ul>
<li><strong>\u6027\u80FD\u81F3\u4E0A</strong>: \u4F60\u8FFD\u6C42\u6700\u5FEB\u7684\u9996\u5C4F\u5185\u5BB9\u7ED8\u5236 (FCP)\u3002</li>
<li><strong>\u5D07\u5C1A\u7B80\u7EA6</strong>: \u4F60\u4E0D\u60F3\u914D\u7F6E Webpack, Babel \u6216\u590D\u6742\u7684\u8DEF\u7531\u4E2D\u95F4\u4EF6\u3002</li>
<li><strong>SEO \u5F88\u5173\u952E</strong>: \u4F60\u9700\u8981\u7B80\u5355\u3001\u53EF\u9884\u6D4B\u7684 Meta \u6807\u7B7E\u63A7\u5236\u3002</li>
<li><strong>\u5168\u6808\u638C\u63A7</strong>: \u4F60\u5E0C\u671B\u524D\u540E\u7AEF\u4F7F\u7528\u540C\u4E00\u5957\u6781\u7B80\u6846\u67B6\u3002</li>
</ul>
</li>
</ul>
<p>Lupine.js \u8BC1\u660E\u4E86\u5728 2026 \u5E74\uFF0C\u6784\u5EFA\u73B0\u4EE3\u9AD8\u6027\u80FD SSR \u5E94\u7528\u5E76\u4E0D\u9700\u8981\u6C89\u91CD\u7684\u6846\u67B6\u3002\u6709\u4E9B\u65F6\u5019\uFF0C<strong>\u5C11\u5373\u662F\u591A</strong>\u3002</p>
`;var Tg=`<h3 id="\u67B6\u6784\u4E0E\u5DE5\u4F5C\u6D41-architecture-workflow"><a class="header-anchor" href="#\u67B6\u6784\u4E0E\u5DE5\u4F5C\u6D41-architecture-workflow">#</a>\u{1F3D7}\uFE0F \u67B6\u6784\u4E0E\u5DE5\u4F5C\u6D41 (Architecture &amp; Workflow)</h3><p>Lupine.js \u8FD0\u884C\u4E00\u4E2A\u5355\u4F8B\u670D\u52A1\u5668\u5B9E\u4F8B\uFF0C\u53EF\u4EE5\u540C\u65F6\u670D\u52A1\u591A\u4E2A\u57DF\u540D\u548C\u5E94\u7528\u7A0B\u5E8F\u3002</p>
<p><strong>1. \u5E94\u7528\u5B9A\u4E49 (App Definition)</strong>
\u5E94\u7528\u5728 <code>.env</code> \u6587\u4EF6\u4E2D\u901A\u8FC7 <code>APPS</code> \u53D8\u91CF\u5B9A\u4E49\uFF08\u4F8B\u5982 <code>APPS=doc,demo.app</code>\uFF09\u3002\u57DF\u540D\u6620\u5C04\u4E5F\u5728 <code>.env</code> \u4E2D\u914D\u7F6E\uFF08\u4F8B\u5982 <code>DOMAINS@demo.app=example.com</code>\uFF09\u3002</p>
<p><strong>2. \u7F16\u8BD1 (Compilation)</strong>
\u5728\u6784\u5EFA/\u5F00\u53D1\u671F\u95F4\uFF0C<code>dev-watch.js</code> \u8BFB\u53D6\u6BCF\u4E2A\u5E94\u7528\u76EE\u5F55\u4E0B\u7684 <code>lupine.json</code> \u4EE5\u627E\u5230 <code>webEntryPoints</code> \u5E76\u8FDB\u884C\u7F16\u8BD1\u3002</p>
<p><strong>3. \u8BF7\u6C42\u6D41\u7A0B (Request Flow)</strong>
\u5F53\u8BF7\u6C42\u5230\u8FBE\u65F6\uFF1A</p>
<ol>
<li><strong>\u5E94\u7528\u89E3\u6790</strong>: <code>AppHelper</code> \u6839\u636E\u8BF7\u6C42\u7684\u4E3B\u673A\u540D\u8BC6\u522B\u76EE\u6807\u5E94\u7528\u3002</li>
<li><strong>\u6A21\u5757\u52A0\u8F7D</strong>: \u52A0\u8F7D\u5BF9\u5E94\u7684 <code>ApiModule</code> (\u5728 <code>api/src/index.ts</code> \u4E2D\u5B9A\u4E49)\u3002</li>
<li><strong>\u8DEF\u7531</strong>: <code>RootApi</code> \u5C1D\u8BD5\u5339\u914D API \u8DEF\u7531\u3002\u5982\u679C\u672A\u5339\u914D\uFF0C\u5219\u56DE\u9000\u5230 <code>StaticServer</code>\u3002</li>
</ol>
<p><strong>4. \u9759\u6001\u670D\u52A1\u4E0E SSR</strong>
<code>StaticServer</code>:</p>
<ul>
<li>\u68C0\u67E5\u8BF7\u6C42\u7684\u9759\u6001\u6587\u4EF6\u662F\u5426\u5B58\u5728\u3002</li>
<li>\u5982\u679C\u672A\u627E\u5230\uFF0C\u5B83\u5C06\u89E6\u53D1 <strong>SSR</strong> (<code>serverSideRenderPage</code>)\u3002</li>
</ul>
<p>\u8FD9\u786E\u4FDD\u4E86\u4E00\u4E2A\u5355\u4E00\u5165\u53E3\u70B9\u53EF\u4EE5\u65E0\u7F1D\u5904\u7406 API\u3001\u9759\u6001\u8D44\u6E90\u548C SSR \u9875\u9762\u751F\u6210\u3002</p>
<p>\u540E\u7AEF\u670D\u52A1\u7684\u4E3B\u6A21\u5757\u3002\u6BCF\u4E00\u4E2A\u6709\u540E\u7AEF\u7684 App \u90FD\u5FC5\u987B\u5B9E\u88C5\u4E00\u4E2A <code>ApiModule</code>\u3002</p>
<pre><code class="language-typescript">import { ApiModule } from &#39;lupine.api&#39;;
import { RootApi } from &#39;./service/root-api&#39;;

export const apiModule = new ApiModule(new RootApi());
</code></pre>
<h3 id="rootapi-\u4E0E-staticserver"><a class="header-anchor" href="#rootapi-\u4E0E-staticserver">#</a>\u{1F333} RootApi \u4E0E StaticServer</h3><p><code>RootApi</code> \u662F\u5E94\u7528\u7A0B\u5E8F\u903B\u8F91\u7684\u5165\u53E3\u70B9\u3002\u5B83\u901A\u5E38\u6302\u8F7D\u7279\u5B9A\u7684 API \u4EE5\u53CA <code>StaticServer</code> \u6765\u5904\u7406\u6587\u4EF6\u8BF7\u6C42\u548C SSR \u56DE\u9000\u3002</p>
<pre><code class="language-typescript">// src/service/root-api.ts
import { IApiBase, ApiRouter, StaticServer } from &#39;lupine.api&#39;;

export class RootApi implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    this.mountRoutes();
  }

  protected mountRoutes() {
    // 1. \u6302\u8F7D\u4F60\u7684 App API
    this.router.use(&#39;/api&#39;, new Api().getRouter());

    // 2. \u6302\u8F7D\u9759\u6001\u670D\u52A1\u5668 (Static Server) (\u5904\u7406\u9759\u6001\u6587\u4EF6 + SSR)
    // \u91CD\u8981\uFF1A\u5FC5\u987B\u653E\u5728\u6700\u540E\u4EE5\u6355\u83B7\u975E API \u8BF7\u6C42
    const staticServer = new StaticServer();
    this.router.use(&#39;*&#39;, staticServer.processRequest.bind(staticServer));
  }
}
</code></pre>
<h3 id="\u5065\u5EB7\u68C0\u67E5\u793A\u4F8B-health-check"><a class="header-anchor" href="#\u5065\u5EB7\u68C0\u67E5\u793A\u4F8B-health-check">#</a>\u{1F3E5} \u5065\u5EB7\u68C0\u67E5\u793A\u4F8B (Health Check)</h3><p>\u8FD9\u662F\u4E00\u4E2A\u7B80\u5355\u7684 API \u7AEF\u70B9\u793A\u4F8B\uFF08\u4F8B\u5982\u7528\u4E8E\u5065\u5EB7\u68C0\u67E5\uFF09\u3002</p>
<pre><code class="language-typescript">// src/service/api.ts
import { IApiBase, ApiRouter, ServerRequest } from &#39;lupine.api&#39;;
import { ServerResponse } from &#39;http&#39;;

export class Api implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    this.router.use(&#39;/health-check&#39;, this.healthCheck.bind(this));
  }

  async healthCheck(req: ServerRequest, res: ServerResponse) {
    res.writeHead(200, { &#39;Content-Type&#39;: &#39;application/json&#39; });
    res.write(JSON.stringify({ status: &#39;OK&#39;, uptime: process.uptime() }));
    res.end();
    return true; // \u8FD4\u56DE true \u8868\u793A\u8BF7\u6C42\u5DF2\u88AB\u5904\u7406
  }

  public getRouter() {
    return this.router;
  }
}
</code></pre>
`;var Pg=`<h1 id="css-in-js"><a class="header-anchor" href="#css-in-js">#</a>CSS-in-JS</h1><p>Lupine.js \u5185\u7F6E\u6216\u8005\u8BF4\u81EA\u5E26\u4E86\u4E00\u4E2A\u8F7B\u91CF\u7EA7\u7684 <strong>CSS-in-JS</strong> \u5F15\u64CE\u3002\u5B83\u652F\u6301\u5D4C\u5957\u3001\u4F2A\u9009\u62E9\u5668\u3001\u5A92\u4F53\u67E5\u8BE2\u548C\u4F5C\u7528\u57DF\u52A8\u753B\u7B49\u5F3A\u5927\u529F\u80FD\uFF0C\u4E14\u65E0\u9700\u4F9D\u8D56 styled-components \u6216 emotion \u7B49\u5916\u90E8\u5E93\u3002</p>
<h2 id="1-\u57FA\u672C\u7528\u6CD5"><a class="header-anchor" href="#1-\u57FA\u672C\u7528\u6CD5">#</a>1. \u{1F423} \u57FA\u672C\u7528\u6CD5</h2><p>\u4F60\u53EF\u4EE5\u5C06 CSS \u5BF9\u8C61\u76F4\u63A5\u4F20\u7ED9\u4EFB\u4F55\u5143\u7D20\u7684 <code>css</code> \u5C5E\u6027\u3002Lupine \u4F1A\u81EA\u52A8\u751F\u6210\u4E00\u4E2A\u552F\u4E00\u7684 Class ID\uFF0C\u9632\u6B62\u6837\u5F0F\u51B2\u7A81\u3002</p>
<pre><code class="language-tsx">const MyComponent = () =&gt; {
  const css: CssProps = {
    // \u57FA\u672C\u5C5E\u6027\u4F7F\u7528\u9A7C\u5CF0\u547D\u540D
    backgroundColor: &#39;#f0f0f0&#39;,
    padding: &#39;20px&#39;,
    borderRadius: &#39;8px&#39;,

    // \u5D4C\u5957\u9009\u62E9\u5668
    h1: {
      color: &#39;blue&#39;,
    },

    // \u4F2A\u7C7B
    &#39;&amp;:hover&#39;: {
      backgroundColor: &#39;#e0e0e0&#39;,
    },
  };

  return (
    &lt;div css={css}&gt;
      &lt;h1&gt;Hello&lt;/h1&gt;
    &lt;/div&gt;
  );
};
</code></pre>
<h2 id="2-\u9AD8\u7EA7\u7279\u6027"><a class="header-anchor" href="#2-\u9AD8\u7EA7\u7279\u6027">#</a>2. \u{1F680} \u9AD8\u7EA7\u7279\u6027</h2><h3 id="2-1-\u5D4C\u5957\u4E0E\u7236\u9009\u62E9\u5668"><a class="header-anchor" href="#2-1-\u5D4C\u5957\u4E0E\u7236\u9009\u62E9\u5668">#</a>2.1 \u{1F38E} \u5D4C\u5957\u4E0E\u7236\u9009\u62E9\u5668 (<code>&amp;</code>)</h3><p>\u7C7B\u4F3C\u4E8E SCSS/Less\uFF0C\u4F7F\u7528 <code>&amp;</code> \u6765\u5F15\u7528\u7236\u9009\u62E9\u5668\u3002</p>
<pre><code class="language-tsx">const css: CssProps = {
  color: &#39;black&#39;,

  // \u76EE\u6807\u5B50\u5143\u7D20
  &#39;.child&#39;: { fontWeight: &#39;bold&#39; },

  // \u81EA\u8EAB\u72B6\u6001
  &#39;&amp;:hover&#39;: { color: &#39;red&#39; },

  // \u591A\u4E2A\u9009\u62E9\u5668
  &#39;&amp;:hover, &amp;.active&#39;: {
    border: &#39;1px solid blue&#39;,
  },
};
</code></pre>
<h3 id="2-2-\u4F7F\u7528-\u8FDB\u884C\u4F5C\u7528\u57DF\u7BA1\u7406-\u52A8\u6001\u7EC4\u4EF6-id"><a class="header-anchor" href="#2-2-\u4F7F\u7528-\u8FDB\u884C\u4F5C\u7528\u57DF\u7BA1\u7406-\u52A8\u6001\u7EC4\u4EF6-id">#</a>2.2 \u{1F6E1}\uFE0F \u4F7F\u7528 <code>&amp;</code> \u8FDB\u884C\u4F5C\u7528\u57DF\u7BA1\u7406 (\u52A8\u6001\u7EC4\u4EF6 ID)</h3><p>Lupine \u4F7F\u7528\u4E00\u79CD\u5DE7\u5999\u7684\u66FF\u6362\u7CFB\u7EDF\u6765\u5904\u7406 <code>&amp;</code> (\u6216 <code>$</code>)\u3002</p>
<ol>
<li><p><strong>\u524D\u7F00\u5316</strong>\uFF1A\u5982\u679C\u9009\u62E9\u5668\u4EE5 <code>&amp;</code> \u5F00\u5934\uFF08\u4F8B\u5982 <code>&amp;-item</code>\uFF09\uFF0C\u5B83\u4F1A\u5C06\u7EC4\u4EF6\u7684\u552F\u4E00 ID \u89C6\u4E3A\u524D\u7F00\u3002</p>
<ul>
<li><code>&amp;-item</code> -&gt; <code>.LUPINE_ID-item</code></li>
<li>\u8FD9\u5BF9\u4E8E\u7F16\u5199\u7C7B\u4F3C BEM \u547D\u540D\u89C4\u8303\u7684\u6837\u5F0F\u975E\u5E38\u6709\u7528\uFF0C\u800C\u65E0\u9700\u624B\u52A8\u7F16\u5199\u957F\u540D\u79F0\u3002</li>
</ul>
</li>
<li><p><strong>\u66FF\u6362</strong>\uFF1A\u5982\u679C <code>&amp;</code> \u5728\u5176\u4ED6\u5730\u65B9\u4F7F\u7528\uFF08\u4F8B\u5982 <code>.parent &amp;</code>\uFF09\uFF0C\u5B83\u4F1A\u5728\u8BE5\u4F4D\u7F6E\u63D2\u5165\u552F\u4E00 ID\u3002</p>
</li>
</ol>
<pre><code class="language-tsx">// \u4F7F\u7528 &quot;$-item&quot; \u6216 &quot;&amp;-item&quot; \u6A21\u5F0F\u5B9A\u4E49\u4F5C\u7528\u57DF Class
const css = {
  // \u5B9A\u4E49\u4E00\u4E2A\u4F5C\u7528\u57DF Class\uFF0C\u5982 .L123-item
  &#39;&amp;-item&#39;: {
    color: &#39;gray&#39;,
  },

  // \u4F60\u4E5F\u53EF\u4EE5\u5F15\u7528\u4E3A .&amp;-item\uFF0C\u610F\u5473\u7740 .L123 .L123-item (\u5D4C\u5957)
  &#39;.&amp;-item&#39;: {
    color: &#39;black&#39;, // \u5982\u679C\u9700\u8981\u66F4\u5F3A\u7684\u7279\u5F02\u6027
  },
};

return (
  &lt;div css={css}&gt;
    {/* \u5E94\u7528\u4F5C\u7528\u57DF Class */}
    &lt;a class=&#39;&amp;-item&#39;&gt;Link&lt;/a&gt;
  &lt;/div&gt;
);
</code></pre>
<h3 id="2-3-\u5355\u884C\u591A\u5B9A\u4E49"><a class="header-anchor" href="#2-3-\u5355\u884C\u591A\u5B9A\u4E49">#</a>2.3 \u26A1 \u5355\u884C\u591A\u5B9A\u4E49</h3><p>\u4F60\u53EF\u4EE5\u5728\u4E00\u884C\u4E2D\u5B9A\u4E49\u591A\u4E2A\u5C5E\u6027\uFF08\u9017\u53F7\u5206\u9694\u7684\u9009\u62E9\u5668\uFF09\uFF0C\u4EE5\u7B80\u5316\u8BED\u6CD5\u3002</p>
<pre><code class="language-tsx">const css = {
  // \u591A\u4E2A\u9009\u62E9\u5668\u5171\u4EAB\u6837\u5F0F
  &#39;.header, .footer&#39;: {
    background: &#39;#333&#39;,
    color: &#39;white&#39;,
  },
};
</code></pre>
<h3 id="2-4-\u5A92\u4F53\u67E5\u8BE2-media"><a class="header-anchor" href="#2-4-\u5A92\u4F53\u67E5\u8BE2-media">#</a>2.4 \u{1F4F1} \u5A92\u4F53\u67E5\u8BE2 (<code>@media</code>)</h3><p>\u5A92\u4F53\u67E5\u8BE2\u53EF\u4EE5\u5D4C\u5957\u5728\u9009\u62E9\u5668 <em>\u5185\u90E8</em> \u6216\u5728\u9876\u5C42\u4F7F\u7528\u3002</p>
<pre><code class="language-tsx">const css = {
  fontSize: &#39;16px&#39;,

  // \u5D4C\u5957\u5728\u7EC4\u4EF6\u903B\u8F91\u5185\u90E8
  &#39;@media (max-width: 600px)&#39;: {
    fontSize: &#39;14px&#39;,
    padding: &#39;10px&#39;,
  },
};
// \u6216\u8005\u4F7F\u7528\u8F85\u52A9\u5E38\u91CF\uFF0C\u5982 [MediaQueryRange.DesktopAbove]
</code></pre>
<h3 id="2-5-\u5173\u952E\u5E27\u52A8\u753B-keyframes"><a class="header-anchor" href="#2-5-\u5173\u952E\u5E27\u52A8\u753B-keyframes">#</a>2.5 \u{1F3AC} \u5173\u952E\u5E27\u52A8\u753B (<code>@keyframes</code>)</h3><p>\u5728\u7EC4\u4EF6\u5185\u5C40\u90E8\u5B9A\u4E49\u52A8\u753B\u3002</p>
<pre><code class="language-tsx">const css = {
  &#39;@keyframes slide-in&#39;: {
    &#39;0%&#39;: { transform: &#39;translateX(-100%)&#39; },
    &#39;100%&#39;: { transform: &#39;translateX(0)&#39; },
  },
  animation: &#39;slide-in 0.5s ease-out&#39;,
};
</code></pre>
<h2 id="3-\u5168\u5C40\u6837\u5F0F-bindglobalstyle"><a class="header-anchor" href="#3-\u5168\u5C40\u6837\u5F0F-bindglobalstyle">#</a>3. \u{1F30F} \u5168\u5C40\u6837\u5F0F (<code>bindGlobalStyle</code>)</h2><p>\u6709\u65F6\u4F60\u9700\u8981\u4E00\u4E9B <strong>\u53EF\u91CD\u7528</strong> \u6216 <strong>\u5168\u5C40</strong> \u7684\u6837\u5F0F\uFF0C\u4F46\u4F60\u4ECD\u7136\u5E0C\u671B\u5728 TypeScript/JS \u4E2D\u5B9A\u4E49\u5B83\u4EEC\u3002<code>bindGlobalStyle</code> \u786E\u4FDD\u6837\u5F0F\u53EA\u751F\u6210\u4E00\u6B21\u5E76\u6CE8\u5165\u5230 <code>&lt;head&gt;</code> \u4E2D\uFF0C\u5373\u4F7F\u8BE5\u7EC4\u4EF6\u88AB\u4F7F\u7528\u4E86\u591A\u6B21\u3002</p>
<blockquote>
<p><strong>\u9002\u7528\u573A\u666F\uFF1A</strong> \u52A8\u753B\u5B9A\u4E49\u3001\u5DE5\u5177\u7C7B\u3001CSS \u91CD\u7F6E\u3002</p>
</blockquote>
<pre><code class="language-tsx">import { bindGlobalStyle } from &#39;lupine.web&#39;;

const TextWave = () =&gt; {
  // 1. \u5B9A\u4E49\u6837\u5F0F
  const css = {
    &#39;@keyframes wave&#39;: {
      /* ... */
    },
    &#39;.wave-text&#39;: { animation: &#39;wave 1s infinite&#39; },
  };

  // 2. \u5C06\u5176\u5168\u5C40\u7ED1\u5B9A\uFF0C\u4F7F\u7528\u552F\u4E00\u952E &#39;text-wave-style&#39;
  // \u8FD9\u786E\u4FDD\u4E86\u5B83\u5728\u9875\u9762\u4E2D\u53EA\u88AB\u6CE8\u5165\u4E00\u6B21
  bindGlobalStyle(&#39;text-wave-style&#39;, css);

  return (
    // 3. \u4F7F\u7528\u4E0A\u9762\u5B9A\u4E49\u7684 Class
    &lt;div class=&#39;text-wave-style&#39;&gt;
      &lt;span class=&#39;wave-text&#39;&gt;Hello&lt;/span&gt;
    &lt;/div&gt;
  );
};
</code></pre>
`;var Mg=`<h1 id="dashboard"><a class="header-anchor" href="#dashboard">#</a>Dashboard</h1><p>lupine.api \u81EA\u5E26\u4E00\u4E2A\u53EF\u4EE5\u6269\u5145\u7684 dashboard\uFF0C\u7528\u4E8E\u7BA1\u7406 api \u670D\u52A1\u3002dashboard \u5DE6\u8FB9\u662F\u4F17\u591A\u7BA1\u7406\u83DC\u5355\uFF0C\u53F3\u8FB9\u662F\u591A\u9875\u9762\u7684 tab \u5185\u5BB9\u9875\u9762\u3002</p>
<h2 id="\u529F\u80FD\u7279\u6027-features"><a class="header-anchor" href="#\u529F\u80FD\u7279\u6027-features">#</a>\u529F\u80FD\u7279\u6027 (Features)</h2><p>Dashboard \u63D0\u4F9B\u4E86\u5168\u9762\u7684\u540E\u53F0\u7BA1\u7406\u529F\u80FD\uFF0C\u6309\u529F\u80FD\u6A21\u5757\u5206\u7C7B\u5982\u4E0B\uFF1A</p>
<h3 id="1-\u6570\u636E\u5E93\u7BA1\u7406-db"><a class="header-anchor" href="#1-\u6570\u636E\u5E93\u7BA1\u7406-db">#</a>1. \u6570\u636E\u5E93\u7BA1\u7406 (DB)</h3><p>\u63D0\u4F9B\u76F4\u63A5\u64CD\u4F5C\u6570\u636E\u5E93\u7684\u5DE5\u5177\uFF0C\u65B9\u4FBF\u8C03\u8BD5\u548C\u7EF4\u62A4\u3002</p>
<ul>
<li><strong>Table List (\u8868\u5217\u8868)</strong>: \u6D4F\u89C8\u6570\u636E\u5E93\u4E2D\u7684\u8868\uFF0C\u652F\u6301\u67E5\u770B\u8868\u6570\u636E\u3002</li>
<li><strong>Create Tables (\u521B\u5EFA\u8868)</strong>: \u8FD0\u884C\u9884\u8BBE\u811A\u672C\u521D\u59CB\u5316\u6216\u4FEE\u590D\u6570\u636E\u5E93\u8868\u7ED3\u6784\u3002</li>
<li><strong>Run SQL (\u8FD0\u884C SQL)</strong>: \u63D0\u4F9B\u4E00\u4E2A SQL \u6267\u884C\u7A97\u53E3\uFF0C\u53EF\u4EE5\u8FD0\u884C\u4EFB\u610F SQL \u8BED\u53E5\u5E76\u76F4\u63A5\u67E5\u770B JSON \u683C\u5F0F\u7684\u8FD4\u56DE\u7ED3\u679C\u3002</li>
</ul>
<h3 id="2-\u8FD0\u7EF4\u4E0E\u670D\u52A1\u5668\u7BA1\u7406-access-server-info"><a class="header-anchor" href="#2-\u8FD0\u7EF4\u4E0E\u670D\u52A1\u5668\u7BA1\u7406-access-server-info">#</a>2. \u8FD0\u7EF4\u4E0E\u670D\u52A1\u5668\u7BA1\u7406 (Access &amp; Server Info)</h3><p>\u6838\u5FC3\u7684\u8FD0\u7EF4\u5DE5\u5177\u96C6\uFF0C\u652F\u6301\u8FDC\u7A0B\u7BA1\u7406\u548C\u76D1\u63A7\u3002</p>
<h4 id="release-\u53D1\u5E03\u7BA1\u7406"><a class="header-anchor" href="#release-\u53D1\u5E03\u7BA1\u7406">#</a>Release (\u53D1\u5E03\u7BA1\u7406)</h4><p>\u5F3A\u5927\u7684\u53D1\u5E03\u5DE5\u5177\uFF0C\u652F\u6301\u591A\u8282\u70B9/\u591A\u73AF\u5883\u7BA1\u7406\u3002</p>
<ul>
<li><strong>\u7248\u672C\u540C\u6B65</strong>: \u652F\u6301\u5C06\u4EE3\u7801\u6216\u8D44\u6E90\u4ECE\u6E90\u73AF\u5883 (From) \u540C\u6B65\u5230\u76EE\u6807\u73AF\u5883 (To)\u3002</li>
<li><strong>\u5168\u6808\u66F4\u65B0</strong>: \u53EF\u9009\u62E9\u66F4\u65B0 Server (\u6838\u5FC3\u670D\u52A1), Api (\u4E1A\u52A1\u903B\u8F91), Env (\u73AF\u5883\u53D8\u91CF) \u7B49\u3002</li>
<li><strong>Web \u66F4\u65B0</strong>: \u652F\u6301\u6309\u5B50\u76EE\u5F55 (Web Sub-folder) \u72EC\u7ACB\u66F4\u65B0\u524D\u7AEF\u8D44\u6E90\u3002</li>
<li><strong>\u64CD\u4F5C\u63A7\u5236</strong>:<ul>
<li><strong>Check</strong>: \u68C0\u67E5\u66F4\u65B0\u72B6\u6001\u3002</li>
<li><strong>Refresh Cache</strong>: \u5237\u65B0\u670D\u52A1\u5668\u7F13\u5B58 (\u652F\u6301\u8FDC\u7A0B/\u672C\u5730)\u3002</li>
<li><strong>Restart App</strong>: \u91CD\u542F\u5E94\u7528\u7A0B\u5E8F (\u652F\u6301\u8FDC\u7A0B/\u672C\u5730)\u3002</li>
<li><strong>Run Cmd</strong>: \u76F4\u63A5\u5728\u670D\u52A1\u5668\u6267\u884C Shell \u547D\u4EE4\u3002</li>
</ul>
</li>
<li><strong>\u65E5\u5FD7</strong>: \u67E5\u770B\u548C\u4E0B\u8F7D\u53D1\u5E03\u64CD\u4F5C\u7684\u5386\u53F2\u65E5\u5FD7\u3002</li>
</ul>
<h4 id="utilities-\u5DE5\u5177"><a class="header-anchor" href="#utilities-\u5DE5\u5177">#</a>Utilities (\u5DE5\u5177)</h4><ul>
<li><strong>Tokens (\u4EE4\u724C\u7BA1\u7406)</strong>: \u7BA1\u7406 API \u8BBF\u95EE\u4EE4\u724C\u3002</li>
<li><strong>Shell (\u5728\u7EBF\u7EC8\u7AEF)</strong>: \u57FA\u4E8E WebSocket \u7684\u5728\u7EBF\u7EC8\u7AEF\uFF0C\u53EF\u5B9E\u65F6\u4E0E\u670D\u52A1\u5668\u4EA4\u4E92\uFF0C\u6267\u884C\u901A\u8FC7\u9A8C\u8BC1\u7684\u547D\u4EE4\u3002</li>
<li><strong>Resources (\u8D44\u6E90\u7BA1\u7406)</strong>: \u6D4F\u89C8\u3001\u4E0A\u4F20\u3001\u4E0B\u8F7D\u670D\u52A1\u5668\u6587\u4EF6\u7CFB\u7EDF\u4E2D\u7684\u8D44\u6E90\u6587\u4EF6\u3002</li>
<li><strong>Config (\u914D\u7F6E\u7BA1\u7406)</strong>: \u67E5\u770B\u548C\u70ED\u4FEE\u6539\u7CFB\u7EDF\u8FD0\u884C\u65F6\u914D\u7F6E\u3002</li>
<li><strong>Performance (\u6027\u80FD\u76D1\u63A7)</strong>: \u76D1\u63A7\u670D\u52A1\u5668\u7684\u5185\u5B58\u3001CPU \u7B49\u6027\u80FD\u6307\u6807\u3002</li>
</ul>
<h3 id="3-\u5F00\u53D1\u4E0E\u6D4B\u8BD5-test"><a class="header-anchor" href="#3-\u5F00\u53D1\u4E0E\u6D4B\u8BD5-test">#</a>3. \u5F00\u53D1\u4E0E\u6D4B\u8BD5 (Test)</h3><p>\u7528\u4E8E\u5F00\u53D1\u9636\u6BB5\u8C03\u8BD5\u7EC4\u4EF6\u548C UI\u3002</p>
<ul>
<li><strong>Test Themes</strong>: \u9884\u89C8\u548C\u6D4B\u8BD5\u4E0D\u540C\u7684 UI \u4E3B\u9898\u914D\u7F6E\u3002</li>
<li><strong>Test Component</strong>: \u6D4B\u8BD5\u901A\u7528 UI \u7EC4\u4EF6\u7684\u4EA4\u4E92\u548C\u6E32\u67D3\u3002</li>
<li><strong>Test Animations</strong>: \u6F14\u793A\u548C\u8C03\u8BD5 CSS/JS \u52A8\u753B\u6548\u679C\u3002</li>
<li><strong>Test Edit</strong>: \u6D4B\u8BD5\u5BCC\u6587\u672C\u7F16\u8F91\u5668\u6216\u8868\u5355\u7F16\u8F91\u529F\u80FD\u3002</li>
</ul>
<hr>
<h2 id="\u6269\u5C55\u5F00\u53D1"><a class="header-anchor" href="#\u6269\u5C55\u5F00\u53D1">#</a>\u6269\u5C55\u5F00\u53D1</h2><p>Dashboard \u662F\u9AD8\u5EA6\u53EF\u6269\u5C55\u7684\u3002\u6838\u5FC3\u903B\u8F91\u4F4D\u4E8E <code>packages/lupine.api/admin</code> \u76EE\u5F55\u4E0B\u3002</p>
<h3 id="\u83DC\u5355\u914D\u7F6E"><a class="header-anchor" href="#\u83DC\u5355\u914D\u7F6E">#</a>\u83DC\u5355\u914D\u7F6E</h3><p>\u83DC\u5355\u901A\u8FC7 <code>admin-frame-helper.tsx</code> \u4E2D\u7684 <code>adminTopMenu</code> \u6570\u7EC4\u8FDB\u884C\u914D\u7F6E\u3002\u4F60\u53EF\u4EE5\u8F7B\u677E\u6DFB\u52A0\u65B0\u7684\u83DC\u5355\u9879\uFF1A</p>
<pre><code class="language-typescript">const myMenu = {
  id: &#39;my-feature&#39;,
  text: &#39;My Feature&#39;,
  items: [
    {
      id: &#39;my-page&#39;,
      text: &#39;My Page&#39;,
      js: () =&gt; this.addPanel(&#39;My Page&#39;, &lt;MyComponent /&gt;),
    },
  ],
};
</code></pre>
<h3 id="\u9875\u9762\u5F00\u53D1"><a class="header-anchor" href="#\u9875\u9762\u5F00\u53D1">#</a>\u9875\u9762\u5F00\u53D1</h3><p>\u6BCF\u4E2A\u7BA1\u7406\u9875\u9762\u90FD\u662F\u4E00\u4E2A\u6807\u51C6\u7684 <code>lupine.components</code> \u7EC4\u4EF6\u3002\u4F7F\u7528 <code>AdminPanel</code> \u548C <code>Tabs</code> \u7EC4\u4EF6\u6765\u7BA1\u7406\u591A\u6807\u7B7E\u9875\u4F53\u9A8C\u3002</p>
`;var Lg=`<h2 id="\u56FE\u6807\u5B57\u4F53\u5B9A\u5236"><a class="header-anchor" href="#\u56FE\u6807\u5B57\u4F53\u5B9A\u5236">#</a>\u56FE\u6807\u5B57\u4F53\u5B9A\u5236</h2><p>Lupine.js \u53EF\u4EE5\u5B8C\u7F8E\u96C6\u6210\u6211\u7684\u53E6\u4E00\u4E2A\u72EC\u7ACB\u9879\u76EE <a href="https://github.com/uuware/icons-font-customization">Icons Font Customization</a> \uFF0C\u4E3A\u60A8\u63D0\u4F9B\u8D85\u8FC7 78,000 \u4E2A\u9AD8\u8D28\u91CF\u7684\u514D\u8D39\u56FE\u6807\u3002</p>
<p><a href="https://github.com/uuware/icons-font-customization">Icons Font Customization</a> \u662F\u4E00\u4E2A\u5F3A\u5927\u7684\u56FE\u6807\u96C6\u5408\u548C\u5DE5\u5177\uFF0C\u5B83\u5141\u8BB8\u60A8\uFF1A</p>
<ul>
<li><strong>\u6D77\u91CF\u8D44\u6E90</strong>\uFF1A\u8BBF\u95EE\u6765\u81EA Font Awesome, Material Design \u7B49\u591A\u8FBE 78,000+ \u4E2A\u56FE\u6807\u3002</li>
<li><strong>\u81EA\u7531\u5B9A\u5236</strong>\uFF1A\u60A8\u53EF\u4EE5\u6DF7\u5408\u4F7F\u7528\u4E0D\u540C\u6765\u6E90\u7684\u56FE\u6807\uFF0C\u53EA\u9009\u62E9\u60A8\u771F\u6B63\u9700\u8981\u7684\u56FE\u6807\uFF0C\u4ECE\u800C\u6781\u5927\u51CF\u5C0F\u5B57\u4F53\u6587\u4EF6\u7684\u5927\u5C0F\u3002</li>
<li><strong>\u81EA\u5B9A\u4E49\u6837\u5F0F</strong>\uFF1A\u652F\u6301\u5728\u751F\u6210\u524D\u8C03\u6574\u56FE\u6807\u7684\u989C\u8272\u3001\u80CC\u666F\u548C\u5927\u5C0F\u3002</li>
<li><strong>\u81EA\u52A8\u5316\u751F\u6210</strong>\uFF1A\u4E00\u952E\u751F\u6210\u5B57\u4F53\u6587\u4EF6\uFF08woff2, woff, ttf\uFF09\u548C\u914D\u5957\u7684 CSS/HTML\u3002</li>
</ul>
<p>\u8BF7\u8BBF\u95EE\u9879\u76EE\u67E5\u770B\u6587\u6863\u548C\u6240\u6709\u56FE\u6807\uFF1A<a href="https://github.com/uuware/icons-font-customization">Icons Font Customization</a>\u3002</p>
`;var Eg="";var Ag=`<h1 id="\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3\u4E0E\u7F16\u8F91"><a class="header-anchor" href="#\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3\u4E0E\u7F16\u8F91">#</a>\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3\u4E0E\u7F16\u8F91</h1><p>Lupine.js \u91C7\u7528\u4E86\u4E00\u79CD\u72EC\u7279\u7684 <strong>&quot;\u7EC4\u4EF6\u7EA7\u6E32\u67D3 (Component-Level Rendering)&quot;</strong> \u7B56\u7565\uFF0C\u8FD9\u4E0E React \u6216 Vue \u7B49\u4F20\u7EDF\u7684\u865A\u62DF DOM \u6846\u67B6\u6709\u663E\u8457\u4E0D\u540C\u3002\u8FD9\u79CD\u65B9\u6CD5\u5728\u5904\u7406\u5927\u578B\u5217\u8868\u548C\u590D\u6742\u6570\u636E\u8868\u683C\uFF08\u4F8B\u5982\u7BA1\u7406\u540E\u53F0 Admin Panel\uFF09\u65F6\u7279\u522B\u5F3A\u5927\u3002</p>
<h2 id="1-\u4E3A\u4EC0\u4E48\u5B83\u5F88\u5FEB"><a class="header-anchor" href="#1-\u4E3A\u4EC0\u4E48\u5B83\u5F88\u5FEB">#</a>1. \u26A1 \u4E3A\u4EC0\u4E48\u5B83\u5F88\u5FEB\uFF1F</h2><p>\u5728\u4F20\u7EDF\u6846\u67B6\uFF08\u5982 React\uFF09\u4E2D\uFF0C\u5F53\u4F60\u66F4\u65B0\u5217\u8868\u4E2D\u7684\u67D0\u4E00\u9879\u65F6\uFF1A</p>
<ol>
<li>\u4F60\u8C03\u7528 <code>setState</code>\u3002</li>
<li>\u6846\u67B6\u91CD\u65B0\u6E32\u67D3 <strong>\u6574\u4E2A\u5217\u8868\u7EC4\u4EF6 (List Component)</strong>\u3002</li>
<li>\u5B83\u8FD0\u884C\u201CDiff \u7B97\u6CD5\u201D\uFF0C\u5C06\u5305\u542B 100 \u591A\u4E2A\u9879\u76EE\u7684\u65B0\u865A\u62DF\u6811\u4E0E\u65E7\u6811\u8FDB\u884C\u5BF9\u6BD4\u3002</li>
<li>\u6700\u540E\uFF0C\u5B83\u66F4\u65B0\u90A3\u4E00\u4E2A\u53D1\u751F\u53D8\u5316\u7684 DOM \u5143\u7D20\u3002</li>
</ol>
<p><strong>\u5728 Lupine.js \u4E2D\uFF0C\u6211\u4EEC\u5B8C\u5168\u8DF3\u8FC7\u4E86\u7B2C 2 \u6B65\u548C\u7B2C 3 \u6B65\u3002</strong></p>
<p>\u56E0\u4E3A Lupine \u4F7F\u7528 <strong>\u624B\u52A8\u54CD\u5E94\u5F0F (HtmlVar<a href="javascript:lpPressLoad('/zh/lupine.components/html-var')">\u{1F517}</a>)</strong>\uFF0C\u4F60\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC7 <code>dom.value = &lt;&gt;...&lt;/&gt;</code> \u6765\u66F4\u65B0\u7279\u5B9A\u7684 DOM \u5143\u7D20\uFF0C\u800C\u65E0\u9700\u89E6\u53D1\u81EA\u4E0A\u800C\u4E0B\u7684\u91CD\u6E32\u67D3\u3002\u8FD9\u7C7B\u4F3C\u4E8E\u5728 React \u4E2D\u4F7F\u7528\u6781\u5176\u4F18\u5316\u7684 <code>React.memo</code> \u7EC4\u4EF6\uFF0C\u4F46\u5728 Lupine.js \u4E2D\uFF0C\u8FD9\u662F <strong>\u9ED8\u8BA4\u884C\u4E3A</strong>\uFF0C\u800C\u975E\u4E00\u79CD\u53EF\u9009\u7684\u4F18\u5316\u624B\u6BB5\u3002</p>
<h2 id="2-\u70B9\u5BF9\u70B9\u66F4\u65B0-spot-update-\u7B56\u7565"><a class="header-anchor" href="#2-\u70B9\u5BF9\u70B9\u66F4\u65B0-spot-update-\u7B56\u7565">#</a>2. \u{1F3AF} &quot;\u70B9\u5BF9\u70B9\u66F4\u65B0 (Spot-Update)&quot; \u7B56\u7565</h2><p>\u5217\u8868\u4E2D\u7684\u6BCF\u4E00\u884C\u90FD\u5145\u5F53\u4E00\u4E2A\u5B64\u5C9B\u3002\u5B83\u62E5\u6709\u81EA\u5DF1\u7684 <code>HtmlVar</code> \u548C <code>ref</code>\u3002\u5F53\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F60\u53EA\u9700\u5728\u8BE5\u7279\u5B9A\u884C\u7684\u53D8\u91CF\u4E0A\u8C03\u7528 <code>.value = ...</code>\u3002\u9875\u9762\u7684\u5176\u4F59\u90E8\u5206\u4FDD\u6301\u4E3A\u9759\u6001\u7684 HTML \u5B57\u7B26\u4E32\uFF0C\u7EF4\u62A4\u6210\u672C\u4E3A <strong>\u96F6</strong>\u3002</p>
<h3 id="\u4F18\u52BF"><a class="header-anchor" href="#\u4F18\u52BF">#</a>\u4F18\u52BF</h3><ul>
<li><strong>\u96F6 Diff \u6210\u672C</strong>\uFF1A\u6539\u53D8\u4E00\u884C\u7684\u5F00\u9500\u662F <code>O(1)</code>\uFF0C\u800C\u4E0D\u662F <code>O(N)</code>\uFF08N \u4E3A\u5217\u8868\u5927\u5C0F\uFF09\u3002</li>
<li><strong>\u53EF\u9884\u6D4B\u7684\u6027\u80FD</strong>\uFF1A\u6CA1\u6709\u201C\u6D6A\u8D39\u7684\u6E32\u67D3 (wasted renders)\u201D\u3002</li>
<li><strong>\u4F4E\u5185\u5B58\u5360\u7528</strong>\uFF1A\u6211\u4EEC\u4E0D\u9700\u8981\u4E3A\u5217\u8868\u7684\u9759\u6001\u90E8\u5206\u5728\u5185\u5B58\u4E2D\u7EF4\u62A4\u4E00\u68F5\u6C89\u91CD\u7684\u865A\u62DF DOM \u6811\u3002</li>
</ul>
<hr>
<h2 id="3-\u4EE3\u7801\u793A\u4F8B-\u53EF\u7F16\u8F91\u5217\u8868"><a class="header-anchor" href="#3-\u4EE3\u7801\u793A\u4F8B-\u53EF\u7F16\u8F91\u5217\u8868">#</a>3. \u{1F4BB} \u4EE3\u7801\u793A\u4F8B\uFF1A\u53EF\u7F16\u8F91\u5217\u8868</h2><p>\u4E0B\u9762\u5C55\u793A\u4E86\u5982\u4F55\u5B9E\u73B0\u4E00\u4E2A\u9AD8\u6027\u80FD\u7684\u53EF\u7F16\u8F91\u5217\u8868\u3002</p>
<h3 id="\u7B2C\u4E00\u6B65-\u5217\u8868\u5BB9\u5668-\u7236\u7EC4\u4EF6"><a class="header-anchor" href="#\u7B2C\u4E00\u6B65-\u5217\u8868\u5BB9\u5668-\u7236\u7EC4\u4EF6">#</a>\u{1F4E6} \u7B2C\u4E00\u6B65\uFF1A\u5217\u8868\u5BB9\u5668\uFF08\u7236\u7EC4\u4EF6\uFF09</h3><p>\u7236\u7EC4\u4EF6\u8D1F\u8D23\u521D\u59CB\u5316\u6E32\u67D3\u5217\u8868\uFF0C\u4F46\u5F53\u5B50\u9879\u53D1\u751F\u53D8\u5316\u65F6\uFF0C<strong>\u4E0D\u9700\u8981</strong>\u91CD\u65B0\u6E32\u67D3\u3002</p>
<pre><code class="language-tsx">// BookList.tsx
export const BookList = () =&gt; {
  // 1. \u521D\u59CB\u6570\u636E\u52A0\u8F7D
  let items = getSampleData();

  // 2. \u6E32\u67D3\u9759\u6001\u5217\u8868
  // \u6CE8\u610F\uFF1A\u5982\u679C\u6211\u4EEC\u53EA\u662F\u7F16\u8F91\u9879\u76EE\uFF0C\u6211\u4EEC\u4E0D\u9700\u8981\u4E3A\u6574\u4E2A\u5217\u8868\u7EF4\u62A4 State\uFF01
  return (
    &lt;div class=&#39;list&#39;&gt;
      {items.map((item) =&gt; (
        &lt;BookShowItem key={item.id} item={item} /&gt;
      ))}
    &lt;/div&gt;
  );
};
</code></pre>
<h3 id="\u7B2C\u4E8C\u6B65-\u4F18\u5316\u540E\u7684\u884C-\u5B50\u7EC4\u4EF6"><a class="header-anchor" href="#\u7B2C\u4E8C\u6B65-\u4F18\u5316\u540E\u7684\u884C-\u5B50\u7EC4\u4EF6">#</a>\u26A1 \u7B2C\u4E8C\u6B65\uFF1A\u4F18\u5316\u540E\u7684\u884C\uFF08\u5B50\u7EC4\u4EF6\uFF09</h3><p>\u5B50\u7EC4\u4EF6\u5C06\u5185\u5BB9\u5305\u88F9\u5728 <code>HtmlVar</code> \u4E2D\u3002\u8FD9\u5141\u8BB8\u5B83\u72EC\u7ACB\u5730\u201C\u91CD\u7ED8\u201D\u81EA\u5DF1\u3002</p>
<pre><code class="language-tsx">// BookShowItem.tsx
import { HtmlVar, RefProps } from &#39;lupine.components&#39;;

export const BookShowItem = (props: { item: SampleDataProps }) =&gt; {
  const ref: RefProps = { id: &#39;&#39; };

  // 1. \u5B9A\u4E49\u5185\u90E8\u6E32\u67D3\u903B\u8F91
  const makeDom = (item: SampleDataProps) =&gt; (
    &lt;div class=&#39;row-box&#39;&gt;
      &lt;div&gt;Name: {item.name}&lt;/div&gt;
      &lt;button onClick={onEdit}&gt;\u7F16\u8F91&lt;/button&gt;
    &lt;/div&gt;
  );

  // 2. \u4E3A\u8FD9\u4E00\u884C\u521B\u5EFA\u4E00\u4E2A &quot;\u54CD\u5E94\u5F0F\u76D2\u5B50 (Reactive Box)&quot;
  const dom = new HtmlVar(makeDom(props.item));

  // 3. \u66F4\u65B0\u903B\u8F91\uFF1A\u53EA\u66F4\u65B0\u8FD9\u4E00\u4E2A DOM\uFF01
  const update = (newItem: SampleDataProps) =&gt; {
    // \u624B\u52A8\u89E6\u53D1\u4EC5\u9488\u5BF9\u6B64\u884C\u7684\u66F4\u65B0
    dom.value = makeDom(newItem);
  };

  const onEdit = () =&gt; {
    // \u663E\u793A\u6A21\u6001\u6846\uFF0C\u83B7\u53D6\u65B0\u6570\u636E\uFF0C\u7136\u540E\u8C03\u7528 update(newItem)
    showEditModal(props.item, (newItem) =&gt; {
      update(newItem);
    });
  };

  return (
    &lt;div ref={ref} class=&#39;sample-data-row&#39;&gt;
      {dom.node} {/* \u4F7F\u7528 dom.node \u5D4C\u5165\u54CD\u5E94\u5F0F\u63D2\u69FD */}
    &lt;/div&gt;
  );
};
</code></pre>
<h3 id="\u7B2C\u4E09\u6B65-\u884C\u5185\u7F16\u8F91-\u8FDB\u9636"><a class="header-anchor" href="#\u7B2C\u4E09\u6B65-\u884C\u5185\u7F16\u8F91-\u8FDB\u9636">#</a>\u270F\uFE0F \u7B2C\u4E09\u6B65\uFF1A\u884C\u5185\u7F16\u8F91\uFF08\u8FDB\u9636\uFF09</h3><p>\u4F60\u751A\u81F3\u53EF\u4EE5\u5B8C\u5168\u4E3A\u5355\u884C\u5207\u6362\u201C\u67E5\u770B\u6A21\u5F0F\u201D\u4E0E\u201C\u7F16\u8F91\u6A21\u5F0F\u201D\uFF0C\u800C\u4E0D\u5F71\u54CD\u5176\u4ED6\u884C\u3002</p>
<pre><code class="language-tsx">// BookShowItem \u5185\u90E8
const onToggleEdit = () =&gt; {
  if (isEditing) {
    dom.value = makeViewMode(item);
  } else {
    dom.value = makeEditMode(item);
  }
  isEditing = !isEditing;
};
</code></pre>
<h2 id="\u603B\u7ED3"><a class="header-anchor" href="#\u603B\u7ED3">#</a>\u603B\u7ED3</h2><p>\u867D\u7136\u8FD9\u79CD\u65B9\u6CD5\u9700\u8981\u7F16\u5199\u7A0D\u5FAE\u591A\u4E00\u70B9\u7684\u201C\u663E\u5F0F\u201D\u4EE3\u7801\uFF08\u5B9A\u4E49 <code>HtmlVar</code> \u548C <code>makeDom</code>\uFF09\uFF0C\u4F46\u5B83\u4E3A\u4F60\u63D0\u4F9B\u4E86\u5728\u91CD\u6570\u636E\u5E94\u7528\u4E2D\u96BE\u4EE5\u5339\u654C\u7684 <strong>\u63A7\u5236\u529B</strong> \u548C <strong>\u9AD8\u6027\u80FD</strong>\u3002\u5B9E\u9645\u4E0A\uFF0C\u4F60\u5C31\u50CF\u662F\u81EA\u5DF1\u7684\u201C\u7F16\u8BD1\u5668\u201D\uFF0C\u7CBE\u786E\u5730\u544A\u8BC9\u6D4F\u89C8\u5668\u5728\u4F55\u65F6\u66F4\u65B0\u4EC0\u4E48\u5185\u5BB9\u3002</p>
`;var Rg=`<h1 id="\u79FB\u52A8\u7AEF\u548C\u684C\u9762\u7AEF\u9002\u914D-mobile-desktop"><a class="header-anchor" href="#\u79FB\u52A8\u7AEF\u548C\u684C\u9762\u7AEF\u9002\u914D-mobile-desktop">#</a>\u79FB\u52A8\u7AEF\u548C\u684C\u9762\u7AEF\u9002\u914D (Mobile &amp; Desktop)</h1><p>Lupine.js \u7684\u6838\u5FC3\u8BBE\u8BA1\u7406\u5FF5\u4E4B\u4E00\u662F\u201C\u4E00\u5957\u4EE3\u7801\uFF0C\u591A\u7AEF\u8FD0\u884C\u201D\u3002\u901A\u8FC7\u5185\u7F6E\u7684\u54CD\u5E94\u5F0F\u8BBE\u8BA1\u5DE5\u5177\u548C\u7EC4\u4EF6\uFF0C\u4F60\u53EF\u4EE5\u8F7B\u677E\u6784\u5EFA\u540C\u65F6\u9002\u5E94 Web\u3001\u79FB\u52A8\u7AEF\uFF08iOS/Android\uFF09\u548C\u684C\u9762\u7AEF\uFF08Electron\uFF09\u7684\u5E94\u7528\u7A0B\u5E8F\u3002</p>
<h2 id="1-\u54CD\u5E94\u5F0F\u5E03\u5C40-media-query"><a class="header-anchor" href="#1-\u54CD\u5E94\u5F0F\u5E03\u5C40-media-query">#</a>1. \u54CD\u5E94\u5F0F\u5E03\u5C40 (Media Query)</h2><p><code>lupine.components</code> \u63D0\u4F9B\u4E86\u5F3A\u5927\u7684\u5A92\u4F53\u67E5\u8BE2\u5DE5\u5177\uFF0C\u5E2E\u52A9\u4F60\u6839\u636E\u5C4F\u5E55\u5BBD\u5EA6\u8C03\u6574\u5E03\u5C40\u3002</p>
<h3 id="\u65AD\u70B9\u5B9A\u4E49-breakpoints"><a class="header-anchor" href="#\u65AD\u70B9\u5B9A\u4E49-breakpoints">#</a>\u65AD\u70B9\u5B9A\u4E49 (Breakpoints)</h3><p>\u7CFB\u7EDF\u9884\u5B9A\u4E49\u4E86\u4EE5\u4E0B\u65AD\u70B9\uFF08\u53EF\u5728 <code>MediaQueryMaxWidth</code> \u4E2D\u81EA\u5B9A\u4E49\uFF09\uFF1A</p>
<ul>
<li><strong>ExtraSmall</strong>: &lt; 480px</li>
<li><strong>Mobile</strong>: &lt; 767px (Grid: col-1)</li>
<li><strong>Tablet</strong>: &lt; 991px (Grid: col-1-md)</li>
<li><strong>Desktop</strong>: &lt; 1399px (Grid: col-1-lg)</li>
</ul>
<h3 id="\u5728-css-in-js-\u4E2D\u4F7F\u7528"><a class="header-anchor" href="#\u5728-css-in-js-\u4E2D\u4F7F\u7528">#</a>\u5728 CSS-in-JS \u4E2D\u4F7F\u7528</h3><p>\u4F60\u53EF\u4EE5\u4F7F\u7528 <code>MediaQueryRange</code> \u8F7B\u677E\u7F16\u5199\u54CD\u5E94\u5F0F\u6837\u5F0F\uFF1A</p>
<pre><code class="language-tsx">import { MediaQueryRange, MediaQueryMaxWidth } from &#39;lupine.components&#39;;

const css: CssProps = {
  width: &#39;100%&#39;,
  // \u9ED8\u8BA4\u684C\u9762\u7AEF\u6837\u5F0F
  maxWidth: MediaQueryMaxWidth.DesktopMax,

  // \u9488\u5BF9\u8D85\u5C0F\u5C4F\u5E55\uFF08\u624B\u673A\u7AD6\u5C4F\uFF09\u7684\u8C03\u6574
  [MediaQueryRange.ExtraSmallBelow]: {
    padding: &#39;10px&#39;,
    fontSize: &#39;14px&#39;,
  },

  // \u9488\u5BF9\u5E73\u677F\u53CA\u4EE5\u4E0B
  [MediaQueryRange.TabletBelow]: {
    flexDirection: &#39;column&#39;,
  },
};
</code></pre>
<h2 id="2-\u81EA\u9002\u5E94\u6846\u67B6-adaptive-frames"><a class="header-anchor" href="#2-\u81EA\u9002\u5E94\u6846\u67B6-adaptive-frames">#</a>2. \u81EA\u9002\u5E94\u6846\u67B6 (Adaptive Frames)</h2><p>Lupine \u63D0\u4F9B\u4E86\u4E13\u95E8\u7528\u4E8E\u6784\u5EFA\u54CD\u5E94\u5F0F\u5E94\u7528\u7684\u6846\u67B6\u7EC4\u4EF6\u3002</p>
<h3 id="responsiveframe"><a class="header-anchor" href="#responsiveframe">#</a>ResponsiveFrame</h3><p><code>ResponsiveFrame</code> \u662F\u5904\u7406\u6DF7\u5408\u5E03\u5C40\u7684\u7EC8\u6781\u89E3\u51B3\u65B9\u6848\u3002\u5B83\u80FD\u81EA\u52A8\u6839\u636E\u8BBE\u5907\u7C7B\u578B\u5207\u6362 UI \u7ED3\u6784\uFF1A</p>
<ul>
<li><strong>\u684C\u9762\u7AEF</strong>: \u663E\u793A\u9876\u90E8\u83DC\u5355 (<code>DesktopHeader</code>)\u3001\u5E95\u90E8\u9875\u811A (<code>DesktopFooter</code>) \u548C\u4FA7\u8FB9\u680F\u3002</li>
<li><strong>\u79FB\u52A8\u7AEF</strong>: \u81EA\u52A8\u5207\u6362\u4E3A\u79FB\u52A8\u7AEF\u5E03\u5C40\uFF0C\u9690\u85CF\u684C\u9762\u7AEF\u7279\u6709\u5143\u7D20\uFF0C\u542F\u7528\u79FB\u52A8\u7AEF\u7279\u5B9A\u7684\u5BFC\u822A (<code>MobileBottomMenu</code>)\u3002</li>
</ul>
<pre><code class="language-tsx">&lt;ResponsiveFrame
  desktopHeaderTitle=&quot;\u6211\u7684\u5E94\u7528&quot;
  desktopTopMenu={[...]}
  mobileBottomMenu={[...]}
  mainContent={&lt;MyPageContent /&gt;}
/&gt;
</code></pre>
<h3 id="sliderframe"><a class="header-anchor" href="#sliderframe">#</a>SliderFrame</h3><p><code>SliderFrame</code> \u5B9E\u73B0\u4E86\u79FB\u52A8\u7AEF\u5E38\u89C1\u7684\u201C\u4FA7\u6ED1\u201D\u4EA4\u4E92\u4F53\u9A8C\u3002\u5B83\u901A\u5E38\u7528\u4E8E\u4ECE\u53F3\u4FA7\u6ED1\u51FA\u8BE6\u7EC6\u9875\u9762\uFF0C\u6216\u4ECE\u5E95\u90E8\u6ED1\u51FA\u83DC\u5355\u3002</p>
<ul>
<li>\u652F\u6301 <code>Right-to-Left</code> (\u53F3\u6ED1\u5165) \u548C <code>Bottom-to-Top</code> (\u4E0A\u6ED1\u5165) \u52A8\u753B\u3002</li>
<li>\u5728\u684C\u9762\u7AEF\u53EF\u914D\u7F6E\u4E3A\u4FA7\u8FB9\u680F\u5F39\u51FA\u6A21\u5F0F\u3002</li>
</ul>
<h2 id="3-\u79FB\u52A8\u7AEF\u5BFC\u822A\u4E0E\u4EA4\u4E92"><a class="header-anchor" href="#3-\u79FB\u52A8\u7AEF\u5BFC\u822A\u4E0E\u4EA4\u4E92">#</a>3. \u79FB\u52A8\u7AEF\u5BFC\u822A\u4E0E\u4EA4\u4E92</h2><h3 id="\u5168\u5C40\u8FD4\u56DE\u952E\u5904\u7406-backactionhelper"><a class="header-anchor" href="#\u5168\u5C40\u8FD4\u56DE\u952E\u5904\u7406-backactionhelper">#</a>\u5168\u5C40\u8FD4\u56DE\u952E\u5904\u7406 (BackActionHelper)</h3><p>\u5728\u79FB\u52A8\u5E94\u7528\uFF08\u7279\u522B\u662F Android\uFF09\u4E2D\uFF0C\u5904\u7406\u7269\u7406\u8FD4\u56DE\u952E\u81F3\u5173\u91CD\u8981\u3002<code>BackActionHelper</code> \u63D0\u4F9B\u4E86\u4E00\u4E2A\u5168\u5C40\u961F\u5217\u6765\u7BA1\u7406\u8FD4\u56DE\u884C\u4E3A\uFF0C\u786E\u4FDD\u7528\u6237\u4F53\u9A8C\u6D41\u7545\u3002</p>
<p><strong>\u4F7F\u7528\u793A\u4F8B</strong>:</p>
<pre><code class="language-typescript">import { backActionHelper } from &#39;lupine.components&#39;;

// \u76D1\u542C\u786C\u4EF6\u8FD4\u56DE\u952E\uFF08\u901A\u5E38\u5728 index.ts \u6216 app-listeners.ts \u4E2D\uFF09
App.addListener(&#39;backButton&#39;, async () =&gt; {
  // \u5982\u679C helper \u5904\u7406\u4E86\u8FD4\u56DE\u52A8\u4F5C\uFF08\u4F8B\u5982\u5173\u95ED\u4E86\u4E00\u4E2A\u5F39\u7A97\uFF09\uFF0C\u5219\u505C\u6B62
  if (await backActionHelper.processBackAction()) {
    return;
  }
  // \u5426\u5219\u6267\u884C\u9000\u51FA\u5E94\u7528\u6216\u5176\u4ED6\u903B\u8F91
});
</code></pre>
<h3 id="actionsheet-\u52A8\u4F5C\u9762\u677F"><a class="header-anchor" href="#actionsheet-\u52A8\u4F5C\u9762\u677F">#</a>ActionSheet (\u52A8\u4F5C\u9762\u677F)</h3><p><code>ActionSheet</code> \u662F\u79FB\u52A8\u7AEF\u975E\u5E38\u5E38\u7528\u7684\u5E95\u90E8\u5F39\u7A97\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u9009\u9879\u9009\u62E9\u3001\u4FE1\u606F\u63D0\u793A\u6216\u7B80\u5355\u7684\u8F93\u5165\u3002</p>
<ul>
<li><strong>ActionSheetSelect</strong>: \u5E95\u90E8\u9009\u9879\u83DC\u5355\u3002</li>
<li><strong>ActionSheetInput</strong>: \u5E95\u90E8\u8F93\u5165\u6846\u3002</li>
<li><strong>ActionSheetMessage</strong>: \u5E95\u90E8\u6D88\u606F\u63D0\u793A\u3002</li>
</ul>
<pre><code class="language-tsx">import { ActionSheetSelectPromise } from &#39;lupine.components&#39;;

const handleSelect = async () =&gt; {
  const index = await ActionSheetSelectPromise({
    title: &#39;\u8BF7\u9009\u62E9\u64CD\u4F5C&#39;,
    options: [&#39;\u7F16\u8F91&#39;, &#39;\u5220\u9664&#39;, &#39;\u5206\u4EAB&#39;],
    cancelButtonText: &#39;\u53D6\u6D88&#39;,
  });

  if (index === 0) {
    // \u7F16\u8F91\u903B\u8F91
  }
};
</code></pre>
<h3 id="mobileheader-\u79FB\u52A8\u7AEF\u6807\u9898\u680F"><a class="header-anchor" href="#mobileheader-\u79FB\u52A8\u7AEF\u6807\u9898\u680F">#</a>MobileHeader (\u79FB\u52A8\u7AEF\u6807\u9898\u680F)</h3><p><code>MobileHeaderComponent</code> \u63D0\u4F9B\u4E86\u7075\u6D3B\u7684\u5934\u90E8\u5B9A\u5236\u529F\u80FD\u3002\u4F60\u53EF\u4EE5\u968F\u65F6\u901A\u8FC7 <code>MobileHeaderHelper</code> \u6216\u8F85\u52A9\u7EC4\u4EF6\u66F4\u65B0\u6807\u9898\u680F\u7684\u5DE6\u3001\u4E2D\u3001\u53F3\u533A\u57DF\u3002</p>
<pre><code class="language-tsx">// \u5728\u9875\u9762\u7EC4\u4EF6\u4E2D\u52A8\u6001\u66F4\u65B0 Header
&lt;MobileHeaderCenter&gt;
  &lt;MobileHeaderTitleIcon title=&#39;\u7528\u6237\u8BBE\u7F6E&#39; left={&lt;BackIcon /&gt;} right={&lt;SaveIcon /&gt;} /&gt;
&lt;/MobileHeaderCenter&gt;
</code></pre>
<h3 id="slidetabcomponent-\u6ED1\u52A8\u6807\u7B7E\u9875"><a class="header-anchor" href="#slidetabcomponent-\u6ED1\u52A8\u6807\u7B7E\u9875">#</a>SlideTabComponent (\u6ED1\u52A8\u6807\u7B7E\u9875)</h3><p>\u652F\u6301\u624B\u52BF\u5DE6\u53F3\u6ED1\u52A8\u7684 Tab \u5207\u6362\u7EC4\u4EF6\uFF0C\u63D0\u4F9B\u63A5\u8FD1\u539F\u751F\u5E94\u7528\u7684\u6D41\u7545\u4F53\u9A8C\u3002</p>
<pre><code class="language-tsx">&lt;SlideTabComponent
  pages={[
    { title: &#39;\u70ED\u95E8&#39;, content: &lt;HotList /&gt; },
    { title: &#39;\u6700\u65B0&#39;, content: &lt;NewList /&gt; },
  ]}
/&gt;

## 4. \u79FB\u52A8\u7AEF\u53D1\u5E03 (Mobile Deployment)

Lupine.js \u63A8\u8350\u4F7F\u7528 **Capacitor** \u5C06 Web \u5E94\u7528\u6253\u5305\u4E3A\u539F\u751F\u79FB\u52A8\u5E94\u7528\u3002

### \u79FB\u52A8\u7AEF\u914D\u7F6E

\u7531\u4E8E\u79FB\u52A8\u7AEF\u5E94\u7528\u901A\u5E38\u662F\u4F5C\u4E3A\u72EC\u7ACB\u6587\u4EF6\u8FD0\u884C\uFF08\`file://\` \u534F\u8BAE\uFF09\uFF0CAPI \u8BF7\u6C42\u4E0D\u80FD\u50CF Web \u90A3\u6837\u4F7F\u7528\u76F8\u5BF9\u8DEF\u5F84\u3002\u4F60\u9700\u8981\u914D\u7F6E \`.env.mobile\` \u6765\u6307\u5B9A\u7EDD\u5BF9 API \u5730\u5740\u3002

**\u6784\u5EFA\u547D\u4EE4**:
\`\`\`bash
# \u4F7F\u7528 .env.mobile \u914D\u7F6E\u8FDB\u884C\u6784\u5EFA
npm run build-mobile
</code></pre>
<p>\u6B64\u547D\u4EE4\u5BF9\u5E94 <code>package.json</code> \u4E2D\u7684\u811A\u672C\uFF1A
<code>node ./dev/dev-watch --env=.env.mobile --dev=0 --mobile=1</code></p>
<h3 id="\u6761\u4EF6\u7F16\u8BD1-conditional-compilation"><a class="header-anchor" href="#\u6761\u4EF6\u7F16\u8BD1-conditional-compilation">#</a>\u6761\u4EF6\u7F16\u8BD1 (Conditional Compilation)</h3><p>Lupine \u63D0\u4F9B\u4E86 <code>pluginIfelse</code> \u63D2\u4EF6\uFF0C\u5141\u8BB8\u4F60\u7F16\u5199\u9488\u5BF9\u7279\u5B9A\u5E73\u53F0\u7684\u903B\u8F91\u4EE3\u7801\u3002\u8FD9\u5BF9\u4E8E\u5904\u7406\u79FB\u52A8\u7AEF\u7279\u6709\u7684 API \u7AEF\u70B9\u6216\u903B\u8F91\u975E\u5E38\u6709\u7528\u3002</p>
<p><strong>\u4F7F\u7528\u793A\u4F8B</strong>:</p>
<pre><code class="language-javascript">// #if MOBILE
const apiBase = &#39;https://api.myapp.com&#39;;
// #else
const apiBase = &#39;/api&#39;;
// #endif

// #if DEV
console.log(&#39;Debug mode&#39;);
// #endif
</code></pre>
<blockquote>
<p>\u53EA\u6709\u6EE1\u8DB3\u6761\u4EF6\u7684\u4EE3\u7801\u5757\u4F1A\u88AB\u7F16\u8BD1\u5230\u6700\u7EC8\u4EA7\u7269\u4E2D\uFF0C\u4ECE\u800C\u51CF\u5C0F\u5305\u4F53\u79EF\u5E76\u907F\u514D\u8FD0\u884C\u65F6\u9519\u8BEF\u3002</p>
</blockquote>
<h3 id="\u6DFB\u52A0-ios-\u548C-android"><a class="header-anchor" href="#\u6DFB\u52A0-ios-\u548C-android">#</a>\u6DFB\u52A0 iOS \u548C Android</h3><p>\u8BF7\u53C2\u8003 Capacitor \u5B98\u65B9\u6587\u6863\u4E86\u89E3\u8BE6\u7EC6\u7684\u6DFB\u52A0\u5E73\u53F0\u6B65\u9AA4\uFF1A
<a href="https://capacitorjs.com/docs/getting-started">https://capacitorjs.com/docs/getting-started</a></p>
<h2 id="5-\u684C\u9762\u7AEF\u53D1\u5E03-desktop-deployment"><a class="header-anchor" href="#5-\u684C\u9762\u7AEF\u53D1\u5E03-desktop-deployment">#</a>5. \u684C\u9762\u7AEF\u53D1\u5E03 (Desktop Deployment)</h2><p>Lupine.js \u4F7F\u7528 <strong>Electron</strong> \u6765\u6784\u5EFA\u8DE8\u5E73\u53F0\u684C\u9762\u5E94\u7528\u3002</p>
<h3 id="\u684C\u9762\u7AEF\u7ED3\u6784"><a class="header-anchor" href="#\u684C\u9762\u7AEF\u7ED3\u6784">#</a>\u684C\u9762\u7AEF\u7ED3\u6784</h3><p>\u5F53\u4F60\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684 Lupine \u9879\u76EE\u65F6\uFF0C\u5B83\u4F1A\u81EA\u52A8\u5305\u542B\u4E00\u4E2A <code>electron</code> \u76EE\u5F55\uFF08\u4F8B\u5982 <code>apps/your-app/electron</code>\uFF09\uFF0C\u5176\u4E2D\u5305\u542B\u4E86\u684C\u9762\u7AEF\u6240\u9700\u7684\u4E3B\u8FDB\u7A0B\u4EE3\u7801\u548C\u8D44\u6E90\u3002</p>
<ul>
<li>\u60A8\u7684 Web \u4EE3\u7801\u76F4\u63A5\u4F5C\u4E3A Electron \u7684\u6E32\u67D3\u8FDB\u7A0B\u8FD0\u884C\u3002</li>
<li><code>lupine.components</code> \u80FD\u591F\u81EA\u52A8\u68C0\u6D4B\u8FD0\u884C\u73AF\u5883\uFF0C\u9002\u914D\u684C\u9762\u7AEF UI\uFF08\u5982\u9690\u85CF\u4E0D\u5FC5\u8981\u7684\u79FB\u52A8\u7AEF Tab\uFF09\u3002</li>
</ul>
<h3 id="\u6784\u5EFA\u547D\u4EE4"><a class="header-anchor" href="#\u6784\u5EFA\u547D\u4EE4">#</a>\u6784\u5EFA\u547D\u4EE4</h3><p><code>package.json</code> \u63D0\u4F9B\u4E86\u9884\u7F6E\u7684\u6784\u5EFA\u811A\u672C\uFF0C\u7528\u4E8E\u7F16\u8BD1\u4E0D\u540C\u5E73\u53F0\u7684\u5B89\u88C5\u5305\uFF1A</p>
<pre><code class="language-bash"># Windows
npm run app1:build-win

# Linux
npm run app1:build-linux

# macOS
npm run app1:build-mac
</code></pre>
<p>\u60A8\u53EF\u4EE5\u5728 <code>package.json</code> \u7684 <code>scripts</code> \u533A\u57DF\u627E\u5230\u5E76\u81EA\u5B9A\u4E49\u8FD9\u4E9B\u547D\u4EE4\u3002</p>
`;var Dg=`<h1 id="page-router-\u9875\u9762\u8DEF\u7531"><a class="header-anchor" href="#page-router-\u9875\u9762\u8DEF\u7531">#</a>Page Router (\u9875\u9762\u8DEF\u7531)</h1><p><strong>Lupine.web</strong> \u4E2D\u7684 <code>PageRouter</code> \u662F\u4E00\u4E2A\u5F3A\u5927\u7684\u5BA2\u6237\u7AEF\u8DEF\u7531\u7CFB\u7EDF\uFF0C\u5176\u903B\u8F91\u8BBE\u8BA1\u4E0E\u540E\u7AEF\u7684 <code>ApiRouter</code> (\u4F4D\u4E8E <code>lupine.api</code> \u4E2D) \u4FDD\u6301 <strong>\u540C\u6784</strong>\u3002\u5B83\u652F\u6301\u5D4C\u5957\u8DEF\u7531\u3001\u4E2D\u95F4\u4EF6\u8FC7\u6EE4\u5668\u3001\u52A8\u6001\u53C2\u6570\u548C\u5E03\u5C40\u6846\u67B6 (Layout Frames)\u3002</p>
<h2 id="1-\u4E0E\u5176\u4ED6\u6846\u67B6\u7684\u5BF9\u6BD4"><a class="header-anchor" href="#1-\u4E0E\u5176\u4ED6\u6846\u67B6\u7684\u5BF9\u6BD4">#</a>1. \u2696\uFE0F \u4E0E\u5176\u4ED6\u6846\u67B6\u7684\u5BF9\u6BD4</h2><p>\u4E0E\u901A\u7528\u7684\u8DEF\u7531\u5668\uFF08\u5982 <code>react-router</code> \u6216 <code>vue-router</code>\uFF09\u76F8\u6BD4\uFF1A</p>
<ul>
<li><strong>\u903B\u8F91\u4E00\u81F4\u6027</strong>\uFF1A\u5B83\u4E0E\u540E\u7AEF\u7684 <code>ApiRouter</code> \u5171\u4EAB\u5B8C\u5168\u76F8\u540C\u7684\u8DEF\u7531\u54F2\u5B66\u3002\u5982\u679C\u4F60\u77E5\u9053\u5982\u4F55\u7F16\u5199 Lupine \u540E\u7AEF API\uFF0C\u4F60\u5C31\u77E5\u9053\u5982\u4F55\u7F16\u5199\u524D\u7AEF\u8DEF\u7531\u3002</li>
<li><strong>\u771F\u6B63\u7684\u5D4C\u5957</strong>\uFF1A\u4F60\u53EF\u4EE5\u5C06\u4E00\u4E2A\u5B8C\u6574\u7684 <code>PageRouter</code> \u5B9E\u4F8B\u6302\u8F7D\u5230\u53E6\u4E00\u4E2A\u8DEF\u7531\u5668\u7684\u7279\u5B9A\u8DEF\u5F84\u4E0A\uFF08\u4F8B\u5982\uFF1A<code>router.use(&#39;/user&#39;, userRouter)</code>\uFF09\uFF0C\u4ECE\u800C\u5B9E\u73B0\u771F\u6B63\u7684\u6A21\u5757\u5316\u3002</li>
<li><strong>\u5185\u7F6E\u5E03\u5C40</strong>\uFF1A<code>setFramePage</code> \u5C06\u5E03\u5C40\u89C6\u4E3A\u4E00\u7B49\u516C\u6C11\uFF0C\u80FD\u591F\u5C06\u5185\u5BB9\u6CE8\u5165\u5230\u7279\u5B9A\u7684\u5360\u4F4D\u7B26\u7C7B\u4E2D\u3002</li>
</ul>
<h2 id="2-\u57FA\u672C\u7528\u6CD5"><a class="header-anchor" href="#2-\u57FA\u672C\u7528\u6CD5">#</a>2. \u{1F423} \u57FA\u672C\u7528\u6CD5</h2><p>\u6700\u7B80\u5355\u7684\u5F00\u59CB\u65B9\u6CD5\u662F\u5C06\u8DEF\u5F84\u6620\u5C04\u5230\u9875\u9762\u7EC4\u4EF6\u3002</p>
<pre><code class="language-tsx">import { PageRouter, bindRouter } from &#39;lupine.web&#39;;

// 1. \u521B\u5EFA Router
const pageRouter = new PageRouter();

// 2. \u5B9A\u4E49\u8DEF\u7531
pageRouter.use(&#39;/home&#39;, HomePage);
pageRouter.use(&#39;/about&#39;, AboutPage);
// 404 \u901A\u914D\u7B26
pageRouter.use(&#39;*&#39;, NotFoundPage);

// 3. \u7ED1\u5B9A\u5230\u7CFB\u7EDF
bindRouter(pageRouter);
</code></pre>
<h2 id="3-\u52A8\u6001\u53C2\u6570"><a class="header-anchor" href="#3-\u52A8\u6001\u53C2\u6570">#</a>3. \u{1F527} \u52A8\u6001\u53C2\u6570</h2><p>Lupine \u76F4\u63A5\u5728 URL \u5B57\u7B26\u4E32\u4E2D\u652F\u6301\u5FC5\u9009\u548C\u53EF\u9009\u53C2\u6570\u3002\u6240\u6709\u6355\u83B7\u7684\u53C2\u6570\u90FD\u53EF\u4EE5\u5728 <code>props.urlParameters</code> \u4E2D\u83B7\u53D6\u3002</p>
<h3 id="\u8BED\u6CD5"><a class="header-anchor" href="#\u8BED\u6CD5">#</a>\u8BED\u6CD5</h3><ul>
<li><code>/:id</code> : \u5FC5\u9009\u53C2\u6570\u3002</li>
<li><code>/?id</code> : \u53EF\u9009\u53C2\u6570\u3002\uFF08\u6240\u6709\u540E\u7EED\u53C2\u6570\u4E5F\u5FC5\u987B\u662F\u53EF\u9009\u7684\uFF09\u3002</li>
<li><code>?key=value</code> : \u4E5F\u652F\u6301\u6807\u51C6\u7684\u67E5\u8BE2\u5B57\u7B26\u4E32\uFF08\u5355\u72EC\u89E3\u6790\uFF09\u3002</li>
</ul>
<h3 id="\u793A\u4F8B"><a class="header-anchor" href="#\u793A\u4F8B">#</a>\u793A\u4F8B</h3><pre><code class="language-tsx">// \u5B9A\u4E49:
pageRouter.use(&#39;/share/:type/:id/&#39;, ShareContentPage);

// \u5728 ShareContentPage \u4E2D\u4F7F\u7528:
export const ShareContentPage = (props: PageProps) =&gt; {
  // \u83B7\u53D6\u53C2\u6570
  const type = props.urlParameters[&#39;type&#39;];
  const id = props.urlParameters[&#39;id&#39;];

  return (
    &lt;div&gt;
      \u6B63\u5728\u67E5\u770B {type}\uFF0CID\u4E3A: {id}
    &lt;/div&gt;
  );
};
</code></pre>
<h2 id="4-\u9AD8\u7EA7\u7279\u6027"><a class="header-anchor" href="#4-\u9AD8\u7EA7\u7279\u6027">#</a>4. \u{1F680} \u9AD8\u7EA7\u7279\u6027</h2><h3 id="4-1-\u5D4C\u5957\u8DEF\u7531-\u6A21\u5757\u5316"><a class="header-anchor" href="#4-1-\u5D4C\u5957\u8DEF\u7531-\u6A21\u5757\u5316">#</a>4.1 \u{1F38E} \u5D4C\u5957\u8DEF\u7531 (\u6A21\u5757\u5316)</h3><p>\u4F60\u53EF\u4EE5\u5C06\u5E94\u7528\u7A0B\u5E8F\u62C6\u5206\u4E3A\u5B50\u6A21\u5757\u3002</p>
<pre><code class="language-tsx">// 1. \u4E3A\u7528\u6237\u4E2A\u4EBA\u8D44\u6599\u533A\u57DF\u521B\u5EFA\u4E00\u4E2A\u5B50\u8DEF\u7531\u5668
const userPageRouter = new PageRouter();
userPageRouter.use(&#39;/profile&#39;, UserProfilePage);
userPageRouter.use(&#39;/settings&#39;, UserSettingsPage);

// 2. \u5C06\u5176\u6302\u8F7D\u5230\u4E3B\u8DEF\u7531\u5668\u4E0B\u7684 &#39;/user&#39; \u8DEF\u5F84
const mainRouter = new PageRouter();
mainRouter.use(&#39;/user&#39;, userPageRouter);

// \u73B0\u5728\u7684 URL \u662F: /user/profile, /user/settings
</code></pre>
<h3 id="4-2-\u4E2D\u95F4\u4EF6\u8FC7\u6EE4\u5668-\u9274\u6743"><a class="header-anchor" href="#4-2-\u4E2D\u95F4\u4EF6\u8FC7\u6EE4\u5668-\u9274\u6743">#</a>4.2 \u{1F6E1}\uFE0F \u4E2D\u95F4\u4EF6\u8FC7\u6EE4\u5668 (\u9274\u6743)</h3><p>\u4F60\u53EF\u4EE5\u9644\u52A0\u4E00\u4E2A\u201C\u8FC7\u6EE4\u5668 (Filter)\u201D\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u4F1A\u5728 <em>\u4EFB\u4F55</em> \u8DEF\u7531\u89E3\u6790\u4E4B\u524D\u8FD0\u884C\u3002\u5982\u679C\u8FC7\u6EE4\u5668\u5904\u7406\u4E86\u8BF7\u6C42\uFF08\u4F8B\u5982\uFF0C\u91CD\u5B9A\u5411\u5230\u767B\u5F55\uFF09\u6216\u8FD4\u56DE\u4E86\u4E00\u4E2A\u8282\u70B9\uFF0C\u8DEF\u7531\u5C06\u505C\u6B62\u3002\u5982\u679C\u5B83\u8FD4\u56DE <code>null</code>\uFF0C\u8DEF\u7531\u5C06\u7EE7\u7EED\u3002</p>
<pre><code class="language-tsx">// \u5168\u5C40\u8FC7\u6EE4\u5668
pageRouter.setFilter(checkAgreement);

// \u7279\u5B9A\u8DEF\u7531\u8FC7\u6EE4\u5668 (\u4E2D\u95F4\u4EF6\u6A21\u5F0F)
const checkAuth = async (props) =&gt; {
  if (!isLoggedIn()) {
    // \u6E32\u67D3\u767B\u5F55\u9875\u9762\u6216\u91CD\u5B9A\u5411
    return &lt;LoginPage /&gt;;
  }
  return null; // \u7EE7\u7EED\u6267\u884C\u4E0B\u4E00\u4E2A\u5904\u7406\u7A0B\u5E8F
};

// \u7528\u6CD5: checkAuth \u5148\u8FD0\u884C\uFF0C\u7136\u540E\u624D\u662F UserMinePage
userPageRouter.use(&#39;/mine&#39;, checkAuth, UserMinePage);
</code></pre>
<h3 id="4-3-\u6846\u67B6\u9875\u9762-\u5E03\u5C40"><a class="header-anchor" href="#4-3-\u6846\u67B6\u9875\u9762-\u5E03\u5C40">#</a>4.3 \u{1F5BC}\uFE0F \u6846\u67B6\u9875\u9762 (\u5E03\u5C40)</h3><p>\u4E0E React Router \u5D4C\u5957 <code>&lt;Outlet /&gt;</code> \u4E0D\u540C\uFF0CLupine \u4F7F\u7528 <code>setFramePage</code> \u65B9\u6CD5\u4E3A\u8BE5 Router \u5185\u7684\u6240\u6709\u8DEF\u7531\u5B9A\u4E49\u4E00\u4E2A\u201C\u5305\u88C5\u5668\u201D\u6216\u201C\u5E03\u5C40\u201D\u3002</p>
<pre><code class="language-tsx">// 1. \u5B9A\u4E49\u6846\u67B6
const TopFrame = (placeholderClass, childNode) =&gt; {
  return (
    &lt;div class=&#39;app-container&#39;&gt;
      &lt;Header /&gt;
      &lt;Sidebar /&gt;
      {/* \u5185\u5BB9\u6CE8\u5165\u70B9 */}
      &lt;div class={placeholderClass}&gt;{childNode}&lt;/div&gt;
    &lt;/div&gt;
  );
};

// 2. \u5E94\u7528\u5230 Router
const pageRouter = new PageRouter();
pageRouter.setFramePage({
  component: TopFrame,
  placeholderClassname: &#39;app-content-area&#39;, // \u5339\u914D\u4E0A\u9762\u7684 class
});

pageRouter.use(&#39;/dashboard&#39;, DashboardPage);
// \u7ED3\u679C: DashboardPage \u88AB\u6E32\u67D3\u5728 TopFrame \u7684 &#39;app-content-area&#39; div \u5185\u90E8\u3002
</code></pre>
<h3 id="4-4-\u5B50\u76EE\u5F55\u90E8\u7F72"><a class="header-anchor" href="#4-4-\u5B50\u76EE\u5F55\u90E8\u7F72">#</a>4.4 \u{1F4C2} \u5B50\u76EE\u5F55\u90E8\u7F72</h3><p>\u5982\u679C\u4F60\u7684\u5E94\u7528\u90E8\u7F72\u5728 <code>example.com/my-app/</code>\uFF0C\u4F60\u9700\u8981\u544A\u8BC9\u8DEF\u7531\u5668\u5FFD\u7565 <code>/my-app</code> \u524D\u7F00\u3002</p>
<pre><code class="language-typescript">// \u5982\u679C\u7269\u7406\u8DEF\u5F84\u5B58\u5728\uFF0C\u8DEF\u7531\u5668\u9700\u8981\u77E5\u9053\u8981\u5FFD\u7565\u5B83
pageRouter.setSubDir(&#39;/my-app&#39;);
</code></pre>
`;var Hg=`<h1 id="ssr-\u670D\u52A1\u7AEF\u6E32\u67D3"><a class="header-anchor" href="#ssr-\u670D\u52A1\u7AEF\u6E32\u67D3">#</a>SSR (\u670D\u52A1\u7AEF\u6E32\u67D3)</h1><p>Lupine.js \u4ECE\u4E00\u5F00\u59CB\u5C31\u5C06 <strong>\u670D\u52A1\u7AEF\u6E32\u67D3 (SSR)</strong> \u89C6\u4E3A\u4E00\u7B49\u516C\u6C11\u3002\u5927\u591A\u6570 SPA \u6846\u67B6\u5C06 SSR \u89C6\u4E3A\u4E8B\u540E\u7684\u8865\u5145\uFF0C\u6216\u8005\u9700\u8981\u590D\u6742\u7684\u5143\u6846\u67B6\uFF08\u5982 React \u7684 Next.js\uFF09\u652F\u6301\uFF0C\u800C Lupine \u5219\u76F4\u63A5\u5C06 SSR \u96C6\u6210\u5230\u5176\u6838\u5FC3\u67B6\u6784\u4E2D\uFF08<code>lupine.api</code> \u548C <code>lupine.web</code>\uFF09\u3002</p>
<h2 id="1-\u5DE5\u4F5C\u539F\u7406"><a class="header-anchor" href="#1-\u5DE5\u4F5C\u539F\u7406">#</a>1. \u2699\uFE0F \u5DE5\u4F5C\u539F\u7406</h2><p>\u5F53\u7528\u6237\u8BF7\u6C42\u4E00\u4E2A\u4E0D\u5BF9\u5E94\u9759\u6001\u6587\u4EF6\uFF08\u5982\u56FE\u7247\u6216 JS \u6587\u4EF6\uFF09\u7684 URL \u65F6\uFF0C<code>serverSideRenderPage</code> \u51FD\u6570\u5C31\u4F1A\u63A5\u7BA1\u5904\u7406\u3002</p>
<h3 id="\u6D41\u7A0B"><a class="header-anchor" href="#\u6D41\u7A0B">#</a>\u6D41\u7A0B\uFF1A</h3><ol>
<li><strong>\u8BF7\u6C42\u62E6\u622A</strong>: \u670D\u52A1\u7AEF\u62E6\u622A HTTP \u8BF7\u6C42\u3002</li>
<li><strong>\u73AF\u5883\u6CE8\u5165</strong>: \u5B83\u5C06\u670D\u52A1\u7AEF\u73AF\u5883\u53D8\u91CF\uFF08\u4EE5 <code>WEB.</code> \u5F00\u5934\uFF09\u6CE8\u5165\u5230\u8FD0\u884C\u65F6\u3002</li>
<li><strong>\u9875\u9762\u751F\u6210</strong>: \u5B83\u8C03\u7528 <code>_lupineJs.generatePage</code> <strong>\u5728\u670D\u52A1\u7AEF</strong> \u6267\u884C\u4F60\u7684\u524D\u7AEF\u903B\u8F91\u3002</li>
<li><strong>HTML \u6784\u5EFA</strong>: \u5B83\u5C06\u6700\u7EC8\u7684 HTML \u62FC\u63A5\u5728\u4E00\u8D77\uFF0C\u5305\u62EC\uFF1A<ul>
<li><strong>\u4E3B\u9898\u4E0E\u6837\u5F0F</strong>: \u5173\u952E CSS \u548C\u5F53\u524D\u4E3B\u9898\u88AB\u76F4\u63A5\u6CE8\u5165\uFF0C\u9632\u6B62\u201C\u5185\u5BB9\u65E0\u6837\u5F0F\u95EA\u70C1\u201D (FOUC)\u3002</li>
<li><strong>\u5143\u6570\u636E</strong>: \u8BA1\u7B97\u5E76\u63D2\u5165 SEO \u6807\u9898\u548C\u63CF\u8FF0\u3002</li>
<li><strong>\u72B6\u6001\u6CE8\u6C34 (Hydration)</strong>: \u9875\u9762\u88AB\u52A0\u8F7D\u4E4B\u540E\uFF0C\u524D\u7AEF\u4F1A\u81EA\u52A8\u7ED1\u5B9A\u4E8B\u4EF6\u3002</li>
</ul>
</li>
</ol>
<h2 id="2-\u96F6\u914D\u7F6E-seo"><a class="header-anchor" href="#2-\u96F6\u914D\u7F6E-seo">#</a>2. \u{1F50D} \u96F6\u914D\u7F6E SEO</h2><p>Lupine SSR \u7684\u6700\u5927\u597D\u5904\u4E4B\u4E00\u662F\u81EA\u52A8\u652F\u6301 SEO\u3002\u901A\u8FC7\u4F7F\u7528 <code>MetaData</code> \u7B49\u7EC4\u4EF6\uFF0C\u4F60\u7684\u9875\u9762\u5728\u5BA2\u6237\u7AEF\u8FD0\u884C\u4EFB\u4F55 JavaScript <strong>\u4E4B\u524D</strong>\uFF0C\u5C31\u5DF2\u7ECF\u544A\u8BC9\u4E86\u641C\u7D22\u5F15\u64CE\u5B83\u4EEC\u9700\u8981\u77E5\u9053\u7684\u786E\u5207\u5185\u5BB9\u3002</p>
<h3 id="\u793A\u4F8B-\u793E\u4EA4\u5206\u4EAB-opengraph"><a class="header-anchor" href="#\u793A\u4F8B-\u793E\u4EA4\u5206\u4EAB-opengraph">#</a>\u793A\u4F8B\uFF1A\u793E\u4EA4\u5206\u4EAB (OpenGraph)</h3><p>\u5728 <code>share-content.tsx</code> \u4E2D\uFF0C\u4F60\u53EF\u4EE5\u6839\u636E\u6B63\u5728\u67E5\u770B\u7684\u5185\u5BB9\u52A8\u6001\u8BBE\u7F6E meta \u6807\u7B7E\uFF1A</p>
<pre><code class="language-tsx">export const ShareContentPage = async (props: PageProps) =&gt; {
  // 1. \u83B7\u53D6\u6570\u636E (\u5728\u670D\u52A1\u7AEF\u4E5F\u53EF\u884C\uFF01)
  const record = await fetchRecord(props.urlParameters[&#39;id&#39;]);

  // 2. \u5B9A\u4E49 SEO/\u793E\u4EA4\u5A92\u4F53\u5143\u6570\u636E
  return (
    &lt;div&gt;
      &lt;MetaData property=&#39;og:title&#39; content={record.title} /&gt;
      &lt;MetaData property=&#39;og:description&#39; content={record.description} /&gt;
      &lt;MetaData property=&#39;og:image&#39; content={record.imageUrl} /&gt;
      &lt;MetaData property=&#39;og:url&#39; content={props.url} /&gt;

      &lt;h1&gt;{record.title}&lt;/h1&gt;
      {/* ... \u5185\u5BB9 ... */}
    &lt;/div&gt;
  );
};
</code></pre>
<h2 id="3-\u73AF\u5883\u53D8\u91CF"><a class="header-anchor" href="#3-\u73AF\u5883\u53D8\u91CF">#</a>3. \u{1F6E0}\uFE0F \u73AF\u5883\u53D8\u91CF</h2><p>Lupine \u81EA\u52A8\u5C06\u4F60\u7684\u670D\u52A1\u7AEF\u73AF\u5883\u6865\u63A5\u5230\u524D\u7AEF\u3002</p>
<h3 id="\u5B9A\u4E49\u53D8\u91CF"><a class="header-anchor" href="#\u5B9A\u4E49\u53D8\u91CF">#</a>\u5B9A\u4E49\u53D8\u91CF</h3><p>\u5728 <code>.env</code> \u6587\u4EF6\u4E2D\uFF0C\u4EE5 <code>WEB.</code> \u5F00\u5934\u7684\u53D8\u91CF\u88AB\u6807\u8BB0\u4E3A\u524D\u7AEF\u53EF\u7528\uFF1A</p>
<pre><code class="language-ini"># .env
WEB.API_BASE_URL=https://api.example.com
WEB.SITE_NAME=My Awesome App
SECRET_KEY=xxxx  &lt;-- \u8FD9\u4E2A\u4FDD\u7559\u5728\u670D\u52A1\u7AEF\uFF01
</code></pre>
<h3 id="\u8BBF\u95EE\u53D8\u91CF"><a class="header-anchor" href="#\u8BBF\u95EE\u53D8\u91CF">#</a>\u8BBF\u95EE\u53D8\u91CF</h3><p>\u5728 SSR \u671F\u95F4\uFF08\u4EE5\u53CA\u968F\u540E\u7684\u6D4F\u89C8\u5668\u4E2D\uFF09\uFF0C\u53EF\u4EE5\u901A\u8FC7 <code>getWebEnv()</code> \u8BBF\u95EE\u8FD9\u4E9B\u53D8\u91CF\uFF1A</p>
<pre><code class="language-typescript">// \u4EFB\u610F\u7EC4\u4EF6
import { getWebEnv } from &#39;lupine.web&#39;;

const env = getWebEnv();
console.log(env.API_BASE_URL); // &quot;https://api.example.com&quot;
</code></pre>
<h2 id="4-webconfig-\u52A8\u6001\u8FD0\u884C\u65F6\u914D\u7F6E"><a class="header-anchor" href="#4-webconfig-\u52A8\u6001\u8FD0\u884C\u65F6\u914D\u7F6E">#</a>4. \u2699\uFE0F WebConfig: \u52A8\u6001\u8FD0\u884C\u65F6\u914D\u7F6E</h2><p>\u6709\u65F6\u4F60\u9700\u8981\u4E00\u4E9B\u53EF\u4EE5\u5728\u8FD0\u884C\u65F6\u66F4\u6539\u7684\u914D\u7F6E\uFF08\u4F8B\u5982\u7BA1\u7406\u540E\u53F0\u7684\u201C\u6BCF\u9875\u6700\u5927\u884C\u6570\u201D\u6216\u201C\u7EF4\u62A4\u6A21\u5F0F\u201D\uFF09\uFF0C\u800C\u65E0\u9700\u91CD\u65B0\u90E8\u7F72\u3002Lupine \u4E3A\u6B64\u63D0\u4F9B\u4E86 <code>WebConfig</code>\u3002</p>
<p><strong>\u673A\u5236\uFF1A</strong></p>
<ol>
<li><strong>SSR \u6CE8\u5165</strong>: \u5728\u9996\u6B21\u52A0\u8F7D\u9875\u9762\u65F6\uFF0C\u670D\u52A1\u7AEF\u83B7\u53D6\u8FD9\u4E9B\u914D\u7F6E\u5E76\u5C06\u5176\u6CE8\u5165\u5230\u4E00\u4E2A <code>&lt;script id=&quot;web-setting&quot;&gt;</code> \u6807\u7B7E\u4E2D\u3002</li>
<li><strong>\u6CE8\u6C34 (Hydration)</strong>: <code>WebConfig.init()</code> (\u81EA\u52A8\u8C03\u7528) \u8BFB\u53D6\u6B64\u811A\u672C\u6807\u7B7E\uFF0C\u6709\u6548\u5730\u540C\u6B65\u201C\u6CE8\u6C34\u201D\u914D\u7F6E\u3002</li>
<li><strong>\u5F02\u6B65\u56DE\u9000</strong>: \u5982\u679C\u5E94\u7528\u4F5C\u4E3A\u7EAF SPA \u8FD0\u884C\uFF08\u4EC5\u5BA2\u6237\u7AEF\u5BFC\u822A\uFF09\uFF0C\u4E14\u7F13\u5B58\u7F3A\u5931\uFF0C<code>WebConfig.get()</code> \u4F1A\u4ECE API \u83B7\u53D6\u914D\u7F6E\u3002</li>
</ol>
<h3 id="\u7528\u6CD5"><a class="header-anchor" href="#\u7528\u6CD5">#</a>\u7528\u6CD5</h3><p><strong>\u7ED1\u5B9A API (\u5165\u53E3\u70B9):</strong></p>
<pre><code class="language-tsx">// src/index.tsx
bindWebConfigApi(&#39;/api/admin/web-config&#39;);
</code></pre>
<p><strong>\u4F7F\u7528\u914D\u7F6E (\u7EC4\u4EF6):</strong></p>
<pre><code class="language-tsx">// admin-poster-page.tsx
const PosterList = async () =&gt; {
  // \u5F02\u6B65\u8BBF\u95EE\u786E\u4FDD\u6570\u636E\u5DF2\u5C31\u7EEA
  const maxRows = await WebConfig.get(&#39;poster_max_rows&#39;, 10);
  const category = await WebConfig.get(&#39;current_category&#39;, &#39;default&#39;);

  // ... \u4F7F\u7528\u914D\u7F6E ...
};
</code></pre>
<blockquote>
<p>[!IMPORTANT]
\u7531\u4E8E <code>WebConfig</code> \u53EF\u80FD\u9700\u8981\u83B7\u53D6\u6570\u636E\uFF08\u5728\u5BA2\u6237\u7AEF\u5BFC\u822A\u65F6\uFF09\uFF0C\u5B83\u88AB\u8BBE\u8BA1\u4E3A <strong>\u5F02\u6B65 API</strong>\u3002\u8BF7\u59CB\u7EC8\u4F7F\u7528 <code>await WebConfig.get(...)</code>\u3002</p>
</blockquote>
<h2 id="5-\u667A\u80FD\u7F13\u5B58\u4E0E\u6027\u80FD"><a class="header-anchor" href="#5-\u667A\u80FD\u7F13\u5B58\u4E0E\u6027\u80FD">#</a>5. \u26A1 \u667A\u80FD\u7F13\u5B58\u4E0E\u6027\u80FD</h2><p>Lupine \u7684 SSR \u4E0D\u4EC5\u4EC5\u662F\u4E3A\u4E86\u6E32\u67D3\uFF0C\u66F4\u662F\u4E3A\u4E86\u901F\u5EA6\u3002</p>
<ul>
<li><strong>\u6A21\u677F\u7F13\u5B58</strong>: \u670D\u52A1\u7AEF\u7F13\u5B58 <code>index.html</code> \u7684\u7ED3\u6784\u4EE5\u51CF\u5C11\u6587\u4EF6\u7CFB\u7EDF\u8BFB\u53D6\u3002\u5B83\u8BC6\u522B\u6807\u9898\u3001Meta\u3001CSS \u548C\u5185\u5BB9\u7684\u201C\u63D2\u69FD\u201D (<code>packages/lupine.api/src/api/server-render.ts</code>)\u3002</li>
<li><strong>CSS \u4E0E\u4E3B\u9898\u6CE8\u5165</strong>: \u901A\u8FC7\u5728\u670D\u52A1\u7AEF\u8BA1\u7B97\u5173\u952E CSS (<code>generateAllGlobalStyles</code>)\uFF0C\u6D4F\u89C8\u5668\u53EF\u4EE5\u7ACB\u5373\u63A5\u6536\u5230\u4E00\u4E2A\u6837\u5F0F\u5B8C\u6574\u7684\u9875\u9762\u3002\u5373\u4F7F\u7528\u6237\u7981\u7528\u4E86 JavaScript \u6216\u52A0\u8F7D\u7F13\u6162\uFF0C\u4ED6\u4EEC\u4E5F\u80FD\u770B\u5230\u5B8C\u7F8E\u7684 UI\u3002</li>
</ul>
`;var Ig=`<h1 id="theme-\u4E3B\u9898"><a class="header-anchor" href="#theme-\u4E3B\u9898">#</a>\u{1F317} Theme (\u4E3B\u9898)</h1><p>Lupine.js \u5185\u7F6E\u4E86\u5BF9\u591A\u4E3B\u9898\uFF08\u5982\u4EAE\u8272/\u6697\u8272\u6A21\u5F0F\uFF09\u7684\u652F\u6301\uFF0C\u5E76\u5B8C\u7F8E\u96C6\u6210\u4E86 SSR\u3002</p>
<h2 id="1-\u8BBE\u7F6E-setup"><a class="header-anchor" href="#1-\u8BBE\u7F6E-setup">#</a>1. \u{1F3C1} \u8BBE\u7F6E (Setup)</h2><p>\u4F60\u9700\u8981\u5728\u5E94\u7528\u7A0B\u5E8F\u5165\u53E3\u70B9\uFF08\u901A\u5E38\u662F <code>index.tsx</code>\uFF09\u7ED1\u5B9A\u4F60\u7684\u4E3B\u9898\u3002</p>
<h3 id="bindtheme"><a class="header-anchor" href="#bindtheme">#</a><code>bindTheme</code></h3><p>\u5C06\u4F60\u7684\u4E3B\u9898\u5B9A\u4E49\u8FDE\u63A5\u5230 Lupine \u8FD0\u884C\u65F6\u3002</p>
<pre><code class="language-tsx">// src/index.tsx
import { bindTheme } from &#39;lupine.web&#39;;
import { lightThemes, darkThemes } from &#39;./themes&#39;;

// \u7ED1\u5B9A\u9ED8\u8BA4\u4E3B\u9898\u548C\u53EF\u7528\u4E3B\u9898
bindTheme(&#39;light&#39;, {
  light: lightThemes,
  dark: darkThemes,
});
</code></pre>
<ul>
<li><strong>\u76EE\u7684</strong>: \u8BA9\u7CFB\u7EDF\u77E5\u9053\u6709\u54EA\u4E9B\u53EF\u7528\u4E3B\u9898\u4EE5\u53CA\u9ED8\u8BA4\u4E3B\u9898\u662F\u4EC0\u4E48\u3002</li>
<li><strong>\u4F4D\u7F6E</strong>: \u5728\u6E32\u67D3\u5E94\u7528\u4E4B\u524D\u8C03\u7528\u3002</li>
</ul>
<h2 id="2-\u7528\u6CD5-usage"><a class="header-anchor" href="#2-\u7528\u6CD5-usage">#</a>2. \u{1F3AE} \u7528\u6CD5 (Usage)</h2><h3 id="\u8BBF\u95EE\u4E0E\u66F4\u65B0"><a class="header-anchor" href="#\u8BBF\u95EE\u4E0E\u66F4\u65B0">#</a>\u8BBF\u95EE\u4E0E\u66F4\u65B0</h3><p>\u4F60\u53EF\u4EE5\u4F7F\u7528\u63D0\u4F9B\u7684\u8F85\u52A9\u51FD\u6570\u83B7\u53D6\u5F53\u524D\u4E3B\u9898\u6216\u5207\u6362\u4E3B\u9898\u3002</p>
<pre><code class="language-tsx">import { getCurrentTheme, updateTheme } from &#39;lupine.web&#39;;

// \u83B7\u53D6\u5F53\u524D\u4E3B\u9898\u4FE1\u606F
const { themeName, themes } = getCurrentTheme();

// \u5207\u6362\u5230\u6697\u8272\u6A21\u5F0F
const onSwitch = () =&gt; {
  updateTheme(&#39;dark&#39;);
};
</code></pre>
<h3 id="themeselector-\u7EC4\u4EF6"><a class="header-anchor" href="#themeselector-\u7EC4\u4EF6">#</a><code>ThemeSelector</code> \u7EC4\u4EF6</h3><p>Lupine \u63D0\u4F9B\u4E86\u4E00\u4E2A\u5185\u7F6E\u7684 <code>ThemeSelector</code> \u7EC4\u4EF6\uFF0C\u7528\u4E8E\u65B9\u4FBF\u5730\u5207\u6362\u4E3B\u9898\u3002</p>
<pre><code class="language-tsx">import { ThemeSelector } from &#39;lupine.components&#39;;

const Header = () =&gt; (
  &lt;header&gt;
    &lt;h1&gt;\u6211\u7684\u5E94\u7528&lt;/h1&gt;
    &lt;ThemeSelector /&gt;
  &lt;/header&gt;
);
</code></pre>
<h2 id="3-\u670D\u52A1\u7AEF\u6E32\u67D3-ssr"><a class="header-anchor" href="#3-\u670D\u52A1\u7AEF\u6E32\u67D3-ssr">#</a>3. \u26A1 \u670D\u52A1\u7AEF\u6E32\u67D3 (SSR)</h2><p>Lupine \u6700\u5F3A\u5927\u7684\u529F\u80FD\u4E4B\u4E00\u662F\u5728 SSR \u671F\u95F4\u652F\u6301 <strong>\u65E0\u95EA\u70C1 (FOUC-free)</strong> \u4E3B\u9898\u3002</p>
<ul>
<li><strong>Cookie \u6CE8\u5165</strong>: \u5F53\u524D\u4E3B\u9898\u5B58\u50A8\u5728 Cookie \u4E2D\u3002</li>
<li><strong>\u670D\u52A1\u7AEF\u5904\u7406</strong>: \u5728 SSR \u671F\u95F4\uFF0C\u670D\u52A1\u7AEF\u8BFB\u53D6\u6B64 Cookie\u3002</li>
<li><strong>\u6837\u5F0F\u6CE8\u5165</strong>: \u670D\u52A1\u7AEF\u751F\u6210\u5F53\u524D\u6D3B\u52A8\u4E3B\u9898\u7684 CSS \u53D8\u91CF\uFF0C\u5E76\u5C06\u5176\u76F4\u63A5\u6CE8\u5165\u5230 HTML \u7684 <code>&lt;style&gt;</code> \u6807\u7B7E\u4E2D\u3002</li>
</ul>
<p>\u8FD9\u786E\u4FDD\u4E86\u5F53\u7528\u6237\u52A0\u8F7D\u9875\u9762\u65F6\uFF0C\u5728\u5BA2\u6237\u7AEF\u8FD0\u884C\u4EFB\u4F55 JavaScript \u4E4B\u524D\uFF0C\u9875\u9762\u5C31\u5DF2\u7ECF\u5177\u6709\u6B63\u786E\u7684\u6837\u5F0F\uFF08\u4F8B\u5982\u6697\u8272\u80CC\u666F\uFF09\u3002</p>
<h2 id="4-\u7BA1\u7406\u5DE5\u5177-admin-tools"><a class="header-anchor" href="#4-\u7BA1\u7406\u5DE5\u5177-admin-tools">#</a>4. \u{1F6E0}\uFE0F \u7BA1\u7406\u5DE5\u5177 (Admin Tools)</h2><p>\u4E3A\u4E86\u53EF\u89C6\u5316\u4F60\u7684\u4E3B\u9898\u548C\u8C03\u8BD5\u989C\u8272\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528\u540E\u53F0\u7BA1\u7406\u8F85\u52A9\u7EC4\u4EF6\u3002</p>
<pre><code class="language-tsx">// \u7528\u4E8E\u5217\u51FA\u6240\u6709\u4E3B\u9898\u989C\u8272\u4EE5\u8FDB\u884C\u5BF9\u6BD4\u7684\u8F85\u52A9\u5DE5\u5177
import { TestThemes } from &#39;lupine.api/admin&#39;;
</code></pre>
<p>\u6B64\u7EC4\u4EF6\u6E32\u67D3\u4E00\u4E2A\u7F51\u683C\uFF0C\u663E\u793A\u4F60\u5B9A\u4E49\u7684\u989C\u8272\u5728\u4E0D\u540C\u4E3B\u9898\u4E0B\u7684\u5916\u89C2\uFF0C\u5E2E\u52A9\u4F60\u627E\u5230\u6B63\u786E\u7684\u952E\u503C\u548C\u5BF9\u6BD4\u5EA6\u3002</p>
`;var zg=`<h1 id="\u5B89\u88C5\u8BF4\u660E"><a class="header-anchor" href="#\u5B89\u88C5\u8BF4\u660E">#</a>\u5B89\u88C5\u8BF4\u660E</h1><p>Lupine.js \u662F\u4E00\u4E2A\u529F\u80FD\u9F50\u5168\u7684 Web \u5E94\u7528\u7A0B\u5E8F\u6846\u67B6\uFF0C\u5305\u542B\u524D\u7AEF\u548C\u540E\u7AEF\u3002\u524D\u7AEF Lupine.web \u662F\u4E00\u4E2A\u6781\u5176\u8F7B\u91CF\u7EA7\u7684\u6846\u67B6\uFF0C\u4F7F\u7528 React TSX \u8BED\u6CD5\u3002\u540E\u7AEF Lupine.api \u662F\u4E00\u4E2A\u7C7B\u4F3C Express \u7684\u9AD8\u6548\u6781\u7B80\u6846\u67B6\u3002</p>
<h2 id="\u5FEB\u901F\u5F00\u59CB"><a class="header-anchor" href="#\u5FEB\u901F\u5F00\u59CB">#</a>\u5FEB\u901F\u5F00\u59CB</h2><h3 id="1-\u521B\u5EFA\u9879\u76EE"><a class="header-anchor" href="#1-\u521B\u5EFA\u9879\u76EE">#</a>1. \u521B\u5EFA\u9879\u76EE</h3><p>\u6700\u7B80\u5355\u7684\u65B9\u5F0F\u5C31\u662F\u4F7F\u7528 <code>create-lupine</code> \u547D\u4EE4\u6765\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u5E94\u7528\u7A0B\u5E8F\u3002\u5728\u521B\u5EFA\u7684\u65F6\u5019\u60A8\u53EF\u4EE5\u9009\u62E9\u6A21\u7248\u3002</p>
<pre><code class="language-bash">npx create-lupine@latest my-app
</code></pre>
<p>\u5982\u679C\u60A8\u50CF\u66F4\u6DF1\u5165\u7684\u4E86\u89E3 lupine.js\uFF0C\u60A8\u53EF\u4EE5\u4ECE github \u4E0A\u514B\u9686\u4ED3\u5E93\uFF0C\u8FD9\u6837\u66F4\u65B9\u4FBF\u7684\u672C\u5730\u67E5\u770B\u6838\u5FC3\u4EE3\u7801\u3002</p>
<pre><code class="language-bash">git clone https://github.com/uuware/lupine.js.git
</code></pre>
<h3 id="2-\u5B89\u88C5\u4F9D\u8D56"><a class="header-anchor" href="#2-\u5B89\u88C5\u4F9D\u8D56">#</a>2. \u5B89\u88C5\u4F9D\u8D56</h3><pre><code class="language-bash">npm install
</code></pre>
<h3 id="3-\u914D\u7F6E\u73AF\u5883"><a class="header-anchor" href="#3-\u914D\u7F6E\u73AF\u5883">#</a>3. \u914D\u7F6E\u73AF\u5883</h3><p>\u5982\u679C\u4F7F\u7528 <code>create-lupine</code> \u521B\u5EFA\u7684\u9879\u76EE\uFF0C <code>.env</code> \u6587\u4EF6\u5DF2\u7ECF\u751F\u6210\u3002</p>
<p>\u5982\u679C\u4F7F\u7528 <code>git clone</code> \u521B\u5EFA\u7684\u9879\u76EE\uFF0C\u5219\u9700\u8981\u914D\u7F6E\u73AF\u5883\u3002</p>
<p>\u5C06 <code>.env.sample</code> \u6587\u4EF6\u590D\u5236\u4E3A\u540D\u4E3A <code>.env</code> \u7684\u65B0\u6587\u4EF6\u3002</p>
<p>\u4F7F\u7528 <code>git clone</code> \u521B\u5EFA\u7684\u9879\u76EE\uFF0C\u8FD8\u9700\u8981\u4F7F\u7528 <code>.env</code> \u6587\u4EF6\u4E2D\u7684\u793A\u4F8B\u811A\u672C\u4E3A\u4EE5\u4E0B\u53D8\u91CF\u751F\u6210\u5BC6\u94A5\uFF1A</p>
<pre><code class="language-properties">ADMIN_PASS=
CRYPTO_KEY=
DEV_ADMIN_PASS=
DEV_CRYPTO_KEY=
</code></pre>
<h3 id="4-\u8FD0\u884C\u5F00\u53D1\u5E94\u7528\u7A0B\u5E8F"><a class="header-anchor" href="#4-\u8FD0\u884C\u5F00\u53D1\u5E94\u7528\u7A0B\u5E8F">#</a>4. \u8FD0\u884C\u5F00\u53D1\u5E94\u7528\u7A0B\u5E8F</h3><pre><code class="language-bash">npm run dev
</code></pre>
<p>\u73B0\u5728\uFF0C\u60A8\u53EF\u4EE5\u901A\u8FC7 <a href="http://localhost:11080">http://localhost:11080</a> \u8BBF\u95EE\u5F00\u53D1\u5E94\u7528\u7A0B\u5E8F\u3002</p>
<hr>
<h2 id="\u672C\u5730-https-\u8BBE\u7F6E"><a class="header-anchor" href="#\u672C\u5730-https-\u8BBE\u7F6E">#</a>\u672C\u5730 HTTPS \u8BBE\u7F6E</h2><p>\u5BF9\u4E8E\u672C\u5730 HTTPS \u652F\u6301\uFF0C\u5EFA\u8BAE\u4F7F\u7528 <a href="https://github.com/FiloSottile/mkcert">mkcert</a>\u3002</p>
<ol>
<li>\u4E0B\u8F7D <code>mkcert</code> (\u4F8B\u5982 <code>mkcert-v1.4.4-windows-amd64.exe</code>)\u3002</li>
<li>\u6253\u5F00\u7BA1\u7406\u5458\u63A7\u5236\u53F0\u5E76\u8FD0\u884C\uFF1A<pre><code class="language-bash">./mkcert-v1.4.4-windows-amd64 -install
</code></pre>
</li>
<li>\u751F\u6210\u8BC1\u4E66\uFF08\u9488\u5BF9\u65B0\u8BBE\u7F6E\uFF09\uFF1A<pre><code class="language-bash">mkcert example.com &quot;*.example.com&quot; localhost 127.0.0.1 ::1
</code></pre>
</li>
<li>\u5C06\u751F\u6210\u7684\u8BC1\u4E66\u6587\u4EF6\u590D\u5236\u5230 <code>/dev</code> \u6587\u4EF6\u5939\u3002</li>
<li>\u66F4\u65B0\u60A8\u7684 <code>.env</code> \u6587\u4EF6\uFF0C\u4EE5\u5141\u8BB8\u4F7F\u7528\u81EA\u7B7E\u540D\u8BC1\u4E66\u8FDB\u884C\u672C\u5730 API \u8C03\u7528\uFF1A<pre><code class="language-properties">NODE_TLS_REJECT_UNAUTHORIZED=0
</code></pre>
</li>
</ol>
<h3 id="\u66FF\u4EE3\u65B9\u6848-\u901A\u8FC7-openssl-\u751F\u6210\u81EA\u7B7E\u540D\u8BC1\u4E66"><a class="header-anchor" href="#\u66FF\u4EE3\u65B9\u6848-\u901A\u8FC7-openssl-\u751F\u6210\u81EA\u7B7E\u540D\u8BC1\u4E66">#</a>\u66FF\u4EE3\u65B9\u6848\uFF1A\u901A\u8FC7 OpenSSL \u751F\u6210\u81EA\u7B7E\u540D\u8BC1\u4E66</h3><p>\u5982\u679C\u60A8\u66F4\u559C\u6B22 OpenSSL\uFF1A</p>
<pre><code class="language-bash">openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout cert.key -out cert.pem -sha256
</code></pre>
<p>\u5728 Windows \u4E0A\uFF0C\u60A8\u53EF\u80FD\u9700\u8981\u4F7F\u7528\uFF1A
<code>&quot;C:\\Program Files\\Git\\usr\\bin\\openssl.exe&quot;</code></p>
<hr>
<h2 id="\u8C03\u8BD5"><a class="header-anchor" href="#\u8C03\u8BD5">#</a>\u8C03\u8BD5</h2><h3 id="\u4EC5\u8C03\u8BD5\u540E\u7AEF"><a class="header-anchor" href="#\u4EC5\u8C03\u8BD5\u540E\u7AEF">#</a>\u4EC5\u8C03\u8BD5\u540E\u7AEF</h3><p>\u5728 VS Code \u4E2D\u6253\u5F00 <strong>Javascript Debug Terminal</strong> \u5E76\u8FD0\u884C\uFF1A</p>
<pre><code class="language-bash">npm run dev
</code></pre>
<h3 id="\u8C03\u8BD5\u524D\u7AEF\u548C\u540E\u7AEF"><a class="header-anchor" href="#\u8C03\u8BD5\u524D\u7AEF\u548C\u540E\u7AEF">#</a>\u8C03\u8BD5\u524D\u7AEF\u548C\u540E\u7AEF</h3><ol>
<li>\u8F6C\u5230 VS Code \u4E2D\u7684 <strong>Run and Debug</strong> \u4FA7\u8FB9\u680F\u3002</li>
<li>\u4ECE\u4E0B\u62C9\u5217\u8868\u4E2D\u9009\u62E9 <strong>&quot;Lupine.js: Frontend &amp; Backend&quot;</strong>\u3002</li>
<li>\u5728\u60A8\u7684\u524D\u7AEF\u6216\u540E\u7AEF\u4EE3\u7801\u4E2D\u8BBE\u7F6E\u65AD\u70B9\u5E76\u5F00\u59CB\u8C03\u8BD5\u3002</li>
</ol>
<hr>
<h2 id="\u6DFB\u52A0\u65B0\u5E94\u7528"><a class="header-anchor" href="#\u6DFB\u52A0\u65B0\u5E94\u7528">#</a>\u6DFB\u52A0\u65B0\u5E94\u7528</h2><p>Lupine \u53EF\u4EE5\u5728\u540C\u4E00\u7AEF\u53E3\u4E0B\u8FD0\u884C\u591A\u4E2A\u5E94\u7528\u7A0B\u5E8F\u3002\u8981\u5728\u672C\u5730\u6DFB\u52A0\u65B0\u5E94\u7528\uFF1A</p>
<ol>
<li><strong>\u590D\u5236</strong>\uFF1A\u590D\u5236 <code>/apps</code> \u4E0B\u7684\u4EFB\u4F55\u5E94\u7528\u6587\u4EF6\u5939\u5E76\u91CD\u547D\u540D\u3002</li>
<li><strong>\u66F4\u65B0\u914D\u7F6E</strong>\uFF1A\u4F7F\u7528\u65B0\u5E94\u7528\u540D\u79F0\u66F4\u65B0 <code>apps\\&lt;your-app&gt;\\lupine.json</code> \u6587\u4EF6\u3002</li>
<li><strong>\u6CE8\u518C\u5E94\u7528</strong>\uFF1A\u5C06\u65B0\u5E94\u7528\u540D\u79F0\u6DFB\u52A0\u5230 <code>.env</code> \u6587\u4EF6\u4E2D\u7684 <code>APPS=</code>\u3002</li>
<li><strong>\u865A\u62DF\u57DF\u540D</strong>\uFF1A\u5728 <code>.env</code> \u6587\u4EF6\u4E2D\u7684 <code>DOMAINS@[APP-NAME]=</code> \u6DFB\u52A0\u8BE5\u5E94\u7528\u7684\u865A\u62DF\u57DF\u540D\u3002</li>
<li><strong>\u6784\u5EFA</strong>\uFF1A\u65B0\u5E94\u7528\u7684\u6E90\u4EE3\u7801\u5C06\u6784\u5EFA\u5230 <code>dist\\server_root</code>\u3002</li>
</ol>
<h3 id="\u672C\u5730\u865A\u62DF\u57DF\u540D\u8BBE\u7F6E"><a class="header-anchor" href="#\u672C\u5730\u865A\u62DF\u57DF\u540D\u8BBE\u7F6E">#</a>\u672C\u5730\u865A\u62DF\u57DF\u540D\u8BBE\u7F6E</h3><p>\u8981\u5728\u540C\u4E00\u7AEF\u53E3\u8BBF\u95EE\u591A\u4E2A\u5E94\u7528\uFF08\u4F8B\u5982 <code>app1.sample-domain.com</code>\uFF09\uFF0C\u8BF7\u4FEE\u6539\u60A8\u7684 hosts \u6587\u4EF6\uFF1A</p>
<pre><code class="language-text">127.0.0.1 app1.sample-domain.com
</code></pre>
<p><strong>Hosts \u6587\u4EF6\u4F4D\u7F6E\uFF1A</strong></p>
<ul>
<li><strong>Windows</strong>: <code>C:\\Windows\\System32\\Drivers\\etc\\hosts</code></li>
<li><strong>Linux/macOS</strong>: <code>/etc/hosts</code></li>
</ul>
<h3 id="\u521B\u5EFA\u5B50\u6587\u4EF6\u5939\u5E94\u7528"><a class="header-anchor" href="#\u521B\u5EFA\u5B50\u6587\u4EF6\u5939\u5E94\u7528">#</a>\u521B\u5EFA\u5B50\u6587\u4EF6\u5939\u5E94\u7528</h3><p>\u8981\u5728\u73B0\u6709\u5E94\u7528\u4E2D\u521B\u5EFA\u5B50\u5E94\u7528\u7A0B\u5E8F\uFF08\u4F8B\u5982 <code>admin_dev</code>\uFF09\uFF1A</p>
<ol>
<li>\u521B\u5EFA\u6587\u4EF6\u5939\uFF1A<code>apps\\[your-app-name]\\web\\src\\admin_dev</code></li>
<li>\u6DFB\u52A0 <code>index.html</code> \u548C <code>index.tsx</code>\u3002</li>
<li>\u66F4\u65B0 <code>apps\\[your-app-name]\\lupine.json</code> \u6761\u76EE\uFF1A<pre><code class="language-json">{
  &quot;index&quot;: &quot;web/src/admin_dev/index.tsx&quot;,
  &quot;html&quot;: &quot;web/src/admin_dev/index.html&quot;,
  &quot;outdir&quot;: &quot;/admin_dev&quot;
}
</code></pre>
</li>
</ol>
<hr>
<h2 id="\u91CD\u8981\u63D0\u793A-ssr-\u4E2D\u7684\u5168\u5C40\u53D8\u91CF"><a class="header-anchor" href="#\u91CD\u8981\u63D0\u793A-ssr-\u4E2D\u7684\u5168\u5C40\u53D8\u91CF">#</a>\u91CD\u8981\u63D0\u793A\uFF1ASSR \u4E2D\u7684\u5168\u5C40\u53D8\u91CF</h2><p>\u7531\u4E8E Lupine \u4F7F\u7528\u670D\u52A1\u5668\u7AEF\u6E32\u67D3 (SSR)\uFF0C\u524D\u7AEF\u4EE3\u7801\u4E2D\u7684\u5168\u5C40\u53D8\u91CF\u7531<strong>\u6240\u6709\u7528\u6237\u5171\u4EAB</strong>\u3002\u8BF7\u6781\u5176\u8C28\u614E\u5730\u4F7F\u7528\u5B83\u4EEC\u3002</p>
<p><strong>\u9519\u8BEF\u505A\u6CD5\uFF1A</strong>
\u4EE5\u4E0B\u4EE3\u7801\u5F88\u5371\u9669\uFF0C\u56E0\u4E3A <code>cacheUser</code> \u662F\u5171\u4EAB\u7684\uFF1A</p>
<pre><code class="language-typescript">const cacheUser: { user: null | Promise&lt;UserInfoType | null&gt; } = { user: null };
export const getUserInfo = (refresh?: boolean): Promise&lt;UserInfoType | null&gt; =&gt; {
  if (!cacheUser.user || refresh) {
    cacheUser.user = new Promise(async (resolve, reject) =&gt; {
      // ...
    });
  }
  return cacheUser.user;
};
</code></pre>
<p><strong>\u6B63\u786E\u505A\u6CD5\uFF1A</strong>
\u5728\u7EC4\u4EF6\u751F\u547D\u5468\u671F\u4E8B\u4EF6\uFF08\u5982 <code>onLoad</code>\uFF09\u4E2D\u521D\u59CB\u5316\u7279\u5B9A\u4E8E\u7528\u6237\u7684\u6570\u636E\uFF0C\u8FD9\u4E9B\u4E8B\u4EF6\u4EC5\u5728\u5BA2\u6237\u7AEF\u6267\u884C\u3002</p>
<pre><code class="language-tsx">const cacheUser: { user: null | Promise&lt;UserInfoType | null&gt; } = { user: null };
export const UserInfo = (props?: any) =&gt; {
  const ref: RefProps = {
    onLoad: async () =&gt; {
      // \u5728\u6B64\u5904\u8D4B\u503C\u5BF9\u4E8E\u5BA2\u6237\u7AEF\u662F\u5B89\u5168\u7684
      cacheUser.user = ...
    },
  };
  return (
    &lt;div css={css} class=&#39;user-info-box&#39; ref={ref}&gt;
      ...
    &lt;/div&gt;
  );
};
</code></pre>
`;var jg=`<h1 id="\u4E86\u89E3-lupine-js"><a class="header-anchor" href="#\u4E86\u89E3-lupine-js">#</a>\u4E86\u89E3 Lupine.js</h1><p>Lupine.js \u662F\u4E00\u4E2A\u5305\u542B\u524D\u540E\u7AEF\u670D\u52A1\u7684\u5168\u529F\u80FD Web \u5E94\u7528\u7A0B\u5E8F\u6846\u67B6\u3002</p>
<ul>
<li><strong>\u524D\u7AEF (Front-End)</strong>: <code>lupine.web</code> \u662F\u4E00\u4E2A\u6781\u5176\u8F7B\u91CF\u7EA7\u7684\u6846\u67B6\uFF0C\u4F7F\u7528 React TSX \u8BED\u6CD5\uFF0C\u8BA9\u719F\u6089 React \u7684\u5F00\u53D1\u8005\u96F6\u6210\u672C\u4E0A\u624B\u3002</li>
<li><strong>\u540E\u7AEF (Back-End)</strong>: <code>lupine.api</code> \u662F\u4E00\u4E2A\u9AD8\u6548\u4E14\u7CBE\u7B80\u7684\u6846\u67B6\uFF08\u7C7B\u4F3C Express\uFF09\uFF0C\u4ECE\u5E95\u5C42\u539F\u751F\u652F\u6301\u670D\u52A1\u7AEF\u6E32\u67D3 (SSR)\u3002</li>
<li><strong>\u5168\u5E73\u53F0</strong>: \u901A\u8FC7 Capacitor \u548C Electron\uFF0C\u4EC5\u9700\u7EF4\u62A4\u4E00\u4EFD\u4EE3\u7801\uFF0C\u5373\u53EF\u540C\u65F6\u53D1\u5E03 Web\u3001iOS\u3001Android \u548C\u684C\u9762\u7AEF\u5E94\u7528\u7A0B\u5E8F\u3002</li>
</ul>
<h2 id="\u6838\u5FC3\u7279\u6027-core-essentials"><a class="header-anchor" href="#\u6838\u5FC3\u7279\u6027-core-essentials">#</a>\u6838\u5FC3\u7279\u6027 (Core Essentials)</h2><p>Lupine.js \u7684\u8BBE\u8BA1\u54F2\u5B66\u662F<strong>\u7B80\u5355</strong>\u4E0E<strong>\u9AD8\u6027\u80FD</strong>\u3002\u4EE5\u4E0B\u662F\u6211\u4EEC\u5F15\u4EE5\u4E3A\u50B2\u7684\u6838\u5FC3\u529F\u80FD\uFF1A</p>
<h3 id="\u670D\u52A1\u7AEF\u6E32\u67D3-ssr-\u4F18\u5148-essentials-ssr"><a class="header-anchor" href="#\u670D\u52A1\u7AEF\u6E32\u67D3-ssr-\u4F18\u5148-essentials-ssr">#</a><a href="javascript:lpPressLoad('/zh/essentials/ssr')">\u26A1 \u670D\u52A1\u7AEF\u6E32\u67D3 (SSR) \u4F18\u5148</a></h3><p>Lupine \u4ECE\u4E00\u5F00\u59CB\u5C31\u662F\u4E3A SSR \u8BBE\u8BA1\u7684\u3002\u5B83\u81EA\u52A8\u5904\u7406\u6837\u5F0F\u6CE8\u5165\u3001SEO \u5143\u6570\u636E\u548C\u72B6\u6001\u6CE8\u6C34\uFF0C\u786E\u4FDD\u4F60\u7684\u5E94\u7528\u62E5\u6709\u6781\u81F4\u7684\u9996\u5C4F\u52A0\u8F7D\u901F\u5EA6\u548C\u641C\u7D22\u5F15\u64CE\u53CB\u597D\u6027\u3002</p>
<h3 id="\u5185\u7F6E-css-in-js-essentials-css-in-js"><a class="header-anchor" href="#\u5185\u7F6E-css-in-js-essentials-css-in-js">#</a><a href="javascript:lpPressLoad('/zh/essentials/css-in-js')">\u{1F3A8} \u5185\u7F6E CSS-in-JS</a></h3><p>\u544A\u522B\u590D\u6742\u7684 CSS \u914D\u7F6E\u3002Lupine \u5185\u7F6E\u4E86\u5F3A\u5927\u7684\u6837\u5F0F\u7CFB\u7EDF\uFF0C\u652F\u6301\u4F5C\u7528\u57DF\u6837\u5F0F\u3001\u5D4C\u5957\u9009\u62E9\u5668\u3001\u5A92\u4F53\u67E5\u8BE2\u548C\u52A8\u6001\u6837\u5F0F\uFF0C\u5B8C\u5168\u65E0\u8FD0\u884C\u65F6\u8D1F\u62C5\u3002</p>
<h3 id="\u5F3A\u5927\u7684\u9875\u9762\u8DEF\u7531-essentials-page-route"><a class="header-anchor" href="#\u5F3A\u5927\u7684\u9875\u9762\u8DEF\u7531-essentials-page-route">#</a><a href="javascript:lpPressLoad('/zh/essentials/page-route')">\u{1F6E3}\uFE0F \u5F3A\u5927\u7684\u9875\u9762\u8DEF\u7531</a></h3><p>\u4E00\u4E2A\u7075\u6D3B\u7684\u51FD\u6570\u5F0F\u8DEF\u7531\u7CFB\u7EDF\uFF0C\u652F\u6301\u5D4C\u5957\u8DEF\u7531\u3001\u8DEF\u7531\u5B88\u536B\u3001\u53C2\u6570\u89E3\u6790\u548C\u4E2D\u95F4\u4EF6\uFF0C\u4E3A\u6784\u5EFA\u590D\u6742\u7684\u5355\u9875\u5E94\u7528 (SPA) \u63D0\u4F9B\u4E86\u575A\u5B9E\u57FA\u7840\u3002</p>
<h3 id="\u4E3B\u9898\u7CFB\u7EDF-essentials-theme"><a class="header-anchor" href="#\u4E3B\u9898\u7CFB\u7EDF-essentials-theme">#</a><a href="javascript:lpPressLoad('/zh/essentials/theme')">\u{1F317} \u4E3B\u9898\u7CFB\u7EDF</a></h3><p>\u5F00\u7BB1\u5373\u7528\u7684\u4E3B\u9898\u652F\u6301\uFF08\u4EAE\u8272/\u6697\u8272\u6A21\u5F0F\uFF09\u3002Lupine \u786E\u4FDD\u5728 SSR \u9636\u6BB5\u5C31\u6CE8\u5165\u6B63\u786E\u7684\u4E3B\u9898\u53D8\u91CF\uFF0C\u5F7B\u5E95\u6D88\u9664\u4E86\u9875\u9762\u52A0\u8F7D\u65F6\u7684\u201C\u6837\u5F0F\u95EA\u70C1\u201D (FOUC) \u95EE\u9898\u3002</p>
<h3 id="\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3-essentials-list"><a class="header-anchor" href="#\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3-essentials-list">#</a><a href="javascript:lpPressLoad('/zh/essentials/list')">\u{1F4DD} \u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3</a></h3><p>\u72EC\u521B\u7684 Spot-Update \u6280\u672F\uFF0C\u4F7F\u5F97\u5728\u6E32\u67D3\u548C\u7F16\u8F91\u5927\u578B\u5217\u8868\u65F6\uFF0C\u80FD\u591F\u76F4\u63A5\u66F4\u65B0 DOM \u8282\u70B9\uFF0C\u800C\u65E0\u9700\u89E6\u53D1\u6602\u8D35\u7684 React \u865A\u62DF DOM \u91CD\u8BA1\u7B97\u3002</p>
<h3 id="\u5168\u6808\u5F00\u53D1\u4F53\u9A8C-essentials-api"><a class="header-anchor" href="#\u5168\u6808\u5F00\u53D1\u4F53\u9A8C-essentials-api">#</a><a href="javascript:lpPressLoad('/zh/essentials/api')">\u{1F4E1} \u5168\u6808\u5F00\u53D1\u4F53\u9A8C</a></h3><p>\u524D\u540E\u7AEF\u4E00\u4F53\u5316\u8BBE\u8BA1\u3002<code>lupine.api</code> \u63D0\u4F9B\u4E86\u6781\u7B80\u7684 API \u5B9A\u4E49\u65B9\u5F0F\uFF0C\u4E0E\u524D\u7AEF\u914D\u5408\u65E0\u95F4\uFF0C\u8BA9\u5168\u6808\u5F00\u53D1\u53D8\u5F97\u524D\u6240\u672A\u6709\u7684\u7B80\u5355\u3002</p>
<h3 id="ai-\u8F85\u52A9\u5F00\u53D1"><a class="header-anchor" href="#ai-\u8F85\u52A9\u5F00\u53D1">#</a>\u{1F916} AI \u8F85\u52A9\u5F00\u53D1</h3><p>\u6211\u4EEC\u5728\u9879\u76EE\u6839\u76EE\u5F55\u63D0\u4F9B\u4E86\u4E00\u4E2A\u4E13\u5C5E\u7684 <code>AI_CONTEXT.md</code> \u6587\u4EF6\u3002\u5F53\u8BF7\u6C42 AI \u4E3A\u672C\u9879\u76EE\u7F16\u5199\u4EE3\u7801\u65F6\uFF0C\u8BF7\u5148\u5C06\u6B64\u6587\u4EF6\u63D0\u4F9B\u7ED9 AI\u3002\u5176\u4E2D\u5305\u542B\u4E86 Lupine.js \u72EC\u6709\u7684\u5173\u952E\u89C4\u5219\uFF08\u4F8B\u5982\u201C\u7981\u7528 React Hooks\u201D\uFF09\u548C\u8BBE\u8BA1\u6A21\u5F0F\u3002</p>
<h4 id="\u63D0\u793A\u8BCD\u793A\u4F8B-example-prompt"><a class="header-anchor" href="#\u63D0\u793A\u8BCD\u793A\u4F8B-example-prompt">#</a>\u63D0\u793A\u8BCD\u793A\u4F8B (Example Prompt)</h4><blockquote>
<p>&quot;\u8BF7\u5148\u9605\u8BFB <code>AI_CONTEXT.md</code>\u3002\u521B\u5EFA\u4E00\u4E2A\u2018\u7528\u6237\u8D44\u6599\u2019\u7EC4\u4EF6\uFF0C\u5305\u542B\u6807\u51C6\u7684\u8BBE\u7F6E\u5217\u8868\uFF08\u5934\u50CF\u3001\u59D3\u540D\u3001\u90AE\u7BB1\uFF09\u548C\u4E00\u4E2A\u4FDD\u5B58\u6309\u94AE\u3002&quot;</p>
</blockquote>
`;var Bg="";var Og=`<h1 id="api-module-src-api"><a class="header-anchor" href="#api-module-src-api">#</a>API Module (<code>src/api</code>)</h1><p>API \u6A21\u5757\u63D0\u4F9B\u4E86\u7F16\u5199\u5E94\u7528\u7A0B\u5E8F\u4E1A\u52A1\u903B\u8F91\u7684\u6846\u67B6\u3002\u5B83\u7684\u4F5C\u7528\u7C7B\u4F3C\u4E8E Express.js\uFF0C\u4F46\u9488\u5BF9 lupine \u751F\u6001\u7CFB\u7EDF\u8FDB\u884C\u4E86\u4F18\u5316\u3002</p>
<h2 id="\u4E3B\u8981\u7279\u6027-key-features"><a class="header-anchor" href="#\u4E3B\u8981\u7279\u6027-key-features">#</a>\u4E3B\u8981\u7279\u6027 (Key Features)</h2><ul>
<li><strong>ApiRouter</strong>: \u4E00\u4E2A\u7075\u6D3B\u7684\u8DEF\u7531\u5668\uFF0C\u652F\u6301 GET\u3001POST \u8BF7\u6C42\u4EE5\u53CA\u7C7B\u4F3C\u4E2D\u95F4\u4EF6\u7684\u8FC7\u6EE4\u5668\u3002</li>
<li><strong>\u4E0A\u4E0B\u6587\u9694\u79BB (Context Isolation)</strong>: \u4F7F\u7528 <code>AsyncStorage</code> \u5728\u5F02\u6B65\u64CD\u4F5C\u4E2D\u5B89\u5168\u5730\u7BA1\u7406\u8BF7\u6C42\u8303\u56F4\u7684\u6570\u636E\uFF08\u5982\u4F1A\u8BDD\u6216\u6570\u636E\u5E93\u4E8B\u52A1\uFF09\u3002</li>
<li><strong>\u6570\u636E\u5E93\u96C6\u6210 (Database Integration)</strong>: \u5185\u7F6E\u7684\u6570\u636E\u5E93\u8FDE\u63A5\u52A9\u624B\uFF08\u4F8B\u5982\uFF0C\u901A\u8FC7 <code>better-sqlite3</code> \u8FDE\u63A5 SQLite\uFF09\u3002</li>
</ul>
<h2 id="\u4F7F\u7528\u793A\u4F8B-usage-example"><a class="header-anchor" href="#\u4F7F\u7528\u793A\u4F8B-usage-example">#</a>\u4F7F\u7528\u793A\u4F8B (Usage Example)</h2><p>\u5E94\u7528\u7A0B\u5E8F\u7684 API \u5165\u53E3\u70B9\uFF08\u4F8B\u5982 <code>apps/demo.app/api/src/index.ts</code>\uFF09\u901A\u5E38\u5BFC\u51FA <code>ApiModule</code> \u7684\u4E00\u4E2A\u5B9E\u4F8B\u3002</p>
<p><strong>1. \u5165\u53E3\u70B9 (<code>index.ts</code>):</strong></p>
<pre><code class="language-typescript">import { ApiModule } from &#39;lupine.api&#39;;
import { RootApi } from &#39;./service/root-api&#39;;

// \u5BFC\u51FA apiModule \u4EE5\u4FBF\u670D\u52A1\u5668\u52A8\u6001\u52A0\u8F7D
export const apiModule = new ApiModule(new RootApi());
</code></pre>
<p><strong>2. \u6839 API \u670D\u52A1 (<code>service/root-api.ts</code>):</strong></p>
<pre><code class="language-typescript">import { ApiRouter, IApiBase, IApiRouter } from &#39;lupine.api&#39;;

export class RootApi implements IApiBase {
  getRouter(): IApiRouter {
    const router = new ApiRouter();

    // \u5B9A\u4E49\u8DEF\u7531
    router.get(&#39;/hello&#39;, async (req, res) =&gt; {
      res.write(JSON.stringify({ message: &#39;Hello World&#39; }));
      res.end();
      return true; // \u8FD4\u56DE true \u8868\u793A\u8BF7\u6C42\u5DF2\u88AB\u5904\u7406
    });

    // \u53EF\u4EE5\u6302\u8F7D\u5B50\u8DEF\u7531\u5668
    // router.use(&#39;/users&#39;, new UserApi().getRouter());

    return router;
  }
}
</code></pre>
`;var Fg=`<h1 id="server-src-app"><a class="header-anchor" href="#server-src-app">#</a>Server (<code>src/app</code>)</h1><p>\u670D\u52A1\u5668\u7EC4\u4EF6\u8D1F\u8D23\u5904\u7406\u4F20\u5165\u7684\u7F51\u7EDC\u8BF7\u6C42\uFF0C\u7BA1\u7406 SSL \u8BC1\u4E66\uFF0C\u5E76\u6839\u636E\u57DF\u540D\u914D\u7F6E\u5C06\u8BF7\u6C42\u5206\u53D1\u5230\u76F8\u5E94\u7684\u5E94\u7528\u7A0B\u5E8F\u3002\u5B83\u652F\u6301\u96C6\u7FA4\u903B\u8F91\uFF0C\u4EE5\u9AD8\u6548\u5229\u7528\u591A\u6838 CPU\u3002</p>
<h2 id="\u4E3B\u8981\u7279\u6027-key-features"><a class="header-anchor" href="#\u4E3B\u8981\u7279\u6027-key-features">#</a>\u4E3B\u8981\u7279\u6027 (Key Features)</h2><ul>
<li><strong>\u591A\u5E94\u7528\u548C\u591A\u57DF\u540D</strong>: \u5728\u5355\u4E2A\u670D\u52A1\u5668\u5B9E\u4F8B\u4E0A\u6258\u7BA1\u591A\u4E2A\u72EC\u7ACB\u7684\u5E94\u7528\u7A0B\u5E8F\uFF0C\u6839\u636E\u57DF\u540D\u8DEF\u7531\u6D41\u91CF\u3002</li>
<li><strong>\u96C6\u7FA4\u652F\u6301</strong>: \u81EA\u52A8 fork \u5DE5\u4F5C\u8FDB\u7A0B\u4EE5\u5339\u914D CPU \u6838\u5FC3\u6570\uFF0C\u5B9E\u73B0\u9AD8\u6027\u80FD\u3002</li>
<li><strong>SSL/TLS</strong>: \u5185\u7F6E\u652F\u6301\u5E26\u6709\u81EA\u5B9A\u4E49\u8BC1\u4E66\u8DEF\u5F84\u7684 HTTPS\u3002</li>
<li><strong>\u73AF\u5883\u7BA1\u7406</strong>: \u4ECE <code>.env</code> \u6587\u4EF6\u52A0\u8F7D\u914D\u7F6E\u3002</li>
</ul>
<h2 id="\u4F7F\u7528\u793A\u4F8B-usage-example"><a class="header-anchor" href="#\u4F7F\u7528\u793A\u4F8B-usage-example">#</a>\u4F7F\u7528\u793A\u4F8B (Usage Example)</h2><p>\u5B8C\u6574\u793A\u4F8B\u8BF7\u53C2\u89C1 <code>apps/server/src/index.ts</code>\u3002</p>
<pre><code class="language-typescript">import { appStart, loadEnv, ServerEnvKeys } from &#39;lupine.api&#39;;
import * as path from &#39;path&#39;;

const initAndStartServer = async () =&gt; {
  // 1. \u52A0\u8F7D\u73AF\u5883\u53D8\u91CF
  await loadEnv(&#39;.env&#39;);

  // 2. \u914D\u7F6E\u5E94\u7528\u7A0B\u5E8F
  const serverRootPath = path.resolve(process.env[ServerEnvKeys.SERVER_ROOT_PATH]!);
  const webRootMap = [
    {
      appName: &#39;demo.app&#39;,
      hosts: [&#39;localhost&#39;, &#39;example.com&#39;],
      // lupine.api \u671F\u671B\u7684\u6807\u51C6\u76EE\u5F55\u7ED3\u6784
      webPath: path.join(serverRootPath, &#39;demo.app_web&#39;),
      dataPath: path.join(serverRootPath, &#39;demo.app_data&#39;),
      apiPath: path.join(serverRootPath, &#39;demo.app_api&#39;),
      dbType: &#39;sqlite&#39;,
      dbConfig: { filename: &#39;sqlite3.db&#39; },
    },
  ];

  // 3. \u542F\u52A8\u670D\u52A1\u5668
  await appStart.start({
    debug: process.env.NODE_ENV === &#39;development&#39;,
    apiConfig: {
      serverRoot: serverRootPath,
      webHostMap: webRootMap,
    },
    serverConfig: {
      httpPort: 8080,
      httpsPort: 8443,
      // sslKeyPath: &#39;...&#39;,
      // sslCrtPath: &#39;...&#39;,
    },
  });
};

initAndStartServer();
</code></pre>
`;var qg=`<h1 id="lupine-api-dashboard"><a class="header-anchor" href="#lupine-api-dashboard">#</a>lupine.api dashboard</h1><p>\u8BF7\u53C2\u8003 <a href="javascript:lpPressLoad('/zh/essentials/dashboard')">Dashboard</a></p>
`;var Ng=`<h1 id="lupine-api"><a class="header-anchor" href="#lupine-api">#</a>lupine.api</h1><p>lupine.api is a fast, lightweight, and flexible node.js based server framework. It is designed to work seamlessly with <a href="https://github.com/uuware/lupine.web">lupine.web</a> to provide Server-Side Rendering (SSR) and modern API capabilities.</p>
<p>The project consists of two main parts:</p>
<ol>
<li><strong>Server (<code>src/app</code>)</strong>: A robust HTTP/HTTPS server that manages multiple applications, domains, and processes.</li>
<li><strong>API Module (<code>src/api</code>)</strong>: A framework for building the backend logic for individual applications.</li>
</ol>
<p>Explore the documentation:</p>
<ul>
<li><a href="javascript:lpPressLoad('/zh/lupine.api/app')">Server Architecture</a></li>
<li><a href="javascript:lpPressLoad('/zh/lupine.api/api')">API Framework</a></li>
<li><a href="javascript:lpPressLoad('/zh/lupine.api/dashboard')">Admin Dashboard</a></li>
</ul>
`;var Wg=`<h1 id="dateutils"><a class="header-anchor" href="#dateutils">#</a>DateUtils</h1><p>Comprehensive date manipulation utilities.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { DateUtils } from &#39;lupine.components&#39;;

const now = DateUtils.now();
const date = DateUtils.toDate(&#39;2023-01-01T12:00:00Z&#39;);
const ymd = DateUtils.toYMD(date, &#39;/&#39;); // 2023/01/01
const formatted = DateUtils.format(date, &#39;YYYY-MM-DD hh:mm:ss&#39;);

// Difference between two dates
const diff = DateUtils.diffString(new Date(), date);
console.log(diff); // e.g., &quot;2 day(s), 4 hour(s)&quot;
</code></pre>
`;var _g=`<h1 id="domutils"><a class="header-anchor" href="#domutils">#</a>DomUtils</h1><p>Helper functions for common DOM operations, mostly shorthand for <code>querySelector</code>.</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { DomUtils } from &#39;lupine.components&#39;;

// Get input value
const value = DomUtils.getValue(&#39;#my-input&#39;);

// Trigger click on a hidden file input
const fDom = DomUtils.bySelector(&#39;.up-file&#39;) as HTMLInputElement;
fDom.click();
</code></pre>
`;var Ug=`<h1 id="downloadstream"><a class="header-anchor" href="#downloadstream">#</a>downloadStream</h1><p>Download a <code>Blob</code> as a file by creating a temporary anchor tag.</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { downloadStream } from &#39;lupine.components&#39;;

const onDownload = async (name: string) =&gt; {
  const response = await fetch(&#39;/api/download?file=&#39; + name);
  const blob = await response.blob();
  downloadStream(blob, name);
};
</code></pre>
`;var $g=`<h1 id="dragutil"><a class="header-anchor" href="#dragutil">#</a>DragUtil</h1><p>Helper for implementing drag-and-drop or touch-move functionality.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { createDragUtil } from &#39;lupine.components&#39;;

const dragUtil = createDragUtil();
dragUtil.setOnMoveCallback((clientX, clientY, movedX, movedY) =&gt; {
  console.log(\`Moved by \${movedX}, \${movedY}\`);
  // Update element position here
});

// Bind to events
&lt;div onMouseDown={dragUtil.onMouseDown} onMouseMove={dragUtil.onMouseMove} onMouseUp={dragUtil.onMouseUp}&gt;
  Drag Me
&lt;/div&gt;;
</code></pre>
`;var Vg=`<h1 id="dynamicalload"><a class="header-anchor" href="#dynamicalload">#</a>DynamicalLoad</h1><p>Dynamically load external Scripts or CSS files. Used for lazy loading third-party SDKs.</p>
<p><strong>Usage Example (from <code>wx-share.ts</code>):</strong></p>
<pre><code class="language-typescript">import { DynamicalLoad } from &#39;lupine.components&#39;;

// Load WeChat JS-SDK dynamically
if (typeof wx === &#39;undefined&#39;) {
  await DynamicalLoad.loadScript(&#39;//res.wx.qq.com/open/js/jweixin-1.6.0.js&#39;, &#39;jweixin&#39;);
}
</code></pre>
`;var Gg=`<h1 id="formatbytes"><a class="header-anchor" href="#formatbytes">#</a>formatBytes</h1><p>Format file size in bytes into human-readable strings (KB, MB, GB, etc.).</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { formatBytes } from &#39;lupine.components&#39;;

const sizeStr = formatBytes(1024 * 1024 * 5); // &quot;5 MB&quot;
const sizeStr2 = formatBytes(123456); // &quot;120.56 KB&quot;
</code></pre>
`;var Yg=`<h1 id="lupine-components-libs"><a class="header-anchor" href="#lupine-components-libs">#</a>lupine.components libs</h1><p>This directory contains a suite of utility libraries designed for efficient web development.</p>
<h2 id="utilities"><a class="header-anchor" href="#utilities">#</a>Utilities</h2><ul>
<li><a href="javascript:lpPressLoad('/zh/lupine.components-libs/date-utils')">DateUtils</a></li>
<li><a href="javascript:lpPressLoad('/zh/lupine.components-libs/simple-storage')">SimpleStorage</a></li>
<li><a href="javascript:lpPressLoad('/zh/lupine.components-libs/dynamical-load')">DynamicalLoad</a></li>
<li><a href="javascript:lpPressLoad('/zh/lupine.components-libs/format-bytes')">formatBytes</a></li>
</ul>
<h2 id="dom-ui-helpers"><a class="header-anchor" href="#dom-ui-helpers">#</a>DOM &amp; UI Helpers</h2><ul>
<li><a href="javascript:lpPressLoad('/zh/lupine.components-libs/dom-utils')">DomUtils</a></li>
<li><a href="javascript:lpPressLoad('/zh/lupine.components-libs/lite-dom')">LiteDom</a></li>
<li><a href="javascript:lpPressLoad('/zh/lupine.components-libs/drag-util')">DragUtil</a></li>
</ul>
<h2 id="network-files"><a class="header-anchor" href="#network-files">#</a>Network &amp; Files</h2><ul>
<li><a href="javascript:lpPressLoad('/zh/lupine.components-libs/upload-file')">uploadFile</a></li>
<li><a href="javascript:lpPressLoad('/zh/lupine.components-libs/download-stream')">downloadStream</a></li>
</ul>
<h2 id="event-state"><a class="header-anchor" href="#event-state">#</a>Event &amp; State</h2><ul>
<li><a href="javascript:lpPressLoad('/zh/lupine.components-libs/message-hub')">MessageHub</a></li>
<li><a href="javascript:lpPressLoad('/zh/lupine.components-libs/observable')">Observable</a></li>
</ul>
`;var Jg=`<h1 id="litedom"><a class="header-anchor" href="#litedom">#</a>LiteDom</h1><p>A lightweight, chainable DOM wrapper similar to jQuery.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { LiteDom } from &#39;lupine.components&#39;;

const el = new LiteDom(&#39;#my-element&#39;);
el.css(&#39;color&#39;, &#39;red&#39;)
  .html(&#39;Hello World&#39;)
  .on(&#39;click&#39;, () =&gt; {
    console.log(&#39;Clicked!&#39;);
  });
</code></pre>
`;var Xg=`<h1 id="messagehub"><a class="header-anchor" href="#messagehub">#</a>MessageHub</h1><p>A publish-subscribe event bus for communication between components.</p>
<p><strong>Usage Example (from <code>admin-test-animations.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { MessageHub, MessageHubData } from &#39;lupine.components&#39;;

const hub = new MessageHub();

// Subscribe to messages
hub.subscribe(&#39;test-event&#39;, (data: any) =&gt; {
  console.log(&#39;Received:&#39;, data);
});

// Send message
hub.send(&#39;test-event&#39;, { text: &#39;Hello&#39; });
</code></pre>
`;var Kg=`<h1 id="observable"><a class="header-anchor" href="#observable">#</a>Observable</h1><p>Implementation of the Observable pattern, inspired by RxJS.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { Subject } from &#39;lupine.components&#39;;

const subject = new Subject&lt;string&gt;();

const subscription = subject.subscribe((value) =&gt; {
  console.log(&#39;Observer A received:&#39;, value);
});

subject.next(&#39;Hello&#39;);
subject.next(&#39;World&#39;);

subscription.unsubscribe();
</code></pre>
`;var Qg=`<h1 id="simplestorage"><a class="header-anchor" href="#simplestorage">#</a>SimpleStorage</h1><p>A wrapper for <code>localStorage</code> (or similar key-value storage) offering typed getters.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { SimpleStorage } from &#39;lupine.components&#39;;

// Assuming initialized with some storage object like localStorage
const storage = new SimpleStorage(localStorage as any);

storage.set(&#39;theme&#39;, &#39;dark&#39;);
const theme = storage.get(&#39;theme&#39;, &#39;light&#39;); // returns &#39;dark&#39;
const isDebug = storage.getBoolean(&#39;debug&#39;, false);
</code></pre>
`;var Zg=`<h1 id="uploadfile"><a class="header-anchor" href="#uploadfile">#</a>uploadFile</h1><p>Handle file uploads with chunking support, progress tracking, and retries.</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { uploadFile } from &#39;lupine.components&#39;;

const onUploadProgress = (percentage: number, chunkNumber: number, totalChunks: number) =&gt; {
  console.log(\`Progress: \${percentage * 100}%\`);
};

const onFileChange = async (e: Event) =&gt; {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const result = await uploadFile(file, &#39;/api/upload?name=&#39; + file.name, onUploadProgress);

  if (result === true) {
    console.log(&#39;Upload success&#39;);
  }
};
</code></pre>
`;var eh=`<h1 id="action-sheet-\u52A8\u4F5C\u5217\u8868"><a class="header-anchor" href="#action-sheet-\u52A8\u4F5C\u5217\u8868">#</a>Action Sheet (\u52A8\u4F5C\u5217\u8868)</h1><p>\u624B\u673A\u7AEF\u5F39\u51FA\u7684\u6ED1\u52A8\u7A97\u53E3\uFF0C\u7528\u4E8E\u663E\u793A\u4E00\u4E2A\u65B0\u9875\u6216\u8BBE\u5B9A\u9009\u9879\u7B49\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { ActionSheetSelect, NotificationMessage, NotificationColor } from &#39;lupine.components&#39;;

ActionSheetSelect.show({
  title: &#39;\u9009\u62E9\u64CD\u4F5C&#39;,
  options: [&#39;\u9009\u9879 A&#39;, &#39;\u9009\u9879 B&#39;, &#39;\u9009\u9879 C&#39;],
  handleClicked: (index, close) =&gt; {
    NotificationMessage.sendMessage(&#39;\u60A8\u9009\u62E9\u4E86: &#39; + index, NotificationColor.Success);
    close();
  },
});
</code></pre>
`;var th=`<h1 id="button-\u6309\u94AE"><a class="header-anchor" href="#button-\u6309\u94AE">#</a>Button (\u6309\u94AE)</h1><p>\u57FA\u7840\u6309\u94AE\uFF0C\u652F\u6301\u591A\u79CD\u5C3A\u5BF8\u548C <code>button-push</code> \u52A8\u753B\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Button, ButtonSize } from &#39;lupine.components&#39;;

// \u4E0D\u540C\u5C3A\u5BF8\u7684\u6309\u94AE
&lt;Button text=&#39;\u63D0\u4EA4&#39; size={ButtonSize.Large} onClick={() =&gt; {}} /&gt;
&lt;Button text=&#39;\u641C\u7D22&#39; size={ButtonSize.Medium} onClick={() =&gt; {}} /&gt;
&lt;Button text=&#39;\u53D6\u6D88&#39; size={ButtonSize.Small} onClick={() =&gt; {}} /&gt;
</code></pre>
`;var oh=`<h1 id="dragfresh-\u62D6\u52A8\u5237\u65B0"><a class="header-anchor" href="#dragfresh-\u62D6\u52A8\u5237\u65B0">#</a>DragFresh (\u62D6\u52A8\u5237\u65B0)</h1><p>\u62D6\u52A8\u5237\u65B0\u7EC4\u4EF6\uFF0C\u5E38\u7528\u4E8E\u79FB\u52A8\u7AEF\u5217\u8868\u9876\u90E8\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { DragFresh } from &#39;lupine.components&#39;;

&lt;DragFresh
  onRefresh={async () =&gt; {
    // \u6267\u884C\u5237\u65B0\u903B\u8F91
    await fetchData();
  }}
&gt;
  &lt;ListContent /&gt;
&lt;/DragFresh&gt;;
</code></pre>
`;var nh=`<h1 id="editablelabel-\u53EF\u7F16\u8F91\u6807\u7B7E"><a class="header-anchor" href="#editablelabel-\u53EF\u7F16\u8F91\u6807\u7B7E">#</a>EditableLabel (\u53EF\u7F16\u8F91\u6807\u7B7E)</h1><p>\u53CC\u51FB\u53EF\u7F16\u8F91\u7684\u6807\u7B7E\uFF0C\u5149\u6807\u79FB\u51FA\uFF08\u5931\u7126\uFF09\u65F6\u89E6\u53D1\u4FDD\u5B58\u4E8B\u4EF6\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { EditableLabel } from &#39;lupine.components&#39;;

&lt;EditableLabel
  value=&#39;\u70B9\u51FB\u6211\u8BD5\u8BD5&#39;
  onSave={(newValue) =&gt; {
    console.log(&#39;\u4FDD\u5B58\u65B0\u5185\u5BB9:&#39;, newValue);
  }}
/&gt;;
</code></pre>
`;var ih=`<h1 id="floatwindow-\u6D6E\u7A97"><a class="header-anchor" href="#floatwindow-\u6D6E\u7A97">#</a>FloatWindow (\u6D6E\u7A97)</h1><p>\u4E00\u4E2A\u53EF\u4EE5\u62D6\u52A8\u7684\u5F39\u51FA\u7A97\u53E3\u3002\u652F\u6301 Modal \u548C\u975E Modal \u6A21\u5F0F\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { FloatWindow } from &#39;lupine.components&#39;;

// \u663E\u793A\u4E00\u4E2A\u975E Modal \u7A97\u53E3
FloatWindow.show({
  title: &#39;\u5DE5\u5177\u7BB1&#39;,
  buttons: [&#39;OK&#39;],
  handleClicked: (index, close) =&gt; {
    close();
  },
  children: &lt;div&gt;\u8FD9\u662F\u4E00\u4E2A\u975E Modal \u7684\u6D6E\u52A8\u7A97\u53E3\u5185\u5BB9\u3002&lt;/div&gt;,
  noModal: true,
});
</code></pre>
`;var rh=`<h1 id="grid-\u7F51\u683C"><a class="header-anchor" href="#grid-\u7F51\u683C">#</a>Grid (\u7F51\u683C)</h1><p>\u54CD\u5E94\u5F0F\u7F51\u683C\u5E03\u5C40\uFF0C\u7528\u4E8E\u663E\u793A\u590D\u6742\u5E03\u5C40\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Grid } from &#39;lupine.components&#39;;

&lt;Grid columns={3} gap=&#39;10px&#39;&gt;
  &lt;div&gt;\u9879 1&lt;/div&gt;
  &lt;div&gt;\u9879 2&lt;/div&gt;
  &lt;div&gt;\u9879 3&lt;/div&gt;
&lt;/Grid&gt;;
</code></pre>
`;var ah=`<h1 id="htmlload-html-\u52A0\u8F7D"><a class="header-anchor" href="#htmlload-html-\u52A0\u8F7D">#</a>HtmlLoad (HTML \u52A0\u8F7D)</h1><p>\u7528\u4E8E\u5F02\u6B65\u52A0\u8F7D\u5E76\u663E\u793A\u8FDC\u7A0B HTML \u5185\u5BB9\u7684\u7EC4\u4EF6\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { HtmlLoad } from &#39;lupine.components&#39;;

&lt;HtmlLoad url=&#39;/api/v1/content/article-1&#39; /&gt;;
</code></pre>
`;var sh=`<h1 id="htmlvar"><a class="header-anchor" href="#htmlvar">#</a>HtmlVar</h1><p><code>HtmlVar</code> \u662F Lupine.js \u54CD\u5E94\u5F0F\u7CFB\u7EDF\u7684\u6838\u5FC3\u539F\u8BED\u3002\u4E0E\u8BD5\u56FE\u81EA\u52A8\u68C0\u6D4B\u72B6\u6001\u53D8\u5316\u7684\u73B0\u4EE3\u6846\u67B6\u4E0D\u540C\uFF0C<code>HtmlVar</code> \u63D0\u4F9B\u4E86\u4E00\u4E2A\u624B\u52A8\u7684\u201C\u53E5\u67C4 (Handle)\u201D\uFF0C\u8BA9\u4F60\u53EF\u4EE5\u968F\u65F6\u66F4\u65B0\u7279\u5B9A\u7684 DOM \u63D2\u69FD\u3002</p>
<h2 id="1-\u6B63\u786E\u7528\u6CD5"><a class="header-anchor" href="#1-\u6B63\u786E\u7528\u6CD5">#</a>1. \u6B63\u786E\u7528\u6CD5</h2><p><code>HtmlVar</code> \u5E76\u4E0D\u662F\u4E00\u4E2A\u50CF <code>&lt;HtmlVar /&gt;</code> \u90A3\u6837\u53BB\u6E32\u67D3\u7684\u7EC4\u4EF6\uFF0C\u800C\u662F\u4E00\u4E2A\u4F60\u9700\u8981\u5B9E\u4F8B\u5316\u7684 <strong>\u7C7B (Class)</strong>\u3002</p>
<ol>
<li>\u521B\u5EFA\u4E00\u4E2A\u5B9E\u4F8B\uFF1A<code>const dom = new HtmlVar(initialValue)</code>\u3002</li>
<li>\u5C06\u5176\u8282\u70B9\u5D4C\u5165\u5230 JSX \u4E2D\uFF1A<code>{dom.node}</code>\u3002</li>
<li>\u663E\u5F0F\u5730\u66F4\u65B0\u5B83\uFF1A<code>dom.value = newValue</code>\u3002</li>
</ol>
<h3 id="\u793A\u4F8B"><a class="header-anchor" href="#\u793A\u4F8B">#</a>\u793A\u4F8B</h3><pre><code class="language-tsx">import { HtmlVar, RefProps } from &#39;lupine.components&#39;;

const TestButton = () =&gt; {
  // 1. \u521B\u5EFA\u54CD\u5E94\u5F0F\u53D8\u91CF
  const dom = new HtmlVar(&#39;&#39;);

  // 2. \u5B9A\u4E49\u66F4\u65B0\u5B83\u7684\u64CD\u4F5C
  const onClick = async () =&gt; {
    // \u8FD9\u4F1A\u5BF9\u4E0B\u65B9\u7684 DOM \u5143\u7D20\u89E6\u53D1\u201C\u70B9\u5BF9\u70B9\u66F4\u65B0 (Spot Update)\u201D
    dom.value = &#39;\u4F60\u70B9\u51FB\u4E86\u6309\u94AE\u3002&#39;;
  };

  const ref: RefProps = {
    onLoad: async () =&gt; {
      dom.value = &#39;\u8FD9\u4E2A\u503C\u662F\u5728 onLoad \u4E8B\u4EF6\u4E2D\u8BBE\u7F6E\u7684\u3002&#39;;
    },
  };

  return (
    &lt;div ref={ref} class=&#39;row-box pt-m&#39;&gt;
      &lt;button onClick={onClick} class=&#39;button-base&#39;&gt;
        \u70B9\u6211\uFF01
      &lt;/button&gt;
      {/* 3. \u5728\u8FD9\u91CC\u653E\u7F6E &quot;\u951A\u70B9&quot; */}
      &lt;div class=&#39;pl-m&#39;&gt;{dom.node}&lt;/div&gt;
    &lt;/div&gt;
  );
};
</code></pre>
<h2 id="2-\u4E0E\u73B0\u4EE3\u6846\u67B6\u7684\u5BF9\u6BD4"><a class="header-anchor" href="#2-\u4E0E\u73B0\u4EE3\u6846\u67B6\u7684\u5BF9\u6BD4">#</a>2. \u4E0E\u73B0\u4EE3\u6846\u67B6\u7684\u5BF9\u6BD4</h2><p>\u5982\u679C\u4F60\u6765\u81EA React\u3001Vue \u6216 SolidJS \u80CC\u666F\uFF0C\u8FD9\u770B\u8D77\u6765\u53EF\u80FD\u7A0D\u5FAE\u7E41\u7410\u4E00\u4E9B\u3002</p>
<table>
<thead>
<tr>
<th align="left">\u6846\u67B6</th>
<th align="left">\u673A\u5236</th>
<th align="left">\u4EE3\u7801\u8BED\u6CD5</th>
</tr>
</thead>
<tbody><tr>
<td align="left"><strong>React</strong></td>
<td align="left">\u865A\u62DF DOM Diff (Virtual DOM Diffing)</td>
<td align="left"><code>const [val, setVal] = useState(0);</code></td>
</tr>
<tr>
<td align="left"><strong>SolidJS</strong></td>
<td align="left">\u7EC6\u7C92\u5EA6\u4FE1\u53F7 (Fine-Grained Signals)</td>
<td align="left"><code>const [val, setVal] = createSignal(0);</code></td>
</tr>
<tr>
<td align="left"><strong>Lupine.js</strong></td>
<td align="left"><strong>\u624B\u52A8\u5B9A\u70B9\u66FF\u6362 (Manual Spot Replacement)</strong></td>
<td align="left"><code>const val = new HtmlVar(0); val.value = 1;</code></td>
</tr>
</tbody></table>
<p><strong>\u6743\u8861 (The Trade-off):</strong></p>
<ul>
<li><strong>\u73B0\u4EE3\u6846\u67B6</strong>\uFF1A\u4E13\u6CE8\u4E8E\u201C\u5F00\u53D1\u8005\u4F53\u9A8C (DX)\u201D\u3002\u4F60\u6539\u53D8\u72B6\u6001\uFF0C\u9B54\u6CD5\u81EA\u52A8\u53D1\u751F\u3002</li>
<li><strong>Lupine.js</strong>\uFF1A\u4E13\u6CE8\u4E8E\u201C\u663E\u5F0F\u6027\u80FD\u201D\u3002\u4F60\u660E\u786E\u544A\u8BC9\u6D4F\u89C8\u5668 <em>\u54EA\u4E00\u4E2A</em> <code>&lt;div&gt;</code> \u9700\u8981\u66F4\u65B0\u3002\u6CA1\u6709\u731C\u6D4B\uFF0C\u4E5F\u4E0D\u4F1A\u6709\u610F\u5916\u7684\u91CD\u6E32\u67D3\u3002</li>
</ul>
<h2 id="3-\u63A8\u8350\u7684\u8F85\u52A9\u51FD\u6570-val-t"><a class="header-anchor" href="#3-\u63A8\u8350\u7684\u8F85\u52A9\u51FD\u6570-val-t">#</a>3. \u63A8\u8350\u7684\u8F85\u52A9\u51FD\u6570\uFF1A<code>val&lt;T&gt;</code></h2><p>\u5982\u679C\u4F60\u66F4\u559C\u6B22\u201C\u4FE1\u53F7 (Signals)\u201D\u7684\u73B0\u4EE3\u8BED\u6CD5\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528 <code>val</code> \u8F85\u52A9\u51FD\u6570\u3002\u5B83\u5728\u529F\u80FD\u4E0A\u4E0E <code>HtmlVar</code> \u5B8C\u5168\u76F8\u540C\uFF0C\u4F46\u63D0\u4F9B\u4E86\u4E00\u79CD\u8BA9\u4EBA\u611F\u89C9\u50CF\u201C\u81EA\u52A8\u66F4\u65B0\u201D\u7684\u8BED\u6CD5\u7CD6\u3002</p>
<pre><code class="language-tsx">// 1. \u5B9A\u4E49\u8F85\u52A9\u51FD\u6570\uFF08\u6216\u4ECE lib \u4E2D\u5BFC\u5165\uFF09
export function val&lt;T&gt;(initial: T) {
  const internal = new HtmlVar(initial);
  // Getter
  const signal = () =&gt; internal.value;
  // Setter
  signal.set = (v: T) =&gt; {
    internal.value = v;
  };
  // Renderable Node
  signal.jsx = () =&gt; internal.node;
  return signal;
}

// 2. \u7528\u6CD5
const Counter = () =&gt; {
  const count = val(0);

  return (
    &lt;div&gt;
      &lt;button onclick={() =&gt; count.set(count() + 1)}&gt;\u589E\u52A0&lt;/button&gt;

      {/* \u770B\u8D77\u6765\u50CF\u73B0\u4EE3\u6846\u67B6\uFF01 */}
      &lt;span&gt;{count.jsx()}&lt;/span&gt;
    &lt;/div&gt;
  );
};
</code></pre>
<p>\u4E8B\u5B9E\u4E0A\uFF0C\u65E0\u8BBA\u4F60\u76F4\u63A5\u4F7F\u7528 <code>HtmlVar</code> \u7C7B\u8FD8\u662F <code>val()</code> \u5305\u88C5\u5668\uFF0C\u5176\u5E95\u5C42\u673A\u5236\u90FD\u662F\u4E00\u6837\u7684\uFF1A<strong>\u5BF9\u5916\u79D1\u624B\u672F\u822C\u7CBE\u51C6\u7684 DOM \u7247\u6BB5\u8FDB\u884C\u66F4\u65B0\uFF0C\u800C\u65E0\u9700 Diff\u3002</strong></p>
`;var lh=`<h1 id="lupine-components"><a class="header-anchor" href="#lupine-components">#</a>lupine.components</h1><p>lupine.components \u662F\u4E00\u4E2A\u7C7B\u4F3C\u4E8E React \u7684\u3001\u901F\u5EA6\u6781\u5FEB\u3001\u4F53\u79EF\u5C0F\u5DE7\u4E14\u8F7B\u91CF\u7EA7\u7684 lupine.web \u524D\u7AEF\u7EC4\u4EF6\u96C6\u5408\u3002
\u5B83\u5305\u542B\u4E30\u5BCC\u7684\u5E38\u7528\u684C\u9762\u548C\u79FB\u52A8\u7EC4\u4EF6\uFF0C\u65E8\u5728\u4E3A\u5F00\u53D1\u8005\u63D0\u4F9B\u9AD8\u6027\u80FD\u7684 UI \u89E3\u51B3\u65B9\u6848\u3002</p>
<h2 id="\u6838\u5FC3\u7279\u6027"><a class="header-anchor" href="#\u6838\u5FC3\u7279\u6027">#</a>\u6838\u5FC3\u7279\u6027</h2><ul>
<li><strong>\u6781\u81F4\u8F7B\u91CF</strong>\uFF1A\u65E0\u5197\u4F59\u4EE3\u7801\uFF0C\u786E\u4FDD\u5E94\u7528\u52A0\u8F7D\u901F\u5EA6\u3002</li>
<li><strong>React \u8BED\u6CD5\u9A71\u52A8</strong>\uFF1A\u652F\u6301 TSX \u8BED\u6CD5\uFF0C\u5F00\u53D1\u4F53\u9A8C\u4E1D\u6ED1\u3002</li>
<li><strong>\u8DE8\u7AEF\u9002\u914D</strong>\uFF1A\u7EC4\u4EF6\u539F\u751F\u652F\u6301\u684C\u9762\u7AEF\u4E0E\u79FB\u52A8\u7AEF\u7684\u54CD\u5E94\u5F0F\u4EA4\u4E92\u3002</li>
<li><strong>\u96F6\u4F9D\u8D56</strong>\uFF1A\u4FDD\u6301\u4F9D\u8D56\u6811\u7B80\u6D01\uFF0C\u6613\u4E8E\u7EF4\u62A4\u548C\u90E8\u7F72\u3002</li>
</ul>
<h2 id="\u5FEB\u901F\u6D4F\u89C8"><a class="header-anchor" href="#\u5FEB\u901F\u6D4F\u89C8">#</a>\u5FEB\u901F\u6D4F\u89C8</h2><p>\u60A8\u53EF\u4EE5\u901A\u8FC7\u5DE6\u4FA7\u8FB9\u680F\u6D4F\u89C8\u5404\u7C7B\u7EC4\u4EF6\u7684\u8BE6\u7EC6\u8BF4\u660E\u548C\u5B9E\u88C5\u4F8B\u5B50\u3002</p>
`;var ch=`<h1 id="inputwithtitle-\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846"><a class="header-anchor" href="#inputwithtitle-\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846">#</a>InputWithTitle (\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846)</h1><p>\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846\u7EC4\u5408\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { InputWithTitle } from &#39;lupine.components&#39;;

const input = InputWithTitle(&#39;\u7528\u6237\u540D&#39;, &#39;\u8BF7\u8F93\u5165\u60A8\u7684\u59D3\u540D&#39;, (value) =&gt; {
  console.log(&#39;\u8F93\u5165\u5185\u5BB9:&#39;, value);
});
</code></pre>
`;var dh=`<h1 id="menubar-\u6A2A\u5411\u83DC\u5355\u680F"><a class="header-anchor" href="#menubar-\u6A2A\u5411\u83DC\u5355\u680F">#</a>Menubar (\u6A2A\u5411\u83DC\u5355\u680F)</h1><p>\u6A2A\u5411\u83DC\u5355\u680F\uFF0C\u652F\u6301\u4E8C\u7EA7\u4E0B\u62C9\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Menubar } from &#39;lupine.components&#39;;

const menuItems = [
  { text: &#39;\u9996\u9875&#39;, link: &#39;/&#39; },
  {
    text: &#39;\u4EA7\u54C1&#39;,
    children: [
      { text: &#39;Lupine.js&#39;, link: &#39;/lupine&#39; },
      { text: &#39;Components&#39;, link: &#39;/components&#39; },
    ],
  },
];

&lt;Menubar items={menuItems} /&gt;;
</code></pre>
`;var ph=`<h1 id="menusidebar-\u4FA7\u8FB9\u5BFC\u822A\u680F"><a class="header-anchor" href="#menusidebar-\u4FA7\u8FB9\u5BFC\u822A\u680F">#</a>MenuSidebar (\u4FA7\u8FB9\u5BFC\u822A\u680F)</h1><p>\u7EB5\u5411\u5BFC\u822A\u83DC\u5355\uFF0C\u652F\u6301\u591A\u7EA7\u76EE\u5F55\uFF0C\u9002\u914D\u684C\u9762\u4E0E\u79FB\u52A8\u7AEF\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { MenuSidebar } from &#39;lupine.components&#39;;

const adminMenu = [
  { text: &#39;\u4EEA\u8868\u76D8&#39;, icon: &#39;dashboard&#39;, onClick: () =&gt; navigate(&#39;/admin&#39;) },
  { text: &#39;\u5185\u5BB9\u7BA1\u7406&#39;, icon: &#39;content&#39;, children: [
      { text: &#39;\u6587\u7AE0\u5217\u8868&#39;, onClick: () =&gt; navigate(&#39;/articles&#39;) },
      { text: &#39;\u5206\u7C7B\u7BA1\u7406&#39;, onClick: () =&gt; navigate(&#39;/categories&#39;) }
  ]}
];

// \u79FB\u52A8\u7AEF\u83DC\u5355
&lt;MenuSidebar items={adminMenu} mobileMenu={true} /&gt;

// \u684C\u9762\u7AEF\u5DE6\u4FA7\u83DC\u5355
&lt;MenuSidebar items={adminMenu} desktopMenu={true} /&gt;
</code></pre>
`;var uh=`<h1 id="messagebox-\u6D88\u606F\u6846"><a class="header-anchor" href="#messagebox-\u6D88\u606F\u6846">#</a>MessageBox (\u6D88\u606F\u6846)</h1><p>\u9884\u5B9A\u4E49\u7684\u5BF9\u8BDD\u6846\uFF08\u5982 Yes/No, Ok/Cancel\uFF09\uFF0C\u7528\u4E8E\u5FEB\u901F\u63D0\u793A\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { MessageBox, MessageBoxButtonProps } from &#39;lupine.components&#39;;

MessageBox.show({
  title: &#39;\u5220\u9664\u786E\u8BA4&#39;,
  buttonType: MessageBoxButtonProps.YesNo,
  contentMinWidth: &#39;200px&#39;,
  handleClicked: (index, close) =&gt; {
    if (index === 0) {
      // Yes
      console.log(&#39;\u7528\u6237\u9009\u62E9\u4E86\u786E\u8BA4&#39;);
    }
    close();
  },
  children: &lt;div&gt;\u60A8\u786E\u5B9A\u8981\u5220\u9664\u6B64\u9879\u5417\uFF1F&lt;/div&gt;,
});
</code></pre>
`;var gh=`<h1 id="modal-\u6A21\u6001\u6846"><a class="header-anchor" href="#modal-\u6A21\u6001\u6846">#</a>Modal (\u6A21\u6001\u6846)</h1><p>\u4E00\u4E2A\u5177\u6709 Modal \u6216\u65E0 Modal \u6548\u679C\u7684\u5F39\u51FA\u7A97\u53E3\uFF0C\u5E38\u7528\u4E8E\u963B\u585E\u5F0F\u4EA4\u4E92\u3002\u53EF\u4EE5\u62D6\u52A8\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { ModalWindow } from &#39;lupine.components&#39;;

ModalWindow.show({
  title: &#39;\u63D0\u793A&#39;,
  buttons: [&#39;\u597D\u7684&#39;, &#39;\u53D6\u6D88&#39;],
  closeWhenClickOutside: true,
  contentMinWidth: &#39;300px&#39;,
  handleClicked: (index, close) =&gt; {
    console.log(&#39;\u70B9\u51FB\u4E86\u7D22\u5F15:&#39;, index);
    close();
  },
  children: &lt;div&gt;\u8FD9\u662F\u4E00\u4E2A\u6A21\u6001\u5BF9\u8BDD\u6846\u7684\u5185\u5BB9\u3002&lt;/div&gt;,
});
</code></pre>
`;var hh=`<h1 id="noticemessage-\u901A\u77E5\u6D88\u606F"><a class="header-anchor" href="#noticemessage-\u901A\u77E5\u6D88\u606F">#</a>NoticeMessage (\u901A\u77E5\u6D88\u606F)</h1><p>\u4E00\u4E2A\u5F88\u5E38\u7528\u7684\u6838\u5FC3\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u5728\u9875\u9762\u9876\u90E8\u663E\u793A\u5168\u5C40\u901A\u77E5\u6D88\u606F\u3002\u652F\u6301\u591A\u79CD\u989C\u8272\u7B49\u7EA7\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { NotificationMessage, NotificationColor } from &#39;lupine.components&#39;;

// \u6210\u529F\u901A\u77E5
NotificationMessage.sendMessage(&#39;\u6570\u636E\u5DF2\u4FDD\u5B58&#39;, NotificationColor.Success);

// \u9519\u8BEF\u901A\u77E5 (\u6C38\u4E45\u663E\u793A)
NotificationMessage.sendMessage(&#39;\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u68C0\u67E5&#39;, NotificationColor.Error, true);
</code></pre>
`;var mh=`<h1 id="paginglink-\u5206\u9875\u94FE\u63A5"><a class="header-anchor" href="#paginglink-\u5206\u9875\u94FE\u63A5">#</a>PagingLink (\u5206\u9875\u94FE\u63A5)</h1><p>\u5206\u9875\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u5C55\u793A\u548C\u8DF3\u8F6C\u5230\u4E0D\u540C\u9875\u7801\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { PagingLink } from &#39;lupine.components&#39;;

&lt;PagingLink totalCount={100} pageSize={10} currentPage={1} onPageChange={(page) =&gt; console.log(&#39;\u8DF3\u8F6C\u5230\u9875\u7801:&#39;, page)} /&gt;;
</code></pre>
`;var fh=`<h1 id="popupmenu-\u5F39\u51FA\u83DC\u5355"><a class="header-anchor" href="#popupmenu-\u5F39\u51FA\u83DC\u5355">#</a>PopupMenu (\u5F39\u51FA\u83DC\u5355)</h1><p>\u5F39\u51FA\u5F0F\u83DC\u5355\uFF0C\u70B9\u51FB\u6216\u60AC\u505C\u89E6\u53D1\u3002\u7528\u4E8E\u663E\u793A\u9009\u9879\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { PopupMenuWithButton } from &#39;lupine.components&#39;;

const list = [&#39;\u4E2A\u4EBA\u8BBE\u7F6E&#39;, &#39;\u6D88\u606F\u4E2D\u5FC3&#39;, &#39;\u9000\u51FA\u767B\u5F55&#39;];

&lt;PopupMenuWithButton label=&#39;\u6211\u7684\u8D26\u6237&#39; list={list} handleSelected={(value) =&gt; console.log(&#39;\u9009\u62E9\u4E86:&#39;, value)} /&gt;;
</code></pre>
`;var bh=`<h1 id="progress-\u8FDB\u5EA6\u6761"><a class="header-anchor" href="#progress-\u8FDB\u5EA6\u6761">#</a>Progress (\u8FDB\u5EA6\u6761)</h1><p>\u7528\u4E8E\u663E\u793A\u4E0A\u4F20\u3001\u4E0B\u8F7D\u6216\u5176\u4ED6\u8017\u65F6\u64CD\u4F5C\u7684\u8FDB\u5EA6\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Progress } from &#39;lupine.components&#39;;

&lt;Progress value={75} max={100} showText={true} /&gt;;
</code></pre>
`;var xh=`<h1 id="radiolabel-\u5355\u9009\u7EC4"><a class="header-anchor" href="#radiolabel-\u5355\u9009\u7EC4">#</a>RadioLabel (\u5355\u9009\u7EC4)</h1><p>\u5355\u9009\u6309\u94AE\u7EC4\u65B9\u6848\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">// \u7ED3\u5408 input-label \u4F7F\u7528
&lt;label class=&#39;input-label&#39;&gt;
  &lt;input class=&#39;input-base&#39; type=&#39;radio&#39; name=&#39;group1&#39; /&gt;
  \u9009\u9879 A
&lt;/label&gt;
&lt;label class=&#39;input-label&#39;&gt;
  &lt;input class=&#39;input-base&#39; type=&#39;radio&#39; name=&#39;group1&#39; checked /&gt;
  \u9009\u9879 B
&lt;/label&gt;
</code></pre>
`;var vh=`<h1 id="redirect-\u91CD\u5B9A\u5411"><a class="header-anchor" href="#redirect-\u91CD\u5B9A\u5411">#</a>Redirect (\u91CD\u5B9A\u5411)</h1><p>\u91CD\u5B9A\u5411\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u9875\u9762\u8DF3\u8F6C\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Redirect } from &#39;lupine.components&#39;;

&lt;Redirect to=&#39;/login&#39; /&gt;;
</code></pre>
`;var yh=`<h1 id="resizablesplitter-\u53EF\u8C03\u5206\u5272\u5668"><a class="header-anchor" href="#resizablesplitter-\u53EF\u8C03\u5206\u5272\u5668">#</a>ResizableSplitter (\u53EF\u8C03\u5206\u5272\u5668)</h1><p>\u53EF\u62D6\u62C9\u8C03\u6574\u4E24\u4E2A\u7EC4\u4EF6\u5927\u5C0F\u7684\u5206\u5272\u5668\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { ResizableSplitter } from &#39;lupine.components&#39;;

&lt;ResizableSplitter left={&lt;div&gt;\u5DE6\u4FA7\u5185\u5BB9&lt;/div&gt;} right={&lt;div&gt;\u53F3\u4FA7\u5185\u5BB9&lt;/div&gt;} minWidth=&#39;200px&#39; /&gt;;
</code></pre>
`;var kh=`<h1 id="selectangle-\u89D2\u5EA6\u9009\u62E9"><a class="header-anchor" href="#selectangle-\u89D2\u5EA6\u9009\u62E9">#</a>SelectAngle (\u89D2\u5EA6\u9009\u62E9)</h1><p>360 \u5EA6\u89D2\u5EA6\u9009\u62E9\u5668\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SelectAngle } from &#39;lupine.components&#39;;

&lt;SelectAngle value={90} onChange={(angle) =&gt; console.log(&#39;\u9009\u62E9\u89D2\u5EA6:&#39;, angle)} /&gt;;
</code></pre>
`;var wh=`<h1 id="selectwithtitle-\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868"><a class="header-anchor" href="#selectwithtitle-\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868">#</a>SelectWithTitle (\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868)</h1><p>\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u9009\u62E9\u5217\u8868\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SelectWithTitle } from &#39;lupine.components&#39;;

const options = [
  { option: &#39;\u9009\u9879 1&#39;, value: &#39;1&#39; },
  { option: &#39;\u9009\u9879 2&#39;, value: &#39;2&#39;, selected: true },
];

const select = SelectWithTitle(&#39;\u8BF7\u9009\u62E9\u7B49\u7EA7&#39;, options, (value) =&gt; {
  console.log(&#39;\u9009\u62E9\u4E86:&#39;, value);
});
</code></pre>
`;var Sh=`<h1 id="slidetab-\u6ED1\u52A8\u9009\u9879\u5361"><a class="header-anchor" href="#slidetab-\u6ED1\u52A8\u9009\u9879\u5361">#</a>SlideTab (\u6ED1\u52A8\u9009\u9879\u5361)</h1><p>\u81EA\u52A8\u5207\u6362\u7684 Tab \u9875\u9762\u7684\u7EC4\u4EF6\uFF0C\u652F\u6301\u6ED1\u52A8\u6548\u679C\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SlideTab } from &#39;lupine.components&#39;;

const items = [
  { title: &#39;Slide 1&#39;, children: &lt;div&gt;\u5185\u5BB9 1&lt;/div&gt; },
  { title: &#39;Slide 2&#39;, children: &lt;div&gt;\u5185\u5BB9 2&lt;/div&gt; },
];

&lt;SlideTab items={items} autoPlay={true} interval={3000} /&gt;;
</code></pre>
`;var Ch=`<h1 id="spinner-\u52A0\u8F7D\u52A8\u753B"><a class="header-anchor" href="#spinner-\u52A0\u8F7D\u52A8\u753B">#</a>Spinner (\u52A0\u8F7D\u52A8\u753B)</h1><p>\u65CB\u8F6C\u7684\u52A0\u8F7D\u52A8\u753B\uFF0C\u5E38\u7528\u4E8E\u6570\u636E\u52A0\u8F7D\u7B49\u5F85\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Spinner } from &#39;lupine.components&#39;;

&lt;Spinner size=&#39;30px&#39; color=&#39;var(--primary-color)&#39; /&gt;;
</code></pre>
`;var Th=`<h1 id="stars-\u661F\u7EA7\u8BC4\u5206"><a class="header-anchor" href="#stars-\u661F\u7EA7\u8BC4\u5206">#</a>Stars (\u661F\u7EA7\u8BC4\u5206)</h1><p>\u661F\u7EA7\u8BC4\u5206\u7EC4\u4EF6\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Stars } from &#39;lupine.components&#39;;

&lt;Stars value={4.5} onChanged={(score) =&gt; console.log(&#39;\u8BC4\u5206\u6539\u4E3A:&#39;, score)} /&gt;;
</code></pre>
`;var Ph=`<h1 id="svgicon-svg-\u56FE\u6807"><a class="header-anchor" href="#svgicon-svg-\u56FE\u6807">#</a>SvgIcon (SVG \u56FE\u6807)</h1><p>\u9AD8\u6027\u80FD\u539F\u751F SVG \u56FE\u6807\u7EC4\u4EF6\uFF0C\u652F\u6301\u901A\u8FC7\u8DEF\u5F84\u6216\u540D\u79F0\u663E\u793A\u56FE\u6807\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SvgIcon } from &#39;lupine.components&#39;;

&lt;SvgIcon name=&#39;home&#39; size={24} /&gt;
&lt;SvgIcon name=&#39;settings&#39; color=&#39;red&#39; /&gt;
</code></pre>
`;var Mh=`<h1 id="switchoption-\u5207\u6362\u9009\u9879"><a class="header-anchor" href="#switchoption-\u5207\u6362\u9009\u9879">#</a>SwitchOption (\u5207\u6362\u9009\u9879)</h1><p>\u5207\u6362\u9009\u9879\u7EC4\u4EF6\u3002\u53EF\u4EE5\u5728\u4E24\u4E2A\u6587\u5B57\u9009\u9879\u4E4B\u95F4\u5207\u6362\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SwitchOption } from &#39;lupine.components&#39;;

&lt;SwitchOption options={[&#39;\u9009\u9879 1&#39;, &#39;\u9009\u9879 2&#39;]} onChanged={(index) =&gt; console.log(&#39;\u5F53\u524D\u7D22\u5F15:&#39;, index)} /&gt;;
</code></pre>
`;var Lh=`<h1 id="tabs-\u9009\u9879\u5361"><a class="header-anchor" href="#tabs-\u9009\u9879\u5361">#</a>Tabs (\u9009\u9879\u5361)</h1><p>\u6807\u51C6\u7684\u9009\u9879\u5361\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u5728\u540C\u4E00\u533A\u57DF\u5207\u6362\u4E0D\u540C\u5185\u5BB9\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Tabs, TabsPageProps } from &#39;lupine.components&#39;;

const pages: TabsPageProps[] = [
  { title: &#39;\u6982\u89C8&#39;, children: &lt;Overview /&gt; },
  { title: &#39;\u8BE6\u60C5&#39;, children: &lt;Details /&gt; },
];

&lt;Tabs pages={pages} pagePadding=&#39;16px&#39; /&gt;;
</code></pre>
`;var Eh=`<h1 id="\u6587\u672C\u7279\u6548-text-effects"><a class="header-anchor" href="#\u6587\u672C\u7279\u6548-text-effects">#</a>\u6587\u672C\u7279\u6548 (Text Effects)</h1><p>lupine.components \u63D0\u4F9B\u4E86\u4E00\u7CFB\u5217\u70AB\u9177\u7684\u6587\u5B57\u52A8\u753B\u7EC4\u4EF6\u3002</p>
<ul>
<li><strong>TextGlow</strong>: \u53D1\u5149\u52A8\u753B\u6587\u5B57\u3002</li>
<li><strong>TextScale</strong>: \u7F29\u653E\u52A8\u753B\u6587\u5B57\u3002</li>
<li><strong>TextWave</strong>: \u6CE2\u52A8\u52A8\u753B\u6587\u5B57\u3002</li>
</ul>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { TextGlow, TextScale, TextWave } from &#39;lupine.components&#39;;

&lt;TextGlow text=&#39;\u53D1\u5149\u7684\u6587\u5B57&#39; /&gt;
&lt;TextScale text=&#39;\u7F29\u653E\u7684\u6587\u5B57&#39; /&gt;
&lt;TextWave text=&#39;\u6CE2\u52A8\u7684\u6587\u5B57&#39; /&gt;
</code></pre>
`;var Ah=`<h1 id="textscale-\u7F29\u653E\u6587\u5B57"><a class="header-anchor" href="#textscale-\u7F29\u653E\u6587\u5B57">#</a>TextScale (\u7F29\u653E\u6587\u5B57)</h1><p>\u63D0\u4F9B\u7F29\u653E\u52A8\u753B\u6548\u679C\u7684\u6587\u5B57\u7EC4\u4EF6\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { TextScale } from &#39;lupine.components&#39;;

&lt;TextScale text=&#39;\u7F29\u653E\u52A8\u753B\u6587\u5B57&#39; /&gt;;
</code></pre>
`;var Rh=`<h1 id="textwave-\u6CE2\u52A8\u6587\u5B57"><a class="header-anchor" href="#textwave-\u6CE2\u52A8\u6587\u5B57">#</a>TextWave (\u6CE2\u52A8\u6587\u5B57)</h1><p>\u63D0\u4F9B\u6CE2\u52A8\u52A8\u753B\u6548\u679C\u7684\u6587\u5B57\u7EC4\u4EF6\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { TextWave } from &#39;lupine.components&#39;;

&lt;TextWave text=&#39;\u6CE2\u52A8\u52A8\u753B\u6587\u5B57&#39; /&gt;;
</code></pre>
`;var Dh=`<h1 id="togglebase-\u5207\u6362\u57FA\u7C7B"><a class="header-anchor" href="#togglebase-\u5207\u6362\u57FA\u7C7B">#</a>ToggleBase (\u5207\u6362\u57FA\u7C7B)</h1><p>\u5207\u6362\u7EC4\u4EF6\u7684\u57FA\u7840\u7C7B\uFF0C\u53EF\u4EE5\u5728\u8FD9\u4E2A\u57FA\u7840\u4E0A\u5B9E\u73B0\u81EA\u5B9A\u4E49\u5207\u6362\u7EC4\u4EF6\u3002</p>
<h2 id="\u8BF4\u660E"><a class="header-anchor" href="#\u8BF4\u660E">#</a>\u8BF4\u660E</h2><p>\u8FD9\u662F\u4E00\u4E2A\u5185\u90E8\u4F7F\u7528\u7684\u57FA\u7C7B\uFF0C\u901A\u5E38\u4E0D\u9700\u8981\u76F4\u63A5\u5728\u5E94\u7528\u4E2D\u4F7F\u7528\uFF0C\u9664\u975E\u60A8\u60F3\u5B9E\u73B0\u81EA\u5B9A\u4E49\u7684 Toggle \u4EA4\u4E92\u903B\u8F91\u3002</p>
`;var Hh=`<h1 id="toggleswitch-\u5207\u6362\u5F00\u5173"><a class="header-anchor" href="#toggleswitch-\u5207\u6362\u5F00\u5173">#</a>ToggleSwitch (\u5207\u6362\u5F00\u5173)</h1><p>\u5207\u6362\u5F00\u5173\uFF0C\u5E38\u7528\u4E8E\u8BBE\u7F6E\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { ToggleSwitch, ToggleSwitchSize } from &#39;lupine.components&#39;;

&lt;ToggleSwitch checked={true} size={ToggleSwitchSize.Medium} text={{ on: &#39;\u5F00\u542F&#39;, off: &#39;\u5173\u95ED&#39; }} textWidth=&#39;60px&#39; /&gt;;
</code></pre>
`;var Ih="";var zh=`<h1 id="lupine-press"><a class="header-anchor" href="#lupine-press">#</a>lupine.press</h1><p><code>lupine.press</code> \u662F\u4E00\u4E2A\u57FA\u4E8E <code>lupine.web</code> \u6784\u5EFA\u7684\u8F7B\u91CF\u7EA7\u3001\u9AD8\u6027\u80FD\u7684\u6587\u6863\u7F51\u7AD9\u6846\u67B6\u3002\u5B83\u63D0\u4F9B\u4E86\u4E00\u5957\u5B8C\u6574\u7684\u89E3\u51B3\u65B9\u6848\uFF0C\u7528\u4E8E\u6E32\u67D3\u57FA\u4E8E Markdown \u7684\u6587\u6863\u7F51\u7AD9\uFF0C\u652F\u6301\u54CD\u5E94\u5F0F\u5E03\u5C40\u3001\u4FA7\u8FB9\u680F\u5BFC\u822A\u548C\u4E3B\u9898\u5207\u6362\u3002</p>
<p>\u5B83\u65E8\u5728\u4E0E <code>lupine</code> \u751F\u6001\u7CFB\u7EDF\u65E0\u7F1D\u534F\u4F5C\uFF0C\u4E3A\u5982 Lupine.js \u5B98\u65B9\u6587\u6863\u7B49\u7AD9\u70B9\u63D0\u4F9B\u652F\u6301\u3002</p>
<h2 id="\u4E3B\u8981\u7279\u6027-features"><a class="header-anchor" href="#\u4E3B\u8981\u7279\u6027-features">#</a>\u4E3B\u8981\u7279\u6027 (Features)</h2><ul>
<li><strong>\u54CD\u5E94\u5F0F\u5E03\u5C40 (Responsive Layout)</strong>: \u5185\u7F6E\u7684 <code>PressFrame</code> \u63D0\u4F9B\u4E86\u6807\u51C6\u7684\u6587\u6863\u5E03\u5C40\uFF0C\u5305\u542B\u5934\u90E8\u3001\u54CD\u5E94\u5F0F\u4FA7\u8FB9\u680F\u548C\u5185\u5BB9\u533A\u57DF\u3002</li>
<li><strong>Markdown \u6E32\u67D3 (Markdown Rendering)</strong>: \u9488\u5BF9 Markdown \u751F\u6210\u7684\u5185\u5BB9\u8FDB\u884C\u4E86\u4F18\u5316\uFF0C\u652F\u6301\u8BED\u6CD5\u9AD8\u4EAE\u548C\u6807\u51C6\u6392\u7248\u3002</li>
<li><strong>\u4FA7\u8FB9\u680F\u5BFC\u822A (Sidebar Navigation)</strong>: \u6839\u636E\u60A8\u7684\u914D\u7F6E\u81EA\u52A8\u751F\u6210\u591A\u7EA7\u4FA7\u8FB9\u680F\u3002</li>
<li><strong>\u4E3B\u9898\u652F\u6301 (Theming)</strong>: \u901A\u8FC7 <code>lupine.components</code> \u4E3B\u9898\u7CFB\u7EDF\u5185\u7F6E\u652F\u6301\u591A\u79CD\u4E3B\u9898\uFF08\u5982\u4EAE\u8272/\u6697\u8272\u6A21\u5F0F\uFF09\u3002</li>
<li><strong>\u8DEF\u7531\u96C6\u6210 (Routing)</strong>: \u4E0E <code>PageRouter</code> \u663E\u5F0F\u96C6\u6210\uFF0C\u7528\u4E8E\u5904\u7406\u5BA2\u6237\u7AEF\u5BFC\u822A\u3002</li>
<li><strong>\u591A\u8BED\u8A00\u652F\u6301 (Multilingual Support)</strong>: \u81EA\u52A8\u626B\u63CF\u591A\u8BED\u8A00\u76EE\u5F55\u7684 markdown \u6587\u4EF6\uFF0C\u591A\u8BED\u8A00\u663E\u793A\u5207\u6362\u3002</li>
<li><strong>\u5F0F\u6837\u8BBE\u7F6E\u652F\u6301 (Styles Support)</strong>: \u53EF\u4EE5\u5728 markdown \u6587\u4EF6\u4E2D\u8BBE\u7F6E\u5F0F\u6837\u3002</li>
</ul>
<h2 id="\u4F7F\u7528\u6307\u5357-usage-guide"><a class="header-anchor" href="#\u4F7F\u7528\u6307\u5357-usage-guide">#</a>\u4F7F\u7528\u6307\u5357 (Usage Guide)</h2><h3 id="1-\u521B\u5EFA\u9879\u76EE"><a class="header-anchor" href="#1-\u521B\u5EFA\u9879\u76EE">#</a>1. \u521B\u5EFA\u9879\u76EE</h3><p>\u8981\u4F7F\u7528 <code>lupine.press</code>\uFF0C\u60A8\u901A\u5E38\u9700\u8981\u8BBE\u7F6E\u4E00\u4E2A <code>lupine.web</code> \u5E94\u7528\u7A0B\u5E8F\uFF0C\u5E76\u5C06\u5176\u914D\u7F6E\u4E3A\u4F7F\u7528 <code>PressPage</code> \u4F5C\u4E3A\u4E3B\u8DEF\u7531\u5904\u7406\u7A0B\u5E8F\u3002
\u6700\u7B80\u5355\u7684\u65B9\u5F0F\u5C31\u662F\u4F7F\u7528 <code>create-lupine</code> \u547D\u4EE4\u6765\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684 <code>lupine.press</code> \u5E94\u7528\u7A0B\u5E8F\u3002</p>
<pre><code class="language-bash">npx create-lupine@latest my-docs
</code></pre>
<p>\u7136\u540E\u9009\u62E9 <code>doc-starter</code> \u6A21\u677F\u3002</p>
<h3 id="2-\u57FA\u672C\u8BBE\u7F6E-basic-setup"><a class="header-anchor" href="#2-\u57FA\u672C\u8BBE\u7F6E-basic-setup">#</a>2. \u57FA\u672C\u8BBE\u7F6E (Basic Setup)</h3><p>\u5728\u521B\u5EFA\u7684\u7A0B\u5E8F\u4E2D\u60A8\u53EF\u4EE5\u770B\u5230\u8FD9\u4E9B\u914D\u7F6E\u3002
\u5728\u5E94\u7528\u7A0B\u5E8F\u5165\u53E3\u70B9\uFF08 <code>src/index.tsx</code>\uFF09\u4E2D\uFF0C\u60A8\u80FD\u770B\u5230\u5FC5\u8981\u7684\u7ED1\u5B9A\u914D\u7F6E\u548C\u8DEF\u7531\u5668\u8BBE\u7F6E\u3002</p>
<pre><code class="language-typescript">import { bindRouter, PageRouter, bindTheme, bindLang, setDefaultPageTitle } from &#39;lupine.components&#39;;
import { bindPressData, PressPage, pressThemes } from &#39;lupine.press&#39;;
import { markdownConfig } from &#39;./markdown-config&#39;; // \u60A8\u751F\u6210\u7684 markdown \u6570\u636E

// 1. \u521D\u59CB\u5316\u6838\u5FC3\u8BBE\u7F6E
bindLang(&#39;en&#39;, {}); // \u8BBE\u7F6E\u9ED8\u8BA4\u8BED\u8A00
bindTheme(&#39;light&#39;, pressThemes); // \u7ED1\u5B9A\u4E3B\u9898\uFF08\u5305\u542B press \u7279\u5B9A\u7684\u6837\u5F0F\uFF09
setDefaultPageTitle(&#39;My Documentation&#39;);

// 2. \u7ED1\u5B9A\u6587\u6863\u6570\u636E
// markdownConfig \u662F\u4E00\u4E2A\u5305\u542B\u4ECE markdown \u6587\u4EF6\u751F\u6210\u7684 HTML \u5185\u5BB9\u548C\u5143\u6570\u636E\u7684\u5BF9\u8C61\u3002
bindPressData(markdownConfig);

// 3. \u914D\u7F6E\u8DEF\u7531\u5668
const pageRouter = new PageRouter();
//\u5C06\u6240\u6709\u8BF7\u6C42\u8DEF\u7531\u5230 PressPage\uFF0CPressPage \u4F1A\u5904\u7406\u5728 markdownConfig \u4E2D\u67E5\u627E\u5185\u5BB9
pageRouter.use(&#39;*&#39;, PressPage);

// 4. \u542F\u52A8\u5E94\u7528\u7A0B\u5E8F
bindRouter(pageRouter);
</code></pre>
<h3 id="3-\u6570\u636E\u7ED3\u6784-markdownconfig"><a class="header-anchor" href="#3-\u6570\u636E\u7ED3\u6784-markdownconfig">#</a>3. \u6570\u636E\u7ED3\u6784 (<code>markdownConfig</code>)</h3><p><code>bindPressData</code> \u51FD\u6570\u671F\u671B\u4E00\u4E2A\u914D\u7F6E\u5BF9\u8C61\uFF0C\u5176\u4E2D\u952E\u662F\u8DEF\u7531\u8DEF\u5F84\uFF08\u4F8B\u5982 <code>/guide/started</code>\uFF09\uFF0C\u503C\u5305\u542B\u5185\u5BB9\u548C\u5143\u6570\u636E\u3002</p>
<p>\u901A\u5E38\uFF0C\u6B64\u6570\u636E\u662F\u5728\u6784\u5EFA\u65F6\u4ECE\u60A8\u7684 Markdown \u6587\u4EF6\u751F\u6210\u7684\u3002</p>
<pre><code class="language-typescript">export const markdownConfig = {
  &#39;/en/guide/started&#39;: {
    html: &#39;&lt;h1&gt;Getting Started&lt;/h1&gt;&lt;p&gt;...&lt;/p&gt;&#39;, // \u9884\u6E32\u67D3\u7684 HTML \u5185\u5BB9
    data: {
      title: &#39;Getting Started&#39;,
      sidebar: [
        // \u5F53\u524D\u9875\u9762\u4E0A\u4E0B\u6587\u7684\u4FA7\u8FB9\u680F\u914D\u7F6E
        { type: &#39;group&#39;, text: &#39;Guide&#39;, level: 0 },
        { type: &#39;link&#39;, text: &#39;Installation&#39;, link: &#39;/en/guide/install&#39;, level: 1 },
      ],
    },
    headings: [{ level: 2, text: &#39;Prerequisites&#39;, id: &#39;prerequisites&#39; }],
  },
  // ... \u5176\u4ED6\u9875\u9762
};
</code></pre>
<h2 id="markdown-\u6587\u4EF6\u7ED3\u6784\u4E0E\u5173\u8054-markdown-file-structure-association"><a class="header-anchor" href="#markdown-\u6587\u4EF6\u7ED3\u6784\u4E0E\u5173\u8054-markdown-file-structure-association">#</a>Markdown \u6587\u4EF6\u7ED3\u6784\u4E0E\u5173\u8054 (Markdown File Structure &amp; Association)</h2><h3 id="\u9876\u5C42\u914D\u7F6E-top-level-configuration"><a class="header-anchor" href="#\u9876\u5C42\u914D\u7F6E-top-level-configuration">#</a>\u9876\u5C42\u914D\u7F6E (Top-level Configuration)</h3><p>\u5728 Markdown \u6587\u4EF6\u7684\u9876\u5C42\u76EE\u5F55\uFF08\u6839\u76EE\u5F55\uFF09\uFF0C\u5FC5\u987B\u5B58\u5728\u4E00\u4E2A <code>index.md</code> \u6587\u4EF6\u3002\u8BE5\u6587\u4EF6\u4F7F\u7528 <code>lang</code> \u5B57\u6BB5\u6765\u6307\u5B9A\u7AD9\u70B9\u652F\u6301\u7684\u6240\u6709\u8BED\u8A00\u3002</p>
<pre><code class="language-yaml">---
lang:
  - title: English
    id: en
  - title: \u7B80\u4F53\u4E2D\u6587
    id: zh
---
</code></pre>
<h3 id="\u591A\u8BED\u8A00\u914D\u7F6E-multilingual-configuration"><a class="header-anchor" href="#\u591A\u8BED\u8A00\u914D\u7F6E-multilingual-configuration">#</a>\u591A\u8BED\u8A00\u914D\u7F6E (Multilingual Configuration)</h3><p>\u6BCF\u4E2A\u8BED\u8A00 ID\uFF08\u5982 <code>en</code>, <code>zh</code>\uFF09\u5BF9\u5E94\u4E00\u4E2A\u5B50\u76EE\u5F55\uFF0C\u4E14\u8BE5\u76EE\u5F55\u4E0B\u5FC5\u987B\u6709\u4E00\u4E2A <code>index.md</code> \u6587\u4EF6\u3002\u6B64\u6587\u4EF6\u7528\u4E8E\u914D\u7F6E\u8BE5\u8BED\u8A00\u7248\u672C\u7684\u5E03\u5C40\u3001\u6807\u9898\u3001\u4FA7\u8FB9\u680F\u5BBD\u5EA6\u7B49\u5168\u5C40\u8BBE\u7F6E\u3002\u8BE5\u8BED\u8A00\u7684\u6240\u6709 Markdown \u5185\u5BB9\u6587\u4EF6\u90FD\u5E94\u5B58\u653E\u4E8E\u6B64\u76EE\u5F55\u6216\u5176\u5B50\u76EE\u5F55\u4E2D\u3002</p>
<p><code>index.md</code> \u652F\u6301\u5B9A\u4E49\u4EE5\u4E0B\u5185\u5BB9\uFF1A</p>
<ul>
<li><strong>Hero &amp; Features</strong>: \u9996\u9875\u5927\u56FE\u548C\u7279\u6027\u4ECB\u7ECD\u3002</li>
<li><strong>Nav</strong>: \u9876\u90E8\u7684\u5BFC\u822A\u94FE\u63A5\u3002</li>
<li><strong>GitHub</strong>: GitHub \u4ED3\u5E93\u94FE\u63A5\u3002</li>
<li><strong>Sidebar</strong>: \u4FA7\u8FB9\u680F\u83DC\u5355\u914D\u7F6E\uFF08\u6838\u5FC3\u53C2\u6570\uFF09\u3002</li>
</ul>
<h3 id="\u4FA7\u8FB9\u680F\u914D\u7F6E-sidebar-configuration"><a class="header-anchor" href="#\u4FA7\u8FB9\u680F\u914D\u7F6E-sidebar-configuration">#</a>\u4FA7\u8FB9\u680F\u914D\u7F6E (Sidebar Configuration)</h3><p><code>sidebar</code> \u53C2\u6570\u662F\u4E00\u4E2A\u6570\u7EC4\uFF0C\u652F\u6301\u4E09\u79CD\u914D\u7F6E\u6A21\u5F0F\uFF1A</p>
<ol>
<li><strong>\u5B50\u83DC\u5355\u6A21\u5F0F (<code>submenu</code>)</strong>:
\u6307\u5411\u4E00\u4E2A\u5B50\u76EE\u5F55\u3002\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u5C55\u5F00\u8BE5\u5B50\u76EE\u5F55\u4E0B\u7684 <code>index.md</code> \u4E2D\u5B9A\u4E49\u7684 <code>sidebar</code> \u914D\u7F6E\uFF0C\u5E76\u5C06\u5176\u5185\u5BB9\u5408\u5E76\u5230\u5F53\u524D\u7EA7\u522B\u3002</li>
<li><strong>\u5206\u7EC4\u6A21\u5F0F (<code>text</code> + <code>items</code>)</strong>:
\u5B9A\u4E49\u4E00\u4E2A\u83DC\u5355\u7EC4\u3002<code>text</code> \u4E3A\u7EC4\u6807\u9898\uFF0C<code>items</code> \u4E3A\u8BE5\u7EC4\u4E0B\u7684\u6240\u6709\u94FE\u63A5\u5217\u8868\u3002</li>
<li><strong>\u6241\u5E73\u6A21\u5F0F (<code>items</code> only)</strong>:
\u4EC5\u5B9A\u4E49 <code>items</code> \u800C\u4E0D\u63D0\u4F9B <code>text</code>\u3002\u6B64\u65F6 <code>items</code> \u4E2D\u7684\u6240\u6709\u94FE\u63A5\u5C06\u76F4\u63A5\u663E\u793A\u5728\u5F53\u524D\u7EA7\u522B\uFF0C\u4E0D\u8FDB\u884C\u5206\u7EC4\u3002</li>
</ol>
<h2 id="\u67B6\u6784-architecture"><a class="header-anchor" href="#\u67B6\u6784-architecture">#</a>\u67B6\u6784 (Architecture)</h2><ul>
<li><strong><code>PressFrame</code></strong>: \u4E3B\u8981\u5E03\u5C40\u7EC4\u4EF6\u3002\u5B83\u5904\u7406\u6587\u6863\u7AD9\u70B9\u7684\u7279\u5B9A CSS \u548C\u7ED3\u6784\uFF0C\u786E\u4FDD\u4FA7\u8FB9\u680F\u548C\u5185\u5BB9\u533A\u57DF\u72EC\u7ACB\u6EDA\u52A8\u3002</li>
<li><strong><code>PressPage</code></strong>: \u201C\u63A7\u5236\u5668\u201D\u7EC4\u4EF6\u3002\u5B83\u5728\u7ED1\u5B9A\u7684 <code>markdownConfig</code> \u4E2D\u67E5\u627E\u5F53\u524D URL\uFF0C\u68C0\u7D22\u76F8\u5E94\u7684 HTML \u548C\u5143\u6570\u636E\uFF0C\u5E76\u4F7F\u7528\u6B63\u786E\u7684\u4FA7\u8FB9\u680F\u548C\u5185\u5BB9\u6E32\u67D3 <code>PressFrame</code>\u3002</li>
<li><strong><code>pressLoad</code></strong>: \u4E00\u4E2A\u5BFC\u822A\u5B9E\u7528\u7A0B\u5E8F\uFF0C\u7528\u4E8E\u5904\u7406\u6587\u6863\u5185\u7684\u94FE\u63A5\u70B9\u51FB\uFF0C\u786E\u4FDD\u5E73\u6ED1\u7684\u5BA2\u6237\u7AEF\u8F6C\u6362\u3002</li>
</ul>
<h2 id="\u5F0F\u6837-styles"><a class="header-anchor" href="#\u5F0F\u6837-styles">#</a>\u5F0F\u6837 (Styles)</h2><p>styles \u53EF\u4EE5\u5B9A\u4E49\u4E00\u4E9B\u5B57\u4F53\uFF0C\u989C\u8272\u7B49\u5F0F\u6837\u3002\u8FD9\u4E9B\u5F0F\u6837\u5C06\u88AB\u5E94\u7528\u4E8E\u6240\u6709\u9875\u9762\u3002</p>
<pre><code class="language-css">styles:
  &#39;:root&#39;: { &#39;--primary-accent-color&#39;: &#39;#0ac92a&#39; }
  body: { font-family: var(--font-family-base); }
</code></pre>
`;var jh=`<h1 id="lupine-web"><a class="header-anchor" href="#lupine-web">#</a>lupine.web</h1><p><strong>lupine.web</strong> \u662F\u4E00\u4E2A\u7C7B\u4F3C React\u3001\u6781\u5FEB\u3001\u5C0F\u5DE7\u4E14\u8F7B\u91CF\u7EA7\u7684\u524D\u7AEF\u6846\u67B6\u3002</p>
<p>\u6D4F\u89C8\u6587\u6863:</p>
<ul>
<li><a href="javascript:lpPressLoad('/zh/lupine.web/overview')">\u6982\u89C8</a></li>
</ul>
`;var Bh=`<h1 id="lupine-web"><a class="header-anchor" href="#lupine-web">#</a>lupine.web</h1><p><strong>lupine.web</strong> \u662F\u4E00\u4E2A\u7C7B\u4F3C React\u3001\u6781\u5FEB\u3001\u5C0F\u5DE7\u4E14\u8F7B\u91CF\u7EA7\u7684\u524D\u7AEF\u6846\u67B6\uFF0C\u4E13\u4E3A\u73B0\u4EE3 Web \u5F00\u53D1\u800C\u8BBE\u8BA1\u3002\u5B83\u4E13\u6CE8\u4E8E\u6027\u80FD\u3001\u7B80\u5355\u6027\uFF0C\u5E76\u4E0E <code>lupine.api</code> \u642D\u914D\u4F7F\u7528\u65F6\u63D0\u4F9B\u5168\u6808\u4F53\u9A8C\u3002</p>
<h2 id="\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-web"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-web">#</a>\u4E3A\u4EC0\u4E48\u9009\u62E9 lupine.web?</h2><h3 id="\u96F6\u4F9D\u8D56\u4E14\u8F7B\u91CF\u7EA7-zero-dependency-lightweight"><a class="header-anchor" href="#\u96F6\u4F9D\u8D56\u4E14\u8F7B\u91CF\u7EA7-zero-dependency-lightweight">#</a>\u{1F680} \u96F6\u4F9D\u8D56\u4E14\u8F7B\u91CF\u7EA7 (Zero-Dependency &amp; Lightweight)</h3><p>\u6211\u4EEC\u76F8\u4FE1\u4FDD\u6301\u7B80\u5355\u3002<code>lupine.web</code> <strong>\u6CA1\u6709\u5916\u90E8\u4F9D\u8D56</strong>\uFF0C\u56E0\u6B64\u5305\u4F53\u79EF\u6781\u5C0F\uFF0C\u52A0\u8F7D\u901F\u5EA6\u6781\u5FEB\u3002\u5B83\u4F7F\u7528 TSX \u8BED\u6CD5\uFF0C\u6240\u4EE5\u5982\u679C\u4F60\u719F\u6089 React\uFF0C\u4F60\u4F1A\u611F\u5230\u975E\u5E38\u4EB2\u5207\u3002</p>
<h3 id="\u5185\u7F6E-css-in-js-built-in-css-in-js-essentials-css-in-js"><a class="header-anchor" href="#\u5185\u7F6E-css-in-js-built-in-css-in-js-essentials-css-in-js">#</a>\u{1F3A8} \u5185\u7F6E CSS-in-JS (Built-in CSS-in-JS) <a href="javascript:lpPressLoad('/zh/essentials/css-in-js')">\u{1F517}</a></h3><p>\u4E0D\u7528\u518D\u8BBE\u7F6E\u590D\u6742\u7684 CSS \u52A0\u8F7D\u5668\u6216\u5916\u90E8\u6837\u5F0F\u5E93\u4E86\u3002<code>lupine.web</code> \u81EA\u5E26\u4E86\u4E00\u4E2A\u5F3A\u5927\u7684\u5185\u7F6E CSS-in-JS \u89E3\u51B3\u65B9\u6848\u3002</p>
<ul>
<li><strong>\u4F5C\u7528\u57DF\u6837\u5F0F (Scoped Styles)</strong>: \u6837\u5F0F\u81EA\u52A8\u9650\u5B9A\u5728\u7EC4\u4EF6\u4F5C\u7528\u57DF\u5185\uFF0C\u4EE5\u9632\u6B62\u51B2\u7A81\u3002</li>
<li><strong>\u5D4C\u5957\u652F\u6301 (Nesting Support)</strong>: \u4F7F\u7528\u5D4C\u5957\u9009\u62E9\u5668\u7F16\u5199\u66F4\u6E05\u6670\u7684 CSS\uFF08\u4F8B\u5982\uFF0C<code>&amp;:hover</code>\uFF0C<code>&amp; &gt; span</code>\uFF09\u3002</li>
<li><strong>\u4E3B\u9898\u652F\u6301 (Theming)</strong>: \u539F\u751F\u652F\u6301\u4EAE/\u6697\u6A21\u5F0F\u548C\u81EA\u5B9A\u4E49\u4E3B\u9898\u3002</li>
</ul>
<pre><code class="language-tsx">const MyButton = (props) =&gt; (
  &lt;button
    css={{
      backgroundColor: &#39;blue&#39;,
      color: &#39;white&#39;,
      &#39;&amp;:hover&#39;: { backgroundColor: &#39;darkblue&#39; },
      [MediaQueryRange.Mobile]: { width: &#39;100%&#39; },
    }}
  &gt;
    {props.children}
  &lt;/button&gt;
);
</code></pre>
<h3 id="\u5F3A\u5927\u7684\u8DEF\u7531-powerful-router-essentials-page-route"><a class="header-anchor" href="#\u5F3A\u5927\u7684\u8DEF\u7531-powerful-router-essentials-page-route">#</a>\u{1F6E3}\uFE0F \u5F3A\u5927\u7684\u8DEF\u7531 (Powerful Router) <a href="javascript:lpPressLoad('/zh/essentials/page-route')">\u{1F517}</a></h3><p>\u6211\u4EEC\u7684\u51FD\u6570\u5F0F\u8DEF\u7531\u4E13\u4E3A\u7075\u6D3B\u6027\u548C\u63A7\u5236\u529B\u800C\u8BBE\u8BA1\u3002</p>
<ul>
<li><strong>\u8DEF\u7531\u5B88\u536B (Route Guards)</strong>: \u8F7B\u677E\u5B9E\u73B0\u8EAB\u4EFD\u9A8C\u8BC1\u68C0\u67E5\u6216\u6743\u9650\u63A7\u5236\u3002</li>
<li><strong>\u5D4C\u5957\u8DEF\u7531 (Nested Routes)</strong>: \u4F7F\u7528\u5B50\u8DEF\u7531\u7EC4\u7EC7\u5E94\u7528\u7A0B\u5E8F\uFF0C\u5B9E\u73B0\u6A21\u5757\u5316\u67B6\u6784\u3002</li>
<li><strong>SSR \u5C31\u7EEA (SSR Ready)</strong>: \u8DEF\u7531\u5728\u670D\u52A1\u5668\u548C\u5BA2\u6237\u7AEF\u4E0A\u90FD\u80FD\u65E0\u7F1D\u5DE5\u4F5C\u3002</li>
</ul>
<pre><code class="language-typescript">const pageRouter = new PageRouter();
// \u4E2D\u95F4\u4EF6/\u5B88\u536B\u793A\u4F8B
pageRouter.setFilter(async (props) =&gt; {
  if (!checkAuth(props)) return &lt;Redirect to=&#39;/login&#39; /&gt;;
  return null; // Pass
});
pageRouter.use(&#39;/dashboard/*&#39;, DashboardRouter);
</code></pre>
<h3 id="\u670D\u52A1\u7AEF\u6E32\u67D3-ssr-\u4F18\u5148-server-side-rendering-first-essentials-ssr"><a class="header-anchor" href="#\u670D\u52A1\u7AEF\u6E32\u67D3-ssr-\u4F18\u5148-server-side-rendering-first-essentials-ssr">#</a>\u26A1 \u670D\u52A1\u7AEF\u6E32\u67D3 (SSR) \u4F18\u5148 (Server-Side Rendering First) <a href="javascript:lpPressLoad('/zh/essentials/ssr')">\u{1F517}</a></h3><p>\u89C6\u89C9\u6027\u80FD\u81F3\u5173\u91CD\u8981\u3002<code>lupine.web</code> \u4ECE\u7B2C\u4E00\u5929\u8D77\u5C31\u662F\u4E3A SSR \u6784\u5EFA\u7684\u3002</p>
<ul>
<li><strong>\u65E0\u95EA\u70C1 (No Flashing)</strong>: \u5185\u5BB9\u5728\u670D\u52A1\u5668\u4E0A\u6E32\u67D3\uFF0C\u786E\u4FDD\u7528\u6237\u7ACB\u5373\u770B\u5230\u9875\u9762\u3002</li>
<li><strong>SEO \u53CB\u597D</strong>: \u5B8C\u5168\u53EF\u5B9A\u5236\u7684\u5143\u6570\u636E (Metadata) \u548C Open Graph (OG) \u6807\u7B7E\uFF0C\u7528\u4E8E\u793E\u4EA4\u5206\u4EAB\u3002</li>
<li><strong>\u6C34\u5408 (Hydration)</strong>: \u5BA2\u6237\u7AEF\u5E73\u6ED1\u63A5\u7BA1\uFF0C\u65E0\u9700\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u6811\u3002</li>
</ul>
<h3 id="\u56FD\u9645\u5316-i18n"><a class="header-anchor" href="#\u56FD\u9645\u5316-i18n">#</a>\u{1F30D} \u56FD\u9645\u5316 (i18n)</h3><p>\u8F7B\u677E\u8FC8\u5411\u5168\u7403\u3002\u5185\u7F6E\u5BF9\u591A\u8BED\u8A00\u5E94\u7528\u7A0B\u5E8F\u7684\u652F\u6301\uFF0C\u5141\u8BB8\u901A\u8FC7\u4E0A\u4E0B\u6587\u52A8\u6001\u5207\u6362\u8BED\u8A00\uFF0C\u65E0\u9700\u590D\u6742\u914D\u7F6E\u3002</p>
<h3 id="\u73AF\u5883\u914D\u7F6E-environment-configuration"><a class="header-anchor" href="#\u73AF\u5883\u914D\u7F6E-environment-configuration">#</a>\u{1F6E0}\uFE0F \u73AF\u5883\u914D\u7F6E (Environment Configuration)</h3><p>\u9AD8\u6548\u7BA1\u7406\u60A8\u7684\u5E94\u7528\u7A0B\u5E8F\u73AF\u5883\u3002<code>lupine.web</code> \u652F\u6301\u52A0\u8F7D\u73AF\u5883\u53D8\u91CF\uFF08\u901A\u8FC7 <code>lupine.api</code> \u4ECE <code>.env</code> \u6587\u4EF6\u52A0\u8F7D\uFF09\u5E76\u5C06\u7ECF\u8FC7\u4E25\u683C\u8FC7\u6EE4\u7684\u914D\u7F6E\u6CE8\u5165\u5230\u524D\u7AEF\u3002</p>
`;var Oh={"/":{html:Kp,data:{lang:[{title:"English",id:"en"},{title:"\u7B80\u4F53\u4E2D\u6587",id:"zh"}]},headings:[]},"/en/articles/cross-platform-app":{html:Qp,data:{title:"One Codebase, Everywhere: Building Web, Mobile, and Desktop Apps with Lupine.js",published:!0,description:"A complete guide to building cross-platform applications using Lupine.js, Capacitor, and Electron.",tags:"cross-platform, mobile, desktop, capacitor, electron",series:"Practical Guides"},headings:[{level:2,text:"1. The Core: A Responsive Web App",id:"1-the-core-a-responsive-web-app"},{level:3,text:"Responsive Styling",id:"responsive-styling"},{level:3,text:"Adaptive Frames",id:"adaptive-frames"},{level:2,text:"2. Going Mobile (iOS & Android)",id:"2-going-mobile-ios-android"},{level:3,text:"Step 2.1: Setup Capacitor",id:"step-2-1-setup-capacitor"},{level:3,text:"Step 2.2: Add Platforms",id:"step-2-2-add-platforms"},{level:3,text:"Step 2.3: Configure Mobile Environment",id:"step-2-3-configure-mobile-environment"},{level:3,text:"Step 2.4: Build & Sync",id:"step-2-4-build-sync"},{level:3,text:"Step 2.5: Native Logic (Optional)",id:"step-2-5-native-logic-optional"},{level:2,text:"3. Going Desktop (Windows, Mac, Linux)",id:"3-going-desktop-windows-mac-linux"},{level:3,text:"Structure",id:"structure"},{level:3,text:"Building for Desktop",id:"building-for-desktop"},{level:2,text:"Conclusion",id:"conclusion"}]},"/en/articles/css-in-js-lupine.js":{html:Zp,data:{title:"Zero Dependencies, Native Power: Mastering CSS-in-JS in Lupine.js",description:"A deep dive into built-in high-performance styling engine"},headings:[{level:2,text:"1. Say Goodbye to ClassName Hell",id:"1-say-goodbye-to-classname-hell"},{level:2,text:"2. Powerful Nesting (Just like SCSS)",id:"2-powerful-nesting-just-like-scss"},{level:3,text:"Selecting Children",id:"selecting-children"},{level:3,text:"Combined Selectors",id:"combined-selectors"},{level:2,text:"3. Responsive Design: Co-located Media Queries",id:"3-responsive-design-co-located-media-queries"},{level:2,text:"4. Animation Master: Built-in Keyframes",id:"4-animation-master-built-in-keyframes"},{level:2,text:"5. Dynamic Style Updates",id:"5-dynamic-style-updates"},{level:2,text:"6. Global Styles: bindGlobalStyle",id:"6-global-styles-bindglobalstyle"},{level:2,text:"7. The Traditionalist: Importing .css Files",id:"7-the-traditionalist-importing-css-files"},{level:2,text:"Conclusion",id:"conclusion"}]},"/en/articles/cv-generator":{html:eu,data:{title:"10 Minutes! Build a Stunning Personal CV Website with Markdown",description:"Stand out with the Lupine.js CV Starter Template"},headings:[{level:2,text:"Why Choose Lupine CV Starter",id:"why-choose-lupine-cv-starter"},{level:2,text:"\u{1F680} Quick Start",id:"quick-start"},{level:3,text:"1. Create Project",id:"1-create-project"},{level:3,text:"2. Start Preview",id:"2-start-preview"},{level:2,text:"\u{1F4DD} Customize Your CV",id:"customize-your-cv"},{level:3,text:"Modify Content",id:"modify-content"},{level:3,text:"Manage Directory & Sidebar",id:"manage-directory-sidebar"},{level:3,text:"Configure Top Navigation (Optional)",id:"configure-top-navigation-optional"},{level:3,text:"Personalization Settings",id:"personalization-settings"},{level:2,text:"Conclusion",id:"conclusion"}]},"/en/articles/how-to-build-fast-ssr-app":{html:tu,data:{title:"How to build a blazing fast SSR app in 2026 with Lupine.js",published:!0,description:"Discover Lupine.js, a 7kb React-like framework with built-in SSR, CSS-in-JS, and zero configuration.",tags:"javascript, webdev, react, performance",series:"Open Source Spotlights"},headings:[{level:2,text:"Why Lupine.js",id:"why-lupine-js"},{level:2,text:"1. Get Started in Seconds",id:"1-get-started-in-seconds"},{level:2,text:'2. The "Hello World" (That Renders on the Server)',id:"2-the-hello-world-that-renders-on-the-server"},{level:3,text:"What's happening here",id:"what-s-happening-here"},{level:2,text:"3. Zero-Config SEO with SSR",id:"3-zero-config-seo-with-ssr"},{level:2,text:"4. Powerful Routing",id:"4-powerful-routing"},{level:2,text:"Conclusion",id:"conclusion"}]},"/en/articles/introduce-lupine.js":{html:ou,data:{title:"Introducing Lupine.js",description:"The Lightweight Fast Frontend & Efficient Easy Backend Framework."},headings:[{level:2,text:"Why Lupine.js",id:"why-lupine-js"},{level:3,text:"1. \u{1FAB6} Extremely Lightweight Frontend",id:"1-extremely-lightweight-frontend"},{level:3,text:"2. \u26A1 Built-in Server-Side Rendering (SSR)",id:"2-built-in-server-side-rendering-ssr"},{level:3,text:"3. \u{1F3A8} Native CSS-in-JS Engine",id:"3-native-css-in-js-engine"},{level:3,text:"4. \u{1F680} Full-Stack in One Place",id:"4-full-stack-in-one-place"},{level:2,text:"Quick Start",id:"quick-start"},{level:3,text:"Step 1: Create a Project",id:"step-1-create-a-project"},{level:3,text:"Step 2: Run it",id:"step-2-run-it"},{level:2,text:"Code Frequency & Activity",id:"code-frequency-activity"},{level:2,text:"Conclusion",id:"conclusion"}]},"/en/articles/introduce-lupine.press":{html:nu,data:{title:"Lupine.Press: Built for Doc Speed",description:"The ultra-light documentation generator powered by Lupine.js"},headings:[{level:2,text:"Why Choose Lupine.Press",id:"why-choose-lupine-press"},{level:3,text:"1. \u26A1 Incredible Speed",id:"1-incredible-speed"},{level:3,text:"2. \u{1F4DD} Markdown-Driven Just Works",id:"2-markdown-driven-just-works"},{level:3,text:"3. \u{1F3A8} Professional Design Out-of-the-Box",id:"3-professional-design-out-of-the-box"},{level:3,text:"4. \u{1F6E0}\uFE0F Flexible Extensibility",id:"4-flexible-extensibility"},{level:2,text:"Deployment Hack: SPA on GitHub Pages",id:"deployment-hack-spa-on-github-pages"},{level:3,text:"The Smart 404.html",id:"the-smart-404-html"},{level:2,text:"Quick Start",id:"quick-start"},{level:2,text:"Deploying to GitHub Pages",id:"deploying-to-github-pages"}]},"/en/articles/ssr-comparison":{html:iu,data:{title:"SSR Deep Dive: React vs Angular vs Lupine.js",published:!0,description:"A technical comparison of Server-Side Rendering approaches in 2026.",tags:"ssr, architecture, react, angular, performance",series:"Architecture Comparisons"},headings:[{level:2,text:"1. The Architecture of Rendering",id:"1-the-architecture-of-rendering"},{level:3,text:"React (via Next.js/Remix)",id:"react-via-next-js-remix"},{level:3,text:"Angular (SSR / Modern Hydration)",id:"angular-ssr-modern-hydration"},{level:3,text:"Lupine.js",id:"lupine-js"},{level:2,text:'2. Dealing with "The FOUC" (Flash of Unstyled Content)',id:"2-dealing-with-the-fouc-flash-of-unstyled-content"},{level:3,text:"The Problem",id:"the-problem"},{level:3,text:"React / Next.js",id:"react-next-js"},{level:3,text:"Lupine.js",id:"lupine-js"},{level:2,text:"3. Data Fetching & Hydration",id:"3-data-fetching-hydration"},{level:3,text:"React (Next.js App Router)",id:"react-next-js-app-router"},{level:3,text:"Lupine.js",id:"lupine-js"},{level:2,text:"4. Performance & Bundle Size",id:"4-performance-bundle-size"},{level:2,text:"Conclusion: When to use what",id:"conclusion-when-to-use-what"}]},"/en/essentials/api":{html:ru,data:{title:"API Reference"},headings:[{level:2,text:"Lupine.api (Backend)",id:"lupine-api-backend"},{level:3,text:"\u{1F3D7}\uFE0F Architecture & Workflow",id:"architecture-workflow"},{level:3,text:"\u{1F4E1} ApiModule",id:"apimodule"},{level:3,text:"\u{1F333} RootApi & StaticServer",id:"rootapi-staticserver"},{level:3,text:"\u{1F3E5} Health Check Example",id:"health-check-example"}]},"/en/essentials/css-in-js":{html:au,data:{title:"CSS-in-JS"},headings:[{level:2,text:"1. \u{1F423} Basic Usage",id:"1-basic-usage"},{level:2,text:"2. \u{1F680} Advanced Features",id:"2-advanced-features"},{level:3,text:"2.1 \u{1F38E} Nesting & Parent Selector (&)",id:"2-1-nesting-parent-selector"},{level:3,text:"2.2 \u{1F6E1}\uFE0F Scoping with & (Dynamic Component ID)",id:"2-2-scoping-with-dynamic-component-id"},{level:3,text:"2.3 \u26A1 One-Line Multiple Definitions",id:"2-3-one-line-multiple-definitions"},{level:3,text:"2.4 \u{1F4F1} Media Queries (@media)",id:"2-4-media-queries-media"},{level:3,text:"2.5 \u{1F3AC} Keyframes (@keyframes)",id:"2-5-keyframes-keyframes"},{level:2,text:"3. \u{1F30F} Global Styles (bindGlobalStyle)",id:"3-global-styles-bindglobalstyle"}]},"/en/essentials/dashboard":{html:su,data:{title:"Dashboard"},headings:[{level:2,text:"Features",id:"features"},{level:3,text:"1. Database Management (DB)",id:"1-database-management-db"},{level:3,text:"2. Operations & Server Management (Access & Server Info)",id:"2-operations-server-management-access-server-info"},{level:3,text:"3. Development & Testing (Test)",id:"3-development-testing-test"},{level:2,text:"Extension Development",id:"extension-development"},{level:3,text:"Menu Configuration",id:"menu-configuration"},{level:3,text:"Page Development",id:"page-development"}]},"/en/essentials/icons":{html:lu,data:{title:"Icons Font Customization"},headings:[{level:2,text:"Icons Font Customization",id:"icons-font-customization"}]},"/en/essentials/index":{html:cu,data:{title:"Core Essentials",sidebar:[{type:"link",text:"Server Side Rendering (SSR)",link:"/en/essentials/ssr",level:0},{type:"link",text:"Page Router",link:"/en/essentials/page-route",level:0},{type:"link",text:"CSS-in-JS",link:"/en/essentials/css-in-js",level:0},{type:"link",text:"Theme",link:"/en/essentials/theme",level:0},{type:"link",text:"High Performance List Rendering & Editing",link:"/en/essentials/list",level:0},{type:"link",text:"Mobile & Desktop Adaptation",link:"/en/essentials/mobile-desktop",level:0},{type:"link",text:"API Reference",link:"/en/essentials/api",level:0},{type:"link",text:"Dashboard",link:"/en/essentials/dashboard",level:0},{type:"link",text:"Icons Font Customization",link:"/en/essentials/icons",level:0}]},headings:[]},"/en/essentials/list":{html:du,data:{title:"High Performance List Rendering & Editing"},headings:[{level:2,text:"1. \u26A1 Why it is Fast",id:"1-why-it-is-fast"},{level:2,text:'2. \u{1F3AF} The "Spot-Update" Strategy',id:"2-the-spot-update-strategy"},{level:3,text:"Benefits",id:"benefits"},{level:2,text:"3. \u{1F4BB} Code Example: Editable List",id:"3-code-example-editable-list"},{level:3,text:"\u{1F4E6} Step 1: The List Container (Parent)",id:"step-1-the-list-container-parent"},{level:3,text:"\u26A1 Step 2: The Optimized Row (Child)",id:"step-2-the-optimized-row-child"},{level:3,text:"\u270F\uFE0F Step 3: Inline Editing (Advanced)",id:"step-3-inline-editing-advanced"},{level:2,text:"Summary",id:"summary"}]},"/en/essentials/mobile-desktop":{html:pu,data:{title:"Mobile & Desktop Adaptation"},headings:[{level:2,text:"1. Responsive Layout (Media Query)",id:"1-responsive-layout-media-query"},{level:3,text:"Breakpoints",id:"breakpoints"},{level:3,text:"Usage in CSS-in-JS",id:"usage-in-css-in-js"},{level:2,text:"2. Adaptive Frames",id:"2-adaptive-frames"},{level:3,text:"ResponsiveFrame",id:"responsiveframe"},{level:3,text:"SliderFrame",id:"sliderframe"},{level:2,text:"3. Mobile Navigation & Interaction",id:"3-mobile-navigation-interaction"},{level:3,text:"Global Back Button Handling (BackActionHelper)",id:"global-back-button-handling-backactionhelper"},{level:3,text:"ActionSheet",id:"actionsheet"},{level:3,text:"MobileHeader",id:"mobileheader"},{level:3,text:"SlideTabComponent",id:"slidetabcomponent"},{level:3,text:"Conditional Compilation",id:"conditional-compilation"},{level:3,text:"Adding iOS and Android",id:"adding-ios-and-android"},{level:2,text:"5. Desktop Deployment",id:"5-desktop-deployment"},{level:3,text:"Desktop Structure",id:"desktop-structure"},{level:3,text:"Build Commands",id:"build-commands"}]},"/en/essentials/page-route":{html:uu,data:{title:"Page Router"},headings:[{level:2,text:"1. \u2696\uFE0F Versus Other Frameworks",id:"1-versus-other-frameworks"},{level:2,text:"2. \u{1F423} Basic Usage",id:"2-basic-usage"},{level:2,text:"3. \u{1F527} Dynamic Parameters",id:"3-dynamic-parameters"},{level:3,text:"Syntax",id:"syntax"},{level:3,text:"Example",id:"example"},{level:2,text:"4. \u{1F680} Advanced Features",id:"4-advanced-features"},{level:3,text:"4.1 \u{1F38E} Nested Routers (Modularity)",id:"4-1-nested-routers-modularity"},{level:3,text:"4.2 \u{1F6E1}\uFE0F Middleware Filters (Auth)",id:"4-2-middleware-filters-auth"},{level:3,text:"4.3 \u{1F5BC}\uFE0F Frame Pages (Layouts)",id:"4-3-frame-pages-layouts"},{level:3,text:"4.4 \u{1F4C2} Sub-Directory Deployment",id:"4-4-sub-directory-deployment"}]},"/en/essentials/ssr":{html:gu,data:{title:"Server Side Rendering (SSR)"},headings:[{level:2,text:"1. \u2699\uFE0F How it Works",id:"1-how-it-works"},{level:3,text:"The Flow:",id:"the-flow"},{level:2,text:"2. \u{1F50D} Zero-Configuration SEO",id:"2-zero-configuration-seo"},{level:3,text:"Example: Social Sharing (OpenGraph)",id:"example-social-sharing-opengraph"},{level:2,text:"3. \u{1F6E0}\uFE0F Environment Variables",id:"3-environment-variables"},{level:3,text:"Defining Variables",id:"defining-variables"},{level:3,text:"Accessing Variables",id:"accessing-variables"},{level:2,text:"4. \u2699\uFE0F WebConfig: Dynamic Runtime Configuration",id:"4-webconfig-dynamic-runtime-configuration"},{level:3,text:"Usage",id:"usage"},{level:2,text:"5. \u26A1 Intelligent Caching & Performance",id:"5-intelligent-caching-performance"}]},"/en/essentials/theme":{html:hu,data:{title:"Theme"},headings:[{level:2,text:"1. \u{1F3C1} Setup",id:"1-setup"},{level:3,text:"bindTheme",id:"bindtheme"},{level:2,text:"2. \u{1F3AE} Usage",id:"2-usage"},{level:3,text:"Accessing & Updating",id:"accessing-updating"},{level:3,text:"ThemeSelector Component",id:"themeselector-component"},{level:2,text:"3. \u26A1 Server-Side Rendering (SSR)",id:"3-server-side-rendering-ssr"},{level:2,text:"4. \u{1F6E0}\uFE0F Admin Tools",id:"4-admin-tools"}]},"/en/guide/install":{html:mu,data:{title:"Installation"},headings:[{level:2,text:"Quick Start",id:"quick-start"},{level:3,text:"1. Create a Project",id:"1-create-a-project"},{level:3,text:"2. Install dependencies",id:"2-install-dependencies"},{level:3,text:"3. Configure Environment",id:"3-configure-environment"},{level:3,text:"4. Run the development application",id:"4-run-the-development-application"},{level:2,text:"Local HTTPS Setup",id:"local-https-setup"},{level:3,text:"Alternative: Self-Signed Certificate via OpenSSL",id:"alternative-self-signed-certificate-via-openssl"},{level:2,text:"Debugging",id:"debugging"},{level:3,text:"Debug Backend Only",id:"debug-backend-only"},{level:3,text:"Debug Frontend & Backend",id:"debug-frontend-backend"},{level:2,text:"Adding a New App",id:"adding-a-new-app"},{level:3,text:"Local Virtual Domain Setup",id:"local-virtual-domain-setup"},{level:3,text:"Creating a Sub-folder App",id:"creating-a-sub-folder-app"},{level:2,text:"Important: Global Variables in SSR",id:"important-global-variables-in-ssr"}]},"/en/guide/started":{html:fu,data:{title:"Getting Started"},headings:[{level:2,text:"Core Essentials",id:"core-essentials"},{level:3,text:"\u26A1 Server-Side Rendering (SSR) First",id:"server-side-rendering-ssr-first-essentials-ssr"},{level:3,text:"\u{1F3A8} Built-in CSS-in-JS",id:"built-in-css-in-js-essentials-css-in-js"},{level:3,text:"\u{1F6E3}\uFE0F Powerful Page Router",id:"powerful-page-router-essentials-page-route"},{level:3,text:"\u{1F317} Theme System",id:"theme-system-essentials-theme"},{level:3,text:"\u{1F4DD} High-Performance List Rendering",id:"high-performance-list-rendering-essentials-list"},{level:3,text:"\u{1F4E1} Full-Stack Development",id:"full-stack-development-essentials-api"},{level:3,text:"\u{1F916} AI Assisted Development",id:"ai-assisted-development"}]},"/en/index":{html:bu,data:{layout:"home",title:"Lupine.js Doc","sidemenu-width":"260px","github-title":"View on GitHub","github-link":"https://github.com/uuware/lupine.js",lang:{title:"English",id:"en"},hero:{name:"Lupine.js",text:"Approachable, Fast, Full-stack",tagline:"A full-featured web application framework includes both Front-End and Back-End services.",actions:[{theme:"brand",text:"Get Started",link:"/en/guide/started"},{theme:"alt",text:"View on GitHub",link:"https://github.com/uuware/lupine.js"}]},nav:[{text:"Guide",link:"/en/guide/started"},{text:"Demo",link:"/demo",target:"_blank"}],sidebar:[{type:"group",text:"Guide",level:0},{type:"link",text:"Getting Started",link:"/en/guide/started",level:1},{type:"link",text:"Installation",link:"/en/guide/install",level:1},{type:"group",text:"Articles",level:0},{type:"link",text:"Introducing Lupine.js",link:"/en/articles/introduce-lupine.js",level:1},{type:"link",text:"Zero Dependencies, Native Power: Mastering CSS-in-JS in Lupine.js",link:"/en/articles/css-in-js-lupine.js",level:1},{type:"link",text:"Lupine.Press: Built for Doc Speed",link:"/en/articles/introduce-lupine.press",level:1},{type:"link",text:"SSR Deep Dive: React vs Angular vs Lupine.js",link:"/en/articles/ssr-comparison",level:1},{type:"link",text:"How to build a blazing fast SSR app in 2026 with Lupine.js",link:"/en/articles/how-to-build-fast-ssr-app",level:1},{type:"link",text:"One Codebase, Everywhere: Building Web, Mobile, and Desktop Apps with Lupine.js",link:"/en/articles/cross-platform-app",level:1},{type:"link",text:"10 Minutes! Build a Stunning Personal CV Website with Markdown",link:"/en/articles/cv-generator",level:1},{type:"group",text:"Core Essentials",level:0},{type:"link",text:"Server Side Rendering (SSR)",link:"/en/essentials/ssr",level:1},{type:"link",text:"Page Router",link:"/en/essentials/page-route",level:1},{type:"link",text:"CSS-in-JS",link:"/en/essentials/css-in-js",level:1},{type:"link",text:"Theme",link:"/en/essentials/theme",level:1},{type:"link",text:"High Performance List Rendering & Editing",link:"/en/essentials/list",level:1},{type:"link",text:"Mobile & Desktop Adaptation",link:"/en/essentials/mobile-desktop",level:1},{type:"link",text:"API Reference",link:"/en/essentials/api",level:1},{type:"link",text:"Dashboard",link:"/en/essentials/dashboard",level:1},{type:"link",text:"Icons Font Customization",link:"/en/essentials/icons",level:1},{type:"group",text:"Lupine.web",level:0},{type:"link",text:"Overview",link:"/en/lupine.web/overview",level:1},{type:"group",text:"Lupine.components",level:0},{type:"group",text:"Windows & Dialogs",level:1},{type:"link",text:"FloatWindow",link:"/en/lupine.components/float-window",level:2},{type:"link",text:"Modal",link:"/en/lupine.components/modal",level:2},{type:"link",text:"MessageBox",link:"/en/lupine.components/message-box",level:2},{type:"link",text:"Action Sheet",link:"/en/lupine.components/action-sheet",level:2},{type:"group",text:"Navigation & Menus",level:1},{type:"link",text:"MenuSidebar",link:"/en/lupine.components/menu-sidebar",level:2},{type:"link",text:"Menubar",link:"/en/lupine.components/menu-bar",level:2},{type:"link",text:"PopupMenu",link:"/en/lupine.components/popup-menu",level:2},{type:"link",text:"Tabs",link:"/en/lupine.components/tabs",level:2},{type:"link",text:"SlideTab",link:"/en/lupine.components/slide-tab",level:2},{type:"link",text:"PagingLink",link:"/en/lupine.components/paging-link",level:2},{type:"group",text:"Form & Inputs",level:1},{type:"link",text:"Button",link:"/en/lupine.components/button",level:2},{type:"link",text:"ToggleSwitch",link:"/en/lupine.components/toggle-switch",level:2},{type:"link",text:"InputWithTitle",link:"/en/lupine.components/input-with-title",level:2},{type:"link",text:"SelectWithTitle",link:"/en/lupine.components/select-with-title",level:2},{type:"link",text:"RadioLabel",link:"/en/lupine.components/radio-label",level:2},{type:"link",text:"EditableLabel",link:"/en/lupine.components/editable-label",level:2},{type:"link",text:"Stars",link:"/en/lupine.components/stars",level:2},{type:"link",text:"SelectAngle",link:"/en/lupine.components/select-angle",level:2},{type:"group",text:"Content & Layout",level:1},{type:"link",text:"Grid",link:"/en/lupine.components/grid",level:2},{type:"link",text:"HtmlVar",link:"/en/lupine.components/html-var",level:2},{type:"link",text:"HtmlLoad",link:"/en/lupine.components/html-load",level:2},{type:"link",text:"NoticeMessage",link:"/en/lupine.components/notice-message",level:2},{type:"link",text:"Progress",link:"/en/lupine.components/progress",level:2},{type:"link",text:"Spinner",link:"/en/lupine.components/spinner",level:2},{type:"link",text:"SvgIcon",link:"/en/lupine.components/svg-icon",level:2},{type:"group",text:"Text Effects",level:1},{type:"link",text:"TextGlow",link:"/en/lupine.components/text-glow",level:2},{type:"link",text:"TextScale",link:"/en/lupine.components/text-scale",level:2},{type:"link",text:"TextWave",link:"/en/lupine.components/text-wave",level:2},{type:"group",text:"Other Components",level:1},{type:"link",text:"DragFresh",link:"/en/lupine.components/drag-fresh",level:2},{type:"link",text:"Redirect",link:"/en/lupine.components/redirect",level:2},{type:"link",text:"ResizableSplitter",link:"/en/lupine.components/resizable-splitter",level:2},{type:"link",text:"SwitchOption",link:"/en/lupine.components/switch-option",level:2},{type:"link",text:"ToggleBase",link:"/en/lupine.components/toggle-base",level:2},{type:"group",text:"Lupine.components-libs",level:0},{type:"group",text:"Utilities",level:1},{type:"link",text:"DateUtils",link:"/en/lupine.components-libs/date-utils",level:2},{type:"link",text:"SimpleStorage",link:"/en/lupine.components-libs/simple-storage",level:2},{type:"link",text:"DynamicalLoad",link:"/en/lupine.components-libs/dynamical-load",level:2},{type:"link",text:"formatBytes",link:"/en/lupine.components-libs/format-bytes",level:2},{type:"group",text:"DOM & UI Helpers",level:1},{type:"link",text:"DomUtils",link:"/en/lupine.components-libs/dom-utils",level:2},{type:"link",text:"LiteDom",link:"/en/lupine.components-libs/lite-dom",level:2},{type:"link",text:"DragUtil",link:"/en/lupine.components-libs/drag-util",level:2},{type:"group",text:"Network & Files",level:1},{type:"link",text:"uploadFile",link:"/en/lupine.components-libs/upload-file",level:2},{type:"link",text:"downloadStream",link:"/en/lupine.components-libs/download-stream",level:2},{type:"group",text:"Event & State",level:1},{type:"link",text:"MessageHub",link:"/en/lupine.components-libs/message-hub",level:2},{type:"link",text:"Observable",link:"/en/lupine.components-libs/observable",level:2},{type:"group",text:"Lupine.api",level:0},{type:"group",text:"Core Concepts",level:1},{type:"link",text:"Server",link:"/en/lupine.api/app",level:2},{type:"link",text:"API Module",link:"/en/lupine.api/api",level:2},{type:"group",text:"Tools",level:1},{type:"link",text:"Dashboard",link:"/en/lupine.api/dashboard",level:2},{type:"group",text:"Lupine.press",level:0},{type:"link",text:"Press Doc Overview",link:"/en/lupine.press/overview",level:1}],styles:{":root":{"--primary-accent-color":"#0ac92a"}},features:[{title:"Front-End (lupine.web)",details:"Extremely lightweight framework (7kb gzipped for a hello-world project with all core features) using React TSX syntax. No heavy runtime."},{title:"Back-End (lupine.api)",details:"Efficient and simplified framework similar to Express. Optimized for SSR."},{title:"Zero-dependency",details:"Minimal dependency tree ensuring fast build times and reliable deployments."}]},headings:[]},"/en/lupine.api/api":{html:xu,data:{title:"API Module"},headings:[{level:2,text:"Key Features",id:"key-features"},{level:2,text:"Usage Example",id:"usage-example"}]},"/en/lupine.api/app":{html:vu,data:{title:"Server"},headings:[{level:2,text:"Key Features",id:"key-features"},{level:2,text:"Usage Example",id:"usage-example"}]},"/en/lupine.api/dashboard":{html:yu,data:{title:"Dashboard"},headings:[]},"/en/lupine.api/index":{html:ku,data:{title:"Lupine.api",sidebar:[{type:"group",text:"Core Concepts",level:0},{type:"link",text:"Server",link:"/en/lupine.api/app",level:1},{type:"link",text:"API Module",link:"/en/lupine.api/api",level:1},{type:"group",text:"Tools",level:0},{type:"link",text:"Dashboard",link:"/en/lupine.api/dashboard",level:1}]},headings:[]},"/en/lupine.components-libs/date-utils":{html:wu,data:{title:"DateUtils"},headings:[]},"/en/lupine.components-libs/dom-utils":{html:Su,data:{title:"DomUtils"},headings:[]},"/en/lupine.components-libs/download-stream":{html:Cu,data:{title:"downloadStream"},headings:[]},"/en/lupine.components-libs/drag-util":{html:Tu,data:{title:"DragUtil"},headings:[]},"/en/lupine.components-libs/dynamical-load":{html:Pu,data:{title:"DynamicalLoad"},headings:[]},"/en/lupine.components-libs/format-bytes":{html:Mu,data:{title:"formatBytes"},headings:[]},"/en/lupine.components-libs/index":{html:Lu,data:{title:"Lupine.components-libs",sidebar:[{type:"group",text:"Utilities",level:0},{type:"link",text:"DateUtils",link:"/en/lupine.components-libs/date-utils",level:1},{type:"link",text:"SimpleStorage",link:"/en/lupine.components-libs/simple-storage",level:1},{type:"link",text:"DynamicalLoad",link:"/en/lupine.components-libs/dynamical-load",level:1},{type:"link",text:"formatBytes",link:"/en/lupine.components-libs/format-bytes",level:1},{type:"group",text:"DOM & UI Helpers",level:0},{type:"link",text:"DomUtils",link:"/en/lupine.components-libs/dom-utils",level:1},{type:"link",text:"LiteDom",link:"/en/lupine.components-libs/lite-dom",level:1},{type:"link",text:"DragUtil",link:"/en/lupine.components-libs/drag-util",level:1},{type:"group",text:"Network & Files",level:0},{type:"link",text:"uploadFile",link:"/en/lupine.components-libs/upload-file",level:1},{type:"link",text:"downloadStream",link:"/en/lupine.components-libs/download-stream",level:1},{type:"group",text:"Event & State",level:0},{type:"link",text:"MessageHub",link:"/en/lupine.components-libs/message-hub",level:1},{type:"link",text:"Observable",link:"/en/lupine.components-libs/observable",level:1}]},headings:[{level:2,text:"Utilities",id:"utilities"},{level:2,text:"DOM & UI Helpers",id:"dom-ui-helpers"},{level:2,text:"Network & Files",id:"network-files"},{level:2,text:"Event & State",id:"event-state"}]},"/en/lupine.components-libs/lite-dom":{html:Eu,data:{title:"LiteDom"},headings:[]},"/en/lupine.components-libs/message-hub":{html:Au,data:{title:"MessageHub"},headings:[]},"/en/lupine.components-libs/observable":{html:Ru,data:{title:"Observable"},headings:[]},"/en/lupine.components-libs/simple-storage":{html:Du,data:{title:"SimpleStorage"},headings:[]},"/en/lupine.components-libs/upload-file":{html:Hu,data:{title:"uploadFile"},headings:[]},"/en/lupine.components/action-sheet":{html:Iu,data:{title:"Action Sheet"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/button":{html:zu,data:{title:"Button"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/drag-fresh":{html:ju,data:{title:"DragFresh"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/editable-label":{html:Bu,data:{title:"EditableLabel"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/float-window":{html:Ou,data:{title:"FloatWindow"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/grid":{html:Fu,data:{title:"Grid"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/html-load":{html:qu,data:{title:"HtmlLoad"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/html-var":{html:Nu,data:{title:"HtmlVar"},headings:[{level:2,text:"1. Correct Usage",id:"1-correct-usage"},{level:3,text:"Example",id:"example"},{level:2,text:"2. Comparison with Modern Frameworks",id:"2-comparison-with-modern-frameworks"},{level:2,text:"3. Recommended Helper: val<T>",id:"3-recommended-helper-val-t"}]},"/en/lupine.components/index":{html:Wu,data:{title:"Lupine.components",sidebar:[{type:"group",text:"Windows & Dialogs",level:0},{type:"link",text:"FloatWindow",link:"/en/lupine.components/float-window",level:1},{type:"link",text:"Modal",link:"/en/lupine.components/modal",level:1},{type:"link",text:"MessageBox",link:"/en/lupine.components/message-box",level:1},{type:"link",text:"Action Sheet",link:"/en/lupine.components/action-sheet",level:1},{type:"group",text:"Navigation & Menus",level:0},{type:"link",text:"MenuSidebar",link:"/en/lupine.components/menu-sidebar",level:1},{type:"link",text:"Menubar",link:"/en/lupine.components/menu-bar",level:1},{type:"link",text:"PopupMenu",link:"/en/lupine.components/popup-menu",level:1},{type:"link",text:"Tabs",link:"/en/lupine.components/tabs",level:1},{type:"link",text:"SlideTab",link:"/en/lupine.components/slide-tab",level:1},{type:"link",text:"PagingLink",link:"/en/lupine.components/paging-link",level:1},{type:"group",text:"Form & Inputs",level:0},{type:"link",text:"Button",link:"/en/lupine.components/button",level:1},{type:"link",text:"ToggleSwitch",link:"/en/lupine.components/toggle-switch",level:1},{type:"link",text:"InputWithTitle",link:"/en/lupine.components/input-with-title",level:1},{type:"link",text:"SelectWithTitle",link:"/en/lupine.components/select-with-title",level:1},{type:"link",text:"RadioLabel",link:"/en/lupine.components/radio-label",level:1},{type:"link",text:"EditableLabel",link:"/en/lupine.components/editable-label",level:1},{type:"link",text:"Stars",link:"/en/lupine.components/stars",level:1},{type:"link",text:"SelectAngle",link:"/en/lupine.components/select-angle",level:1},{type:"group",text:"Content & Layout",level:0},{type:"link",text:"Grid",link:"/en/lupine.components/grid",level:1},{type:"link",text:"HtmlVar",link:"/en/lupine.components/html-var",level:1},{type:"link",text:"HtmlLoad",link:"/en/lupine.components/html-load",level:1},{type:"link",text:"NoticeMessage",link:"/en/lupine.components/notice-message",level:1},{type:"link",text:"Progress",link:"/en/lupine.components/progress",level:1},{type:"link",text:"Spinner",link:"/en/lupine.components/spinner",level:1},{type:"link",text:"SvgIcon",link:"/en/lupine.components/svg-icon",level:1},{type:"group",text:"Text Effects",level:0},{type:"link",text:"TextGlow",link:"/en/lupine.components/text-glow",level:1},{type:"link",text:"TextScale",link:"/en/lupine.components/text-scale",level:1},{type:"link",text:"TextWave",link:"/en/lupine.components/text-wave",level:1},{type:"group",text:"Other Components",level:0},{type:"link",text:"DragFresh",link:"/en/lupine.components/drag-fresh",level:1},{type:"link",text:"Redirect",link:"/en/lupine.components/redirect",level:1},{type:"link",text:"ResizableSplitter",link:"/en/lupine.components/resizable-splitter",level:1},{type:"link",text:"SwitchOption",link:"/en/lupine.components/switch-option",level:1},{type:"link",text:"ToggleBase",link:"/en/lupine.components/toggle-base",level:1}]},headings:[{level:2,text:"Core Features",id:"core-features"},{level:2,text:"Quick Start",id:"quick-start"}]},"/en/lupine.components/input-with-title":{html:_u,data:{title:"InputWithTitle"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/menu-bar":{html:Uu,data:{title:"Menubar"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/menu-sidebar":{html:$u,data:{title:"MenuSidebar"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/message-box":{html:Vu,data:{title:"MessageBox"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/modal":{html:Gu,data:{title:"Modal"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/notice-message":{html:Yu,data:{title:"NoticeMessage"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/paging-link":{html:Ju,data:{title:"PagingLink"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/popup-menu":{html:Xu,data:{title:"PopupMenu"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/progress":{html:Ku,data:{title:"Progress"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/radio-label":{html:Qu,data:{title:"RadioLabel"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/redirect":{html:Zu,data:{title:"Redirect"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/resizable-splitter":{html:eg,data:{title:"ResizableSplitter"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/select-angle":{html:tg,data:{title:"SelectAngle"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/select-with-title":{html:og,data:{title:"SelectWithTitle"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/slide-tab":{html:ng,data:{title:"SlideTab"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/spinner":{html:ig,data:{title:"Spinner"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/stars":{html:rg,data:{title:"Stars"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/svg-icon":{html:ag,data:{title:"SvgIcon"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/switch-option":{html:sg,data:{title:"SwitchOption"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/tabs":{html:lg,data:{title:"Tabs"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/text-glow":{html:cg,data:{title:"TextGlow"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/text-scale":{html:dg,data:{title:"TextScale"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/text-wave":{html:pg,data:{title:"TextWave"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/toggle-base":{html:ug,data:{title:"ToggleBase"},headings:[{level:2,text:"Description",id:"description"}]},"/en/lupine.components/toggle-switch":{html:gg,data:{title:"ToggleSwitch"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.press/index":{html:hg,data:{title:"Lupine.press",sidebar:[{type:"link",text:"Press Doc Overview",link:"/en/lupine.press/overview",level:0}]},headings:[]},"/en/lupine.press/overview":{html:mg,data:{title:"Press Doc Overview"},headings:[{level:2,text:"Features",id:"features"},{level:2,text:"Usage Guide",id:"usage-guide"},{level:3,text:"1. Create a Project",id:"1-create-a-project"},{level:3,text:"2. Basic Setup",id:"2-basic-setup"},{level:3,text:"3. Data Structure (markdownConfig)",id:"3-data-structure-markdownconfig"},{level:2,text:"Markdown File Structure & Association",id:"markdown-file-structure-association"},{level:3,text:"Top-level Configuration",id:"top-level-configuration"},{level:3,text:"Multilingual Configuration",id:"multilingual-configuration"},{level:3,text:"Sidebar Configuration",id:"sidebar-configuration"},{level:2,text:"Architecture",id:"architecture"},{level:2,text:"Styles",id:"styles"}]},"/en/lupine.web/index":{html:fg,data:{title:"Lupine.web",sidebar:[{type:"link",text:"Overview",link:"/en/lupine.web/overview",level:0}]},headings:[]},"/en/lupine.web/overview":{html:bg,data:{title:"Overview"},headings:[{level:2,text:"Why lupine.web",id:"why-lupine-web"},{level:3,text:"\u{1F680} Zero-Dependency & Lightweight",id:"zero-dependency-lightweight"},{level:3,text:"\u{1F3A8} Built-in CSS-in-JS \u{1F517}",id:"built-in-css-in-js-essentials-css-in-js"},{level:3,text:"\u{1F6E3}\uFE0F Powerful Router \u{1F517}",id:"powerful-router-essentials-page-route"},{level:3,text:"\u26A1 Server-Side Rendering (SSR) First \u{1F517}",id:"server-side-rendering-ssr-first-essentials-ssr"},{level:3,text:"\u{1F30D} Internationalization (i18n)",id:"internationalization-i18n"},{level:3,text:"\u{1F6E0}\uFE0F Environment Configuration",id:"environment-configuration"}]},"/zh/articles/cross-platform-app":{html:xg,data:{title:"\u4E00\u5957\u4EE3\u7801\uFF0C\u591A\u7AEF\u8FD0\u884C\uFF1A\u4F7F\u7528 Lupine.js \u6784\u5EFA Web\u3001\u79FB\u52A8\u548C\u684C\u9762\u5E94\u7528",published:!0,description:"\u4F7F\u7528 Lupine.js\u3001Capacitor \u548C Electron \u6784\u5EFA\u8DE8\u5E73\u53F0\u5E94\u7528\u7A0B\u5E8F\u7684\u5B8C\u6574\u6307\u5357\u3002",tags:"cross-platform, mobile, desktop, capacitor, electron",series:"\u5B9E\u6218\u6307\u5357"},headings:[{level:2,text:"1. \u6838\u5FC3\uFF1A\u54CD\u5E94\u5F0F Web \u5E94\u7528",id:"1-\u6838\u5FC3-\u54CD\u5E94\u5F0F-web-\u5E94\u7528"},{level:3,text:"\u54CD\u5E94\u5F0F\u6837\u5F0F",id:"\u54CD\u5E94\u5F0F\u6837\u5F0F"},{level:3,text:"\u81EA\u9002\u5E94\u6846\u67B6 Layout",id:"\u81EA\u9002\u5E94\u6846\u67B6-layout"},{level:2,text:"2. \u8FDB\u519B\u79FB\u52A8\u7AEF (iOS & Android)",id:"2-\u8FDB\u519B\u79FB\u52A8\u7AEF-ios-android"},{level:3,text:"\u6B65\u9AA4 2.1: \u5B89\u88C5 Capacitor",id:"\u6B65\u9AA4-2-1-\u5B89\u88C5-capacitor"},{level:3,text:"\u6B65\u9AA4 2.2: \u6DFB\u52A0\u5E73\u53F0",id:"\u6B65\u9AA4-2-2-\u6DFB\u52A0\u5E73\u53F0"},{level:3,text:"\u6B65\u9AA4 2.3: \u914D\u7F6E\u79FB\u52A8\u7AEF\u73AF\u5883",id:"\u6B65\u9AA4-2-3-\u914D\u7F6E\u79FB\u52A8\u7AEF\u73AF\u5883"},{level:3,text:"\u6B65\u9AA4 2.4: \u6784\u5EFA\u4E0E\u540C\u6B65",id:"\u6B65\u9AA4-2-4-\u6784\u5EFA\u4E0E\u540C\u6B65"},{level:3,text:"\u6B65\u9AA4 2.5: \u539F\u751F\u903B\u8F91 (\u53EF\u9009)",id:"\u6B65\u9AA4-2-5-\u539F\u751F\u903B\u8F91-\u53EF\u9009"},{level:2,text:"3. \u8FDB\u519B\u684C\u9762\u7AEF (Windows, Mac, Linux)",id:"3-\u8FDB\u519B\u684C\u9762\u7AEF-windows-mac-linux"},{level:3,text:"\u7ED3\u6784",id:"\u7ED3\u6784"},{level:3,text:"\u6784\u5EFA\u684C\u9762\u5E94\u7528",id:"\u6784\u5EFA\u684C\u9762\u5E94\u7528"},{level:2,text:"\u603B\u7ED3",id:"\u603B\u7ED3"}]},"/zh/articles/css-in-js-lupine.js":{html:vg,data:{title:"\u96F6\u4F9D\u8D56\uFF0CLupine.js \u5982\u4F55\u5B9E\u73B0\u539F\u751F CSS-in-JS\uFF1F",description:"\u6DF1\u5165\u89E3\u6790 Lupine.js \u5185\u7F6E\u7684\u9AD8\u6027\u80FD\u6837\u5F0F\u5F15\u64CE"},headings:[{level:2,text:"1. \u544A\u522B className \u7684\u70E6\u607C",id:"1-\u544A\u522B-classname-\u7684\u70E6\u607C"},{level:2,text:"2. \u50CF SCSS \u4E00\u6837\u5F3A\u5927\u7684\u5D4C\u5957\u529F\u80FD",id:"2-\u50CF-scss-\u4E00\u6837\u5F3A\u5927\u7684\u5D4C\u5957\u529F\u80FD"},{level:3,text:"\u5D4C\u5957\u5B50\u5143\u7D20",id:"\u5D4C\u5957\u5B50\u5143\u7D20"},{level:3,text:"\u7EC4\u5408\u9009\u62E9\u5668",id:"\u7EC4\u5408\u9009\u62E9\u5668"},{level:2,text:"3. \u54CD\u5E94\u5F0F\u8BBE\u8BA1\uFF1A\u5A92\u4F53\u67E5\u8BE2\u4ECE\u672A\u5982\u6B64\u7B80\u5355",id:"3-\u54CD\u5E94\u5F0F\u8BBE\u8BA1-\u5A92\u4F53\u67E5\u8BE2\u4ECE\u672A\u5982\u6B64\u7B80\u5355"},{level:2,text:"4. \u52A8\u753B\u5927\u5E08\uFF1A\u5185\u7F6E Keyframes \u652F\u6301",id:"4-\u52A8\u753B\u5927\u5E08-\u5185\u7F6E-keyframes-\u652F\u6301"},{level:2,text:"5. \u52A8\u6001\u6837\u5F0F\u66F4\u65B0",id:"5-\u52A8\u6001\u6837\u5F0F\u66F4\u65B0"},{level:2,text:"6. \u5168\u5C40\u6837\u5F0F\uFF1AbindGlobalStyle",id:"6-\u5168\u5C40\u6837\u5F0F-bindglobalstyle"},{level:2,text:"7. \u4F20\u7EDF\u6D3E\uFF1A\u5BFC\u5165 .css \u6587\u4EF6",id:"7-\u4F20\u7EDF\u6D3E-\u5BFC\u5165-css-\u6587\u4EF6"},{level:2,text:"\u603B\u7ED3",id:"\u603B\u7ED3"}]},"/zh/articles/cv-generator":{html:yg,data:{title:"\u5341\u5206\u949F\uFF01\u7528 Markdown \u6781\u901F\u6784\u5EFA\u9AD8\u989C\u503C\u7684\u4E2A\u4EBA\u7B80\u5386\u7F51\u7AD9",description:"\u57FA\u4E8E Lupine.js \u7684 CV Starter \u6A21\u677F\uFF0C\u8BA9\u4F60\u7684\u7B80\u5386\u8131\u9896\u800C\u51FA"},headings:[{level:2,text:"\u4E3A\u4EC0\u4E48\u9009\u62E9 Lupine CV Starter\uFF1F",id:"\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-cv-starter"},{level:2,text:"\u{1F680} \u5FEB\u901F\u5F00\u59CB",id:"\u5FEB\u901F\u5F00\u59CB"},{level:3,text:"1. \u521B\u5EFA\u9879\u76EE",id:"1-\u521B\u5EFA\u9879\u76EE"},{level:3,text:"2. \u542F\u52A8\u9884\u89C8",id:"2-\u542F\u52A8\u9884\u89C8"},{level:2,text:"\u{1F4DD} \u5B9A\u5236\u4F60\u7684\u7B80\u5386",id:"\u5B9A\u5236\u4F60\u7684\u7B80\u5386"},{level:3,text:"\u4FEE\u6539\u5185\u5BB9",id:"\u4FEE\u6539\u5185\u5BB9"},{level:3,text:"\u7BA1\u7406\u76EE\u5F55\u4E0E\u4FA7\u8FB9\u680F",id:"\u7BA1\u7406\u76EE\u5F55\u4E0E\u4FA7\u8FB9\u680F"},{level:3,text:"\u914D\u7F6E\u9876\u90E8\u5BFC\u822A (\u53EF\u9009)",id:"\u914D\u7F6E\u9876\u90E8\u5BFC\u822A-\u53EF\u9009"},{level:3,text:"\u4E2A\u6027\u5316\u8BBE\u7F6E",id:"\u4E2A\u6027\u5316\u8BBE\u7F6E"},{level:2,text:"\u7ED3\u8BED",id:"\u7ED3\u8BED"}]},"/zh/articles/how-to-build-fast-ssr-app":{html:kg,data:{title:"\u5982\u4F55\u5728 2026 \u5E74\u4F7F\u7528 Lupine.js \u6784\u5EFA\u6781\u901F SSR \u5E94\u7528",published:!0,description:"\u63A2\u7D22 Lupine.js\uFF0C\u4E00\u4E2A\u4EC5 7kb \u5927\u5C0F\u3001\u5185\u7F6E SSR\u3001CSS-in-JS \u4E14\u96F6\u914D\u7F6E\u7684\u7C7B React \u6846\u67B6\u3002",tags:"javascript, webdev, react, performance",series:"\u5F00\u6E90\u805A\u7126"},headings:[{level:2,text:"\u4E3A\u4EC0\u4E48\u9009\u62E9 Lupine.js\uFF1F",id:"\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-js"},{level:2,text:"1. \u51E0\u79D2\u949F\u5185\u5F00\u59CB",id:"1-\u51E0\u79D2\u949F\u5185\u5F00\u59CB"},{level:2,text:'2. "Hello World" (\u4EA6\u5728\u670D\u52A1\u7AEF\u6E32\u67D3)',id:"2-hello-world-\u4EA6\u5728\u670D\u52A1\u7AEF\u6E32\u67D3"},{level:3,text:"\u8FD9\u91CC\u53D1\u751F\u4E86\u4EC0\u4E48\uFF1F",id:"\u8FD9\u91CC\u53D1\u751F\u4E86\u4EC0\u4E48"},{level:2,text:"3. \u96F6\u914D\u7F6E SSR \u4E0E SEO",id:"3-\u96F6\u914D\u7F6E-ssr-\u4E0E-seo"},{level:2,text:"4. \u5F3A\u5927\u7684\u8DEF\u7531\u7CFB\u7EDF",id:"4-\u5F3A\u5927\u7684\u8DEF\u7531\u7CFB\u7EDF"},{level:2,text:"\u603B\u7ED3",id:"\u603B\u7ED3"}]},"/zh/articles/introduce-lupine.js":{html:wg,data:{title:"Lupine.js \u4ECB\u7ECD",description:"\u8F7B\u91CF\u7EA7\u524D\u7AEF & \u9AD8\u6548\u540E\u7AEF\u6846\u67B6"},headings:[{level:2,text:"\u4E3A\u4EC0\u4E48\u9009\u62E9 Lupine.js\uFF1F",id:"\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-js"},{level:3,text:"1. \u{1FAB6} \u6781\u5176\u8F7B\u91CF\u7684\u524D\u7AEF",id:"1-\u6781\u5176\u8F7B\u91CF\u7684\u524D\u7AEF"},{level:3,text:"2. \u26A1 \u5185\u7F6E\u670D\u52A1\u7AEF\u6E32\u67D3 (SSR)",id:"2-\u5185\u7F6E\u670D\u52A1\u7AEF\u6E32\u67D3-ssr"},{level:3,text:"3. \u{1F3A8} \u539F\u751F CSS-in-JS \u5F15\u64CE",id:"3-\u539F\u751F-css-in-js-\u5F15\u64CE"},{level:3,text:"4. \u{1F680} \u5168\u6808\u5408\u4E00",id:"4-\u5168\u6808\u5408\u4E00"},{level:2,text:"\u5FEB\u901F\u5F00\u59CB",id:"\u5FEB\u901F\u5F00\u59CB"},{level:3,text:"\u7B2C\u4E00\u6B65\uFF1A\u521B\u5EFA\u9879\u76EE",id:"\u7B2C\u4E00\u6B65-\u521B\u5EFA\u9879\u76EE"},{level:3,text:"\u7B2C\u4E8C\u6B65\uFF1A\u8FD0\u884C\u9879\u76EE",id:"\u7B2C\u4E8C\u6B65-\u8FD0\u884C\u9879\u76EE"},{level:2,text:"\u4EE3\u7801\u6D3B\u8DC3\u5EA6",id:"\u4EE3\u7801\u6D3B\u8DC3\u5EA6"},{level:2,text:"\u603B\u7ED3",id:"\u603B\u7ED3"}]},"/zh/articles/introduce-lupine.press":{html:Sg,data:{title:"Lupine.Press\uFF1A\u4E3A\u6781\u901F\u6587\u6863\u800C\u751F",description:"\u57FA\u4E8E Lupine.js \u7684\u8D85\u8F7B\u91CF\u7EA7\u6587\u6863\u7F51\u7AD9\u751F\u6210\u5668"},headings:[{level:2,text:"\u4E3A\u4EC0\u4E48\u9009\u62E9 Lupine.Press\uFF1F",id:"\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-press"},{level:3,text:"1. \u26A1 \u96BE\u4EE5\u7F6E\u4FE1\u7684\u5FEB",id:"1-\u96BE\u4EE5\u7F6E\u4FE1\u7684\u5FEB"},{level:3,text:"2. \u{1F4DD} Markdown \u9A71\u52A8\u7684\u4E00\u5207",id:"2-markdown-\u9A71\u52A8\u7684\u4E00\u5207"},{level:3,text:"3. \u{1F3A8} \u5F00\u7BB1\u5373\u7528\u7684\u4E13\u4E1A\u8BBE\u8BA1",id:"3-\u5F00\u7BB1\u5373\u7528\u7684\u4E13\u4E1A\u8BBE\u8BA1"},{level:3,text:"4. \u{1F6E0}\uFE0F \u7075\u6D3B\u7684\u6269\u5C55\u6027",id:"4-\u7075\u6D3B\u7684\u6269\u5C55\u6027"},{level:2,text:"\u90E8\u7F72\u9ED1\u79D1\u6280\uFF1AGitHub Pages \u4E5F\u80FD\u8DD1 SPA\uFF1F",id:"\u90E8\u7F72\u9ED1\u79D1\u6280-github-pages-\u4E5F\u80FD\u8DD1-spa"},{level:3,text:"\u806A\u660E\u4EBA\u90FD\u77E5\u9053\u7684 404.html",id:"\u806A\u660E\u4EBA\u90FD\u77E5\u9053\u7684-404-html"},{level:2,text:"\u5FEB\u901F\u4E0A\u624B",id:"\u5FEB\u901F\u4E0A\u624B"},{level:2,text:"\u53D1\u5E03\u5230 GitHub Pages",id:"\u53D1\u5E03\u5230-github-pages"}]},"/zh/articles/ssr-comparison":{html:Cg,data:{title:"SSR \u6DF1\u5EA6\u89E3\u6790: React vs Angular vs Lupine.js",published:!0,description:"2026 \u5E74\u670D\u52A1\u7AEF\u6E32\u67D3 (SSR) \u6280\u672F\u65B9\u6848\u7684\u786C\u6838\u5BF9\u6BD4\u3002",tags:"ssr, architecture, react, angular, performance",series:"\u67B6\u6784\u5BF9\u6BD4"},headings:[{level:2,text:"1. \u6E32\u67D3\u67B6\u6784\u5BF9\u6BD4",id:"1-\u6E32\u67D3\u67B6\u6784\u5BF9\u6BD4"},{level:3,text:"React (Next.js/Remix)",id:"react-next-js-remix"},{level:3,text:"Angular (SSR / Modern Hydration)",id:"angular-ssr-modern-hydration"},{level:3,text:"Lupine.js",id:"lupine-js"},{level:2,text:'2. \u89E3\u51B3 "FOUC" (\u65E0\u6837\u5F0F\u5185\u5BB9\u95EA\u70C1)',id:"2-\u89E3\u51B3-fouc-\u65E0\u6837\u5F0F\u5185\u5BB9\u95EA\u70C1"},{level:3,text:"\u95EE\u9898",id:"\u95EE\u9898"},{level:3,text:"React / Next.js",id:"react-next-js"},{level:3,text:"Lupine.js",id:"lupine-js"},{level:2,text:"3. \u6570\u636E\u83B7\u53D6\u4E0E\u6C34\u5408",id:"3-\u6570\u636E\u83B7\u53D6\u4E0E\u6C34\u5408"},{level:3,text:"React (Next.js App Router)",id:"react-next-js-app-router"},{level:3,text:"Lupine.js",id:"lupine-js"},{level:2,text:"4. \u6027\u80FD\u4E0E\u5305\u4F53\u79EF",id:"4-\u6027\u80FD\u4E0E\u5305\u4F53\u79EF"},{level:2,text:"\u603B\u7ED3: \u5982\u4F55\u9009\u62E9\uFF1F",id:"\u603B\u7ED3-\u5982\u4F55\u9009\u62E9"}]},"/zh/essentials/api":{html:Tg,data:{title:"API \u53C2\u8003"},headings:[{level:3,text:"\u{1F3D7}\uFE0F \u67B6\u6784\u4E0E\u5DE5\u4F5C\u6D41 (Architecture & Workflow)",id:"\u67B6\u6784\u4E0E\u5DE5\u4F5C\u6D41-architecture-workflow"},{level:3,text:"\u{1F333} RootApi \u4E0E StaticServer",id:"rootapi-\u4E0E-staticserver"},{level:3,text:"\u{1F3E5} \u5065\u5EB7\u68C0\u67E5\u793A\u4F8B (Health Check)",id:"\u5065\u5EB7\u68C0\u67E5\u793A\u4F8B-health-check"}]},"/zh/essentials/css-in-js":{html:Pg,data:{title:"CSS-in-JS"},headings:[{level:2,text:"1. \u{1F423} \u57FA\u672C\u7528\u6CD5",id:"1-\u57FA\u672C\u7528\u6CD5"},{level:2,text:"2. \u{1F680} \u9AD8\u7EA7\u7279\u6027",id:"2-\u9AD8\u7EA7\u7279\u6027"},{level:3,text:"2.1 \u{1F38E} \u5D4C\u5957\u4E0E\u7236\u9009\u62E9\u5668 (&)",id:"2-1-\u5D4C\u5957\u4E0E\u7236\u9009\u62E9\u5668"},{level:3,text:"2.2 \u{1F6E1}\uFE0F \u4F7F\u7528 & \u8FDB\u884C\u4F5C\u7528\u57DF\u7BA1\u7406 (\u52A8\u6001\u7EC4\u4EF6 ID)",id:"2-2-\u4F7F\u7528-\u8FDB\u884C\u4F5C\u7528\u57DF\u7BA1\u7406-\u52A8\u6001\u7EC4\u4EF6-id"},{level:3,text:"2.3 \u26A1 \u5355\u884C\u591A\u5B9A\u4E49",id:"2-3-\u5355\u884C\u591A\u5B9A\u4E49"},{level:3,text:"2.4 \u{1F4F1} \u5A92\u4F53\u67E5\u8BE2 (@media)",id:"2-4-\u5A92\u4F53\u67E5\u8BE2-media"},{level:3,text:"2.5 \u{1F3AC} \u5173\u952E\u5E27\u52A8\u753B (@keyframes)",id:"2-5-\u5173\u952E\u5E27\u52A8\u753B-keyframes"},{level:2,text:"3. \u{1F30F} \u5168\u5C40\u6837\u5F0F (bindGlobalStyle)",id:"3-\u5168\u5C40\u6837\u5F0F-bindglobalstyle"}]},"/zh/essentials/dashboard":{html:Mg,data:{title:"Dashboard (\u7BA1\u7406\u9762\u677F)"},headings:[{level:2,text:"\u529F\u80FD\u7279\u6027 (Features)",id:"\u529F\u80FD\u7279\u6027-features"},{level:3,text:"1. \u6570\u636E\u5E93\u7BA1\u7406 (DB)",id:"1-\u6570\u636E\u5E93\u7BA1\u7406-db"},{level:3,text:"2. \u8FD0\u7EF4\u4E0E\u670D\u52A1\u5668\u7BA1\u7406 (Access & Server Info)",id:"2-\u8FD0\u7EF4\u4E0E\u670D\u52A1\u5668\u7BA1\u7406-access-server-info"},{level:3,text:"3. \u5F00\u53D1\u4E0E\u6D4B\u8BD5 (Test)",id:"3-\u5F00\u53D1\u4E0E\u6D4B\u8BD5-test"},{level:2,text:"\u6269\u5C55\u5F00\u53D1",id:"\u6269\u5C55\u5F00\u53D1"},{level:3,text:"\u83DC\u5355\u914D\u7F6E",id:"\u83DC\u5355\u914D\u7F6E"},{level:3,text:"\u9875\u9762\u5F00\u53D1",id:"\u9875\u9762\u5F00\u53D1"}]},"/zh/essentials/icons":{html:Lg,data:{title:"\u56FE\u6807\u5B57\u4F53\u5B9A\u5236"},headings:[{level:2,text:"\u56FE\u6807\u5B57\u4F53\u5B9A\u5236",id:"\u56FE\u6807\u5B57\u4F53\u5B9A\u5236"}]},"/zh/essentials/index":{html:Eg,data:{sidebar:[{type:"group",text:"\u6838\u5FC3\u8981\u70B9",level:0},{type:"link",text:"SSR (\u670D\u52A1\u7AEF\u6E32\u67D3)",link:"/zh/essentials/ssr",level:1},{type:"link",text:"Page Router (\u9875\u9762\u8DEF\u7531)",link:"/zh/essentials/page-route",level:1},{type:"link",text:"CSS-in-JS",link:"/zh/essentials/css-in-js",level:1},{type:"link",text:"Theme (\u4E3B\u9898)",link:"/zh/essentials/theme",level:1},{type:"link",text:"List (\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3\u4E0E\u7F16\u8F91)",link:"/zh/essentials/list",level:1},{type:"link",text:"\u79FB\u52A8\u7AEF\u548C\u684C\u9762\u7AEF\u9002\u914D",link:"/zh/essentials/mobile-desktop",level:1},{type:"link",text:"API \u53C2\u8003",link:"/zh/essentials/api",level:1},{type:"link",text:"Dashboard (\u7BA1\u7406\u9762\u677F)",link:"/zh/essentials/dashboard",level:1},{type:"link",text:"\u56FE\u6807\u5B57\u4F53\u5B9A\u5236",link:"/zh/essentials/icons",level:1}]},headings:[]},"/zh/essentials/list":{html:Ag,data:{title:"List (\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3\u4E0E\u7F16\u8F91)"},headings:[{level:2,text:"1. \u26A1 \u4E3A\u4EC0\u4E48\u5B83\u5F88\u5FEB\uFF1F",id:"1-\u4E3A\u4EC0\u4E48\u5B83\u5F88\u5FEB"},{level:2,text:'2. \u{1F3AF} "\u70B9\u5BF9\u70B9\u66F4\u65B0 (Spot-Update)" \u7B56\u7565',id:"2-\u70B9\u5BF9\u70B9\u66F4\u65B0-spot-update-\u7B56\u7565"},{level:3,text:"\u4F18\u52BF",id:"\u4F18\u52BF"},{level:2,text:"3. \u{1F4BB} \u4EE3\u7801\u793A\u4F8B\uFF1A\u53EF\u7F16\u8F91\u5217\u8868",id:"3-\u4EE3\u7801\u793A\u4F8B-\u53EF\u7F16\u8F91\u5217\u8868"},{level:3,text:"\u{1F4E6} \u7B2C\u4E00\u6B65\uFF1A\u5217\u8868\u5BB9\u5668\uFF08\u7236\u7EC4\u4EF6\uFF09",id:"\u7B2C\u4E00\u6B65-\u5217\u8868\u5BB9\u5668-\u7236\u7EC4\u4EF6"},{level:3,text:"\u26A1 \u7B2C\u4E8C\u6B65\uFF1A\u4F18\u5316\u540E\u7684\u884C\uFF08\u5B50\u7EC4\u4EF6\uFF09",id:"\u7B2C\u4E8C\u6B65-\u4F18\u5316\u540E\u7684\u884C-\u5B50\u7EC4\u4EF6"},{level:3,text:"\u270F\uFE0F \u7B2C\u4E09\u6B65\uFF1A\u884C\u5185\u7F16\u8F91\uFF08\u8FDB\u9636\uFF09",id:"\u7B2C\u4E09\u6B65-\u884C\u5185\u7F16\u8F91-\u8FDB\u9636"},{level:2,text:"\u603B\u7ED3",id:"\u603B\u7ED3"}]},"/zh/essentials/mobile-desktop":{html:Rg,data:{title:"\u79FB\u52A8\u7AEF\u548C\u684C\u9762\u7AEF\u9002\u914D"},headings:[{level:2,text:"1. \u54CD\u5E94\u5F0F\u5E03\u5C40 (Media Query)",id:"1-\u54CD\u5E94\u5F0F\u5E03\u5C40-media-query"},{level:3,text:"\u65AD\u70B9\u5B9A\u4E49 (Breakpoints)",id:"\u65AD\u70B9\u5B9A\u4E49-breakpoints"},{level:3,text:"\u5728 CSS-in-JS \u4E2D\u4F7F\u7528",id:"\u5728-css-in-js-\u4E2D\u4F7F\u7528"},{level:2,text:"2. \u81EA\u9002\u5E94\u6846\u67B6 (Adaptive Frames)",id:"2-\u81EA\u9002\u5E94\u6846\u67B6-adaptive-frames"},{level:3,text:"ResponsiveFrame",id:"responsiveframe"},{level:3,text:"SliderFrame",id:"sliderframe"},{level:2,text:"3. \u79FB\u52A8\u7AEF\u5BFC\u822A\u4E0E\u4EA4\u4E92",id:"3-\u79FB\u52A8\u7AEF\u5BFC\u822A\u4E0E\u4EA4\u4E92"},{level:3,text:"\u5168\u5C40\u8FD4\u56DE\u952E\u5904\u7406 (BackActionHelper)",id:"\u5168\u5C40\u8FD4\u56DE\u952E\u5904\u7406-backactionhelper"},{level:3,text:"ActionSheet (\u52A8\u4F5C\u9762\u677F)",id:"actionsheet-\u52A8\u4F5C\u9762\u677F"},{level:3,text:"MobileHeader (\u79FB\u52A8\u7AEF\u6807\u9898\u680F)",id:"mobileheader-\u79FB\u52A8\u7AEF\u6807\u9898\u680F"},{level:3,text:"SlideTabComponent (\u6ED1\u52A8\u6807\u7B7E\u9875)",id:"slidetabcomponent-\u6ED1\u52A8\u6807\u7B7E\u9875"},{level:3,text:"\u6761\u4EF6\u7F16\u8BD1 (Conditional Compilation)",id:"\u6761\u4EF6\u7F16\u8BD1-conditional-compilation"},{level:3,text:"\u6DFB\u52A0 iOS \u548C Android",id:"\u6DFB\u52A0-ios-\u548C-android"},{level:2,text:"5. \u684C\u9762\u7AEF\u53D1\u5E03 (Desktop Deployment)",id:"5-\u684C\u9762\u7AEF\u53D1\u5E03-desktop-deployment"},{level:3,text:"\u684C\u9762\u7AEF\u7ED3\u6784",id:"\u684C\u9762\u7AEF\u7ED3\u6784"},{level:3,text:"\u6784\u5EFA\u547D\u4EE4",id:"\u6784\u5EFA\u547D\u4EE4"}]},"/zh/essentials/page-route":{html:Dg,data:{title:"Page Router (\u9875\u9762\u8DEF\u7531)"},headings:[{level:2,text:"1. \u2696\uFE0F \u4E0E\u5176\u4ED6\u6846\u67B6\u7684\u5BF9\u6BD4",id:"1-\u4E0E\u5176\u4ED6\u6846\u67B6\u7684\u5BF9\u6BD4"},{level:2,text:"2. \u{1F423} \u57FA\u672C\u7528\u6CD5",id:"2-\u57FA\u672C\u7528\u6CD5"},{level:2,text:"3. \u{1F527} \u52A8\u6001\u53C2\u6570",id:"3-\u52A8\u6001\u53C2\u6570"},{level:3,text:"\u8BED\u6CD5",id:"\u8BED\u6CD5"},{level:3,text:"\u793A\u4F8B",id:"\u793A\u4F8B"},{level:2,text:"4. \u{1F680} \u9AD8\u7EA7\u7279\u6027",id:"4-\u9AD8\u7EA7\u7279\u6027"},{level:3,text:"4.1 \u{1F38E} \u5D4C\u5957\u8DEF\u7531 (\u6A21\u5757\u5316)",id:"4-1-\u5D4C\u5957\u8DEF\u7531-\u6A21\u5757\u5316"},{level:3,text:"4.2 \u{1F6E1}\uFE0F \u4E2D\u95F4\u4EF6\u8FC7\u6EE4\u5668 (\u9274\u6743)",id:"4-2-\u4E2D\u95F4\u4EF6\u8FC7\u6EE4\u5668-\u9274\u6743"},{level:3,text:"4.3 \u{1F5BC}\uFE0F \u6846\u67B6\u9875\u9762 (\u5E03\u5C40)",id:"4-3-\u6846\u67B6\u9875\u9762-\u5E03\u5C40"},{level:3,text:"4.4 \u{1F4C2} \u5B50\u76EE\u5F55\u90E8\u7F72",id:"4-4-\u5B50\u76EE\u5F55\u90E8\u7F72"}]},"/zh/essentials/ssr":{html:Hg,data:{title:"SSR (\u670D\u52A1\u7AEF\u6E32\u67D3)"},headings:[{level:2,text:"1. \u2699\uFE0F \u5DE5\u4F5C\u539F\u7406",id:"1-\u5DE5\u4F5C\u539F\u7406"},{level:3,text:"\u6D41\u7A0B\uFF1A",id:"\u6D41\u7A0B"},{level:2,text:"2. \u{1F50D} \u96F6\u914D\u7F6E SEO",id:"2-\u96F6\u914D\u7F6E-seo"},{level:3,text:"\u793A\u4F8B\uFF1A\u793E\u4EA4\u5206\u4EAB (OpenGraph)",id:"\u793A\u4F8B-\u793E\u4EA4\u5206\u4EAB-opengraph"},{level:2,text:"3. \u{1F6E0}\uFE0F \u73AF\u5883\u53D8\u91CF",id:"3-\u73AF\u5883\u53D8\u91CF"},{level:3,text:"\u5B9A\u4E49\u53D8\u91CF",id:"\u5B9A\u4E49\u53D8\u91CF"},{level:3,text:"\u8BBF\u95EE\u53D8\u91CF",id:"\u8BBF\u95EE\u53D8\u91CF"},{level:2,text:"4. \u2699\uFE0F WebConfig: \u52A8\u6001\u8FD0\u884C\u65F6\u914D\u7F6E",id:"4-webconfig-\u52A8\u6001\u8FD0\u884C\u65F6\u914D\u7F6E"},{level:3,text:"\u7528\u6CD5",id:"\u7528\u6CD5"},{level:2,text:"5. \u26A1 \u667A\u80FD\u7F13\u5B58\u4E0E\u6027\u80FD",id:"5-\u667A\u80FD\u7F13\u5B58\u4E0E\u6027\u80FD"}]},"/zh/essentials/theme":{html:Ig,data:{title:"Theme (\u4E3B\u9898)"},headings:[{level:2,text:"1. \u{1F3C1} \u8BBE\u7F6E (Setup)",id:"1-\u8BBE\u7F6E-setup"},{level:3,text:"bindTheme",id:"bindtheme"},{level:2,text:"2. \u{1F3AE} \u7528\u6CD5 (Usage)",id:"2-\u7528\u6CD5-usage"},{level:3,text:"\u8BBF\u95EE\u4E0E\u66F4\u65B0",id:"\u8BBF\u95EE\u4E0E\u66F4\u65B0"},{level:3,text:"ThemeSelector \u7EC4\u4EF6",id:"themeselector-\u7EC4\u4EF6"},{level:2,text:"3. \u26A1 \u670D\u52A1\u7AEF\u6E32\u67D3 (SSR)",id:"3-\u670D\u52A1\u7AEF\u6E32\u67D3-ssr"},{level:2,text:"4. \u{1F6E0}\uFE0F \u7BA1\u7406\u5DE5\u5177 (Admin Tools)",id:"4-\u7BA1\u7406\u5DE5\u5177-admin-tools"}]},"/zh/guide/install":{html:zg,data:{title:"\u5B89\u88C5\u8BF4\u660E"},headings:[{level:2,text:"\u5FEB\u901F\u5F00\u59CB",id:"\u5FEB\u901F\u5F00\u59CB"},{level:3,text:"1. \u521B\u5EFA\u9879\u76EE",id:"1-\u521B\u5EFA\u9879\u76EE"},{level:3,text:"2. \u5B89\u88C5\u4F9D\u8D56",id:"2-\u5B89\u88C5\u4F9D\u8D56"},{level:3,text:"3. \u914D\u7F6E\u73AF\u5883",id:"3-\u914D\u7F6E\u73AF\u5883"},{level:3,text:"4. \u8FD0\u884C\u5F00\u53D1\u5E94\u7528\u7A0B\u5E8F",id:"4-\u8FD0\u884C\u5F00\u53D1\u5E94\u7528\u7A0B\u5E8F"},{level:2,text:"\u672C\u5730 HTTPS \u8BBE\u7F6E",id:"\u672C\u5730-https-\u8BBE\u7F6E"},{level:3,text:"\u66FF\u4EE3\u65B9\u6848\uFF1A\u901A\u8FC7 OpenSSL \u751F\u6210\u81EA\u7B7E\u540D\u8BC1\u4E66",id:"\u66FF\u4EE3\u65B9\u6848-\u901A\u8FC7-openssl-\u751F\u6210\u81EA\u7B7E\u540D\u8BC1\u4E66"},{level:2,text:"\u8C03\u8BD5",id:"\u8C03\u8BD5"},{level:3,text:"\u4EC5\u8C03\u8BD5\u540E\u7AEF",id:"\u4EC5\u8C03\u8BD5\u540E\u7AEF"},{level:3,text:"\u8C03\u8BD5\u524D\u7AEF\u548C\u540E\u7AEF",id:"\u8C03\u8BD5\u524D\u7AEF\u548C\u540E\u7AEF"},{level:2,text:"\u6DFB\u52A0\u65B0\u5E94\u7528",id:"\u6DFB\u52A0\u65B0\u5E94\u7528"},{level:3,text:"\u672C\u5730\u865A\u62DF\u57DF\u540D\u8BBE\u7F6E",id:"\u672C\u5730\u865A\u62DF\u57DF\u540D\u8BBE\u7F6E"},{level:3,text:"\u521B\u5EFA\u5B50\u6587\u4EF6\u5939\u5E94\u7528",id:"\u521B\u5EFA\u5B50\u6587\u4EF6\u5939\u5E94\u7528"},{level:2,text:"\u91CD\u8981\u63D0\u793A\uFF1ASSR \u4E2D\u7684\u5168\u5C40\u53D8\u91CF",id:"\u91CD\u8981\u63D0\u793A-ssr-\u4E2D\u7684\u5168\u5C40\u53D8\u91CF"}]},"/zh/guide/started":{html:jg,data:{title:"\u5FEB\u901F\u5F00\u59CB"},headings:[{level:2,text:"\u6838\u5FC3\u7279\u6027 (Core Essentials)",id:"\u6838\u5FC3\u7279\u6027-core-essentials"},{level:3,text:"\u26A1 \u670D\u52A1\u7AEF\u6E32\u67D3 (SSR) \u4F18\u5148",id:"\u670D\u52A1\u7AEF\u6E32\u67D3-ssr-\u4F18\u5148-essentials-ssr"},{level:3,text:"\u{1F3A8} \u5185\u7F6E CSS-in-JS",id:"\u5185\u7F6E-css-in-js-essentials-css-in-js"},{level:3,text:"\u{1F6E3}\uFE0F \u5F3A\u5927\u7684\u9875\u9762\u8DEF\u7531",id:"\u5F3A\u5927\u7684\u9875\u9762\u8DEF\u7531-essentials-page-route"},{level:3,text:"\u{1F317} \u4E3B\u9898\u7CFB\u7EDF",id:"\u4E3B\u9898\u7CFB\u7EDF-essentials-theme"},{level:3,text:"\u{1F4DD} \u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3",id:"\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3-essentials-list"},{level:3,text:"\u{1F4E1} \u5168\u6808\u5F00\u53D1\u4F53\u9A8C",id:"\u5168\u6808\u5F00\u53D1\u4F53\u9A8C-essentials-api"},{level:3,text:"\u{1F916} AI \u8F85\u52A9\u5F00\u53D1",id:"ai-\u8F85\u52A9\u5F00\u53D1"}]},"/zh/index":{html:Bg,data:{layout:"home",title:"Lupine.js \u6587\u6863","sidemenu-width":"260px","github-title":"GitHub \u4ED3\u5E93","github-link":"https://github.com/uuware/lupine.js",lang:{title:"\u7B80\u4F53\u4E2D\u6587",id:"zh"},hero:{name:"Lupine.js",text:"\u6613\u7528\u3001\u5FEB\u901F\u3001\u5168\u6808",tagline:"\u5305\u542B\u524D\u540E\u7AEF\u670D\u52A1\u7684\u5168\u529F\u80FD Web \u5E94\u7528\u7A0B\u5E8F\u6846\u67B6\u3002",actions:[{theme:"brand",text:"\u5FEB\u901F\u5F00\u59CB",link:"/zh/guide/started"},{theme:"alt",text:"GitHub \u4ED3\u5E93",link:"https://github.com/uuware/lupine.js"}]},nav:[{text:"\u6307\u5357",link:"/zh/guide/started"},{text:"\u6F14\u793A",link:"/demo",target:"_blank"}],sidebar:[{type:"group",text:"\u6307\u5357",level:0},{type:"link",text:"\u5FEB\u901F\u5F00\u59CB",link:"/zh/guide/started",level:1},{type:"link",text:"\u5B89\u88C5\u8BF4\u660E",link:"/zh/guide/install",level:1},{type:"group",text:"\u6587\u7AE0\u6C47\u96C6",level:0},{type:"link",text:"Lupine.js \u4ECB\u7ECD",link:"/zh/articles/introduce-lupine.js",level:1},{type:"link",text:"\u96F6\u4F9D\u8D56\uFF0CLupine.js \u5982\u4F55\u5B9E\u73B0\u539F\u751F CSS-in-JS\uFF1F",link:"/zh/articles/css-in-js-lupine.js",level:1},{type:"link",text:"Lupine.Press\uFF1A\u4E3A\u6781\u901F\u6587\u6863\u800C\u751F",link:"/zh/articles/introduce-lupine.press",level:1},{type:"link",text:"SSR \u6DF1\u5EA6\u89E3\u6790: React vs Angular vs Lupine.js",link:"/zh/articles/ssr-comparison",level:1},{type:"link",text:"\u5982\u4F55\u5728 2026 \u5E74\u4F7F\u7528 Lupine.js \u6784\u5EFA\u6781\u901F SSR \u5E94\u7528",link:"/zh/articles/how-to-build-fast-ssr-app",level:1},{type:"link",text:"\u4E00\u5957\u4EE3\u7801\uFF0C\u591A\u7AEF\u8FD0\u884C\uFF1A\u4F7F\u7528 Lupine.js \u6784\u5EFA Web\u3001\u79FB\u52A8\u548C\u684C\u9762\u5E94\u7528",link:"/zh/articles/cross-platform-app",level:1},{type:"link",text:"\u5341\u5206\u949F\uFF01\u7528 Markdown \u6781\u901F\u6784\u5EFA\u9AD8\u989C\u503C\u7684\u4E2A\u4EBA\u7B80\u5386\u7F51\u7AD9",link:"/zh/articles/cv-generator",level:1},{type:"group",text:"\u6838\u5FC3\u8981\u70B9",level:0},{type:"link",text:"SSR (\u670D\u52A1\u7AEF\u6E32\u67D3)",link:"/zh/essentials/ssr",level:1},{type:"link",text:"Page Router (\u9875\u9762\u8DEF\u7531)",link:"/zh/essentials/page-route",level:1},{type:"link",text:"CSS-in-JS",link:"/zh/essentials/css-in-js",level:1},{type:"link",text:"Theme (\u4E3B\u9898)",link:"/zh/essentials/theme",level:1},{type:"link",text:"List (\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3\u4E0E\u7F16\u8F91)",link:"/zh/essentials/list",level:1},{type:"link",text:"\u79FB\u52A8\u7AEF\u548C\u684C\u9762\u7AEF\u9002\u914D",link:"/zh/essentials/mobile-desktop",level:1},{type:"link",text:"API \u53C2\u8003",link:"/zh/essentials/api",level:1},{type:"link",text:"Dashboard (\u7BA1\u7406\u9762\u677F)",link:"/zh/essentials/dashboard",level:1},{type:"link",text:"\u56FE\u6807\u5B57\u4F53\u5B9A\u5236",link:"/zh/essentials/icons",level:1},{type:"group",text:"Lupine.web",level:0},{type:"link",text:"\u6982\u89C8",link:"/zh/lupine.web/overview",level:1},{type:"group",text:"Lupine.components (\u7EC4\u4EF6)",level:0},{type:"group",text:"\u7A97\u53E3\u4E0E\u5BF9\u8BDD\u6846",level:1},{type:"link",text:"FloatWindow (\u6D6E\u7A97)",link:"/zh/lupine.components/float-window",level:2},{type:"link",text:"Modal (\u6A21\u6001\u6846)",link:"/zh/lupine.components/modal",level:2},{type:"link",text:"MessageBox (\u6D88\u606F\u6846)",link:"/zh/lupine.components/message-box",level:2},{type:"link",text:"Action Sheet (\u52A8\u4F5C\u5217\u8868)",link:"/zh/lupine.components/action-sheet",level:2},{type:"group",text:"\u5BFC\u822A\u4E0E\u83DC\u5355",level:1},{type:"link",text:"MenuSidebar (\u4FA7\u8FB9\u5BFC\u822A\u680F)",link:"/zh/lupine.components/menu-sidebar",level:2},{type:"link",text:"Menubar (\u6A2A\u5411\u83DC\u5355\u680F)",link:"/zh/lupine.components/menu-bar",level:2},{type:"link",text:"PopupMenu (\u5F39\u51FA\u83DC\u5355)",link:"/zh/lupine.components/popup-menu",level:2},{type:"link",text:"Tabs (\u9009\u9879\u5361)",link:"/zh/lupine.components/tabs",level:2},{type:"link",text:"SlideTab (\u6ED1\u52A8\u9009\u9879\u5361)",link:"/zh/lupine.components/slide-tab",level:2},{type:"link",text:"PagingLink (\u5206\u9875\u94FE\u63A5)",link:"/zh/lupine.components/paging-link",level:2},{type:"group",text:"\u8868\u5355\u4E0E\u8F93\u5165",level:1},{type:"link",text:"Button (\u6309\u94AE)",link:"/zh/lupine.components/button",level:2},{type:"link",text:"ToggleSwitch (\u5207\u6362\u5F00\u5173)",link:"/zh/lupine.components/toggle-switch",level:2},{type:"link",text:"InputWithTitle (\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846)",link:"/zh/lupine.components/input-with-title",level:2},{type:"link",text:"SelectWithTitle (\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868)",link:"/zh/lupine.components/select-with-title",level:2},{type:"link",text:"RadioLabel (\u5355\u9009\u7EC4)",link:"/zh/lupine.components/radio-label",level:2},{type:"link",text:"EditableLabel (\u53EF\u7F16\u8F91\u6807\u7B7E)",link:"/zh/lupine.components/editable-label",level:2},{type:"link",text:"Stars (\u661F\u7EA7\u8BC4\u5206)",link:"/zh/lupine.components/stars",level:2},{type:"link",text:"SelectAngle (\u89D2\u5EA6\u9009\u62E9)",link:"/zh/lupine.components/select-angle",level:2},{type:"group",text:"\u5185\u5BB9\u4E0E\u5E03\u5C40",level:1},{type:"link",text:"Grid (\u7F51\u683C)",link:"/zh/lupine.components/grid",level:2},{type:"link",text:"HtmlVar",link:"/zh/lupine.components/html-var",level:2},{type:"link",text:"HtmlLoad (HTML \u52A0\u8F7D)",link:"/zh/lupine.components/html-load",level:2},{type:"link",text:"NoticeMessage (\u901A\u77E5\u6D88\u606F)",link:"/zh/lupine.components/notice-message",level:2},{type:"link",text:"Progress (\u8FDB\u5EA6\u6761)",link:"/zh/lupine.components/progress",level:2},{type:"link",text:"Spinner (\u52A0\u8F7D\u52A8\u753B)",link:"/zh/lupine.components/spinner",level:2},{type:"link",text:"SvgIcon (SVG \u56FE\u6807)",link:"/zh/lupine.components/svg-icon",level:2},{type:"group",text:"\u6587\u672C\u7279\u6548",level:1},{type:"link",text:"TextGlow (\u53D1\u5149\u6587\u5B57)",link:"/zh/lupine.components/text-glow",level:2},{type:"link",text:"TextScale (\u7F29\u653E\u6587\u5B57)",link:"/zh/lupine.components/text-scale",level:2},{type:"link",text:"TextWave (\u6CE2\u52A8\u6587\u5B57)",link:"/zh/lupine.components/text-wave",level:2},{type:"group",text:"\u5176\u4ED6\u7EC4\u4EF6",level:1},{type:"link",text:"DragFresh (\u62D6\u52A8\u5237\u65B0)",link:"/zh/lupine.components/drag-fresh",level:2},{type:"link",text:"Redirect (\u91CD\u5B9A\u5411)",link:"/zh/lupine.components/redirect",level:2},{type:"link",text:"ResizableSplitter (\u53EF\u8C03\u5206\u5272\u5668)",link:"/zh/lupine.components/resizable-splitter",level:2},{type:"link",text:"SwitchOption (\u5207\u6362\u9009\u9879)",link:"/zh/lupine.components/switch-option",level:2},{type:"link",text:"ToggleBase (\u5207\u6362\u57FA\u7C7B)",link:"/zh/lupine.components/toggle-base",level:2},{type:"group",text:"Lupine.components-libs",level:0},{type:"group",text:"Utilities",level:1},{type:"link",text:"DateUtils",link:"/zh/lupine.components-libs/date-utils",level:2},{type:"link",text:"SimpleStorage",link:"/zh/lupine.components-libs/simple-storage",level:2},{type:"link",text:"DynamicalLoad",link:"/zh/lupine.components-libs/dynamical-load",level:2},{type:"link",text:"formatBytes",link:"/zh/lupine.components-libs/format-bytes",level:2},{type:"group",text:"DOM & UI Helpers",level:1},{type:"link",text:"DomUtils",link:"/zh/lupine.components-libs/dom-utils",level:2},{type:"link",text:"LiteDom",link:"/zh/lupine.components-libs/lite-dom",level:2},{type:"link",text:"DragUtil",link:"/zh/lupine.components-libs/drag-util",level:2},{type:"group",text:"Network & Files",level:1},{type:"link",text:"uploadFile",link:"/zh/lupine.components-libs/upload-file",level:2},{type:"link",text:"downloadStream",link:"/zh/lupine.components-libs/download-stream",level:2},{type:"group",text:"Event & State",level:1},{type:"link",text:"MessageHub",link:"/zh/lupine.components-libs/message-hub",level:2},{type:"link",text:"Observable",link:"/zh/lupine.components-libs/observable",level:2},{type:"group",text:"Lupine.api",level:0},{type:"group",text:"Core Concepts",level:1},{type:"link",text:"Server (\u670D\u52A1\u5668)",link:"/zh/lupine.api/app",level:2},{type:"link",text:"API Module (API \u6A21\u5757)",link:"/zh/lupine.api/api",level:2},{type:"group",text:"Tools",level:1},{type:"link",text:"Dashboard (\u7BA1\u7406\u9762\u677F)",link:"/zh/lupine.api/dashboard",level:2},{type:"group",text:"Lupine.press",level:0},{type:"link",text:"Press \u6587\u6863\u7CFB\u7EDF\u6982\u89C8",link:"/zh/lupine.press/overview",level:1}],styles:{":root":{"--primary-accent-color":"#0ac92a"}},features:[{title:"\u524D\u7AEF (lupine.web)",details:"\u6781\u5176\u8F7B\u91CF\u7EA7\uFF08\u5305\u542B\u6240\u6709\u6838\u5FC3\u529F\u80FD\u7684 hello-world \u9879\u76EE gzip \u540E\u4EC5 7kb\uFF09\u7684\u6846\u67B6\uFF0C\u4F7F\u7528 React TSX \u8BED\u6CD5\u3002\u65E0\u81C3\u80BF\u8FD0\u884C\u65F6\u3002"},{title:"\u540E\u7AEF (lupine.api)",details:"\u9AD8\u6548\u4E14\u7B80\u5316\u7684\u6846\u67B6\uFF0C\u7C7B\u4F3C\u4E8E Express\u3002\u4E3A\u670D\u52A1\u7AEF\u6E32\u67D3\u8FDB\u884C\u4E86\u4F18\u5316\u3002"},{title:"\u96F6\u4F9D\u8D56",details:"\u6781\u5C11\u7684\u4F9D\u8D56\u6811\uFF0C\u786E\u4FDD\u5FEB\u901F\u6784\u5EFA\u548C\u53EF\u9760\u90E8\u7F72\u3002"}]},headings:[]},"/zh/lupine.api/api":{html:Og,data:{title:"API Module (API \u6A21\u5757)"},headings:[{level:2,text:"\u4E3B\u8981\u7279\u6027 (Key Features)",id:"\u4E3B\u8981\u7279\u6027-key-features"},{level:2,text:"\u4F7F\u7528\u793A\u4F8B (Usage Example)",id:"\u4F7F\u7528\u793A\u4F8B-usage-example"}]},"/zh/lupine.api/app":{html:Fg,data:{title:"Server (\u670D\u52A1\u5668)"},headings:[{level:2,text:"\u4E3B\u8981\u7279\u6027 (Key Features)",id:"\u4E3B\u8981\u7279\u6027-key-features"},{level:2,text:"\u4F7F\u7528\u793A\u4F8B (Usage Example)",id:"\u4F7F\u7528\u793A\u4F8B-usage-example"}]},"/zh/lupine.api/dashboard":{html:qg,data:{title:"Dashboard (\u7BA1\u7406\u9762\u677F)"},headings:[]},"/zh/lupine.api/index":{html:Ng,data:{title:"Lupine.api",sidebar:[{type:"group",text:"Core Concepts",level:0},{type:"link",text:"Server (\u670D\u52A1\u5668)",link:"/zh/lupine.api/app",level:1},{type:"link",text:"API Module (API \u6A21\u5757)",link:"/zh/lupine.api/api",level:1},{type:"group",text:"Tools",level:0},{type:"link",text:"Dashboard (\u7BA1\u7406\u9762\u677F)",link:"/zh/lupine.api/dashboard",level:1}]},headings:[]},"/zh/lupine.components-libs/date-utils":{html:Wg,data:{title:"DateUtils"},headings:[]},"/zh/lupine.components-libs/dom-utils":{html:_g,data:{title:"DomUtils"},headings:[]},"/zh/lupine.components-libs/download-stream":{html:Ug,data:{title:"downloadStream"},headings:[]},"/zh/lupine.components-libs/drag-util":{html:$g,data:{title:"DragUtil"},headings:[]},"/zh/lupine.components-libs/dynamical-load":{html:Vg,data:{title:"DynamicalLoad"},headings:[]},"/zh/lupine.components-libs/format-bytes":{html:Gg,data:{title:"formatBytes"},headings:[]},"/zh/lupine.components-libs/index":{html:Yg,data:{title:"Lupine.components-libs",sidebar:[{type:"group",text:"Utilities",level:0},{type:"link",text:"DateUtils",link:"/zh/lupine.components-libs/date-utils",level:1},{type:"link",text:"SimpleStorage",link:"/zh/lupine.components-libs/simple-storage",level:1},{type:"link",text:"DynamicalLoad",link:"/zh/lupine.components-libs/dynamical-load",level:1},{type:"link",text:"formatBytes",link:"/zh/lupine.components-libs/format-bytes",level:1},{type:"group",text:"DOM & UI Helpers",level:0},{type:"link",text:"DomUtils",link:"/zh/lupine.components-libs/dom-utils",level:1},{type:"link",text:"LiteDom",link:"/zh/lupine.components-libs/lite-dom",level:1},{type:"link",text:"DragUtil",link:"/zh/lupine.components-libs/drag-util",level:1},{type:"group",text:"Network & Files",level:0},{type:"link",text:"uploadFile",link:"/zh/lupine.components-libs/upload-file",level:1},{type:"link",text:"downloadStream",link:"/zh/lupine.components-libs/download-stream",level:1},{type:"group",text:"Event & State",level:0},{type:"link",text:"MessageHub",link:"/zh/lupine.components-libs/message-hub",level:1},{type:"link",text:"Observable",link:"/zh/lupine.components-libs/observable",level:1}]},headings:[{level:2,text:"Utilities",id:"utilities"},{level:2,text:"DOM & UI Helpers",id:"dom-ui-helpers"},{level:2,text:"Network & Files",id:"network-files"},{level:2,text:"Event & State",id:"event-state"}]},"/zh/lupine.components-libs/lite-dom":{html:Jg,data:{title:"LiteDom"},headings:[]},"/zh/lupine.components-libs/message-hub":{html:Xg,data:{title:"MessageHub"},headings:[]},"/zh/lupine.components-libs/observable":{html:Kg,data:{title:"Observable"},headings:[]},"/zh/lupine.components-libs/simple-storage":{html:Qg,data:{title:"SimpleStorage"},headings:[]},"/zh/lupine.components-libs/upload-file":{html:Zg,data:{title:"uploadFile"},headings:[]},"/zh/lupine.components/action-sheet":{html:eh,data:{title:"Action Sheet (\u52A8\u4F5C\u5217\u8868)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/button":{html:th,data:{title:"Button (\u6309\u94AE)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/drag-fresh":{html:oh,data:{title:"DragFresh (\u62D6\u52A8\u5237\u65B0)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/editable-label":{html:nh,data:{title:"EditableLabel (\u53EF\u7F16\u8F91\u6807\u7B7E)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/float-window":{html:ih,data:{title:"FloatWindow (\u6D6E\u7A97)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/grid":{html:rh,data:{title:"Grid (\u7F51\u683C)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/html-load":{html:ah,data:{title:"HtmlLoad (HTML \u52A0\u8F7D)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/html-var":{html:sh,data:{title:"HtmlVar"},headings:[{level:2,text:"1. \u6B63\u786E\u7528\u6CD5",id:"1-\u6B63\u786E\u7528\u6CD5"},{level:3,text:"\u793A\u4F8B",id:"\u793A\u4F8B"},{level:2,text:"2. \u4E0E\u73B0\u4EE3\u6846\u67B6\u7684\u5BF9\u6BD4",id:"2-\u4E0E\u73B0\u4EE3\u6846\u67B6\u7684\u5BF9\u6BD4"},{level:2,text:"3. \u63A8\u8350\u7684\u8F85\u52A9\u51FD\u6570\uFF1Aval<T>",id:"3-\u63A8\u8350\u7684\u8F85\u52A9\u51FD\u6570-val-t"}]},"/zh/lupine.components/index":{html:lh,data:{title:"Lupine.components (\u7EC4\u4EF6)",sidebar:[{type:"group",text:"\u7A97\u53E3\u4E0E\u5BF9\u8BDD\u6846",level:0},{type:"link",text:"FloatWindow (\u6D6E\u7A97)",link:"/zh/lupine.components/float-window",level:1},{type:"link",text:"Modal (\u6A21\u6001\u6846)",link:"/zh/lupine.components/modal",level:1},{type:"link",text:"MessageBox (\u6D88\u606F\u6846)",link:"/zh/lupine.components/message-box",level:1},{type:"link",text:"Action Sheet (\u52A8\u4F5C\u5217\u8868)",link:"/zh/lupine.components/action-sheet",level:1},{type:"group",text:"\u5BFC\u822A\u4E0E\u83DC\u5355",level:0},{type:"link",text:"MenuSidebar (\u4FA7\u8FB9\u5BFC\u822A\u680F)",link:"/zh/lupine.components/menu-sidebar",level:1},{type:"link",text:"Menubar (\u6A2A\u5411\u83DC\u5355\u680F)",link:"/zh/lupine.components/menu-bar",level:1},{type:"link",text:"PopupMenu (\u5F39\u51FA\u83DC\u5355)",link:"/zh/lupine.components/popup-menu",level:1},{type:"link",text:"Tabs (\u9009\u9879\u5361)",link:"/zh/lupine.components/tabs",level:1},{type:"link",text:"SlideTab (\u6ED1\u52A8\u9009\u9879\u5361)",link:"/zh/lupine.components/slide-tab",level:1},{type:"link",text:"PagingLink (\u5206\u9875\u94FE\u63A5)",link:"/zh/lupine.components/paging-link",level:1},{type:"group",text:"\u8868\u5355\u4E0E\u8F93\u5165",level:0},{type:"link",text:"Button (\u6309\u94AE)",link:"/zh/lupine.components/button",level:1},{type:"link",text:"ToggleSwitch (\u5207\u6362\u5F00\u5173)",link:"/zh/lupine.components/toggle-switch",level:1},{type:"link",text:"InputWithTitle (\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846)",link:"/zh/lupine.components/input-with-title",level:1},{type:"link",text:"SelectWithTitle (\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868)",link:"/zh/lupine.components/select-with-title",level:1},{type:"link",text:"RadioLabel (\u5355\u9009\u7EC4)",link:"/zh/lupine.components/radio-label",level:1},{type:"link",text:"EditableLabel (\u53EF\u7F16\u8F91\u6807\u7B7E)",link:"/zh/lupine.components/editable-label",level:1},{type:"link",text:"Stars (\u661F\u7EA7\u8BC4\u5206)",link:"/zh/lupine.components/stars",level:1},{type:"link",text:"SelectAngle (\u89D2\u5EA6\u9009\u62E9)",link:"/zh/lupine.components/select-angle",level:1},{type:"group",text:"\u5185\u5BB9\u4E0E\u5E03\u5C40",level:0},{type:"link",text:"Grid (\u7F51\u683C)",link:"/zh/lupine.components/grid",level:1},{type:"link",text:"HtmlVar",link:"/zh/lupine.components/html-var",level:1},{type:"link",text:"HtmlLoad (HTML \u52A0\u8F7D)",link:"/zh/lupine.components/html-load",level:1},{type:"link",text:"NoticeMessage (\u901A\u77E5\u6D88\u606F)",link:"/zh/lupine.components/notice-message",level:1},{type:"link",text:"Progress (\u8FDB\u5EA6\u6761)",link:"/zh/lupine.components/progress",level:1},{type:"link",text:"Spinner (\u52A0\u8F7D\u52A8\u753B)",link:"/zh/lupine.components/spinner",level:1},{type:"link",text:"SvgIcon (SVG \u56FE\u6807)",link:"/zh/lupine.components/svg-icon",level:1},{type:"group",text:"\u6587\u672C\u7279\u6548",level:0},{type:"link",text:"TextGlow (\u53D1\u5149\u6587\u5B57)",link:"/zh/lupine.components/text-glow",level:1},{type:"link",text:"TextScale (\u7F29\u653E\u6587\u5B57)",link:"/zh/lupine.components/text-scale",level:1},{type:"link",text:"TextWave (\u6CE2\u52A8\u6587\u5B57)",link:"/zh/lupine.components/text-wave",level:1},{type:"group",text:"\u5176\u4ED6\u7EC4\u4EF6",level:0},{type:"link",text:"DragFresh (\u62D6\u52A8\u5237\u65B0)",link:"/zh/lupine.components/drag-fresh",level:1},{type:"link",text:"Redirect (\u91CD\u5B9A\u5411)",link:"/zh/lupine.components/redirect",level:1},{type:"link",text:"ResizableSplitter (\u53EF\u8C03\u5206\u5272\u5668)",link:"/zh/lupine.components/resizable-splitter",level:1},{type:"link",text:"SwitchOption (\u5207\u6362\u9009\u9879)",link:"/zh/lupine.components/switch-option",level:1},{type:"link",text:"ToggleBase (\u5207\u6362\u57FA\u7C7B)",link:"/zh/lupine.components/toggle-base",level:1}]},headings:[{level:2,text:"\u6838\u5FC3\u7279\u6027",id:"\u6838\u5FC3\u7279\u6027"},{level:2,text:"\u5FEB\u901F\u6D4F\u89C8",id:"\u5FEB\u901F\u6D4F\u89C8"}]},"/zh/lupine.components/input-with-title":{html:ch,data:{title:"InputWithTitle (\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/menu-bar":{html:dh,data:{title:"Menubar (\u6A2A\u5411\u83DC\u5355\u680F)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/menu-sidebar":{html:ph,data:{title:"MenuSidebar (\u4FA7\u8FB9\u5BFC\u822A\u680F)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/message-box":{html:uh,data:{title:"MessageBox (\u6D88\u606F\u6846)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/modal":{html:gh,data:{title:"Modal (\u6A21\u6001\u6846)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/notice-message":{html:hh,data:{title:"NoticeMessage (\u901A\u77E5\u6D88\u606F)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/paging-link":{html:mh,data:{title:"PagingLink (\u5206\u9875\u94FE\u63A5)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/popup-menu":{html:fh,data:{title:"PopupMenu (\u5F39\u51FA\u83DC\u5355)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/progress":{html:bh,data:{title:"Progress (\u8FDB\u5EA6\u6761)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/radio-label":{html:xh,data:{title:"RadioLabel (\u5355\u9009\u7EC4)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/redirect":{html:vh,data:{title:"Redirect (\u91CD\u5B9A\u5411)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/resizable-splitter":{html:yh,data:{title:"ResizableSplitter (\u53EF\u8C03\u5206\u5272\u5668)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/select-angle":{html:kh,data:{title:"SelectAngle (\u89D2\u5EA6\u9009\u62E9)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/select-with-title":{html:wh,data:{title:"SelectWithTitle (\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/slide-tab":{html:Sh,data:{title:"SlideTab (\u6ED1\u52A8\u9009\u9879\u5361)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/spinner":{html:Ch,data:{title:"Spinner (\u52A0\u8F7D\u52A8\u753B)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/stars":{html:Th,data:{title:"Stars (\u661F\u7EA7\u8BC4\u5206)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/svg-icon":{html:Ph,data:{title:"SvgIcon (SVG \u56FE\u6807)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/switch-option":{html:Mh,data:{title:"SwitchOption (\u5207\u6362\u9009\u9879)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/tabs":{html:Lh,data:{title:"Tabs (\u9009\u9879\u5361)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/text-glow":{html:Eh,data:{title:"TextGlow (\u53D1\u5149\u6587\u5B57)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/text-scale":{html:Ah,data:{title:"TextScale (\u7F29\u653E\u6587\u5B57)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/text-wave":{html:Rh,data:{title:"TextWave (\u6CE2\u52A8\u6587\u5B57)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/toggle-base":{html:Dh,data:{title:"ToggleBase (\u5207\u6362\u57FA\u7C7B)"},headings:[{level:2,text:"\u8BF4\u660E",id:"\u8BF4\u660E"}]},"/zh/lupine.components/toggle-switch":{html:Hh,data:{title:"ToggleSwitch (\u5207\u6362\u5F00\u5173)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.press/index":{html:Ih,data:{title:"Lupine.press",sidebar:[{type:"link",text:"Press \u6587\u6863\u7CFB\u7EDF\u6982\u89C8",link:"/zh/lupine.press/overview",level:0}]},headings:[]},"/zh/lupine.press/overview":{html:zh,data:{title:"Press \u6587\u6863\u7CFB\u7EDF\u6982\u89C8"},headings:[{level:2,text:"\u4E3B\u8981\u7279\u6027 (Features)",id:"\u4E3B\u8981\u7279\u6027-features"},{level:2,text:"\u4F7F\u7528\u6307\u5357 (Usage Guide)",id:"\u4F7F\u7528\u6307\u5357-usage-guide"},{level:3,text:"1. \u521B\u5EFA\u9879\u76EE",id:"1-\u521B\u5EFA\u9879\u76EE"},{level:3,text:"2. \u57FA\u672C\u8BBE\u7F6E (Basic Setup)",id:"2-\u57FA\u672C\u8BBE\u7F6E-basic-setup"},{level:3,text:"3. \u6570\u636E\u7ED3\u6784 (markdownConfig)",id:"3-\u6570\u636E\u7ED3\u6784-markdownconfig"},{level:2,text:"Markdown \u6587\u4EF6\u7ED3\u6784\u4E0E\u5173\u8054 (Markdown File Structure & Association)",id:"markdown-\u6587\u4EF6\u7ED3\u6784\u4E0E\u5173\u8054-markdown-file-structure-association"},{level:3,text:"\u9876\u5C42\u914D\u7F6E (Top-level Configuration)",id:"\u9876\u5C42\u914D\u7F6E-top-level-configuration"},{level:3,text:"\u591A\u8BED\u8A00\u914D\u7F6E (Multilingual Configuration)",id:"\u591A\u8BED\u8A00\u914D\u7F6E-multilingual-configuration"},{level:3,text:"\u4FA7\u8FB9\u680F\u914D\u7F6E (Sidebar Configuration)",id:"\u4FA7\u8FB9\u680F\u914D\u7F6E-sidebar-configuration"},{level:2,text:"\u67B6\u6784 (Architecture)",id:"\u67B6\u6784-architecture"},{level:2,text:"\u5F0F\u6837 (Styles)",id:"\u5F0F\u6837-styles"}]},"/zh/lupine.web/index":{html:jh,data:{title:"Lupine.web",sidebar:[{type:"link",text:"\u6982\u89C8",link:"/zh/lupine.web/overview",level:0}]},headings:[]},"/zh/lupine.web/overview":{html:Bh,data:{title:"\u6982\u89C8"},headings:[{level:2,text:"\u4E3A\u4EC0\u4E48\u9009\u62E9 lupine.web",id:"\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-web"},{level:3,text:"\u{1F680} \u96F6\u4F9D\u8D56\u4E14\u8F7B\u91CF\u7EA7 (Zero-Dependency & Lightweight)",id:"\u96F6\u4F9D\u8D56\u4E14\u8F7B\u91CF\u7EA7-zero-dependency-lightweight"},{level:3,text:"\u{1F3A8} \u5185\u7F6E CSS-in-JS (Built-in CSS-in-JS) \u{1F517}",id:"\u5185\u7F6E-css-in-js-built-in-css-in-js-essentials-css-in-js"},{level:3,text:"\u{1F6E3}\uFE0F \u5F3A\u5927\u7684\u8DEF\u7531 (Powerful Router) \u{1F517}",id:"\u5F3A\u5927\u7684\u8DEF\u7531-powerful-router-essentials-page-route"},{level:3,text:"\u26A1 \u670D\u52A1\u7AEF\u6E32\u67D3 (SSR) \u4F18\u5148 (Server-Side Rendering First) \u{1F517}",id:"\u670D\u52A1\u7AEF\u6E32\u67D3-ssr-\u4F18\u5148-server-side-rendering-first-essentials-ssr"},{level:3,text:"\u{1F30D} \u56FD\u9645\u5316 (i18n)",id:"\u56FD\u9645\u5316-i18n"},{level:3,text:"\u{1F6E0}\uFE0F \u73AF\u5883\u914D\u7F6E (Environment Configuration)",id:"\u73AF\u5883\u914D\u7F6E-environment-configuration"}]}};F()&&zo("NODE_ENV","")==="development"&&Ho(zo("API_PORT",0));si("en",{});Gn("light",Jp);Qn("comm-css",Xp,!1,!0);di("Lupine.js Doc");Jl(Oh);Ql("/lupine.js");var Hn=new ye;Hn.setSubDir("/lupine.js");Hn.use("/demo",mo);Hn.use("*",Yp);zn(Hn);})();
/*! Bundled license information:

is-extendable/index.js:
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

strip-bom-string/index.js:
  (*!
   * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
