import{j as e,a as p,r as l,q as f,c as g}from"./app-CEOSl6vh.js";import{S as j,C as v}from"./CommentCount-ZalQd4kS.js";const y=({id:r,name:d,lineColor:u,status:n,content:o,commentCount:s,isAuthenticated:i})=>{const c=e.jsxs("div",{className:"px-4 py-5 sm:p-6",children:[e.jsx("h3",{className:"text-lg leading-6 font-semibold text-white mb-2",children:d}),e.jsx(j,{status:n}),e.jsx("p",{className:"mt-2 text-sm text-white [text-shadow:_1px_1px_2px_rgba(0,0,0,0.5)]",children:o}),e.jsx(v,{count:s})]}),a={backgroundColor:u},t=`shadow-md rounded-lg overflow-hidden ${i?"transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer":""}`;return i&&r?e.jsx(p,{href:route("line.index",{id:r}),className:t,style:a,children:c}):e.jsx("div",{className:t,style:a,children:c})},C=({onLastUpdateTime:r})=>{const[d,u]=l.useState([]),[n,o]=l.useState(!0),[s,i]=l.useState(null),{auth:c}=f().props,a=async()=>{try{const x=(await g.get("/lines-with-latest-status")).data.filter(h=>h.name!=="丸ノ内線支線");u(x),o(!1);const m=new Date().toLocaleString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1});typeof r=="function"&&r(m)}catch(t){console.error("Error fetching lines:",t),i("路線情報の取得に失敗しました。"),o(!1)}};return l.useEffect(()=>{a();const t=setInterval(a,5*60*1e3);return()=>clearInterval(t)},[]),n?e.jsx("div",{className:"text-center py-4",children:"読み込み中..."}):s?e.jsx("div",{className:"text-center py-4 text-red-500",children:s}):n?e.jsx("div",{children:"読み込み中..."}):s?e.jsx("div",{children:s}):e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:d.map(t=>e.jsx(y,{id:t.id,name:t.name,lineColor:t.color_code,status:t.status,content:t.content,isAuthenticated:c.user!==null},t.id))})};export{C as O};
