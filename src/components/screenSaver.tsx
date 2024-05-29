import { ReactNode, useEffect, useRef, useState } from "react";
import "./screenSaver.css";
import { DVDScreenSaver } from "./screenSavers/DVD";

const eventsToListen = ["mousemove", "keydown"];

export function ScreenSaver({
  children,
  delayBeforeScreenSaver = 5000,
  screenSaverComponent = DVDScreenSaver,
}: {
  children: ReactNode;
  delayBeforeScreenSaver: number;
  screenSaverComponent: () => ReactNode;
}) {
  const [screenSaverOn, setScreenSaverOn] = useState(false);
  const timerRef = useRef<any>(null);

  function resetTimer() {
    setScreenSaverOn(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setScreenSaverOn(true);
    }, delayBeforeScreenSaver);
  }

  useEffect(() => {
    console.log("USE EFFECT RUN");

    subscribeToUserEvents(eventsToListen, resetTimer);

    return () => {
      console.log("USE EFFECT CLEAN");
      unsubscribeToUserEvents(eventsToListen, resetTimer);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  return (
    <div className={screenSaverOn ? "full-screen" : ""}>
      {screenSaverOn ? screenSaverComponent() : children}
    </div>
  );
}

function subscribeToUserEvents(
  events: string[],
  onEvenTriggerCallback: (eventName: string) => void
) {
  for (const event of events) {
    window.addEventListener(event, () => onEvenTriggerCallback(event));
  }
}

function unsubscribeToUserEvents(
  events: string[],
  onEvenTriggerCallback: (eventName: string) => void
) {
  for (const event of events) {
    window.removeEventListener(event, () => onEvenTriggerCallback(event));
  }
}
