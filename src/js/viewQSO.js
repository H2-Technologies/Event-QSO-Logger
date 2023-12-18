let callsign = "KE8YGW";
let url = "https://qsoapi.austinh.us/qso/" + callsign;
let tbody = document.querySelector("tbody");
/*fetch(url, {
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
*/
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();  // Use text() first to see the raw response
    })
    .then(text => {
        console.log("Raw text response:", text);  // Log the raw text
        return JSON.parse(text);  // Then try to parse it as JSON
    })
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            let date = new Date(data[i].created_at);
            data[i].created_at = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        }
        tbody.innerHTML = data.map(qso => {
            return `<tr>
            <td>${qso.band}</td>
            <td>${qso.callsign}</td>
            <td>${qso.exchange}</td>
            <td>${qso.frequency}</td>
            <td>${qso.mode}</td>
            <td>${qso.created_at}</td>
        </tr>`;
        }).join("");
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
/*

 */