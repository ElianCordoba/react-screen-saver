import React from "react";
import ReactDOM from "react-dom/client";

import { ScreenSaver } from "../components/ScreenSaverOverlay.tsx";
import { useScreenSaver } from "../hooks/useScreensaver.tsx";

function App() {
  const [currentScreensaver, setCurrentScreensaver, allScreenSavers] =
    useScreenSaver();

  return (
    <div>
      Pick a screensaver and wait!
      <Dropdown
        options={allScreenSavers}
        onOptionSelected={setCurrentScreensaver}
      />
      <br />
      Current screensaver {currentScreensaver}
    </div>
  );
}

function Dropdown({
  options,
  onOptionSelected,
}: {
  options: string[];
  onOptionSelected: (option: string) => void;
}) {
  return (
    <select
      onChange={(e) => {
        const optionSelected = e.target.value;
        const option = options.find((x) => x === optionSelected)!;

        onOptionSelected(option);
      }}
    >
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ScreenSaver>
      <App />
    </ScreenSaver>
  </React.StrictMode>
);
