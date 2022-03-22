from django.shortcuts import render
from django.http import JsonResponse
from agora_token_builder import RtcTokenBuilder
import random
import time


def getToken(request):
    appId = "7e88ffb3c167414f8e4451793167c0bf"
    appCertificate = '37e558a8f8cb431081f5ebf51f2060cb'
    channelName = request.GET.get('channel')
    uid = random.randint(1, 230)
    expirationTimeInSeconds = 3600 * 24
    currentTimeStamp = time.time()
    privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds
    role = 1

    token = token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({"token": token, "uid": uid}, safe=False)


def lobby(request):
    return render(request, 'base/lobby.html')


def room(request):
    return render(request, 'base/room.html')
