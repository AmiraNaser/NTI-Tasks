//global identifiers
const addForm  = document.querySelector('#addForm');
const userData = ["userName", "userphone", "flexRadioDefault"];
const contentWrap= document.querySelector("#contentWrap")
// read data from localStorage
const readuserDara = (key) => {
    let data;
    try {
        data = JSON.parse(localStorage.getItem(key));
        if (!Array.isArray(data))  {
            throw new Error ("It is not array");
        }
    } catch (error) {
        data = [];
    }
    return data;
}
// write data to localStorage
const writeUserData = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        localStorage.setItem(key, "[]");
    }
}
if(addForm) {
    addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const extraData = {id: Date.now()};
        userData.forEach( (task) => extraData[task] = addForm.elements[task].value);
        const allData = readuserDara("userData");
        allData.push(extraData);
        writeUserData("userData", allData);
        addForm.reset();
        window.location.href = "index.html"
    })
}
const createMyElement = (parent, ele, text, classes) => {
    const elem = document.createElement(ele);
    parent.appendChild(elem);
    if(text) elem.textContent = text;
    if(classes) elem.classList = classes;
    return elem;
}
const showAllData = (allData) => {
    contentWrap.innerHTML = "" ;
    if(allData.length == 0) {
        const tr = createMyElement(contentWrap, "tr", null, "alert alert-danger");
        const td = createMyElement(tr, "td", "No Data Yet", "alert alert-danger");
        td.setAttribute("colspan", "5");
    }
    allData.forEach( (data, index) => {
        const tr = createMyElement(contentWrap, "tr");
        createMyElement(tr, "td", data.id);
        createMyElement(tr, "td", data.userName);
        createMyElement(tr, "td", data.userphone);
        createMyElement(tr, "td", data.flexRadioDefault);
        const td = createMyElement(tr, "td");
        const showBtn = createMyElement(td, "button", "show","btn btn-primary mx-3");
        const editBtn = createMyElement(td, "button", "Edit","btn btn-warning mx-3");
        const delBtn  = createMyElement(td, "button", "Delete","btn btn-danger mx-3");
        showBtn.addEventListener("click", (e) => {
            window.alert(`User Index is ${index}`);
        })
        delBtn.addEventListener("click", (e) => {
            allData.splice(index, 1);
            writeUserData("userData", allData);
            showAllData(allData);
        })
        editBtn.addEventListener("click", (e) => {
            //window.location.href = "edit.html";
            console.log("hello");
            
        })
    })
}
if(contentWrap) {
    const allData = readuserDara("userData");
    showAllData(allData);
}