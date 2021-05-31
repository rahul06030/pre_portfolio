from django.urls import path
from . import views

urlpatterns = [
	path('', views.apiOverview, name="api-overview"),

	#			*****	Education	 *****

	path('education-list/', views.educationList, name="education-list"),
	# path('education-detail/<str:pk>/', views.educationDetail, name="education-detail"),
	path('education-create/', views.educationCreate, name="education-create"),
	path('education-update/<str:pk>/', views.educationUpdate, name="education-update"),
	# path('education-delete/<str:pk>/', views.educationDelete, name="education-delete"),

	#			*****	Experience	 *****

	path('experience-list/', views.experienceList, name="experience-list"),
	# path('experience-detail/<str:pk>/', views.experienceDetail, name="experience-detail"),
	path('experience-create/', views.experienceCreate, name="experience-create"),
	path('experience-update/<str:pk>/', views.experienceUpdate, name="experience-update"),
	# path('experience-delete/<str:pk>/', views.experienceDelete, name="experience-delete"),

	#			*****	Skill	 *****

	path('skill-list/', views.skillList, name="skill-list"),
	# path('skill-detail/<str:pk>/', views.skillnDetail, name="skill-detail"),
	path('skill-create/', views.skillCreate, name="skill-create"),
	path('skill-update/<str:pk>/', views.skillUpdate, name="skill-update"),
	# path('skill-delete/<str:pk>/', views.skillDelete, name="skill-delete"),

	#			*****	Profile	 *****

	path('profile-create/', views.profileCreate, name="profile-create"),
	path('profile-view/', views.profileDetail, name="profile-create"),
		path('profile-update/<str:pk>/', views.profileUpdate, name="profile-update"),


]
