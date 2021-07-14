# -*- coding: utf-8 -*-
{
    'name': "Sensitive Search (snippet)",
    'summary': """Code showing how to make a minimal odoo sensitive search frontend field.""",
    'description': """
Code of this snippet is intended as a base example of how to develop a sensitive search field box:
it means an input search field returning a list of items that matches to substring just passed.
""",
    'author': "Filippo Iovine",
    'website': "https://www.rapsodoo.com",
    'category': 'Uncategorized',
    'version': '0.1',
    'depends': ['website_event'],
    'data': [
        'views/assets.xml',
        'views/event_templates_list.xml',
    ],
    'installable': True,
    'license': '',
}
