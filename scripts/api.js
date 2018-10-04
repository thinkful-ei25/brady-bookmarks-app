'use strict';

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/brady';

  function getBookmarks(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  }

  function createBookmark(newBookmark, callback) {
    const jsonData = JSON.stringify(newBookmark);
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: jsonData,
      success: callback
    });
  }

  function updateBookmark(id, updateData, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback
    });
  }

    function deleteBookmark(id, callback) {
      $.ajax({
        url: `${BASE_URL}/bookmarks/${id}`,
        method: 'DELETE',
        contentType: 'application/json',
        success: callback
      });
    }

    return {
      getBookmarks,
      createBookmark,
      updateBookmark,
      deleteBookmark
    };

}());