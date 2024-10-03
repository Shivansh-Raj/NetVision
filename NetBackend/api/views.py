
from .serializers import userSerializer, historySerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import history
from .recommendationEngine import RecommendationSystem
from django.http import JsonResponse
import random
import pandas as pd

class createUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer
    permission_classes = [AllowAny]

# @api_view(['PUT'])
class addToHistory(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, show_id):
        try:
            user = request.user
            print(f"---------------Current user: {user}") 
            data = {
                'showId':show_id
            }
            serializer = historySerializer(data=data, context={'request': request})
            if (serializer.is_valid()):
                history_entry = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error":e},status=status.HTTP_400_BAD_REQUEST)
    def get(self, request,show_id=None):
        try:
            user = request.user
            data = history.objects.filter(user_name = user).order_by('-watched_at')
            # print(data)
            if data:
                for i in data:
                    print("---------------------------",i.showId)
                if(len(data) >30):
                    history_list = list(data[:30].values())
                else :
                    history_list = list(data.values())
                # return Response(history_list, status=status.HTTP_200_OK)
                return JsonResponse(history_list, safe=False)

            else:
                return Response({"message": "No history found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print("No history found")
            print("----error",str(e))
            return Response({"----error":str(e)},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET']) 
@permission_classes([IsAuthenticated])
def for_you(request):
    try:
        user = request.user
        recommender = RecommendationSystem()
        data = history.objects.filter(user_name = user).order_by('-watched_at')
        result = []
        length = len(data)
        counter = 1
        i = 0
        while (counter < 10 and i < length):
            recommendations = recommender.getrecommendation(data[i].showId)
            i += 1
            if (len(recommendations) > 2):
                counter += 1
                result.append(recommendations)
            else:
                print("Not enough for recommendations")
                # return Response({"message": "Nothing to recommend"}, status=status.HTTP_404_NOT_FOUND)
        if result:
            random.shuffle(result)
            random.shuffle(result)
            result = result
            # pd.concat() is a function in pandas that is used to concatenate (or combine) multiple pandas objects (like DataFrames or Series) along a particular axis
            combined_recommendations = pd.concat(result, ignore_index=True)
            if (len(combined_recommendations) > 25) :
                combined_recommendations = combined_recommendations[0:25]
            recommendations_list = combined_recommendations.to_dict(orient='records')
            return JsonResponse(recommendations_list, safe=False)
        else:
            print("No recommednations")
            return Response({"message": "Nothing to recommend"}, status=status.HTTP_404_NOT_FOUND)   
    except Exception as e:
        print("------error",str(e))
        return Response({"----error":str(e)},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET']) 
@permission_classes([AllowAny])
def getRecommendations(request, movie_Id):
    
    recommender = RecommendationSystem()
    recommendations = recommender.getrecommendation(movie_Id)
    '''recommendations.to_dict(orient='records') converts the DataFrame
     to a list of dictionaries. Each dictionary represents a row in the 
     DataFrame, with column names as keys and cell values as values.'''
    recommendations_list = recommendations.to_dict(orient='records')
    return JsonResponse(recommendations_list, safe=False)










