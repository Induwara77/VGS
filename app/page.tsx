import { outrun, meshedDisplay } from "./fonts";
import Scene from "./components/Scene";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--vgs-canvas)] text-[var(--vgs-ink)]">
      <section className="relative h-screen overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center text-[var(--vgs-canvas)] pointer-events-none mx-2 mt-28 max-w-6xl rounded-[25px] bg-[var(--vgs-blue)] px-3 pb-24 pt-16 sm:mt-32 sm:rounded-[40px] sm:px-12 sm:pb-32 sm:pt-20">
          <h1
            className={`${outrun.className} text-6xl sm:text-8xl md:text-9xl tracking-tight leading-none`}
          >
            VENDOR GLOBAL
          </h1>
          <h2
            className={`${meshedDisplay.className} text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none mt-2`}
          >
            Solutions
          </h2>
        </div>

        <div className="absolute inset-0 z-20">
          <Scene />
        </div>
      </section>
    </main>
  );
}