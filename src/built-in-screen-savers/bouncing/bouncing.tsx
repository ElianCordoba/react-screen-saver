import { useBouning } from "./useBouncing";

export function DVDScreenSaver({ children }: { children: JSX.Element }) {
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
