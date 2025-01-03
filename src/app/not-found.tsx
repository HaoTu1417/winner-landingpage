'use client';

import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    const handleBackHome = () => {
        router.push('/');
    };

    return (
        <Result
            status="404"
            title={<span style={{ color: '#FF5733' }}>404</span>} // Custom color for title
            subTitle={<span style={{ color: '#888888' }}>Sorry, the page you visited does not exist.</span>} // Custom color for subtitle
            extra={
                <Button 
                    type="primary" 
                    style={{ backgroundColor: '#03fc9d',color:'#000000' }} 
                    onClick={handleBackHome}
                >
                    Back Home
                </Button>
            }
        />
    );
}
