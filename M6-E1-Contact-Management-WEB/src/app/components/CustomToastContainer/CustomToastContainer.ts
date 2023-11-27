import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

export const CustomToastContainer = styled(ToastContainer)`
  .Toastify__toast-container {
    background-color: var(--color-grey-2);
    color: var(--color-grey-0);
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    height: 69px;
    width: 286px;
    left: 1129px;
    top: 28px;
    border-radius: 4px;
  }

  .Toastify__toast {
    background-color: var(--color-grey-2);
    color: var(--color-grey-0);
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    height: 24px;
    width: 186px;
  }

  .Toastify__toast--success {
    background-color: var(--color-grey-2);
    color: var(--color-grey-0);
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    height: 24px;
    width: 186px;
  }

  .Toastify__toast--error {
    background-color: var(--color-grey-2);
    color: var(--color-grey-0);
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    height: 24px;
    width: 186px;
  }
`;
