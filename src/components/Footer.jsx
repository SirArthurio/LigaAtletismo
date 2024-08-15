import React from 'react';

const FooterSection = ({ title, links }) => (
  <nav>
    <h3 className="text-[#f2f2f2] font-bold">{title}</h3>
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href} className="hover:text-[#f2f2f2]">
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export const Footer = () => (
  <footer className="bg-[#0d0d0d] px-6 py-8 text-[#9b9b9b] text-sm">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <FooterSection
        title="Compañía"
        links={[
          { href: '#', text: 'Sobre Nosotros' },
          { href: '#', text: 'Contacto' },
          { href: '#', text: 'Empleo' },
        ]}
      />
      <FooterSection
        title="Patrocinadores"
        links={[
          { href: 'https://electrolit.com.co/', text: 'Electrolit' },
        ]}
      />
      <FooterSection
        title="Legal"
        links={[
          { href: '#', text: 'Términos y Condiciones' },
          { href: '#', text: 'Política de Privacidad' },
          { href: '#', text: 'Política de Cookies' },
        ]}
      />
    </div>
    <div className="mt-8 text-center">&copy; 2024 Liga de Atlestismo del Cesar. Todos los derechos reservados.</div>
  </footer>
);
