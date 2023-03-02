export async function uploadService ({ data, preset = 'gg55hzew' }) {
  const formData = new FormData()
  formData.append('upload_preset', preset)
  formData.append('file', data)
  formData.append('timestamp', Date.now() / 1000)
  formData.append('api_key', 539682137535788)

  const uploadImage = await fetch('https://api.cloudinary.com/v1_1/dwa0boye6/image/upload', {
    method: 'POST',
    body: formData
  })
  const uploadImageJon = await uploadImage.json()

  return uploadImageJon
}
