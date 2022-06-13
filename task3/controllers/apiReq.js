const http = require("http");
const apiFun = (url) => {
    const req = http.request(url, (res) => {
        let allData = "";
        res.on("data", (myData) => {
            allData += myData.toString();
        })
        res.on("end", () => {
            console.log(JSON.parse(allData));
        })
    })
    req.on("error", (e) => {
        console.log(`Errpr: ${e}`);
    })
    req.end();
}
module.exports = {apiFun};