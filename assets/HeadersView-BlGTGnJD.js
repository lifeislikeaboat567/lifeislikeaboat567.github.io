import{_ as d,a as h}from"./View-DjQ9NESW.js";import{_ as n}from"./MaterialButton-DNTv3Sx4.js";import{B as v,c as m,j as l,b as a,y as p,f as t,g as e,k as s,n as b,o as f,d as u,v as _}from"./index--Yck1YLH.js";import{s as g}from"./nav-pills-CyVEj_LU.js";import"./NavbarDefault-SCWElJqP.js";import"./_commonjsHelpers-D6-XlEtG.js";const w={class:"navbar navbar-expand-lg navbar-dark navbar-absolute bg-transparent shadow-none"},x={class:"container"},k=a("a",{class:"navbar-brand text-white",href:"javascript:;"},"Material Design",-1),y=a("button",{class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbar-header-2","aria-controls":"navbar-header-2","aria-expanded":"false","aria-label":"Toggle navigation"},[a("span",{class:"navbar-toggler-icon"})],-1),M={class:"collapse navbar-collapse",id:"navbar-header-2"},B={class:"navbar-nav mx-auto"},H={class:"nav-item"},C=s(" Home "),T={class:"nav-item"},R=s(" About Us "),L={class:"nav-item"},V=s(" Contact Us "),j=p('<ul class="nav navbar-nav"><li class="nav-item"><a class="nav-link text-white" href="https://twitter.com/CreativeTim"><i class="fab fa-twitter"></i></a></li><li class="nav-item"><a class="nav-link text-white mx-2" href="https://www.facebook.com/CreativeTim"><i class="fab fa-facebook"></i></a></li><li class="nav-item"><a class="nav-link text-white" href="https://www.instagram.com/CreativeTimOfficial"><i class="fab fa-instagram"></i></a></li></ul>',1),D=a("span",{class:"mask bg-gradient-dark opacity-5"},null,-1),G={class:"container"},P={class:"row"},N={class:"col-lg-6 col-md-7 d-flex justify-content-center flex-column"},S=a("h1",{class:"text-white mb-4"},"Material Kit",-1),$=a("p",{class:"text-white opacity-8 lead pe-5 me-5"}," The time is now for it be okay to be great. People in this world shun people for being nice. ",-1),A={class:"buttons"},U=s("Get Started"),z=s("Read more"),I={name:"HeaderOne",setup(r){const o="https://images.unsplash.com/photo-1520769945061-0a448c463865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";return(c,O)=>{const i=v("RouterLink");return l(),m("header",null,[a("nav",w,[a("div",x,[k,y,a("div",M,[a("ul",B,[a("li",H,[t(i,{class:"nav-link text-white",to:"#"},{default:e(()=>[C]),_:1})]),a("li",T,[t(i,{class:"nav-link text-white",to:"#"},{default:e(()=>[R]),_:1})]),a("li",L,[t(i,{class:"nav-link text-white",to:"#"},{default:e(()=>[V]),_:1})])]),j])])]),a("div",{class:"page-header min-vh-100",style:b({backgroundImage:`url(${o})`}),loading:"lazy"},[D,a("div",G,[a("div",P,[a("div",N,[S,$,a("div",A,[t(n,{color:"white",class:"mt-4"},{default:e(()=>[U]),_:1}),t(n,{color:"none",class:"text-white shadow-none mt-4"},{default:e(()=>[z]),_:1})])])])])],4)])}}},K=`<setup>
//Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";
<\/script>
<template>

  <header>
    <nav class="navbar navbar-expand-lg navbar-dark navbar-absolute bg-transparent shadow-none" >
      <div class="container">
        <a class="navbar-brand text-white" href="javascript:;">Material Design</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-header-2"
          aria-controls="navbar-header-2"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-header-2">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item"><RouterLink class="nav-link text-white" to="#"> Home </RouterLink></li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white" to="#">About Us</RouterLink></li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white" to="#">Contact Us</RouterLink></li>
          </ul>
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <a
                class="nav-link text-white"
                href="https://twitter.com/CreativeTim">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-white mx-2"
                href="https://www.facebook.com/CreativeTim">
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-white"
                href="https://www.instagram.com/CreativeTimOfficial">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="page-header min-vh-100"
      :style="{
        backgroundImage: 'url(https://images.unsplash.com/photo-1520769945061-0a448c463865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
      }"
      loading="lazy">
      <span class="mask bg-gradient-dark opacity-5"></span>
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-7 d-flex justify-content-center flex-column">
            <h1 class="text-white mb-4">Material Kit</h1>
            <p class="text-white opacity-8 lead pe-5 me-5">
              The time is now for it be okay to be great. People in this world
              shun people for being nice.
            </p>
            <div class="buttons">
              <MaterialButton color="white" class="mt-4"
                >Get Started</MaterialButton>
              <MaterialButton color="none" class="text-white shadow-none mt-4"
                >Read more</MaterialButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>`,Q={name:"HeadersView",setup(r){return f(()=>{g()}),(o,c)=>(l(),u(d,{title:"Page Headers",breadcrumb:[{label:"Page Sections",route:"/sections/page-sections/page-headers"},{label:"Page Headers"}]},{default:e(()=>[t(h,{title:"Header 1",code:_(K),id:"header-1"},{default:e(()=>[t(I)]),_:1},8,["code"])]),_:1}))}};export{Q as default};
