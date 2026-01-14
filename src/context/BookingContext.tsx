import { createContext, useContext, useState, type ReactNode } from 'react';


interface BookingState {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  selectedRoomId: string | null;
}

interface BookingContextType extends BookingState {
  setCheckIn: (date: Date | null) => void;
  setCheckOut: (date: Date | null) => void;
  setGuests: (count: number) => void;
  setSelectedRoomId: (id: string | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(2);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  return (
    <BookingContext.Provider
      value={{
        checkIn,
        checkOut,
        guests,
        selectedRoomId,
        setCheckIn,
        setCheckOut,
        setGuests,
        setSelectedRoomId,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
