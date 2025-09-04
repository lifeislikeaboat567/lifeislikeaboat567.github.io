import{s as _,_ as p,a as A}from"./nav-pills-tccAzppU.js";import{c,j as r,k as l,s as g,h as b,b as f,l as k,f as t,g as e,o as M,d as W,v as y}from"./index-Cx6XdWMt.js";import"./NavbarDefault-CC-TliT4.js";import"./_commonjsHelpers-D6-XlEtG.js";const $=l("   "),w={key:0,type:"button",class:"btn-close text-lg py-3 opacity-10","data-bs-dismiss":"alert","aria-label":"Close"},v=f("span",{"aria-hidden":"true",class:"text-lg font-weight-bold"},"×",-1),V=[v],o={name:"MaterialAlert",props:{color:{type:String,default:"success"},dismissible:{type:Boolean,default:!1},fontWeight:{type:String,default:""}},setup(a){function s(i,n,d){let h,u,m;return h=i&&`alert-${i}`,u=n&&"alert-dismissible fade show",m=d&&`font-weight-${d}`,`${h} ${u} ${m}`}return(i,n)=>(r(),c("div",{class:k(["alert text-white",s(a.color,a.dismissible,a.fontWeight)]),role:"alert"},[$,g(i.$slots,"default"),a.dismissible?(r(),c("button",w,V)):b("",!0)],2))}},x={class:"container py-5"},C={class:"row"},B=l("A simple success alert—check it out!"),N=l("A simple primary alert—check it out!"),S=l("A simple secondary alert—check it out!"),j=l("A simple danger alert—check it out!"),z=l("A simple warning alert—check it out!"),E=l("A simple info alert—check it out!"),K=l("A simple light alert—check it out!"),P=l("A simple dark alert—check it out!"),T={name:"SimpleAlerts",setup(a){return(s,i)=>(r(),c("div",x,[f("div",C,[t(o,{color:"success",fontWeight:"bold"},{default:e(()=>[B]),_:1}),t(o,{color:"primary",fontWeight:"bold"},{default:e(()=>[N]),_:1}),t(o,{color:"secondary",fontWeight:"bold"},{default:e(()=>[S]),_:1}),t(o,{color:"danger",fontWeight:"bold"},{default:e(()=>[j]),_:1}),t(o,{color:"warning",fontWeight:"bold"},{default:e(()=>[z]),_:1}),t(o,{color:"info",fontWeight:"bold"},{default:e(()=>[E]),_:1}),t(o,{color:"light",fontWeight:"bold"},{default:e(()=>[K]),_:1}),t(o,{color:"dark",fontWeight:"bold"},{default:e(()=>[P]),_:1})])]))}},q=`<script setup>
//Vue Material Kit 2 components
import MaterialAlert from "@/components/MaterialAlert.vue";
<\/script>
<template>
  <div class="container py-5">
    <div class="row">
      <MaterialAlert color="success" fontWeight="bold"
        >A simple success alert—check it out!</MaterialAlert
      >
      <MaterialAlert color="primary" fontWeight="bold"
        >A simple primary alert—check it out!</MaterialAlert
      >
      <MaterialAlert color="secondary" fontWeight="bold"
        >A simple secondary alert—check it out!</MaterialAlert
      >
      <MaterialAlert color="danger" fontWeight="bold"
        >A simple danger alert—check it out!</MaterialAlert
      >
      <MaterialAlert color="warning" fontWeight="bold"
        >A simple warning alert—check it out!</MaterialAlert
      >
      <MaterialAlert color="info" fontWeight="bold"
        >A simple info alert—check it out!</MaterialAlert
      >
      <MaterialAlert color="light" fontWeight="bold"
        >A simple light alert—check it out!</MaterialAlert
      >
      <MaterialAlert color="dark" fontWeight="bold"
        >A simple dark alert—check it out!</MaterialAlert
      >
    </div>
  </div>
</template>
`,I={name:"AlertsView",setup(a){return M(()=>{_()}),(s,i)=>(r(),W(p,{title:"Alerts",breadcrumb:[{label:"Attention Catchers",route:"#"},{label:"Alerts"}]},{default:e(()=>[t(A,{title:"Simple Alerts",code:y(q),id:"simple-alerts",height:"600"},{default:e(()=>[t(T)]),_:1},8,["code"])]),_:1}))}};export{I as default};
