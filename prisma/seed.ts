import { PrismaClient } from "@prisma/client";
let db = new PrismaClient();

async function seed() {
  await Promise.all(
    getSkills().map(joke => {
      return db.skills.create({ data: joke });
    })
  );
}

seed();

function getSkills() {
  return [
    {    
        name: 'JavaScript',
        sort: 1
    },
    {    
        name: 'CSS/HTML',
        sort: 2
    },
    {    
        name: 'React',
        sort: 3
    },
    {    
        name: 'NodeJS',
        sort: 6
    },
    {
        name: 'Remix',
        sort: 1
    }
  ];
}