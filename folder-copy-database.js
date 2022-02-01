const { resolve } = require('path');
const fs = require('fs-extra');
const oldfs = require('fs');

fs.move(
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
   