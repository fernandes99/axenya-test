import { AiOutlineInstagram, AiOutlineLinkedin, AiOutlineFacebook } from 'react-icons/ai';
import { config } from '../../helpers/configs';
import { Layout } from '../../styles/grid';
import { Box, Container, Content, Grid } from "./styles";

const Footer = () => {
    return (
        <Container>
            <Layout>
                <Grid>
                    <Box>
                        <div>
                            <img src={`${config.url.base}/axenya-logotype-white.svg`} alt="Logo Axenya" width="232px" />
                        </div>
                        <div>
                            <span>AXENYA DIGITAL LTDA</span>
                            <span>CNPJ: 12.381.921/0001-20</span>
                            <span>Todos os direitos reservados</span>
                        </div>
                    </Box>
                    <Box className="contact">
                        <strong>Contato</strong>
                        <p>contato@axenya.com</p>
                        <a href="mailto:info@axenya.com" title="Fale com a Axenya">Fale com a Axenya</a>
                        <a href="/privacidade" target="_blank" title="Acessar página de privacidade">Política de privacidade</a>
                    </Box>
                    <Box>
                        <strong>Redes sociais</strong>
                        <div className="social">
                            <a href="https://www.linkedin.com/company/axenya/" title="Ir para o Linkedin Axenya">
                                <AiOutlineLinkedin />
                            </a>
                            <a href="https://www.instagram.com/axenyahealth/" title="Ir para o Instragram Axenya">
                                <AiOutlineInstagram />
                            </a>
                            <a href="https://www.facebook.com/axenyasaude/" title="Ir para o Facebook Axenya">
                                <AiOutlineFacebook />
                            </a>
                        </div>
                    </Box>
                </Grid>
            </Layout>
        </Container>
    )
}

export default Footer;