// import fs from 'fs';
// import path from 'path';
// import multer from 'multer';

// // Ensure uploads directory exists
// const uploadsDir = path.resolve(process.cwd(), 'uploads');
// if (!fs.existsSync(uploadsDir)) {
// 	fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Configure disk storage for multer
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, uploadsDir);
// 	},
// 	filename: function (req, file, cb) {
// 		const ext = path.extname(file.originalname);
// 		const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
// 		cb(null, `${Date.now()}-${base}${ext}`);
// 	},
// });

// export const upload = multer({ storage });



// server/configs/multer.js (MANDATORY FIX)

import multer from 'multer';

// CRITICAL FIX: The synchronous call to fs.mkdirSync is what crashes Vercel.
// We replace disk storage with memory storage, which is serverless-safe.
const storage = multer.memoryStorage();

// Multer now stores the file in req.file.buffer (in RAM).
// This requires you to handle the cloud upload (e.g., to S3 or Cloudinary) 
// inside your route handlers (userRoutes.js).
export const upload = multer({ storage: storage });
