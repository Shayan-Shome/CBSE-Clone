import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const enabled = process.env.SITE_ENABLED

  // If not explicitly set to 'true', block access
  if (enabled !== 'true') {
    return new NextResponse(
      `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Site Unavailable</title>
  <style>
    body { margin: 0; background: #f8f9fa; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif; }
    .box { text-align: center; color: #666; }
    h1 { font-size: 2rem; color: #333; }
  </style>
</head>
<body>
  <div class="box">
    <h1>Site Unavailable</h1>
    <p>This site is currently offline. Please check back later.</p>
  </div>
</body>
</html>`,
      { status: 503, headers: { 'Content-Type': 'text/html' } }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
