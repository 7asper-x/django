from django.urls import path, include
from game.views.settings.get_info import get_info
from game.views.settings.login import login_user
from game.views.settings.logout import logout_user
from game.views.settings.register import register


urlpatterns = [
    path("get_info/", get_info, name="settings_get_info"),
    path("login/", login_user, name="settings_login"),
    path("logout/", logout_user, name="settings_logout"),
    path("register/", register, name="settings_register"),
]
