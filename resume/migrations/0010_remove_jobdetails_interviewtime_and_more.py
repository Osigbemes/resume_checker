# Generated by Django 4.1.5 on 2023-02-10 01:16

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0009_remove_jobdetails_user_jobdetails_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jobdetails',
            name='interviewTime',
        ),
        migrations.AlterField(
            model_name='jobdetails',
            name='interviewDay',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True),
        ),
    ]
