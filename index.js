document.addEventListener("DOMContentLoaded", () => {
    // Array for shopping list items
    const shoppingList = [];

    // Variables for the various DOM elements
    const form = document.querySelector("form");
    const enteredItem = document.getElementById("enter-item");
    const shoppingListContent = document.getElementById("items");
    const clearListBtn = document.getElementById("clear-list-btn")

    // Function to deal with render of shopping list and marking as purchased
    const listStatus = () => {
        shoppingListContent.innerHTML = "";
        shoppingList.forEach((item, index) => {
            const listContent = document.createElement("li");
            let btn = document.createElement("button");
            btn.textContent = "x";
            btn.addEventListener('click', deleteItem);
            listContent.appendChild(btn);
            listContent.textContent = `${item}`;
            listContent.addEventListener('click', () => {
                listContent.classList.toggle("purchased");
            });
            shoppingListContent.appendChild(listContent);
        });
    };

    // Function to delete individual item
    function deleteItem (e) {
        e.target.parentNode.remove();
    };

    // Submit and add new items function
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newItem = enteredItem.value;
        if(newItem) {
            shoppingList.push(newItem);
            enteredItem.value = '';
            listStatus();
        }
    });

    // Function for clearing the shopping list
    clearListBtn.addEventListener("click", () => {
        shoppingList.length = 0;
        listStatus();
    });

    // Bonus: Save and load the list from local storage
    const saveList = () => {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    };

    const loadList = () => {
        const savedList = localStorage.getItem('shoppingList');
        if (savedList) {
            shoppingList = JSON.parse(savedList);
            renderList();
        }
    };

    // Load the list from local storage on page load
    loadList();

    // Save the list to local storage whenever it's updated
    window.addEventListener('beforeunload', saveList);

});
