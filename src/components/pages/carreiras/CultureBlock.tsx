import { useState } from "react";
import { BiBrain, BiBulb, BiChart, BiConversation, BiGroup, BiTrendingUp, BiUserCheck } from 'react-icons/bi';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Col, Row } from "../../../styles/grid";
import { Text } from "../../../styles/text";
import { S } from "styles/pages/career/styles";

const cultureList = [
    {
        title: 'Sonhamos cada vez mais alto, não medimos esforços e nossa ambição não tem limites',
        text: 'Estamos nisso para ajudar a levar a humanidade para um futuro melhor, para proporcionar mudanças disruptivas e desafiar constantemente o status quo. Qualquer coisa menos, simplesmente não basta.',
        icon: <BiTrendingUp size={32} color="#1B90B3" />
    },
    {
        title: 'Sempre pensamos e operamos do ponto de vista do cliente',
        text: 'Nossos clientes e pacientes são nossa razão de existir. Como tal, focamos em primeiro lugar em oferecer a melhor solução para os clientes que atendemos, tratando o resultado final como consequência de um serviço de excelência.',
        icon: <BiUserCheck size={32} color="#1B90B3" />
    },
    {
        title: 'Nós nos esforçamos para combinar idealismo com pragmatismo',
        text: 'Contratamos apenas os melhores e mais talentosos e fornecemos um ambiente onde eles podem prosperar, com amplo espaço para capacitação, crescimento e tomada de decisões.',
        icon: <BiChart size={32} color="#1B90B3" />
    },
    {
        title: 'Acreditamos no poder de grandes pessoas e grandes equipes',
        text: 'Trabalhamos sob a filosofia da melhorias constantes, sempre dispostos a sacrificar ou adicionar elementos aos nossos projetos, redesenhando-os do zero ou até mesmo desfazendo-os totalmente, se necessário. Incentivamos nosso pessoal a experimentar, assumir riscos e realmente tratar os erros como oportunidades de aprendizado.',
        icon: <BiGroup size={32} color="#1B90B3" />
    },
    {
        title: 'Acreditamos em uma cultura de aprendizado genuína',
        text: 'Trabalhamos sob a filosofia da melhorias constantes, sempre dispostos a sacrificar ou adicionar elementos aos nossos projetos, redesenhando-os do zero ou até mesmo desfazendo-os totalmente, se necessário. Incentivamos nosso pessoal a experimentar, assumir riscos e realmente tratar os erros como oportunidades de aprendizado.',
        icon: <BiBrain size={32} color="#1B90B3" />
    },
    {
        title: 'Operamos como uma meritocracia de ideias',
        text: 'Valorizamos a transparência e a verdade radical. Lutamos por um ambiente onde todas as ideias tenham a oportunidade de serem expressas e analisadas, de forma objetiva e por seus próprios méritos. Também tratamos os colaboradores de forma proporcional às suas contribuições, operando como uma genuína meritocracia. Não temos medo de lidar com os atritos que esses processos podem produzir.',
        icon: <BiConversation size={32} color="#1B90B3" />
    },
    {
        title: 'Abraçamos a inovação abertamente',
        text: 'Além de contar com nosso conhecimento interno e recursos para inovação, também buscamos ativamente fontes externas para expandir e aprimorar o que fazemos.',
        icon: <BiBulb size={32} color="#1B90B3" />
    }
]

export const CultureBlock = () => {
    const [itemsExpanded, setItemsExpanded] = useState<number[]>([]);

    const handleItemsExpanded = (index: number) => {
        const itemHasActived = itemsExpanded.includes(index);

        return itemHasActived
            ? setItemsExpanded(itemsExpanded.filter(item => item !== index))
            : setItemsExpanded([...itemsExpanded, index]);
    }

    return (
        <>
            <Text
                as="h3"
                category="m1"
                weight="medium"
                mb="48px"
            >
                Nossa cultura
            </Text>

            <Row gap="24px">
                <Col count={2}>
                    <S.CultureList>
                        {cultureList?.map((item, index) => (
                            <S.CultureItem
                                onClick={() => handleItemsExpanded(index)}
                                key={index}
                            >
                                <S.IconBox style={{ marginBottom: 'auto' }}>
                                    {item.icon}
                                </S.IconBox>
                                <div>
                                    <Text
                                        as="p"
                                        category="m2"
                                        style={{ lineHeight: "140%" }}
                                        color="#0C0D11"
                                    >
                                        {item.title}
                                    </Text>
                                    {itemsExpanded.includes(index) &&
                                        <Text
                                            as="p"
                                            category="s1"
                                            style={{ lineHeight: "140%" }}
                                            color="#67696C"
                                            mt="8px"
                                        >
                                            {item.text}
                                        </Text>
                                    }
                                </div>
                                {itemsExpanded.includes(index)
                                    ? <BsChevronUp size={24} color="#afafaf" style={{ marginBottom: 'auto' }} />
                                    : <BsChevronDown size={24} color="#afafaf" />
                                }
                            </S.CultureItem>
                        ))}
                    </S.CultureList>
                </Col>
                <Col count={1} style={{ position: 'relative' }}>
                    <S.GroupImages>
                        <div>
                            <img src="https://www.datocms-assets.com/87998/1674074347-grupo-axenya-01.png" alt="Grupo de pessoas Axenya" />
                            <img src="https://www.datocms-assets.com/87998/1674074324-grupo-axenya-02.png" alt="Grupo de pessoas Axenya" />
                        </div>
                    </S.GroupImages>
                </Col>
            </Row>
        </>
    )
}