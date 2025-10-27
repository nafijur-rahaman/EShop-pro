
from django.urls import path
from .views import FirebaseLoginView

urlpatterns = [
    path('users/firebase-login/', FirebaseLoginView.as_view(), name='firebase-login'),
]
