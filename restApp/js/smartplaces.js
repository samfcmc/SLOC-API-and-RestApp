window.SmartPlaces = {
  tagFound: function() {
    throw "You need to define a call back for when a tag is found. " +
      "Call SmartPlaces.onTagFound(callback)";
  },
  hello: function() {
    alert("hello, just testing");
  },
  onTagFound: function(callback) {
    this.tagFound = callback;
  }
};
