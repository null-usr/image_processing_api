import sharp from 'sharp';
import path from 'path';
import process from 'process';
//import { promises as fsPromises } from 'fs'
import fs from 'fs';

export const fullsizePath = (filename: string): string => {
    return path.join(process.cwd(), 'assets', 'full', filename);
};

export const loadImage = (filename: string): sharp.Sharp => {
    const image = sharp(filename);
    return image;
};

export const thumbnailPath = (
    filename: string,
    width: number,
    height: number
): string => {
    const name_and_ext = filename.split('.');
    const name = name_and_ext[0];
    const ext = name_and_ext[1];

    const format = name.concat(
        '_',
        width.toString(),
        'x',
        height.toString(),
        '.',
        ext
    );
    return path.join(process.cwd(), 'assets', 'thumb', format);
};

//use sharp to resize image if possible and return a promise
//parameters: filename, width and height
export const resizeImage = (
    filename: string,
    width: number,
    height: number
): Promise<sharp.OutputInfo> => {
    const fullsize = loadImage(fullsizePath(filename));
    const outputPath = thumbnailPath(filename, width, height);

    //const image = sharp(fullsize);

    const output = fullsize.resize(width, height);
    //.toBuffer() //this presumably returns a promise
    //.then( data => {  })
    //.catch( err => {  });

    //toFile();
    return output.toFile(outputPath);
};

//check to see if we already have this image & dimension
//should return a bool if the file exists
export const checkFSForThumbImage = (
    filename: string,
    width: number,
    height: number
): boolean => {
    const thumbPath = thumbnailPath(filename, width, height);
    try {
        if (fs.existsSync(thumbPath)) {
            return true;
        }
    } catch (err) {
        return false;
    }
    return false;
};
