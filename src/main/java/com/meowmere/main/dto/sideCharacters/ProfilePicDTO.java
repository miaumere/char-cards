package com.meowmere.main.dto.sideCharacters;

public class ProfilePicDTO {
    public byte[] image;
    public String extension;

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }
}
