const escapeHtml=(value='')=>String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

function getPath(object,path){return path.split('.').reduce((value,key)=>value?.[key],object)}

async function loadContent(){
  try{
    const response=await fetch(`/content.json?v=${Date.now()}`,{cache:'no-store'});
    if(!response.ok)return;
    const content=await response.json();
    document.querySelectorAll('[data-content]').forEach(element=>{
      const value=getPath(content,element.dataset.content);
      if(typeof value==='string')element.textContent=value;
    });
  }catch(error){console.warn('No se pudo cargar content.json',error)}
}

async function loadManagedProjects(){
  const grid=document.querySelector('#proyectos .project-grid');
  if(!grid)return;
  try{
    const response=await fetch(`/projects.json?v=${Date.now()}`,{cache:'no-store'});
    if(!response.ok)return;
    const data=await response.json();
    const projects=(data.projects||[]).filter(project=>project.published!==false).slice(0,4);
    if(!projects.length)return;
    grid.innerHTML=projects.map(project=>{
      const target=project.siteUrl||project.repoUrl||'';
      const visual=project.image
        ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt||project.name)}" loading="lazy">`
        : project.siteUrl
          ? `<iframe src="${escapeHtml(project.siteUrl)}" title="${escapeHtml(project.name)}" loading="lazy" tabindex="-1"></iframe>`
          : `<div class="generated-preview"><b>${escapeHtml(project.name)}</b><span>${escapeHtml(project.category||'Producto')}</span></div>`;
      return `<article class="project-card ${project.siteUrl?'':'compact'}">${target?`<a class="project-preview" href="${escapeHtml(target)}" target="_blank" rel="noreferrer">${visual}<span>Abrir ↗</span></a>`:visual}<div class="project-info"><small>${escapeHtml(project.category||'Producto')}</small><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.description||'')}</p></div></article>`;
    }).join('');
  }catch(error){console.warn('No se pudo cargar projects.json',error)}
}

function runCounters(){
  document.querySelectorAll('[data-count]').forEach(element=>{
    const target=Number(element.dataset.count);
    const state={value:0};
    if(window.gsap)gsap.to(state,{value:target,duration:1.4,ease:'power2.out',onUpdate:()=>element.textContent=Math.floor(state.value).toLocaleString('es-CL')+'+'});
    else element.textContent=target.toLocaleString('es-CL')+'+';
  });
}

document.addEventListener('DOMContentLoaded',async()=>{
  await Promise.all([loadContent(),loadManagedProjects()]);
  if(window.gsap&&window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-copy>*',{opacity:0,y:24,duration:.7,stagger:.08,ease:'power3.out'});
    gsap.from('.hero-card',{opacity:0,x:32,duration:.9,ease:'power3.out'});
    document.querySelectorAll('.project-card,.capability-grid article').forEach((element,index)=>gsap.from(element,{scrollTrigger:{trigger:element,start:'top 88%'},opacity:0,y:28,duration:.65,delay:(index%4)*.04,ease:'power3.out'}));
  }
  const metrics=document.querySelector('#impacto');
  if(metrics){let counted=false;new IntersectionObserver(entries=>{if(!counted&&entries.some(entry=>entry.isIntersecting)){counted=true;runCounters()}},{threshold:.3}).observe(metrics)}
});