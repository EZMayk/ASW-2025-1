import { Request, Response } from 'express';
import { SerieService } from '../services/seriesService';
import { CreateSerieDTO, UpdateSerieDTO } from '../models/serieDTO';

export class SerieController {
  private SerieService = new SerieService();

  createSerie = async (req: Request, res: Response): Promise<void> => {
    try {
      const createSerieDTO: CreateSerieDTO = req.body;
      if (!createSerieDTO.name) {
        res.status(400).json({ message: 'Category name is required' });
        return;
      }
      const newSerie = await this.SerieService.createSerie(createSerieDTO);
      res.status(201).json(newSerie);
    } catch (error: any) {
      if (error.code === '23505') { // Unique constraint violation for name
        res.status(409).json({ message: 'Serie name already exists' });
      } else {
        res.status(500).json({ message: 'Error creating serie', error: error.message });
      }
    }
  };

  getAllSeries = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await this.SerieService.getAllSeries();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching series', error: (error as Error).message });
    }
  };

  getSerieById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid serie ID' });
        return;
      }
      const category = await this.SerieService.getSerieById(id);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: 'Serie not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching serie', error: (error as Error).message });
    }
  };

  updateSerie = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid category ID' });
        return;
      }
      const updateSerieDTO: UpdateSerieDTO = req.body;
      if (Object.keys(updateSerieDTO).length === 0) {
        res.status(400).json({ message: 'No update data provided' });
        return;
      }
      const updatedSerie = await this.SerieService.updateSerie(id, updateSerieDTO);
      if (updatedSerie) {
        res.status(200).json(updatedSerie);
      } else {
        res.status(404).json({ message: 'Serie not found' });
      }
    } catch (error: any) {
       if (error.code === '23505') { // Unique constraint violation for name
        res.status(409).json({ message: 'Serie name already exists' });
      } else {
        res.status(500).json({ message: 'Error updating serie', error: error.message });
      }
    }
  };

  deleteSerie = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid serie ID' });
        return;
      }
      const success = await this.SerieService.deleteSerie(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Serie not found or could not be deleted' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting serie', error: (error as Error).message });
    }
  };
} 