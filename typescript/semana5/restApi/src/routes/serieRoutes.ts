import { Router } from 'express';
import { SerieController } from '../controllers/serieController';

const router = Router();
const serieController = new SerieController();

router.post('/', serieController.createSerie);
router.get('/', serieController.getAllSeries);
router.get('/:id', serieController.getSerieById);
router.put('/:id', serieController.updateSerie);
router.delete('/:id', serieController.deleteSerie);

export default router; 