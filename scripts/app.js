(function() {
  'use strict';

  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container')
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
      var itemImage = targetElement.getElementsByClassName("mdl-card__image")[0].src;
      console.log(itemImage);
      document.getElementById('dialog-item_title').textContent = title;
      document.getElementById('dialog-item_image').src = itemImage;
      // Open/show the add new city dialog
      app.toggleAddDialog(true);
    });
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
