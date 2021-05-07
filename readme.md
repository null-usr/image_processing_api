# Image resizing API

## Usage

>http://localhost:3000/api/images?filename=image[.extension]&width=[width]&height=[height]


where width and height are integers and filename is a file on the server.
If no extension is provided, .jpg is assumed

Currently the only <image> available is test.jpg


## Running
To run either do:

>npm run start

for development mode
or

>npm run test
>
>node dist/. 

for production mode

## To-Do
- [ ] File Uploading
- [ ] Rename API
- [ ] Frontend
