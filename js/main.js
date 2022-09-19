window.addEventListener('DOMContentLoaded', main);

var percentEl;
var valueEl;
var circleEl;

var currentPercent;
var currentValue;
var isRunAnimations;

function main() {
    eventHandler();
    selectGlobalVar();
}

function selectGlobalVar() {
    percentEl = document.querySelector("#percent");
    valueEl = document.querySelector("#value");
    circleEl = document.querySelector("#circle");
    currentPercent = parseFloat(percentEl.textContent);
    currentValue = valueEl.textContent;
}

function eventHandler() {
    document.querySelectorAll(".pp_dashboard_select_item").forEach(el => {
        if (!el.className.includes('nonselect')) {
            el.addEventListener("click", selectDashboard)
        }
    });
}

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