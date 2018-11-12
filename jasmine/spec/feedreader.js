/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */
/* Placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* Test suite about the RSS feeds definitions,
     * the allFeeds variable in the application.
     */
    describe("RSS Feeds", function() {
      /* test to make sure that the allFeeds variable has
       * been defined and that it is not empty.
       */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });
      /* test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
      it("URL defined, not empty", function() {
        allFeeds.forEach(function(feed) {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        });
      });
      /* test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */
      it("name defined, not empty", function() {
        allFeeds.forEach(function(feed) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        });
      });
    });
    describe("The menu", function() {
      /* test that ensures the menu element is
       * hidden by default.
       */
      it("menu element hidden", function() {
        expect($(".menu-hidden").is(":visible")).toEqual(true);
      });

      /* test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      it("toggle menu visibility on click", function() {
        $("a.menu-icon-link").trigger("click");
        expect($(".menu-hidden").is(":visible")).toBe(false);
        $("a.menu-icon-link").trigger("click");
        expect($(".menu-hidden").is(":visible")).toBe(true);
      });
    });
    describe("Initial Entries", function() {
      /* test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it("feed has at least one entry element", function() {
        expect($(".feed .entry").length).toBeGreaterThan(0);
      });
    });
    describe("New Feed Selection", function() {
      let newFeed;
      /* test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      beforeEach(function(loaded) {
        loadFeed(0, function() {
          newFeed = $(".feed").html();
          loadFeed(1, loaded);
        });
      });

      it("feed has loaded", function() {
        expect($(".feed").html()).not.toEqual(newFeed);
      });
    });
  })()
);
