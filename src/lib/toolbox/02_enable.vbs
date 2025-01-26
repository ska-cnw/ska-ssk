Dim addinName
addinName = Wscript.Arguments(0)


Call ActivateAddIn


Sub ActivateAddIn
	Set Excel = GetObject(, "Excel.Application")
	For Each x In Excel.AddIns
		If x.Name = addinName Then
			x.Installed = True
		End If
	Next
End Sub
