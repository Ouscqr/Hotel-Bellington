import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BookingModal } from './BookingModal';
import { useBooking } from '../context/BookingContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isModalOpen, closeBookingModal, modalUrl } = useBooking();

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={closeBookingModal} 
        url={modalUrl} 
      />
    </div>
  );
}
