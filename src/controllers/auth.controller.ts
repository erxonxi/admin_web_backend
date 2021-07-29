import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";
import { config } from "./config";

const db = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
    try {
        const users = db.users;
        // Getting the Request Body
        const { username, email, password } = req.body;
        // Creating a new User Object
        const newUser = {
            username,
            email,
            password: await encryptPassword(password),
        };

        try {
            const list = await users.findMany({ where: { username } });
            if (list.length > 0) return res.status(401).json({ message: "Nombre de usuario en uso." });
        } catch (error) {
            return res.status(501).json(error)
        }

        // Create User
        const user = await users.create({ data: newUser });

        // Create a token
        const token = jwt.sign({ id: user.username }, config.JWT_SECRET_KEY, {
            expiresIn: 86400, // 24 hours
        });
        return res.status(200).json({ user, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const signin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const users = db.users;
        const userFound = await users.findFirst({ where: { username } })
        if (!userFound) return res.status(401).json({ message: "Usuario no encontrado." });
        const matchPassword = await comparePassword(
            password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(401).json({
                token: null,
                message: "Invalid Password",
            });

        const token = jwt.sign({ id: userFound.username }, config.JWT_SECRET_KEY, {
            expiresIn: 86400, // 24 hours
        });

        res.json({ user: userFound, token });
    } catch (error) {
        console.log(error);
    }
};

const encryptPassword = async ( password: string ) => {
    const salt = await bcrypt.genSalt( 10 );
    return await bcrypt.hash( password, salt );
};

const comparePassword = async ( password: string, receivedPassword: string ) => {
    return await bcrypt.compare(password, receivedPassword)
}