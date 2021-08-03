import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import * as child from 'child_process';

const db = new PrismaClient();

export const listGroups = async ( req: Request, res: Response ) => {
    const { select, where } = req.body;
    try {
        const groups = db.groups;
        const list = await groups.findMany({ select, where, orderBy:{ id: 'desc' }}); 
        return res.status( 201 ).json( list );
    } catch ( error ) {
        return res.status( 501 ).json( error )
    }
}

export const getGroup = async ( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    const { select } = req.body;
    try {
        const groups = db.groups;
        const group = await groups.findUnique( { select, where: { id } } ); 
        return res.status( 201 ).json( group );
    } catch ( error ) {
        return res.status( 501 ).json( error )
    }
}

export const createGroup = async ( req: Request, res: Response ) => {
    const new_group = req.body;
    try {
        const groups = db.groups;
        const group = await groups.create({ data: new_group });
        return res.status( 201 ).json( { group, message: 'Creado correctamente' } );
    } catch ( error ) {
        return res.status( 501 ).json( error )
    }
}