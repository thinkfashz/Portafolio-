'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, GithubIcon, Mail, Sparkles, ExternalLink, Layers3, Zap, ShieldCheck, Bot } from 'lucide-react';
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiSupabase, SiVercel, SiCloudflare, SiTailwindcss, SiPostgresql, SiGithub, SiFigma } from 'react-icons/si';

const technologies = [
  ['React', SiReact], ['Next.js', SiNextdotjs], ['TypeScript', SiTypescript], ['Node.js', SiNodedotjs],
  ['InsForge', Sparkles], ['Supabase', SiSupabase], ['PostgreSQL', SiPostgresql], ['Tailwind', SiTailwindcss],
  ['Vercel', SiVercel], ['Cloudflare', SiCloudflare], ['GitHub', SiGithub], ['Figma', SiFigma], ['OpenAI', Bot],
] as const;

const projects = [
  { name: 'Soluciones Fabrick', type: 'SaaS empresarial', description: 'Una plataforma integral para ventas, presupuestos, clientes, pagos y operación.', url: 'https://solucionesfabrick.com', tags: ['Next.js', 'TypeScript', 'Pagos'], accent: 'cyan' },
  { name: 'Omnifix', type: 'E-commerce', description: 'Catálogo, búsqueda, carrito y administración con una experiencia de compra ágil.', url: 'https://omnifixshop.vercel.app', tags: ['React', 'Cloudflare', 'Sentry'], accent: 'violet' },
  { name: 'Osart', type: 'Industria + IA', description: 'Catálogo técnico con búsqueda inteligente y una arquitectura preparada para escalar.', url: '#', tags: ['Next.js', 'InsForge', 'GenAI'], accent: 'blue' },
];

const strengths = [
  [Layers3, 'Producto completo', 'Diseño, frontend, datos y despliegue en una sola visión.'],
  [Zap, 'Velocidad real', 'Iteraciones rápidas sin perder claridad ni mantenibilidad.'],
  [ShieldCheck, 'Base sólida', 'Arquitecturas pensadas para crecer y operar con confianza.'],
] as const;

export default function HomePage() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top">EM<span>.</span></a>
        <div className="navLinks"><a href="#proyectos">Proyectos</a><a href="#stack">Stack</a><a href="#contacto">Contacto</a><a className="adminNav" href="/admin">Admin</a></div>
      </nav>

      <section id="top" className="hero shell">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <p className="eyebrow"><Sparkles size={15}/> Full Stack · IA · Producto</p>
          <h1>Creo software con <span>presencia, velocidad y criterio.</span></h1>
          <p className="lead">Aplicaciones modernas para vender, automatizar y convertir procesos complejos en experiencias simples.</p>
          <div className="actions"><a className="button primary" href="#proyectos">Ver proyectos <ArrowUpRight size={17}/></a><a className="button" href="mailto:f.eduardomicolta@gmail.com"><Mail size={17}/> Contactar</a></div>
          <div className="heroProof"><span>5+ años desarrollando</span><span>Productos reales</span><span>Chile</span></div>
        </motion.div>
        <motion.aside className="signalCard" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .15 }}>
          <div className="signalGlow" />
          <span className="status">● Disponible</span><small>Eduardo Micolta</small><strong>Full Stack Developer</strong>
          <div className="facts"><p><span>Base</span> Linares, Chile</p><p><span>Enfoque</span> SaaS · E-commerce · IA</p><p><span>Stack</span> React · Next.js · InsForge</p></div>
        </motion.aside>
      </section>

      <section className="shell strengths">
        {strengths.map(([Icon, title, text]) => <article key={title}><Icon size={20}/><div><h3>{title}</h3><p>{text}</p></div></article>)}
      </section>

      <section id="proyectos" className="shell section">
        <header className="sectionHead"><p className="eyebrow">Trabajo seleccionado</p><h2>Aplicaciones que se sienten como producto.</h2><p>Menos tarjetas genéricas. Más contexto, presencia visual y foco en el resultado.</p></header>
        <div className="projects">{projects.map((project, index) => <motion.article className={`project accent-${project.accent}`} key={project.name} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
          <div className={`projectVisual visual${index + 1}`}><div className="windowChrome"><span/><span/><span/></div><div className="mockPanel"><small>{project.type}</small><b>{project.name}</b><div className="mockStats"><i/><i/><i/></div></div><span className="projectNumber">0{index + 1}</span></div>
          <div className="projectBody"><small>{project.type}</small><h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href={project.url} target={project.url === '#' ? undefined : '_blank'} rel="noreferrer">Ver proyecto <ExternalLink size={16}/></a></div>
        </motion.article>)}</div>
      </section>

      <section id="stack" className="shell section">
        <header className="sectionHead"><p className="eyebrow">Tecnologías</p><h2>Un stack moderno, visible y bien organizado.</h2></header>
        <div className="techGrid">{technologies.map(([name, Icon]) => <motion.div className="tech" key={name} whileHover={{ y: -4, scale: 1.01 }}><span className="techIcon"><Icon size={26}/></span><span>{name}</span></motion.div>)}</div>
      </section>

      <section id="contacto" className="shell section"><div className="cta"><div><p className="eyebrow">Nuevo proyecto</p><h2>Construyamos algo que se vea bien y funcione mejor.</h2></div><div className="actions"><a className="button primary" href="mailto:f.eduardomicolta@gmail.com"><Mail size={17}/> Escribir</a><a className="button" href="https://github.com/thinkfashz" target="_blank" rel="noreferrer"><GithubIcon size={17}/> GitHub</a></div></div></section>
    </main>
  );
}
