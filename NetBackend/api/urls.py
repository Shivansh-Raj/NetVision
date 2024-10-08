

from django.urls import path,include
from django.urls import path
from .views import getRecommendations, UserHistory, for_you
urlpatterns = [
    path('recommendations/<int:movie_Id>', getRecommendations, name = "get Recommendations"),
    path('UserHistory/<int:show_id>', UserHistory.as_view(), name ="Adding to History"),
    path('get_for_you', for_you, name ="For You"),

]