import { Text, type TextProps } from 'react-native';

import { colors, typography, type ColorToken, type TypeRole } from '@/theme';

type Props = TextProps & {
  variant?: TypeRole;
  color?: ColorToken;
};

/** Text with a type role and a color token. Scales with Dynamic Type. */
export function AppText({ variant = 'body', color = 'textOnDark', style, ...rest }: Props) {
  return <Text style={[typography[variant], { color: colors[color] }, style]} {...rest} />;
}
