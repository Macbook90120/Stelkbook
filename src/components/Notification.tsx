'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  type?: 'success' | 'error' | 'warning' | 'info';
  position?: 'top-center' | 'bottom-right';
}

const Notification: React.FC<NotificationProps> = ({
  message,
  isVisible,
  onClose,
  duration = 5000,
  type = 'success',
  position = 'top-center',
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
      setProgress(100);
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (!isVisible) {
      setProgress(100);
      return;
    }

    setIsExiting(false);
    setProgress(100);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(progressInterval);
          return 0;
        }
        return prev - (100 / (duration / 50));
      });
    }, 50);

    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(autoCloseTimer);
      clearInterval(progressInterval);
    };
  }, [isVisible, duration, handleClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-500',
      progress: 'bg-green-500',
      shadow: 'shadow-green-100',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-500',
      progress: 'bg-red-500',
      shadow: 'shadow-red-100',
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      icon: 'text-amber-500',
      progress: 'bg-amber-500',
      shadow: 'shadow-amber-100',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-500',
      progress: 'bg-blue-500',
      shadow: 'shadow-blue-100',
    },
  };

  const styles = typeStyles[type];

  const positionStyles = {
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4 translate-x-0',
  };

  const animationStyles = {
    'top-center': isExiting ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0',
    'bottom-right': isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0',
  };

  const currentPosition = positionStyles[position];
  const currentAnimation = animationStyles[position];

  return (
    <div
      className={`fixed ${currentPosition} z-[9999] w-full max-w-sm px-4 transition-all duration-300 ${currentAnimation}`}
      role="alert"
      aria-live="polite"
    >
      <div
        className={`relative overflow-hidden rounded-xl border ${styles.bg} ${styles.border} ${styles.shadow} shadow-lg backdrop-blur-sm`}
      >
        {/* Progress bar */}
        <div
          className={`absolute bottom-0 left-0 h-1 ${styles.progress} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />

        <div className="flex items-start gap-3 p-4">
          <div className={`flex-shrink-0 ${styles.icon}`}>
            <CheckCircle size={22} strokeWidth={2.5} />
          </div>

          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold ${styles.text} leading-relaxed`}>
              {message}
            </p>
          </div>

          <button
            onClick={handleClose}
            className={`flex-shrink-0 p-1.5 rounded-full transition-colors ${styles.text} hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'amber' : 'blue'}-500`}
            aria-label="Tutup notifikasi"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
