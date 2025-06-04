
import express, { Request, Response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from './middleware';
import { videoSchema , metaItemSchema, userSchema } from './types';

const app = express();

app.use(cors())
app.use(express.json())

app.use(authMiddleware);

app.post('/video', async (req: Request, res: Response) : Promise<any> => {
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
            title: parsedVideo.data.title,
            description: parsedVideo.data.description,
            userId: parsedVideo.data.userId,
            videoUrl: parsedVideo.data.videoUrl,
            metaItem: {
                create: {
                    label: parsedMetaItem.data.label,
                    thumbnailUrl: parsedMetaItem.data.thumbnailUrl || ""
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

app.post('/user',async (req : Request,res : Response)=>{

    const data = req.body;
    const partialUserSchema = userSchema.pick({
        username : true,
        avatarUrl : true
    });

    const parsedUser = partialUserSchema.safeParse(data);

    if(!parsedUser.success) res.status(400).json({error : parsedUser.error.errors})

    const client = new PrismaClient();

    const userId = await client.user.create({
        data : {
            username : parsedUser.data!.username,
            avatarUrl : parsedUser.data!.avatarUrl
        },
        select : {
            id : true
        }
    });

    res.status(200).json(userId)

});

app.get('/users',async (req : Request,res : Response)=>{

    const client = new PrismaClient();

    const users = await client.user.findMany({
        take: 10,
        orderBy : { createdAt : 'asc' }
    })

    res.status(200).json(users)

})

const PORT = 3000;

app.listen(PORT , (error)=>{
    console.log(error);
})