from django.shortcuts import redirect, reverse
from django.core.cache import cache
from django.contrib.auth.models import User
from game.models.player.player import Player
from rest_framework_simplejwt.tokens import RefreshToken
# from django.contrib.auth import login
from random import randint
import requests


def receive_code(request):
    data = request.GET
    code = data.get('code')
    state = data.get('state')

    if not cache.has_key(state):
        return redirect("index")
    cache.delete(state)

    apply_access_token_url = "https://www.acwing.com/third_party/api/oauth2/access_token/"
    params = {
        'appid': "4109",
        'secret': "e8bd6f53c2534cf3828d3a7c290b3ba6",
        'code': code
    }

    access_token_res = requests.get(apply_access_token_url, params=params).json()

    access_token = access_token_res['access_token']
    openid = access_token_res['openid']

    players = Player.objects.filter(openid=openid)
    if players.exists():
        refresh = RefreshToken.for_user(players[0].user)
        # login(request, players[0].user)
        return redirect(reverse("index") + "?access=%s&refresh=%s" % (str(refresh.access_token), str(refresh)))

    get_userinfo_url = "https://www.acwing.com/third_party/api/meta/identity/getinfo/"
    params = {
        'access_token': access_token,
        'openid': openid,
    }
    userinfo_res = requests.get(get_userinfo_url, params=params).json()
    username = userinfo_res['username']
    photo = userinfo_res['photo']

    while User.objects.filter(username=username).exists():
        username += str(randint(0, 9))

    user = User.objects.create(username=username)
    Player.objects.create(user=user, photo=photo, openid=openid)

    refresh = RefreshToken.for_user(players[0].user)
    # login(request, user)

    redirect(reverse("index") + "?access=%s&refresh=%s" % (str(refresh.access_token), str(refresh)))
