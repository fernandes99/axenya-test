import Head from 'next/head';
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import 'react-toastify/dist/ReactToastify.css';

import { Navigation } from '../components/navigation';
import { Divider } from '../components/divider';

import { HiArrowRight, HiArrowLeft } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import { Container, LogoAxenya, LogoDetail, ResultBlock, ResultList, Section, Slide, SlideBox, SlideImage, SlideContent, SoluctionsBlock, SoluctionsBox, LoadingForm, FeedbackForm, Detail } from '../styles/pages/home/styles';
import { Box } from '../styles/general';
import { Text } from '../styles/text';
import theme from '../styles/theme';

import { HomeType } from '../types/dato/home.types';

import { toast, ToastContainer } from 'react-toastify';
import { BlogData } from '../helpers/constants/blog';
import { config } from '../helpers/configs';
import { HOME_CACHE_TIME } from '../constants/time';
import { homeData } from '../constants/home';
import { SoluctionList } from '../components/pages/home/SoluctionList';
import { DESKTOP_BREAKPOINT } from '../constants/breakpoints';

// export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
//   context.res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=10, stale-while-revalidate=59'
//   );
//   const getHomeData = await fetch(
//     `${configs.url.base}/api/dato/home`, {
//       next: { revalidate: HOME_CACHE_TIME }
//     })
//     .then(res => res.json());
//   const data = getHomeData?.data?.home as HomeType;

//   if (!data) {
//       return {
//           notFound: true
//       }
//   }

//   return {
//       props: {
//         data,
//       },
//   };
// }

