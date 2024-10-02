from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import pickle,gzip

class RecommendationSystem:
    def __init__(self):
        self.cosine_sim_matrix = None
        self.movies_df = pd.read_csv('./merged_movies.csv')
        self.shows = pd.read_csv('./TMDB_tv_dataset_updated.csv')
        with gzip.open('./similarities.pkl.gz','rb') as f:
            self.cosine_sim_matrix  = pickle.load(f)
        _, self.indices  = pickle.load(open('./nn_result.pkl','rb'))
        # self.movies_df = pd.read()
    def getrecommendation(self, show_mov_id):
        try:
            idx = self.movies_df[self.movies_df['id'] == show_mov_id].index[0]
            cs_value = sorted(enumerate(self.cosine_sim_matrix[idx]),reverse=True, key = lambda x: x[1])[0:11]
            movie_indices = [i[0] for i in cs_value]
            return self.movies_df.iloc[movie_indices][['title','id']]
        except Exception as e: 
            print(e)
            try:
                # if show_mov_id not in self.shows['id'].values:
                #     return pd.DataFrame({'error':["No such data found"]})
                idx = self.shows[self.shows['id']==show_mov_id].index[0]
                shows_idx = self.indices[idx]
                return self.shows.iloc[shows_idx][['title','id']]
            except Exception as e:
                print(e)
                return pd.DataFrame({'error':["No such data found"]})
        