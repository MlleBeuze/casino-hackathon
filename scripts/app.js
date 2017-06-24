(function() {
  'use strict';

  var app = {
    isLoading: true,
    visibleItems: {},
    listItems: [],
    itemTemplate: document.querySelector('.item'),
    container: document.querySelector('.itemMozaic')
  };

  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  document.getElementById('butCheckout').addEventListener('click', function() {
    console.log("clicked");
    if (!app.listItems) {
      app.listItems = [];
    }
    app.getList();
  });

  // app.getList = function(id, name) {
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
        console.log('item',item);
        item.removeAttribute('hidden');
        item.querySelector('.nameItem').textContent = list[data].name;
        item.querySelector('.imgItem').src = list[data].image;
        item.querySelector('.priceItem').textContent = list[data].price;
        item.querySelector('.quantityItem').textContent = list[data].quantity;
        // to fix design problem and create space between 2 <div>
        app.container.appendChild(document.createTextNode("\n"));
        app.container.appendChild(item);
        app.visibleItems[list[data]._id] = item;

        app.listItems.push({_id: list[data]._id, name: list[data].name});
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
    app.getList();
  }, 5000);

  // service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

})();
