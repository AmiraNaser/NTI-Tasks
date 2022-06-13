function apiData (cb) {
    const data = fetch('https://jsonplaceholder.typicode.com/comments');
    data
    .then( (res) => {
        jsonData = res.json()
        jsonData
        .then( (result) => cb(result))
        .catch(e => cb(e))
    })
    .catch(e => cb(e))
}
apiData((res) => {
    console.log(res);
    const container = document.getElementById("myData");
    const div = document.createElement("div");
    div.innerText = res;
    container.appendChild(div);
    window.alert(res);
})

