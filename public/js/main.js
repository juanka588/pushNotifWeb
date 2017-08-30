var socket = io.connect('http://10.41.5.195:9090', {'forceNew': true});
var sessionId = -1;

socket.on('messages', function (data) {
    sessionId = socket.io.engine.id;
    render(data);
    sendNotification(data[data.length - 1]);
});

function render(data) {
    var html = data.map(function (elem, index) {
        return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

function sendNotification(data) {
    if (data.id === sessionId) {
        console.log("own message " + sessionId);
        return;
    }
    var notification = null;
    var title = data.author;
    var options = {
        body: data.text,
        icon: "images/me.jpg"
    };
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        notification = new Notification(title, options);

    } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {

            if (permission === "granted") {
                notification = new Notification(title, options);
            }
        });
    }

    notification.onclick = function () {
        //alert("clik over me again");
    };
    notification.onclose = function () {
        //alert("why did you dimiss me!!!!");
    };
}
;

function addMessage(e) {
    var message = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        id: socket.io.engine.id
    };

    socket.emit('new-message', message);
    return false;
}
