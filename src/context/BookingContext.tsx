import { createContext, useContext, useState, type ReactNode } from 'react';


interface BookingState {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  selectedRoomId: string | null;
  isModalOpen: boolean;
  modalUrl: string | null;
}

interface BookingContextType extends BookingState {
  setCheckIn: (date: Date | null) => void;
  setCheckOut: (date: Date | null) => void;
  setGuests: (count: number) => void;
  setSelectedRoomId: (id: string | null) => void;
  openBookingModal: (url: string) => void;
  closeBookingModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(2);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  const openBookingModal = (url: string) => {
    setModalUrl(url);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    // Optional: delay clearing url to allow exit animation
    setTimeout(() => setModalUrl(null), 300);
  };

  return (
    <BookingContext.Provider
      value={{
        checkIn,
        checkOut,
        guests,
        selectedRoomId,
        isModalOpen,
        modalUrl,
        setCheckIn,
        setCheckOut,
        setGuests,
        setSelectedRoomId,
        openBookingModal,
        closeBookingModal,
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
