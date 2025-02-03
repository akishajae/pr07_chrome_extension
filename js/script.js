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

const bgColorBtn = document.getElementById("bgColorBtn");
const bgColorInput = document.getElementById("bgColorInput");
bgColorBtn.addEventListener("click", changeColorBg);

function changeColorBg() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (color) => {
            console.log("bgColor: ", color);
            document.body.style.backgroundColor = color;
            // const elements = document.getElementsByClassName("_8esj _95k9 _8esf _8opv _8f3m _8ilg _8icx _8op_ _95ka");
            // for (let element of elements) {
            //     element.style.backgroundColor = color;
            // }
        },
        args: ["#9B1212"]
    });
}

const linkColorBtn = document.getElementById("linkColorBtn");
const linkColorInput = document.getElementById("linkColorInput");
linkColorBtn.addEventListener("click", changeColorLink);

function changeColorLink() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (color) => {
            console.log("linkColor: ", color);
            const links = document.getElementsByTagName("a");
            for (let link of links) {
                link.style.color = color;
            }
        },
        args: [linkColorInput.value]
    });
}

const imgBtn = document.getElementById("imgBtn");
imgBtn.addEventListener("click", toggleImgView);

function toggleImgView() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
            const imgs = document.getElementsByTagName("img");
            for (let img of imgs) {
                img.style.display = img.style.display === 'none' ? 'block' : 'none';
            }
        }
    });
}

const passwordBtn = document.getElementById("passwordBtn");
passwordBtn.addEventListener("click", togglePasswordInput);

function togglePasswordInput() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
            console.log('test');
            const passwordInputs = document.querySelectorAll('input[type="password"]');
            passwordInputs.forEach(input => {
                if (!input.hasAttribute('data-is-password')) {
                    input.setAttribute('data-is-password', true);
                }

                input.getAttribute('data-is-password') === 'true' ? input.setAttribute('data-is-password', false) : input.setAttribute('data-is-password', true);
                // input.getAttribute('data-is-password') === 'false' ? input.type = 'text' : input.type = 'password';
            });
        }
    })
}

// AMAZON