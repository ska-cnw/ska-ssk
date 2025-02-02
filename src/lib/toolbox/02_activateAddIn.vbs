Dim addinName
addinName = WScript.Arguments(0)

Call activateAddIn


Sub activateAddIn
	Set Excel = GetObject(, "Excel.Application")

	For Each x In Excel.AddIns
		If x.Name = addinName Then
			x.Installed = True
		End If
	Next

	Set Excel = Nothing
End Sub
