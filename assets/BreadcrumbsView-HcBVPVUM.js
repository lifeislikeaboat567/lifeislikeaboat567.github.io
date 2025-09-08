import{_ as t,b as r,a as o}from"./View-DjQ9NESW.js";import{s}from"./nav-pills-CyVEj_LU.js";import{o as l,d as m,g as a,j as u,f as e,b as c,v as b}from"./index--Yck1YLH.js";import"./NavbarDefault-SCWElJqP.js";import"./_commonjsHelpers-D6-XlEtG.js";const d=`<script setup>
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
</template>`,i={class:"py-6 px-8 mt-2"},H={name:"BreadcrumbsView",setup(p){return l(()=>{s()}),(n,_)=>(u(),m(t,{title:"Breadcrumbs",breadcrumb:[{label:"Elements",route:"#"},{label:"Breadcrumbs"}]},{default:a(()=>[e(o,{title:"Breadcrumbs",code:b(d),id:"breadcrumbs"},{default:a(()=>[c("div",i,[e(r,{routes:[{label:"Home",route:"/"}]}),e(r,{routes:[{label:"Home",route:"/"},{label:"Library",route:"/"}]}),e(r,{routes:[{label:"Home",route:"/some-route"},{label:"Library",route:"/some-route"},{label:"Data"}]})])]),_:1},8,["code"])]),_:1}))}};export{H as default};
