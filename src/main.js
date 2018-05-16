// Initialize Firebase
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const db = firebase.firestore();



window.onload = () => {
let loader = true;
    db.collection("posts").orderBy("timestamp", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc);

            // console.log(`${doc.id} => ${doc.data().author}`);
            data(doc.id, doc.data());

            
        });
    });
}

let root = document.querySelector("#root");
root.className = `container`;
let container = document.createElement("div");
container.className = `jumbotron text-center`;
let title = document.createElement("h1");
title.innerHTML = 'Welcome To Post Planet'
container.appendChild(title);
root.appendChild(container);

// Creating button for publish new post
let create = document.createElement("div");
    create.innerHTML = 
    `
    <button type="button" class="ui secondary button btn-lg btn-block my-5" data-toggle="modal" data-target="#myModal">
    Create A New Post
  </button>
    
    
    `
root.appendChild(create);
    // Create Post Data
    let createPost = document.createElement("div");
    createPost.innerHTML = 
    `
    <!-- The Modal -->
  <div class="modal fade" id="myModal">
    <div class="modal-dialog my-2">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title text-center">Create a new post</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
        <div class="ui form">
            <div class="field">
                
                <input id="name" placeholder="Enter your name" type="text">
            </div>
            <div class="field">
                
            <textarea id="postBody" rows="7" cols="50" placeholder="Write something..."></textarea>
            </div>
      </div>
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button id="publishPost" type="button" class="ui primary button btn-lg btn-block" data-dismiss="modal">Publish</button>
        </div>
        
      </div>
    </div>
  </div>
    
    `
    root.appendChild(createPost);

    let publish = document.getElementById("publishPost");

    publish.addEventListener("click", () => {
        let name = document.getElementById("name").value;
        let postBody = document.getElementById("postBody").value;
        


        // Publish Post to Firebase Database (FireStore)

        if (name !== '' && postBody !== '') {
            db.collection("posts").add({
                name: name,
                body: postBody,
                loves: 3032,
                comment:
                    [
                        {
                        name: "Sm Shohag",
                        comment: "nice Post"
                        }
        
                    ],
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((docRef) => {
                    db.collection("posts").doc(docRef.id)
                        .onSnapshot((doc)  => {
                            console.log("Current data: ", doc.data());

        let updataData = document.createElement("span");

            updataData.className = `col-md-12 my-2`

          updataData.innerHTML = 
                `   <div class="ui link cards">

                <div class="card">
                    
                    <div class="content">
                        <div class="header">${doc.data().name}</div>
                        <div class="meta">
                            Published at: ${doc.data().timestamp.toDate().toLocaleDateString()}
                        </div>
                        <div class="description">
                        ${doc.data().body}
                        </div>
                    </div>
                    <div class="extra content">
                        <span class="right floated">
                        <button class="ui icon primary button">
                        <i class="edit icon"></i>
                      </button>
                        <button  class="ui icon red button">
                        <i class="trash icon"></i>
                      </button>
                        </span>
                        <span>
                            <div class="ui labeled button" tabindex="0">
                                <div id="love" class="ui button">
                                    <i class="thumbs up icon"></i> Like
                                </div>
                                    <a class="ui basic label">
                                    &nbsp;  ${doc.data().loves}
                                    </a>
                            </div>
                            <div class="ui labeled button" tabindex="0">
                                <div id="love" class="ui button">
                                    <i class="comment icon"></i> Comments
                                </div>
                                    <a class="ui basic label">
                                    &nbsp;  1128
                                    </a>
                            </div>
                            <div class="ui labeled button" tabindex="0">
                                <div id="love" class="ui button">
                                    <i class="share square icon"></i> Share
                                </div>
                                    
                            </div>
                        </span>
                    </div>
                </div>
                </div>

                `
                
                console.log(updataData);

                
                let newPost = document.getElementById("newPost");
                newPost.insertBefore(updataData, newPost.childNodes[0]);
                
                    // End
                        });
                    // Creating updata data
               
                    document.getElementById("name").value = '';
                    document.getElementById("postBody").value = '';
                    
                    
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    

        
        
    })
   

    const data = (id, post) => {

    


    let content =   document.createElement("div");
    let warper  =   document.createElement("div");
    let card    =   document.createElement("div");
    
    content.className = `row`;
    warper.className = `col-md-12 my-2`;
    content.appendChild(warper);
    
    card.innerHTML =
        `
        <div id="newPost" class="ui link cards">

    <div class="card">
        
        <div class="content">
            <div class="header">${post.name}</div>
            <div class="meta">
                Published at: ${post.timestamp.toDate().toLocaleDateString()}
            </div>
            <div class="description">
            ${post.body}
            </div>
        </div>
        <div class="extra content">
            <span class="right floated">
            <button class="ui icon primary button">
            <i class="edit icon"></i>
          </button>
            <button onclick="myFunction('mydata')" class="ui icon red button">
            <i class="trash icon"></i>
          </button>
            </span>
            <span>
                <div class="ui labeled button" tabindex="0">
                    <div id="love" class="ui button">
                        <i class="thumbs up icon"></i> Like
                    </div>
                        <a class="ui basic label">
                        &nbsp;  ${post.loves}
                        </a>
                </div>
                <div class="ui labeled button" tabindex="0">
                    <div id="love" class="ui button">
                        <i class="comment icon"></i> Comments
                    </div>
                        <a class="ui basic label">
                        &nbsp;  1128
                        </a>
                </div>
                <div class="ui labeled button" tabindex="0">
                    <div id="love" class="ui button">
                        <i class="share square icon"></i> Share
                    </div>
                        
                </div>
            </span>
        </div>
    </div>
    </div>
    `;
    root.appendChild(content)
    warper.appendChild(card);

    const newPost = (updataData) => {
        warper.firstChild = updataData
    }

}




