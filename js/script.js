let tabId;
chrome.tabs.query({
    active: true,
    currentWindow: true
},
    function (tabs) {
        let currentTab = tabs[0];
        if (currentTab) {
            tabId = currentTab.id;
        }
    }
);

let bgColorBtn = document.getElementById("bgColorBtn");
bgColorBtn.addEventListener("click", changeColorBg);

function changeColorBg() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (color) => {
            console.log(color);
            document.body.style.backgroundColor = color;
        },
        args: ["red"]
    });
}

let linkColorBtn = document.getElementById("linkColorBtn");
linkColorBtn.addEventListener("click", changeColorLink);

function changeColorLink() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        
    })
}

let removeImgBtn = document.getElementById("removeImgBtn");
removeImgBtn.addEventListener("click", removeImg);

function removeImg() {

}

let passwordBtn = document.getElementById("passwordBtn");
passwordBtn.addEventListener("click", togglePasswordInput);

function togglePasswordInput() {

}