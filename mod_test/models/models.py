# -*- coding: utf-8 -*-

from odoo import models, fields


class T0001(models.Model):
    _name = 't0001'

    name = fields.Char('name', required=True)
    description = fields.Char('description')
    help = fields.Char('help')
    help2 = fields.Char('help')
    help3 = fields.Char('help')


class ResPartner(models.Model):
    _inherit = 'res.partner'

    def create(self, vals_list):
        return super(ResPartner, self).create(vals_list)