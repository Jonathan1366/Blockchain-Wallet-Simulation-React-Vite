import * as React from "react";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material/styles";
import { inputsCustomizations } from "./customization/input";
import { dataDisplayCustomizations } from "./customization/dataDisplay";
import { feedbackCustomizations } from "./customization/feedback";
import { navigationCustomizations } from "./customization/navigation";
import { surfacesCustomizations } from "./customization/surface";
import { colorSchemes, typography, shape } from "./ThemePrimitive";
interface AppThemeProps {
  children: React.ReactNode;
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions["components"];
}

export default function AppTheme({ children, disableCustomTheme, themeComponents }: AppThemeProps) {
  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme",
            cssVarPrefix: "template",
          },
          colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
          typography,
          shape,
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            ...themeComponents,
          },
        });
  }, [disableCustomTheme, themeComponents]);
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
