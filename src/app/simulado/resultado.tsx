import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/icon';
import { ProgressBar } from '@/components/progress-bar';
import { AppButton } from '@/components/ui/button';
import { palette } from '@/constants/design';

export default function ExamResultScreen() {
  const router = useRouter();
  const { examId = 'enem-1', totalQuestions = '4', answeredCount = '4' } =
    useLocalSearchParams<{ examId: string; totalQuestions: string; answeredCount: string }>();

  const total = parseInt(totalQuestions, 10) || 4;
  const answered = parseInt(answeredCount, 10) || 4;
  const correctCount = Math.max(1, Math.round(answered * 0.75)); // Mock de 75% de acertos
  const triScore = 748;

  const areaBreakdown = [
    { name: 'Matemática', score: '820 pts', correct: '1/1', color: '#A6FF00' },
    { name: 'Linguagens', score: '690 pts', correct: '1/1', color: '#B7D7FF' },
    { name: 'Natureza', score: '710 pts', correct: '1/1', color: '#FFD7A8' },
    { name: 'Humanas', score: '772 pts', correct: '0/1', color: '#D8C8FF' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-vision-light" edges={['top', 'left', 'right']}>
      {/* Barra de Topo */}
      <View className="flex-row items-center justify-between border-b border-vision-line bg-white px-5 py-3.5">
        <Text className="text-xs font-black uppercase tracking-[1.4px] text-vision-deep">
          Relatório de Desempenho
        </Text>
        <Text className="text-xs font-bold text-vision-gray">
          Simulado ENEM
        </Text>
      </View>

      <ScrollView
        contentContainerClassName="flex-grow pb-28"
        showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-xl self-center px-5 pt-4">
          {/* Card Principal de Pontuação */}
          <View className="overflow-hidden rounded-[30px] bg-vision-black p-6 shadow-md">
            <View className="flex-row items-center justify-between">
              <View className="rounded-full bg-vision-green/20 px-3 py-1">
                <Text className="text-[10px] font-black uppercase tracking-wider text-vision-green">
                  Correção TRI Concluída
                </Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Icon
                  name={{ ios: 'checkmark.seal.fill', android: 'verified', web: 'verified' }}
                  color={palette.green}
                  size={16}
                />
                <Text className="text-xs font-bold text-white/70">Oficial TRI</Text>
              </View>
            </View>

            <View className="mt-6 flex-row items-baseline gap-2">
              <Text className="text-5xl font-black tracking-[-2px] text-white">
                {triScore}
              </Text>
              <Text className="text-base font-bold text-white/50">pontos estimados</Text>
            </View>

            <Text className="mt-2 text-xs font-medium text-white/70">
              Você acertou {correctCount} de {total} questões respondidas (75% de aproveitamento).
            </Text>

            {/* Barra Visual de Aproveitamento */}
            <View className="mt-5 border-t border-white/10 pt-4">
              <View className="mb-2 flex-row justify-between">
                <Text className="text-xs font-bold text-white/60">Aproveitamento geral</Text>
                <Text className="text-xs font-black text-vision-green">75%</Text>
              </View>
              <ProgressBar value={75} />
            </View>
          </View>

          {/* Diagnóstico da IA */}
          <View className="mt-6 rounded-3xl border border-vision-green/40 bg-vision-green/10 p-5">
            <View className="flex-row items-center gap-2.5 mb-2">
              <View className="h-8 w-8 items-center justify-center rounded-xl bg-vision-green">
                <Icon
                  name={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }}
                  color={palette.black}
                  size={16}
                />
              </View>
              <Text className="text-sm font-black uppercase tracking-[1.3px] text-vision-deep">
                Diagnóstico da Vision IA
              </Text>
            </View>

            <Text className="text-xs font-medium leading-5 text-vision-black">
              Seu domínio em <Text className="font-bold">Funções Quadráticas</Text> e{' '}
              <Text className="font-bold">Ecologia</Text> foi exemplar! Identificamos que a questão de{' '}
              <Text className="font-bold text-vision-error">História (Democracia Ateniense)</Text> precisa de reforço conceitual sobre os critérios de cidadania.
            </Text>

            <View className="mt-4 rounded-2xl bg-white p-3.5 border border-vision-line">
              <Text className="text-[11px] font-black uppercase tracking-wider text-vision-gray">
                Recomendação para seu Plano de Estudos:
              </Text>
              <Text className="mt-1 text-xs font-bold text-vision-black">
                Adicionamos 1 sprint de 30 min sobre Grécia Antiga no seu plano de quarta-feira.
              </Text>
            </View>
          </View>

          {/* Desempenho por Área */}
          <View className="mt-6">
            <Text className="text-xs font-bold uppercase tracking-wider text-vision-gray mb-3">
              Desempenho por Área do Conhecimento
            </Text>

            <View className="gap-2.5">
              {areaBreakdown.map((area) => (
                <View
                  key={area.name}
                  className="flex-row items-center justify-between rounded-2xl border border-vision-line bg-white px-4 py-3.5">
                  <View className="flex-row items-center gap-3">
                    <View
                      style={{ backgroundColor: area.color }}
                      className="h-3 w-3 rounded-full"
                    />
                    <Text className="text-sm font-extrabold text-vision-black">
                      {area.name}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-4">
                    <Text className="text-xs font-bold text-vision-gray">
                      Acertos: {area.correct}
                    </Text>
                    <Text className="text-sm font-black text-vision-black">
                      {area.score}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Botões de Ação */}
          <View className="mt-8 gap-3">
            <AppButton
              variant="primary"
              size="lg"
              fullWidth
              title="Ver Plano Semanal Atualizado"
              icon={{ ios: 'calendar', android: 'event', web: 'event' }}
              onPress={() => router.replace('/plano')}
            />

            <AppButton
              variant="outline"
              size="md"
              fullWidth
              title="Voltar ao Início"
              onPress={() => router.replace('/inicio')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
