function init() {

  // sidebar positioning utility
  function positionSidebar() {
    var windowScrollTop = $(window).scrollTop();
    var windowScrollLeft = $(window).scrollLeft();
    var contentOffset = $('#content').offset();
    var contentMarginLeft = $('#content').css('margin-left').replace(/[^-\d\.]/g, '');

    if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
      if(windowScrollTop > 0 && windowScrollLeft == 0) {
        // if the window has been scrolled vertically and is left aligned, make it fixed and track
        $('#sidebar').css({
          'position' : 'fixed',
          'top' : '43px',
          'left' : contentOffset.left - contentMarginLeft
        });
      }

      if(windowScrollTop > 0 && windowScrollLeft > 0 && $(window).outerWidth() < $('#main-wrap').outerWidth()) {
        // if window is small (horizontal scrollbars)
        $('#sidebar').css({
          'position' : 'fixed',
          'top' : '43px',
          'left' : -$(window).scrollLeft()
        });
      }

      if(windowScrollTop == 0) {
        // otherwise reset it to absolute and don't track
        $('#sidebar').css({
          'position' : 'absolute',
          'top' : '0',
          'left' : '0'
        });
      }

      if(windowScrollLeft > 0 && $('#sidebar').css('position') == 'fixed') {
        // if they scroll the window left while scrolled vertically, track it (and the window doesn't have horizontal scrollbars)
        $('#sidebar').css({
          'position' : 'fixed',
          'left' : $('#sidebar').css('left') - $(window).scrollLeft()
        });
      }
    }
  }

  $(window).scroll(function() {
    positionSidebar();
  });

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

    // todo: switch home link to be relative
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
            var posts = data.response.posts;
            $.each(posts, function(){
              if(this.photos != undefined) {
                var imageURL = this.photos[0].original_size.url;
                var postURL = this.post_url;
                $('#content').append('<a class="tumblr-photo" href="'+postURL+'"><img src="'+imageURL+'"/></a>');
              }
            });
            $('#content').append('<a class="caption" href="http://alibobi.tumblr.com">Follow me on Tumblr</a>');
          } else {
            console.log('Tumblr fetching error.');
          }
        });
      };
    }
    // position the sidebar on load
    positionSidebar();
    sectionControl();
  }

  function lightboxControl() {
    function closeModal() {
      $('.smokescreen, .modal').remove();
    };

    $('.lightbox').on('click', function(event){
      event.preventDefault();
      $('#main-wrap').append('<div class="smokescreen"></div><div class="modal"></div>');
      var fullSizeImage = $(this).find('img').data('full-image');
      if(fullSizeImage != undefined) {
        $('.modal').append('<img src="'+fullSizeImage+'"/>');
        $('.modal img').load(function(){
          var modalOriginalImageWidth = this.width;
          var modalOriginalImageHeight = this.height;

          if(modalOriginalImageHeight > ($(window).outerHeight() - 60)) {
            modalDisplayImageHeight = $(window).outerHeight() - 60;
            modalDisplayImageWidth = modalOriginalImageWidth / modalOriginalImageHeight * modalDisplayImageHeight;
          } else {
            modalDisplayImageHeight = modalOriginalImageHeight;
            modalDisplayImageWidth = modalOriginalImageWidth;
          }

          $('.modal img').css({
            'height' : modalDisplayImageHeight
          });

          $('.modal').css({
            'margin-left' : -modalDisplayImageWidth/2,
            'margin-top' : -modalDisplayImageHeight/2,
            'display' : 'block'
          });
        });

        $('.smokescreen').on('click',function(){
          closeModal();
        });

        $('body').keydown(function(event) {
          if (event.which == 27) {
             event.preventDefault();
             closeModal();
           }
        });
      }

    });
  }

  // add links to the nav for graphic design
  buildNav();

  // listen for lightbox
  lightboxControl();
}
