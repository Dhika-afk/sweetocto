#!/bin/bash
# Script untuk push seluruh source code ke GitHub

echo "========================================="
echo "   Pushing all source code to GitHub     "
echo "========================================="

# 1. Cek git repository
if [ ! -d ".git" ]; then
  echo "Menginisialisasi Git..."
  git init
fi

# 2. Pastikan branch main
git branch -M main

# 3. Stage seluruh file (src, public, assets, config, dll)
echo "Menambahkan semua file ke Git..."
git add -A

# 4. Tampilkan file yang akan di-commit
git status -s

# 5. Commit perubahan
echo "Membuat commit..."
git commit -m "feat: complete interactive gift world for Ola with full source code" || true

# 6. Meminta URL repository jika belum diset
REMOTE_URL=$(git remote get-url origin 2>/dev/null)
if [ -z "$REMOTE_URL" ]; then
  echo ""
  echo "Masukkan URL Repository GitHub Anda (contoh: https://github.com/username/repo-name.git):"
  read -r USER_REPO_URL
  git remote add origin "$USER_REPO_URL"
fi

# 7. Push paksa seluruh file ke branch main
echo "Mengunggah seluruh file ke GitHub..."
git push -u origin main --force

echo ""
echo "========================================="
echo "   Selesai! Semua file berhasil di-push! "
echo "========================================="
