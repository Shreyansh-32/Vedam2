import Sidebar from "@/components/seller-sidebar/Sidebar";
import SellerProducts from "@/components/SellerProducts";
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Product() {
  const session = await getServerSession(authOptions);
      if(!session || session.user.role !== "seller"){
          redirect("/seller/signin");
      }

      return(
          <div className="min-h-screen w-full flex flex-col md:flex-row gap-2">
              <Sidebar mode="products"/>
              <SellerProducts sellerId={session.user.id} />
          </div>
      )
}
