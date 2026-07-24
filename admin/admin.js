const form=document.querySelector('#contentForm');
const tabs=[...document.querySelectorAll('.section-tab')];
const panels=[...document.querySelectorAll('[data-panel]')];
const frame=document.querySelector('#previewFrame');
const stateLabel=document.querySelector('#saveState');
let originalContent={};
let content={};

const clone=value=>JSON.parse(JSON.stringify(value));
const getPath=(object,path)=>path.split('.').reduce((value,key)=>value?.[key],object);
function setPath(object,path,value){
  const keys=path.split('.');
  const last=keys.pop();
  const target=keys.reduce((current,key)=>(current[key]??={}),object);
  target[last]=value;
}

async function loadContent(){
  const response=await fetch(`/content.json?v=${Date.now()}`,{cache:'no-store'});
  if(!response.ok)throw new Error('No se pudo cargar content.json');
  originalContent=await response.json();
  const draft=localStorage.getItem('portfolio-content-draft');
  content=draft?JSON.parse(draft):clone(originalContent);
  form.querySelectorAll('[name]').forEach(field=>field.value=getPath(content,field.name)||'');
  refreshPreview();
}

function refreshPreview(){
  try{
    const doc=frame.contentDocument;
    if(!doc)return;
    doc.querySelectorAll('[data-content]').forEach(element=>{
      const value=getPath(content,element.dataset.content);
      if(typeof value==='string')element.textContent=value;
    });
  }catch{}
}

function saveDraft(){
  localStorage.setItem('portfolio-content-draft',JSON.stringify(content));
  stateLabel.textContent='Borrador guardado';
  refreshPreview();
}

form.addEventListener('input',event=>{
  const field=event.target;
  if(!field.name)return;
  setPath(content,field.name,field.value);
  stateLabel.textContent='Guardando…';
  window.clearTimeout(form.saveTimer);
  form.saveTimer=window.setTimeout(saveDraft,250);
});

frame.addEventListener('load',refreshPreview);

tabs.forEach(tab=>tab.addEventListener('click',()=>{
  tabs.forEach(item=>item.classList.toggle('active',item===tab));
  panels.forEach(panel=>panel.classList.toggle('hidden',panel.dataset.panel!==tab.dataset.section));
  document.querySelector('#sectionTitle').textContent=tab.textContent;
}));

document.querySelectorAll('[data-width]').forEach(button=>button.addEventListener('click',()=>frame.style.width=button.dataset.width));

document.querySelector('#resetButton').addEventListener('click',()=>{
  if(!confirm('¿Restaurar el contenido original?'))return;
  localStorage.removeItem('portfolio-content-draft');
  content=clone(originalContent);
  form.querySelectorAll('[name]').forEach(field=>field.value=getPath(content,field.name)||'');
  stateLabel.textContent='Restaurado';
  refreshPreview();
});

document.querySelector('#exportButton').addEventListener('click',()=>{
  const blob=new Blob([JSON.stringify(content,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');
  link.href=url;
  link.download='content.json';
  link.click();
  URL.revokeObjectURL(url);
  stateLabel.textContent='JSON exportado';
});

loadContent().catch(error=>{stateLabel.textContent=error.message});