(function() {
  'use strict';

  var app = {
    isLoading: true,
    visibleItems: {},
    listItems: [],
    totalPrice: 0,
    itemTemplate: document.querySelector('.item'),
    container: document.querySelector('.itemMozaic'),
    addDialog: document.querySelector('.dialog-container')
  };

  /*****************************************************************************
  *
  * Event listeners for UI elements
  *
  ****************************************************************************/

  document.getElementById('butCheckout').addEventListener('click', function() {

  });

  document.getElementById('butAddCancel').addEventListener('click', function() {
    app.toggleAddDialog(false);
  });

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
          app.updateItems(response);
        }
      }
    };
    request.open('GET', url);
    request.send();
  };

  app.updateItems = function(list) {
    for (var data in list) {
      var item = app.visibleItems[list[data]._id];
      if (!item) {
        item = app.itemTemplate.cloneNode(true);
        item.classList.remove('itemMozaic');
        item.removeAttribute('hidden');
        item.querySelector('.nameItem').textContent = list[data].name;
        item.querySelector('.imgItem').src = list[data].image;
        item.querySelector('.priceItem').textContent = "Prix: "+list[data].price+"€";
        item.querySelector('.quantityItem').textContent = "Qté: "+list[data].quantity;
        // update to total price for checkout
        app.totalPrice += list[data].price * list[data].quantity;
        document.getElementById('butCheckout').textContent = "Checkout ("+app.totalPrice+"€)";
        // add listeners
        item.addEventListener('click', function(event) {
          var targetElement = event.target || event.srcElement;
          while ((targetElement = targetElement.parentElement) && !targetElement.classList.contains("item"));
          var title = targetElement.getElementsByClassName("demo-card-image__filename")[0].innerHTML;
          var itemImage = targetElement.getElementsByClassName("imgItem")[0].src;
          document.getElementById('dialog-item_title').textContent = title;
          document.getElementById('dialog-item_image').src = itemImage;

          // app.toggleAddDialog(true);
        });
        // to fix design problem and create space between 2 <div>
        app.container.appendChild(document.createTextNode("\n"));
        app.container.appendChild(item);
        app.visibleItems[list[data]._id] = item;

        app.listItems.push(item);
        app.saveListItems();
      }
    }
  };

  app.saveListItems = function() {
    var listItems = JSON.stringify(app.listItems);
    localStorage.listItems = listItems;
  };

  // startup code
  app.listItems = localStorage.listItems;
  if (app.listItems) {
    app.listItems = JSON.parse(app.listItems);
  }

  // For simplicity, we make a request every 5 seconds
  // to check if new data has been added to database
  window.setInterval(function(){
    if (!app.listItems) {
      app.listItems = [];
    }
    app.getList();
  }, 5000);

  // service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./service-worker.js')
    .then(function() { console.log('Service Worker Registered'); });
  }

  var cards = document.getElementsByClassName('item');
  for (var i = 0; i < cards.length; i++) {

  }


  /*****************************************************************************
  *
  * Methods to update/refresh the UI
  *
  ****************************************************************************/
  // Toggles the visibility of the add new city dialog.
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

})();
