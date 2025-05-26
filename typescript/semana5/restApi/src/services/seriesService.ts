import { Serie } from '../models/serie';
import { CreateSerieDTO, UpdateSerieDTO } from '../models/serieDTO';
import { AppDataSource } from '../database/database';

export class SerieService {
  private SeriesRepository = AppDataSource.getRepository(Serie);

  async createSerie (data: CreateSerieDTO): Promise<Serie> {
    const newSerie = this.SeriesRepository.create(data);
    return this.SeriesRepository.save(newSerie);
  }

  async getAllSeries(): Promise<Serie[]> {
    return this.SeriesRepository.find();
  }

  async getSerieById(id: number): Promise<Serie | null> {
    return this.SeriesRepository.findOne({ where: { id: BigInt(id) }});
  }

  async updateSerie(id: number, data: UpdateSerieDTO): Promise<Serie | null> {
    const Serie = await this.getSerieById(id);
    if (!Serie) return null;

    this.SeriesRepository.merge(Serie, data);
    return this.SeriesRepository.save(Serie);
  }

  async deleteSerie(id: number): Promise<boolean> {
    // Consider consequences: deleting a category might affect flashcards associated with it.
    // TypeORM's onDelete: 'cascade' in FlashcardCategories join table handles this by deleting join table entries.
    // If direct flashcards should be deleted or unlinked, additional logic is needed here.
    const result = await this.SeriesRepository.delete(String(id));
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
  }
} 