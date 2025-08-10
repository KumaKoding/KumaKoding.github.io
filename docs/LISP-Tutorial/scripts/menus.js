const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

const main = document.getElementsByClassName("main")[0];
const content = document.getElementsByClassName("content")[0];
const transparent_overlay = document.getElementsByClassName("transparent-overlay")[0];

function screenAspectRatio() {
    if(window.innerHeight > window.innerWidth)
    {
        return "vertical";
    }

    return "horizontal";
}

const state = {
    orientation: "horizontal",
    last_opened: undefined
};

const left = {
    spacer: document.getElementsByClassName("left-spacer")[0],
    container: document.getElementsByClassName("left-sidebar")[0],
    button: document.getElementsByClassName("left-button")[0],
    defaults: {
        perc_width: 20,
        rem_min_width: 15,
        transition: "0.5s",
    },
    adjustments: {
        left_offset: 0,
        left_space: 0,
        transition: "none"
    },
    open: false
};

const right = {
    spacer: document.getElementsByClassName("right-spacer")[0],
    container: document.getElementsByClassName("right-sidebar")[0],
    button: document.getElementsByClassName("right-button")[0],
    defaults: {
        perc_width: 33,
        rem_min_width: 15,
        transition: "0.5s",
    },
    adjustments: {
        right_offset: 0,
        right_space: 0,
        transition: "none"
    },
    open: false
};


function close_left() {
    left.open = false;
}

function close_right() {
    right.open = false;
}

function open_left() {
    left.open = true;
    state.last_opened = "left";
}

function open_right() {
    right.open = true;
    state.last_opened = "right";
}

transparent_overlay.addEventListener("click", () => {
    if(state.last_opened == "left") {
        left.adjustments.transition = left.defaults.transition;
        close_left();
    } else if(state.last_opened == "right") {
        right.adjustments.transition = right.defaults.transition;
        close_right();
    }

    update();
})

left.button.addEventListener("click", () => {
    left.adjustments.transition = left.defaults.transition;

    if(!left.open) {
        open_left()
    } else {
        close_left();
    }

    update();
});

right.button.addEventListener("click", () => {
    right.adjustments.transition = right.defaults.transition;

    if(!right.open) {
        open_right()
    } else {
        close_right();
    }

    update();
});

window.addEventListener("load", () => {
    state.orientation = screenAspectRatio();
    
    left.adjustments.transition = "none";
    right.adjustments.transition = "none";

    if(state.orientation == "horizontal") {
        open_left();
    } else {
        close_left();
    }

    close_right();

    update();
});

function adjust_left_spacer() {
    if(left.open) {
        if(state.orientation == "horizontal") {
            if(main.clientWidth * (left.defaults.perc_width / 100) > left.defaults.rem_min_width * rem) {
                left.adjustments.left_space = left.defaults.perc_width + "%";
            } else {
                left.adjustments.left_space = left.defaults.rem_min_width + "rem";
            }
        } else {
            left.adjustments.left_space = 1 + "rem";
        }
    } else {
        left.adjustments.left_space = 1 + "rem";
    }
}

function adjust_right_spacer() {
    if(right.open) {
        if(state.orientation == "horizontal") {
            if(main.clientWidth * (right.defaults.perc_width / 100) > right.defaults.rem_min_width * rem) {
                right.adjustments.right_space = right.defaults.perc_width + "%";
            } else {
                right.adjustments.right_space = right.defaults.rem_min_width + "rem";
            }
        } else {
            right.adjustments.right_space = 1 + "rem";
        }
    } else {
        right.adjustments.right_space = 1 + "rem";
    }
}

function adjust_left_menu() {
    if(left.open) {
        left.adjustments.left_offset = 0;
    } else {
        if(main.clientWidth * (left.defaults.perc_width / 100) > left.defaults.rem_min_width * rem) {
            left.adjustments.left_offset = (-(main.clientWidth * (left.defaults.perc_width / 100)) + (1 * rem)) + "px";
        } else {
            left.adjustments.left_offset = (-left.defaults.rem_min_width + 1) + "rem";
        }
    }
}

function adjust_right_menu() {
    if(right.open) {
        right.adjustments.right_offset = 0;
    } else {
        if(main.clientWidth * (right.defaults.perc_width / 100) > right.defaults.rem_min_width * rem) {
            right.adjustments.right_offset = (-(main.clientWidth * (right.defaults.perc_width / 100)) + (1 * rem)) + "px";
        } else {
            right.adjustments.right_offset = (-right.defaults.rem_min_width + 1) + "rem";
        }
    }
}

function update() {
    if(state.orientation == "vertical" && (left.open || right.open)) {
        transparent_overlay.style.display = "block";
    } else {
        transparent_overlay.style.display = "none";
    }

    if(state.orientation == "vertical" && left.open && right.open) {
        if(state.last_opened == "left") {
            right.adjustments.transition = right.defaults.transition;
            close_right();
        } else {
            left.adjustments.transition = left.defaults.transition;
            close_left();
        }
    }
    
    adjust_left_spacer();
    adjust_left_menu();
    
    adjust_right_spacer();
    adjust_right_menu();
    
    left.container.style.transition = left.adjustments.transition;
    left.container.style.left = left.adjustments.left_offset;
    left.spacer.style.width = left.adjustments.left_space;

    right.container.style.transition = right.adjustments.transition;
    right.container.style.right = right.adjustments.right_offset;
    right.spacer.style.width = right.adjustments.right_space;
}

window.addEventListener("resize", () => {
    state.orientation = screenAspectRatio();

    left.adjustments.transition = "none";
    right.adjustments.transition = "none";
    update();
});