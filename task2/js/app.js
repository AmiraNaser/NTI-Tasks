function apiData (cb) {
    const data = fetch('https://jsonplaceholder.typicode.com/todos/1');
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
    for (let i = 0; i < res.length; i++) {
        const div = document.createComment("div");
        div.innerHTML = 'userId: ' + res[i].userId ;
        container.appendChild(div);
    }
})