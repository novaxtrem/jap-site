localStorage.clear();
profile = "";

gapi.load('auth2', function() {
    gapi.auth2.init();
});

var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function() {
    alert('User signed out.');
    window.location.href = "index.html";
    localStorage.clear();
});

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        alert('User signed out.');
        window.location.href = "index.html";
        localStorage.clear();
    });
}

function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
}
window.location.href = "index.html";