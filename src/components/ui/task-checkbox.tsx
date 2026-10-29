import React from 'react';
import {
  Pressable,
  type PressableProps,
  Text,
  View,
} from 'react-native';

import { Icon } from '@/components/icon';
import { palette } from '@/constants/design';

export interface TaskCheckboxProps extends Omit<PressableProps, 'children'> {
  checked: boolean;
  onToggle: (nextState: boolean) => void;
  label?: string;
  sublabel?: string;
  accessibilityLabel?: string;
}

/**
 * TaskCheckbox - Checkbox Acessível para Tarefas (WCAG 2.0 / 2.1 / 2.2)
 * - Área de toque mínima de 44x44px garantida
 * - Estado semanticamente anunciado para leitores de tela (accessibilityState.checked)
 * - Microinteração visual e tátil com alto contraste
 */
export function TaskCheckbox({
  checked,
  onToggle,
  label,
  sublabel,
  accessibilityLabel,
  className = '',
  ...props
}: TaskCheckboxProps) {
  const accessibleText = accessibilityLabel || label || 'Marcar atividade';

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={accessibleText}
      accessibilityState={{ checked }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      onPress={() => onToggle(!checked)}
      className={`min-h-[48px] flex-row items-center py-2 active:opacity-80 ${className}`}
      {...props}>
      {/* Box do Checkbox com área centralizada */}
      <View
        className={`h-7 w-7 items-center justify-center rounded-xl border-2 transition-all ${
          checked
            ? 'border-vision-green bg-vision-green'
            : 'border-vision-line bg-white'
        }`}>
        {checked ? (
          <Icon
            name={{ ios: 'checkmark', android: 'check', web: 'check' }}
            color={palette.black}
            size={16}
          />
        ) : null}
      </View>

      {/* Rótulo opcional */}
      {label ? (
        <View className="ml-3.5 flex-1">
          <Text
            className={`text-sm font-bold ${
              checked ? 'line-through text-vision-gray/70' : 'text-vision-black'
            }`}>
            {label}
          </Text>
          {sublabel ? (
            <Text className="mt-0.5 text-xs text-vision-gray">
              {sublabel}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}
