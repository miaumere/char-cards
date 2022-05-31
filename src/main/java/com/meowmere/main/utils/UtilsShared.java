package com.meowmere.main.utils;

import java.io.File;
import java.util.Base64;


public class UtilsShared {

    public static String _mainDir = null;

    public static String GetMainDir(){
            if(UtilsShared._mainDir == null) {

                String path = new File("").getAbsolutePath();
                String separator = System.getProperty("file.separator");
                if(!path.endsWith(separator)) {
                    path += separator;
                }

                UtilsShared._mainDir = path;
            }


            return UtilsShared._mainDir;
    }

    public static String GetProfilePicBase64Code(String extension, byte[] image) {
        if(extension == null || image == null) {
            return "";
        }

        return "data:image/" + extension + ";base64," + Base64.getEncoder().encodeToString(image);
    }
}
