import{r as o,o as u,p as f,L as h,l as m,F as g,j as e,M as w,N as q}from"./index.b61b3aea.js";import{c as b,a as r,b as F,u as S,F as v,S as x,d as a,T as s,B as E}from"./object.5806e8c9.js";import{T as d}from"./Menu.ab2e29de.js";const L=b({firstName:r().required("First name is required"),lastName:r().required("Last name is required"),email:r().email("Enter valid email").required("Email is required"),password:r().required("Password is required"),confirmPassword:r().oneOf([F("password")],"Passwords doesn't match")}),N={firstName:"",lastName:"",email:"",password:"",confirmPassword:""},P=()=>{const[l,n]=o.exports.useState(!1),c=u(),t=f(h),i=S({initialValues:N,validationSchema:L,onSubmit:async p=>{n(!0),await c(q(p)),n(!1)}});return o.exports.useEffect(()=>{t?.data&&i.setErrors(t.data)},[t]),m(g,{children:[e(d,{component:"h1",variant:"h2",children:"Register"}),e(v,{value:i,children:e("form",{onSubmit:i.handleSubmit,children:m(x,{spacing:2,children:[e(a,{required:!0,name:"firstName",label:"First name",component:s}),e(a,{required:!0,name:"lastName",label:"Last name",component:s}),e(a,{required:!0,name:"email",autoComplete:"email",label:"Email",component:s}),e(a,{required:!0,type:"password",autoComplete:"password",name:"password",label:"Password",component:s}),e(a,{required:!0,type:"password",autoComplete:"password",name:"confirmPassword",label:"Confirm password",component:s}),e(E,{disabled:l,fullWidth:!0,type:"submit",variant:"contained",children:"Register"})]})})}),e(d,{variant:"button",component:"span",children:e(w,{to:"../login",children:"Login"})})]})},T=o.exports.memo(P);export{T as RegisterForm};
