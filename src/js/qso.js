document.getElementById("qso-form").addEventListener("submit", function(e) {
    e.preventDefault();
    var callsign = document.getElementById("callsign").value;
    var frequency = document.getElementById("frequency").value;
    var mode = document.getElementById("mode").value;
    var exchange = document.getElementById("field_day_exchange").value;
    // we are going to save the frequency and mode into local storage as you probably won't change them very often
    localStorage.setItem("frequency", frequency);
    localStorage.setItem("mode", mode);
    // create a post request to the server
    var xhr = new XMLHttpRequest();
    var data = JSON.stringify({
        callsign: callsign,
        exchange: exchange,
        frequency: frequency,
        mode: mode
    });
    xhr.open("POST", "/qso", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(data);
    // clear the form
    document.getElementById("callsign").value = "";
    document.getElementById("callsign").focus();
    document.getElementById("field_day_exchange").value = "";
});