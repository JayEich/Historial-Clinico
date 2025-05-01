import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { ClinicalHistory } from '../entities/clinical-history.entity';
import { CreateHistoryDto } from '../dto/clinical-history.dto';
import { validate } from 'class-validator';
import { User } from '../entities/user.entity';

export class ClinicalHistoryController {
    static async create(req: Request, res: Response) {
      const repo = AppDataSource.getRepository(ClinicalHistory);
      const userRepo = AppDataSource.getRepository(User);
  
      const dto = new CreateHistoryDto();
      Object.assign(dto, req.body);
  
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({
          message: "Los datos enviados no son válidos.",
          errors,
        });
      }
  
      const userId = (req as any).user?.id;
      const user = await userRepo.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      const history = repo.create({ ...dto, patient: user });
      await repo.save(history);
  
      return res.status(201).json({
        message: 'Historial clínico creado correctamente.',
        data: history,
      });
    }
  
    static async getAll(req: Request, res: Response) {
      const repo = AppDataSource.getRepository(ClinicalHistory);
      const userId = (req as any).user?.id;
  
      const histories = await repo.find({
        where: { patient: { id: userId } },
      });
  
      if (histories.length === 0) {
        return res.status(200).json({
          data: [],
          message: "No hay historiales clínicos registrados aún."
        });
      }
  
      return res.status(200).json({
        message: "Lista de historiales obtenida correctamente.",
        data: histories
      });
    }
  
    static async getById(req: Request, res: Response) {
      const repo = AppDataSource.getRepository(ClinicalHistory);
      const userId = (req as any).user?.id;
  
      const history = await repo.findOne({
        where: { id: req.params.id, patient: { id: userId } },
      });
  
      if (!history) {
        return res.status(404).json({ message: 'Historial no encontrado' });
      }
  
      return res.status(200).json({
        message: 'Historial clínico obtenido correctamente.',
        data: history
      });
    }
  
    static async update(req: Request, res: Response) {
      const repo = AppDataSource.getRepository(ClinicalHistory);
      const userId = (req as any).user?.id;
  
      const history = await repo.findOne({
        where: { id: req.params.id, patient: { id: userId } },
      });
  
      if (!history) {
        return res.status(404).json({ message: 'Historial no encontrado' });
      }
  
      repo.merge(history, req.body);
      await repo.save(history);
  
      return res.status(200).json({
        message: 'Historial clínico actualizado exitosamente.',
        data: history
      });
    }
  
    static async delete(req: Request, res: Response) {
      const repo = AppDataSource.getRepository(ClinicalHistory);
      const userId = (req as any).user?.id;
  
      const history = await repo.findOne({
        where: { id: req.params.id, patient: { id: userId } },
      });
  
      if (!history) {
        return res.status(404).json({ message: 'Historial no encontrado' });
      }
  
      await repo.remove(history);
  
      return res.status(200).json({
        message: 'Historial clínico eliminado correctamente.'
      });
    }
  }
  