import { outrun, meshedDisplay } from "./fonts";
import Scene from "./components/Scene";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Scene />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
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
      </section>
    </main>
  );
}