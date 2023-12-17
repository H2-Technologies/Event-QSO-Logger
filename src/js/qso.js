document.getElementById("qso-form").addEventListener("submit", function(e) {
    e.preventDefault();
    var band = document.getElementById("band").value;
    var callsign = document.getElementById("callsign").value;
    var frequency = document.getElementById("frequency").value;
    var mode = document.getElementById("mode").value;
    var exchange = document.getElementById("field_day_exchange").value;
    // we are going to save the frequency and mode into local storage as you probably won't change them very often
    localStorage.setItem("frequency", frequency);
    localStorage.setItem("mode", mode);
    // create a post request to the server
    let url = "http://localhost:4000/qso/" + callsign;
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            band: band,
            callsign: callsign,
            exchange: exchange,
            frequency: frequency,
            mode: mode
        }),
        headers: {
            "Content-Type": "text/plain;"
        },
        mode: "no-cors"
    })
    // clear the form
    document.getElementById("callsign").value = "";
    document.getElementById("callsign").focus();
    document.getElementById("field_day_exchange").value = "";
});