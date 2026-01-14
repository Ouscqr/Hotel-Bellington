import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface LanguageSelectorProps {
  scrolled?: boolean;
  mobile?: boolean;
}

export function LanguageSelector({ scrolled, mobile }: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'es', label: 'Español', short: 'ES' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  if (mobile) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
          <Globe size={14} />
          Select Language
        </div>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={clsx(
                'flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all',
                i18n.language === lang.code
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              )}
            >
              {lang.label}
              {i18n.language === lang.code && <Check size={16} />}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent',
          scrolled ? 'text-gray-200' : 'text-white/90'
        )}
        aria-label="Select language"
      >
        <Globe size={16} />
        <span>{currentLang.short}</span>
        <ChevronDown 
          size={14} 
          className={clsx("transition-transform duration-300", isOpen && "rotate-180")} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 bg-[#18181b] border border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50"
          >
            <div className="p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={clsx(
                    'w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors',
                    i18n.language === lang.code
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <span className="font-medium">{lang.label}</span>
                  {i18n.language === lang.code && <Check size={14} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
