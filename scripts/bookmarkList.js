'use strict';

const bookmarkList = (function() {

  function generateBookmarkElement(item) {
    //HTML Elements that Will Change: Ratings, Expanded State, Icon in Top Left
    //console.log('gemeratebookmarkelement ran' + item);
    //Initialize ratingCss as an empty string which we will update below based on ratings input;
    let ratingCss = '';

    //viewStateIcon checks the expanded property of the passed in item and determines which icon to display.
    const viewStateIcon = item.expanded ?  'mdi-minus' : 'mdi-arrow-expand';

    // bookmarkItem is what we will add to the HTML page, and we are starting it as a column.
    let bookmarkItem = `<div class="col-4">`;
    
    //Look at the number associated with the item's rating and determine how many stars we will display. 
    //For loop will loop as many times as the rating and add a star to ratingCss.
    for(let i = 0; i < item.rating; i++) {
      ratingCss += '<i class="fa fa-star filled-star"></i>';
    }

  
   //The default state of a bookmark will be the closed state, which only contains the item and rating.
   //The below html will be added to the div created above.
      //add a bookmark with the item.id, item.title, viewStateIcon, and ratingCss
    bookmarkItem +=       
        ` <div class="js-bookmark-element" data-bookmark-id="${item.id}">  
          <div class="bookmark-heading">
            <h3 class="bookmark-title">${item.title}</h3>
            <div class="bookmark-control">
              <i class="mdi ${viewStateIcon} js-bookmark-toggle"></i>
              <i class="mdi mdi-close js-bookmark-delete"></i>
            </div>
            <p>&nbsp;</p>
          </div>
          <div class="bookmark-rating">
            <p>Rating:<span>${ratingCss}</span></p>
          </div> `
      ;

    // ADD THE EXPANDED INFORMATION TO THE DEFAULT ITEM  
    if(item.expanded) {
      bookmarkItem += 
        `<p class="bookmark-description js-bookmark-description">${item.desc}</p>
        <button type="button" class="button js-bookmark-button"> View Website </button> 
        `; //Need to add url
      }

      //CLOSE UP THE BOOKMARKITEM WITH TWO CLOSE DIVS
      bookmarkItem +=
      `</div> </div>`;

      //console.log('generate bookmark element ran:' + bookmarkItem);

      return bookmarkItem;
  }

  //Passing in all of our bookmarks, we will run each of them through the function above which creates an array which we assign to items.
  //We then join this array into a string and return that variable.
  function generateBookmarkItemsString(bookmarkList) {
    //console.log(bookmarkList);
    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    //console.log('generateBookmarkItemsString ran' + items.join(''));
    return items.join('');
  }

  //this function is responsible for rendering our list each time.
  //We set items to the the array of bookmarks.
  //We check to see our store has filter ratings other than 0 and filter out the ones that do not meet the filter criteria
  // we create a bookmarkListItemsString and set it to equal the value we get back after sending the items as a single html string.
  //We insert this into the div we created in index.html
  function render() {
    // console.log('render ran');
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
      });

    });
  }

  function getBookmarkIdFromElement(item){
    return $(item)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }

  //Need to figure out how to grab element id
  function handleBookmarkExpand() {
    $('.js-bookmark-list').on('click', '.js-bookmark-toggle', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const updateBookmark = store.bookmarks.find(item => item.id === id);
      store.toggleExpandView(updateBookmark);
      render();
    });

  }

  function handleDeleteBookmarkClick() {
    //listen for a click of the X button
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const deleteBookmark = store.bookmarks.find(item => item.id === id);
      api.deleteBookmark(id, () => {
        store.findAndDelete(id);
        render();
      });
    });

    // delete item from api
    //delete iteom from the store
    //reRender
  }

  function handleFilterBookmarksClick() {
    $('#rating-select').on('change', function(event){
      const selectedVal = $(event.currentTarget).find(':selected').val();
     store.toggleFilterRatings(selectedVal);
      render();
    });
    //listen for a click of the bookmark filter
    //recieve the input and pass it to the store.filter
    //render
    //console.log('handleFilterBookmarksClick ran');

  }

  function bindEventListeners() {
    handleNewBookmarkSubmit(),
    handleBookmarkExpand(),
    handleDeleteBookmarkClick(),
    handleFilterBookmarksClick()
  }

  return {
    render: render,
    bindEventListeners, bindEventListeners,
  };


}());

