
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, doc, collection, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { composeWithDevTools } from "redux-devtools-extension";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

console.log(firebaseConfig)
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const getDocuments = async (collectionName = 'playlists') => {
    const db = getFirestore(app)
    var collectionRef = collection(db, collectionName)
    const data = await getDocs(collectionRef)
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

const getDocument = async (collectionName, id) => {
    const db = getFirestore(app)
    try {
        const snap = await getDoc(doc(db, collectionName, id))
        if (!snap.exists()) {
            return null
        }
        const docToReturn = snap.data()
        docToReturn.id = id
        return docToReturn
    } catch (err) {
        console.error('Error getting document: ', err)
        throw err
    }
}

const updatePlaylist = async (collectionName, id, songs) => {
    const arr = songs
    const db = getFirestore(app)
    const playlistDoc = doc(db, collectionName, id)
    const newFiemd = { songs: arr }
    await updateDoc(playlistDoc, newFiemd)
    return
}

export const firebaseService = {
    db,
    // auth,
    getDocuments,
    getDocument,
    updatePlaylist
    // addDocument,
    // saveDocument,
}
