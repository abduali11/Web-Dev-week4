import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  console.log('reqfile in thumbnail', req.file.path);

  const [filename, extension] = req.file.filename.split('.');

  sharp(req.file.path)
    .resize(160, 160)
    .png()
    .toFile(`${req.file.destination}/${filename}_thumb.${extension}`)
    .then(() => next())
    .catch((err) => {
      console.error('Error creating thumbnail:', err);
      next(err);
    });
};

export {createThumbnail};
