import {Request, Response} from 'express'
import path from "path";
import fs from "fs-extra";

import Photo from '../models/Photo'

export async function getPhotos(req: Request, res: Response): Promise<Response>{
    const photos = await Photo.find();
    if(photos){
        return res.json({
            status: 200,
            photos
        });
    }
    return res.json({
        status: 404,
        message: 'Sorry (^-^)/'
    })
}

export async function getPhoto(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const photo = await Photo.findById(id);

    return res.json(photo);
}

export async function deletePhoto(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id);
    if(photo){
      await fs.unlink(path.resolve(photo.imagePath))

    }
    return res.json({
        message: 'Photo Deleted',
        photo
    });
}

export async function updatePhoto(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const {title, description} = req.body;
        const updatedphoto ={
            title: title,
            description: description
        }
        const photo = await Photo.findByIdAndUpdate(id, updatedphoto);
        return res.json({
            message: 'SuccessFully Updated',
            photo
        });
    
}

export async function createPhoto(req: Request, res: Response): Promise<Response>{
    const { title, description } = req.body;

    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file.path
    }
    const photo = new Photo(newPhoto);
    await photo.save();    
    return res.json({
        message: 'Photo successfully saved'
    })
}