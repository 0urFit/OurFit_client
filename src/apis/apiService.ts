import { ApiInstance } from './apiClient';
import { InputType } from '@/components/signup/type';
import { ProfileInfoEditType } from '@/components/mypage/types';
import { GetRoutineDetailInformationType, GetRoutineOverviewType, GetRoutineType, LoginApiType } from './type';
import { AUTH, EXERCISE, MYPAGE } from './constants';

const instanceAuthenticated = new ApiInstance(true);
const instanceUnAuthenticated = new ApiInstance(false);

export const TokenUpdate = async (refreshToken: string) => {
    return await instanceUnAuthenticated.post(`${AUTH.NEWTOKEN}`, { refreshToken });
};

export const LocalLogin = async (loginData: LoginApiType) => {
    return await instanceUnAuthenticated.post(`${AUTH.LOGIN}`, loginData);
};

export const LocalSignUp = async (SignUpData: InputType) => {
    return await instanceUnAuthenticated.post(`${AUTH.SIGNUP}`, {
        email: SignUpData.email,
        password: SignUpData.password,
        nickname: SignUpData.nickname,
        gender: SignUpData.gender,
        height: SignUpData.height,
        weight: SignUpData.weight,
        squat: SignUpData.squat,
        benchpress: SignUpData.benchpress,
        deadlift: SignUpData.deadlift,
        overheadpress: SignUpData.overheadpress,
    });
};

export const LocalNickname = async (nickname: string) => {
    console.log(nickname);
    return await instanceUnAuthenticated.get(`${AUTH.CHECKNICK}`, {
        nick: nickname,
    });
};

export const LocalEmail = async (email: string) => {
    return await instanceUnAuthenticated.get(`${AUTH.CHECKEMAIL}`, {
        email,
    });
};

export const SocialKakaoLogin = async (authCode: string | undefined) => {
    return await instanceUnAuthenticated.get(`${AUTH.KAKAO}`, {
        authorizationCode: authCode,
    });
};

export const MainSave = async (category: string) => {
    return await instanceAuthenticated.get(`${MYPAGE.MYAPGE_EXERCISE}`, {
        category,
    });
};

export const SaveRoutineDetail = async (routineId: number) => {
    return await instanceAuthenticated.get(`${MYPAGE.MYAPGE_EXERCISE}/${routineId}`);
};

export const RoutineSuccess = async (routindId: number, week: number | undefined | '', day: string) => {
    return await instanceAuthenticated.post(`${MYPAGE.MYAPGE_EXERCISE}/${routindId}${MYPAGE.COMPLETE}`, {
        week,
        day,
    });
};

export const GetRoutine = async (endpoint: string | undefined): Promise<GetRoutineType[]> => {
    const response = await instanceAuthenticated.get(`${EXERCISE.EXERCISE}/${endpoint}`);
    const { result } = response.data;
    return result;
};

export const GetRoutineOverview = async (routineId: number): Promise<GetRoutineOverviewType> => {
    const response = await instanceAuthenticated.get(`${EXERCISE.EXERCISE}/${routineId}/view`);
    const { result } = response.data;
    return result;
};

export const GetDetailRoutine = async (routineId: number, week: number): Promise<GetRoutineDetailInformationType[]> => {
    const response = await instanceAuthenticated.get(`${EXERCISE.EXERCISE}/${routineId}${EXERCISE.WEEK}/${week}`);
    const { days } = response.data.result[0];
    return days;
};

export const SaveRoutineInfo = async (routineId: number | undefined) => {
    return await instanceAuthenticated.post(`${EXERCISE.EXERCISE}/${routineId}`);
};

export const DeleteRoutine = async (id: number | undefined) => {
    return await instanceAuthenticated.delete(`${EXERCISE.EXERCISE}/${id}`);
};

export const GetLikedRoutine = async () => {
    return await instanceAuthenticated.get(`${MYPAGE.MYPAGE_LIKE}`);
};

export const GetUserInfo = async () => {
    return await instanceAuthenticated.get(`${MYPAGE.MYPAGE}`);
};

export const EditUserInfo = async (editedUserInfoData: ProfileInfoEditType) => {
    return await instanceAuthenticated.patch(`${MYPAGE.MYPAGE_UPDATE}`, editedUserInfoData);
};

export const LikePost = async (routineId: number | undefined) => {
    return await instanceAuthenticated.post(`${EXERCISE.EXERCISE}/${routineId}${EXERCISE.LIKES}`);
};

export const LikeDelete = async (routineId: number | undefined) => {
    return await instanceAuthenticated.delete(`${EXERCISE.EXERCISE}/${routineId}${EXERCISE.LIKES}`);
};
