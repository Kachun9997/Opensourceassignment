var audio = new Audio('submarine-diving-alarm-daniel_simon.mp3');

browser.alarms.onAlarm.addListener(alarm => {
  const items = browser.storage.local.get('tsl_reminder');

  items.then(res => {
    audio.play();

    var splitted = alarm.name.split(',');

    browser.notifications.create(splitted[0], {
      type: 'basic',
      iconUrl: 'alarm.png',
      title: 'Remainder',
      message: splitted[0]
    });
