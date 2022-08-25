import{r as s,j as r,g as F,b as N,s as S,a as L,a3 as K,a4 as Z,_ as m,u as B,d as T,e as H,h as z,f as D,a5 as be,p as ke,q as Se,a0 as Ee,F as ye,a1 as Le,a6 as we}from"./index.5ccb38bb.js";import{c as Ae,a as Y,u as Me,F as Re,d as J,T as Q}from"./object.e0279062.js";import{h as Oe,g as P,o as I,a as A,P as se,l as Te,G as ze,p as ee,S as $e,w as Ie}from"./TextField.fb6b085a.js";import{I as Pe}from"./IconButton.63e8ee53.js";function te(e){return e.substring(2).toLowerCase()}function Fe(e,t){return t.documentElement.clientWidth<e.clientX||t.documentElement.clientHeight<e.clientY}function Ne(e){const{children:t,disableReactTree:o=!1,mouseEvent:a="onClick",onClickAway:n,touchEvent:d="onTouchEnd"}=e,C=s.exports.useRef(!1),u=s.exports.useRef(null),v=s.exports.useRef(!1),c=s.exports.useRef(!1);s.exports.useEffect(()=>(setTimeout(()=>{v.current=!0},0),()=>{v.current=!1}),[]);const x=Oe(t.ref,u),h=P(l=>{const g=c.current;c.current=!1;const p=I(u.current);if(!v.current||!u.current||"clientX"in l&&Fe(l,p))return;if(C.current){C.current=!1;return}let f;l.composedPath?f=l.composedPath().indexOf(u.current)>-1:f=!p.documentElement.contains(l.target)||u.current.contains(l.target),!f&&(o||!g)&&n(l)}),E=l=>g=>{c.current=!0;const p=t.props[l];p&&p(g)},b={ref:x};return d!==!1&&(b[d]=E(d)),s.exports.useEffect(()=>{if(d!==!1){const l=te(d),g=I(u.current),p=()=>{C.current=!0};return g.addEventListener(l,h),g.addEventListener("touchmove",p),()=>{g.removeEventListener(l,h),g.removeEventListener("touchmove",p)}}},[h,d]),a!==!1&&(b[a]=E(a)),s.exports.useEffect(()=>{if(a!==!1){const l=te(a),g=I(u.current);return g.addEventListener(l,h),()=>{g.removeEventListener(l,h)}}},[h,a]),r(s.exports.Fragment,{children:s.exports.cloneElement(t,b)})}function Be(e){return F("MuiAlert",e)}const He=N("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]);var ne=He,De=A(r("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),We=A(r("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),Ue=A(r("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),qe=A(r("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),_e=A(r("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),oe;const je=["action","children","className","closeText","color","icon","iconMapping","onClose","role","severity","variant"],Ve=e=>{const{variant:t,color:o,severity:a,classes:n}=e,d={root:["root",`${t}${L(o||a)}`,`${t}`],icon:["icon"],message:["message"],action:["action"]};return H(d,Be,n)},Ge=S(se,{name:"MuiAlert",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.variant],t[`${o.variant}${L(o.color||o.severity)}`]]}})(({theme:e,ownerState:t})=>{const o=e.palette.mode==="light"?K:Z,a=e.palette.mode==="light"?Z:K,n=t.color||t.severity;return m({},e.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},n&&t.variant==="standard"&&{color:e.vars?e.vars.palette.Alert[`${n}Color`]:o(e.palette[n].light,.6),backgroundColor:e.vars?e.vars.palette.Alert[`${n}StandardBg`]:a(e.palette[n].light,.9),[`& .${ne.icon}`]:e.vars?{color:e.vars.palette.Alert[`${n}IconColor`]}:{color:e.palette.mode==="dark"?e.palette[n].main:e.palette[n].light}},n&&t.variant==="outlined"&&{color:e.vars?e.vars.palette.Alert[`${n}Color`]:o(e.palette[n].light,.6),border:`1px solid ${(e.vars||e).palette[n].light}`,[`& .${ne.icon}`]:e.vars?{color:e.vars.palette.Alert[`${n}IconColor`]}:{color:e.palette.mode==="dark"?e.palette[n].main:e.palette[n].light}},n&&t.variant==="filled"&&m({fontWeight:e.typography.fontWeightMedium},e.vars?{color:e.vars.palette.Alert[`${n}FilledColor`],backgroundColor:e.vars.palette.Alert[`${n}FilledBg`]}:{backgroundColor:e.palette.mode==="dark"?e.palette[n].dark:e.palette[n].main,color:e.palette.getContrastText(e.palette.mode==="dark"?e.palette[n].dark:e.palette[n].main)}))}),Xe=S("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),Ke=S("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),re=S("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),ae={success:r(De,{fontSize:"inherit"}),warning:r(We,{fontSize:"inherit"}),error:r(Ue,{fontSize:"inherit"}),info:r(qe,{fontSize:"inherit"})},Ze=s.exports.forwardRef(function(t,o){const a=B({props:t,name:"MuiAlert"}),{action:n,children:d,className:C,closeText:u="Close",color:v,icon:c,iconMapping:x=ae,onClose:h,role:E="alert",severity:b="success",variant:l="standard"}=a,g=T(a,je),p=m({},a,{color:v,severity:b,variant:l}),f=Ve(p);return z(Ge,m({role:E,elevation:0,ownerState:p,className:D(f.root,C),ref:o},g,{children:[c!==!1?r(Xe,{ownerState:p,className:f.icon,children:c||x[b]||ae[b]}):null,r(Ke,{ownerState:p,className:f.message,children:d}),n!=null?r(re,{ownerState:p,className:f.action,children:n}):null,n==null&&h?r(re,{ownerState:p,className:f.action,children:r(Pe,{size:"small","aria-label":u,title:u,color:"inherit",onClick:h,children:oe||(oe=r(_e,{fontSize:"small"}))})}):null]}))});var Ye=Ze;function Je(e){return F("MuiSnackbarContent",e)}N("MuiSnackbarContent",["root","message","action"]);const Qe=["action","className","message","role"],et=e=>{const{classes:t}=e;return H({root:["root"],action:["action"],message:["message"]},Je,t)},tt=S(se,{name:"MuiSnackbarContent",slot:"Root",overridesResolver:(e,t)=>t.root})(({theme:e})=>{const t=e.palette.mode==="light"?.8:.98,o=be(e.palette.background.default,t);return m({},e.typography.body2,{color:e.vars?e.vars.palette.SnackbarContent.color:e.palette.getContrastText(o),backgroundColor:e.vars?e.vars.palette.SnackbarContent.bg:o,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:(e.vars||e).shape.borderRadius,flexGrow:1,[e.breakpoints.up("sm")]:{flexGrow:"initial",minWidth:288}})}),nt=S("div",{name:"MuiSnackbarContent",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0"}),ot=S("div",{name:"MuiSnackbarContent",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}),rt=s.exports.forwardRef(function(t,o){const a=B({props:t,name:"MuiSnackbarContent"}),{action:n,className:d,message:C,role:u="alert"}=a,v=T(a,Qe),c=a,x=et(c);return z(tt,m({role:u,square:!0,elevation:6,className:D(x.root,d),ownerState:c,ref:o},v,{children:[r(nt,{className:x.message,ownerState:c,children:C}),n?r(ot,{className:x.action,ownerState:c,children:n}):null]}))});var at=rt;function st(e){return F("MuiSnackbar",e)}N("MuiSnackbar",["root","anchorOriginTopCenter","anchorOriginBottomCenter","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft"]);const it=["onEnter","onExited"],lt=["action","anchorOrigin","autoHideDuration","children","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onBlur","onClose","onFocus","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"],ct=e=>{const{classes:t,anchorOrigin:o}=e,a={root:["root",`anchorOrigin${L(o.vertical)}${L(o.horizontal)}`]};return H(a,st,t)},dt=S("div",{name:"MuiSnackbar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[`anchorOrigin${L(o.anchorOrigin.vertical)}${L(o.anchorOrigin.horizontal)}`]]}})(({theme:e,ownerState:t})=>{const o={left:"50%",right:"auto",transform:"translateX(-50%)"};return m({zIndex:(e.vars||e).zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},t.anchorOrigin.vertical==="top"?{top:8}:{bottom:8},t.anchorOrigin.horizontal==="left"&&{justifyContent:"flex-start"},t.anchorOrigin.horizontal==="right"&&{justifyContent:"flex-end"},{[e.breakpoints.up("sm")]:m({},t.anchorOrigin.vertical==="top"?{top:24}:{bottom:24},t.anchorOrigin.horizontal==="center"&&o,t.anchorOrigin.horizontal==="left"&&{left:24,right:"auto"},t.anchorOrigin.horizontal==="right"&&{right:24,left:"auto"})})}),ut=s.exports.forwardRef(function(t,o){const a=B({props:t,name:"MuiSnackbar"}),n=Te(),d={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{action:C,anchorOrigin:{vertical:u,horizontal:v}={vertical:"bottom",horizontal:"left"},autoHideDuration:c=null,children:x,className:h,ClickAwayListenerProps:E,ContentProps:b,disableWindowBlurListener:l=!1,message:g,onBlur:p,onClose:f,onFocus:W,onMouseEnter:U,onMouseLeave:q,open:k,resumeHideDuration:$,TransitionComponent:ie=ze,transitionDuration:le=d,TransitionProps:{onEnter:_,onExited:j}={}}=a,ce=T(a.TransitionProps,it),de=T(a,lt),V=m({},a,{anchorOrigin:{vertical:u,horizontal:v}}),ue=ct(V),M=s.exports.useRef(),[G,X]=s.exports.useState(!0),pe=P((...i)=>{f&&f(...i)}),R=P(i=>{!f||i==null||(clearTimeout(M.current),M.current=setTimeout(()=>{pe(null,"timeout")},i))});s.exports.useEffect(()=>(k&&R(c),()=>{clearTimeout(M.current)}),[k,c,R]);const O=()=>{clearTimeout(M.current)},w=s.exports.useCallback(()=>{c!=null&&R($??c*.5)},[c,$,R]),fe=i=>{W&&W(i),O()},ge=i=>{U&&U(i),O()},me=i=>{p&&p(i),w()},ve=i=>{q&&q(i),w()},he=i=>{f&&f(i,"clickaway")},Ce=i=>{X(!0),j&&j(i)},xe=(i,y)=>{X(!1),_&&_(i,y)};return s.exports.useEffect(()=>{if(!l&&k)return window.addEventListener("focus",w),window.addEventListener("blur",O),()=>{window.removeEventListener("focus",w),window.removeEventListener("blur",O)}},[l,w,k]),s.exports.useEffect(()=>{if(!k)return;function i(y){y.defaultPrevented||(y.key==="Escape"||y.key==="Esc")&&f&&f(y,"escapeKeyDown")}return document.addEventListener("keydown",i),()=>{document.removeEventListener("keydown",i)}},[G,k,f]),!k&&G?null:r(Ne,m({onClickAway:he},E,{children:r(dt,m({className:D(ue.root,h),onBlur:me,onFocus:fe,onMouseEnter:ge,onMouseLeave:ve,ownerState:V,ref:o,role:"presentation"},de,{children:r(ie,m({appear:!0,in:k,timeout:le,direction:u==="top"?"down":"up",onEnter:xe,onExited:Ce},ce,{children:x||r(at,m({message:g,action:C},b))}))}))}))});var pt=ut;const ft=Ae({email:Y().email("Enter valid email").required("Email is required"),password:Y().required("Password is required")}),gt={email:"",password:""},mt=()=>{const[e,t]=s.exports.useState(!1),[o,a]=s.exports.useState(null),n=ke(),d=Se(Ee),u=Me({initialValues:gt,validationSchema:ft,onSubmit:async c=>{t(!0),await n(we(c)),t(!1)}});s.exports.useEffect(()=>{d&&a(d.detail)},[d]);const v=()=>{a(null)};return z(ye,{children:[r(ee,{component:"h1",variant:"h2",children:"Login"}),r(Re,{value:u,children:r("form",{onSubmit:u.handleSubmit,children:z($e,{spacing:2,children:[r(J,{required:!0,autoComplete:"email",component:Q,name:"email",type:"email",label:"Email"}),r(J,{required:!0,autoComplete:"current-password",component:Q,name:"password",type:"password",label:"Password"}),r(Ie,{fullWidth:!0,disabled:e,type:"submit",variant:"contained",children:"Login"})]})})}),r(ee,{variant:"button",component:"span",children:r(Le,{to:"../register",children:"Register"})}),r(pt,{open:o!==null,autoHideDuration:3e3,onClose:v,children:r(Ye,{severity:"error",children:o})})]})},bt=s.exports.memo(mt);export{bt as LoginForm};
