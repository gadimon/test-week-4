import { v4 as uuidv4 } from "uuid";
import { readFromJson, writeToJson, deleteFromJson } from "../dal/access.js"
import { Beeper } from "../models/types.js";
import { Status } from '../utils/status.js'


export const createBeeper = async (name: string): Promise<Beeper> => {
  const beeperId: string = uuidv4();

  const newBeeper: Beeper = {
    id: beeperId,
    name: name,
    status: Status.manufactured,
    created_at : new Date(),
    detonated_at: undefined,
    latitude : 0,
    longitube: 0

  };
  await writeToJson(newBeeper);
  return newBeeper;
};



export const getBeepers = async (): Promise<Beeper[] | undefined> => {
  const beepers: Beeper[] = await readFromJson();
  return beepers;
};


export const getBeeperByID = async (id: string): Promise<Beeper> => {
  const beepers: Beeper[] = await readFromJson();
  const beeperFind: Beeper | undefined = beepers.find((beeper) => beeper.id === id);

  if (!beeperFind) {
    throw new Error("not available");
  }

  return beeperFind;
};


export const updateTheStatusOfBeeper = async (id: string, status:string): Promise<string> => {
  const beeper: Beeper = await getBeeperByID(id);
  const newStatus = status;

  const newBeeper: Beeper = {
    id: beeper.id,
    name: beeper.name,
    status: newStatus,
    created_at : beeper.created_at,
    detonated_at: beeper.created_at,
    latitude : beeper.latitude,
    longitube:beeper.longitube

  };
  await writeToJson(newBeeper);
  return newStatus;
  
};

export const deleteBeeperByID = async (id: string): Promise<void> => {
  const deleteBeeper: Beeper = await getBeeperByID(id);
  await deleteFromJson(deleteBeeper);
};
 

