import{j as s,Y as r,a as i}from"./app-CEOSl6vh.js";import{A as a}from"./AuthenticatedLayout-BLaOuR_x.js";import{S as m,C as n}from"./CommentCount-ZalQd4kS.js";import{L as d}from"./LineHeroSection-Bele0Aaf.js";import"./NavigationButton-CfnICpCX.js";import"./transition-BUWfA0LV.js";const u=({line:t,statusUpdates:o})=>t?s.jsxs(a,{children:[s.jsx(r,{title:`${t.name} の運行状況一覧`}),s.jsx(d,{lineName:t.name,lineColor:t.color_code}),s.jsx("div",{className:"py-12",children:s.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:s.jsx("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg p-6",children:o.map(e=>s.jsxs(i,{href:route("line.post.show",{lineId:t.id,postId:e.id}),className:"block mb-4 p-4 border rounded-md bg-slate-100 hover:bg-slate-200 transition duration-150 ease-in-out",children:[s.jsx("p",{className:"text-sm text-gray-500 mb-2",children:new Date(e.created_at).toLocaleString()}),s.jsx(m,{status:e.status}),s.jsx("p",{children:e.content}),s.jsx("div",{className:"flex justify-end mr-4",children:s.jsx(n,{comments:e.comments_count||0})})]},e.id))})})})]}):s.jsx("div",{children:"路線情報が見つかりません。"});export{u as default};
