import contextlib

import simplejson as json
from flask import request
from flask_appbuilder import permission_name
from flask_appbuilder.api import expose
from flask_appbuilder.security.decorators import has_access

from superset import event_logger
from superset.superset_typing import FlaskResponse

from .base import BaseSupersetView


class MlandingView(BaseSupersetView):
    route_base = "/landing"
    class_permission_name = "Explore"

    @expose("/")
    @has_access
    @permission_name("read")
    @event_logger.log_this
    def root(self) -> FlaskResponse:
        return super().render_app_template()