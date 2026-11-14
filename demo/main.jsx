import { useState } from "react";
import { createRoot } from "react-dom/client";
import NepaliCalendar, {
  adToBs,
  adToBsDetails,
  bsToAd,
  todayBs,
} from "../src/index.js";
function App() {
  const [date, setDate] = useState(null);

  console.log(date, "date from calender");
  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h2>Nepali</h2>
      <NepaliCalendar language="nepali" onChange={setDate} />
      <h2>English</h2>
      <NepaliCalendar color="#2563eb" language="english" onChange={setDate} />
      <pre>{date && JSON.stringify({ bs: date.bs, ad: date.ad }, null, 2)}</pre>
      <p>adToBs("2026-11-14") → {adToBs("2026-11-14")}</p>
      <p>bsToAd("२०८३-०७-२८") → {bsToAd("२०८३-०७-२८")}</p>
      <p>Today: {todayBs("D MMMM YYYY, dddd", "nepali")}</p>
      <pre>{JSON.stringify(adToBsDetails("2026-11-14"), null, 2)}</pre>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
