from django.urls import path
from .views import ReviewListCreateView, ReviewDetailView, UserReviewListView

urlpatterns = [
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('reviews/<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),
    path('review/user/<int:user_id>/', UserReviewListView.as_view(), name='user-reviews'),
]
