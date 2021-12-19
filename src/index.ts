/* eslint-disable radix */
import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import sharp from 'sharp'
import fs from 'fs'

dotenv.config()
const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))
// add routing for / path

app.get('/', (req: Request, res: Response) => {
  res.send('our app is working')
})

const path = require('path')

const publicDirectoryPath = path.join(__dirname, '../')
app.use(express.static(publicDirectoryPath))

console.log(publicDirectoryPath)
// our resize function
const resizeImage = async (fileName: unknown, width: unknown, height: unknown) => {
  try {
    await sharp(`images/${fileName}.jpg`)
      .resize(width as number, height as number)
      .toFile(`output/new${fileName}-${width}-${height}.jpg`)
  } catch (err) {
    console.log(err)
  }
}

// Check if the file exists in the imaages directory.

const imageExist = (imagePath: unknown): boolean => {
  if (fs.existsSync(`images/${imagePath}.jpg` as string)) {
    return true
  }
  return false
}
// check if image has already been resized before

const imageAlreadyResized = (imagePath: unknown, width: unknown, height: unknown): boolean => {
  if (fs.existsSync(`output/new${imagePath}-${width}-${height}.jpg` as string)) {
    return true
  }
  return false
}

// async function waiting for resizing to happen then send the new image to the front -end

// our image endpoint for resizing
app.get('/image', (req: Request, res: Response) => {
  const width = parseInt(req.query.width as string)
  const height = parseInt(req.query.height as string)
  const fileName = req.query.file_name?.toLocaleString()
  if (imageExist(fileName) === true && imageAlreadyResized(fileName, width, height) === false) {
    // res.send('image is processed')

    resizeImage(fileName, width, height)
      .then(() => {
        res.sendFile(`${publicDirectoryPath}/output/new${fileName}-${width}-${height}.jpg`)
      })
      .catch((err) => {
        console.log(err)
      })
  } else if (imageAlreadyResized(fileName, width, height)) {
    res.sendFile(`${publicDirectoryPath}/output/new${fileName}-${width}-${height}.jpg`)
  } else if (imageExist(fileName) === false) {
    res.send('file doesnt exist in images directory')
  }
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
