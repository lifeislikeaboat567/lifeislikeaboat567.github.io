import{s as g,_ as f,a as v}from"./nav-pills-Bwl2hxLt.js";import{c as r,o as l,r as _,f as d,a as u,k as b,d as p,t as P,b as e,w as m,g as M,i as h,u as x}from"./index-BhD_1arq.js";import"./NavbarDefault-Ez8EQy0V.js";import"./_commonjsHelpers-D6-XlEtG.js";const y={name:"MaterialPagination",props:{color:{type:String,default:"success"},size:{type:String,default:""}},setup(a){function s(t,n){let o,c;return o=t&&`pagination-${t}`,c=n&&`pagination-${n}`,`${o} ${c}`}return(t,n)=>(l(),r("ul",{class:d(["pagination",s(a.color,a.size)])},[_(t.$slots,"default")],2))}},$={class:"page-link",href:"javascript:;"},I={key:0,class:"fa fa-angle-double-left"},V={key:1,class:"fa fa-angle-double-right"},i={name:"MaterialPaginationItem",props:{label:{type:String,default:""},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},prev:{type:Boolean,default:!1},next:{type:Boolean,default:!1}},setup(a){function s(t,n){let o,c;return o=t&&"active",c=n&&"disabled",`${o} ${c}`}return(t,n)=>(l(),r("li",{class:d(["page-item",s(a.active,a.disabled)])},[u("a",$,[u("span",{"aria-hidden":"true",class:d(a.active?"text-white":"")},[b(P(a.prev||a.next?null:a.label)+" ",1),a.prev?(l(),r("i",I)):p("",!0),a.next?(l(),r("i",V)):p("",!0)],2)])],2))}},B={class:"py-5"},S={class:"container"},k={class:"row"},w={class:"col-lg-4 mx-auto"},C={name:"PaginationSimple",setup(a){return(s,t)=>(l(),r("section",B,[u("div",S,[u("div",k,[u("div",w,[e(y,{style:{marginLeft:"80px"}},{default:m(()=>[e(i,{prev:""}),e(i,{label:"1"}),e(i,{label:"2",active:""}),e(i,{label:"3"}),e(i,{label:"4"}),e(i,{label:"5"}),e(i,{next:""})]),_:1})])])])]))}},N=`<script setup>
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
`,K={name:"PaginationView",setup(a){return M(()=>{g()}),(s,t)=>(l(),h(f,{title:"Pagination",breadcrumb:[{label:"Navigation",route:"#"},{label:"Pagination"}]},{default:m(()=>[e(v,{title:"Pagination Simple",code:x(N),id:"pagination-simple"},{default:m(()=>[e(C)]),_:1},8,["code"])]),_:1}))}};export{K as default};
