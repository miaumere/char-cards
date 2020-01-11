package com.meowmere.main.DTO.character.image;

public class ProfilePicForMainDTO {
    public String extension;
    public byte[] image;

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
