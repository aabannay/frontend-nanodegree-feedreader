/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined and they are not empty', function() {
            for(let i=0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBeNull();
                expect(allFeeds[i].url.length).not.toEqual(0);

            }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Names are defined and they are not empty', function() {
            for(let i=0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBeNull();
                expect(allFeeds[i].name.length).not.toEqual(0);
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        //the body element which contains the class responsible for hiding and
        //showing the menu element
        var body;
        beforeEach(function(){
            body = document.querySelector('body');
        });
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('Menu is hidden by default', function(){
            expect(body.classList.contains('menu-hidden')).toEqual(true);
         });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('Menu changes visibility by clicking humburger icon', function(){
            //the menu icon element
            var menuIcon = document.querySelector('.icon-list');
            //simulate clicking the menu icon
            menuIcon.click();
            //check if the menu now is open
            expect(body.classList.contains('menu-hidden')).toEqual(false);
            //click the menu to close it
            menuIcon.click();
            //check if the menu now is closed
            expect(body.classList.contains('menu-hidden')).toEqual(true);
          });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        //change the deafult timeout interval to be able to run the async task
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
            loadFeed(0, done);
         });

         it('loadFeed inserts at least one entry within feed', function(){
            var feed = document.querySelector('.feed');
            var entryElement = feed.querySelector('.entry');

            expect(entryElement).toBeDefined();

         });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function(){
        var initialFeed,
            afterLoadFeed;
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         beforeEach(function(done){
            loadFeed(0, function(){
                initialFeed = document.querySelector('.feed').textContent;
                console.log(initialFeed);
            });
            loadFeed(1, function() {
                afterLoadFeed = document.querySelector('.feed').textContent;
                console.log(afterLoadFeed);
                done();
            });
        });

         it('content of feed changes upon loadFeed call', function(){
            expect(initialFeed).not.toEqual(afterLoadFeed);
         });
    });

}());
