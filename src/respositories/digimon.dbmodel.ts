import { ObjectId } from "mongodb";
import { Digimon } from "../models/digimon";

export type DbEntityId = ObjectId;

export type DbDigimon = Omit<Digimon, 'evolvesFrom' | 'alternateForms'> & {
  evolvesFrom?: DbEntityId;
  alternateForms?: DbEntityId[];
  deletedAt: { $in: [null, undefined] }
};