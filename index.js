import { Allvideo } from "./Data/VideoData.js";

/* Top nav button */

const button = document.querySelectorAll('.btn');
button.forEach((button)=>{{
   button.addEventListener('click',(event)=>{
      const prev = document.querySelector('.is-toggled');
      prev.classList.remove("is-toggled");
      event.target.classList.add('is-toggled');
   })
}})

const topButton = document.querySelector('.top-button');
topButton.addEventListener('wheel',(event)=>{
     event.preventDefault();
     topButton.scrollLeft += event.deltaY;
})

  const videogrid = document.querySelector('.video-grid');
  const isClosed = document.querySelector('.isClosed');

  
  renderAllVideo();
  function renderAllVideo() {
      let html='';
      Allvideo.forEach((video)=>{
         html +=renderTags(video);
      })
      videogrid.innerHTML = html;
  }
  
  
/* function to create All type of tag video*/
  function renderTags(video) {
        let  htmlVideo = `
         <div class="video-preview js-video-preview-${video.tag}">
            <div class="image-container">
                  <img data-image-id = "${video.id}" class="thumbnail" src="YT Image/${video.thumbnail}">
                  <div class="video-time">02:15</div>
               </div>
               <div class="video-info">
               <div class="video-about">
                  <div class="picture">
                     <img src="YT Image/${video.picture}">
                  </div> 
                  <div class="stats">
                     <h4 class="video-title">${video.videoTitle}</h4>
                     <p>${video.videoAuthor}</p>
                     <p>${video.views}views.${video.Lasts}</p>
                  </div>
               </div>
            </div>    
            </div>
         `;
         return htmlVideo;
  }

 
  const btnAction = document.querySelectorAll('.btn-action');
  const ActiveVideo = document.querySelector('.js-active');

  ActiveVideo.addEventListener('click',()=>{
       renderAllVideo();
       openVideo();
  })

  /* Top buttons */
   btnAction.forEach((btnAction)=>{
      btnAction.addEventListener('click',()=>{
         let HTML='';
         Allvideo.forEach((video)=>{
            if (btnAction.name === video.tag) {
                  HTML += renderTags(video);
            }
         })
         videogrid.innerHTML = HTML;

         openVideo();
      })
  })





  /* js for open video */
  const gridcontainer = document.querySelector('.js-grid-container');
   openVideo();
   function openVideo(){
         const Thumbnails = document.querySelectorAll('.thumbnail')
         const HTMLvideo = document.querySelector('.video');
      
         
         Thumbnails.forEach((thumbnail)=>{
               thumbnail.addEventListener('click',()=>{
               const imageId = thumbnail.dataset.imageId;
      
               let matchingVideo;
               Allvideo.forEach((video)=>{
                  if (video.id === imageId) {
                  matchingVideo = video;
                  }
               })
            
               HTMLvideo.src = `YT video/${matchingVideo.video}.mp4`;
               HTMLvideo.play();
                  
               
                  gridcontainer.style.display = "none";
                  isClosed.classList.add("isClose")
                  
               })
         })
      
      
      const closevideo = document.querySelector('.close-video');
      closevideo.addEventListener('click',()=>{
      isClosed.classList.remove("isClose");
      gridcontainer.style.display = "block";
      HTMLvideo.pause();
      })
   }

/* left scrolled sidebar */
   const side_bar = document.querySelector('.js-absolute-side-bar');
   side_bar.addEventListener('wheel',(event)=>{
      event.preventDefault();
      side_bar.scrollTop += event.deltaY;
   })

   const left_menu = document.querySelectorAll(".js-menu");
   left_menu.forEach((menu)=>{
      menu.addEventListener('click',()=>{
         document.querySelector('.js-absolute-side-bar').classList.toggle('side-bar-visible');
         gridcontainer.classList.toggle("moving-right");
      })
   })
 window.addEventListener('scroll',()=>{
   document.querySelector('.js-absolute-side-bar').classList.remove('side-bar-visible');
   gridcontainer.classList.remove("moving-right");
 })