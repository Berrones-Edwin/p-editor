import { db } from '../firebase/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'

export const saveImages = async ({ uid, imageUrl }) => {
  await addDoc(collection(db, 'images'), {
    uid,
    imageUrl
  })
}

export const loadImages = async ({ uid }) => {
  const dataParse = []
  const querySnapshot = await getDocs(collection(db, 'images'))
  querySnapshot.forEach((doc) => {
    dataParse.push({ id: doc.id, data: doc.data() })
  })

  return dataParse.filter(d => d.data.uid === uid)
}
// export const deleteImage = async ({ uid, idGif }) => {
//   const notesRef = db
//     .collection(` ${uid}/images/favorites `)
//     .doc(idGif)
//     .delete()
//   const snapshot = await notesRef

//   return snapshot
// }
