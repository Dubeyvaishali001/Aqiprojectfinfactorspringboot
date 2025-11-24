import { useState } from "react";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAqiColor = (aqi) => {
    if (aqi <= 50) return "bg-green-500";
    if (aqi <= 100) return "bg-yellow-400";
    if (aqi <= 150) return "bg-orange-500";
    if (aqi <= 200) return "bg-red-600";
    if (aqi <= 300) return "bg-purple-700";
    return "bg-rose-950";
  };

  const fetchData = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setAqiData(null);

    try {
      const res = await axios.get(`http://localhost:8080/api/aqi/${city}`);
      setAqiData(res.data);
    } catch {
      setError("City not found or API failed");
    }

    setLoading(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") fetchData();
  };

  const data = aqiData?.data;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">🌍 Air Quality Search Engine</h1>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter city name..."
          className="px-4 py-2 rounded-md bg-gray-800 border border-gray-600"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-md"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="mt-4 text-red-400">{error}</p>}

      {aqiData && (
        <div className="mt-10 p-8 w-96 rounded-xl bg-gray-800 shadow-xl">
          <h2 className="text-xl font-semibold text-center mb-4">
            {aqiData.data.city.name}
          </h2>

          <div
            className={`text-center text-4xl font-black p-4 rounded-lg ${getAqiColor(
              aqiData.data.aqi
            )}`}
          >
            {aqiData.data.aqi}
          </div>

          <p className="text-center mt-2 text-gray-300">Air Quality Index</p>

          <h3 className="mt-6 font-semibold">Pollutants</h3>

          <div className="grid grid-cols-2 gap-4 text-sm mt-3">
            {data.iaqi?.pm25?.v !== undefined && (
              <div className="bg-gray-200 text-gray-900 p-3 rounded-lg shadow">
                <span className="block text-xs font-semibold opacity-70">PM2.5</span>
                <span className="font-bold text-lg">{data.iaqi.pm25.v}</span>
              </div>
            )}
            {data.iaqi?.pm10?.v !== undefined && (
              <div className="bg-gray-200 text-gray-900 p-3 rounded-lg shadow">
                <span className="block text-xs font-semibold opacity-70">PM10</span>
                <span className="font-bold text-lg">{data.iaqi.pm10.v}</span>
              </div>
            )}
            {data.iaqi?.o3?.v !== undefined && (
              <div className="bg-gray-200 text-gray-900 p-3 rounded-lg shadow">
                <span className="block text-xs font-semibold opacity-70">O₃</span>
                <span className="font-bold text-lg">{data.iaqi.o3.v}</span>
              </div>
            )}
            {data.iaqi?.no2?.v !== undefined && (
              <div className="bg-gray-200 text-gray-900 p-3 rounded-lg shadow">
                <span className="block text-xs font-semibold opacity-70">NO₂</span>
                <span className="font-bold text-lg">{data.iaqi.no2.v}</span>
              </div>
            )}
            {data.iaqi?.so2?.v !== undefined && (
              <div className="bg-gray-200 text-gray-900 p-3 rounded-lg shadow">
                <span className="block text-xs font-semibold opacity-70">SO₂</span>
                <span className="font-bold text-lg">{data.iaqi.so2.v}</span>
              </div>
            )}
            {data.iaqi?.co?.v !== undefined && (
              <div className="bg-gray-200 text-gray-900 p-3 rounded-lg shadow">
                <span className="block text-xs font-semibold opacity-70">CO</span>
                <span className="font-bold text-lg">{data.iaqi.co.v}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}