import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useScroll } from '../hooks/useScroll';
import { Button } from './Button';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';
import { AnimatePresence, motion } from 'framer-motion';

export function Navbar() {
  const scrolled = useScroll(20);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleBookNow = () => {
    window.open('https://bookingengine.mylighthouse.com/hotel-bellington-amsterdam', '_blank');
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || isOpen ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto flex items-center justify-between relative px-6 py-4">
        <Link to="/" className="text-2xl font-bold font-heading text-primary-light z-50 relative">
           {/* Logo Text if needed */}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={clsx(
                'text-sm font-medium transition-colors hover:text-accent',
                scrolled ? 'text-gray-200' : 'text-white/90'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector scrolled={scrolled} />
          <Button variant={scrolled ? 'primary' : 'secondary'} size="sm" onClick={handleBookNow}>
            {t('nav.bookNow')}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="text-white" size={28} />
          ) : (
            <Menu className={scrolled ? 'text-white' : 'text-white'} size={28} />
          )}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#09090b] border-t border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-lg font-medium text-white/90 hover:text-primary transition-colors py-2 border-b border-white/5 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-2">
                 <LanguageSelector mobile />
              </div>
              
              <div className="pt-2">
                <Button fullWidth onClick={() => { setIsOpen(false); handleBookNow(); }}>
                  {t('nav.bookNow')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
