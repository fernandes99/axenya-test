import { homeData } from "../../../constants/home"
import { Text } from "../../../styles/text"
import theme from "../../../styles/theme"
import S from "./styles"

export const AchievementsBlock = () => {
    return (
        <S.List>
            {homeData?.achievements.map(achievement => 
                <S.Item key={achievement.id}>
                    <Text
                        as="strong"
                        category="h2"
                        weight="bold"
                        align="center"
                    >
                        {achievement.title}
                    </Text>
                    <Text
                        as="p"
                        category="m1"
                        align="center"
                        color={theme.colors.gray_dark}
                        mb='auto'
                    >
                        {achievement.subtitle}
                    </Text>
                </S.Item>
            )}
        </S.List>
    )
}