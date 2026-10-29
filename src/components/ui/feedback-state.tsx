import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
} from 'react-native';

import { Icon } from '@/components/icon';
import { AppButton } from '@/components/ui/button';
import { palette } from '@/constants/design';

export type FeedbackStateType = 'loading' | 'success' | 'error' | 'empty';

export interface FeedbackStateProps {
  type: FeedbackStateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * FeedbackState - Componente Centralizador dos 4 Estados de Interface
 * - 1. Carregando (Loading): Spinner / Skeletons com acessibilidade
 * - 2. Sucesso (Success): Feedback positivo com ícone de sucesso
 * - 3. Erro (Error): Indicação clara com botão de recuperação (Retry)
 * - 4. Vazio (Empty): Tela vazia contextual com Call-to-Action
 */
export function FeedbackState({
  type,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: FeedbackStateProps) {
  if (type === 'loading') {
    return (
      <View
        accessibilityRole="progressbar"
        accessibilityLiveRegion="polite"
        className={`items-center justify-center py-12 px-6 ${className}`}>
        <View className="h-16 w-16 items-center justify-center rounded-3xl bg-vision-light border border-vision-line">
          <ActivityIndicator color={palette.greenDeep} size="large" />
        </View>
        <Text className="mt-4 text-base font-extrabold text-vision-black">
          {title || 'Carregando informações...'}
        </Text>
        <Text className="mt-1 text-center text-xs font-medium text-vision-gray">
          {description || 'Aguarde um momento enquanto preparamos seus dados.'}
        </Text>
      </View>
    );
  }

  if (type === 'success') {
    return (
      <View
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        className={`items-center justify-center rounded-3xl border border-vision-successBorder bg-vision-successBg p-6 ${className}`}>
        <View className="h-14 w-14 items-center justify-center rounded-2xl bg-vision-success">
          <Icon
            name={{ ios: 'checkmark', android: 'check', web: 'check' }}
            color={palette.white}
            size={26}
          />
        </View>
        <Text className="mt-4 text-lg font-black text-vision-black text-center">
          {title || 'Operação realizada com sucesso!'}
        </Text>
        {description ? (
          <Text className="mt-1.5 text-center text-xs font-medium text-vision-gray leading-5 max-w-[280px]">
            {description}
          </Text>
        ) : null}
        {actionLabel && onAction ? (
          <View className="mt-5">
            <AppButton
              variant="secondary"
              size="sm"
              title={actionLabel}
              onPress={onAction}
            />
          </View>
        ) : null}
      </View>
    );
  }

  if (type === 'error') {
    return (
      <View
        accessibilityRole="alert"
        accessibilityLiveRegion="assertive"
        className={`items-center justify-center rounded-3xl border border-vision-errorBorder bg-vision-errorBg p-6 ${className}`}>
        <View className="h-14 w-14 items-center justify-center rounded-2xl bg-vision-error">
          <Icon
            name={{ ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' }}
            color={palette.white}
            size={24}
          />
        </View>
        <Text className="mt-4 text-lg font-black text-vision-black text-center">
          {title || 'Ocorreu um imprevisto'}
        </Text>
        <Text className="mt-1.5 text-center text-xs font-medium text-vision-gray leading-5 max-w-[280px]">
          {description || 'Não foi possível carregar as informações. Verifique sua conexão e tente novamente.'}
        </Text>
        {actionLabel && onAction ? (
          <View className="mt-5">
            <AppButton
              variant="danger"
              size="sm"
              title={actionLabel}
              onPress={onAction}
              icon={{ ios: 'arrow.clockwise', android: 'refresh', web: 'refresh' }}
            />
          </View>
        ) : null}
      </View>
    );
  }

  // type === 'empty'
  return (
    <View className={`items-center justify-center rounded-3xl border border-dashed border-vision-line bg-white/70 p-8 ${className}`}>
      <View className="h-16 w-16 items-center justify-center rounded-3xl bg-vision-light border border-vision-line">
        <Icon
          name={{ ios: 'tray', android: 'inbox', web: 'inbox' }}
          color={palette.gray}
          size={28}
        />
      </View>
      <Text className="mt-4 text-lg font-black text-vision-black text-center">
        {title || 'Nenhum item encontrado'}
      </Text>
      <Text className="mt-1.5 text-center text-xs font-medium text-vision-gray leading-5 max-w-[280px]">
        {description || 'Não há atividades registradas para esta seção no momento.'}
      </Text>
      {actionLabel && onAction ? (
        <View className="mt-5">
          <AppButton
            variant="primary"
            size="sm"
            title={actionLabel}
            onPress={onAction}
          />
        </View>
      ) : null}
    </View>
  );
}

/**
 * SkeletonCard - Componente de Loading de Interface com Placeholder Estrutural
 */
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Carregando conteúdo..."
      className={`rounded-3xl border border-vision-line bg-white p-5 animate-pulse ${className}`}>
      <View className="flex-row items-center gap-3">
        <View className="h-12 w-12 rounded-2xl bg-vision-line/70" />
        <View className="flex-1 gap-2">
          <View className="h-4 w-3/4 rounded-md bg-vision-line/70" />
          <View className="h-3 w-1/2 rounded-md bg-vision-line/50" />
        </View>
      </View>
      <View className="mt-4 h-2 w-full rounded-full bg-vision-line/40" />
    </View>
  );
}
