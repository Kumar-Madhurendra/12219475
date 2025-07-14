import React, { useEffect } from "react";
import { logEvent } from "./services/logger";

export default function App() {
  useEffect(() => {
    logEvent("frontend", "info", "component", "App mounted successfully");
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Logging Middleware Test</h1>
      <p>Check your console for logging API output.</p>
    </div>
  );
}
