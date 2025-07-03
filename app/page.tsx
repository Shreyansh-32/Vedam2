import Features from "@/components/Features/Features";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import MostPopular from "@/components/mostPopular/MostPopular";
import Navbar from "@/components/Navbar/Navbar";
import TopGrossing from "@/components/top-grossing/TopGrossing";
import { authOptions } from "@/lib/auth/options";
import {getServerSession} from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full min-h-[100vh] bg-background">
      <Navbar/>
      <Hero/>
      <Features/>
      <MostPopular/>
      <TopGrossing/>
      <Footer/>
    </div>
  );
}
