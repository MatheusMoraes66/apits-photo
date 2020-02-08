import { Router } from 'express';
const router = Router();

import { createPhoto, getPhotos, getPhoto, deletePhoto, updatePhoto } from '../controllers/photocontroller'
import multer from '../libs/multer'

router.route('/photos')
    .post(multer.single('image'),createPhoto)
    .get(getPhotos);

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto)
    

export default router;