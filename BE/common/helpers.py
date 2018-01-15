from rest_framework_jwt.utils import jwt_decode_handler

from users.models import User
from users.serializers import UserSerializer


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }


def get_token_from_request(request):
    auth = request.META.get('HTTP_AUTHORIZATION', '').split()
    if len(auth) == 2:
        return auth[1]
    return None


def get_user_from_token(token):
    data = jwt_decode_handler(token)
    user_id = data.get('user_id')
    if user_id:
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None
    return None


def get_user_from_request(request):
    token = get_token_from_request(request)
    if token:
        return get_user_from_token(token)
    return None
