import { HTMLAttributes } from 'react';
import { StaticImageData } from 'next/image';

type ItemType = {
    id: number;
    imageRoot: StaticImageData;
    listName: string;
    pageRoot: string;
};
interface StyledProps extends HTMLAttributes<HTMLDivElement> {
    emailMargin?: boolean | undefined;
    pwMargin?: boolean | undefined;
    enrolled?: boolean;
    $today?: boolean;
    $isSaved?: boolean;
    $isHeader?: boolean;
}

type RoutineProps = {
    id?: number;
    imgpath: string;
    period?: number;
    enrolled?: boolean;
    fewTime?: number;
    routineName?: string;
    liked: boolean;
    category?: string;
    weekProgress?: number;
    handleButton?: (id: number | undefined) => void;
    handleLikeList?: () => void;
};

export type { ItemType, StyledProps, RoutineProps };
