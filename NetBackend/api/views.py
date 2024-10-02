
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
            print("**************",len(combined_recommendations))
            print("**************",combined_recommendations.drop_duplicates(subset=['title'],inplace=True))
            print("**************",len(combined_recommendations))
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
    # print("^^^^^^^^^^^^^^^^^^^^^^^^",recommendations_list)
    return JsonResponse(recommendations_list, safe=False)





# [{'name': 'Kanon', 'id': 72540, 'title': nan}, {'name': 'Chachi No.1', 'id': 237560, 'title': nan}, {'name': 'Chachi No.1', 'id': 237560, 'title': nan}, {'name': 'Chachi No.1', 'id': 237560, 'title': nan}, {'name': 'Chachi No.1', 'id': 237560, 'title': nan}, {'name': 'Shoujo Ramune', 'id': 85174, 'title': nan}, {'name': 'Al Aghar', 'id': 218886, 'title': nan}, {'name': 'Baka na Imouto wo Rikou ni Suru no wa Ore no XX Dake na Ken ni Tsuite', 'id': 77718, 'title': nan}, {'name': 'Kanojo no Ura Sekai', 'id': 122937, 'title': nan}, {'name': 'After... The Animation', 'id': 222654, 'title': nan}, {'name': 'Wednesday', 'id': 119051, 'title': nan}, {'name': 'The Addams Family', 'id': 12925, 'title': nan}, {'name': 'The Addams Family', 'id': 13015, 'title': nan}, {'name': 'The Shannara Chronicles', 'id': 64122, 'title': nan}, {'name': 'The New Addams Family', 'id': 21036, 'title': nan}, {'name': 'Smallville', 'id': 4604, 'title': nan}, {'name': 'Into the Badlands', 'id': 47450, 'title': nan}, {'name': 'Hotel Beau Séjour', 'id': 69190, 'title': nan}, {'name': 'The New Scooby-Doo Movies', 'id': 1068, 'title': nan}, {'name': 'Green Green', 'id': 21897, 'title': nan}, {'name': nan, 'id': 240, 'title': 'The Godfather: Part II'}, {'name': nan, 'id': 238, 'title': 'The Godfather'}, {'name': nan, 'id': 242, 'title': 'The Godfather: Part III'}, {'name': nan, 'id': 28, 'title': 'Apocalypse Now'}, {'name': nan, 'id': 592, 'title': 'The Conversation'}, {'name': nan, 'id': 2148, 'title': 'The Cotton Club'}, {'name': nan, 'id': 378237, 'title': "Amidst the Devil's Wings"}, {'name': nan, 'id': 78381, 'title': 'Twixt'}, {'name': nan, 'id': 102362, 'title': 'Dead Man Down'}, {'name': nan, 'id': 9686, 'title': 'New York Stories'}, {'name': nan, 'id': 29920, 'title': 'Easy Money'}, 
# {'name': nan, 'id': 680, 'title': 'Pulp Fiction'}, {'name': nan, 'id': 5, 'title': 'Four Rooms'}, {'name': nan, 'id': 500, 'title': 'Reservoir Dogs'}, {'name': nan, 'id': 393, 'title': 'Kill Bill: Vol. 2'}, {'name': nan, 'id': 273248, 'title': 'The Hateful Eight'}, {'name': nan, 'id': 29920, 'title': 'Easy Money'}, {'name': nan, 'id': 16869, 'title': 'Inglourious Basterds'}, {'name': nan, 'id': 184, 'title': 'Jackie Brown'}, {'name': nan, 'id': 24, 'title': 'Kill Bill: Vol. 1'}, {'name': nan, 'id': 755, 'title': 'From Dusk Till Dawn'}, {'name': nan, 'id': 285923, 'title': 'Grindhouse'}, {'name': nan, 'id': 129, 'title': 'Spirited Away'}, {'name': nan, 'id': 16690, 'title': 'Return to Never Land'}, {'name': nan, 'id': 4935, 'title': "Howl's Moving Castle"}, {'name': nan, 'id': 14517, 'title': 'Mirrormask'}, {'name': nan, 'id': 258755, 'title': 'Hidden Away'}, {'name': nan, 'id': 10991, 'title': 'Pokémon: Spell of the Unknown'}, {'name': nan, 'id': 12429, 'title': 'Ponyo'}, {'name': nan, 'id': 49519, 'title': 'The Croods'}, {'name': nan, 'id': 9023, 'title': 'Spirit: Stallion of the Cimarron'}, {'name': nan, 'id': 14175, 'title': 'Valiant'}, {'name': nan, 'id': 41513, 'title': 'The Smurfs'}, {'name': 'I Am Georgina', 'id': 156077, 'title': nan}, {'name': 'Teen Mom: The Next Chapter', 'id': 205026, 'title': nan}, {'name': 'Celebrity', 'id': 46100, 'title': nan}, {'name': 'Paulo Freire: Um Homem do Mundo', 'id': 212991, 
# 'title': nan}, {'name': '캐치! 티니핑', 'id': 137712, 'title': nan}, {'name': 'Manuel Rodríguez', 'id': 33427, 'title': 
# nan}, {'name': 'Asia Insight', 'id': 146955, 'title': nan}, {'name': 'Teen Mom: Family Reunion', 'id': 153524, 'title': 
# nan}, {'name': "Hitler's Henchmen", 'id': 70063, 'title': nan}, {'name': "Teen Mom: Girls' Night In", 'id': 153525, 'title': nan}, {'name': 'Stranger Things', 'id': 66732, 'title': nan}, {'name': 'ThirTEEN Terrors', 'id': 62460, 'title': nan}, {'name': 'Eerie, Indiana: The Other Dimension', 'id': 17082, 'title': nan}, {'name': 'Kanon', 'id': 72540, 'title': 
# nan}, {'name': 'To Be Continued', 'id': 66211, 'title': nan}, {'name': 'Kdabra', 'id': 55219, 'title': nan}, {'name': 'Marke Rose', 'id': 233810, 'title': nan}, {'name': 'Bisht, Please!', 'id': 71029, 'title': nan}, {'name': 'In/Spectre', 'id': 93653, 'title': nan}, {'name': 'Vanishing Son', 'id': 13219, 'title': nan}, {'name': nan, 'id': 238, 'title': 'The 
# Godfather'}, {'name': nan, 'id': 240, 'title': 'The Godfather: Part II'}, {'name': nan, 'id': 242, 'title': 'The Godfather: Part III'}, {'name': nan, 'id': 378237, 'title': "Amidst the Devil's Wings"}, {'name': nan, 'id': 13536, 'title': 'City By The Sea'}, {'name': nan, 'id': 11826, 'title': 'Sexy Beast'}, {'name': nan, 'id': 39210, 'title': 'Somewhere'}, {'name': nan, 'id': 29920, 'title': 'Easy Money'}, {'name': nan, 'id': 192134, 'title': 'Dom Hemingway'}, {'name': nan, 'id': 14112, 'title': 'Auto Focus'}, {'name': nan, 'id': 77987, 'title': 'Only God Forgives'}, {'name': 'Money Heist', 'id': 71446, 'title': nan}, {'name': '10 Bin Adım', 'id': 115597, 'title': nan}, {'name': 'Money Heist: From Tokyo to Berlin', 'id': 132719, 'title': nan}, {'name': 'Love on Top', 'id': 72830, 'title': nan}, {'name': 'Locked Up', 'id': 62455, 'title': nan}, {'name': 'Black Mirror', 'id': 42009, 'title': nan}, {'name': "History's Greatest Heists with Pierce Brosnan", 'id': 219382, 'title': nan}, {'name': 'Money Heist: Korea - Joint Economic Area', 'id': 112836, 'title': nan}, {'name': 'Antena 3 Noticias', 'id': 15337, 'title': nan}, {'name': 'Marching Orders', 'id': 81350, 'title': nan}]
# [02/Oct/2024 12:40:45] "GET /api/get_for_you HTTP/1.1" 200 5416
# [{'title': 'The Godfather', 'id': 238}, {'title': 'The Godfather: Part II', 'id': 240}, {'title': 'The Godfather: Part III', 'id': 242}, {'title': "Amidst the Devil's Wings", 'id': 378237}, {'title': 'City By The Sea', 'id': 
# 13536}, {'title': 'Sexy Beast', 'id': 11826}, {'title': 'Somewhere', 'id': 39210}, {'title': 'Easy Money', 'id': 29920}, {'title': 'Dom Hemingway', 'id': 192134}, {'title': 'Auto Focus', 'id': 14112}, {'title': 'Only God Forgives', 'id': 77987}]


