"use strict";(()=>{var mu=Object.create;var Hn=Object.defineProperty;var fu=Object.getOwnPropertyDescriptor;var bu=Object.getOwnPropertyNames;var xu=Object.getPrototypeOf,vu=Object.prototype.hasOwnProperty;var Ht=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var m=(e,t)=>()=>(e&&(t=e(e=0)),t);var S=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),yu=(e,t)=>{for(var n in t)Hn(e,n,{get:t[n],enumerable:!0})},ku=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of bu(t))!vu.call(e,o)&&o!==n&&Hn(e,o,{get:()=>t[o],enumerable:!(r=fu(t,o))||r.enumerable});return e};var wu=(e,t,n)=>(n=e!=null?mu(xu(e)):{},ku(t||!e||!e.__esModule?Hn(n,"default",{value:e,enumerable:!0}):n,e));var Mo=m(()=>{"use strict"});var q,Su,It,X,In,Dt=m(()=>{"use strict";q={};if(typeof globalThis<"u"){let e=globalThis;e._lupineJs===null&&(e._lupineJs=()=>q)}Su=e=>{q.renderPageFunctions=e||{}},It=e=>{q.renderPageProps=e},X=()=>q.renderPageProps,In=e=>{q.router=e}});function Te(e){let t=e.getElementsByTagName("a");for(var n=0,r=t.length;n<r;n++){let o=t[n].getAttribute("href");if(!o||o.startsWith("javascript:"))continue;if(o.startsWith("#")){t[n].onclick=()=>{var s;let a=decodeURIComponent(o.substring(1));return(s=document.getElementById(a))==null||s.scrollIntoView(!0),!1};continue}let i=new URL(t[n].href,document.baseURI).href;t[n].target!=="_blank"&&i.startsWith(document.location.origin)&&(i=i.substring(document.location.origin.length),t[n].onclick=()=>(q.initializePage(i),!1))}}var Dn=m(()=>{"use strict";Dt()});var Ce,pt,zt=m(()=>{"use strict";Ce=async(e,t)=>{var r;let n=e.firstChild;n&&n.tagName==="STYLE"&&((r=n.parentNode)==null||r.removeChild(n)),await pt(e),e.innerHTML=t,n&&n.tagName==="STYLE"&&e.insertBefore(n,e.firstChild)},pt=async e=>{let t=[];e.querySelectorAll("[data-ref]").forEach(n=>{n._lj&&n._lj.onUnload&&t.push(n._lj.onUnload())}),await Promise.all(t)}});var Tu,Je,re,dt=m(()=>{"use strict";Tu={Red:"#f44336",Pink:"#e81e63",Purple:"#9c27b0",DeepPurple:"#673ab7",Indigo:"#3f51b5",Blue:"#2196f3",LightBlue:"#03a9f4",Cyan:"#00bcd4",Teal:"#009688",Green:"#4caf50",LightGreen:"#8bc34a",Lime:"#cddc39",DarkYellow:"#bfa40e",Amber:"#ffc107",Orange:"#ff9800",DeepOrange:"#ff5722",Silver:"#c0c0c0",Gray:"#808080",Black:"#000000"},Je=class Je{constructor(t,n){this.namespace="";this.color="";this.namespace=t?`[${t}] `:"",n&&(this.color="color:"+n)}static setEnabled(t){t&&!Je.enabled&&console.log("Logger is enabled."),Je.enabled=t}log(t,...n){Je.enabled&&console.log(`%c${this.timestamp()} ${this.namespace}${t}`,this.color,...n)}timestamp(t){return(t||new Date).toJSON().substring(11,23)}warn(t,...n){console.warn(`%c${this.timestamp()} ${this.namespace}${t}`,this.color,...n)}error(t,...n){console.error(`%c${this.timestamp()} ${this.namespace}${t}`,this.color,...n)}};Je.enabled=!0;re=Je});function Pe(e){let t=0,n=Math.round(Date.now()/1e3),r="";return function(){let o=Math.round(Date.now()/1e3-n).toString(36);return o!==r?(t=0,r=o):t++,`${e}${r}${t.toString(36)}`}}var zn=m(()=>{"use strict"});var ue,Ft,Lo,Cu,ut=m(()=>{"use strict";ue=(e,t,n=365,r,o,i)=>{let a=new Date(new Date().getTime()+n*24*36e5);document.cookie=e+"="+escape(t)+";expires="+a.toUTCString()+";path="+(r||"/")+(o?";domain="+o:"")+(i?";secure":"")},Ft=e=>{let t=document.cookie.split(";");for(let n=0;n<t.length;n++){let r=t[n].trim();if(r.substring(0,e.length+1)==e+"=")return unescape(r.substring(e.length+1))}return null},Lo=(e,t,n,r)=>{document.cookie=e+"=;expires=Fri, 02-Jan-1970 00:00:00 GMT;path="+(t||"/")+(n?";domain="+n:"")+(r?";secure":"")},Cu={set:ue,get:Ft,clear:Lo}});var O,Ee=m(()=>{"use strict";O=()=>typeof window=="object"&&typeof document=="object"});var gt,Fn,Ao,On,ht=m(()=>{"use strict";ut();Ee();gt=e=>O()?Ft(e):Ao(e),Ao=e=>Fn&&Fn.get(e,""),On=e=>Fn=e});var Ot,Le,Ro,Bn,Me,Nn,oe,mt,Bt=m(()=>{"use strict";ut();Ee();ht();Ot="light",Le="theme",Ro="updateTheme",Bn="data-theme",Me={defaultTheme:Ot,themes:{}},Nn=(e,t)=>{Me.defaultTheme=e,Me.themes=t,oe()},oe=()=>{let e=gt(Le);return(!e||!Me.themes[e])&&(e=Me.defaultTheme,O()&&ue(Le,Me.defaultTheme)),{themeName:e,themes:Me.themes}},mt=e=>{if(Me.defaultTheme=e,!O())return;ue(Le,e),document.documentElement.setAttribute(Bn,e);let t=document.querySelectorAll("iframe");for(let r=0;r<t.length;r++)t[r].contentWindow&&t[r].contentWindow.top===window&&t[r].contentWindow.document.documentElement.setAttribute(Bn,e);let n=new CustomEvent(Ro,{detail:e});window.dispatchEvent(n)}});var Ae,Nt=m(()=>{"use strict";Ae=function(e){return e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase())}});var Ho,Wt,Wn,jt=m(()=>{"use strict";Ho=[],Wt=()=>{Ho.forEach(e=>{try{e()}catch(t){console.error(t)}})},Wn=e=>{Ho.push(e)}});var Pu,Eu,Io,qn,Re,Mu,Do,zo,jn,$n,_n,P,Fo,Un,qt=m(()=>{"use strict";R();Bt();Nt();jt();Pu=(e,t,n)=>{let r=e?`${e}{${t}}`:t;return n&&(r=`${n}{${r}}`),r},Eu=e=>Object.keys(e).map(t=>t.trim()).map(t=>e[t]!=null&&typeof e[t]=="object"||typeof e[t]>"u"||e[t]===""?"":`${Ae(t)}:${e[t]};`).join(""),Io=(e,t,n,r)=>{if(t.length>0){let o=Pu(n,t.join(""),r);e.push(o),t.length=0}},qn=(e,t,n,r)=>{let o=t.split(",").map(s=>s.trim()).map(s=>(s.startsWith("&")?`${t}${s.substring(1)}`:s).replace(/&/g,e)).join(","),i=[],a=[];for(let s in n){let p=n[s];if(p===null||typeof p!="object")p!==""&&typeof p<"u"&&(t||console.warn(`No className is defined for: ${Ae(s)}:${p};`),a.push(`${Ae(s)}:${p};`));else if(Io(i,a,o,r),s.startsWith("@keyframes")){let c=Object.keys(p).map(d=>d+"{"+Eu(p[d])+"}").join("");i.push(`${s}{${c}}`)}else if(s.startsWith("@media")){let c=qn(e,t,p,s);i.push(...c)}else{let c=t?t.split(",").map(u=>u.trim()).map(u=>s.split(",").map(g=>g.trim()).map(g=>(g.startsWith("&")?u+g.substring(1):u+" "+g).replace(/&/g,e)).join(",")).join(","):s,d=qn(e,c,p,r);i.push(...d)}}return Io(i,a,o,r),i},Re=(e,t)=>qn(e,e?`.${e}`:"",t),Mu=(e,t)=>{let n=e&&document.querySelector(`.${e}`);if(n){let r=Re(e,t).join("");if(n.firstChild&&n.firstChild.nodeName==="STYLE")n.firstChild.innerHTML=r;else{let o=document.createElement("style");o.innerHTML=r,n.prepend(o)}}else console.warn(`Can't find "${e}" to update styles.`)},Do=(e,t,n)=>{n||(n=document.createElement("style"),n.id=`sty-${e}`,document.head.appendChild(n)),n.innerText=t},zo=Pe("g"),jn=new Map,$n=e=>{if(!jn.has(e)){let t=zo();jn.set(e,t)}return jn.get(e)},_n=new Map,P=(e,t,n=!1,r=!1)=>{if(typeof document<"u"){let o=document.getElementById(`sty-${e}`);(n||!o)&&Do(e,Re(r?"":e,t).join(""),o)}else(!_n.has(e)||n)&&_n.set(e,{topUniqueClassName:e,noTopClassName:r,style:t})},Fo=()=>{let e=oe(),t=[];for(let n in e.themes)t.push(...Re("",{[`[data-theme="${n}" i]`]:e.themes[n]}));return t.join(`
`)};typeof document<"u"&&Wn(()=>{let e=Le,t=document.getElementById(`sty-${e}`);t||Do(e,Fo(),t)});Un=()=>{let e=[];e.push(`<style id="sty-${Le}">${Fo()}</style>`);for(let[t,{topUniqueClassName:n,noTopClassName:r,style:o}]of _n){let i=Re(r?"":n,o).join("");e.push(`<style id="sty-${t}">${i}</style>`)}return e.join("")}});function Vn(e,t,n,r){if(typeof t=="string")e.push(t);else if(!(t===!1||t===null||typeof t>"u"))if(typeof t=="number"||typeof t=="boolean")e.push(t.toString());else if(Array.isArray(t))for(let o=0;o<t.length;o++){let i=t[o];Vn(e,i,n,r)}else t.type&&t.props?(ge(t.type,t.props,n,r),e.push(...t.props._html),t.props._html.length=0):Oo.warn("Unexpected",t)}function Au(e,t,n,r,o){let i=[];for(let a in t)if(a==="ref")t[a]&&(t[a].id=_t(t),i.push("data-ref"));else if(!["children","key","_result","_html","_id"].includes(a))if(a==="style")if(typeof t[a]=="object"){let s=`${a}="`;for(let p in t[a])s+=`${Ae(p)}:${t[a][p]};`;s+='"',i.push(s)}else i.push(`${a}="${t[a]}"`);else if(a==="css")_t(t);else if(a[0]==="o"&&a[1]==="n")_t(t);else if(a==="defaultChecked")(t[a]===!0||t[a]==="checked")&&i.push('checked="true"');else if(a==="readonly"||a==="disabled"||a==="selected"||a==="checked")t[a]!==void 0&&t[a]!==!1&&t[a]!=="false"&&i.push(`${a}="${t[a]}"`);else if(a==="class"||a==="className"){let s=t[a].split(" ").filter(p=>p&&p!=="");(t.css||t.ref)&&!s.includes(t._id)&&s.unshift(t._id),t.ref&&t.ref.globalCssId&&!s.includes(t.ref.globalCssId)&&s.unshift(t.ref.globalCssId),o&&r?s=s.flatMap(p=>p.includes("&")?[p.replace(/&/g,o),p.replace(/&/g,r)]:[p]):o?s=s.map(p=>p.replace(/&/g,o)):r&&(s=s.map(p=>p.replace(/&/g,r))),i.push(`class="${s.join(" ")}"`)}else a!=="dangerouslySetInnerHTML"&&i.push(`${a}="${t[a]}"`);return t._id&&i.push(t._id),i.join(" ")}var Oo,Bo,Lu,_t,ge,Gn=m(()=>{"use strict";dt();zn();qt();Nt();Oo=new re("render-components"),Bo=Pe("l");Lu=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],_t=e=>(e._id||(e._id=Bo()),e._id);ge=(e,t,n,r)=>{if(Array.isArray(t)){let a={type:"Fragment",props:{children:t}};ge(a.type,a.props,n,r);return}if(t._html=[],typeof e=="function"&&(t._result=e.call(null,t),(t._result===null||t._result===void 0||t._result===!1)&&(t._result={type:"Fragment",props:t}),typeof t._result.type=="function")){ge(t._result.type,t._result.props,n,r),t._result.props._html&&(t._html.push(...t._result.props._html),t._result.props._html.length=0);return}let o=t._result&&t._result.type||e,i=t._result&&t._result.props||t;if(typeof o=="string"){i._id&&console.warn("This component reference is used more than once and will have binding issues: ",i);let a=n;(i.css||i.ref)&&(a=_t(i),!i.class&&!i.className&&(i.class=a));let s=r;i.ref&&i.ref.globalCssId&&(s=i.ref.globalCssId);let p=Au(o,i,{type:e,props:t},a,s);if(Lu.includes(o.toLowerCase()))(o!=="Fragment"||i.ref)&&t._html.push(`<${o}${p?" ":""}${p} />`),i.css&&console.warn(`ClosingTag [${o}] doesn't support 'css', please use 'style' instead.`);else{if((o!=="Fragment"||i.ref)&&t._html.push(`<${o}${p?" ":""}${p}>`),i.css){let c=Re(a,i.css).join("");t._html.push(`<style id="sty-${a}">${c}</style>`)}i.children||i.children===0?Vn(t._html,i.children,a,s):i.dangerouslySetInnerHTML&&t._html.push(i.dangerouslySetInnerHTML),(o!=="Fragment"||i.ref)&&t._html.push(`</${o}>`)}}else o.name==="Fragment"?Vn(t._html,i.children,n,r):Oo.warn("Unknown type: ",e,t,o,i)}});var _,Yn,Ru,ft=m(()=>{"use strict";Jn();Dn();zt();Gn();_=async(e,t)=>{ge(t.type,t.props);let n=e&&(typeof e=="string"?document.querySelector(e):e);n&&(await Ce(n,t.props._html.join("")),he(n,t.type,t.props),Te(n))},Yn=async(e,t)=>{var r;ge(t.type,t.props);let n=e&&(typeof e=="string"?document.querySelector(e):e);if(n){let o=document.createElement("template");await Ce(o,t.props._html.join("")),o.content.children.length>1&&console.error("renderComponent should only have one element: ",o.content.children.length);let i=o.content.firstChild;await pt(n),(r=n.parentNode)==null||r.replaceChild(i,n),he(i,t.type,t.props),Te(i)}},Ru=async(e,t,n="after")=>{var o,i;ge(t.type,t.props);let r=e&&(typeof e=="string"?document.querySelector(e):e);if(r){let a=document.createElement("template");await Ce(a,t.props._html.join("")),a.content.children.length>1&&console.error("renderComponent should only have one element: ",a.content.children.length);let s=a.content.firstChild;await pt(r),r.nextSibling||n==="before"?(o=r.parentNode)==null||o.insertBefore(s,n==="after"?r.nextSibling:r):(i=r.parentNode)==null||i.appendChild(s),he(s,t.type,t.props),Te(s)}}});var Kn,Xn=m(()=>{"use strict";ft();zt();Kn=(e,t,n)=>{let r=t._id;t.ref.current=n,t.ref.onLoad&&Promise.prototype.then.bind(Promise.resolve())(()=>t.ref.onLoad(n)),t.ref.onUnload&&(n._lj=n._lj||{},n._lj.onUnload=async()=>{await t.ref.onUnload(n)}),t.ref.$=o=>o.startsWith("&")?n.querySelector(`.${r}${o.substring(1).replace(/&/g,r)}`):n.querySelector(`.${r} ${o.replace(/&/g,r)}`),t.ref.$all=o=>o.startsWith("&")?n.querySelectorAll(`.${r}${o.substring(1).replace(/&/g,r)}`):n.querySelectorAll(`.${r} ${o.replace(/&/g,r)}`),t.ref.mountInnerComponent=async o=>{typeof o=="object"&&o.type&&o.props?await _(n,o):await Ce(n,o)},t.ref.mountOuterComponent=async o=>{await Yn(n,o)}}});var Zn,he,Jn=m(()=>{"use strict";Xn();Zn=(e,t)=>{for(let n=0;n<t.length;n++){let r=t[n];r&&r.type&&r.props?he(e,r.type,r.props):r&&Array.isArray(r)?Zn(e,r):typeof r<"u"&&r!==null&&typeof r!="string"&&typeof r!="number"&&typeof r!="boolean"&&console.warn("Unexpected children:",r)}},he=(e,t,n)=>{let r=n._result&&n._result.props||n;if(r._id){let o=e.querySelector(`[${r._id}]`);if(!o&&e.getAttribute(r._id)===""&&(o=e),o){for(let i in r)if(i==="ref")Kn(t,r,o);else if(i[0]==="o"&&i[1]==="n"){let a=i;a.toLowerCase()in o?a=a.toLowerCase().slice(2):a=a.slice(2),o.addEventListener(a,r[i])}}}r.children&&Array.isArray(r.children)?Zn(e,r.children):r._result&&r._result.type!=="Fragment"&&r._result.props?he(e,r._result.type,r._result.props):r.children&&r.children.type&&r.children.props?he(e,r.children.type,r.children.props):!r.children||typeof r.children=="string"||typeof r.children=="number"||typeof r.children=="boolean"||console.warn("Unexpected children:",r.children,t,n)}});var No,$t,Wo,He,Qn,Ke,Hu,jo=m(()=>{"use strict";ut();Ee();ht();No="en",$t="lang",Wo="updateLang",He={defaultLang:No,langs:{}},Qn=(e,t)=>{He.defaultLang=e,He.langs=t,Ke()},Ke=()=>{let e=gt($t);return(!e||!He.langs[e])&&(e=He.defaultLang,O()&&ue($t,He.defaultLang)),{langName:e,langs:He.langs}},Hu=e=>{if(He.defaultLang=e,!O())return;ue($t,e);let t=new CustomEvent(Wo,{detail:e});window.dispatchEvent(t)}});var Ut,er,Yt,tr,Vt,Iu,qo,nr,Gt,me,rr,Jt,or=m(()=>{"use strict";Ut={value:"",defaultValue:""},er=e=>{Ut.value=e},Yt=()=>Ut.value||Ut.defaultValue,tr=e=>{Ut.defaultValue=e},Vt={value:"",defaultValue:""},Iu=e=>{Vt.value=e},qo=()=>Vt.value||Vt.defaultValue,nr=e=>{Vt.defaultValue=e},Gt={},me=(e,t)=>{typeof t>"u"?delete Gt[e]:Gt[e]=t},rr=()=>Object.values(Jt()).join(`
`),Jt=()=>{let e=qo();return e?Object.assign({"name:description":`<meta name="description" content="${e}">`},Gt):Gt}});var Ie,ir=m(()=>{"use strict";Ee();ft();dt();Ie=class e{constructor(){this.logger=new re("page-router");this.routerData=[];this.subDir=""}setFilter(t){this.filter=t}setSubDir(t){this.subDir=t}setFramePage(t){this.framePage=t}storeRouter(t,n){let r;t==="*"||t===""||t==="/*"?r="*":(r=t,r.startsWith("/")||(r="/"+r),r.endsWith("/")&&r.length>1&&(r=r.substring(0,r.length-1)));let o=0,i=[],a=r.indexOf("/:");if(a>=0){i=r.substring(a+1).split("/"),r=r.substring(0,a);let s=i.findIndex(p=>p.startsWith("?"));o=s>=0?s:i.length}this.routerData.push({path:r,handler:n,parameterVariables:i,parameterLength:o})}use(t,...n){this.storeRouter(t,n)}async callHandle(t,n,r){try{return await t(r)}catch(o){this.logger.error(`Processed path: ${n}, error: ${o.message}`)}return null}async findRoute(t,n,r){for(let o=0,i;i=this.routerData[o];o++)if(i.path==="*"||t===i.path||t.startsWith(i.path+"/")){let a={},s=!0;if(i.parameterVariables.length>0){s=!1;let p=t.substring(i.path.length+1);p.endsWith("/")&&(p=p.substring(0,p.length-1));let c=p.split("/");if(c.length>=i.parameterLength&&c.length<=i.parameterVariables.length){s=!0;for(let[d,u]of i.parameterVariables.entries())if(!u.startsWith(":")&&!u.startsWith("?")&&u!==c[d]){s=!1;break}else(u.startsWith(":")||u.startsWith("?"))&&d<c.length&&(a[u.replace(/[:?]/g,"")]=c[d]);n.urlParameters=a}}if(s){for(let p=0,c;c=i.handler[p];p++)if(c instanceof e){let d=i.path==="*"||t==="/"&&i.path==="/"?t:t.substring(i.path.length),u=await c.handleRoute(d,n,r);if(u)return u}else{let d=await this.callHandle(c,t,n);if(d)return d}return null}}return null}async handleRoute(t,n,r){t.startsWith(this.subDir)&&(t=t.substring(this.subDir.length));let o=null;if(this.filter&&(o=await this.callHandle(this.filter,t,n)),o||(o=await this.findRoute(t,n,r)),o&&this.framePage){let i="."+this.framePage.placeholderClassname;return r&&O()&&document.querySelector(i)?(await _(i,o),null):this.framePage.component(this.framePage.placeholderClassname,o)}return o}}});function Xt(e,t){var n;if(!Kt){let r=(n=document.querySelector("#web-env"))==null?void 0:n.textContent;r&&(Kt=!0,Zt(JSON.parse(r)))}if(!Kt&&console.warn("webEnv has not been initialized yet!"),typeof ie[e]>"u")return t;if(typeof t=="number")return Number.parseInt(ie[e]);if(typeof t=="boolean")return ie[e].toLocaleLowerCase()==="true"||ie[e]==="1";if(typeof t=="object"){if(typeof ie[e]=="object")return ie[e];try{return JSON.parse(ie[e])}catch(r){console.error("webEnv JSON.parse error: ",r)}return t}return ie[e]||t}function Zt(e){Object.assign(ie,e),Kt=!0}var ie,Kt,ar=m(()=>{"use strict";ie={},Kt=!1});var Du,De,Xe,sr=m(()=>{"use strict";H();Du=e=>{Xe.webConfigApi=e},De=class De{static initFromData(t){this.initialized=!0,this.cfg=t}static async init(t){var o,i;if(this.initialized&&!t)return;if(this.initialized=!0,typeof document=="object"&&!t){let a=(o=document.querySelector("#web-setting"))==null?void 0:o.textContent;if(a){this.cfg=JSON.parse(a);return}}if(!this.webConfigApi){console.error("WebConfig webConfigApi is not set");return}let n=X().renderPageFunctions.baseUrl(this.webConfigApi),r=await X().renderPageFunctions.fetchData(n);r&&r.json&&r.json.status==="ok"?this.cfg=r.json.result:console.error(((i=r==null?void 0:r.json)==null?void 0:i.message)||"Failed to get web config")}static async get(t,n){await De.init();let r=De.cfg[t];if(typeof r>"u")return n;if(typeof n=="number")return Number.parseInt(r);if(typeof n=="boolean")return r.toLocaleLowerCase()==="true"||r==="1";if(typeof n=="object"){if(typeof r=="object")return r;try{return JSON.parse(r)}catch(o){console.error("WebConfig JSON.parse error: ",o)}return n}return r||n}};De.webConfigApi="",De.initialized=!1,De.cfg={};Xe=De});var zu,$o,Fu,_o,fe,Uo=m(()=>{"use strict";dt();qt();Bt();ft();ir();jt();ht();or();ar();Dt();Ee();sr();zu=new re("initialize"),$o=async(e,t)=>q.router instanceof Ie?q.router.handleRoute(e.url,e,t):await q.router(e),Fu=async(e,t)=>{It(e),Zt(t.getWebEnv()),Xe.initFromData(t.getWebSetting()),On(t.getServerCookie()),Wt();let n=await $o(e,!1);if(!n||!n.props)return{content:`Unexpected url: ${e.url}`,title:"",metaData:"",globalCss:"",themeName:Ot};await _(null,n);let r=oe(),o=Un();return{content:n.props._html.join(""),title:Yt(),metaData:rr(),globalCss:o,themeName:r.themeName}};q.generatePage=Fu;_o={pageInitialized:!1},fe=async e=>{let t=_o.pageInitialized;_o.pageInitialized=!0,zu.log("initializePage: ",e),e&&window.history.pushState({urlPath:e},"",e);let n=e?e.split("?"):[],r=n[0]||document.location.pathname,o=n[1]||document.location.search,i={url:r,query:Object.fromEntries(new URLSearchParams(o)),urlParameters:{},renderPageFunctions:q.renderPageFunctions};It(i),!t&&Wt();let a=await $o(i,t);if(a===null)return;if(!a||!a.props){document.querySelector(".lupine-root").innerHTML=`Error happened or unexpected url: ${r}`;return}await _(".lupine-root",a),mt(oe().themeName),document.title=Yt();let s=Jt()};O()&&(addEventListener("popstate",e=>{fe()}),addEventListener("load",e=>{fe()}));q.initializePage=fe});var Vo=m(()=>{"use strict";Jn();jo();Dn();or();Xn();qt();Bt();Dt();Nt();ft();jt();ir();Gn();zt();ht();Uo()});var lr,Qt,Go=m(()=>{"use strict";lr=0,Qt=e=>{console.log("Creating debug-watch socket");let t=location.protocol==="https:"?"wss:":"ws:",n=new WebSocket(`${t}//${location.host}/debug/client`);window.addEventListener("beforeunload",()=>{n.close()}),n.onopen=()=>{n.send(JSON.stringify({message:"get-flag"}))},n.onmessage=r=>{try{let o=JSON.parse(r.data);console.log("Debug socket message:",o),o&&o.flag&&(lr?lr!==o.flag&&document.location.reload():lr=o.flag)}catch{}},n.onclose=()=>{console.log("Debug socket close."),setTimeout(()=>{Qt(e)},3e3)}}});var Yo=m(()=>{"use strict";ut();Go();Ee();dt();zn();sr();ar()});var Jo=m(()=>{"use strict"});var Ko=m(()=>{"use strict"});var Xo=m(()=>{"use strict"});var Zo=m(()=>{"use strict"});var Qo=m(()=>{"use strict";Jo();Ko();Xo();Zo()});var ei=m(()=>{"use strict"});var ti=m(()=>{"use strict";ei()});var H=m(()=>{"use strict";Mo();Vo();Yo();Qo();ti()});var ni,cr,ae,ri=m(()=>{"use strict";H();ni=Pe("bb-"),cr=class{genBackActionId(){return ni()}getAllBackActionButtons(){let t=document.querySelectorAll('[data-back-action^="bb-"]');return Array.from(t).map(r=>{let o=r.getAttribute("data-back-action")||"";return{el:r,ind:o.substring(3)}}).filter(Boolean).sort((r,o)=>o.ind.localeCompare(r.ind)).map(r=>r.el)}clear(){this.backFn=void 0}attach(t){this.backFn=t}async processBackAction(){if(this.backFn){try{return await this.backFn(),this.clear(),!0}catch(n){console.error("back button back failed",n)}return!1}let t=this.getAllBackActionButtons();return t.length?(t[0].dispatchEvent(new Event("click")),!0):!1}},ae=new cr});var ee,pr,oi=m(()=>{"use strict";ee=class ee{static toString(t){if(t===0)return ee.ALPHABET[0];let n="";for(;t>0;){let r=t%ee.BASE;n=ee.ALPHABET[r]+n,t=Math.floor(t/ee.BASE)}return n}static fromString(t){let n=0;for(let r=0;r<t.length;r++)n=n*ee.BASE+ee.ALPHABET.indexOf(t[r]);return n}};ee.ALPHABET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",ee.BASE=62;pr=ee});var Ou,ii,Bu,ai=m(()=>{"use strict";Ou=(e,t)=>new Promise((n,r)=>{let o=new FileReader;o.onloadend=()=>n(t?o.result.split(",")[1]:o.result),o.onerror=r,o.readAsDataURL(e)}),ii=e=>{let[t,n]=e.split(","),r=t.match(/data:(.*);base64/),o=r?r[1]:"application/octet-stream",i=atob(n),a=Array.from(i).map(p=>p.charCodeAt(0)),s=new Uint8Array(a);return new Blob([s],{type:o})},Bu=e=>{let t=ii(e);return URL.createObjectURL(t)}});function Nu(e,t){let r=(si.canvas||(si.canvas=document.createElement("canvas"))).getContext("2d");return r.font=t,r.measureText(e).width}var si,li=m(()=>{"use strict";si={canvas:null}});var dr,en,ci=m(()=>{"use strict";dr=class e{static now(){return Date.now()}static toDate(t){return new Date(Date.parse(t))}static clone(t){return new Date(t.valueOf())}static isLeapYear(t){return t%4===0&&t%100!==0||t%400===0}static daysInMonth(t,n){return n===1?e.isLeapYear(t)?29:28:31-n%7%2}static createDate(t,n,r,o,i,a,s){return new Date(t,n,r,o,i,a,s)}static createUTCDate(t,n,r,o,i,a,s){return new Date(Date.UTC.apply(null,[t,n,r,o,i,a,s]))}static set(t,n,r,o,i,a,s,p){return t||(t=new Date(e.now())),typeof n=="number"&&t.setFullYear(n),typeof r=="number"&&t.setMonth(r),typeof o=="number"&&t.setDate(o),typeof i=="number"&&t.setHours(i),typeof a=="number"&&t.setMinutes(a),typeof s=="number"&&t.setSeconds(s),typeof p=="number"&&t.setMilliseconds(p),t}static add(t,n,r,o,i,a,s,p){return t||(t=new Date(e.now())),typeof n=="number"&&t.setFullYear(t.getFullYear()+n),typeof r=="number"&&t.setMonth(t.getMonth()+r),typeof o=="number"&&t.setDate(t.getDate()+o),typeof i=="number"&&t.setHours(t.getHours()+i),typeof a=="number"&&t.setMinutes(t.getMinutes()+a),typeof s=="number"&&t.setSeconds(t.getSeconds()+s),typeof p=="number"&&t.setMilliseconds(t.getMilliseconds()+p),t}static diff(t,n){let r=n.getFullYear(),o=t.getFullYear()-r,i=t.getMonth()-n.getMonth();i<0&&(o--,i+=12);let a=t.getDate()-n.getDate();a<0&&(i>0?i--:(o--,i=11),a+=e.daysInMonth(r,n.getMonth()));let s=t.valueOf()-n.valueOf(),p=Math.floor(s/1e3),c=Math.floor(p/(60*60))%24,d=Math.floor(p/60)%60,u=p%60,g=s%1e3;return new en(o,i,a,c,d,u,g)}static diffString(t,n,r=!1){let o=e.diff(t,n),i="";return o.years!==0&&(i=i+o.years+" years(s), "),(o.years!==0||o.months!==0)&&(i=i+o.months+" month(s), "),(o.years!==0||o.months!==0||o.days!==0)&&(i=i+o.days+" day(s), "),(o.years!==0||o.months!==0||o.days!==0||o.hours!==0)&&(i=i+o.hours+" hour(s), "),(o.years!==0||o.months!==0||o.days!==0||o.hours!==0||o.minutes!==0)&&(i=i+o.minutes+" minute(s), "),(o.years!==0||o.months!==0||o.days!==0||o.hours!==0||o.minutes!==0||o.seconds!==0||!r)&&(i=i+o.seconds+" second(s)",r&&(i+=", ")),r&&(i=i+o.milliseconds+" ms"),i}static toYMD(t,n){return n=typeof n>"u"?"-":n,t.getFullYear()+n+("0"+(t.getMonth()+1)).toString().slice(-2)+n+("0"+t.getDate()).toString().slice(-2)}static toYmdHms(t,n){return n=typeof n>"u"?"-":n,t.getFullYear()+n+("0"+(t.getMonth()+1)).toString().slice(-2)+n+("0"+t.getDate()).toString().slice(-2)+" "+("0"+t.getHours()).toString().slice(-2)+":"+("0"+t.getMinutes()).toString().slice(-2)+":"+("0"+t.getSeconds()).toString().slice(-2)}static toJSONString(t){return t.toJSON()}static showJSONString(t,n="-"){return e.toYmdHms(e.toDate(t),n)}static fromJSONString(t){return e.toDate(t)}static clearTime(t){return t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),t}static clearUTCTime(t){return t.setUTCHours(0),t.setUTCMinutes(0),t.setUTCSeconds(0),t.setUTCMilliseconds(0),t}static format(t,n){n||(n="YYYY-MM-DD"),t||(t=new Date);let r={YYYY:t.getFullYear().toString(),YY:("00"+(t.getFullYear()-100)).toString().slice(-2),MM:("0"+(t.getMonth()+1)).toString().slice(-2),M:(t.getMonth()+1).toString(),DD:("0"+t.getDate()).toString().slice(-2),D:t.getDate().toString(),hh:("0"+t.getHours()).toString().slice(-2),h:t.getHours().toString(),mm:("0"+t.getMinutes()).toString().slice(-2),ss:("0"+t.getSeconds()).toString().slice(-2),SSS:("00"+t.getMilliseconds()).toString().slice(-3),S:Math.floor(t.getMilliseconds()/100).toString().slice(-1)},o=n.match(/(\[[^\[]*\])|(\\)?(YYYY|YY|MM?|DD?|hh?|mm?|ss?|SSS|S|.)/g);for(let a=0,s=o.length;a<s;a++)r[o[a]]&&(o[a]=r[o[a]]);return o.join("")}},en=class{constructor(t,n,r,o,i,a,s){this.years=t,this.months=n,this.days=r,this.hours=o,this.minutes=i,this.seconds=a,this.milliseconds=s}}});var ur,gr,Wu,pi=m(()=>{"use strict";ur=e=>e&&typeof e=="object"&&!Array.isArray(e),gr=(e,...t)=>{if(!t.length)return e;let n=t.shift();if(ur(e)&&ur(n))for(let r in n)ur(n[r])?(e[r]||Object.assign(e,{[r]:{}}),gr(e[r],n[r])):Object.assign(e,{[r]:n[r]});return gr(e,...t)},Wu=e=>JSON.parse(JSON.stringify(e))});var ju,di=m(()=>{"use strict";ju=(e="skip_console_protection")=>{try{if(localStorage.getItem(e)==="1")return;var t=window.console;if(!t)return;var n=function(){};["log","warn","info","error","debug","table","trace"].forEach(r=>{t[r]=n})}catch{}}});var qu,ui=m(()=>{"use strict";qu=(e="skip_debug_protection",t=2e3)=>{try{if(localStorage.getItem(e)==="1")return;setInterval(()=>{debugger},t)}catch{}}});var hr,gi=m(()=>{"use strict";hr=class{constructor(){}ready(t){if(document.readyState==="complete")setTimeout(t,0);else{let n=function(){document.readyState==="complete"&&(document.removeEventListener("DOMContentLoaded",n),window.removeEventListener("load",n),setTimeout(t,0))};document.addEventListener("DOMContentLoaded",n),window.addEventListener("load",n)}}readyPromise(){return new Promise((t,n)=>{this.ready(()=>{t()})})}}});var mr,hi=m(()=>{"use strict";mr=class{static getValue(t){var n;return(n=document.querySelector(t))==null?void 0:n.value}static setValue(t,n){let r=document.querySelector(t);r&&(r.value=n)}static getChecked(t){var n;return(n=document.querySelector(t))==null?void 0:n.checked}static setChecked(t,n){let r=document.querySelector(t);r&&(r.checked=n)}static joinValues(t,n=" "){return t.filter(Boolean).join(n)}static byId(t){return document.querySelector(`#${t}`)}static bySelector(t){return document.querySelector(t)}}});var fr,_u,$u,mi,Uu,fi=m(()=>{"use strict";R();H();fr={downloadSize:1024*200},_u=e=>{fr.downloadSize=e},$u=()=>fr.downloadSize,mi=async(e,t,n,r=3,o="")=>{let i=e+(e.indexOf("?")===-1?"?":"");i+=`&start=${t.toString()}`,i+=`&length=${n.toString()}`;let a=0;for(;a<r;){try{let s=await X().renderPageFunctions.fetchData(i,void 0,!0,!0),p=s.headers.get("file-size"),c=s.headers.get("part-size");return!p||!c?(console.log("downloadFileChunk error",s),null):{fileSize:parseInt(p,10),partSize:parseInt(c,10),arrayBuffer:await s.arrayBuffer()}}catch(s){console.log(`downloadFileChunk error, try: ${a}`,s)}a++,o&&be.sendMessage(o.replace("${tryCount}",a.toString()),"var(--warning-bg-color)")}return null},Uu=async(e,t,n=0,r=3,o="Downloading failed, try: ${tryCount}")=>{n<1&&(n=fr.downloadSize);let i=0,a=null;for(;;){let c=await mi(e,i,n,r,o);if(!c)return!1;a===null&&(a=c.fileSize),i+=c.partSize;let d=t(c);if(d!==void 0)return d;if(i>=a)break}return!0}});var Vu,bi=m(()=>{"use strict";Vu=(e,t)=>{let n=document.createElement("a");return n.setAttribute("href",e),n.setAttribute("download",t||"true"),n.style.display="none",document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n)},3e3),n}});var Gu,xi=m(()=>{"use strict";Gu=(e,t)=>{let n=URL.createObjectURL(e),r=document.createElement("a");return r.setAttribute("href",n),r.setAttribute("download",t||"true"),r.style.display="none",document.body.appendChild(r),r.click(),setTimeout(()=>{document.body.removeChild(r),URL.revokeObjectURL(n)},3e3),r}});var Yu,vi=m(()=>{"use strict";Yu=()=>{let e=!1,t=0,n=0,r=null,o=()=>{},i=()=>{},a=!1,s=0,p=(c,d)=>{let u=d.clientX-c.clientX,g=d.clientY-c.clientY;return Math.sqrt(u*u+g*g)};return{setOnMoveCallback:c=>{o=c},setOnScaleCallback:c=>{i=c},getDistance:p,getDraggingDom:()=>r,onMouseDown:c=>{if(c.preventDefault(),c.buttons!==1){e=!1,r=null;return}e=!0,r=c.currentTarget,t=c.clientX,n=c.clientY},onMouseMove:c=>{if(c.buttons===0||!r){e=!1,r=null;return}o(c.clientX,c.clientY,c.clientX-t,c.clientY-n)},onMouseUp:()=>{e=!1,a=!1,r=null},onTouchStart:c=>{c.touches.length===1?(e=!0,r=c.currentTarget,t=c.touches[0].clientX,n=c.touches[0].clientY):c.touches.length===2?(s=p(c.touches[0],c.touches[1]),a=!0):(e=!1,r=null)},onTouchMove:c=>{if(a&&c.touches.length===2){c.preventDefault();let u=p(c.touches[0],c.touches[1])/s;i(u);return}if(!e||c.touches.length===0||!r){e=!1,r=null;return}o(c.touches[0].clientX,c.touches[0].clientY,c.touches[0].clientX-t,c.touches[0].clientY-n)},onTouchEnd:()=>{e=!1,a=!1,r=null}}}});var br,yi=m(()=>{"use strict";br=class{static loadScript(t,n,r=!1){return new Promise((o,i)=>{if(this.existScript(t,n)){o(t);return}let a=document.createElement("script");a.src=t,n&&(a.id=n),a.onload=()=>{o(t),r&&a.remove()},a.onerror=()=>{i(new Error("Failed to load module script with URL "+t)),r&&a.remove()};let s=document.getElementsByTagName("head")[0];s?s.appendChild(a):document.documentElement.appendChild(a)})}static existScript(t,n){if(n){let o=document.getElementById(n);if(o&&o.tagName==="SCRIPT"){let i=o.src.split("?")[0];if(i.substring(i.length-t.length)===t)return!0}}let r=document.scripts;for(let o=0;o<r.length;o++){let i=r[o].src.split("?")[0];if(i.substring(i.length-t.length)===t)return!0}}static loadCss(t,n){return new Promise((r,o)=>{if(this.existCss(t,n)){r(t);return}if(n){let a=document.getElementById(n);a&&a.tagName==="LINK"&&a.parentNode.removeChild(a)}let i=document.createElement("link");i.rel="stylesheet",i.type="text/css",i.href=t,i.media="all",n&&(i.id=n),i.onload=()=>{r(t)},i.onerror=()=>{o(new Error("Failed to load css with URL "+t))},document.getElementsByTagName("head")[0].appendChild(i)})}static existCss(t,n){if(n){let o=document.getElementById(n);if(o&&o.tagName==="LINK"){let i=o.href.split("?")[0];if(i.substring(i.length-t.length)===t)return!0}}let r=document.styleSheets;for(let o=0;o<r.length;o++){let a=r[o].href.split("?")[0];if(a.substring(a.length-t.length)===t)return!0}}}});var Ju,Ku,ki=m(()=>{"use strict";Ju=e=>e.replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t]||""),Ku=e=>e.replace(/&(\D+);/gi,t=>({"&amp;":"&","&lt;":"<","&gt;":">","&#39;":"'","&quot;":'"'})[t]||"")});var Xu,wi=m(()=>{"use strict";Xu=(e,t)=>{let n=t.toUpperCase(),r=e.parentElement;for(;r&&r.tagName!==n&&r.tagName!=="BODY";)r=r.parentElement;return r}});var Zu,Si=m(()=>{"use strict";Zu=(e,t=2)=>{if(!+e)return"0 Bytes";let n=1024,r=t<0?0:t,o=["Bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],i=Math.floor(Math.log(e)/Math.log(n));return`${parseFloat((e/Math.pow(n,i)).toFixed(r))} ${o[i]}`}});var xr,Ti=m(()=>{"use strict";xr=class e{static queryOne(t,n){if(!t)return null;if(t instanceof e)return t;if(t instanceof Element)return new e(t);let r=(n||document).querySelector(t);return r?new e(r):null}static queryAll(t,n){if(!t)return[];if(t instanceof e)return[t];if(t instanceof Element)return[new e(t)];let r=(n||document).querySelectorAll(t),o=[];for(let i in r)o.push(new e(r[i]));return o}static createElement(t,n){let r=(n||document).createElement(t);return new e(r)}constructor(t,n){if(t instanceof e)this.node=t.node;else if(t instanceof Element)this.node=t;else{let r=t&&(n||document).querySelector(t);if(r)this.node=r;else throw new TypeError("Element is not defined for a new LibDom")}}getElement(){return this.node}$(t,n){let r=e.queryOne(t,this.node);return r&&typeof n<"u"&&("checked"in r.node?r.node.checked=!!n:"value"in r.node?r.node.value=n:"innerHTML"in r.node&&(r.node.innerHTML=""+n)),r}query(t){return e.queryOne(t,this.node)}queryAll(t){return e.queryAll(t,this.node)}on(t,n){return this.node.addEventListener(t,n,!1),this}off(t,n){return this.node.removeEventListener(t,n,!1),this}fire(t){return this.node.dispatchEvent(t),this}isCheckbox(){return this.tagName==="INPUT"&&this.node.type==="checkbox"}isRadio(){return this.tagName==="INPUT"&&this.node.type==="radio"}val(t){return typeof t>"u"?this.node.value:("value"in this.node&&(this.node.value=t),this)}checked(t){return typeof t>"u"?this.node.checked:("checked"in this.node&&(this.node.checked=!!t),this)}selectedIndex(t){return typeof t>"u"?this.node.selectedIndex:("selectedIndex"in this.node&&(this.node.selectedIndex=t),this)}html(t){return typeof t>"u"?this.node.innerHTML:("innerHTML"in this.node&&(this.node.innerHTML=t),this)}css(t,n){return typeof n>"u"?this.node instanceof HTMLElement&&this.node.style.getPropertyValue(t):(this.node instanceof HTMLElement&&(n===null?this.node.style.removeProperty(t):this.node.style.setProperty(t,n)),this)}attribute(t,n){return typeof n>"u"?this.node.getAttribute(t):(n===null?this.node.removeAttribute(t):this.node.setAttribute(t,n),this)}class(t,n){if(!t&&!n)return this.node.className;let r=this.node.classList;return t&&(t instanceof Array?r.add(...t):r.add(t)),n&&(n instanceof Array?r.remove(...n):r.remove(n)),this}appendChild(t){let n=t instanceof e?t.getElement():t;return n&&this.node.appendChild(n),this}removeChild(t){let n=t instanceof e?t.getElement():t;return n&&this.node.removeChild(n),this}removeSelf(){return this.node.remove(),this}get children(){if(!this.node.children)return[];let t=[];for(let n=0;n<this.node.children.length;n++)t.push(new e(this.node.children[n]));return t}get tagName(){return this.node.tagName.toUpperCase()}}});var vr,yr,Ci=m(()=>{"use strict";vr=class{constructor(t,n,r){this.actionId=t;this.message=n;this.extraData=r}},yr=class{constructor(t=!1){this.passLastMsgWhenSubscribe=t;this.subscriptions={};this.subscriptionValues={};this.lastId=0}subscribe(t,n,r=!0){let o=this.lastId++;return this.subscriptions[t]||(this.subscriptions[t]={}),this.subscriptions[t][o]=n,r&&this.passLastMsgWhenSubscribe&&this.subscriptionValues[t]&&this.notify(n,this.subscriptionValues[t]),()=>{delete this.subscriptions[t][o];var i=!0;for(var a in this.subscriptions[t]){i=!1;break}i&&delete this.subscriptions[t]}}send(t,n){if(t==="*"){for(var r in this.subscriptions)for(var o in this.subscriptions[r])this.notify(this.subscriptions[r][o],n);return}if(this.passLastMsgWhenSubscribe&&(this.subscriptionValues[t]=n),this.subscriptions[t])for(var o in this.subscriptions[t])this.notify(this.subscriptions[t][o],n);if(this.subscriptions["*"])for(var o in this.subscriptions["*"])this.notify(this.subscriptions["*"][o],n)}hasListener(t){if(t==="*")for(var n in this.subscriptions)return!0;else for(var n in this.subscriptions[t])return!0;return!1}notify(t,n){setTimeout(()=>{t(n)},0)}}});var nn,rn,kr,Pi=m(()=>{"use strict";nn=class{constructor(t){this._unsubscribe=t}unsubscribe(){this._unsubscribe&&this._unsubscribe()}},rn=class{constructor(){}subscribe(t,n,r){throw new Error("subscribe is not implemented")}},kr=class extends rn{constructor(n=!1){super();this.observers=[];this.isStopped=!1;this._hasError=!1;this.lastSaved={};this.passLastMsgWhenSubscribe=n}next(n){if(this.isStopped)throw new Error("Subject is closed");let r=this.observers.length,o=this.observers.slice();for(let i=0;i<r;i++){let a=o[i].next;typeof a<"u"&&typeof n<"u"&&a(n)}this.passLastMsgWhenSubscribe&&typeof n<"u"&&(this.lastSaved.value=n)}error(n){if(this.isStopped)throw new Error("Subject is closed");this._hasError=!0,this.isStopped=!0;let r=this.observers.length,o=this.observers.slice();for(let i=0;i<r;i++){let a=o[i].error;typeof a<"u"&&typeof n<"u"&&a(n)}this.observers.length=0}complete(){if(this.isStopped)throw new Error("Subject is closed");this.isStopped=!0;let n=this.observers.slice(),r=n.length;for(let o=0;o<r;o++){let i=n[o].complete;typeof i<"u"&&i()}this.observers.length!=r&&console.warn(`Subscribe count changed from ${r} to ${this.observers.length}`),this.observers.length=0}hasError(){return this._hasError}unsubscribe(n){let r=this.observers.findIndex(o=>o===n);r>-1&&this.observers.splice(r,1)}subscribe(n,r,o){if(this.isStopped)throw new Error("Subject is stopped");let i={next:n,error:r,complete:o};return this.observers.push(i),this.passLastMsgWhenSubscribe&&typeof i.next<"u"&&typeof this.lastSaved.value<"u"&&i.next(this.lastSaved.value),new nn(()=>{this.unsubscribe(i)})}asObservable(){return this}}});var Ei,Mi=m(()=>{"use strict";Ei={join(...e){var r;let t=e.filter(Boolean).join("/");return t=t.replace(/\/+/g,"/"),((r=e[0])==null?void 0:r.startsWith("/"))?"/"+t.replace(/^\/+/,""):t.replace(/^\/+/,"")},dirname(e){if(!e)return".";e=e.replace(/\/+$/,"");let t=e.lastIndexOf("/");return t===-1?".":t===0?"/":e.slice(0,t)},basename(e,t){if(!e)return"";e=e.replace(/\/+$/,"");let n=e.lastIndexOf("/"),r=n===-1?e:e.slice(n+1);if(t)t&&r.endsWith(t)&&(r=r.slice(0,-t.length));else{let o=e.lastIndexOf(".");o>=0&&(r=r.slice(0,o))}return r},extname(e){if(!e)return"";let t=Ei.basename(e),n=t.lastIndexOf(".");return n>0?t.slice(n):""}}});var Qu,Li=m(()=>{"use strict";Qu=e=>new Promise(t=>setTimeout(t,e))});var wr,Ai=m(()=>{"use strict";wr=class{constructor(t){this.settings={};this.settings=t}contains(t){return t in this.settings}set(t,n){return this.settings[t]=n}get(t,n){return t in this.settings?this.settings[t]:n}getInt(t,n){if(t in this.settings){let r=parseInt(this.settings[t]);if(!isNaN(r))return r}return n}getBoolean(t,n){return t in this.settings?this.settings[t]==="1"||this.settings[t].toLowerCase()==="true":n}getJson(t,n){if(t in this.settings)try{return JSON.parse(this.settings[t])}catch{}return n}}});var $,Ri=m(()=>{"use strict";$=e=>{e&&(e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,e.returnValue=!1)}});function l(e,t){return{type:e,props:t}}function Z(e){return{type:"Fragment",props:e}}var f=m(()=>{"use strict"});var se,Pr,Sr,Tr,eg,Cr,tg,ng,Hi=m(()=>{"use strict";H();xe();f();se=class{static async show({title:t,children:n,contentMaxWidth:r,contentMaxHeight:o,closeEvent:i,closeWhenClickOutside:a=!0,confirmButtonText:s="",handleConfirmClicked:p,cancelButtonText:c="Cancel",zIndex:d}){let u=()=>{p?p(b):b("confirm")},g=()=>{b("cancel")},h=y=>{a!==!1&&y.target.classList.contains("act-sheet-box")&&b("cancel")},b=y=>{i==null||i(y),v.current.classList.remove("animation-open"),setTimeout(()=>{x.remove()},300)},x=document.createElement("div"),v={onLoad:async()=>{setTimeout(()=>{v.current.classList.add("animation-open")},1)}},k=l("div",{css:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"var(--cover-mask-bg-color)",".act-sheet-body":{display:"flex",flexDirection:"column",textAlign:"center",position:"fixed",bottom:"0px",left:"0px",width:"100%",maxHeight:o||"100%",color:"var(--primary-color)",padding:"8px",transition:"all 0.3s",transform:"translateY(100%)","&.animation-open":{transform:"translateY(0)"},".act-sheet-title":{padding:"20px 15px 10px 15px",opacity:.5},".act-sheet-content":{display:"flex",flexDirection:"column",flex:1,overflowY:"auto",borderRadius:"8px",backgroundColor:"var(--cover-bg-color)",width:"100%",maxWidth:r||"clamp(200px, 90%, 600px)",margin:"0 auto"},".act-sheet-bottom-item, .act-sheet-item":{backgroundColor:"var(--cover-bg-color)",padding:"20px 0",cursor:"pointer",transition:"all 0.3s ease",width:"100%",maxWidth:r||"clamp(200px, 90%, 600px)",borderTop:"1px solid var(--primary-border-color)"},".act-sheet-bottom-item":{borderRadius:"8px",margin:"0 auto",marginTop:"4px"},".act-sheet-bottom-item:hover, .act-sheet-item:hover":{fontWeight:"bold"},".act-sheet-confirm, .act-sheet-item":{borderRadius:"unset",marginTop:"unset",maxWidth:"unset"}}},class:"act-sheet-box",onClick:h,"data-back-action":ae.genBackActionId(),children:l("div",{ref:v,class:"act-sheet-body",children:[l("div",{class:"act-sheet-content",children:[l("div",{class:"act-sheet-title",children:t}),n,s&&l("div",{class:"act-sheet-bottom-item act-sheet-confirm",onClick:u,children:s})]}),c&&l("div",{class:"act-sheet-bottom-item",onClick:g,children:c})]})});return x.style.position="fixed",x.style.zIndex=d||"var(--layer-actionsheet-window)",document.body.appendChild(x),await _(x,k),b}},Pr={YesNo:["Yes","No"],Ok:["OK"]},Sr=class{static async show({title:t,contentMaxHeight:n,options:r=Pr.Ok,closeEvent:o,handleClicked:i,closeWhenClickOutside:a=!0,confirmButtonText:s,handleConfirmClicked:p,cancelButtonText:c="Cancel"}){let d=await se.show({title:t,children:l("div",{children:r.map((u,g)=>l("div",{class:"act-sheet-item",onClick:()=>i(g,d),children:u},g))}),contentMaxHeight:n,confirmButtonText:s,handleConfirmClicked:p,cancelButtonText:c,closeEvent:o,closeWhenClickOutside:a});return d}},Tr=class{static async show({title:t,message:n,contentMaxWidth:r,contentMaxHeight:o,closeWhenClickOutside:i=!0,confirmButtonText:a,handleConfirmClicked:s,cancelButtonText:p=""}){let c=await se.show({title:t,children:l("div",{css:{padding:"8px",borderTop:"1px solid var(--primary-border-color)"},onClick:()=>c("select"),children:n}),contentMaxWidth:r,contentMaxHeight:o,confirmButtonText:a,handleConfirmClicked:s,cancelButtonText:p,closeWhenClickOutside:i});return c}},eg=async({title:e,message:t,contentMaxWidth:n,contentMaxHeight:r,closeWhenClickOutside:o=!0,confirmButtonText:i,zIndex:a})=>new Promise(async(s,p)=>{let c=d=>{s()};await se.show({title:e,children:l("div",{css:{padding:"8px",borderTop:"1px solid var(--primary-border-color)"},children:t}),contentMaxWidth:n,contentMaxHeight:r,confirmButtonText:i,closeEvent:c,closeWhenClickOutside:o,zIndex:a})}),Cr=class{static async show({title:t,defaultValue:n,contentMaxHeight:r,closeWhenClickOutside:o=!0,confirmButtonText:i="OK",handleConfirmValue:a,cancelButtonText:s="Cancel"}){let p=n||"";return await se.show({title:t,children:l("div",{css:{padding:"8px",borderTop:"1px solid var(--primary-border-color)"},children:l("input",{class:"input-base w-100p",type:"text",value:p,onInput:d=>p=d.target.value})}),contentMaxHeight:r,confirmButtonText:i,handleConfirmClicked:d=>{a(p,d)},cancelButtonText:s,closeWhenClickOutside:o})}},tg=async({title:e,defaultValue:t,contentMaxWidth:n,contentMaxHeight:r,closeWhenClickOutside:o=!0,confirmButtonText:i="OK",cancelButtonText:a="Cancel",zIndex:s})=>new Promise(async(p,c)=>{let d=g=>{g!=="confirm"&&p(void 0)},u=t||"";await se.show({title:e,children:l("div",{css:{padding:"8px",borderTop:"1px solid var(--primary-border-color)"},children:l("input",{class:"input-base w-100p",type:"text",value:u,onInput:g=>u=g.target.value})}),contentMaxWidth:n,contentMaxHeight:r,confirmButtonText:i,handleConfirmClicked:g=>{p(u),g("confirm")},closeEvent:d,cancelButtonText:a,closeWhenClickOutside:o,zIndex:s})}),ng=async({title:e,contentMaxWidth:t,contentMaxHeight:n,options:r=Pr.Ok,closeWhenClickOutside:o=!0,cancelButtonText:i="Cancel",zIndex:a})=>new Promise(async(s,p)=>{let c=async(g,h)=>{s(g),h("select")},d=g=>{g!=="select"&&s(-1)},u=await se.show({title:e,children:l("div",{children:r.map((g,h)=>l("div",{class:"act-sheet-item",onClick:()=>c(h,u),children:g},h))}),contentMaxWidth:t,contentMaxHeight:n,cancelButtonText:i,closeEvent:d,closeWhenClickOutside:o,zIndex:a})})});var Ii,rg,Di=m(()=>{"use strict";f();Ii=(i=>(i.SmallSmall="button-ss",i.Small="button-s",i.Medium="button-m",i.Large="button-l",i.LargeLarge="button-ll",i))(Ii||{}),rg=e=>{let t=e.disabled||!1,n=()=>{t||e.onClick&&e.onClick()};e.hook&&(e.hook.setEnabled=i=>{t=!i,r.current.disabled=t},e.hook.getEnabled=()=>!t);let r={},o={all:"unset",cursor:"pointer","-webkit-tap-highlight-color":"rgba(0, 0, 0, 0)",position:"relative",borderRadius:"var(--border-radius-m)",backgroundColor:"rgba(0, 0, 0, 0.75)",boxShadow:"-0.15em -0.15em 0.15em -0.075em rgba(5, 5, 5, 0.25), 0.0375em 0.0375em 0.0675em 0 rgba(5, 5, 5, 0.1)",".button-outer":{position:"relative",zIndex:1,borderRadius:"inherit",transition:"box-shadow 300ms ease",willChange:"box-shadow",boxShadow:"0 0.05em 0.05em -0.01em rgba(5, 5, 5, 1), 0 0.01em 0.01em -0.01em rgba(5, 5, 5, 0.5), 0.15em 0.3em 0.1em -0.01em rgba(5, 5, 5, 0.25)"},".button-inner":{position:"relative",zIndex:2,borderRadius:"inherit",padding:"var(--button-padding)",background:"linear-gradient(135deg, #ffffff, #eeeeee)",transition:"box-shadow 300ms ease, background-image 250ms ease, transform 250ms ease;",willChange:"box-shadow, background-image, transform",overflow:"clip",boxShadow:"0 0 0 0 inset rgba(5, 5, 5, 0.1), -0.05em -0.05em 0.05em 0 inset rgba(5, 5, 5, 0.25), 0 0 0 0 inset rgba(5, 5, 5, 0.1), 0 0 0.05em 0.2em inset rgba(255, 255, 255, 0.25), 0.025em 0.05em 0.1em 0 inset rgba(255, 255, 255, 1), 0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25), -0.075em -0.25em 0.25em 0.1em inset rgba(5, 5, 5, 0.25)"},".button-inner span":{position:"relative",zIndex:4,letterSpacing:"-0.05em",color:"rgba(0, 0, 0, 0);",backgroundImage:"linear-gradient(135deg, rgba(25, 25, 25, 1), rgba(75, 75, 75, 1))",backgroundClip:"text",transition:"transform 250ms ease",display:"block",willChange:"transform",textShadow:"rgba(0, 0, 0, 0.1) 0 0 0.1em",userSelect:"none"},"&.button-ss":{borderRadius:"2px"},"&.button-s":{borderRadius:"3px"},"&.button-l":{borderRadius:"6px"},"&.button-ll":{borderRadius:"10px"},"&.button-ss .button-inner":{padding:"0.1rem 0.3rem",fontSize:"0.65rem"},"&.button-s .button-inner":{padding:"0.2rem 0.5rem",fontSize:"0.85rem"},"&.button-l .button-inner":{padding:"0.4rem 1.2rem",fontSize:"1.5rem"},"&.button-ll .button-inner":{padding:"0.5rem 1.5rem",fontSize:"2rem"},"&:active .button-outer":{boxShadow:"0 0 0 0 rgba(5, 5, 5, 1), 0 0 0 0 rgba(5, 5, 5, 0.5), 0 0 0 0 rgba(5, 5, 5, 0.25)"},"&:active .button-inner":{boxShadow:"0.1em 0.15em 0.05em 0 inset rgba(5, 5, 5, 0.75), -0.025em -0.03em 0.05em 0.025em inset rgba(5, 5, 5, 0.5), 0.25em 0.25em 0.2em 0 inset rgba(5, 5, 5, 0.5), 0 0 0.05em 0.5em inset rgba(255, 255, 255, 0.15), 0 0 0 0 inset rgba(255, 255, 255, 1), 0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25), -0.075em -0.12em 0.2em 0.1em inset rgba(5, 5, 5, 0.25)"},"&:hover .button-inner":{transform:"scale(0.99)"},"&:hover .button-inner span":{transform:"scale(0.975)"},...e.css};return l("button",{ref:r,css:o,class:["button-push-animation",e.size,e.class].join(" "),disabled:t,onClick:n,children:l("div",{class:"button-outer",children:l("div",{class:"button-inner",children:l("span",{children:e.text})})})})}});var zi,og,Fi=m(()=>{"use strict";f();zi=(i=>(i.SmallLarge="button-ss",i.Small="button-s",i.Medium="button-m",i.Large="button-l",i.LargeLarge="button-ll",i))(zi||{}),og=e=>{let t=e.disabled||!1,n=()=>{t||e.onClick&&e.onClick()};e.hook&&(e.hook.setEnabled=o=>{t=!o,r.current.disabled=t},e.hook.getEnabled=()=>!t);let r={};return l("button",{ref:r,class:["button-base",e.size,e.class].join(" "),css:e.css,disabled:t,onClick:n,children:e.text})}});var Er,ig,Mr,ag,Lr=m(()=>{"use strict";f();Er=(o=>(o.Small="22px",o.Medium="30px",o.Large="40px",o.LargeLarge="60px",o))(Er||{}),ig=({size:e="30px",color:t="var(--primary-color)"})=>{let n=e==="22px"||e==="30px"?"4px":e==="40px"?"6px":"9px",r={width:e,aspectRatio:1,borderRadius:"50%",background:`radial-gradient(farthest-side,${t} 94%,#0000) top/8px 8px no-repeat, conic-gradient(#0000 30%,${t})`,"-webkit-mask":`radial-gradient(farthest-side,#0000 calc(100% - ${n}),#000 0)`,animation:"spinner01 1s infinite linear","@keyframes spinner01":{"100%":{transform:"rotate(1turn)"}}};return l("div",{css:r})},Mr=({size:e="30px",color:t="var(--primary-color)"})=>{let n=parseInt(e.replace("px","")),r=Array.from({length:7},(i,a)=>`${(a*n/15/7).toFixed(2)}px`),o={width:e,height:e,display:"flex",placeItems:"center",justifyContent:"center",".spinner02-box":{"--spin02-w":`${n/2-3}px`,width:"4px",height:"4px",borderRadius:"50%",color:t,boxShadow:`
    calc(1*var(--spin02-w))      calc(0*var(--spin02-w))      0 0,
    calc(0.707*var(--spin02-w))  calc(0.707*var(--spin02-w))  0 ${r[1]},
    calc(0*var(--spin02-w))      calc(1*var(--spin02-w))      0 ${r[2]},
    calc(-0.707*var(--spin02-w)) calc(0.707*var(--spin02-w))  0 ${r[3]},
    calc(-1*var(--spin02-w))     calc(0*var(--spin02-w))      0 ${r[4]},
    calc(-0.707*var(--spin02-w)) calc(-0.707*var(--spin02-w)) 0 ${r[5]},
    calc(0*var(--spin02-w))      calc(-1*var(--spin02-w))     0 ${r[6]}`,animation:"spinner02 1s infinite steps(8)"},"@keyframes spinner02":{"100%":{transform:"rotate(1turn)"}}};return l("div",{css:o,children:l("div",{class:"spinner02-box"})})},ag=({size:e="30px",colorRGB:t="55 55 55"})=>{let n={width:e,height:e,aspectRatio:1,display:"grid",borderRadius:"50%",background:`linear-gradient(0deg, rgb(${t} / 50%) 30%, #0000 0 70%, rgb(${t} / 100%) 0) 50% / 8% 100%, linear-gradient(90deg, rgb(${t} / 25%) 30%, #0000 0 70%, rgb(${t} / 75%) 0) 50% / 100% 8%`,backgroundRepeat:"no-repeat",animation:"spinner03 1s infinite steps(12)","&::before, &::after":{content:'""',gridArea:"1/1",borderRadius:"50%",background:"inherit",opacity:.915,transform:"rotate(30deg)"},"&::after":{opacity:.83,transform:"rotate(60deg)"},"@keyframes spinner03":{"100%":{transform:"rotate(1turn)"}}};return l("div",{css:n})}});var sg,Oi=m(()=>{"use strict";Lr();f();sg=e=>{let t={display:"flex",flexDirection:"column",width:"100%",height:"0px",position:"relative",".drag-spinner":{position:"fixed",top:"0",left:"0",width:"100%",zIndex:"var(--layer-dragged-item)",display:"none",justifyContent:"center",transition:"opacity 0.5s ease",alignItems:"end",backgroundImage:"linear-gradient(to bottom, rgba(200,200,200,0.8), rgba(255,255,255,0))"},"&.show .drag-spinner":{display:"flex"}},n=!0;e.hook&&(e.hook.setEnable=i=>{n=i},e.hook.updateOnDragRefresh=i=>{e.onDragRefresh=i});let r=()=>{let i=o.$(".drag-spinner");i&&(i.style.opacity="0",setTimeout(()=>{i.style.opacity="1",i.parentElement.classList.remove("show")},300))},o={onLoad:async()=>{let i=document.querySelector(e.container),a=o.current,s=o.$(".drag-spinner");if(!i||!a||!s)return;let p=0,c=0,d="",u=!1,g=150;i.addEventListener("touchstart",h=>{n&&(p=h.touches[0].clientY,c=h.touches[0].clientX,d="",u=!1)}),i.addEventListener("touchmove",h=>{if(!n)return;let b=h.touches[0].clientY,x=h.touches[0].clientX,v=b-p,E=x-c;d===""&&(Math.abs(v)>Math.abs(E)?d="Y":d="X"),d==="Y"&&(i.scrollTop<=0&&v>5?(u=v>60,v>5?(a.classList.add("show"),s.style.height=`${Math.min(g,v)}px`):(a.classList.remove("show"),s.style.height="0")):(a.classList.remove("show"),s.style.height="0"))}),i.addEventListener("touchend",h=>{n&&(d==="Y"&&(u?e.onDragRefresh(r):r()),d="")})}};return l("div",{css:t,ref:o,class:"drag-refresh-box",children:l("div",{class:"drag-spinner",children:l(Mr,{size:"40px"})})})}});var lg,Bi=m(()=>{"use strict";f();lg=e=>{let t=!1,n=e.text,r=()=>{if(t)return;t=!0;let c=p.$("input.editable-label");n=c.value,c.removeAttribute("readonly"),c.classList.remove("not-editable"),c.setSelectionRange(0,0)},o=()=>{let c=p.$("input.editable-label");return c.setAttribute("readonly","readonly"),c.classList.add("not-editable"),n="",t=!1,c},i=c=>{if(t){if(c.key==="Enter")a();else if(c.key==="Escape"){let d=p.$("input.editable-label");d.value=n,o()}}},a=()=>{var u;let c=n,d=o();c!==d.value&&(e.mandtory===!0&&!d.value?d.value=c:(u=e.save)==null||u.call(e,d.value))};e.hook&&(e.hook.updateValue=c=>{let d=p.$("input.editable-label");d.value=c});let s={".not-editable":{borderColor:"transparent",boxShadow:"unset"},"input.editable-label":{width:"100%"}},p={};return l("div",{css:s,ref:p,children:l("input",{class:"input-base editable-label not-editable",onDblClick:r,onKeyDown:i,value:e.text,onBlur:a,readOnly:!0})})}});var U,ze,on=m(()=>{"use strict";H();xe();f();U=class U{static init(){window.addEventListener("mousemove",U.onMousemove.bind(U),!1),document.documentElement.addEventListener("mouseup",U.onMouseup.bind(U),!1)}static async show({title:t,children:n,contentMaxHeight:r,contentMinWidth:o,buttons:i,noMoving:a=!1,noModal:s=!1,closeEvent:p,handleClicked:c,closeWhenClickOutside:d=!1,zIndex:u,contentOverflowY:g="auto"}){let h=C=>{d!==!1&&C.target.classList.contains("fwin-box")&&b()},b=()=>{p==null||p(),y.current.classList.add("transition"),y.current.classList.remove("animation"),setTimeout(()=>{x.remove()},300)},x=document.createElement("div"),v=C=>{a||(this.initialized||(this.initialized=!0,this.init()),U.hostNode=y.current,U.onMousedown.bind(U)(C))},E=!i||i.length===0?["OK","Cancel"]:i,k=C=>{c(C,b)},y={onLoad:async()=>{y.current.classList.add("transition"),setTimeout(()=>{y.current.classList.add("animation")},1),setTimeout(()=>{y.current.classList.remove("transition")},300)}},T={position:s?"":"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:s?"":"var(--cover-mask-bg-color)",".fwin-body":{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%) scale(0.1)",color:"var(--primary-color)",backgroundColor:"var(--cover-bg-color)",border:"var(--primary-border)",borderRadius:"6px",minWidth:o||"",maxWidth:"90%",boxShadow:"var(--cover-box-shadow)",opacity:0,"&.transition":{transition:"all 0.3s"},"&.animation":{transform:"translate(-50%, -50%) scale(1)",opacity:1},"&.animation-close":{transition:"all 0.3s",transform:"translate(-50%, -50%) scale(0)",opacity:0},".fwin-title":{padding:"10px 15px 5px",borderBottom:"var(--primary-border)",".fwin-close":{color:"#aaaaaa",float:"right",fontSize:"26px",fontWeight:"bold",cursor:"pointer",marginTop:"-8px",marginRight:"-10px"},".fwin-close:hover":{transition:"all 300ms ease",color:"#555555"}},".fwin-content":{padding:"15px",maxHeight:r?`min(${r}, calc(100% - 100px))`:"calc(100% - 100px)",overflowY:g},".fwin-bottom":{display:"flex",padding:"5px 15px",borderTop:"var(--primary-border)",justifyContent:"end",">div":{marginLeft:"5px"}}}},F=l("div",{css:T,class:"fwin-box",onClick:h,children:l("div",{ref:y,class:"fwin-body",onMouseDown:v,children:[l("div",{class:"fwin-title",children:[t,l("span",{class:"fwin-close",onClick:b,children:"\xD7"})]}),l("div",{class:"fwin-content",children:n}),l("div",{class:"fwin-bottom",children:E.map((C,D)=>l("button",{class:"button-base button-s mr-m",onClick:()=>{k(D)},children:C}))})]})});return x.style.position="fixed",x.style.zIndex=u||"var(--layer-float-window)",document.body.appendChild(x),await _(x,F),b}static onMousedown(t){if(t.buttons!==1||t.button!==0||t.srcElement.className!=="fwin-title")return;this.pressed=!0,this.startX=t.clientX,this.startY=t.clientY;let n=document.defaultView.getComputedStyle(this.hostNode);this.startTop=parseInt(n.top,10),this.startLeft=parseInt(n.left,10)}static onMousemove(t){if(!this.pressed||t.buttons!==1||t.button!==0||($(t),t.clientX<0||t.clientY<0||t.clientX>window.innerWidth||t.clientY>window.innerHeight))return;let n=this.startLeft+(t.clientX-this.startX),r=this.startTop+(t.clientY-this.startY);r<=0&&(r=0),n<=0&&(n=0),this.hostNode.style.top=r+"px",this.hostNode.style.left=n+"px"}static onMouseup(){this.pressed&&(this.pressed=!1)}};U.initialized=!1,U.pressed=!1,U.startX=0,U.startY=0,U.startTop=0,U.startLeft=0;ze=U});var cg,Ni=m(()=>{"use strict";f();cg=({gridOption:e})=>{let t={display:"grid",...e.options},n=[];e.cells.forEach((o,i)=>{let a=o.name||"cell"+i;t[`.${a}`]=o.option,n.push(l("div",{class:a,children:o.component}))});let r="grid-box"+(e.className?` ${e.className}`:"");return l("div",{css:t,class:r,children:n})}});var pg,Wi=m(()=>{"use strict";pg=e=>{let t={onLoad:async n=>{let r=await e.html();await t.mountInnerComponent(r)}};return e.hook&&(e.hook.getRef=()=>t,e.hook.render=n=>{t.mountInnerComponent(n)}),{type:"Fragment",props:{ref:t,children:e.initialHtml||""},html:[]}}});var A,Ar=m(()=>{"use strict";A=class{constructor(t){this._dirty=!1;this.promise=new Promise(n=>{this.resolve=n}),this._value=t||"",this._ref={onLoad:async n=>{let r=this.resolve;this._dirty&&await this.update(),r()}}}async update(){let t=typeof this._value=="function"?await this._value():this._value;await this._ref.mountInnerComponent(t),this._dirty=!1,this._value=""}async waitUpdate(){await this.promise}set value(t){this._value=t,!this._dirty&&(this._dirty=!0,this._ref.current&&(this.promise=new Promise(async n=>{this.resolve=n,await this.update(),this.resolve()})))}get value(){return this._ref.current?this._ref.current.innerHTML:this._value}get ref(){return this._ref}get node(){let t=typeof this._value=="function";return this._dirty=!!t,{type:"Fragment",props:{ref:this._ref,children:t?"":this._value},html:[]}}}});var dg,ji=m(()=>{"use strict";f();dg=(e,t,n,r,o="input-base",i="100%")=>l("div",{children:[l("div",{style:{paddingBottom:"4px"},children:e}),l("div",{children:l("input",{class:o,style:{width:i},onChange:a=>{var s;return n==null?void 0:n((s=a==null?void 0:a.target)==null?void 0:s.value)},onInput:a=>{var s;return r==null?void 0:r((s=a==null?void 0:a.target)==null?void 0:s.value)},value:t})})]})});var bt,an=m(()=>{"use strict";f();bt=e=>l("a",{class:["link-item",e.className].join(" "),href:e.url,alt:e.alt||e.text,children:e.text})});var ug,qi=m(()=>{"use strict";an();f();ug=({title:e,items:t,className:n,textColor:r="black",backgroundColor:o="#d3d3d3",titleBackgroundColor:i="#b6b6b6"})=>l("div",{css:{width:"100%",margin:"auto",height:"auto",backgroundColor:o,".link-list-title, .link-list-top":{display:"flex",width:"100%",flexWrap:"wrap",padding:"0 16px"},".link-list-title":{backgroundColor:i},".link-list-item":{display:"inline-block",color:r,padding:"8px 16px 8px 0",textDecoration:"none"},".link-list-item:last-child":{paddingRight:"unset"},".link-list-title .link-list-item":{fontSize:"18px"}},class:["link-list-box",n].join(" "),children:[e&&l("div",{class:"link-list-title",children:l("div",{class:"link-list-item",children:e})}),l("div",{class:"link-list-top",children:t.map(s=>l(bt,{className:"link-list-item",url:s.url,alt:s.alt,text:s.text}))})]})});function gg(e,t,n){let r=Number.parseInt(t)+n;return e===0?`@media only screen and (max-width: ${r}px)`:`@media only screen and (min-width: ${r}px)`}var J,W,V,_i,$i=m(()=>{"use strict";J=class J{static get ExtraSmallMax(){return J._ExtraSmall}static get MobileMax(){return J._Mobile}static get TabletMax(){return J._Tablet}static get DesktopMax(){return J._Desktop}static set ExtraSmallMax(t){J._ExtraSmall=t}static set MobileMax(t){J._Mobile=t}static set TabletMax(t){J._Tablet=t}static set DesktopMax(t){J._Desktop=t}};J._ExtraSmall="480px",J._Mobile="767px",J._Tablet="991px",J._Desktop="1399px";W=J,V=class{static get ExtraSmallBelow(){return`@media only screen and (max-width: ${W.ExtraSmallMax})`}static get ExtraSmallAbove(){return`@media only screen and (min-width: ${W.ExtraSmallMax})`}static get MobileBelow(){return`@media only screen and (max-width: ${W.MobileMax})`}static get MobileAbove(){return`@media only screen and (min-width: ${W.MobileMax})`}static get TabletBelow(){return`@media only screen and (max-width: ${W.TabletMax})`}static get TabletAbove(){return`@media only screen and (min-width: ${W.TabletMax})`}static get DesktopBelow(){return`@media only screen and (max-width: ${W.DesktopMax})`}static get DesktopAbove(){return`@media only screen and (min-width: ${W.DesktopMax})`}},_i=(n=>(n[n.Below=0]="Below",n[n.Above=1]="Above",n))(_i||{})});var xt,sn=m(()=>{"use strict";xt={"--layer-inside":"100","--layer-cover":"200","--layer-header-footer":"300","--layer-sidebar":"400","--layer-sidebar-sub":"410","--layer-slider":"500","--layer-modal":"600","--layer-modal-over":"610","--layer-float-window":"700","--layer-actionsheet-window":"710","--layer-menu":"800","--layer-menu-sub":"810","--layer-notice":"900","--layer-tooltip":"2000","--layer-dragged-item":"2100","--layer-guide":"2500","--font-size-base":"16px","--font-weight-base":"","--font-family-base":'SimSun, "Microsoft YaHei", Helvetica, Arial, sans-serif',"--line-height-base":"1.1","--font-size-h1-l":"2.5rem","--font-size-h1":"2rem","--font-size-h2":"1.5rem","--font-size-h3":"1.17rem","--font-size-h3-5":"1.08rem","--font-size-h4":"1rem","--font-size-h4-5":".91rem","--font-size-h5":".83rem","--font-size-h6":".67rem","--font-size-h6-s":".55rem","--font-size-title":"var(--font-size-h2)","--font-size-subtitle":"var(--font-size-h3-5)","--font-size-paragraph":"var(--font-size-h4)","--font-size-paragraph-s":"var(--font-size-h5)","--input-height":"2.2rem","--input-padding":".3rem .6rem","--button-height":"2.1rem","--button-padding":".3rem .9rem","--space-ss":".15rem","--space-s":".25rem","--space-m":".5rem","--space-l":"1rem","--space-ll":"2rem","--border-radius-s":"2px","--border-radius-m":"4px","--border-radius-l":"8px"}});var Rr,Hr=m(()=>{"use strict";sn();Rr={...xt,"--theme-name":"dark","--scrollbar-bg":"#1c1c1c","--scrollbar-thumb-bg":"#373636","--scrollbar-active-thumb-bg":"#5b5b5b","--primary-color":"#d8d8d8","--primary-color-disabled":"#7d7d7d","--primary-bg-color":"#000000","--primary-border-color":"#aeaeae","--primary-border":"1px solid var(--primary-border-color)","--primary-opacity":"0.5","--primary-disabled-opacity":"0.7","--primary-accent-color":"#1a588a","--secondary-color":"#747474","--secondary-bg-color":"#1c1c1c","--secondary-border-color":"#494949","--secondary-border":"1px solid var(--secondary-border-color)","--activatable-color-normal":"var(--primary-color)","--activatable-bg-color-normal":"var(--primary-bg-color)","--activatable-color-hover":"#e2e2e2","--activatable-bg-color-hover":"#6d6d6d","--activatable-color-selected":"#c2c2c2","--activatable-bg-color-selected":"#5d5d5d","--menu-font-size":"1rem","--menubar-color":"#eeeeee","--menubar-bg-color":"#000000","--menubar-sub-bg-color":"#f9f9f9","--sidebar-color":"var(--primary-color)","--sidebar-bg-color":"#000000","--sidebar-border":"1px solid #303030","--row-1-bg-color":"#212121","--row-2-bg-color":"#303030","--row-hover-bg-color":"#383838","--success-color":"#04AA6D","--info-color":"#2196F3","--warning-color":"#ff9800","--error-color":"#f44336","--success-bg-color":"#10553b","--info-bg-color":"#1a588a","--warning-bg-color":"#a36305","--error-bg-color":"#882c25","--notice-color-with-bg":"#ececec","--cover-mask-bg-color":"#878a9460","--cover-bg-color":"#202020","--cover-box-shadow":"1px 1px 4px #c6c6c6","--cover-box-shadow-around":"#ffffff 0 0 6px 1px","--input-color":"#bdbdbd","--input-bg-color":"#000000","--input-box-shadow":"0px 0px 0px #000000, 1px 1px 0px 0px #50505045","--input-border-focus":"1px solid #0074d9","--button-color":"#bdbdbd","--button-bg":"-webkit-linear-gradient(top, #282828 0%, #212223 74%, #1a1a1a 100%)","--button-bg-hover":"-webkit-linear-gradient(top, #282828 0%, #313233 74%, #252525 100%)","--button-border":"1px solid #373e48","--button-box-shadow":"unset","--header-color":"#000080","--header-bg-color":"#000000","--ss-group-color":"var(--primary-color)","--ss-group-bg-color":"#232323","--ss-row-btn-color":"#eee","--ss-row-btn-bg-color":"#262626","--ss-row-btn-warn-color":"red","--mobile-header-shadow":"0px -1px 4px 1px #848484"}});var ln,Ir=m(()=>{"use strict";sn();ln={...xt,"--theme-name":"light","--scrollbar-bg":"#d5d5d5","--scrollbar-thumb-bg":"#979797","--scrollbar-active-thumb-bg":"#737373","--primary-color":"#303030","--primary-color-disabled":"#a0a0a0","--primary-bg-color":"#ffffff","--primary-border-color":"#858585","--primary-border":"1px solid var(--primary-border-color)","--primary-opacity":"unset","--primary-disabled-opacity":"0.5","--primary-accent-color":"#0a74c9","--secondary-color":"#818181","--secondary-bg-color":"#eeeeee","--secondary-border-color":"#a0a0a0","--secondary-border":"1px solid var(--secondary-border-color)","--activatable-color-normal":"var(--primary-color)","--activatable-bg-color-normal":"var(--primary-bg-color)","--activatable-color-hover":"#1d1d1d","--activatable-bg-color-hover":"#bcbcbc","--activatable-color-selected":"#2d2d2d","--activatable-bg-color-selected":"#dcdcdc","--menu-font-size":"1rem","--menubar-color":"#eeeeee","--menubar-bg-color":"#000000","--menubar-sub-bg-color":"#f9f9f9","--sidebar-color":"var(--primary-color)","--sidebar-bg-color":"#f4f3f4","--sidebar-border":"1px solid #858585","--row-bg-color1":"#ffffff","--row-bg-color2":"#ffffff","--success-color":"#04AA6D","--info-color":"#2196F3","--warning-color":"#ff9800","--error-color":"#f44336","--success-bg-color":"#04AA6D","--info-bg-color":"#2196F3","--warning-bg-color":"#ff9800","--error-bg-color":"#f44336","--notice-color-with-bg":"#ffffff","--cover-mask-bg-color":"#00000060","--cover-bg-color":"#f5f5f5","--cover-box-shadow":"3px 3px 8px #767676","--cover-box-shadow-around":"#000000 2px 4px 20px 1px","--input-color":"#4e4e4e","--input-bg-color":"#ffffff","--input-box-shadow":"0px 0px 0px #000000, 1px 1px 0px 0px #50505045","--input-border-focus":"1px solid #0074d9","--button-color":"#4e4e4e","--button-bg":"-webkit-linear-gradient(top, #ffffff 0%, #f6f6f6 74%, #ededed 100%)","--button-bg-hover":"-webkit-linear-gradient(top, #ffffff 0%, #e6e6e6 74%, #dddddd 100%)","--button-border":"1px solid #f6f6f6","--button-box-shadow":"1px 1px 1px #00000085, 0px 1px 0px 2px #0705053b","--header-color":"#000080","--header-bg-color":"#ffffff","--ss-group-color":"var(--primary-color)","--ss-group-bg-color":"var(--activatable-bg-color-selected)","--ss-row-btn-color":"#eee","--ss-row-btn-bg-color":"#333","--ss-row-btn-warn-color":"red","--mobile-header-shadow":"0 4px 4px var(--primary-border-color)"}});var cn,Ui=m(()=>{"use strict";Hr();Ir();cn={light:ln,dark:Rr,lightGreen:{...ln,"--background-primary":"#d8ffe3","--color-primary":"#303030",backgroundPrimary:"",backgroundOnPrimary:"",backgroundSecondary:"#f5f5f7",backgroundOnSecondary:"#e5e5e7"}}});var pn=m(()=>{"use strict";$i();sn();Hr();Ir();Ui()});var hg,mg,Vi=m(()=>{"use strict";H();pn();an();f();hg=async e=>(await X().renderPageFunctions.fetchData(`/api/menu/get/${e}`)).json,mg=({menuId:e,items:t,className:n,textColor:r="var(--menubar-color)",backgroundColor:o="var(--menubar-bg-color)",hoverColor:i="var(--activatable-color-hover)",hoverBgColor:a="var(--activatable-bg-color-hover)",maxWidth:s="100%",maxWidthMobileMenu:p=W.TabletMax})=>{let c={width:"100%",maxWidth:s,margin:"auto",backgroundColor:o,position:"relative",".menu-bar-top":{display:"flex",width:"100%",justifyContent:"center"},".menu-bar-item":{display:"inline-block",color:r,padding:"14px 16px",textDecoration:"none",position:"relative"},".menu-bar-item:hover, .menu-bar-sub-box:hover > .menu-bar-item":{color:i,backgroundColor:a},".menu-bar-sub-box .menu-bar-sub":{display:"none",position:"absolute",backgroundColor:"var(--menubar-sub-bg-color)",minWidth:"165px",boxShadow:"0px 8px 16px 0px rgba(0,0,0,0.2)",zIndex:"var(--layer-menu-sub)",flexDirection:"column"},".menu-bar-sub-box > .menu-bar-item":{padding:"14px 26px 14px 16px",width:"100%"},".menu-bar-sub-box > .menu-bar-item::after":{content:'""',position:"absolute",top:"50%",transform:"translateY(-50%)",marginLeft:"6px",width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"5px solid "+r},".menu-bar-sub-box .menu-bar-sub > .menu-bar-item":{color:"black"},".menu-bar-sub-box:hover > .menu-bar-sub":{display:"flex"},".menu-bar-sub-box .menu-bar-sub .menu-bar-item:hover":{color:i,backgroundColor:a},".menu-bar-mobile":{display:"none",position:"relative",backgroundColor:o,padding:"5px 18px 6px",".menu-bar-toggle":{cursor:"pointer",padding:"14px 0 19px 0","span, span::before, span::after":{cursor:"pointer",height:"3px",width:"25px",borderRadius:"1px",background:"#ffffff",position:"absolute",display:"block",transition:"all 300ms ease-in-out"},"span::before, span::after":{content:'""'},"span::before":{top:"-10px"},"span::after":{bottom:"-10px"}},".menu-bar-toggle.active span":{backgroundColor:"transparent"},".menu-bar-toggle.active span::before":{transform:"rotate(45deg)",top:0},".menu-bar-toggle.active span::after":{transform:"rotate(-45deg)",top:0}},["@media only screen and (max-width: "+p+")"]:{".menu-bar-mobile":{display:"block"},".menu-bar-top":{display:"none"},".menu-bar-top.open":{display:"flex",flexDirection:"column"},".menu-bar-top.open .menu-bar-sub-box > .menu-bar-sub":{display:"flex",position:"unset",".menu-bar-item":{paddingLeft:"32px",color:r,backgroundColor:o},".menu-bar-item:hover":{color:i,backgroundColor:a}},".menu-bar-sub-box:hover > .menu-bar-item":{color:r,backgroundColor:o},".menu-bar-sub-box:hover > .menu-bar-item:hover":{color:i,backgroundColor:a}}},d=(h,b)=>l("div",{class:b,children:h.map(x=>x.items?l("div",{class:"menu-bar-sub-box",children:[l("div",{class:"menu-bar-item",children:x.text}),d(x.items,"menu-bar-sub")]}):l(bt,{className:"menu-bar-item",url:x.url,alt:x.alt,text:x.text}))}),u={onLoad:async()=>{if(e){let h=await hg(e);if(h.result&&h.result.items.length>0){let b=h.result.items.map(v=>{let E=v.split("	");return{text:E[5],url:E[4]}}),x=d(b,"menu-bar-top")}}}},g=()=>{u.$(".menu-bar-mobile .menu-bar-toggle").classList.toggle("active"),u.$(".menu-bar-top").classList.toggle("open")};return l("div",{ref:u,css:c,class:["menu-bar-box",n].join(" "),children:[l("div",{class:"menu-bar-mobile",children:l("div",{class:"menu-bar-toggle",onClick:g,children:l("span",{})})}),d(t,"menu-bar-top")]})}});var Gi=m(()=>{"use strict"});var fg,Yi=m(()=>{"use strict";H();xe();pn();f();fg=({mobileMenu:e,desktopMenu:t,menuId:n,items:r,className:o,color:i="white",backgroundColor:a="dark",maxWidth:s="100%",maxWidthMobileMenu:p=W.TabletMax,isDevAdmin:c=!1})=>{let d={".menu-sidebar-top":{width:"100%",backgroundColor:"var(--sidebar-bg-color)",maxWidth:s,margin:"auto",position:"relative",display:"flex",justifyContent:"center",flexDirection:"column"},".menu-sidebar-item":{display:"inline-block",color:i,cursor:"pointer",padding:"14px 16px",textDecoration:"none",position:"relative",borderBottom:"var(--sidebar-border)"},".menu-sidebar-item:hover":{color:"var(--activatable-color-hover)",backgroundColor:"var(--activatable-bg-color-hover)"},".menu-sidebar-sub-box .menu-sidebar-sub":{display:"none",minWidth:"165px",zIndex:"var(--layer-sidebar-sub)",flexDirection:"column"},".menu-sidebar-sub-box > .menu-sidebar-item":{padding:"14px 26px 14px 16px",width:"100%"},".menu-sidebar-sub-box > .menu-sidebar-sub > .menu-sidebar-item":{paddingLeft:"32px"},".menu-sidebar-sub-box > .menu-sidebar-item::after":{content:'""',position:"absolute",top:"50%",transform:"translateY(-50%) rotate(-90deg)",marginLeft:"6px",width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"5px solid "+i,right:"10px",transition:"all 300ms ease-in-out"},".menu-sidebar-sub-box.open > .menu-sidebar-item::after":{transform:"rotate(0deg)"},"&.mobile .menu-sidebar-sub-box > .menu-sidebar-item::after":{transform:"rotate(0deg)"},".menu-sidebar-sub-box.open > .menu-sidebar-sub":{display:"flex"},".menu-sidebar-sub-box .menu-sidebar-sub .menu-sidebar-item:hover":{color:"var(--activatable-color-hover)",backgroundColor:"var(--activatable-bg-color-hover)"},".menu-sidebar-mobile":{display:"none",position:"relative",padding:"5px 4px 6px",".menu-sidebar-toggle":{cursor:"pointer",padding:"6px 0 8px 0","span, span::before, span::after":{cursor:"pointer",height:"3px",width:"25px",borderRadius:"1px",background:"var(--primary-color)",position:"absolute",display:"block",transition:"all 300ms ease-in-out"},"span::before, span::after":{content:'""'},"span::before":{top:"-7px"},"span::after":{bottom:"-7px"}},".menu-sidebar-toggle.active span":{backgroundColor:"transparent"},".menu-sidebar-toggle.active span::before":{transform:"rotate(45deg)",top:0},".menu-sidebar-toggle.active span::after":{transform:"rotate(-45deg)",top:0}},"&.mobile":{display:"none"},"&.mobile .menu-sidebar-mobile":{display:"block",width:"33px"},["@media only screen and (max-width: "+p+")"]:{display:"none","&.mobile":{display:"block"},"&.mobile.open":{position:"absolute",width:"100%",height:"100%",top:0,left:0,display:"flex",flexDirection:"column",backgroundColor:"#ccccccc2",zIndex:"var(--layer-sidebar)"},".menu-sidebar-top":{display:"none"},".menu-sidebar-top.open":{display:"flex",flexDirection:"column",flex:1,overflowY:"auto",width:"200px",marginLeft:"unset",justifyContent:"start"},".menu-sidebar-top.open .menu-sidebar-sub-box > .menu-sidebar-sub":{display:"flex",position:"unset",".menu-sidebar-item":{paddingLeft:"32px",color:i,backgroundColor:a},".menu-sidebar-item:hover":{color:"var(--activatable-color-hover)",backgroundColor:"var(--activatable-bg-color-hover)"}},".menu-sidebar-sub-box:hover > .menu-sidebar-item":{backgroundColor:"unset"},".menu-sidebar-sub-box:hover > .menu-sidebar-item:hover":{color:"var(--activatable-color-hover)",backgroundColor:"var(--activatable-bg-color-hover)"}}},u=(E,k)=>l("div",{class:k,children:E.filter(y=>c||!y.devAdmin).map(y=>{if(y.hide===!0)return null;let T={};return y.items?l("div",{ref:T,class:"menu-sidebar-sub-box",onClick:()=>b(T),children:[l("div",{class:"menu-sidebar-item",children:y.text}),u(y.items,"menu-sidebar-sub")]}):y.js?l("a",{class:"menu-sidebar-item",href:"javascript:void(0)",alt:y.alt||y.text,onClick:F=>{$(F),h(F),y.js&&y.js()},children:y.text}):l("a",{class:"menu-sidebar-item",href:y.url,alt:y.alt||y.text,target:"_blank",children:y.text})})}),g={},h=E=>{E.stopPropagation(),g.$(".menu-sidebar-mobile .menu-sidebar-toggle").classList.toggle("active"),g.$(".menu-sidebar-top").classList.toggle("open"),g.current.classList.toggle("open")},b=E=>{E.current.classList.toggle("open")};P("menu-sidebar-box",d);let x=!t&&!e||t&&e?{["@media only screen and (max-width: "+p+")"]:{display:"block",".menu-sidebar-top":{display:"block"}}}:{},v=E=>{g.current.classList.contains("open")&&h(E)};return l("div",{css:x,ref:g,class:["menu-sidebar-box",o,e?"mobile":""].join(" "),onClick:v,children:[l("div",{class:"menu-sidebar-mobile",children:l("div",{class:"menu-sidebar-toggle",onClick:h,children:l("span",{})})}),u(r,"menu-sidebar-top")]})}});var Ji,Dr,Ki=m(()=>{"use strict";on();Ji=(r=>(r.YesNo="yesno",r.OkCancel="okcancel",r.Ok="ok",r))(Ji||{}),Dr=class{static async show({title:t,children:n,contentMaxHeight:r,contentMinWidth:o,buttonType:i="okcancel",noMoving:a=!1,noModal:s=!1,closeEvent:p,handleClicked:c,closeWhenClickOutside:d=!1}){let u=i==="okcancel"?["OK","Cancel"]:i==="yesno"?["Yes","No"]:["OK"];return ze.show({title:t,children:n,contentMaxHeight:r,contentMinWidth:o,buttons:u,noMoving:a,noModal:s,closeEvent:p,handleClicked:c,closeWhenClickOutside:d})}}});function bg(e){return!!(e.name&&e.content)}function xg(e){return!!(e.property&&e.content)}function vg(e){return!!(e.httpEquiv&&e.content)}var yg,Xi=m(()=>{"use strict";H();f();yg=e=>(bg(e)?me(`name:${e.name}`,`<meta name="${e.name}" content="${e.content}">`):xg(e)?me(`property:${e.property}`,`<meta property="${e.property}" content="${e.content}">`):vg(e)?me(`http-equiv:${e.httpEquiv}`,`<meta http-equiv="${e.httpEquiv}" content="${e.content}">`):e.key&&e.string?me(`${e.key}`,`${e.string}`):console.warn("Unknown meta data:",e),l(Z,{}))});var kg,Zi=m(()=>{"use strict";H();f();kg=({children:e})=>(me("name:description",`<meta name="description" content="${e}">`),l(Z,{}))});var zr,Qi=m(()=>{"use strict";on();zr=class{static async show({title:t,children:n,contentMaxHeight:r,contentMinWidth:o,buttons:i,noMoving:a=!0,noModal:s=!1,closeEvent:p,handleClicked:c,closeWhenClickOutside:d=!0,zIndex:u,contentOverflowY:g}){return ze.show({title:t,children:n,contentMaxHeight:r,contentMinWidth:o,buttons:i,noMoving:a,noModal:s,closeEvent:p,handleClicked:c,closeWhenClickOutside:d,zIndex:u,contentOverflowY:g})}}});var tn,wg,be,ea=m(()=>{"use strict";H();tn=(o=>(o.Success="var(--success-bg-color)",o.Info="var(--info-bg-color)",o.Warning="var(--warning-bg-color)",o.Error="var(--error-bg-color)",o))(tn||{}),wg=e=>{switch(e){case"Success":return"var(--success-bg-color)";case"Info":return"var(--info-bg-color)";case"Warning":return"var(--warning-bg-color)";case"Error":return"var(--error-bg-color)"}return"var(--info-bg-color)"},be=class{static init(){P("lj_notification",{position:"fixed",top:0,right:0,height:"auto",overflowY:"auto",maxHeight:"100%",width:"100%",maxWidth:"400px",padding:"0 10px",zIndex:"var(--layer-notice)",">div":{color:"var(--notice-color-with-bg)",padding:"10px 8px",margin:"16px 0",borderRadius:"6px",boxShadow:"var(--cover-box-shadow)",transition:"all 0.5s",transform:"scale(0.1)",opacity:0},".close-btn":{position:"absolute",top:"-2px",right:"3px",color:"var(--notice-color-with-bg)",fontWeight:"bold",fontSize:"22px",lineHeight:"20px",cursor:"pointer",transition:"0.3s"},".close-btn:hover":{color:"black"}});let n=document.querySelector(".lj_notification");n||(n=document.createElement("div"),n.className="lj_notification",document.body.appendChild(n),this.container=n)}static sendMessage(t,n="var(--info-bg-color)",r=!1,o=3e3){this.initialized||(this.initialized=!0,this.init()),this.container.scrollTop=0;let i=document.createElement("div");if(i.innerHTML=t,i.style.backgroundColor=n,this.container.insertBefore(i,this.container.firstChild),setTimeout(()=>{i.style.opacity="1",i.style.transform="scale(1)"},0),r){let a=document.createElement("span");a.innerHTML="&times;",a.className="close-btn",i.appendChild(a),a.onclick=()=>{this.container.removeChild(i)}}else setTimeout(()=>{i.style.opacity="0",i.style.transform="scale(0.1)",setTimeout(()=>{this.container.removeChild(i)},1e3)},o)}};be.initialized=!1});var Sg,ta=m(()=>{"use strict";H();f();Sg=({children:e})=>(er(e),l(Z,{}))});var Fr,na,ra,Tg,Cg,oa=m(()=>{"use strict";H();f();Fr=10,na=()=>Fr,ra=e=>{Fr=e},Tg=[10,20,50,100,200,500],Cg=({itemsCount:e,pageLimit:t=na(),pageIndex:n=0,baseLink:r,onClick:o,textPerpage:i="/Page",textOk:a="Go",textTo:s="To",textPage:p="Page",showControl:c})=>{P("paging-link-box",{display:"flex",justifyContent:"end",alignItems:"center",textAlign:"right",padding:"6px 16px 6px 0",fontSize:"14px",".paging-link-index a, .paging-link-index.current":{padding:"2px 6px",textDecoration:"none"},".paging-link-index.current":{fontWeight:"bold"},"span.paging-link-index a:hover, span.paging-link-go a:hover":{textDecoration:"underline"},".paging-link-ctl-box":{display:"flex",alignItems:"center"},".paging-link-ctl-box .paging-link-jump":{width:"50px",padding:"1px 3px",margin:"0 3px",textAlign:"right"},".paging-link-ctl-box .paging-link-limit":{width:"90px",padding:"1px 3px",margin:"0 3px"},".paging-link-ok":{margin:"0 3px"}}),n=n??(Number.parseInt(X().query.pg_i||"")||0),t=t||Fr;let u=Math.floor(e/t);e>0&&t>0&&(e%t!==0&&u++,n>u&&(n=u-1));let g=x=>{let v=Number(x.target.value||"0");v>0&&(ra(v),o&&o(n))},h=()=>{let x=Number(b.$(".paging-link-jump").value||"0");x<1&&(x=1),x>u&&(x=u),o&&o(x-1)},b={};return l("div",{ref:b,class:"paging-link-box",children:[n>0?l("span",{class:"paging-link-go",children:l("a",{href:o?"javascript:void(0)":r+"?pg_i="+(n-1),onClick:()=>o&&o(n-1),children:"<"})}):l("span",{class:"paging-link-go disabled",children:"<"}),Array.from({length:u},(x,v)=>v).map(x=>l(Z,{children:x<2||x>=u-2||x>n-3&&x<n+3?x==n?l("span",{class:"paging-link-index current",children:x+1}):l("span",{class:"paging-link-index",children:l("a",{href:o?"javascript:void(0)":r+"?pg_i="+x,onClick:()=>o&&o(x),children:x+1})}):(x==n-4||x==n+4)&&l("span",{class:"paging-link-skip",children:"..."})})),n<u-1?l("span",{class:"paging-link-go",children:l("a",{href:o?"javascript:void(0)":r+"?pg_i="+(n+1),onClick:()=>o&&o(n+1),children:">"})}):l("span",{class:"paging-link-go disabled",children:">"}),c&&l("div",{class:"paging-link-ctl-box",children:[s,l("input",{class:"input-base paging-link-jump input-s",type:"number",value:n+1})," / ",u," ",p,l("button",{class:"button-base button-s paging-link-ok",onClick:h,children:a}),l("select",{class:"input-base paging-link-limit input-s",onChange:g,children:[l("option",{value:"",children:" - "}),Tg.map(x=>l("option",{value:x,children:[x,i]}))]})]})]})}});var Pg,ia=m(()=>{"use strict";f();Pg=({children:e,className:t,css:n})=>{let r={display:"flex",flexDirection:"column",...n};return l("div",{css:r,class:["panel-box",t].join(" "),children:e})}});var Or,Eg,Mg,Q,Br=m(()=>{"use strict";xe();f();Or=e=>{let t={};return l("div",{onClick:()=>{t.openMenu&&t.openMenu()},css:{cursor:"pointer",display:"flex",flexDirection:"row",alignItems:"center",fontSize:"24px"},children:l(Q,{list:e.list,defaultValue:e.defaultValue,tips:e.tips,minWidth:e.minWidth,maxWidth:e.maxWidth,maxHeight:e.maxHeight,handleSelected:e.handleSelected,handleOpened:e.handleOpened,handleClosed:e.handleClosed,noUpdateLabel:e.noUpdateLabel,hook:t,noTriangleIcon:e.noTriangleIcon})})},Eg=e=>{let t={};return l("button",{class:"button-base",onClick:()=>{t.openMenu&&t.openMenu()},css:{">div":{float:"right",textAlign:"left"}},children:[e.label,":"," ",l(Q,{list:e.list,defaultValue:e.defaultValue,tips:e.tips,minWidth:e.minWidth,maxWidth:e.maxWidth,maxHeight:e.maxHeight,handleSelected:e.handleSelected,handleOpened:e.handleOpened,handleClosed:e.handleClosed,noUpdateLabel:e.noUpdateLabel,hook:t,noTriangleIcon:e.noTriangleIcon,align:e.align})]})},Mg=e=>{let t={};return l("div",{onClick:()=>{t.openMenu&&t.openMenu()},css:{cursor:"pointer",">div":{float:"right",textAlign:"left"}},children:[e.label,":"," ",l(Q,{list:e.list,defaultValue:e.defaultValue,tips:e.tips,minWidth:e.minWidth,maxWidth:e.maxWidth,maxHeight:e.maxHeight,handleSelected:e.handleSelected,handleOpened:e.handleOpened,handleClosed:e.handleClosed,noUpdateLabel:e.noUpdateLabel,hook:t,noTriangleIcon:e.noTriangleIcon,align:e.align})]})},Q=({list:e,defaultValue:t,icon:n,tips:r="",width:o,minWidth:i,maxWidth:a,maxHeight:s,handleSelected:p,handleOpened:c,handleClosed:d,noUpdateLabel:u,hook:g,align:h="right",noTriangleIcon:b})=>{let x={".popup-menu-item":{padding:"0 0 1px 0",display:"inline-block",position:"relative",".triangle-icon":{display:"inline-block",cursor:"pointer",whiteSpace:"nowrap",marginRight:"15px"},".triangle-icon::after":{content:'""',position:"absolute",top:"50%",transform:"translateY(-50%)",marginLeft:"3px",width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"5px solid var(--primary-color)"}},".popup-menu-item:hover":{padding:"1px 0 0 0"},".popup-menu-bottom":{position:"relative",height:"1px",".popup-menu-list":{display:"none",position:"absolute",fontSize:"var(--menu-font-size)",top:0,width:o||"100px",color:"var(--activatable-color-normal)",backgroundColor:"var(--activatable-bg-color-normal)",zIndex:"var(--layer-menu)",borderRadius:"4px",border:"1px solid #ddd",padding:"5px 0px",overflow:"auto","line-height":"1.2em","min-width":i||"auto","max-width":a||"200px","max-height":s||"300px","box-shadow":"var(--cover-box-shadow)",".menu-focus":{position:"absolute",height:"0px"},".item":{padding:"2px 12px"},".item:hover":{padding:"2px 11px 2px 13px",color:"var(--activatable-color-hover)",backgroundColor:"var(--activatable-bg-color-hover)",cursor:"pointer"},".item.indent1":{paddingLeft:"19px"},".item.indent1:hover":{paddingLeft:"18px"},".item.indent2":{paddingLeft:"35px"},".item.indent2:hover":{paddingLeft:"34px"}},".popup-menu-list.left-align":{left:"2px"},".popup-menu-list.right-align":{right:"2px"},".popup-menu-list.open":{display:"inline-block"}}},v={id:""},E=!1,k=t,y=C=>{$(C),c&&c(),E=!E;let D=v.$(".popup-menu-list");h==="left"?D.classList.add("left-align"):D.classList.add("right-align"),D.classList.toggle("open",E),v.$(".popup-menu-list .menu-focus").focus()};g&&(g.openMenu=y,g.getValue=()=>k,g.setLabel=C=>{!n&&u!==!0&&(v.$(".popup-menu-item .popup-menu-text").innerText=C)});let T=(C,D)=>{$(C),E=!1,v.$(".popup-menu-list").classList.remove("open"),C.target&&(k=C.target.innerText,!n&&u!==!0&&(v.$(".popup-menu-item .popup-menu-text").innerText=C.target.innerText),p&&p(C.target.innerText,D)),d&&d()},F=C=>{setTimeout(()=>{v.$(".popup-menu-list").classList.remove("open"),E&&d&&d(),E=!1},300)};return l("div",{ref:v,css:x,onClick:y,title:r,children:[l("div",{class:"popup-menu-item",children:n||l("span",{class:"popup-menu-text"+(b!==!0?" triangle-icon":""),children:t||"&nbsp;"})}),l("div",{class:"popup-menu-bottom",children:l("div",{class:"popup-menu-list",children:[l("div",{children:e.map(C=>{if(C==="")return l("hr",{});let D=typeof C=="string"?C:C.text,Ge=typeof C=="string"?0:C.indent;return l("div",{class:"item"+(Ge?" indent"+Ge:""),onClick:Ye=>T(Ye,C),children:D})})}),l("div",{class:"menu-focus",onBlur:F,tabIndex:0})]})})]})}});var Lg,aa=m(()=>{"use strict";Ar();f();Lg=e=>{let t={position:"fixed",display:"flex",bottom:"0",left:"0",width:"100%",zIndex:"var(--layer-modal-over)",flexDirection:"column",backgroundColor:"#e6e6e6de",padding:"16px",".progress-box":{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",height:"auto",margin:"auto"},".progress-bar":{display:"flex",width:"100%",height:"60px",borderRadius:"4px",overflow:"hidden"},".progress-bar1":{height:"100%",width:"0%",backgroundColor:"#49e57e"},".progress-bar2":{height:"100%",width:"100%",backgroundColor:"#2bb8cd"},".progress-tips":{marginTop:"10px",fontSize:"30px",color:"#49e57e"}};e.hook.onProgress=(i,a,s)=>{i=Math.round(i*100);let p=document.querySelector(".progress-bar1"),c=document.querySelector(".progress-bar2");p.style.width=`${i}%`,c.style.width=`${1-i}%`,o.value=`${i}%`},e.hook.onShow=(i,a)=>{var s,p;a&&(r.value=a),i?(s=n.current)==null||s.classList.remove("d-none"):(p=n.current)==null||p.classList.add("d-none")};let n={},r=new A("Progress"),o=new A("0 %");return l("div",{ref:n,css:t,class:"progress-top d-none",children:l("div",{class:"progress-box",children:[l("div",{class:"progress-title mb-m align-left w-100p",children:r.node}),l("div",{class:"progress-bar",children:[l("div",{class:"progress-bar1"}),l("div",{class:"progress-bar2"})]}),l("div",{class:"progress-tips",children:o.node})]})})}});var Ag,sa=m(()=>{"use strict";R();f();Ag=e=>(P("radio-label-component",{display:"flex","& > label":{display:"flex",alignItems:"center"}}),l("div",{class:"radio-label-component"+(e.className?" "+e.className:""),children:l("label",{children:[l("input",{type:"radio",name:e.name,class:"input-base input-s"+(e.radioClassname?" "+e.radioClassname:""),checked:e.checked,disabled:e.disabled,onChange:n=>{var r;return(r=e.onChange)==null?void 0:r.call(e,n.target.checked)}}),l("span",{class:"ml-ss",children:e.label})]})}))});var Rg,la=m(()=>{"use strict";f();Rg=({title:e="redirect...",url:t,delaySeconds:n=0})=>l("div",{ref:{onLoad:async o=>{setTimeout(()=>{window.location.href=t},n*1e3)}},children:e})});var N,Nr,ca=m(()=>{"use strict";H();xe();f();N=class N{static init(){P("resizable-splitter",{".resizable-splitter-v-left, .resizable-splitter-v-right":{position:"absolute",top:0,bottom:0,left:0,width:"2px",cursor:"col-resize"},".resizable-splitter-v-right":{left:"unset",right:0},".resizable-splitter-v-left:hover, .resizable-splitter-v-right:hover":{width:"4px",backgroundColor:"#ccc"},".resizable-splitter-h-top, .resizable-splitter-h-bottom":{position:"absolute",top:0,left:0,right:0,height:"2px",cursor:"row-resize"},".resizable-splitter-h-bottom":{top:"unset",bottom:0},".resizable-splitter-h-top:hover, .resizable-splitter-h-bottom:hover":{height:"4px",backgroundColor:"#ccc"}}),window.addEventListener("mousemove",N.onMousemove.bind(N),!1),document.documentElement.addEventListener("mouseup",N.onMouseup.bind(N),!1)}static getSplitterClassName(t,n){return"resizable-splitter-"+(t?n?"v-right":"v-left":n?"h-top":"h-bottom")}static onMousedown(t){if(t.buttons!==1||t.button!==0)return;this.pressed=!0,this.startXorY=this.isVertical?t.clientX:t.clientY;let n=document.defaultView.getComputedStyle(this.hostNode)[this.isVertical?"width":"height"];this.startWidthOrHeight=parseInt(n,10)}static onMousemove(t){if(!(!this.pressed||t.buttons!==1||t.button!==0))if($(t),this.isVertical){let n=this.startWidthOrHeight+(t.clientX-this.startXorY)*(this.isRightOrTop?1:-1);this.hostNode.style.width=n+"px"}else{let n=this.startWidthOrHeight+(t.clientY-this.startXorY)*(this.isRightOrTop?-1:1);this.hostNode.style.height=n+"px"}}static onMouseup(){this.pressed&&(this.pressed=!1)}static getSplitter(t,n,r){let o=this.getSplitterClassName(n,r);return l("div",{onMouseDown:a=>{if(this.initialized||(this.initialized=!0,this.init()),N.hostNode=document.querySelector(t),!N.hostNode){console.error(`Can't find element: ${t}`);return}N.isVertical=n,N.isRightOrTop=r,N.onMousedown.bind(N)(a)},class:o})}};N.isVertical=!0,N.isRightOrTop=!0,N.initialized=!1,N.startXorY=0,N.startWidthOrHeight=0,N.pressed=!1;Nr=N});var Hg,pa=m(()=>{"use strict";f();Hg=e=>{let t={width:e.size||"80px",height:e.size||"80px","&circle":{width:"100%",height:"100%",borderRadius:"50%",border:"2px solid #aaa",position:"relative",backgroundColor:"var(--primary-bg-color)",cursor:"pointer"},"&needle":{width:"2px",height:"50%",backgroundColor:"red",position:"absolute",top:"0",left:"50%",transformOrigin:"bottom center",transform:"rotate(90deg)"},"&tips":{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",fontSize:"12px",color:"var(--primary-color)",fontWeight:"600",zIndex:"10"},"&a0, &a90, &a180, &a270":{width:"6px",height:"6px",borderRadius:"50%",backgroundColor:"#333",position:"absolute",top:"0",left:"50%",transform:"translate(-50%, -50%)",fontSize:"12px",color:"#333"},"&a90":{top:"50%",left:"100%"},"&a180":{top:"100%",left:"50%"},"&a270":{top:"50%",left:"0"}},n=0,r=0,o=!1;e.hook&&(e.hook.setAngle=u=>{a(u)});let i=u=>{let g=u.clientX-n,h=u.clientY-r,b=Math.atan2(h,g)*(180/Math.PI);b=(b+450)%360,a(b)},a=u=>{let g=d.$("&needle"),h=d.$("&tips");g.style.transform=`rotate(${u}deg)`,h.textContent=`${u.toFixed(0)}\xB0`,e.onChange(u)},s=u=>{let h=d.$("&circle").getBoundingClientRect();n=h.left+h.width/2,r=h.top+h.height/2,i(u),o=!0},p=u=>{o&&i(u)},c=()=>{o=!1},d={};return l("div",{ref:d,css:t,children:l("div",{class:"&circle",onPointerDown:s,onPointerMove:p,onPointerUp:c,children:[l("div",{class:"&needle"}),l("div",{class:"&tips",children:"90\xB0"}),l("div",{class:"&a0",onClick:()=>a(0)}),l("div",{class:"&a90",onClick:()=>a(90)}),l("div",{class:"&a180",onClick:()=>a(180)}),l("div",{class:"&a270",onClick:()=>a(270)})]})})}});var Ig,da=m(()=>{"use strict";f();Ig=(e,t,n,r,o="input-base",i="100%")=>l("div",{css:{select:{height:"auto",overflowY:"auto",width:i}},children:[l("div",{children:e}),l("div",{children:l("select",{class:o,onChange:s=>{var p;return n((p=s==null?void 0:s.target)==null?void 0:p.value)},size:r,children:t.map(s=>l("option",{value:s.value,selected:s.selected,children:s.option}))})})]})});var Dg,ua=m(()=>{"use strict";R();f();Dg=e=>{P("slide-tab-c-box",{display:"flex",flexDirection:"column",flex:1,fontSize:"12px",borderRadius:"6px",padding:"0px 8px 4px 8px",height:"100%",".slide-tab-c-list":{flex:1,borderRadius:"6px",display:"flex",overflowX:"auto",width:"100%",scrollSnapType:"x mandatory",gap:"8px",paddingBottom:"10px",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"},".slide-tab-c-slide":{width:"100%",overflow:"hidden",position:"relative",minWidth:"100%",flexShrink:0,scrollSnapAlign:"start",height:"100%",overflowY:"auto"},".slide-tab-c-nav":{display:"flex",flexDirection:"row",justifyContent:"center",backgroundColor:"var(--primary-bg-color)",position:"sticky",top:0,zIndex:1},".slide-tab-c-nav-wrap":{display:"flex",flexDirection:"row",justifyContent:"center",padding:"2px 4px",borderRadius:"4px",backgroundColor:"var(--secondary-bg-color)"},".slide-tab-c-nav-item":{cursor:"pointer",padding:"4px 8px",borderRadius:"4px",marginRight:"8px"},".slide-tab-c-nav-item.active":{backgroundColor:"var(--primary-accent-color)",color:"white"}});let n={},r=0,o=!1,i=null,a=()=>{o||(i&&clearTimeout(i),i=setTimeout(()=>{p()},100))},s=d=>{let u=n.$all(".slide-tab-c-nav-item");for(let g=0;g<u.length;g++)u[g].classList.toggle("active",g===d)},p=()=>{let d=n.$(".slide-tab-c-list"),u=d.clientWidth;r=Math.round(d.scrollLeft/u),s(r)},c=d=>{let u=n.$(".slide-tab-c-list"),g=n.$all(".slide-tab-c-slide");if(!u||!g||g.length===0)return;let h=g[d];if(!h)return;let b=h.offsetLeft;o=!0,u.scrollTo({left:b,behavior:"smooth"}),s(d),setTimeout(()=>{o=!1},300)};return l("section",{class:"slide-tab-c-box",ref:n,children:[l("div",{class:"slide-tab-c-nav",children:l("div",{class:"slide-tab-c-nav-wrap",children:e.pages.map((d,u)=>l("div",{class:`slide-tab-c-nav-item ${u===0?"active":""}`,onClick:g=>{g.preventDefault(),c(u)},children:d.title}))})}),l("div",{class:"slide-tab-c-list no-scrollbar-container",onScroll:a,children:e.pages.map(d=>l("div",{class:"slide-tab-c-slide no-scrollbar-container",children:d.content}))})]})}});var zg,ga=m(()=>{"use strict";R();f();zg=e=>{P("stars-box",{display:"flex",flexDirection:"row",".stars-label":{color:"#9d9d9d",cursor:"pointer",display:"flex",alignItems:"center"},".stars-label.active":{color:"blue"},".stars-label .full, .stars-label.active .outline":{display:"none"},".stars-label.active .full, .stars-label .outline":{display:"inline"}});let n=o=>{e.value=o,r.$all(".stars-label").forEach((a,s)=>{a.classList.toggle("active",s<o)})};e.hook&&(e.hook.setValue=o=>{n(o)},e.hook.getValue=()=>e.value);let r={};return l("div",{style:{fontSize:e.fontSize||"20px"},ref:r,class:"stars-box",children:Array.from({length:e.maxLength}).map((o,i)=>l("label",{class:"stars-label"+(i<e.value?" active":""),onClick:()=>{var a;n(i+1),(a=e.onChange)==null||a.call(e,i+1)},children:[l("i",{class:"ifc-icon ma-cards-heart full"}),l("i",{class:"ifc-icon ma-cards-heart-outline outline"})]}))})}});var ve,ha=m(()=>{"use strict";f();ve=({children:e,width:t,height:n,color:r})=>{let o=e||"";return o.startsWith("data:image/svg+xml,")?o=decodeURIComponent(o.slice(19)):o.includes("%")&&o.includes("<svg")&&(o=decodeURIComponent(o)),l("div",{css:{svg:{maxWidth:"100%",maxHeight:"100%",width:t,height:n,fill:r}},dangerouslySetInnerHTML:o})}});var Fg,ma=m(()=>{"use strict";R();f();Fg=e=>{P("switch-option-box",{display:"flex",flexDirection:"row",borderRadius:"9999px",padding:"2px 4px",fontSize:"0.7rem",backgroundColor:"#e7e7e7",width:"fit-content",".switch-btn":{padding:"4px",borderRadius:"50%",border:"none",background:"transparent",color:"inherit",cursor:"pointer",transition:"all 0.2s"},".switch-btn:first-child":{marginRight:"4px"},".switch-btn.active":{backgroundColor:"#fff",color:"#000000",boxShadow:"2px 1px 2px 1px rgb(189 189 189)"}});let n=o=>{var a;e.defaultOption=o;let i=r.$all(".switch-btn");i[0].classList.toggle("active",o===e.option1),i[1].classList.toggle("active",o===e.option2),(a=e.onChange)==null||a.call(e,o)};e.hook&&(e.hook.setValue=o=>{n(o)},e.hook.getValue=()=>e.defaultOption);let r={};return l("div",{style:{fontSize:e.fontSize},ref:r,class:"switch-option-box",children:[l("button",{onClick:()=>n(e.option1),className:`switch-btn ${e.defaultOption===e.option1?"active":""}`,children:e.option1}),l("button",{onClick:()=>n(e.option2),className:`switch-btn ${e.defaultOption===e.option2?"active":""}`,children:e.option2})]})}});var Og,fa=m(()=>{"use strict";H();xe();f();Og=({pages:e,defaultIndex:t,topClassName:n,pagePadding:r,hook:o})=>{let i=typeof t=="number"?t:0,a=()=>{let k=v.$(".&tabs > div > .tab.active");k&&k.classList.remove("active");let y=v.$(".&pages > .page.active");y&&y.classList.remove("active")},s=k=>{a();let y=v.$all(".&tabs > div > .tab");k>=0&&k<y.length&&(y[k].classList.add("active"),v.$all(".&pages > .page")[k].classList.add("active"),o!=null&&o.indexChanged&&(o==null||o.indexChanged(k)))},p=k=>{let y=v.$all(".&tabs > div > .tab");if(k>=0&&k<y.length){let T=k===y.length-1?k-1:k,F=y[k].classList.contains("active");y[k].parentNode.remove(),v.$all(".&pages > .page")[k].remove(),F&&s(T)}},c=k=>{$(k);let y=k.target.parentNode,T=Array.prototype.indexOf.call(y.parentNode.parentNode.children,y.parentNode);p(T)},d=async(k,y,T)=>{let F=v.$all(".&tabs > div > .tab"),C=F.length;typeof T=="number"&&T>=0&&T<F.length&&(C=T),a();let D=u(k," active"),Ge=document.createElement("div"),Ye=document.createElement("div");if(Ye.className="page",C===F.length)v.$(".&tabs").appendChild(Ge),v.$(".&pages").appendChild(Ye);else{v.$(".&tabs").insertBefore(Ge,F[C]);let hu=v.$all(".&pages > .page");v.$(".&pages").insertBefore(Ye,hu[C])}await _(Ge,D),await _(Ye,y),s(C)},u=(k,y)=>l("div",{onClick:g,class:"tab"+y,children:[k,l("span",{class:"modal-close",onClick:c,children:"\xD7"})]}),g=k=>{$(k);let y=k.target,T=Array.prototype.indexOf.call(y.parentNode.parentNode.children,y.parentNode);s(T)},h=k=>{let y=v.$all(".&tabs > div > .tab");k>=0&&k<y.length&&(y[k].classList.add("flash"),setTimeout(()=>{y[k].classList.remove("flash")},1e3))};o&&(o.updateTitle=(k,y)=>{let T=v.$all(".&tabs > div > .tab");k>=0&&k<T.length&&(T[k].innerHTML=y)},o.updateIndex=s,o.removePage=p,o.newPage=d,o.getIndex=()=>{let k=v.$(".&tabs > div > .tab.active");return k?Array.prototype.indexOf.call(k.parentNode.parentNode.children,k.parentNode):-1},o.getCount=()=>v.$all(".&tabs > div > .tab").length,o.findAndActivate=k=>{let y=v.$all(".&tabs > div > .tab");for(let T=0;T<y.length;T++)if(y[T].innerText===k)return s(T),h(T),!0;return!1});let b={display:"flex","flex-direction":"column",width:"100%",height:"100%","&:not(:has(.pages .page))":{display:"none"},"> .&tabs":{display:"flex",height:"auto","border-bottom":"1px solid grey","overflow-x":"auto","overflow-y":"hidden","scrollbar-width":"thin","scrollbar-color":"#ababab4d #d5d5d552","> div > .tab":{padding:"2px 3px",width:"auto","font-size":"smaller","text-overflow":"ellipsis",overflow:"hidden","white-space":"nowrap",margin:"1px 1px 0 1px",cursor:"pointer",position:"relative","border-top-right-radius":"4px","border-top-left-radius":"4px","border-top":"solid 1px var(--primary-border-color)","border-left":"solid 1px var(--primary-border-color)","border-right":"solid 1px var(--primary-border-color)",color:"var(--activatable-color-normal)",backgroundColor:"var(--activatable-bg-color-normal)"},"> div > .tab:hover":{padding:"3px 3px 1px 3px"},"> div > .tab.flash":{backgroundColor:"red"},"> div > .active":{color:"var(--activatable-color-selected)",backgroundColor:"var(--activatable-bg-color-selected)",marginBottom:"-1px",borderBottom:"1px solid #FFFFFF00"},"> div > .tab > .modal-close":{display:"none",float:"right",fontSize:"12px",fontWeight:"bold",cursor:"pointer",position:"absolute",top:"-4px",right:"1px"},"> div > .tab:hover > .modal-close":{display:"inline-block",color:"#ff0000"}},"> .&pages":{display:"flex",flex:"1",position:"relative","> .page":{display:"none",position:"absolute",padding:r||"0px",overflow:"auto",width:"100%",maxWidth:"100%",height:"100%",overflowX:"auto",overflowY:"auto"},"> .active":{display:"inline-block"}}},x=$n(b);P(x,b);let v={globalCssId:x};return l("div",{ref:v,css:{"&tabs":{display:"flex"},"&pages":{display:"flex"}},class:n?" "+n:"",children:[l("div",{class:"&tabs tabs",children:e.map((k,y)=>{let T=y===i?" active":"";return l("div",{children:u(k.title,T)})})}),l("div",{class:"&pages pages",children:e.map((k,y)=>l("div",{class:"page"+(y===i?" active":""),children:k.page}))})]})}});var Bg,ba=m(()=>{"use strict";H();f();Bg=e=>{let t={width:"100%",height:"100%",textAlign:"center",color:e.color||"#22b8ff",padding:e.padding||"10px",fontSize:e.fontSize||"30px",fontWeight:e.fontWeight||"500",".text-glow":{animation:"text-glow-a 1.5s infinite alternate"},"@keyframes text-glow-a":{"0%":{textShadow:"0 0 5px #ff005e, 0 0 10px #ff005e, 0 0 20px #ff005e, 0 0 40px #ff005e, 0 0 80px #ff005e"},"100%":{textShadow:"0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 80px #00d4ff, 0 0 160px #00d4ff"}}};return P("text-glow-top",t),l("div",{class:"text-glow-top",children:l("div",{class:"text-glow",children:e.text})})}});var Ng,xa=m(()=>{"use strict";H();f();Ng=e=>{let t={width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",color:e.color||"#22b8ff",fontSize:e.fontSize||"30px",fontWeight:e.fontWeight||"500",".text-scale":{animation:"text-scale 1.5s infinite alternate",backgroundColor:e.backgroundColor||"#a1ffe8",padding:e.padding||"10px",borderRadius:"5px"},"@keyframes text-scale":{"0%, 100%":{transform:"scale(1)"},"40%":{transform:"scale(0.7)"}}};return P("text-scale-top",t),l("div",{class:"text-scale-top",children:l("div",{class:"text-scale",children:e.text})})}});var Wg,va=m(()=>{"use strict";H();f();Wg=e=>{let t={};e.text.split("").forEach((r,o)=>{t[`.span${o}`]={animationDelay:`${o*.1}s`}});let n={width:"100%",height:"100%",textAlign:"center",color:e.color||"#22b8ff",padding:e.padding||"10px",fontSize:e.fontSize||"20px",fontWeight:e.fontWeight,textShadow:"1px -1px #ffffff, -2px 2px #999, -6px 7px 3px #131f5be6",".text-wave.wave-animetion span":{display:"inline-block",padding:"0 4px",animation:"wave-text 1s ease-in-out infinite"},".text-wave.wave-animetion":{marginTop:"0.6em",...t},"@keyframes wave-text":{"0%":{transform:"translateY(0em)"},"60%":{transform:"translateY(-0.6em)"},"100%":{transform:"translateY(0em)"}}};return P("text-wave-top",n),l("div",{class:"text-wave-top",children:l("div",{class:"text-wave wave-animetion",children:e.text.split("").map((r,o)=>l("span",{class:`span${o}`,children:r}))})})}});var Wr,ya=m(()=>{"use strict";H();Br();f();Wr=({className:e,icon:t,noUpdateLabel:n})=>{let r={display:"flex",flexDirection:"column",alignSelf:"end"},o=s=>{mt(s)},i=oe(),a=[];for(let s in i.themes)a.push(s);return l("div",{css:r,class:["theme-switch",e].join(" "),title:"Select theme",children:l(Q,{list:a,defaultValue:i.themeName,handleSelected:o,icon:t,noUpdateLabel:n})})}});var jg,qg,_g,ka,$g,Ze,jr=m(()=>{"use strict";H();f();jg={Small:{w:50,h:50},Medium:{w:70,h:70},Large:{w:90,h:90}},qg=e=>{P("toggle-play-button-component",{width:"100%",height:"100%",borderRadius:"50%",backgroundColor:"#3b29cc",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s",cursor:"pointer","&:hover":{opacity:.8},".play-icon":{width:"50%",height:"50%",transition:"all 0.2s ease-in-out",backgroundColor:"#fff"},"&.toggle-off .play-icon":{clipPath:"polygon(20% 0, 20% 100%, 90% 50%, 90% 50%, 90% 50%, 90% 50%, 90% 50%, 90% 50%, 90% 50%)",translate:"6% 0"},"&.toggle-on .play-icon":{clipPath:"polygon(0 0, 0 100%, 33.33% 100%, 33.33% 0, 66.66% 0, 100% 0, 100% 100%, 66.66% 100%, 66.66% 0)",translate:"0 0"},"&.disabled":{cursor:"not-allowed",backgroundColor:"#5d578b"}});let n=()=>l("div",{class:`toggle-play-button-component toggle-placeholder ${e.checked?"toggle-on":"toggle-off"}${e.disabled?" disabled":""}`,style:{backgroundColor:e.backgroundColor},children:l("div",{class:"play-icon",style:{backgroundColor:e.textColor}})});return e.noWave?l(Ze,{...e,children:l(n,{})}):l(Ze,{...e,children:l(ka,{children:l(n,{})})})},_g=e=>l(Ze,{...e,size:{w:"auto",h:"auto"},children:l("div",{css:{"&.disabled":{cursor:"not-allowed"},"&.toggle-on .on, &.toggle-off .off":{display:"block"},"&.toggle-on .off, &.toggle-off .on":{display:"none"}},class:`toggle-button-component toggle-placeholder ${e.checked?"toggle-on":"toggle-off"}${e.disabled?" disabled":""}`,children:[l("div",{class:"on",children:e.onText}),l("div",{class:"off",children:e.offText})]})}),ka=e=>(P("toggle-waves-box",{width:"100%",height:"100%","@keyframes pulse-border":{"0%":{transform:"scale(0.6)",opacity:1},"100%":{transform:"scale(1)",opacity:0}},".toggle-waves":{position:"absolute",width:"100%",height:"100%",top:"0",left:"0",borderRadius:"50%",backgroundColor:"#eb205580",opacity:0,animation:"pulse-border 3s ease-in-out infinite"},".toggle-waves-1":{"-webkit-animation-delay":"0s","animation-delay":"0s"},".toggle-waves-2":{"-webkit-animation-delay":"1s","animation-delay":"1s"},".toggle-waves-3":{"-webkit-animation-delay":"2s","animation-delay":"2s"},".toggle-waves-box":{position:"absolute",width:"100%",height:"100%",top:"0",left:"0",padding:"18%"},"&.disabled .toggle-waves":{backgroundColor:"#5d578b"}}),l("div",{class:"toggle-waves-box toggle-placeholder",children:[l("div",{class:"toggle-waves toggle-waves-1"}),l("div",{class:"toggle-waves toggle-waves-2"}),l("div",{class:"toggle-waves toggle-waves-3"}),l("div",{class:"toggle-waves-box",children:e.children})]})),$g={Small:{w:30,h:30},Medium:{w:50,h:50},Large:{w:70,h:70}},Ze=e=>{let t=(a,s)=>{r.$all(".toggle-base-container .toggle-placeholder").forEach(c=>{c.classList.toggle("toggle-on",a),c.classList.toggle("toggle-off",!a),c.classList.toggle("disabled",s)})},n=e.disabled||!1,r={onLoad:async a=>{t(e.checked||!1,n)}},o=a=>{if(n)return;let s=a.target.checked;t(s,n),e.onClick&&e.onClick(s)};return e.hook&&(e.hook.setChecked=a=>{r.$("input.toggle-base-checkbox").checked=a,t(a,n)},e.hook.getChecked=()=>r.$("input.toggle-base-checkbox").checked,e.hook.setEnabled=a=>{n=!a;let s=r.$("input.toggle-base-checkbox");s.disabled=n,t(s.checked,n)},e.hook.getEnabled=()=>!n),P("toggle-base-component",{".toggle-base-box, .toggle-base-container":{position:"relative",width:"100%",height:"100%"},".toggle-base-checkbox":{opacity:0,position:"absolute",pointerEvents:"none"}}),l("div",{ref:r,css:{width:`${typeof e.size.w=="number"?e.size.w+"px":e.size.w}`,height:`${typeof e.size.h=="number"?e.size.h+"px":e.size.h}`},class:"toggle-base-component",children:l("label",{class:"toggle-base-box",children:[l("div",{class:"toggle-base-container",children:e.children}),l("input",{type:"checkbox",class:"toggle-base-checkbox",checked:e.checked||!1,disabled:n,onClick:o})]})})}});var wa,Ug,Sa=m(()=>{"use strict";H();jr();f();wa=(o=>(o.SmallSmall="smallsmall",o.Small="small",o.Medium="medium",o.Large="large",o))(wa||{}),Ug=e=>{var a,s;let t=e.size==="smallsmall"?16:e.size==="small"?22:e.size==="large"?42:34,n=e.size==="smallsmall"?"smallsmall":e.size==="small"?"small":e.size==="large"?"large":"",r={width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center","& .ts-slider":{position:"relative",cursor:"pointer",backgroundColor:"var(--toggle-background-color, #c7c7c7)",transition:".4s",borderRadius:"34px",height:"100%",display:"flex",padding:"0 27px 0 37px",alignItems:"center"},"&.smallsmall .ts-slider":{padding:"0 8px 0 22px",fontSize:"0.65rem"},"&.small .ts-slider":{padding:"0 17px 0 27px",fontSize:"0.85rem"},"&.large .ts-slider":{padding:"0 37px 0 57px"},"& .ts-slider .ts-circle":{position:"absolute",content:"",height:"26px",width:"26px",left:"4px",bottom:"4px",backgroundColor:"var(--toggle-ball-color, #fff)",transition:".4s",borderRadius:"50%"},"&.smallsmall .ts-slider .ts-circle":{height:"12px",width:"12px",left:"2px",bottom:"2px"},"&.small .ts-slider .ts-circle":{height:"18px",width:"18px",left:"3px",bottom:"2px"},"&.large .ts-slider .ts-circle":{height:"38px",width:"38px",left:"4px",bottom:"2px"},"&.toggle-on .ts-on-text":{display:"block"},"&.toggle-off .ts-off-text":{display:"block"},"&.toggle-on .ts-slider":{backgroundColor:"var(--primary-accent-color, #0a74c9)",padding:"0 47px 0 17px"},"&.smallsmall.toggle-on .ts-slider":{padding:"0 18px 0 12px"},"&.small.toggle-on .ts-slider":{padding:"0 27px 0 17px"},"&.large.toggle-on .ts-slider":{padding:"0 72px 0 22px"},"&.toggle-on .ts-slider .ts-circle":{left:"unset",right:"3px"},"&.disabled .ts-slider":{cursor:"not-allowed",opacity:"var(--primary-disabled-opacity)"}};P("toggle-switch-theme",{'[data-theme="dark" i]':{"--toggle-ball-color":"#000000","--toggle-background-color":"#262626"}},!1,!0),P("toggle-switch-component",r);let i={"& .ts-on-text, & .ts-off-text":{display:"none",width:e.textWidth}};return l(Ze,{...e,size:{w:"auto",h:t},children:l("div",{css:i,class:`toggle-switch-component toggle-placeholder ${e.checked?"toggle-on":"toggle-off"}${e.disabled?" disabled":""} ${n}`,children:l("span",{class:"ts-slider",children:[l("span",{class:"ts-on-text",children:(a=e.text)==null?void 0:a.on}),l("span",{class:"ts-circle"}),l("span",{class:"ts-off-text",children:(s=e.text)==null?void 0:s.off})]})})})}});var Ta=m(()=>{"use strict"});var qr,_r=m(()=>{"use strict";R();f();qr=e=>{let t={".footer-menu":{display:"none",width:"100%",background:"var(--sidebar-bg-color)",paddingBottom:"env(safe-area-inset-bottom)",minHeight:"50px",justifyContent:"space-around",alignItems:"center",borderTop:"var(--primary-border)"},".footer-menu, .footer-menu a":{textDecoration:"none",color:e.color||"var(--primary-color)"},".footer-menu .footer-menu-item":{padding:"4px 16px 4px 16px",fontSize:"11px",height:"55px",width:"55px",display:"flex",flexWrap:"wrap",alignItems:"center"},".footer-menu .footer-menu-item i":{display:"block",fontSize:"22px",marginBottom:"4px"},".footer-menu .footer-menu-item.footer-menu-topout":{marginTop:"-43px",borderRadius:"50%",backgroundColor:e.topoutBackgroundColor||"#f33939",color:e.topoutColor||"var(--primary-color)"},".footer-menu .footer-menu-item-a":{zIndex:"var(--layer-header-footer)"},".footer-menu .footer-menu-item.active":{color:e.activeColor||"var(--primary-accent-color)"},[V.TabletBelow]:{".footer-menu":{display:"flex"}}},n=(o,i)=>{let a=document.querySelector(".footer-menu-item.active");a==null||a.classList.remove("active");let s=document.querySelector(`a:nth-child(${o+1}) .footer-menu-item`);s==null||s.classList.add("active")},r=typeof window<"u"?window.location.pathname:"";return l("div",{css:t,class:"footer-menu-box",children:l("div",{class:"footer-menu",children:e.items.map((o,i)=>l("a",{class:"footer-menu-item-a",href:o.href,children:l("div",{class:`footer-menu-item ${o.topout?"footer-menu-topout":""} ${r===o.href?"active":""}`,onClick:()=>n(i,o.href),children:[l("i",{class:`ifc-icon ${o.icon}`}),o.text]})},i))})})}});var Ca,Vg,Gg,Yg,$r,Ur=m(()=>{"use strict";R();f();Ca="40px",Vg=({onClick:e})=>l("i",{class:"ifc-icon mg-arrow_back_ios_new_outlined mhti-back-icon","data-back-action":ae.genBackActionId(),onClick:t=>e(t)}),Gg=({onClick:e})=>l("i",{class:"ifc-icon ma-close mhti-close-icon",onClick:t=>e(t)}),Yg=()=>l("div",{class:"mhti-empty-icon",style:{width:"28px"}}),$r=({title:e,onBack:t,left:n,right:r,background:o,color:i,noShadow:a})=>{let s={display:"flex",flexDirection:"row",width:"100vw",padding:"6px 0",color:i||"var(--primary-color)",background:o||"var(--activatable-bg-color-normal)",boxShadow:a?"unset":"var(--mobile-header-shadow)",zIndex:"var(--layer-inside)",".mhti-title":{display:"flex",fontSize:"1.3rem",flex:"1",color:"var(--activatable-text-color-normal)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",alignItems:"center",justifyContent:"center"},".mhti-title > *":{display:"flex",width:"100%",alignItems:"center",justifyContent:"center"},".mhti-left, .mhti-right":{height:Ca,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16px"},".mhti-left":{paddingLeft:"8px"},".mhti-right":{paddingRight:"8px"},".mhti-left i, .mhti-right i":{fontSize:"28px"}},p=n instanceof A?n:new A(n),c=e instanceof A?e:new A(e),d=r instanceof A?r:new A(r);return l("div",{css:s,class:"mobile-header-title-icon-top",children:[l("div",{class:"mhti-left",children:p.node}),l("div",{class:"mhti-title",children:c.node}),l("div",{class:"mhti-right",children:d.node})]})}});var Pa,Ea,Ma,Jg,Kg,La=m(()=>{"use strict";R();Ur();f();Pa="40px",Ea=({onClick:e})=>l("i",{class:"ifc-icon mg-arrow_back_ios_new_outlined header-back-left-icon","data-back-action":ae.genBackActionId(),onClick:t=>e(t)}),Ma=({onClick:e})=>l("i",{class:"ifc-icon ma-close header-back-right-icon",onClick:t=>e(t)}),Jg=()=>l("div",{class:"header-back-top-empty"}),Kg=({children:e,title:t,onBack:n,left:r,right:o,noHeader:i=!1,background:a,color:s,noShadow:p,contentColor:c,contentBackground:d})=>{r=r||l(Ea,{onClick:n}),o=o||l(Ma,{onClick:n});let u={display:"flex",flexDirection:"column",width:"100%",height:"100%",minHeight:"100%",background:a||"var(--activatable-bg-color-normal)",".header-back-top":{display:"flex",flexDirection:"row",width:"100vw",padding:"6px 0",backgroundColor:"var(--activatable-bg-color-normal)",boxShadow:"var(--mobile-header-shadow)"},".header-back-content":{display:"flex",flex:"1",flexDirection:"column",overflowY:"auto",scrollbarWidth:"none",position:"relative",color:c||"var(--primary-color)",background:d||"var(--activatable-bg-color-normal)","&::-webkit-scrollbar":{display:"none"}},".header-back-title":{fontSize:"15px",flex:"1",color:"var(--activatable-text-color-normal)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},".header-back-left, .header-back-right":{height:Pa,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16px",padding:"0 8px"},".header-back-left i, .header-back-right i":{fontSize:"28px"}},g=r instanceof A?r:new A(r),h=t instanceof A?t:new A(t),b=o instanceof A?o:new A(o);return l("div",{ref:{},css:u,class:"header-back-frame",children:[!i&&l($r,{onBack:n,left:g,title:h,right:b,background:a,color:s,noShadow:p}),l("div",{class:"header-back-content",children:e})]})}});var dn,ye,Xg,Zg,Qg,eh,Vr,Gr=m(()=>{"use strict";R();f();dn=class e{constructor(){this.leftContent=new A("");this.centerContent=new A("");this.rightContent=new A("")}static getInstance(){return e.instance||(e.instance=new e),e.instance}setLeftContent(t){this.leftContent.value=t}getLeftContent(){return this.leftContent}setCenterContent(t){this.centerContent.value=t}getCenterContent(){return this.centerContent}setRightContent(t){this.rightContent.value=t}getRightContent(){return this.rightContent}hideHeader(){this.leftContent.value="",this.centerContent.value="",this.rightContent.value=""}},ye=dn.getInstance(),Xg=e=>(ye.setLeftContent(e.children),l(Z,{})),Zg=e=>(ye.setCenterContent(e.children),l(Z,{})),Qg=e=>(ye.setRightContent(e.children),l(Z,{})),eh=()=>(ye.hideHeader(),l(Z,{})),Vr=e=>l("div",{css:{display:"flex",flexDirection:"row",width:"100%",height:"auto","& > *":{height:"100%"},".mobile-header-center":{flex:1}},class:"mobile-header-component",children:[l("div",{class:"mobile-header-left",children:ye.getLeftContent().node}),l("div",{class:"mobile-header-center",children:ye.getCenterContent().node}),l("div",{class:"mobile-header-right",children:ye.getRightContent().node})]})});var vt,Fe,Yr,un=m(()=>{"use strict";R();f();vt=class vt{static show(){let t=document.querySelector(".mobile-side-menu-mask");t.classList.add("show"),setTimeout(()=>{t.classList.add("animate-show")},1);let n=ae.genBackActionId();t.setAttribute("data-back-action",n)}static hide(){let t=document.querySelector(".mobile-side-menu-mask");t.removeAttribute("data-back-action"),t.classList.remove("animate-show"),setTimeout(()=>{t.classList.remove("show")},300)}static addTouchEvent(){if(this.isTouchEventAdded)return;this.isTouchEventAdded=!0;let t=0,n=0,r="",o=!1,i=!1,a=document.querySelector(".mobile-side-menu-mask");document.addEventListener("touchstart",s=>{t=s.touches[0].clientY,n=s.touches[0].clientX,r="",o=!1,i=a==null?void 0:a.classList.contains("show"),i?n>80&&(o=!0):n<40&&(o=!0)}),document.addEventListener("touchmove",s=>{if(o){if(r==="")if(s.touches[0].clientX-n!==0)r="X";else{o=!1;return}if(i){if(s.touches[0].clientX-n<30){vt.hide(),o=!1;return}}else if(s.touches[0].clientX-n>80){vt.show(),o=!1;return}}}),document.addEventListener("touchend",()=>{o=!1,r=""})}};vt.isTouchEventAdded=!1;Fe=vt,Yr=e=>l("div",{css:{".mobile-side-menu-mask":{display:"none",flexDirection:"column",position:"fixed",top:"0",left:"0",right:"0",bottom:"0",zIndex:"var(--layer-menu)",backgroundColor:"#000000b0","&.show":{display:"flex"},"&.animate-show .mobile-side-menu":{transform:"scaleX(1)"}},".mobile-side-menu":{display:"flex",flexDirection:"column",padding:"16px",transition:"transform 0.3s ease-in-out",backgroundColor:"var(--primary-bg-color)",width:"70%",maxWidth:"300px",height:"100%",overflowX:"hidden",overflowY:"auto",transformOrigin:"left",transform:"scaleX(0)",boxShadow:"var(--cover-box-shadow)"}},ref:{onLoad:async()=>{Fe.addTouchEvent()}},children:l("div",{class:"mobile-side-menu-mask",onClick:o=>{o.target instanceof HTMLDivElement&&o.target.classList.contains("mobile-side-menu-mask")&&Fe.hide()},children:l("div",{class:"mobile-side-menu",children:e.children})})})});var th,Aa=m(()=>{"use strict";un();f();th=()=>l("div",{css:{cursor:"pointer",display:"flex",flexDirection:"row",alignItems:"center",fontSize:"28px"},onClick:()=>Fe.show(),children:l("i",{class:"ifc-icon bs-list"})})});var nh,Ra=m(()=>{"use strict";R();f();nh=e=>l(Or,{list:e.menuItems,defaultValue:"",tips:"",minWidth:"auto",maxWidth:"200px",maxHeight:"300px",align:"right",noTriangleIcon:!0,handleSelected:e.handleSelected,noUpdateLabel:!0})});var Ha=m(()=>{"use strict";Ta();_r();La();Gr();Ur();un();Aa();Ra()});var Jr=m(()=>{"use strict";Hi();Di();Fi();Oi();Bi();on();Ni();Wi();Ar();ji();an();qi();Vi();Gi();Yi();Ki();Xi();Zi();Qi();ea();ta();oa();ia();Br();aa();sa();la();ca();pa();da();ua();Lr();ga();ha();ma();fa();ba();xa();va();ya();jr();Sa();Ha()});var Xr,rh,oh,ih,Kr,ah,Ia=m(()=>{"use strict";H();Jr();Xr={size:1024*200},rh=e=>{Xr.size=e},oh=()=>Xr.size,ih=async e=>{let t=e+(e.indexOf("?")===-1?"?":"")+"&check-size=1",n=await X().renderPageFunctions.fetchData(t);return n&&n.json.size?n.json.size:0},Kr=async(e,t,n,r,o,i=3,a="")=>{let s=r+(r.indexOf("?")===-1?"?":"");s+=`&chunkNumber=${t.toString()}`,s+=`&totalChunks=${n.toString()}`,o&&(s+=`&key=${o}`);let p=0,c;for(;p<i;){try{if(c=await X().renderPageFunctions.fetchData(s,e),c&&c.json&&(c=c.json),c&&c.status)break}catch(d){console.log(`uploadFileChunk error, try: ${p}`,d)}p++,a&&be.sendMessage(a.replace("${tryCount}",p.toString()),"var(--warning-bg-color)")}return c},ah=async(e,t,n,r=0,o=3,i="")=>{let a="",s=e instanceof File?e.size:e.length;if(r||(r=Xr.size),s<=r){let c=await Kr(e,0,1,t,a,o,i);return!c||c.status!=="ok"?c:(n&&n(1,0,s),!0)}let p=Math.ceil(s/r);for(let c=0;c<p;c++){let d=c*r,u=Math.min((c+1)*r,s),g=e.slice(d,u),h=await Kr(g,c,p,t,a,o,i);if(!h||h.status!=="ok")return h;a=h.key,n&&n(Math.round((c+1)/p*100)/100,c,p)}return!0}});var xe=m(()=>{"use strict";ri();oi();ai();li();ci();pi();di();ui();gi();hi();fi();bi();xi();vi();yi();ki();wi();Si();Ti();Ci();Pi();Mi();Li();Ai();Ri();Ia()});var Da,za=m(()=>{"use strict";f();Da=e=>l("div",{css:{display:"flex",padding:"0 32px 16px",".d-footer-cp":{padding:"1px 15px",margin:"auto"}},class:"d-footer-box",children:l("div",{class:"d-footer-cp",children:e.title})})});var Fa,Oa=m(()=>{"use strict";f();Fa=e=>l("div",{css:{display:"flex",flexDirection:"row",width:"100%",height:"100%",".d-header-title":{display:"flex",flex:"1",margin:"8px 16px",textShadow:"-3px -3px 10px white, 3px 3px 10px black",color:"darkblue",fontSize:"22px"},".desktop-menu-bar":{display:"flex",flexDirection:"row",width:"auto",padding:"4px 16px 0",".desktop-menu-item":{display:"flex",padding:"0 8px",height:"fit-content",a:{textDecoration:"none",color:"var(--sidebar-color)",i:{paddingRight:"4px"}}}}},class:"desktop-menu-box",children:[l("div",{class:"flex-1 d-header-title",children:e.title}),l("div",{class:"desktop-menu-bar",children:e.items.map(n=>l("div",{class:"desktop-menu-item",children:l("a",{href:n.href,children:[l("i",{class:`ifc-icon ${n.icon}`}),n.text]})}))})]})});var sh,Ba=m(()=>{"use strict";R();_r();za();Oa();Gr();un();f();sh=async e=>{let t={display:"flex",flexDirection:"column",width:"100%",height:"100%",minHeight:"100%",".frame-top-menu":{display:"flex",flexDirection:"column",width:"100vw",backgroundColor:"var(--activatable-bg-color-normal)"},".frame-content":{display:"flex",flex:"1",flexDirection:"column",overflowY:"auto",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},".content-block":{display:"flex",flex:"1",flexDirection:"column",overflowY:"auto",scrollbarWidth:"none"},".content-block::-webkit-scrollbar":{display:"none"},".content-block .padding-block":{padding:"0 16px"},[V.TabletBelow]:{".frame-footer .d-footer-box, .frame-top-menu .desktop-menu-box":{display:"none"}}};return l("div",{css:t,class:"responsive-frame",children:[l(Zr,{hook:e.sliderFrameHook}),l("div",{class:"frame-top-menu",children:[l(Fa,{title:e.desktopHeaderTitle,items:e.desktopTopMenu}),l(Vr,{})]}),l("div",{class:"frame-content",children:[l(Yr,{children:e.mobileSideMenuContent}),l("div",{class:"content-block "+e.placeholderClassname,children:e.mainContent}),l("div",{class:"frame-footer",children:[e.desktopFooterTitle&&l(Da,{title:e.desktopFooterTitle}),l(qr,{items:e.mobileBottomMenu})]})]})]})}});var lh,Na=m(()=>{"use strict";f();lh=async(e,t)=>l("div",{css:{display:"flex",flexDirection:"column",width:"100%",height:"100%",position:"relative",".top-frame-box":{display:"flex",flex:"1",flexDirection:"column",height:"100%","padding-top ":"constant(safe-area-inset-top)","padding-top":"env(safe-area-inset-top)"}},children:l("div",{class:"top-frame-box "+e,children:t})})});var Zr,Wa=m(()=>{"use strict";R();f();Zr=e=>{e.hook&&(e.hook.load=o=>{var i;t.value=o,(i=n.current)==null||i.classList.remove("d-none"),setTimeout(()=>{var a;(a=n.current)==null||a.classList.add("show")},100)},e.hook.close=o=>{var i;$(o),(i=n.current)==null||i.classList.remove("show"),setTimeout(async()=>{var a;(a=n.current)==null||a.classList.add("d-none"),t.value="",e.afterClose&&await e.afterClose()},400)},e.hook.addClass=o=>{var i;(i=n.current)==null||i.classList.add(o)});let t=new A(l("div",{class:"slider-frame-default",children:e.defaultContent||"(No Content)"})),n={},r={display:"flex",flexDirection:"column",position:"fixed",top:"0",left:"0",right:"0",bottom:"0",zIndex:"var(--layer-slider)",transform:e.direction==="bottom"?"translateY(100%)":"translateX(100%)",transition:"transform 0.4s ease-in-out",backgroundColor:"var(--primary-bg-color)","&.show":{transform:e.direction==="bottom"?"translateY(0)":"translateX(0)"},"& > fragment":{height:"100%"},"&.desktop-slide-left":{[V.TabletAbove]:{".header-back-content":{width:"30%"}}},"&.desktop-slide-right":{[V.TabletAbove]:{top:"59px",left:"30%",transform:"translateX(0)",".mobile-header-title-icon-top":{width:"100%",boxShadow:"unset"},".header-back-content":{width:"100%"},".mhti-title":{fontSize:"15px"},".mhti-left, .mhti-right":{display:"none"},"&.d-none":{display:"unset !important"}}}};return l("div",{ref:n,css:r,class:"slider-frame d-none",children:t.node})}});var ja=m(()=>{"use strict";Ba();Na();Wa()});var qa={};yu(qa,{ActionSheet:()=>se,ActionSheetInput:()=>Cr,ActionSheetInputPromise:()=>tg,ActionSheetMessage:()=>Tr,ActionSheetMessagePromise:()=>eg,ActionSheetSelect:()=>Sr,ActionSheetSelectOptionsProps:()=>Pr,ActionSheetSelectPromise:()=>ng,Base62:()=>pr,Button:()=>og,ButtonPushAnimation:()=>rg,ButtonPushAnimationSize:()=>Ii,ButtonSize:()=>zi,ConsoleColors:()=>Tu,DateUtils:()=>dr,DiffDate:()=>en,DocumentReady:()=>hr,DomUtils:()=>mr,DragFresh:()=>sg,DynamicalLoad:()=>br,EditableLabel:()=>lg,FloatWindow:()=>ze,Grid:()=>cg,HeaderWithBackFrame:()=>Kg,HeaderWithBackFrameEmpty:()=>Jg,HeaderWithBackFrameHeight:()=>Pa,HeaderWithBackFrameLeft:()=>Ea,HeaderWithBackFrameRight:()=>Ma,HtmlLoad:()=>pg,HtmlVar:()=>A,InputWithTitle:()=>dg,LinkItem:()=>bt,LinkList:()=>ug,LiteDom:()=>xr,Logger:()=>re,MediaQueryDirection:()=>_i,MediaQueryMaxWidth:()=>W,MediaQueryRange:()=>V,MenuBar:()=>mg,MenuSidebar:()=>fg,MessageBox:()=>Dr,MessageBoxButtonProps:()=>Ji,MessageHub:()=>yr,MessageHubData:()=>vr,MetaData:()=>yg,MetaDescription:()=>kg,MobileFooterMenu:()=>qr,MobileHeadeBackIcon:()=>Vg,MobileHeadeCloseIcon:()=>Gg,MobileHeadeIconHeight:()=>Ca,MobileHeaderCenter:()=>Zg,MobileHeaderComponent:()=>Vr,MobileHeaderEmptyIcon:()=>Yg,MobileHeaderHelper:()=>dn,MobileHeaderHide:()=>eh,MobileHeaderLeft:()=>Xg,MobileHeaderRight:()=>Qg,MobileHeaderTitleIcon:()=>$r,MobileSideMenu:()=>Yr,MobileSideMenuHelper:()=>Fe,MobileTopSysIcon:()=>th,MobileTopSysMenu:()=>nh,ModalWindow:()=>zr,NotificationColor:()=>tn,NotificationMessage:()=>be,Observable:()=>rn,PageRouter:()=>Ie,PageTitle:()=>Sg,PagingLink:()=>Cg,Panel:()=>Pg,PopupMenu:()=>Q,PopupMenuWithButton:()=>Eg,PopupMenuWithIcon:()=>Or,PopupMenuWithLabel:()=>Mg,Progress:()=>Lg,RadioLabelComponent:()=>Ag,Redirect:()=>Rg,ResizableSplitter:()=>Nr,ResponsiveFrame:()=>sh,SelectAngleComponent:()=>Hg,SelectWithTitle:()=>Ig,SimpleStorage:()=>wr,SlideTabComponent:()=>Dg,SliderFrame:()=>Zr,Spinner01:()=>ig,Spinner02:()=>Mr,Spinner03:()=>ag,SpinnerSize:()=>Er,StarsComponent:()=>zg,Subject:()=>kr,Subscription:()=>nn,Svg:()=>ve,SwitchOptionComponent:()=>Fg,Tabs:()=>Og,TextGlow:()=>Bg,TextScale:()=>Ng,TextWave:()=>Wg,ThemeSelector:()=>Wr,ToggleBase:()=>Ze,ToggleBaseSize:()=>$g,ToggleButton:()=>_g,TogglePlayButton:()=>qg,TogglePlayButtonSize:()=>jg,ToggleSwitch:()=>Ug,ToggleSwitchSize:()=>wa,ToggleWaveFrame:()=>ka,TopFrame:()=>lh,WebConfig:()=>Xe,_lupineJs:()=>q,addMetaDataTags:()=>me,adjustedMediaQueryRange:()=>gg,backActionHelper:()=>ae,backActionUniqueId:()=>ni,base64ToUrl:()=>Bu,baseThemes:()=>cn,bindAttributes:()=>he,bindAttributesChildren:()=>Zn,bindGlobalStyle:()=>P,bindLang:()=>Qn,bindLinks:()=>Te,bindPageLoadedEvent:()=>Wn,bindRef:()=>Kn,bindRenderPageFunctions:()=>Su,bindRouter:()=>In,bindTheme:()=>Nn,bindWebConfigApi:()=>Du,blobFromBase64:()=>ii,blobToBase64:()=>Ou,calculateTextWidth:()=>Nu,callPageLoadedEvent:()=>Wt,callUnload:()=>pt,camelToHyphens:()=>Ae,checkUploadedFileSize:()=>ih,clearCookie:()=>Lo,cloneJson:()=>Wu,cookie:()=>Cu,createDragUtil:()=>Yu,darkThemes:()=>Rr,debugWatch:()=>Qt,decodeHtml:()=>Ku,deepMerge:()=>gr,defaultLangName:()=>No,defaultThemeName:()=>Ot,disableConsole:()=>ju,disableDebug:()=>qu,domUniqueId:()=>Bo,downloadFile:()=>Uu,downloadFileChunk:()=>mi,downloadLink:()=>Vu,downloadStream:()=>Gu,encodeHtml:()=>Ju,findParentTag:()=>Xu,formatBytes:()=>Zu,generateAllGlobalStyles:()=>Un,getCookie:()=>Ft,getCurrentLang:()=>Ke,getCurrentTheme:()=>oe,getDefaultPageLimit:()=>na,getDownloadChunkSize:()=>$u,getEitherCookie:()=>gt,getGlobalStylesId:()=>$n,getMetaDataObject:()=>Jt,getMetaDataTags:()=>rr,getMetaDescription:()=>qo,getPageTitle:()=>Yt,getRenderPageProps:()=>X,getServerCookie:()=>Ao,getUploadChunkSize:()=>oh,globalStyleUniqueId:()=>zo,initServerCookies:()=>On,initWebEnv:()=>Zt,initializePage:()=>fe,isFrontEnd:()=>O,langCookieName:()=>$t,lightThemes:()=>ln,mobileHeaderHelper:()=>ye,mountInnerComponent:()=>_,mountOuterComponent:()=>Yn,mountSiblingComponent:()=>Ru,notificationColorFromValue:()=>wg,pathUtils:()=>Ei,processStyle:()=>Re,promiseTimeout:()=>Qu,renderComponent:()=>ge,replaceInnerhtml:()=>Ce,setCookie:()=>ue,setDefaultMetaDescription:()=>nr,setDefaultPageLimit:()=>ra,setDefaultPageTitle:()=>tr,setDownloadChunkSize:()=>_u,setMetaDescription:()=>Iu,setPageTitle:()=>er,setRenderPageProps:()=>It,setUploadChunkSize:()=>rh,sharedThemes:()=>xt,stopPropagation:()=>$,themeAttributeName:()=>Bn,themeCookieName:()=>Le,uniqueIdGenerator:()=>Pe,updateLang:()=>Hu,updateLangEventName:()=>Wo,updateStyles:()=>Mu,updateTheme:()=>mt,updateThemeEventName:()=>Ro,uploadFile:()=>ah,uploadFileChunk:()=>Kr,webEnv:()=>Xt});var R=m(()=>{"use strict";H();xe();pn();Jr();ja()});var ds=S(()=>{});var Tt=S((pC,gs)=>{var Vh=Object.prototype.toString;gs.exports=function(t){if(t===void 0)return"undefined";if(t===null)return"null";var n=typeof t;if(n==="boolean")return"boolean";if(n==="string")return"string";if(n==="number")return"number";if(n==="symbol")return"symbol";if(n==="function")return Xh(t)?"generatorfunction":"function";if(Gh(t))return"array";if(em(t))return"buffer";if(Qh(t))return"arguments";if(Jh(t))return"date";if(Yh(t))return"error";if(Kh(t))return"regexp";switch(us(t)){case"Symbol":return"symbol";case"Promise":return"promise";case"WeakMap":return"weakmap";case"WeakSet":return"weakset";case"Map":return"map";case"Set":return"set";case"Int8Array":return"int8array";case"Uint8Array":return"uint8array";case"Uint8ClampedArray":return"uint8clampedarray";case"Int16Array":return"int16array";case"Uint16Array":return"uint16array";case"Int32Array":return"int32array";case"Uint32Array":return"uint32array";case"Float32Array":return"float32array";case"Float64Array":return"float64array"}if(Zh(t))return"generator";switch(n=Vh.call(t),n){case"[object Object]":return"object";case"[object Map Iterator]":return"mapiterator";case"[object Set Iterator]":return"setiterator";case"[object String Iterator]":return"stringiterator";case"[object Array Iterator]":return"arrayiterator"}return n.slice(8,-1).toLowerCase().replace(/\s/g,"")};function us(e){return typeof e.constructor=="function"?e.constructor.name:null}function Gh(e){return Array.isArray?Array.isArray(e):e instanceof Array}function Yh(e){return e instanceof Error||typeof e.message=="string"&&e.constructor&&typeof e.constructor.stackTraceLimit=="number"}function Jh(e){return e instanceof Date?!0:typeof e.toDateString=="function"&&typeof e.getDate=="function"&&typeof e.setDate=="function"}function Kh(e){return e instanceof RegExp?!0:typeof e.flags=="string"&&typeof e.ignoreCase=="boolean"&&typeof e.multiline=="boolean"&&typeof e.global=="boolean"}function Xh(e,t){return us(e)==="GeneratorFunction"}function Zh(e){return typeof e.throw=="function"&&typeof e.return=="function"&&typeof e.next=="function"}function Qh(e){try{if(typeof e.length=="number"&&typeof e.callee=="function")return!0}catch(t){if(t.message.indexOf("callee")!==-1)return!0}return!1}function em(e){return e.constructor&&typeof e.constructor.isBuffer=="function"?e.constructor.isBuffer(e):!1}});var ms=S((dC,hs)=>{"use strict";hs.exports=function(t){return typeof t<"u"&&t!==null&&(typeof t=="object"||typeof t=="function")}});var xs=S((uC,bs)=>{"use strict";var fs=ms();bs.exports=function(t){fs(t)||(t={});for(var n=arguments.length,r=1;r<n;r++){var o=arguments[r];fs(o)&&tm(t,o)}return t};function tm(e,t){for(var n in t)nm(t,n)&&(e[n]=t[n])}function nm(e,t){return Object.prototype.hasOwnProperty.call(e,t)}});var ks=S((gC,ys)=>{"use strict";var rm=Tt(),om=xs();ys.exports=function(e,t){typeof t=="function"&&(t={parse:t});var n=am(e),r={section_delimiter:"---",parse:lm},o=om({},r,t),i=o.section_delimiter,a=n.content.split(/\r?\n/),s=null,p=vs(),c=[],d=[];function u(E){n.content=E,s=[],c=[]}function g(E){d.length&&(p.key=sm(d[0],i),p.content=E,o.parse(p,s),s.push(p),p=vs(),c=[],d=[])}for(var h=0;h<a.length;h++){var b=a[h],x=d.length,v=b.trim();if(im(v,i)){if(v.length===3&&h!==0){if(x===0||x===2){c.push(b);continue}d.push(v),p.data=c.join(`
`),c=[];continue}s===null&&u(c.join(`
`)),x===2&&g(c.join(`
`)),d.push(v);continue}c.push(b)}return s===null?u(c.join(`
`)):g(c.join(`
`)),n.sections=s,n};function im(e,t){return!(e.slice(0,t.length)!==t||e.charAt(t.length+1)===t.slice(-1))}function am(e){if(rm(e)!=="object"&&(e={content:e}),typeof e.content!="string"&&!cm(e.content))throw new TypeError("expected a buffer or string");return e.content=e.content.toString(),e.sections=[],e}function sm(e,t){return e?e.slice(t.length).trim():""}function vs(){return{key:"",data:"",content:""}}function lm(e){return e}function cm(e){return e&&e.constructor&&typeof e.constructor.isBuffer=="function"?e.constructor.isBuffer(e):!1}});var je=S((hC,We)=>{"use strict";function ws(e){return typeof e>"u"||e===null}function pm(e){return typeof e=="object"&&e!==null}function dm(e){return Array.isArray(e)?e:ws(e)?[]:[e]}function um(e,t){var n,r,o,i;if(t)for(i=Object.keys(t),n=0,r=i.length;n<r;n+=1)o=i[n],e[o]=t[o];return e}function gm(e,t){var n="",r;for(r=0;r<t;r+=1)n+=e;return n}function hm(e){return e===0&&Number.NEGATIVE_INFINITY===1/e}We.exports.isNothing=ws;We.exports.isObject=pm;We.exports.toArray=dm;We.exports.repeat=gm;We.exports.isNegativeZero=hm;We.exports.extend=um});var et=S((mC,Ss)=>{"use strict";function Ct(e,t){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=t,this.message=(this.reason||"(unknown reason)")+(this.mark?" "+this.mark.toString():""),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}Ct.prototype=Object.create(Error.prototype);Ct.prototype.constructor=Ct;Ct.prototype.toString=function(t){var n=this.name+": ";return n+=this.reason||"(unknown reason)",!t&&this.mark&&(n+=" "+this.mark.toString()),n};Ss.exports=Ct});var Ps=S((fC,Cs)=>{"use strict";var Ts=je();function uo(e,t,n,r,o){this.name=e,this.buffer=t,this.position=n,this.line=r,this.column=o}uo.prototype.getSnippet=function(t,n){var r,o,i,a,s;if(!this.buffer)return null;for(t=t||4,n=n||75,r="",o=this.position;o>0&&`\0\r
\x85\u2028\u2029`.indexOf(this.buffer.charAt(o-1))===-1;)if(o-=1,this.position-o>n/2-1){r=" ... ",o+=5;break}for(i="",a=this.position;a<this.buffer.length&&`\0\r
\x85\u2028\u2029`.indexOf(this.buffer.charAt(a))===-1;)if(a+=1,a-this.position>n/2-1){i=" ... ",a-=5;break}return s=this.buffer.slice(o,a),Ts.repeat(" ",t)+r+s+i+`
`+Ts.repeat(" ",t+this.position-o+r.length)+"^"};uo.prototype.toString=function(t){var n,r="";return this.name&&(r+='in "'+this.name+'" '),r+="at line "+(this.line+1)+", column "+(this.column+1),t||(n=this.getSnippet(),n&&(r+=`:
`+n)),r};Cs.exports=uo});var B=S((bC,Ms)=>{"use strict";var Es=et(),mm=["kind","resolve","construct","instanceOf","predicate","represent","defaultStyle","styleAliases"],fm=["scalar","sequence","mapping"];function bm(e){var t={};return e!==null&&Object.keys(e).forEach(function(n){e[n].forEach(function(r){t[String(r)]=n})}),t}function xm(e,t){if(t=t||{},Object.keys(t).forEach(function(n){if(mm.indexOf(n)===-1)throw new Es('Unknown option "'+n+'" is met in definition of "'+e+'" YAML type.')}),this.tag=e,this.kind=t.kind||null,this.resolve=t.resolve||function(){return!0},this.construct=t.construct||function(n){return n},this.instanceOf=t.instanceOf||null,this.predicate=t.predicate||null,this.represent=t.represent||null,this.defaultStyle=t.defaultStyle||null,this.styleAliases=bm(t.styleAliases||null),fm.indexOf(this.kind)===-1)throw new Es('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}Ms.exports=xm});var qe=S((xC,As)=>{"use strict";var Ls=je(),kn=et(),vm=B();function go(e,t,n){var r=[];return e.include.forEach(function(o){n=go(o,t,n)}),e[t].forEach(function(o){n.forEach(function(i,a){i.tag===o.tag&&i.kind===o.kind&&r.push(a)}),n.push(o)}),n.filter(function(o,i){return r.indexOf(i)===-1})}function ym(){var e={scalar:{},sequence:{},mapping:{},fallback:{}},t,n;function r(o){e[o.kind][o.tag]=e.fallback[o.tag]=o}for(t=0,n=arguments.length;t<n;t+=1)arguments[t].forEach(r);return e}function tt(e){this.include=e.include||[],this.implicit=e.implicit||[],this.explicit=e.explicit||[],this.implicit.forEach(function(t){if(t.loadKind&&t.loadKind!=="scalar")throw new kn("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")}),this.compiledImplicit=go(this,"implicit",[]),this.compiledExplicit=go(this,"explicit",[]),this.compiledTypeMap=ym(this.compiledImplicit,this.compiledExplicit)}tt.DEFAULT=null;tt.create=function(){var t,n;switch(arguments.length){case 1:t=tt.DEFAULT,n=arguments[0];break;case 2:t=arguments[0],n=arguments[1];break;default:throw new kn("Wrong number of arguments for Schema.create function")}if(t=Ls.toArray(t),n=Ls.toArray(n),!t.every(function(r){return r instanceof tt}))throw new kn("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");if(!n.every(function(r){return r instanceof vm}))throw new kn("Specified list of YAML types (or a single Type object) contains a non-Type object.");return new tt({include:t,explicit:n})};As.exports=tt});var Hs=S((vC,Rs)=>{"use strict";var km=B();Rs.exports=new km("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return e!==null?e:""}})});var Ds=S((yC,Is)=>{"use strict";var wm=B();Is.exports=new wm("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return e!==null?e:[]}})});var Fs=S((kC,zs)=>{"use strict";var Sm=B();zs.exports=new Sm("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return e!==null?e:{}}})});var wn=S((wC,Os)=>{"use strict";var Tm=qe();Os.exports=new Tm({explicit:[Hs(),Ds(),Fs()]})});var Ns=S((SC,Bs)=>{"use strict";var Cm=B();function Pm(e){if(e===null)return!0;var t=e.length;return t===1&&e==="~"||t===4&&(e==="null"||e==="Null"||e==="NULL")}function Em(){return null}function Mm(e){return e===null}Bs.exports=new Cm("tag:yaml.org,2002:null",{kind:"scalar",resolve:Pm,construct:Em,predicate:Mm,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"}},defaultStyle:"lowercase"})});var js=S((TC,Ws)=>{"use strict";var Lm=B();function Am(e){if(e===null)return!1;var t=e.length;return t===4&&(e==="true"||e==="True"||e==="TRUE")||t===5&&(e==="false"||e==="False"||e==="FALSE")}function Rm(e){return e==="true"||e==="True"||e==="TRUE"}function Hm(e){return Object.prototype.toString.call(e)==="[object Boolean]"}Ws.exports=new Lm("tag:yaml.org,2002:bool",{kind:"scalar",resolve:Am,construct:Rm,predicate:Hm,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"})});var _s=S((CC,qs)=>{"use strict";var Im=je(),Dm=B();function zm(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function Fm(e){return 48<=e&&e<=55}function Om(e){return 48<=e&&e<=57}function Bm(e){if(e===null)return!1;var t=e.length,n=0,r=!1,o;if(!t)return!1;if(o=e[n],(o==="-"||o==="+")&&(o=e[++n]),o==="0"){if(n+1===t)return!0;if(o=e[++n],o==="b"){for(n++;n<t;n++)if(o=e[n],o!=="_"){if(o!=="0"&&o!=="1")return!1;r=!0}return r&&o!=="_"}if(o==="x"){for(n++;n<t;n++)if(o=e[n],o!=="_"){if(!zm(e.charCodeAt(n)))return!1;r=!0}return r&&o!=="_"}for(;n<t;n++)if(o=e[n],o!=="_"){if(!Fm(e.charCodeAt(n)))return!1;r=!0}return r&&o!=="_"}if(o==="_")return!1;for(;n<t;n++)if(o=e[n],o!=="_"){if(o===":")break;if(!Om(e.charCodeAt(n)))return!1;r=!0}return!r||o==="_"?!1:o!==":"?!0:/^(:[0-5]?[0-9])+$/.test(e.slice(n))}function Nm(e){var t=e,n=1,r,o,i=[];return t.indexOf("_")!==-1&&(t=t.replace(/_/g,"")),r=t[0],(r==="-"||r==="+")&&(r==="-"&&(n=-1),t=t.slice(1),r=t[0]),t==="0"?0:r==="0"?t[1]==="b"?n*parseInt(t.slice(2),2):t[1]==="x"?n*parseInt(t,16):n*parseInt(t,8):t.indexOf(":")!==-1?(t.split(":").forEach(function(a){i.unshift(parseInt(a,10))}),t=0,o=1,i.forEach(function(a){t+=a*o,o*=60}),n*t):n*parseInt(t,10)}function Wm(e){return Object.prototype.toString.call(e)==="[object Number]"&&e%1===0&&!Im.isNegativeZero(e)}qs.exports=new Dm("tag:yaml.org,2002:int",{kind:"scalar",resolve:Bm,construct:Nm,predicate:Wm,represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0"+e.toString(8):"-0"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}})});var Vs=S((PC,Us)=>{"use strict";var $s=je(),jm=B(),qm=new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function _m(e){return!(e===null||!qm.test(e)||e[e.length-1]==="_")}function $m(e){var t,n,r,o;return t=e.replace(/_/g,"").toLowerCase(),n=t[0]==="-"?-1:1,o=[],"+-".indexOf(t[0])>=0&&(t=t.slice(1)),t===".inf"?n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:t===".nan"?NaN:t.indexOf(":")>=0?(t.split(":").forEach(function(i){o.unshift(parseFloat(i,10))}),t=0,r=1,o.forEach(function(i){t+=i*r,r*=60}),n*t):n*parseFloat(t,10)}var Um=/^[-+]?[0-9]+e/;function Vm(e,t){var n;if(isNaN(e))switch(t){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(t){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(t){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if($s.isNegativeZero(e))return"-0.0";return n=e.toString(10),Um.test(n)?n.replace("e",".e"):n}function Gm(e){return Object.prototype.toString.call(e)==="[object Number]"&&(e%1!==0||$s.isNegativeZero(e))}Us.exports=new jm("tag:yaml.org,2002:float",{kind:"scalar",resolve:_m,construct:$m,predicate:Gm,represent:Vm,defaultStyle:"lowercase"})});var ho=S((EC,Gs)=>{"use strict";var Ym=qe();Gs.exports=new Ym({include:[wn()],implicit:[Ns(),js(),_s(),Vs()]})});var mo=S((MC,Ys)=>{"use strict";var Jm=qe();Ys.exports=new Jm({include:[ho()]})});var Zs=S((LC,Xs)=>{"use strict";var Km=B(),Js=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Ks=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Xm(e){return e===null?!1:Js.exec(e)!==null||Ks.exec(e)!==null}function Zm(e){var t,n,r,o,i,a,s,p=0,c=null,d,u,g;if(t=Js.exec(e),t===null&&(t=Ks.exec(e)),t===null)throw new Error("Date resolve error");if(n=+t[1],r=+t[2]-1,o=+t[3],!t[4])return new Date(Date.UTC(n,r,o));if(i=+t[4],a=+t[5],s=+t[6],t[7]){for(p=t[7].slice(0,3);p.length<3;)p+="0";p=+p}return t[9]&&(d=+t[10],u=+(t[11]||0),c=(d*60+u)*6e4,t[9]==="-"&&(c=-c)),g=new Date(Date.UTC(n,r,o,i,a,s,p)),c&&g.setTime(g.getTime()-c),g}function Qm(e){return e.toISOString()}Xs.exports=new Km("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:Xm,construct:Zm,instanceOf:Date,represent:Qm})});var el=S((AC,Qs)=>{"use strict";var ef=B();function tf(e){return e==="<<"||e===null}Qs.exports=new ef("tag:yaml.org,2002:merge",{kind:"scalar",resolve:tf})});var rl=S((RC,nl)=>{"use strict";var _e;try{tl=Ht,_e=tl("buffer").Buffer}catch{}var tl,nf=B(),fo=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function rf(e){if(e===null)return!1;var t,n,r=0,o=e.length,i=fo;for(n=0;n<o;n++)if(t=i.indexOf(e.charAt(n)),!(t>64)){if(t<0)return!1;r+=6}return r%8===0}function of(e){var t,n,r=e.replace(/[\r\n=]/g,""),o=r.length,i=fo,a=0,s=[];for(t=0;t<o;t++)t%4===0&&t&&(s.push(a>>16&255),s.push(a>>8&255),s.push(a&255)),a=a<<6|i.indexOf(r.charAt(t));return n=o%4*6,n===0?(s.push(a>>16&255),s.push(a>>8&255),s.push(a&255)):n===18?(s.push(a>>10&255),s.push(a>>2&255)):n===12&&s.push(a>>4&255),_e?_e.from?_e.from(s):new _e(s):s}function af(e){var t="",n=0,r,o,i=e.length,a=fo;for(r=0;r<i;r++)r%3===0&&r&&(t+=a[n>>18&63],t+=a[n>>12&63],t+=a[n>>6&63],t+=a[n&63]),n=(n<<8)+e[r];return o=i%3,o===0?(t+=a[n>>18&63],t+=a[n>>12&63],t+=a[n>>6&63],t+=a[n&63]):o===2?(t+=a[n>>10&63],t+=a[n>>4&63],t+=a[n<<2&63],t+=a[64]):o===1&&(t+=a[n>>2&63],t+=a[n<<4&63],t+=a[64],t+=a[64]),t}function sf(e){return _e&&_e.isBuffer(e)}nl.exports=new nf("tag:yaml.org,2002:binary",{kind:"scalar",resolve:rf,construct:of,predicate:sf,represent:af})});var il=S((IC,ol)=>{"use strict";var lf=B(),cf=Object.prototype.hasOwnProperty,pf=Object.prototype.toString;function df(e){if(e===null)return!0;var t=[],n,r,o,i,a,s=e;for(n=0,r=s.length;n<r;n+=1){if(o=s[n],a=!1,pf.call(o)!=="[object Object]")return!1;for(i in o)if(cf.call(o,i))if(!a)a=!0;else return!1;if(!a)return!1;if(t.indexOf(i)===-1)t.push(i);else return!1}return!0}function uf(e){return e!==null?e:[]}ol.exports=new lf("tag:yaml.org,2002:omap",{kind:"sequence",resolve:df,construct:uf})});var sl=S((DC,al)=>{"use strict";var gf=B(),hf=Object.prototype.toString;function mf(e){if(e===null)return!0;var t,n,r,o,i,a=e;for(i=new Array(a.length),t=0,n=a.length;t<n;t+=1){if(r=a[t],hf.call(r)!=="[object Object]"||(o=Object.keys(r),o.length!==1))return!1;i[t]=[o[0],r[o[0]]]}return!0}function ff(e){if(e===null)return[];var t,n,r,o,i,a=e;for(i=new Array(a.length),t=0,n=a.length;t<n;t+=1)r=a[t],o=Object.keys(r),i[t]=[o[0],r[o[0]]];return i}al.exports=new gf("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:mf,construct:ff})});var cl=S((zC,ll)=>{"use strict";var bf=B(),xf=Object.prototype.hasOwnProperty;function vf(e){if(e===null)return!0;var t,n=e;for(t in n)if(xf.call(n,t)&&n[t]!==null)return!1;return!0}function yf(e){return e!==null?e:{}}ll.exports=new bf("tag:yaml.org,2002:set",{kind:"mapping",resolve:vf,construct:yf})});var nt=S((FC,pl)=>{"use strict";var kf=qe();pl.exports=new kf({include:[mo()],implicit:[Zs(),el()],explicit:[rl(),il(),sl(),cl()]})});var ul=S((OC,dl)=>{"use strict";var wf=B();function Sf(){return!0}function Tf(){}function Cf(){return""}function Pf(e){return typeof e>"u"}dl.exports=new wf("tag:yaml.org,2002:js/undefined",{kind:"scalar",resolve:Sf,construct:Tf,predicate:Pf,represent:Cf})});var hl=S((BC,gl)=>{"use strict";var Ef=B();function Mf(e){if(e===null||e.length===0)return!1;var t=e,n=/\/([gim]*)$/.exec(e),r="";return!(t[0]==="/"&&(n&&(r=n[1]),r.length>3||t[t.length-r.length-1]!=="/"))}function Lf(e){var t=e,n=/\/([gim]*)$/.exec(e),r="";return t[0]==="/"&&(n&&(r=n[1]),t=t.slice(1,t.length-r.length-1)),new RegExp(t,r)}function Af(e){var t="/"+e.source+"/";return e.global&&(t+="g"),e.multiline&&(t+="m"),e.ignoreCase&&(t+="i"),t}function Rf(e){return Object.prototype.toString.call(e)==="[object RegExp]"}gl.exports=new Ef("tag:yaml.org,2002:js/regexp",{kind:"scalar",resolve:Mf,construct:Lf,predicate:Rf,represent:Af})});var bl=S((NC,fl)=>{"use strict";var Sn;try{ml=Ht,Sn=ml("esprima")}catch{typeof window<"u"&&(Sn=window.esprima)}var ml,Hf=B();function If(e){if(e===null)return!1;try{var t="("+e+")",n=Sn.parse(t,{range:!0});return!(n.type!=="Program"||n.body.length!==1||n.body[0].type!=="ExpressionStatement"||n.body[0].expression.type!=="ArrowFunctionExpression"&&n.body[0].expression.type!=="FunctionExpression")}catch{return!1}}function Df(e){var t="("+e+")",n=Sn.parse(t,{range:!0}),r=[],o;if(n.type!=="Program"||n.body.length!==1||n.body[0].type!=="ExpressionStatement"||n.body[0].expression.type!=="ArrowFunctionExpression"&&n.body[0].expression.type!=="FunctionExpression")throw new Error("Failed to resolve function");return n.body[0].expression.params.forEach(function(i){r.push(i.name)}),o=n.body[0].expression.body.range,n.body[0].expression.body.type==="BlockStatement"?new Function(r,t.slice(o[0]+1,o[1]-1)):new Function(r,"return "+t.slice(o[0],o[1]))}function zf(e){return e.toString()}function Ff(e){return Object.prototype.toString.call(e)==="[object Function]"}fl.exports=new Hf("tag:yaml.org,2002:js/function",{kind:"scalar",resolve:If,construct:Df,predicate:Ff,represent:zf})});var Pt=S((jC,vl)=>{"use strict";var xl=qe();vl.exports=xl.DEFAULT=new xl({include:[nt()],explicit:[ul(),hl(),bl()]})});var Nl=S((qC,Et)=>{"use strict";var pe=je(),Pl=et(),Of=Ps(),El=nt(),Bf=Pt(),we=Object.prototype.hasOwnProperty,Tn=1,Ml=2,Ll=3,Cn=4,bo=1,Nf=2,yl=3,Wf=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,jf=/[\x85\u2028\u2029]/,qf=/[,\[\]\{\}]/,Al=/^(?:!|!!|![a-z\-]+!)$/i,Rl=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function kl(e){return Object.prototype.toString.call(e)}function ne(e){return e===10||e===13}function Ue(e){return e===9||e===32}function K(e){return e===9||e===32||e===10||e===13}function rt(e){return e===44||e===91||e===93||e===123||e===125}function _f(e){var t;return 48<=e&&e<=57?e-48:(t=e|32,97<=t&&t<=102?t-97+10:-1)}function $f(e){return e===120?2:e===117?4:e===85?8:0}function Uf(e){return 48<=e&&e<=57?e-48:-1}function wl(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"\x85":e===95?"\xA0":e===76?"\u2028":e===80?"\u2029":""}function Vf(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function Hl(e,t,n){t==="__proto__"?Object.defineProperty(e,t,{configurable:!0,enumerable:!0,writable:!0,value:n}):e[t]=n}var Il=new Array(256),Dl=new Array(256);for($e=0;$e<256;$e++)Il[$e]=wl($e)?1:0,Dl[$e]=wl($e);var $e;function Gf(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||Bf,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.json=t.json||!1,this.listener=t.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.documents=[]}function zl(e,t){return new Pl(t,new Of(e.filename,e.input,e.position,e.line,e.position-e.lineStart))}function w(e,t){throw zl(e,t)}function Pn(e,t){e.onWarning&&e.onWarning.call(null,zl(e,t))}var Sl={YAML:function(t,n,r){var o,i,a;t.version!==null&&w(t,"duplication of %YAML directive"),r.length!==1&&w(t,"YAML directive accepts exactly one argument"),o=/^([0-9]+)\.([0-9]+)$/.exec(r[0]),o===null&&w(t,"ill-formed argument of the YAML directive"),i=parseInt(o[1],10),a=parseInt(o[2],10),i!==1&&w(t,"unacceptable YAML version of the document"),t.version=r[0],t.checkLineBreaks=a<2,a!==1&&a!==2&&Pn(t,"unsupported YAML version of the document")},TAG:function(t,n,r){var o,i;r.length!==2&&w(t,"TAG directive accepts exactly two arguments"),o=r[0],i=r[1],Al.test(o)||w(t,"ill-formed tag handle (first argument) of the TAG directive"),we.call(t.tagMap,o)&&w(t,'there is a previously declared suffix for "'+o+'" tag handle'),Rl.test(i)||w(t,"ill-formed tag prefix (second argument) of the TAG directive"),t.tagMap[o]=i}};function ke(e,t,n,r){var o,i,a,s;if(t<n){if(s=e.input.slice(t,n),r)for(o=0,i=s.length;o<i;o+=1)a=s.charCodeAt(o),a===9||32<=a&&a<=1114111||w(e,"expected valid JSON character");else Wf.test(s)&&w(e,"the stream contains non-printable characters");e.result+=s}}function Tl(e,t,n,r){var o,i,a,s;for(pe.isObject(n)||w(e,"cannot merge mappings; the provided source object is unacceptable"),o=Object.keys(n),a=0,s=o.length;a<s;a+=1)i=o[a],we.call(t,i)||(Hl(t,i,n[i]),r[i]=!0)}function ot(e,t,n,r,o,i,a,s){var p,c;if(Array.isArray(o))for(o=Array.prototype.slice.call(o),p=0,c=o.length;p<c;p+=1)Array.isArray(o[p])&&w(e,"nested arrays are not supported inside keys"),typeof o=="object"&&kl(o[p])==="[object Object]"&&(o[p]="[object Object]");if(typeof o=="object"&&kl(o)==="[object Object]"&&(o="[object Object]"),o=String(o),t===null&&(t={}),r==="tag:yaml.org,2002:merge")if(Array.isArray(i))for(p=0,c=i.length;p<c;p+=1)Tl(e,t,i[p],n);else Tl(e,t,i,n);else!e.json&&!we.call(n,o)&&we.call(t,o)&&(e.line=a||e.line,e.position=s||e.position,w(e,"duplicated mapping key")),Hl(t,o,i),delete n[o];return t}function xo(e){var t;t=e.input.charCodeAt(e.position),t===10?e.position++:t===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):w(e,"a line break is expected"),e.line+=1,e.lineStart=e.position}function z(e,t,n){for(var r=0,o=e.input.charCodeAt(e.position);o!==0;){for(;Ue(o);)o=e.input.charCodeAt(++e.position);if(t&&o===35)do o=e.input.charCodeAt(++e.position);while(o!==10&&o!==13&&o!==0);if(ne(o))for(xo(e),o=e.input.charCodeAt(e.position),r++,e.lineIndent=0;o===32;)e.lineIndent++,o=e.input.charCodeAt(++e.position);else break}return n!==-1&&r!==0&&e.lineIndent<n&&Pn(e,"deficient indentation"),r}function En(e){var t=e.position,n;return n=e.input.charCodeAt(t),!!((n===45||n===46)&&n===e.input.charCodeAt(t+1)&&n===e.input.charCodeAt(t+2)&&(t+=3,n=e.input.charCodeAt(t),n===0||K(n)))}function vo(e,t){t===1?e.result+=" ":t>1&&(e.result+=pe.repeat(`
`,t-1))}function Yf(e,t,n){var r,o,i,a,s,p,c,d,u=e.kind,g=e.result,h;if(h=e.input.charCodeAt(e.position),K(h)||rt(h)||h===35||h===38||h===42||h===33||h===124||h===62||h===39||h===34||h===37||h===64||h===96||(h===63||h===45)&&(o=e.input.charCodeAt(e.position+1),K(o)||n&&rt(o)))return!1;for(e.kind="scalar",e.result="",i=a=e.position,s=!1;h!==0;){if(h===58){if(o=e.input.charCodeAt(e.position+1),K(o)||n&&rt(o))break}else if(h===35){if(r=e.input.charCodeAt(e.position-1),K(r))break}else{if(e.position===e.lineStart&&En(e)||n&&rt(h))break;if(ne(h))if(p=e.line,c=e.lineStart,d=e.lineIndent,z(e,!1,-1),e.lineIndent>=t){s=!0,h=e.input.charCodeAt(e.position);continue}else{e.position=a,e.line=p,e.lineStart=c,e.lineIndent=d;break}}s&&(ke(e,i,a,!1),vo(e,e.line-p),i=a=e.position,s=!1),Ue(h)||(a=e.position+1),h=e.input.charCodeAt(++e.position)}return ke(e,i,a,!1),e.result?!0:(e.kind=u,e.result=g,!1)}function Jf(e,t){var n,r,o;if(n=e.input.charCodeAt(e.position),n!==39)return!1;for(e.kind="scalar",e.result="",e.position++,r=o=e.position;(n=e.input.charCodeAt(e.position))!==0;)if(n===39)if(ke(e,r,e.position,!0),n=e.input.charCodeAt(++e.position),n===39)r=e.position,e.position++,o=e.position;else return!0;else ne(n)?(ke(e,r,o,!0),vo(e,z(e,!1,t)),r=o=e.position):e.position===e.lineStart&&En(e)?w(e,"unexpected end of the document within a single quoted scalar"):(e.position++,o=e.position);w(e,"unexpected end of the stream within a single quoted scalar")}function Kf(e,t){var n,r,o,i,a,s;if(s=e.input.charCodeAt(e.position),s!==34)return!1;for(e.kind="scalar",e.result="",e.position++,n=r=e.position;(s=e.input.charCodeAt(e.position))!==0;){if(s===34)return ke(e,n,e.position,!0),e.position++,!0;if(s===92){if(ke(e,n,e.position,!0),s=e.input.charCodeAt(++e.position),ne(s))z(e,!1,t);else if(s<256&&Il[s])e.result+=Dl[s],e.position++;else if((a=$f(s))>0){for(o=a,i=0;o>0;o--)s=e.input.charCodeAt(++e.position),(a=_f(s))>=0?i=(i<<4)+a:w(e,"expected hexadecimal character");e.result+=Vf(i),e.position++}else w(e,"unknown escape sequence");n=r=e.position}else ne(s)?(ke(e,n,r,!0),vo(e,z(e,!1,t)),n=r=e.position):e.position===e.lineStart&&En(e)?w(e,"unexpected end of the document within a double quoted scalar"):(e.position++,r=e.position)}w(e,"unexpected end of the stream within a double quoted scalar")}function Xf(e,t){var n=!0,r,o=e.tag,i,a=e.anchor,s,p,c,d,u,g={},h,b,x,v;if(v=e.input.charCodeAt(e.position),v===91)p=93,u=!1,i=[];else if(v===123)p=125,u=!0,i={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=i),v=e.input.charCodeAt(++e.position);v!==0;){if(z(e,!0,t),v=e.input.charCodeAt(e.position),v===p)return e.position++,e.tag=o,e.anchor=a,e.kind=u?"mapping":"sequence",e.result=i,!0;n||w(e,"missed comma between flow collection entries"),b=h=x=null,c=d=!1,v===63&&(s=e.input.charCodeAt(e.position+1),K(s)&&(c=d=!0,e.position++,z(e,!0,t))),r=e.line,it(e,t,Tn,!1,!0),b=e.tag,h=e.result,z(e,!0,t),v=e.input.charCodeAt(e.position),(d||e.line===r)&&v===58&&(c=!0,v=e.input.charCodeAt(++e.position),z(e,!0,t),it(e,t,Tn,!1,!0),x=e.result),u?ot(e,i,g,b,h,x):c?i.push(ot(e,null,g,b,h,x)):i.push(h),z(e,!0,t),v=e.input.charCodeAt(e.position),v===44?(n=!0,v=e.input.charCodeAt(++e.position)):n=!1}w(e,"unexpected end of the stream within a flow collection")}function Zf(e,t){var n,r,o=bo,i=!1,a=!1,s=t,p=0,c=!1,d,u;if(u=e.input.charCodeAt(e.position),u===124)r=!1;else if(u===62)r=!0;else return!1;for(e.kind="scalar",e.result="";u!==0;)if(u=e.input.charCodeAt(++e.position),u===43||u===45)bo===o?o=u===43?yl:Nf:w(e,"repeat of a chomping mode identifier");else if((d=Uf(u))>=0)d===0?w(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):a?w(e,"repeat of an indentation width identifier"):(s=t+d-1,a=!0);else break;if(Ue(u)){do u=e.input.charCodeAt(++e.position);while(Ue(u));if(u===35)do u=e.input.charCodeAt(++e.position);while(!ne(u)&&u!==0)}for(;u!==0;){for(xo(e),e.lineIndent=0,u=e.input.charCodeAt(e.position);(!a||e.lineIndent<s)&&u===32;)e.lineIndent++,u=e.input.charCodeAt(++e.position);if(!a&&e.lineIndent>s&&(s=e.lineIndent),ne(u)){p++;continue}if(e.lineIndent<s){o===yl?e.result+=pe.repeat(`
`,i?1+p:p):o===bo&&i&&(e.result+=`
`);break}for(r?Ue(u)?(c=!0,e.result+=pe.repeat(`
`,i?1+p:p)):c?(c=!1,e.result+=pe.repeat(`
`,p+1)):p===0?i&&(e.result+=" "):e.result+=pe.repeat(`
`,p):e.result+=pe.repeat(`
`,i?1+p:p),i=!0,a=!0,p=0,n=e.position;!ne(u)&&u!==0;)u=e.input.charCodeAt(++e.position);ke(e,n,e.position,!1)}return!0}function Cl(e,t){var n,r=e.tag,o=e.anchor,i=[],a,s=!1,p;for(e.anchor!==null&&(e.anchorMap[e.anchor]=i),p=e.input.charCodeAt(e.position);p!==0&&!(p!==45||(a=e.input.charCodeAt(e.position+1),!K(a)));){if(s=!0,e.position++,z(e,!0,-1)&&e.lineIndent<=t){i.push(null),p=e.input.charCodeAt(e.position);continue}if(n=e.line,it(e,t,Ll,!1,!0),i.push(e.result),z(e,!0,-1),p=e.input.charCodeAt(e.position),(e.line===n||e.lineIndent>t)&&p!==0)w(e,"bad indentation of a sequence entry");else if(e.lineIndent<t)break}return s?(e.tag=r,e.anchor=o,e.kind="sequence",e.result=i,!0):!1}function Qf(e,t,n){var r,o,i,a,s=e.tag,p=e.anchor,c={},d={},u=null,g=null,h=null,b=!1,x=!1,v;for(e.anchor!==null&&(e.anchorMap[e.anchor]=c),v=e.input.charCodeAt(e.position);v!==0;){if(r=e.input.charCodeAt(e.position+1),i=e.line,a=e.position,(v===63||v===58)&&K(r))v===63?(b&&(ot(e,c,d,u,g,null),u=g=h=null),x=!0,b=!0,o=!0):b?(b=!1,o=!0):w(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,v=r;else if(it(e,n,Ml,!1,!0))if(e.line===i){for(v=e.input.charCodeAt(e.position);Ue(v);)v=e.input.charCodeAt(++e.position);if(v===58)v=e.input.charCodeAt(++e.position),K(v)||w(e,"a whitespace character is expected after the key-value separator within a block mapping"),b&&(ot(e,c,d,u,g,null),u=g=h=null),x=!0,b=!1,o=!1,u=e.tag,g=e.result;else if(x)w(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=s,e.anchor=p,!0}else if(x)w(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=s,e.anchor=p,!0;else break;if((e.line===i||e.lineIndent>t)&&(it(e,t,Cn,!0,o)&&(b?g=e.result:h=e.result),b||(ot(e,c,d,u,g,h,i,a),u=g=h=null),z(e,!0,-1),v=e.input.charCodeAt(e.position)),e.lineIndent>t&&v!==0)w(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return b&&ot(e,c,d,u,g,null),x&&(e.tag=s,e.anchor=p,e.kind="mapping",e.result=c),x}function eb(e){var t,n=!1,r=!1,o,i,a;if(a=e.input.charCodeAt(e.position),a!==33)return!1;if(e.tag!==null&&w(e,"duplication of a tag property"),a=e.input.charCodeAt(++e.position),a===60?(n=!0,a=e.input.charCodeAt(++e.position)):a===33?(r=!0,o="!!",a=e.input.charCodeAt(++e.position)):o="!",t=e.position,n){do a=e.input.charCodeAt(++e.position);while(a!==0&&a!==62);e.position<e.length?(i=e.input.slice(t,e.position),a=e.input.charCodeAt(++e.position)):w(e,"unexpected end of the stream within a verbatim tag")}else{for(;a!==0&&!K(a);)a===33&&(r?w(e,"tag suffix cannot contain exclamation marks"):(o=e.input.slice(t-1,e.position+1),Al.test(o)||w(e,"named tag handle cannot contain such characters"),r=!0,t=e.position+1)),a=e.input.charCodeAt(++e.position);i=e.input.slice(t,e.position),qf.test(i)&&w(e,"tag suffix cannot contain flow indicator characters")}return i&&!Rl.test(i)&&w(e,"tag name cannot contain such characters: "+i),n?e.tag=i:we.call(e.tagMap,o)?e.tag=e.tagMap[o]+i:o==="!"?e.tag="!"+i:o==="!!"?e.tag="tag:yaml.org,2002:"+i:w(e,'undeclared tag handle "'+o+'"'),!0}function tb(e){var t,n;if(n=e.input.charCodeAt(e.position),n!==38)return!1;for(e.anchor!==null&&w(e,"duplication of an anchor property"),n=e.input.charCodeAt(++e.position),t=e.position;n!==0&&!K(n)&&!rt(n);)n=e.input.charCodeAt(++e.position);return e.position===t&&w(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(t,e.position),!0}function nb(e){var t,n,r;if(r=e.input.charCodeAt(e.position),r!==42)return!1;for(r=e.input.charCodeAt(++e.position),t=e.position;r!==0&&!K(r)&&!rt(r);)r=e.input.charCodeAt(++e.position);return e.position===t&&w(e,"name of an alias node must contain at least one character"),n=e.input.slice(t,e.position),we.call(e.anchorMap,n)||w(e,'unidentified alias "'+n+'"'),e.result=e.anchorMap[n],z(e,!0,-1),!0}function it(e,t,n,r,o){var i,a,s,p=1,c=!1,d=!1,u,g,h,b,x;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,i=a=s=Cn===n||Ll===n,r&&z(e,!0,-1)&&(c=!0,e.lineIndent>t?p=1:e.lineIndent===t?p=0:e.lineIndent<t&&(p=-1)),p===1)for(;eb(e)||tb(e);)z(e,!0,-1)?(c=!0,s=i,e.lineIndent>t?p=1:e.lineIndent===t?p=0:e.lineIndent<t&&(p=-1)):s=!1;if(s&&(s=c||o),(p===1||Cn===n)&&(Tn===n||Ml===n?b=t:b=t+1,x=e.position-e.lineStart,p===1?s&&(Cl(e,x)||Qf(e,x,b))||Xf(e,b)?d=!0:(a&&Zf(e,b)||Jf(e,b)||Kf(e,b)?d=!0:nb(e)?(d=!0,(e.tag!==null||e.anchor!==null)&&w(e,"alias node should not have any properties")):Yf(e,b,Tn===n)&&(d=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):p===0&&(d=s&&Cl(e,x))),e.tag!==null&&e.tag!=="!")if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&w(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),u=0,g=e.implicitTypes.length;u<g;u+=1)if(h=e.implicitTypes[u],h.resolve(e.result)){e.result=h.construct(e.result),e.tag=h.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else we.call(e.typeMap[e.kind||"fallback"],e.tag)?(h=e.typeMap[e.kind||"fallback"][e.tag],e.result!==null&&h.kind!==e.kind&&w(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+h.kind+'", not "'+e.kind+'"'),h.resolve(e.result)?(e.result=h.construct(e.result),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):w(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")):w(e,"unknown tag !<"+e.tag+">");return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||d}function rb(e){var t=e.position,n,r,o,i=!1,a;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap={},e.anchorMap={};(a=e.input.charCodeAt(e.position))!==0&&(z(e,!0,-1),a=e.input.charCodeAt(e.position),!(e.lineIndent>0||a!==37));){for(i=!0,a=e.input.charCodeAt(++e.position),n=e.position;a!==0&&!K(a);)a=e.input.charCodeAt(++e.position);for(r=e.input.slice(n,e.position),o=[],r.length<1&&w(e,"directive name must not be less than one character in length");a!==0;){for(;Ue(a);)a=e.input.charCodeAt(++e.position);if(a===35){do a=e.input.charCodeAt(++e.position);while(a!==0&&!ne(a));break}if(ne(a))break;for(n=e.position;a!==0&&!K(a);)a=e.input.charCodeAt(++e.position);o.push(e.input.slice(n,e.position))}a!==0&&xo(e),we.call(Sl,r)?Sl[r](e,r,o):Pn(e,'unknown document directive "'+r+'"')}if(z(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,z(e,!0,-1)):i&&w(e,"directives end mark is expected"),it(e,e.lineIndent-1,Cn,!1,!0),z(e,!0,-1),e.checkLineBreaks&&jf.test(e.input.slice(t,e.position))&&Pn(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&En(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,z(e,!0,-1));return}if(e.position<e.length-1)w(e,"end of the stream or a document separator is expected");else return}function Fl(e,t){e=String(e),t=t||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var n=new Gf(e,t),r=e.indexOf("\0");for(r!==-1&&(n.position=r,w(n,"null byte is not allowed in input")),n.input+="\0";n.input.charCodeAt(n.position)===32;)n.lineIndent+=1,n.position+=1;for(;n.position<n.length-1;)rb(n);return n.documents}function Ol(e,t,n){t!==null&&typeof t=="object"&&typeof n>"u"&&(n=t,t=null);var r=Fl(e,n);if(typeof t!="function")return r;for(var o=0,i=r.length;o<i;o+=1)t(r[o])}function Bl(e,t){var n=Fl(e,t);if(n.length!==0){if(n.length===1)return n[0];throw new Pl("expected a single document in the stream, but found more")}}function ob(e,t,n){return typeof t=="object"&&t!==null&&typeof n>"u"&&(n=t,t=null),Ol(e,t,pe.extend({schema:El},n))}function ib(e,t){return Bl(e,pe.extend({schema:El},t))}Et.exports.loadAll=Ol;Et.exports.load=Bl;Et.exports.safeLoadAll=ob;Et.exports.safeLoad=ib});var lc=S((_C,So)=>{"use strict";var Lt=je(),At=et(),ab=Pt(),sb=nt(),Gl=Object.prototype.toString,Yl=Object.prototype.hasOwnProperty,lb=9,Mt=10,cb=13,pb=32,db=33,ub=34,Jl=35,gb=37,hb=38,mb=39,fb=42,Kl=44,bb=45,Xl=58,xb=61,vb=62,yb=63,kb=64,Zl=91,Ql=93,wb=96,ec=123,Sb=124,tc=125,j={};j[0]="\\0";j[7]="\\a";j[8]="\\b";j[9]="\\t";j[10]="\\n";j[11]="\\v";j[12]="\\f";j[13]="\\r";j[27]="\\e";j[34]='\\"';j[92]="\\\\";j[133]="\\N";j[160]="\\_";j[8232]="\\L";j[8233]="\\P";var Tb=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"];function Cb(e,t){var n,r,o,i,a,s,p;if(t===null)return{};for(n={},r=Object.keys(t),o=0,i=r.length;o<i;o+=1)a=r[o],s=String(t[a]),a.slice(0,2)==="!!"&&(a="tag:yaml.org,2002:"+a.slice(2)),p=e.compiledTypeMap.fallback[a],p&&Yl.call(p.styleAliases,s)&&(s=p.styleAliases[s]),n[a]=s;return n}function Wl(e){var t,n,r;if(t=e.toString(16).toUpperCase(),e<=255)n="x",r=2;else if(e<=65535)n="u",r=4;else if(e<=4294967295)n="U",r=8;else throw new At("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+n+Lt.repeat("0",r-t.length)+t}function Pb(e){this.schema=e.schema||ab,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=Lt.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=Cb(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function jl(e,t){for(var n=Lt.repeat(" ",t),r=0,o=-1,i="",a,s=e.length;r<s;)o=e.indexOf(`
`,r),o===-1?(a=e.slice(r),r=s):(a=e.slice(r,o+1),r=o+1),a.length&&a!==`
`&&(i+=n),i+=a;return i}function yo(e,t){return`
`+Lt.repeat(" ",e.indent*t)}function Eb(e,t){var n,r,o;for(n=0,r=e.implicitTypes.length;n<r;n+=1)if(o=e.implicitTypes[n],o.resolve(t))return!0;return!1}function wo(e){return e===pb||e===lb}function at(e){return 32<=e&&e<=126||161<=e&&e<=55295&&e!==8232&&e!==8233||57344<=e&&e<=65533&&e!==65279||65536<=e&&e<=1114111}function Mb(e){return at(e)&&!wo(e)&&e!==65279&&e!==cb&&e!==Mt}function ql(e,t){return at(e)&&e!==65279&&e!==Kl&&e!==Zl&&e!==Ql&&e!==ec&&e!==tc&&e!==Xl&&(e!==Jl||t&&Mb(t))}function Lb(e){return at(e)&&e!==65279&&!wo(e)&&e!==bb&&e!==yb&&e!==Xl&&e!==Kl&&e!==Zl&&e!==Ql&&e!==ec&&e!==tc&&e!==Jl&&e!==hb&&e!==fb&&e!==db&&e!==Sb&&e!==xb&&e!==vb&&e!==mb&&e!==ub&&e!==gb&&e!==kb&&e!==wb}function nc(e){var t=/^\n* /;return t.test(e)}var rc=1,oc=2,ic=3,ac=4,Mn=5;function Ab(e,t,n,r,o){var i,a,s,p=!1,c=!1,d=r!==-1,u=-1,g=Lb(e.charCodeAt(0))&&!wo(e.charCodeAt(e.length-1));if(t)for(i=0;i<e.length;i++){if(a=e.charCodeAt(i),!at(a))return Mn;s=i>0?e.charCodeAt(i-1):null,g=g&&ql(a,s)}else{for(i=0;i<e.length;i++){if(a=e.charCodeAt(i),a===Mt)p=!0,d&&(c=c||i-u-1>r&&e[u+1]!==" ",u=i);else if(!at(a))return Mn;s=i>0?e.charCodeAt(i-1):null,g=g&&ql(a,s)}c=c||d&&i-u-1>r&&e[u+1]!==" "}return!p&&!c?g&&!o(e)?rc:oc:n>9&&nc(e)?Mn:c?ac:ic}function Rb(e,t,n,r){e.dump=function(){if(t.length===0)return"''";if(!e.noCompatMode&&Tb.indexOf(t)!==-1)return"'"+t+"'";var o=e.indent*Math.max(1,n),i=e.lineWidth===-1?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-o),a=r||e.flowLevel>-1&&n>=e.flowLevel;function s(p){return Eb(e,p)}switch(Ab(t,a,e.indent,i,s)){case rc:return t;case oc:return"'"+t.replace(/'/g,"''")+"'";case ic:return"|"+_l(t,e.indent)+$l(jl(t,o));case ac:return">"+_l(t,e.indent)+$l(jl(Hb(t,i),o));case Mn:return'"'+Ib(t,i)+'"';default:throw new At("impossible error: invalid scalar style")}}()}function _l(e,t){var n=nc(e)?String(t):"",r=e[e.length-1]===`
`,o=r&&(e[e.length-2]===`
`||e===`
`),i=o?"+":r?"":"-";return n+i+`
`}function $l(e){return e[e.length-1]===`
`?e.slice(0,-1):e}function Hb(e,t){for(var n=/(\n+)([^\n]*)/g,r=function(){var c=e.indexOf(`
`);return c=c!==-1?c:e.length,n.lastIndex=c,Ul(e.slice(0,c),t)}(),o=e[0]===`
`||e[0]===" ",i,a;a=n.exec(e);){var s=a[1],p=a[2];i=p[0]===" ",r+=s+(!o&&!i&&p!==""?`
`:"")+Ul(p,t),o=i}return r}function Ul(e,t){if(e===""||e[0]===" ")return e;for(var n=/ [^ ]/g,r,o=0,i,a=0,s=0,p="";r=n.exec(e);)s=r.index,s-o>t&&(i=a>o?a:s,p+=`
`+e.slice(o,i),o=i+1),a=s;return p+=`
`,e.length-o>t&&a>o?p+=e.slice(o,a)+`
`+e.slice(a+1):p+=e.slice(o),p.slice(1)}function Ib(e){for(var t="",n,r,o,i=0;i<e.length;i++){if(n=e.charCodeAt(i),n>=55296&&n<=56319&&(r=e.charCodeAt(i+1),r>=56320&&r<=57343)){t+=Wl((n-55296)*1024+r-56320+65536),i++;continue}o=j[n],t+=!o&&at(n)?e[i]:o||Wl(n)}return t}function Db(e,t,n){var r="",o=e.tag,i,a;for(i=0,a=n.length;i<a;i+=1)Ve(e,t,n[i],!1,!1)&&(i!==0&&(r+=","+(e.condenseFlow?"":" ")),r+=e.dump);e.tag=o,e.dump="["+r+"]"}function zb(e,t,n,r){var o="",i=e.tag,a,s;for(a=0,s=n.length;a<s;a+=1)Ve(e,t+1,n[a],!0,!0)&&((!r||a!==0)&&(o+=yo(e,t)),e.dump&&Mt===e.dump.charCodeAt(0)?o+="-":o+="- ",o+=e.dump);e.tag=i,e.dump=o||"[]"}function Fb(e,t,n){var r="",o=e.tag,i=Object.keys(n),a,s,p,c,d;for(a=0,s=i.length;a<s;a+=1)d="",a!==0&&(d+=", "),e.condenseFlow&&(d+='"'),p=i[a],c=n[p],Ve(e,t,p,!1,!1)&&(e.dump.length>1024&&(d+="? "),d+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),Ve(e,t,c,!1,!1)&&(d+=e.dump,r+=d));e.tag=o,e.dump="{"+r+"}"}function Ob(e,t,n,r){var o="",i=e.tag,a=Object.keys(n),s,p,c,d,u,g;if(e.sortKeys===!0)a.sort();else if(typeof e.sortKeys=="function")a.sort(e.sortKeys);else if(e.sortKeys)throw new At("sortKeys must be a boolean or a function");for(s=0,p=a.length;s<p;s+=1)g="",(!r||s!==0)&&(g+=yo(e,t)),c=a[s],d=n[c],Ve(e,t+1,c,!0,!0,!0)&&(u=e.tag!==null&&e.tag!=="?"||e.dump&&e.dump.length>1024,u&&(e.dump&&Mt===e.dump.charCodeAt(0)?g+="?":g+="? "),g+=e.dump,u&&(g+=yo(e,t)),Ve(e,t+1,d,!0,u)&&(e.dump&&Mt===e.dump.charCodeAt(0)?g+=":":g+=": ",g+=e.dump,o+=g));e.tag=i,e.dump=o||"{}"}function Vl(e,t,n){var r,o,i,a,s,p;for(o=n?e.explicitTypes:e.implicitTypes,i=0,a=o.length;i<a;i+=1)if(s=o[i],(s.instanceOf||s.predicate)&&(!s.instanceOf||typeof t=="object"&&t instanceof s.instanceOf)&&(!s.predicate||s.predicate(t))){if(e.tag=n?s.tag:"?",s.represent){if(p=e.styleMap[s.tag]||s.defaultStyle,Gl.call(s.represent)==="[object Function]")r=s.represent(t,p);else if(Yl.call(s.represent,p))r=s.represent[p](t,p);else throw new At("!<"+s.tag+'> tag resolver accepts not "'+p+'" style');e.dump=r}return!0}return!1}function Ve(e,t,n,r,o,i){e.tag=null,e.dump=n,Vl(e,n,!1)||Vl(e,n,!0);var a=Gl.call(e.dump);r&&(r=e.flowLevel<0||e.flowLevel>t);var s=a==="[object Object]"||a==="[object Array]",p,c;if(s&&(p=e.duplicates.indexOf(n),c=p!==-1),(e.tag!==null&&e.tag!=="?"||c||e.indent!==2&&t>0)&&(o=!1),c&&e.usedDuplicates[p])e.dump="*ref_"+p;else{if(s&&c&&!e.usedDuplicates[p]&&(e.usedDuplicates[p]=!0),a==="[object Object]")r&&Object.keys(e.dump).length!==0?(Ob(e,t,e.dump,o),c&&(e.dump="&ref_"+p+e.dump)):(Fb(e,t,e.dump),c&&(e.dump="&ref_"+p+" "+e.dump));else if(a==="[object Array]"){var d=e.noArrayIndent&&t>0?t-1:t;r&&e.dump.length!==0?(zb(e,d,e.dump,o),c&&(e.dump="&ref_"+p+e.dump)):(Db(e,d,e.dump),c&&(e.dump="&ref_"+p+" "+e.dump))}else if(a==="[object String]")e.tag!=="?"&&Rb(e,e.dump,t,i);else{if(e.skipInvalid)return!1;throw new At("unacceptable kind of an object to dump "+a)}e.tag!==null&&e.tag!=="?"&&(e.dump="!<"+e.tag+"> "+e.dump)}return!0}function Bb(e,t){var n=[],r=[],o,i;for(ko(e,n,r),o=0,i=r.length;o<i;o+=1)t.duplicates.push(n[r[o]]);t.usedDuplicates=new Array(i)}function ko(e,t,n){var r,o,i;if(e!==null&&typeof e=="object")if(o=t.indexOf(e),o!==-1)n.indexOf(o)===-1&&n.push(o);else if(t.push(e),Array.isArray(e))for(o=0,i=e.length;o<i;o+=1)ko(e[o],t,n);else for(r=Object.keys(e),o=0,i=r.length;o<i;o+=1)ko(e[r[o]],t,n)}function sc(e,t){t=t||{};var n=new Pb(t);return n.noRefs||Bb(e,n),Ve(n,0,e,!0,!0)?n.dump+`
`:""}function Nb(e,t){return sc(e,Lt.extend({schema:sb},t))}So.exports.dump=sc;So.exports.safeDump=Nb});var pc=S(($C,I)=>{"use strict";var Ln=Nl(),cc=lc();function An(e){return function(){throw new Error("Function "+e+" is deprecated and cannot be used.")}}I.exports.Type=B();I.exports.Schema=qe();I.exports.FAILSAFE_SCHEMA=wn();I.exports.JSON_SCHEMA=ho();I.exports.CORE_SCHEMA=mo();I.exports.DEFAULT_SAFE_SCHEMA=nt();I.exports.DEFAULT_FULL_SCHEMA=Pt();I.exports.load=Ln.load;I.exports.loadAll=Ln.loadAll;I.exports.safeLoad=Ln.safeLoad;I.exports.safeLoadAll=Ln.safeLoadAll;I.exports.dump=cc.dump;I.exports.safeDump=cc.safeDump;I.exports.YAMLException=et();I.exports.MINIMAL_SCHEMA=wn();I.exports.SAFE_SCHEMA=nt();I.exports.DEFAULT_SCHEMA=Pt();I.exports.scan=An("scan");I.exports.parse=An("parse");I.exports.compose=An("compose");I.exports.addConstructor=An("addConstructor")});var uc=S((UC,dc)=>{"use strict";var Wb=pc();dc.exports=Wb});var To=S((exports,module)=>{"use strict";var yaml=uc(),engines=exports=module.exports;engines.yaml={parse:yaml.safeLoad.bind(yaml),stringify:yaml.safeDump.bind(yaml)};engines.json={parse:JSON.parse.bind(JSON),stringify:function(e,t){let n=Object.assign({replacer:null,space:2},t);return JSON.stringify(e,n.replacer,n.space)}};engines.javascript={parse:function parse(str,options,wrap){try{return wrap!==!1&&(str=`(function() {
return `+str.trim()+`;
}());`),eval(str)||{}}catch(e){if(wrap!==!1&&/(unexpected|identifier)/i.test(e.message))return parse(str,options,!1);throw new SyntaxError(e)}},stringify:function(){throw new Error("stringifying JavaScript is not supported")}}});var hc=S((VC,gc)=>{"use strict";gc.exports=function(e){return typeof e=="string"&&e.charAt(0)==="\uFEFF"?e.slice(1):e}});var Rn=S(de=>{"use strict";var mc=hc(),fc=Tt();de.define=function(e,t,n){Reflect.defineProperty(e,t,{enumerable:!1,configurable:!0,writable:!0,value:n})};de.isBuffer=function(e){return fc(e)==="buffer"};de.isObject=function(e){return fc(e)==="object"};de.toBuffer=function(e){return typeof e=="string"?Buffer.from(e):e};de.toString=function(e){if(de.isBuffer(e))return mc(String(e));if(typeof e!="string")throw new TypeError("expected input to be a string or buffer");return mc(e)};de.arrayify=function(e){return e?Array.isArray(e)?e:[e]:[]};de.startsWith=function(e,t,n){return typeof n!="number"&&(n=t.length),e.slice(0,n)===t}});var Rt=S((YC,bc)=>{"use strict";var jb=To(),qb=Rn();bc.exports=function(e){let t=Object.assign({},e);return t.delimiters=qb.arrayify(t.delims||t.delimiters||"---"),t.delimiters.length===1&&t.delimiters.push(t.delimiters[0]),t.language=(t.language||t.lang||"yaml").toLowerCase(),t.engines=Object.assign({},jb,t.parsers,t.engines),t}});var Co=S((JC,xc)=>{"use strict";xc.exports=function(e,t){let n=t.engines[e]||t.engines[_b(e)];if(typeof n>"u")throw new Error('gray-matter engine "'+e+'" is not registered');return typeof n=="function"&&(n={parse:n}),n};function _b(e){switch(e.toLowerCase()){case"js":case"javascript":return"javascript";case"coffee":case"coffeescript":case"cson":return"coffee";case"yaml":case"yml":return"yaml";default:return e}}});var Po=S((KC,vc)=>{"use strict";var $b=Tt(),Ub=Co(),Vb=Rt();vc.exports=function(e,t,n){if(t==null&&n==null)switch($b(e)){case"object":t=e.data,n={};break;case"string":return e;default:throw new TypeError("expected file to be a string or object")}let r=e.content,o=Vb(n);if(t==null){if(!o.data)return e;t=o.data}let i=e.language||o.language,a=Ub(i,o);if(typeof a.stringify!="function")throw new TypeError('expected "'+i+'.stringify" to be a function');t=Object.assign({},e.data,t);let s=o.delimiters[0],p=o.delimiters[1],c=a.stringify(t,n).trim(),d="";return c!=="{}"&&(d=st(s)+st(c)+st(p)),typeof e.excerpt=="string"&&e.excerpt!==""&&r.indexOf(e.excerpt.trim())===-1&&(d+=st(e.excerpt)+st(p)),d+st(r)};function st(e){return e.slice(-1)!==`
`?e+`
`:e}});var kc=S((XC,yc)=>{"use strict";var Gb=Rt();yc.exports=function(e,t){let n=Gb(t);if(e.data==null&&(e.data={}),typeof n.excerpt=="function")return n.excerpt(e,n);let r=e.data.excerpt_separator||n.excerpt_separator;if(r==null&&(n.excerpt===!1||n.excerpt==null))return e;let o=typeof n.excerpt=="string"?n.excerpt:r||n.delimiters[0],i=e.content.indexOf(o);return i!==-1&&(e.excerpt=e.content.slice(0,i)),e}});var Tc=S((ZC,Sc)=>{"use strict";var wc=Tt(),Yb=Po(),lt=Rn();Sc.exports=function(e){return wc(e)!=="object"&&(e={content:e}),wc(e.data)!=="object"&&(e.data={}),e.contents&&e.content==null&&(e.content=e.contents),lt.define(e,"orig",lt.toBuffer(e.content)),lt.define(e,"language",e.language||""),lt.define(e,"matter",e.matter||""),lt.define(e,"stringify",function(t,n){return n&&n.language&&(e.language=n.language),Yb(e,t,n)}),e.content=lt.toString(e.content),e.isEmpty=!1,e.excerpt="",e}});var Pc=S((QC,Cc)=>{"use strict";var Jb=Co(),Kb=Rt();Cc.exports=function(e,t,n){let r=Kb(n),o=Jb(e,r);if(typeof o.parse!="function")throw new TypeError('expected "'+e+'.parse" to be a function');return o.parse(t,r)}});var Ac=S((e9,Lc)=>{"use strict";var Xb=ds(),Zb=ks(),Eo=Rt(),Qb=Po(),Ec=kc(),ex=To(),tx=Tc(),nx=Pc(),Mc=Rn();function Y(e,t){if(e==="")return{data:{},content:e,excerpt:"",orig:e};let n=tx(e),r=Y.cache[n.content];if(!t){if(r)return n=Object.assign({},r),n.orig=r.orig,n;Y.cache[n.content]=n}return rx(n,t)}function rx(e,t){let n=Eo(t),r=n.delimiters[0],o=`
`+n.delimiters[1],i=e.content;n.language&&(e.language=n.language);let a=r.length;if(!Mc.startsWith(i,r,a))return Ec(e,n),e;if(i.charAt(a)===r.slice(-1))return e;i=i.slice(a);let s=i.length,p=Y.language(i,n);p.name&&(e.language=p.name,i=i.slice(p.raw.length));let c=i.indexOf(o);return c===-1&&(c=s),e.matter=i.slice(0,c),e.matter.replace(/^\s*#[^\n]+/gm,"").trim()===""?(e.isEmpty=!0,e.empty=e.content,e.data={}):e.data=nx(e.language,e.matter,n),c===s?e.content="":(e.content=i.slice(c+o.length),e.content[0]==="\r"&&(e.content=e.content.slice(1)),e.content[0]===`
`&&(e.content=e.content.slice(1))),Ec(e,n),(n.sections===!0||typeof n.section=="function")&&Zb(e,n.section),e}Y.engines=ex;Y.stringify=function(e,t,n){return typeof e=="string"&&(e=Y(e,n)),Qb(e,t,n)};Y.read=function(e,t){let n=Xb.readFileSync(e,"utf8"),r=Y(n,t);return r.path=e,r};Y.test=function(e,t){return Mc.startsWith(e,Eo(t).delimiters[0])};Y.language=function(e,t){let r=Eo(t).delimiters[0];Y.test(e)&&(e=e.slice(r.length));let o=e.slice(0,e.search(/\r?\n/));return{raw:o,name:o?o.trim():""}};Y.cache={};Y.clearCache=function(){Y.cache={}};Lc.exports=Y});R();H();R();var _a=`<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>\r
    <path d='M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z' />\r
</svg>\r
`;R();var Oe={},$a=e=>{Oe.data=e},Ua=()=>Oe.data,Va=()=>Oe.sidebarScroll||0,gn=e=>{Oe.sidebarScroll=e};var Qe=()=>Oe.subDir||"",Ga=e=>{Oe.langs=e},Ya=()=>Oe.langs||[{title:"English",id:"en"},{title:"Chinese",id:"zh"}];function no(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ne=no();function es(e){Ne=e}var wt={exec:()=>null};function M(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let a=typeof i=="string"?i:i.source;return a=a.replace(G.caret,"$1"),n=n.replace(o,a),r},getRegex:()=>new RegExp(n,t)};return r}var G={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},ph=/^(?:[ \t]*(?:\n|$))+/,dh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,uh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,St=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,gh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ro=/(?:[*+-]|\d{1,9}[.)])/,ts=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ns=M(ts).replace(/bull/g,ro).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),hh=M(ts).replace(/bull/g,ro).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),oo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,mh=/^[^\n]+/,io=/(?!\s*\])(?:\\.|[^\[\]\\])+/,fh=M(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",io).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),bh=M(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ro).getRegex(),vn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ao=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,xh=M("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ao).replace("tag",vn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),rs=M(oo).replace("hr",St).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",vn).getRegex(),vh=M(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",rs).getRegex(),so={blockquote:vh,code:dh,def:fh,fences:uh,heading:gh,hr:St,html:xh,lheading:ns,list:bh,newline:ph,paragraph:rs,table:wt,text:mh},Ja=M("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",St).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",vn).getRegex(),yh={...so,lheading:hh,table:Ja,paragraph:M(oo).replace("hr",St).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ja).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",vn).getRegex()},kh={...so,html:M(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ao).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:wt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:M(oo).replace("hr",St).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ns).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},wh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Sh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,os=/^( {2,}|\\)\n(?!\s*$)/,Th=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,yn=/[\p{P}\p{S}]/u,lo=/[\s\p{P}\p{S}]/u,is=/[^\s\p{P}\p{S}]/u,Ch=M(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,lo).getRegex(),as=/(?!~)[\p{P}\p{S}]/u,Ph=/(?!~)[\s\p{P}\p{S}]/u,Eh=/(?:[^\s\p{P}\p{S}]|~)/u,Mh=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,ss=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Lh=M(ss,"u").replace(/punct/g,yn).getRegex(),Ah=M(ss,"u").replace(/punct/g,as).getRegex(),ls="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Rh=M(ls,"gu").replace(/notPunctSpace/g,is).replace(/punctSpace/g,lo).replace(/punct/g,yn).getRegex(),Hh=M(ls,"gu").replace(/notPunctSpace/g,Eh).replace(/punctSpace/g,Ph).replace(/punct/g,as).getRegex(),Ih=M("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,is).replace(/punctSpace/g,lo).replace(/punct/g,yn).getRegex(),Dh=M(/\\(punct)/,"gu").replace(/punct/g,yn).getRegex(),zh=M(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Fh=M(ao).replace("(?:-->|$)","-->").getRegex(),Oh=M("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Fh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),fn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Bh=M(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",fn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),cs=M(/^!?\[(label)\]\[(ref)\]/).replace("label",fn).replace("ref",io).getRegex(),ps=M(/^!?\[(ref)\](?:\[\])?/).replace("ref",io).getRegex(),Nh=M("reflink|nolink(?!\\()","g").replace("reflink",cs).replace("nolink",ps).getRegex(),co={_backpedal:wt,anyPunctuation:Dh,autolink:zh,blockSkip:Mh,br:os,code:Sh,del:wt,emStrongLDelim:Lh,emStrongRDelimAst:Rh,emStrongRDelimUnd:Ih,escape:wh,link:Bh,nolink:ps,punctuation:Ch,reflink:cs,reflinkSearch:Nh,tag:Oh,text:Th,url:wt},Wh={...co,link:M(/^!?\[(label)\]\((.*?)\)/).replace("label",fn).getRegex(),reflink:M(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",fn).getRegex()},Qr={...co,emStrongRDelimAst:Hh,emStrongLDelim:Ah,url:M(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},jh={...Qr,br:M(os).replace("{2,}","*").getRegex(),text:M(Qr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},hn={normal:so,gfm:yh,pedantic:kh},yt={normal:co,gfm:Qr,breaks:jh,pedantic:Wh},qh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ka=e=>qh[e];function te(e,t){if(t){if(G.escapeTest.test(e))return e.replace(G.escapeReplace,Ka)}else if(G.escapeTestNoEncode.test(e))return e.replace(G.escapeReplaceNoEncode,Ka);return e}function Xa(e){try{e=encodeURI(e).replace(G.percentDecode,"%")}catch{return null}return e}function Za(e,t){var i;let n=e.replace(G.findPipe,(a,s,p)=>{let c=!1,d=s;for(;--d>=0&&p[d]==="\\";)c=!c;return c?"|":" |"}),r=n.split(G.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!((i=r.at(-1))!=null&&i.trim())&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(G.slashPipe,"|");return r}function kt(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function _h(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Qa(e,t,n,r,o){let i=t.href,a=t.title||null,s=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let p={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:a,text:s,tokens:r.inlineTokens(s)};return r.state.inLink=!1,p}function $h(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let a=i.match(n.other.beginningSpace);if(a===null)return i;let[s]=a;return s.length>=o.length?i.slice(o.length):i}).join(`
`)}var bn=class{options;rules;lexer;constructor(e){this.options=e||Ne}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:kt(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=$h(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=kt(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:kt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=kt(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let a=!1,s=[],p;for(p=0;p<n.length;p++)if(this.rules.other.blockquoteStart.test(n[p]))s.push(n[p]),a=!0;else if(!a)s.push(n[p]);else break;n=n.slice(p);let c=s.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${c}`:c,o=o?`${o}
${d}`:d;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=u,n.length===0)break;let g=i.at(-1);if((g==null?void 0:g.type)==="code")break;if((g==null?void 0:g.type)==="blockquote"){let h=g,b=h.raw+`
`+n.join(`
`),x=this.blockquote(b);i[i.length-1]=x,r=r.substring(0,r.length-h.raw.length)+x.raw,o=o.substring(0,o.length-h.text.length)+x.text;break}else if((g==null?void 0:g.type)==="list"){let h=g,b=h.raw+`
`+n.join(`
`),x=this.list(b);i[i.length-1]=x,r=r.substring(0,r.length-g.raw.length)+x.raw,o=o.substring(0,o.length-h.raw.length)+x.raw,n=b.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),a=!1;for(;e;){let p=!1,c="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),g=e.split(`
`,1)[0],h=!u.trim(),b=0;if(this.options.pedantic?(b=2,d=u.trimStart()):h?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=u.slice(b),b+=t[1].length),h&&this.rules.other.blankLine.test(g)&&(c+=g+`
`,e=e.substring(g.length+1),p=!0),!p){let E=this.rules.other.nextBulletRegex(b),k=this.rules.other.hrRegex(b),y=this.rules.other.fencesBeginRegex(b),T=this.rules.other.headingBeginRegex(b),F=this.rules.other.htmlBeginRegex(b);for(;e;){let C=e.split(`
`,1)[0],D;if(g=C,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),D=g):D=g.replace(this.rules.other.tabCharGlobal,"    "),y.test(g)||T.test(g)||F.test(g)||E.test(g)||k.test(g))break;if(D.search(this.rules.other.nonSpaceChar)>=b||!g.trim())d+=`
`+D.slice(b);else{if(h||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||y.test(u)||T.test(u)||k.test(u))break;d+=`
`+g}!h&&!g.trim()&&(h=!0),c+=C+`
`,e=e.substring(C.length+1),u=D.slice(b)}}o.loose||(a?o.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(a=!0));let x=null,v;this.options.gfm&&(x=this.rules.other.listIsTask.exec(d),x&&(v=x[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:c,task:!!x,checked:v,loose:!1,text:d,tokens:[]}),o.raw+=c}let s=o.items.at(-1);if(s)s.raw=s.raw.trimEnd(),s.text=s.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let p=0;p<o.items.length;p++)if(this.lexer.state.top=!1,o.items[p].tokens=this.lexer.blockTokens(o.items[p].text,[]),!o.loose){let c=o.items[p].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));o.loose=d}if(o.loose)for(let p=0;p<o.items.length;p++)o.items[p].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){var a;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Za(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=(a=t[3])!=null&&a.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(Za(s,i.header.length).map((p,c)=>({text:p,tokens:this.lexer.inline(p),header:!1,align:i.align[c]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=kt(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=_h(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Qa(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return Qa(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(r[1]||r[2]||"")||!n||this.rules.inline.punctuation.exec(n)){let i=[...r[0]].length-1,a,s,p=i,c=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+i);(r=d.exec(t))!=null;){if(a=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!a)continue;if(s=[...a].length,r[3]||r[4]){p+=s;continue}else if((r[5]||r[6])&&i%3&&!((i+s)%3)){c+=s;continue}if(p-=s,p>0)continue;s=Math.min(s,s+p+c);let u=[...r[0]][0].length,g=e.slice(0,i+r.index+u+s);if(Math.min(i,s)%2){let b=g.slice(1,-1);return{type:"em",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}let h=g.slice(2,-2);return{type:"strong",raw:g,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let r,o;if(t[2]==="@")r=t[0],o="mailto:"+r;else{let i;do i=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(i!==t[0]);r=t[0],t[1]==="www."?o="http://"+t[0]:o=t[0]}return{type:"link",raw:t[0],text:r,href:o,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},le=class eo{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ne,this.options.tokenizer=this.options.tokenizer||new bn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:G,block:hn.normal,inline:yt.normal};this.options.pedantic?(n.block=hn.pedantic,n.inline=yt.pedantic):this.options.gfm&&(n.block=hn.gfm,this.options.breaks?n.inline=yt.breaks:n.inline=yt.gfm),this.tokenizer.rules=n}static get rules(){return{block:hn,inline:yt}}static lex(t,n){return new eo(n).lex(t)}static lexInline(t,n){return new eo(n).inlineTokens(t)}lex(t){t=t.replace(G.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){var o,i,a;for(this.options.pedantic&&(t=t.replace(G.tabCharGlobal,"    ").replace(G.spaceLine,""));t;){let s;if((i=(o=this.options.extensions)==null?void 0:o.block)!=null&&i.some(c=>(s=c.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let c=n.at(-1);s.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+s.raw,c.text+=`
`+s.text,this.inlineQueue.at(-1).src=c.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+s.raw,c.text+=`
`+s.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title});continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let p=t;if((a=this.options.extensions)!=null&&a.startBlock){let c=1/0,d=t.slice(1),u;this.options.extensions.startBlock.forEach(g=>{u=g.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(p=t.substring(0,c+1))}if(this.state.top&&(s=this.tokenizer.paragraph(p))){let c=n.at(-1);r&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+s.raw,c.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(s),r=p.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+s.raw,c.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(s);continue}if(t){let c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var s,p,c;let r=t,o=null;if(this.tokens.links){let d=Object.keys(this.tokens.links);if(d.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)d.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let i=!1,a="";for(;t;){i||(a=""),i=!1;let d;if((p=(s=this.options.extensions)==null?void 0:s.inline)!=null&&p.some(g=>(d=g.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);let g=n.at(-1);d.type==="text"&&(g==null?void 0:g.type)==="text"?(g.raw+=d.raw,g.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,r,a)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let g=1/0,h=t.slice(1),b;this.options.extensions.startInline.forEach(x=>{b=x.call({lexer:this},h),typeof b=="number"&&b>=0&&(g=Math.min(g,b))}),g<1/0&&g>=0&&(u=t.substring(0,g+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(a=d.raw.slice(-1)),i=!0;let g=n.at(-1);(g==null?void 0:g.type)==="text"?(g.raw+=d.raw,g.text+=d.text):n.push(d);continue}if(t){let g="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return n}},xn=class{options;parser;constructor(e){this.options=e||Ne}space(e){return""}code({text:e,lang:t,escaped:n}){var i;let r=(i=(t||"").match(G.notSpaceStart))==null?void 0:i[0],o=e.replace(G.endingNewline,"")+`
`;return r?'<pre><code class="language-'+te(r)+'">'+(n?o:te(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:te(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let s=e.items[a];r+=this.listitem(s)}let o=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+o+i+`>
`+r+"</"+o+`>
`}listitem(e){var n;let t="";if(e.task){let r=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=r+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=r+" "+te(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:r+" ",text:r+" ",escaped:!0}):t+=r+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let i=e.rows[o];n="";for(let a=0;a<i.length;a++)n+=this.tablecell(i[a]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${te(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Xa(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+te(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Xa(e);if(o===null)return te(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${te(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:te(e.text)}},po=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},ce=class to{options;renderer;textRenderer;constructor(t){this.options=t||Ne,this.options.renderer=this.options.renderer||new xn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new po}static parse(t,n){return new to(n).parse(t)}static parseInline(t,n){return new to(n).parseInline(t)}parse(t,n=!0){var o,i;let r="";for(let a=0;a<t.length;a++){let s=t[a];if((i=(o=this.options.extensions)==null?void 0:o.renderers)!=null&&i[s.type]){let c=s,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){r+=d||"";continue}}let p=s;switch(p.type){case"space":{r+=this.renderer.space(p);continue}case"hr":{r+=this.renderer.hr(p);continue}case"heading":{r+=this.renderer.heading(p);continue}case"code":{r+=this.renderer.code(p);continue}case"table":{r+=this.renderer.table(p);continue}case"blockquote":{r+=this.renderer.blockquote(p);continue}case"list":{r+=this.renderer.list(p);continue}case"html":{r+=this.renderer.html(p);continue}case"paragraph":{r+=this.renderer.paragraph(p);continue}case"text":{let c=p,d=this.renderer.text(c);for(;a+1<t.length&&t[a+1].type==="text";)c=t[++a],d+=`
`+this.renderer.text(c);n?r+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):r+=d;continue}default:{let c='Token with "'+p.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return r}parseInline(t,n=this.renderer){var o,i;let r="";for(let a=0;a<t.length;a++){let s=t[a];if((i=(o=this.options.extensions)==null?void 0:o.renderers)!=null&&i[s.type]){let c=this.options.extensions.renderers[s.type].call({parser:this},s);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=c||"";continue}}let p=s;switch(p.type){case"escape":{r+=n.text(p);break}case"html":{r+=n.html(p);break}case"link":{r+=n.link(p);break}case"image":{r+=n.image(p);break}case"strong":{r+=n.strong(p);break}case"em":{r+=n.em(p);break}case"codespan":{r+=n.codespan(p);break}case"br":{r+=n.br(p);break}case"del":{r+=n.del(p);break}case"text":{r+=n.text(p);break}default:{let c='Token with "'+p.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return r}},mn=class{options;block;constructor(e){this.options=e||Ne}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?le.lex:le.lexInline}provideParser(){return this.block?ce.parse:ce.parseInline}},Uh=class{defaults=no();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=ce;Renderer=xn;TextRenderer=po;Lexer=le;Tokenizer=bn;Hooks=mn;constructor(...e){this.use(...e)}walkTokens(e,t){var r,o;let n=[];for(let i of e)switch(n=n.concat(t.call(this,i)),i.type){case"table":{let a=i;for(let s of a.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of a.rows)for(let p of s)n=n.concat(this.walkTokens(p.tokens,t));break}case"list":{let a=i;n=n.concat(this.walkTokens(a.items,t));break}default:{let a=i;(o=(r=this.defaults.extensions)==null?void 0:r.childTokens)!=null&&o[a.type]?this.defaults.extensions.childTokens[a.type].forEach(s=>{let p=a[s].flat(1/0);n=n.concat(this.walkTokens(p,t))}):a.tokens&&(n=n.concat(this.walkTokens(a.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...a){let s=o.renderer.apply(this,a);return s===!1&&(s=i.apply(this,a)),s}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new xn(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let a=i,s=n.renderer[a],p=o[a];o[a]=(...c)=>{let d=s.apply(o,c);return d===!1&&(d=p.apply(o,c)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new bn(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let a=i,s=n.tokenizer[a],p=o[a];o[a]=(...c)=>{let d=s.apply(o,c);return d===!1&&(d=p.apply(o,c)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new mn;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let a=i,s=n.hooks[a],p=o[a];mn.passThroughHooks.has(i)?o[a]=c=>{if(this.defaults.async)return Promise.resolve(s.call(o,c)).then(u=>p.call(o,u));let d=s.call(o,c);return p.call(o,d)}:o[a]=(...c)=>{let d=s.apply(o,c);return d===!1&&(d=p.apply(o,c)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(a){let s=[];return s.push(i.call(this,a)),o&&(s=s.concat(o.call(this,a))),s}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return le.lex(e,t??this.defaults)}parser(e,t){return ce.parse(e,t??this.defaults)}parseMarkdown(e){return(n,r)=>{let o={...r},i={...this.defaults,...o},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&o.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));i.hooks&&(i.hooks.options=i,i.hooks.block=e);let s=i.hooks?i.hooks.provideLexer():e?le.lex:le.lexInline,p=i.hooks?i.hooks.provideParser():e?ce.parse:ce.parseInline;if(i.async)return Promise.resolve(i.hooks?i.hooks.preprocess(n):n).then(c=>s(c,i)).then(c=>i.hooks?i.hooks.processAllTokens(c):c).then(c=>i.walkTokens?Promise.all(this.walkTokens(c,i.walkTokens)).then(()=>c):c).then(c=>p(c,i)).then(c=>i.hooks?i.hooks.postprocess(c):c).catch(a);try{i.hooks&&(n=i.hooks.preprocess(n));let c=s(n,i);i.hooks&&(c=i.hooks.processAllTokens(c)),i.walkTokens&&this.walkTokens(c,i.walkTokens);let d=p(c,i);return i.hooks&&(d=i.hooks.postprocess(d)),d}catch(c){return a(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+te(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Be=new Uh;function L(e,t){return Be.parse(e,t)}L.options=L.setOptions=function(e){return Be.setOptions(e),L.defaults=Be.defaults,es(L.defaults),L};L.getDefaults=no;L.defaults=Ne;L.use=function(...e){return Be.use(...e),L.defaults=Be.defaults,es(L.defaults),L};L.walkTokens=function(e,t){return Be.walkTokens(e,t)};L.parseInline=Be.parseInline;L.Parser=ce;L.parser=ce.parse;L.Renderer=xn;L.TextRenderer=po;L.Lexer=le;L.lexer=le.lex;L.Tokenizer=bn;L.Hooks=mn;L.parse=L;var J2=L.options,K2=L.setOptions,X2=L.use,Z2=L.walkTokens,Q2=L.parseInline;var eC=ce.parse,tC=le.lex;var ox=wu(Ac());R();var ct=e=>{let t=document.querySelector(".press-frame-sidemenu");t&&gn(t.scrollTop),fe(Se(e))},Se=e=>{let t=Ya(),n=Qe(),r=e;if(n&&!r.startsWith(n+"/")){if(r.startsWith("/")&&!t.some(o=>r.startsWith(`/${o.id}/`))){let{langName:o}=Ke();r=`/${o}${r}`}r=`${n}${r}`}return r||"/"};f();var Rc=e=>{var o;let t=e.langs||[],n=((o=t.find(i=>i.id===e.currentLang))==null?void 0:o.text)||"Language",r=i=>{let a=t.find(s=>s.text===i);if(a&&a.id!==e.currentLang){let s=window.location.pathname,p=Qe();p&&s.startsWith(p)&&(s=s.substring(p.length));let c=t.map(u=>u.id).join("|"),d=new RegExp(`^/(${c})(\\/|$)`);d.test(s)?s=s.replace(d,`/${a.id}$2`):s=`/${a.id}${s==="/"?"/":s}`,s=`${p}${s}`,fe(s)}};return l("div",{class:["lang-switcher",e.className].join(" "),children:l(Q,{list:t.map(i=>i.text),defaultValue:n,icon:l(ve,{children:_a}),handleSelected:r,align:"right"})})};R();var Hc=`<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>\r
    <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z' />\r
</svg>`;var Ic=`<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>\r
    <!-- Sun (Top-Left): Unchanged -->\r
    <path d="M7 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM7 0h1v2.5H7zM7 11.5h1V14H7zM0 7h2.5v1H0zM11.5 7H14v1h-2.5zM2.05 2.05l1.768 1.768.707-.707L2.757 1.343zM10.243 10.243l1.768 1.768.707-.707-1.768-1.768zM2.05 12.95L1.343 12.243l1.768-1.768.707.707zM12.95 2.05l-1.768 1.768-.707-.707 1.768-1.768z" />\r
    \r
    <!-- Moon (Bottom-Right): Rotated ~30 degrees CCW to 'hug' the sun -->\r
    <g transform="rotate(-30, 16, 16)">\r
        <path d="M23 16c0 3.866-3.134 7-7 7-3.866 0-7-3.134-7-7 0-.46.04-.92.1-1.36 1.1 3.2 4.1 5.5 7.4 5.5 1.9 0 3.6-.6 5-1.7 1-.9 1.5-2.1 1.5-3.44 0-1.8-1.1-3.3-2.6-3.9 1.6 1.5 2.6 3.6 2.6 5.9z" />\r
    </g>\r
</svg>\r
`;f();var Dc=e=>l("header",{css:{width:"100%",display:"flex",alignItems:"center",padding:"0.75rem 2rem",justifyContent:"space-between",".press-navbar-left":{display:"flex",alignItems:"center",".title":{fontWeight:"bold",fontSize:"1.2rem",marginRight:"1rem"},".nav":{display:"flex",gap:"1rem"}},".press-navbar-right":{display:"flex",alignItems:"center",gap:"1.25rem",".navbar-item":{display:"flex",alignItems:"center",textDecoration:"none",transition:"color 0.2s","&:hover":{color:"var(--press-brand-color)"}}}},class:"press-navbar",children:[l("div",{class:"press-navbar-left",children:[l("div",{class:"title",children:l("a",{href:Se("/"),children:e.title})}),l("nav",{class:"nav",children:e.nav.map(n=>l("a",{href:Se(n.link),children:n.text}))})]}),l("div",{class:"press-navbar-right",children:[e.langs.length>1&&l(Rc,{className:"navbar-item",currentLang:e.currentLang,langs:e.langs||[]}),l(Wr,{className:"navbar-item",icon:l(ve,{children:Ic}),noUpdateLabel:!0}),e.github&&e.github.url&&l("a",{href:e.github.url,target:"_blank",rel:"noopener noreferrer",class:"navbar-item",title:e.github.title,children:l(ve,{children:Hc})})]})]});f();var zc=e=>e.headings.length===0?null:l("div",{css:{".&-title":{fontWeight:"bold",fontSize:"0.8rem",textTransform:"uppercase",letterSpacing:"0.05em",color:"var(--primary-color)",marginBottom:"0.8rem"},".&-list":{listStyle:"none",padding:0,margin:0,borderLeft:"1px solid var(--press-border-color)"},".&-item":{padding:"0.2rem 0 0.2rem 1rem",fontSize:"0.85rem","&.level-3":{paddingLeft:"2rem"},a:{display:"block",transition:"color 0.2s",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}},children:[l("div",{class:"&-title",children:"On this page"}),l("ul",{class:"&-list",children:e.headings.map(n=>l("li",{class:`&-item level-${n.level}`,children:l("a",{href:`#${n.id}`,children:n.text})}))})]});f();var Fc=e=>{var o;let{hero:t,features:n}=e.data||{};return l("div",{css:{".&-hero":{padding:"64px 32px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"},".&-hero-name":{fontSize:"56px",lineHeight:"64px",fontWeight:"bold",background:"linear-gradient(135deg, var(--press-brand-color) 30%, #4facfe 100%)","-webkit-background-clip":"text","-webkit-text-fill-color":"transparent"},".&-hero-text":{fontSize:"56px",lineHeight:"64px",fontWeight:"bold",marginTop:"8px"},".&-hero-tagline":{fontSize:"24px",lineHeight:"36px",color:"var(--secondary-color)",marginTop:"24px",maxWidth:"576px"},".&-hero-actions":{display:"flex",gap:"12px",marginTop:"48px"},".&-button":{display:"inline-block",padding:"0 20px",lineHeight:"38px",borderRadius:"20px",fontWeight:"600",textDecoration:"none",fontSize:"14px"},".&-button.brand":{backgroundColor:"var(--press-brand-color)",color:"#fff"},".&-button.alt":{backgroundColor:"var(--secondary-bg-color)",color:"var(--primary-color)",border:"1px solid var(--press-border-color)"},".&-features":{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(256px, 1fr))",gap:"24px",padding:"48px 32px",maxWidth:"1152px",margin:"0 auto"},".&-feature-card":{backgroundColor:"var(--secondary-bg-color)",padding:"24px",borderRadius:"12px",border:"1px solid var(--press-border-color)"},".&-feature-title":{fontSize:"20px",fontWeight:"bold",marginBottom:"8px"},".&-feature-details":{fontSize:"14px",color:"var(--secondary-color)",lineHeight:"22px"}},children:[l("section",{class:"&-hero",children:[l("h1",{class:"&-hero-name",children:t.name}),l("p",{class:"&-hero-text",children:t.text}),l("p",{class:"&-hero-tagline",children:t.tagline}),l("div",{class:"&-hero-actions",children:(o=t.actions)==null?void 0:o.map(i=>l("a",{href:Se(i.link),class:`&-button ${i.theme}`,children:i.text}))})]}),n&&l("section",{class:"&-features",children:n.map(i=>l("div",{class:"&-feature-card",children:[l("h2",{class:"&-feature-title",children:i.title}),l("p",{class:"&-feature-details",children:i.details})]}))})]})};H();R();f();var Oc=e=>{O()&&(window.lpPressLoad=ct);let n={display:"flex",flexDirection:"column",width:"100%",height:"100%",minHeight:"100%",position:"relative",...{"h1, h2, h3":{borderBottom:"1px solid var(--press-border-color)",paddingBottom:"0.3em",marginTop:"1.5em",position:"relative",scrollMarginTop:"80px","&:first-child":{marginTop:0},"&:hover .header-anchor":{opacity:1}},".header-anchor":{position:"absolute",left:"-1.5rem",width:"1rem",opacity:0,textDecoration:"none",color:"var(--press-brand-color)",fontSize:"0.8em",transition:"opacity 0.2s"},ol:{listStyleType:"decimal"},"li, p":{margin:"0.5em 0"},pre:{backgroundColor:"var(--secondary-bg-color)",padding:"1rem",borderRadius:"8px",overflowX:"auto"},code:{fontFamily:"var(--font-family-mono, monospace)"}},...e.css,".press-frame-box":{display:"flex",flex:"1",flexDirection:"column",height:"100%",width:"100%",maxWidth:W.DesktopMax,margin:"auto","padding-top ":"constant(safe-area-inset-top)","padding-top":"env(safe-area-inset-top)"},".press-frame-header":{display:"flex",flexDirection:"column",alignItems:"center",padding:"4px 16px 4px 0px",width:"100%"},".press-frame-main":{display:"flex",flex:"1",flexDirection:"row",overflowY:"auto",scrollbarWidth:"none",borderTop:"1px solid var(--press-border-color)",minHeight:"0",scrollBehavior:"smooth","&::-webkit-scrollbar":{display:"none"}},".press-frame-main .padding-block":{padding:"0 16px"},".press-frame-content":{display:"flex",flex:"1",flexDirection:"column",overflowY:"auto",scrollbarWidth:"none"},".press-frame-sidemenu":{width:e.sidemenuWidth||"260px",display:"flex",borderRight:"1px solid var(--press-border-color)",overflowX:"hidden",overflowY:"auto",color:"var(--sidebar-color)",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},[V.TabletBelow]:{".press-frame-sidemenu":{display:"none"}}};return l("div",{ref:{onLoad:async o=>{Te(o);let i=o.querySelector(".press-frame-sidemenu");i&&(i.scrollTop=Va(),i.addEventListener("scroll",()=>{gn(i.scrollTop)}))}},css:n,class:"press-frame",children:l("div",{class:"press-frame-box",children:[l("div",{class:"press-frame-header",children:e.header}),l("div",{class:"press-frame-main",children:[!e.hideSidemenu&&l("div",{class:"press-frame-sidemenu",children:e.sidemenu}),l("div",{class:"press-frame-content",children:e.content})]})]})})};f();var Bc=e=>{let t={},n={width:"100%",padding:"0 8px 8px",height:"max-content",".&-item":{marginBottom:"0.3rem",display:"block",color:"var(--text-color)",textDecoration:"none","&:hover":{color:"var(--primary-accent-color)"},transition:"color 0.2s"},".&-item.active":{color:"var(--primary-accent-color)",fontWeight:"bold"},".&-group-title":{fontWeight:"bold",marginTop:"0.5rem",marginBottom:"0.5rem",fontSize:"15px","&.group-level-0":{marginTop:"1.5rem",fontSize:"19px"},"&.group-level-1":{marginTop:"0.75rem",fontSize:"17px"}}},r=a=>{let s=a||window.location.href,p=t.$all("&-item");p&&p.forEach(c=>{c.classList.remove("active");let d=c.getAttribute("data-link");d&&s.endsWith(d)&&(c.classList.add("active"),c.scrollIntoView({behavior:"smooth",block:"nearest"}))})};t.onLoad=async()=>{r()};let o=e.sidebar||[],i=1;return l("aside",{css:n,ref:t,children:o.map((a,s)=>{let p={paddingLeft:`${a.level*i}rem`};if(a.type==="group")return l("div",{class:"&-group-title"+(" group-level-"+a.level),style:p,children:a.text},s);{let c=Se(a.link);return l("a",{class:"&-item",style:p,href:"javascript:void(0)","data-link":c,onClick:()=>(r(c),ct(c),!1),children:a.text},s)}})})};R();var Nc=`<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>\r
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />\r
</svg>\r
`;f();var Wc=e=>{let t={display:"flex",flex:1,maxWidth:"100vw",margin:"0 auto",width:"100%",".press-content":{flex:1,padding:e.isHome?"0":"2rem 4rem",width:"100%",margin:e.isHome?"0":"0 auto",minWidth:0},".page-heading-container":{width:"240px",minWidth:"240px",padding:"2rem 1rem",position:"sticky",top:"64px",maxHeight:"calc(100vh - 64px)",overflowY:"auto",alignSelf:"flex-start",display:e.isHome||e.headings.length===0?"none":"block"},".markdown-body":{lineHeight:1.6},".press-mobile-toc":{display:"none",borderRadius:"6px",alignItems:"center",padding:"4px",position:"fixed",top:"74px",right:"7px",zIndex:90,fontSize:"0.9rem",cursor:"pointer",textTransform:"uppercase",backgroundColor:"var(--primary-bg-color)"},".press-mobile-sidebar":{display:"none",borderRadius:"6px",alignItems:"center",padding:"4px",position:"fixed",top:"74px",left:"7px",zIndex:90,fontSize:"0.9rem",cursor:"pointer",[V.TabletBelow]:{display:"flex"}},[V.MobileBelow]:{".page-heading-container":{display:"none"},".press-mobile-toc":{display:"flex"}}};return l("main",{css:t,children:[!e.isHome&&e.sidebar.length>0&&l("div",{class:"press-mobile-sidebar",children:l(Q,{list:e.sidebar.map(n=>({text:n.text,id:n.link||"",url:n.link||"",indent:n.level,visible:!!n.type,disabled:n.type==="group",bold:n.type==="group"})),defaultValue:"Menu",tips:"",width:"max-content",maxHeight:"400px",align:"left",handleSelected:(n,r)=>{r&&r.url&&ct(r.url)},noUpdateLabel:!0,icon:l(ve,{children:Nc})})}),l("main",{class:"press-content",children:e.isHome?l(Fc,{data:e.data}):l("article",{class:"markdown-body",children:e.children})}),l("aside",{class:"page-heading-container",children:l(zc,{headings:e.headings})}),!e.isHome&&e.headings.length>0&&l("div",{class:"press-mobile-toc",children:l(Q,{list:e.headings.map(n=>({text:n.text,id:n.id,indent:n.level-2})),defaultValue:"On this page",tips:"",width:"max-content",maxHeight:"300px",align:"right",handleSelected:n=>{var i;let r=n.trim(),o=e.headings.find(a=>a.text===r);o&&((i=document.getElementById(o.id))==null||i.scrollIntoView(!0))},noUpdateLabel:!0})})]})};f();var jc=e=>{var a;let t=((a=e.data)==null?void 0:a.layout)==="home",n=e.headings||[],r=e.lang||Ke().langName,o=e.sidebar||[],i=l(Wc,{sidebar:o,isHome:t,headings:n,data:e.data,children:e.children});return l(Oc,{header:l(Dc,{title:e.title,nav:e.nav,langs:e.langs||[],currentLang:r,github:e.github}),sidemenu:l(Bc,{sidebar:o}),content:i,hideSidemenu:t,sidemenuWidth:e.sidemenuWidth})};R();f();var qc=e=>{var k,y;if(!O())return l("div",{});let t=Qe(),n=Ua(),r=window.location.pathname;t&&r.startsWith(t)&&(r=r.substring(t.length));let i=r.split("/")[1],a=((k=n["/"])==null?void 0:k.data)||{},s=Array.isArray(a.lang)?a.lang:[{title:"English",id:"en"},{title:"Chinese",id:"zh"}];Ga(s);let p=s.map(T=>T.id),c=p.includes(i)?i:p[0]||"en";Promise.resolve().then(()=>(R(),qa)).then(T=>{T.getCurrentLang().langName!==c&&T.updateLang(c)});let d=r;d===""||d==="/"?d=`/${c}/index`:(d.endsWith("/")&&d.length>1&&(d=d.substring(0,d.length-1)),d===`/${c}`&&(d=`/${c}/index`));let u=n[d],g=u?u.html:`<h1>404 - Page Not Found</h1><p>Path: ${d}</p>`,h=((y=n[`/${c}/index`])==null?void 0:y.data)||{},b=h.nav||[],x=h.sidebar||[],v=h.title||"LupineJS",E=s.map(T=>{var D;let F=((D=n[`${T.id}/index`])==null?void 0:D.data)||{},C=Array.isArray(F.lang)?F.lang[0]:F.lang||{};return{text:C.text||C.title||C.label||T.title,id:T.id}});return l(jc,{title:v,nav:b,sidebar:x,lang:c,langs:E,data:u==null?void 0:u.data,headings:u==null?void 0:u.headings,sidemenuWidth:h["sidemenu-width"],github:{url:h["github-link"],title:h["github-title"]},children:g})};R();var _c={light:{...cn.light,"--press-border-color":"#e2e2e3","--press-brand-color":"#3eaf7c"},dark:{...cn.dark,"--press-border-color":"#2e2e32","--press-brand-color":"#3eaf7c"}};var $c="";var Uc=`<h1 id="api-reference"><a class="header-anchor" href="#api-reference">#</a>API Reference</h1><h2 id="lupine-api-backend"><a class="header-anchor" href="#lupine-api-backend">#</a>Lupine.api (Backend)</h2><h3 id="architecture-workflow"><a class="header-anchor" href="#architecture-workflow">#</a>\u{1F3D7}\uFE0F Architecture &amp; Workflow</h3><p>Lupine.js runs a single server instance that can serve multiple domains and applications simultaneously.</p>
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
`;var Vc=`<h1 id="css-in-js"><a class="header-anchor" href="#css-in-js">#</a>CSS-in-JS</h1><p>Lupine.js features a built-in, lightweight <strong>CSS-in-JS</strong> engine. It supports powerful features like nesting, pseudo-selectors, media queries, and scoped animations, all without needing external libraries like styled-components or emotion.</p>
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
`;var Gc="";var Yc=`<h1 id="high-performance-list-rendering-editing"><a class="header-anchor" href="#high-performance-list-rendering-editing">#</a>High Performance List Rendering &amp; Editing</h1><p>Lupine.js adopts a unique <strong>&quot;Component-Level Rendering&quot;</strong> strategy that differs significantly from traditional Virtual DOM frameworks like React or Vue. This approach is particularly powerful for handling large lists and complex data grids (e.g., in Admin Panels).</p>
<h2 id="1-why-it-is-fast"><a class="header-anchor" href="#1-why-it-is-fast">#</a>1. \u26A1 Why it is Fast?</h2><p>In traditional frameworks (like React), when you update an item in a list:</p>
<ol>
<li>You call <code>setState</code>.</li>
<li>The framework re-renders the <strong>entire List component</strong>.</li>
<li>It runs a &quot;Diffing Algorithm&quot; to compare the new virtual tree of 100+ items against the old one.</li>
<li>Finally, it updates the DOM for the one changed item.</li>
</ol>
<p><strong>In Lupine.js, we skip steps 2 and 3 entirely.</strong></p>
<p>Because Lupine uses <strong>Manual Reactivity (HtmlVar<a href="javascript:lpPressLoad('/en/lupine.components/html-var')">\u{1F517}</a>)</strong>, you can update a specific DOM element directly by setting <code>dom.value = &lt;&gt;...&lt;/&gt;</code>, without triggering a top-down re-render. This is similar to a highly optimized React component using <code>React.memo</code>, but it is the <strong>default behavior</strong> here, not an opt-in optimization.</p>
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
`;var Jc=`<h1 id="page-router"><a class="header-anchor" href="#page-router">#</a>Page Router</h1><p>The <code>PageRouter</code> in <strong>Lupine.web</strong> is a powerful client-side routing system designed to be <strong>isomorphic</strong> in logic to the backend <code>ApiRouter</code> (in <code>lupine.api</code>). It supports nested routing, middleware filters, dynamic parameters, and layout frames.</p>
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
`;var Kc=`<h1 id="server-side-rendering-ssr"><a class="header-anchor" href="#server-side-rendering-ssr">#</a>Server Side Rendering (SSR)</h1><p>Lupine.js was designed from scratch with <strong>Server-Side Rendering (SSR)</strong> as a first-class citizen. Unlike many SPA frameworks where SSR is an afterthought or requires complex meta-frameworks (like Next.js for React), Lupine integrates SSR directly into its core architecture (<code>lupine.api</code> and <code>lupine.web</code>).</p>
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
`;var Xc=`<h1 id="theme"><a class="header-anchor" href="#theme">#</a>\u{1F317} Theme</h1><p>Lupine.js provides built-in support for multiple themes (e.g., Light and Dark modes) with seamless SSR integration.</p>
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
`;var Zc=`<h1 id="installation"><a class="header-anchor" href="#installation">#</a>Installation</h1><p>LupineJS can be installed by cloning the main repository.</p>
<h2 id="development-environment"><a class="header-anchor" href="#development-environment">#</a>Development Environment</h2><ol>
<li><p><strong>Clone Repo</strong>:</p>
<pre><code class="language-bash">git clone https://github.com/uuware/lupine.js.git
</code></pre>
</li>
<li><p><strong>Dependencies</strong>:</p>
<pre><code class="language-bash">npm install
</code></pre>
</li>
<li><p><strong>Environment Setup</strong>:
Copy <code>.env.sample</code> to <code>.env</code> and configure accordingly.</p>
</li>
</ol>
<h2 id="production-build"><a class="header-anchor" href="#production-build">#</a>Production Build</h2><p>To build for production:</p>
<pre><code class="language-bash">npm run build
</code></pre>
<p>The build output will be in the <code>dist/server_root</code> directory.</p>
`;var Qc=`<h1 id="introduction-to-lupine-js"><a class="header-anchor" href="#introduction-to-lupine-js">#</a>Introduction to Lupine.js</h1><p>Lupine.js is a full-featured web application framework that includes both Front-End and Back-End services.</p>
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
`;var ep="";var tp=`<h1 id="api-module-src-api"><a class="header-anchor" href="#api-module-src-api">#</a>API Module (<code>src/api</code>)</h1><p>The API Module provides the framework for writing the business logic of your application. It acts similarly to Express.js but is optimized for the lupine ecosystem.</p>
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
`;var np=`<h1 id="server-src-app"><a class="header-anchor" href="#server-src-app">#</a>Server (<code>src/app</code>)</h1><p>The server component is responsible for handling incoming network requests, managing SSL certificates, and dispatching requests to the appropriate application based on domain configuration. It supports clustering logic to utilize multi-core CPUs efficiently.</p>
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
`;var rp=`<h1 id="lupine-api-dashboard"><a class="header-anchor" href="#lupine-api-dashboard">#</a>lupine.api dashboard</h1><p>lupine.api includes a built-in extensible dashboard for managing your API services. The dashboard features a management sidebar on the left and a multi-tab content area on the right.</p>
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
`;var op=`<h1 id="lupine-api"><a class="header-anchor" href="#lupine-api">#</a>lupine.api</h1><p>lupine.api is a fast, lightweight, and flexible node.js based server framework. It is designed to work seamlessly with <a href="https://github.com/uuware/lupine.web">lupine.web</a> to provide Server-Side Rendering (SSR) and modern API capabilities.</p>
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
`;var ip=`<h1 id="dateutils"><a class="header-anchor" href="#dateutils">#</a>DateUtils</h1><p>Comprehensive date manipulation utilities.</p>
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
`;var ap=`<h1 id="domutils"><a class="header-anchor" href="#domutils">#</a>DomUtils</h1><p>Helper functions for common DOM operations, mostly shorthand for <code>querySelector</code>.</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { DomUtils } from &#39;lupine.components&#39;;

// Get input value
const value = DomUtils.getValue(&#39;#my-input&#39;);

// Trigger click on a hidden file input
const fDom = DomUtils.bySelector(&#39;.up-file&#39;) as HTMLInputElement;
fDom.click();
</code></pre>
`;var sp=`<h1 id="downloadstream"><a class="header-anchor" href="#downloadstream">#</a>downloadStream</h1><p>Download a <code>Blob</code> as a file by creating a temporary anchor tag.</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { downloadStream } from &#39;lupine.components&#39;;

const onDownload = async (name: string) =&gt; {
  const response = await fetch(&#39;/api/download?file=&#39; + name);
  const blob = await response.blob();
  downloadStream(blob, name);
};
</code></pre>
`;var lp=`<h1 id="dragutil"><a class="header-anchor" href="#dragutil">#</a>DragUtil</h1><p>Helper for implementing drag-and-drop or touch-move functionality.</p>
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
`;var cp=`<h1 id="dynamicalload"><a class="header-anchor" href="#dynamicalload">#</a>DynamicalLoad</h1><p>Dynamically load external Scripts or CSS files. Used for lazy loading third-party SDKs.</p>
<p><strong>Usage Example (from <code>wx-share.ts</code>):</strong></p>
<pre><code class="language-typescript">import { DynamicalLoad } from &#39;lupine.components&#39;;

// Load WeChat JS-SDK dynamically
if (typeof wx === &#39;undefined&#39;) {
  await DynamicalLoad.loadScript(&#39;//res.wx.qq.com/open/js/jweixin-1.6.0.js&#39;, &#39;jweixin&#39;);
}
</code></pre>
`;var pp=`<h1 id="formatbytes"><a class="header-anchor" href="#formatbytes">#</a>formatBytes</h1><p>Format file size in bytes into human-readable strings (KB, MB, GB, etc.).</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { formatBytes } from &#39;lupine.components&#39;;

const sizeStr = formatBytes(1024 * 1024 * 5); // &quot;5 MB&quot;
const sizeStr2 = formatBytes(123456); // &quot;120.56 KB&quot;
</code></pre>
`;var dp=`<h1 id="lupine-components-libs"><a class="header-anchor" href="#lupine-components-libs">#</a>lupine.components libs</h1><p>This directory contains a suite of utility libraries designed for efficient web development.</p>
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
`;var up=`<h1 id="litedom"><a class="header-anchor" href="#litedom">#</a>LiteDom</h1><p>A lightweight, chainable DOM wrapper similar to jQuery.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { LiteDom } from &#39;lupine.components&#39;;

const el = new LiteDom(&#39;#my-element&#39;);
el.css(&#39;color&#39;, &#39;red&#39;)
  .html(&#39;Hello World&#39;)
  .on(&#39;click&#39;, () =&gt; {
    console.log(&#39;Clicked!&#39;);
  });
</code></pre>
`;var gp=`<h1 id="messagehub"><a class="header-anchor" href="#messagehub">#</a>MessageHub</h1><p>A publish-subscribe event bus for communication between components.</p>
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
`;var hp=`<h1 id="observable"><a class="header-anchor" href="#observable">#</a>Observable</h1><p>Implementation of the Observable pattern, inspired by RxJS.</p>
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
`;var mp=`<h1 id="simplestorage"><a class="header-anchor" href="#simplestorage">#</a>SimpleStorage</h1><p>A wrapper for <code>localStorage</code> (or similar key-value storage) offering typed getters.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { SimpleStorage } from &#39;lupine.components&#39;;

// Assuming initialized with some storage object like localStorage
const storage = new SimpleStorage(localStorage as any);

storage.set(&#39;theme&#39;, &#39;dark&#39;);
const theme = storage.get(&#39;theme&#39;, &#39;light&#39;); // returns &#39;dark&#39;
const isDebug = storage.getBoolean(&#39;debug&#39;, false);
</code></pre>
`;var fp=`<h1 id="uploadfile"><a class="header-anchor" href="#uploadfile">#</a>uploadFile</h1><p>Handle file uploads with chunking support, progress tracking, and retries.</p>
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
`;var bp=`<h1 id="action-sheet"><a class="header-anchor" href="#action-sheet">#</a>Action Sheet</h1><p>A sliding window from the bottom on mobile devices, used for displaying new pages or setting options.</p>
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
`;var xp=`<h1 id="button"><a class="header-anchor" href="#button">#</a>Button</h1><p>Basic buttons with multiple sizes and push animation.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Button, ButtonSize } from &#39;lupine.components&#39;;

&lt;Button text=&#39;Submit&#39; size={ButtonSize.Large} onClick={() =&gt; {}} /&gt;
&lt;Button text=&#39;Search&#39; size={ButtonSize.Medium} onClick={() =&gt; {}} /&gt;
&lt;Button text=&#39;Cancel&#39; size={ButtonSize.Small} onClick={() =&gt; {}} /&gt;
</code></pre>
`;var vp=`<h1 id="dragfresh"><a class="header-anchor" href="#dragfresh">#</a>DragFresh</h1><p>Drag-to-refresh component, commonly used at the top of mobile lists.</p>
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
`;var yp=`<h1 id="editablelabel"><a class="header-anchor" href="#editablelabel">#</a>EditableLabel</h1><p>Label that becomes editable on double-click and triggers a save event on blur.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { EditableLabel } from &#39;lupine.components&#39;;

&lt;EditableLabel
  value=&#39;Click to edit me&#39;
  onSave={(newValue) =&gt; {
    console.log(&#39;Saved new value:&#39;, newValue);
  }}
/&gt;;
</code></pre>
`;var kp=`<h1 id="floatwindow"><a class="header-anchor" href="#floatwindow">#</a>FloatWindow</h1><p>A draggable popup window. Supports modal and non-modal modes.</p>
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
`;var wp=`<h1 id="grid"><a class="header-anchor" href="#grid">#</a>Grid</h1><p>Responsive grid layout for displaying complex layouts.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Grid } from &#39;lupine.components&#39;;

&lt;Grid columns={3} gap=&#39;10px&#39;&gt;
  &lt;div&gt;Item 1&lt;/div&gt;
  &lt;div&gt;Item 2&lt;/div&gt;
  &lt;div&gt;Item 3&lt;/div&gt;
&lt;/Grid&gt;;
</code></pre>
`;var Sp=`<h1 id="htmlload"><a class="header-anchor" href="#htmlload">#</a>HtmlLoad</h1><p>Component for asynchronously loading and displaying remote HTML content.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { HtmlLoad } from &#39;lupine.components&#39;;

&lt;HtmlLoad url=&#39;/api/v1/content/article-1&#39; /&gt;;
</code></pre>
`;var Tp=`<h1 id="htmlvar"><a class="header-anchor" href="#htmlvar">#</a>HtmlVar</h1><p><code>HtmlVar</code> is the core primitive for reactivity in Lupine.js. Unlike modern frameworks that attempt to automatically detect state changes, <code>HtmlVar</code> gives you a manual &quot;handle&quot; to a specific DOM slot that you can update at any time.</p>
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
`;var Cp=`<h1 id="lupine-components"><a class="header-anchor" href="#lupine-components">#</a>lupine.components</h1><p>lupine.components is a collection of React-like, extremely fast, small size and lightweight frontend components for lupine.web.
It provides a rich set of common desktop and mobile components designed for high-performance UI development.</p>
<h2 id="core-features"><a class="header-anchor" href="#core-features">#</a>Core Features</h2><ul>
<li><strong>Ultra Lightweight</strong>: No bloated code, ensuring fast application loading.</li>
<li><strong>React-Syntax Driven</strong>: Supports TSX syntax for a familiar development experience.</li>
<li><strong>Cross-Platform</strong>: Components are natively responsive for desktop and mobile interactions.</li>
<li><strong>Zero Dependencies</strong>: Keeps the dependency tree clean and easy to maintain.</li>
</ul>
<h2 id="quick-start"><a class="header-anchor" href="#quick-start">#</a>Quick Start</h2><p>You can explore component details and implementation examples using the sidebar on the left.</p>
`;var Pp=`<h1 id="inputwithtitle"><a class="header-anchor" href="#inputwithtitle">#</a>InputWithTitle</h1><p>Input field combined with a title.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { InputWithTitle } from &#39;lupine.components&#39;;

const input = InputWithTitle(&#39;Username&#39;, &#39;Enter your name&#39;, (value) =&gt; {
  console.log(&#39;Value entered:&#39;, value);
});
</code></pre>
`;var Ep=`<h1 id="menubar"><a class="header-anchor" href="#menubar">#</a>Menubar</h1><p>Horizontal navigation bar with dropdown support.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Menubar } from &#39;lupine.components&#39;;

const menuItems = [
  { text: &#39;Home&#39;, link: &#39;/&#39; },
  {
    text: &#39;Products&#39;,
    children: [
      { text: &#39;LupineJS&#39;, link: &#39;/lupine&#39; },
      { text: &#39;Components&#39;, link: &#39;/components&#39; },
    ],
  },
];

&lt;Menubar items={menuItems} /&gt;;
</code></pre>
`;var Mp=`<h1 id="menusidebar"><a class="header-anchor" href="#menusidebar">#</a>MenuSidebar</h1><p>Vertical sidebar menu with multi-level support, desktop and mobile adaptive.</p>
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
`;var Lp=`<h1 id="messagebox"><a class="header-anchor" href="#messagebox">#</a>MessageBox</h1><p>Predefined dialogs (like Yes/No, Ok/Cancel) for quick alerts.</p>
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
`;var Ap=`<h1 id="modal"><a class="header-anchor" href="#modal">#</a>Modal</h1><p>A popup window with or without modal effect, used for blocking interactions. It is draggable.</p>
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
`;var Rp=`<h1 id="noticemessage"><a class="header-anchor" href="#noticemessage">#</a>NoticeMessage</h1><p>A core component used to display global notification messages at the top of the page. Supports multiple color levels.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { NotificationMessage, NotificationColor } from &#39;lupine.components&#39;;

// Success notification
NotificationMessage.sendMessage(&#39;Data saved successfully&#39;, NotificationColor.Success);

// Error notification (Permanent)
NotificationMessage.sendMessage(&#39;Network error, please check&#39;, NotificationColor.Error, true);
</code></pre>
`;var Hp=`<h1 id="paginglink"><a class="header-anchor" href="#paginglink">#</a>PagingLink</h1><p>Pagination component for displaying and navigating to different page numbers.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { PagingLink } from &#39;lupine.components&#39;;

&lt;PagingLink
  totalCount={100}
  pageSize={10}
  currentPage={1}
  onPageChange={(page) =&gt; console.log(&#39;Navigate to page:&#39;, page)}
/&gt;;
</code></pre>
`;var Ip=`<h1 id="popupmenu"><a class="header-anchor" href="#popupmenu">#</a>PopupMenu</h1><p>Popup menu triggered by click or hover. Used for displaying options.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { PopupMenuWithButton } from &#39;lupine.components&#39;;

const options = [&#39;Settings&#39;, &#39;Messages&#39;, &#39;Logout&#39;];

&lt;PopupMenuWithButton label=&#39;My Account&#39; list={options} handleSelected={(value) =&gt; console.log(&#39;Selected:&#39;, value)} /&gt;;
</code></pre>
`;var Dp=`<h1 id="progress"><a class="header-anchor" href="#progress">#</a>Progress</h1><p>Used to display the progress of uploads, downloads, or other time-consuming operations.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Progress } from &#39;lupine.components&#39;;

&lt;Progress value={75} max={100} showText={true} /&gt;;
</code></pre>
`;var zp=`<h1 id="radiolabel"><a class="header-anchor" href="#radiolabel">#</a>RadioLabel</h1><p>Radio button group labels.</p>
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
`;var Fp=`<h1 id="redirect"><a class="header-anchor" href="#redirect">#</a>Redirect</h1><p>Redirection component for page navigation.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Redirect } from &#39;lupine.components&#39;;

&lt;Redirect to=&#39;/login&#39; /&gt;;
</code></pre>
`;var Op=`<h1 id="resizablesplitter"><a class="header-anchor" href="#resizablesplitter">#</a>ResizableSplitter</h1><p>Splitter that allows dragging to resize two components.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { ResizableSplitter } from &#39;lupine.components&#39;;

&lt;ResizableSplitter left={&lt;div&gt;Left Content&lt;/div&gt;} right={&lt;div&gt;Right Content&lt;/div&gt;} minWidth=&#39;200px&#39; /&gt;;
</code></pre>
`;var Bp=`<h1 id="selectangle"><a class="header-anchor" href="#selectangle">#</a>SelectAngle</h1><p>360-degree angle selector.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SelectAngle } from &#39;lupine.components&#39;;

&lt;SelectAngle value={90} onChange={(angle) =&gt; console.log(&#39;Selected angle:&#39;, angle)} /&gt;;
</code></pre>
`;var Np=`<h1 id="selectwithtitle"><a class="header-anchor" href="#selectwithtitle">#</a>SelectWithTitle</h1><p>Dropdown select list combined with a title.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SelectWithTitle } from &#39;lupine.components&#39;;

const options = [
  { option: &#39;Option 1&#39;, value: &#39;1&#39; },
  { option: &#39;Option 2&#39;, value: &#39;2&#39;, selected: true },
];

const select = SelectWithTitle(&#39;Select Level&#39;, options, (value) =&gt; {
  console.log(&#39;Selected value:&#39;, value);
});
</code></pre>
`;var Wp=`<h1 id="slidetab"><a class="header-anchor" href="#slidetab">#</a>SlideTab</h1><p>Auto-switching tab component with sliding support.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SlideTab } from &#39;lupine.components&#39;;

const items = [
  { title: &#39;Slide 1&#39;, children: &lt;div&gt;Content 1&lt;/div&gt; },
  { title: &#39;Slide 2&#39;, children: &lt;div&gt;Content 2&lt;/div&gt; },
];

&lt;SlideTab items={items} autoPlay={true} interval={3000} /&gt;;
</code></pre>
`;var jp=`<h1 id="spinner"><a class="header-anchor" href="#spinner">#</a>Spinner</h1><p>A spinning loading animation, commonly used while waiting for data to load.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Spinner } from &#39;lupine.components&#39;;

&lt;Spinner size=&#39;30px&#39; color=&#39;var(--primary-color)&#39; /&gt;;
</code></pre>
`;var qp=`<h1 id="stars"><a class="header-anchor" href="#stars">#</a>Stars</h1><p>Star rating component.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Stars } from &#39;lupine.components&#39;;

&lt;Stars value={4.5} onChanged={(score) =&gt; console.log(&#39;Score changed to:&#39;, score)} /&gt;;
</code></pre>
`;var _p=`<h1 id="svgicon"><a class="header-anchor" href="#svgicon">#</a>SvgIcon</h1><p>High-performance native SVG icon component, supporting icons via path or name.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SvgIcon } from &#39;lupine.components&#39;;

&lt;SvgIcon name=&#39;home&#39; size={24} /&gt;
&lt;SvgIcon name=&#39;settings&#39; color=&#39;red&#39; /&gt;
</code></pre>
`;var $p=`<h1 id="switchoption"><a class="header-anchor" href="#switchoption">#</a>SwitchOption</h1><p>Switch option component. Allows switching between two text options.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SwitchOption } from &#39;lupine.components&#39;;

&lt;SwitchOption options={[&#39;Option 1&#39;, &#39;Option 2&#39;]} onChanged={(index) =&gt; console.log(&#39;Current index:&#39;, index)} /&gt;;
</code></pre>
`;var Up=`<h1 id="tabs"><a class="header-anchor" href="#tabs">#</a>Tabs</h1><p>Standard tab component for switching between different content in the same area.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Tabs, TabsPageProps } from &#39;lupine.components&#39;;

const pages: TabsPageProps[] = [
  { title: &#39;Overview&#39;, children: &lt;Overview /&gt; },
  { title: &#39;Details&#39;, children: &lt;Details /&gt; },
];

&lt;Tabs pages={pages} pagePadding=&#39;16px&#39; /&gt;;
</code></pre>
`;var Vp=`<h1 id="textglow"><a class="header-anchor" href="#textglow">#</a>TextGlow</h1><p>Glowing animation text component.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { TextGlow } from &#39;lupine.components&#39;;

&lt;TextGlow text=&#39;Glowing Text&#39; /&gt;;
</code></pre>
`;var Gp=`<h1 id="textscale"><a class="header-anchor" href="#textscale">#</a>TextScale</h1><p>Text component with scaling animation effect.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { TextScale } from &#39;lupine.components&#39;;

&lt;TextScale text=&#39;Scaling Text&#39; /&gt;;
</code></pre>
`;var Yp=`<h1 id="textwave"><a class="header-anchor" href="#textwave">#</a>TextWave</h1><p>Text component with waving animation effect.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { TextWave } from &#39;lupine.components&#39;;

&lt;TextWave text=&#39;Waving Text&#39; /&gt;;
</code></pre>
`;var Jp=`<h1 id="togglebase"><a class="header-anchor" href="#togglebase">#</a>ToggleBase</h1><p>Base class for toggle components, used to implement custom toggle components.</p>
<h2 id="description"><a class="header-anchor" href="#description">#</a>Description</h2><p>This is an internal base class, generally not used directly in applications unless you want to implement custom toggle interaction logic.</p>
`;var Kp=`<h1 id="toggleswitch"><a class="header-anchor" href="#toggleswitch">#</a>ToggleSwitch</h1><p>Toggle switch, commonly used for settings.</p>
<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { ToggleSwitch, ToggleSwitchSize } from &#39;lupine.components&#39;;

&lt;ToggleSwitch checked={true} size={ToggleSwitchSize.Medium} text={{ on: &#39;On&#39;, off: &#39;Off&#39; }} textWidth=&#39;60px&#39; /&gt;;
</code></pre>
`;var Xp="";var Zp=`<h1 id="lupine-press"><a class="header-anchor" href="#lupine-press">#</a>lupine.press</h1><p><code>lupine.press</code> is a lightweight, high-performance documentation site framework built on top of <code>lupine.web</code>. It provides a complete solution for rendering Markdown-based documentation websites with a responsive layout, sidebar navigation, and theming support.</p>
<p>It is designed to work seamlessly with the <code>lupine</code> ecosystem, powering documentation sites like the official LupineJS documentation.</p>
<h2 id="features"><a class="header-anchor" href="#features">#</a>Features</h2><ul>
<li><strong>Responsive Layout</strong>: Built-in <code>PressFrame</code> provides a standard documentation layout with a header, responsive sidebar, and content area.</li>
<li><strong>Markdown Rendering</strong>: Optimized for rendering content generated from Markdown files, including syntax highlighting and standard typography.</li>
<li><strong>Sidebar Navigation</strong>: Automatically generates a multi-level sidebar based on your configuration.</li>
<li><strong>Theming</strong>: Built-in support for multiple themes (e.g., light/dark mode) via <code>lupine.components</code> theme system.</li>
<li><strong>Routing</strong>: explicit integration with <code>PageRouter</code> for handling client-side navigation.</li>
<li><strong>Multilingual Support</strong>: Automatically scans markdown files from multilingual directories and supports language switching.</li>
</ul>
<h2 id="usage-guide"><a class="header-anchor" href="#usage-guide">#</a>Usage Guide</h2><p>To use <code>lupine.press</code>, you typically set up a <code>lupine.web</code> application and configure it to use <code>PressPage</code> as the main route handler.</p>
<h3 id="1-prerequisites"><a class="header-anchor" href="#1-prerequisites">#</a>1. Prerequisites</h3><p>Ensure you have <code>lupine.press</code> installed in your project.</p>
<h3 id="2-basic-setup"><a class="header-anchor" href="#2-basic-setup">#</a>2. Basic Setup</h3><p>In your application entry point (e.g., <code>src/index.tsx</code>), you need to bind the necessary configurations and set up the router.</p>
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
`;var Qp=`<h1 id="lupine-web"><a class="header-anchor" href="#lupine-web">#</a>lupine.web</h1><p><strong>lupine.web</strong> is a React-like, extremely fast, small-size, and lightweight frontend framework.</p>
<p>Explore the documentation:</p>
<ul>
<li><a href="javascript:lpPressLoad('/en/lupine.web/overview')">Overview</a></li>
</ul>
`;var ed=`<h1 id="lupine-web"><a class="header-anchor" href="#lupine-web">#</a>lupine.web</h1><p><strong>lupine.web</strong> is a React-like, extremely fast, small-size, and lightweight frontend framework designed for modern web development. It focuses on performance, simplicity, and a full-stack experience when paired with <code>lupine.api</code>.</p>
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
`;var td=`<h3 id="\u67B6\u6784\u4E0E\u5DE5\u4F5C\u6D41-architecture-workflow"><a class="header-anchor" href="#\u67B6\u6784\u4E0E\u5DE5\u4F5C\u6D41-architecture-workflow">#</a>\u{1F3D7}\uFE0F \u67B6\u6784\u4E0E\u5DE5\u4F5C\u6D41 (Architecture &amp; Workflow)</h3><p>Lupine.js \u8FD0\u884C\u4E00\u4E2A\u5355\u4F8B\u670D\u52A1\u5668\u5B9E\u4F8B\uFF0C\u53EF\u4EE5\u540C\u65F6\u670D\u52A1\u591A\u4E2A\u57DF\u540D\u548C\u5E94\u7528\u7A0B\u5E8F\u3002</p>
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
`;var nd=`<h1 id="css-in-js"><a class="header-anchor" href="#css-in-js">#</a>CSS-in-JS</h1><p>Lupine.js \u5185\u7F6E\u6216\u8005\u8BF4\u81EA\u5E26\u4E86\u4E00\u4E2A\u8F7B\u91CF\u7EA7\u7684 <strong>CSS-in-JS</strong> \u5F15\u64CE\u3002\u5B83\u652F\u6301\u5D4C\u5957\u3001\u4F2A\u9009\u62E9\u5668\u3001\u5A92\u4F53\u67E5\u8BE2\u548C\u4F5C\u7528\u57DF\u52A8\u753B\u7B49\u5F3A\u5927\u529F\u80FD\uFF0C\u4E14\u65E0\u9700\u4F9D\u8D56 styled-components \u6216 emotion \u7B49\u5916\u90E8\u5E93\u3002</p>
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
`;var rd="";var od=`<h1 id="\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3\u4E0E\u7F16\u8F91"><a class="header-anchor" href="#\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3\u4E0E\u7F16\u8F91">#</a>\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3\u4E0E\u7F16\u8F91</h1><p>Lupine.js \u91C7\u7528\u4E86\u4E00\u79CD\u72EC\u7279\u7684 <strong>&quot;\u7EC4\u4EF6\u7EA7\u6E32\u67D3 (Component-Level Rendering)&quot;</strong> \u7B56\u7565\uFF0C\u8FD9\u4E0E React \u6216 Vue \u7B49\u4F20\u7EDF\u7684\u865A\u62DF DOM \u6846\u67B6\u6709\u663E\u8457\u4E0D\u540C\u3002\u8FD9\u79CD\u65B9\u6CD5\u5728\u5904\u7406\u5927\u578B\u5217\u8868\u548C\u590D\u6742\u6570\u636E\u8868\u683C\uFF08\u4F8B\u5982\u7BA1\u7406\u540E\u53F0 Admin Panel\uFF09\u65F6\u7279\u522B\u5F3A\u5927\u3002</p>
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
`;var id=`<h1 id="page-router-\u9875\u9762\u8DEF\u7531"><a class="header-anchor" href="#page-router-\u9875\u9762\u8DEF\u7531">#</a>Page Router (\u9875\u9762\u8DEF\u7531)</h1><p><strong>Lupine.web</strong> \u4E2D\u7684 <code>PageRouter</code> \u662F\u4E00\u4E2A\u5F3A\u5927\u7684\u5BA2\u6237\u7AEF\u8DEF\u7531\u7CFB\u7EDF\uFF0C\u5176\u903B\u8F91\u8BBE\u8BA1\u4E0E\u540E\u7AEF\u7684 <code>ApiRouter</code> (\u4F4D\u4E8E <code>lupine.api</code> \u4E2D) \u4FDD\u6301 <strong>\u540C\u6784</strong>\u3002\u5B83\u652F\u6301\u5D4C\u5957\u8DEF\u7531\u3001\u4E2D\u95F4\u4EF6\u8FC7\u6EE4\u5668\u3001\u52A8\u6001\u53C2\u6570\u548C\u5E03\u5C40\u6846\u67B6 (Layout Frames)\u3002</p>
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
`;var ad=`<h1 id="ssr-\u670D\u52A1\u7AEF\u6E32\u67D3"><a class="header-anchor" href="#ssr-\u670D\u52A1\u7AEF\u6E32\u67D3">#</a>SSR (\u670D\u52A1\u7AEF\u6E32\u67D3)</h1><p>Lupine.js \u4ECE\u4E00\u5F00\u59CB\u5C31\u5C06 <strong>\u670D\u52A1\u7AEF\u6E32\u67D3 (SSR)</strong> \u89C6\u4E3A\u4E00\u7B49\u516C\u6C11\u3002\u5927\u591A\u6570 SPA \u6846\u67B6\u5C06 SSR \u89C6\u4E3A\u4E8B\u540E\u7684\u8865\u5145\uFF0C\u6216\u8005\u9700\u8981\u590D\u6742\u7684\u5143\u6846\u67B6\uFF08\u5982 React \u7684 Next.js\uFF09\u652F\u6301\uFF0C\u800C Lupine \u5219\u76F4\u63A5\u5C06 SSR \u96C6\u6210\u5230\u5176\u6838\u5FC3\u67B6\u6784\u4E2D\uFF08<code>lupine.api</code> \u548C <code>lupine.web</code>\uFF09\u3002</p>
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
`;var sd=`<h1 id="theme-\u4E3B\u9898"><a class="header-anchor" href="#theme-\u4E3B\u9898">#</a>\u{1F317} Theme (\u4E3B\u9898)</h1><p>Lupine.js \u5185\u7F6E\u4E86\u5BF9\u591A\u4E3B\u9898\uFF08\u5982\u4EAE\u8272/\u6697\u8272\u6A21\u5F0F\uFF09\u7684\u652F\u6301\uFF0C\u5E76\u5B8C\u7F8E\u96C6\u6210\u4E86 SSR\u3002</p>
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
`;var ld=`<h1 id="\u5B89\u88C5\u8BF4\u660E"><a class="header-anchor" href="#\u5B89\u88C5\u8BF4\u660E">#</a>\u5B89\u88C5\u8BF4\u660E</h1><p>\u53EF\u4EE5\u901A\u8FC7\u514B\u9686\u4E3B\u4ED3\u5E93\u6765\u5B89\u88C5 LupineJS\u3002</p>
<h2 id="\u5F00\u53D1\u73AF\u5883"><a class="header-anchor" href="#\u5F00\u53D1\u73AF\u5883">#</a>\u5F00\u53D1\u73AF\u5883</h2><ol>
<li><p><strong>\u514B\u9686\u4ED3\u5E93</strong>:</p>
<pre><code class="language-bash">git clone https://github.com/uuware/lupine.js.git
</code></pre>
</li>
<li><p><strong>\u5B89\u88C5\u4F9D\u8D56</strong>:</p>
<pre><code class="language-bash">npm install
</code></pre>
</li>
<li><p><strong>\u73AF\u5883\u914D\u7F6E</strong>:
\u5C06 <code>.env.sample</code> \u590D\u5236\u4E3A <code>.env</code> \u5E76\u6839\u636E\u9700\u8981\u8FDB\u884C\u914D\u7F6E\u3002</p>
</li>
</ol>
<h2 id="\u751F\u4EA7\u73AF\u5883\u6784\u5EFA"><a class="header-anchor" href="#\u751F\u4EA7\u73AF\u5883\u6784\u5EFA">#</a>\u751F\u4EA7\u73AF\u5883\u6784\u5EFA</h2><p>\u6784\u5EFA\u751F\u4EA7\u7248\u672C\uFF1A</p>
<pre><code class="language-bash">npm run build
</code></pre>
<p>\u6784\u5EFA\u7ED3\u679C\u5C06\u751F\u6210\u5728 <code>dist/server_root</code> \u76EE\u5F55\u4E0B\u3002</p>
`;var cd=`<h1 id="\u4E86\u89E3-lupine-js"><a class="header-anchor" href="#\u4E86\u89E3-lupine-js">#</a>\u4E86\u89E3 Lupine.js</h1><p>Lupine.js \u662F\u4E00\u4E2A\u5305\u542B\u524D\u540E\u7AEF\u670D\u52A1\u7684\u5168\u529F\u80FD Web \u5E94\u7528\u7A0B\u5E8F\u6846\u67B6\u3002</p>
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
`;var pd="";var dd=`<h1 id="api-module-src-api"><a class="header-anchor" href="#api-module-src-api">#</a>API Module (<code>src/api</code>)</h1><p>API \u6A21\u5757\u63D0\u4F9B\u4E86\u7F16\u5199\u5E94\u7528\u7A0B\u5E8F\u4E1A\u52A1\u903B\u8F91\u7684\u6846\u67B6\u3002\u5B83\u7684\u4F5C\u7528\u7C7B\u4F3C\u4E8E Express.js\uFF0C\u4F46\u9488\u5BF9 lupine \u751F\u6001\u7CFB\u7EDF\u8FDB\u884C\u4E86\u4F18\u5316\u3002</p>
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
`;var ud=`<h1 id="server-src-app"><a class="header-anchor" href="#server-src-app">#</a>Server (<code>src/app</code>)</h1><p>\u670D\u52A1\u5668\u7EC4\u4EF6\u8D1F\u8D23\u5904\u7406\u4F20\u5165\u7684\u7F51\u7EDC\u8BF7\u6C42\uFF0C\u7BA1\u7406 SSL \u8BC1\u4E66\uFF0C\u5E76\u6839\u636E\u57DF\u540D\u914D\u7F6E\u5C06\u8BF7\u6C42\u5206\u53D1\u5230\u76F8\u5E94\u7684\u5E94\u7528\u7A0B\u5E8F\u3002\u5B83\u652F\u6301\u96C6\u7FA4\u903B\u8F91\uFF0C\u4EE5\u9AD8\u6548\u5229\u7528\u591A\u6838 CPU\u3002</p>
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
`;var gd=`<h1 id="lupine-api-dashboard"><a class="header-anchor" href="#lupine-api-dashboard">#</a>lupine.api dashboard</h1><p>lupine.api \u81EA\u5E26\u4E00\u4E2A\u53EF\u4EE5\u6269\u5145\u7684 dashboard\uFF0C\u7528\u4E8E\u7BA1\u7406 api \u670D\u52A1\u3002dashboard \u5DE6\u8FB9\u662F\u4F17\u591A\u7BA1\u7406\u83DC\u5355\uFF0C\u53F3\u8FB9\u662F\u591A\u9875\u9762\u7684 tab \u5185\u5BB9\u9875\u9762\u3002</p>
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
`;var hd=`<h1 id="lupine-api"><a class="header-anchor" href="#lupine-api">#</a>lupine.api</h1><p>lupine.api is a fast, lightweight, and flexible node.js based server framework. It is designed to work seamlessly with <a href="https://github.com/uuware/lupine.web">lupine.web</a> to provide Server-Side Rendering (SSR) and modern API capabilities.</p>
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
`;var md=`<h1 id="dateutils"><a class="header-anchor" href="#dateutils">#</a>DateUtils</h1><p>Comprehensive date manipulation utilities.</p>
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
`;var fd=`<h1 id="domutils"><a class="header-anchor" href="#domutils">#</a>DomUtils</h1><p>Helper functions for common DOM operations, mostly shorthand for <code>querySelector</code>.</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { DomUtils } from &#39;lupine.components&#39;;

// Get input value
const value = DomUtils.getValue(&#39;#my-input&#39;);

// Trigger click on a hidden file input
const fDom = DomUtils.bySelector(&#39;.up-file&#39;) as HTMLInputElement;
fDom.click();
</code></pre>
`;var bd=`<h1 id="downloadstream"><a class="header-anchor" href="#downloadstream">#</a>downloadStream</h1><p>Download a <code>Blob</code> as a file by creating a temporary anchor tag.</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { downloadStream } from &#39;lupine.components&#39;;

const onDownload = async (name: string) =&gt; {
  const response = await fetch(&#39;/api/download?file=&#39; + name);
  const blob = await response.blob();
  downloadStream(blob, name);
};
</code></pre>
`;var xd=`<h1 id="dragutil"><a class="header-anchor" href="#dragutil">#</a>DragUtil</h1><p>Helper for implementing drag-and-drop or touch-move functionality.</p>
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
`;var vd=`<h1 id="dynamicalload"><a class="header-anchor" href="#dynamicalload">#</a>DynamicalLoad</h1><p>Dynamically load external Scripts or CSS files. Used for lazy loading third-party SDKs.</p>
<p><strong>Usage Example (from <code>wx-share.ts</code>):</strong></p>
<pre><code class="language-typescript">import { DynamicalLoad } from &#39;lupine.components&#39;;

// Load WeChat JS-SDK dynamically
if (typeof wx === &#39;undefined&#39;) {
  await DynamicalLoad.loadScript(&#39;//res.wx.qq.com/open/js/jweixin-1.6.0.js&#39;, &#39;jweixin&#39;);
}
</code></pre>
`;var yd=`<h1 id="formatbytes"><a class="header-anchor" href="#formatbytes">#</a>formatBytes</h1><p>Format file size in bytes into human-readable strings (KB, MB, GB, etc.).</p>
<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>
<pre><code class="language-typescript">import { formatBytes } from &#39;lupine.components&#39;;

const sizeStr = formatBytes(1024 * 1024 * 5); // &quot;5 MB&quot;
const sizeStr2 = formatBytes(123456); // &quot;120.56 KB&quot;
</code></pre>
`;var kd=`<h1 id="lupine-components-libs"><a class="header-anchor" href="#lupine-components-libs">#</a>lupine.components libs</h1><p>This directory contains a suite of utility libraries designed for efficient web development.</p>
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
`;var wd=`<h1 id="litedom"><a class="header-anchor" href="#litedom">#</a>LiteDom</h1><p>A lightweight, chainable DOM wrapper similar to jQuery.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { LiteDom } from &#39;lupine.components&#39;;

const el = new LiteDom(&#39;#my-element&#39;);
el.css(&#39;color&#39;, &#39;red&#39;)
  .html(&#39;Hello World&#39;)
  .on(&#39;click&#39;, () =&gt; {
    console.log(&#39;Clicked!&#39;);
  });
</code></pre>
`;var Sd=`<h1 id="messagehub"><a class="header-anchor" href="#messagehub">#</a>MessageHub</h1><p>A publish-subscribe event bus for communication between components.</p>
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
`;var Td=`<h1 id="observable"><a class="header-anchor" href="#observable">#</a>Observable</h1><p>Implementation of the Observable pattern, inspired by RxJS.</p>
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
`;var Cd=`<h1 id="simplestorage"><a class="header-anchor" href="#simplestorage">#</a>SimpleStorage</h1><p>A wrapper for <code>localStorage</code> (or similar key-value storage) offering typed getters.</p>
<p><strong>Usage:</strong></p>
<pre><code class="language-typescript">import { SimpleStorage } from &#39;lupine.components&#39;;

// Assuming initialized with some storage object like localStorage
const storage = new SimpleStorage(localStorage as any);

storage.set(&#39;theme&#39;, &#39;dark&#39;);
const theme = storage.get(&#39;theme&#39;, &#39;light&#39;); // returns &#39;dark&#39;
const isDebug = storage.getBoolean(&#39;debug&#39;, false);
</code></pre>
`;var Pd=`<h1 id="uploadfile"><a class="header-anchor" href="#uploadfile">#</a>uploadFile</h1><p>Handle file uploads with chunking support, progress tracking, and retries.</p>
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
`;var Ed=`<h1 id="action-sheet-\u52A8\u4F5C\u5217\u8868"><a class="header-anchor" href="#action-sheet-\u52A8\u4F5C\u5217\u8868">#</a>Action Sheet (\u52A8\u4F5C\u5217\u8868)</h1><p>\u624B\u673A\u7AEF\u5F39\u51FA\u7684\u6ED1\u52A8\u7A97\u53E3\uFF0C\u7528\u4E8E\u663E\u793A\u4E00\u4E2A\u65B0\u9875\u6216\u8BBE\u5B9A\u9009\u9879\u7B49\u3002</p>
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
`;var Md=`<h1 id="button-\u6309\u94AE"><a class="header-anchor" href="#button-\u6309\u94AE">#</a>Button (\u6309\u94AE)</h1><p>\u57FA\u7840\u6309\u94AE\uFF0C\u652F\u6301\u591A\u79CD\u5C3A\u5BF8\u548C <code>button-push</code> \u52A8\u753B\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Button, ButtonSize } from &#39;lupine.components&#39;;

// \u4E0D\u540C\u5C3A\u5BF8\u7684\u6309\u94AE
&lt;Button text=&#39;\u63D0\u4EA4&#39; size={ButtonSize.Large} onClick={() =&gt; {}} /&gt;
&lt;Button text=&#39;\u641C\u7D22&#39; size={ButtonSize.Medium} onClick={() =&gt; {}} /&gt;
&lt;Button text=&#39;\u53D6\u6D88&#39; size={ButtonSize.Small} onClick={() =&gt; {}} /&gt;
</code></pre>
`;var Ld=`<h1 id="dragfresh-\u62D6\u52A8\u5237\u65B0"><a class="header-anchor" href="#dragfresh-\u62D6\u52A8\u5237\u65B0">#</a>DragFresh (\u62D6\u52A8\u5237\u65B0)</h1><p>\u62D6\u52A8\u5237\u65B0\u7EC4\u4EF6\uFF0C\u5E38\u7528\u4E8E\u79FB\u52A8\u7AEF\u5217\u8868\u9876\u90E8\u3002</p>
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
`;var Ad=`<h1 id="editablelabel-\u53EF\u7F16\u8F91\u6807\u7B7E"><a class="header-anchor" href="#editablelabel-\u53EF\u7F16\u8F91\u6807\u7B7E">#</a>EditableLabel (\u53EF\u7F16\u8F91\u6807\u7B7E)</h1><p>\u53CC\u51FB\u53EF\u7F16\u8F91\u7684\u6807\u7B7E\uFF0C\u5149\u6807\u79FB\u51FA\uFF08\u5931\u7126\uFF09\u65F6\u89E6\u53D1\u4FDD\u5B58\u4E8B\u4EF6\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { EditableLabel } from &#39;lupine.components&#39;;

&lt;EditableLabel
  value=&#39;\u70B9\u51FB\u6211\u8BD5\u8BD5&#39;
  onSave={(newValue) =&gt; {
    console.log(&#39;\u4FDD\u5B58\u65B0\u5185\u5BB9:&#39;, newValue);
  }}
/&gt;;
</code></pre>
`;var Rd=`<h1 id="floatwindow-\u6D6E\u7A97"><a class="header-anchor" href="#floatwindow-\u6D6E\u7A97">#</a>FloatWindow (\u6D6E\u7A97)</h1><p>\u4E00\u4E2A\u53EF\u4EE5\u62D6\u52A8\u7684\u5F39\u51FA\u7A97\u53E3\u3002\u652F\u6301 Modal \u548C\u975E Modal \u6A21\u5F0F\u3002</p>
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
`;var Hd=`<h1 id="grid-\u7F51\u683C"><a class="header-anchor" href="#grid-\u7F51\u683C">#</a>Grid (\u7F51\u683C)</h1><p>\u54CD\u5E94\u5F0F\u7F51\u683C\u5E03\u5C40\uFF0C\u7528\u4E8E\u663E\u793A\u590D\u6742\u5E03\u5C40\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Grid } from &#39;lupine.components&#39;;

&lt;Grid columns={3} gap=&#39;10px&#39;&gt;
  &lt;div&gt;\u9879 1&lt;/div&gt;
  &lt;div&gt;\u9879 2&lt;/div&gt;
  &lt;div&gt;\u9879 3&lt;/div&gt;
&lt;/Grid&gt;;
</code></pre>
`;var Id=`<h1 id="htmlload-html-\u52A0\u8F7D"><a class="header-anchor" href="#htmlload-html-\u52A0\u8F7D">#</a>HtmlLoad (HTML \u52A0\u8F7D)</h1><p>\u7528\u4E8E\u5F02\u6B65\u52A0\u8F7D\u5E76\u663E\u793A\u8FDC\u7A0B HTML \u5185\u5BB9\u7684\u7EC4\u4EF6\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { HtmlLoad } from &#39;lupine.components&#39;;

&lt;HtmlLoad url=&#39;/api/v1/content/article-1&#39; /&gt;;
</code></pre>
`;var Dd=`<h1 id="htmlvar"><a class="header-anchor" href="#htmlvar">#</a>HtmlVar</h1><p><code>HtmlVar</code> \u662F Lupine.js \u54CD\u5E94\u5F0F\u7CFB\u7EDF\u7684\u6838\u5FC3\u539F\u8BED\u3002\u4E0E\u8BD5\u56FE\u81EA\u52A8\u68C0\u6D4B\u72B6\u6001\u53D8\u5316\u7684\u73B0\u4EE3\u6846\u67B6\u4E0D\u540C\uFF0C<code>HtmlVar</code> \u63D0\u4F9B\u4E86\u4E00\u4E2A\u624B\u52A8\u7684\u201C\u53E5\u67C4 (Handle)\u201D\uFF0C\u8BA9\u4F60\u53EF\u4EE5\u968F\u65F6\u66F4\u65B0\u7279\u5B9A\u7684 DOM \u63D2\u69FD\u3002</p>
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
`;var zd=`<h1 id="lupine-components"><a class="header-anchor" href="#lupine-components">#</a>lupine.components</h1><p>lupine.components \u662F\u4E00\u4E2A\u7C7B\u4F3C\u4E8E React \u7684\u3001\u901F\u5EA6\u6781\u5FEB\u3001\u4F53\u79EF\u5C0F\u5DE7\u4E14\u8F7B\u91CF\u7EA7\u7684 lupine.web \u524D\u7AEF\u7EC4\u4EF6\u96C6\u5408\u3002
\u5B83\u5305\u542B\u4E30\u5BCC\u7684\u5E38\u7528\u684C\u9762\u548C\u79FB\u52A8\u7EC4\u4EF6\uFF0C\u65E8\u5728\u4E3A\u5F00\u53D1\u8005\u63D0\u4F9B\u9AD8\u6027\u80FD\u7684 UI \u89E3\u51B3\u65B9\u6848\u3002</p>
<h2 id="\u6838\u5FC3\u7279\u6027"><a class="header-anchor" href="#\u6838\u5FC3\u7279\u6027">#</a>\u6838\u5FC3\u7279\u6027</h2><ul>
<li><strong>\u6781\u81F4\u8F7B\u91CF</strong>\uFF1A\u65E0\u5197\u4F59\u4EE3\u7801\uFF0C\u786E\u4FDD\u5E94\u7528\u52A0\u8F7D\u901F\u5EA6\u3002</li>
<li><strong>React \u8BED\u6CD5\u9A71\u52A8</strong>\uFF1A\u652F\u6301 TSX \u8BED\u6CD5\uFF0C\u5F00\u53D1\u4F53\u9A8C\u4E1D\u6ED1\u3002</li>
<li><strong>\u8DE8\u7AEF\u9002\u914D</strong>\uFF1A\u7EC4\u4EF6\u539F\u751F\u652F\u6301\u684C\u9762\u7AEF\u4E0E\u79FB\u52A8\u7AEF\u7684\u54CD\u5E94\u5F0F\u4EA4\u4E92\u3002</li>
<li><strong>\u96F6\u4F9D\u8D56</strong>\uFF1A\u4FDD\u6301\u4F9D\u8D56\u6811\u7B80\u6D01\uFF0C\u6613\u4E8E\u7EF4\u62A4\u548C\u90E8\u7F72\u3002</li>
</ul>
<h2 id="\u5FEB\u901F\u6D4F\u89C8"><a class="header-anchor" href="#\u5FEB\u901F\u6D4F\u89C8">#</a>\u5FEB\u901F\u6D4F\u89C8</h2><p>\u60A8\u53EF\u4EE5\u901A\u8FC7\u5DE6\u4FA7\u8FB9\u680F\u6D4F\u89C8\u5404\u7C7B\u7EC4\u4EF6\u7684\u8BE6\u7EC6\u8BF4\u660E\u548C\u5B9E\u88C5\u4F8B\u5B50\u3002</p>
`;var Fd=`<h1 id="inputwithtitle-\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846"><a class="header-anchor" href="#inputwithtitle-\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846">#</a>InputWithTitle (\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846)</h1><p>\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846\u7EC4\u5408\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { InputWithTitle } from &#39;lupine.components&#39;;

const input = InputWithTitle(&#39;\u7528\u6237\u540D&#39;, &#39;\u8BF7\u8F93\u5165\u60A8\u7684\u59D3\u540D&#39;, (value) =&gt; {
  console.log(&#39;\u8F93\u5165\u5185\u5BB9:&#39;, value);
});
</code></pre>
`;var Od=`<h1 id="menubar-\u6A2A\u5411\u83DC\u5355\u680F"><a class="header-anchor" href="#menubar-\u6A2A\u5411\u83DC\u5355\u680F">#</a>Menubar (\u6A2A\u5411\u83DC\u5355\u680F)</h1><p>\u6A2A\u5411\u83DC\u5355\u680F\uFF0C\u652F\u6301\u4E8C\u7EA7\u4E0B\u62C9\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Menubar } from &#39;lupine.components&#39;;

const menuItems = [
  { text: &#39;\u9996\u9875&#39;, link: &#39;/&#39; },
  {
    text: &#39;\u4EA7\u54C1&#39;,
    children: [
      { text: &#39;LupineJS&#39;, link: &#39;/lupine&#39; },
      { text: &#39;Components&#39;, link: &#39;/components&#39; },
    ],
  },
];

&lt;Menubar items={menuItems} /&gt;;
</code></pre>
`;var Bd=`<h1 id="menusidebar-\u4FA7\u8FB9\u5BFC\u822A\u680F"><a class="header-anchor" href="#menusidebar-\u4FA7\u8FB9\u5BFC\u822A\u680F">#</a>MenuSidebar (\u4FA7\u8FB9\u5BFC\u822A\u680F)</h1><p>\u7EB5\u5411\u5BFC\u822A\u83DC\u5355\uFF0C\u652F\u6301\u591A\u7EA7\u76EE\u5F55\uFF0C\u9002\u914D\u684C\u9762\u4E0E\u79FB\u52A8\u7AEF\u3002</p>
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
`;var Nd=`<h1 id="messagebox-\u6D88\u606F\u6846"><a class="header-anchor" href="#messagebox-\u6D88\u606F\u6846">#</a>MessageBox (\u6D88\u606F\u6846)</h1><p>\u9884\u5B9A\u4E49\u7684\u5BF9\u8BDD\u6846\uFF08\u5982 Yes/No, Ok/Cancel\uFF09\uFF0C\u7528\u4E8E\u5FEB\u901F\u63D0\u793A\u3002</p>
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
`;var Wd=`<h1 id="modal-\u6A21\u6001\u6846"><a class="header-anchor" href="#modal-\u6A21\u6001\u6846">#</a>Modal (\u6A21\u6001\u6846)</h1><p>\u4E00\u4E2A\u5177\u6709 Modal \u6216\u65E0 Modal \u6548\u679C\u7684\u5F39\u51FA\u7A97\u53E3\uFF0C\u5E38\u7528\u4E8E\u963B\u585E\u5F0F\u4EA4\u4E92\u3002\u53EF\u4EE5\u62D6\u52A8\u3002</p>
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
`;var jd=`<h1 id="noticemessage-\u901A\u77E5\u6D88\u606F"><a class="header-anchor" href="#noticemessage-\u901A\u77E5\u6D88\u606F">#</a>NoticeMessage (\u901A\u77E5\u6D88\u606F)</h1><p>\u4E00\u4E2A\u5F88\u5E38\u7528\u7684\u6838\u5FC3\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u5728\u9875\u9762\u9876\u90E8\u663E\u793A\u5168\u5C40\u901A\u77E5\u6D88\u606F\u3002\u652F\u6301\u591A\u79CD\u989C\u8272\u7B49\u7EA7\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { NotificationMessage, NotificationColor } from &#39;lupine.components&#39;;

// \u6210\u529F\u901A\u77E5
NotificationMessage.sendMessage(&#39;\u6570\u636E\u5DF2\u4FDD\u5B58&#39;, NotificationColor.Success);

// \u9519\u8BEF\u901A\u77E5 (\u6C38\u4E45\u663E\u793A)
NotificationMessage.sendMessage(&#39;\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u68C0\u67E5&#39;, NotificationColor.Error, true);
</code></pre>
`;var qd=`<h1 id="paginglink-\u5206\u9875\u94FE\u63A5"><a class="header-anchor" href="#paginglink-\u5206\u9875\u94FE\u63A5">#</a>PagingLink (\u5206\u9875\u94FE\u63A5)</h1><p>\u5206\u9875\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u5C55\u793A\u548C\u8DF3\u8F6C\u5230\u4E0D\u540C\u9875\u7801\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { PagingLink } from &#39;lupine.components&#39;;

&lt;PagingLink totalCount={100} pageSize={10} currentPage={1} onPageChange={(page) =&gt; console.log(&#39;\u8DF3\u8F6C\u5230\u9875\u7801:&#39;, page)} /&gt;;
</code></pre>
`;var _d=`<h1 id="popupmenu-\u5F39\u51FA\u83DC\u5355"><a class="header-anchor" href="#popupmenu-\u5F39\u51FA\u83DC\u5355">#</a>PopupMenu (\u5F39\u51FA\u83DC\u5355)</h1><p>\u5F39\u51FA\u5F0F\u83DC\u5355\uFF0C\u70B9\u51FB\u6216\u60AC\u505C\u89E6\u53D1\u3002\u7528\u4E8E\u663E\u793A\u9009\u9879\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { PopupMenuWithButton } from &#39;lupine.components&#39;;

const list = [&#39;\u4E2A\u4EBA\u8BBE\u7F6E&#39;, &#39;\u6D88\u606F\u4E2D\u5FC3&#39;, &#39;\u9000\u51FA\u767B\u5F55&#39;];

&lt;PopupMenuWithButton label=&#39;\u6211\u7684\u8D26\u6237&#39; list={list} handleSelected={(value) =&gt; console.log(&#39;\u9009\u62E9\u4E86:&#39;, value)} /&gt;;
</code></pre>
`;var $d=`<h1 id="progress-\u8FDB\u5EA6\u6761"><a class="header-anchor" href="#progress-\u8FDB\u5EA6\u6761">#</a>Progress (\u8FDB\u5EA6\u6761)</h1><p>\u7528\u4E8E\u663E\u793A\u4E0A\u4F20\u3001\u4E0B\u8F7D\u6216\u5176\u4ED6\u8017\u65F6\u64CD\u4F5C\u7684\u8FDB\u5EA6\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Progress } from &#39;lupine.components&#39;;

&lt;Progress value={75} max={100} showText={true} /&gt;;
</code></pre>
`;var Ud=`<h1 id="radiolabel-\u5355\u9009\u7EC4"><a class="header-anchor" href="#radiolabel-\u5355\u9009\u7EC4">#</a>RadioLabel (\u5355\u9009\u7EC4)</h1><p>\u5355\u9009\u6309\u94AE\u7EC4\u65B9\u6848\u3002</p>
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
`;var Vd=`<h1 id="redirect-\u91CD\u5B9A\u5411"><a class="header-anchor" href="#redirect-\u91CD\u5B9A\u5411">#</a>Redirect (\u91CD\u5B9A\u5411)</h1><p>\u91CD\u5B9A\u5411\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u9875\u9762\u8DF3\u8F6C\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Redirect } from &#39;lupine.components&#39;;

&lt;Redirect to=&#39;/login&#39; /&gt;;
</code></pre>
`;var Gd=`<h1 id="resizablesplitter-\u53EF\u8C03\u5206\u5272\u5668"><a class="header-anchor" href="#resizablesplitter-\u53EF\u8C03\u5206\u5272\u5668">#</a>ResizableSplitter (\u53EF\u8C03\u5206\u5272\u5668)</h1><p>\u53EF\u62D6\u62C9\u8C03\u6574\u4E24\u4E2A\u7EC4\u4EF6\u5927\u5C0F\u7684\u5206\u5272\u5668\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { ResizableSplitter } from &#39;lupine.components&#39;;

&lt;ResizableSplitter left={&lt;div&gt;\u5DE6\u4FA7\u5185\u5BB9&lt;/div&gt;} right={&lt;div&gt;\u53F3\u4FA7\u5185\u5BB9&lt;/div&gt;} minWidth=&#39;200px&#39; /&gt;;
</code></pre>
`;var Yd=`<h1 id="selectangle-\u89D2\u5EA6\u9009\u62E9"><a class="header-anchor" href="#selectangle-\u89D2\u5EA6\u9009\u62E9">#</a>SelectAngle (\u89D2\u5EA6\u9009\u62E9)</h1><p>360 \u5EA6\u89D2\u5EA6\u9009\u62E9\u5668\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SelectAngle } from &#39;lupine.components&#39;;

&lt;SelectAngle value={90} onChange={(angle) =&gt; console.log(&#39;\u9009\u62E9\u89D2\u5EA6:&#39;, angle)} /&gt;;
</code></pre>
`;var Jd=`<h1 id="selectwithtitle-\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868"><a class="header-anchor" href="#selectwithtitle-\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868">#</a>SelectWithTitle (\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868)</h1><p>\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u9009\u62E9\u5217\u8868\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SelectWithTitle } from &#39;lupine.components&#39;;

const options = [
  { option: &#39;\u9009\u9879 1&#39;, value: &#39;1&#39; },
  { option: &#39;\u9009\u9879 2&#39;, value: &#39;2&#39;, selected: true },
];

const select = SelectWithTitle(&#39;\u8BF7\u9009\u62E9\u7B49\u7EA7&#39;, options, (value) =&gt; {
  console.log(&#39;\u9009\u62E9\u4E86:&#39;, value);
});
</code></pre>
`;var Kd=`<h1 id="slidetab-\u6ED1\u52A8\u9009\u9879\u5361"><a class="header-anchor" href="#slidetab-\u6ED1\u52A8\u9009\u9879\u5361">#</a>SlideTab (\u6ED1\u52A8\u9009\u9879\u5361)</h1><p>\u81EA\u52A8\u5207\u6362\u7684 Tab \u9875\u9762\u7684\u7EC4\u4EF6\uFF0C\u652F\u6301\u6ED1\u52A8\u6548\u679C\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SlideTab } from &#39;lupine.components&#39;;

const items = [
  { title: &#39;Slide 1&#39;, children: &lt;div&gt;\u5185\u5BB9 1&lt;/div&gt; },
  { title: &#39;Slide 2&#39;, children: &lt;div&gt;\u5185\u5BB9 2&lt;/div&gt; },
];

&lt;SlideTab items={items} autoPlay={true} interval={3000} /&gt;;
</code></pre>
`;var Xd=`<h1 id="spinner-\u52A0\u8F7D\u52A8\u753B"><a class="header-anchor" href="#spinner-\u52A0\u8F7D\u52A8\u753B">#</a>Spinner (\u52A0\u8F7D\u52A8\u753B)</h1><p>\u65CB\u8F6C\u7684\u52A0\u8F7D\u52A8\u753B\uFF0C\u5E38\u7528\u4E8E\u6570\u636E\u52A0\u8F7D\u7B49\u5F85\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Spinner } from &#39;lupine.components&#39;;

&lt;Spinner size=&#39;30px&#39; color=&#39;var(--primary-color)&#39; /&gt;;
</code></pre>
`;var Zd=`<h1 id="stars-\u661F\u7EA7\u8BC4\u5206"><a class="header-anchor" href="#stars-\u661F\u7EA7\u8BC4\u5206">#</a>Stars (\u661F\u7EA7\u8BC4\u5206)</h1><p>\u661F\u7EA7\u8BC4\u5206\u7EC4\u4EF6\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Stars } from &#39;lupine.components&#39;;

&lt;Stars value={4.5} onChanged={(score) =&gt; console.log(&#39;\u8BC4\u5206\u6539\u4E3A:&#39;, score)} /&gt;;
</code></pre>
`;var Qd=`<h1 id="svgicon-svg-\u56FE\u6807"><a class="header-anchor" href="#svgicon-svg-\u56FE\u6807">#</a>SvgIcon (SVG \u56FE\u6807)</h1><p>\u9AD8\u6027\u80FD\u539F\u751F SVG \u56FE\u6807\u7EC4\u4EF6\uFF0C\u652F\u6301\u901A\u8FC7\u8DEF\u5F84\u6216\u540D\u79F0\u663E\u793A\u56FE\u6807\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SvgIcon } from &#39;lupine.components&#39;;

&lt;SvgIcon name=&#39;home&#39; size={24} /&gt;
&lt;SvgIcon name=&#39;settings&#39; color=&#39;red&#39; /&gt;
</code></pre>
`;var eu=`<h1 id="switchoption-\u5207\u6362\u9009\u9879"><a class="header-anchor" href="#switchoption-\u5207\u6362\u9009\u9879">#</a>SwitchOption (\u5207\u6362\u9009\u9879)</h1><p>\u5207\u6362\u9009\u9879\u7EC4\u4EF6\u3002\u53EF\u4EE5\u5728\u4E24\u4E2A\u6587\u5B57\u9009\u9879\u4E4B\u95F4\u5207\u6362\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SwitchOption } from &#39;lupine.components&#39;;

&lt;SwitchOption options={[&#39;\u9009\u9879 1&#39;, &#39;\u9009\u9879 2&#39;]} onChanged={(index) =&gt; console.log(&#39;\u5F53\u524D\u7D22\u5F15:&#39;, index)} /&gt;;
</code></pre>
`;var tu=`<h1 id="tabs-\u9009\u9879\u5361"><a class="header-anchor" href="#tabs-\u9009\u9879\u5361">#</a>Tabs (\u9009\u9879\u5361)</h1><p>\u6807\u51C6\u7684\u9009\u9879\u5361\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u5728\u540C\u4E00\u533A\u57DF\u5207\u6362\u4E0D\u540C\u5185\u5BB9\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Tabs, TabsPageProps } from &#39;lupine.components&#39;;

const pages: TabsPageProps[] = [
  { title: &#39;\u6982\u89C8&#39;, children: &lt;Overview /&gt; },
  { title: &#39;\u8BE6\u60C5&#39;, children: &lt;Details /&gt; },
];

&lt;Tabs pages={pages} pagePadding=&#39;16px&#39; /&gt;;
</code></pre>
`;var nu=`<h1 id="\u6587\u672C\u7279\u6548-text-effects"><a class="header-anchor" href="#\u6587\u672C\u7279\u6548-text-effects">#</a>\u6587\u672C\u7279\u6548 (Text Effects)</h1><p>lupine.components \u63D0\u4F9B\u4E86\u4E00\u7CFB\u5217\u70AB\u9177\u7684\u6587\u5B57\u52A8\u753B\u7EC4\u4EF6\u3002</p>
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
`;var ru=`<h1 id="textscale-\u7F29\u653E\u6587\u5B57"><a class="header-anchor" href="#textscale-\u7F29\u653E\u6587\u5B57">#</a>TextScale (\u7F29\u653E\u6587\u5B57)</h1><p>\u63D0\u4F9B\u7F29\u653E\u52A8\u753B\u6548\u679C\u7684\u6587\u5B57\u7EC4\u4EF6\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { TextScale } from &#39;lupine.components&#39;;

&lt;TextScale text=&#39;\u7F29\u653E\u52A8\u753B\u6587\u5B57&#39; /&gt;;
</code></pre>
`;var ou=`<h1 id="textwave-\u6CE2\u52A8\u6587\u5B57"><a class="header-anchor" href="#textwave-\u6CE2\u52A8\u6587\u5B57">#</a>TextWave (\u6CE2\u52A8\u6587\u5B57)</h1><p>\u63D0\u4F9B\u6CE2\u52A8\u52A8\u753B\u6548\u679C\u7684\u6587\u5B57\u7EC4\u4EF6\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { TextWave } from &#39;lupine.components&#39;;

&lt;TextWave text=&#39;\u6CE2\u52A8\u52A8\u753B\u6587\u5B57&#39; /&gt;;
</code></pre>
`;var iu=`<h1 id="togglebase-\u5207\u6362\u57FA\u7C7B"><a class="header-anchor" href="#togglebase-\u5207\u6362\u57FA\u7C7B">#</a>ToggleBase (\u5207\u6362\u57FA\u7C7B)</h1><p>\u5207\u6362\u7EC4\u4EF6\u7684\u57FA\u7840\u7C7B\uFF0C\u53EF\u4EE5\u5728\u8FD9\u4E2A\u57FA\u7840\u4E0A\u5B9E\u73B0\u81EA\u5B9A\u4E49\u5207\u6362\u7EC4\u4EF6\u3002</p>
<h2 id="\u8BF4\u660E"><a class="header-anchor" href="#\u8BF4\u660E">#</a>\u8BF4\u660E</h2><p>\u8FD9\u662F\u4E00\u4E2A\u5185\u90E8\u4F7F\u7528\u7684\u57FA\u7C7B\uFF0C\u901A\u5E38\u4E0D\u9700\u8981\u76F4\u63A5\u5728\u5E94\u7528\u4E2D\u4F7F\u7528\uFF0C\u9664\u975E\u60A8\u60F3\u5B9E\u73B0\u81EA\u5B9A\u4E49\u7684 Toggle \u4EA4\u4E92\u903B\u8F91\u3002</p>
`;var au=`<h1 id="toggleswitch-\u5207\u6362\u5F00\u5173"><a class="header-anchor" href="#toggleswitch-\u5207\u6362\u5F00\u5173">#</a>ToggleSwitch (\u5207\u6362\u5F00\u5173)</h1><p>\u5207\u6362\u5F00\u5173\uFF0C\u5E38\u7528\u4E8E\u8BBE\u7F6E\u3002</p>
<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { ToggleSwitch, ToggleSwitchSize } from &#39;lupine.components&#39;;

&lt;ToggleSwitch checked={true} size={ToggleSwitchSize.Medium} text={{ on: &#39;\u5F00\u542F&#39;, off: &#39;\u5173\u95ED&#39; }} textWidth=&#39;60px&#39; /&gt;;
</code></pre>
`;var su="";var lu=`<h1 id="lupine-press"><a class="header-anchor" href="#lupine-press">#</a>lupine.press</h1><p><code>lupine.press</code> \u662F\u4E00\u4E2A\u57FA\u4E8E <code>lupine.web</code> \u6784\u5EFA\u7684\u8F7B\u91CF\u7EA7\u3001\u9AD8\u6027\u80FD\u7684\u6587\u6863\u7F51\u7AD9\u6846\u67B6\u3002\u5B83\u63D0\u4F9B\u4E86\u4E00\u5957\u5B8C\u6574\u7684\u89E3\u51B3\u65B9\u6848\uFF0C\u7528\u4E8E\u6E32\u67D3\u57FA\u4E8E Markdown \u7684\u6587\u6863\u7F51\u7AD9\uFF0C\u652F\u6301\u54CD\u5E94\u5F0F\u5E03\u5C40\u3001\u4FA7\u8FB9\u680F\u5BFC\u822A\u548C\u4E3B\u9898\u5207\u6362\u3002</p>
<p>\u5B83\u65E8\u5728\u4E0E <code>lupine</code> \u751F\u6001\u7CFB\u7EDF\u65E0\u7F1D\u534F\u4F5C\uFF0C\u4E3A\u5982 LupineJS \u5B98\u65B9\u6587\u6863\u7B49\u7AD9\u70B9\u63D0\u4F9B\u652F\u6301\u3002</p>
<h2 id="\u4E3B\u8981\u7279\u6027-features"><a class="header-anchor" href="#\u4E3B\u8981\u7279\u6027-features">#</a>\u4E3B\u8981\u7279\u6027 (Features)</h2><ul>
<li><strong>\u54CD\u5E94\u5F0F\u5E03\u5C40 (Responsive Layout)</strong>: \u5185\u7F6E\u7684 <code>PressFrame</code> \u63D0\u4F9B\u4E86\u6807\u51C6\u7684\u6587\u6863\u5E03\u5C40\uFF0C\u5305\u542B\u5934\u90E8\u3001\u54CD\u5E94\u5F0F\u4FA7\u8FB9\u680F\u548C\u5185\u5BB9\u533A\u57DF\u3002</li>
<li><strong>Markdown \u6E32\u67D3 (Markdown Rendering)</strong>: \u9488\u5BF9 Markdown \u751F\u6210\u7684\u5185\u5BB9\u8FDB\u884C\u4E86\u4F18\u5316\uFF0C\u652F\u6301\u8BED\u6CD5\u9AD8\u4EAE\u548C\u6807\u51C6\u6392\u7248\u3002</li>
<li><strong>\u4FA7\u8FB9\u680F\u5BFC\u822A (Sidebar Navigation)</strong>: \u6839\u636E\u60A8\u7684\u914D\u7F6E\u81EA\u52A8\u751F\u6210\u591A\u7EA7\u4FA7\u8FB9\u680F\u3002</li>
<li><strong>\u4E3B\u9898\u652F\u6301 (Theming)</strong>: \u901A\u8FC7 <code>lupine.components</code> \u4E3B\u9898\u7CFB\u7EDF\u5185\u7F6E\u652F\u6301\u591A\u79CD\u4E3B\u9898\uFF08\u5982\u4EAE\u8272/\u6697\u8272\u6A21\u5F0F\uFF09\u3002</li>
<li><strong>\u8DEF\u7531\u96C6\u6210 (Routing)</strong>: \u4E0E <code>PageRouter</code> \u663E\u5F0F\u96C6\u6210\uFF0C\u7528\u4E8E\u5904\u7406\u5BA2\u6237\u7AEF\u5BFC\u822A\u3002</li>
<li><strong>\u591A\u8BED\u8A00\u652F\u6301 (Multilingual Support)</strong>: \u81EA\u52A8\u626B\u63CF\u591A\u8BED\u8A00\u76EE\u5F55\u7684 markdown \u6587\u4EF6\uFF0C\u591A\u8BED\u8A00\u663E\u793A\u5207\u6362\u3002</li>
</ul>
<h2 id="\u4F7F\u7528\u6307\u5357-usage-guide"><a class="header-anchor" href="#\u4F7F\u7528\u6307\u5357-usage-guide">#</a>\u4F7F\u7528\u6307\u5357 (Usage Guide)</h2><p>\u8981\u4F7F\u7528 <code>lupine.press</code>\uFF0C\u60A8\u901A\u5E38\u9700\u8981\u8BBE\u7F6E\u4E00\u4E2A <code>lupine.web</code> \u5E94\u7528\u7A0B\u5E8F\uFF0C\u5E76\u5C06\u5176\u914D\u7F6E\u4E3A\u4F7F\u7528 <code>PressPage</code> \u4F5C\u4E3A\u4E3B\u8DEF\u7531\u5904\u7406\u7A0B\u5E8F\u3002</p>
<h3 id="1-\u524D\u63D0\u6761\u4EF6-prerequisites"><a class="header-anchor" href="#1-\u524D\u63D0\u6761\u4EF6-prerequisites">#</a>1. \u524D\u63D0\u6761\u4EF6 (Prerequisites)</h3><p>\u786E\u4FDD\u60A8\u7684\u9879\u76EE\u4E2D\u5DF2\u5B89\u88C5 <code>lupine.press</code>\u3002</p>
<h3 id="2-\u57FA\u672C\u8BBE\u7F6E-basic-setup"><a class="header-anchor" href="#2-\u57FA\u672C\u8BBE\u7F6E-basic-setup">#</a>2. \u57FA\u672C\u8BBE\u7F6E (Basic Setup)</h3><p>\u5728\u60A8\u7684\u5E94\u7528\u7A0B\u5E8F\u5165\u53E3\u70B9\uFF08\u4F8B\u5982 <code>src/index.tsx</code>\uFF09\u4E2D\uFF0C\u60A8\u9700\u8981\u7ED1\u5B9A\u5FC5\u8981\u7684\u914D\u7F6E\u5E76\u8BBE\u7F6E\u8DEF\u7531\u5668\u3002</p>
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
`;var cu=`<h1 id="lupine-web"><a class="header-anchor" href="#lupine-web">#</a>lupine.web</h1><p><strong>lupine.web</strong> \u662F\u4E00\u4E2A\u7C7B\u4F3C React\u3001\u6781\u5FEB\u3001\u5C0F\u5DE7\u4E14\u8F7B\u91CF\u7EA7\u7684\u524D\u7AEF\u6846\u67B6\u3002</p>
<p>\u6D4F\u89C8\u6587\u6863:</p>
<ul>
<li><a href="javascript:lpPressLoad('/zh/lupine.web/overview')">\u6982\u89C8</a></li>
</ul>
`;var pu=`<h1 id="lupine-web"><a class="header-anchor" href="#lupine-web">#</a>lupine.web</h1><p><strong>lupine.web</strong> \u662F\u4E00\u4E2A\u7C7B\u4F3C React\u3001\u6781\u5FEB\u3001\u5C0F\u5DE7\u4E14\u8F7B\u91CF\u7EA7\u7684\u524D\u7AEF\u6846\u67B6\uFF0C\u4E13\u4E3A\u73B0\u4EE3 Web \u5F00\u53D1\u800C\u8BBE\u8BA1\u3002\u5B83\u4E13\u6CE8\u4E8E\u6027\u80FD\u3001\u7B80\u5355\u6027\uFF0C\u5E76\u4E0E <code>lupine.api</code> \u642D\u914D\u4F7F\u7528\u65F6\u63D0\u4F9B\u5168\u6808\u4F53\u9A8C\u3002</p>
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
`;var du={"/":{html:$c,data:{lang:[{title:"English",id:"en"},{title:"\u7B80\u4F53\u4E2D\u6587",id:"zh"}]},headings:[]},"/en/essentials/api":{html:Uc,data:{title:"API Reference"},headings:[{level:2,text:"Lupine.api (Backend)",id:"lupine-api-backend"},{level:3,text:"\u{1F3D7}\uFE0F Architecture & Workflow",id:"architecture-workflow"},{level:3,text:"\u{1F4E1} ApiModule",id:"apimodule"},{level:3,text:"\u{1F333} RootApi & StaticServer",id:"rootapi-staticserver"},{level:3,text:"\u{1F3E5} Health Check Example",id:"health-check-example"}]},"/en/essentials/css-in-js":{html:Vc,data:{title:"CSS-in-JS"},headings:[{level:2,text:"1. \u{1F423} Basic Usage",id:"1-basic-usage"},{level:2,text:"2. \u{1F680} Advanced Features",id:"2-advanced-features"},{level:3,text:"2.1 \u{1F38E} Nesting & Parent Selector (&)",id:"2-1-nesting-parent-selector"},{level:3,text:"2.2 \u{1F6E1}\uFE0F Scoping with & (Dynamic Component ID)",id:"2-2-scoping-with-dynamic-component-id"},{level:3,text:"2.3 \u26A1 One-Line Multiple Definitions",id:"2-3-one-line-multiple-definitions"},{level:3,text:"2.4 \u{1F4F1} Media Queries (@media)",id:"2-4-media-queries-media"},{level:3,text:"2.5 \u{1F3AC} Keyframes (@keyframes)",id:"2-5-keyframes-keyframes"},{level:2,text:"3. \u{1F30F} Global Styles (bindGlobalStyle)",id:"3-global-styles-bindglobalstyle"}]},"/en/essentials/index":{html:Gc,data:{title:"Core Essentials",sidebar:[{type:"link",text:"Server Side Rendering (SSR)",link:"/en/essentials/ssr",level:0},{type:"link",text:"Page Router",link:"/en/essentials/page-route",level:0},{type:"link",text:"CSS-in-JS",link:"/en/essentials/css-in-js",level:0},{type:"link",text:"Theme",link:"/en/essentials/theme",level:0},{type:"link",text:"High Performance List Rendering & Editing",link:"/en/essentials/list",level:0},{type:"link",text:"API Reference",link:"/en/essentials/api",level:0}]},headings:[]},"/en/essentials/list":{html:Yc,data:{title:"High Performance List Rendering & Editing"},headings:[{level:2,text:"1. \u26A1 Why it is Fast",id:"1-why-it-is-fast"},{level:2,text:'2. \u{1F3AF} The "Spot-Update" Strategy',id:"2-the-spot-update-strategy"},{level:3,text:"Benefits",id:"benefits"},{level:2,text:"3. \u{1F4BB} Code Example: Editable List",id:"3-code-example-editable-list"},{level:3,text:"\u{1F4E6} Step 1: The List Container (Parent)",id:"step-1-the-list-container-parent"},{level:3,text:"\u26A1 Step 2: The Optimized Row (Child)",id:"step-2-the-optimized-row-child"},{level:3,text:"\u270F\uFE0F Step 3: Inline Editing (Advanced)",id:"step-3-inline-editing-advanced"},{level:2,text:"Summary",id:"summary"}]},"/en/essentials/page-route":{html:Jc,data:{title:"Page Router"},headings:[{level:2,text:"1. \u2696\uFE0F Versus Other Frameworks",id:"1-versus-other-frameworks"},{level:2,text:"2. \u{1F423} Basic Usage",id:"2-basic-usage"},{level:2,text:"3. \u{1F527} Dynamic Parameters",id:"3-dynamic-parameters"},{level:3,text:"Syntax",id:"syntax"},{level:3,text:"Example",id:"example"},{level:2,text:"4. \u{1F680} Advanced Features",id:"4-advanced-features"},{level:3,text:"4.1 \u{1F38E} Nested Routers (Modularity)",id:"4-1-nested-routers-modularity"},{level:3,text:"4.2 \u{1F6E1}\uFE0F Middleware Filters (Auth)",id:"4-2-middleware-filters-auth"},{level:3,text:"4.3 \u{1F5BC}\uFE0F Frame Pages (Layouts)",id:"4-3-frame-pages-layouts"},{level:3,text:"4.4 \u{1F4C2} Sub-Directory Deployment",id:"4-4-sub-directory-deployment"}]},"/en/essentials/ssr":{html:Kc,data:{title:"Server Side Rendering (SSR)"},headings:[{level:2,text:"1. \u2699\uFE0F How it Works",id:"1-how-it-works"},{level:3,text:"The Flow:",id:"the-flow"},{level:2,text:"2. \u{1F50D} Zero-Configuration SEO",id:"2-zero-configuration-seo"},{level:3,text:"Example: Social Sharing (OpenGraph)",id:"example-social-sharing-opengraph"},{level:2,text:"3. \u{1F6E0}\uFE0F Environment Variables",id:"3-environment-variables"},{level:3,text:"Defining Variables",id:"defining-variables"},{level:3,text:"Accessing Variables",id:"accessing-variables"},{level:2,text:"4. \u2699\uFE0F WebConfig: Dynamic Runtime Configuration",id:"4-webconfig-dynamic-runtime-configuration"},{level:3,text:"Usage",id:"usage"},{level:2,text:"5. \u26A1 Intelligent Caching & Performance",id:"5-intelligent-caching-performance"}]},"/en/essentials/theme":{html:Xc,data:{title:"Theme"},headings:[{level:2,text:"1. \u{1F3C1} Setup",id:"1-setup"},{level:3,text:"bindTheme",id:"bindtheme"},{level:2,text:"2. \u{1F3AE} Usage",id:"2-usage"},{level:3,text:"Accessing & Updating",id:"accessing-updating"},{level:3,text:"ThemeSelector Component",id:"themeselector-component"},{level:2,text:"3. \u26A1 Server-Side Rendering (SSR)",id:"3-server-side-rendering-ssr"},{level:2,text:"4. \u{1F6E0}\uFE0F Admin Tools",id:"4-admin-tools"}]},"/en/guide/install":{html:Zc,data:{title:"Installation"},headings:[{level:2,text:"Development Environment",id:"development-environment"},{level:2,text:"Production Build",id:"production-build"}]},"/en/guide/started":{html:Qc,data:{title:"Getting Started"},headings:[{level:2,text:"Core Essentials",id:"core-essentials"},{level:3,text:"[\u26A1 Server-Side Rendering (SSR) First](../essentials/ssr)",id:"server-side-rendering-ssr-first-essentials-ssr"},{level:3,text:"[\u{1F3A8} Built-in CSS-in-JS](../essentials/css-in-js)",id:"built-in-css-in-js-essentials-css-in-js"},{level:3,text:"[\u{1F6E3}\uFE0F Powerful Page Router](../essentials/page-route)",id:"powerful-page-router-essentials-page-route"},{level:3,text:"[\u{1F317} Theme System](../essentials/theme)",id:"theme-system-essentials-theme"},{level:3,text:"[\u{1F4DD} High-Performance List Rendering](../essentials/list)",id:"high-performance-list-rendering-essentials-list"},{level:3,text:"[\u{1F4E1} Full-Stack Development](../essentials/api)",id:"full-stack-development-essentials-api"}]},"/en/index":{html:ep,data:{layout:"home",title:"LupineJS Doc","sidemenu-width":"260px","github-title":"View on GitHub","github-link":"https://github.com/uuware/lupine.js",lang:{title:"English",id:"en"},hero:{name:"LupineJS",text:"Approachable, Fast, Full-stack",tagline:"A full-featured web application framework includes both Front-End and Back-End services.",actions:[{theme:"brand",text:"Get Started",link:"/en/guide/started"},{theme:"alt",text:"View on GitHub",link:"https://github.com/uuware/lupine.js"}]},nav:[{text:"Guide",link:"/en/guide/started"},{text:"API",link:"/en/essentials/api"}],sidebar:[{type:"group",text:"Guide",level:0},{type:"link",text:"Getting Started",link:"/en/guide/started",level:1},{type:"link",text:"Installation",link:"/en/guide/install",level:1},{type:"group",text:"Core Essentials",level:0},{type:"link",text:"Server Side Rendering (SSR)",link:"/en/essentials/ssr",level:1},{type:"link",text:"Page Router",link:"/en/essentials/page-route",level:1},{type:"link",text:"CSS-in-JS",link:"/en/essentials/css-in-js",level:1},{type:"link",text:"Theme",link:"/en/essentials/theme",level:1},{type:"link",text:"High Performance List Rendering & Editing",link:"/en/essentials/list",level:1},{type:"link",text:"API Reference",link:"/en/essentials/api",level:1},{type:"group",text:"Lupine.web",level:0},{type:"link",text:"Overview",link:"/en/lupine.web/overview",level:1},{type:"group",text:"Lupine.components",level:0},{type:"group",text:"Windows & Dialogs",level:1},{type:"link",text:"FloatWindow",link:"/en/lupine.components/float-window",level:2},{type:"link",text:"Modal",link:"/en/lupine.components/modal",level:2},{type:"link",text:"MessageBox",link:"/en/lupine.components/message-box",level:2},{type:"link",text:"Action Sheet",link:"/en/lupine.components/action-sheet",level:2},{type:"group",text:"Navigation & Menus",level:1},{type:"link",text:"MenuSidebar",link:"/en/lupine.components/menu-sidebar",level:2},{type:"link",text:"Menubar",link:"/en/lupine.components/menu-bar",level:2},{type:"link",text:"PopupMenu",link:"/en/lupine.components/popup-menu",level:2},{type:"link",text:"Tabs",link:"/en/lupine.components/tabs",level:2},{type:"link",text:"SlideTab",link:"/en/lupine.components/slide-tab",level:2},{type:"link",text:"PagingLink",link:"/en/lupine.components/paging-link",level:2},{type:"group",text:"Form & Inputs",level:1},{type:"link",text:"Button",link:"/en/lupine.components/button",level:2},{type:"link",text:"ToggleSwitch",link:"/en/lupine.components/toggle-switch",level:2},{type:"link",text:"InputWithTitle",link:"/en/lupine.components/input-with-title",level:2},{type:"link",text:"SelectWithTitle",link:"/en/lupine.components/select-with-title",level:2},{type:"link",text:"RadioLabel",link:"/en/lupine.components/radio-label",level:2},{type:"link",text:"EditableLabel",link:"/en/lupine.components/editable-label",level:2},{type:"link",text:"Stars",link:"/en/lupine.components/stars",level:2},{type:"link",text:"SelectAngle",link:"/en/lupine.components/select-angle",level:2},{type:"group",text:"Content & Layout",level:1},{type:"link",text:"Grid",link:"/en/lupine.components/grid",level:2},{type:"link",text:"HtmlVar",link:"/en/lupine.components/html-var",level:2},{type:"link",text:"HtmlLoad",link:"/en/lupine.components/html-load",level:2},{type:"link",text:"NoticeMessage",link:"/en/lupine.components/notice-message",level:2},{type:"link",text:"Progress",link:"/en/lupine.components/progress",level:2},{type:"link",text:"Spinner",link:"/en/lupine.components/spinner",level:2},{type:"link",text:"SvgIcon",link:"/en/lupine.components/svg-icon",level:2},{type:"group",text:"Text Effects",level:1},{type:"link",text:"TextGlow",link:"/en/lupine.components/text-glow",level:2},{type:"link",text:"TextScale",link:"/en/lupine.components/text-scale",level:2},{type:"link",text:"TextWave",link:"/en/lupine.components/text-wave",level:2},{type:"group",text:"Other Components",level:1},{type:"link",text:"DragFresh",link:"/en/lupine.components/drag-fresh",level:2},{type:"link",text:"Redirect",link:"/en/lupine.components/redirect",level:2},{type:"link",text:"ResizableSplitter",link:"/en/lupine.components/resizable-splitter",level:2},{type:"link",text:"SwitchOption",link:"/en/lupine.components/switch-option",level:2},{type:"link",text:"ToggleBase",link:"/en/lupine.components/toggle-base",level:2},{type:"group",text:"Lupine.components-libs",level:0},{type:"group",text:"Utilities",level:1},{type:"link",text:"DateUtils",link:"/en/lupine.components-libs/date-utils",level:2},{type:"link",text:"SimpleStorage",link:"/en/lupine.components-libs/simple-storage",level:2},{type:"link",text:"DynamicalLoad",link:"/en/lupine.components-libs/dynamical-load",level:2},{type:"link",text:"formatBytes",link:"/en/lupine.components-libs/format-bytes",level:2},{type:"group",text:"DOM & UI Helpers",level:1},{type:"link",text:"DomUtils",link:"/en/lupine.components-libs/dom-utils",level:2},{type:"link",text:"LiteDom",link:"/en/lupine.components-libs/lite-dom",level:2},{type:"link",text:"DragUtil",link:"/en/lupine.components-libs/drag-util",level:2},{type:"group",text:"Network & Files",level:1},{type:"link",text:"uploadFile",link:"/en/lupine.components-libs/upload-file",level:2},{type:"link",text:"downloadStream",link:"/en/lupine.components-libs/download-stream",level:2},{type:"group",text:"Event & State",level:1},{type:"link",text:"MessageHub",link:"/en/lupine.components-libs/message-hub",level:2},{type:"link",text:"Observable",link:"/en/lupine.components-libs/observable",level:2},{type:"group",text:"Lupine.api",level:0},{type:"group",text:"Core Concepts",level:1},{type:"link",text:"Server",link:"/en/lupine.api/app",level:2},{type:"link",text:"API Module",link:"/en/lupine.api/api",level:2},{type:"group",text:"Tools",level:1},{type:"link",text:"Dashboard",link:"/en/lupine.api/dashboard",level:2},{type:"group",text:"Lupine.press",level:0},{type:"link",text:"Press Doc Overview",link:"/en/lupine.press/overview",level:1}],features:[{title:"Front-End (lupine.web)",details:"Extremely lightweight framework (approx 10kb) using React TSX syntax. No heavy runtime."},{title:"Back-End (lupine.api)",details:"Efficient and simplified framework similar to Express. Optimized for SSR."},{title:"Zero-dependency",details:"Minimal dependency tree ensuring fast build times and reliable deployments."}]},headings:[]},"/en/lupine.api/api":{html:tp,data:{title:"API Module"},headings:[{level:2,text:"Key Features",id:"key-features"},{level:2,text:"Usage Example",id:"usage-example"}]},"/en/lupine.api/app":{html:np,data:{title:"Server"},headings:[{level:2,text:"Key Features",id:"key-features"},{level:2,text:"Usage Example",id:"usage-example"}]},"/en/lupine.api/dashboard":{html:rp,data:{title:"Dashboard"},headings:[{level:2,text:"Features",id:"features"},{level:3,text:"1. Database Management (DB)",id:"1-database-management-db"},{level:3,text:"2. Operations & Server Management (Access & Server Info)",id:"2-operations-server-management-access-server-info"},{level:3,text:"3. Development & Testing (Test)",id:"3-development-testing-test"},{level:2,text:"Extension Development",id:"extension-development"},{level:3,text:"Menu Configuration",id:"menu-configuration"},{level:3,text:"Page Development",id:"page-development"}]},"/en/lupine.api/index":{html:op,data:{title:"Lupine.api",sidebar:[{type:"group",text:"Core Concepts",level:0},{type:"link",text:"Server",link:"/en/lupine.api/app",level:1},{type:"link",text:"API Module",link:"/en/lupine.api/api",level:1},{type:"group",text:"Tools",level:0},{type:"link",text:"Dashboard",link:"/en/lupine.api/dashboard",level:1}]},headings:[]},"/en/lupine.components-libs/date-utils":{html:ip,data:{title:"DateUtils"},headings:[]},"/en/lupine.components-libs/dom-utils":{html:ap,data:{title:"DomUtils"},headings:[]},"/en/lupine.components-libs/download-stream":{html:sp,data:{title:"downloadStream"},headings:[]},"/en/lupine.components-libs/drag-util":{html:lp,data:{title:"DragUtil"},headings:[]},"/en/lupine.components-libs/dynamical-load":{html:cp,data:{title:"DynamicalLoad"},headings:[]},"/en/lupine.components-libs/format-bytes":{html:pp,data:{title:"formatBytes"},headings:[]},"/en/lupine.components-libs/index":{html:dp,data:{title:"Lupine.components-libs",sidebar:[{type:"group",text:"Utilities",level:0},{type:"link",text:"DateUtils",link:"/en/lupine.components-libs/date-utils",level:1},{type:"link",text:"SimpleStorage",link:"/en/lupine.components-libs/simple-storage",level:1},{type:"link",text:"DynamicalLoad",link:"/en/lupine.components-libs/dynamical-load",level:1},{type:"link",text:"formatBytes",link:"/en/lupine.components-libs/format-bytes",level:1},{type:"group",text:"DOM & UI Helpers",level:0},{type:"link",text:"DomUtils",link:"/en/lupine.components-libs/dom-utils",level:1},{type:"link",text:"LiteDom",link:"/en/lupine.components-libs/lite-dom",level:1},{type:"link",text:"DragUtil",link:"/en/lupine.components-libs/drag-util",level:1},{type:"group",text:"Network & Files",level:0},{type:"link",text:"uploadFile",link:"/en/lupine.components-libs/upload-file",level:1},{type:"link",text:"downloadStream",link:"/en/lupine.components-libs/download-stream",level:1},{type:"group",text:"Event & State",level:0},{type:"link",text:"MessageHub",link:"/en/lupine.components-libs/message-hub",level:1},{type:"link",text:"Observable",link:"/en/lupine.components-libs/observable",level:1}]},headings:[{level:2,text:"Utilities",id:"utilities"},{level:2,text:"DOM & UI Helpers",id:"dom-ui-helpers"},{level:2,text:"Network & Files",id:"network-files"},{level:2,text:"Event & State",id:"event-state"}]},"/en/lupine.components-libs/lite-dom":{html:up,data:{title:"LiteDom"},headings:[]},"/en/lupine.components-libs/message-hub":{html:gp,data:{title:"MessageHub"},headings:[]},"/en/lupine.components-libs/observable":{html:hp,data:{title:"Observable"},headings:[]},"/en/lupine.components-libs/simple-storage":{html:mp,data:{title:"SimpleStorage"},headings:[]},"/en/lupine.components-libs/upload-file":{html:fp,data:{title:"uploadFile"},headings:[]},"/en/lupine.components/action-sheet":{html:bp,data:{title:"Action Sheet"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/button":{html:xp,data:{title:"Button"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/drag-fresh":{html:vp,data:{title:"DragFresh"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/editable-label":{html:yp,data:{title:"EditableLabel"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/float-window":{html:kp,data:{title:"FloatWindow"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/grid":{html:wp,data:{title:"Grid"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/html-load":{html:Sp,data:{title:"HtmlLoad"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/html-var":{html:Tp,data:{title:"HtmlVar"},headings:[{level:2,text:"1. Correct Usage",id:"1-correct-usage"},{level:3,text:"Example",id:"example"},{level:2,text:"2. Comparison with Modern Frameworks",id:"2-comparison-with-modern-frameworks"},{level:2,text:"3. Recommended Helper: val<T>",id:"3-recommended-helper-val-t"}]},"/en/lupine.components/index":{html:Cp,data:{title:"Lupine.components",sidebar:[{type:"group",text:"Windows & Dialogs",level:0},{type:"link",text:"FloatWindow",link:"/en/lupine.components/float-window",level:1},{type:"link",text:"Modal",link:"/en/lupine.components/modal",level:1},{type:"link",text:"MessageBox",link:"/en/lupine.components/message-box",level:1},{type:"link",text:"Action Sheet",link:"/en/lupine.components/action-sheet",level:1},{type:"group",text:"Navigation & Menus",level:0},{type:"link",text:"MenuSidebar",link:"/en/lupine.components/menu-sidebar",level:1},{type:"link",text:"Menubar",link:"/en/lupine.components/menu-bar",level:1},{type:"link",text:"PopupMenu",link:"/en/lupine.components/popup-menu",level:1},{type:"link",text:"Tabs",link:"/en/lupine.components/tabs",level:1},{type:"link",text:"SlideTab",link:"/en/lupine.components/slide-tab",level:1},{type:"link",text:"PagingLink",link:"/en/lupine.components/paging-link",level:1},{type:"group",text:"Form & Inputs",level:0},{type:"link",text:"Button",link:"/en/lupine.components/button",level:1},{type:"link",text:"ToggleSwitch",link:"/en/lupine.components/toggle-switch",level:1},{type:"link",text:"InputWithTitle",link:"/en/lupine.components/input-with-title",level:1},{type:"link",text:"SelectWithTitle",link:"/en/lupine.components/select-with-title",level:1},{type:"link",text:"RadioLabel",link:"/en/lupine.components/radio-label",level:1},{type:"link",text:"EditableLabel",link:"/en/lupine.components/editable-label",level:1},{type:"link",text:"Stars",link:"/en/lupine.components/stars",level:1},{type:"link",text:"SelectAngle",link:"/en/lupine.components/select-angle",level:1},{type:"group",text:"Content & Layout",level:0},{type:"link",text:"Grid",link:"/en/lupine.components/grid",level:1},{type:"link",text:"HtmlVar",link:"/en/lupine.components/html-var",level:1},{type:"link",text:"HtmlLoad",link:"/en/lupine.components/html-load",level:1},{type:"link",text:"NoticeMessage",link:"/en/lupine.components/notice-message",level:1},{type:"link",text:"Progress",link:"/en/lupine.components/progress",level:1},{type:"link",text:"Spinner",link:"/en/lupine.components/spinner",level:1},{type:"link",text:"SvgIcon",link:"/en/lupine.components/svg-icon",level:1},{type:"group",text:"Text Effects",level:0},{type:"link",text:"TextGlow",link:"/en/lupine.components/text-glow",level:1},{type:"link",text:"TextScale",link:"/en/lupine.components/text-scale",level:1},{type:"link",text:"TextWave",link:"/en/lupine.components/text-wave",level:1},{type:"group",text:"Other Components",level:0},{type:"link",text:"DragFresh",link:"/en/lupine.components/drag-fresh",level:1},{type:"link",text:"Redirect",link:"/en/lupine.components/redirect",level:1},{type:"link",text:"ResizableSplitter",link:"/en/lupine.components/resizable-splitter",level:1},{type:"link",text:"SwitchOption",link:"/en/lupine.components/switch-option",level:1},{type:"link",text:"ToggleBase",link:"/en/lupine.components/toggle-base",level:1}]},headings:[{level:2,text:"Core Features",id:"core-features"},{level:2,text:"Quick Start",id:"quick-start"}]},"/en/lupine.components/input-with-title":{html:Pp,data:{title:"InputWithTitle"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/menu-bar":{html:Ep,data:{title:"Menubar"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/menu-sidebar":{html:Mp,data:{title:"MenuSidebar"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/message-box":{html:Lp,data:{title:"MessageBox"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/modal":{html:Ap,data:{title:"Modal"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/notice-message":{html:Rp,data:{title:"NoticeMessage"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/paging-link":{html:Hp,data:{title:"PagingLink"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/popup-menu":{html:Ip,data:{title:"PopupMenu"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/progress":{html:Dp,data:{title:"Progress"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/radio-label":{html:zp,data:{title:"RadioLabel"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/redirect":{html:Fp,data:{title:"Redirect"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/resizable-splitter":{html:Op,data:{title:"ResizableSplitter"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/select-angle":{html:Bp,data:{title:"SelectAngle"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/select-with-title":{html:Np,data:{title:"SelectWithTitle"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/slide-tab":{html:Wp,data:{title:"SlideTab"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/spinner":{html:jp,data:{title:"Spinner"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/stars":{html:qp,data:{title:"Stars"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/svg-icon":{html:_p,data:{title:"SvgIcon"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/switch-option":{html:$p,data:{title:"SwitchOption"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/tabs":{html:Up,data:{title:"Tabs"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/text-glow":{html:Vp,data:{title:"TextGlow"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/text-scale":{html:Gp,data:{title:"TextScale"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/text-wave":{html:Yp,data:{title:"TextWave"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.components/toggle-base":{html:Jp,data:{title:"ToggleBase"},headings:[{level:2,text:"Description",id:"description"}]},"/en/lupine.components/toggle-switch":{html:Kp,data:{title:"ToggleSwitch"},headings:[{level:2,text:"Implementation Example",id:"implementation-example"}]},"/en/lupine.press/index":{html:Xp,data:{title:"Lupine.press",sidebar:[{type:"link",text:"Press Doc Overview",link:"/en/lupine.press/overview",level:0}]},headings:[]},"/en/lupine.press/overview":{html:Zp,data:{title:"Press Doc Overview"},headings:[{level:2,text:"Features",id:"features"},{level:2,text:"Usage Guide",id:"usage-guide"},{level:3,text:"1. Prerequisites",id:"1-prerequisites"},{level:3,text:"2. Basic Setup",id:"2-basic-setup"},{level:3,text:"3. Data Structure (markdownConfig)",id:"3-data-structure-markdownconfig"},{level:2,text:"Markdown File Structure & Association",id:"markdown-file-structure-association"},{level:3,text:"Top-level Configuration",id:"top-level-configuration"},{level:3,text:"Multilingual Configuration",id:"multilingual-configuration"},{level:3,text:"Sidebar Configuration",id:"sidebar-configuration"},{level:2,text:"Architecture",id:"architecture"}]},"/en/lupine.web/index":{html:Qp,data:{title:"Lupine.web",sidebar:[{type:"link",text:"Overview",link:"/en/lupine.web/overview",level:0}]},headings:[]},"/en/lupine.web/overview":{html:ed,data:{title:"Overview"},headings:[{level:2,text:"Why lupine.web",id:"why-lupine-web"},{level:3,text:"\u{1F680} Zero-Dependency & Lightweight",id:"zero-dependency-lightweight"},{level:3,text:"\u{1F3A8} Built-in CSS-in-JS [\u{1F517}](../essentials/css-in-js)",id:"built-in-css-in-js-essentials-css-in-js"},{level:3,text:"\u{1F6E3}\uFE0F Powerful Router [\u{1F517}](../essentials/page-route)",id:"powerful-router-essentials-page-route"},{level:3,text:"\u26A1 Server-Side Rendering (SSR) First [\u{1F517}](../essentials/ssr)",id:"server-side-rendering-ssr-first-essentials-ssr"},{level:3,text:"\u{1F30D} Internationalization (i18n)",id:"internationalization-i18n"},{level:3,text:"\u{1F6E0}\uFE0F Environment Configuration",id:"environment-configuration"}]},"/zh/essentials/api":{html:td,data:{title:"API \u53C2\u8003"},headings:[{level:3,text:"\u{1F3D7}\uFE0F \u67B6\u6784\u4E0E\u5DE5\u4F5C\u6D41 (Architecture & Workflow)",id:"\u67B6\u6784\u4E0E\u5DE5\u4F5C\u6D41-architecture-workflow"},{level:3,text:"\u{1F333} RootApi \u4E0E StaticServer",id:"rootapi-\u4E0E-staticserver"},{level:3,text:"\u{1F3E5} \u5065\u5EB7\u68C0\u67E5\u793A\u4F8B (Health Check)",id:"\u5065\u5EB7\u68C0\u67E5\u793A\u4F8B-health-check"}]},"/zh/essentials/css-in-js":{html:nd,data:{title:"CSS-in-JS"},headings:[{level:2,text:"1. \u{1F423} \u57FA\u672C\u7528\u6CD5",id:"1-\u57FA\u672C\u7528\u6CD5"},{level:2,text:"2. \u{1F680} \u9AD8\u7EA7\u7279\u6027",id:"2-\u9AD8\u7EA7\u7279\u6027"},{level:3,text:"2.1 \u{1F38E} \u5D4C\u5957\u4E0E\u7236\u9009\u62E9\u5668 (&)",id:"2-1-\u5D4C\u5957\u4E0E\u7236\u9009\u62E9\u5668"},{level:3,text:"2.2 \u{1F6E1}\uFE0F \u4F7F\u7528 & \u8FDB\u884C\u4F5C\u7528\u57DF\u7BA1\u7406 (\u52A8\u6001\u7EC4\u4EF6 ID)",id:"2-2-\u4F7F\u7528-\u8FDB\u884C\u4F5C\u7528\u57DF\u7BA1\u7406-\u52A8\u6001\u7EC4\u4EF6-id"},{level:3,text:"2.3 \u26A1 \u5355\u884C\u591A\u5B9A\u4E49",id:"2-3-\u5355\u884C\u591A\u5B9A\u4E49"},{level:3,text:"2.4 \u{1F4F1} \u5A92\u4F53\u67E5\u8BE2 (@media)",id:"2-4-\u5A92\u4F53\u67E5\u8BE2-media"},{level:3,text:"2.5 \u{1F3AC} \u5173\u952E\u5E27\u52A8\u753B (@keyframes)",id:"2-5-\u5173\u952E\u5E27\u52A8\u753B-keyframes"},{level:2,text:"3. \u{1F30F} \u5168\u5C40\u6837\u5F0F (bindGlobalStyle)",id:"3-\u5168\u5C40\u6837\u5F0F-bindglobalstyle"}]},"/zh/essentials/index":{html:rd,data:{sidebar:[{type:"group",text:"\u6838\u5FC3\u8981\u70B9",level:0},{type:"link",text:"SSR (\u670D\u52A1\u7AEF\u6E32\u67D3)",link:"/zh/essentials/ssr",level:1},{type:"link",text:"Page Router (\u9875\u9762\u8DEF\u7531)",link:"/zh/essentials/page-route",level:1},{type:"link",text:"CSS-in-JS",link:"/zh/essentials/css-in-js",level:1},{type:"link",text:"Theme (\u4E3B\u9898)",link:"/zh/essentials/theme",level:1},{type:"link",text:"List (\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3\u4E0E\u7F16\u8F91)",link:"/zh/essentials/list",level:1},{type:"link",text:"API \u53C2\u8003",link:"/zh/essentials/api",level:1}]},headings:[]},"/zh/essentials/list":{html:od,data:{title:"List (\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3\u4E0E\u7F16\u8F91)"},headings:[{level:2,text:"1. \u26A1 \u4E3A\u4EC0\u4E48\u5B83\u5F88\u5FEB\uFF1F",id:"1-\u4E3A\u4EC0\u4E48\u5B83\u5F88\u5FEB"},{level:2,text:'2. \u{1F3AF} "\u70B9\u5BF9\u70B9\u66F4\u65B0 (Spot-Update)" \u7B56\u7565',id:"2-\u70B9\u5BF9\u70B9\u66F4\u65B0-spot-update-\u7B56\u7565"},{level:3,text:"\u4F18\u52BF",id:"\u4F18\u52BF"},{level:2,text:"3. \u{1F4BB} \u4EE3\u7801\u793A\u4F8B\uFF1A\u53EF\u7F16\u8F91\u5217\u8868",id:"3-\u4EE3\u7801\u793A\u4F8B-\u53EF\u7F16\u8F91\u5217\u8868"},{level:3,text:"\u{1F4E6} \u7B2C\u4E00\u6B65\uFF1A\u5217\u8868\u5BB9\u5668\uFF08\u7236\u7EC4\u4EF6\uFF09",id:"\u7B2C\u4E00\u6B65-\u5217\u8868\u5BB9\u5668-\u7236\u7EC4\u4EF6"},{level:3,text:"\u26A1 \u7B2C\u4E8C\u6B65\uFF1A\u4F18\u5316\u540E\u7684\u884C\uFF08\u5B50\u7EC4\u4EF6\uFF09",id:"\u7B2C\u4E8C\u6B65-\u4F18\u5316\u540E\u7684\u884C-\u5B50\u7EC4\u4EF6"},{level:3,text:"\u270F\uFE0F \u7B2C\u4E09\u6B65\uFF1A\u884C\u5185\u7F16\u8F91\uFF08\u8FDB\u9636\uFF09",id:"\u7B2C\u4E09\u6B65-\u884C\u5185\u7F16\u8F91-\u8FDB\u9636"},{level:2,text:"\u603B\u7ED3",id:"\u603B\u7ED3"}]},"/zh/essentials/page-route":{html:id,data:{title:"Page Router (\u9875\u9762\u8DEF\u7531)"},headings:[{level:2,text:"1. \u2696\uFE0F \u4E0E\u5176\u4ED6\u6846\u67B6\u7684\u5BF9\u6BD4",id:"1-\u4E0E\u5176\u4ED6\u6846\u67B6\u7684\u5BF9\u6BD4"},{level:2,text:"2. \u{1F423} \u57FA\u672C\u7528\u6CD5",id:"2-\u57FA\u672C\u7528\u6CD5"},{level:2,text:"3. \u{1F527} \u52A8\u6001\u53C2\u6570",id:"3-\u52A8\u6001\u53C2\u6570"},{level:3,text:"\u8BED\u6CD5",id:"\u8BED\u6CD5"},{level:3,text:"\u793A\u4F8B",id:"\u793A\u4F8B"},{level:2,text:"4. \u{1F680} \u9AD8\u7EA7\u7279\u6027",id:"4-\u9AD8\u7EA7\u7279\u6027"},{level:3,text:"4.1 \u{1F38E} \u5D4C\u5957\u8DEF\u7531 (\u6A21\u5757\u5316)",id:"4-1-\u5D4C\u5957\u8DEF\u7531-\u6A21\u5757\u5316"},{level:3,text:"4.2 \u{1F6E1}\uFE0F \u4E2D\u95F4\u4EF6\u8FC7\u6EE4\u5668 (\u9274\u6743)",id:"4-2-\u4E2D\u95F4\u4EF6\u8FC7\u6EE4\u5668-\u9274\u6743"},{level:3,text:"4.3 \u{1F5BC}\uFE0F \u6846\u67B6\u9875\u9762 (\u5E03\u5C40)",id:"4-3-\u6846\u67B6\u9875\u9762-\u5E03\u5C40"},{level:3,text:"4.4 \u{1F4C2} \u5B50\u76EE\u5F55\u90E8\u7F72",id:"4-4-\u5B50\u76EE\u5F55\u90E8\u7F72"}]},"/zh/essentials/ssr":{html:ad,data:{title:"SSR (\u670D\u52A1\u7AEF\u6E32\u67D3)"},headings:[{level:2,text:"1. \u2699\uFE0F \u5DE5\u4F5C\u539F\u7406",id:"1-\u5DE5\u4F5C\u539F\u7406"},{level:3,text:"\u6D41\u7A0B\uFF1A",id:"\u6D41\u7A0B"},{level:2,text:"2. \u{1F50D} \u96F6\u914D\u7F6E SEO",id:"2-\u96F6\u914D\u7F6E-seo"},{level:3,text:"\u793A\u4F8B\uFF1A\u793E\u4EA4\u5206\u4EAB (OpenGraph)",id:"\u793A\u4F8B-\u793E\u4EA4\u5206\u4EAB-opengraph"},{level:2,text:"3. \u{1F6E0}\uFE0F \u73AF\u5883\u53D8\u91CF",id:"3-\u73AF\u5883\u53D8\u91CF"},{level:3,text:"\u5B9A\u4E49\u53D8\u91CF",id:"\u5B9A\u4E49\u53D8\u91CF"},{level:3,text:"\u8BBF\u95EE\u53D8\u91CF",id:"\u8BBF\u95EE\u53D8\u91CF"},{level:2,text:"4. \u2699\uFE0F WebConfig: \u52A8\u6001\u8FD0\u884C\u65F6\u914D\u7F6E",id:"4-webconfig-\u52A8\u6001\u8FD0\u884C\u65F6\u914D\u7F6E"},{level:3,text:"\u7528\u6CD5",id:"\u7528\u6CD5"},{level:2,text:"5. \u26A1 \u667A\u80FD\u7F13\u5B58\u4E0E\u6027\u80FD",id:"5-\u667A\u80FD\u7F13\u5B58\u4E0E\u6027\u80FD"}]},"/zh/essentials/theme":{html:sd,data:{title:"Theme (\u4E3B\u9898)"},headings:[{level:2,text:"1. \u{1F3C1} \u8BBE\u7F6E (Setup)",id:"1-\u8BBE\u7F6E-setup"},{level:3,text:"bindTheme",id:"bindtheme"},{level:2,text:"2. \u{1F3AE} \u7528\u6CD5 (Usage)",id:"2-\u7528\u6CD5-usage"},{level:3,text:"\u8BBF\u95EE\u4E0E\u66F4\u65B0",id:"\u8BBF\u95EE\u4E0E\u66F4\u65B0"},{level:3,text:"ThemeSelector \u7EC4\u4EF6",id:"themeselector-\u7EC4\u4EF6"},{level:2,text:"3. \u26A1 \u670D\u52A1\u7AEF\u6E32\u67D3 (SSR)",id:"3-\u670D\u52A1\u7AEF\u6E32\u67D3-ssr"},{level:2,text:"4. \u{1F6E0}\uFE0F \u7BA1\u7406\u5DE5\u5177 (Admin Tools)",id:"4-\u7BA1\u7406\u5DE5\u5177-admin-tools"}]},"/zh/guide/install":{html:ld,data:{title:"\u5B89\u88C5\u8BF4\u660E"},headings:[{level:2,text:"\u5F00\u53D1\u73AF\u5883",id:"\u5F00\u53D1\u73AF\u5883"},{level:2,text:"\u751F\u4EA7\u73AF\u5883\u6784\u5EFA",id:"\u751F\u4EA7\u73AF\u5883\u6784\u5EFA"}]},"/zh/guide/started":{html:cd,data:{title:"\u5FEB\u901F\u5F00\u59CB"},headings:[{level:2,text:"\u6838\u5FC3\u7279\u6027 (Core Essentials)",id:"\u6838\u5FC3\u7279\u6027-core-essentials"},{level:3,text:"[\u26A1 \u670D\u52A1\u7AEF\u6E32\u67D3 (SSR) \u4F18\u5148](../essentials/ssr)",id:"\u670D\u52A1\u7AEF\u6E32\u67D3-ssr-\u4F18\u5148-essentials-ssr"},{level:3,text:"[\u{1F3A8} \u5185\u7F6E CSS-in-JS](../essentials/css-in-js)",id:"\u5185\u7F6E-css-in-js-essentials-css-in-js"},{level:3,text:"[\u{1F6E3}\uFE0F \u5F3A\u5927\u7684\u9875\u9762\u8DEF\u7531](../essentials/page-route)",id:"\u5F3A\u5927\u7684\u9875\u9762\u8DEF\u7531-essentials-page-route"},{level:3,text:"[\u{1F317} \u4E3B\u9898\u7CFB\u7EDF](../essentials/theme)",id:"\u4E3B\u9898\u7CFB\u7EDF-essentials-theme"},{level:3,text:"[\u{1F4DD} \u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3](../essentials/list)",id:"\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3-essentials-list"},{level:3,text:"[\u{1F4E1} \u5168\u6808\u5F00\u53D1\u4F53\u9A8C](../essentials/api)",id:"\u5168\u6808\u5F00\u53D1\u4F53\u9A8C-essentials-api"}]},"/zh/index":{html:pd,data:{layout:"home",title:"LupineJS \u6587\u6863","sidemenu-width":"260px","github-title":"GitHub \u4ED3\u5E93","github-link":"https://github.com/uuware/lupine.js",lang:{title:"\u7B80\u4F53\u4E2D\u6587",id:"zh"},hero:{name:"LupineJS",text:"\u6613\u7528\u3001\u5FEB\u901F\u3001\u5168\u6808",tagline:"\u5305\u542B\u524D\u540E\u7AEF\u670D\u52A1\u7684\u5168\u529F\u80FD Web \u5E94\u7528\u7A0B\u5E8F\u6846\u67B6\u3002",actions:[{theme:"brand",text:"\u5FEB\u901F\u5F00\u59CB",link:"/zh/guide/started"},{theme:"alt",text:"GitHub \u4ED3\u5E93",link:"https://github.com/uuware/lupine.js"}]},nav:[{text:"\u6307\u5357",link:"/zh/guide/started"},{text:"API",link:"/zh/essentials/api"}],sidebar:[{type:"group",text:"\u6307\u5357",level:0},{type:"link",text:"\u5FEB\u901F\u5F00\u59CB",link:"/zh/guide/started",level:1},{type:"link",text:"\u5B89\u88C5\u8BF4\u660E",link:"/zh/guide/install",level:1},{type:"group",text:"\u6838\u5FC3\u8981\u70B9",level:0},{type:"link",text:"SSR (\u670D\u52A1\u7AEF\u6E32\u67D3)",link:"/zh/essentials/ssr",level:1},{type:"link",text:"Page Router (\u9875\u9762\u8DEF\u7531)",link:"/zh/essentials/page-route",level:1},{type:"link",text:"CSS-in-JS",link:"/zh/essentials/css-in-js",level:1},{type:"link",text:"Theme (\u4E3B\u9898)",link:"/zh/essentials/theme",level:1},{type:"link",text:"List (\u9AD8\u6027\u80FD\u5217\u8868\u6E32\u67D3\u4E0E\u7F16\u8F91)",link:"/zh/essentials/list",level:1},{type:"link",text:"API \u53C2\u8003",link:"/zh/essentials/api",level:1},{type:"group",text:"Lupine.web",level:0},{type:"link",text:"\u6982\u89C8",link:"/zh/lupine.web/overview",level:1},{type:"group",text:"Lupine.components (\u7EC4\u4EF6)",level:0},{type:"group",text:"\u7A97\u53E3\u4E0E\u5BF9\u8BDD\u6846",level:1},{type:"link",text:"FloatWindow (\u6D6E\u7A97)",link:"/zh/lupine.components/float-window",level:2},{type:"link",text:"Modal (\u6A21\u6001\u6846)",link:"/zh/lupine.components/modal",level:2},{type:"link",text:"MessageBox (\u6D88\u606F\u6846)",link:"/zh/lupine.components/message-box",level:2},{type:"link",text:"Action Sheet (\u52A8\u4F5C\u5217\u8868)",link:"/zh/lupine.components/action-sheet",level:2},{type:"group",text:"\u5BFC\u822A\u4E0E\u83DC\u5355",level:1},{type:"link",text:"MenuSidebar (\u4FA7\u8FB9\u5BFC\u822A\u680F)",link:"/zh/lupine.components/menu-sidebar",level:2},{type:"link",text:"Menubar (\u6A2A\u5411\u83DC\u5355\u680F)",link:"/zh/lupine.components/menu-bar",level:2},{type:"link",text:"PopupMenu (\u5F39\u51FA\u83DC\u5355)",link:"/zh/lupine.components/popup-menu",level:2},{type:"link",text:"Tabs (\u9009\u9879\u5361)",link:"/zh/lupine.components/tabs",level:2},{type:"link",text:"SlideTab (\u6ED1\u52A8\u9009\u9879\u5361)",link:"/zh/lupine.components/slide-tab",level:2},{type:"link",text:"PagingLink (\u5206\u9875\u94FE\u63A5)",link:"/zh/lupine.components/paging-link",level:2},{type:"group",text:"\u8868\u5355\u4E0E\u8F93\u5165",level:1},{type:"link",text:"Button (\u6309\u94AE)",link:"/zh/lupine.components/button",level:2},{type:"link",text:"ToggleSwitch (\u5207\u6362\u5F00\u5173)",link:"/zh/lupine.components/toggle-switch",level:2},{type:"link",text:"InputWithTitle (\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846)",link:"/zh/lupine.components/input-with-title",level:2},{type:"link",text:"SelectWithTitle (\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868)",link:"/zh/lupine.components/select-with-title",level:2},{type:"link",text:"RadioLabel (\u5355\u9009\u7EC4)",link:"/zh/lupine.components/radio-label",level:2},{type:"link",text:"EditableLabel (\u53EF\u7F16\u8F91\u6807\u7B7E)",link:"/zh/lupine.components/editable-label",level:2},{type:"link",text:"Stars (\u661F\u7EA7\u8BC4\u5206)",link:"/zh/lupine.components/stars",level:2},{type:"link",text:"SelectAngle (\u89D2\u5EA6\u9009\u62E9)",link:"/zh/lupine.components/select-angle",level:2},{type:"group",text:"\u5185\u5BB9\u4E0E\u5E03\u5C40",level:1},{type:"link",text:"Grid (\u7F51\u683C)",link:"/zh/lupine.components/grid",level:2},{type:"link",text:"HtmlVar",link:"/zh/lupine.components/html-var",level:2},{type:"link",text:"HtmlLoad (HTML \u52A0\u8F7D)",link:"/zh/lupine.components/html-load",level:2},{type:"link",text:"NoticeMessage (\u901A\u77E5\u6D88\u606F)",link:"/zh/lupine.components/notice-message",level:2},{type:"link",text:"Progress (\u8FDB\u5EA6\u6761)",link:"/zh/lupine.components/progress",level:2},{type:"link",text:"Spinner (\u52A0\u8F7D\u52A8\u753B)",link:"/zh/lupine.components/spinner",level:2},{type:"link",text:"SvgIcon (SVG \u56FE\u6807)",link:"/zh/lupine.components/svg-icon",level:2},{type:"group",text:"\u6587\u672C\u7279\u6548",level:1},{type:"link",text:"TextGlow (\u53D1\u5149\u6587\u5B57)",link:"/zh/lupine.components/text-glow",level:2},{type:"link",text:"TextScale (\u7F29\u653E\u6587\u5B57)",link:"/zh/lupine.components/text-scale",level:2},{type:"link",text:"TextWave (\u6CE2\u52A8\u6587\u5B57)",link:"/zh/lupine.components/text-wave",level:2},{type:"group",text:"\u5176\u4ED6\u7EC4\u4EF6",level:1},{type:"link",text:"DragFresh (\u62D6\u52A8\u5237\u65B0)",link:"/zh/lupine.components/drag-fresh",level:2},{type:"link",text:"Redirect (\u91CD\u5B9A\u5411)",link:"/zh/lupine.components/redirect",level:2},{type:"link",text:"ResizableSplitter (\u53EF\u8C03\u5206\u5272\u5668)",link:"/zh/lupine.components/resizable-splitter",level:2},{type:"link",text:"SwitchOption (\u5207\u6362\u9009\u9879)",link:"/zh/lupine.components/switch-option",level:2},{type:"link",text:"ToggleBase (\u5207\u6362\u57FA\u7C7B)",link:"/zh/lupine.components/toggle-base",level:2},{type:"group",text:"Lupine.components-libs",level:0},{type:"group",text:"Utilities",level:1},{type:"link",text:"DateUtils",link:"/zh/lupine.components-libs/date-utils",level:2},{type:"link",text:"SimpleStorage",link:"/zh/lupine.components-libs/simple-storage",level:2},{type:"link",text:"DynamicalLoad",link:"/zh/lupine.components-libs/dynamical-load",level:2},{type:"link",text:"formatBytes",link:"/zh/lupine.components-libs/format-bytes",level:2},{type:"group",text:"DOM & UI Helpers",level:1},{type:"link",text:"DomUtils",link:"/zh/lupine.components-libs/dom-utils",level:2},{type:"link",text:"LiteDom",link:"/zh/lupine.components-libs/lite-dom",level:2},{type:"link",text:"DragUtil",link:"/zh/lupine.components-libs/drag-util",level:2},{type:"group",text:"Network & Files",level:1},{type:"link",text:"uploadFile",link:"/zh/lupine.components-libs/upload-file",level:2},{type:"link",text:"downloadStream",link:"/zh/lupine.components-libs/download-stream",level:2},{type:"group",text:"Event & State",level:1},{type:"link",text:"MessageHub",link:"/zh/lupine.components-libs/message-hub",level:2},{type:"link",text:"Observable",link:"/zh/lupine.components-libs/observable",level:2},{type:"group",text:"Lupine.api",level:0},{type:"group",text:"Core Concepts",level:1},{type:"link",text:"Server (\u670D\u52A1\u5668)",link:"/zh/lupine.api/app",level:2},{type:"link",text:"API Module (API \u6A21\u5757)",link:"/zh/lupine.api/api",level:2},{type:"group",text:"Tools",level:1},{type:"link",text:"Dashboard (\u7BA1\u7406\u9762\u677F)",link:"/zh/lupine.api/dashboard",level:2},{type:"group",text:"Lupine.press",level:0},{type:"link",text:"Press \u6587\u6863\u7CFB\u7EDF\u6982\u89C8",link:"/zh/lupine.press/overview",level:1}],features:[{title:"\u524D\u7AEF (lupine.web)",details:"\u6781\u5176\u8F7B\u91CF\u7EA7\uFF08\u7EA6 10kb\uFF09\u7684\u6846\u67B6\uFF0C\u4F7F\u7528 React TSX \u8BED\u6CD5\u3002\u65E0\u81C3\u80BF\u8FD0\u884C\u65F6\u3002"},{title:"\u540E\u7AEF (lupine.api)",details:"\u9AD8\u6548\u4E14\u7B80\u5316\u7684\u6846\u67B6\uFF0C\u7C7B\u4F3C\u4E8E Express\u3002\u4E3A\u670D\u52A1\u7AEF\u6E32\u67D3\u8FDB\u884C\u4E86\u4F18\u5316\u3002"},{title:"\u96F6\u4F9D\u8D56",details:"\u6781\u5C11\u7684\u4F9D\u8D56\u6811\uFF0C\u786E\u4FDD\u5FEB\u901F\u6784\u5EFA\u548C\u53EF\u9760\u90E8\u7F72\u3002"}]},headings:[]},"/zh/lupine.api/api":{html:dd,data:{title:"API Module (API \u6A21\u5757)"},headings:[{level:2,text:"\u4E3B\u8981\u7279\u6027 (Key Features)",id:"\u4E3B\u8981\u7279\u6027-key-features"},{level:2,text:"\u4F7F\u7528\u793A\u4F8B (Usage Example)",id:"\u4F7F\u7528\u793A\u4F8B-usage-example"}]},"/zh/lupine.api/app":{html:ud,data:{title:"Server (\u670D\u52A1\u5668)"},headings:[{level:2,text:"\u4E3B\u8981\u7279\u6027 (Key Features)",id:"\u4E3B\u8981\u7279\u6027-key-features"},{level:2,text:"\u4F7F\u7528\u793A\u4F8B (Usage Example)",id:"\u4F7F\u7528\u793A\u4F8B-usage-example"}]},"/zh/lupine.api/dashboard":{html:gd,data:{title:"Dashboard (\u7BA1\u7406\u9762\u677F)"},headings:[{level:2,text:"\u529F\u80FD\u7279\u6027 (Features)",id:"\u529F\u80FD\u7279\u6027-features"},{level:3,text:"1. \u6570\u636E\u5E93\u7BA1\u7406 (DB)",id:"1-\u6570\u636E\u5E93\u7BA1\u7406-db"},{level:3,text:"2. \u8FD0\u7EF4\u4E0E\u670D\u52A1\u5668\u7BA1\u7406 (Access & Server Info)",id:"2-\u8FD0\u7EF4\u4E0E\u670D\u52A1\u5668\u7BA1\u7406-access-server-info"},{level:3,text:"3. \u5F00\u53D1\u4E0E\u6D4B\u8BD5 (Test)",id:"3-\u5F00\u53D1\u4E0E\u6D4B\u8BD5-test"},{level:2,text:"\u6269\u5C55\u5F00\u53D1",id:"\u6269\u5C55\u5F00\u53D1"},{level:3,text:"\u83DC\u5355\u914D\u7F6E",id:"\u83DC\u5355\u914D\u7F6E"},{level:3,text:"\u9875\u9762\u5F00\u53D1",id:"\u9875\u9762\u5F00\u53D1"}]},"/zh/lupine.api/index":{html:hd,data:{title:"Lupine.api",sidebar:[{type:"group",text:"Core Concepts",level:0},{type:"link",text:"Server (\u670D\u52A1\u5668)",link:"/zh/lupine.api/app",level:1},{type:"link",text:"API Module (API \u6A21\u5757)",link:"/zh/lupine.api/api",level:1},{type:"group",text:"Tools",level:0},{type:"link",text:"Dashboard (\u7BA1\u7406\u9762\u677F)",link:"/zh/lupine.api/dashboard",level:1}]},headings:[]},"/zh/lupine.components-libs/date-utils":{html:md,data:{title:"DateUtils"},headings:[]},"/zh/lupine.components-libs/dom-utils":{html:fd,data:{title:"DomUtils"},headings:[]},"/zh/lupine.components-libs/download-stream":{html:bd,data:{title:"downloadStream"},headings:[]},"/zh/lupine.components-libs/drag-util":{html:xd,data:{title:"DragUtil"},headings:[]},"/zh/lupine.components-libs/dynamical-load":{html:vd,data:{title:"DynamicalLoad"},headings:[]},"/zh/lupine.components-libs/format-bytes":{html:yd,data:{title:"formatBytes"},headings:[]},"/zh/lupine.components-libs/index":{html:kd,data:{title:"Lupine.components-libs",sidebar:[{type:"group",text:"Utilities",level:0},{type:"link",text:"DateUtils",link:"/zh/lupine.components-libs/date-utils",level:1},{type:"link",text:"SimpleStorage",link:"/zh/lupine.components-libs/simple-storage",level:1},{type:"link",text:"DynamicalLoad",link:"/zh/lupine.components-libs/dynamical-load",level:1},{type:"link",text:"formatBytes",link:"/zh/lupine.components-libs/format-bytes",level:1},{type:"group",text:"DOM & UI Helpers",level:0},{type:"link",text:"DomUtils",link:"/zh/lupine.components-libs/dom-utils",level:1},{type:"link",text:"LiteDom",link:"/zh/lupine.components-libs/lite-dom",level:1},{type:"link",text:"DragUtil",link:"/zh/lupine.components-libs/drag-util",level:1},{type:"group",text:"Network & Files",level:0},{type:"link",text:"uploadFile",link:"/zh/lupine.components-libs/upload-file",level:1},{type:"link",text:"downloadStream",link:"/zh/lupine.components-libs/download-stream",level:1},{type:"group",text:"Event & State",level:0},{type:"link",text:"MessageHub",link:"/zh/lupine.components-libs/message-hub",level:1},{type:"link",text:"Observable",link:"/zh/lupine.components-libs/observable",level:1}]},headings:[{level:2,text:"Utilities",id:"utilities"},{level:2,text:"DOM & UI Helpers",id:"dom-ui-helpers"},{level:2,text:"Network & Files",id:"network-files"},{level:2,text:"Event & State",id:"event-state"}]},"/zh/lupine.components-libs/lite-dom":{html:wd,data:{title:"LiteDom"},headings:[]},"/zh/lupine.components-libs/message-hub":{html:Sd,data:{title:"MessageHub"},headings:[]},"/zh/lupine.components-libs/observable":{html:Td,data:{title:"Observable"},headings:[]},"/zh/lupine.components-libs/simple-storage":{html:Cd,data:{title:"SimpleStorage"},headings:[]},"/zh/lupine.components-libs/upload-file":{html:Pd,data:{title:"uploadFile"},headings:[]},"/zh/lupine.components/action-sheet":{html:Ed,data:{title:"Action Sheet (\u52A8\u4F5C\u5217\u8868)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/button":{html:Md,data:{title:"Button (\u6309\u94AE)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/drag-fresh":{html:Ld,data:{title:"DragFresh (\u62D6\u52A8\u5237\u65B0)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/editable-label":{html:Ad,data:{title:"EditableLabel (\u53EF\u7F16\u8F91\u6807\u7B7E)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/float-window":{html:Rd,data:{title:"FloatWindow (\u6D6E\u7A97)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/grid":{html:Hd,data:{title:"Grid (\u7F51\u683C)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/html-load":{html:Id,data:{title:"HtmlLoad (HTML \u52A0\u8F7D)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/html-var":{html:Dd,data:{title:"HtmlVar"},headings:[{level:2,text:"1. \u6B63\u786E\u7528\u6CD5",id:"1-\u6B63\u786E\u7528\u6CD5"},{level:3,text:"\u793A\u4F8B",id:"\u793A\u4F8B"},{level:2,text:"2. \u4E0E\u73B0\u4EE3\u6846\u67B6\u7684\u5BF9\u6BD4",id:"2-\u4E0E\u73B0\u4EE3\u6846\u67B6\u7684\u5BF9\u6BD4"},{level:2,text:"3. \u63A8\u8350\u7684\u8F85\u52A9\u51FD\u6570\uFF1Aval<T>",id:"3-\u63A8\u8350\u7684\u8F85\u52A9\u51FD\u6570-val-t"}]},"/zh/lupine.components/index":{html:zd,data:{title:"Lupine.components (\u7EC4\u4EF6)",sidebar:[{type:"group",text:"\u7A97\u53E3\u4E0E\u5BF9\u8BDD\u6846",level:0},{type:"link",text:"FloatWindow (\u6D6E\u7A97)",link:"/zh/lupine.components/float-window",level:1},{type:"link",text:"Modal (\u6A21\u6001\u6846)",link:"/zh/lupine.components/modal",level:1},{type:"link",text:"MessageBox (\u6D88\u606F\u6846)",link:"/zh/lupine.components/message-box",level:1},{type:"link",text:"Action Sheet (\u52A8\u4F5C\u5217\u8868)",link:"/zh/lupine.components/action-sheet",level:1},{type:"group",text:"\u5BFC\u822A\u4E0E\u83DC\u5355",level:0},{type:"link",text:"MenuSidebar (\u4FA7\u8FB9\u5BFC\u822A\u680F)",link:"/zh/lupine.components/menu-sidebar",level:1},{type:"link",text:"Menubar (\u6A2A\u5411\u83DC\u5355\u680F)",link:"/zh/lupine.components/menu-bar",level:1},{type:"link",text:"PopupMenu (\u5F39\u51FA\u83DC\u5355)",link:"/zh/lupine.components/popup-menu",level:1},{type:"link",text:"Tabs (\u9009\u9879\u5361)",link:"/zh/lupine.components/tabs",level:1},{type:"link",text:"SlideTab (\u6ED1\u52A8\u9009\u9879\u5361)",link:"/zh/lupine.components/slide-tab",level:1},{type:"link",text:"PagingLink (\u5206\u9875\u94FE\u63A5)",link:"/zh/lupine.components/paging-link",level:1},{type:"group",text:"\u8868\u5355\u4E0E\u8F93\u5165",level:0},{type:"link",text:"Button (\u6309\u94AE)",link:"/zh/lupine.components/button",level:1},{type:"link",text:"ToggleSwitch (\u5207\u6362\u5F00\u5173)",link:"/zh/lupine.components/toggle-switch",level:1},{type:"link",text:"InputWithTitle (\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846)",link:"/zh/lupine.components/input-with-title",level:1},{type:"link",text:"SelectWithTitle (\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868)",link:"/zh/lupine.components/select-with-title",level:1},{type:"link",text:"RadioLabel (\u5355\u9009\u7EC4)",link:"/zh/lupine.components/radio-label",level:1},{type:"link",text:"EditableLabel (\u53EF\u7F16\u8F91\u6807\u7B7E)",link:"/zh/lupine.components/editable-label",level:1},{type:"link",text:"Stars (\u661F\u7EA7\u8BC4\u5206)",link:"/zh/lupine.components/stars",level:1},{type:"link",text:"SelectAngle (\u89D2\u5EA6\u9009\u62E9)",link:"/zh/lupine.components/select-angle",level:1},{type:"group",text:"\u5185\u5BB9\u4E0E\u5E03\u5C40",level:0},{type:"link",text:"Grid (\u7F51\u683C)",link:"/zh/lupine.components/grid",level:1},{type:"link",text:"HtmlVar",link:"/zh/lupine.components/html-var",level:1},{type:"link",text:"HtmlLoad (HTML \u52A0\u8F7D)",link:"/zh/lupine.components/html-load",level:1},{type:"link",text:"NoticeMessage (\u901A\u77E5\u6D88\u606F)",link:"/zh/lupine.components/notice-message",level:1},{type:"link",text:"Progress (\u8FDB\u5EA6\u6761)",link:"/zh/lupine.components/progress",level:1},{type:"link",text:"Spinner (\u52A0\u8F7D\u52A8\u753B)",link:"/zh/lupine.components/spinner",level:1},{type:"link",text:"SvgIcon (SVG \u56FE\u6807)",link:"/zh/lupine.components/svg-icon",level:1},{type:"group",text:"\u6587\u672C\u7279\u6548",level:0},{type:"link",text:"TextGlow (\u53D1\u5149\u6587\u5B57)",link:"/zh/lupine.components/text-glow",level:1},{type:"link",text:"TextScale (\u7F29\u653E\u6587\u5B57)",link:"/zh/lupine.components/text-scale",level:1},{type:"link",text:"TextWave (\u6CE2\u52A8\u6587\u5B57)",link:"/zh/lupine.components/text-wave",level:1},{type:"group",text:"\u5176\u4ED6\u7EC4\u4EF6",level:0},{type:"link",text:"DragFresh (\u62D6\u52A8\u5237\u65B0)",link:"/zh/lupine.components/drag-fresh",level:1},{type:"link",text:"Redirect (\u91CD\u5B9A\u5411)",link:"/zh/lupine.components/redirect",level:1},{type:"link",text:"ResizableSplitter (\u53EF\u8C03\u5206\u5272\u5668)",link:"/zh/lupine.components/resizable-splitter",level:1},{type:"link",text:"SwitchOption (\u5207\u6362\u9009\u9879)",link:"/zh/lupine.components/switch-option",level:1},{type:"link",text:"ToggleBase (\u5207\u6362\u57FA\u7C7B)",link:"/zh/lupine.components/toggle-base",level:1}]},headings:[{level:2,text:"\u6838\u5FC3\u7279\u6027",id:"\u6838\u5FC3\u7279\u6027"},{level:2,text:"\u5FEB\u901F\u6D4F\u89C8",id:"\u5FEB\u901F\u6D4F\u89C8"}]},"/zh/lupine.components/input-with-title":{html:Fd,data:{title:"InputWithTitle (\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/menu-bar":{html:Od,data:{title:"Menubar (\u6A2A\u5411\u83DC\u5355\u680F)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/menu-sidebar":{html:Bd,data:{title:"MenuSidebar (\u4FA7\u8FB9\u5BFC\u822A\u680F)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/message-box":{html:Nd,data:{title:"MessageBox (\u6D88\u606F\u6846)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/modal":{html:Wd,data:{title:"Modal (\u6A21\u6001\u6846)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/notice-message":{html:jd,data:{title:"NoticeMessage (\u901A\u77E5\u6D88\u606F)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/paging-link":{html:qd,data:{title:"PagingLink (\u5206\u9875\u94FE\u63A5)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/popup-menu":{html:_d,data:{title:"PopupMenu (\u5F39\u51FA\u83DC\u5355)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/progress":{html:$d,data:{title:"Progress (\u8FDB\u5EA6\u6761)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/radio-label":{html:Ud,data:{title:"RadioLabel (\u5355\u9009\u7EC4)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/redirect":{html:Vd,data:{title:"Redirect (\u91CD\u5B9A\u5411)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/resizable-splitter":{html:Gd,data:{title:"ResizableSplitter (\u53EF\u8C03\u5206\u5272\u5668)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/select-angle":{html:Yd,data:{title:"SelectAngle (\u89D2\u5EA6\u9009\u62E9)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/select-with-title":{html:Jd,data:{title:"SelectWithTitle (\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/slide-tab":{html:Kd,data:{title:"SlideTab (\u6ED1\u52A8\u9009\u9879\u5361)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/spinner":{html:Xd,data:{title:"Spinner (\u52A0\u8F7D\u52A8\u753B)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/stars":{html:Zd,data:{title:"Stars (\u661F\u7EA7\u8BC4\u5206)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/svg-icon":{html:Qd,data:{title:"SvgIcon (SVG \u56FE\u6807)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/switch-option":{html:eu,data:{title:"SwitchOption (\u5207\u6362\u9009\u9879)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/tabs":{html:tu,data:{title:"Tabs (\u9009\u9879\u5361)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/text-glow":{html:nu,data:{title:"TextGlow (\u53D1\u5149\u6587\u5B57)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/text-scale":{html:ru,data:{title:"TextScale (\u7F29\u653E\u6587\u5B57)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/text-wave":{html:ou,data:{title:"TextWave (\u6CE2\u52A8\u6587\u5B57)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.components/toggle-base":{html:iu,data:{title:"ToggleBase (\u5207\u6362\u57FA\u7C7B)"},headings:[{level:2,text:"\u8BF4\u660E",id:"\u8BF4\u660E"}]},"/zh/lupine.components/toggle-switch":{html:au,data:{title:"ToggleSwitch (\u5207\u6362\u5F00\u5173)"},headings:[{level:2,text:"\u5B9E\u88C5\u4F8B\u5B50",id:"\u5B9E\u88C5\u4F8B\u5B50"}]},"/zh/lupine.press/index":{html:su,data:{title:"Lupine.press",sidebar:[{type:"link",text:"Press \u6587\u6863\u7CFB\u7EDF\u6982\u89C8",link:"/zh/lupine.press/overview",level:0}]},headings:[]},"/zh/lupine.press/overview":{html:lu,data:{title:"Press \u6587\u6863\u7CFB\u7EDF\u6982\u89C8"},headings:[{level:2,text:"\u4E3B\u8981\u7279\u6027 (Features)",id:"\u4E3B\u8981\u7279\u6027-features"},{level:2,text:"\u4F7F\u7528\u6307\u5357 (Usage Guide)",id:"\u4F7F\u7528\u6307\u5357-usage-guide"},{level:3,text:"1. \u524D\u63D0\u6761\u4EF6 (Prerequisites)",id:"1-\u524D\u63D0\u6761\u4EF6-prerequisites"},{level:3,text:"2. \u57FA\u672C\u8BBE\u7F6E (Basic Setup)",id:"2-\u57FA\u672C\u8BBE\u7F6E-basic-setup"},{level:3,text:"3. \u6570\u636E\u7ED3\u6784 (markdownConfig)",id:"3-\u6570\u636E\u7ED3\u6784-markdownconfig"},{level:2,text:"Markdown \u6587\u4EF6\u7ED3\u6784\u4E0E\u5173\u8054 (Markdown File Structure & Association)",id:"markdown-\u6587\u4EF6\u7ED3\u6784\u4E0E\u5173\u8054-markdown-file-structure-association"},{level:3,text:"\u9876\u5C42\u914D\u7F6E (Top-level Configuration)",id:"\u9876\u5C42\u914D\u7F6E-top-level-configuration"},{level:3,text:"\u591A\u8BED\u8A00\u914D\u7F6E (Multilingual Configuration)",id:"\u591A\u8BED\u8A00\u914D\u7F6E-multilingual-configuration"},{level:3,text:"\u4FA7\u8FB9\u680F\u914D\u7F6E (Sidebar Configuration)",id:"\u4FA7\u8FB9\u680F\u914D\u7F6E-sidebar-configuration"},{level:2,text:"\u67B6\u6784 (Architecture)",id:"\u67B6\u6784-architecture"}]},"/zh/lupine.web/index":{html:cu,data:{title:"Lupine.web",sidebar:[{type:"link",text:"\u6982\u89C8",link:"/zh/lupine.web/overview",level:0}]},headings:[]},"/zh/lupine.web/overview":{html:pu,data:{title:"\u6982\u89C8"},headings:[{level:2,text:"\u4E3A\u4EC0\u4E48\u9009\u62E9 lupine.web",id:"\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-web"},{level:3,text:"\u{1F680} \u96F6\u4F9D\u8D56\u4E14\u8F7B\u91CF\u7EA7 (Zero-Dependency & Lightweight)",id:"\u96F6\u4F9D\u8D56\u4E14\u8F7B\u91CF\u7EA7-zero-dependency-lightweight"},{level:3,text:"\u{1F3A8} \u5185\u7F6E CSS-in-JS (Built-in CSS-in-JS) [\u{1F517}](../essentials/css-in-js)",id:"\u5185\u7F6E-css-in-js-built-in-css-in-js-essentials-css-in-js"},{level:3,text:"\u{1F6E3}\uFE0F \u5F3A\u5927\u7684\u8DEF\u7531 (Powerful Router) [\u{1F517}](../essentials/page-route)",id:"\u5F3A\u5927\u7684\u8DEF\u7531-powerful-router-essentials-page-route"},{level:3,text:"\u26A1 \u670D\u52A1\u7AEF\u6E32\u67D3 (SSR) \u4F18\u5148 (Server-Side Rendering First) [\u{1F517}](../essentials/ssr)",id:"\u670D\u52A1\u7AEF\u6E32\u67D3-ssr-\u4F18\u5148-server-side-rendering-first-essentials-ssr"},{level:3,text:"\u{1F30D} \u56FD\u9645\u5316 (i18n)",id:"\u56FD\u9645\u5316-i18n"},{level:3,text:"\u{1F6E0}\uFE0F \u73AF\u5883\u914D\u7F6E (Environment Configuration)",id:"\u73AF\u5883\u914D\u7F6E-environment-configuration"}]}};var uu={a:{textDecoration:"none",color:"inherit","&:hover":{color:"var(--press-brand-color)"}},body:{backgroundColor:"var(--primary-bg-color)",color:"var(--primary-color)",fontSize:"var(--font-size-base)",lineHeight:"var(--line-height-base)",fontFamily:'var(--font-family-base, SimSun, "Microsoft YaHei", Helvetica, Arial, sans-serif)',fontWeight:"var(--font-weight-base)"}};O()&&Xt("NODE_ENV","")==="development"&&Qt(Xt("API_PORT",0));Qn("en",{});Nn("light",_c);P("comm-css",uu,!1,!0);tr("LupineJS Doc");nr("LupineJS Doc");$a(du);var gu=new Ie;gu.use("*",qc);In(gu);})();
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
