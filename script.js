let currentIndex = 0;
const visibleImages = 2;
const galleryTrack = document.querySelector('.gallery-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateButtons() {
  const totalImages = galleryTrack.children.length;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= totalImages - visibleImages;
}

function moveGallery(direction) {
  const imageWidth = galleryTrack.children[0].offsetWidth + 10;
  const totalImages = galleryTrack.children.length;
  const maxIndex = totalImages - visibleImages;

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  const offset = -currentIndex * imageWidth;
  galleryTrack.style.transform = `translateX(${offset}px)`;
  updateButtons();
}

function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
    tabContents[i].classList.remove("active");
  }

  const tabLinks = document.getElementsByClassName("tab-link");
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

function addImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "New Image";
      img.style.width = "200px";
      img.style.height = "150px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "10px";
      img.style.margin = "0 5px";
      galleryTrack.appendChild(img);

      const imageWidth = galleryTrack.children[0].offsetWidth + 10;
      const totalImages = galleryTrack.children.length;
      const maxIndex = totalImages - visibleImages;

      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }

      const offset = -currentIndex * imageWidth;
      galleryTrack.style.transform = `translateX(${offset}px)`;
      updateButtons();
    };
    reader.readAsDataURL(file);
  }
}

document.getElementById('about').style.display = 'block';
updateButtons();