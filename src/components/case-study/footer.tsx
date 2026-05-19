import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-white border-t border-black/10">
      <div className="max-w-[1200px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Studio */}
          <div>
            <h3 
              className="text-sm tracking-[0.15em] uppercase mb-6"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-black)',
                fontWeight: 500
              }}
            >
              Studio
            </h3>
            <ul className="space-y-3">
              {['About', 'Philosophy', 'Team', 'Careers'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#"
                    className="text-sm hover:text-[#C8BBAA] transition-colors duration-300"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-text-grey)'
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 
              className="text-sm tracking-[0.15em] uppercase mb-6"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-black)',
                fontWeight: 500
              }}
            >
              Projects
            </h3>
            <ul className="space-y-3">
              {['Residential', 'Commercial', 'Hospitality', 'Interiors'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#"
                    className="text-sm hover:text-[#C8BBAA] transition-colors duration-300"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-text-grey)'
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 
              className="text-sm tracking-[0.15em] uppercase mb-6"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-black)',
                fontWeight: 500
              }}
            >
              Services
            </h3>
            <ul className="space-y-3">
              {['Architecture', 'Interior Design', 'Master Planning', 'Consulting'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#"
                    className="text-sm hover:text-[#C8BBAA] transition-colors duration-300"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-text-grey)'
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 
              className="text-sm tracking-[0.15em] uppercase mb-6"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-black)',
                fontWeight: 500
              }}
            >
              Contact
            </h3>
            <div 
              className="space-y-3 text-sm"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-text-grey)'
              }}
            >
              <p>1234 Design Avenue</p>
              <p>Los Angeles, CA 90028</p>
              <p className="pt-3">+1 (310) 555-0123</p>
              <p>
                <a 
                  href="mailto:hello@wanderlustarch.com"
                  className="hover:text-[#C8BBAA] transition-colors duration-300"
                >
                  hello@wanderlustarch.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div 
            className="text-3xl tracking-tight"
            style={{ 
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-black)'
            }}
          >
            Wanderlust Architects
          </div>

          <div className="flex gap-8">
            {['Instagram', 'LinkedIn', 'Behance'].map((item, index) => (
              <a 
                key={index}
                href="#"
                className="text-sm hover:text-[#C8BBAA] transition-colors duration-300"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-grey)'
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div 
          className="text-center md:text-left mt-12 text-xs"
          style={{ 
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-text-grey)'
          }}
        >
          © 2026 Wanderlust Architects. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
