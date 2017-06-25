(function() {
  'use strict';

  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),
    container: document.querySelector('.main'),
    showItemDialog: document.querySelector('.dialog-container_showItem'),
    showUserDialog: document.querySelector('.dialog-container_showUser')
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  // document.getElementById('butCheckout').addEventListener('click', function() {
  //   // Refresh all of the forecasts
  //   app.updateForecasts();
  // });

  var cards = document.getElementsByClassName('item');
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function(event) {
      var targetElement = event.target || event.srcElement;
      while ((targetElement = targetElement.parentElement) && !targetElement.classList.contains("item"));
      var title = targetElement.getElementsByClassName("demo-card-image__filename")[0].innerHTML;
      var itemImage = targetElement.getElementsByClassName("imgItem")[0].src;
      document.getElementById('dialog-item_title').textContent = title;
      document.getElementById('dialog-item_image').src = itemImage;
      
      // Open/show the show item dialog
      app.toggleShowItemDialog(true);
    });
  }
  
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

})();
