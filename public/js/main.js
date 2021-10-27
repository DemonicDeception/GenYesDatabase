import { doc, setDoc } from "firebase/firestore"; 

// var admin = require("firebase-admin");
// var serviceAccount = require("./DataBaseKeys.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
const db = admin.firestore();


async function search() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    console.log(doc.collection("Prospect").doc("2341241"))
    gD = await guildDoc.get().catch(console.error)
    if(gD.exists){
      ticketData = await gD.data()
      console.log(ticketData)
    }
}