import { ObjectId, Collection } from 'mongodb';
import { getLogger } from '../config/logger.config';
import { getDb } from '../config/mongo.config';
//import { Digimon } from '../models/digimon';
import { IdNotFoundError } from '../errors/idNotFound.error';
import { InvalidEntityDataError } from '../errors/invalidEntityData.error';
import { InvalidIdError } from '../errors/invalidId.error';
import { DbDigimon, DbEntityId } from './digimon.dbmodel';

type DbEntity = DbDigimon;
type DbEntityWithId = DbEntity & {_id: DbEntityId};

export class DigimonRepository {
  private collection : Collection<DbEntity>;

  constructor() {
    getLogger().debug(`[Repository] Inicializando repositorio...`);
    this.collection = getDb().collection<DbEntity>('digimons');
  }

  getAll = async (): Promise<DbEntityWithId[]> => {
    getLogger().debug(`[Repository] Se buscan multiples elementos...`);
    // START 1
    // return await this.collection.find({attribute: 'Vaccine'}).toArray();
    return await this.collection.find().toArray();
    // END 1
  }

  findAllEvolvingFrom = async (preId: ObjectId): Promise<DbEntityWithId[]> => {
    getLogger().debug(`[Repository] Se buscan multiples elementos como evoluciones...`);
    return await this.collection.find({evolvesFrom: preId}).toArray();
  }

  // START 3
  findAllAlternateFormsOf = async (sibilingId: ObjectId): Promise<DbEntityWithId[]> => {
    getLogger().debug(`[Repository] Se buscan multiples elementos como hermanos...`);
    return await this.collection.find({alternateForm: sibilingId}).toArray();
  }
  // END 3
  findAllWithAlternateForm = async (formId: ObjectId): Promise<DbEntityWithId[]> => {
    getLogger().debug(`[Repository] Se buscan todos los digimons que tienen a ${formId} como forma alternativa...`);
    return await this.collection.find({ alternateForms: formId }).toArray();
  };

  getById = async (id: ObjectId): Promise<DbEntityWithId> => {
    getLogger().debug(`[Repository] Se busca el elemento con id: ${id}...`);
    const result = await this.collection.findOne({ _id: id })
    if (result === null) {
      throw new IdNotFoundError("No hay elemento con id: " + id);
    }
    return result;
  }

create = async (entity: DbEntity): Promise<DbEntityWithId> => {
  getLogger().debug(`[Repository] Se creará un nuevo elemento...`);
  try {
    delete entity['_id'];

    const actual = new Date();

    const digimonConTimestamps = {
      ...entity,
      createdAt: actual,
      updatedAt: actual
    };

    const result = await this.collection.insertOne(digimonConTimestamps);
    return { ...digimonConTimestamps, _id: result.insertedId };
  } catch (err: any) {
    getLogger().debug(err.message);
    throw new InvalidEntityDataError('No se pudo guardar');
  }
};


  update = async (id: ObjectId, data: Partial<DbEntity>): Promise<DbEntityWithId> => {
    getLogger().debug(`[Repository] Se actualizará el elemento con id: ${id}...`);
    try {
      delete data['_id'];

      const result = await this.collection.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            ...data,
            updatedAt: new Date()
          }
        },
        { returnDocument: 'after' }
      );
      if (result === null) {
        throw new IdNotFoundError("No hay elemento con id: " + id);
      }
      return result;
    } catch (err: any) {
      getLogger().debug(err.message);
      throw new InvalidEntityDataError('No se pudo guardar');
    }
  };


  delete = async (id: ObjectId): Promise<boolean> => {
    getLogger().debug(`[Repository] Se eliminará el elemento con id: ${id}...`);
    const result = await this.collection.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new IdNotFoundError("No hay elemento con id: " + id);
    }
    return result.deletedCount === 1;
  }

  toEntityId = (id: string): DbEntityId => {
    try {
      return new ObjectId(id)
    } catch (err) {
      throw new InvalidIdError(`El id "${id}" es invalido. Se debe pasar un id hexadecimal de 24 caracteres.`)
    }
  }

  fromEntityId = (id?: DbEntityId): string => {
    if (id === undefined) { return undefined }
    return id.toHexString();
  }
}
