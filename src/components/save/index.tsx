import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

import SmallSelect from '@/common/molecules/SmallSelect';
import RoutineCard from '@/common/molecules/RoutineCard';
import RoutineModal from '@/common/molecules/RoutineModal';
import BackDrop from '@/common/molecules/BackDrop';

import { DeleteRoutine, MainSave } from '@/apis/apiService';
import { SelectOptions } from '@/data/SaveData';
import getErrorMessage from '@/utils/getErrorMessage';
import useModal from '@/hooks/useModal';

import { SV } from './style';
import WeightIcon from '../../../public/assets/weight-icon.svg';
import { RoutineProps } from '../../common/molecules/type';

const Save = () => {
    const [selectedValue, setSelectedValue] = useState<string>('all');
    const [saveData, setSaveData] = useState<RoutineProps[]>([]);

    const { isModal, updateIsModal, portalElement, backDropElement } = useModal();

    const handleSave = async (category: string) => {
        try {
            const response = await MainSave(category);
            const { result } = response.data;

            setSaveData(result);
        } catch (e) {
            throw new Error(getErrorMessage(e));
        }
    };

    const handleDeleteRoutine = async (id: number | undefined) => {
        updateIsModal(true);
        try {
            const response = await DeleteRoutine(id);
            updateIsModal(false);
            handleSave(selectedValue);

            return response;
        } catch (e) {
            throw new Error(getErrorMessage(e));
        }
    };

    const handleChangeCategory = (categoryData: string) => {
        setSelectedValue(categoryData);
    };

    useEffect(() => {
        handleSave(selectedValue);
    }, [selectedValue]);

    return (
        <SV.Box>
            <SV.SelectWrapper>
                <SmallSelect placeholder="카테고리" options={SelectOptions} handleChangeCategory={handleChangeCategory} />
            </SV.SelectWrapper>
            {saveData.length === 0 ? (
                <SV.WarningBox>
                    <SV.WarningWrapper>
                        <Image src={WeightIcon} alt="weight-icon" width={100} height={100} />
                        <SV.WarningMessage>새로운 운동 루틴을 등록해보세요!</SV.WarningMessage>
                    </SV.WarningWrapper>
                </SV.WarningBox>
            ) : (
                <SV.CardList>
                    {saveData.map((data: RoutineProps) => (
                        <RoutineCard
                            key={data.id}
                            id={data.id}
                            imgpath={data.imgpath}
                            period={data.period}
                            liked={data.liked}
                            fewTime={data.fewTime}
                            routineName={data.routineName}
                            category={data.category}
                            weekProgress={data.weekProgress}
                            handleButton={handleDeleteRoutine}
                        />
                    ))}
                </SV.CardList>
            )}
            {portalElement && isModal ? createPortal(<RoutineModal />, portalElement) : null}
            {backDropElement && isModal ? createPortal(<BackDrop />, backDropElement) : null}
        </SV.Box>
    );
};

export default Save;
