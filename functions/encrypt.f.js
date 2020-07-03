const os = require('os');
const path = require('path');
const fs = require('fs');

const functions = require('firebase-functions');
const Busboy = require('busboy');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.ENCRYPTPASS || 'myTotalySecretKey');

const cors = require('cors')({
  origin: true,
});


exports = module.exports = functions.https.onRequest(
  async (req, res) => {
    return cors(req, res, () => {
      if (req.method === "POST") {
        let result;
        let filepath;
        const busboy = new Busboy({ headers: req.headers });
        const tmpdir = os.tmpdir();

        busboy.on('file', (fieldname, file, filename) => {
          filepath = path.join(tmpdir, filename);

          file.on('data', (data) => {
            console.log('Processing');
            result = cryptr.encrypt(data);
            fs.writeFileSync(filepath, result);
          });
          file.on('end', () => {
            console.log('File [' + fieldname + '] Finished');
          });
        });

        busboy.on('finish', async () => {
          console.log('Done parsing form!');
          console.log(`Sending ${filepath}`);
          res.sendFile(filepath);
        });
        busboy.end(req.rawBody);
      } else {
        res.sendStatus(400);
      }
    }
    )
  }
);