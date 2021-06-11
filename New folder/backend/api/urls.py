from django.urls import path
from . import views
from django.conf.urls.static import static

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

	#			*****	Project	 *****
	path('project-list/', views.projectList, name="project-list"),
	# path('project-detail/<str:pk>/', views.projectDetail, name="project-detail"),
	path('project-create/', views.projectCreate, name="project-create"),
	path('project-update/<str:pk>/', views.projectUpdate, name="project-update"),
	# path('project-delete/<str:pk>/', views.projectDelete, name="project-delete"),

	#			*****	Course	 *****

	path('course-list/', views.courseList, name="course-list"),
	# path('course-detail/<str:pk>/', views.courseDetail, name="course-detail"),
	path('course-create/', views.courseCreate, name="course-create"),
	path('course-update/<str:pk>/', views.courseUpdate, name="course-update"),
	# path('course-delete/<str:pk>/', views.courseDelete, name="course-delete"),

]

