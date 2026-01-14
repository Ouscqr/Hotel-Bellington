import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navbar
      "nav.home": "Home",
      "nav.rooms": "Rooms",
      "nav.location": "Location",
      "nav.contact": "Contact",
      "nav.bookNow": "Book Now",
      
      // Hero
      "hero.title": "Hotel Bellington",
      "hero.subtitle": "Affordable Comfort in the Heart of P.C. Hooftstraat",
      "hero.cta": "Book Your Stay",
      
      // Booking Widget
      "booking.checkIn": "Check In",
      "booking.checkOut": "Check Out",
      "booking.guests": "Guests",
      "booking.guest": "Guest",
      "booking.search": "Check Availability",
      
      // Location Highlights
      "highlights.title": "The Perfect Location",
      "highlights.subtitle": "Situated in Amsterdam's most exclusive shopping district, our hotel offers unparalleled access to the city's finest attractions.",
      "highlights.transport.title": "Excellent Public Transport",
      "highlights.transport.desc": "Located just steps from major tram and metro lines, making it effortless to explore the entire city. Amsterdam Central Station is only 15 minutes away.",
      "highlights.rating.title": "8.3 Rating • 700+ Reviews ",
      "highlights.rating.desc": "Rated 8.3 out of 10 by over 700 satisfied guests. Experience the exceptional service and comfort that our guests love.",
      "highlights.location.title": "Prime Central Location",
      "highlights.location.desc": "Perfectly positioned in the heart of Amsterdam, steps away from iconic landmarks, shopping, and dining destinations.",
      
      // About
      "about.title": "Simple Comfort, Prime Location",
      "about.text": "Nestled on the prestigious P.C. Hooftstraat, Hotel Bellington offers clean and budget-friendly accommodation in the most sought-after district of the city. Our practical rooms provide a perfect and affordable base for travelers who want to be steps away from the Rijksmuseum, Van Gogh Museum, and Vondelpark. Enjoy the luxury of our location without the luxury price tag.",
      
      // Find Us
      "findUs.title": "Find Us",
      "findUs.address": "P.C. Hooftstraat, Amsterdam",
      
      // Footer
      "footer.address": "P.C. Hooftstraat",
      "footer.city": "Amsterdam, Netherlands",
      "footer.phone": "Phone: +31 20 123 4567",
      "footer.email": "Email: info@amsterdamhotel.com",
      "footer.rights": "© 2024 Amsterdam Hotel. All rights reserved.",
      
      // Rooms
      "rooms.title": "Our Rooms",
      "rooms.perNight": "per night",
      "rooms.book": "Book This Room",
      "rooms.deluxe.name": "Basic Single Room",
      "rooms.deluxe.desc": "Clean and cozy room with essentials for a comfortable stay",
      "rooms.suite.name": "Standard Double Room",
      "rooms.suite.desc": "Practical room for two, perfect for city explorers",
      "rooms.penthouse.name": "Triple Room",
      "rooms.penthouse.desc": "Affordable comfort for groups or small families",
      
      // Booking Page
      "bookingPage.title": "Complete Your Booking",
      "bookingPage.summary": "Booking Summary",
      "bookingPage.room": "Room",
      "bookingPage.dates": "Dates",
      "bookingPage.guests": "Guests",
      "bookingPage.nights": "nights",
      "bookingPage.total": "Total",
      "bookingPage.guestDetails": "Guest Details",
      "bookingPage.fullName": "Full Name",
      "bookingPage.email": "Email",
      "bookingPage.phone": "Phone",
      "bookingPage.confirm": "Confirm Booking",
      "bookingPage.confirmed.title": "Booking Confirmed!",
      "bookingPage.confirmed.thanks": "Thank you for choosing Hotel Bellington.",
      "bookingPage.confirmed.email": "A confirmation email has been sent to you.",
      "bookingPage.backHome": "Back to Home",
      
      // Contact
      "contact.title": "Contact Us",
      "contact.subtitle": "Get in touch with us",
      
      // Location
      "location.title": "Our Location",
      "location.address": "P.C. Hooftstraat, Amsterdam"
    }
  },
  es: {
    translation: {
      // Navbar
      "nav.home": "Inicio",
      "nav.rooms": "Habitaciones",
      "nav.location": "Ubicación",
      "nav.contact": "Contacto",
      "nav.bookNow": "Reservar",
      
      // Hero
      "hero.title": "Hotel Bellington",
      "hero.subtitle": "Confort Asequible en el Corazón de P.C. Hooftstraat",
      "hero.cta": "Reserve su Estancia",
      
      // Booking Widget
      "booking.checkIn": "Entrada",
      "booking.checkOut": "Salida",
      "booking.guests": "Huéspedes",
      "booking.guest": "Huésped",
      "booking.search": "Verificar Disponibilidad",
      
      // Location Highlights
      "highlights.title": "La Ubicación Perfecta",
      "highlights.subtitle": "Situado en el distrito comercial más exclusivo de Ámsterdam, nuestro hotel ofrece un acceso incomparable a las mejores atracciones de la ciudad.",
      "highlights.transport.title": "Excelente Transporte Público",
      "highlights.transport.desc": "Acceso sin interrupciones a la extensa red de tranvías, metro y autobuses de Ámsterdam. Explore la ciudad con facilidad desde nuestra ubicación central.",
      "highlights.rating.title": "Calificación 8.3",
      "highlights.rating.desc": "Calificado con 8.3 sobre 10 por más de 700 huéspedes satisfechos. Experimente el servicio excepcional y la comodidad que nuestros huéspedes adoran.",
      "highlights.location.title": "Ubicación Central Premium",
      "highlights.location.desc": "Perfectamente posicionado en el corazón de Ámsterdam, a pasos de monumentos icónicos, tiendas y destinos gastronómicos.",
      
      // About
      "about.title": "Confort Sencillo, Ubicación Prime",
      "about.text": "Ubicado en la prestigiosa P.C. Hooftstraat, el Hotel Bellington ofrece alojamiento limpio y económico en el distrito más codiciado de la ciudad. Nuestras habitaciones prácticas proporcionan una base perfecta y asequible para los viajeros que desean estar a pasos del Rijksmuseum, el Museo Van Gogh y el Vondelpark. Disfrute del lujo de nuestra ubicación sin el precio del lujo.",
      
      // Find Us
      "findUs.title": "Encuéntrenos",
      "findUs.address": "P.C. Hooftstraat, Ámsterdam",
      
      // Footer
      "footer.address": "P.C. Hooftstraat",
      "footer.city": "Ámsterdam, Países Bajos",
      "footer.phone": "Teléfono: +31 20 123 4567",
      "footer.email": "Correo: info@amsterdamhotel.com",
      "footer.rights": "© 2024 Hotel Bellington. Todos los derechos reservados.",
      
      // Rooms
      "rooms.title": "Nuestras Habitaciones",
      "rooms.perNight": "por noche",
      "rooms.book": "Reservar Esta Habitación",
      "rooms.deluxe.name": "Habitación Individual Básica",
      "rooms.deluxe.desc": "Habitación limpia y acogedora con lo esencial para una estancia cómoda",
      "rooms.suite.name": "Habitación Doble Estándar",
      "rooms.suite.desc": "Habitación práctica para dos, perfecta para exploradores de la ciudad",
      "rooms.penthouse.name": "Habitación Triple",
      "rooms.penthouse.desc": "Confort asequible para grupos o familias pequeñas",
      
      // Booking Page
      "bookingPage.title": "Complete su Reserva",
      "bookingPage.summary": "Resumen de Reserva",
      "bookingPage.room": "Habitación",
      "bookingPage.dates": "Fechas",
      "bookingPage.guests": "Huéspedes",
      "bookingPage.nights": "noches",
      "bookingPage.total": "Total",
      "bookingPage.guestDetails": "Datos del Huésped",
      "bookingPage.fullName": "Nombre Completo",
      "bookingPage.email": "Correo Electrónico",
      "bookingPage.phone": "Teléfono",
      "bookingPage.confirm": "Confirmar Reserva",
      "bookingPage.confirmed.title": "¡Reserva Confirmada!",
      "bookingPage.confirmed.thanks": "Gracias por elegir Hotel Bellington.",
      "bookingPage.confirmed.email": "Se le ha enviado un correo de confirmación.",
      "bookingPage.backHome": "Volver al Inicio",
      
      // Contact
      "contact.title": "Contáctenos",
      "contact.subtitle": "Póngase en contacto con nosotros",
      
      // Location
      "location.title": "Nuestra Ubicación",
      "location.address": "P.C. Hooftstraat, Ámsterdam"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
