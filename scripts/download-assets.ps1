$ErrorActionPreference = "Stop"

$assets = @{
  # SVG icons (24x24 mostly)
  "icons/arrow-left.svg"        = "https://www.figma.com/api/mcp/asset/51c21c23-1a38-4543-b60a-be697f85f027"
  "icons/arrow-down.svg"        = "https://www.figma.com/api/mcp/asset/fe7d3d26-fdac-428a-9951-28bce934f612"
  "icons/camera.svg"            = "https://www.figma.com/api/mcp/asset/c69a6a14-c9c8-4730-b746-8db20657cd93"
  "icons/passport.svg"          = "https://www.figma.com/api/mcp/asset/94c8af63-5bcf-4c63-9839-5bbb7fe26b66"
  "icons/passport-download.svg" = "https://www.figma.com/api/mcp/asset/0170448e-3f6e-4964-b156-0c5aa8589067"
  "icons/checkmark-circle.svg"  = "https://www.figma.com/api/mcp/asset/7d7c3038-469d-4dd6-8ff5-2c0cbf30fb99"
  "icons/wallet.svg"            = "https://www.figma.com/api/mcp/asset/89c76527-5cdf-4d62-8b47-f44f06a2287b"
  "icons/notification.svg"      = "https://www.figma.com/api/mcp/asset/d17fc014-0aa5-4980-b439-f8be03e79f1c"
  "icons/dashboard.svg"         = "https://www.figma.com/api/mcp/asset/c38f6886-147a-4a9c-ac7c-0bd9eaf1fe0c"
  "icons/hotel.svg"             = "https://www.figma.com/api/mcp/asset/3d334b49-6a2b-4cec-b081-b47dcfe16bcb"
  "icons/search.svg"            = "https://www.figma.com/api/mcp/asset/fdedaefe-8fa4-4ccc-8b12-2e057cd837b4"
  "icons/location.svg"          = "https://www.figma.com/api/mcp/asset/456fa3f1-7605-40c6-a063-52e65afa8683"
  "icons/wallet-card.svg"       = "https://www.figma.com/api/mcp/asset/4e3f180e-77fa-4074-9bce-a3887deb692e"
  "icons/identity-card-sm.svg"  = "https://www.figma.com/api/mcp/asset/4b4ce092-812c-47c5-a777-8ef2ee530515"

  # Decorative ID-card pattern shapes
  "patterns/petal.svg"          = "https://www.figma.com/api/mcp/asset/2f6d0ad2-5346-483b-ac86-cbfa24a07700"
  "patterns/diamond.svg"        = "https://www.figma.com/api/mcp/asset/e983cbea-1bec-48e4-b568-3c1065761cd4"
  "patterns/leaf.svg"           = "https://www.figma.com/api/mcp/asset/2b383d57-7d2d-4ae6-95f5-a866db39e234"

  # Illustration images (PNG, with alpha)
  "img/correct.png"             = "https://www.figma.com/api/mcp/asset/5a2b0916-6513-4bdb-afc0-b94cd43b9e61"
  "img/qr-code.png"             = "https://www.figma.com/api/mcp/asset/3114a467-7ac8-4ec9-8a1b-e5846258caf3"
  "img/wallet-illu.png"         = "https://www.figma.com/api/mcp/asset/70b2c455-2e2e-4ee8-b8f6-fb201aec5470"
  "img/id-card-illu.png"        = "https://www.figma.com/api/mcp/asset/748c6b0b-905a-41b0-9efc-5dae623267f7"
  "img/folder.png"              = "https://www.figma.com/api/mcp/asset/531d5960-fed2-4505-80b7-4eb7f30d7822"
  "img/profile-avatar.png"      = "https://www.figma.com/api/mcp/asset/a3ca3748-99aa-4a8e-ad53-00e88736cf19"
  "img/profile-id.png"          = "https://www.figma.com/api/mcp/asset/38f8bf1e-913d-40d9-9c67-999c274579e9"
  "img/hotel-1.png"             = "https://www.figma.com/api/mcp/asset/4df86217-d6f3-4835-91f9-d324a4756ab1"
  "img/hotel-2.png"             = "https://www.figma.com/api/mcp/asset/51da425a-47ca-4a13-a125-7cf3c31b315d"
  "img/confetti.png"            = "https://www.figma.com/api/mcp/asset/c4620045-be25-47ab-80c3-3b93a3f2ce6e"
}

$base = "public/figma"
foreach ($rel in $assets.Keys) {
  $out = Join-Path $base $rel
  $dir = Split-Path -Parent $out
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  if (Test-Path $out) {
    Write-Host "skip   $rel (exists)"
    continue
  }
  try {
    Invoke-WebRequest -Uri $assets[$rel] -OutFile $out -UseBasicParsing -TimeoutSec 60
    Write-Host "ok     $rel"
  } catch {
    Write-Host "FAIL   $rel - $($_.Exception.Message)"
  }
}
Write-Host "done"
