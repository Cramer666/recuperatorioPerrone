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
    const entitySinIds = this.fromEntityWithStringIds(data);
    const creado = await this.repo.create(entitySinIds);

    // START 3 - Actualizar formas alternativas (bidireccional)
    const id = creado._id;
    const alternates = entitySinIds.alternateForms || [];

    for (const altId of alternates) {
      const alt = await this.repo.getById(altId);
      const yaLoTiene = alt.alternateForms?.some(x => x.toHexString() === id.toHexString());
      if (!yaLoTiene) {
        await this.repo.update(altId, {
          alternateForms: [...(alt.alternateForms || []), id]
        });
      }
    }
    // END 3

    return this.toEntityWithStringIds(creado);
  };

  actualizar = async (id: string, data: Partial<Entity>) => {
    getLogger().debug(`[Service] Se actualiza el elemento con id: ${id}...`);
    const entityId = this.repo.toEntityId(id);
    const original = await this.repo.getById(entityId);
    const nuevo = this.fromEntityWithStringIds(data);

    // START 3 - limpiar formas que ya no están
    const viejas = original.alternateForms || [];
    const nuevas = nuevo.alternateForms || [];

    const quitadas = viejas.filter(
      v => !nuevas.some(n => n.toHexString() === v.toHexString())
    );

    for (const altId of quitadas) {
      const alt = await this.repo.getById(altId);
      const actualizadas = (alt.alternateForms || []).filter(
        x => x.toHexString() !== entityId.toHexString()
      );
      await this.repo.update(altId, { alternateForms: actualizadas });
    }
    // END 3

    const actualizado = await this.repo.update(entityId, nuevo);

    // START 3 - agregar nuevas formas si no lo tienen
    for (const altId of nuevas) {
      const alt = await this.repo.getById(altId);
      const yaLoTiene = alt.alternateForms?.some(x => x.toHexString() === entityId.toHexString());
      if (!yaLoTiene) {
        await this.repo.update(altId, {
          alternateForms: [...(alt.alternateForms || []), entityId]
        });
      }
    }
    // END 3

    return this.toEntityWithStringIds(actualizado);
  };

  eliminar = async (id: string) => {
    getLogger().debug(`[Service] Se elimina el elemento con id: ${id}...`);
    const objId = this.repo.toEntityId(id);
    const allEvolutions = await this.repo.findAllEvolvingFrom(objId);
    for (const evolution of allEvolutions) {
      await this.eliminar(this.repo.fromEntityId(evolution._id));
    }

    // START 3
    const allWithThisAsAlternate = await this.repo.findAllWithAlternateForm(objId);
    for (const digimon of allWithThisAsAlternate) {
      const updatedForms = digimon.alternateForms.filter((formId) => formId.toHexString() !== objId.toHexString());
      await this.repo.update(digimon._id, { alternateForms: updatedForms });
    }
    // END 3

    await this.repo.delete(objId);
  };

  private toEntityWithStringIds = (entity: DbEntity & {_id: DbEntityId}): EntityWithId => {
    return {
      ...entity,
      _id: this.repo.fromEntityId(entity._id),
      evolvesFrom: entity.evolvesFrom ? this.repo.fromEntityId(entity.evolvesFrom) : undefined,
      // START 3
      alternateForms: entity.alternateForms?.map(this.repo.fromEntityId),
      // END 3
    };
  }

  private fromEntityWithStringIds = (entity: Partial<Entity>): DbEntity => {
    return {
      ...entity,
      evolvesFrom: entity.evolvesFrom ? this.repo.toEntityId(entity.evolvesFrom) : undefined,
      alternateForms: entity.alternateForms?.map(this.repo.toEntityId),
    } as DbDigimon;
  }
}
