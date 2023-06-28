import { galleryItems } from "./gallery-items.js";
// Change code below this line
const listEl = document.querySelector(".gallery");

console.log(createImageCardsMarkup(galleryItems));

function createImageCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
            <li class="gallery__item">
                <a class="gallery__link" href="large-image.jpg">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>
        `;
    })
    .join("");
}

listEl.innerHTML = createImageCardsMarkup(galleryItems);

listEl.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(e) {
  e.preventDefault();

  if (!e.target.classList.contains("gallery__image")) {
    return;
  }

  const imgModal = basicLightbox.create(
    `
		<img src="${e.target.dataset.source}">
	`,
    {
      onShow: () => window.addEventListener("keydown", onEscKeyClose),
      onClose: () => window.removeEventListener("keydown", onEscKeyClose),
    }
  );
  imgModal.show();

  function onEscKeyClose(e) {
    if (e.code === "Escape") {
      imgModal.close();
    }
  }
}
