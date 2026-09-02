$f = "c:\Users\aakas\OneDrive\Documents\clean energy portal\index.html"
$c = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)

# Remove BOM if present
$c = $c.TrimStart([char]0xFEFF)

# Fix all garbled sequences using byte-level replacements
$fixes = @{
    "\u00e2\u00ad\u0090" = "&#11088;"   # ⭐
    "\u00e2\u009a\u00a1" = "&#9889;"    # ⚡
    "\u00c3\u00b8"       = "ph"          # Ø
    "\u00c3\u0097"       = "x"           # ×
    "\u00e2\u0080\u0094" = "-"           # —
    "\u00e2\u0080\u0093" = "-"           # –
    "\u00e2\u0080\u00a2" = "-"           # •
    "\u00e2\u0086\u0092" = "->"          # →
    "\u00e2\u0080\u00a6" = "..."         # …
    "\u00e2\u0080\u0099" = "'"           # '
    "\u00c2\u00a9"       = "(c)"         # ©
    "\u00c2\u00b7"       = "."           # ·
}

foreach ($k in $fixes.Keys) {
    $c = $c.Replace($k, $fixes[$k])
}

# Fix specific visible garbled patterns
$c = $c -replace 'â[^\s<"]*', '' 
$c = $c -replace 'ð[^\s<"]*', ''
$c = $c -replace 'Ã[^\s<"]*', ''
$c = $c -replace 'â€[^\s<"]*', '-'

[System.IO.File]::WriteAllText($f, $c, [System.Text.UTF8Encoding]::new($false))
Write-Host "Done"
