
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

submit.addEventListener('click', () => {
  alert('Click OK to activate the Reminder');
  var hours = document.getElementById('hours').value;
  var minutes = document.getElementById('minutes').value;
  var seconds = document.getElementById('seconds').value;
  var sec = hours * 3600000 + minutes * 60 * 1000 + seconds * 1000;
  var remainder1 = document.getElementById('remainder').value;
  var pids = Math.floor(Math.random() * 10000 + 1);
  var alarmInfo = {
    when: sec
  };


var str_join = remainder1 + ',r_' + pids.toString();

  browser.alarms.create(str_join, {
    when: Date.now() + sec
  });
	
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
  
  
  SetReminders(hours, minutes, seconds, remainder1);
});

function LoadStorage() {
  const items = browser.storage.local.get('tsl_reminder');
  items.then(res => {
    const NewReminder = res.tsl_reminder;
	  
    if (!NewReminder) return;

    var parent = document.getElementById('reminder_container');

	for (let item in NewReminder) {
      		const mains = document.createElement('li');
      		mains.textContent = 'Reminder: ' + NewReminder[item].remainder1;
     		parent.appendChild(mains);
    }
  });
}

function SetReminders(pids, hours, minutes, seconds, remainder1) {
  var data = { hours, minutes, seconds, remainder1 };

  const items = browser.storage.local.get('tsl_reminder');
  items
    .then(res => {
      const reminder = res.tsl_reminder;
      reminder['r_' + pids.toString()] = data;
      browser.storage.local.set({
        tsl_reminder: reminder
      });
    })
     .catch(() => {
      browser.storage.local.set({
        tsl_reminder: { ['r_' + pids.toString()]: data }
      });
    });

  LoadStorage();
}
