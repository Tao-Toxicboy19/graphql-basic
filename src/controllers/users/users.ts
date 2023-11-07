import prisma from "../../prisma/prisma";

export const createUser = async (username: string, password: string) => {
    try {
        return await prisma.user.create({
            data: {
                username,
                password,
            },
        });
    } catch (error) {
        throw new Error("The username already exists.");
    }
}

export const findAllUsers = async () => {
    try {
        return await prisma.user.findMany()
    } catch (error) {
        throw new Error("The username already exists.");
    }
}

export const findOneUser = async (id: number) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id: id
            }
        })
    } catch (error) {
        throw new Error("The username already exists.");
    }
}