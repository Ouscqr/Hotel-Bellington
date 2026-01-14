# import sys

# try:
#     import requests
#     from icalendar import Calendar
# except ImportError:
#     print("Missing dependencies. Please run: pip install requests icalendar")
#     sys.exit(1)

# # Replace this with your actual iCal URL.
# # If you have just a key, construct the full URL (e.g., https://api.hotel.com/ical/KEY)
# ICAL_URL = "YOUR_ICAL_URL_HERE"

# def check_availability():
#     if "YOUR_ICAL_URL_HERE" in ICAL_URL:
#         print("Please open this file and replace 'YOUR_ICAL_URL_HERE' with your actual iCal URL.")
#         return

#     print(f"Fetching iCal data from: {ICAL_URL}...")
    
#     try:
#         response = requests.get(ICAL_URL)
#         response.raise_for_status()
        
#         cal = Calendar.from_ical(response.content)
        
#         events = [c for c in cal.walk() if c.name == "VEVENT"]
#         print(f"Successfully fetched iCal. Found {len(events)} events.")
        
#         print("\n--- Event Details ---")
#         for event in events:
#             summary = event.get('summary')
#             # Handle possible date/datetime types
#             start = event.get('dtstart')
#             end = event.get('dtend')
            
#             start_dt = start.dt if start else "N/A"
#             end_dt = end.dt if end else "N/A"
            
#             print(f"Event: {summary}")
#             print(f"  Start: {start_dt}")
#             print(f"  End:   {end_dt}")
#             print("-" * 20)
                
#     except requests.exceptions.RequestException as e:
#         print(f"Error fetching URL: {e}")
#     except Exception as e:
#         print(f"Error parsing iCal data: {e}")

# if __name__ == "__main__":
#     check_availability()
import requests
from icalendar import Calendar
import sys

# --- CONFIGURATION ---
# PASTE YOUR FULL URL HERE (The one with ?key=880164e9...)
# THE OG ONE 
# ICAL_URL = "https://cubilis.eu/plugins/ical/reservations.ashx?key=880164e9-d4c6-418f-8e12-768eddbe727b"
ICAL_URL = "https://cubilis.eu/plugins/ical/reservations.ashx?key=bf39b44b-43f1-407b-9991-fc055b3cffa3"

def test_ical_connection(url):
    print(f"📡 Connecting to: {url[:50]}... (hidden for security)")
    
    try:
        # 1. Try to download the file
        response = requests.get(url, timeout=10)
        
        # Check if the server said "OK" (Status Code 200)
        if response.status_code != 200:
            print(f"❌ Error: Server returned status code {response.status_code}")
            print("   (This usually means the key is wrong or expired)")
            return

        # 2. Try to parse it as an iCal file
        # If this fails, the file might be empty or not a valid calendar
        try:
            cal = Calendar.from_ical(response.content)
        except Exception as e:
            print(f"❌ Error: Downloaded file is not a valid iCal format.")
            print(f"   Details: {e}")
            return

        # 3. Count the events (Reservations)
        reservation_count = 0
        future_reservations = 0
        
        # We walk through every component in the file
        for component in cal.walk():
            if component.name == "VEVENT":
                reservation_count += 1
                
                # Optional: Check if it has a summary
                summary = component.get('summary')
                
        print("\n✅ SUCCESS! The key is working perfectly.")
        print("-" * 40)
        print(f"📊 Total Reservations Found: {reservation_count}")
        print(f"📂 File Size: {len(response.content)} bytes")
        print("-" * 40)
        
        if reservation_count > 0:
            print("This feed is LIVE and ready for your Python backend.")
        else:
            print("The feed works, but it currently has 0 reservations.")
            print("(This is normal if the hotel is brand new or closed)")

    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to the internet or the server is down.")
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")

# --- RUN THE TEST ---
if "YOUR_KEY_GOES_HERE" in ICAL_URL:
    print("⚠️ STOP: You forgot to paste your real URL in the script!")
else:
    test_ical_connection(ICAL_URL)