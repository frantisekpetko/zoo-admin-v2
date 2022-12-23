const fs = require('fs');
const { resolve } = require('path');
const axios = require('axios');

async function getImages() {
  const image_finder = require('image-search-engine');

  const downloadImage = (url, image_path) =>
    axios({
      url,
      responseType: 'stream',
    }).then(
      (response) =>
        new Promise((resolve, reject) => {
          response.data
            .pipe(fs.createWriteStream(image_path))
            .on('finish', () => resolve())
            .on('error', (e) => reject(e));
        }),
    );

  const namesObj = JSON.parse(
    fs.readFileSync(resolve('./src/data/seed/animals/names.json'), 'utf8'),
  );

  const latinnamesObj = JSON.parse(
    fs.readFileSync(resolve('./src/data/seed/animals/latinnames.json'), 'utf8'),
  );

  let imagesObj = [];

  fs.rmSync(resolve('./frontend/public/images'), {
    recursive: true,
    force: true,
  });

  fs.mkdir(resolve('./frontend/public/images'), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');
  });

  await Promise.all(
    latinnamesObj.map(async (animal, index) => {
      try {
        const url = await image_finder.find(animal, {
          size: 'medium',
        });

        const animalWihoutWhiteSpace = animal.replace(/\s/g, '');

        const imageName = `${animalWihoutWhiteSpace}.jpg`;
        await downloadImage(
          `${url}`,
          resolve(`./frontend/public/images/${imageName}`),
        ).catch((e) => console.log('Error: ', e));
        imagesObj.push({
          name: namesObj[index],
          latinname: animal,
          image: imageName,
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }),
  );

  fs.writeFileSync(
    './src/data/seed/animals/images.json',
    JSON.stringify(imagesObj, null, 4),
    'utf8',
  );
}

async function createAnimalJSONfile() {


  const imagesObj = JSON.parse(
    fs.readFileSync(resolve('./src/data/seed/animals/images.json'), 'utf8'),
  );

  const wiki = require('wikijs').default;

  let animalObj = [];

  try {
    await Promise.all(
      imagesObj.map(async (data, index) => {
        try {
          let content = [];

          wiki({ apiUrl: 'https://cz.wikipedia.org/w/api.php' })
            .page(data.latinname)
            .then(async (page) => {
              //content = await page.content();
              content = await page.chain().summary().extlinks().request();
              animalObj.push({
                name: data.name,
                latinname: data.latinname,
                image: data.image,
                extract: content.extract,
                extlinks: [...content.extlinks],
              });
            })
            .catch((e) => console.error('Error: ', e))
            .finally(() => {
              fs.writeFile(
                './src/data/seed/animals/animals.json',
                JSON.stringify(animalObj, null, 4),
                'utf8',
                () => console.log('Mkdir Done'),
              );

            });
        } catch (e) {
          console.error('Error: ', e);
        } finally {

        }
      }),
    );
  } catch (e) {
    console.error(e);
  }
}

(async () => {
  await getImages();
  await createAnimalJSONfile();
  //animalsLength();
})().catch((e) => console.error(e));

