window.addEventListener('DOMContentLoaded', main);

function main() {
    dashbord();
    selectGlobalVar();
    keySlider();
    // changeMenu();
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
    const menuText = document.querySelector("#menu_text_new");
    const pageAbout = document.querySelector(".page_about");
    const pagePartners = document.querySelector(".page_partners");
    const pageNft = document.querySelector(".page_nft");
    const pageRoadmap = document.querySelector(".page_roadmap");
    const pageTokenomic = document.querySelector(".page_tokenomic");
    const pageTeam = document.querySelector(".page_team");
    let currentText = 'About';

    const topAnimation = menuText.animate(
        [{ transform: "translateY(200%)" }, { transform: "translateY(0%)" }],
        {
          fill: "forwards",
          duration: 300,
        }
    )

    const bottomAnimation = menuText.animate(
        [{ transform: "translateY(0%)" }, { transform: "translateY(-200%)" }],
        {
          fill: "forwards",
          duration: 300,
        }
    )

    let scrollTop = 0;
    let movToTop = false;

    function play(movToTop, currentText) {
        if (currentText != menuText.innerText) {
            movToTop ? topAnimation.play() : bottomAnimation.play();
        }
    }

    function delAnimation() {
        // menuBlockNew.classList.remove("menu_anmation");
        // menuBlockOld.classList.remove("menu_anmation");
    }


    document.addEventListener("scroll", function(e){
        if (e.target.scrollingElement.scrollTop > scrollTop) {
            movToTop = false;
        } else {
            movToTop = true;
        }
        scrollTop = e.target.scrollingElement.scrollTop;
        if (scrollTop > pageAbout.offsetTop && scrollTop < pageAbout.offsetTop + pageAbout.offsetHeight) {
            currentText = 'About';
            play(movToTop, currentText);
            menuText.innerText = 'About';
        } else if (scrollTop > pagePartners.offsetTop && scrollTop < pagePartners.offsetTop + pagePartners.offsetHeight) {
            currentText = 'Partners';
            play(movToTop, currentText);
            menuText.innerText = 'Partners';
        } else if (scrollTop > pageRoadmap.offsetTop && scrollTop < pageRoadmap.offsetTop + pageRoadmap.offsetHeight) {
            menuText.innerText = 'Roadmap';
            newAnimation.play();
            oldAnimation.play();
            currentText = 'About';
            play(movToTop, currentText);
            menuText.innerText = 'About';
        } else if (scrollTop > pageTokenomic.offsetTop && scrollTop < pageTokenomic.offsetTop + pageTokenomic.offsetHeight) {
            menuText.innerText = 'Tokenomic';
            newAnimation.play();
            oldAnimation.play();
            currentText = 'About';
            play(movToTop, currentText);
            menuText.innerText = 'About';
        } else if (scrollTop > pageTeam.offsetTop && scrollTop < pageTeam.offsetTop + pageTeam.offsetHeight) {
            menuText.innerText = 'Team';
            newAnimation.play();
            oldAnimation.play();
            currentText = 'About';
            play(movToTop, currentText);
            menuText.innerText = 'About';
        }
    });
}