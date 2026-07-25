'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Mail, Sparkles } from 'lucide-react';
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiSupabase, SiVercel, SiOpenai, SiCloudflare } from 'react-icons/si';

const technologies = [
  ['React', SiReact], ['Next.js', SiNextdotjs], ['TypeScript', SiTypescript], ['Node.js', SiNodedotjs],
  ['InsForge', Sparkles], ['Supabase', SiSupabase], ['Vercel', SiVercel], ['Cloudflare', SiCloudflare], ['OpenAI', SiOpenai],
] as const;

const projects = [
  { name: 'Soluciones Fabrick', type: 'SaaS empresarial', description: 'Ventas, presupuestos, clientes, pagos y operación en una experiencia unificada.', url: 'https://solucionesfabrick.com', tags: ['Next.js', 'TypeScript', 'Pagos'] },
  { name: 'Omnifix', type: 'E-commerce', description: 'Catálogo, búsqueda, carrito y administración para una experiencia de compra rápida.', url: 'https://omnifixshop.vercel.app', tags: ['React', 'Cloudflare', 'Sentry'] },
  { name: 'Osart', type: 'Industria + IA', description: 'Catálogo técnico con búsqueda inteligente y arquitectura de datos escalable.', url: '#', tags: ['Next.js', 'InsForge', 'GenAI'] },
];

export default function HomePage() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top">EM<span>.</span></a>
        <div className="navLinks"><a href="#proyectos">Proyectos</a><a href="#stack">Stack</a><a href="/admin">Admin</a></div>
      </nav>

      <section id="top" className="hero shell">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <p className="eyebrow"><Sparkles size={15}/> Full Stack · IA · Producto</p>
          <h1>Software elegante para problemas <span>que sí importan.</span></h1>
          <p className="lead">Diseño y desarrollo productos digitales rápidos, claros y preparados para crecer.</p>
          <div className="actions"><a className="button primary" href="#proyectos">Explorar proyectos <ArrowUpRight size={17}/></a><a className="button" href="mailto:f.eduardomicolta@gmail.com"><Mail size={17}/> Contactar</a></div>
        </motion.div>
        <motion.aside className="signalCard" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .15 }}>
          <span className="status">● Disponible</span><small>Eduardo Micolta</small><strong>Full Stack Developer</strong>
          <div className="facts"><p><span>Base</span> Linares, Chile</p><p><span>Enfoque</span> Web · SaaS · IA</p><p><span>Backend</span> InsForge + Supabase</p></div>
        </motion.aside>
      </section>

      <section id="proyectos" className="shell section">
        <header className="sectionHead"><p className="eyebrow">Trabajo seleccionado</p><h2>Aplicaciones con presencia de producto.</h2></header>
        <div className="projects">{projects.map((project, index) => <motion.article className="project" key={project.name} whileHover={{ y: -7 }}>
          <div className={`projectVisual visual${index + 1}`}><span>0{index + 1}</span><b>{project.name}</b></div>
          <div className="projectBody"><small>{project.type}</small><h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href={project.url} target={project.url === '#' ? undefined : '_blank'} rel="noreferrer">Ver proyecto <ArrowUpRight size={16}/></a></div>
        </motion.article>)}</div>
      </section>

      <section id="stack" className="shell section">
        <header className="sectionHead"><p className="eyebrow">Tecnologías</p><h2>Un stack moderno, visible y entendible.</h2></header>
        <div className="techGrid">{technologies.map(([name, Icon]) => <div className="tech" key={name}><Icon size={28}/><span>{name}</span></div>)}</div>
      </section>

      <section className="shell section"><div className="cta"><p className="eyebrow">Nuevo proyecto</p><h2>Construyamos algo útil.</h2><div className="actions"><a className="button primary" href="mailto:f.eduardomicolta@gmail.com"><Mail size={17}/> Escribir</a><a className="button" href="https://github.com/thinkfashz"><Github size={17}/> GitHub</a></div></div></section>
    </main>
  );
}