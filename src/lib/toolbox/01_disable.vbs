Dim addinName
addinName=Wscript.Arguments(0)

Call DeactivateAddIn


Sub DeactivateAddIn
	Set Excel = GetObject(, "Excel.Application")
	For Each x In Excel.AddIns
		If x.Name = addinName Then
			x.Installed = False
		End If
	Next
End Sub
