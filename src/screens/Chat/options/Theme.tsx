import { LightUIKitTheme, createTheme } from '@sendbird/uikit-react-native-foundation';
import type { UIKitPalette } from '@sendbird/uikit-react-native-foundation';
import { colors } from '@commons/styles/variablesStyles';
import { Platform } from 'react-native';

const Palette: UIKitPalette = {
  primary100: colors.primary02,
  primary200: colors.primaryOff,
  primary300: colors.primary,
  primary400: colors.buttonAddBook,
  primary500: '#491389',

  secondary100: '#A8E2AB',
  secondary200: '#69C085',
  secondary300: '#259C72',
  secondary400: '#027D69',
  secondary500: '#066858',

  error100: '#FDAAAA',
  error200: '#F66161',
  error300: '#DE360B',
  error400: '#BF0711',
  error500: '#9D091E',

  background50: '#FFFFFF',
  background100: '#EEEEEE',
  background200: '#E0E0E0',
  background300: '#BDBDBD',
  background400: '#393939',
  background500: '#2C2C2C',
  background600: '#161616',
  background700: '#000000',

  overlay01: 'rgba(0,0,0,0.55)',
  overlay02: 'rgba(0,0,0,0.32)',

  information: '#ADC9FF',
  highlight: '#FFF2B6',
  transparent: 'transparent',

  onBackgroundLight01: 'rgba(0,0,0,0.88)',
  onBackgroundLight02: 'rgba(0,0,0,0.50)',
  onBackgroundLight03: 'rgba(0,0,0,0.38)',
  onBackgroundLight04: 'rgba(0,0,0,0.12)',

  onBackgroundDark01: 'rgba(255,255,255,0.88)',
  onBackgroundDark02: 'rgba(255,255,255,0.50)',
  onBackgroundDark03: 'rgba(255,255,255,0.38)',
  onBackgroundDark04: 'rgba(255,255,255,0.12)',
};

export const Theme = createTheme({
  colorScheme: 'light',
  palette: Palette,
  colors: (palette) => ({
    ...LightUIKitTheme.colors,
    primary: palette.primary300,
    ui: {
      ...LightUIKitTheme.colors.ui,
      button: {
        ...LightUIKitTheme.colors.ui.button,
        contained: {
          ...LightUIKitTheme.colors.ui.button.contained,
          enabled: {
            ...LightUIKitTheme.colors.ui.button.contained.enabled,
            background: palette.primary300,
          },
          pressed: {
            ...LightUIKitTheme.colors.ui.button.contained.pressed,
            background: palette.primary400,
          },
        },
      },
      groupChannelMessage: {
        ...LightUIKitTheme.colors.ui.groupChannelMessage,
        incoming: {
          ...LightUIKitTheme.colors.ui.groupChannelMessage.incoming,
          pressed: {
            ...LightUIKitTheme.colors.ui.groupChannelMessage.incoming.pressed,
            background: palette.primary100,
          },
        },
        outgoing: {
          ...LightUIKitTheme.colors.ui.groupChannelMessage.outgoing,
          enabled: {
            ...LightUIKitTheme.colors.ui.groupChannelMessage.outgoing.enabled,
            background: palette.primary300,
          },
          pressed: {
            ...LightUIKitTheme.colors.ui.groupChannelMessage.outgoing.pressed,
            background: palette.primary400,
          },
        },
      },
      reaction: {
        ...LightUIKitTheme.colors.ui.reaction,
        default: {
          ...LightUIKitTheme.colors.ui.reaction.default,
          selected: {
            background: palette.primary100,
            highlight: palette.primary300,
          },
        },
        rounded: {
          ...LightUIKitTheme.colors.ui.reaction.rounded,
          selected: {
            ...LightUIKitTheme.colors.ui.reaction.rounded.selected,
            background: palette.primary100,
          },
        },
      },
    },
  }),

  typography: {
    h1: {
      fontSize: Platform.OS === 'ios' ? 18 : 17,
    },
    h2: {
      fontSize: Platform.OS === 'ios' ? 16 : 15,
    },
    subtitle1: {
      fontSize: Platform.OS === 'ios' ? 16 : 15,
    },
    subtitle2: {
      fontSize: Platform.OS === 'ios' ? 16 : 15,
    },
    body1: {
      fontSize: Platform.OS === 'ios' ? 16 : 15,
    },
    body2: {
      fontSize: Platform.OS === 'ios' ? 14 : 13,
    },
    body3: {
      fontSize: Platform.OS === 'ios' ? 14 : 13,
    },
    button: {
      fontSize: Platform.OS === 'ios' ? 14 : 13,
    },
    caption1: {
      fontSize: Platform.OS === 'ios' ? 12 : 11,
    },
    caption2: {
      fontSize: Platform.OS === 'ios' ? 12 : 11,
    },
    caption3: {
      fontSize: Platform.OS === 'ios' ? 11 : 10,
    },
    caption4: {
      fontSize: Platform.OS === 'ios' ? 11 : 10,
    },
    shared: {
      fontFamily: 'fontMedium',
    },
  },
});
