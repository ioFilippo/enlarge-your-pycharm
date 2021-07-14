# -*- coding: utf-8 -*-
from time import sleep

from odoo import http, models
from odoo.http import request, Response

from odoo.tools import debugger
import pydevd

import logging
_logger = logging.getLogger(__name__)

debugger.SUPPORTED_DEBUGGER.update({'pydevd'})
pydevd.set_trace = pydevd.settrace


class MyController(http.Controller):

    @http.route('/mysearch', type='json', auth="public", website=True)
    def mysearch(self, s=False, **get):
        # INFO: searches res.users table using ilike '%[s]%'.

        partner = request.env['res.partner'].sudo().search([('name', 'ilike', s)])
        result = []
        sleep(10)
        for rec in partner:
            result += [{
                'id': rec.id,
                'name': rec.name,
            }]
        # INFO: returns collected data or a -1 ID and a "not found" label if resulting query is empty.
        return result or [{'id': -1, 'name': 'not found'}]

    @http.route('/clear_cache', type='http', methods=['GET'], auth='public', csrf=False, cors='*')
    def clear_cache(self, **get):
        # registry(request.env.cr.dbname).clear_caches()
        model_name = get.get('model_name')
        model_name = request.env.get(model_name)
        if isinstance(model_name, models.BaseModel):
            _logger.warning('-o- > refreshing cache')
            model_name.clear_caches()
