var background = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path == 'background-to-popup') {
          if (request.method === id) tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data) {chrome.runtime.sendMessage({"path": 'popup-to-background', "method": id, "data": data})}
  }
})();

var config = {
  "history": [],
  "signs": ['-', '+', '*', '/', '%', '=', '⟵', 'C', '±', '.', '✕'],
  "insert": function (key) {
    var firefox = navigator.userAgent.indexOf("Firefox") !== -1;
    var textarea = document.querySelector("textarea");
    textarea.focus();
    /*  */
    if (firefox) textarea.value = textarea.value + key;
    else document.execCommand("insertText", false, key);
  },
  "solve": function () {
    var textarea = document.querySelector("textarea");
    if (textarea.value) {
      textarea.value = textarea.value.replace(/\,/g, '.');
      /*  */
      var last = config.history[config.history.length - 1];
      if (config.history.length > 13) config.history.shift();
      if (textarea.value !== last) config.history.push(textarea.value);
      textarea.value = Math.round(config.calculator.solve(textarea.value) * 10000000) / 10000000;
      background.send("history", config.history);
      background.send("input", textarea.value);
      config.update.history();
    }
    /*  */
    textarea.focus();
  },
  "minus": function () {
    var textarea = document.querySelector("textarea");
    var value = textarea.value;
    value = value.replace(/([-\+]*)([\.\d]*)$/, function (a, b, c) {return b === '-' ? '+' + c : '-' + c});
    textarea.value = value;
    textarea.focus();
    background.send("input", textarea.value);
  },
  "backspace": function () {
    var textarea = document.querySelector("textarea");
    var end = textarea.selectionEnd;
    var start = textarea.selectionStart;
    if (start === end) textarea.selectionStart = start -1;
    textarea.focus();
    var c = document.execCommand('delete', false);
    if (!c) textarea.value = textarea.value.substring(0, textarea.value.length - 1);
    background.send("input", textarea.value);
  },
  "update": {
    "history": function () {
      var select = document.querySelector("select");
      var add = function (a, b) {
        var option = document.createElement("option");
        select.appendChild(option);
        option.textContent = a;
        option.value = b;
      };
      /*  */
      select.textContent = '';
      add("History", '');
      for (var i = 0; i < config.history.length; i++) {
        add(config.history[i], config.history[i]);
      }
    }
  },
  "load": function () {
    var select = document.querySelector("select");
    var textarea = document.querySelector("textarea");
    var number = document.querySelectorAll(".number");
    /*  */
    for (var i = 0; i < number.length; i++) {
      number[i].addEventListener("click", function (e) {
        config.insert(e.target.textContent);
      });
    }
    /*  */
    select.addEventListener("change", function (e) {
      if (e.target.value) {
        textarea.value = e.target.value;
        background.send("input", textarea.value);
        textarea.focus();
      }
    });
    /*  */
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        config.solve();
      }
    });
    /*  */
    textarea.focus();
    config.listener();
    background.send("storage");
    window.removeEventListener("load", config.load, false);
    textarea.addEventListener("input", function (e) {background.send("input", e.target.value)});
  },
  "listener": function () {
    var plus = document.querySelector(".plus");
    var equal = document.querySelector(".equal");
    var divid = document.querySelector(".divid");
    var clear = document.querySelector(".clear");
    var point = document.querySelector(".point");
    var remove = document.querySelector(".remove");
    var percent = document.querySelector(".percent");
    var subtract = document.querySelector(".subtract");
    var multiply = document.querySelector(".multiply");
    var plusminus = document.querySelector(".plusminus");
    /*  */
    plus.textContent = config.signs[1];
    divid.textContent = config.signs[3];
    equal.textContent = config.signs[5];
    clear.textContent = config.signs[7];
    point.textContent = config.signs[9];
    remove.textContent = config.signs[6];
    percent.textContent = config.signs[4];
    subtract.textContent = config.signs[0];
    multiply.textContent = config.signs[10];
    plusminus.textContent = config.signs[8];
    /*  */
    equal.addEventListener("click", config.solve);
    plusminus.addEventListener("click", config.minus);
    remove.addEventListener("click", config.backspace);
    plus.addEventListener("click", function () {config.insert(config.signs[1])});
    point.addEventListener("click", function () {config.insert(config.signs[9])});
    divid.addEventListener("click", function () {config.insert(config.signs[3])});
    percent.addEventListener("click", function () {config.insert(config.signs[4])});
    subtract.addEventListener("click", function () {config.insert(config.signs[0])});
    multiply.addEventListener("click", function () {config.insert(config.signs[2])});
    clear.addEventListener("click", function () {document.querySelector("textarea").value = ''});
  }
};

config.calculator = new AterCalculator();

config.calculator.operators['%'] = {
  "operands": 2,
  "precedence": 10,
  "associativity": 'r',
  "func": function (a, b) {return b ? a * b / 100 : a / 100}
};

background.receive("data", function (e) {
  var textarea = document.querySelector("textarea");
  config.history = e.history;
  textarea.value = e.input;
  config.update.history();
});

window.addEventListener("load", config.load, false);
