import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import LikeControl from './LikeControl';

import deleteBlank from '@/utils/deleteBlank';

import { RC } from './style';

import { RoutineProps } from './type';

const RoutineCard = ({ id, imgpath, period, enrolled, fewTime, routineName, category, weekProgress, handleButton }: RoutineProps) => {
    const pathName = useRouter().asPath;

    const DeletedBlankRoutineName = deleteBlank({ routineName });

    return (
        <RC.CardBox>
            <RC.CardWrapper>
                <RC.ImgWrapper>
                    <Image priority sizes="(max-width: 100px)" src={imgpath} fill={true} alt="운동이미지" />
                </RC.ImgWrapper>
                <RC.DescWrapper>
                    <Link
                        href={{
                            pathname: `${pathName}/detail/[slug]`,
                            query: { slug: DeletedBlankRoutineName, routineId: id, period, weekProgress },
                        }}
                        as={`${pathName}/detail/${DeletedBlankRoutineName}`}
                    >
                        <RC.span>{routineName}</RC.span>
                    </Link>
                    <RC.ul>
                        <RC.li>#{category}</RC.li>
                        <RC.li>#{period}</RC.li>
                        <RC.li>#{fewTime} times a week</RC.li>
                    </RC.ul>
                    <div></div>
                    <RC.DescFooterWrapper>
                        <RC.CoachNameWrapper>
                            <RC.CoachName>{routineName}</RC.CoachName>
                        </RC.CoachNameWrapper>
                        <RC.ClickWrapper>
                            <LikeControl routineId={id} />
                            <RC.BtnWrapper enrolled={enrolled}>
                                <RC.AddBtn onClick={() => handleButton?.(id)} disabled={enrolled}>
                                    추 가
                                </RC.AddBtn>
                            </RC.BtnWrapper>
                        </RC.ClickWrapper>
                    </RC.DescFooterWrapper>
                </RC.DescWrapper>
            </RC.CardWrapper>
        </RC.CardBox>
    );
};

export default RoutineCard;
