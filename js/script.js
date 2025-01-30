// document.getElementById("btn").addEventListener("click",changeBackColor);
// function changeBackColor(){
//     document.body.style.backgroundColor = "red";
//     chrome.scripting.executeScript({
//         target:{tabId:tabId},
//         function:changeColor,
//         args:["purple"]
//     })
// }   
// function changeColor(color){
//     document.body.style.backgroundColor = color;
//     console.log("Color canviat a "+color);
//     document.querySelector("a.gb_W").innerText="G-MAIL";
// }
// let tabId;
// chrome.tabs.query(
//     {active:true,currentWindow:true},
//     function(tabs){
//     tabId = tabs[0].id;
//     console.log("tabId: "+tabId);
// });
