const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementsByClassName("close")[0];

const openModal = () => {
  modal.style.display = "block";
};
const closeModal = () => {
  modal.style.display = "none";
  window.location = "/api/shorten";
};
