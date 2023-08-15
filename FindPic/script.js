const accessKey = "wtdVL3vYhfoI1cf5U8he2OL9C7u-Dz2PdkbAc_gmxXM";
const securityKey = "UTfNqOQAdHTgxUF76i-Q7FNSnUvXzNqxo_T1Pc8R-f0";


const formElm = document.querySelector("form");
const inputElm = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-btn");


let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputElm.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const res = await fetch(url);
    const data = await res.json();
    
    const results = data.results;
    
    if(page === 1){
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imgwraper = document.createElement("div");
        imgwraper.classList.add("card");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imgLink = document.createElement('a')
        imgLink.href = result.links.html;
        imgLink.target = "_blank";
        imgLink.textContent = result.alt_description;

        imgwraper.appendChild(image);
        imgwraper.appendChild(imgLink);
        searchResults.appendChild(imgwraper);
        
    
    })
    page++;
    if(page > 1){
        showMore.style.display = "block";

    }
   
}

//event listener section


formElm.addEventListener("submit", (e)=> {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", ()=> {
    
    searchImages();
})