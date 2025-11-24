# 🌍 Air Quality Search Engine (FinFactor AQI Challenge)

A real-time air quality monitoring web app built for the **FinFactor Coding Challenge**.  
Users can search any city and instantly view AQI and pollutant concentrations based on the nearest measuring station.

---

## 🚀 Features

- 🔍 Search AQI of any global city
- 🛰️ Nearest station detection via WAQI Search API
- 📊 Detailed pollutant breakdown: PM2.5, PM10, NO₂, O₃, SO₂, CO
- 🎨 Clean UI with AQI-based color indicators
- ⚡ Backend caching for performance optimization
- 🌐 Fully responsive, fast, and lightweight

---

## 🏗️ System Architecture

```

React (Vite) ──► Spring Boot Backend ──► WAQI Public API

````

⚡ Frontend calls backend → Backend calls WAQI APIs securely → Sends parsed AQI to UI

---

## 🔧 Tech Stack

| Layer       | Technology |
|------------|------------|
| Frontend   | React + Vite + TailwindCSS + Axios |
| Backend    | Spring Boot + RestTemplate + Caching |
| APIs       | World Air Quality Index API |
| Build Tool | Maven |
| Deployment | Localhost (dev), ready for cloud deployment |

---

## 🔑 Setup & Run Locally

### 1️⃣ Clone Repo

```sh
git clone https://github.com/AB2511/finfactor-aqi-challenge.git
cd finfactor-aqi-challenge
```

---

### 2️⃣ Backend Setup

```sh
cd aqi-backend
```

Create `.env` file:

```env
AQI_TOKEN=your_actual_waqi_token
```

Add this in `application.properties`:

```properties
aqi.base-url=https://api.waqi.info/feed
aqi.token=${AQI_TOKEN}
spring.config.import=optional:file:.env[.properties]
```

Run backend:

```sh
mvn spring-boot:run
```

Server running on:

```sh
http://localhost:8080
```

---

### 3️⃣ Frontend Setup

```sh
cd ../aqi-frontend
npm install
npm run dev
```

Frontend runs at:

```sh
http://localhost:5173
```

---

## 🌈 AQI Color Scale

| AQI     | Status                         | UI Color    |
| ------- | ------------------------------ | ----------- |
| 0–50    | Good                           | Green       |
| 51–100  | Moderate                       | Yellow      |
| 101–150 | Unhealthy for sensitive groups | Orange      |
| 151–200 | Unhealthy                      | Red         |
| 201–300 | Very Unhealthy                 | Purple      |
| 300+    | Hazardous                      | Dark Maroon |

---

## 🧠 Performance Enhancements

* Backend **caches results per city** to avoid repeated API calls
* Handles missing pollutant values safely
* Gives **the closest reporting station**, not a random default city

---

## 📜 API Used

World Air Quality Index Public API
Terms: Data is free but may not be redistributed or monetized
Official: [https://aqicn.org/api/](https://aqicn.org/api/)

---

## ✨ Future Improvements

* 🌍 Interactive Global AQI Map
* 📈 Forecast + trend graph support
* 🧭 GPS-based auto-location mode
* 🔒 Token usage monitoring + error UI feedback

---

## 👩‍💻 Author

**Anjali Barge**
Final Year CSE Student — SPPU, India

---

## ⭐ Acknowledgements

Thanks to **FinFactor** team for this challenge
Data provided by **WAQI Open Data Platform**

---

## 🏁 Status

🎯 MVP Completed — Fully functional and demo-ready!

```
