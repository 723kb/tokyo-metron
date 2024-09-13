import{r as a,I as Le,R as Pe,g as ke,d as Ae,m as S,e as le}from"./app-BgAMWFci.js";const He=(...e)=>{console!=null&&console.warn&&(k(e[0])&&(e[0]=`react-i18next:: ${e[0]}`),console.warn(...e))},ue={},ne=(...e)=>{k(e[0])&&ue[e[0]]||(k(e[0])&&(ue[e[0]]=new Date),He(...e))},pe=(e,t)=>()=>{if(e.isInitialized)t();else{const n=()=>{setTimeout(()=>{e.off("initialized",n)},0),t()};e.on("initialized",n)}},ce=(e,t,n)=>{e.loadNamespaces(t,pe(e,n))},fe=(e,t,n,r)=>{k(n)&&(n=[n]),n.forEach(s=>{e.options.ns.indexOf(s)<0&&e.options.ns.push(s)}),e.loadLanguages(t,pe(e,r))},Ie=(e,t,n={})=>!t.languages||!t.languages.length?(ne("i18n.languages were undefined or empty",t.languages),!0):t.hasLoadedNamespace(e,{lng:n.lng,precheck:(r,s)=>{var i;if(((i=n.bindI18n)==null?void 0:i.indexOf("languageChanging"))>-1&&r.services.backendConnector.backend&&r.isLanguageChangingTo&&!s(r.isLanguageChangingTo,e))return!1}}),k=e=>typeof e=="string",Me=e=>typeof e=="object"&&e!==null,qe=(e,t)=>{const n=a.useRef();return a.useEffect(()=>{n.current=e},[e,t]),n.current},he=(e,t,n,r)=>e.getFixedT(t,n,r),Ue=(e,t,n,r)=>a.useCallback(he(e,t,n,r),[e,t,n,r]),ft=(e,t={})=>{var C,M,F,A;const{i18n:n}=t,{i18n:r,defaultNS:s}=a.useContext(Le)||{},i=n||r||Ae();if(i&&!i.reportNamespaces&&(i.reportNamespaces=new Pe),!i){ne("You will need to pass in an i18next instance by using initReactI18next");const y=(w,N)=>k(N)?N:Me(N)&&k(N.defaultValue)?N.defaultValue:Array.isArray(w)?w[w.length-1]:w,T=[y,{},!1];return T.t=y,T.i18n={},T.ready=!1,T}(C=i.options.react)!=null&&C.wait&&ne("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");const f={...ke(),...i.options.react,...t},{useSuspense:d,keyPrefix:l}=f;let o=s||((M=i.options)==null?void 0:M.defaultNS);o=k(o)?[o]:o||["translation"],(A=(F=i.reportNamespaces).addUsedNamespaces)==null||A.call(F,o);const u=(i.isInitialized||i.initializedStoreOnce)&&o.every(y=>Ie(y,i,f)),v=Ue(i,t.lng||null,f.nsMode==="fallback"?o:o[0],l),g=()=>v,h=()=>he(i,t.lng||null,f.nsMode==="fallback"?o:o[0],l),[p,m]=a.useState(g);let c=o.join();t.lng&&(c=`${t.lng}${c}`);const O=qe(c),E=a.useRef(!0);a.useEffect(()=>{const{bindI18n:y,bindI18nStore:T}=f;E.current=!0,!u&&!d&&(t.lng?fe(i,t.lng,o,()=>{E.current&&m(h)}):ce(i,o,()=>{E.current&&m(h)})),u&&O&&O!==c&&E.current&&m(h);const w=()=>{E.current&&m(h)};return y&&(i==null||i.on(y,w)),T&&(i==null||i.store.on(T,w)),()=>{E.current=!1,i&&(y==null||y.split(" ").forEach(N=>i.off(N,w))),T&&i&&T.split(" ").forEach(N=>i.store.off(N,w))}},[i,c]),a.useEffect(()=>{E.current&&u&&m(g)},[i,l,u]);const b=[p,i,u];if(b.t=p,b.i18n=i,b.ready=u,u||!u&&!d)return b;throw new Promise(y=>{t.lng?fe(i,t.lng,o,()=>y()):ce(i,o,()=>y())})};var ze=Object.defineProperty,De=(e,t,n)=>t in e?ze(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,X=(e,t,n)=>(De(e,typeof t!="symbol"?t+"":t,n),n);let Be=class{constructor(){X(this,"current",this.detect()),X(this,"handoffState","pending"),X(this,"currentId",0)}set(t){this.current!==t&&(this.handoffState="pending",this.currentId=0,this.current=t)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window>"u"||typeof document>"u"?"server":"client"}handoff(){this.handoffState==="pending"&&(this.handoffState="complete")}get isHandoffComplete(){return this.handoffState==="complete"}},G=new Be,U=(e,t)=>{G.isServer?a.useEffect(e,t):a.useLayoutEffect(e,t)};function I(e){let t=a.useRef(e);return U(()=>{t.current=e},[e]),t}let $=function(e){let t=I(e);return S.useCallback((...n)=>t.current(...n),[t])};function Ye(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}function z(){let e=[],t={addEventListener(n,r,s,i){return n.addEventListener(r,s,i),t.add(()=>n.removeEventListener(r,s,i))},requestAnimationFrame(...n){let r=requestAnimationFrame(...n);return t.add(()=>cancelAnimationFrame(r))},nextFrame(...n){return t.requestAnimationFrame(()=>t.requestAnimationFrame(...n))},setTimeout(...n){let r=setTimeout(...n);return t.add(()=>clearTimeout(r))},microTask(...n){let r={current:!0};return Ye(()=>{r.current&&n[0]()}),t.add(()=>{r.current=!1})},style(n,r,s){let i=n.style.getPropertyValue(r);return Object.assign(n.style,{[r]:s}),this.add(()=>{Object.assign(n.style,{[r]:i})})},group(n){let r=z();return n(r),this.add(()=>r.dispose())},add(n){return e.push(n),()=>{let r=e.indexOf(n);if(r>=0)for(let s of e.splice(r,1))s()}},dispose(){for(let n of e.splice(0))n()}};return t}function ge(){let[e]=a.useState(z);return a.useEffect(()=>()=>e.dispose(),[e]),e}function Ge(){let e=typeof document>"u";return"useSyncExternalStore"in le?(t=>t.useSyncExternalStore)(le)(()=>()=>{},()=>!1,()=>!e):!1}function ve(){let e=Ge(),[t,n]=a.useState(G.isHandoffComplete);return t&&G.isHandoffComplete===!1&&n(!1),a.useEffect(()=>{t!==!0&&n(!0)},[t]),a.useEffect(()=>G.handoff(),[]),e?!1:t}function x(e,t,...n){if(e in t){let s=t[e];return typeof s=="function"?s(...n):s}let r=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(s=>`"${s}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,x),r}let be=Symbol();function mt(e,t=!0){return Object.assign(e,{[be]:t})}function ye(...e){let t=a.useRef(e);a.useEffect(()=>{t.current=e},[e]);let n=$(r=>{for(let s of t.current)s!=null&&(typeof s=="function"?s(r):s.current=r)});return e.every(r=>r==null||(r==null?void 0:r[be]))?void 0:n}function V(...e){return Array.from(new Set(e.flatMap(t=>typeof t=="string"?t.split(" "):[]))).filter(Boolean).join(" ")}var Ee=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(Ee||{}),P=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(P||{});function Te({ourProps:e,theirProps:t,slot:n,defaultTag:r,features:s,visible:i=!0,name:f,mergeRefs:d}){d=d??Ve;let l=we(t,e);if(i)return Y(l,n,r,f,d);let o=s??0;if(o&2){let{static:u=!1,...v}=l;if(u)return Y(v,n,r,f,d)}if(o&1){let{unmount:u=!0,...v}=l;return x(u?0:1,{0(){return null},1(){return Y({...v,hidden:!0,style:{display:"none"}},n,r,f,d)}})}return Y(l,n,r,f,d)}function Y(e,t={},n,r,s){let{as:i=n,children:f,refName:d="ref",...l}=Z(e,["unmount","static"]),o=e.ref!==void 0?{[d]:e.ref}:{},u=typeof f=="function"?f(t):f;"className"in l&&l.className&&typeof l.className=="function"&&(l.className=l.className(t));let v={};if(t){let g=!1,h=[];for(let[p,m]of Object.entries(t))typeof m=="boolean"&&(g=!0),m===!0&&h.push(p);g&&(v["data-headlessui-state"]=h.join(" "))}if(i===a.Fragment&&Object.keys(de(l)).length>0){if(!a.isValidElement(u)||Array.isArray(u)&&u.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${r} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(l).map(m=>`  - ${m}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(m=>`  - ${m}`).join(`
`)].join(`
`));let g=u.props,h=typeof(g==null?void 0:g.className)=="function"?(...m)=>V(g==null?void 0:g.className(...m),l.className):V(g==null?void 0:g.className,l.className),p=h?{className:h}:{};return a.cloneElement(u,Object.assign({},we(u.props,de(Z(l,["ref"]))),v,o,{ref:s(u.ref,o.ref)},p))}return a.createElement(i,Object.assign({},Z(l,["ref"]),i!==a.Fragment&&o,i!==a.Fragment&&v),u)}function Ve(...e){return e.every(t=>t==null)?void 0:t=>{for(let n of e)n!=null&&(typeof n=="function"?n(t):n.current=t)}}function we(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},n={};for(let r of e)for(let s in r)s.startsWith("on")&&typeof r[s]=="function"?(n[s]!=null||(n[s]=[]),n[s].push(r[s])):t[s]=r[s];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(n).map(r=>[r,void 0])));for(let r in n)Object.assign(t,{[r](s,...i){let f=n[r];for(let d of f){if((s instanceof Event||(s==null?void 0:s.nativeEvent)instanceof Event)&&s.defaultPrevented)return;d(s,...i)}}});return t}function ie(e){var t;return Object.assign(a.forwardRef(e),{displayName:(t=e.displayName)!=null?t:e.name})}function de(e){let t=Object.assign({},e);for(let n in t)t[n]===void 0&&delete t[n];return t}function Z(e,t=[]){let n=Object.assign({},e);for(let r of t)r in n&&delete n[r];return n}let se=a.createContext(null);se.displayName="OpenClosedContext";var R=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(R||{});function Ne(){return a.useContext(se)}function We({value:e,children:t}){return S.createElement(se.Provider,{value:e},t)}function ae(){let e=a.useRef(!1);return U(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function Je(e=0){let[t,n]=a.useState(e),r=ae(),s=a.useCallback(l=>{r.current&&n(o=>o|l)},[t,r]),i=a.useCallback(l=>!!(t&l),[t]),f=a.useCallback(l=>{r.current&&n(o=>o&~l)},[n,r]),d=a.useCallback(l=>{r.current&&n(o=>o^l)},[n]);return{flags:t,addFlag:s,hasFlag:i,removeFlag:f,toggleFlag:d}}function Ke(e){let t={called:!1};return(...n)=>{if(!t.called)return t.called=!0,e(...n)}}function ee(e,...t){e&&t.length>0&&e.classList.add(...t)}function te(e,...t){e&&t.length>0&&e.classList.remove(...t)}function Qe(e,t){let n=z();if(!e)return n.dispose;let{transitionDuration:r,transitionDelay:s}=getComputedStyle(e),[i,f]=[r,s].map(l=>{let[o=0]=l.split(",").filter(Boolean).map(u=>u.includes("ms")?parseFloat(u):parseFloat(u)*1e3).sort((u,v)=>v-u);return o}),d=i+f;if(d!==0){n.group(o=>{o.setTimeout(()=>{t(),o.dispose()},d),o.addEventListener(e,"transitionrun",u=>{u.target===u.currentTarget&&o.dispose()})});let l=n.addEventListener(e,"transitionend",o=>{o.target===o.currentTarget&&(t(),l())})}else t();return n.add(()=>t()),n.dispose}function _e(e,t,n,r){let s=n?"enter":"leave",i=z(),f=r!==void 0?Ke(r):()=>{};s==="enter"&&(e.removeAttribute("hidden"),e.style.display="");let d=x(s,{enter:()=>t.enter,leave:()=>t.leave}),l=x(s,{enter:()=>t.enterTo,leave:()=>t.leaveTo}),o=x(s,{enter:()=>t.enterFrom,leave:()=>t.leaveFrom});return te(e,...t.base,...t.enter,...t.enterTo,...t.enterFrom,...t.leave,...t.leaveFrom,...t.leaveTo,...t.entered),ee(e,...t.base,...d,...o),i.nextFrame(()=>{te(e,...t.base,...d,...o),ee(e,...t.base,...d,...l),Qe(e,()=>(te(e,...t.base,...d),ee(e,...t.base,...t.entered),f()))}),i.dispose}function Xe({immediate:e,container:t,direction:n,classes:r,onStart:s,onStop:i}){let f=ae(),d=ge(),l=I(n);U(()=>{e&&(l.current="enter")},[e]),U(()=>{let o=z();d.add(o.dispose);let u=t.current;if(u&&l.current!=="idle"&&f.current)return o.dispose(),s.current(l.current),o.add(_e(u,r.current,l.current==="enter",()=>{o.dispose(),i.current(l.current)})),o.dispose},[n])}function L(e=""){return e.split(/\s+/).filter(t=>t.length>1)}let W=a.createContext(null);W.displayName="TransitionContext";var Ze=(e=>(e.Visible="visible",e.Hidden="hidden",e))(Ze||{});function et(){let e=a.useContext(W);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function tt(){let e=a.useContext(J);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let J=a.createContext(null);J.displayName="NestingContext";function K(e){return"children"in e?K(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function Se(e,t){let n=I(e),r=a.useRef([]),s=ae(),i=ge(),f=$((h,p=P.Hidden)=>{let m=r.current.findIndex(({el:c})=>c===h);m!==-1&&(x(p,{[P.Unmount](){r.current.splice(m,1)},[P.Hidden](){r.current[m].state="hidden"}}),i.microTask(()=>{var c;!K(r)&&s.current&&((c=n.current)==null||c.call(n))}))}),d=$(h=>{let p=r.current.find(({el:m})=>m===h);return p?p.state!=="visible"&&(p.state="visible"):r.current.push({el:h,state:"visible"}),()=>f(h,P.Unmount)}),l=a.useRef([]),o=a.useRef(Promise.resolve()),u=a.useRef({enter:[],leave:[],idle:[]}),v=$((h,p,m)=>{l.current.splice(0),t&&(t.chains.current[p]=t.chains.current[p].filter(([c])=>c!==h)),t==null||t.chains.current[p].push([h,new Promise(c=>{l.current.push(c)})]),t==null||t.chains.current[p].push([h,new Promise(c=>{Promise.all(u.current[p].map(([O,E])=>E)).then(()=>c())})]),p==="enter"?o.current=o.current.then(()=>t==null?void 0:t.wait.current).then(()=>m(p)):m(p)}),g=$((h,p,m)=>{Promise.all(u.current[p].splice(0).map(([c,O])=>O)).then(()=>{var c;(c=l.current.shift())==null||c()}).then(()=>m(p))});return a.useMemo(()=>({children:r,register:d,unregister:f,onStart:v,onStop:g,wait:o,chains:u}),[d,f,r,v,g,u,o])}function nt(){}let rt=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function me(e){var t;let n={};for(let r of rt)n[r]=(t=e[r])!=null?t:nt;return n}function it(e){let t=a.useRef(me(e));return a.useEffect(()=>{t.current=me(e)},[e]),t}let st="div",Ce=Ee.RenderStrategy;function at(e,t){var n,r;let{beforeEnter:s,afterEnter:i,beforeLeave:f,afterLeave:d,enter:l,enterFrom:o,enterTo:u,entered:v,leave:g,leaveFrom:h,leaveTo:p,...m}=e,c=a.useRef(null),O=ye(c,t),E=(n=m.unmount)==null||n?P.Unmount:P.Hidden,{show:b,appear:C,initial:M}=et(),[F,A]=a.useState(b?"visible":"hidden"),y=tt(),{register:T,unregister:w}=y;a.useEffect(()=>T(c),[T,c]),a.useEffect(()=>{if(E===P.Hidden&&c.current){if(b&&F!=="visible"){A("visible");return}return x(F,{hidden:()=>w(c),visible:()=>T(c)})}},[F,c,T,w,b,E]);let N=I({base:L(m.className),enter:L(l),enterFrom:L(o),enterTo:L(u),entered:L(v),leave:L(g),leaveFrom:L(h),leaveTo:L(p)}),D=it({beforeEnter:s,afterEnter:i,beforeLeave:f,afterLeave:d}),Q=ve();a.useEffect(()=>{if(Q&&F==="visible"&&c.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[c,F,Q]);let xe=M&&!C,oe=C&&b&&M,Oe=!Q||xe?"idle":b?"enter":"leave",q=Je(0),Re=$(j=>x(j,{enter:()=>{q.addFlag(R.Opening),D.current.beforeEnter()},leave:()=>{q.addFlag(R.Closing),D.current.beforeLeave()},idle:()=>{}})),$e=$(j=>x(j,{enter:()=>{q.removeFlag(R.Opening),D.current.afterEnter()},leave:()=>{q.removeFlag(R.Closing),D.current.afterLeave()},idle:()=>{}})),B=Se(()=>{A("hidden"),w(c)},y),_=a.useRef(!1);Xe({immediate:oe,container:c,classes:N,direction:Oe,onStart:I(j=>{_.current=!0,B.onStart(c,j,Re)}),onStop:I(j=>{_.current=!1,B.onStop(c,j,$e),j==="leave"&&!K(B)&&(A("hidden"),w(c))})});let H=m,je={ref:O};return oe?H={...H,className:V(m.className,...N.current.enter,...N.current.enterFrom)}:_.current&&(H.className=V(m.className,(r=c.current)==null?void 0:r.className),H.className===""&&delete H.className),S.createElement(J.Provider,{value:B},S.createElement(We,{value:x(F,{visible:R.Open,hidden:R.Closed})|q.flags},Te({ourProps:je,theirProps:H,defaultTag:st,features:Ce,visible:F==="visible",name:"Transition.Child"})))}function ot(e,t){let{show:n,appear:r=!1,unmount:s=!0,...i}=e,f=a.useRef(null),d=ye(f,t);ve();let l=Ne();if(n===void 0&&l!==null&&(n=(l&R.Open)===R.Open),![!0,!1].includes(n))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[o,u]=a.useState(n?"visible":"hidden"),v=Se(()=>{u("hidden")}),[g,h]=a.useState(!0),p=a.useRef([n]);U(()=>{g!==!1&&p.current[p.current.length-1]!==n&&(p.current.push(n),h(!1))},[p,n]);let m=a.useMemo(()=>({show:n,appear:r,initial:g}),[n,r,g]);a.useEffect(()=>{if(n)u("visible");else if(!K(v))u("hidden");else{let b=f.current;if(!b)return;let C=b.getBoundingClientRect();C.x===0&&C.y===0&&C.width===0&&C.height===0&&u("hidden")}},[n,v]);let c={unmount:s},O=$(()=>{var b;g&&h(!1),(b=e.beforeEnter)==null||b.call(e)}),E=$(()=>{var b;g&&h(!1),(b=e.beforeLeave)==null||b.call(e)});return S.createElement(J.Provider,{value:v},S.createElement(W.Provider,{value:m},Te({ourProps:{...c,as:a.Fragment,children:S.createElement(Fe,{ref:d,...c,...i,beforeEnter:O,beforeLeave:E})},theirProps:{},defaultTag:a.Fragment,features:Ce,visible:o==="visible",name:"Transition"})))}function lt(e,t){let n=a.useContext(W)!==null,r=Ne()!==null;return S.createElement(S.Fragment,null,!n&&r?S.createElement(re,{ref:t,...e}):S.createElement(Fe,{ref:t,...e}))}let re=ie(ot),Fe=ie(at),ut=ie(lt),pt=Object.assign(re,{Child:ut,Root:re});export{Te as C,Ee as O,mt as T,ie as U,U as a,x as b,I as c,z as d,Ne as e,ae as f,R as g,ve as l,$ as o,ge as p,pt as q,G as s,Ye as t,ft as u,ye as y};