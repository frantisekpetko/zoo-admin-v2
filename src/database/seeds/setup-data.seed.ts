import { InternalServerErrorException, ConflictException, Logger } from '@nestjs/common';
import { Animal } from '../../entity/animal.entity';
import { resolve } from 'path';
import { Connection, getConnection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import fs from 'fs';
import { Image } from '../../entity/image.entity';
import { Extlink } from '../../entity/extlink.entity';
import { User } from '../../entity/user.entity';
import * as bcrypt from 'bcrypt';


export class SetupData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        //deleteData();
        await animalsData();
        await userSeeds();


        async function deleteData() {
            const conn = getConnection();

            const entities = conn.entityMetadatas;

            for (const entity of entities) {
                const repository = conn.getRepository(entity.name); // Get repository
                await repository.clear(); // Clear each entity table's content
            }
        }

        async function animalsData() {
            console.log(`${process.cwd()}/src/data/seed/animals/animals.json`);
            const fs = require('fs');
            const animalsObj = JSON.parse(
                fs.readFileSync(`${process.cwd()}/src/data/seed/animals/animals.json`, 'utf8'),
            );

            for (const _animal of animalsObj) {
                const animal = new Animal();
                animal.name = _animal.name;
                animal.latinname = _animal.latinname;
                animal.description = _animal.extract;
                const image = new Image();
                image.urlName = _animal.image;

                try {
                    await image.save();
                } catch (e) { }

                animal.images = [image];
                animal.extlinks = [];

                for (const extlink of _animal.extlinks) {
                    const extLink = new Extlink();
                    extLink.link = extlink;
                    try {
                        await extLink.save();
                    } catch (e) { }

                    animal.extlinks.push(extLink);
                }

                try {
                    await animal.save();
                } catch (e) { }
            }
        }

        async function userSeeds() {
            const salt = await bcrypt.genSalt();
            const logger = new Logger(SetupData.name);
            const user = new User();

            user.username = 'user';
            user.salt = salt;
            user.password = await bcrypt.hash('123456', salt);

            try {
                await user.save();
            } catch (error: any) {
                logger.error(error, error.stack);
                if (error?.errno === 19) {
                    //throw new ConflictException('Username already exists');
                } else {
                    //throw new InternalServerErrorException();
                }
            }
        }





    }
}