import { ReactNode, useEffect, useRef, useState } from "react";
import './screenSaver.css'

const eventsToListen = ['mousemove', 'keydown']

export function ScreenSaver({ children, delayBeforeScreenSaver = 5000 }: { children: ReactNode, delayBeforeScreenSaver: number }) {
  const [screenSaverOn, setScreenSaverOn] = useState(false)
  const timerRef = useRef<any>(null);

  function resetTimer()  {
    setScreenSaverOn(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setScreenSaverOn(true);
    }, delayBeforeScreenSaver);
  };

  useEffect(() => {
    console.log("USE EFFECT RUN")

    subscribeToUserEvents(eventsToListen, (event) => {
      console.log("FIRED", event)
      resetTimer()
    })

    return () => {
      console.log("USE EFFECT CLEAN")
      unsubscribeToUserEvents(eventsToListen, () => resetTimer())
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  }, [])
  return (
    <div className={screenSaverOn ? 'full-screen' : ''}>
      <button onClick={() => setScreenSaverOn(!screenSaverOn)}>SWITCH</button>
      {!screenSaverOn && children}
    </div>
    
  )
}

function subscribeToUserEvents(events: string[], onEvenTriggerCallback: (eventName: string) => void) {
  for (const event of events) {
    window.addEventListener(event, () => onEvenTriggerCallback(event))
  }
}

function unsubscribeToUserEvents(events: string[], onEvenTriggerCallback: (eventName: string) => void) {
  for (const event of events) {
    window.removeEventListener(event, () => onEvenTriggerCallback(event))
  }
}
