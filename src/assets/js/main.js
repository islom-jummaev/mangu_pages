// Product presenter
let bigImage = document.querySelector("#big-image");
let thumbnails = document.querySelectorAll(".thumbnail");

[...thumbnails].map(item => {
    item.addEventListener("click", (event) => {
        [...thumbnails].map(el => {
            el.classList.remove('active');
        });
        item.classList.toggle('active');
        bigImage.src = event.currentTarget.src;
    });
})

// Navbar collapse
let menu = document.querySelector(".menu");
document.querySelector(".brand svg").addEventListener("click", () => {
    menu.style.display = "block";
});
document.querySelector(".menu svg").addEventListener("click", () => {
    menu.style.display = "none";
});

// Auction timer
let h, m, s, timer,
    hours = document.querySelector(".timer .hours"),
    minutes = document.querySelector(".timer .minutes"),
    seconds = document.querySelector(".timer .seconds"),
    timeInSeconds = Number(hours.innerText) * 60 * 60 + Number(minutes.innerText) * 60 + Number(seconds.innerText);

timer = setInterval(() => {
    timeInSeconds -= 1;
    h = Math.floor(timeInSeconds / (60 * 60));
    m = Math.floor((timeInSeconds % (60 * 60)) / 60);
    s = Math.floor(timeInSeconds % 60);
    hours.innerText = (h < 10) ? "0" + h : h;
    minutes.innerText = (m < 10) ? "0" + m : m;
    seconds.innerText =  (s < 10) ? "0" + s : s;
    if (timeInSeconds < 0) {
        clearInterval(timer);
    }
}, 1000);

// Products Slider
let sliderParentStyle, sliderParentWidth, prevMax, nextMax, prevIndex, nextIndex, left,
    slider = document.getElementById("slider"),
    prevBtn = document.getElementById("prev-slide"),
    nextBtn = document.getElementById("next-slide"),
    items = document.querySelectorAll("#slider .slide"),
    deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

const config = () => {
    if (deviceWidth > 1200) {
        return {
            items: 4,
            margin: 30,
        };
    }
    if (deviceWidth > 992 && deviceWidth < 1200) {
        return {
            items: 3,
            margin: 30,
        };
    }
    if (deviceWidth > 768 && deviceWidth < 992) {
        return {
            items: 2,
            margin: 30,
        };
    }
    if (deviceWidth < 768) {
        return {
            items: 2,
            margin: 8,
        };
    }
}; 

sliderParentStyle = window.getComputedStyle(slider.parentElement, null);
sliderStyle = window.getComputedStyle(slider, null);
sliderParentWidth = parseFloat(sliderParentStyle.width) - parseFloat(sliderParentStyle.paddingRight) - parseFloat(sliderParentStyle.paddingLeft);

const itemWidth = (sliderParentWidth - ((config().items - 1) * config().margin)) / config().items;

[...items].map(item => {
    Object.assign(
        item.style, {
            "width": itemWidth + "px",
            "margin-right": config().margin + "px",
        }
    );
});

left = 0;
prevMax = nextMax = items.length - config().items;
prevIndex = prevMax;
nextIndex = 0;

nextBtn.addEventListener("click", () => {
    if (nextIndex < nextMax) {
        prevBtn.classList.remove("disabled");
        if (nextIndex + 1 == nextMax) nextBtn.classList.add("disabled");
        left -= itemWidth + config().margin;
        slider.style.left = left + "px";
        nextIndex++;
        prevIndex--;
    }
});

prevBtn.addEventListener("click", () => {
    if (prevIndex < prevMax) {
        nextBtn.classList.remove("disabled");
        if (prevIndex + 1 == prevMax) prevBtn.classList.add("disabled");
        left += itemWidth + config().margin;
        slider.style.left = left  + "px";
        prevIndex++;
        nextIndex--;
    }
});
