import{g as z,q as R,s as y,b as r,_ as t,w as u,r as B,h as C,d as $,e as x,j as I,f as m}from"./index.b69d1d46.js";import{B as h}from"./Menu.ba1d111c.js";function k(o){return z("MuiIconButton",o)}const M=R("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]);var O=M;const T=["edge","children","className","color","disabled","disableFocusRipple","size"],U=o=>{const{classes:a,disabled:s,color:e,edge:i,size:l}=o,n={root:["root",s&&"disabled",e!=="default"&&`color${r(e)}`,i&&`edge${r(i)}`,`size${r(l)}`]};return x(n,k,a)},_=y(h,{name:"MuiIconButton",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:s}=o;return[a.root,s.color!=="default"&&a[`color${r(s.color)}`],s.edge&&a[`edge${r(s.edge)}`],a[`size${r(s.size)}`]]}})(({theme:o,ownerState:a})=>t({textAlign:"center",flex:"0 0 auto",fontSize:o.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(o.vars||o).palette.action.active,transition:o.transitions.create("background-color",{duration:o.transitions.duration.shortest})},!a.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${o.vars.palette.action.active} / ${o.vars.palette.action.hoverOpacity})`:u(o.palette.action.active,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},a.edge==="start"&&{marginLeft:a.size==="small"?-3:-12},a.edge==="end"&&{marginRight:a.size==="small"?-3:-12}),({theme:o,ownerState:a})=>t({},a.color==="inherit"&&{color:"inherit"},a.color!=="inherit"&&a.color!=="default"&&t({color:(o.vars||o).palette[a.color].main},!a.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${o.vars.palette[a.color].mainChannel} / ${o.vars.palette.action.hoverOpacity})`:u(o.palette[a.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}}),a.size==="small"&&{padding:5,fontSize:o.typography.pxToRem(18)},a.size==="large"&&{padding:12,fontSize:o.typography.pxToRem(28)},{[`&.${O.disabled}`]:{backgroundColor:"transparent",color:(o.vars||o).palette.action.disabled}})),j=B.exports.forwardRef(function(a,s){const e=C({props:a,name:"MuiIconButton"}),{edge:i=!1,children:l,className:n,color:g="default",disabled:c=!1,disableFocusRipple:d=!1,size:v="medium"}=e,b=$(e,T),p=t({},e,{edge:i,color:g,disabled:c,disableFocusRipple:d,size:v}),f=U(p);return I(_,t({className:m(f.root,n),centerRipple:!0,focusRipple:!d,disabled:c,ref:s,ownerState:p},b,{children:l}))});var P=j;export{P as I};
