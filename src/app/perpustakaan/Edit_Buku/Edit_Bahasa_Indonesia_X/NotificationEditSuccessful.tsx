import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NotificationProps {
    show: boolean;
}

const NotificationEditSuccessful: React.FC<NotificationProps> = ({ show }) => {
    const [visible, setVisible] = useState(false);
    const router = useRouter(); // Initialize useRouter

    useEffect(() => {
        if (show) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                // Navigate to the desired page after the notification disappears
                router.push('/nextPage'); // Adjust the path as needed
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [show, router]);

    return (
        <div
            className={`fixed bottom-5 right-5 bg-green-500 text-white py-3 px-5 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
        >
            Edit Buku Successful!
        </div>
    );
};

export default NotificationEditSuccessful;
