import { useState } from "react";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAqi = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setAqiData(null);

    try {
      const res = await axios.get(`http://localhost:8080/api/aqi/${city}`);
      setAqiData(res.data);
    } catch (err) {
      console.log(err);
      setError("City not found or API error.");
    }

    setLoading(false);
  };

  const handleEnter = (e) => e.key === "Enter" && fetchAqi();

  const data = aqiData?.data;

  // 🛑 SAFETY: Pollutants array fallback
  const pollutants = data?.iaqi ? Object.entries(data.iaqi) : [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Air Quality Checker</h1>

      {/* Search box */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleEnter}
          className="px-4 py-2 border border-gray-400 rounded-md bg-white w-64"
        />
        <button
          onClick={fetchAqi}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-500"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {/* RESULT CARD */}
      {aqiData && data && (
        <div className="bg-white w-full max-w-2xl rounded-xl p-8 shadow border border-gray-300">
          <h2 className="text-xl font-bold mb-3">
            {data.city?.name ?? "Unknown Location"}
          </h2>

          <p className="text-lg mb-1">
            <span className="font-semibold">AQI:</span> {data.aqi ?? "N/A"}
          </p>

          <p className="text-lg mb-1">
            <span className="font-semibold">Dominant Pollutant:</span>{" "}
            {data.dominentpol ?? "N/A"}
          </p>

          <p className="text-lg mb-4">
            <span className="font-semibold">Last Updated:</span>{" "}
            {data.time?.s ?? "N/A"}
          </p>

          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span>📊</span> Pollutants
          </h3>

          {/* Pollutants Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 border">
                <th className="border px-4 py-2 text-left">Pollutant</th>
                <th className="border px-4 py-2 text-left">Value</th>
              </tr>
            </thead>

            <tbody>
              {pollutants.length > 0 ? (
                pollutants.map(([key, obj]) => (
                  <tr key={key} className="border">
                    <td className="border px-4 py-2 uppercase">{key}</td>
                    <td className="border px-4 py-2">{obj?.v ?? "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2" colSpan="2">
                    No pollutant data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
