import{s as t,_ as o,b as r,a as s}from"./nav-pills-Bwl2hxLt.js";import{g as l,i as u,w as a,o as m,b as e,a as c,u as b}from"./index-BhD_1arq.js";import"./NavbarDefault-Ez8EQy0V.js";import"./_commonjsHelpers-D6-XlEtG.js";const i=`<script setup>
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
</template>`,d={class:"py-6 px-8 mt-2"},y={name:"BreadcrumbsView",setup(p){return l(()=>{t()}),(n,_)=>(m(),u(o,{title:"Breadcrumbs",breadcrumb:[{label:"Elements",route:"#"},{label:"Breadcrumbs"}]},{default:a(()=>[e(s,{title:"Breadcrumbs",code:b(i),id:"breadcrumbs"},{default:a(()=>[c("div",d,[e(r,{routes:[{label:"Home",route:"/"}]}),e(r,{routes:[{label:"Home",route:"/"},{label:"Library",route:"/"}]}),e(r,{routes:[{label:"Home",route:"/some-route"},{label:"Library",route:"/some-route"},{label:"Data"}]})])]),_:1},8,["code"])]),_:1}))}};export{y as default};
