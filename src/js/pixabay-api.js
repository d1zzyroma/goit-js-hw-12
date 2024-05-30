
export function getImages(value){
    const BASE_URL = "https://pixabay.com/api/";
    const params = new URLSearchParams({
        key: "44030880-e45e37f6dd8504bc3a71fd6c0",
        q: value,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true"
    })

    const url = `${BASE_URL}?${params}`;

    return fetch(url).then(res => res.json());
}

