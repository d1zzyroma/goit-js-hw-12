// У файлі pixabay-api.js зберігай функції для HTTP-запитів.
// У файлі render-functions.js створи функції для відображення елементів інтерфейсу.
// У файлі main.js напиши всю логіку роботи додатка.
import { getImages } from "./js/pixabay-api";
import { createMarkup } from "./js/render-function";
import iziToast from "izitoast";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import "izitoast/dist/css/iziToast.min.css";


const refs = {
    formEl: document.querySelector(".form"),
    inputFormEl: document.querySelector(".form-input"),
    buttonFormEl: document.querySelector(".form-button"),
    gallery: document.querySelector(".gallery"),
    loader: document.querySelector(".loader"),
    parent: document.querySelector(".parent")
};

refs.formEl.addEventListener("submit", handleSubmit);

function handleSubmit(event){
    event.preventDefault()
    refs.gallery.innerHTML = "";
    const inputValue = refs.inputFormEl.value.trim();
    
    showLoader();

    getImages(inputValue)
                    .then(data => {
                        if(data.hits.length > 0){
                            const markup = createMarkup(data.hits);
                            
                            refs.gallery.insertAdjacentHTML("beforeend", markup);
                            
                            let galleryImages = new SimpleLightbox('.gallery a', {
                                showCounter: false,
                                captionsData: "alt",
                                captionDelay:250
                            });
                            
                            galleryImages.refresh();
                        }else{
                            iziToast.show({
                                title: 'Error',
                                message: 'What would you like to add?',
                                position: "topRight",
                                color: "rgba(239, 64, 64, 1)",
                                icon: "fas fa-exclamation-circle"
                            });
                        }
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

