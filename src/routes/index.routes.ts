import { Router } from 'express';
import { signin, signUp } from '../controllers/auth.controller';
import { createGroup, getGroup, listGroups } from '../controllers/group.controller';
import { createHistoryScript, getHistoryScript, listHistoryScripts, viewHistoryScript } from '../controllers/historyScripts.controller';
import { createScript, executeFile, executeScript, getScript, listScripts } from '../controllers/scripts.controller';

const router = Router();

// Auth
router.post( '/api/auth/singup', signUp );
router.post( '/api/auth/singin', signin );

// Scripts
router.post( '/api/scripts', listScripts );
router.get( '/api/script/:id', getScript );
router.post( '/api/script', createScript );
router.get( '/api/script/:name/execute', executeScript );
router.get( '/api/script/:name/file', executeFile );

// HistoryScripts
router.post( '/api/history_scripts', listHistoryScripts );
router.get( '/api/history_script/:id', getHistoryScript );
router.post( '/api/history_script', createHistoryScript );
router.get( '/api/history_script/:id/view', viewHistoryScript );

// Group
router.post( '/api/groups', listGroups );
router.get( '/api/group/:id', getGroup );
router.post( '/api/group', createGroup );

export default router;