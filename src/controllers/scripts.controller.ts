import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const db = new PrismaClient();

export const listScripts = async ( req: Request, res: Response ) => {
    const { select, where } = req.body;
    try {
        const scripts = db.scripts;
        const list = await scripts.findMany({ select, where, orderBy:{ id: 'desc' }}); 
        return res.status( 201 ).json( list );
    } catch ( error ) {
        return res.status( 501 ).json( error )
    }
}

export const getScript = async ( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    const { select } = req.body;
    try {
        const scripts = db.scripts;
        const script = await scripts.findUnique( { select, where: { id } } ); 
        return res.status( 201 ).json( script );
    } catch ( error ) {
        return res.status( 501 ).json( error )
    }
}

export const createScript = async ( req: Request, res: Response ) => {
    const new_script = req.body;
    try {
        const scripts = db.scripts;
        const script = await scripts.create({ data: new_script });
        return res.status( 201 ).json( { script, message: 'Creado correctamente' } );
    } catch ( error ) {
        return res.status( 501 ).json( error )
    }
}

export const executeScript = async ( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    try {
        const scripts = db.scripts;
        const script = await scripts.findUnique( { where: { id } } );
        return res.status( 201 ).json( script );
    } catch ( error ) {
        return res.status( 501 ).json( error )
    }
}