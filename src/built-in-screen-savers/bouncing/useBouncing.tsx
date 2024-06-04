import { useEffect, useRef } from "react";

interface BouncingOptions {
  speed?: number;
}
const _defaultOptions: BouncingOptions = {
  speed: 5,
};
export function useBouning<T extends HTMLDivElement = HTMLDivElement>({
  options,
}: {
  options?: BouncingOptions;
}) {
  const _options = {
    ..._defaultOptions,
    ...options,
  } as Required<BouncingOptions>;

  const elementRef = useRef<T>(null);

  const animationStateRef = useRef({
    frameId: 0,
    ...getInitialRandomState(),
  });

  function animationStep() {
    if (elementRef.current?.parentElement) {
      const containerHeight = elementRef.current.parentElement.clientHeight;
      const containerWidth = elementRef.current.parentElement.clientWidth;
      const elementHeight = elementRef.current.clientHeight;
      const elementWidth = elementRef.current.clientWidth;

      const upperBoundY = containerHeight - elementHeight;
      const upperBoundX = containerWidth - elementWidth;

      const newPosition = { ...animationStateRef.current! };

      if (animationStateRef.current.isXGoingUp) {
        newPosition.positionX += _options.speed;
        if (newPosition.positionX >= upperBoundX) {
          newPosition.positionX = upperBoundX;
          newPosition.isXGoingUp = false;
        }
      } else {
        newPosition.positionX -= _options.speed;
        if (newPosition.positionX < 0) {
          newPosition.positionX = 0;
          newPosition.isXGoingUp = true;
        }
      }

      if (animationStateRef.current.isYGoingUp) {
        newPosition.positionY += _options.speed;
        if (newPosition.positionY >= upperBoundY) {
          newPosition.positionY = upperBoundY;
          newPosition.isYGoingUp = false;
        }
      } else {
        newPosition.positionY -= _options.speed;
        if (newPosition.positionY < 0) {
          newPosition.positionY = 0;
          newPosition.isYGoingUp = true;
        }
      }

      animationStateRef.current = newPosition;

      elementRef.current!.style.transform = `translate3d(${newPosition.positionX}px, ${newPosition.positionY}px, 0)`;
    }

    animationStateRef.current.frameId = requestAnimationFrame(animationStep);
  }

  useEffect(() => {
    animationStateRef.current.frameId = requestAnimationFrame(animationStep);

    return () => cancelAnimationFrame(animationStateRef.current.frameId);
  }, []);

  return { elementRef };
}

function getInitialRandomState() {
  return {
    positionX: getRandomInt(0, window.innerWidth),
    positionY: getRandomInt(0, window.innerHeight),
    isXGoingUp: Math.random() < 0.5,
    isYGoingUp: Math.random() < 0.5,
  };
}

// Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
