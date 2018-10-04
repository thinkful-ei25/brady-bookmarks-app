'use strict';

$(document).ready(function() {
  console.log('index.js is running');
  bookmarkList.bindEventListeners();
  bookmarkList.render();

  api.getBookmarks((bookmarks) => {
    bookmarks.forEach(function(item) {
      item.expanded = false;
      store.addBookmark(item);
    
    });
    bookmarkList.render();
  });
});