let categoryCode;
const loadData = (Code) => {
    categoryCode=Code;
    fetch(`https://openapi.programming-hero.com/api/videos/category/${Code}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((info) => {
            if (info.data) {
                displayData(info.data);
            } else {
                console.error(`Error: No data received for category ${categoryCode} from the API.`);
            }
        })
        .catch((error) => console.error(`Error fetching or displaying data for category ${categoryCode}:`, error));
};

loadData(1000);

const displayData=(data)=>{
    console.log(data);
    const videoContainer=document.getElementById("video-section");
    videoContainer.innerHTML="";
    if(data.length === 0) {
        const errorCard = document.createElement('div');
        errorCard.classList.add('error', 'text-center', 'mt-5', 'pt-5');
        errorCard.innerHTML = `
            <img class="img-fluid" src="./PHero-Tube-main/Icon.png" alt="error icon">
            <h1 class="fw-bold mt-3">Oops!! Sorry, There is no <br>Content here</h1>
        `;
        videoContainer.appendChild(errorCard);
        return "";
    };
    data.forEach((videos)=> {
        const card=document.createElement("div");
        
        card.className = "vcards";
        card.innerHTML=`
        <img class="vImg" src=${videos.thumbnail} alt="thumbPic">
        <div class="channel">
            <img class="channel-img" src=${videos.authors[0].profile_picture} alt="channelPic">
            <h4>${videos.title}</h4>
        </div>
        <div class=" verify">
            <h6>${videos.authors[0].profile_name}</h6>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
            </svg>
        </div>
        <p>${videos.others.views}</p>
        `;
        videoContainer.appendChild(card);
    });
};

const sortByViews = () => {
    console.log(categoryCode);
    fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryCode}`)
    .then((res) => res.json())
    .then((info) => {
        info.data.sort(function(a, b) {
            var viewsA = parseInt(a.others.views);
            var viewsB = parseInt(b.others.views);

            return viewsB - viewsA; 
        });
        displayData(info.data);
    });
};
