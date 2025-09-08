import{_ as h,a as m}from"./View-DjQ9NESW.js";import{c as u,j as c,b as t,l,t as g,f as s,k as b,o as p,d as f,g as d,v}from"./index--Yck1YLH.js";import{s as w}from"./nav-pills-CyVEj_LU.js";import"./NavbarDefault-SCWElJqP.js";import"./_commonjsHelpers-D6-XlEtG.js";const _={class:"p-3 info-horizontal d-flex align-items-center"},y={class:"description ps-3"},k=["innerHTML"],i={name:"AboutUsOption",props:{variant:{type:String,default:"gradient"},color:{type:String,default:"success"},size:{type:String,default:"md"},icon:{type:[String,Object],required:!0,component:String,color:String},content:{type:String,required:!0}},setup(e){function a(o,r){let n;return o==="gradient"?n="bg-gradient-"+r:o==="contained"&&(n="bg-"+r),n}return(o,r)=>(c(),u("div",_,[t("div",{class:l(["icon icon-shape text-center border-radius-xl",`icon-${e.size} ${a(e.variant,e.color)} shadow-${e.color}`])},[t("i",{class:l(["material-icons opacity-10",typeof e.icon=="object"?e.icon.color:""])},g(typeof e.icon=="string"?e.icon:e.icon.component),3)],2),t("div",y,[t("p",{class:"mb-0",innerHTML:e.content},null,8,k)])]))}},x={class:"py-9"},A={class:"container"},W={class:"row"},$=t("div",{class:"col-lg-6 my-auto"},[t("h3",null,"Read More About Us"),t("p",{class:"pe-5"}," Pain is what we go through as we become older. We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand. "),t("a",{href:"javascript:;",class:"text-success icon-move-right"},[b("More about us "),t("i",{class:"fas fa-arrow-right text-sm ms-1"})])],-1),S={class:"col-lg-6 mt-lg-0 mt-5 ps-lg-0 ps-0"},O={name:"FeatureOne",setup(e){return(a,o)=>(c(),u("section",x,[t("div",A,[t("div",W,[$,t("div",S,[s(i,{icon:"mediation",content:`It becomes harder for us to give others a hand.<br />
            We get our heart broken by people we love.`}),s(i,{icon:"settings_overscan",content:`As we live, our hearts turn colder.<br />
            Cause pain is what we go through as we become older.`}),s(i,{icon:"token",content:`When we lose family over
            time. <br />
            What else could rust the heart more over time? Blackgold.`})])])])]))}},U=`<script setup>
import AboutUsOption from "@/views/LandingPages/Components/AboutUsOption.vue";
<\/script>
<template>
  <section class="py-9">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 my-auto">
          <h3>Read More About Us</h3>
          <p class="pe-5">
            Pain is what we go through as we become older. We get insulted by
            others, lose trust for those others. We get back stabbed by friends.
            It becomes harder for us to give others a hand.
          </p>
          <a href="javascript:;" class="text-success icon-move-right"
            >More about us
            <i class="fas fa-arrow-right text-sm ms-1"></i>
          </a>
        </div>
        <div class="col-lg-6 mt-lg-0 mt-5 ps-lg-0 ps-0">
          <AboutUsOption
            icon="mediation"
            content="It becomes harder for us to give others a hand.<br />
            We get our heart broken by people we love."
          />
          <AboutUsOption
            icon="settings_overscan"
            content="As we live, our hearts turn colder.<br />
            Cause pain is what we go through as we become older."
          />

          <AboutUsOption
            icon="token"
            content="When we lose family over
            time. <br />
            What else could rust the heart more over time? Blackgold."
          />
        </div>
      </div>
    </div>
  </section>
</template>
`,P={name:"FeaturesView",setup(e){return p(()=>{w()}),(a,o)=>(c(),f(h,{title:"Features",breadcrumb:[{label:"Page Sections",route:"/sections/page-sections/page-headers"},{label:"Features"}]},{default:d(()=>[s(m,{title:"Features 1",code:v(U),id:"feature-1"},{default:d(()=>[s(O)]),_:1},8,["code"])]),_:1}))}};export{P as default};
