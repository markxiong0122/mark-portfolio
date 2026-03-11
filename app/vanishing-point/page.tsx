export default function VanishingPointPage() {
  return (
    <iframe
      src="/embeds/vanishing-point.html"
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
