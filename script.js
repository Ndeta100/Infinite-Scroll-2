const imageConatiner=document.getElementById('image-container')
const loader=document.getElementById('loader')

let photoArray=[]
let ready=false
let imagesLoaded=0
let totalImage=0
// Unsplash API
const count=30
apiKey='smZubBW7VAGv_tlNAg4CWGZnvA0PdEwM769YFvAprK4'
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Get photos fro unsplash api

async function getPhotos(){
    try {
        const response=await fetch(apiUrl)
        photoArray= data=await response.json()
       displayPhotos()
    } catch (error) {
        // catch error
        console.log(error)
    }
}  
// Helper function
// function setAttributes(element, attributes){
//     for(const key in attributes){
//         element.setAttribute(key, attributes(key))
//     }
// }

//create elements for links and photos and add to DOM

function displayPhotos(){
    imagesLoaded=0
    totalImage=photoArray.length
    console.log(totalImage, ' total imgaes')
    //Run function for each object in photoArray
    photoArray.forEach((photo)=>{
        // Creat <a> to link to unnsplash</a>
        const item=document.createElement('a')
        item.setAttribute('href', photo.links.html)
        item.setAttribute('target', '_blank')

        // Create img for photo

        const img=document.createElement('img')
        img.setAttribute('src', photo.urls.regular)
        img.setAttribute('alt', photo.alt_description)
        img.setAttribute('title', photo.alt_description)
        // Put img inside <a></a> then put both inside img container element

        // Event listener to check when images are finished loading 
        img.addEventListener('load', imageLoaded)
        item.appendChild(img)
        imageConatiner.appendChild(item)

    })
}

// check if imm=ages were loaded
function imageLoaded(){
imagesLoaded++
if(imagesLoaded===totalImage){
    ready=true
    loader.hidden=true
    console.log(ready ,'ready')
}
}

// Check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll',()=>{
if(window.innerHeight + window.scrollY>= document.body.offsetHeight-1000 && ready){
    ready=false
    getPhotos()
}

})
//unload
getPhotos()