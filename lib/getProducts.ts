import { prisma } from "./prisma";

export async function getProducts(sellerId : number , page : number){
    const product = await prisma.product.findMany({
        where:{
            sellerId
        },
        skip:(page-1)*5,
        take:5
    });

    return product;
}       

export async function getOrders(sellerId : number){
    const product = await prisma.product.findMany({
        where : {
            sellerId
        }
    });

    const productIds = product.map((prod) => prod.id);

    if(productIds.length === 0){
        return [];
    }

    const orders = await prisma.order.findMany({
        where:{
            productId:{
                in : productIds
            }
        }
    });
    return orders;
}