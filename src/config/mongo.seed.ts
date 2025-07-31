import process from "process";
import { getLogger } from "./logger.config";
import { DigimonRepository } from "../respositories/digimon.repository";
import * as agumonFactory from './seed/agumon.factory';
import * as gabumonFactory from './seed/gabumon.factory';
import * as palmonFactory from './seed/palmon.factory';

export const seedInitialData = async () => {
    const repo = new DigimonRepository();
    if (process.env.CLEAR_DATA === 'true') {
        const all = await repo.getAll();
        all.forEach(async (e) => {
            await repo.delete(e._id);
        });
        getLogger().info('❌ Borrados datos antiguos');
    }
    if (process.env.SEED_DATA === 'true') {
      const botamon = await repo.create(agumonFactory.botamon());
      const koromon = await repo.create(agumonFactory.koromon(botamon._id));
      const agumon = await repo.create(agumonFactory.agumon(koromon._id));
      const graymon = await repo.create(agumonFactory.graymon(agumon._id));
      const metalgraymon = await repo.create(agumonFactory.metalgraymon(graymon._id));
      const skullgraymon = await repo.create(agumonFactory.skullgraymon(graymon._id));
      await repo.update(metalgraymon._id, { ...metalgraymon, alternateForm: skullgraymon._id});
      await repo.update(skullgraymon._id, { ...skullgraymon, alternateForm: metalgraymon._id});

      const punimon = await repo.create(gabumonFactory.punimon());
      const tsunomon = await repo.create(gabumonFactory.tsunomon(punimon._id));
      const gabumon = await repo.create(gabumonFactory.gabumon(tsunomon._id));
      const garurumon = await repo.create(gabumonFactory.garurumon(gabumon._id));
      const weregarurumon = await repo.create(gabumonFactory.weregarurumon(garurumon._id));

      const pabumon = await repo.create(palmonFactory.pabumon());
      const yuramon = await repo.create(palmonFactory.yuramon(pabumon._id));
      const palmon = await repo.create(palmonFactory.palmon(yuramon._id));
      const togemon = await repo.create(palmonFactory.togemon(palmon._id));
      const lillymon = await repo.create(palmonFactory.lillymon(togemon._id));
    }
}
