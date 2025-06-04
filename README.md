# pieAssign

## clone the Repo

# Initialize with Docker
 - execute the following command in order 
 - docker build -t image_name
 - docker run --name container_name -e DATABASE_URL="your_database_url" -d image_name
 - if running database in local machine as container replace localhost with host.docker.internal
    - your url shoudl look something like this in this case "postgresql://useranme:user_password@host.docker.internal:3000/database_name"

# Initialize without docker 

- Run npm install
- create .env file
- add DATABASE_URL="your_database_url" field in .env
- Run npx prisma db push 
- Run npx tsc -b
- Run node dist/index.js
- query the api using browser or postman at http://localhost:3000/videos , url is same for both post and get endpoint

# Data Seeding

- if not using docker
    - Run npx prisma db seed

- if using docker
    - Initialize the container (run the container)
    - Run docker exec -it <container-id> /bin/sh
    - You should see a shell started with prefix /app #
    - Run npx prisma db seed
    - exit 
    - the database is seeded with some data 

# API ENPOINTS

- /videos 
    - get method retireves all the videos
- /video
    - post method used to add video in database with following data inputs (all are string)
        - userId
        - videoUrl
        - thumbnailUrl
        - label
        - title
        - description 
- /users
    - get method retrieves all the users
- /user
    - post method used to add user in database with following data inputs (all string)
        - username (has to be unique)
        - avatarUrl

{
    "id": "cmbi290uy0000zjao4n4jcs2s"
}