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

const handleFirebaseUpload = async (req, res, next) => {
  const { file } = req;

  const fileName = `user-${req.user?.id}-${Date.now()}.${file.mimetype.split('/')[1]}`;
  const imagesRef = ref(firebaseStorage, `images/${fileName}`);
  const metadata = {
    contentType: file.mimetype,
    contentDisposition: 'inline', // to view in browser
  };

  try {
    await uploadBytes(imagesRef, file.buffer, metadata);
    const url = await getDownloadURL(imagesRef);
    req.body.image = url;
    next();
  } catch (err) {
    next(new AppError('There was a problem with uploading the file!', 500));
  }
};

const upload = multer({ storage, fileFilter });

export { upload, handleFirebaseUpload };
