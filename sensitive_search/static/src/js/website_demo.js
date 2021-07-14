odoo.define('website_demo.sensitive_search', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');
    var core = require('web.core');

    publicWidget.registry.websiteDemoMyGet = publicWidget.Widget.extend({
        selector: '#searchy_form',
        events: {
            'input input.searchy-input': '_onSearchChange',
            'click input.searchy-input': '_onSearchChange',
            'focusout input.searchy-input': '_onFocusOut',
            'click .dropdown-item': '_onClick',
        },

        start: function () {
            // INFO: sets quick references to some internal jquery elements.
            this.$input = this.$el.find('input.searchy-input');
            this.$items = this.$el.find('ul');
            return this._super.apply(this, arguments);
        },

        // INFO: triggers change event when user types into the search box.
        _onSearchChange: function (ev) {
            let string_to_search = $(ev.currentTarget).val().trim();

            var self = this;

            // INFO: queries only if three characters has been typed in.
            if (string_to_search.length > 2) {
                // INFO: calls a json Odoo controller querying the input string.
                this._rpc({
                    route: '/mysearch',
                    params: {
                        s: string_to_search
                    }
                }).then(function (result) {
                    // INFO: renders resulting data from controller above.
                    let lines = '';
                    result.forEach((rec) => {
                        lines += `<li><a class=\"dropdown-item\" data-value=\"${rec.id}\" href=\"#\">${rec.name.replace(string_to_search, '<b>' + string_to_search + '</b>')}</a></li>`;
                    })
                    // INFO: if data from controller then shows the box under the input field otherwise empties $items.
                    lines.length ? self.$items.html($(lines)).show() : self.$items.empty();
                });
            } else {
                // INFO: if less than 3 characters then empty and hide $items div.
                this.$items.empty().hide();
            }
        },

        // INFO: when focusout off the input box then hides $items.
        _onFocusOut: function (ev) {
            var self = this;
            // INFO: sets timeout because focusout prevents clicking.
            setTimeout(function () {
                self.$items.hide();
            }, 100);
        },

        // INFO: if the user clicks on any item of $items, set input box value as item's data-value.
        _onClick: function (ev) {
            if ($(ev.currentTarget).data('value') !== -1) {
                this.$input.val(ev.currentTarget.text);
                $('#form_demo').find('input[name="selected_id"]').val($(this).data('value'));
            }
            // INFO: finally hides $items.
            this.$items.hide();
        }
    });
});
