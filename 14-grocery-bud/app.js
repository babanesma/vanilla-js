// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');
const localStorageItem = 'groceryList';

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setupItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    const element = getGroceryElement(id, value);
    list.appendChild(element);
    displayAlert('item added to the list', 'success');
    container.classList.add('show-container');
    addToLocalStorage(id, value);
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert('Item changed', 'success');
    editItemInLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove('show-container');
  }
  displayAlert('item removed', 'danger');
  setBackToDefault();
  removeFromLocalStorage(id);
}

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.parentElement.querySelector('p.title');
  grocery.value = editElement.innerText;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.innerHTML = "Edit";
}

function clearItems() {
  const items = document.querySelectorAll('.grocery-item');
  items.forEach((i) => list.removeChild(i));
  container.classList.remove('show-container');
  displayAlert('empty list', 'danger');
  setBackToDefault();
  localStorage.removeItem(localStorageItem);
}

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert
  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

function setBackToDefault() {
  grocery.value = '';
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let groceryList = getLocalStorage();
  groceryList.push(grocery);
  saveLocalStorage(groceryList);
}

function removeFromLocalStorage(id) {
  let groceryList = getLocalStorage();
  groceryList = groceryList.filter((item) => item.id !== id)
  saveLocalStorage(groceryList);
}

function editItemInLocalStorage(id, value) {
  let groceryList = getLocalStorage();
  groceryList = groceryList.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  })
  saveLocalStorage(groceryList);
}

function getLocalStorage() {
  return localStorage.getItem(localStorageItem) ? JSON.parse(
    localStorage.getItem(localStorageItem)
  ) : [];
}

function saveLocalStorage(groceryList) {
  localStorage.setItem(localStorageItem, JSON.stringify(groceryList));
}
// ****** SETUP ITEMS **********
function setupItems() {
  let gList = getLocalStorage();
  if (gList.length > 0) {
    gList.forEach((item) => {
      const value = item.value;
      const id = item.id
      const element = getGroceryElement(id, value);
      list.appendChild(element);
    });
    container.classList.add('show-container');
  }
};

function getGroceryElement(id, value) {
  const element = document.createElement('article');
  element.classList.add('grocery-item');
  element.dataset.id = id;
  element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
      <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>`;

  // delete
  const deleteBtn = element.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', deleteItem);

  const editBtn = element.querySelector('.edit-btn');
  editBtn.addEventListener('click', editItem);
  
  return element;
}