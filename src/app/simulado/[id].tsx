import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/icon';
import { AppButton } from '@/components/ui/button';
import { palette } from '@/constants/design';
import { mockExamQuestions } from '@/data/study';

export default function ExamInteractiveScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const questions = mockExamQuestions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600); // 10 minutos
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  // Cronômetro
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];
  const selectedAnswer = userAnswers[currentQ.id];
  const totalAnswered = Object.keys(userAnswers).length;

  const handleSelectOption = (letter: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: letter,
    }));
  };

  const handleFinish = () => {
    setShowFinishModal(false);
    // Transiciona para a tela de resultado com os dados
    router.replace({
      pathname: '/simulado/resultado',
      params: {
        examId: id || 'enem-1',
        totalQuestions: questions.length,
        answeredCount: totalAnswered,
      },
    } as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-vision-light" edges={['top', 'left', 'right']}>
      {/* Barra Superior com Cronômetro e Botão de Saída */}
      <View className="flex-row items-center justify-between border-b border-vision-line bg-white px-5 py-3">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Sair do simulado"
          hitSlop={12}
          onPress={() => setShowExitModal(true)}
          className="min-h-[44px] min-w-[44px] items-center justify-center rounded-2xl bg-vision-light active:bg-vision-line">
          <Icon
            name={{ ios: 'xmark', android: 'close', web: 'close' }}
            color={palette.black}
            size={18}
          />
        </Pressable>

        {/* Cronômetro com Controle de Pausa */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Tempo restante: ${formatTimer(timeLeftSeconds)}. Toque para pausar ou continuar.`}
          onPress={() => setIsTimerRunning(!isTimerRunning)}
          className="flex-row items-center gap-2 rounded-full border border-vision-line bg-vision-light px-3.5 py-1.5 active:bg-vision-line">
          <Icon
            name={isTimerRunning
              ? { ios: 'timer', android: 'timer', web: 'timer' }
              : { ios: 'pause.fill', android: 'pause', web: 'pause' }}
            color={timeLeftSeconds < 120 ? palette.feedback.error : palette.black}
            size={16}
          />
          <Text
            className={`font-mono text-sm font-black ${
              timeLeftSeconds < 120 ? 'text-vision-error' : 'text-vision-black'
            }`}>
            {formatTimer(timeLeftSeconds)}
          </Text>
        </Pressable>

        {/* Botão de Envio Rápido */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Entregar prova"
          onPress={() => setShowFinishModal(true)}
          className="rounded-2xl bg-vision-green px-3.5 py-2 active:scale-95">
          <Text className="text-xs font-black text-vision-black">Entregar</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerClassName="flex-grow pb-28"
        showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-xl self-center px-5 pt-4">
          {/* Seletor de Questões (Pills) */}
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xs font-extrabold uppercase tracking-wider text-vision-gray">
              Questão {currentIndex + 1} de {questions.length}
            </Text>
            <Text className="text-xs font-bold text-vision-deep">
              {totalAnswered}/{questions.length} respondidas
            </Text>
          </View>

          <View className="mb-5 flex-row gap-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const isAnswered = Boolean(userAnswers[q.id]);
              return (
                <Pressable
                  key={q.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Ir para questão ${idx + 1}, ${isAnswered ? 'Respondida' : 'Pendente'}`}
                  onPress={() => setCurrentIndex(idx)}
                  className={`min-h-[44px] flex-1 items-center justify-center rounded-xl border ${
                    isCurrent
                      ? 'border-vision-black bg-vision-black'
                      : isAnswered
                      ? 'border-vision-green bg-vision-green'
                      : 'border-vision-line bg-white'
                  }`}>
                  <Text
                    className={`text-xs font-black ${
                      isCurrent ? 'text-white' : 'text-vision-black'
                    }`}>
                    {idx + 1}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Card do Enunciado */}
          <View className="rounded-3xl border border-vision-line bg-white p-5 shadow-sm">
            <View className="flex-row items-center justify-between border-b border-vision-line pb-3">
              <View className="rounded-full bg-vision-light px-3 py-1">
                <Text className="text-[10px] font-black uppercase tracking-wider text-vision-deep">
                  {currentQ.subject}
                </Text>
              </View>
              <Text className="text-xs font-bold text-vision-gray">
                {currentQ.source}
              </Text>
            </View>

            <Text className="mt-3 text-xs font-bold text-vision-gray">
              {currentQ.area} • {currentQ.topic}
            </Text>

            <Text className="mt-3 text-base font-medium leading-7 text-vision-black">
              {currentQ.text}
            </Text>
          </View>

          {/* Alternativas A, B, C, D, E */}
          <View className="mt-5 gap-3">
            <Text className="text-xs font-bold uppercase tracking-wider text-vision-gray">
              Escolha uma alternativa:
            </Text>

            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt.letter;
              return (
                <Pressable
                  key={opt.letter}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={`Alternativa ${opt.letter}: ${opt.text}`}
                  onPress={() => handleSelectOption(opt.letter)}
                  className={`min-h-[54px] flex-row items-center rounded-2xl border p-4 active:scale-[0.99] transition-all ${
                    isSelected
                      ? 'border-vision-black bg-white ring-2 ring-vision-deep shadow-sm'
                      : 'border-vision-line bg-white'
                  }`}>
                  <View
                    className={`h-9 w-9 items-center justify-center rounded-xl border ${
                      isSelected
                        ? 'border-vision-green bg-vision-green'
                        : 'border-vision-line bg-vision-light'
                    }`}>
                    <Text className="text-sm font-black text-vision-black">
                      {opt.letter}
                    </Text>
                  </View>
                  <Text
                    className={`ml-3 flex-1 text-sm leading-5 ${
                      isSelected
                        ? 'font-bold text-vision-black'
                        : 'font-medium text-vision-gray'
                    }`}>
                    {opt.text}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Navegação Entre Questões */}
          <View className="mt-8 flex-row items-center justify-between gap-3">
            <AppButton
              variant="outline"
              size="md"
              disabled={currentIndex === 0}
              title="Anterior"
              icon={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
              iconPosition="left"
              onPress={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            />

            {currentIndex < questions.length - 1 ? (
              <AppButton
                variant="primary"
                size="md"
                title="Próxima"
                icon={{ ios: 'chevron.right', android: 'arrow_forward', web: 'arrow_forward' }}
                onPress={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              />
            ) : (
              <AppButton
                variant="primary"
                size="md"
                title="Concluir Prova"
                icon={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
                onPress={() => setShowFinishModal(true)}
              />
            )}
          </View>
        </View>
      </ScrollView>

      {/* Modal de Confirmação de Saída */}
      <Modal visible={showExitModal} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/60 px-5">
          <View className="w-full max-w-sm rounded-3xl bg-white p-6">
            <Text className="text-lg font-black text-vision-black">
              Deseja sair do simulado?
            </Text>
            <Text className="mt-2 text-xs leading-5 text-vision-gray">
              Seu tempo e respostas marcadas serão pausados para que você possa continuar mais tarde.
            </Text>
            <View className="mt-6 flex-row gap-3">
              <AppButton
                variant="outline"
                size="sm"
                className="flex-1"
                title="Continuar Prova"
                onPress={() => setShowExitModal(false)}
              />
              <AppButton
                variant="danger"
                size="sm"
                className="flex-1"
                title="Sair"
                onPress={() => {
                  setShowExitModal(false);
                  router.back();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmação de Entrega */}
      <Modal visible={showFinishModal} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/60 px-5">
          <View className="w-full max-w-sm rounded-3xl bg-white p-6">
            <Text className="text-lg font-black text-vision-black">
              Confirmar entrega do simulado?
            </Text>
            <Text className="mt-2 text-xs leading-5 text-vision-gray">
              Você respondeu <Text className="font-bold text-vision-black">{totalAnswered}</Text> de{' '}
              <Text className="font-bold text-vision-black">{questions.length}</Text> questões. A Vision IA processará sua nota TRI e pontos de melhoria.
            </Text>
            <View className="mt-6 flex-row gap-3">
              <AppButton
                variant="outline"
                size="sm"
                className="flex-1"
                title="Revisar"
                onPress={() => setShowFinishModal(false)}
              />
              <AppButton
                variant="primary"
                size="sm"
                className="flex-1"
                title="Finalizar"
                onPress={handleFinish}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
