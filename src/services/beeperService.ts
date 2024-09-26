import { v4 as uuidv4 } from "uuid";
import { readFromJson, writeToJson, deleteFromJson, updateJson } from "../dal/access"
import { Beeper } from "../models/types";
import { Status } from '../utils/status'
import { Latitude, Longitude } from '../coordinates/coordinates'

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
  const theBeeper: Beeper | undefined = beepers.find((b) => b.id === id);

  if (!theBeeper) {
    throw new Error("not available");
  }

  return theBeeper;
};


export const updateBeeperStatus = async (id: string, lat?: number, lon?: number): Promise<string> => {
  const beeper: Beeper = await getBeeperByID(id);
  const oldStatus = beeper.status;
  const newStatus: string = theNextEnum(oldStatus);

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
 

function theNextEnum(status: string): string {
  let newStatus: string = '';
  switch (status) {
    case 'manufactured':
      newStatus = 'assembled';
      break;
    case 'assembled':
      newStatus = 'shipped';
      break;
    case 'shipped':
      newStatus = 'deployed';
      break;
    case 'deployed':
      newStatus = 'detonated';
      break;
    case 'detonated':
      newStatus = "It's not possible to change status";
      break;
    default:
      newStatus = 'Invalid status';
  }
  return newStatus;
}
