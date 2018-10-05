# Bookmark App #

## User Stories ##

**As a User**

* [x] I can add bookmarks to my bookmark list. A bookmark contains:
    * [x] A Title (string)
    * [x] URL Link (string)
    * [x] Description (string)
    * [x] Rating (1-5) (number)
* [x] I can see a list of my bookmarks when I first open the app
    * [x] All bookmarks in the list default to a "condensed" view showing only title and rating
* [x] I can click on a bookmark to display the "detailed view.
    * [x] Detailed view expands to additionally display description and a "Visit Site" link
* [x] I can remove bookmarks from my bookmakr list
* [x] I receive appropriate feedback when I cannot submit a bookmark
    * [x] Check all validations in the API documentation (e.g. title and url field required)
* [x] I can select from a dropdown a minimum rating to filter the list by all bookmarks rated above the chosen selection

## Techincal Requirements ##

* Use jQuery for AJAX and DOM Manipulation
* Use namespacing to adhere to good architecture practices
    * Minimal global variables
    * Create modules in separate files to organize my code
    * Logically group my functions
* Keep data out of the DOM
    * No direct DOM manipulation in event handlers
    * Follow the React-ful design patter - change state, re-render component
* Use semantic HTML
* Use responsive design
* Follow a11y best practices



## Process ##

1. Upon loading the page, the user will see a blank page, with the ability to add their first bookmark which will display as a placeholder.
    * Once they add a bookmark, the placeholder will shift it's position and the bookmark they added will appear in the first position.
2. 
