import{Y as k,_ as u,Z as $,a as x,$ as G,r as f,d as R,e as S,j as l,f as P,g as y,s as T,u as M,a0 as j}from"./index.f9d9e587.js";const L=k();var N=L;const _=["className","component","disableGutters","fixed","maxWidth","classes"],U=$(),w=N("div",{name:"MuiContainer",slot:"Root",overridesResolver:(a,e)=>{const{ownerState:o}=a;return[e.root,e[`maxWidth${x(String(o.maxWidth))}`],o.fixed&&e.fixed,o.disableGutters&&e.disableGutters]}}),z=a=>G({props:a,name:"MuiContainer",defaultTheme:U}),A=(a,e)=>{const o=n=>y(e,n),{classes:c,fixed:p,disableGutters:m,maxWidth:t}=a,s={root:["root",t&&`maxWidth${x(String(t))}`,p&&"fixed",m&&"disableGutters"]};return S(s,o,c)};function O(a={}){const{createStyledComponent:e=w,useThemeProps:o=z,componentName:c="MuiContainer"}=a,p=e(({theme:t,ownerState:s})=>u({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!s.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}}),({theme:t,ownerState:s})=>s.fixed&&Object.keys(t.breakpoints.values).reduce((n,i)=>{const d=i,r=t.breakpoints.values[d];return r!==0&&(n[t.breakpoints.up(d)]={maxWidth:`${r}${t.breakpoints.unit}`}),n},{}),({theme:t,ownerState:s})=>u({},s.maxWidth==="xs"&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},s.maxWidth&&s.maxWidth!=="xs"&&{[t.breakpoints.up(s.maxWidth)]:{maxWidth:`${t.breakpoints.values[s.maxWidth]}${t.breakpoints.unit}`}}));return f.exports.forwardRef(function(s,n){const i=o(s),{className:d,component:r="div",disableGutters:g=!1,fixed:h=!1,maxWidth:C="lg"}=i,W=R(i,_),b=u({},i,{component:r,disableGutters:g,fixed:h,maxWidth:C}),v=A(b,c);return l(p,u({as:r,ownerState:b,className:P(v.root,d),ref:n},W))})}const D=O({createStyledComponent:T("div",{name:"MuiContainer",slot:"Root",overridesResolver:(a,e)=>{const{ownerState:o}=a;return[e.root,e[`maxWidth${x(String(o.maxWidth))}`],o.fixed&&e.fixed,o.disableGutters&&e.disableGutters]}}),useThemeProps:a=>M({props:a,name:"MuiContainer"})});var Y=D;const Z=()=>l(Y,{maxWidth:"xs",children:l(j,{})}),B=f.exports.memo(Z);export{B as AuthPage};
