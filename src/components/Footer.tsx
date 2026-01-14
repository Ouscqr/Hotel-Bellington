import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-heading mb-4 text-accent">Hotel Bellington</h3>
          <p className="text-gray-400 mb-2"> Pieter Cornelisz Hooftstraat 78-B</p>
          <p className="text-gray-400">1071CB, Amsterdam</p>
          <p className="text-gray-400">The Netherlands</p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Links</h4>
          <ul className="space-y-2">
            {/* <li><Link to="/rooms" className="text-gray-400 hover:text-white">Rooms & Suites</Link></li> */}
            {/* <li><Link to="/location" className="text-gray-400 hover:text-white">Location</Link></li> */}
            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            {/* <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li> */}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <p className="text-gray-400 mb-2">020 671 6478</p>
          <p className="text-gray-400">info@hotel-bellington.com</p>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Hotel Bellington. All rights reserved.
      </div>
    </footer>
  );
}
