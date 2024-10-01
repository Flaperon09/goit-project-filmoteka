function e(e,t,n,o){Object.defineProperty(e,t,{get:n,set:o,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},a=t.parcelRequire4cee;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequire4cee=a);var i=a.register;i("bTcpz",function(t,n){e(t.exports,"modal",function(){return u}),e(t.exports,"modalClickButtons",function(){return m}),e(t.exports,"clsModal",function(){return p});var o=a("10w4c"),i=a("edpgF"),r=a("9IiBV");let s=document.querySelector(".js-modal"),l=document.querySelector("[data-modal]"),c=document.querySelector(".js-modal__backdrop"),d=0;function u(){s.addEventListener("click",function(e){let t=e.target.closest("[data-modal-open]");t&&(d=t.getAttribute("data-modal-open"),document.body.classList.add("modal-open"),l.classList.remove("is-hidden"),console.log("ID фильма:",d),(0,o.getMovieDetails)(d))})}function m(){let e=document.querySelector(".js-button-watched"),t=document.querySelector(".js-button-queue");e.addEventListener("click",()=>(0,r.addWatched)(d)),t.addEventListener("click",()=>(0,i.addQueue)(d))}function p(){let e={closeModalBtn:document.querySelector("[data-modal-close]"),modal:document.querySelector("[data-modal]")};function t(){document.body.classList.remove("modal-open"),e.modal.classList.add("is-hidden"),e.closeModalBtn.removeEventListener("click",t),c.removeEventListener("click",n),window.removeEventListener("keydown",o)}function n(e){e.currentTarget===e.target&&t()}function o(e){"Escape"===e.code&&t()}e.closeModalBtn.addEventListener("click",t),c.addEventListener("click",n),window.addEventListener("keydown",o)}}),i("10w4c",function(t,n){e(t.exports,"getMovieDetails",function(){return r}),e(t.exports,"fetchGetMovieDetails",function(){return s}),e(t.exports,"listGenresMovie",function(){return l});var o=a("bTcpz");let i=document.querySelector(".js-modal__movie");function r(e){s(e).then(e=>{console.log("response: ",e),function({title:e,vote_average:t,vote_count:n,popularity:o,original_title:a,genres:i,poster_path:r,overview:s}){let c=l(i);cardMarkup=`
        <img class="modal__image" src="https://image.tmdb.org/t/p/w500${r}" alt="poster" />
        <div class="modal__info">
            <h2 class="modal__header">${e.toUpperCase()}</h2>
            <table class="modal__table">
                <tr>
                    <td>Vote / Votes</td>
                    <td><span class="modal__table--accent">${t.toFixed(1)} </span> / ${n}</td>
                </tr>
                <tr>
                    <td>Popularity</td>
                    <td>${o.toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Original Title</td>
                    <td>${a}</td>
                </tr>
                <tr>
                    <td>Genre</td>
                    <td>${c}</td>
                </tr>
            </table>
            <h3 class="modal__about">ABOUT</h3>
            <p class="modal__text">${s}</p>
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
        `}(e),i.innerHTML=cardMarkup,(0,o.clsModal)(),(0,o.modalClickButtons)()}).catch(e=>console.error(e))}function s(e){return fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=70e00eb52bcb7ab46f183ec1381bf837&language=en-US`,{method:"GET",headers:{accept:"application/json"}}).then(e=>e.json())}function l(e){return movieGenres=[],e.map(({name:e})=>{movieGenres.push(e)}),movieGenres.join(", ")}}),i("edpgF",function(t,n){e(t.exports,"addQueue",function(){return s});var o=a("31u3U");let i="queue",r=(0,o.loadLocalStorage)(i);function s(e){let t=0;r.forEach(n=>{n===e&&(t+=1)}),0===t&&(r.push(e),(0,o.saveLocalStorage)(i,r))}r||(r=[])}),i("31u3U",function(t,n){function o(e,t){try{let n=JSON.stringify(t);localStorage.setItem(e,n)}catch(e){console.error("Set state error: ",e.message)}}function a(e){try{let t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}}e(t.exports,"saveLocalStorage",function(){return o}),e(t.exports,"loadLocalStorage",function(){return a})}),i("9IiBV",function(t,n){e(t.exports,"addWatched",function(){return s});var o=a("31u3U");let i="watched",r=(0,o.loadLocalStorage)(i);function s(e){let t=0;r.forEach(n=>{n===e&&(t+=1)}),0===t&&(r.push(e),(0,o.saveLocalStorage)(i,r))}r||(r=[])});var r=a("bTcpz");const s=document.querySelector(".js-films-container"),l=document.querySelector(".js-search-form");l.addEventListener("submit",function(e){e.preventDefault(),u(d=e.target[0].value,1).then(e=>{c=!0,0===e.results.length&&function(){let e=document.querySelector(".js-search-message");e.classList.add("show-message"),setTimeout(()=>{e.classList.remove("show-message")},4500)}(),_(e.results),s.innerHTML=v,(0,r.modal)(),h(e.total_pages,1)}).catch(e=>console.log(e)).finally(()=>l.reset())});let c=!1,d="";function u(e,t){return fetch(`https://api.themoviedb.org/3/search/movie?query=${e}&api_key=70e00eb52bcb7ab46f183ec1381bf837&include_adult=false&language=en-US&page=${t}`,{method:"GET",headers:{accept:"application/json"}}).then(e=>e.json())}const m=document.querySelector(".js-pagination-list"),p=document.querySelector(".js-pagination-container");function h(e,t){if(e<2||c&&d==[]){p.classList.add("hidden");return}let n="",o="",a=t-2,i=t+2;t>1&&(n+=`<li class="btn prev" onClick='element(${e}, ${t-1})'>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6666 8H3.33325" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></li>`),window.innerWidth>767&&t>3&&(n+=`<li class="numb" onClick='element(${e}, 1)'><span>1</span></li>`,t>4&&(n+='<li class="dots"><span>...</span></li>')),t===e?a-=2:t===e-1&&(a-=1),1===t?i+=2:2===t&&(i+=1);for(let r=a;r<=i;r+=1)r>e||r<1||(0===r&&(r+=1),r===t?(o="active",t=r,c?function(e){u(d,e).then(e=>{c=!0,_(e.results),s.innerHTML=v}).catch(e=>console.log(e))}(t):k(t)):o="",n+=`<li class="numb ${o}" onClick='element(${e}, ${r})'><span>${r}</span></li>`);window.innerWidth>767&&t<e-2&&(t<e-3&&(n+='<li class="dots"><span>...</span></li>'),n+=`<li class="numb" onClick='element(${e}, ${e})'><span>${e}</span></li>`),t<e&&(n+=`<li class="btn next" onclick='element(${e}, ${t+1})'>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33341 8H12.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></li>`),m.innerHTML=n}window.element=h;var r=a("bTcpz");const f=[{id:28,name:"Action"},{id:12,name:"Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},{id:14,name:"Fantasy"},{id:36,name:"History"},{id:27,name:"Horror"},{id:10402,name:"Music"},{id:9648,name:"Mystery"},{id:10749,name:"Romance"},{id:878,name:"Science Fiction"},{id:10770,name:"TV Movie"},{id:53,name:"Thriller"},{id:10752,name:"War"},{id:37,name:"Western"}];let g=[],v="",b=!1,w=0;function k(e){2!==(w+=1)&&fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=70e00eb52bcb7ab46f183ec1381bf837&language=en-US&page=${e}`,{method:"GET",headers:{accept:"application/json"}}).then(e=>e.json()).then(t=>{var n;_(t.results),document.querySelector(".js-films-container").innerHTML=v,(0,r.modal)();let o=totalPages=(n=t.total_pages)>500?500:n;b||(h(o,e),b=!0)}).catch(e=>console.error(e))}function _(e){return v=e.map(({title:e,genre_ids:t,release_date:n,poster_path:o,id:a})=>{g=[],f.map(({id:e,name:n})=>{t.forEach(t=>{e===t&&g.push(n)})});let i="";return i=null===o?"images/image-placeholder.png":`https://image.tmdb.org/t/p/w500${o}`,`
        <div class="film-container js-film-container" data-modal-open="${a}">
            <div class="image-wrapper">
                <img class="film-image" src="${i}" />
            </div>
            <h2 class="film-title">${e.toUpperCase()}</h2>
            <p class="film-data">${[...g].join(", ")} | ${n.split("-")[0]}</p>
        </div>
        `}).join("")}k(1),a("bTcpz"),a("10w4c");
//# sourceMappingURL=index.30ec87f4.js.map
