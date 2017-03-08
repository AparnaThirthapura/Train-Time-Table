
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

//On clicking submit button
$("#submit-details").on("click", function(event){

	event.preventDefault();

	trainName = $("#add-train-name").val().trim();
	trainDestination = $("#add-destination").val().trim();
	firstTrainTime = $("#add-first-train-time").val().trim();
	trainFrequency = $("#add-frequency").val().trim();

	database.ref().push({
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

database.ref().on("child_added", function(childSnapshot){
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
	console.log("DESTINATION:" + childSnapshot.val().trainDestination);

	$("#tableDisplay").append("<tr class = \"tableDisplayRows \">");
	$("#tableDisplay").append("<td> " + trainName + "</td>" +
        " <td> " + trainDestination + "</td>" +
        " <td> " + trainFrequency + "</td>" +
        " <td> " + moment(nextTrainTime).format("hh:mm") + "</td>" +
        " <td> " + minutesRemainingForNextTrain + "</td>");
	$("#tableDisplay").append("</tr>");


}, function(errorObject){

});


/* Calculating Next Arrival Time and Minutes Remaining 

--Variables required--
trainFrequency
firstTrainTime
currentTime

firstTrainTimeConverted = moment(firstTrainTime, "hh:mm".subtract(1,"years"));
currentTime = moment().format("hh:mm");

timeDiff = moment().diff(moment(firstTrainTimeConverted), "minutes");

timeRemainder = timeDiff % trainFrequency;

minutesRemainingForNextTrain = trainFrequency - timeRemainder; 
nextTrainTime = moment().add(minutesRemainingForNextTrain, "minutes");

console.log(firstTrainTimeConverted);
console.log(currentTime);
console.log(timeDiff);
console.log(timeRemainder);
console.log(minutesRemainingForNextTrain);
console.log(nextTrainTime);

*/
