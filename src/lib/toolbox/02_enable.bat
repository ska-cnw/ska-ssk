@echo off


cd %~dp0

set addinName=%1

rem フォルダへ移動
cd %addinName%

rem .zipに圧縮
"C:\Program Files\7-Zip\7z" a %addinName%.zip . >nul

rem .xlamにリネーム
rename %addinName%.zip %addinName%.xlam

rem .xlamを移動上書き
move /y %addinName%.xlam .. >nul

cd ..

rem アドインを有効化
cscript /nologo 02_enable.vbs %addinName%.xlam
