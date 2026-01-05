import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Prefer HEVY_API_KEY (server-side only) over NEXT_PUBLIC_HEVY_API_KEY for security
    const apiKey = process.env.HEVY_API_KEY || process.env.NEXT_PUBLIC_HEVY_API_KEY
    
    if (!apiKey) {
      console.error('HEVY_API_KEY not found. Checked HEVY_API_KEY and NEXT_PUBLIC_HEVY_API_KEY')
      return NextResponse.json(
        { error: 'HEVY_API_KEY is not configured. Please set HEVY_API_KEY or NEXT_PUBLIC_HEVY_API_KEY in your Vercel environment variables.' },
        { status: 500 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '1'
    const pageSize = searchParams.get('pageSize') || '10'

    const response = await fetch(
      `https://api.hevyapp.com/v1/workouts?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          'accept': 'application/json',
          'api-key': apiKey
        }
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Hevy API error: ${response.status} ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Hevy API proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workouts' },
      { status: 500 }
    )
  }
}

