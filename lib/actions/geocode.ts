interface GeocodeResult {
    country: string;
    formattedAddress: string;
}

export async function getCountryCoordinates(
    lat: number,
    lng: number
): Promise<GeocodeResult> {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    // 1. Fixed the URL string (removed extra =&)
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    const data = await response.json();
    
    // 2. Check if we got results
    if (!data.results || data.results.length === 0) {
        return {
            country: "Unknown",
            formattedAddress: "Unknown location"
        };
    }

    const result = data.results[0];
    
    // 3. Fixed typo: addredd_components → address_components
    const countryComponent = result.address_components.find((component: any) =>
        component.types.includes("country")
    );

    return {
        country: countryComponent?.long_name || "Unknown",
        formattedAddress: result.formatted_address || "Unknown address"
    };
}