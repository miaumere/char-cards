package com.meowmere.main.utils;

import java.io.File;

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
}
