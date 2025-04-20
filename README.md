# VaxTrak 💉

# VaxTrak 💉

VaxTrak is a web-based vaccination appointment booking system that allows users to register family members, view vaccine recommendations based on age, and find suitable hospitals (categorized as free or paid) for appointments.

## 🔧 Features

- 👨‍👩‍👧‍👦 Register multiple family members
- 🎯 Vaccine recommendations based on age:
  - Covishield/Covaxin for age > 18
  - Polio for age < 10
- 🏥 View hospital listings (Free & Paid)
- 🗺️ Interactive hospital location map using Leaflet
- 📅 Book appointments seamlessly
- 💬 Chatbot powered by Gemini API
- 🧳 Travel vaccine advisory
- ❤️ Donate vaccines to underprivileged users
- 📰 Live health & vaccine news (via GNews API)
- 📊 Vaccine data visualization using Chart API

## 🛠 Tech Stack

- **Frontend:** HTML, Tailwind CSS, JavaScript, EJS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **APIs Used:**
  - **GNews API** - for real-time health news
  - **Gemini API** - for chatbot interaction
  - **Chart API** - for analytics/visualization


🔄 How It Works
> User registers family members with age.
> Recommended vaccines are shown based on age.
> Hospital list is filtered based on the selected vaccine.
> Users can book appointments at available hospitals.

🌟 Future Enhancements
> Email/SMS reminders
> Admin panel for hospital management
> Real-time slot updates
