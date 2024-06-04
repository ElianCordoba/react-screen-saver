import { useContext } from "react";
import {
  AVAILABLE_SCREENSAVERS,
  CurrentScreenSaverContext,
  SetScreenSaverContext,
} from "../Context";

export function useScreenSaver() {
  const currentScreenSaver = useContext(CurrentScreenSaverContext);
  const setCurrentScreenSaver = useContext(SetScreenSaverContext);
  const allScreenSavers = Object.keys(AVAILABLE_SCREENSAVERS);

  return [currentScreenSaver, setCurrentScreenSaver, allScreenSavers] as const;
}
