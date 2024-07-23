from django.contrib import admin
from . forms import ProfileCreationForm, ProfileChangeForm
from django.contrib.auth.admin import UserAdmin
from . models import Blog, Comment, Profile
from django.contrib.auth.models import Group
# Register your models here.

admin.site.site_header = "AnalyTica Admin Panel"
admin.site.site_title = "AnalyTica Admin Panel"
admin.site.unregister(Group)

class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'author', 'created_at', 'updated_at',
                    'publish_status', 'category', 'total_likes')

    list_filter = ('publish_status', 'category', 'created_at', 'updated_at')

    search_fields = ('title', 'content')


ADDITIONAL_USER_FIELDS = [
    (None, {'fields': ['photo', 'bio', 'role']}),
]

class ProfileAdmin(UserAdmin):
    add_form = ProfileCreationForm
    form = ProfileChangeForm
    model = Profile

    # Fields to be displayed in the list view of the admin
    list_display = ['username', 'email', 'photo', 'bio', 'role']
    
    # Fields to be displayed when adding a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'photo', 'bio', 'role'),
        }),
    )
    
    # Fields to be displayed when editing an existing user
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Profile info', {'fields': ('photo', 'bio', 'role')}),
    )
    search_fields = ['username', 'role']


admin.site.register(Blog, BlogAdmin)
admin.site.register(Comment)
admin.site.register(Profile, ProfileAdmin)
