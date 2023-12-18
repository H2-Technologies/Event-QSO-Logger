let callsign = "KE8YGW";
let url = "https://qsoapi.austinh.us/qso/" + callsign;
fetch(url, {
    method: "GET",
    mode: "no-cors"
})
.then(data => data.json())
.then(data => {
    // convert the created_at to a data and time string
    for (let i = 0; i < data.length; i++) {
        let date = new Date(data[i].created_at);
        data[i].created_at = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }
    console.log(data);
})