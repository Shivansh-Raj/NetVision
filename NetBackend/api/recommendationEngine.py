from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import pickle,gzip

class RecommendationSystem:
    def __init__(self):
        self.cosine_sim_matrix = None
        self.movies_df = pd.read_csv('./merged_movies.csv')
        with gzip.open('./similarities.pkl.gz','rb') as f:
            self.cosine_sim_matrix  = pickle.load(f)
        # self.movies_df = pd.read()
    def getrecommendation(self, movie_id):
        try:
            if movie_id not in self.movies_df['id'].values:
                return pd.DataFrame({"error":["No such Movies Found"] })
            idx = self.movies_df[self.movies_df['id'] == movie_id].index[0]
            cs_value = sorted(enumerate(self.cosine_sim_matrix[idx]),reverse=True, key = lambda x: x[1])[0:11]
            movie_indices = [i[0] for i in cs_value]
            return self.movies_df.iloc[movie_indices]
        except Exception as e: 
            return pd.DataFrame({"error":["No such Movies Found"] })
        