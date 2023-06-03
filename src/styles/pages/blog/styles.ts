import styled from "styled-components";
import theme from "styles/theme";

export const S = {
    BlogContent: styled.div`
        padding: 80px 0;

        @media (max-width: ${theme.media.mobile}) {
            padding: 40px 0 80px;
        }
    `,
    ArticleList: styled.ul`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 24px;
        row-gap: 48px;

        li {
            display: flex;
            flex-direction: column;

            a {
                text-decoration: none;
                transition: all .2s;

                img {
                    height: 200px;
                    object-fit: cover;
                    border-radius: 4px;
                    margin-bottom: 12px;
                }


                &:hover {
                    transform: translateY(-2px);
                }
            }
        }

        @media (max-width: ${theme.media.mobile}) {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
        }
    `,
    CategoriesBlock: styled.div`
        display: flex;
    `
}