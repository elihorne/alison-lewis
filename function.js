function init() {
  // hello world

  // sidebar positioning utility
  function positionSidebar() {
    var contentOffset = $('#content').offset();
    var contentMarginLeft = $('#content').css('margin-left').replace(/[^-\d\.]/g, '');
    $('#sidebar').css({
      'left' : contentOffset.left - contentMarginLeft
    });
  }

  // move the sidebar whenever the window is resized
  $(window).resize(function(){
    positionSidebar();
  });

  function buildNav() {
    var navData = [
      {
        'name' : 'Graphic Design',
        'slug' : 'graphic-design'
      },
      {
        'name' : 'Styling',
        'slug' : 'styling'
      },
      {
        'name' : 'Clothing Design',
        'slug' : 'clothing-design'
      },
      {
        'name' : 'Client List',
        'slug' : 'client-list'
      },
      {
        'name' : 'Blog',
        'slug' : 'blog'
      },
      {
        'name' : '[email me]',
        'slug' : 'email-me'
      },
    ];

    navStructure  = '<div id="sidebar">';
    navStructure += '<a class="brand" href="http://elihorne.com/alison-lewis/">Alison Lewis</a>';
    navStructure += '<nav class="main">';
    navStructure += '<ul></ul>';
    navStructure += '</nav>';
    navStructure += '</div>';
    navStructure += '</div>';

    $(navStructure).insertBefore('#content');

    $.each(navData, function(){
      if(this.slug == 'email-me') {
        this.hrefValue = 'mailto:alisonlewis7@gmail.com';
      } else {
        this.hrefValue = this.slug + '.html';
      }
      $('#sidebar nav ul').append('<li><a href="'+this.hrefValue+'" class="nav-'+this.slug+' top-level">'+this.name+'</a></li>')
    });

    function sectionControl() {
      var currentSection = window.location.pathname;
      currentSection = currentSection.split('/').pop();

      function buildSubNav(targetParent) {
        var subNavContent = '';
        $('#content span[data-type="nav-item"]').each(function(){
          var linkText = $(this).data('title');
          if($(this).data('href') != undefined) {
            var linkAnchor = '#' + $(this).data('href');
          } else {
            var linkAnchor = '';
          }

          subNavContent += '<li><a href="'+linkAnchor+'">'+linkText+'</a></li>';
        });
        $('<ul class="child-nav">'+subNavContent+'</ul>').insertAfter(targetParent);
      }

      if(currentSection != '') {
        $('#sidebar a[href="'+currentSection+'"]').addClass('active');
      }

      if(currentSection == 'graphic-design.html') {
        buildSubNav('.nav-graphic-design');
      };

      if(currentSection == 'styling.html') {
        buildSubNav('.nav-styling');
      };

      if(currentSection == 'clothing-design.html') {
        buildSubNav('.nav-clothing-design');
      };

      if(currentSection == 'blog.html') {
        var tumblrAPI = 'http://api.tumblr.com/v2/blog/';
        var alisonTumblr = 'alibobi.tumblr.com';
        var type = '/posts';
        var tumblrAPIKey = 'dMJngNDy2VpSg6V4mH1zICi1bwrnGJFI9b3e9aLLok5RqKmznJ';
        var withKey = '?api_key=' + tumblrAPIKey;
        var completeTumblrCall = tumblrAPI + alisonTumblr + type + withKey + '&callback=?';

        // http://api.tumblr.com/v2/blog/alibobi.tumblr.com/
        $.getJSON(completeTumblrCall, function(data) {
          if(data.meta.status == 200) {
            // success
            console.log('success - ' + completeTumblrCall);
            var posts = data.response.posts;
            $.each(posts, function(){
              //console.log(this);
              if(this.photos != undefined) {
                var imageURL = this.photos[0].original_size.url;
                var postURL = this.post_url;
                $('#content').append('<a class="tumblr-photo" href="'+postURL+'"><img src="'+imageURL+'"/></a>');
              }
            });
          } else {
            console.log('error');
          }
        });
      };
    }
    // position the sidebar on load
    positionSidebar();
    sectionControl();
  }



  // add links to the nav for graphic design
  buildNav();
}
