# Generated by Django 4.1.5 on 2023-02-08 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0005_alter_jobdetails_skillset'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobdetails',
            name='score',
            field=models.FloatField(blank=True, null=True),
        ),
    ]