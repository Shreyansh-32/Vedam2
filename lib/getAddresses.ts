"use client";
import { prisma } from "./prisma";

export async function getAddressById({id} : {id : number}){
    const addresses = await prisma.address.findMany({
        where : {
            userId : id
        }
    });

    return addresses;
}