const dynamicStyles=document.createElement('link');
dynamicStyles.rel='stylesheet';
dynamicStyles.href='projects-dynamic.css';
document.head.appendChild(dynamicStyles);

const menuButton=document.querySelector('.menu-button');
const menu=document.querySelector('#menu');
menuButton?.addEventListener('click',()=>{const isOpen=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(isOpen))});
menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')}));
document.addEventListener('click',event=>{if(!menu?.contains(event.target)&&!menuButton?.contains(event.target)){menu?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')}});

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});
function reveal(elements){elements.forEach((element,index)=>{element.classList.add('reveal');element.style.transitionDelay=`${Math.min(index%4,3)*70}ms`;observer.observe(element)})}

function safeUrl(value=''){try{const url=new URL(value,location.origin);return ['http:','https:'].includes(url.protocol)?url.href:''}catch{return ''}}
function fallbackPreview(project){const labels={
  'preview-fabrick':'Tu proyecto comienza con números claros.',
  'preview-omnifix':'Tecnología que eleva tu día.',
  'preview-osart':'Catálogo industrial y fichas técnicas.',
  'preview-vivazza':'Experiencia gastronómica mobile first.'
};return `<div class="generated-preview"><small>${project.category||'Producto digital'}</small><strong>${labels[project.previewClass]||project.name}</strong><span>${(project.technologies||[]).slice(0,3).join(' · ')}</span></div>`}
function projectCard(project,index){const image=project.image?`<img src="${safeUrl(project.image)||project.image}" alt="${project.imageAlt||`Vista de ${project.name}`}" loading="lazy" decoding="async">`:fallbackPreview(project);const highlights=(project.highlights||[]).map(item=>`<li>${item}</li>`).join('');const technologies=(project.technologies||[]).map(item=>`<span>${item}</span>`).join('');const site=safeUrl(project.siteUrl);const repo=safeUrl(project.repoUrl);return `<article class="project-card ${project.featured?'featured':''}">
  <div class="project-preview ${project.previewClass||''}">
    <div class="browser-bar"><span></span><span></span><span></span><small>${site?new URL(site).hostname:project.name}</small></div>
    <div class="project-media">${image}</div>
  </div>
  <div class="project-body">
    <div class="project-meta"><span>${project.category||'Producto digital'}</span><span class="status">${project.status||'En desarrollo'}</span></div>
    <h3>${project.name}</h3>
    <p>${project.description||''}</p>
    ${highlights?`<ul class="feature-list">${highlights}</ul>`:''}
    ${technologies?`<div class="project-tech">${technologies}</div>`:''}
    <div class="project-actions">${site?`<a class="text-link" href="${site}" target="_blank" rel="noreferrer">Abrir producto ↗</a>`:''}${repo?`<a class="text-link" href="${repo}" target="_blank" rel="noreferrer">Código ↗</a>`:''}</div>
  </div>
</article>`}

async function loadProjects(){const grid=document.querySelector('.project-grid');if(!grid)return;try{const response=await fetch(`projects.json?v=${Date.now()}`,{cache:'no-store'});if(!response.ok)throw new Error('No se pudo cargar projects.json');const data=await response.json();const projects=(data.projects||[]).filter(project=>project.published!==false);if(!projects.length)return;grid.innerHTML=projects.map(projectCard).join('');document.querySelector('.more-projects')?.remove();reveal([...grid.querySelectorAll('.project-card')])}catch(error){console.warn(error);reveal([...document.querySelectorAll('.project-card,.more-projects a')])}}

loadProjects();
reveal([...document.querySelectorAll('.method-grid article,.capabilities article,.stack-grid article')]);
