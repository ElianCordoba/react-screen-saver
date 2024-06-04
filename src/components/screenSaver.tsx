import { ReactNode, useEffect, useRef, useState } from "react";
import { AVAILABLE_SCREENSAVERS, ScreenSaverProvider } from "../Context";
import "./screenSaver.css";
import { useScreenSaver } from "../hooks/useScreensaver";
import { BouncingIconScreenSaver } from "../built-in-screen-savers/bouncing-icon/BouncingIcon";
import { BouncingTextScreenSaver } from "../built-in-screen-savers/bouncing-text/BouncingText";
import { MacOSScreenSaver } from "../built-in-screen-savers/macOS-update/MacOS";

const eventsToListen = ["mousemove", "keydown"];

export function ScreenSaver({
  children,
  delayBeforeScreenSaver = 1000,
}: {
  children: ReactNode;
  delayBeforeScreenSaver?: number;
}) {
  const [currentScreenSaver] = useScreenSaver();
  const screenSaverComponent = getSreenSaverComponent(currentScreenSaver);
  const [screenSaverOn, setScreenSaverOn] = useState(false);
  const timerRef = useRef<any>(null);

  function resetTimer() {
    setScreenSaverOn(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(
      () => setScreenSaverOn(true),
      delayBeforeScreenSaver
    );
  }

  useEffect(() => {
    resetTimer();

    subscribeToUserEvents(eventsToListen, resetTimer);

    return () => {
      unsubscribeToUserEvents(eventsToListen, resetTimer);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <ScreenSaverProvider>
      <div className={screenSaverOn ? "full-screen" : ""}>
        {!screenSaverOn && children}
        {screenSaverOn && screenSaverComponent()}
      </div>
    </ScreenSaverProvider>
  );
}

function subscribeToUserEvents(events: string[], callback: () => void) {
  for (const event of events) {
    window.addEventListener(event, callback);
  }
}

function unsubscribeToUserEvents(events: string[], callback: () => void) {
  for (const event of events) {
    window.removeEventListener(event, callback);
  }
}

function getSreenSaverComponent(currentScreenSaver: AVAILABLE_SCREENSAVERS) {
  switch (currentScreenSaver) {
    case AVAILABLE_SCREENSAVERS.BouncingIcon:
      return BouncingIconScreenSaver;
    case AVAILABLE_SCREENSAVERS.BouncingText:
      return BouncingTextScreenSaver;
    case AVAILABLE_SCREENSAVERS.MacOS:
      return MacOSScreenSaver;
    default:
      throw new Error("Unknown option" + currentScreenSaver);
  }
}
