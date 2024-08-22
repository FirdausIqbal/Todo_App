import { css } from "styled-components";

export const mobile = (style) => {
    return css`
        @media screen and (max-width: 971px){
            ${style}
        }
    `
}