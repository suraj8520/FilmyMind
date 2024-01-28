import multer from 'multer';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AppError from '../utils/appError.js';
import { firebaseStorage } from './../services/firebase.js';

const storage = multer.memoryStorage();

const fileFilter = async (req, file, cb) => {
  if (file.mimetype.split('/')[0] == 'image') {
    cb(null, true);
  } else {
    console.log(file);
    cb(new AppError('FileType not supported', 400), false);
  }
};

const createFileName = (type, id, ext) => {
  if (type === 'logo') {
    return `user-${id}-${Date.now()}.${ext}`;
  }
  if (type === 'coverImage') {
    return `postCover-${id}-${Date.now()}.${ext}`;
  }
  if (type === 'contentImage') {
    return `post-${id}-${Date.now()}.${ext}`;
  }
};

const handleFirebaseUpload = (imgType = 'logo') => {
  return async (req, res, next) => {
    const { file } = req;
    console.log(file);
    const fileName = createFileName(
      imgType,
      req.user.id,
      file.mimetype.split('/')[1],
    );
    const imagesRef = ref(firebaseStorage, `${file.fieldname}/${fileName}`);
    const metadata = {
      contentType: file.mimetype,
      contentDisposition: 'inline', // to view in browser
    };

    try {
      await uploadBytes(imagesRef, file.buffer, metadata);
      const url = await getDownloadURL(imagesRef);
      if (imgType === 'logo') req.body.image = url;
      else if (imgType === 'coverImage') req.body.coverImage = url;
      else if (imgType === 'contentImage') req.body.contentImage = url;
      next();
    } catch (err) {
      next(new AppError('There was a problem with uploading the file!', 500));
    }
  };
};

const upload = multer({ storage, fileFilter });

export { upload, handleFirebaseUpload };
