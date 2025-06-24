import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Seller(){
    const session = await getServerSession(authOptions);

    if(!session){
        redirect("/seller/signin");
    }

    return(
        <div>
            Seller Page {JSON.stringify(session)}
            
        </div>
    )
}