# Generated by Django 4.1.5 on 2023-02-02 09:51

from django.db import migrations, models
import django_mysql.models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0002_remove_jobdetails_skill_jobdetails_skillset'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobdetails',
            name='skillSet',
            field=django_mysql.models.ListCharField(models.CharField(max_length=10), blank=True, max_length=66, null=True, size=6),
        ),
    ]
