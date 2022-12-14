from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from game.models.player.player import Player


class InfoView(APIView):
    permission_classes = ([IsAuthenticated])

    def get(self, request):
        user = request.user
        player = Player.objects.get(user=user)

        return Response({
            'result': "success",
            'username': user.username,
            'photo': player.photo,
        })

# from django.http import JsonResponse
# from game.models.player.player import Player
#
#
# def get_info_acapp(request):
#     player = Player.objects.all()[0]
#     return JsonResponse({
#         'result': "success",
#         'username': player.user.username,
#         'photo': player.photo
#     })
#
#
# def get_info_web(request):
#     user = request.user
#     if not user.is_authenticated:
#         return JsonResponse({
#             'result': "not logged in",
#         })
#     else:
#         player = Player.objects.get(user=user)
#         return JsonResponse({
#             'result': "success",
#             'username': player.user.username,
#             'photo': player.photo
#         })
#
#
# def get_info(request):
#     platform = request.GET.get('platform')
#     if platform == "ACAPP":
#         return get_info_acapp(request)
#     elif platform == "WEB":
#         return get_info_web(request)
