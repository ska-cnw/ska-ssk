@echo off


cd %~dp0

set addinName=%1
set addinPath=%APPDATA%\Microsoft\AddIns
set addinWorkspace=%addinPath%\%addinName%
set deactivateVBS=01_deactivateAddIn.vbs

rem アドインを無効化
cscript /nologo %deactivateVBS% %addinName%.xlam

rem 作業フォルダを空にする
rmdir /s /q %addinWorkspace%
mkdir %addinWorkspace%

rem 作業フォルダに.xlamを.zipとしてコピー
copy %addinPath%\%addinName%.xlam %addinWorkspace%\%addinName%.zip >nul

rem 作業フォルダに.zipを展開(.zipは削除)
cd %addinWorkspace%
"C:\Program Files\7-Zip\7z" x %addinName%.zip >nul
del %addinWorkspace%\%addinName%.zip

cd %~dp0
