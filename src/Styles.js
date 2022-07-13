import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.base};
    color: ${(props) => props.theme.colors.text};
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;

  & h1 {
    margin-bottom: 0.2rem;
  }

  & span {
    color: ${(props) => props.theme.colors.subtext1};
  }
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

export const AddButton = styled.button`
  background-color: ${(props) => props.theme.colors.sapphire};
  color: ${(props) => props.theme.colors.surface0};
  border: 2px solid transparent;
  padding: 0.5rem;

  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  &:active {
    border: 2px solid ${(props) => props.theme.colors.text};
  }
`;

export const NameInput = styled.input`
  background-color: ${(props) => props.theme.colors.surface0};
  color: ${(props) => props.theme.colors.text};

  border: 2px solid transparent;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  padding: 0.5rem;

  &::placeholder {
    color: ${(props) => props.theme.colors.overlay1};
    opacity: 1;
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 1rem;
`;

export const ActionButton = styled.button`
  opacity: ${(props) => (props.visible === "on-hover" ? 0 : 1)};
  background-color: ${(props) => props.theme.colors[props.color]};
  color: ${(props) => props.theme.colors.surface0};
  border: 2px solid transparent;
  border-radius: 20px;
  margin-left: 0.5rem;
  padding-block: 0.1rem;
  align-items: center;
  justify-items: center;

  &:active {
    border: 2px solid ${(props) => props.theme.colors.text};
  }

  & svg * {
    fill: ${(props) => props.theme.colors.surface0};
  }
`;

export const NameList = styled.ol`
  min-width: 20rem;
  margin: auto;
  counter-reset: item;
  list-style-type: none;
  padding-left: 0;
  border: 2px solid ${(props) => props.theme.colors.overlay1};
  border-radius: 16px;

  &:empty {
    border: none;
  }
`;

export const NameItem = styled.li`
  display: flex;
  justify-content: space-between;

  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border-bottom: 2px solid ${(props) => props.theme.colors.overlay1};

  & span {
    margin-inline: 0.5rem;
  }

  &:hover .item-remove-button,
  &:focus-within .item-remove-button {
    transition-delay: 0.1s;
    transition-duration: 0.3s;
    opacity: 1;
  }

  &:before {
    content: counter(item) "  ";
    counter-increment: item;
  }

  &:last-child {
    border: none;
  }
`;