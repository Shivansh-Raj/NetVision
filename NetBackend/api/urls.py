

from django.urls import path,include
from django.urls import path
from .views import getRecommendations, addToHistory, for_you
urlpatterns = [
    path('recommendations/<int:movie_Id>', getRecommendations, name = "get Recommendations"),
    path('addToHistory/<int:show_id>', addToHistory.as_view(), name ="Adding to History"),
    path('get_for_you', for_you, name ="For You"),

]