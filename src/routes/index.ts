import express from 'express';
import images from './api/images';
const routes = express.Router();

//create the root API route and add our images route to this
routes.get('/', (req, res): void | undefined => {
    res.send('Main API route');
});
routes.use('/images', images);

export default routes;
