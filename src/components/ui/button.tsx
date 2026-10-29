import React, { type ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  Text,
  View,
} from 'react-native';

import { Icon } from '@/components/icon';
import { palette } from '@/constants/design';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends Omit<PressableProps, 'children'> {
  title?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: Parameters<typeof Icon>[0]['name'];
  iconPosition?: 'left' | 'right';
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const variantStyles: Record<ButtonVariant, { container: string; text: string; iconColor: string; spinnerColor: string }> = {
  primary: {
    container: 'bg-vision-green border border-vision-green active:bg-[#95E600]',
    text: 'text-vision-black font-black',
    iconColor: palette.black,
    spinnerColor: palette.black,
  },
  secondary: {
    container: 'bg-vision-black border border-vision-black active:bg-vision-surfaceCard',
    text: 'text-white font-extrabold',
    iconColor: palette.white,
    spinnerColor: palette.white,
  },
  outline: {
    container: 'bg-white border-2 border-vision-black active:bg-vision-light',
    text: 'text-vision-black font-extrabold',
    iconColor: palette.black,
    spinnerColor: palette.black,
  },
  ghost: {
    container: 'bg-transparent border border-transparent active:bg-black/5',
    text: 'text-vision-deep font-bold',
    iconColor: palette.greenDeep,
    spinnerColor: palette.greenDeep,
  },
  danger: {
    container: 'bg-vision-error border border-vision-error active:bg-red-700',
    text: 'text-white font-black',
    iconColor: palette.white,
    spinnerColor: palette.white,
  },
};

const sizeStyles: Record<ButtonSize, { container: string; text: string; iconSize: number }> = {
  sm: {
    container: 'min-h-[44px] px-3.5 py-2 rounded-xl',
    text: 'text-xs',
    iconSize: 16,
  },
  md: {
    container: 'min-h-[48px] px-5 py-3 rounded-2xl',
    text: 'text-sm',
    iconSize: 18,
  },
  lg: {
    container: 'min-h-[54px] px-6 py-3.5 rounded-2xl',
    text: 'text-base',
    iconSize: 20,
  },
};

/**
 * AppButton - Componente de Botão Acessível (WCAG 2.0 / 2.1 / 2.2)
 * - Área de toque mínima garantida de 48x48px (ou 44x44px com hitSlop)
 * - Suporta estados: Default, Hover/Focus, Pressed (active), Loading e Disabled
 * - Contraste mínimo de texto: 4.5:1 (Nível AA)
 */
export function AppButton({
  title,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'right',
  accessibilityLabel,
  accessibilityHint,
  onPress,
  className = '',
  ...props
}: AppButtonProps) {
  const isInteractive = !disabled && !loading;
  const config = variantStyles[variant];
  const sizeConfig = sizeStyles[size];
  const accessibleText = accessibilityLabel || title || (typeof children === 'string' ? children : undefined);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibleText}
      accessibilityHint={accessibilityHint}
      accessibilityState={{
        disabled: !isInteractive,
        busy: loading,
      }}
      disabled={!isInteractive}
      onPress={isInteractive ? onPress : undefined}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      className={`flex-row items-center justify-center select-none ${fullWidth ? 'w-full' : 'self-start'} ${sizeConfig.container} ${config.container} ${
        !isInteractive ? 'opacity-60' : 'active:scale-[0.98]'
      } ${className}`}
      {...props}>
      {loading ? (
        <View className="flex-row items-center gap-2" accessibilityLiveRegion="polite">
          <ActivityIndicator color={config.spinnerColor} size="small" />
          <Text className={`${sizeConfig.text} ${config.text}`}>Carregando...</Text>
        </View>
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          {icon && iconPosition === 'left' ? (
            <Icon name={icon} color={config.iconColor} size={sizeConfig.iconSize} />
          ) : null}

          {title ? (
            <Text className={`${sizeConfig.text} ${config.text}`}>{title}</Text>
          ) : (
            children
          )}

          {icon && iconPosition === 'right' ? (
            <Icon name={icon} color={config.iconColor} size={sizeConfig.iconSize} />
          ) : null}
        </View>
      )}
    </Pressable>
  );
}
