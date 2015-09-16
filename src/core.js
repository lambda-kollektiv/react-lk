var React = require('react'),
    Router = require('director').Router,
    Marked = require('marked'),
    XMLHttp = new XMLHttpRequest(),
    model = {
      views: [{text: 'articles', url: "#/articles"},
              {text: 'projects', url: "#/projects"},
              {text: 'about', url: "#/about"}],
      welcome: "Creating the future Cloud!",
      articles: "Code that reaches the sky!"},
    footerContainer = document.getElementById('footer-container'),
    contentContainer = document.getElementById('content-container'),
    navContainer = document.getElementById('nav-container');

console.log("Greetings Lord Kordano!");

// --- NAVIGATION ---
var navView = React.createClass({
  render : function() {
    var navList = this.props.data.views.map(function (n) {
      return React.DOM.a({href: n.url, className: 'nav-item'}, n.text);
    });
    return React.DOM.div({id: "sub-nav"},
                         React.DOM.a({href: "#/", id: "home-item", className: "nav-item"}, "Lambda Kollektiv"),
                         navList);
  }
});

function createNav() {
  var navbar = React.createElement(navView, {data: model});
  React.render(navbar, navContainer);
}

// --- FOOTER ---

var footerView = React.createClass({
  render: function() {
    return React.DOM.div({id: "footer"}, "Impressum");
  }
});

function createFooter() {
  var footer = React.createElement(footerView, {data: model});
  React.render(footer, footerContainer);
}

// --- LANDING ---
var landingView = React.createClass({
  render : function() {
    return React.DOM.div({className: "header"},
                        React.DOM.p({className: "sub-header"}, this.props.data.welcome));
  }
});

var landing = function createLanding() {
  var landing = React.createElement(landingView, {data: model});
  React.render(landing, contentContainer);
};

// --- ARTICLES ---
var articlesView = React.createClass({
  loadMarkdownFromServer: function(state) {
     XMLHttp.onreadystatechange = function() {
       if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
         console.log("Fetching: " + this.responseURL);
         var incomingText= XMLHttp.responseText;
         article = Marked(incomingText);
         state.setState({currentArticle: article});
      }
    };
    XMLHttp.open("GET", "/data/posts/first.md", true);
    XMLHttp.send();
  },
  getInitialState: function() {
    return {currentArticle: ""};
  },
  componentDidMount: function() {
    this.loadMarkdownFromServer(this);
  },
  render : function() {
    return React.DOM.div({
      className: "content",
      dangerouslySetInnerHTML: {
        __html: this.state.currentArticle
      }
    });
  }
});

var articles = function createArticles() {
    var articles = React.createElement(articlesView, {data: model});
    React.render(articles, contentContainer);
};

// --- BUILDING ---
var routes = {
      '/': landing,
      '/articles': articles
    },
    router = Router(routes);

createNav();
createFooter();
router.init();
document.location = "#/";
