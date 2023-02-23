export async function uploadService ({ data }) {
//   console.log(data + '&transformation=w_80,h_80,g_faces,c_thumb')
//   return

  const formData = new FormData()
  //   formData.append('upload_preset', 'react-journal')
  formData.append('upload_preset', 'gg55hzew')
  formData.append('file', data)
  formData.append('timestamp', Date.now() / 1000)
  formData.append('api_key', 539682137535788)
  //   formData.append('transformation', 'w_80,h_80,g_faces,c_thumb')

  const uploadImage = await fetch('https://api.cloudinary.com/v1_1/dwa0boye6/image/upload', {
    method: 'POST',
    body: formData
  })
  //   &transformation=w_80,h_80,g_faces,c_thumb
  //   w_500,h_500,c_thumb,g_faces
  const uploadImageJon = await uploadImage.json()

  return uploadImageJon
}
