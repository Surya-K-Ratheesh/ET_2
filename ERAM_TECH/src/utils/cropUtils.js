export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })

export const getCroppedImg = async (imageSrc, crop) => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // Set canvas size to match the cropped area
  canvas.width = crop.width
  canvas.height = crop.height

  // Draw the cropped image
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob)
    }, 'image/png')
  })
}

export const getCenterCrop = (width, height) => ({
  unit: 'px',
  x: (width * 0.1) / 2,
  y: (height * 0.1) / 2,
  width: width * 0.9,
  height: height * 0.9
})