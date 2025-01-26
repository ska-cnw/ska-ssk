@echo off


cd %~dp0

set addinName=%1

rem アドインを無効化
cscript /nologo 01_disable.vbs %addinName%.xlam

rem フォルダ削除
rmdir /s /q %addinName%

rem フォルダ作成
mkdir %addinName%

rem .xlamをフォルダにコピー
rem .xlamを.zipにリネーム
copy %addinName%.xlam %addinName%\%addinName%.zip >nul

rem フォルダへ移動
cd %addinName%

rem .zipを展開
"C:\Program Files\7-Zip\7z" x %addinName%.zip >nul

rem .zipを削除
del %addinName%.zip

cd ..
