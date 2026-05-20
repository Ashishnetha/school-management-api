function calculateDistance(lat1, lon1, lat2, lon2){

    const radians = (deg) => {
        return deg * (Math.PI / 180);
    };

    const R = 6371;

    const dLat = radians(lat2 - lat1);
    const dLon = radians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(radians(lat1)) *
        Math.cos(radians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

module.exports = calculateDistance;