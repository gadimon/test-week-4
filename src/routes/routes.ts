import express, { Router } from 'express';
import { addBeeper, geAllBeepers, getBeeperById, updateBeeperSTatus, deleteBeeperById } from '../controller/beeper.controller';


const router: Router = express.Router();

router.route('/').get(geAllBeepers);
router.route('/:id').get(getBeeperById);
router.route('/').post(addBeeper);
router.route('/:id/status').put(updateBeeperSTatus);
router.route('/:id').delete(deleteBeeperById);


export default router;