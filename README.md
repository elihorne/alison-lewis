Official Website for Alison Lewis Design
========================================

Features
--------
* Lightbox
* Adaptable fixed position nav
* Dynamic sub nav

Lightbox
--------
    <a href="#" class="lightbox">
        <img src="/path/to/thumbnail.png" data-full-image="/path/to/full-image.png"/>
    </a>

Navigation items
----------------
Spans with data attribute "data-nav-item" will be added to the navigation in the order they appear in the HTML. The text for the link is stored in "data-title" and the link value is stored in "data-href". This link value should match an image or paragraph content that has the same value as an id.

    Example: <p id="graphic-pink">...</p>
    <span data-type="nav-item" data-title="pink" data-href="graphic-pink">pink</span>

You can hide this text from the page (but still have it in the nav) by giving it a class of "hidden"

    <span class="hidden" data-type="nav-item" data-title="pink" data-href="graphic-pink">pink</span>

Recommended tools
-----------------
* Text editor like [Text Wrangler](http://www.barebones.com/products/textwrangler/) (free) or [Sublime Text](http://www.sublimetext.com/)
* FTP client like [Transmit](http://panic.com/transmit/)
* Local environment like [Anvil for Mac](http://anvilformac.com/)
