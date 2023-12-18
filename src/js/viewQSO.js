let callsign = "KE8YGW";
let url = "https://qsoapi.austinh.us/qso/" + callsign;
let tbody = document.querySelector("tbody");

document.addEventListener("DOMContentLoaded", () => {
    //get the submit button and add an event listener
    document.getElementById("searchButton").addEventListener("click", () => {
        //get the value of the input field
        callsign = document.querySelector("#callsign").value;
        url = "https://qsoapi.austinh.us/qso/" + callsign;
        QSO_func(url);
    });
});

function QSO_func(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text(); // Use text() first to see the raw response
    })
    .then((text) => {
      console.log("Raw text response:", text); // Log the raw text
      return JSON.parse(text); // Then try to parse it as JSON
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let date = new Date(data[i].created_at);

        let formattedDate = date.toLocaleDateString(); // Converts to local date string
        let formattedTime = date.toLocaleTimeString(); // Converts to local time string

        console.log(formattedDate + " " + formattedTime);
        tbody.innerHTML = data
          .map((qso) => {
            return `<tr class="text-center border-b">
                <td>${qso.callsign}</td>
                <td>${qso.operator}</td>
                <td>${qso.band}</td>
                <td>${qso.mode}</td>
                <td>${formattedDate}</td>
                <td>${formattedTime}</td>
                </tr>`;
          })
          .join("");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
