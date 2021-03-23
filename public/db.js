let db;
const request = indexedDB.open("budget", 1)

request.onupgradeneeded = event => {
    const db = request.result;
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

//function saveInput
//function checkDb
getAll.onsuccess

window.addEventListener("online", checkDb)