import { useBooking } from '../context/BookingContext';
import { format, differenceInDays } from 'date-fns';
import { Button } from '../components/Button';
import { useState } from 'react';

export function Booking() {
  const { checkIn, checkOut, guests, selectedRoomId } = useBooking();
  const [step, setStep] = useState<'details' | 'confirm'>('details');

  const nights = differenceInDays(checkOut, checkIn);
  // Mock room lookup (in real app, fetch from ID)
  const roomPrice = selectedRoomId === 'penthouse' ? 1200 : selectedRoomId === 'suite' ? 550 : 350;
  const roomName = selectedRoomId === 'penthouse' ? 'Royal Penthouse' : selectedRoomId === 'suite' ? 'Executive Suite' : 'Deluxe King Room';
  const total = roomPrice * nights;

  if (!selectedRoomId) {
    return (
      <div className="pt-32 container text-center">
        <h2 className="text-2xl mb-4">Please select a room first.</h2>
        <Button onClick={() => window.location.href = '/rooms'}>View Rooms</Button>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="pt-32 container max-w-2xl text-center">
        <div className="bg-[#18181b] p-8 rounded-lg border border-green-500/30 mb-8">
          <h1 className="text-3xl font-heading text-green-400 mb-4">Booking Confirmed!</h1>
          <p className="text-green-300 mb-4">Thank you for choosing Amsterdam Hotel.</p>
          <p className="text-gray-400">A confirmation email has been sent to you.</p>
        </div>
        <Button onClick={() => window.location.href = '/'}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="pt-32 container section max-w-4xl">
      <h1 className="text-3xl font-heading mb-8 text-white">Complete Your Booking</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#18181b] p-6 rounded-lg shadow-md h-fit border border-zinc-800">
          <h3 className="text-xl font-bold mb-4 text-primary-light">Booking Summary</h3>
          <div className="space-y-4 text-gray-300">
            <div className="flex justify-between">
              <span>Room:</span>
              <span className="font-medium text-white">{roomName}</span>
            </div>
            <div className="flex justify-between">
              <span>Check In:</span>
              <span className="font-medium text-white">{format(checkIn, 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex justify-between">
              <span>Check Out:</span>
              <span className="font-medium text-white">{format(checkOut, 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex justify-between">
              <span>Guests:</span>
              <span className="font-medium text-white">{guests}</span>
            </div>
            <div className="flex justify-between">
              <span>Nights:</span>
              <span className="font-medium text-white">{nights}</span>
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-bold text-accent">
              <span>Total:</span>
              <span>€{total}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#18181b] p-6 rounded-lg shadow-md border border-zinc-800">
            <h3 className="text-xl font-bold mb-4 text-white">Guest Details</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep('confirm'); }}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input required type="text" className="w-full p-2 border border-zinc-700 rounded-md bg-[#27272a] text-white focus:border-primary focus:ring-primary" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input required type="email" className="w-full p-2 border border-zinc-700 rounded-md bg-[#27272a] text-white focus:border-primary focus:ring-primary" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                <input required type="tel" className="w-full p-2 border border-zinc-700 rounded-md bg-[#27272a] text-white focus:border-primary focus:ring-primary" placeholder="+31 6 12345678" />
              </div>
              
              <Button type="submit" fullWidth size="lg" className="mt-4">Confirm Booking</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