const HomePage = () => {
  const [switcherIndex, setSwitcherIndex] = useState<number>(0);
  const [isDesktop, setDesktop] = useState<boolean>(true);
  const [sendedForm, setSendedForm] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const hideBlogSection = true;

  const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

  const [highlight, setHighlight] = useState<string>(homeData.switchKeys[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentResult, setCurrentResult] = useState(0);
  const [fade, setFade] = useState(false);

  const [widthResultItem, setWidthResultItem] = useState(0);
  const refResultItem = useRef(null);

  const [ refSoluctionSection, inViewSelection ] = useInView({
    threshold: 0,
  });

  const { ref, inView, entry } = useInView({
    threshold: .5,
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const target = event.target;
    const data = {
      name: target.querySelector("#name")?.value,
      email: target.querySelector("#email")?.value,
      phone: target.querySelector("#phone")?.value,
      company: target.querySelector("#company")?.value,
      sector: target.querySelector("#sector")?.value,
      message: target.querySelector("#message")?.value,
    }
    const payload = {
      email_address: data.email,
      status: "subscribed",
      tags: ["LANDING FORM"],
      merge_fields: {
        FNAME: data.name,
        PHONE: data.phone,
        COMPANY: data.company,
        SECTOR: data.sector,
        COMMENT: data.message
      }
    }

    const sendSalesForce = async () => {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          message: data.message || ""
        })
      }

      await fetch('/api/salesforce/send-lead', options);
    }

    setLoadingForm(true);
    sendSalesForce();
    
    fetch('/api/mailchimp/member/add', {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(res => {
      if (res?.status === 200) {
        toast.success("Suas informações foram enviadas com sucesso!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        return setSendedForm(true);
      }

      toast.error("Houve algum problema ao enviar as informações, tente novamente mais tarde.",{
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }).finally(() => setLoadingForm(false));

    const url = 'https://script.google.com/macros/s/AKfycbz-b-Jhpqppt0rxDVj9zp0eNH0irpqrXi9165J7agJVKcEk4nz8XjUCoLej3K6wUoGIog/exec';
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': '*'
      },
      body: JSON.stringify(data)
    })
  }

  useEffect(() => {
    const maxCurrent = homeData?.slides?.length ? homeData.slides.length - 1 : 0;
    if (inViewSelection) return;

    if (inView && currentSlide <= maxCurrent) {
      setCurrentSlide(currentSlide + 1);
      setFade(true);
    }
    else {
      setCurrentSlide(0);
      setFade(true);
    }
  }, [inView])

  useEffect(() => {
    if (!homeData.switchKeys?.[switcherIndex]) return setSwitcherIndex(0);

    setHighlight(homeData.switchKeys[switcherIndex]);
    sleep(3000).then(() => setSwitcherIndex(switcherIndex + 1));
  }, [switcherIndex]);

  useEffect(() => {
    if (!refResultItem?.current && widthResultItem) return;

    const item:any = refResultItem?.current;
    setWidthResultItem(item?.clientWidth);
  }, [refResultItem]);

  useEffect(() => {
    setDesktop(window?.outerWidth > DESKTOP_BREAKPOINT);
    window?.addEventListener('resize', () => setDesktop(window.outerWidth > DESKTOP_BREAKPOINT));
  }, [])

  return (
    <>
      <Head>
        <title>Axenya | Ecossistema Inteligente de Saúde</title>
        <meta name="description" content="Axenya, o primeiro ecossistema inteligente de saúde. Substituímos a sua corretora de saúde e fazemos muito mais." />
      </Head>

      <>
        <Container>
          <Navigation />

          {!homeData?.hidePrincipalSection &&
            <Section data-section="principal">
              <Box>
                <LogoDetail src="/axenya-logo.svg" alt="Logo de fundo Axenya" />
                <LogoAxenya src="/axenya-logotype.svg" alt="Logo Axenya" />

                <Text
                  as='h1'
                  category='h1'
                  weight='bold'
                  mb='24px'
                >
                  {homeData?.title} <b>{highlight}</b>
                </Text>
                <Text
                  as='h2'
                  category='b2'
                  color={theme.colors.gray_dark}
                  mb='48px'
                >
                  {homeData?.subtitle}
                </Text>
                {!!homeData?.cta?.length &&
                  <Text
                    as='a'
                    href='#form'
                    title='Ir para o formulário'
                    category='s1'
                  >
                    {homeData?.cta}
                  </Text>
                }
              </Box>
              <Divider orientation="left" />
            </Section>
          }

          {!homeData?.hideSecondSection &&
            <Section data-section="apresentation">
              <Detail src="/background-pattern.png" alt="Backgroun pattern" side="left" opacity=".3" />
              <SlideContent>
                <Slide>
                  {homeData?.slides?.map((slide, index) => (
                    <div key={slide.id}>
                      <SlideBox
                        ref={index == 1 ? ref : null}
                      >
                        <h5>
                          {slide.label}
                        </h5>
                        <Text
                          as='h3'
                          category='h3'
                          weight='bold'
                          mb='16px'
                        >
                          {slide.title}
                        </Text>
                        <Text
                          as='p'
                          category='m1'
                          color={theme.colors.gray_dark}
                        >
                          {slide.subtitle}
                        </Text>
                      </SlideBox>
                      {!isDesktop &&
                        <SlideImage>
                          <img src={slide.image?.url!} alt={slide.image?.alt!} />
                        </SlideImage>
                      }
                    </div>
                  ))}
                </Slide>
                {isDesktop &&
                  <SlideImage
                    onAnimationEnd={() => setFade(false)}
                    className={fade ? 'fade' : ''}
                  >
                    <img
                      src={homeData?.slides?.[currentSlide]?.image?.url!}
                      alt={homeData?.slides?.[currentSlide]?.image?.alt!}
                    />
                  </SlideImage>
                }
              </SlideContent>
              <Divider orientation="right" />
            </Section>
          }

          {!homeData?.hideSoluctionSection &&
            <Section data-section="soluctions" ref={refSoluctionSection}>
              <Detail src="/background-pattern.png" alt="Backgroun pattern" side="right" opacity=".3" />
              <SoluctionsBox>
                <h3>
                  Solução de ponta-a-ponta, entregando valor em <br /><b>todas as etapas</b> da jornada de saúde!
                </h3>

                {
                  homeData?.soluctions?.map((block, index: number) => (
                    <SoluctionsBlock side={index === 0 ? 'left' : 'right'} key={index}>
                      <SoluctionList soluctionList={block.soluctionList} title={block.title} />
                    </SoluctionsBlock>
                  ))
                }
              </SoluctionsBox>
            </Section>
          }

          {!homeData?.hideResultSection &&
            <Section data-section="results">
              <h5>
                Por que a Axenya?
              </h5>

              <ResultBlock>
                <ResultList currentResult={currentResult}>
                  {
                    homeData?.results?.map((result, index) => (
                      <li
                        key={result.id}
                        className={index === currentResult ? "is-actived" : ""}
                        ref={refResultItem}
                      >
                        <h3>
                          {result.title}
                        </h3>
                        <p>
                          {result.subtitle}
                        </p>
                        <img
                          src={result.image.url}
                          alt={result.image.alt!}
                        />
                      </li>
                    ))
                  }
                </ResultList>

                {(homeData?.results?.length! > (currentResult + 1)) &&
                  <button
                    onClick={() => setCurrentResult(currentResult + 1)}
                    className="right"
                  >
                    <HiArrowRight />
                  </button>
                }

                {currentResult != 0 &&
                  <button
                    onClick={() => setCurrentResult(currentResult - 1)}
                    className="left"
                  >
                    <HiArrowLeft />
                  </button>
                }
              </ResultBlock>
            </Section>
          }

          {/* {!homeData?.hidePartnerSection &&
            <Section data-section="partners">
              <h5>
                {homeData?.partnerTitle}
              </h5>
              <div className='content'>
                {homeData?.partners?.map(partner => (
                  <img
                    src={partner.logo.url}
                    alt={partner.logo.alt}
                    title={partner.logo.title}
                    key={partner.id}
                  />
                ))}
              </div>
            </Section>
          } */}

          {!homeData?.hideAchievementSection &&
            <Section data-section="achievements">
              <div className='content'>
                <ul>
                  {homeData?.achievements.map(achievement => 
                    <li key={achievement.id}>
                      <strong>{achievement.title}</strong>
                      <p>{achievement.subtitle}</p>
                    </li>
                  )}
                </ul>
              </div>
            </Section>
          }

          <Section data-section="form" id="form">
            {loadingForm && <LoadingForm />}
            <div className='content'>
              <div>
                <img src="/axenya-logo-white.svg" alt="Logo Axenya" width="52px" />
                <h3>
                  Revolucionando a experiência que as empresas e pessoas têm com a saúde.
                </h3>
                <p>
                  Unimos a tecnologia e um time de especialistas da saúde para apoiar o RH na gestão da saúde das empresas.
                </p>
                <p>
                  Preencha o formulário e em breve a nossa equipe entrará em contato com você.
                </p>
                <BsArrowRight />
              </div>

              <div>
                {sendedForm ?
                  <FeedbackForm>
                    <AiOutlineCheckCircle />
                    <p>Informações enviadas com sucesso! Entraremos em contato em breve</p>
                  </FeedbackForm>
                :
                  <form id="formHome" onSubmit={handleSubmit}>
                    <input placeholder='Seu nome' id="name" required />
                    <input placeholder='Seu email' id="email" required />
                    <input placeholder='Seu telefone' id="phone" required />
                    <input placeholder='Qual o nome da sua empresa?' id="company" required />
                    <input placeholder='Qual setor você gostaria de falar?' id="sector" />
                    <textarea placeholder='Mensagem' form="formHome" id="message" />
                    <input type="submit" form="formHome" title='Enviar' />
                  </form>
                }
              </div>
            </div>
          </Section>

          {!hideBlogSection &&
            <Section data-section="blog">
              <div className='content'>
                <h5>
                  Veja nossos conteúdos recentes em <a href='https://www.axenya.com/blog-pt/' title='Ir para o blog Axenya'>nosso blog</a>
                </h5>

                <ul>
                  {BlogData.map(post => (
                    <li key={post.id}>
                      <a href={post.link} title={post.title} target="_blank">
                        <div>
                          <img
                            src={post.image.url}
                            alt={post.image.alt}
                          />
                        </div>
                        <div>
                          <strong>{post.title}</strong>
                          <p>{post.subtitle}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          }
        </Container>
        <ToastContainer />
      </>
    </>
  )
}

export default HomePage;
