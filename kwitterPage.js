const firebaseConfig = {
    apiKey: "AIzaSyAtRSDZgtXNTYUYB6vwc9j4BHw31NaFf-0",
    authDomain: "vamosconversarc94.firebaseapp.com",
    databaseURL: "https://vamosconversarc94-default-rtdb.firebaseio.com",
    projectId: "vamosconversarc94",
    storageBucket: "vamosconversarc94.appspot.com",
    messagingSenderId: "854968299072",
    appId: "1:854968299072:web:0ded67b8657a55114439a5"
  };

  firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("userName");
roomName = localStorage.getItem("roomName");

  function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
        window.location = "index.html";
    }

function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomName).push({
        name: userName,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function getData()
{
    firebase.database().ref("/"+roomName).on('value', function(snapshot) 
    {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot)
        {
            childKey  = childSnapshot.key; 
            childData = childSnapshot.val();
            if(childKey != "purpose") 
            {
                firebaseMessageId = childKey;
                messageData = childData;
                userName = messageData['name'];
                message = messageData['message'];
                like = messageData['like'];
                nameWithTag = "<h4>" + userName + "<img class='user_tick'. src='tick.png'> </h4>";
                messageWithTag = "<h4 class='message'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id="+ firebaseMessageId +" value = "+ like +" onclick = 'updateLike(this.id)'>";
                spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'> like " + like + "</span></button> <hr>";
                row = nameWithTag + messageWithTag + like_button + spanWithTag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}
getData();

function updateLike(messageId)
{
    buttonId = messageId;
    likes = document.getElementById(buttonId).value;
    updateLikes = Number(likes) + 1;

    firebase.database().ref(roomName).child(messageId).update({
        like : updateLikes
    });
}