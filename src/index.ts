import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

//load our router object with the root of api
app.use('/api', routes);

app.listen(port, (): void | undefined => {
    console.log(`server started at http://localhost:${port}`);
});

export default app;
