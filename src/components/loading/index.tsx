import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { InferGetServerSidePropsType } from 'next/types';

import { getServerSideProps } from '@/pages/verifying';
import { useAppDispatch } from '@/store/hook';
import { saveUserInfo } from '@/store/slices/userSlice';
import { setRefreshToken } from '@/utils/manageCookie';

const override: React.CSSProperties = {
    display: 'flex',
    margin: '0 auto',
    textAlign: 'center',
};

const Loading = ({ props: { verifyingPageProps, SocialLoginCancelMessage } }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { message } = SocialLoginCancelMessage;

    useEffect(() => {
        if (message) {
            router.push('/');
        } else {
            const { accessToken, refreshToken, success, userInfo } = verifyingPageProps;

            localStorage.setItem('access_token', accessToken);
            setRefreshToken(refreshToken);

            if (success) {
                router.push('/home');
            } else {
                dispatch(saveUserInfo(userInfo));
                router.push('/signup/kakao');
            }
        }
    }, []);

    return (
        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <BeatLoader size={20} color="#36d7b7" loading={true} cssOverride={override} />
        </div>
    );
};

export default Loading;
