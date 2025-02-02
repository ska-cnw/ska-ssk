Dim addinName
addinName = WScript.Arguments(0)

Call deactivateAddIn


Sub deactivateAddIn
	Set Excel = GetObject(, "Excel.Application")

	For Each x In Excel.AddIns
		If x.Name = addinName Then
			x.Installed = False
		End If
	Next

	Set Excel = Nothing
End Sub
