
var submit = document.getElementById("submit");

LoadStorage();
// var hello = () => {
//   var hours = document.getElementById("hours").value;
//   var minutes = document.getElementById("minutes").value;
//   var seconds = document.getElementById("seconds").value;
//   console.log(hours, minutes, seconds);

//   var sec = hours * 3600000 + minutes * 60 * 1000 + seconds * 1000;
//   console.log(sec);
//   var remainder1 = document.getElementById("remainder").value;
//   console.log(remainder1);
//   document.getElementById("hours").value = "";
//   document.getElementById("minutes").value = "";
//   document.getElementById("seconds").value = "";
//   setTimeout(function() {
//     browser.notifications.create({
//       type: "basic",
//       iconUrl: "bell.png",
//       title: "Remainder",
//       message: remainder1
//     });
//   }, sec);
// };

// submit.addEventListener("click", () => {
//   console.log("helo");
//   var hours = document.getElementById("hours").value;
//   var minutes = document.getElementById("minutes").value;
//   var seconds = document.getElementById("seconds").value;
//   localStorage.setItem("hours", hours);
//   localStorage.setItem("minutes", minutes);
//   localStorage.setItem("sec", seconds);
//   var sec = hours * 3600000 + minutes * 60 * 1000 + seconds * 1000;
//   var remainder1 = document.getElementById("remainder").value;
//   document.getElementById("hours").value = "";
//   document.getElementById("minutes").value = "";
//   document.getElementById("seconds").value = "";
//   setTimeout(function() {
//     browser.notifications.create({
//       type: "basic",
//       iconUrl: "bell.png",
//       title: "Remainder",
//       message: remainder1
//     });
//   }, sec);
// });
var alarmplay = document.getElementById("alarm");
submit.addEventListener("click", () => {
  alert("Click OK to activate the Reminder");
  var hours = document.getElementById("hours").value;
  var minutes = document.getElementById("minutes").value;
  var seconds = document.getElementById("seconds").value;
  var sec = hours * 3600000 + minutes * 60 * 1000 + seconds * 1000;
  var remainder1 = document.getElementById("remainder").value;
  var alarmInfo = {
    when: sec
  };

  browser.alarms.create(remainder1, {
    when: Date.now() + sec
  });
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
  
  
  SetReminders(hours, minutes, seconds, remainder1);
});

function LoadStorage(){
	let items = browser.storage.local.get();
	items.then(
		item => {
			for(var keys in item){
				console.log(item[keys]);
			}
		},
		error => {
			var data = {};
			
			browser.storage.local.set(data);
		}
	);
}

function SetReminders(hours, minutes, seconds, remainder1){
	  var pids = Math.floor((Math.random() * 10000) + 1);
	  var data = {hours, minutes, seconds, remainder1};
	  
	  let items = browser.storage.local.get();
		items.then(
			item => {
				var r_data = item;
				var pd  = "r_" + pids;
				
				browser.storage.local.set({ pd : data});
			},
			error => {
				console.log(error);
			}
		);
}
