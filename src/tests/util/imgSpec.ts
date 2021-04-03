import path from 'path';
import process from 'process';
import fs from 'fs';

import { resizeImage } from '../../util/img';
import { checkFSForThumbImage } from '../../util/img';
import { loadImage } from '../../util/img';
import { fullsizePath } from '../../util/img';
import { thumbnailPath } from '../../util/img';

//not exactly how to make the path tests universal...

describe('Test Image Processing Helper Results', () => {
    it('finds the fullsize test image path', () => {
        expect(fullsizePath('test.jpg')).toBe(
            path.join(process.cwd(), 'assets', "full", 'test.jpg')
        );
    });

    it('finds the thumbnail test image path', () => {
        expect(thumbnailPath('test.jpg', 100, 100)).toBe(
            path.join(process.cwd(), 'assets', "thumb", 'test_100x100.jpg')
        );
    });

    it('finds the thumbnail image in the file system', () => {
        expect(checkFSForThumbImage('test.jpg', 200, 200)).toBe(true);
    });
});

//here we want to create an image and check info, then after all delete the image
describe('Test Image Processing Results', () => {
    const width = 100;
    const height = 100;

    //delete resized images
    afterAll(() => {
        try {
            fs.unlinkSync(thumbnailPath('test.jpg', 100, 100));
        } catch (err) {
            console.error(err);
        }
    });

    //.toBeResolved() doesn't seem to be available
    it('loads the test image', async function () {
        const test_img = loadImage(fullsizePath('test.jpg'));
        await test_img.metadata().then((metadata) => {
            expect(metadata).toBeTruthy();
        });
    });

    it('creates a 100x100 image', () => {
        resizeImage('test.jpg', 100, 100).then((outputInfo) => {
            const result: boolean =
                outputInfo.width == width && outputInfo.height == height;
            expect(result).toBe(true);
        });
    });

    it('finds loads the thumbnail image', () => {
        const test_img = loadImage(thumbnailPath('test.jpg', width, height));
        test_img.metadata().then((metadata) => {
            const result: boolean =
                metadata.width == width && metadata.height == height;
            expect(result).toBe(true);
        });
    });
});
