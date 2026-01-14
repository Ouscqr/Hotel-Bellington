import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useScroll } from '../hooks/useScroll';
import { Button } from './Button';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';
export function Navbar() {
  const scrolled = useScroll(20);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  // const { checkIn, checkOut, guests } = useBooking(); // Removed unused

  // const handleBookNow = () => {
  //   const url = getBookingUrl(checkIn, checkOut, guests);
  //   window.open(url, '_blank');
  // };

  const handleBookNow = () => {
    window.open('https://bookingengine.mylighthouse.com/hotel-bellington-amsterdam', '_blank');
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    // { name: t('nav.rooms'), path: '/rooms' },
    // { name: t('nav.location'), path: '/location' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-[#09090b]/95 backdrop-blur-md shadow-md py-4 border-b border-white/5' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto flex items-center justify-between relative">
        <Link to="/" className="text-2xl font-bold font-heading text-primary-light">
          {/* <span className={clsx(scrolled ? 'text-primary-light' : 'text-white')}>
            Hotel Belligton
          </span> */}
        </Link>

        {/* Desktop Nav - Centered Links */}
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

        {/* Desktop Actions - Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector scrolled={scrolled} />
          <Button variant={scrolled ? 'primary' : 'secondary'} size="sm" onClick={handleBookNow}>
            {t('nav.bookNow')}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className={scrolled ? 'text-gray-800' : 'text-white'} />
          ) : (
            <Menu className={scrolled ? 'text-gray-800' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-800 font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <LanguageSelector mobile />
          <Button fullWidth onClick={() => { setIsOpen(false); handleBookNow(); }}>
            {t('nav.bookNow')}
          </Button>
        </div>
      )}
    </nav>
  );
}
