window.addEventListener('DOMContentLoaded', main);

function main() {
    dashbord();
    selectGlobalVar();
    keySlider();
    changeMenu();
}

function selectGlobalVar() {
    percentEl = document.querySelector("#percent");
    valueEl = document.querySelector("#value");
    circleEl = document.querySelector("#circle");
    currentPercent = parseFloat(percentEl.textContent);
    currentValue = valueEl.textContent;
}

function dashbord() {
    let percentEl = document.querySelector("#percent");
    let valueEl = document.querySelector("#value");
    let circleEl = document.querySelector("#circle");
    let currentPercent = parseFloat(percentEl.textContent);
    let isRunAnimations = false;

    document.querySelectorAll(".pp_dashboard_select_item").forEach(el => {
        if (!el.className.includes('nonselect')) {
            el.addEventListener("click", selectDashboard)
        }
    });

    function selectDashboard(e) {
        if (isRunAnimations) return;
        isRunAnimations = true;
        const percent = parseInt(e.target.parentNode.querySelector('.pp_dashboard_select_item_percent').textContent);
        const value = e.target.parentNode.querySelector('.pp_dashboard_select_item_value').textContent;

        valueEl.innerHTML = value;

        runDasbordAnimation(percent, value);
    }

    function runDasbordAnimation(percent, value, deltaPercent) {
        deltaPercent = deltaPercent ? deltaPercent : currentPercent - percent;
        const step = deltaPercent > 0 ? -0.5 : 0.5
        setTimeout(function(){
            if (deltaPercent === 0) {
                isRunAnimations = false;
                return;
            }
            currentPercent += step;
            deltaPercent += step;
            percentEl.innerHTML = currentPercent.toFixed(1);
            circleEl.style.setProperty('--value', currentPercent.toFixed(1) + '%');
            runDasbordAnimation(percent, value, parseFloat(deltaPercent.toFixed(2)));
        })
    }
}

function keySlider() {
    const keyslider = document.querySelector(".pp_key_slider");

    let scrolSize = 0;
    let step = 3;
    function runSlider() {
        setTimeout(function(){
            keyslider.scrollLeft += step;
            if (scrolSize == keyslider.scrollLeft) {
                step = -step;
            }
            scrolSize = keyslider.scrollLeft;

            runSlider();
        }, 24)
    }

    runSlider();
}


function changeMenu() {

    document.addEventListener("scroll", function(e){
        console.log(e)
        console.log(e.target.scrollingElement.scrollTop)

    });
}