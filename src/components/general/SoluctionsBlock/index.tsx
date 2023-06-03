import { homeData } from "../../../constants/home"
import { Text } from "../../../styles/text"
import { SoluctionList } from "../../pages/home/SoluctionList"
import S from "./styles"

export const SoluctionsBlock = () => {
    return (
        <S.Box>
            <Text
                as="h2"
                category="b2"
                align="center"
            >
                Solução de ponta-a-ponta, entregando valor em <strong>todas as etapas</strong> da jornada de saúde!
            </Text>
                {homeData?.soluctions?.map((block, index: number) => (
                        <S.Block side={index === 1 ? 'left' : 'right'} key={index}>
                            <SoluctionList soluctionList={block.soluctionList} title={block.title} />
                        </S.Block>
                    )
                )}
        </S.Box>
    )
}