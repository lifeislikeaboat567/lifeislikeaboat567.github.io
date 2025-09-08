import{_ as d,a as n}from"./View-DjQ9NESW.js";import{b as o}from"./NavbarDefault-SCWElJqP.js";import{_ as p}from"./MaterialTextArea-DNsPi7NB.js";import{_ as u}from"./MaterialButton-DNTv3Sx4.js";import{_}from"./MaterialSwitch-DoiAaANs.js";import{o as i,z as f,c as h,j as l,b as t,f as e,g as s,k as a,d as v,v as b}from"./index--Yck1YLH.js";import{s as x}from"./nav-pills-CyVEj_LU.js";import"./_commonjsHelpers-D6-XlEtG.js";const g={class:"container py-7"},M={class:"row"},y={class:"col-lg-7 mx-auto d-flex justify-content-center flex-column"},w=t("h3",{class:"text-center"},"Contact us",-1),k={role:"form",id:"contact-form",method:"post",autocomplete:"off"},C={class:"card-body"},S={class:"row"},I={class:"col-md-6"},B={class:"col-md-6 ps-2"},N={class:"mb-4"},A=a("Your message"),F={class:"row"},T={class:"col-md-12"},$=a(" I agree to the "),j=t("a",{href:"javascript:;",class:"text-dark"},[t("u",null,"Terms and Conditions")],-1),V=a(". "),E={class:"col-md-12"},D=a("Send Message"),L={name:"FormSimple",setup(c){return i(()=>{f()}),(r,m)=>(l(),h("section",null,[t("div",g,[t("div",M,[t("div",y,[w,t("form",k,[t("div",C,[t("div",S,[t("div",I,[e(o,{class:"input-group-dynamic mb-4",label:{text:"First Name",class:"form-label"},type:"text"})]),t("div",B,[e(o,{class:"input-group-dynamic",label:{text:"Last Name",class:"form-label"},type:"text"})])]),t("div",N,[e(o,{class:"input-group-dynamic",label:{text:"Email Address",class:"form-label"},type:"email"})]),e(p,{class:"input-group-static mb-4",id:"message",rows:4},{default:s(()=>[A]),_:1})]),t("div",F,[t("div",T,[e(_,{class:"mb-4 d-flex align-items-center",id:"flexSwitchCheckDefault",checked:"",labelClass:"ms-3 mb-0"},{default:s(()=>[$,j,V]),_:1}),t("div",E,[e(u,{type:"submit",variant:"gradient",color:"dark",fullWidth:""},{default:s(()=>[D]),_:1})])])])])])])])]))}},W=`<script setup>
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
<\/script>
<template>
  <section>
    <div class="container py-4">
      <div class="row">
        <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">
          <h3 class="text-center">Contact us</h3>
          <form role="form" id="contact-form" method="post" autocomplete="off">
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <MaterialInput
                    class="input-group-dynamic mb-4"
                    :label="{ text: 'First Name', class: 'form-label' }"
                    type="text"
                  />
                </div>
                <div class="col-md-6 ps-2">
                  <MaterialInput
                    class="input-group-dynamic"
                    :label="{ text: 'Last Name', class: 'form-label' }"
                    type="text"
                  />
                </div>
              </div>
              <div class="mb-4">
                <MaterialInput
                  class="input-group-dynamic"
                  :label="{ text: 'Email Address', class: 'form-label' }"
                  type="email"
                />
              </div>
              <MaterialTextArea
                class="input-group-static mb-4"
                id="message"
                :rows="4"
                >Your message</MaterialTextArea
              >
            </div>
            <div class="row">
              <div class="col-md-12">
                <MaterialSwitch
                  class="mb-4 d-flex align-items-center"
                  id="flexSwitchCheckDefault"
                  checked
                  labelClass="ms-3 mb-0"
                >
                  I agree to the
                  <a href="javascript:;" class="text-dark"
                    ><u>Terms and Conditions</u></a
                  >.
                </MaterialSwitch>

                <div class="col-md-12">
                  <MaterialButton
                    type="submit"
                    variant="gradient"
                    color="dark"
                    fullWidth
                    >Send Message</MaterialButton
                  >
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
`,O={name:"FormsView",setup(c){return i(()=>{x()}),(r,m)=>(l(),v(d,{title:"Forms",breadcrumb:[{label:"Input Areas",route:"#"},{label:"Forms"}]},{default:s(()=>[e(n,{title:"Form simple",code:b(W),id:"form-simple",height:"600"},{default:s(()=>[e(L)]),_:1},8,["code"])]),_:1}))}};export{O as default};
