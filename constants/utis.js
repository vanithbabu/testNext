import { Toast } from '@/lib/toast';

export const errorToast = (message = 'Please try again later...!!!') => {
    return Toast({ type: 'error', message });
};