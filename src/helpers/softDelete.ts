import { Collection, ObjectId, UpdateResult, DeleteResult } from 'mongodb';
import { getLogger } from '../config/logger.config';

export const aplicarSoftDelete = async (
  collection: Collection<any>,
  id: ObjectId
): Promise<UpdateResult | DeleteResult> => {
  const logger = getLogger();
  const softDeleteEnabled = process.env.SOFT_DELETE === 'true';
  
  if (softDeleteEnabled) {
    logger.debug(`[SoftDelete] Aplicando soft delete al elemento con id: ${id}`);
    return await collection.updateOne(
      { _id: id },
      { $set: { deletedAt: new Date() } }
    );
  } else {
    logger.debug(`[SoftDelete] Aplicando hard delete al elemento con id: ${id}`);
    return await collection.deleteOne({ _id: id });
  }
};