// Initialize Firebase
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

const db = firebase.firestore();

db.collection("posts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc);
        
        console.log(`${doc.id} => ${doc.data().author}`);
    });
});

window.onload = () => {
    let root = document.querySelector("#root");

    let container = document.createElement("div");
    container.innerHTML = 
    `
    <div class="jumbotron">
        <h1>Bootstrap Tutorial</h1> 
        <p>Bootstrap is the most popular HTML, CSS...</p> 
    </div>


    `;

    root.appendChild(container);

    
}