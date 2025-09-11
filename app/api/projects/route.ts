import { NextResponse } from "next/server"
import { getAllProjects } from "@/lib/github"

export async function GET() {
  try {
    const projects = await getAllProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json([], { status: 500 })
  }
}
