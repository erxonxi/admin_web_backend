import { Router } from 'express';
import { createScript, executeScript, getScript, listScripts } from '../controllers/scripts.controller';

const router = Router();

router.post( '/api/scripts', listScripts );
router.get( '/api/script/:id', getScript );
router.post( '/api/script', createScript );
router.get( '/api/script/:name/execute', executeScript );

export default router;