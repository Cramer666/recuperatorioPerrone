import { ExpressRouter } from '../helpers/express.router';
import { DigimonController } from '../controllers/digimon.controller';
import { DigimonService } from '../services/digimon.service';
import { DigimonRepository } from '../respositories/digimon.repository';


export const DigimonRouter = ExpressRouter((router) => {
    const repository = new DigimonRepository();
    const service = new DigimonService(repository);
    const controller = new DigimonController(service);

    router.get('/', controller.getAllHandler);
    router.get('/:id', controller.getByIdHandler);
    router.post('/', controller.crearHandler);
    router.put('/:id', controller.actualizarHandler);
    router.delete('/:id', controller.eliminarHandler);
});
