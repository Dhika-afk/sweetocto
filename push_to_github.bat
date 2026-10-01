@echo off
REM Script otomatis untuk push seluruh source code ke GitHub (Windows)
echo =========================================
echo    Pushing all source code to GitHub
echo =========================================

REM 1. Inisialisasi git jika belum
if not exist ".git" (
    echo Menginisialisasi Git...
    git init
)

REM 2. Ubah branch ke main
git branch -M main

REM 3. Tambahkan semua file (termasuk folder src, public, assets)
echo Menambahkan seluruh file...
git add -A

REM 4. Tampilkan status file
git status -s

REM 5. Commit seluruh file
echo Membuat commit...
git commit -m "feat: complete interactive gift world for Ola with full source code"

REM 6. Cek remote origin
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    set /p REPO_URL="Masukkan URL Repository GitHub Anda (contoh: https://github.com/username/repo.git): "
    git remote add origin %REPO_URL%
)

REM 7. Push seluruh file ke GitHub
echo Mengunggah ke GitHub...
git push -u origin main --force

echo.
echo =========================================
echo    Selesai! Seluruh source code ter-push!
echo =========================================
pause
