import ClientSideCleanup from "@/components/ClientCleanup";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import placeOrder from "@/components/PlaceOrder";
import { stripe } from "@/lib/stripe";
import { Check } from "lucide-react";
import { redirect } from "next/navigation";

async function getSession({sessionId} : {sessionId : string}){
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return session;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function PaymentResult({searchParams} : {searchParams: { [key: string]: string | undefined };}){
    const sessionId = (await searchParams).session_id;
    const {bookId , addressId , quantity} = await searchParams;
    if(!sessionId || !bookId || !addressId || !quantity){
        redirect("/");
    }
    const session =  await getSession({sessionId});
    if(!session){
        return <h1>Invalid session</h1>
    }
    if(session.status === "expired"){
        return <h1>Your session expired!</h1>
    }
    if(session.status === "open"){
        return <h1>Your payment is in progress!</h1>
    }
    const res = await placeOrder({bookId , addressId , quantity});
    if(!res)return;
    return <div className="w-full h-screen">
        <Navbar/>
        <ClientSideCleanup/>
        <div className="w-full h-4/5 flex justify-center items-center">
            <div className="flex flex-col gap-4 items-center">
                <Check className="size-20 rounded-full bg-green-400 text-white"/>
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl">Payment successfull!</h2>
                    <h3 className="text-xl">Order placed successfully</h3>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
}