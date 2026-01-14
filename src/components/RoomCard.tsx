import { Users, Wifi, Coffee, Maximize } from 'lucide-react';
import { Button } from './Button';
import { useBooking } from '../context/BookingContext';
import { getBookingUrl } from '../utils/bookingUtils';

interface RoomProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  size: number;
  capacity: number;
}

export function RoomCard({ name, description, price, image, size, capacity }: RoomProps) {
  const { checkIn, checkOut, guests } = useBooking();

  const handleBook = () => {
    const url = getBookingUrl(checkIn, checkOut, guests);
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#18181b] rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl flex flex-col md:flex-row border border-zinc-800">
      <div className="md:w-1/2 h-64 md:h-auto relative">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 md:w-1/2 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-heading text-white">{name}</h3>
            <span className="text-xl font-bold text-accent">€{price}<span className="text-sm text-gray-400 font-normal">/night</span></span>
          </div>
          <p className="text-gray-300 mb-4">{description}</p>
          
          <div className="flex gap-4 text-gray-400 text-sm mb-6">
            <div className="flex items-center gap-1"><Users size={16} /> {capacity} Guests</div>
            <div className="flex items-center gap-1"><Maximize size={16} /> {size} m²</div>
            <div className="flex items-center gap-1"><Wifi size={16} /> Free Wifi</div>
            <div className="flex items-center gap-1"><Coffee size={16} /> Breakfast</div>
          </div>
        </div>
        
        <Button onClick={handleBook} fullWidth>Book This Room</Button>
      </div>
    </div>
  );
}
