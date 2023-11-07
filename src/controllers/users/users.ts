import prisma from "../../prisma/prisma";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Token, User } from "./type";
import { Constants } from "../../constants";

export const createUser = async (username: string, password: string): Promise<User> => {
    try {
        const hash = await bcrypt.hash(password, 12)
        return await prisma.user.create({
            data: {
                username: username,
                password: hash,
            },
        });
    } catch (error) {
        throw new Error("The username already exists.");
    }
}

export const findAllUsers = async (): Promise<User[]> => {
    try {
        return await prisma.user.findMany()
    } catch (error) {
        throw new Error("The username already exists.");
    }
}

export const findOneUser = async (id: number): Promise<User | null> => {
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

export const loginlocal = async (username: string, password: string): Promise<Token> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            }
        });
        if (!user) throw new Error("ไม่มี user!!");
        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) throw new Error("รหัสผ่านไม่ถูกต้อง")

        const payload = { sub: user.id, username: user.username };
        const token = jwt.sign(payload, Constants.secretKey, {
            expiresIn: Constants.expiresIn,
        });

        return { access_token: token };
        
    } catch (error) {
        console.log(error)
        throw new Error("The username already exists.");
    }
}