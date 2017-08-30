var socket = io.connect('http://localhost:8080', {'forceNew': true});

socket.on('messages', function (data) {
    console.log(data);
    render(data);
    sendNotification();
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

function sendNotification() {
    var notification = null;
    var title = "CV notif";
    var options = {
        body: "theBody",
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
        alert("clik over me again");
    };
    notification.onclose = function () {
        alert("why did you dimiss me!!!!");
    };
}
;

function addMessage(e) {
    var message = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    socket.emit('new-message', message);
    return false;
}
