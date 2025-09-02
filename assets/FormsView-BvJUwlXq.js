import{s as d,_ as n,a as p}from"./nav-pills-Bwl2hxLt.js";import{_ as o}from"./MaterialInput-BCthMNrb.js";import{_ as u}from"./MaterialTextArea-Ct7MF7PD.js";import{_}from"./MaterialButton-ClofIKvR.js";import{_ as f}from"./MaterialSwitch-CnFgkYfi.js";import{g as i,s as h,c as v,o as l,a as t,b as e,w as s,k as a,i as b,u as x}from"./index-BhD_1arq.js";import"./NavbarDefault-Ez8EQy0V.js";import"./_commonjsHelpers-D6-XlEtG.js";const g={class:"container py-7"},M={class:"row"},y={class:"col-lg-7 mx-auto d-flex justify-content-center flex-column"},w=t("h3",{class:"text-center"},"Contact us",-1),k={role:"form",id:"contact-form",method:"post",autocomplete:"off"},C={class:"card-body"},S={class:"row"},I={class:"col-md-6"},B={class:"col-md-6 ps-2"},N={class:"mb-4"},A=a("Your message"),F={class:"row"},T={class:"col-md-12"},$=a(" I agree to the "),V=t("a",{href:"javascript:;",class:"text-dark"},[t("u",null,"Terms and Conditions")],-1),j=a(". "),E={class:"col-md-12"},D=a("Send Message"),L={name:"FormSimple",setup(c){return i(()=>{h()}),(r,m)=>(l(),v("section",null,[t("div",g,[t("div",M,[t("div",y,[w,t("form",k,[t("div",C,[t("div",S,[t("div",I,[e(o,{class:"input-group-dynamic mb-4",label:{text:"First Name",class:"form-label"},type:"text"})]),t("div",B,[e(o,{class:"input-group-dynamic",label:{text:"Last Name",class:"form-label"},type:"text"})])]),t("div",N,[e(o,{class:"input-group-dynamic",label:{text:"Email Address",class:"form-label"},type:"email"})]),e(u,{class:"input-group-static mb-4",id:"message",rows:4},{default:s(()=>[A]),_:1})]),t("div",F,[t("div",T,[e(f,{class:"mb-4 d-flex align-items-center",id:"flexSwitchCheckDefault",checked:"",labelClass:"ms-3 mb-0"},{default:s(()=>[$,V,j]),_:1}),t("div",E,[e(_,{type:"submit",variant:"gradient",color:"dark",fullWidth:""},{default:s(()=>[D]),_:1})])])])])])])])]))}},W=`<script setup>
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
`,O={name:"FormsView",setup(c){return i(()=>{d()}),(r,m)=>(l(),b(n,{title:"Forms",breadcrumb:[{label:"Input Areas",route:"#"},{label:"Forms"}]},{default:s(()=>[e(p,{title:"Form simple",code:x(W),id:"form-simple",height:"600"},{default:s(()=>[e(L)]),_:1},8,["code"])]),_:1}))}};export{O as default};
