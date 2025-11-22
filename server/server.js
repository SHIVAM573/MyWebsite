import express from 'express';
import cors from 'cors';
import'dotenv/config.js';
import connectDB from './configs/db.js';
import {inngest, functions} from './inngest/index.js'
import { serve } from 'inngest/express'
import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import storyRouter from './routes/storyRoutes.js';
import messageRouter from './routes/messageRoutes.js';

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get('/',(req,res)=> res.send('Server is running...'));
app.use('/api/inngest',serve({client: inngest, functions}));
app.use('/api/user',userRouter)
app.use('/api/post', postRouter)
app.use('/api/story',storyRouter)
app.use('/api/message',messageRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));

// export default app;


// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config.js'; // Must be first to load environment variables
// import connectDB from './configs/db.js';
// import { inngest, functions } from './inngest/index.js';
// import { serve } from 'inngest/express';
// import { clerkMiddleware } from '@clerk/express';
// import userRouter from './routes/userRoutes.js';

// const app = express();

// // 1. Database Connection: Call the function to initialize the connection cache.
// //    DO NOT use await here in the top-level scope.
// connectDB();

// app.use(express.json());
// app.use(cors());
// app.use(clerkMiddleware());

// app.get('/', (req, res) => res.send('Server is running...'));
// app.use('/api/inngest', serve({ client: inngest, functions }));
// app.use('/api/user', userRouter);

// // 2. CRITICAL FIX: The app.listen() block MUST be removed for Vercel/Serverless deployment.
// // const PORT = process.env.PORT || 4000;
// // app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));

// // 3. EXPORT: Use the ES module default export syntax.
// export default app;