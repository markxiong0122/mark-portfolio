import fs from "fs";
import path from "path";

export default function VanishingPointPage() {
  const htmlContent = fs.readFileSync(
    path.join(process.cwd(), "public", "vanishing-point-embed.html"),
    "utf-8"
  );

  return (
    <iframe
      srcDoc={htmlContent}
      title="Vanishing Point — Progressive Abstraction of Human Presence"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
      }}
    />
  );
}
