import { ObjectId, Collection, UpdateResult, DeleteResult } from 'mongodb';
import { getLogger } from '../config/logger.config';
import { getDb } from '../config/mongo.config';
//import { Digimon } from '../models/digimon';
import { IdNotFoundError } from '../errors/idNotFound.error';
import { InvalidEntityDataError } from '../errors/invalidEntityData.error';
import { InvalidIdError } from '../errors/invalidId.error';
import { DbDigimon, DbEntityId } from './digimon.dbmodel';
import { aplicarSoftDelete } from '../helpers/softDelete';

type DbEntity = DbDigimon & { deletedAt?: Date };
type DbEntityWithId = DbEntity & {_id: DbEntityId};

export class DigimonRepository {
  private collection: Collection<DbEntity>;

  constructor() {
    getLogger().debug(`[Repository] Inicializando repositorio...`);
    this.collection = getDb().collection<DbEntity>('digimons');
  }

  getAll = async (): Promise<DbEntityWithId[]> => {
    const softDeleteEnabled = process.env.SOFT_DELETE === 'true';
    getLogger().debug(`[Repository] Buscando elementos (SOFT_DELETE=${softDeleteEnabled})...`);
    // START 1
    // return await this.collection.find({attribute: 'Vaccine'}).toArray();
    const filter: any = {};
    
    if (!softDeleteEnabled) {
      filter.$or = [
        { deletedAt: { $exists: false } },
        { deletedAt: null }
      ];
    }
    return await this.collection.find(filter).toArray();
    // END 1
  }

  findAllEvolvingFrom = async (preId: ObjectId, includeDeleted = false): Promise<DbEntityWithId[]> => {
    getLogger().debug(`[Repository] Se buscan multiples elementos como evoluciones...`);
    const filter = includeDeleted
      ? { evolvesFrom: preId }
      : { evolvesFrom: preId, deletedAt: { $exists: false } };
    return await this.collection.find(filter).toArray() as DbEntityWithId[];
  }

  // START 3

  findAllAlternateFormsOf = async (sibilingId: ObjectId, includeDeleted = false): Promise<DbEntityWithId[]> => {
    getLogger().debug(`[Repository] Se buscan multiples elementos como hermanos...`);
    const filter = includeDeleted
      ? { alternateForms: sibilingId }
      : { alternateForms: sibilingId, deletedAt: { $exists: false } };
    return await this.collection.find(filter).toArray() as DbEntityWithId[];
  }

  // END 3

  findAllWithAlternateForm = async (formId: ObjectId): Promise<DbEntityWithId[]> => {
    getLogger().debug(`[Repository] Se buscan todos los digimons que tienen a ${formId} como forma alternativa...`);
    return await this.collection.find({ alternateForms: formId }).toArray();
  };

  getById = async (id: ObjectId, includeDeleted = false): Promise<DbEntityWithId> => {
    const softDeleteEnabled = process.env.SOFT_DELETE === 'true';
    const filter: any = { _id: id };
    
    if (!includeDeleted && softDeleteEnabled) {
      filter.$or = [
        { deletedAt: { $exists: false } },
        { deletedAt: null }
      ];
  }
    
  const result = await this.collection.findOne(filter);
  if (result === null) {
    throw new IdNotFoundError("No hay elemento con id: " + id);
  }
  return result as DbEntityWithId;
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
      delete data['deletedAt']; // evitar modificar deletedAt manualmente

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
    const resultado = await aplicarSoftDelete(this.collection, id);

    if ((resultado as DeleteResult).deletedCount !== undefined) {
      const dr = resultado as DeleteResult;
      if (dr.deletedCount === 0) {
        throw new IdNotFoundError("No hay elemento con id: " + id);
      }
      return dr.deletedCount === 1;
    } else {
      const ur = resultado as UpdateResult;
      if (ur.matchedCount === 0) {
        throw new IdNotFoundError("No hay elemento con id: " + id);
      }
      return ur.modifiedCount === 1;
    }
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