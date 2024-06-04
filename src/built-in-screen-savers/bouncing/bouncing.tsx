import { useBouning } from "./useBouncing";

// If you import this component you can make your own element bounce around
export function BouncingScreenSaver({ children }: { children: JSX.Element }) {
  const { elementRef } = useBouning({});

  return (
    <div
      style={{
        padding: "5px",
        maxWidth: "200px",
        textAlign: "center",
      }}
      ref={elementRef}
    >
      {children}
    </div>
  );
}
