import{_ as o,a as r}from"./View-DjQ9NESW.js";import{_ as c}from"./NavbarDefault-SCWElJqP.js";import{c as n,j as l,b as a,o as p,d,g as s,f as e,v}from"./index--Yck1YLH.js";import{s as b}from"./nav-pills-CyVEj_LU.js";import"./_commonjsHelpers-D6-XlEtG.js";const m={},f={class:"py-7"},_=a("div",{class:"container"},[a("div",{class:"row"},[a("div",{class:"col-lg-4 mx-auto"},[a("div",{class:"nav-wrapper position-relative end-0"},[a("ul",{class:"nav nav-pills nav-fill p-1",role:"tablist"},[a("li",{class:"nav-item"},[a("a",{class:"nav-link mb-0 px-0 py-1 active","data-bs-toggle":"tab",href:"#profile-tabs-simple",role:"tab","aria-controls":"profile","aria-selected":"true"}," My Profile ")]),a("li",{class:"nav-item"},[a("a",{class:"nav-link mb-0 px-0 py-1","data-bs-toggle":"tab",href:"#dashboard-tabs-simple",role:"tab","aria-controls":"dashboard","aria-selected":"false"}," Dashboard ")])])])])])],-1),u=[_];function h(t,i){return l(),n("section",f,u)}const g=c(m,[["render",h]]),x=`<script setup>
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
`,P={name:"NavTabsView",setup(t){return p(()=>{b()}),(i,N)=>(l(),d(o,{title:"Nav Tabs",breadcrumb:[{label:"Navigation",route:"#"},{label:"Nav Tabs"}]},{default:s(()=>[e(r,{title:"Tabs Simple",code:v(x),id:"tabs-simple"},{default:s(()=>[e(g)]),_:1},8,["code"])]),_:1}))}};export{P as default};
