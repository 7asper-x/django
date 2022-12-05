from django.urls import path, include
from game.views.settings.get_info import get_info
from game.views.settings.login import login_user


urlpatterns = [
    path("get_info/", get_info, name="settings_get_info"),
    path("login/", login_user, name="settings_login"),
]
