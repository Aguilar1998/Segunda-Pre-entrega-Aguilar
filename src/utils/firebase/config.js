
import {initializeApp} from "firebase/app";

// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, getDoc, doc, query, where  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaLcuKrqO3C2Z3XMPYkgfeSaTMd8nWOTs",
  authDomain: "my-proyect-service.firebaseapp.com",
  projectId: "my-proyect-service",
  storageBucket: "my-proyect-service.firebasestorage.app",
  messagingSenderId: "86655286672",
  appId: "1:86655286672:web:fa10c79097bdf4819a4715"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// export const analytics = getAnalytics(app);

export const db = getFirestore(app);


export async function getItems() {
    // Necesito una referencia a la coleccion 
    
    const producsCollectionRef = collection(db, "productos");
    // Pedirle a firebase los documentos de la coleccion

    const snapshot = await getDocs(producsCollectionRef)
    const docsData = snapshot.docs.map((doc) => {
        let dataOk = doc.data();
        dataOk.id = doc.id;
        return dataOk
    })

    return docsData
}


// Obtener un solo articulo

export async function getSingleItem(itemid) {
    // Necesito una referencia a la coleccion   
    const producsCollectionRef = collection(db, "productos");
    // referencia al documento
    const productRef = doc(producsCollectionRef, itemid); 

    //recibimos el snap del doc con getDoc(referencia)
    const snapshot = await getDoc(productRef)

    return{...snapshot.data(), id: snapshot.id}
}


export async function getItemsByCategory(categoria) {
    const producsCollectionRef = collection(db, "productos")

    const q = query(producsCollectionRef, where("categoria", "==", categoria));

    const snapshot = await getDocs(q)

    const docsData = snapshot.docs.map((doc) => {
        let dataOk = doc.data();
        dataOk.id = doc.id;
        return dataOk
    })
    return docsData
}
