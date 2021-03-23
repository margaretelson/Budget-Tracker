let db;
const request = indexedDB.open("budget", 1)

request.onupgradeneeded = event => {
    event.target.result.createObjectStore("pending", {
        keyPath: "id",
        autoIncrement: true
    })
    console.log(event)
}

request.onerror = err => {
    console.log(err)
}

request.onsuccess = event => {
    db = event.target.result;
    if (navigator.onLine){
        checkDb();
    }
}

function saveInput(record){
    
}

getAll.onsuccess

window.addEventListener("online", checkDb)