import{s as h,_ as f,a as v}from"./nav-pills-Bh4fURNE.js";import{_ as p}from"./MaterialButton-rwSezhh6.js";import{r as c,c as _,j as u,b as o,f as l,g as n,k as w,l as t,G as d,v as a,o as g,d as b}from"./index-BbVUABXR.js";import"./NavbarDefault-C8RBHO4O.js";import"./_commonjsHelpers-D6-XlEtG.js";const D={class:"container p-5 bg-gray-100 m-3"},x={class:"row d-flex justify-content-center"},j={class:"col-lg-4 col-md-6 col-sm-3"},B={class:"dropdown"},M=w(" Dropdown button "),y=o("li",null,[o("a",{class:"dropdown-item border-radius-md",href:"javascript:;"},"Action")],-1),A=o("li",null,[o("a",{class:"dropdown-item border-radius-md",href:"javascript:;"},"Another action")],-1),k=o("li",null,[o("a",{class:"dropdown-item border-radius-md",href:"javascript:;"},"Something else here")],-1),$=[y,A,k],C={class:"col-lg-4 col-md-6 col-sm-3"},V={class:"btn-group dropup mt-7"},N=w(" Dropup "),S=o("li",null,[o("a",{class:"dropdown-item border-radius-md",href:"javascript:;"},"Action")],-1),E=o("li",null,[o("a",{class:"dropdown-item border-radius-md",href:"javascript:;"},"Another action")],-1),F=o("li",null,[o("a",{class:"dropdown-item border-radius-md",href:"javascript:;"},"Something else here")],-1),z=[S,E,F],G={name:"DropdownAndDropup",setup(m){let s=c(!1),e=c(!1);return(P,r)=>(u(),_("div",D,[o("div",x,[o("div",j,[o("div",B,[l(p,{variant:"gradient",color:"success",class:t(["dropdown-toggle",{show:a(s)}]),onFocusout:r[0]||(r[0]=i=>d(s)?s.value=!1:s=!1),id:"dropdownMenuButton","data-bs-toggle":"dropdown","area-expanded":a(s),onClick:r[1]||(r[1]=i=>d(s)?s.value=!a(s):s=!a(s))},{default:n(()=>[M]),_:1},8,["class","area-expanded"]),o("ul",{class:t(["dropdown-menu px-2 py-3",{show:a(s)}]),"aria-labelledby":"dropdownMenuButton"},$,2)])]),o("div",C,[o("div",V,[l(p,{variant:"gradient",color:"success",class:t(["dropdown-toggle",{show:a(e)}]),"data-bs-toggle":"dropdown","area-expanded":a(e),onFocusout:r[2]||(r[2]=i=>d(e)?e.value=!1:e=!1),onClick:r[3]||(r[3]=i=>d(e)?e.value=!a(e):e=!a(e))},{default:n(()=>[N]),_:1},8,["class","area-expanded"]),o("ul",{class:t(["dropdown-menu px-2 py-3",{show:a(e)}]),"aria-labelledby":"dropdownMenuButton"},z,2)])])])]))}},K=`<script setup>
import { ref } from "vue";
//Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";

let showDropdown = ref(false);
let showDropup = ref(false);
<\/script>
<template>
  <div class="container p-5 m-3 bg-gray-100">
    <div class="row">
      <div class="row">
        <div
          class="col-lg-4 ms-lg-auto col-md-6 col-sm-3 d-flex justify-content-center"
        >
          <div class="dropdown">
            <MaterialButton
              variant="gradient"
              color="success"
              class="dropdown-toggle"
              :class="{ show: showDropdown }"
              @focusout="showDropdown = false"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              :area-expanded="showDropdown"
              @click="showDropdown = !showDropdown"
            >
              Dropdown button
            </MaterialButton>

            <ul
              class="dropdown-menu px-2 py-3"
              :class="{ show: showDropdown }"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Action</a
                >
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Another action</a
                >
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Something else here</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-lg-4 me-lg-auto col-md-6 col-sm-3 d-flex justify-content-center"
        >
          <div class="btn-group dropup mt-7">
            <MaterialButton
              variant="gradient"
              color="success"
              class="dropdown-toggle"
              :class="{ show: showDropup }"
              data-bs-toggle="dropdown"
              :area-expanded="showDropup"
              @focusout="showDropup = false"
              @click="showDropup = !showDropup">
              Dropup
            </MaterialButton>
            <ul
              class="dropdown-menu px-2 py-3" :class="{ show: showDropup }"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Action</a
                >
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Another action</a
                >
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Something else here</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
`,J={name:"DropdownsView",setup(m){return g(()=>{h()}),(s,e)=>(u(),b(f,{title:"Dropdowns",breadcrumb:[{label:"Elements",route:"#"},{label:"Dropdowns"}]},{default:n(()=>[l(v,{title:"Dropdown and Dropup",code:a(K),id:"dropdown-dropup"},{default:n(()=>[l(G)]),_:1},8,["code"])]),_:1}))}};export{J as default};
