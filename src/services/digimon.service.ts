import { getLogger } from "../config/logger.config";
import { Digimon } from "../models/digimon";
import { DbDigimon, DbEntityId } from "../respositories/digimon.dbmodel";
import { DigimonRepository } from "../respositories/digimon.repository";

type Entity = Digimon;
type DbEntity = DbDigimon;
type EntityWithId = Digimon & { _id: string };

export class DigimonService {

  private repo : DigimonRepository;

  constructor(repo : DigimonRepository) {
    getLogger().debug(`[Service] Inicializando el servicio...`);
    this.repo = repo;
  }

  getAll = async (): Promise<EntityWithId[]> => {
    getLogger().debug(`[Service] Se piden todos los elementos...`);
    return (await this.repo.getAll()).map((d) => this.toEntityWithStringIds(d));
  };

  getById = async (id: string): Promise<EntityWithId> => {
    getLogger().debug(`[Service] Se pide el elemento con id: ${id}...`);
    const element = await this.repo.getById(this.repo.toEntityId(id));
    return this.toEntityWithStringIds(element);
  };

  crear = async (data: Entity): Promise<EntityWithId> => {
    getLogger().debug(`[Service] Se crea un nuevo elemento...`);
    const element = await this.repo.create(this.fromEntityWithStringIds(data) as Entity & { evolvesFrom?: DbEntityId, alternateForm?: DbEntityId });
    return this.toEntityWithStringIds(element);
  };

  actualizar = async (id: string, data: Partial<Entity>) => {
    getLogger().debug(`[Service] Se actualiza el elemento con id: ${id}...`);
    const element = await this.repo.update(this.repo.toEntityId(id), this.fromEntityWithStringIds(data));
    return this.toEntityWithStringIds(element);
  };

  eliminar = async (id: string) => {
    getLogger().debug(`[Service] Se elimina el elemento con id: ${id}...`);
    const allEvolutions = await this.repo.findAllEvolvingFrom(this.repo.toEntityId(id));
    for (const evolution of allEvolutions) {
      await this.eliminar(this.repo.fromEntityId(evolution._id));
    }
    // START 3
    const allSibilings = await this.repo.findAllAlternateFormsOf(this.repo.toEntityId(id));
    for (const sibiling of allSibilings) {
      await this.repo.update(sibiling._id, { alternateForm: undefined });
    }
    // END 3
    await this.repo.delete(this.repo.toEntityId(id));
  };

  private toEntityWithStringIds = (entity: DbEntity & {_id: DbEntityId}): EntityWithId => {
    return {
      ...entity,
      _id: this.repo.fromEntityId(entity._id),
      evolvesFrom: entity.evolvesFrom ? this.repo.fromEntityId(entity.evolvesFrom) : undefined,
      // START 3
      alternateForm: entity.alternateForm ? this.repo.fromEntityId(entity.alternateForm) : undefined,
      // END 3
    };
  }

  private fromEntityWithStringIds = (entity: Partial<Entity>): Partial<DbEntity> => {
    return {
      ...entity,
      evolvesFrom: entity.evolvesFrom ? this.repo.toEntityId(entity.evolvesFrom) : undefined,
      alternateForm: entity.alternateForm ? this.repo.toEntityId(entity.alternateForm) : undefined
    };
  }
}