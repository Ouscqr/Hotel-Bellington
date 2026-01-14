import { Button } from '../components/Button';
import { BookingWidget } from '../components/BookingWidget';
import { Train, Star, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export function Home() {
  const { t } = useTranslation();
  // const { checkIn, checkOut, guests } = useBooking(); // Removed unused

  const handleBookNow = () => {
    window.open('https://bookingengine.mylighthouse.com/hotel-bellington-amsterdam', '_blank');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/ams3.jpg" 
            alt="Hotel Bellington Amsterdam" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
        </div>

        <div className="relative z-10 text-center container px-4">
          <h1 className="text-5xl md:text-7xl font-heading mb-6 text-white drop-shadow-lg">{t('hero.title')}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90 drop-shadow-md">{t('hero.subtitle')}</p>
          <Button size="lg" variant="primary" onClick={handleBookNow}>{t('hero.cta')}</Button>
        </div>
      </section>

      <div className="container px-4">
        <BookingWidget />
      </div>
      
      {/* Location Highlights */}
      <section className="section container bg-[#121212]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading mb-4 text-white">{t('highlights.title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('highlights.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="mb-6 inline-block p-4 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors duration-300">
              <Train size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3 text-white">{t('highlights.transport.title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('highlights.transport.desc')}
            </p>
          </div>

          <div className="text-center group">
            <div className="mb-6 inline-block p-4 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors duration-300">
              <Star size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3 text-white">{t('highlights.rating.title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('highlights.rating.desc')}
            </p>
          </div>

          <div className="text-center group">
            <div className="mb-6 inline-block p-4 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors duration-300">
              <MapPin size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3 text-white">{t('highlights.location.title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('highlights.location.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#1F1F1F] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="container grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
             <img 
              src="/images/rijks2.webp" 
              alt="Hotel Bellington Interior" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-heading mb-6 text-white">{t('about.title')}</h2>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              {t('about.text')}
            </p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Pieter+Cornelisz+Hooftstraat+78-B,+1071CB+Amsterdam" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-accent font-medium hover:text-white transition-colors cursor-pointer group"
            >
              <MapPin size={20} className="group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline">Pieter Cornelisz Hooftstraat 78-B, 1071CB Amsterdam</span>
            </a>
          </div>
        </div>
      </section>

      {/* Find Us Section */}
      <section className="section bg-[#121212]">
        <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading mb-4 text-white">{t('findUs.title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('findUs.address')}
          </p>
        </div>
        
        <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.608356482453!2d4.876543315801485!3d52.35975697978441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609e2c3c3c3c3%3A0x1234567890abcdef!2sP.C.%20Hooftstraat%2C%20Amsterdam!5e0!3m2!1sen!2snl!4v1625000000000!5m2!1sen!2snl" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Hotel Location"
          ></iframe>
        </div>
        </div>
      </section>
    </div>
  );
}
