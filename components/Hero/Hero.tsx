import Image from "next/image";
import CTA from "./CTA";

export default function Hero() {
  return (
    <div className="w-full h-auto bg-background flex flex-col md:flex-row-reverse items-center justify-between px-4 py-8 gap-6 md:px-8">
      <Image
        src="/Hero.png"
        alt="Hero image"
        width={300}
        height={300}
        className="w-[90%] max-w-xs md:max-w-sm lg:max-w-md rounded-2xl shadow-xl pt-2"
        priority
      />
      <div className="flex flex-col gap-4 items-center text-center md:items-start md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
          <span className="text-amber-400 dark:text-amber-300">Vedam, </span>
          a unique book store
        </h1>
        <div className="space-y-1 text-base sm:text-lg md:text-xl lg:text-2xl leading-snug">
          <p>Books reborn, stories revisited</p>
          <p>From every corner, for every reader</p>
        </div>
        <CTA />
      </div>
    </div>
  );
}
