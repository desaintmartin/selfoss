selfoss.shares = {
    initialized: false,
    urlBuilders: {},
    openInNewWindows: {},
    names: {},
    icons: {},
    enabledShares: '',

    init: function(enabledShares) {
        this.enabledShares = enabledShares;
        this.initialized = true;

        this.register('delicious', 'd', this.fontawesomeIcon('fab fa-delicious'), true, function(url, title) {
            return 'https://delicious.com/save?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
        });
        this.register('googleplus', 'g', this.fontawesomeIcon('fab fa-google-plus-g'), true, function(url) {
            return 'https://plus.google.com/share?url=' + encodeURIComponent(url);
        });
        this.register('twitter', 't', this.fontawesomeIcon('fab fa-twitter'), true, function(url, title) {
            return 'https://twitter.com/intent/tweet?source=webclient&text=' + encodeURIComponent(title) + ' ' + encodeURIComponent(url);
        });
        this.register('facebook', 'f', this.fontawesomeIcon('fab fa-facebook'), true, function(url, title) {
            return 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(title);
        });
        this.register('pocket', 'p', this.fontawesomeIcon('fab fa-get-pocket'), true, function(url, title) {
            return 'https://getpocket.com/save?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
        });
        this.register('wallabag', 'w', this.localIcon('wallabag'), true, function(url) {
            if ($('#config').data('wallabag_version') == 2) {
                return $('#config').data('wallabag') + '/bookmarklet?url=' + encodeURIComponent(url);
            } else {
                return $('#config').data('wallabag') + '/?action=add&url=' + btoa(url);
            }
        });
        this.register('wordpress', 's', this.fontawesomeIcon('fab fa-wordpress-simple'), true, function(url, title) {
            return $('#config').data('wordpress') + '/wp-admin/press-this.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(title);
        });
        this.register('mail', 'e', this.fontawesomeIcon('far fa-envelope'), false, function(url, title) {
            return 'mailto:?body=' + encodeURIComponent(url) + '&subject=' + encodeURIComponent(title);
        });
    },

    register: function(name, id, icon, openInNewWindow, urlBuilder) {
        if (!this.initialized) {
            return false;
        }
        this.urlBuilders[name] = urlBuilder;
        this.openInNewWindows[name] = openInNewWindow;
        this.names[id] = name;
        this.icons[name] = icon;
        return true;
    },

    getAll: function() {
        var allNames = [];
        if (this.enabledShares != null) {
            for (var i = 0; i < this.enabledShares.length; i++) {
                var enabledShare = this.enabledShares[i];
                if (enabledShare in this.names) {
                    allNames.push(this.names[enabledShare]);
                }
            }
        }
        return allNames;
    },

    share: function(name, url, title) {
        url = this.urlBuilders[name](url, title);
        if (this.openInNewWindows[name]) {
            window.open(url);
        } else {
            document.location.href = url;
        }
    },

    buildLinks: function(shares, linkBuilder) {
        var links = '';
        if (shares != null) {
            for (var i = 0; i < shares.length; i++) {
                var name = shares[i];
                links += linkBuilder(name);
            }
        }
        return links;
    },

    fontawesomeIcon: function(service) {
        return '<i class="' + service + '"></i>';
    },

    localIcon: function(wallabag) {
        return '<svg class="svg-inline--fa" height="13" width="13" xmlns:xlink="http://www.w3.org/1999/xlink"><use width="13" height="13" xlink:href="images/' + wallabag + '.svg#icon" /></svg>';
    }
};
