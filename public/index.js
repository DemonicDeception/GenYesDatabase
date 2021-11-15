const firebaseConfig = {
    apiKey: "AIzaSyAaXQbG3_dstQWx81Yx5JlwTwd9O3_Il40",
    authDomain: "genyes-71e48.firebaseapp.com",
    projectId: "genyes-71e48",
    storageBucket: "genyes-71e48.appspot.com",
    messagingSenderId: "233963108382",
    appId: "1:233963108382:web:0971f782fe3e104d4d560f",
    measurementId: "G-BFWN5DPSZQ"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore()
  
  // "2341241"
  let cT = []
  let tixarray
  async function search() {
    try{
      let input = document.getElementById('searchbar').value.toString()
      console.log(input)
      currentTicket = await db.collection("Prospect").doc(input.toString()).get()
      console.log(currentTicket.exists)
      tixarray = await db.collection("Prospect").doc(input.toString())
      if(currentTicket.exists){
        ticketArray = await db.collection("Prospect").doc(input).get()
        let tixArr = ticketArray.data().tickets
        cT = tixArr
        let tixList = document.getElementById("TicketList")
        tixList.innerHTML = ""
        tixList.innerHTML = `
          <button onclick="createTicketHandler()">Create Ticket</button>
        `
        for(i = 0; i < tixArr.length; i++){
          tixList.innerHTML += `
          <button onclick="ticketClickHandler(${i})">Ticket #${i+1} <br> STL: ${tixArr[i].stl}</button>
          `
        }
  
      }else{
        document.getElementById("TicketList").innerHTML = `
        <h3>This item has no tickets.</h3>
        <button onclick="createTicketHandler()">Create one?</button>
        `
      }
    }catch(err){
      console.log(err)
    }
  }
  async function ticketClickHandler(ticket){
    cM = cT[ticket]
    finished = cM.finished
    stl = cM.stl
    completionDate = cM.completionDate
    barcodeNumber = cM.barcodeNumber
    comments = cM.comments
    document.getElementById("TicketList").innerHTML = ""
    document.getElementById("TicketList").innerHTML += `
    <h1>Ticket #${ticket+1}</h1>
    <h3>Ticket Status: ${finished} <br> Completion Date: ${completionDate} <br> Barcode Number: ${barcodeNumber} <br> Comments from STL: ${comments}</h3>
    <button onclick="editTicketClicker(${ticket})">Edit Ticket</button>
    `
  }
async function editTicketClicker(ticket){
    document.getElementById("TicketList").innerHTML = `
    <form onsubmit="editTicket(${ticket}); return false">
        <br>STL Name: <input id="stl" type="text" value="${cM.stl}"></input>
        <br>Completed? ("true or false") <input id="completed" type="text" value="${cM.finished}"></input>
        <br>Comments: <input id="comments" type="text" value="${cM.comments}"></input>
        <br><input type="submit"></input>
      </form>
    `
  }
async function editTicket(i){
  stl = document.getElementById("stl").value.toString()
  com = document.getElementById("comments").value.toString()
  comp = document.getElementById("completed").value.toString()
  ba = document.getElementById("searchbar").value.toString()
  cM = {
    stl: stl,
    finished: comp,
    comments: com
  }
  console.log(i)
  cT[i]=(cM);
  res = await db.collection("Prospect").doc(ba.toString()).set({ tickets: cT })
  document.getElementById("TicketList").innerHTML = `
  `

}
  async function makeTicket(){
    bar = document.getElementById("searchbar").value.toString()
    comp = document.getElementById("completed").value
    comments = document.getElementById("comments").value
    name = document.getElementById("stl").value
    let newObj = {
          finished: comp,
          stl: name,
          completionDate: new Date().toString(),
          barcodeNumber: bar,
          comments: comments
        }
        try{
            cT.push(newObj);
            res = await db.collection("Prospect").doc(bar.toString()).set({ tickets: cT })
            document.getElementById("TicketList").innerHTML = `
            `
        }catch(err){
          document.getElementById("TicketList").innerHTML = `
          <h3>An unexpected error has occured: ${err}</h3>
          `
        }
  }
  async function createTicketHandler(barcode){
    document.getElementById("TicketList").innerHTML = `
    <form onsubmit="makeTicket(); return false">
        <br>STL Name: <input id="stl" type="text"></input>
        <br>Completed? ("true or false") <input id="completed" type="text"></input>
        <br>Comments: <input id="comments" type="text"></input>
        <br><input type="submit"></input>
      </form>
    `
  }