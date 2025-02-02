Dim addinName
addinName = WScript.Arguments(0)

WScript.Sleep 1000
Call deactivateAddIn
WScript.Sleep 1000
Call activateAddIn


Sub deactivateAddIn
	Set Excel = GetObject(, "Excel.Application")

	For Each x In Excel.AddIns
		If x.Name = addinName Then
			x.Installed = False
		End If
	Next

	Set Excel = Nothing
End Sub

Sub activateAddIn
	Set Excel = GetObject(, "Excel.Application")

	For Each x In Excel.AddIns
		If x.Name = addinName Then
			x.Installed = True
		End If
	Next

	Set Excel = Nothing
End Sub
