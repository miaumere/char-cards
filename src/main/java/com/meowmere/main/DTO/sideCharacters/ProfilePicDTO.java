package com.meowmere.main.DTO.sideCharacters;

public class ProfilePicDTO {
    public byte[] profilePic;
    public String extension;

    public byte[] getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(byte[] profilePic) {
        this.profilePic = profilePic;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }
}
