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
    });
}

// AMAZON

/**
 * 
 * buttons name : sticky menu when clicked
 * - crea nuevo div con varias opciones, ponerlo en una posición (fixed) right 0, top 0 
 * - y dentro ponerle botones y eventos
 * 
 */

const stickyMenuBtn = document.getElementById("stickyMenuBtn");
const menuIcon = document.getElementById("menuIcon");
let toggleMenuBtn = false;
stickyMenuBtn.addEventListener("click", showMenu);

function showMenu() {
    toggleMenuBtn = !toggleMenuBtn;

    if (menuIcon.classList.contains('fa-eye')) {
        menuIcon.classList.remove('fa-eye');
        menuIcon.classList.add('fa-eye-slash');
    } else {
        menuIcon.classList.remove('fa-eye-slash');
        menuIcon.classList.add('fa-eye');
    }

    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (toggleMenuBtn) => {
            console.log('1');

            let menuContainer = document.getElementById("menuContainer");

            if (toggleMenuBtn) {
                if (!menuContainer) {
                    const bootstrapLink = document.createElement("link");
                    bootstrapLink.rel = "stylesheet";
                    bootstrapLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
                    document.head.appendChild(bootstrapLink);

                    // Create preconnect link for fonts.gstatic.com with crossorigin for Font Awesome
                    const preconnectLink1 = document.createElement("link");
                    preconnectLink1.rel = "preconnect";
                    preconnectLink1.href = "https://cdnjs.cloudflare.com"; // Font Awesome CDN

                    // Create the Font Awesome stylesheet link
                    const fontAwesomeLink = document.createElement("link");
                    fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
                    fontAwesomeLink.rel = "stylesheet";

                    // Append both links to the document head
                    document.head.appendChild(preconnectLink1);
                    document.head.appendChild(fontAwesomeLink);

                    menuContainer = document.createElement("div");
                    menuContainer.setAttribute("id", "menuContainer");

                    menuContainer.innerHTML = `
                        <p>PRODUCTS</p>
                        <button type="button" id="infoBtn" class="btn btn-outline-primary btn-m m-1">
                            <i id="infoIcon" class="fa-solid fa-eye"></i>
                            <p class="d-inline">Info</p>
                        </button>
                        
                        <button type="button" id="cheapBtn" class="btn btn-outline-primary btn-m m-1">
                            <i id="cheapIcon" class="fa-solid fa-eye"></i>
                            <p class="d-inline">Cheapest</p>
                        </button>
                    `;
                    // contianer css
                    menuContainer.style.position = "fixed";
                    menuContainer.style.top = "50%";
                    menuContainer.style.right = "20px";
                    menuContainer.style.backgroundColor = "lightblue";
                    menuContainer.style.borderRadius = "10px";
                    menuContainer.style.padding = "10px";
                    menuContainer.style.zIndex = "10000";
                    menuContainer.style.width = "15vw";
                    menuContainer.style.textAlign = "center";

                    document.body.appendChild(menuContainer);
                    console.log('creates');

                    document.getElementById("infoBtn").addEventListener("click", showInfo);
                    document.getElementById("cheapBtn").addEventListener("click", showCheap);
                }
            } else {
                if (menuContainer) {
                    menuContainer.remove();
                }
            }

            let toggleInfoBtn = false;
            let toggleCheapBtn = false;

            window.showInfo = function () {
                console.log('info');

                toggleInfoBtn = !toggleInfoBtn;

                const infoIcon = document.getElementById("infoIcon");

                if (infoIcon.classList.contains('fa-eye')) {
                    console.log('2');
                    infoIcon.classList.remove('fa-eye');
                    infoIcon.classList.add('fa-eye-slash');
                } else {
                    infoIcon.classList.remove('fa-eye-slash');
                    infoIcon.classList.add('fa-eye');
                }

                const images = document.querySelectorAll('.a-dynamic-image');

                images.forEach((image) => {
                    image.classList.add('hover-image');

                    // Create a span for the text overlay and set its content to the alt text of the image
                    const overlayText = document.createElement('span');
                    overlayText.classList.add('hover-text');
                    overlayText.textContent = image.alt;

                    console.log('images');

                    // Create a container div to hold the image and the overlay
                    const container = document.createElement('div');
                    container.style.backgroundColor = 'lightblue';
                    container.classList.add('image-container');
                    image.parentElement.insertBefore(container, image);
                    container.appendChild(image);  // Append the image inside the container
                    container.appendChild(overlayText);  // Append the overlay text

                    // Add event listeners for mouseover and mouseout to show/hide the overlay
                    image.addEventListener('mouseover', () => {
                        overlayText.style.display = 'block';
                    });

                    image.addEventListener('mouseout', () => {
                        overlayText.style.display = 'none';
                    });
                });

            };

            window.showCheap = function () {
                console.log('cheap');

                const cheapIcon = document.getElementById("cheapIcon");

                if (cheapIcon.classList.contains('fa-eye')) {
                    cheapIcon.classList.remove('fa-eye');
                    cheapIcon.classList.add('fa-eye-slash');
                } else {
                    cheapIcon.classList.remove('fa-eye-slash');
                    cheapIcon.classList.add('fa-eye');
                }
            };
        }, args: [toggleMenuBtn]
    });
}


