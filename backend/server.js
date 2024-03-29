import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import connectDatabase from './config/database.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase();

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
