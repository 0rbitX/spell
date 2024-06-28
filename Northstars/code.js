function NewId(id,nuid, time) {
  if (time===1) {
    updateRecord("Acc", {id:id, uid2:nuid}, function(record, success) {
      
    });
  } else {
    updateRecord("Acc", {id:id, uid3:nuid}, function(record, success) {
      
    });
  }
}
var thisid;
var signedin = false;
var thisphoto = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.are.na%2Fblock%2F8040974&psig=AOvVaw2-amo2dsCxhZiU61qHuZ7k&ust=1719606106070000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNiV24rO_IYDFQAAAAAdAAAAABAE";
var name = "NO NAME FOUND";
readRecords("Acc", {}, function(records) {
  for (var i =0; i < records.length; i++) {
    if (getUserId() == records[i].uid) {
      if (records[i].accType=="Student") {
        setScreen("Home_stud");
      } else if(records[i].accType=="admin"){
        
      }
      
      thisid = records[i].id;
    }
  }
});
onEvent("create", "click", function( ) {
  setScreen("Create");
});
onEvent("photo", "change", function( ) {
  setImageURL("propreview", getImageURL("photo"));
  showElement("label3");
  showElement("go");
});
onEvent("go", "click", function( ) {
  switch((getText("accType"))){
    case "Student":
      
      var used = false;
      readRecords("Acc", {}, function(records) {
        for (var i =0; i < records.length; i++) {
          if (getText("user")==records[i].user) {
            used = true;
          }
        }
        if (!used) {
          if ((getText("user")!==""&&getText("pass")!=="")&&getText("email")!=="") {
            createRecord("Acc", {accType:'Student',user:(getText("user")),pass:(getText("pass")),uid:(getUserId()),email:__,photo:(getImageURL("photo"))}, function(record) {
              setScreen("accountCreatedStud");
            });
          } else {
            showElement("err");
            setText("err", "Please fill in all text boxes");
          }
        } else {
          showElement("err");
            setText("err", "Sorry,that username is already in use.");
        }
      });
    break;
    case "Teacher":
      
      break;
       case "Newspaper/Editor":
      
      break;
      case "Admin":
        
        break;
  }
});
onEvent("login", "click", function( ) {
  setScreen("Login");
});
onEvent("logingo", "click", function( ) {
  readRecords("Acc", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      if (getText("username")===records[i].user&&getText("password")===records[i].pass&&getText("acctype")===records[i].accType) {
        thisid=records[i].id;
        signedin=true;
        thisphoto=records[i].photo;
        name=records[i].user;
        if (getChecked("remem")) {
          if ((records[i]).uid2===undefined) {
           NewId(thisid, getUserId(), 1);
          } else if (records[i].uid3===undefined) {
           NewId(thisid, getUserId(), 2); 
          }
        }
        setScreen("home_stud");
      }
    }
  });
});
