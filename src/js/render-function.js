export function createMarkup(hits){
      return hits.map(hit => 
         `
         <li class="gallery-item">
         <a href="${hit.largeImageURL}" class="gallery-link">
           <img src="${hit.webformatURL}" alt="${hit.tags}" width="358px" height="150">
         </a>
         <div class="inf-wrapper">
           <div class="likes item">
             <p class="text-one">Likes</p>
             <p class="likes-count text-two">${hit.likes}</p>
           </div>
           <div class="views item">
             <p class="text-one">Views</p>
             <p class="views-count text-two">${hit.views}</p>
           </div>
           <div class="comments item">
             <p class="text-one">Comments</p>
             <p class="comments-count text-two">${hit.comments}</p>
           </div>
           <div class="downloads item">
             <p class="text-one">Downloads</p>
             <p class="downloads-count text-two">${hit.downloads}</p>
           </div>
         </div>
       </li>
        `
    ).join("");
}
