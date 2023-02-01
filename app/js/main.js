"use strict"
window.addEventListener("DOMContentLoaded",init);

function init () {
    initTabs();
    initForm();
    initSlider();
}

function initTabs () {
    const priceServices = document.querySelector(".price__services"),
          priceMenuItems = document.querySelectorAll(".price__services-item");
    let timeId;

    if(window.innerWidth < 1140) {
        removeActiveClass();
    }

    function removeActiveClass () {
        priceMenuItems.forEach(item => {
            item.classList.remove("price__services-item--active");
        })
    }

    priceServices.addEventListener("click", (e) => {
        const currentTab =  e.target.closest(".price__services-item");
        if(window.innerWidth > 1140 ) {
            removeActiveClass();
            currentTab.classList.add("price__services-item--active");
        }

        if (window.innerWidth < 1140 ) {
            currentTab.classList.toggle("price__services-item--active");
            if(!currentTab.classList.contains("price__services-item--active")) {
                currentTab.lastChild.remove();
            }else {
                const priceMenu = document.createElement("ul");
                priceMenu.classList.add("price__menu","price__menu--active");
                priceMenu.innerHTML = `
                <li class="price__item">
                    <p class="price__item-text">Первичный прием детского стоматолога</p>
                    <div class="price__item-dots"></div> 
                    <div class="price__value-wrapper">
                        <span class="price__value">от 1 800 ₽</span>
                        <span class="price__second-value">до 2 300 ₽</span>
                    </div> 
                </li>
    
                <li class="price__item price__item--new">
                    <p class="price__item-text">Пломбирование временного зуба композитной пломбой</p>
                    <div class="price__item-dots"></div>
                    <div class="price__value-wrapper">
                        <span class="price__value price__value--new">2800 ₽</span>
                        <span class="price__old-value">до 2 300 ₽</span>
                    </div>
                </li>
                <li class="price__item-subtext">в зависимости от степени поражения</li>
    
                <li class="price__item">
                    <p class="price__item-text">Лечение кариеса неинвазивным методом ICON</p>
                    <div class="price__item-dots"></div>
                    <div class="price__value-wrapper">
                        <span class="price__value">6600 ₽</span>
                    </div>
                </li>
                <li class="price__item-subtext">
                    С помощью специальных инструментов и вспомогательных растворов на зуб после 
                    предварительной подготовки наносится полимерный раствор, который затвердевает 
                    под воздействием ультрафиолета
                </li>
    
                <li class="price__item price__item--accent">
                    <p class="price__item-text">Первичный прием детского стоматолога </p>
                    <div class="price__item-dots"></div>
                    <div class="price__value-wrapper">
                        <span class="price__value">от 1 800 ₽</span>
                    </div>
                </li>
    
                <li class="price__item price__item--new">
                    <p class="price__item-text">Пломбирование временного зуба композитной пломбой</p>
                    <div class="price__item-dots"></div>
                    <div class="price__value-wrapper">
                        <span class="price__value price__value--new">2800 ₽</span>
                        <span class="price__old-value">до 2 300 ₽</span>
                    </div>
                </li>
                <li class="price__item-subtext">в зависимости от степени поражения</li>
    
                <li class="price__item">
                    <p class="price__item-text">Лечение кариеса неинвазивным методом ICON</p>
                    <div class="price__item-dots"></div>
                    <div class="price__value-wrapper">
                        <span class="price__value">6600 ₽</span>
                    </div>
                </li>
                <li class="price__item-subtext">
                    С помощью специальных инструментов и вспомогательных растворов на зуб после 
                    предварительной подготовки наносится полимерный раствор, который затвердевает 
                    под воздействием ультрафиолета
                </li>
                `;
                currentTab.append(priceMenu);
            }
        };
    })

    function clearMenuAfterResize () {
        if(window.innerWidth < 1140 ) {
            priceMenuItems.forEach(item => {
                if(item.lastElementChild.classList.contains("price__menu")) {
                    item.lastChild.remove();
                    removeActiveClass();
                }else {
                    removeActiveClass();
                }
            })
        }
    }

    window.addEventListener("resize",() => {
        clearTimeout(timeId)
        timeId = setTimeout(clearMenuAfterResize,100)
    })
}

function initForm () {
    const form = document.querySelector(".cta__form");
    const titleForm = document.querySelector(".cta__title");

    form.addEventListener ("submit", (e) => {
        e.preventDefault();
        titleForm.innerText = "Заявка принята";
        form.innerHTML = `<p style="max-width:489px;font-size:24px">Вашая заявка отправлена и находится<br>
        на рассмотрении. Наш специалист изучит её и перезвонит в ближайшее время</p>`;
    })
}

function initSlider () {
    const slider = document.querySelector(".moments__slider-container");
    const sliderItems = document.querySelectorAll(".moments__slider-item");
    const prevSlideBtn = document.querySelector (".moments__arrow--left");
    const nextSlideBtn = document.querySelector (".moments__arrow--right");
    const paginationWrapper = document.querySelector(".moments__pagination");
    const paginationItems = [];

    let activeSlide = 1;
    let position = 0;

    function createPagination (parent) {
        parent.innerHTML = "";
        for(let i = 0; i < sliderItems.length; i++) {
            const paginationItem = document.createElement("span");
            paginationItem.classList.add("moments__pagination-item");
            paginationItem.setAttribute("data-number",i + 1)
            parent.append(paginationItem);
            paginationItems.push(paginationItem)
        }
        paginationItems[0].classList.add("moments__pagination-item--active");
    }

    function checkPagination () {
        paginationItems.forEach(item => {
            item.classList.remove("moments__pagination-item--active");
        })
        paginationItems[activeSlide - 1].classList.add("moments__pagination-item--active");
    }

    function slideChangeOnPagination () {
        paginationWrapper.addEventListener("click", (e) => {
            if(e.target.classList.contains("moments__pagination-item")) {
                paginationItems.forEach(item => {
                    item.classList.remove("moments__pagination-item--active");
                })
                e.target.classList.add("moments__pagination-item--active");
                activeSlide = +e.target.getAttribute("data-number");
                position = -sliderItems[0].clientWidth * (activeSlide - 1);
                slider.style.transform = `translateX(${position}px)`;
            }
        })
    }

    function nextSlide () {
        if(activeSlide === sliderItems.length) {
            return
        }
        position = -sliderItems[0].clientWidth * activeSlide;
        activeSlide += 1
        slider.style.transform = `translateX(${position}px)`;
        checkPagination();
    }

    function prevSlide () {
        if(activeSlide === 1) {
            return
        }
        position = -sliderItems[0].clientWidth * (activeSlide - 2);
        activeSlide -= 1
        slider.style.transform = `translateX(${position}px)`;
        checkPagination();
    }

    window.addEventListener("resize", () => {
        if(window.innerWidth < 1180) {
            slider.style.transition = "unset";
            slider.style.transform = "unset";
        }

        if(window.innerWidth > 1180 && activeSlide > 1) {
            position =  -sliderItems[0].clientWidth * (activeSlide - 1)
            slider.style.transition = "unset";
            slider.style.transform = `translateX(${position}px)`;
            checkPagination();
            setTimeout(() => {slider.style.transition = "";},500)
        }
    })

    nextSlideBtn.addEventListener("click",nextSlide)
    prevSlideBtn.addEventListener("click",prevSlide)
    createPagination(paginationWrapper);
    slideChangeOnPagination();
}