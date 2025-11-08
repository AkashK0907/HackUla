@echo off
REM Set JAVA_HOME to Java 17 (update this path to your Java 17 installation)
set JAVA_HOME=C:\Program Files\Java\jdk-17

REM Update PATH to use Java 17
set PATH=%JAVA_HOME%\bin;%PATH%

REM Verify Java version
echo Using Java version:
java -version

REM Run gradle command with the specified Java version
gradlew.bat %*