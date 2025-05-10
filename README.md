# 🚌 Bus Booking App

A full-stack MERN web application that allows users to browse available buses, select seats, and make secure online payments. Designed with simplicity, functionality, and real-world booking logic in mind.

---

## 🚀 Tech Stack

### 🧩 Frontend
- **React.js** – Component-based UI
- **Ant Design** – UI components and layout
- **Redux Toolkit** – State management
- **Axios** – HTTP requests

### 🔧 Backend
- **Node.js** – JavaScript runtime
- **Express.js** – REST API framework
- **MongoDB + Mongoose** – Database and ODM
- **JWT** – Authentication

### 💳 Payment Gateway
- **Stripe** – Secure payment integration

---

## 🌟 Features

- 🔐 **User Authentication** – Signup, login with JWT tokens.
- 🚌 **Bus Listings** – View available buses with details.
- 💺 **Seat Selection** – Real-time selection with capacity validation.
- 💸 **Stripe Payments** – Integrated for secure checkout.
- 📖 **Booking History** – View all previous bookings.
- 📅 **Journey Date Picker** – Pick your travel date.
- 🧾 **Admin Panel (Optional)** – Add/manage buses (if implemented).

---

## 🛠️ Setup Instructions (Local)

### 1. Clone the Repository
```bash

git clone https://github.com/yourusername/bus-booking-app.git
cd bus-booking-app
```

### 2. Install dependencies for client
```bash
cd client
npm install
npm start
```
### 3. Install Dependencies for Server
```bash
cd ../server
npm install
npm start
```



### 🔐 Environment Variables for server
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_KEY=your_stripe_secret_key
```

## 💳 Test Payment Card Details
```bash
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date (e.g., 12/34)
CVC: Any 3-digit number (e.g., 123)
ZIP: Any 5-digit number (e.g., 12345)
```

## 📌 Planned Enhancements

✅ Add Tailwind CSS for a modern UI redesign

✅ Figma UI design for better layout planning

🟡 Email notifications for bookings

🟡 Add Razorpay or Paytm integration (India support)

🟡 Progressive Web App (PWA) support


## 👨‍💻 Author

- 🧑‍💻 **Saran Raj**  
- 💼 [GitHub](https://github.com/saranedubridge/Bus_Booking)
- 🌐 [Live Demo](https://saranbus.netlify.app)    
- 📧 saranraj.1803164@srec.ac.in







