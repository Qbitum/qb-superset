import time
from flask_appbuilder.security.manager import AUTH_OAUTH
from flask import session
from flask import Flask
from requests_cache import timedelta

SECRET_KEY='k9i90xeIKK3feKxmp7g6xvOIqh6q5Cm5PiBi/9eDx03sn4G+okt33Jtv'
PREVIOUS_SECRET_KEY ="some_random_base64_string"
APP_NAME = "QB Analytics"

# Specify the App icon
APP_ICON = "/static/assets/images/makeit-logo.png"
FAVICONS = [{"href": "/static/assets/images/favicon.ico"}]

FEATURE_FLAGS: dict[str, bool] = {
    "CHART_PLUGINS_EXPERIMENTAL": False,
    "ALERT_REPORTS":True,
    "ENABLE_TEMPLATE_PROCESSING": True,
    "HORIZONTAL_FILTER_BAR":True
}
 
JINJA_CONTEXT_ADDONS = {
    "nowTime": lambda : "'"+time.strftime("%H:%M:%S", time.gmtime())+"'"
}

def make_session_permanent():
    '''
    Enable maxAge for the cookie 'session'
    '''
    session.permanent = True

PERMANENT_SESSION_LIFETIME = timedelta(hours=24)
def FLASK_APP_MUTATOR(app: Flask) -> None:
    app.before_request_funcs.setdefault(None, []).append(make_session_permanent)

# Enable OAuth authentication
# AUTH_TYPE = AUTH_OAUTH
# LOGOUT_REDIRECT_URL='https://productionadmindev.makeitmes.com/api/auth/realms/MES/protocol/openid-connect/logout'
# AUTH_USER_REGISTRATION = True
# AUTH_USER_REGISTRATION_ROLE = 'Gamma'
# # OAuth provider configuration for Keycloak
# OAUTH_PROVIDERS = [
#     {
#         'name': 'keycloak',
#         'icon': 'fa-key',
#         'token_key': 'access_token',  # Keycloak uses 'access_token' for the access token
#         'remote_app': {
#             'client_id': 'oi-application',
#             'client_secret': 'J8VoNP33pI4IUPUg59MPSs0DbPs1iHHK',
#             'client_kwargs': {
#                 'scope': 'openid profile email',
#             },
#             'server_metadata_url': 'https://productionadmindev.makeitmes.com/api/auth/realms/MES/.well-known/openid-configuration',
#             'api_base_url': 'https://productionadmindev.makeitmes.com/api/auth/realms/MES/protocol/',
#         },
#     }
#     ]