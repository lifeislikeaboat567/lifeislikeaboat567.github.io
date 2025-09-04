import{s as u,_ as d,a as n}from"./nav-pills-F7PRF06e.js";import{_ as p}from"./MaterialInput-B6D3t2ZS.js";import{c as r,j as c,b as e,f as t,o as _,z as m,d as v,g as s,v as l}from"./index-8q68W9hD.js";import"./NavbarDefault-C6US93t1.js";import"./_commonjsHelpers-D6-XlEtG.js";const y={class:"py-7"},h={class:"container"},f={class:"row justify-space-between py-2"},b={class:"col-lg-4 mx-auto"},x={name:"InputStatic",setup(a){return(i,o)=>(c(),r("section",y,[e("div",h,[e("div",f,[e("div",b,[t(p,{class:"input-group-static mb-4",label:"First Name",type:"text",placeholder:"eg. Thomas Shelby"})])])])]))}},I={class:"py-7"},$={class:"container"},w={class:"row justify-space-between py-2"},M={class:"col-lg-4 mx-auto"},g={name:"InputDynamic",setup(a){return(i,o)=>(c(),r("section",I,[e("div",$,[e("div",w,[e("div",M,[t(p,{class:"input-group-dynamic",label:{text:"Regular",class:"form-label"},type:"text"})])])])]))}},j={class:"py-7"},S={class:"container"},V={class:"row justify-space-between py-2"},C={class:"col-lg-4 mx-auto"},D={name:"InputOutlined",setup(a){return(i,o)=>(c(),r("section",j,[e("div",S,[e("div",V,[e("div",C,[t(p,{class:"input-group-outline mb-4",label:{text:"Outline",class:"form-label"},type:"text"})])])])]))}},K={class:"py-7"},N={class:"container"},E={class:"row justify-space-between py-2"},B={class:"col-lg-4 mx-auto"},O={name:"InputIcon",setup(a){return(i,o)=>(c(),r("section",K,[e("div",N,[e("div",E,[e("div",B,[t(p,{class:"input-group-dynamic mb-4",icon:"search",type:"text",placeholder:"Search"})])])])]))}},k={class:"py-7"},F={class:"container"},T={class:"row justify-space-between py-2"},R={class:"col-lg-4 mx-auto"},z={name:"InputSuccess",setup(a){return(i,o)=>(c(),r("section",k,[e("div",F,[e("div",T,[e("div",R,[t(p,{type:"text",placeholder:"Success",success:""})])])])]))}},A={class:"py-7"},P={class:"container"},q={class:"row justify-space-between py-2"},G={class:"col-lg-4 mx-auto"},H={name:"InputError",setup(a){return(i,o)=>(c(),r("section",A,[e("div",P,[e("div",q,[e("div",G,[t(p,{type:"text",placeholder:"Error",error:""})])])])]))}},J={class:"py-7"},L={class:"container"},Q={class:"row justify-space-between py-2"},U={class:"col-lg-4 mx-auto"},W={name:"InputDisabled",setup(a){return(i,o)=>(c(),r("section",J,[e("div",L,[e("div",Q,[e("div",U,[t(p,{type:"text",placeholder:"Disabled",isDisabled:""})])])])]))}},X=`<script setup>
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
<\/script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-lg-4 mx-auto">
          <MaterialInput
            class="input-group-static mb-4"
            label="First Name"
            type="text"
            placeholder="eg. Thomas Shelby"
          />
        </div>
      </div>
    </div>
  </section>
</template>
`,Y=`<script setup>
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
<\/script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-lg-4 mx-auto">
          <MaterialInput
            class="input-group-dynamic"
            :label="{ text: 'Regular', class: 'form-label' }"
            type="text"
          />
        </div>
      </div>
    </div>
  </section>
</template>
`,Z=`<script setup>
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
<\/script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-lg-4 mx-auto">
          <MaterialInput
            class="input-group-outline mb-4"
            :label="{ text: 'Outline', class: 'form-label' }"
            type="text"
          />
        </div>
      </div>
    </div>
  </section>
</template>
`,tt=`<script setup>
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
<\/script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-lg-4 mx-auto">
          <MaterialInput
            class="input-group-dynamic mb-4"
            icon="search"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  </section>
</template>
`,et=`<script setup>
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
<\/script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-lg-4 mx-auto">
          <MaterialInput
            class="input-group-static mb-4"
            label="First Name"
            type="text"
            placeholder="eg. Thomas Shelby"
          />
        </div>
      </div>
    </div>
  </section>
</template>
`,st=`<script setup>
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
<\/script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-lg-4 mx-auto">
          <MaterialInput type="text" placeholder="Error" error />
        </div>
      </div>
    </div>
  </section>
</template>
`,ct=`<script setup>
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
<\/script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-lg-4 mx-auto">
          <MaterialInput type="text" placeholder="Disabled" isDisabled />
        </div>
      </div>
    </div>
  </section>
</template>
`,pt={name:"InputsView",setup(a){return _(()=>{u(),m()}),(i,o)=>(c(),v(d,{title:"Inputs",breadcrumb:[{label:"Input Areas",route:"#"},{label:"Inputs"}]},{default:s(()=>[t(n,{title:"Input dynamic",code:l(Y),id:"input-dynamic"},{default:s(()=>[t(g)]),_:1},8,["code"]),t(n,{title:"Input static",code:l(X),id:"input-static"},{default:s(()=>[t(x)]),_:1},8,["code"]),t(n,{title:"Input outline",code:l(Z),id:"input-outlined"},{default:s(()=>[t(D)]),_:1},8,["code"]),t(n,{title:"Input with icon",code:l(tt),id:"input-with-icon"},{default:s(()=>[t(O)]),_:1},8,["code"]),t(n,{title:"Input success",code:l(et),id:"input-success"},{default:s(()=>[t(z)]),_:1},8,["code"]),t(n,{title:"Input error",code:l(st),id:"input-error"},{default:s(()=>[t(H)]),_:1},8,["code"]),t(n,{title:"Input disabled",code:l(ct),id:"input-disabled"},{default:s(()=>[t(W)]),_:1},8,["code"])]),_:1}))}};export{pt as default};
