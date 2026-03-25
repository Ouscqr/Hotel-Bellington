import { format, addDays } from 'date-fns';

export function getBookingUrl(checkIn: Date | null, checkOut: Date | null, _guests: number, lang: string = 'en'): string {
  // Using the FastBooker endpoint you provided
  const baseUrl = "https://bookingengine.mylighthouse.com/5531/Rooms/Select";
  
  // Default to today if no date selected
  const start = checkIn || new Date();
  
  // Default to tomorrow if no date selected, or if checkout is same/before start
  let end = checkOut;
  if (!end || end <= start) {
    end = addDays(start, 1);
  }

  // Format: yyyy-M-d (e.g., 2026-1-15) exactly as the FastBooker script does:
  const arrival = format(start, 'yyyy-M-d');
  const departure = format(end, 'yyyy-M-d');

  return `${baseUrl}?lang=${lang}&Arrival=${arrival}&Departure=${departure}`;
}
