import { useState } from "react";
import { createRoot } from "react-dom/client";
import NepaliCalendar from "../src/index.js";

function App() {
  const [nepali, setNepali] = useState(null);
  const [english, setEnglish] = useState(null);

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
        <div style={{ width: 320, minHeight: 480 }}>
          <h2 style={{ marginTop: 0 }}>नेपाली</h2>
          <NepaliCalendar
            language="nepali"
            color="#16a34a"
            onChange={setNepali}
          />
        </div>

        <div style={{ width: 320, minHeight: 480 }}>
          <h2 style={{ marginTop: 0 }}>English</h2>
          <NepaliCalendar
            language="english"
            color="#2563eb"
            onChange={setEnglish}
          />
        </div>
      </div>

      <p style={{ color: "#555" }}>
        {nepali && `BS ${nepali.bs} = AD ${nepali.ad}`}
        {english &&
          english.bs !== nepali?.bs &&
          ` · BS ${english.bs} = AD ${english.ad}`}
      </p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
