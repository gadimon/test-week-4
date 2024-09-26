import express, { Router } from 'express';
import { createNewBeeper, geAllBeepers, getDetailsOfSpecificBeeperByID, updateTheStatusOfSpecificBeeper, deleteSpecificBeeperByID, getBeepersByStatus } from '../controllers/beeferController.js';


const router: Router = express.Router();

router.route('/').get(geAllBeepers);
router.route('/:id').get(getDetailsOfSpecificBeeperByID);
router.route('/status/:status').get(getBeepersByStatus);
router.route('/').post(createNewBeeper);
router.route('/:id/status').put(updateTheStatusOfSpecificBeeper);
router.route('/:id').delete(deleteSpecificBeeperByID);


export default router;