import{s as o,_ as r,a as c}from"./nav-pills-Nv_H9Yof.js";import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,j as l,b as a,o as d,d as v,g as s,f as e,v as b}from"./index-xTUJoJ3k.js";import"./NavbarDefault-DALxNKP2.js";import"./_commonjsHelpers-D6-XlEtG.js";const m={},f={class:"py-7"},_=a("div",{class:"container"},[a("div",{class:"row"},[a("div",{class:"col-lg-4 mx-auto"},[a("div",{class:"nav-wrapper position-relative end-0"},[a("ul",{class:"nav nav-pills nav-fill p-1",role:"tablist"},[a("li",{class:"nav-item"},[a("a",{class:"nav-link mb-0 px-0 py-1 active","data-bs-toggle":"tab",href:"#profile-tabs-simple",role:"tab","aria-controls":"profile","aria-selected":"true"}," My Profile ")]),a("li",{class:"nav-item"},[a("a",{class:"nav-link mb-0 px-0 py-1","data-bs-toggle":"tab",href:"#dashboard-tabs-simple",role:"tab","aria-controls":"dashboard","aria-selected":"false"}," Dashboard ")])])])])])],-1),u=[_];function h(t,i){return l(),p("section",f,u)}const g=n(m,[["render",h]]),x=`<script setup>
import { onMounted } from "vue";

// nav-pill
import setNavPills from "@/assets/js/nav-pills.js";

onMounted(() => {
  setNavPills();
});
<\/script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 mx-auto">
          <div class="nav-wrapper position-relative end-0">
            <ul class="nav nav-pills nav-fill p-1" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link mb-0 px-0 py-1 active"
                  data-bs-toggle="tab"
                  href="#profile-tabs-simple"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="true"
                >
                  My Profile
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link mb-0 px-0 py-1"
                  data-bs-toggle="tab"
                  href="#dashboard-tabs-simple"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
`,P={name:"NavTabsView",setup(t){return d(()=>{o()}),(i,N)=>(l(),v(r,{title:"Nav Tabs",breadcrumb:[{label:"Navigation",route:"#"},{label:"Nav Tabs"}]},{default:s(()=>[e(c,{title:"Tabs Simple",code:b(x),id:"tabs-simple"},{default:s(()=>[e(g)]),_:1},8,["code"])]),_:1}))}};export{P as default};
