//
const imgCont = document.querySelector(".img-cont")
const tabBtns = document.querySelectorAll(".tab")
let usplashUrl = "https://api.unsplash.com/search/photos?";
const accessKey = "Due0ntPNArjU3q7Ztrb8fi3T4PoTmyTQS9-fuaU2xec";


let usplashSearch = usplashUrl + "page=1" + `&query=portrait` + "&per_page=28";  
req_photo(usplashSearch)



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

    let search = usplashUrl + "page=1" + "&query=" + this.dataset.search + "&per_page=28";
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
    })
    } else {
        console.log("No photos")
        imgCont.innerHTML = "<p class='text-danger'>Failed to load images. Please try again later.</p>";
    }
    
    
}




