import { authOptions } from "@/lib/auth/options";
import { getBookById } from "@/lib/getBooks";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function placeOrder({quantity , addressId , bookId} : {quantity : string , addressId : string , bookId : string}){
    const session = await getServerSession(authOptions);
    if(!session || !session.user.id)return false;
   const quantityNumber = quantity ? parseInt(quantity) : null;
   const addressIdNumber = addressId ? parseInt(addressId) : null;
   const bookIdNumber = bookId ? parseInt(bookId) : null;

   if(!quantityNumber || !addressIdNumber || !bookIdNumber)return false;

   const book = await getBookById(bookIdNumber);
   if(!book)return false;
   const price = quantityNumber * book?.price;
   try {
    await prisma.order.create({
        data:{
           productId : bookIdNumber,
           userId :  session.user.id,
           quantity : quantityNumber,
           price,
           addressId : addressIdNumber,
           status : "placed"
        }
    });
    await prisma.product.update({
        where:{
            id : bookIdNumber
        },
        data:{
            quantity : {decrement : quantityNumber}
        }
    })
    return true;
   } catch (error) {
        console.error(error);
        return false;
   }
}