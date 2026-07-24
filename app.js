const safeHttpUrl=(value='')=>{try{const url=new URL(value,location.origin);return ['http:','https:'].includes(url.protocol)?url.href:''}catch{return ''}};
const escapeHtml=(value='')=>String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

function projectMarkup(project){
  const site=safeHttpUrl(project.siteUrl);
  const repo=safeHttpUrl(project.repoUrl);
  const target=site||repo;
  const visual=project.image
    ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt||`Vista de ${project.name}`)}" loading="lazy" decoding="async">`
    : site
      ? `<iframe src="${site}" title="Vista previa de ${escapeHtml(project.name)}" loading="lazy" tabindex="-1"></iframe>`
      : `<div class="generated-preview"><b>${escapeHtml(project.name)}</b><span>${escapeHtml(project.category||'Producto digital')}</span></div>`;
  const chips=(project.technologies||[]).map(item=>`<span>${escapeHtml(item)}</span>`).join('');
  return `<article class="project-card ${site?'':'compact'}">
    ${target?`<a class="project-preview" href="${target}" target="_blank" rel="noreferrer">${visual}<span>Abrir producto ↗</span></a>`:visual}
    <div class="project-info"><small>${escapeHtml(project.category||'Producto digital')}</small><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.description||'')}</p><div class="chips">${chips}</div></div>
  </article>`;
}

async function loadManagedProjects(){
  const grid=document.querySelector('#proyectos .project-grid');
  if(!grid)return;
  try{
    const response=await fetch(`projects.json?v=${Date.now()}`,{cache:'no-store'});
    if(!response.ok)throw new Error('No se pudo cargar projects.json');
    const data=await response.json();
    const projects=(data.projects||[]).filter(project=>project.published!==false);
    if(projects.length)grid.innerHTML=projects.map(projectMarkup).join('');
  }catch(error){console.warn(error)}
}

function runCounters(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target=Number(el.dataset.count);
    const state={value:0};
    if(window.gsap){
      gsap.to(state,{value:target,duration:1.7,ease:'power2.out',onUpdate:()=>el.textContent=Math.floor(state.value).toLocaleString('es-CL')+'+'});
    }else{
      el.textContent=target.toLocaleString('es-CL')+'+';
    }
  });
}

document.addEventListener('DOMContentLoaded',async()=>{
  await loadManagedProjects();
  if(window.gsap&&window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-copy>*',{opacity:0,y:26,duration:.75,stagger:.09,ease:'power3.out'});
    gsap.from('.hero-card',{opacity:0,x:38,rotate:4,duration:1,ease:'power3.out'});
    document.querySelectorAll('.profile-cards article,.project-card,.stack-groups article,.philosophy-grid span').forEach((el,index)=>{
      gsap.from(el,{scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'},opacity:0,y:34,duration:.7,delay:(index%4)*.04,ease:'power3.out'});
    });
  }
  const metrics=document.querySelector('#impacto');
  if(metrics){
    let counted=false;
    new IntersectionObserver(entries=>{
      if(!counted&&entries.some(entry=>entry.isIntersecting)){counted=true;runCounters();}
    },{threshold:.3}).observe(metrics);
  }
});