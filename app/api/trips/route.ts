import { auth } from "@/auth";
import { getCountryCoordinates } from "@/lib/actions/geocode";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: session.user.id,
          endDate: {
            lt: today // Only trips that ended before today
          }
        }
      },
      select: {
        locationTitle: true,
        lat: true,
        lng: true,
        trip: {
          select: {
            title: true,
            endDate: true
          }
        },
      },
    });

    if (!locations || locations.length === 0) {
      return NextResponse.json(
        { error: "No past travel locations found" },
        { status: 404 }
      );
    }

    const transformedLocations = await Promise.all(
      locations.map(async (loc) => {
        try {
          const geocodeResult = await getCountryCoordinates(loc.lat, loc.lng);
          return {
            lat: loc.lat,
            lng: loc.lng,
            name: `${loc.trip.title} (${loc.trip.endDate.toLocaleDateString()}) - ${loc.locationTitle}`,
            country: geocodeResult?.country || 'Unknown',
          };
        } catch (geocodeError) {
          console.error(`Geocoding failed for (${loc.lat}, ${loc.lng}):`, geocodeError);
          return {
            lat: loc.lat,
            lng: loc.lng,
            name: `${loc.trip.title} (${loc.trip.endDate.toLocaleDateString()}) - ${loc.locationTitle}`,
            country: 'Unknown',
          };
        }
      })
    );

    return NextResponse.json(transformedLocations);
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}