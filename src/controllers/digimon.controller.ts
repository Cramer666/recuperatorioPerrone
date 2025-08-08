import { Request, Response } from 'express';
import { getLogger } from '../config/logger.config';
import { DigimonService } from '../services/digimon.service';

export class DigimonController {
  private service : DigimonService;

  constructor(service: DigimonService) {
    getLogger().debug(`[Controller] Inicializando el controller...`);
    this.service = service;
  }

  getAllHandler = async (req: Request, res: Response) => {
    getLogger().debug(`[Controller] Obteniendo todos los digimons...`);
    const todos = await this.service.getAll();
    res.json(todos);
  };


  getByIdHandler = async (req: Request, res: Response) => {
    getLogger().debug(`[Controller] Manejando obtener uno...`);
    const uno = await this.service.getById(req.params.id);
    res.json(uno);
  };

  crearHandler = async (req: Request, res: Response) => {
    getLogger().debug(`[Controller] Manejando crear uno...`);
    const nueva = await this.service.crear(req.body);
    res.status(201).json(nueva);
  };

  actualizarHandler = async (req: Request, res: Response) => {
    getLogger().debug(`[Controller] Manejando actualizar uno...`);
    const actualizada = await this.service.actualizar(req.params.id, req.body);
    res.json(actualizada);
  };

  eliminarHandler = async (req: Request, res: Response) => {
    getLogger().debug(`[Controller] Manejando borrar uno...`);
    await this.service.eliminar(req.params.id);
    res.json({ mensaje: 'Eliminada' });
  };
}
