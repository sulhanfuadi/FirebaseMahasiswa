# 📚 Firebase Mahasiswa App

Aplikasi React Native untuk mengelola data mahasiswa menggunakan Firebase Authentication dan Firestore sebagai database.

## ✨ Fitur

- 🔐 **Autentikasi**: Login dan Register menggunakan Firebase Auth
- 💾 **Persistent Storage**: Data session disimpan dengan MMKV
- 📊 **Data Mahasiswa**: Menampilkan daftar mahasiswa dari Firestore
- 🔄 **Pull to Refresh**: Refresh data dengan gesture pull-down
- 🎨 **Modern UI**: Antarmuka yang clean dan responsif

## 🛠️ Tech Stack

- **React Native** 0.82.1
- **Firebase** (Auth & Firestore)
- **React Navigation** 7.x
- **MMKV** - Fast & encrypted storage
- **TypeScript** support

## 📋 Prerequisites

Sebelum memulai, pastikan Anda sudah install:

- [Node.js](https://nodejs.org/) >= 20
- [JDK](https://www.oracle.com/java/technologies/downloads/) 17
- [Android Studio](https://developer.android.com/studio) (untuk Android)
- [Xcode](https://developer.apple.com/xcode/) (untuk iOS, hanya macOS)
- [CocoaPods](https://cocoapods.org/) (untuk iOS)

## 🚀 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd FirebaseMahasiswa
```

### 2. Install Dependencies

```bash
npm install
```

### 3. iOS Setup (macOS only)

```bash
# Install Ruby dependencies
bundle install

# Install CocoaPods dependencies
cd ios
bundle exec pod install
cd ..
```

### 4. Firebase Configuration ⚠️ **PENTING**

**File ini TIDAK di-commit ke Git untuk keamanan!**

#### Setup Google Services (Android):

1. Download `google-services.json` dari [Firebase Console](https://console.firebase.google.com/)
   - Pilih project Anda
   - Project Settings → General
   - Scroll ke bawah → Your apps → Android
   - Klik "Download google-services.json"

2. **Copy file ke lokasi yang benar:**
   ```bash
   # Windows
   copy path\to\downloaded\google-services.json android\app\google-services.json
   
   # macOS/Linux
   cp path/to/downloaded/google-services.json android/app/google-services.json
   ```

3. **JANGAN commit file ini ke Git!** (sudah ada di `.gitignore`)

#### Setup Google Services (iOS):

1. Download `GoogleService-Info.plist` dari Firebase Console
2. Drag & drop ke Xcode project (folder `TugasFirebaseMahasiswa`)
3. Pastikan "Copy items if needed" dicentang

#### Verifikasi Setup:

```bash
# Pastikan file ada
ls android/app/google-services.json  # macOS/Linux
dir android\app\google-services.json # Windows

# Pastikan TIDAK ter-track di git
git status android/app/google-services.json
# Output seharusnya: "nothing to commit"

### 5. Firestore Setup

1. Buka Firebase Console → Firestore Database
2. Buat collection baru: `mahasiswa`
3. Tambahkan beberapa data sample:

```json
{
  "nama": "John Doe",
  "nim": "123456789",
  "jurusan": "Teknik Informatika",
  "semester": 5
}
```

## 🏃 Running the App

### Start Metro

```bash
npm start
```

### Run Android

```bash
npm run android
```

### Run iOS (macOS only)

```bash
npm run ios
```

## 📱 Screenshots

### Login Screen
Halaman login dengan validasi email dan password

### Home Screen
Daftar mahasiswa dengan info lengkap (nama, NIM, jurusan, semester)

## 🗂️ Project Structure

```
FirebaseMahasiswa/
├── src/
│   ├── config/
│   │   └── storage.js          # MMKV storage configuration
│   ├── screens/
│   │   ├── LoginScreen.js      # Login & Register screen
│   │   └── HomeScreen.js       # Daftar mahasiswa
│   └── services/
│       ├── authService.js      # Firebase Auth functions
│       └── firestoreService.js # Firestore CRUD functions
├── android/                     # Android native code
├── ios/                         # iOS native code
└── App.tsx                      # Root component
```

## 🔧 Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🧹 Cleanup Build Files

Untuk membersihkan build files dan menghemat storage:

**Windows (CMD)**:
```cmd
rmdir /s /q android\app\build
rmdir /s /q android\.gradle
rmdir /s /q android\build
rmdir /s /q node_modules
```

**macOS/Linux**:
```bash
rm -rf android/app/build android/.gradle android/build
rm -rf ios/build ios/Pods
rm -rf node_modules
```

Kemudian reinstall:
```bash
npm install
cd ios && bundle exec pod install && cd ..
```

## 📝 Environment Variables

Create `.env` file (optional):

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```

## 🐛 Troubleshooting

### Build Failed

**Android:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**iOS:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

### Metro Bundler Issues

```bash
npm start -- --reset-cache
```

### Port Already in Use

```bash
npx react-native start --port 8082
```

## 📚 Dependencies

### Production
- `@react-native-firebase/app` - Firebase Core
- `@react-native-firebase/auth` - Authentication
- `@react-native-firebase/firestore` - Database
- `@react-navigation/native` - Navigation
- `react-native-mmkv` - Fast storage
- `react-native-safe-area-context` - Safe area handling
- `react-native-screens` - Native screens

### Development
- `@babel/core` - Babel compiler
- `@react-native/eslint-config` - ESLint config
- `prettier` - Code formatter
- `typescript` - Type checking

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Sulhan Fuadi**
- Email: your.email@example.com
- GitHub: [@sulhanfuadi](https://github.com/sulhanfuadi)

## 🙏 Acknowledgments

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

---

Made with ❤️ using React Native & Firebase