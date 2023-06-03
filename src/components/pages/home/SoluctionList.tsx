import { useEffect, useState } from "react"
import { DESKTOP_BREAKPOINT } from "../../../constants/breakpoints";
import { SoluctionsImage, SoluctionsInfo, SoluctionsItem } from "../../../styles/pages/home/styles";
import { SoluctionType } from "../../../types/dato/home.types";

export const SoluctionList = (props: { soluctionList: SoluctionType[], title: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDesktop, setDesktop] = useState<boolean>(true);

    useEffect(() => {
        setDesktop(window?.outerWidth > DESKTOP_BREAKPOINT);
        window?.addEventListener('resize', () => setDesktop(window.outerWidth > DESKTOP_BREAKPOINT));
    }, [])

    return (
        <ul>
            <div>
                <h4>
                    {props.title}
                </h4>
                {props.soluctionList?.map((item, index: number) => (
                    <SoluctionsItem
                        key={index}
                    >
                        <SoluctionsInfo
                            open={currentIndex === index}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <div
                                dangerouslySetInnerHTML={{ __html: item.icon }}
                            />

                            <div>
                                <h5>
                                    {item.title}
                                </h5>
                                <p className="subtitle">
                                    {item.subtitle}
                                </p>
                                {!isDesktop &&
                                    <SoluctionsImage>
                                        <img loading="lazy" src={props.soluctionList[currentIndex].image.url} style={{ display: currentIndex === index ? "block" : "none" }} />
                                    </SoluctionsImage>
                                }
                            </div>
                        </SoluctionsInfo>
                    </SoluctionsItem>
                ))}
            </div>

            {isDesktop &&
                <SoluctionsImage>
                    <img loading="lazy" src={props.soluctionList[currentIndex].image.url} />
                </SoluctionsImage>
            }
        </ul>
    )
}