import { TextareaAutosize, styled } from "@mui/material";

export const CustomTextArea = styled(TextareaAutosize)(
    ({ theme }) => `
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid ${theme.custom.gray};

    &:hover {
      border-color: black;
    }

    &:focus {
      border-color: #3399FF;
      box-shadow: 0 0 0 1px #3399FF;
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );