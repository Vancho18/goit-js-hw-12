import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { apiRequest } from './js/pixabay-api';
import { clearGallery, renderRequest } from './js/render-functions';
const userForm = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-btn');

function activeLoadBtn() {
  loadBtn.classList.add('active');
}
function disableLoadBtn() {
  loadBtn.classList.remove('active');
}

let page = 1;
let gUserRequest = null;
let countOfPages = null;

const elemLoader = document.querySelector('.loader');
function startLoader() {
  elemLoader.classList.add('active');
}
function stopLoader() {
  elemLoader.classList.remove('active');
}

const formReset = () => userForm.reset();

userForm.addEventListener('submit', processingUserRequest);

async function processingUserRequest(event) {
  event.preventDefault();
  disableLoadBtn();
  clearGallery();
  page = 1;
  countOfPages = 1;
  const userRequest = userForm
    .querySelector('[name="search-text"]')
    .value.trim();
  if (userRequest !== '') {
    gUserRequest = userRequest;
    startLoader();
    try {
      const response = await apiRequest(userRequest, page);
      if (response.hits.length !== 0) {
        stopLoader();
        if (response.totalHits > 15) {
          countOfPages = response.totalHits / 15;
          activeLoadBtn();
        } else {
          disableLoadBtn();
        }
        renderRequest(response.hits, gallery);
        return;
      } else {
        stopLoader();
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'center',
        });
        return;
      }
    } catch (error) {
      iziToast.error({
        message: `${error.message}. We are experiencing some issues. Please try again later.`,
        position: 'center',
        timeout: 2000,
      });
    } finally {
      stopLoader();
      formReset();
    }
  } else {
    iziToast.warning({
      message: 'Field must not be empty!',
      position: 'center',
      timeout: 2000,
    });
    formReset();
    return;
  }
}

loadBtn.addEventListener('click', renderMoreImages);

async function renderMoreImages(event) {
  event.preventDefault();
  startLoader();
  page += 1;
  const item = document.querySelector('.item').getBoundingClientRect();
  const response = await apiRequest(gUserRequest, page);
  try {
    if (page <= countOfPages) {
      renderRequest(response.hits, gallery);
      stopLoader();
      window.scrollBy({
        top: item.height * 2,
        behavior: 'smooth',
      });
    } else {
      stopLoader();
      disableLoadBtn();
      renderRequest(response.hits, gallery);
      window.scrollBy({
        top: item.height * 2,
        behavior: 'smooth',
      });
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'center',
      });
    }
  } catch (error) {
    iziToast.error({
      message: `${error.message}. We are experiencing some issues. Please try again later.`,
      position: 'center',
      timeout: 2000,
    });
  }
}
