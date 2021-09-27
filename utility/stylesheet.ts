import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core";

type ThemeCSSProperties = {
  [key: string]: SxProps<Theme>;
};

export class AtlasStylesheet {
  public static create<Styles extends ThemeCSSProperties>(
    styles: Styles
  ): Styles {
    return styles;
  }
}

export default AtlasStylesheet;
