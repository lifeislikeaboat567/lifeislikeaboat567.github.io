import{_,a as i}from"./View-DjQ9NESW.js";import{_ as r}from"./MaterialSwitch-DoiAaANs.js";import{c as m,j as a,b as s,f as e,g as t,k as d,o as p,d as f,v as n}from"./index--Yck1YLH.js";import{s as u}from"./nav-pills-CyVEj_LU.js";import"./NavbarDefault-SCWElJqP.js";import"./_commonjsHelpers-D6-XlEtG.js";const g={class:"container py-6 mt-3"},h={class:"row flex justify-content-center"},x={class:"col-4 ms-10"},b=d(" Remember me "),w={name:"Toggle",setup(l){return(c,o)=>(a(),m("div",g,[s("div",h,[s("div",x,[e(r,{class:"d-flex align-items-center ps-6",id:"flexSwitchCheckDefault",labelClass:"ms-3 mb-0"},{default:t(()=>[b]),_:1})])])]))}},v={class:"container py-6 mt-3"},k={class:"d-flex justify-content-center align-items-center"},C=d(" Remember me "),S=s("span",{class:"ms-1 text-xs d-block"},"Be sure that you will always be logged in.",-1),y={name:"ToggleContext",setup(l){return(c,o)=>(a(),m("div",v,[s("div",k,[e(r,{class:"mb-0",id:"flexSwitchCheckDefault1",labelClass:"text-dark font-weight-bold d-block text-sm"},{description:t(()=>[S]),default:t(()=>[C]),_:1})])]))}},M=`<script setup>
//Vue Material Kit 2 components
import MaterialSwitch from "@/components/MaterialSwitch.vue";
<\/script>
<template>
  <div class="container py-6 mt-3">
    <div class="row">
      <div class="col-4 mx-auto">
        <MaterialSwitch
          class="d-flex align-items-center ps-6"
          id="flexSwitchCheckDefault"
          labelClass="ms-3 mb-0"
        >
          Remember me
        </MaterialSwitch>
      </div>
    </div>
  </div>
</template>
`,$=`<script setup>
//Vue Material Kit 2 components
import MaterialSwitch from "@/components/MaterialSwitch.vue";
<\/script>
<template>
  <div class="container py-6 mt-3">
    <div class="d-flex justify-content-center align-items-center">
      <MaterialSwitch
        class="mb-0"
        id="flexSwitchCheckDefault1"
        labelClass="text-dark font-weight-bold d-block text-sm"
      >
        Remember me

        <template #description>
          <span class="ms-1 text-xs d-block"
            >Be sure that you will always be logged in.</span
          >
        </template>
      </MaterialSwitch>
    </div>
  </div>
</template>
`,R={name:"TogglesView",setup(l){return p(()=>{u()}),(c,o)=>(a(),f(_,{title:"Toggles",breadcrumb:[{label:"Elements",route:"#"},{label:"Toggles"}]},{default:t(()=>[e(i,{title:"Toggle",code:n(M),id:"toggle"},{default:t(()=>[e(w)]),_:1},8,["code"]),e(i,{title:"Toggle Context",code:n($),id:"toggle-context"},{default:t(()=>[e(y)]),_:1},8,["code"])]),_:1}))}};export{R as default};
