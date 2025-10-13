Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$global:js = Invoke-WebRequest "https://tensyaku.github.io/creatures/bugdata.json"
$global:b = 0
$global:ar = @()
chcp 65001

$form = New-Object System.Windows.Forms.Form
$form.Text = "画像検索"
$form.Size = New-Object System.Drawing.Size(600,600)
$form.MaximumSize = $form.Size
$form.MinimumSize = $form.Size

$text = New-Object System.Windows.Forms.TextBox
$text.Location = New-Object System.Drawing.Point(0,0)
$text.Size = New-Object System.Drawing.Size(100,30)
$form.Controls.Add($text)

$btn = New-Object System.Windows.Forms.Button
$btn.Text = "検索"
$btn.Location = New-Object System.Drawing.Point(100,0)
$btn.Size = New-Object System.Drawing.Size(120,20)
$btn.Add_Click({
    if ($text.Text -ne "" -and $global:js.Content.IndexOf($text.Text) -ne -1) {
        $global:ar += $text.Text
        $link = -join("https://tensyaku.github.io/creatures/",$text.Text,".xhtml")
        $data = Invoke-RestMethod $link
        $bo = ($data."bug-article"."bug-data"."pic"."pdata"[0].length -eq 1)
        if ($bo) {
            $img = $data."bug-article"."bug-data"."pic"."pdata"
        } else {
            $a = $global:b + 1
            $btn.Text = -join("写真を見る(",$a,"枚目)")
            $img = $data."bug-article"."bug-data"."pic"."pdata"[$global:b]
            if ($data."bug-article"."bug-data"."pic"."pdata"[$global:b + 1] -ne $null) {
                $global:b += 1
            } else {
                $global:b = 0
            }
        }
        $cn = [System.Text.Encoding]::UTF8.GetString([System.Text.Encoding]::GetEncoding("ISO-8859-1").GetBytes($data."bug-article"."bug-data"."pic"."content"))
        $ja = [System.Text.Encoding]::UTF8.GetString([System.Text.Encoding]::GetEncoding("ISO-8859-1").GetBytes($data."bug-article"."bug-data"."ja-name"))
        $whe = [System.Text.Encoding]::UTF8.GetString([System.Text.Encoding]::GetEncoding("ISO-8859-1").GetBytes($data."bug-article"."bug-data"."where"))
        $pic.ImageLocation = $img
        if ($global:ar.Length -eq 1 -or $global:ar[$global:ar.Length-2] -ne $global:ar[$global:ar.Length-1]) {
            Write-Host ("これは",$whe,"にて撮影された",$ja,"の",$cn,"です") 
        }
    }
})
$form.Controls.Add($btn)

$pic = New-Object System.Windows.Forms.PictureBox
$pic.Location = New-Object System.Drawing.Point(50,30)
$pic.Size = New-Object System.Drawing.Size(500,570)
$pic.SizeMode = "Zoom"
$pic.ImageLocation = "https://tensyaku.github.io/creatures/header.png"
$form.Controls.Add($pic)


$form.ShowDialog()


