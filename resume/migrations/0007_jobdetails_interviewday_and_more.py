# Generated by Django 4.1.5 on 2023-02-09 22:38

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0006_alter_jobdetails_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobdetails',
            name='interviewDay',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='jobdetails',
            name='interviewTime',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
