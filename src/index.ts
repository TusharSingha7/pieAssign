
import express, { Request, Response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from './middleware';
import { videoSchema , metaItemSchema } from './types';

const app = express();

app.use(cors())
app.use(express.json())

app.use(authMiddleware);

app.post('/videos', async (req: Request, res: Response) : Promise<any> => {
    const client = new PrismaClient();
    const data = req.body;

    const parsedVideo = videoSchema.safeParse(data);

    if (!parsedVideo.success) {
        return res.status(400).json({ error: parsedVideo.error.errors });
    }

    const partialMetaItemSchema = metaItemSchema.pick({label:true , thumbnailUrl : true});

    const parsedMetaItem = partialMetaItemSchema.safeParse(data);

    if (!parsedMetaItem.success) {
        return res.status(400).json({ error: parsedMetaItem.error.errors });
    }

    const video_created = await client.video.create({
        data: {
            title: data.title,
            description: data.description,
            userId: data.userId,
            videoUrl: data.videoUrl,
            metaItem: {
                create: {
                    label: data.label,
                    thumbnailUrl: data.thumbnailUrl 
                }
            }
        },
        select: {
            id: true
        }
    });

    res.status(200).json({ id: video_created.id });

})

app.get('/videos',async (req : Request,res : Response) : Promise<any> =>{

    const client = new PrismaClient();

    try {
        const List = await client.video.findMany({
        include : {
            author : true,
            metaItem : true
        },
        take:10,
        orderBy : {createdAt : 'asc'}
        });
        res.status(200).json(List);
    }

    catch(error) {
        res.status(500).json(error);
    }

});

const PORT = 3000;

app.listen(PORT , ()=>{
    console.log("server listening on port : " + PORT);
})