import { PrismaClient } from '@prisma/client';


export default function prisma () {
    
    prisma = new PrismaClient(); 
    return prisma 

} 