export default function VanishingPointPage() {
  return (
    <iframe
      src="/vanishing-point-embed.html"
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
