from rest_framework import permissions

from common.helpers import get_user_from_request


class AdminOnlyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = get_user_from_request(request)
        if user and user.is_staff:
            return True
        return False
