from flask_appbuilder.security.sqla.models import User
from sqlalchemy import Column,String

class OIUser(User):
    __tablename__ = 'ab_user'
    factory_id = Column(String(256))