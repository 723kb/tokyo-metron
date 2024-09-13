import{j as e,a as i,r as l,q as m}from"./app-BgAMWFci.js";import{q as f,u as p}from"./transition-PdgWZ5ow.js";const j=({isAuthenticated:t})=>e.jsxs("div",{className:"flex items-center",children:[e.jsx(i,{href:t?route("main"):route("top"),children:e.jsx("img",{src:"/images/HeaderLogo.png",alt:"トーキョーめとろんロゴ",className:"w-[100px] mr-2"})}),e.jsx("h1",{className:"text-2xl font-bold",children:"トーキョーめとろん"})]});function g({active:t=!1,className:r="",children:s,...n}){return e.jsx(i,{...n,className:"inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none "+(t?"border-indigo-400 text-gray-900 focus:border-indigo-700 ":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ")+r,children:s})}const b=()=>e.jsx("div",{className:"flex items-center space-x-4",children:e.jsxs("nav",{children:[e.jsx(g,{href:"#",children:"使い方"}),e.jsx(g,{href:"#",children:"お問い合わせ"})]})}),u=l.createContext(),o=({children:t})=>{const[r,s]=l.useState(!1),n=()=>{s(c=>!c)};return e.jsx(u.Provider,{value:{open:r,setOpen:s,toggleOpen:n},children:e.jsx("div",{className:"relative",children:t})})},v=({children:t})=>{const{open:r,setOpen:s,toggleOpen:n}=l.useContext(u);return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:n,children:t}),r&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>s(!1)})]})},y=({align:t="right",width:r="48",contentClasses:s="py-1 bg-white",children:n})=>{const{open:c,setOpen:h}=l.useContext(u);let d="origin-top";t==="left"?d="ltr:origin-top-left rtl:origin-top-right start-0":t==="right"&&(d="ltr:origin-top-right rtl:origin-top-left end-0");let x="";return r==="48"&&(x="w-48"),e.jsx(e.Fragment,{children:e.jsx(f,{as:l.Fragment,show:c,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:e.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${d} ${x}`,onClick:()=>h(!1),children:e.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+s,children:n})})})})},N=({className:t="",children:r,...s})=>e.jsx(i,{...s,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out "+t,children:r});o.Trigger=v;o.Content=y;o.Link=N;const w=({user:t})=>e.jsxs(o,{children:[e.jsx(o.Trigger,{children:e.jsx("span",{className:"inline-flex rounded-md",children:e.jsxs("button",{type:"button",className:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150",children:[t.name,e.jsx("svg",{className:"ml-2 -mr-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]})})}),e.jsxs(o.Content,{children:[e.jsx(o.Link,{href:route("profile.edit"),children:"マイページ"}),e.jsx(o.Link,{href:route("logout"),method:"post",as:"button",children:"ログアウト"})]})]}),k=()=>{const{t}=p(),r="px-4 py-2 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";return e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx(i,{href:route("login"),className:`${r} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`,children:t("Log in")}),e.jsx(i,{href:route("register"),className:`${r} bg-green-600 hover:bg-green-700 focus:ring-green-500`,children:t("Register")})]})},C=({isOpen:t,onClick:r})=>e.jsx("button",{onClick:r,className:"text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600","aria-label":"toggle menu",children:t?e.jsx("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})}):e.jsx("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16M4 18h16"})})});function a({active:t=!1,className:r="",children:s,...n}){return e.jsx(i,{...n,className:`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${t?"border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700":"border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"} text-base font-medium focus:outline-none transition duration-150 ease-in-out ${r}`,children:s})}const L=({isAuthenticated:t,auth:r})=>e.jsxs("div",{className:"md:hidden border-t border-gray-200",children:[t&&e.jsx("div",{className:"px-4 py-3 border-b border-gray-200",children:e.jsx("div",{className:"text-base font-medium text-gray-800",children:r.user.name})}),e.jsx(a,{href:"#",active:route().current("how-to-use"),children:"使い方"}),e.jsx(a,{href:"#",active:route().current("contact"),children:"お問い合わせ"}),t?e.jsxs(e.Fragment,{children:[e.jsx(a,{href:route("profile.edit"),active:route().current("profile.edit"),children:"マイページ"}),e.jsx(a,{href:route("logout"),method:"post",as:"button",children:"ログアウト"})]}):e.jsxs(e.Fragment,{children:[e.jsx(a,{href:route("login"),active:route().current("login"),children:"ログイン"}),e.jsx(a,{href:route("register"),active:route().current("register"),children:"会員登録"})]})]}),M=()=>{const{auth:t}=m().props,r=t.user!==null,[s,n]=l.useState(!1);return e.jsxs("header",{className:"w-full bg-white shadow",children:[e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"flex justify-between items-center py-4",children:[e.jsx(j,{isAuthenticated:r}),e.jsxs("div",{className:"hidden md:flex items-center space-x-4",children:[e.jsx(b,{}),r?e.jsx(w,{user:t.user}):e.jsx(k,{})]}),e.jsx("div",{className:"md:hidden",children:e.jsx(C,{isOpen:s,onClick:()=>n(!s)})})]})}),s&&e.jsx(L,{isAuthenticated:r,auth:t})]})},R=M,$=()=>e.jsx("h1",{className:"text-md font-bold",children:"©トーキョーめとろん by 723kb"}),F=()=>e.jsx("footer",{className:"bg-gray-100 text-center px-4 py-2",children:e.jsx($,{})}),S=F,O=({title:t,subtitle:r,imageSrc:s})=>{const n=`http://localhost${s}`;return e.jsxs("div",{className:"relative h-[500px]",children:[e.jsx("img",{src:n,alt:"ヒーロー画像",className:"absolute inset-0 w-full h-full object-cover"}),e.jsx("div",{className:"absolute inset-0 flex flex-col items-center justify-center",children:e.jsxs("div",{className:"text-center bg-white bg-opacity-85 p-6 rounded-lg",children:[e.jsx("h1",{className:"text-4xl font-bold mb-2",children:t}),e.jsx("h2",{className:"text-slate-600 text-2xl",children:r})]})})]})},D=O,B=({isAuthenticated:t})=>e.jsx(i,{href:t?route("main"):route("top"),className:"inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md  uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-4",children:t?"メインに戻る":"トップに戻る"}),q=B;export{k as A,S as F,R as H,q as N,D as a};
