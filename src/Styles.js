import styled from "styled-components";

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

  &:placeholder {
    color: ${(props) => props.theme.colors.overlay1};
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  background-color: ${(props) => props.theme.colors[props.color]};
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

export { ActionButton };
