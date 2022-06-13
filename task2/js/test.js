// const apiData = async(cb) => {
//     try {
//         const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//         const jsonData = await data.json();
//         cb(jsonData, false);
//     } catch (error) {
//         cb(false, error.message);
//     }
// }
// apiData((res, err) => {
//     if(res) console.log(res);
//     else console.log(err);
// })

// const mainApiLink = "https://jsonplaceholder.typicode.com/";
// const apis = [
//     "posts",
//     "users",
//     "todos"
// ];
// const btnWrap = document.querySelector("#myData");
// const createMyElement = (parent, ele, text, classes) => {
//     const elem = document.createElement(ele);
//     parent.appendChild(elem);
//     if(text) elem.textContent = text;
//     if(classes) elem.classList = classes;
//     return elem;
// }
// const apiReq = async(apilink, cb) => {
//     try {
//        const data =  await (await fetch(apilink)).json();
//        cb(data); 
//     } catch (error) {
//         cb( e.message)
//     }
// }
// apis.forEach( (el) => {
//     let apiBtn = createMyElement(btnWrap, "button", el);
//     apiBtn.addEventListener("click", (e) => {
//         apiReq(`${mainApiLink}${el}`, (res, err) => {
//             if(err) console.log(err);
//             console.log(res);
//         })
//     })
// })
// const fs = require("fs");
// fs.writeFileSync("newfile.txt", "hello");
// fs.renameSync("newfile.txt", "b.txt");
// console.log(__dirname);
// console.log(__filename);
const validator = require("validator");
console.log(validator.isEmail('foo@bar.com'));
