import  jsonfile from 'jsonfile';
import { Beeper } from '../models/types';



const dbPath = process.env.dbPath || './data/beeper.json';


export const writeToJson = async (beeper: Beeper): Promise<void> => {
  const beepers: Beeper[] = await jsonfile.readFile(dbPath);
  beepers.push(beeper);
  await jsonfile.writeFile(dbPath, beepers);
};

export const writeBeepersToJson = async (beepers: Beeper []): Promise<void> => {
  await jsonfile.writeFile(dbPath, beepers);
};

export const readFromJson = async (): Promise<Beeper[]> => {
  const beepers: Beeper[] = await jsonfile.readFile(dbPath);
  return beepers;
};

  
export const deleteFromJson = async (beeper: Beeper ): Promise<void> => {
const beepers: Beeper[] = await readFromJson();
const beeperFind: Beeper | undefined = beepers.find((b) => b.id === beeper.id);
if (beeperFind) {
    const index  = beepers.findIndex((i) => i.id === beeperFind.id);
    beepers.splice(index, 1);
    await jsonfile.writeFile(dbPath, beepers);
}
};