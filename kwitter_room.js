
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
  document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";
  
  
  function addRoom()
  {
    roomName = document.getElementById("roomName").value;
  
    firebase.database().ref("/").child(roomName).update({
      purpose : "adicionar sala"
    });
  
    localStorage.setItem("roomName", roomName);
  
    window.location = "kwitterPage.html";
  }
  
  function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
         roomNames = childKey;
         console.log("Nome da Sala - " + roomNames);
        row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
        document.getElementById("output").innerHTML += row;
      });
    });
  
  }
  
  getData();
  
  function redirectToRoomName(name)
  {
    console.log(name);
    localStorage.setItem("roomName", name);
      window.location = "kwitterPage.html";
  }
  
  function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
      window.location = "index.html";
  }
  