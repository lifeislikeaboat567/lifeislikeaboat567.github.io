import{s as r,_ as c,a as m}from"./nav-pills-Bh4fURNE.js";import{_ as s}from"./MaterialButton-rwSezhh6.js";import{c as u,j as l,b as a,f as o,g as t,k as e,o as b,d as _,v as h}from"./index-BbVUABXR.js";import"./NavbarDefault-C8RBHO4O.js";import"./_commonjsHelpers-D6-XlEtG.js";const p={class:"container py-7"},v={class:"row mt-2 flex justify-content-center"},g={class:"col-sm-3 col-6 ms-8"},y=e(" Launch demo modal "),f={class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},M={class:"modal-dialog"},x={class:"modal-content"},k={class:"modal-header"},B=a("h5",{class:"modal-title",id:"exampleModalLabel"}," Your modal title ",-1),w=a("div",{class:"modal-body"},[e(" Society has put up so many boundaries, so many limitations on what’s right and wrong that it’s almost impossible to get a pure thought out. "),a("br"),a("br"),e(" It’s like a little kid, a little boy, looking at colors, and no one told him what colors are good, before somebody tells you you shouldn’t like pink because that’s for girls, or you’d instantly become a gay two-year-old. ")],-1),C={class:"modal-footer justify-content-between"},L=e(" Close "),S=e(" Save changes "),V={name:"SimpleModal",setup(i){return(d,n)=>(l(),u("div",p,[a("div",v,[a("div",g,[o(s,{variant:"gradient",color:"success","data-bs-toggle":"modal","data-bs-target":"#exampleModal"},{default:t(()=>[y]),_:1}),a("div",f,[a("div",M,[a("div",x,[a("div",k,[B,o(s,{color:"none",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]),w,a("div",C,[o(s,{variant:"gradient",color:"dark","data-bs-dismiss":"modal"},{default:t(()=>[L]),_:1}),o(s,{variant:"gradient",color:"success",class:"mb-0"},{default:t(()=>[S]),_:1})])])])])])])]))}},j=`<script setup>
//Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";
<\/script>
<template>
  <div class="container py-7">
    <div class="row mt-5">
      <div class="col-sm-3 col-6 mx-auto">
        <!-- Button trigger modal -->
        <MaterialButton
          variant="gradient"
          color="success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          Launch demo modal
        </MaterialButton>

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Your modal title
                </h5>
                <MaterialButton
                  color="none"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                </MaterialButton>
              </div>
              <div class="modal-body">
                Society has put up so many boundaries, so many limitations on
                what’s right and wrong that it’s almost impossible to get a pure
                thought out.
                <br /><br />
                It’s like a little kid, a little boy, looking at colors, and no
                one told him what colors are good, before somebody tells you you
                shouldn’t like pink because that’s for girls, or you’d instantly
                become a gay two-year-old.
              </div>
              <div class="modal-footer justify-content-between">
                <MaterialButton
                  variant="gradient"
                  color="dark"
                  data-bs-dismiss="modal">
                  Close
                </MaterialButton>
                <MaterialButton variant="gradient" color="success" class="mb-0">
                  Save changes
                </MaterialButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
`,E={name:"ModalsView",setup(i){return b(()=>{r()}),(d,n)=>(l(),_(c,{title:"Modals",breadcrumb:[{label:"Attention Catchers",route:"#"},{label:"Modals"}]},{default:t(()=>[o(m,{title:"Simple Modal",code:h(j),id:"simple-modal"},{default:t(()=>[o(V)]),_:1},8,["code"])]),_:1}))}};export{E as default};
