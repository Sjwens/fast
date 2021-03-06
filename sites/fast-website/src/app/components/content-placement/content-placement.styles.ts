import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";

export const ContentPlacementStyles = css`
    ${display("grid")} :host {
        justify-content: center;
        contain: layout;
        font-family: var(--body-font);
        box-sizing: border-box;
        position: relative;
    }

    fast-card {
        background: transparent;
        padding: calc(var(--design-unit) * 5px);
        text-align: left;
        display: flex;
        flex-direction: column;
        box-shadow: none;
    }

    fast-card ::slotted([slot="body"]) {
        flex: 1 1 auto;
        margin: 0;
        font-size: var(--type-ramp-base-font-size);
    }

    fast-card ::slotted([slot="action"]) {
        margin-top: calc(var(--design-unit) * 2px);
        align-self: start;
    }

    fast-card:hover .contentPlacement_icon,
    fast-card:focus-within .contentPlacement_icon {
        opacity: 1;
    }

    fast-card .contentPlacement_icon {
        opacity: 0;
        margin-bottom: calc(var(--design-unit) * 5px);
    }
`;
