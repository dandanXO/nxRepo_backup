import { useNavigate, useLocation } from 'react-router';
import { Overlay } from '@frontend/mobile/shared/ui';



const SystemCouponModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Overlay
            show={true}
            enableClose={false}
            onCancel={() => navigate(-1)}
            content={(hide: () => void) => {
                return <div>SystemCouponModal</div>
            }}
        />
    );
};

export default SystemCouponModal;
