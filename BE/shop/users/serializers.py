from rest_framework.serializers import ModelSerializer

from .models import User, Address


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password', 'is_staff')
        read_only_fields = ('is_staff', )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fields = ('name', 'address_line_1', 'address_line_2', 'city')
