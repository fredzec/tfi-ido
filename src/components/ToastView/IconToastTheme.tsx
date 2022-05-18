import React, {forwardRef, useCallback} from "react";
import styled, { DefaultTheme } from "styled-components";
import {AlertProps,
  Flex,
  CheckmarkCircleIcon,
  ErrorIcon,
  BlockIcon,
  InfoIcon,
  Text,
  IconButton,
  CloseIcon
} from "@vipswap/uikit";
import {SnackbarContent, useSnackbar} from "notistack";

interface ThemedIconLabel {
  variant: AlertProps["variant"];
  theme: DefaultTheme;
  hasDescription: boolean;
}

const variants = {
  INFO: "info",
  DANGER: "danger",
  SUCCESS: "success",
  WARNING: "warning",
} as const;
type Variants = typeof variants[keyof typeof variants];

const getThemeColor = ({ theme, variant = variants.INFO }: ThemedIconLabel) => {
  switch (variant) {
    case variants.DANGER:
      return theme.colors.failure;
    case variants.WARNING:
      return theme.colors.warning;
    case variants.SUCCESS:
      return theme.colors.success;
    case variants.INFO:
    default:
      return theme.colors.secondary;
  }
};

const getIcon = (variant: AlertProps["variant"] = variants.INFO) => {
  switch (variant) {
    case variants.DANGER:
      return BlockIcon;
    case variants.WARNING:
      return ErrorIcon;
    case variants.SUCCESS:
      return CheckmarkCircleIcon;
    case variants.INFO:
    default:
      return InfoIcon;
  }
};

const IconLabel = styled.div<ThemedIconLabel>`
  background-color: ${getThemeColor};
  border-radius: 16px 0 0 16px;
  color: ${({ theme }) => theme.alert.background};
  padding: 12px;
`;

const withHandlerSpacing = 32 + 12 + 8; // button size + inner spacing + handler position
const Details = styled.div<{ hasHandler: boolean }>`
  flex: 1;
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: ${({ hasHandler }) => (hasHandler ? `${withHandlerSpacing}px` : "12px")};
  padding-top: 12px;
`;

const CloseHandler = styled.div`
  border-radius: 0 16px 16px 0;
  right: 8px;
  position: absolute;
  top: 8px;
`;

const StyledAlert = styled(Flex)`
  position: relative;
  background-color: ${({ theme }) => theme.alert.background};
  border-radius: 16px;
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
`;

interface props extends AlertProps{
  id: string
  description: string
}

const IconToastTheme = forwardRef<HTMLDivElement, { id: string | number, message: string | React.ReactNode,title:string, description:string,variant:Variants }>((props, ref) => {

  const {variant,id,title, description} = props
  const Icon = getIcon(variant);
  const { closeSnackbar } = useSnackbar();
  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <StyledAlert>
        <IconLabel variant={variant} hasDescription={false}>
          <Icon color="currentColor" width="24px" />
        </IconLabel>
        <Details hasHandler>
          <Text bold>{title}</Text>
          <Text as="p">{description}</Text>
        </Details>
        <CloseHandler>
          <IconButton scale="sm" variant="text" onClick={handleDismiss}>
            <CloseIcon width="24px" color="currentColor" />
          </IconButton>
        </CloseHandler>
      </StyledAlert>
    </SnackbarContent>


  );
})

export default IconToastTheme;
