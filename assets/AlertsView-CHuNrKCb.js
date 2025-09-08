import{_ as s,a as n}from"./View-DjQ9NESW.js";import{_ as o}from"./MaterialAlert-C33OHgys.js";import{c as d,j as r,b as h,f as t,g as e,k as l,o as _,d as m,v as p}from"./index--Yck1YLH.js";import{s as u}from"./nav-pills-CyVEj_LU.js";import"./NavbarDefault-SCWElJqP.js";import"./_commonjsHelpers-D6-XlEtG.js";const f={class:"container py-5"},A={class:"row"},g=l("A simple success alert—check it out!"),k=l("A simple primary alert—check it out!"),b=l("A simple secondary alert—check it out!"),M=l("A simple danger alert—check it out!"),W=l("A simple warning alert—check it out!"),y=l("A simple info alert—check it out!"),v=l("A simple light alert—check it out!"),w=l("A simple dark alert—check it out!"),x={name:"SimpleAlerts",setup(a){return(i,c)=>(r(),d("div",f,[h("div",A,[t(o,{color:"success",fontWeight:"bold"},{default:e(()=>[g]),_:1}),t(o,{color:"primary",fontWeight:"bold"},{default:e(()=>[k]),_:1}),t(o,{color:"secondary",fontWeight:"bold"},{default:e(()=>[b]),_:1}),t(o,{color:"danger",fontWeight:"bold"},{default:e(()=>[M]),_:1}),t(o,{color:"warning",fontWeight:"bold"},{default:e(()=>[W]),_:1}),t(o,{color:"info",fontWeight:"bold"},{default:e(()=>[y]),_:1}),t(o,{color:"light",fontWeight:"bold"},{default:e(()=>[v]),_:1}),t(o,{color:"dark",fontWeight:"bold"},{default:e(()=>[w]),_:1})])]))}},V=`<script setup>
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
`,E={name:"AlertsView",setup(a){return _(()=>{u()}),(i,c)=>(r(),m(s,{title:"Alerts",breadcrumb:[{label:"Attention Catchers",route:"#"},{label:"Alerts"}]},{default:e(()=>[t(n,{title:"Simple Alerts",code:p(V),id:"simple-alerts",height:"600"},{default:e(()=>[t(x)]),_:1},8,["code"])]),_:1}))}};export{E as default};
