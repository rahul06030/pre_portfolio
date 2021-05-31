from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import EducationSerializer, ExperienceSerializer,ProfileSerializer, SkillSerializer

from .models import Education,Profile, Experience, Skill
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/education-list/',
		'Detail View':'/education-detail/<str:pk>/',
		'Create':'/education-create/',
		'Update':'/education-update/<str:pk>/',
		'Delete':'/education-delete/<str:pk>/',
		}

	return Response(api_urls)

	#		**********		Education		**********


@api_view(['GET'])
def educationList(request):
	educations = Education.objects.all().order_by('-id')
	serializer = EducationSerializer(educations, many=True)
	return Response(serializer.data)


@api_view(['POST'])
def educationCreate(request):
	serializer = EducationSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['POST'])
def educationUpdate(request, pk):
	education = Education.objects.get(id=pk)
	serializer = EducationSerializer(instance=education, data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)


	#		**********		profile		**********


@api_view(['POST'])
def profileCreate(request):
	serializer = ProfileSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['GET'])
def profileDetail(request):
	profile = Profile.objects.first()
	serializer = ProfileSerializer(profile, many=False)
	return Response(serializer.data)

@api_view(['POST'])
def profileUpdate(request, pk):
	profile =  Profile.objects.get(id=pk)
	serializer = ProfileSerializer(instance=profile, data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

	#		**********		Experience		**********


@api_view(['GET'])
def experienceList(request):
	educations =  Experience.objects.all().order_by('-id')
	serializer = ExperienceSerializer(educations, many=True)
	return Response(serializer.data)


@api_view(['POST'])
def experienceCreate(request):
	serializer =ExperienceSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['POST'])
def experienceUpdate(request, pk):
	experience =  Experience.objects.get(id=pk)
	serializer = ExperienceSerializer(instance=experience, data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

	#		**********		Skill		**********


@api_view(['GET'])
def skillList(request):
	skills = Skill.objects.all().order_by('-id')
	serializer = SkillSerializer(skills, many=True)
	return Response(serializer.data)


@api_view(['POST'])
def skillCreate(request):
	serializer = SkillSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['POST'])
def skillUpdate(request, pk):
	skill = Skill.objects.get(id=pk)
	serializer = SkillSerializer(instance=skill, data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)
