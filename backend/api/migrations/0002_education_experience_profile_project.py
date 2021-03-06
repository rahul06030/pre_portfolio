# Generated by Django 3.1.6 on 2021-05-29 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('college', models.TextField()),
                ('the_year', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('the_year', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('github', models.URLField(blank=True, default='', null=True)),
                ('linkedin', models.URLField(blank=True, null=True)),
                ('first_name', models.CharField(max_length=200)),
                ('last_name', models.CharField(blank=True, max_length=200)),
                ('date_of_birth', models.DateField()),
                ('email_address', models.EmailField(max_length=254)),
                ('phone_number', models.BigIntegerField(default=None)),
                ('bio', models.CharField(blank=True, default='', max_length=500)),
                ('instagram', models.URLField(blank=True, null=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('time_created', models.TimeField(auto_now_add=True)),
                ('updated_on', models.DateField(auto_now=True)),
                ('updated_at', models.TimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, max_length=200, null=True)),
                ('description', models.CharField(max_length=200)),
                ('image', models.ImageField(upload_to='projects/')),
                ('tools', models.CharField(max_length=200)),
                ('demo', models.URLField()),
                ('github', models.URLField()),
                ('show_in_slider', models.BooleanField(default=False)),
            ],
        ),
    ]
