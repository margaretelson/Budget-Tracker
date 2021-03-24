const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = (event) => {
  event.target.result.createObjectStore("pending", {
    keyPath: "id",
    autoIncrement: true,
  });
  console.log(event);
};

request.onerror = (err) => {
  console.log(err);
};

request.onsuccess = (event) => {
  db = event.target.result;
  if (navigator.onLine) {
    checkDb();
  }
};

function saveInput(record) {
  const transaction = db.transaction("pending", "readwrite");
  const store = transaction.objectStore("pending");
  store.add(record);
}

function checkDb() {
  const transaction = db.transaction("pending", "readwrite");
  const store = transaction.objectStore("pending");
  const getAll = store.getAll();

  getAll.onsuccess = () => {
    getAll.onsuccess = function () {
      if (getAll.result.length > 0) {
        fetch("/api/transaction/bulk", {
          method: "POST",
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then(() => {
            const transaction = db.transaction(["pending"], "readwrite");

            const store = transaction.objectStore("pending");

            store.clear();
          });
      }
    };
  };
}

window.addEventListener("online", checkDb);
