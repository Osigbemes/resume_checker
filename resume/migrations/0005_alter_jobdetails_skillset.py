# Generated by Django 4.1.5 on 2023-02-07 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0004_alter_jobdetails_skillset'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobdetails',
            name='skillSet',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
    ]
