import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const simpleGallery = new SimpleLightbox('.item a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 1000,
});

export function renderRequest(arr, link) {
  const markup = arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
    <li class= "item">
      <a href="${largeImageURL}">
        <img class= "item-img" src="${webformatURL}" alt="${tags}" />
        <div class = "item-descrp">
          <table>
            <tr>
              <th>Likes</th>
              <th>Views</th>
              <th>Comment</th>
              <th>Downloads</th>
            </tr>
            <tr>
              <td>${likes}</td>
              <td>${views}</td>
              <td>${comments}</td>
              <td>${downloads}</td>
            </tr>
          </table>
        </div>
      </a>
    </li>
    `;
      }
    )
    .join('');
  link.insertAdjacentHTML('beforeend', markup);
  const images = document.querySelectorAll('.item-img');
  images.forEach(img => (img.onload = () => img.classList.add('loaded')));
  simpleGallery.refresh();
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.replaceChildren();
  }
}
