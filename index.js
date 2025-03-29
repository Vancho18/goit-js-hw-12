import{a as h,S as P,i as n}from"./assets/vendor-DMjJPMAs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();h.defaults.baseURL="https://pixabay.com/api/";const R="49354290-35d6e1dc5d842ed86975730ff",x=(s,t)=>({params:{key:R,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}});async function L(s,t){return(await h.get("",x(s,t))).data}const B=new P(".item a",{captions:!0,captionsData:"alt",captionDelay:1e3});function u(s,t){const r=s.map(({largeImageURL:e,webformatURL:o,tags:i,likes:w,views:S,comments:$,downloads:O})=>`
    <li class= "item">
      <a href="${e}">
        <img class= "item-img" src="${o}" alt="${i}" />
        <div class = "item-descrp">
          <table>
            <tr>
              <th>Likes</th>
              <th>Views</th>
              <th>Comment</th>
              <th>Downloads</th>
            </tr>
            <tr>
              <td>${w}</td>
              <td>${S}</td>
              <td>${$}</td>
              <td>${O}</td>
            </tr>
          </table>
        </div>
      </a>
    </li>
    `).join("");t.insertAdjacentHTML("beforeend",r),document.querySelectorAll(".item-img").forEach(e=>e.onload=()=>e.classList.add("loaded")),B.refresh()}function D(){const s=document.querySelector(".gallery");s&&s.replaceChildren()}const f=document.querySelector(".form"),d=document.querySelector(".gallery"),g=document.querySelector(".load-btn");function A(){g.classList.add("active")}function m(){g.classList.remove("active")}let c=1,v=null,p=null;const b=document.querySelector(".loader");function q(){b.classList.add("active")}function l(){b.classList.remove("active")}const y=()=>f.reset();f.addEventListener("submit",E);async function E(s){s.preventDefault(),m(),D(),c=1,p=1;const t=f.querySelector('[name="search-text"]').value.trim();if(t!==""){v=t,q();try{const r=await L(t,c);if(r.hits.length!==0){l(),r.totalHits>15?(p=r.totalHits/15,A()):m(),u(r.hits,d);return}else{l(),n.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"center"});return}}catch(r){n.error({message:`${r.message}. We are experiencing some issues. Please try again later.`,position:"center",timeout:2e3})}finally{l(),y()}}else{n.warning({message:"Field must not be empty!",position:"center",timeout:2e3}),y();return}}g.addEventListener("click",C);async function C(s){s.preventDefault(),q(),c+=1;const t=document.querySelector(".item").getBoundingClientRect(),r=await L(v,c);try{c<=p?(u(r.hits,d),l(),window.scrollBy({top:t.height*2,behavior:"smooth"})):(l(),m(),u(r.hits,d),window.scrollBy({top:t.height*2,behavior:"smooth"}),n.warning({message:"We're sorry, but you've reached the end of search results.",position:"center"}))}catch(a){n.error({message:`${a.message}. We are experiencing some issues. Please try again later.`,position:"center",timeout:2e3})}}
//# sourceMappingURL=index.js.map
