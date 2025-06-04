
import zod from 'zod'

export const metaItemSchema = zod.object({
    videoId : zod.string(),
    thumbnailUrl : zod.string().optional(),
    label : zod.string()
})

export const videoSchema = zod.object({
    title : zod.string(),
    description : zod.string(),
    userId : zod.string(),
    videoUrl : zod.string(),
    metaItem : metaItemSchema.optional()
})

export const userSchema = zod.object({
    username : zod.string(),
    avatarUrl : zod.string(),
    videos : videoSchema.array()
})