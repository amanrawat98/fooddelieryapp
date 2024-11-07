import { useMemo } from 'react';
import { useSelector } from 'react-redux';

function useRestaurantInfo() {
    const theme = useSelector((state) => state.theme.themeData);
    const { selectedOutletData={} } = useSelector((state) => state.outlet);


    const personalInfo = useMemo(() => ({
        phone: selectedOutletData?.phone,
        email: selectedOutletData?.email
    }), [selectedOutletData?.phone, selectedOutletData?.email]);

    const address = useMemo(() => {
        const addressParts = [
            selectedOutletData?.street,
            selectedOutletData?.street1,
            selectedOutletData?.city,
            selectedOutletData?.state,
            selectedOutletData?.zip,
            selectedOutletData?.country
        ].filter(Boolean);
        return addressParts.join(', ');
    }, [
        selectedOutletData?.street,
        selectedOutletData?.street1,
        selectedOutletData?.city,
        selectedOutletData?.state,
        selectedOutletData?.zip,
        selectedOutletData?.country
    ]);

    const formatTime = (time) => {
        if (!time) return 'N/A';
        const [hour, minute] = time.split(':').map(Number);
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute < 10 ? '0' : ''}${minute} ${period}`;
    };

    const availableTime = useMemo(() => {
        const { orderAcceptStartTime, orderAcceptEndTime } = selectedOutletData;
        return orderAcceptStartTime && orderAcceptEndTime
            ? `${formatTime(orderAcceptStartTime)} - ${formatTime(orderAcceptEndTime)}`
            : 'N/A';
    }, [selectedOutletData?.orderAcceptStartTime, selectedOutletData?.orderAcceptEndTime]);

    return { address, availableTime, theme, personalInfo };
}

export default useRestaurantInfo;
