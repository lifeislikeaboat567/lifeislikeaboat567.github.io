import{s as g,_ as f,a as v}from"./nav-pills-F7PRF06e.js";import{c as r,j as l,s as _,l as u,b as d,k as b,h as p,t as P,f as e,g as m,o as h,d as M,v as x}from"./index-8q68W9hD.js";import"./NavbarDefault-C6US93t1.js";import"./_commonjsHelpers-D6-XlEtG.js";const y={name:"MaterialPagination",props:{color:{type:String,default:"success"},size:{type:String,default:""}},setup(a){function s(t,n){let o,c;return o=t&&`pagination-${t}`,c=n&&`pagination-${n}`,`${o} ${c}`}return(t,n)=>(l(),r("ul",{class:u(["pagination",s(a.color,a.size)])},[_(t.$slots,"default")],2))}},$={class:"page-link",href:"javascript:;"},I={key:0,class:"fa fa-angle-double-left"},V={key:1,class:"fa fa-angle-double-right"},i={name:"MaterialPaginationItem",props:{label:{type:String,default:""},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},prev:{type:Boolean,default:!1},next:{type:Boolean,default:!1}},setup(a){function s(t,n){let o,c;return o=t&&"active",c=n&&"disabled",`${o} ${c}`}return(t,n)=>(l(),r("li",{class:u(["page-item",s(a.active,a.disabled)])},[d("a",$,[d("span",{"aria-hidden":"true",class:u(a.active?"text-white":"")},[b(P(a.prev||a.next?null:a.label)+" ",1),a.prev?(l(),r("i",I)):p("",!0),a.next?(l(),r("i",V)):p("",!0)],2)])],2))}},B={class:"py-5"},S={class:"container"},k={class:"row"},w={class:"col-lg-4 mx-auto"},C={name:"PaginationSimple",setup(a){return(s,t)=>(l(),r("section",B,[d("div",S,[d("div",k,[d("div",w,[e(y,{style:{marginLeft:"80px"}},{default:m(()=>[e(i,{prev:""}),e(i,{label:"1"}),e(i,{label:"2",active:""}),e(i,{label:"3"}),e(i,{label:"4"}),e(i,{label:"5"}),e(i,{next:""})]),_:1})])])])]))}},N=`<script setup>
//Vue Material Kit 2 components
import MaterialPagination from "@/components/MaterialPagination.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";
<\/script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-lg-4 mx-auto">
          <MaterialPagination>
            <MaterialPaginationItem prev class="ms-auto" />
            <MaterialPaginationItem label="1" />
            <MaterialPaginationItem label="2" active />
            <MaterialPaginationItem label="3" />
            <MaterialPaginationItem label="4" />
            <MaterialPaginationItem label="5" />
            <MaterialPaginationItem next />
          </MaterialPagination>
        </div>
      </div>
    </div>
  </section>
</template>
`,K={name:"PaginationView",setup(a){return h(()=>{g()}),(s,t)=>(l(),M(f,{title:"Pagination",breadcrumb:[{label:"Navigation",route:"#"},{label:"Pagination"}]},{default:m(()=>[e(v,{title:"Pagination Simple",code:x(N),id:"pagination-simple"},{default:m(()=>[e(C)]),_:1},8,["code"])]),_:1}))}};export{K as default};
