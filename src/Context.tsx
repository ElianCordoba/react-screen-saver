import { createContext, useState } from "react";

export enum AVAILABLE_SCREENSAVERS {
  BouncingIcon = "BouncingIcon",
  BouncingText = "BouncingText",
  MacOS = "MacOS",
}

export const CurrentScreenSaverContext = createContext(
  AVAILABLE_SCREENSAVERS.BouncingIcon
);
export const SetScreenSaverContext = createContext<any>(null);

export function ScreenSaverProvider({ children }: { children: JSX.Element }) {
  const [currentSreenSaver, setCurrentSreenSaver] = useState(
    AVAILABLE_SCREENSAVERS.BouncingIcon
  );

  return (
    <CurrentScreenSaverContext.Provider value={currentSreenSaver}>
      <SetScreenSaverContext.Provider value={setCurrentSreenSaver}>
        {children}
      </SetScreenSaverContext.Provider>
    </CurrentScreenSaverContext.Provider>
  );
}
