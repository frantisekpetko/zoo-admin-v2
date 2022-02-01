const { resolve } = require('path');
const fs = require('fs-extra');
const oldfs = require('fs');

fs.mkdir(resolve('./dist/src/data'), { recursive: true }, (err) => {
    if (err) throw err;
});
return fs.move(
    resolve('./database.sqlite'),
    resolve('./dist/src/data/database.sqlite'),
    (error) => {
        if (error) {
            // Show the error
            //console.error(error);
        } else {
            // List all the filenames after renaming
            /*
            oldfs.unlink(resolve('./database.sqlite'),
                (error) => {
                    if (error) {
                        console.log(error)
                    }
                }
            );
            */
            console.log('\nFile moved!\n');
        }
    },
);