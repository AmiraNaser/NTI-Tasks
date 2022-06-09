//global identifiers
const addForm  = document.querySelector('#addForm');
const userData = ["userName", "userphone"];
const contentWrap = document.querySelector("#contentWrap");
const singleUserData = document.querySelector("#userData");
const editForm = document.querySelector("#editForm");
// read data from localStorage
const readuserData = (key, dataType = "") => {
    let data;
    const myData = localStorage.getItem(key);
    if(dataType == "string") {
        return myData;
    }
    try {
        data = JSON.parse(myData);
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
        const extraData = {status: "active", id: Date.now()};
        userData.forEach( (task) => extraData[task] = addForm.elements[task].value);
        const allData = readuserData("userData");
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
        const td = createMyElement(tr, "td");
        const statusbtn = createMyElement(td, "button", data.status,"btn btn-success mx-3");
        const showBtn = createMyElement(td, "button", "show","btn btn-primary mx-3");
        const editBtn = createMyElement(td, "button", "Edit","btn btn-warning mx-3");
        const delBtn  = createMyElement(td, "button", "Delete","btn btn-danger mx-3");
        showBtn.addEventListener("click", (e) => {
            showSingleUser(index);
        })
        delBtn.addEventListener("click", (e) => {
            deleteFun("userData", allData, index);
        })
        editBtn.addEventListener("click", (e) => {
            editFun(index);
        })
    })
}
const showSingleUser = (index) => {
    localStorage.setItem("singleData", index);
    window.location.href = "single.html";
}
const editFun = (index) => {
    localStorage.setItem("editData", index);
    window.location.href = "edit.html";
} 
const deleteFun = (key, allData, index) => {
    allData.splice(index, 1);
    writeUserData(key, allData);
    showAllData(allData);
}
if(contentWrap) {
    const allData = readuserData("userData");
    showAllData(allData);
}
if(singleUserData) {
    const index   = readuserData("singleData", "string");
    const allData = readuserData("userData");
    try {
        const user = allData[index];
        //window.alert(user.id);
        createMyElement(singleUserData, "p", user.id);
        createMyElement(singleUserData, "p", user.userName);
        createMyElement(singleUserData, "p", user.userphone);
    } catch (error) {
        createMyElement(singleUserData, "p", "There is not such a user", "alert alert-danger")
    }
}
if(editForm) {
    const index = readuserData('editData', "string");
    const allData = readuserData("userData");
    const task = allData[index];
    userData.forEach( h => editForm.elements[h].value = task[h]);
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        userData.forEach( h => allData[index][h] = editForm.elements[h].value);
        writeUserData("userData", allData);
        editForm.reset();
        window.location.href = "index.html";
    })
}