import{s as n,_ as v,a as p}from"./nav-pills-Bh4fURNE.js";import{_ as s}from"./MaterialAvatar-lMUaIlHZ.js";import{s as h}from"./tooltip-klgTO268.js";import{u as _}from"./index-BXJwZCfO.js";import{o as g,c as d,j as i,b as a,f as t,v as e,d as f,g as l}from"./index-BbVUABXR.js";import"./NavbarDefault-C8RBHO4O.js";import"./_commonjsHelpers-D6-XlEtG.js";const u="/lab_homepage/assets/team-1-ByJBRzpu.jpg",b="/lab_homepage/assets/team-2-gtB2cd0I.jpg",j="/lab_homepage/assets/team-3-aZnGeLwp.jpg",o="/lab_homepage/assets/team-4-COBpFmea.jpg",A={class:"container py-6"},z={class:"row mt-5 text-center"},I={class:"col-12"},x={class:"avatar-group"},M={href:"javascript:;",class:"avatar avatar-lg","data-bs-toggle":"tooltip","data-bs-placement":"bottom",title:"Ryan Tompson"},$={href:"javascript:;",class:"avatar avatar-lg","data-bs-toggle":"tooltip","data-bs-placement":"bottom",title:"Romina Hadid"},B={href:"javascript:;",class:"avatar avatar-lg","data-bs-toggle":"tooltip","data-bs-placement":"bottom",title:"Alexander Smith"},S={href:"javascript:;",class:"avatar avatar-lg","data-bs-toggle":"tooltip","data-bs-placement":"bottom",title:"Jessica Doe"},w={name:"AvatarGroup",setup(m){const r=_();return g(()=>{h(r.bootstrap)}),(c,K)=>(i(),d("div",A,[a("div",z,[a("div",I,[a("div",x,[a("a",M,[t(s,{image:e(u),alt:"Image placeholder",size:"lg"},null,8,["image"])]),a("a",$,[t(s,{image:e(b),alt:"Image placeholder",size:"lg"},null,8,["image"])]),a("a",B,[t(s,{image:e(j),alt:"Image placeholder",size:"lg"},null,8,["image"])]),a("a",S,[t(s,{image:e(o),alt:"Image placeholder",size:"lg"},null,8,["image"])])])])])]))}},y={class:"container py-6"},R={class:"row mt-5 text-center"},T={class:"col-12"},V={href:"javascript:;"},k={href:"javascript:;"},C={href:"javascript:;"},G={href:"javascript:;"},J={href:"javascript:;"},N={href:"javascript:;"},D={name:"AvatarSize",setup(m){return(r,c)=>(i(),d("div",y,[a("div",R,[a("div",T,[a("a",V,[t(s,{image:e(o),alt:"Image placeholder",size:"xs"},null,8,["image"])]),a("a",k,[t(s,{image:e(o),alt:"Image placeholder",size:"sm"},null,8,["image"])]),a("a",C,[t(s,{image:e(o),alt:"Image placeholder",size:"md"},null,8,["image"])]),a("a",G,[t(s,{image:e(o),alt:"Image placeholder",size:"lg"},null,8,["image"])]),a("a",J,[t(s,{image:e(o),alt:"Image placeholder",size:"xl"},null,8,["image"])]),a("a",N,[t(s,{image:e(o),alt:"Image placeholder",size:"xxl"},null,8,["image"])])])])]))}},E=`<script setup>
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
`,H=`<script setup>
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
`,U={name:"AvatarsView",setup(m){return g(()=>{n()}),(r,c)=>(i(),f(v,{title:"Avatars",breadcrumb:[{label:"Elements",route:"#"},{label:"Avatars"}]},{default:l(()=>[t(p,{title:"Avatar Group",code:e(E),id:"avatar-group"},{default:l(()=>[t(w)]),_:1},8,["code"]),t(p,{title:"Avatar Size",code:e(H),id:"avatar-size"},{default:l(()=>[t(D)]),_:1},8,["code"])]),_:1}))}};export{U as default};
