
from django.contrib import admin
from django.urls import path,include
from api.views import createUser
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register', createUser.as_view(),name='create user'),
    path('api/token/', TokenObtainPairView.as_view(),name = 'get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(),name = 'get-new-access token'),
    path('api/',include('api.urls')),
]
