

from django.urls import path,include
from django.urls import path
from .views import getRecommendations, addToHistory
urlpatterns = [
    path('recommendations/<int:movie_Id>', getRecommendations, name = "get Recommendations"),
    path('addToHistory/<int:show_id>', addToHistory.as_view(), name ="Adding to History")

]