import{s as d,_ as m,a as p}from"./nav-pills-Bwl2hxLt.js";import{c as u,o as i,a as t,n as g,f as v,b as s,g as _,i as b,w as n,u as f}from"./index-BhD_1arq.js";import"./NavbarDefault-Ez8EQy0V.js";import"./_commonjsHelpers-D6-XlEtG.js";const y={class:"progress"},P=["aria-valuenow"],a={name:"MaterialProgress",props:{variant:{type:String,validator:e=>["contained","gradient"].includes(e),default:"contained"},color:{type:String,validator(e){return["primary","secondary","info","success","warning","danger","error","light","dark"].includes(e)},default:"success"},value:{type:Number,required:!0}},setup(e){const c=(r,o)=>{let l;return o==="gradient"?l=`bg-gradient-${r}`:o==="contained"?l=`bg-${r}`:o==="striped"&&(l=`progress-bar-striped bg-${r}`),l};return(r,o)=>(i(),u("div",y,[t("div",{class:v(["progress-bar",c(e.color,e.variant)]),role:"progressbar",style:g({width:`${e.value}%`}),"aria-valuenow":e.value,"aria-valuemin":"0","aria-valuemax":"100"},null,14,P)]))}},w={class:"py-6 mt-4"},h={class:"container"},M={class:"row justify-space-between py-2"},$={class:"col-lg-6 mx-auto"},x={name:"ProgressSimple",setup(e){return(c,r)=>(i(),u("section",w,[t("div",h,[t("div",M,[t("div",$,[s(a,{class:"mb-3",color:"primary",value:50}),s(a,{class:"mb-3",color:"secondary",value:50}),s(a,{class:"mb-3",color:"success",value:50}),s(a,{class:"mb-3",color:"info",value:50}),s(a,{class:"mb-3",color:"warning",value:50}),s(a,{class:"mb-3",color:"danger",value:50}),s(a,{class:"mb-3",color:"dark",value:50})])])])]))}},B=`<script setup>
//Vue Material Kit 2 components
import MaterialProgress from "@/components/MaterialProgress.vue";
<\/script>
<template>
  <section class="py-6 mt-4">
    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-lg-6 mx-auto">
          <MaterialProgress class="mb-3" color="primary" :value="50" />
          <MaterialProgress class="mb-3" color="secondary" :value="50" />
          <MaterialProgress class="mb-3" color="success" :value="50" />
          <MaterialProgress class="mb-3" color="info" :value="50" />
          <MaterialProgress class="mb-3" color="warning" :value="50" />
          <MaterialProgress class="mb-3" color="danger" :value="50" />
          <MaterialProgress class="mb-3" color="dark" :value="50" />
        </div>
      </div>
    </div>
  </section>
</template>
`,N={name:"ProgressBarsView",setup(e){return _(()=>{d()}),(c,r)=>(i(),b(m,{title:"Progress Bars",breadcrumb:[{label:"Elements",route:"#"},{label:"Progress Bars"}]},{default:n(()=>[s(p,{title:"Progress Bars Simple",code:f(B),id:"progress-simple"},{default:n(()=>[s(x)]),_:1},8,["code"])]),_:1}))}};export{N as default};
