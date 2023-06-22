from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(),name='token_refresh'),
    path('register/',views.RegisterView.as_view(), name='auth_register'),
    path('settime/<username>',views.SetView.as_view(), name='setting_time'),
    path('refresh/<username>',views.GetView.as_view(),name='refresh'),
    path('', views.getRoutes)
]
 