const screens=[...document.querySelectorAll('.screen')];
const tabs=[...document.querySelectorAll('.mobile-tabs button')];
function showScreen(id){screens.forEach(s=>s.classList.toggle('active-screen',s.id===id));tabs.forEach(t=>t.classList.toggle('active',t.dataset.target===id));window.scrollTo({top:0,behavior:'instant'});}
tabs.forEach(tab=>tab.addEventListener('click',()=>showScreen(tab.dataset.target)));
function syncMode(){if(innerWidth<=700&&!document.querySelector('.screen.active-screen'))showScreen('inicio');}
syncMode();addEventListener('resize',syncMode);

function safeHttpUrl(value=''){try{const url=new URL(value,location.origin);return ['http:','https:'].includes(url.protocol)?url.href:''}catch{return ''}}
function escapeHtml(value=''){return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]))}
function projectMarkup(project){
  const site=safeHttpUrl(project.siteUrl);
  const repo=safeHttpUrl(project.repoUrl);
  const target=site||repo;
  const image=project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt||`Vista de ${project.name}`)}" loading="lazy" decoding="async">` : site ? `<iframe src="${site}" title="Vista previa de ${escapeHtml(project.name)}" loading="lazy" tabindex="-1"></iframe>` : `<div class="generated-preview"><strong>${escapeHtml(project.name)}</strong><span>${escapeHtml(project.category||'Producto digital')}</span></div>`;
  const chips=(project.technologies||[]).map(item=>`<span>${escapeHtml(item)}</span>`).join('');
  return `<article class="project-card live-card ${project.featured?'featured':''}">
    <a class="live-preview" href="${target||'#'}" ${target?'target="_blank" rel="noreferrer"':''} aria-label="Abrir ${escapeHtml(project.name)}">
      ${image}<span class="open-label">${target?'Abrir aplicación ↗':'Proyecto sin enlace'}</span>
    </a>
    <div class="project-info"><div><small>${escapeHtml(project.category||'Producto digital')} · ${escapeHtml(project.status||'En desarrollo')}</small><h3>${escapeHtml(project.name)}</h3></div><p>${escapeHtml(project.description||'')}</p><div class="chips">${chips}</div></div>
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
    if(!projects.length)return;
    grid.innerHTML=projects.map(projectMarkup).join('');
    document.querySelector('#proyectos .project-links')?.remove();
  }catch(error){console.warn(error)}
}

document.addEventListener('DOMContentLoaded',async()=>{
  await loadManagedProjects();
  if(window.gsap&&window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-copy>*',{opacity:0,y:24,duration:.7,stagger:.08,ease:'power2.out'});
    gsap.from('.hero-card',{opacity:0,x:35,duration:.9,ease:'power2.out'});
    document.querySelectorAll('.skills-grid article,.project-card,.project-links a,.identity-card,.xyz-card,.stats-grid article').forEach((el,i)=>{gsap.from(el,{scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'},opacity:0,y:30,duration:.6,delay:(i%3)*.05,ease:'power2.out'});});
  }
  const statSection=document.querySelector('#estadisticas');
  let counted=false;
  const runCounters=()=>{if(counted)return;counted=true;document.querySelectorAll('[data-count]').forEach(el=>{const target=Number(el.dataset.count);const obj={value:0};if(window.gsap){gsap.to(obj,{value:target,duration:1.5,ease:'power2.out',onUpdate:()=>el.textContent=Math.floor(obj.value).toLocaleString('es-CL')+'+'});}else el.textContent=target.toLocaleString('es-CL')+'+';});};
  if(statSection)new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))runCounters();},{threshold:.3}).observe(statSection);
});