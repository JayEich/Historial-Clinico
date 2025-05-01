import { Router } from 'express';
import { ClinicalHistoryController } from '../controllers/clinical-history.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// @ts-expect-error ---TypeScript se queja, pero funciona entonces es paq no llore---
router.post('/', verifyToken, ClinicalHistoryController.create);
// @ts-expect-error
router.get('/', verifyToken, ClinicalHistoryController.getAll);
// @ts-expect-error
router.get('/:id', verifyToken, ClinicalHistoryController.getById);
// @ts-expect-error
router.put('/:id', verifyToken, ClinicalHistoryController.update);
// @ts-expect-error
router.delete('/:id', verifyToken, ClinicalHistoryController.delete);
// @ts-expect-error
router.post('/:id/suggest-diagnosis', verifyToken, (req, res) => ClinicalHistoryController.suggestDiagnosis(req, res));


export default router;
