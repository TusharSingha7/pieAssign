
import zod from 'zod'


export const likesSchema = zod.object({

    id : zod.string(),
    userId : zod.string(),
    interactionId : zod.string().optional()

})

export const commentSchema = zod.object({

    userId : zod.string(),
    commentSectionId : zod.string(),
    context : zod.string()

})

export const viewsSchema = zod.object({

    id : zod.string(),
    userId : zod.string(),
    interactionId : zod.string().optional()

})

export const metaItemSchema = zod.object({

    thumbnailUrl : zod.string().optional(),
    label : zod.string()

})

export const videoSchema = zod.object({

    title : zod.string(),
    description : zod.string(),
    userId : zod.string(),
    videoUrl : zod.string()

})

export const userSchema = zod.object({

    username : zod.string(),
    avatarUrl : zod.string()

})

