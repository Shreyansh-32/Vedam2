import { prisma } from "./prisma";

export async function getFeedbacks(productId : number){

    const feedbacks = await prisma.feedback.findMany({
        where:{
            productId
        }
    });

    return feedbacks;
}

export async function getAvgFeedbacks(productId : number){

    const avgFeedbacks = await prisma.feedback.aggregate({
        where:{
            productId
        },
        _count:{id:true},
        _avg:{rating:true}
    });

    return avgFeedbacks;
}