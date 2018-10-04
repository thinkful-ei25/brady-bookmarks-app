'use strict';



const store = (function() {
  
  function addBookmark(item) {
    this.bookmarks.push(item);;
  }

  function findByID(id) {
    return this.bookmarks.find(item => item.id === id);
  }

  function toggleExpandView(item) {
   if(item.expanded === false) {
      return item.expanded = true;
    } else if (item.expanded === true) {
      return item.expanded = false;
    } else {
      console.log('error with toggleExpandView');
      }
  }

  function findAndDelete(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  }


  function toggleFilterRatings(rating) {
    this.filters = parseInt(rating, 10);

  }

  return {
    bookmarks: [],
    adding: false,
    filters: 0,
    toggleExpandView,
    addBookmark,
    findAndDelete,
    toggleFilterRatings
    };

}());