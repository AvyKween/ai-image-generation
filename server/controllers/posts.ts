import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../models/Post';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const getPosts = async(req: Request, res: Response) => {

    try {
        const posts = await Post.find()

        res.status(200).json({
            ok: true,
            posts
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Check console for details'
        })
    }
}

export const createPost = async(req: Request, res: Response) => {

    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const post = new Post({
            name,
            prompt,
            photo: photoUrl.url
        });
        await post.save(); 

        res.status(201).json({
            ok: true,
            newPost: post
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Check console for details'
        })
    }
}
