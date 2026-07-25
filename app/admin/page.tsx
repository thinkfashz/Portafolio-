'use client';

import { FormEvent, useState } from 'react';
import { Eye, Save, Database, Blocks } from 'lucide-react';
import { savePortfolioContent, type PortfolioContent } from '@/lib/backend';

const initial: PortfolioContent = {
  heroTitle: 'Software elegante para problemas que sí importan.',
  heroSubtitle: 'Diseño y desarrollo productos digitales rápidos, claros y preparados para crecer.',
  contactLabel: 'Hablemos de tu proyecto',
};

export default function AdminPage() {
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState('Borrador local');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus('Guardando…');
    try {
      const result = await savePortfolioContent(content);
      setStatus(`Guardado en ${result.provider}`);
    } catch (error) {
      localStorage.setItem('portfolio-content', JSON.stringify(content));
      setStatus(error instanceof Error ? `${error.message} Borrador guardado localmente.` : 'Borrador local guardado');
    }
  }

  return <main className="adminPage">
    <aside className="adminSidebar"><a className="brand" href="/">EM<span>.</span></a><p>Editor</p><nav><a className="active"><Blocks size={17}/> Contenido</a><a><Database size={17}/> Datos</a><a href="/"><Eye size={17}/> Ver sitio</a></nav><small>React Bricks se activará aquí cuando se añadan el App ID y la API key.</small></aside>
    <section className="adminWorkspace"><header><div><p className="eyebrow">Portfolio CMS</p><h1>Editar presentación</h1></div><span className="saveState">{status}</span></header>
      <div className="editorLayout"><form className="editorPanel" onSubmit={submit}>
        <label>Título principal<textarea value={content.heroTitle} onChange={e => setContent({...content, heroTitle:e.target.value})}/></label>
        <label>Descripción<textarea value={content.heroSubtitle} onChange={e => setContent({...content, heroSubtitle:e.target.value})}/></label>
        <label>Texto de contacto<input value={content.contactLabel} onChange={e => setContent({...content, contactLabel:e.target.value})}/></label>
        <button className="button primary" type="submit"><Save size={17}/> Guardar cambios</button>
      </form>
      <div className="livePreview"><span className="previewLabel">Vista previa</span><div><p className="eyebrow">Full Stack · IA · Producto</p><h2>{content.heroTitle}</h2><p>{content.heroSubtitle}</p><button className="button primary">{content.contactLabel}</button></div></div></div>
    </section>
  </main>;
}