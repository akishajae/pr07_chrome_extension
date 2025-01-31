// GENERAL FUNCTIONS

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

const fbBtn = document.getElementById("fbBtn");
const amazonBtn = document.getElementById("amazonBtn");
const facebookContainer = document.getElementById("facebookContainer");
const amazonContainer = document.getElementById("amazonContainer");

facebookContainer.style.display = "block";
amazonContainer.style.display = "none";

fbBtn.addEventListener("click", function () {
    facebookContainer.style.display = "block";
    amazonContainer.style.display = "none";

    fbBtn.classList.add("active");
    amazonBtn.classList.remove("active");
});

amazonBtn.addEventListener("click", function () {
    amazonContainer.style.display = "block";
    facebookContainer.style.display = "none";

    amazonBtn.classList.add("active");
    fbBtn.classList.remove("active");
});

// FACEBOOK

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

}

let imgBtn = document.getElementById("imgBtn");
imgBtn.addEventListener("click", toggleImgView);

function toggleImgView() {

}

let passwordBtn = document.getElementById("passwordBtn");
passwordBtn.addEventListener("click", togglePasswordInput);

function togglePasswordInput() {

}

// AMAZON