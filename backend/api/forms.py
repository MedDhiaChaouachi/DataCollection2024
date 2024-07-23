from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from . models import Profile


class ProfileCreationForm(UserCreationForm):
    class Meta:
        model = Profile
        fields = ('username', 'email', 'photo', 'bio', 'role')

class ProfileChangeForm(UserChangeForm):
    class Meta:
        model = Profile
        fields = ('username', 'email', 'photo', 'bio', 'role')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            self.fields.get('role', None)  # Safely get 'role' field
            if 'role' in self.fields:
                self.fields['role'].disabled = True
