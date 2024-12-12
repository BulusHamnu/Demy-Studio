//so weird of me for add comment but i want to be a change programmer haha...

/* init my variable */
const imgCont = document.querySelector(".img-cont")
const tabBtns = document.querySelectorAll(".tab")
let usplashUrl = "https://api.unsplash.com/search/photos?";
const accessKey = "Due0ntPNArjU3q7Ztrb8fi3T4PoTmyTQS9-fuaU2xec";
let isFetching = false;
let keyWord = `portrait`;
let pageNum = 1;


/* load images */
let usplashSearch = usplashUrl + "page=1" + `&query=${keyWord}` + "&per_page=28";  
req_photo(usplashSearch)



/* event listeners */
const goUpBtn = document.querySelector(".back-to-top")
goUpBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,  
        behavior: "smooth"
    });
})


tabBtns.forEach(tab => {
    tab.addEventListener("click", function() {
    tabBtns.forEach(btn => btn.classList.remove("active"))
    this.classList.add("active");
    
    keyWord = this.dataset.search;
    let search = usplashUrl + "page=1" + "&query=" + keyWord + "&per_page=28";
    req_photo(search);
    console.log(search)
    })
 
})

// 1981

window.addEventListener('scroll', function() {
    
    if(window.scrollY > 300) {
        goUpBtn.classList.add("show")
    } else {
        goUpBtn.classList.remove("show")
    }

});


/* infinite scrolliong feature */

function loadImgages(photos) {
    if(photos.length > 0) {
        photos.forEach(photo => {
            let rows = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 ">
                    <a href="${photo.links.download}" > <img class="img-fluid" src="${photo.urls.small}" alt="${photo.alt_description}"></a>
                </div>
            `;

        imgCont.innerHTML += rows; 
        
        isFetching = false;
    })
    } else {
        console.log("No photos")
        imgCont.innerHTML = "<p class='text-danger'>Failed to load images. Please try again later.</p>";
    }
}


window.addEventListener('scroll', function() {
    
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 600) {

        if(!isFetching) {
            isFetching = true;
            pageNum++;
            let search = usplashUrl + "page=" + pageNum + "&query=" + keyWord + "&per_page=28";
            console.log(search)

            //get more images
            fetch(search,{
                method: "GET",         
                headers: {
            Authorization: `Client-ID ${accessKey}`,
            "Accept-Version": "V1",
            "Content-Type": "application/json",   
            } })
                .then(response => {
                
                if(response.ok){
                    return response.json()
                } else {
                    displayPhotos([]);
                    throw new Error("Error in fetching data")
                }
                    })
                .then(data => {
                    
                    loadImgages(data.results)
                      })
                .catch(error => console.log(error))
            
        }
        console.log("reach bottom of document")
    }
});



/* little intersectionObserver for fade animation */
const imgAtView = new IntersectionObserver (entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("show")
            imgAtView.unobserve(entry.target);
        }
    })
}, {
    root: null,
    threshold: 0.1
});



const observedPhotos = new Set(); 

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        
        if (mutation.type === "childList") {
            const PhotoList = imgCont.querySelectorAll(".img-fluid");
            PhotoList.forEach(photo => {
                if(!observedPhotos.has(photo)) {
                    observedPhotos.add(photo);
                    imgAtView.observe(photo);
                }
                });
        }
    });
});

observer.observe(imgCont, {
    childList: true,
    subtree: false
});



/* fetch images function */
function req_photo(usplashSearchParam) {
    fetch(usplashSearchParam,{
        method: "GET",         
        headers: {
    Authorization: `Client-ID ${accessKey}`,
    "Accept-Version": "V1",
    "Content-Type": "application/json",   
    } })
        .then(response => {
        
        if(response.ok){
            return response.json()
        } else {
            displayPhotos([]);
            throw new Error("Error in fetching data")
        }
            })
        .then(data => {
            
            displayPhotos(data.results)
              })
        .catch(error => console.log(error))
}



/* display images function */
function displayPhotos(photos) {
    if(photos.length > 0) {
        
        imgCont.innerHTML = "";
        photos.forEach(photo => {
            let rows = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 ">
                    <a href="${photo.links.download}" > <img class="img-fluid" src="${photo.urls.small}" alt="${photo.alt_description}"></a>
                </div>
            `;
        imgCont.innerHTML += rows;
        isFetching = false;
    })
    } else {
        console.log("No photos")
        imgCont.innerHTML = "<p class='text-danger'>Failed to load images. Please try again later.</p>";
    }
    
    
}




