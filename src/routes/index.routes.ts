import { Router } from 'express';
import { createHistoryScript, getHistoryScript, listHistoryScripts, viewHistoryScript } from '../controllers/historyScripts.controller';
import { createScript, executeScript, getScript, listScripts } from '../controllers/scripts.controller';

const router = Router();

// Scripts
router.post( '/api/scripts', listScripts );
router.get( '/api/script/:id', getScript );
router.post( '/api/script', createScript );
router.get( '/api/script/:name/execute', executeScript );

// HistoryScripts
router.post( '/api/history_scripts', listHistoryScripts );
router.get( '/api/history_script/:id', getHistoryScript );
router.post( '/api/history_script', createHistoryScript );
router.get( '/api/history_script/:id/view', viewHistoryScript );

export default router;