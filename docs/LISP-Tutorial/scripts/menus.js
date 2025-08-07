const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

const main = Array.from(document.getElementsByClassName("main"))[0];

const h_group = Array.from(document.getElementsByClassName("hints-group"));
const h_btn = h_group[0]; 
const h_bar = h_group[1]; 

const content = Array.from(document.getElementsByClassName("content"))[0];

const n_group = Array.from(document.getElementsByClassName("nav-group"));
const n_bar = n_group[0];
const n_btn = n_group[1];


function screenAspectRatio() {
    if(document.body.clientHeight > document.body.clientWidth)
    {
        return "vertical";
    }

    return "horizontal";
}

let h_open_menu = false;
let n_open_menu = false;

function h_shrink(transition) {
    if(transition) {
        h_bar.style.transition = "0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
        h_btn.style.transition = "0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
        h_btn.firstElementChild.style.transition = "0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
    } else {
        h_bar.style.transition = "none";
        h_btn.style.transition = "none";
        h_btn.firstElementChild.style.transition = "none";
    }

    h_bar.style.width = 0;
    h_bar.style.minWidth = 0;
    h_bar.style.padding = 0;

    h_btn.firstElementChild.style.transform = "none";
}

function h_expand(transition) {
    const bar_perc = 40;
    const bar_min = 15;

    if(transition) {
        h_bar.style.transition = "0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
        h_btn.style.transition = "0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
        h_btn.firstElementChild.style.transition = "0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
    } else {
        h_bar.style.transition = "none";
        h_btn.style.transition = "none";
        h_btn.firstElementChild.style.transition = "none";
    }

    h_bar.style.width = bar_perc + "%";
    h_bar.style.minWidth = bar_min + "rem";
    h_bar.style.padding = "0 0.5rem 0 0.5rem";

    h_btn.firstElementChild.style.transform = "rotate3d(0, 1, 0, 180deg)";

    if(screenAspectRatio() == "vertical")
    {
        h_bar.style.position = "absolute";

        if((bar_min * rem) > (main.clientWidth * (bar_perc / 100))) {
            h_btn.style.transform = "translateX(" + -bar_min + "rem" + ")";
        } else {
            h_btn.style.transform = "translateX(" + -main.clientWidth * (bar_perc / 100) + "px)";
        }
        n_shrink();

        n_open_menu = false;
    }
}

function n_shrink(transition) {
    if(transition) {
        n_bar.style.transition = "0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
        n_btn.style.transition = "0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
        n_btn.firstElementChild.style.transition = "0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
    } else {
        n_bar.style.transition = "none";
        n_btn.style.transition = "none";
        n_btn.firstElementChild.style.transition = "none";
    }

    n_bar.style.minWidth = 0;
    n_bar.style.width = 0;
    n_bar.style.padding = 0;

    n_btn.firstElementChild.style.transform = "none";
}

function n_expand(transition) {
    if(transition) {
        n_bar.style.transition = "0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
        n_btn.style.transition = "0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
        n_btn.firstElementChild.style.transition = "0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
    } else {
        n_bar.style.transition = "none";
        n_btn.style.transition = "none";
        n_btn.firstElementChild.style.transition = "none";
    }

    n_bar.style.width = "20%";
    n_bar.style.minWidth = "15rem";

    n_btn.firstElementChild.style.transform = "rotate3d(0, 1, 0, 180deg)";

    if(screenAspectRatio() == "vertical")
    {
        h_shrink(true);

        h_open_menu = false;
    }
}

h_btn.addEventListener("click", () => {
    if(h_open_menu) {
        h_shrink(true);

        h_open_menu = false;
    } else {
        h_expand(true);

        h_open_menu = true;
    }
});

n_btn.addEventListener("click", () => {
    if(n_open_menu) {
        n_shrink(true);

        n_open_menu = false;
    } else {
        n_expand(true);

        n_open_menu = true;
    }
});

let prevWidth = document.body.clientWidth;

window.addEventListener("resize", () => {
    if(screenAspectRatio() == "vertical") {
        if(prevWidth > document.body.clientWidth)
        {
            n_open_menu = false;
            h_open_menu = false;

            h_shrink(true);
            n_shrink(true);
        }
    }

    prevWidth = document.body.clientWidth;
});

window.addEventListener("load", () => {
    if(screenAspectRatio() == "horizontal") {
        n_open_menu = true;

        n_expand(false);
    }
});

