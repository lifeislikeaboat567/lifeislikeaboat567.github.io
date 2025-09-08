import{_ as v,a as c}from"./View-DjQ9NESW.js";import{_ as e}from"./MaterialButton-DNTv3Sx4.js";import{u as m}from"./index-BLAw5Y77.js";import{o as l,c as u,j as p,b as i,f as t,g as o,k as a,d as g,v as d}from"./index--Yck1YLH.js";import{s as _}from"./tooltip-klgTO268.js";import{s as h}from"./nav-pills-CyVEj_LU.js";import"./NavbarDefault-SCWElJqP.js";import"./_commonjsHelpers-D6-XlEtG.js";function f(r){[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function(n){return new r.Popover(n)})}const T={class:"container"},M={class:"row py-7 text-center"},B=a(" Popover on top "),y=a(" Popover on right "),P=a(" Popover on bottom "),w=a(" Popover on left "),x={name:"Popovers",setup(r){const s=m();return l(()=>{f(s.bootstrap)}),(n,b)=>(p(),u("div",T,[i("div",M,[i("div",null,[t(e,{variant:"gradient",color:"success","data-bs-container":"body","data-bs-toggle":"popover","data-bs-placement":"top","data-bs-content":"That’s the main thing people are controlled by! Thoughts- their perception of themselves!"},{default:o(()=>[B]),_:1}),t(e,{class:"mx-2",variant:"gradient",color:"success","data-bs-container":"body","data-bs-toggle":"popover","data-bs-placement":"right","data-bs-content":"We’re not always in the position that we want to be at."},{default:o(()=>[y]),_:1}),t(e,{variant:"gradient",color:"success","data-bs-container":"body","data-bs-toggle":"popover","data-bs-placement":"bottom","data-bs-content":"A lot of people don’t appreciate the moment until it’s passed."},{default:o(()=>[P]),_:1}),t(e,{class:"ms-2",variant:"gradient",color:"success","data-bs-container":"body","data-bs-toggle":"popover","data-bs-placement":"left","data-bs-content":"It really matters and then like it really doesn’t matter. What matters is the people who are sparked by it."},{default:o(()=>[w]),_:1})])])]))}},$={class:"container"},k={class:"row py-8 text-center"},A=a(" Tooltip on top "),S=a(" Tooltip on right "),V=a(" Tooltip on bottom "),C=a(" Tooltip on left "),N={name:"Tooltips",setup(r){const s=m();return l(()=>{_(s.bootstrap)}),(n,b)=>(p(),u("div",$,[i("div",k,[i("div",null,[t(e,{variant:"gradient",color:"success","data-bs-toggle":"tooltip","data-bs-placement":"top",title:"Tooltip on top"},{default:o(()=>[A]),_:1}),t(e,{class:"mx-2",variant:"gradient",color:"success","data-bs-toggle":"tooltip","data-bs-placement":"right",title:"Tooltip on right"},{default:o(()=>[S]),_:1}),t(e,{variant:"gradient",color:"success","data-bs-toggle":"tooltip","data-bs-placement":"bottom",title:"Tooltip on bottom"},{default:o(()=>[V]),_:1}),t(e,{class:"ms-2",variant:"gradient",color:"success","data-bs-toggle":"tooltip","data-bs-placement":"left",title:"Tooltip on left"},{default:o(()=>[C]),_:1})])])]))}},W=`<script setup>
import { onMounted } from "vue";
//Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";

// popover
import setPopover from "@/assets/js/popover";

// store
import { useAppStore } from "@/stores";
const store = useAppStore();

// hook
onMounted(() => {
  setPopover(store.bootstrap);
});
<\/script>
<template>
  <div class="container">
    <div class="row py-7 text-center">
      <div>
        <MaterialButton
          variant="gradient"
          color="success"
          data-bs-container="body"
          data-bs-toggle="popover"
          data-bs-placement="top"
          data-bs-content="That’s the main thing people are controlled by! Thoughts- their perception of themselves!">
          Popover on top
        </MaterialButton>
        
        <MaterialButton
          class="mx-2"
          variant="gradient"
          color="success"
          data-bs-container="body"
          data-bs-toggle="popover"
          data-bs-placement="right"
          data-bs-content="We’re not always in the position that we want to be at.">
          Popover on right
        </MaterialButton>

        <MaterialButton
          variant="gradient"
          color="success"
          data-bs-container="body"
          data-bs-toggle="popover"
          data-bs-placement="bottom"
          data-bs-content="A lot of people don’t appreciate the moment until it’s passed.">
          Popover on bottom
        </MaterialButton>

        <MaterialButton
          class="ms-2"
          variant="gradient"
          color="success"
          data-bs-container="body"
          data-bs-toggle="popover"
          data-bs-placement="left"
          data-bs-content="It really matters and then like it really doesn’t matter. What matters is the people who are sparked by it.">
          Popover on left
        </MaterialButton>
      </div>
    </div>
  </div>
</template>
`,j=`<script setup>
import { onMounted } from "vue";
//Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";

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
  <div class="container">
    <div class="row py-8 text-center">
      <div>
        <MaterialButton
          variant="gradient"
          color="success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Tooltip on top">
          Tooltip on top
        </MaterialButton>

        <MaterialButton
          class="mx-2"
          variant="gradient"
          color="success"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Tooltip on right">
          Tooltip on right
        </MaterialButton>

        <MaterialButton
          variant="gradient"
          color="success"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Tooltip on bottom">
          Tooltip on bottom
        </MaterialButton>

        <MaterialButton
          class="ms-2"
          variant="gradient"
          color="success"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Tooltip on left">
          Tooltip on left
        </MaterialButton>
      </div>
    </div>
  </div>
</template>
`,G={name:"TooltipsPopoversView",setup(r){return l(()=>{h()}),(s,n)=>(p(),g(v,{title:"Tooltip & Popovers",breadcrumb:[{label:"Attention Catchers",route:"#"},{label:"Tooltip & Popovers"}]},{default:o(()=>[t(c,{title:"Popovers",code:d(W),id:"popovers"},{default:o(()=>[t(x)]),_:1},8,["code"]),t(c,{title:"Tooltips",code:d(j),id:"tooltips"},{default:o(()=>[t(N)]),_:1},8,["code"])]),_:1}))}};export{G as default};
