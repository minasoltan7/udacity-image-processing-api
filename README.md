# udacity-image-processing-api

## Overview

This project is an image processing API that resizes and saves images to user specifications using SHARP API

All you need is to add the the filename, the width and the heigth of the image that lives in the _images_ directory as query string to the /resize endpoint and you will find the resized image in your _output_ directory

**_Example_**

*http://localhost:3000/resize?file_name=fjord&width=2000&height=600*


If the image is already resized the server send back to the front end the cached resized image that lives in our *output* directory without processing a new one from the begining   


##  Framework and languages used:-

The technologies used in this project are:

-Express backend framework
-Typescript for transpiling to Javasipt
-Jasmine for unit testing
-Supertest for testing endpoints
-Morgan for logging
-Sharp API for resising images



##  Development Dependencies used:-

    Types deifnition for all dependencies
    Eslint for linting 
    Prettier for formating and styling
    Nodemon for continiously running our server 
    rimraf for deleting our build directory
    Typescript for static typing


## Credits

Credit goes to:-

- Udacity advanced front-end web development track
