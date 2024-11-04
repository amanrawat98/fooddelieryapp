import { useMemo } from 'react';
import { useSelector } from 'react-redux';

function useRestaurantInfo() {
    const theme = useSelector((state) => state.theme.themeData);
    const { selectedOutlet, restaurantOutlets } = useSelector((state) => state.outlet);

    const outletData = restaurantOutlets?.[selectedOutlet] || {};

    const personalInfo = useMemo(() => ({
        phone: outletData?.phone,
        email: outletData?.email
    }), [outletData?.phone, outletData?.email]);

    const address = useMemo(() => {
        const addressParts = [
            outletData?.street,
            outletData?.street1,
            outletData?.city,
            outletData?.state,
            outletData?.zip,
            outletData?.country
        ].filter(Boolean);
        return addressParts.join(', ');
    }, [
        outletData?.street,
        outletData?.street1,
        outletData?.city,
        outletData?.state,
        outletData?.zip,
        outletData?.country
    ]);

    const formatTime = (time) => {
        if (!time) return 'N/A';
        const [hour, minute] = time.split(':').map(Number);
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute < 10 ? '0' : ''}${minute} ${period}`;
    };

    const availableTime = useMemo(() => {
        const { orderAcceptStartTime, orderAcceptEndTime } = outletData;
        return orderAcceptStartTime && orderAcceptEndTime
            ? `${formatTime(orderAcceptStartTime)} - ${formatTime(orderAcceptEndTime)}`
            : 'N/A';
    }, [outletData?.orderAcceptStartTime, outletData?.orderAcceptEndTime]);

    return { address, availableTime, theme, personalInfo };
}

export default useRestaurantInfo;
