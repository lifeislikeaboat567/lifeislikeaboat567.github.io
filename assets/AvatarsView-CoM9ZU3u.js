import{s as d,_ as v,a as p}from"./nav-pills-F7PRF06e.js";import{_ as s}from"./MaterialAvatar-UoMVD4hA.js";import{s as h}from"./tooltip-klgTO268.js";import{u as _}from"./index-B5F-BODS.js";import{o as g,c as n,j as l,b as a,f as t,v as e,d as f,g as i}from"./index-8q68W9hD.js";import"./NavbarDefault-C6US93t1.js";import"./_commonjsHelpers-D6-XlEtG.js";const u=""+new URL("team-1-ByJBRzpu.jpg",import.meta.url).href,b=""+new URL("team-2-gtB2cd0I.jpg",import.meta.url).href,j=""+new URL("team-3-aZnGeLwp.jpg",import.meta.url).href,o=""+new URL("team-4-COBpFmea.jpg",import.meta.url).href,A={class:"container py-6"},z={class:"row mt-5 text-center"},I={class:"col-12"},x={class:"avatar-group"},M={href:"javascript:;",class:"avatar avatar-lg","data-bs-toggle":"tooltip","data-bs-placement":"bottom",title:"Ryan Tompson"},$={href:"javascript:;",class:"avatar avatar-lg","data-bs-toggle":"tooltip","data-bs-placement":"bottom",title:"Romina Hadid"},w={href:"javascript:;",class:"avatar avatar-lg","data-bs-toggle":"tooltip","data-bs-placement":"bottom",title:"Alexander Smith"},R={href:"javascript:;",class:"avatar avatar-lg","data-bs-toggle":"tooltip","data-bs-placement":"bottom",title:"Jessica Doe"},B={name:"AvatarGroup",setup(m){const r=_();return g(()=>{h(r.bootstrap)}),(c,E)=>(l(),n("div",A,[a("div",z,[a("div",I,[a("div",x,[a("a",M,[t(s,{image:e(u),alt:"Image placeholder",size:"lg"},null,8,["image"])]),a("a",$,[t(s,{image:e(b),alt:"Image placeholder",size:"lg"},null,8,["image"])]),a("a",w,[t(s,{image:e(j),alt:"Image placeholder",size:"lg"},null,8,["image"])]),a("a",R,[t(s,{image:e(o),alt:"Image placeholder",size:"lg"},null,8,["image"])])])])])]))}},S={class:"container py-6"},y={class:"row mt-5 text-center"},L={class:"col-12"},T={href:"javascript:;"},V={href:"javascript:;"},k={href:"javascript:;"},C={href:"javascript:;"},G={href:"javascript:;"},U={href:"javascript:;"},J={name:"AvatarSize",setup(m){return(r,c)=>(l(),n("div",S,[a("div",y,[a("div",L,[a("a",T,[t(s,{image:e(o),alt:"Image placeholder",size:"xs"},null,8,["image"])]),a("a",V,[t(s,{image:e(o),alt:"Image placeholder",size:"sm"},null,8,["image"])]),a("a",k,[t(s,{image:e(o),alt:"Image placeholder",size:"md"},null,8,["image"])]),a("a",C,[t(s,{image:e(o),alt:"Image placeholder",size:"lg"},null,8,["image"])]),a("a",G,[t(s,{image:e(o),alt:"Image placeholder",size:"xl"},null,8,["image"])]),a("a",U,[t(s,{image:e(o),alt:"Image placeholder",size:"xxl"},null,8,["image"])])])])]))}},N=`<script setup>
import { onMounted } from "vue";

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";

// images
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";

// popover
import setTooltip from "@/assets/js/tooltip";

// store
import { useAppStore } from "@/stores";
const store = useAppStore();

// hook
onMounted(() => {
  setTooltip(store.bootstrap);
});
<\/script>
<template>
  <div class="container py-6">
    <div class="row mt-5 text-center">
      <div class="col-12">
        <div class="avatar-group">
          <a
            href="javascript:;"
            class="avatar avatar-lg"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Ryan Tompson"
          >
            <MaterialAvatar :image="team1" alt="Image placeholder" size="lg" />
          </a>
          <a
            href="javascript:;"
            class="avatar avatar-lg"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Romina Hadid"
          >
            <MaterialAvatar :image="team2" alt="Image placeholder" size="lg" />
          </a>
          <a
            href="javascript:;"
            class="avatar avatar-lg"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Alexander Smith"
          >
            <MaterialAvatar :image="team3" alt="Image placeholder" size="lg" />
          </a>
          <a
            href="javascript:;"
            class="avatar avatar-lg"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Jessica Doe"
          >
            <MaterialAvatar :image="team4" alt="Image placeholder" size="lg" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
`,D=`<script setup>
//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";

// image
import team4 from "@/assets/img/team-4.jpg";
<\/script>
<template>
  <div class="container py-6">
    <div class="row mt-5 text-center">
      <div class="col-12">
        <a href="javascript:;">
          <MaterialAvatar :image="team4" alt="Image placeholder" size="xs" />
        </a>
        <a href="javascript:;">
          <MaterialAvatar :image="team4" alt="Image placeholder" size="sm" />
        </a>
        <a href="javascript:;">
          <MaterialAvatar :image="team4" alt="Image placeholder" size="md" />
        </a>
        <a href="javascript:;">
          <MaterialAvatar :image="team4" alt="Image placeholder" size="lg" />
        </a>
        <a href="javascript:;">
          <MaterialAvatar :image="team4" alt="Image placeholder" size="xl" />
        </a>
        <a href="javascript:;">
          <MaterialAvatar :image="team4" alt="Image placeholder" size="xxl" />
        </a>
      </div>
    </div>
  </div>
</template>
`,Q={name:"AvatarsView",setup(m){return g(()=>{d()}),(r,c)=>(l(),f(v,{title:"Avatars",breadcrumb:[{label:"Elements",route:"#"},{label:"Avatars"}]},{default:i(()=>[t(p,{title:"Avatar Group",code:e(N),id:"avatar-group"},{default:i(()=>[t(B)]),_:1},8,["code"]),t(p,{title:"Avatar Size",code:e(D),id:"avatar-size"},{default:i(()=>[t(J)]),_:1},8,["code"])]),_:1}))}};export{Q as default};
