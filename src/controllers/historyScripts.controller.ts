import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const db = new PrismaClient();

export const listHistoryScripts = async ( req: Request, res: Response ) => {
    const { select, where } = req.body;
    try {
        const histoy_executions = db.histoy_executions;
        const list = await histoy_executions.findMany({ select, where, orderBy:{ id: 'desc' }}); 
        return res.status( 201 ).json( list );
    } catch ( error ) {
        return res.status( 501 ).json( error )
    }
}

export const getHistoryScript = async ( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    const { select } = req.body;
    try {
        const histoy_executions = db.histoy_executions;
        const histoy_execution = await histoy_executions.findUnique( { select, where: { id } } ); 
        return res.status( 201 ).json( histoy_execution );
    } catch ( error ) {
        return res.status( 501 ).json( error )
    }
}

export const createHistoryScript = async ( req: Request, res: Response ) => {
    const new_histoy_executions = req.body;
    try {
        const histoy_executions = db.histoy_executions;
        const histoy_execution = await histoy_executions.create({ data: new_histoy_executions });
        return res.status( 201 ).json( { histoy_execution, message: 'Creado correctamente' } );
    } catch ( error ) {
        return res.status( 501 ).json( error )
    }
}

export const viewHistoryScript = async ( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    try {
        const histoy_executions = db.histoy_executions;
        const histoy_execution = await histoy_executions.findUnique({ where: { id } });
        return res.status( 201 ).contentType('txt').send( histoy_execution?.log );
    } catch ( error ) {
        return res.status( 501 ).json( error )
    }
}