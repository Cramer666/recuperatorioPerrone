import { ObjectId } from "mongodb";
import { Digimon } from "../models/digimon";

export type DbEntityId = ObjectId;

export type DbDigimon = Omit<Digimon, 'evolvesFrom' | 'alternateForm'> &  {
  evolvesFrom?: DbEntityId;
  alternateForm?: DbEntityId;
}