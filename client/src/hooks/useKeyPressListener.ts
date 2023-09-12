import { useEffect } from 'react';

export const useKeyPressListener = (handler: any) => {
    // Use keydown event instead of keypress because Chrome doesn't fire a keypress event for 'Delete' key

    useEffect(() => {
        // Add event listener to window
        window.addEventListener('keydown', handler);

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('keydown', handler);
        }
    });
}
