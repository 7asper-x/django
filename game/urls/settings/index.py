from django.urls import path, include
from game.views.settings.get_info import InfoView
# from game.views.settings.login import login_user
# from game.views.settings.logout import logout_user
from game.views.settings.ranklist import RankListView
from game.views.settings.register import PlayerView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="settings_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="settings_token_refresh"),
    path("get_info/", InfoView.as_view(), name="settings_get_info"),
    # path("login/", login_user, name="settings_login"),
    # path("logout/", logout_user, name="settings_logout"),
    path("register/", PlayerView.as_view(), name="settings_register"),
    path("ranklist/", RankListView.as_view(), name="ranklist"),
    path("acwing/", include("game.urls.settings.acwing.index")),
]
