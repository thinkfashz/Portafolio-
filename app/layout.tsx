import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eduardo Micolta — Full Stack & AI',
  description: 'Productos digitales, automatización e inteligencia artificial.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}