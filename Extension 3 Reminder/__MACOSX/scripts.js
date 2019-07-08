
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

const domElements = {
  saveReminder: document.getElementById('saveReminder'),
  reminderText: document.getElementById('reminder-text'),
  showReminders: document.getElementById('showReminders'),
  showClock: document.getElementById('showClock'),
  isClock: document.getElementById('isClock'),
  isList: document.getElementById('isList'),
  reminderHolder: document.getElementById('reminderHolder'),
	reminderPlaceholder: document.getElementById('reminderPlaceholder'),
	success: document.getElementById('success')
}
const myDatepicker = new MtrDatepicker(config);

domElements.saveReminder.addEventListener('click', ()=>{

    const when = myDatepicker.getTimestamp()
    const sending = browser.runtime.sendMessage({
        action: "create",
        reminder: domElements.reminderText.value,
        id: 'queIt_'+when,
        when
    });
    domElements.reminderText.value = '';
		domElements.success.className = 'showMe'
		setTimeout(()=>{domElements.success.className = ''},1000)
})
domElements.showReminders.addEventListener('click', ()=>{
  domElements.isClock.className = 'hide'
  domElements.isList.className = ''
  setList()
})

domElements.showClock.addEventListener('click', ()=>{
  domElements.isClock.className = ''
  domElements.isList.className = 'hide'
})

const setList = () => {
  while (domElements.reminderHolder.firstChild) {
    domElements.reminderHolder.removeChild(domElements.reminderHolder.firstChild);
  }
  const gettingItem = browser.storage.local.get('tslReminders'); 
  gettingItem.then((res) => setReminderList(res))
}
const setReminderList = response => {
  const tslReminders = response.tslReminders
  if(!tslReminders)
    return false

  if(Object.keys(tslReminders).length === 0 && tslReminders.constructor === Object) {
    domElements.reminderPlaceholder.className = ''
  }else{
    domElements.reminderPlaceholder.className = 'hide'
    for(let item in  tslReminders) {
      const localTime = parseInt(item.split('_')[1])
      const reminder = document.createElement('div')
      const reminderArrow = document.createElement('span')
      const reminderText = document.createElement('span')
      const reminderDelete = document.createElement('a')
      reminder.className = 'reminder'
      reminder.setAttribute('title', new Date(localTime))
      reminderArrow.textContent = '»'
      reminderText.textContent = tslReminders[item]
      reminderDelete.textContent = '✖'
      reminderDelete.addEventListener('click',() => removeReminder(item,reminder, tslReminders))
      reminder.appendChild(reminderArrow)
      reminder.appendChild(reminderText)
      reminder.appendChild(reminderDelete)
      domElements.reminderHolder.appendChild(reminder)
    }
  }
}

const removeReminder = (item, reminder, tslReminders) => {
  domElements.reminderHolder.removeChild(reminder)
  delete tslReminders[item]
  if(Object.keys(tslReminders).length === 0 && tslReminders.constructor === Object)
    domElements.reminderPlaceholder.className = ''
  browser.storage.local.set({ tslReminders })
  const sending = browser.runtime.sendMessage({
    action: "delete",
    id: item
  });
}
