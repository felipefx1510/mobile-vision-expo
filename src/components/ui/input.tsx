import React, { useState } from 'react';
import {
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';

import { Icon } from '@/components/icon';
import { palette } from '@/constants/design';

export interface AppInputProps extends TextInputProps {
  label: string;
  helperText?: string;
  error?: string;
  leftIcon?: Parameters<typeof Icon>[0]['name'];
  rightElement?: React.ReactNode;
  containerClassName?: string;
  required?: boolean;
}

/**
 * AppInput - Campo de Entrada Acessível (WCAG 2.0 / 2.1 / 2.2)
 * - Label visível e permanente acima do campo
 * - Altura mínima de toque de 48px
 * - Mensagens de erro em alto contraste com ícone indicador
 * - Indicação clara de foco
 */
export function AppInput({
  label,
  helperText,
  error,
  leftIcon,
  rightElement,
  containerClassName = '',
  required = false,
  className = '',
  onFocus,
  onBlur,
  ...props
}: AppInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const inputId = props.id || label.toLowerCase().replace(/\s+/g, '-');
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <View className={`w-full ${containerClassName}`}>
      {/* Label Visível Permanente */}
      <View className="mb-2 flex-row items-center justify-between">
        <Text
          nativeID={`${inputId}-label`}
          className="text-xs font-bold uppercase tracking-[1.4px] text-vision-gray">
          {label}
          {required ? <Text className="text-vision-error font-bold"> *</Text> : null}
        </Text>
      </View>

      {/* Container do Input com área mínima de 48px */}
      <View
        className={`min-h-[48px] flex-row items-center rounded-2xl border px-4 transition-colors ${
          error
            ? 'border-vision-error bg-vision-errorBg'
            : isFocused
            ? 'border-vision-black bg-white ring-2 ring-vision-deep/30'
            : 'border-vision-line bg-vision-light'
        }`}>
        {leftIcon ? (
          <View className="mr-3">
            <Icon
              name={leftIcon}
              color={error ? palette.feedback.error : isFocused ? palette.black : palette.gray}
              size={19}
            />
          </View>
        ) : null}

        <TextInput
          accessibilityLabelledBy={`${inputId}-label`}
          accessibilityHint={helperText}
          aria-invalid={Boolean(error)}
          aria-errormessage={error ? errorId : undefined}
          aria-describedby={helperText ? helperId : undefined}
          placeholderTextColor="#798074"
          className={`flex-1 py-3 text-[15px] font-medium text-vision-black ${className}`}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />

        {rightElement ? <View className="ml-2">{rightElement}</View> : null}
      </View>

      {/* Feedback de Erro ou Texto Auxiliar */}
      {error ? (
        <View
          nativeID={errorId}
          accessibilityLiveRegion="assertive"
          className="mt-1.5 flex-row items-center gap-1.5 px-1">
          <Icon
            name={{ ios: 'exclamationmark.circle.fill', android: 'error', web: 'error' }}
            color={palette.feedback.error}
            size={14}
          />
          <Text className="text-xs font-bold text-vision-error">{error}</Text>
        </View>
      ) : helperText ? (
        <Text
          nativeID={helperId}
          className="mt-1.5 px-1 text-xs font-medium text-vision-gray">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}
