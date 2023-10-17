import {
    initializeApp
} from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    addDoc, 
    deleteDoc, 
    doc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAiPTOIlHHk4CfsVzlo-MIZcUMU3KLO5lI",
    authDomain: "jakobov-firebase-practice.firebaseapp.com",
    projectId: "jakobov-firebase-practice",
    storageBucket: "jakobov-firebase-practice.appspot.com",
    messagingSenderId: "430527135702",
    appId: "1:430527135702:web:a2dfc59429e3aa36f22e77"
};

//init firebase
initializeApp(firebaseConfig)

//init services
const db = getFirestore()

//collection ref
const colRef = collection(db, 'books')

//get  collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({
                ...doc.data(),
                id: doc.id
            })
        })

        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
    })

// adding documents 
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
    .then(() => [
        addBookForm.reset()
    ])
})

// deleting documents 
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
    .then(() => {
        deleteBookForm.reset()
    })
})