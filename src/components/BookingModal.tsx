import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string | null;
}

export function BookingModal({ isOpen, onClose, url }: BookingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && url && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ isolation: 'isolate' }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Full Screen Modal content */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-full h-[100dvh] bg-zinc-50 z-[101] flex flex-col pt-safe"
          >
            {/* Minimal Header with Close Button overlaid */}
            <div className="absolute top-4 right-4 z-20 md:top-6 md:right-8">
              <button
                onClick={onClose}
                className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:bg-white text-zinc-800 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 font-semibold text-sm"
                aria-label="Close booking"
              >
                <span>Close</span>
                <X size={20} />
              </button>
            </div>
            
            {/* Iframe container - flex-1 allows it to take all remaining space */}
            <div className="relative flex-1 bg-zinc-50 flex items-center justify-center w-full h-full">
               {/* Loading indicator (shows behind iframe until it loads its background) */}
               <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 gap-3 bg-zinc-50 z-0">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                 <p className="text-sm font-medium">Connecting to FastBooker...</p>
               </div>

               {/* The Iframe itself */}
               <iframe
                  src={url}
                  className="relative z-10 w-full h-full border-0 bg-transparent block"
                  title="FastBooker Checkout"
               />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
