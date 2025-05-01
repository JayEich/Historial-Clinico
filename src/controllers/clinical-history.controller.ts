import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { ClinicalHistory } from '../entities/clinical-history.entity';
import { CreateHistoryDto } from '../dto/clinical-history.dto';
import { validate } from 'class-validator';
import { User } from '../entities/user.entity';
import axios from 'axios';

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

    //PAL DIAGNOSTICO SUGERIDO
    static async suggestDiagnosis(req: Request, res: Response) {
      const repo = AppDataSource.getRepository(ClinicalHistory);
      const userId = (req as any).user?.id;
    
      const history = await repo.findOne({
        where: { id: req.params.id, patient: { id: userId } },
      });
    
      if (!history) {
        return res.status(404).json({ message: 'Historial no encontrado' });
      }
    
      const symptoms = history.symptoms;
    
      // Por si hay API Key (aunque un poco mas lento)
      if (process.env.OPENAI_API_KEY) {
        try {
          const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
              model: 'text-davinci-003',
              prompt: `Eres un médico profesional. Sugiere un diagnóstico probable a partir de estos síntomas: ${symptoms}`,
              max_tokens: 60,
              temperature: 0.7
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
              }
            }
          );
    
          const suggestion = response.data.choices[0].text.trim();
    
          return res.status(200).json({
            symptoms,
            suggestedDiagnosis: suggestion,
            source: "openai"
          });
        } catch (error) {
          console.error("Error al usar OpenAI:", error);
        }
      }
    
      // Simulado (por si falla o no hay key)
      let simulated = "Se recomienda acudir a un médico para evaluación profesional.";
      if (symptoms.includes("fiebre") && symptoms.includes("dolor")) {
        simulated = "Podría tratarse de una infección viral.";
      } else if (symptoms.includes("tos") && symptoms.includes("cansancio")) {
        simulated = "Podría ser una gripe común.";
      }
    
      return res.status(200).json({
        symptoms,
        suggestedDiagnosis: simulated,
        source: "simulado"
      });
    }
        
  }
  