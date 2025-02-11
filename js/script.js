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
const bgColorIcon = document.getElementById("bgColorIcon");
bgColorBtn.addEventListener("click", changeColorBg);

function changeColorBg() {
    if (bgColorIcon.classList.contains('fa-droplet')) {
        bgColorIcon.classList.remove('fa-droplet', 'p-1');
        bgColorIcon.classList.add('fa-droplet-slash');
    } else {
        bgColorIcon.classList.remove('fa-droplet-slash');
        bgColorIcon.classList.add('fa-droplet', 'p-1');
    }

    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (color) => {
            console.log("bgColor: ", color);

            const body = document.body;

            if (body.style.backgroundColor === color) {
                console.log('null');
                body.style.backgroundColor = '';
            } else {
                console.log('color');
                body.style.backgroundColor = color;
            }

            // changes the background as we know, not the tag "body" -->
            const elements = document.getElementsByClassName("_8esj _95k9 _8esf _8opv _8f3m _8ilg _8icx _8op_ _95ka");
            for (let element of elements) {
                console.log('element');

                if (element.style.backgroundColor === color) {
                    console.log('null');
                    element.style.backgroundColor = '';
                } else {
                    console.log('color');
                    element.style.backgroundColor = color;
                }
            }
        },
        args: ["rgb(155, 18, 18)"]
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
const imgIcon = document.getElementById("imgIcon");
imgBtn.addEventListener("click", toggleImgView);

function toggleImgView() {
    if (imgIcon.classList.contains('fa-eye')) {
        imgIcon.classList.remove('fa-eye');
        imgIcon.classList.add('fa-eye-slash');
    } else {
        imgIcon.classList.remove('fa-eye-slash');
        imgIcon.classList.add('fa-eye');
    }

    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
            const imgs = document.getElementsByTagName("img");
            for (let img of imgs) {
                // img.src = null; --> deletes img

                //  img.style.display === 'none' ? 'block' : 'none';
                if (img.style.display == 'none') {
                    img.style.display = 'block';
                } else {
                    img.style.display = 'none';
                }
            }
        }
    });
}

const pswdBtn = document.getElementById("pswdBtn");
const pswdIcon = document.getElementById("pswdIcon");
pswdBtn.addEventListener("click", togglePasswordInput);

function togglePasswordInput() {
    if (pswdIcon.classList.contains('fa-eye')) {
        pswdIcon.classList.remove('fa-eye');
        pswdIcon.classList.add('fa-eye-slash');
    } else {
        pswdIcon.classList.remove('fa-eye-slash');
        pswdIcon.classList.add('fa-eye');
    }

    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
            console.log(1);
            let passwords = document.querySelectorAll("input[type='password'], input[data-is-pass]");

            passwords.forEach((password) => {
                let isPass = password.getAttribute('data-is-pass');

                if (isPass === null) {
                    console.log(2);
                    isPass = 'true';
                }

                if (isPass === 'true') {
                    password.setAttribute('type', 'text');
                    password.setAttribute('data-is-pass', 'false');
                    console.log('text');
                } else {
                    password.setAttribute('type', 'password');
                    password.setAttribute('data-is-pass', 'true');
                    console.log('password');
                }
            });
        }
    })
}

// AMAZON

/**
 * 
 * buttons name : sticky menu when clicked
 * - crea nuevo div con varias opciones, ponerlo en una posición (fixed) right 0, top 0 
 * - y dentro ponerle botones y eventos
 * 
 */

