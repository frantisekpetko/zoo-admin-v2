const { resolve } = require('path');
const fs = require('fs');

fs.access(resolve('./database.sqlite'), fs.F_OK, (err) => {
  if (err) {
    //console.error(err);
    return fs.rename(
      resolve('./dist/src/data/database.sqlite'),
      resolve('./database.sqlite'),
      (error) => {
        if (error) {
          // Show the error
          console.error(error);
        } else {
          // List all the filenames after renaming
          console.log('\nFile moved!\n');
        }
      },
    );
  } else {
    fs.mkdir(resolve('./dist/src/data'), { recursive: true }, (err) => {
      if (err) throw err;
    });
    return fs.rename(
      resolve('./database.sqlite'),
      resolve('./dist/src/data/database.sqlite'),
      (error) => {
        if (error) {
          // Show the error
          //console.error(error);
        } else {
          // List all the filenames after renaming
          console.log('\nFile moved!\n');
        }
      },
    );
  }
});
