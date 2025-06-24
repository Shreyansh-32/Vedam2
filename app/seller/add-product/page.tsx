import AddProduct from "@/components/add-product/AddProduct";
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function AddProductPage() {

    const session = await getServerSession(authOptions);

    if(!session || !session.user || !session.user.id){
        redirect("/seller/signin");
    }

    return (
        <div className="w-full min-h-[100vh] bg-background">
            <AddProduct sellerId = {session.user.id}/>
        </div>
    );
}