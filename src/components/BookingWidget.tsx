import { format, differenceInCalendarDays } from 'date-fns';
import { Search, Calendar as CalendarIcon, X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
// import { useNavigate } from 'react-router-dom'; // Removed unused
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DayPicker } from 'react-day-picker';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-day-picker/style.css';

import { getBookingUrl } from '../utils/bookingUtils';

export function BookingWidget() {
  const { checkIn, checkOut, guests, setCheckIn, setCheckOut, setGuests } = useBooking();
  // const navigate = useNavigate(); // Removed unused
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'checkIn' | 'checkOut' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    const url = getBookingUrl(checkIn, checkOut, guests);
    window.open(url, '_blank');
  };

  const [isMobile, setIsMobile] = useState(false);

  // Handle Resize for Responsive Calendar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if NOT mobile (mobile uses explicit close button/modal overlay)
      if (!isMobile && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const handleDayClick = (day: Date) => {
    // 1. Strict Tab Control (If a tab is explicitly open)
    if (activeTab === 'checkIn') {
      setCheckIn(day);
      if (checkOut && day >= checkOut) {
        setCheckOut(null); // Invalid range (start after end), clear end
        setTimeout(() => setActiveTab('checkOut'), 200); // Prompt for end
      } else if (checkOut && day < checkOut) {
        // Valid range (Reschedule Start). Close calendar ("pop off") as requested.
        setTimeout(() => setActiveTab(null), 200);
      } else {
        // No checkOut yet (Fresh start). Advance to checkOut.
        setTimeout(() => setActiveTab('checkOut'), 200);
      }
      return;
    }

    if (activeTab === 'checkOut') {
      // If no checkIn yet, this sets checkIn
      if (!checkIn) {
        setCheckIn(day);
        return;
      }

      // If they click BEFORE checkIn, it's a correction of Start
      if (day < checkIn) {
        setCheckIn(day);
        setCheckOut(null); // Clear invalid end
        // Stay on checkOut? Or switch to checkIn? 
        // Logic says we need an end now.
        return;
      }

      setCheckOut(day);
      setTimeout(() => setActiveTab(null), 200); // Close after picking end
      return;
    }

    // 2. Fallback / No Tab Active (e.g. initial load or weird state)
    
    // Case 1: Fresh Start (Nothing selected)
    if (!checkIn) {
      setCheckIn(day);
      setCheckOut(null);
      if (!isMobile) setTimeout(() => setActiveTab('checkOut'), 200);
      return;
    }

    // Case 2: Only Start Selected
    if (checkIn && !checkOut) {
      if (day < checkIn) {
        setCheckIn(day); // Move start back
      } else {
        setCheckOut(day); // Set end
        setTimeout(() => setActiveTab(null), 200); 
      }
      return;
    }

    // Case 3: Both Selected - Use Proximity (Only when NO tab is active)
    if (checkIn && checkOut) {
      const distToStart = Math.abs(differenceInCalendarDays(day, checkIn));
      const distToEnd = Math.abs(differenceInCalendarDays(day, checkOut));

      if (distToStart <= distToEnd) {
        setCheckIn(day);
        if (day >= checkOut) setCheckOut(null);
      } else {
        if (day < checkIn) {
           setCheckIn(day);
           setCheckOut(null);
        } else {
           setCheckOut(day);
        }
      }
    }
  };

  // Custom CSS for React Day Picker to match the theme
  const css = `
    .rdp {
      --rdp-cell-size: ${isMobile ? '40px' : '40px'}; 
      --rdp-accent-color: #8B5CF6;
      --rdp-background-color: #1F1F1F; /* Premium Charcoal */
      margin: 0;
    }
    .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
      background-color: var(--color-primary);
      color: white;
      font-weight: bold;
    }
    .rdp-day_today { 
      font-weight: bold; 
      color: var(--color-primary);
    }
    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
      background-color: #1F1F1F; /* Premium Charcoal */
    }
    .rdp-nav_button {
      color: white;
      width: 20px;
      height: 20px;
    }
    .rdp-caption_label {
      color: white;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .rdp-head_cell {
      color: #a1a1aa;
      font-weight: 500;
      font-size: 0.8rem;
    }
    .rdp-day {
      color: #e4e4e7;
      font-size: 0.85rem;
    }
    .rdp-day_disabled {
      color: #52525b;
    }
  `;

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto -mt-10 z-40 px-4">
      <style>{css}</style>
      
      {/* Main Bar */}
      <div className="bg-[#1F1F1F]/90 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-full shadow-2xl grid grid-cols-2 md:flex md:flex-row items-center p-1.5 relative overflow-visible gap-1 md:gap-0">
        
        {/* Check In Input */}
        <div 
          className={`relative px-4 md:px-6 py-3 md:flex-1 w-full md:w-auto transition-all duration-300 rounded-2xl md:rounded-full cursor-pointer hover:bg-white/5 ${activeTab === 'checkIn' ? 'bg-white/10' : ''}`}
          onClick={() => setActiveTab(activeTab === 'checkIn' ? null : 'checkIn')}
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-full bg-white/5 text-primary">
              <CalendarIcon size={16} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-0.5">
                {t('booking.checkIn')}
              </label>
              <div className="font-heading font-semibold text-white text-base">
                {checkIn ? format(checkIn, 'dd MMM yyyy') : 'Select Date'}
              </div>
            </div>
          </div>
        </div>

        <div className="w-px h-8 bg-white/10 hidden md:block" />

        {/* Check Out Input */}
        <div 
          className={`relative px-4 md:px-6 py-3 md:flex-1 w-full md:w-auto transition-all duration-300 rounded-2xl md:rounded-full cursor-pointer hover:bg-white/5 ${activeTab === 'checkOut' ? 'bg-white/10' : ''}`}
          onClick={() => setActiveTab(activeTab === 'checkOut' ? null : 'checkOut')}
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-full bg-white/5 text-primary">
              <CalendarIcon size={16} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-0.5">
                {t('booking.checkOut')}
              </label>
              <div className="font-heading font-semibold text-white text-base">
                {checkOut ? format(checkOut, 'dd MMM yyyy') : 'Select Date'}
              </div>
            </div>
          </div>
        </div>

        <div className="w-px h-8 bg-white/10 hidden md:block" />

        {/* Guests Input */}
        <div className="relative px-4 md:px-6 py-3 group col-span-1 md:flex-1 w-full md:w-auto">
          <div className="flex items-center gap-3">
             {/* Guest dropdown remains simple for now, but styled */}
             <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-0.5">
                {t('booking.guests')}
              </label>
              <select
                className="bg-transparent text-white outline-none w-full font-heading font-semibold text-base cursor-pointer appearance-none min-w-[40px]"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num} className="bg-zinc-900 text-white">
                    {num} {num === 1 ? t('booking.guest') : t('booking.guests')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="col-span-1 md:w-auto">
          <button 
            onClick={handleSearch}
            className="w-full h-full md:w-auto px-6 py-3 rounded-2xl md:rounded-full bg-primary text-white font-bold text-base flex items-center justify-center gap-2 hover:bg-primary-light transition-all shadow-lg hover:shadow-primary/25 active:scale-95"
          >
            <Search size={18} />
            <span className="md:hidden">Search</span>
          </button>
        </div>

      </div>

      {/* Expanded Date Picker Dropdown */}
      <AnimatePresence>
        {activeTab && (
          <motion.div
            initial={isMobile ? { y: '100%', opacity: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
            animate={isMobile ? { y: 0, opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={isMobile ? { y: '100%', opacity: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: isMobile ? "spring" : "tween", damping: 25, stiffness: 300 }}
            className={
              isMobile 
                ? "fixed bottom-0 left-0 right-0 z-[60] bg-[#121212] rounded-t-3xl border-t border-white/10 p-6 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
                : "absolute top-full left-0 mt-2 bg-[#1F1F1F]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-4 overflow-hidden z-50 min-w-[320px]"
            }
            style={ !isMobile ? {  
              left: activeTab === 'checkIn' ? '0' : 'auto', 
              right: 'auto',
              transform: activeTab === 'checkOut' ? 'translateX(10%)' : 'none'
            } : {}}
          >
             {/* Mobile Modal Container */}
             <div className={isMobile ? "w-full max-w-md mx-auto relative" : ""}>
                 
                 <div className="flex items-center justify-between mb-2 px-2">
                    <span className="text-white font-heading font-bold text-sm">
                      {activeTab === 'checkIn' ? 'Select Check-in Date' : 'Select Check-out Date'}
                    </span>
                    <button 
                      onClick={() => setActiveTab(null)}
                      className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                 </div>

                 <DayPicker
                    mode="range"
                    selected={{ from: checkIn || undefined, to: checkOut || undefined }}
                    onDayClick={handleDayClick}
                    numberOfMonths={isMobile ? 1 : 2}
                    disabled={{ before: new Date() }}
                    showOutsideDays={!isMobile}
                    className="bg-transparent border-none mx-auto"
                 />
                 
                 <div className="mt-2 pt-2 border-t border-white/10 flex justify-end gap-3 text-xs text-zinc-400">
                   <div>
                      Selected: <span className="text-white font-medium">{checkIn ? format(checkIn, 'MMM dd') : '-'}</span> 
                      {' '} to {' '} 
                      <span className="text-white font-medium">{checkOut ? format(checkOut, 'MMM dd') : '-'}</span>
                   </div>
                   {isMobile && (
                     <button 
                       onClick={() => setActiveTab(null)}
                       className="ml-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold"
                     >
                       Done
                     </button>
                   )}
                 </div>
             
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
