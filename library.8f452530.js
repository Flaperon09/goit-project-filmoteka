function e(e,t,o,n){Object.defineProperty(e,t,{get:o,set:n,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},a=t.parcelRequire4cee;null==a&&((a=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return o[e]=a,t.call(a.exports,a,a.exports),a.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},t.parcelRequire4cee=a);var r=a.register;r("9IiBV",function(t,o){e(t.exports,"addWatched",function(){return l});var n=a("31u3U");let r="watched",c=(0,n.loadLocalStorage)(r);function l(e){let t=0;c.forEach(o=>{o===e&&(t+=1)}),0===t&&(c.push(e),(0,n.saveLocalStorage)(r,c))}c||(c=[])}),r("31u3U",function(t,o){function n(e,t){try{let o=JSON.stringify(t);localStorage.setItem(e,o)}catch(e){console.error("Set state error: ",e.message)}}function a(e){try{let t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}}e(t.exports,"saveLocalStorage",function(){return n}),e(t.exports,"loadLocalStorage",function(){return a})}),r("edpgF",function(t,o){e(t.exports,"addQueue",function(){return l});var n=a("31u3U");let r="queue",c=(0,n.loadLocalStorage)(r);function l(e){let t=0;c.forEach(o=>{o===e&&(t+=1)}),0===t&&(c.push(e),(0,n.saveLocalStorage)(r,c))}c||(c=[])}),r("10w4c",function(t,o){e(t.exports,"getMovieDetails",function(){return c}),e(t.exports,"fetchGetMovieDetails",function(){return l}),e(t.exports,"listGenresMovie",function(){return d});var n=a("bTcpz");let r=document.querySelector(".js-modal__movie");function c(e){l(e).then(e=>{(function({title:e,vote_average:t,vote_count:o,popularity:n,original_title:a,genres:r,poster_path:c,overview:l}){let s=d(r);cardMarkup=`
        <img class="modal__image" src="https://image.tmdb.org/t/p/w500${c}" alt="poster" />
        <div class="modal__info">
            <h2 class="modal__header">${e.toUpperCase()}</h2>
            <table class="modal__table">
                <tr>
                    <td>Vote / Votes</td>
                    <td><span class="modal__table--accent">${t.toFixed(1)} </span> / ${o}</td>
                </tr>
                <tr>
                    <td>Popularity</td>
                    <td>${n.toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Original Title</td>
                    <td>${a}</td>
                </tr>
                <tr>
                    <td>Genre</td>
                    <td>${s}</td>
                </tr>
            </table>
            <h3 class="modal__about">ABOUT</h3>
            <p class="modal__text">${l}</p>
            <div class="modal__buttons js-modal__buttons">
                <button class="modal__button js-button-watched" type="button">
                    ADD TO WATCHED
                </button>
                <button class="modal__button js-button-queue" type="button">ADD TO QUEUE</button>
            </div>
            <!-- \u{41A}\u{43D}\u{43E}\u{43F}\u{43A}\u{430} \u{437}\u{430}\u{43A}\u{440}\u{44B}\u{442}\u{438}\u{44F} \u{43C}\u{43E}\u{434}\u{430}\u{43B}\u{44C}\u{43D}\u{43E}\u{433}\u{43E} \u{43E}\u{43A}\u{43D}\u{430} -->
            <button type="button" class="modal__button-close">
                <svg class="modal__icon" data-modal-close width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
                    <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
                </svg>
            </button>
        </div>
        `})(e),r.innerHTML=cardMarkup,(0,n.clsModal)(),(0,n.modalClickButtons)()}).catch(e=>console.error(e))}function l(e){return fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=70e00eb52bcb7ab46f183ec1381bf837&language=en-US`,{method:"GET",headers:{accept:"application/json"}}).then(e=>e.json())}function d(e){let t=[];return e.map(({name:e})=>{t.push(e)}),t.join(", ")}}),r("bTcpz",function(t,o){e(t.exports,"modal",function(){return u}),e(t.exports,"modalClickButtons",function(){return p}),e(t.exports,"clsModal",function(){return m});var n=a("10w4c"),r=a("edpgF"),c=a("9IiBV");let l=document.querySelector(".js-modal"),d=document.querySelector("[data-modal]"),s=document.querySelector(".js-modal__backdrop"),i=0;function u(){l.addEventListener("click",function(e){let t=e.target.closest("[data-modal-open]");t&&(i=t.getAttribute("data-modal-open"),document.body.classList.add("modal-open"),d.classList.remove("is-hidden"),(0,n.getMovieDetails)(i))})}function p(){let e=document.querySelector(".js-button-watched"),t=document.querySelector(".js-button-queue");e.addEventListener("click",()=>(0,c.addWatched)(i)),t.addEventListener("click",()=>(0,r.addQueue)(i))}function m(){let e={closeModalBtn:document.querySelector("[data-modal-close]"),modal:document.querySelector("[data-modal]")};function t(){document.body.classList.remove("modal-open"),e.modal.classList.add("is-hidden"),e.closeModalBtn.removeEventListener("click",t),s.removeEventListener("click",o),window.removeEventListener("keydown",n)}function o(e){e.currentTarget===e.target&&t()}function n(e){"Escape"===e.code&&t()}e.closeModalBtn.addEventListener("click",t),s.addEventListener("click",o),window.addEventListener("keydown",n)}}),a("9IiBV"),a("edpgF");var c=a("31u3U"),l=a("10w4c"),d=a("bTcpz");let s=[];const i=document.querySelector(".js-library-button-watched"),u=document.querySelector(".js-library-button-queue"),p=document.querySelector(".js-library-container");function m(){i.classList.add("checked"),u.classList.remove("checked");let e=(0,c.loadLocalStorage)("watched");e||(e=[]),f(e)}function f(e){s=[],e.map(e=>{(0,l.fetchGetMovieDetails)(e).then(e=>{let{title:t,genres:o,release_date:n,poster_path:a,id:r}=e,c=(0,l.listGenresMovie)(o),d="";return d=null===a?"./images/background-mobile.jpg":`https://image.tmdb.org/t/p/w500${a}`,`
                <div class="film-container js-film-container" data-modal-open="${r}">
                    <div class="image-wrapper">
                        <img class="film-image" src="${d}" />
                    </div>
                    <h2 class="film-title">${t.toUpperCase()}</h2>
                    <p class="film-data">${c} | ${n.split("-")[0]}</p>
                </div>
                `}).then(e=>{let t;t=0,s.forEach(o=>{o===e&&(t+=1)}),0===t&&s.push(e),p.innerHTML=s.join(""),(0,d.modal)()})})}i.addEventListener("click",m),u.addEventListener("click",function(){i.classList.remove("checked"),u.classList.add("checked");let e=(0,c.loadLocalStorage)("queue");e||(e=[]),f(e)}),m();
//# sourceMappingURL=library.8f452530.js.map
