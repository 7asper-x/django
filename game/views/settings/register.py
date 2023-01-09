from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from game.models.player.player import Player


class PlayerView(APIView):
    def post(self, request):
        data = request.POST
        username = data.get("username", "").strip()
        password = data.get("password", "").strip()
        password_confirm = data.get("password_confirm", "").strip()
        if not username or not password or not password_confirm:
            return Response({
                'result': "can't be empty"
            })
        if password != password_confirm:
            return Response({
                'result': "passwords don't match"
            })
        if User.objects.filter(username=username).exists():
            return Response({
                'result': "username exists"
            })

        user = User(username=username)
        user.set_password(password)
        user.save()

        Player.objects.create(user=user, photo="https://e1.pngegg.com/pngimages/401/429/png-clipart-sharingan-all-files"
                                               "-mangekyo-sharingan.png")
        return Response({
            'result': "success",
        })

# from django.contrib.auth import login
# from django.http import JsonResponse
# from django.contrib.auth.models import User
# from game.models.player.player import Player
#
#
# def register(request):
#     data = request.GET
#     username = data.get("username", "").strip()
#     password = data.get("password", "").strip()
#     password_confirm = data.get("password_confirm", "").strip()
#     if not username or not password or not password_confirm:
#         return JsonResponse({
#             'result': "can't be empty"
#         })
#     if password != password_confirm:
#         return JsonResponse({
#             'result': "passwords don't match"
#         })
#     if User.objects.filter(username=username).exists():
#         return JsonResponse({
#             'result': "username exists"
#         })
#
#     user = User(username=username)
#     user.set_password(password)
#     user.save()
#
#     Player.objects.create(user=user, photo="https://e1.pngegg.com/pngimages/401/429/png-clipart-sharingan-all-files"
#                                            "-mangekyo-sharingan.png")
#     login(request, user)
#     return JsonResponse({
#         'result': "success",
#     })
