'use strict';

const bookmarkList = (function() {

  function handleError(err) {
    let errorMessage = '';
    if (err.responseJSON && err.responseJSON.message) {
      errorMessage = err.responseJSON.message;
    } else {
      errorMessage = `${err.code} Server Error`;
    }
    return `
      <section class ="error-body">
        <button id="close-error">X</button>
        <p>${errorMessage}</p>
      </section>
    `;
  }

  function generateBookmarkElement(item) {
    // Determine Number of Stars
    let bookmarkItem = '';
    
    let ratingCss = '';
    for(let i = 0; i < item.rating; i++) {
      ratingCss += '<i class="fa fa-star filled-star"></i>';
    }
    
    //Determine expanded State icon
    const viewStateIcon = item.expanded ?  'mdi-minus' : 'mdi-arrow-expand';
    
    //Determine expanded status
    let expandedItem = '';
    if(item.expanded) {
      expandedItem = `
        <div class="bookmark-extra">
          <p class="bookmark-description">${item.desc}</p>
          <a href="${item.url}" target="_blank" class="form-button margin-top">Go somewhere</a>
        </div>
      `;
    }
    let newRowStart = '';
    let newRowEnd = '';

    if (store.bookmarks.indexOf(item) !== 0 && store.bookmarks.indexOf(item) %3 === 0 ){
      newRowStart = '<div class="row">';
      newRowEnd = '</div>';
    }

    if(store.bookmarks.indexOf(item) === 0) {
      newRowStart = '<div class="row">';
      newRowEnd = '';
    }

    bookmarkItem = `
      ${newRowEnd}
      ${newRowStart}
        <div class="col-4">
          <div class=" bookmark js-bookmark-element" data-bookmark-id="${item.id}">  
            <div class="bookmark-heading">
              <h3 class="bookmark-title">${item.title}</h3>
            <div class="bookmark-control">
              <i class="mdi ${viewStateIcon} js-bookmark-toggle"></i>
              <i class="mdi mdi-close js-bookmark-delete"></i>
            </div>
          </div>
          ${expandedItem}
          <div class="bookmark-rating">
            ${ratingCss}
          </div> 
          </div>
        </div>
      `;  

      return bookmarkItem;
  }

  //Passing in all of our bookmarks, we will run each of them through the function above which creates an array which we assign to items.
  //We then join this array into a string and return that variable.
  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    //console.log(items);
    return items.join('');
  }

  //this function is responsible for rendering our list each time.
  //We set items to the the array of bookmarks.
  //We check to see our store has filter ratings other than 0 and filter out the ones that do not meet the filter criteria
  // we create a bookmarkListItemsString and set it to equal the value we get back after sending the items as a single html string.
  //We insert this into the div we created in index.html
  function render() {
    if(store.error) {
      const el = handleError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').html('');
    }

    let items = store.bookmarks;
    items = items.filter(item => item.rating >= store.filters);
    const bookmarkListItemsString = generateBookmarkItemsString(items);
    $('.js-bookmark-list').html(bookmarkListItemsString);
  }

  // function serializeJson(form) {
  //   const formData = new FormData(form);
  //   const o = {};
  //   formData.forEach((val, name) => o[name] = val);
  //   console.log(JSON.stringify(o));
  // }


  function handleNewBookmarkSubmit() {
    //check for the submit of a new bookmark
    $('#js-create-bookmark').submit(function(event) {
      //prevent default behavior
      event.preventDefault();
      //console.log(event);
      //assign values of each input to a variable
      const newBookmark = {
        title: $('.js-bookmark-title-entry').val(),
        url: $('.js-bookmark-url-entry').val(),
        desc: $('.js-bookmark-description-entry').val(),
        rating: $('.js-bookmark-rating-entry').val()
      };
      $('.js-bookmark-title-entry').val('');
      $('.js-bookmark-url-entry').val('');
      $('.js-bookmark-description-entry').val('');
      $('.js-bookmark-rating-entry').val('');

      api.createBookmark(newBookmark, (newItem) => {
        store.addBookmark(newItem);
        render();
      }, (err) => {
        store.setError(err);
        render();
        }
      );

    });
  }

  function getBookmarkIdFromElement(item){
    return $(item)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }

  function handleBookmarkExpand() {
    $('.js-bookmark-list').on('click', '.js-bookmark-toggle', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const updateBookmark = store.bookmarks.find(item => item.id === id);
      store.toggleExpandView(updateBookmark);
      render();
    });

  }

  function handleDeleteBookmarkClick() {
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const deleteBookmark = store.bookmarks.find(item => item.id === id);
      api.deleteBookmark(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleFilterBookmarksClick() {
    $('#rating-select').on('change', function(event){
      const selectedVal = $(event.currentTarget).find(':selected').val();
     store.toggleFilterRatings(selectedVal);
      render();
    });
  }

  function handleCloseError() {
    $('.error-container').on('click', '#close-error', () => {
      store.setError(null);
      render();
    })
  }

  function bindEventListeners() {
    handleNewBookmarkSubmit(),
    handleBookmarkExpand(),
    handleDeleteBookmarkClick(),
    handleFilterBookmarksClick(),
    handleCloseError();
  }

  return {
    render: render,
    bindEventListeners, bindEventListeners,
  };


}());

