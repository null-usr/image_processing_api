import express from 'express';
import { resizeImage } from '../../util/img';
import { checkFSForThumbImage } from '../../util/img';
import { loadImage } from '../../util/img';
import { thumbnailPath } from '../../util/img';
//https://www.npmjs.com/package/sharp
const images = express.Router();

//create get endpoint for api/images
images.get('/', (req, res): void | undefined => {
    //we reach the route with no query strings
    if (Object.keys(req.query).length === 0) {
        res.status(200).send(
            'Images route, please add your desired width and height as query parameters!'
        );
    } else {
        try {
            const width_s: string = (req.query.width as unknown) as string;
            const width: number = parseInt(width_s);
            const height_s: string = (req.query.height as unknown) as string;
            const height: number = parseInt(height_s);

            //validate the input
            if (isNaN(width) || isNaN(height)) {
                throw 'Either the given Width or Height is not a number!';
            }

            //get the filename and extension, if no extension in the parameter, assume jpg
            let filename: string = (req.query.filename as unknown) as string;

            if (filename === undefined || filename === '') {
                throw 'Filename is undefined!';
            }

            const ext = filename.split('.');
            if (ext.length == 1) {
                filename = filename.concat('.jpg');
            }

            //serve image to user
            //the thumbnail already exists, no need to resize, just load and serve it
            if (checkFSForThumbImage(filename, width, height)) {
                const resized_image = loadImage(
                    thumbnailPath(filename, width, height)
                );
                resized_image.pipe(res).status(200);
            } else {
                resizeImage(filename, width, height)
                    .then(() => {
                        const resized_image = loadImage(
                            thumbnailPath(filename, width, height)
                        );
                        resized_image.pipe(res).status(200);
                    })
                    .catch((error) => {
                        res.status(400).send(
                            `threw ${error} using filename: ${filename}`
                        );
                        return;
                    })
                    .finally();
                // resized_image.toBuffer().then( image => {
                // 	res.send(image);
                // 	//resized_image.pipe(res);
                // 	}
                // );
                //serve to user
            }
            //res.send(`Request to resize the ${filename} image to width: ${width}  height: ${height} has been received!`);
        } catch (error) {
            res.status(400).send(
                `threw an error using width of: ${req.query.width}  and height of: ${req.query.height} : ${error}`
            );
        }
    }
});

export default images;
