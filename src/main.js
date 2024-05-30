import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImages } from "./js/pixabay-api";
import { createMarkup } from "./js/render-function";


const refs = {
    formEl: document.querySelector(".form"),
    inputFormEl: document.querySelector(".form-input"),
    buttonFormEl: document.querySelector(".form-button"),
    gallery: document.querySelector(".gallery"),
    loader: document.querySelector(".loader"),
    parent: document.querySelector(".parent"),
    buttonLoadMore: document.querySelector(".btn-more")
    
};


refs.formEl.addEventListener("submit", handleSubmit);

let currentPage = 1;
let globalInputValue = "";

function handleSubmit(event) {
    event.preventDefault();
    refs.gallery.innerHTML = "";
    const inputValue = refs.inputFormEl.value.trim();
    currentPage = 1;
    
    globalInputValue = inputValue;
    
    showLoader();

    getImages(inputValue, currentPage)
                                        .then(response => {
                                            if (response.data.hits.length > 0) {
                                                const markup = createMarkup(response.data.hits);
                                                refs.gallery.insertAdjacentHTML("beforeend", markup);
                                                let galleryImages = new SimpleLightbox('.gallery a', {
                                                    showCounter: false,
                                                    captionsData: "alt",
                                                    captionDelay: 250
                                                });

                                                galleryImages.refresh();
                                                
                                            } else {
                                                iziToast.show({
                                                    title: 'Error',
                                                    message: 'What would you like to add?',
                                                    position: "topRight",
                                                    color: "rgba(239, 64, 64, 1)",
                                                    icon: "fas fa-exclamation-circle"
                                                });
                                            }

                                        
                                            if(refs.gallery.children.length > 0){
                                                refs.buttonLoadMore.style.display = "inline"
                                            };
                                            
                                        })

                                        .catch(error => console.log(error))
                                        .finally(() => {
                                            hideLoader();
                                            
                                        });
                                        
}


function showLoader() {
    refs.loader.style.display = "inline-block";
    refs.parent.style.display = "grid";
}
  
function hideLoader() {
    refs.loader.style.display = "none";
    refs.parent.style.display = "none";
}


refs.buttonLoadMore.addEventListener("click", handleLoadMore);

function handleLoadMore(){
    currentPage += 1;
    showLoader();
    getImages(globalInputValue, currentPage)

                                            .then(response => {

                                                if (response.data.hits.length > 0) {
                                                    const markup = createMarkup(response.data.hits);
                                                    refs.gallery.insertAdjacentHTML("beforeend", markup);

                                                    let galleryImages = new SimpleLightbox('.gallery a', {
                                                        showCounter: false,
                                                        captionsData: "alt",
                                                        captionDelay: 250
                                                    });

                                                    galleryImages.refresh();
                                                } 

                                                
                                                if(response.data.totalHits === refs.gallery.children.length){
                                                    iziToast.show({
                                                        title: 'Error',
                                                        message: "We're sorry, but you've reached the end of search results.",
                                                        position: "topRight",
                                                        color: "rgba(239, 64, 64, 1)",
                                                        icon: "fas fa-exclamation-circle"
                                                    });
                                                    refs.buttonLoadMore.style.display = "none";
                                                }
                                                const galleryItem = document.querySelector(".gallery-item");
                                                galleryItem.getBoundingClientRect();
                                                window.scrollBy({
                                                    top: 340,
                                                    left: 0,
                                                    behavior: "smooth",
                                                  });
                                            })

                                            .catch(error => console.log(error))
                                            .finally(() => {
                                                hideLoader();
                                            });

}

