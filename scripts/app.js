(function() {
  'use strict';
// app est une variable globale accessible à tout moment dans l'application
  var app = {
    isLoading: true,
    visibleItems: {},
    listItems: [],
    totalPrice: 0,
    itemTemplate: document.querySelector('.item'),
    container: document.querySelector('.item-mozaic'),
    showItemDialog: document.querySelector('.dialog-container_showItem'),
    showUserDialog: document.querySelector('.dialog-container_showUser')
  };

  /*****************************************************************************
  *
  * Event listeners for UI elements
  *
  ****************************************************************************/

  document.getElementById('butCheckout').addEventListener('click', function() {
    //TODO: handle checkout action
  });

  document.getElementById('butShowItemCancel').addEventListener('click', function() {
    // Close the show item dialog
    app.toggleShowItemDialog(false);
  });

  document.getElementById('userProfileBtn').addEventListener('click', function(){
    // Open/show the show user dialog
    app.toggleShowUserDialog(true);
  });

  document.getElementById('butShowUserCancel').addEventListener('click', function() {
    // Close the show user dialog
    app.toggleShowUserDialog(false);
  });
  
  document.getElementById('butAddQuantity').addEventListener('click', function() {
    // Add item quantity
    app.addQuantity();
  });
  
  document.getElementById('butRemoveQuantity').addEventListener('click', function() {
    // Remove item quantity
    app.removeQuantity();
  });
  
  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  // Toggles the visibility of the show item dialog.
  app.toggleShowItemDialog = function(visible) {
    if (visible) {
      app.showItemDialog.classList.add('dialog-container--visible');
    } else {
      app.showItemDialog.classList.remove('dialog-container--visible');
    }
  };

  // Toggles the visibility of the show user dialog.
  app.toggleShowUserDialog = function(visible) {
    if (visible) {
      app.showUserDialog.classList.add('dialog-container--visible');
    } else {
      app.showUserDialog.classList.remove('dialog-container--visible');
    }
  };
  
  // list est une liste d'items
  // Si l'item est déjà dans la liste, il le met à jour
  // Si l'item n'existe pas, il copie le template d'un item générique,
  // le rempli avec les infos du nouvel item
  // et le rajoute dans la liste
  app.updateItems = function(list) {
    for (var data in list) {
      var item = app.visibleItems[list[data]._id];
      if (!item) {
        item = app.itemTemplate.cloneNode(true);
        item.classList.remove('item-mozaic');
        item.removeAttribute('hidden');
        item.querySelector('.name-item').textContent = list[data].name;
        item.querySelector('.img-item').src = list[data].image;
        item.querySelector('.price').textContent = list[data].price;
        item.querySelector('.quantity').textContent = list[data].quantity;
        // update total price for checkout
        app.totalPrice += list[data].price * list[data].quantity;
        document.getElementById('butCheckout').textContent = "Payer ("+app.totalPrice+"€)";
        // add listeners on item click
        item.addEventListener('click', function(event) {
          // Get DOM element
          var targetElement = event.target || event.srcElement;
          
          // Get his parent with class "item"
          while ((targetElement = targetElement.parentElement) && !targetElement.classList.contains("item"));
          
          // Set the title of the item to the dialog title; same thing for the image
          var title = targetElement.getElementsByClassName("demo-card-image__filename")[0].innerHTML;
          var itemImage = targetElement.getElementsByClassName("img-item")[0].src;
          var quantity = targetElement.getElementsByClassName("quantity")[0].innerHTML;
          
          document.getElementById('dialogItemTitle').textContent = title;
          document.getElementById('dialogItemImage').src = itemImage;
          document.getElementById('quantity').textContent = quantity;
          
          // Open show item dialog
          app.toggleShowItemDialog(true);
        });
        // to fix design problem and create space between 2 divs
        app.container.appendChild(document.createTextNode("\n"));
        app.container.appendChild(item);
        app.visibleItems[list[data]._id] = item;
        
        // add the item to the list as global variable
        app.listItems.push(item);
        app.saveListItems();
      }
    }
  };
  
  app.addQuantity = function(){
    var quantity = parseInt(document.getElementById('quantity').textContent);
    document.getElementById('quantity').textContent = ++quantity;
  };
  
  app.removeQuantity = function(){
    var quantity = parseInt(document.getElementById('quantity').textContent);
    if(quantity > 0){
      document.getElementById('quantity').textContent = --quantity;
    }
  };
  
  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  // fetch list items from database
  app.getList = function() {
    var url = 'http://localhost:3000/items';
    // TODO add cache logic here
    // if ('caches' in window) {
    //   caches.match(url).then(function(response) {
    //     if (response) {
    //       response.json().then(function updateFromCache(json) {
    //         // var results = json.query;
    //         // results.id = id;
    //         // results.name = name;
    //         app.updateItems(json);
    //       });
    //     }
    //   });
    // }

    // Fetch the latest data.
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var response = JSON.parse(request.response);
          // Raw data for testing if database is empty
          // Replace response by
          //var response = [{"_id":"594f00389ec27598cfc4dbb9","name":"Nutella","price":3.5,"quantity":1,"image":"https://www.nutella.com/documents/7290592/7305292/pack_small_2.png/15162c7b-b5bd-4194-879e-77a6e6488e78","__v":0},{"_id":"594f00e49ec27598cfc4dbba","name":"Baguette","price":1,"quantity":2,"image":"http://vignette3.wikia.nocookie.net/adventuretimewithfinnandjake/images/3/3b/Baguette.png/revision/latest?cb=20121119115824","__v":0},{"_id":"594f07f39ec27598cfc4dbbc","name":"Mozzarella","price":10,"quantity":1,"image":"http://www.prixing.fr/images/product_images/b3b/b3bbedf40fc1ddb5320702544229e1e4.png","__v":0},{"_id":"594f0b7d9ec27598cfc4dbbe","name":"Céréales","price":3,"quantity":1,"image":"http://www.prixing.fr/images/product_images/8ab/8ab147fa8b0b6d2a2b58c35202ea005a.png","__v":0},{"_id":"594f0c9b9ec27598cfc4dbc0","name":"Pommes","price":2,"quantity":1,"image":"http://www.coteaux-nantais.com/sites/coteaux-nantais.com/files/royal-gala-tenroy.png","__v":0}]
          app.updateItems(response);
        }
      }
    };
    request.open('GET', url);
    request.send();
  };
// save data to cache (not working yet)
  app.saveListItems = function() {
    var listItems = JSON.stringify(app.listItems);
    localStorage.listItems = listItems;
  };

  // startup code
  app.listItems = localStorage.listItems;
  if (app.listItems) {
    app.listItems = JSON.parse(app.listItems);
  }

  // For simplicity, we make a request every 2 seconds
  // to check if new data has been added to database
  // in production we would do it more efficiently by socket handling
  window.setInterval(function(){
    if (!app.listItems) {
      app.listItems = [];
    }
    app.getList();
  }, 2000);

  // service worker (for cache)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(function() { console.log('Service Worker Registered'); });
  }
})();
