

from django.urls import path,include
from django.urls import path
from .views import getRecommendations
urlpatterns = [
    path('recommendations/<int:movie_Id>', getRecommendations, name = "get Recommendations")

]