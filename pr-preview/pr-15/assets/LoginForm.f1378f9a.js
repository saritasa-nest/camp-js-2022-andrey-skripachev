import{c as h,a as t,u as g,F as f,S as E,d as n,T as l,B as F}from"./TextField.fcbea061.js";import{r as s,o as L,p as S,L as b,M as v,l as c,F as w,j as e,N as x,Z as q}from"./index.b69fa320.js";import{T as m}from"./Menu.80e32b95.js";const y=h({email:t().email("Enter valid email").required("Email is required"),password:t().required("Password is required")}),k={email:"",password:""},T=()=>{const[d,i]=s.exports.useState(!1),p=L(),o=S(b),a=o instanceof v?o.data:void 0,r=g({initialValues:k,validationSchema:y,onSubmit:async u=>{i(!0),await p(q(u)),i(!1)}});return s.exports.useEffect(()=>{a&&r.setErrors(a)},[a]),c(w,{children:[e(m,{component:"h1",variant:"h2",children:"Login"}),e(f,{value:r,children:e("form",{onSubmit:r.handleSubmit,children:c(E,{spacing:2,children:[e(n,{required:!0,autoComplete:"email",component:l,name:"email",type:"email",label:"Email"}),e(n,{required:!0,autoComplete:"current-password",component:l,name:"password",type:"password",label:"Password"}),e(F,{fullWidth:!0,disabled:d,type:"submit",variant:"contained",children:"Login"})]})})}),e(m,{variant:"button",component:"span",children:e(x,{to:"../register",children:"Register"})})]})},P=s.exports.memo(T);export{P as LoginForm};
