//Firebase configuration
var config = {
    apiKey: "AIzaSyCVNOQ6YMgchTveUPP2TC0jMtD0wQn8w0E",
    authDomain: "train-time-table-hw.firebaseapp.com",
    databaseURL: "https://train-time-table-hw.firebaseio.com",
    storageBucket: "train-time-table-hw.appspot.com",
    messagingSenderId: "1044606974577"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainName = " ";
var trainDestination = " ";
var firstTrainTime = " ";
var trainFrequency = " ";

// var email = " ";
// var pass = " ";

// $("#submitBtn").on("click", function(event){

// 		event.preventDefault();

// 	email = $("#email").val().trim();
// 	pass = $("#password").val().trim();

// 	firebase.auth().createUserWithEmailAndPassword(email,pass).catch(function(error) {
//   // Handle Errors here.
//   		var errorCode = error.code;
//  	 	var errorMessage = error.message;
//  	 	alert("Inside auth code" + email);
//  	 	console.log(email);

//  	 	$("input").val(" ");
// 		return false;
//   // ...
// });

// });
//On clicking submit button
$("#submit-details").on("click", function(event){

	event.preventDefault();

	trainName = $("#add-train-name").val().trim();
	trainDestination = $("#add-destination").val().trim();
	firstTrainTime = $("#add-first-train-time").val().trim();
	trainFrequency = $("#add-frequency").val().trim();

	if(trainName === "" || trainDestination === "" ||firstTrainTime === "" || trainFrequency === ""){
	  alert("enter all the fields");
	  return;
    }

    var fields = firstTrainTime.split(':');
    if (fields.length != 2) {
    	alert("First train time should be of the format HH:MM");
    	return;
    }

    if (fields[0] < 0 || fields[0] > 23) {
    	alert("Hour should be a number between 0 and 23.");
    	return;
    }

    if (fields[1] < 0 || fields[1] > 59) {
    	alert("Minutes should be between 0 and 59.");
    	return;
    }
	
	if(! $.isNumeric(trainFrequency)){
		alert("Train frequency should be a number");
		return;
	}

		database.ref("/TrainTimeTableInfo").push({
			trainName:trainName,
			trainDestination:trainDestination,
			firstTrainTime:firstTrainTime,
			trainFrequency:trainFrequency
		});

		console.log(trainName);
		console.log(trainDestination);
		console.log(firstTrainTime);
		console.log(trainFrequency);
	
	

	$("input").val(" ");
	return false;

});

database.ref("/TrainTimeTableInfo").on("child_added", function(childSnapshot){
	//Pull the data from the database
	// alert("Hi");
	var trainName = childSnapshot.val().trainName;
	var trainDestination = childSnapshot.val().trainDestination;
	var firstTrainTime = childSnapshot.val().firstTrainTime;
	var trainFrequency = childSnapshot.val().trainFrequency;

	var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
	var currentTime = moment();
	var timeDiff = moment().diff(moment(firstTrainTimeConverted), "minutes");
	var timeRemaining = timeDiff % trainFrequency;
	var minutesRemainingForNextTrain = trainFrequency - timeRemaining;
	var nextTrainTime = moment().add(minutesRemainingForNextTrain, "minutes");

	console.log(moment(firstTrainTimeConverted));
	console.log(currentTime);
	console.log(timeDiff);
	console.log(timeRemaining);
	console.log(minutesRemainingForNextTrain);
	console.log(nextTrainTime);

	var tableRow = $("<tr>").attr("class", "tableDisplayRows");
	tableRow.appendTo("#tableDisplay");
	tableRow.append("<td> " + trainName + "</td>" +
        " <td> " + trainDestination + "</td>" +
        " <td> " + trainFrequency + "</td>" +
        " <td> " + moment(nextTrainTime).format("hh:mm") + "</td>" +
        " <td> " + minutesRemainingForNextTrain + "</td>");



}, function(errorObject){

});


