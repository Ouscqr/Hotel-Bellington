import { RoomCard } from '../components/RoomCard';

const ROOMS = [
  {
    id: 'deluxe',
    name: 'Deluxe King Room',
    description: 'Experience ultimate comfort in our spacious Deluxe King Room. Featuring a king-size bed, marble bathroom, and city views.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    size: 35,
    capacity: 2
  },
  {
    id: 'suite',
    name: 'Executive Suite',
    description: 'Our Executive Suite offers a separate living area, premium amenities, and stunning views of P.C. Hooftstraat.',
    price: 550,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    size: 55,
    capacity: 3
  },
  {
    id: 'penthouse',
    name: 'Royal Penthouse',
    description: 'The pinnacle of luxury. Private terrace, panoramic views, and bespoke service for an unforgettable stay.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    size: 120,
    capacity: 4
  }
];

export function Rooms() {
  return (
    <div className="pt-24 container section">
      <h1 className="text-4xl font-heading mb-8 text-center">Our Rooms & Suites</h1>
      <div className="grid gap-8">
        {ROOMS.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
}
