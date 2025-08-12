import React, { useEffect, useState } from 'react';

interface NotificationProps {
    show: boolean;
    onHide?: () => void;
}

const NotificationSuccessful: React.FC<NotificationProps> = ({ show, onHide }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                if (onHide) onHide();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onHide]);

    return (
        <div
            className={`fixed bottom-5 right-5 bg-green-500 text-white py-3 px-5 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
        >
         Berhasil Mengedit Buku!
        </div>
    );
};

export default NotificationSuccessful;