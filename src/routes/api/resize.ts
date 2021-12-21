import express from 'express'
import resizeFunctions from '../../utilities/resizeFunctions'

const resize = express.Router()

const path = require('path')

// identifying our public directly to reach "image" and"output" directory when using .sendFile()
const publicDirectoryPath = path.join(__dirname, '../../../')

const { imageExist, imageAlreadyResized, resizeImage } = resizeFunctions
// our image endpoint for resizing
// eslint-disable-next-line consistent-return
resize.get('/', (req, res) => {
  const width = parseInt(req.query.width as string, 10)
  const height = parseInt(req.query.height as string, 10)
  const fileName = req.query.file_name?.toLocaleString()

  // Checking if user entered the right url
  if (!fileName) {
    return res.send(
      'Please enter the URL of the image you want to resize in the following format : http://localhost:3000/resize?file_name={fileName}&width={width}&height={heigth}'
    )
  }
  // validating if height and width comming from the user are positive integers
  if (width <= 0 || height <= 0) {
    return res.send('Please use positive integers for width and height')
  }
  // Checking if image exist in our "images" directory and isnt alredy cached in "output" directory
  if (imageExist(fileName) === true && imageAlreadyResized(fileName, width, height) === false) {
    resizeImage(fileName, width, height)
      .then(() => {
        res.sendFile(`${publicDirectoryPath}/output/new${fileName}-${width}-${height}.jpg`)
      })
      .catch((err) => {
        console.log(err)
      })
    // If image is cached in our "outout" directory, send already processed image found in the "output" directory
  } else if (imageAlreadyResized(fileName, width, height)) {
    res.sendFile(`${publicDirectoryPath}/output/new${fileName}-${width}-${height}.jpg`)
    // if image isnt available in our "images" directory notify the user
  } else if (imageExist(fileName) === false) {
    res.send('File doesnt exist in images directory')
  }
})

export default resize
