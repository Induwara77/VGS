export default function BackgroundLines() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
      style={{
        backgroundImage: `linear-gradient(to right, var(--vgs-ink) 1px, transparent 1px)`,
        backgroundSize: '12.5% 100%', // Splits the full screen width evenly into columns
      }}
    />
  );
}