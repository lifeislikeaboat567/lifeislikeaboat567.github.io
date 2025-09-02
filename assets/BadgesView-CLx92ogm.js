import{s as M,_ as h,a as _}from"./nav-pills-Bwl2hxLt.js";import{c as l,o as c,r as y,f as v,a as o,b as a,w as e,k as r,g as $,i as x,u}from"./index-BhD_1arq.js";import"./NavbarDefault-Ez8EQy0V.js";import"./_commonjsHelpers-D6-XlEtG.js";const t={name:"MaterialBadge",props:{size:{type:String,validator(s){return["sm","md","lg"].includes(s)},default:"md"},color:{validator(s){return["primary","secondary","info","success","warning","error","danger","light","dark","white"].includes(s)},default:"success"},variant:{type:String,validator(s){return["fill","gradient"].includes(s)},default:"fill"},rounded:{type:Boolean,default:!1}},setup(s){function i(d,n,m,B){let g,p,f;return d==="gradient"?g=`bg-gradient-${n}`:g=`badge-${n} bg-${n}`,p=m&&`badge-${m}`,f=B&&"rounded-pill",`${g} ${p} ${f}`}return(d,n)=>(c(),l("span",{class:v(["badge",i(s.variant,s.color,s.size,s.rounded)])},[y(d.$slots,"default")],2))}},b={class:"py-7 m-3 bg-gray-100"},k={class:"container"},w={class:"row justify-space-between text-center py-2"},S={class:"col-12"},D=r(" Primary "),V=r(" Secondary "),P=r(" Success "),j=r(" Danger "),C=r(" Warning "),I=r(" Info "),L=r(" Light "),W=r(" Dark "),N={name:"BadgesGradient",setup(s){return(i,d)=>(c(),l("section",b,[o("div",k,[o("div",w,[o("div",S,[a(t,{variant:"gradient",color:"primary"},{default:e(()=>[D]),_:1}),a(t,{variant:"gradient",color:"secondary",class:"mx-1"},{default:e(()=>[V]),_:1}),a(t,{variant:"gradient",color:"success"},{default:e(()=>[P]),_:1}),a(t,{variant:"gradient",color:"danger",class:"mx-1"},{default:e(()=>[j]),_:1}),a(t,{variant:"gradient",color:"warning"},{default:e(()=>[C]),_:1}),a(t,{variant:"gradient",color:"info",class:"mx-1"},{default:e(()=>[I]),_:1}),a(t,{variant:"gradient",color:"light",class:"text-dark"},{default:e(()=>[L]),_:1}),a(t,{variant:"gradient",color:"dark",class:"ms-1"},{default:e(()=>[W]),_:1})])])])]))}},z={class:"py-7 m-3 bg-gray-100"},G={class:"container"},K={class:"row justify-space-between text-center py-2"},R={class:"col-12"},E=r(" Primary "),T=r(" Secondary "),q=r(" Success "),A=r(" Danger "),F=r(" Warning "),H=r(" Info "),J=r(" Light "),O=r(" Dark "),Q={name:"BadgesSimple",setup(s){return(i,d)=>(c(),l("section",z,[o("div",G,[o("div",K,[o("div",R,[a(t,{color:"primary"},{default:e(()=>[E]),_:1}),a(t,{color:"secondary",class:"mx-1"},{default:e(()=>[T]),_:1}),a(t,{color:"success"},{default:e(()=>[q]),_:1}),a(t,{color:"danger",class:"mx-1"},{default:e(()=>[A]),_:1}),a(t,{color:"warning"},{default:e(()=>[F]),_:1}),a(t,{color:"info",class:"mx-1"},{default:e(()=>[H]),_:1}),a(t,{color:"light",class:"text-dark"},{default:e(()=>[J]),_:1}),a(t,{color:"dark",class:"ms-1"},{default:e(()=>[O]),_:1})])])])]))}},U={class:"py-7 m-3 bg-gray-100"},X={class:"container"},Y={class:"row justify-space-between text-center py-2"},Z={class:"col-12"},aa=r(" Primary "),ea=r(" Secondary "),ta=r(" Success "),ra=r(" Danger "),sa=r(" Warning "),oa=r(" Info "),da=r(" Light "),ia=r(" Dark "),ca={name:"BadgesSimpleRounded",setup(s){return(i,d)=>(c(),l("section",U,[o("div",X,[o("div",Y,[o("div",Z,[a(t,{color:"primary",rounded:""},{default:e(()=>[aa]),_:1}),a(t,{color:"secondary",rounded:"",class:"mx-1"},{default:e(()=>[ea]),_:1}),a(t,{color:"success",rounded:""},{default:e(()=>[ta]),_:1}),a(t,{color:"danger",rounded:"",class:"mx-1"},{default:e(()=>[ra]),_:1}),a(t,{color:"warning",rounded:""},{default:e(()=>[sa]),_:1}),a(t,{color:"info",rounded:"",class:"mx-1"},{default:e(()=>[oa]),_:1}),a(t,{color:"light",rounded:"",class:"text-dark"},{default:e(()=>[da]),_:1}),a(t,{color:"dark",rounded:"",class:"ms-1"},{default:e(()=>[ia]),_:1})])])])]))}},na=`<script setup>
//Vue Material Kit 2 components
import MaterialBadge from "@/components/MaterialBadge.vue";
<\/script>
<template>
  <section class="py-7 m-3 bg-gray-100">
    <div class="container">
      <div class="row justify-space-between text-center py-2">
        <div class="col-12">
          <MaterialBadge variant="gradient" color="primary">
            Primary
          </MaterialBadge>

          <MaterialBadge variant="gradient" color="secondary" class="mx-1">
            Secondary
          </MaterialBadge>

          <MaterialBadge variant="gradient" color="success">
            Success
          </MaterialBadge>

          <MaterialBadge variant="gradient" color="danger" class="mx-1">
            Danger
          </MaterialBadge>

          <MaterialBadge variant="gradient" color="warning">
            Warning
          </MaterialBadge>

          <MaterialBadge variant="gradient" color="info" class="mx-1">
            Info
          </MaterialBadge>

          <MaterialBadge variant="gradient" color="light" class="text-dark">
            Light
          </MaterialBadge>

          <MaterialBadge variant="gradient" color="dark" class="ms-1">
            Dark
          </MaterialBadge>
        </div>
      </div>
    </div>
  </section>
</template>
`,la=`<script setup>
//Vue Material Kit 2 components
import MaterialBadge from "@/components/MaterialBadge.vue";
<\/script>
<template>
  <section class="py-7 m-3 bg-gray-100">
    <div class="container">
      <div class="row justify-space-between text-center py-2">
        <div class="col-12">
          <MaterialBadge color="primary"> Primary </MaterialBadge>

          <MaterialBadge color="secondary" class="mx-1">
            Secondary
          </MaterialBadge>

          <MaterialBadge color="success"> Success </MaterialBadge>

          <MaterialBadge color="danger" class="mx-1"> Danger </MaterialBadge>

          <MaterialBadge color="warning"> Warning </MaterialBadge>

          <MaterialBadge color="info" class="mx-1"> Info </MaterialBadge>

          <MaterialBadge color="light" class="text-dark"> Light </MaterialBadge>

          <MaterialBadge color="dark" class="ms-1"> Dark </MaterialBadge>
        </div>
      </div>
    </div>
  </section>
</template>
`,ga=`<script setup>
//Vue Material Kit 2 components
import MaterialBadge from "@/components/MaterialBadge.vue";
<\/script>
<template>
  <section class="py-7 m-3 bg-gray-100">
    <div class="container">
      <div class="row justify-space-between text-center py-2">
        <div class="col-12">
          <MaterialBadge color="primary" rounded> Primary </MaterialBadge>

          <MaterialBadge color="secondary" rounded class="mx-1">
            Secondary
          </MaterialBadge>

          <MaterialBadge color="success" rounded> Success </MaterialBadge>

          <MaterialBadge color="danger" rounded class="mx-1"> Danger </MaterialBadge>

          <MaterialBadge color="warning" rounded> Warning </MaterialBadge>

          <MaterialBadge color="info" rounded class="mx-1"> Info </MaterialBadge>

          <MaterialBadge color="light" rounded class="text-dark"> Light </MaterialBadge>

          <MaterialBadge color="dark" rounded class="ms-1"> Dark </MaterialBadge>
        </div>
      </div>
    </div>
  </section>
</template>
`,fa={name:"BadgesView",setup(s){return $(()=>{M()}),(i,d)=>(c(),x(h,{title:"Badges",breadcrumb:[{label:"Elements",route:"#"},{label:"Badges"}]},{default:e(()=>[a(_,{title:"Badges Gradients",code:u(na),id:"badges-gradient"},{default:e(()=>[a(N)]),_:1},8,["code"]),a(_,{title:"Badges Simple",code:u(la),id:"badges-simple"},{default:e(()=>[a(Q)]),_:1},8,["code"]),a(_,{title:"Badges Simple Rounded",code:u(ga),id:"badges-rounded"},{default:e(()=>[a(ca)]),_:1},8,["code"])]),_:1}))}};export{fa as default};
