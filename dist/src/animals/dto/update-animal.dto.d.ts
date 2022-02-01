import { Extlinks } from './extlinks.dto';
import { Image } from '../../entity/image.entity';
export declare class UpdateAnimalDto {
    id: number;
    name: string;
    latinname: string;
    description: string;
    images: Image[];
    extlinks: Extlinks[];
}
