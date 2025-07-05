import { prisma } from "./prisma";

interface GetBooksProps{
    search ?: string;
    category ?: string;
    sort ?: string;
    page : number;
    productPerPage : number;
}

export async function getBooks({search, category, sort, page, productPerPage}: GetBooksProps) {
    if (page < 1) {
        page = 1;
    }
    const res = await prisma.product.findMany({
        where:{
            ...(search && {
                OR:[
                    {title : {contains : search , mode : "insensitive"}},
                    {author : {contains : search , mode : "insensitive"}}
                ]
            }),
            ...(category && {
                category: category
            })
        },
        orderBy:{
            ...(sort === "low-high" && {price : "asc"}),
            ...(sort === "high-low" && {price : "desc"})
        },
        skip : (page-1) * productPerPage,
        take : productPerPage
    });

    return res;
}

export async function getBooksCount({search , category} : {search ?: string, category ?: string}){
    const count = await prisma.product.count({
        where : {
            ...(search && {
                OR:[
                    {title : {contains : search , mode : "insensitive"}},
                    {author : {contains : search , mode : "insensitive"}}
                ]
            }),
            ...(category && {
                category:category
            })
        }
    });
    return count;
}