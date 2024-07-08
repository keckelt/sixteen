(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();function g(){return matchMedia("(color-gamut: p3)").matches}function y(){let o=document.createElement("canvas");try{return o.getContext("2d",{colorSpace:"display-p3"}).getContextAttributes().colorSpace=="display-p3"}catch{}return!1}document.querySelector("#app").innerHTML=`
  <div>
    <h1>Sixteen Bit Images</h1>
    <p class="read-the-docs">
      Creating a canvas with display-3 colorspace image data.
    </p>
    <p id="displaySupport"></p>
    <p id="canvasSupport"></p>
    <p class="read-the-docs">
    Refresh the page if you change displays.
    </p>
    <div>
      <span style="width: 90px; display: inline-block;">display-p3</span> <canvas id="canvas1" width=320 height=80></canvas> 
    </div>
    <div>
      <span style="width: 90px; display: inline-block;">srgb</span> <canvas id="canvas2" width=320 height=80></canvas> 
    </div>
    <div>
      <span style="width: 90px; display: inline-block;">diff</span> <canvas id="diff" width=320 height=80></canvas> 
    </div>
    <p class="read-the-docs">
    Also see <a href="https://webkit.org/blog/12058/wide-gamut-2d-graphics-using-html-canvas/">intro</a> and <a href="https://webkit.org/blog-files/color-gamut/">examples</a> from the webkit blog.
    </p>
  </div>
`;document.querySelector("#displaySupport").textContent=g()?"✅ Display P3 is supported":"❌ Display P3 is not supported";document.querySelector("#canvasSupport").textContent=y()?"✅ Canvas supports Display P3":"❌ Canvas does not support Display P3";l(document.querySelector("#canvas1"),"display-p3");l(document.querySelector("#canvas2"),"srgb");function l(o,c="display-p3"){const s=o.getContext("2d",{colorSpace:c});if(s){let n=0;for(let a of[1,0])for(let f of[1,0])for(let u of[1,0])s.fillStyle=`color(${c} ${u} ${a} ${f})`,s.fillRect(n,0,40,40),n+=40;const e=["#0f0","color(display-p3 0 1 0)"];for(let a=0;a<=300;a+=30)s.fillStyle=e[a/30%2],s.fillRect(a,40,30,40);const t=s.getImageData(0,0,320,40);console.log(t.colorSpace,t.data.constructor.name),console.log(t)}else console.error("Could not get context")}const h=document.querySelector("#canvas1"),m=document.querySelector("#canvas2"),v=h.getContext("2d",{colorSpace:"display-p3"}),S=m.getContext("2d",{colorSpace:"srgb"}),i=v.getImageData(0,0,320,80),p=S.getImageData(0,0,320,80);console.log(i.colorSpace,p.colorSpace);const d=document.querySelector("#diff");d.toDataURL("image/png",1);const r=d.getContext("2d",{colorSpace:"display-p3"});for(let o=0;o<i.data.length;o+=4){const c=i.data.slice(o,o+4),s=p.data.slice(o,o+4);c.reduce((e,t,a)=>e+Math.abs(t-s[a]),0)!==0?(r.fillStyle="#fff",r.fillRect(o/4%320,Math.floor(o/4/320),1,1)):(r.fillStyle="#000",r.fillRect(o/4%320,Math.floor(o/4/320),1,1))}
