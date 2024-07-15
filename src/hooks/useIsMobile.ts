import { useState, useEffect } from 'react';

const MOBILE_WIDTH_THRESHOLD = 768;

const useIsMobile = () => {
    const [isMobileVersion, setIsMobileVersion] = useState<boolean>(window.innerWidth <= MOBILE_WIDTH_THRESHOLD);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileVersion(window.innerWidth <= MOBILE_WIDTH_THRESHOLD);
        };

        window.addEventListener('resize', handleResize);
        // Initial check in case the window size changed before the component mounted
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobileVersion;
};

export default useIsMobile;