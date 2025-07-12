import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function TripsPage() {
    const session = await auth();

    const trips = await prisma.trip.findMany({
        where: { userId: session?.user?.id }
    });

    const sortedTrips = [...trips].sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcomingTrips = sortedTrips.filter(trip => new Date(trip.startDate) >= today);

    if (!session) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
                <p>Please sign in to view your trips.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 container mx-auto px-4 py-8">
            <div className="flex items-center justify-between sticky top-20 bg-white z-10 h-15">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <Link href="/trips/new">
                    <Button className="mt-4 cursor-pointer">New Trip</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Welcome Back, <span className="font-bold ">{session.user?.name}</span></CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        {trips.length === 0 ? "Start planning your trip by clicking the button above." :
                            `You have ${trips.length} ${trips.length === 1 ? "trip" : "trips"} planned. 
                            ${upcomingTrips.length > 0 ? `${upcomingTrips.length} upcoming.` : ""}`}
                    </p>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Recent Trips</h2>
                {trips.length === 0 ? (
                    <Card className="max-w-md mx-auto mt-6">
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <h3 className="text-xl font-medium mb-2">No trips found.</h3>
                            <p className="text-center mb-4 max-w-md text-gray-600">Start planning your adventure by creating your first trip.</p>
                            <Link href="/trips/new">
                                <Button className="mt-4 cursor-pointer">Create Trip</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedTrips.slice(0, 6).map((trip, key) => (
                            <Link key={key} href={`/trips/${trip.id}`} className="block">
                                <Card className="h-full hover:shadow-md transition-shadow duration-200 cursor-pointer">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{trip.title}</CardTitle>
                                        <CardContent>
                                            <Image
                                                src={trip.imageUrl ?? "/default-trip.png"}
                                                alt={trip.title}
                                                width={400}
                                                height={300}
                                                className="my-3 rounded-lg object-cover"
                                            />
                                            <p className="text-sm line-clamp-2 mb-2">{trip.description}</p>
                                            <div className="text-sm">
                                                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                            </div>
                                        </CardContent>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}