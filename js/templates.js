define('templates', function() {
    var templates = {};
    jQuery('script[type="text/template"]').each(function() {
        var $this = jQuery(this);
        templates[$this.attr('id')] = $this.html();
    });

    return templates;
});