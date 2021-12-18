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
// app.use(morgan('short'))

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.send('our app is working')
})

// our resize function
const resizeImage = async (fileName: unknown, width: unknown, height: unknown) => {
  try {
    sharp(`images/${fileName}.jpg`)
      .resize(width as number, height as number)
      .toFile(`output/new${fileName}.jpg`)
  } catch (err) {
    console.log(err)
  }
}

// Check if the file exists in the current directory.
const file = 'images/fjord.jpg';

fs.access(file, fs.constants.F_OK, (err) => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`)
})


// our image endpoint for resizing 
app.get('/image', (req: Request, res: Response) => {
  const width = parseInt(req.query.width as string)
  const height = parseInt(req.query.height as string)
  const fileName = req.query.file_name?.toLocaleString()
  resizeImage(fileName, width, height)
  res.send('image is processed')
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
