import{W as f,r as x,j as s,Y as j}from"./app-BgAMWFci.js";import{G as v}from"./GuestLayout-B2fBZHKk.js";import{T as t,I as m}from"./TextInput-Dcu8VNHF.js";import{I as l}from"./InputLabel-643L_3oW.js";import{P as h}from"./PrimaryButton-DNG7cC9l.js";import{u as g}from"./transition-PdgWZ5ow.js";import"./NavigationButton-DTpIQWHe.js";function I({token:i,email:n}){const{t:d}=g(),{data:e,setData:o,post:p,processing:u,errors:r,reset:c}=f({token:i,email:n,password:"",password_confirmation:""});x.useEffect(()=>()=>{c("password","password_confirmation")},[]);const w=a=>{a.preventDefault(),p(route("password.store"))};return s.jsxs(v,{children:[s.jsx(j,{title:"Reset Password"}),s.jsxs("form",{onSubmit:w,children:[s.jsxs("div",{children:[s.jsx(l,{htmlFor:"email",value:"Email"}),s.jsx(t,{id:"email",type:"email",name:"email",value:e.email,className:"mt-1 block w-full",autoComplete:"username",onChange:a=>o("email",a.target.value)}),s.jsx(m,{message:r.email,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(l,{htmlFor:"password",value:"Password"}),s.jsx(t,{id:"password",type:"password",name:"password",value:e.password,className:"mt-1 block w-full",autoComplete:"new-password",isFocused:!0,onChange:a=>o("password",a.target.value)}),s.jsx(m,{message:r.password,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(l,{htmlFor:"password_confirmation",value:"Confirm Password"}),s.jsx(t,{type:"password",name:"password_confirmation",value:e.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",onChange:a=>o("password_confirmation",a.target.value)}),s.jsx(m,{message:r.password_confirmation,className:"mt-2"})]}),s.jsx("div",{className:"flex items-center justify-end mt-4",children:s.jsx(h,{className:"ms-4",disabled:u,children:d("Reset Password")})})]})]})}export{I as default};
