# Firebase Authentication Setup

## 🚨 REQUIRED: Enable Authentication in Firebase Console

**Current Status**: Authentication methods are NOT enabled in your Firebase project.

### Steps to Fix the Error:

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/project/genresume-3c08c

2. **Enable Authentication**
   - Click "Authentication" in left sidebar
   - Click "Get started" button

3. **Enable Sign-in Methods** (CRITICAL STEP)
   - Go to "Sign-in method" tab
   - Click "Email/Password" → Toggle "Enable" → Click "Save"
   - Click "Google" → Toggle "Enable" → Set support email → Click "Save"

4. **Add Authorized Domains**
   - Go to "Settings" tab in Authentication
   - Scroll to "Authorized domains"
   - Add your Replit development URL
   - Add any future deployment domains

### Current Error
- Error: "OPERATION_NOT_ALLOWED"
- Cause: Authentication methods not enabled in Firebase console
- Solution: Complete steps 2-3 above

### Project Configuration (Correct)
- Project ID: genresume-3c08c
- API Key: AIzaSyBV-C5IMQfWQdZdzsrwkI1I4v79xvvYmQ8
- App ID: 1:324324177517:web:1f21d85db8962be5743164

### After Setup, You'll Have:
- Email/Password registration and login
- Google Sign-In
- Guest mode with local storage
- Automatic user session management