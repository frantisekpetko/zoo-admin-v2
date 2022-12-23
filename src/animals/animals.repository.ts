import { EntityRepository, getConnection, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Animal } from '../entity/animal.entity';
import { Image } from '../entity/image.entity';
import { Extlink } from '../entity/extlink.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@EntityRepository(Animal)
export class AnimalRepository extends Repository<Animal> {
  private logger: Logger = new Logger(`<${AnimalRepository.name}>`);

  async getPagesNumber(limit: number, search: string): Promise<number> {
    const queryLength = this.createQueryBuilder('animal');

    queryLength
      .select([
        'animal.id',
        'animal.name',
        'animal.latinname',
        'animal.createdAt',
        'animal.updatedAt',
      ])
      .innerJoinAndSelect(`animal.images`, 'image');


    try {
      const animalsLength = await queryLength.getMany();
      let animalsAfterSearch = [];
      if (search !== '') {
        animalsAfterSearch = animalsLength.filter(
          animal => {
            ['name'].some(key => {
              if (animal[key].toLowerCase() == 'čáp' || animal[key].toLowerCase() == 'Čáp') {
                this.logger.log(animal[key].toLowerCase(), search.toLowerCase());
              }
            });

            return ['name', 'latinname'].some(key => animal[key].toLowerCase().includes(search.toLowerCase()));
          })



        this.logger.log(animalsAfterSearch.length, 'animalsLength');
        return animalsLength.length !== 0
          ? Math.ceil(animalsAfterSearch.length / limit)
          : animalsAfterSearch.length;
      }

      this.logger.log(animalsLength.length, 'animalsLength');
      return animalsLength.length !== 0
        ? Math.ceil(animalsLength.length / limit)
        : animalsLength.length;
    } catch (error: any) {
      this.logger.error(`Failed to get tasks for animals`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getAll(page: number, limit: number, search: string): Promise<Animal[]> {
    const query = this.createQueryBuilder('animal');

    query
      .select([
        'animal.id',
        'animal.name',
        'animal.latinname',
        'animal.createdAt',
        'animal.updatedAt',
      ])
      .innerJoinAndSelect(`animal.images`, 'image')
      ;


    try {

      let animals = await query
        .getMany();

      if (search !== '') {
        animals = animals.filter(
          animal =>
            ['name', 'latinname'].some(key => animal[key].toLowerCase().includes(search.toLowerCase()))
        );
      }


      animals = [...animals.slice(
        page === 1 ? 0 : ((page) * limit) - limit - 1,
        page === 1 ? ((page) * limit) : ((page) * limit) - 1)
      ];

      return animals;
    } catch (error: any) {
      this.logger.error(`Failed to get tasks for animals`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id): Promise<Animal> {
    const query = this.createQueryBuilder('animal');
    query
      .where('animal.id = :animalId', { animalId: id })
      .innerJoinAndSelect(`animal.images`, 'image')
      .innerJoinAndSelect('animal.extlinks', 'extlink');

    try {
      const animal = await query.getOne();
      return animal;
    } catch (error: any) {
      this.logger.error(`Failed to get tasks for animals`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async removeOne(id) {
    this.logger.log(`${id}`);

    const connection = await getConnection();

    await connection.query('PRAGMA foreign_keys=OFF');
    await getConnection().createQueryBuilder()
      .delete()
      .from(Animal)
      .where("id = :id", { id: id })
      .execute();
    await connection.query('PRAGMA foreign_keys=ON');
  }

  async createOne(createAnimalDto: CreateAnimalDto) {

    const _animal = createAnimalDto;
    this.logger.log(JSON.stringify(createAnimalDto));
    const animal = new Animal();
    animal.name = _animal.name;
    animal.latinname = _animal.latinname;
    animal.description = _animal.description;
    const image = new Image();
    image.urlName = _animal.image;
    this.logger.error(_animal.image);
    try {
      await image.save();
    } catch (e) {
      this.logger.log(e);
    }

    animal.images = [image];

    animal.extlinks = [];

    for (const extlink of _animal.extlinks) {
      const extLink = new Extlink();
      extLink.link = extlink;
      try {
        await extLink.save();
      } catch (e) {
        this.logger.log(e);
      }
      animal.extlinks.push(extLink);
    }

    try {
      await animal.save();
    } catch (e) {
      this.logger.log(e);
    }

  }

  async updateRecord(id: number, updateAnimalDto: UpdateAnimalDto) {
    const animal = await this.findOne(id);

    animal.name = updateAnimalDto.name;
    animal.latinname = updateAnimalDto.latinname;
    animal.description = updateAnimalDto.description;


    animal.extlinks = [];
    animal.images = [];
    
    const image = new Image();
    image.urlName = updateAnimalDto.image;
    this.logger.warn(updateAnimalDto.image);
    try {
      await image.save();
    } catch (e) {
      this.logger.log(e);
    }


    animal.images.push(image);

    for (const extlink of updateAnimalDto.extlinks) {
      const extLink: any = new Extlink();

      extLink.link = extlink;
      try {
        await extLink.save();
      } catch (e) {
        this.logger.log(e);
      }
      animal.extlinks.push(extLink);
    }

    try {
      await getConnection().getRepository(Animal).save(animal)

    } catch (e) {
      this.logger.log(e);
    }

  }
}
