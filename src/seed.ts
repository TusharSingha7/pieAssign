
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.user.upsert({
        where : {username : 'Alice'},
        create: {
            username: 'Alice',
            avatarUrl: 'fake_url',
            videos: {
                create: {
                    title: 'first_video',
                    description: 'seeded sample video with fake details',
                    videoUrl: 'fake_url',
                    metaItem : {
                        create : {
                            thumbnailUrl : 'fake_url',
                            label : 'fake_label'
                        }
                    }
                },
          },
      },
      update : {}
  });

  await prisma.video.upsert({
    where: { id: 'some-unique-id' }, 
    create: {
            author : {
                connect: { username: 'Alice' }
            },
            title: 'second_video',
            description: 'seeded sample video with fake details',
            videoUrl: 'fake_url',
            metaItem : {
                create : {
                    thumbnailUrl : 'fake_url',
                    label : 'fake_label'
                }
            }
        },
    update: {}
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })