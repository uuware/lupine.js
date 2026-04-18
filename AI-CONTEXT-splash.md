# Lupine Games Icon & Splash Screen Automation Guide

**AI INSTRUCTION**: When the user requests to generate a splash screen or prepare icons for a new game, you MUST follow this exact, automated workflow rather than doing manual image manipulations.

## The Standard Icon Generation Workflow

**Step 1. Design & Confirm `icon.png`**
Wait for the user to provide a base square 1024x1024 logo (or use the generate_image tool). Wait for the user to confirm they are satisfied. Save this base file to `apps/<app_name>/web/assets/icon.png`.

**Step 2. Auto-Process All Asset Types (Node Script)**
Run the consolidated asset pipeline script located in the `dev/` directory. This script reads the newly created `icon.png`, strips the white background, and automatically generates all required files (`icon-only.png`, `icon-512.png`, `icon-background.png`, `favicon.ico`) directly into the assets folder.

```bash
node dev/process-app-icons.js <app_name>
# Example: node dev/process-app-icons.js lupine-sudoku
```

**Step 3. Compile Native Assets**
Let Capacitor's official tool crop the resolutions:

```bash
cd apps/<app_name>/web
npx @capacitor/assets generate
```

**Step 4. Apply Custom Android Display Patches**
To prevent image stretching on Android 12+ (HyperOS/HarmonyOS), run the style patcher script from the root directory:

```bash
cd ../../../
node dev/apply-android-splash.js <app_name>
```

---

## 2. Advanced: Manual Setup Reference (If Scripts Fail)

## 2. Configuration Files

### A. Fallback Bounds Layer

File: `android/app/src/main/res/drawable/splash_layer.xml`
Required to prevent infinite stretching on legacy/HarmonyOS devices.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@android:color/white" />
    <item android:width="256dp" android:height="256dp" android:gravity="center">
        <bitmap android:src="@mipmap/ic_launcher_foreground" android:gravity="fill" />
    </item>
</layer-list>
```

### B. Mipmap Proxy

File: `android/app/src/main/res/drawable/ic_splash_proxy.xml`
Required to bypass cross-directory IPC security checks during early splash.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<bitmap
  xmlns:android="http://schemas.android.com/apk/res/android"
  android:src="@mipmap/ic_launcher_foreground"
  android:gravity="center"
/>
```

### C. Legacy / HarmonyOS Theme (API <= 32)

File: `android/app/src/main/res/values/styles.xml`
Forces legacy background parsing and completely suppresses status/action bar injections.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<resources>
    <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
        <item name="android:background">@drawable/splash_layer</item>
        
        <!-- Suppress Default Action Bars -->
        <item name="android:windowNoTitle">true</item>
        <item name="android:windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="windowActionBar">false</item>
        
        <!-- Clear Notch/Cutout Letterboxing -->
        <item name="android:statusBarColor">#ffffff</item>
        <item name="android:windowLightStatusBar">true</item>
        <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>
        <item name="android:windowFullscreen">true</item>
    </style>
</resources>
```

### D. AOSP Standard Theme (API >= 33)

File: `android/app/src/main/res/values-v33/styles.xml`
Restores native Android 12+ Animated Splash standard specifically for modern compliant ROMs (e.g., Xiaomi HyperOS / Pixel).

```xml
<?xml version="1.0" encoding="utf-8" ?>
<resources>
    <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
        <item name="android:background">@drawable/splash_layer</item>
        
        <item name="windowSplashScreenBackground">#ffffff</item>
        <item name="windowSplashScreenAnimatedIcon">@drawable/ic_splash_proxy</item>
        <item name="android:windowSplashScreenBackground">#ffffff</item>
        <item name="android:windowSplashScreenAnimatedIcon">@drawable/ic_splash_proxy</item>
        
        <item name="android:windowNoTitle">true</item>
        <item name="android:windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="windowActionBar">false</item>
        
        <item name="android:statusBarColor">#ffffff</item>
        <item name="android:windowLightStatusBar">true</item>
        <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>
        <item name="android:windowFullscreen">true</item>
    </style>
</resources>
```

## 3. CI/CD Automated Injection Hook

To apply this setup automatically within a GitHub Action (without committing `android/` changes), execute this hook immediately after Android build dependencies are prepared:

```yaml
- name: Inject Custom SplashScreen Configurations
  working-directory: path/to/web
  run: |
    mkdir -p android/app/src/main/res/drawable
    mkdir -p android/app/src/main/res/values-v33

    cat <<EOF > android/app/src/main/res/drawable/splash_layer.xml
    <?xml version="1.0" encoding="utf-8"?>
    <layer-list xmlns:android="http://schemas.android.com/apk/res/android">
        <item android:drawable="@android:color/white" />
        <item android:width="256dp" android:height="256dp" android:gravity="center"><bitmap android:src="@mipmap/ic_launcher_foreground" android:gravity="fill" /></item>
    </layer-list>
    EOF

    cat <<EOF > android/app/src/main/res/drawable/ic_splash_proxy.xml
    <?xml version="1.0" encoding="utf-8"?>
    <bitmap xmlns:android="http://schemas.android.com/apk/res/android" android:src="@mipmap/ic_launcher_foreground" android:gravity="center" />
    EOF

    cat <<EOF > android/app/src/main/res/values-v33/styles.xml
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
        <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
            <item name="android:background">@drawable/splash_layer</item>
            <item name="windowSplashScreenBackground">#ffffff</item>
            <item name="windowSplashScreenAnimatedIcon">@drawable/ic_splash_proxy</item>
            <item name="android:windowSplashScreenBackground">#ffffff</item>
            <item name="android:windowSplashScreenAnimatedIcon">@drawable/ic_splash_proxy</item>
            <item name="android:windowNoTitle">true</item>
            <item name="android:windowActionBar">false</item>
            <item name="windowNoTitle">true</item>
            <item name="windowActionBar">false</item>
            <item name="android:statusBarColor">#ffffff</item>
            <item name="android:windowLightStatusBar">true</item>
            <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>
            <item name="android:windowFullscreen">true</item>
        </style>
    </resources>
    EOF

    node -e "const fs=require('fs'); const p='android/app/src/main/res/values/styles.xml'; let x=fs.readFileSync(p,'utf8'); x=x.replace(/<style name=\"AppTheme\.NoActionBarLaunch\".*?<\/style>/s, \`<style name=\"AppTheme.NoActionBarLaunch\" parent=\"Theme.SplashScreen\">\n        <item name=\"android:background\">@drawable/splash_layer</item>\n        <item name=\"android:windowNoTitle\">true</item>\n        <item name=\"android:windowActionBar\">false</item>\n        <item name=\"windowNoTitle\">true</item>\n        <item name=\"windowActionBar\">false</item>\n        <item name=\"android:statusBarColor\">#ffffff</item>\n        <item name=\"android:windowLightStatusBar\">true</item>\n        <item name=\"android:windowLayoutInDisplayCutoutMode\">shortEdges</item>\n        <item name=\"android:windowFullscreen\">true</item>\n    </style>\`); fs.writeFileSync(p, x);"
```
