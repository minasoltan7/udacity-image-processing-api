import sharp from 'sharp'
import fs from 'fs'

// Check if the file exists in the "images" directory.

const imageExist = (imagePath: unknown): boolean => {
  if (fs.existsSync(`images/${imagePath}.jpg` as string)) {
    return true
  }
  return false
}

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

// check if image has already been resized before

const imageAlreadyResized = (imagePath: unknown, width: unknown, height: unknown): boolean => {
  if (fs.existsSync(`output/new${imagePath}-${width}-${height}.jpg` as string)) {
    return true
  }
  return false
}

export default { imageExist, imageAlreadyResized, resizeImage }
