import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { rollNo, schoolNo, admitCardId } = await req.json()

    if (!rollNo || !schoolNo || !admitCardId) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('students')
      .select('id, roll_no, school_no, admit_card_id')
      .eq('roll_no', rollNo.trim())
      .eq('school_no', schoolNo.trim())
      .eq('admit_card_id', admitCardId.trim().toUpperCase())
      .single()

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: 'No result found for the given credentials. Please verify and try again.' },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
