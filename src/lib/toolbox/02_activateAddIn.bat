@echo off


cd %~dp0

set addinName=%1
set addinPath=%APPDATA%\Microsoft\AddIns
set addinWorkspace=%addinPath%\%addinName%
set activateVBS=02_activateAddIn.vbs

rem 作業フォルダのファイルを.zipに圧縮
cd %addinWorkspace%
"C:\Program Files\7-Zip\7z" a %addinName%.zip . >nul

rem 作業ファルダの.zipを.xlamとしてアドインフォルダへ移動
move /y %addinWorkspace%\%addinName%.zip %addinPath%\%addinName%.xlam >nul

rem アドインを有効化
cd %~dp0
cscript /nologo %activateVBS% %addinName%.xlam
