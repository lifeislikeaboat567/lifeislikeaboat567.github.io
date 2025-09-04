import{s as t,_ as o,b as r,a as s}from"./nav-pills-DPduXdNf.js";import{o as l,d as m,g as a,j as u,f as e,b as c,v as b}from"./index-CpWonS-h.js";import"./NavbarDefault-D8DYGad8.js";import"./_commonjsHelpers-D6-XlEtG.js";const d=`<script setup>
// example component
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
<\/script>
<template>
<div class="container py-6 mt-2">
<div class="row px-8 ">
  <Breadcrumbs :routes="[{ label: 'Home', route: '/' }]" />

  <Breadcrumbs
    :routes="[
      { label: 'Home', route: '/' },
      { label: 'Library', route: '/' },
    ]"
  />
  <Breadcrumbs
    :routes="[
      { label: 'Home', route: '/some-route' },
      { label: 'Library', route: '/some-route' },
      { label: 'Data' },
    ]"
  />
</div>
</div>
</template>`,i={class:"py-6 px-8 mt-2"},y={name:"BreadcrumbsView",setup(p){return l(()=>{t()}),(n,_)=>(u(),m(o,{title:"Breadcrumbs",breadcrumb:[{label:"Elements",route:"#"},{label:"Breadcrumbs"}]},{default:a(()=>[e(s,{title:"Breadcrumbs",code:b(d),id:"breadcrumbs"},{default:a(()=>[c("div",i,[e(r,{routes:[{label:"Home",route:"/"}]}),e(r,{routes:[{label:"Home",route:"/"},{label:"Library",route:"/"}]}),e(r,{routes:[{label:"Home",route:"/some-route"},{label:"Library",route:"/some-route"},{label:"Data"}]})])]),_:1},8,["code"])]),_:1}))}};export{y as default};
