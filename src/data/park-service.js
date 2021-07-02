const fs = require('fs');

module.exports = {
    get() {
        return new Promise((resolve, reject) => {
            fs.readFile('/usr/src/api/src/data/parks.json', 'utf8', (err, content) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }

                let parks = JSON.parse(content);
                resolve(parks);
            });
        });
    },
    save(newPark) {
        return new Promise((resolve, reject) => {
            this.get().then(parks => {
                parks.push(newPark);
                fs.writeFile('/usr/src/api/src/data/parks.json', JSON.stringify(parks), (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
        });
    }
};