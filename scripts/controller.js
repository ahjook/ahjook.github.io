$(document).ready(function() {

var rowNumber = 1;
var topicArray = [];


	$("#connected_btn").click (function(e) {
		e.preventDefault()
		client = mqtt.connect($("#address").val());
		client.on("connect", function(){
	   		console.log("Successfully connected");
	   		console.log("address: "+$("#address").val());
		})
		$("#status").val("Connected!");
		client.on("message", function (topic, payload) {
		console.log("Received { topic:"+topic+"; payload: "+payload+" }");
		$('tbody').append('<tr><td>' + topic + '<td>' + payload + '<td>'+ moment().format('MMMM Do YYYY, h:mm:ss a') + '</td></tr>');
		rowNumber++;
		})
	})

	$("#disconnected_btn").click (function() {
		client.end();
		$("#status").val("Disconnected!");
	});

	$("#subscribe_btn").click (function() {
	var topic = $("#topicSubscribe").val();
	client.subscribe(topic);
	console.log("Subscribed { topic:" + topic+ " }");
	topicArray.push(topic);
	$("#subscribed").val("Subscribed!");
	})


$("#unsubscribe_btn").click (function() {
var topic = $("#topicSubscibe").val();
client.unsubscribe(topic);
console.log("Unsubscribed { topic:" + topic+ " }");
$("#subscribed").val("Unsubscribed!");
})


$("#publish_btn").click (function() {
var topic = $("#topicPublish").val();
var payload = $("#payload").val();
client.publish(topic, payload);
console.log("Published { topic:"+topic+"; payload: "+payload+" }");
})

});

