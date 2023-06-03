import { Flex, Layout } from "styles/grid";
import { S } from "./styles";
import { Text } from "styles/text";
import Logotype from "../../assets/svg/axenya-logotype.svg";
import { FooterData } from "helpers/constants/footer";
import { AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";

const FooterV2 = () => {
    return (
        <S.Footer>
            <S.Container>
                <S.Content>
                    <Text as='p' category='s2' color='#7E7E7E' lineHeight='140%'>
                        Somos especialistas em gestão de saúde e oferecemos soluções personalizadas em plano de saúde e benefícios para empresas. Nossos serviços incluem a redução da sinistralidade e a gestão eficiente do plano de saúde, resultando em redução de custos em saúde. Conte conosco para uma contratação de plano de saúde transparente e sem complicações.
                    </Text>
                    <S.Divider />
                    <Flex gap='32px' style={{ alignItems: 'center', margin: '32px 0' }}>
                        <S.LogotypeBox>
                            <Logotype />
                        </S.LogotypeBox>
                        <Text as='p' category='s1' color='#393939'>
                            Nós fazemos a saúde fluir de um jeito inteligente.
                        </Text>
                    </Flex>
                    <Flex justify='space-between'>
                        <Flex gap='124px'>
                            {FooterData.map(item => 
                                <Flex direction='column' gap='16px' key={item.id}>
                                    <Text as='p' weight='bold' mb='8px'>
                                        {item.title}
                                    </Text>
                                    {item.data.map(data => 
                                        <Text as='a' href={data.link} key={data.id}>
                                            {data.name}
                                        </Text>
                                    )}
                                </Flex>
                            )}
                        </Flex>
                        <Flex direction='column' align='flex-end'>
                            <Text
                                as='p'
                                category='b2'
                                weight='bold'
                                style={{ textAlign: 'right' }}
                                mb='32px'
                            >
                                Fale conosco:<br /> (11) 3388-7888
                            </Text>
                            <Flex gap='16px'>
                                <Text as='a' href="https://www.linkedin.com/company/axenya/" title="Ir para o Linkedin Axenya">
                                    <S.IconBox>
                                        <AiOutlineLinkedin size={42} color='#fff' />
                                    </S.IconBox>
                                </Text>
                                <Text as='a' href="https://www.instagram.com/axenyahealth/" title="Ir para o Instragram Axenya">
                                    <S.IconBox>
                                        <AiOutlineInstagram size={42} color='#fff' />
                                    </S.IconBox>
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </S.Content>
            </S.Container>
            <S.Container bg='#393939'>
                <S.Content p='24px 60px'>
                    <Flex justify='space-between'>
                        <Text as='p' color='#7E7E7E'>
                            ©2023 Axenya e o logotipo Axenya são marcas registradas.
                        </Text>
                        <Text as='p' color='#7E7E7E'>
                            AXENYA DIGITAL LTDACNPJ: 12.381.921/0001-20 - R. Pedroso Alvarenga, 1221 - Itaim Bibi, São Paulo - SP, 04531-012
                        </Text>
                    </Flex>
                </S.Content>
            </S.Container>
        </S.Footer>
    )
}

export default FooterV2;