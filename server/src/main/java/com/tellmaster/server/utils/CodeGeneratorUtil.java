package com.tellmaster.server.utils;

public class CodeGeneratorUtil {

    public static String generateCode(String prefix, int index) {
        return prefix + String.format("%06d", index);
    }
}
