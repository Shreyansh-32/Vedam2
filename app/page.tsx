import Features from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import { authOptions } from "@/lib/auth/options";
import {getServerSession} from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full min-h-[100vh] bg-background">
      <Navbar/>
      <Hero/>
      <Features/>
    </div>
  );
}
