import { prisma } from "./prisma";

export async function getRevenue(sellerId : number){
    const products = await prisma.product.findMany({
        where:{
            sellerId : sellerId
        },
        select:{
            id : true
        }
    });

    const productIds = products.map(product => product.id);

    if (productIds.length === 0) {
        return {
            orders : [],
            _sum: { price: 0 , quantity : 0},
            _count: { id: 0 }
        };
    }

    const revenue = await prisma.order.aggregate({
        where:{
           productId:{
            in : productIds
           },
           status:{
            in : ["placed" , "shipped" , "delivered"]
           }
        },
        _sum : {
            price : true,
            quantity : true
        },
        _count : {
            id : true
        },
        
    });
    
    return revenue;
}

export async function getOrders(sellerId : number){
    const products = await prisma.product.findMany({
        where : {
            sellerId
        }
    });

    const productIds = products.map((product) => product.id);
    if(productIds.length === 0){
        return [];
    }

    const orders = await prisma.order.findMany({
        where:{
            productId : {
                in : productIds
            }
        }
    });

    return orders;
}


export async function getOrdersByProduct(sellerId : number){
    const products = await prisma.product.findMany({
        where : {
            sellerId
        }
    });

    const productIds = products.map((product) => product.id);
    if(productIds.length === 0){
        return [];
    }

    const ordersByProduct = await prisma.order.findMany({
        where:{
            productId : {
                in : productIds
            },
            status:{
                in : ["placed" , "shipped" , "delivered"]
            }
        },
        include:{
            product : true
        }
    });

    if(ordersByProduct.length === 0)return [];

    const arr = [
        {category : "Hindi-literautre" ,quantity : 0 , price : 0},
        {category : "Biography" ,quantity : 0 , price : 0},
        {category : "Finance" ,quantity : 0 , price : 0},
        {category : "Fiction" ,quantity : 0 , price : 0},
        {category : "Religious" ,quantity : 0 , price : 0},
        {category : "History" ,quantity : 0 , price : 0},
        {category : "Business" ,quantity : 0 , price : 0},
        {category : "Classic" ,quantity : 0 , price : 0},
    ]

    ordersByProduct.forEach((order) => {
        arr.forEach((cat) => {
            if(cat.category === order.product.category){
                cat.price += order.price;
                cat.quantity += order.quantity;
            }
        })
    })

    return arr;
}

export async function getStatus(sellerId : number){
    const products = await prisma.product.findMany({
        where : {
            sellerId
        }
    });

    const productIds = products.map((product) => product.id);
    if(productIds.length === 0){
        return [];
    }

    const orders = await prisma.order.groupBy({
        by: "status",
        where:{
            productId:{
                in:productIds
            }
        },
        _count:{
            id:true
        }
    });

    const stauts : {name : string , value : number}[] = [];
    orders.forEach((order) => {
        if(order._count.id)
        stauts.push({name : order.status , value : order._count.id});
    })
    return stauts; 
}

export async function getRatings(sellerId : number){
    const products = await prisma.product.findMany({
        where : {
            sellerId
        }
    });

    const productIds = products.map((product) => product.id);
    if(productIds.length === 0){
        return [];
    }

    const feedback = await prisma.feedback.groupBy({
        by: "rating",
        where:{
            productId : {
                in : productIds
            }
        },
        _count:{
            id:true
        }
    });
    const rating : {name : string , value : number}[]  = [];
    feedback.forEach((feed) => {
        if(feed._count.id)
            rating.push({name : feed.rating.toString() , value : feed._count.id});
    })
    return rating;
}