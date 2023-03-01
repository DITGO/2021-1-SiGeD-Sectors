const Sector = require("../Models/SectorSchema.js");
const db = require("../config/dbConnect");

const sectors = [
    new Sector ({
        name: 'setor um',
        description: 'setor número um',
      }),
    new Sector ({
        name: 'setor dois',
        description: 'setor número dois',
      }),
    new Sector ({
        name: 'setor três',
        description: 'setor número três',
      }),
    new Sector ({
        name: 'setor quatro',
        description: 'setor número quatro',
      }),
    new Sector ({
        name: 'setor cinco',
        description: 'setor número cinco',
      }),
];

db.on("error", console.log.bind(console, 'Error on connecting to MongoDB'));
db.once("open", () => {
  console.log('MongoDB is connected');
})

const sectorsLength = sectors.length;

sectors.forEach(async (sector, index) => {
  try {
    const result = await sector.save();
    if (index === sectorsLength - 1) {
      console.log("Sectors seeds done!");
      db.close();
    }
  } catch (error) {
    const err = new Error(`${error?.message}`);
    console.log(`Sector seed failed - ${err}`);
    db.close();
    process.exit(0);
  }
});

