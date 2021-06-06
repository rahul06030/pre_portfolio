from django.db import models
# from __future__ import unicode_literals
from django.db import models
import re


class Education(models.Model):
  title = models.CharField(max_length=50, blank=False, null=False)
  college = models.TextField(blank=False, null=False)
  year = models.CharField(max_length=50, blank=False, null=False)

  def __str__(self):
      return self.title

class Experience(models.Model):
  title = models.CharField(max_length=50, blank=False, null=False)
  description = models.TextField(blank=False, null=False)
  year = models.CharField(max_length=50, blank=False, null=False)

  def __str__(self):
      return self.title

class Project(models.Model):
  title = models.CharField(max_length=200, blank=False, null=False)
  # slug = models.SlugField(max_length=200, blank=True, null=True)
  description = models.CharField(blank=False,max_length=200, null=False)
  tools = models.CharField(max_length=200, blank=False, null=False)
  github = models.URLField()
  image_url= models.CharField(max_length=500)

  def __str__(self):
      return self.title

  # def get_project_absolute_url(self):
  #     return "/projects/{}".format(self.slug)

  # def save(self, *args, **kwargs):
  #     self.slug = self.slug_generate()
  #     super(Project, self).save(*args, **kwargs)

  # def slug_generate(self):
  #     slug = self.title.strip()
  #     slug = re.sub(" ", "_", slug)
  #     return slug.lower()

# user = models.ForeignKey(settings.AUTH_USER_MODEL)

class Profile(models.Model):

  first_name = models.CharField(max_length=200)
  last_name = models.CharField(max_length=200, blank=True)
  date_of_birth = models.DateField()
  email_address = models.EmailField(max_length=254)
  phone_number = models.CharField(max_length=10, default=None)
  bio = models.CharField(blank=True, max_length=500,  default="" )
  github = models.URLField(blank=True, null=True,  default="")
  linkedin = models.URLField(blank=True, null=True)
  instagram = models.URLField(blank=True, null=True)
  date_created = models.DateField(auto_now_add=True)
  time_created = models.TimeField(auto_now_add=True)
  updated_on = models.DateField(auto_now=True)
  updated_at = models.TimeField(auto_now=True)

  def __str__(self):
    return  self.first_name	+ " " + self.last_name


class Skill(models.Model):
  name = models.CharField(max_length=50, blank=False, null=False)
  def __str__(self):
      return self.title
