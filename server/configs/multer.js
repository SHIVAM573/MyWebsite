import multer from 'multer';

// Use memoryStorage for serverless compatibility (Vercel, etc.).
// Do not perform any synchronous fs operations here.
const storage = multer.memoryStorage();

// Export simple multer instance; files will be available as Buffer on
// req.file.buffer (single) or req.files[...].buffer (array/fields).
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB per file
});
