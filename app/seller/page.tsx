import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/seller-sidebar/Sidebar";
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Seller(){
    const session = await getServerSession(authOptions);

    if(!session || session.user.role !== "seller"){
        redirect("/seller/signin");
    }
    return(
        <div className="min-h-screen w-full flex flex-col md:flex-row gap-2">
            <Sidebar mode="dashboard"/>
            <Dashboard/>
        </div>
    )
}