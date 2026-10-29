import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/icon';
import { ProgressBar } from '@/components/progress-bar';
import { AppButton } from '@/components/ui/button';
import { FeedbackState } from '@/components/ui/feedback-state';
import { TaskCheckbox } from '@/components/ui/task-checkbox';
import { palette } from '@/constants/design';
import { mockLessons } from '@/data/study';

export default function LessonDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Busca dados da aula mockada ou usa fallback
  const lesson = mockLessons[id || '1'] || mockLessons['1'];

  const [completedTopics, setCompletedTopics] = useState<string[]>(
    lesson.topics.filter((t) => t.completed).map((t) => t.id)
  );
  const [activeTab, setActiveTab] = useState<'topics' | 'notes'>('topics');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!lesson) {
    return (
      <SafeAreaView className="flex-1 bg-vision-light justify-center p-5">
        <FeedbackState
          type="error"
          title="Aula não encontrada"
          description="A aula solicitada não foi encontrada ou foi movida."
          actionLabel="Voltar para o Início"
          onAction={() => router.replace('/inicio')}
        />
      </SafeAreaView>
    );
  }

  const toggleTopic = (topicId: string) => {
    setCompletedTopics((current) =>
      current.includes(topicId)
        ? current.filter((item) => item !== topicId)
        : [...current, topicId]
    );
  };

  const progressPercent = Math.round(
    (completedTopics.length / lesson.topics.length) * 100
  );

  return (
    <SafeAreaView className="flex-1 bg-vision-light" edges={['top', 'left', 'right']}>
      {/* Barra de Topo com Ação de Voltar Acessível */}
      <View className="flex-row items-center justify-between border-b border-vision-line bg-white px-5 py-3.5">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          hitSlop={12}
          onPress={() => router.back()}
          className="min-h-[44px] min-w-[44px] items-center justify-center rounded-2xl bg-vision-light active:bg-vision-line">
          <Icon
            name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
            color={palette.black}
            size={20}
          />
        </Pressable>

        <View className="items-center">
          <Text className="text-[11px] font-black uppercase tracking-[1.3px] text-vision-deep">
            {lesson.subject}
          </Text>
          <Text className="text-xs font-bold text-vision-gray">
            {lesson.duration} • ENEM 2026
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Compartilhar aula"
          hitSlop={12}
          className="min-h-[44px] min-w-[44px] items-center justify-center rounded-2xl bg-vision-light active:bg-vision-line">
          <Icon
            name={{ ios: 'square.and.arrow.up', android: 'share', web: 'share' }}
            color={palette.gray}
            size={18}
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerClassName="flex-grow pb-28"
        showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-xl self-center px-5 pt-4">
          {/* Card de Vídeo Interativo */}
          <View className="overflow-hidden rounded-[26px] bg-vision-black shadow-sm">
            <View className="h-48 items-center justify-center bg-vision-surfaceCard p-4 relative">
              <View className="absolute inset-0 bg-black/30" />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={isVideoPlaying ? 'Pausar aula' : 'Reproduzir aula'}
                onPress={() => setIsVideoPlaying(!isVideoPlaying)}
                className="h-16 w-16 items-center justify-center rounded-full bg-vision-green active:scale-95 shadow-md">
                <Icon
                  name={isVideoPlaying
                    ? { ios: 'pause.fill', android: 'pause', web: 'pause' }
                    : { ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' }}
                  color={palette.black}
                  size={26}
                />
              </Pressable>
              <View className="absolute bottom-3 left-4 right-4 flex-row items-center justify-between">
                <View className="rounded-full bg-black/60 px-3 py-1">
                  <Text className="text-[11px] font-bold text-white">
                    {isVideoPlaying ? 'Reproduzindo...' : lesson.videoPlaceholder}
                  </Text>
                </View>
                <View className="rounded-full bg-vision-green px-2.5 py-1">
                  <Text className="text-[10px] font-black text-vision-black">HD 1080p</Text>
                </View>
              </View>
            </View>

            <View className="p-5">
              <Text className="text-xl font-black leading-7 text-white">
                {lesson.title}
              </Text>
              <Text className="mt-1 text-xs font-medium text-white/60">
                {lesson.teacher} • Especialista em Aprovação
              </Text>

              {/* Barra de Progresso da Aula */}
              <View className="mt-4 border-t border-white/10 pt-3">
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className="text-xs font-bold text-white/70">
                    Progresso nos tópicos: {completedTopics.length} de {lesson.topics.length}
                  </Text>
                  <Text className="text-xs font-black text-vision-green">
                    {progressPercent}%
                  </Text>
                </View>
                <ProgressBar value={progressPercent} />
              </View>
            </View>
          </View>

          {/* Abas de Navegação */}
          <View className="mt-6 flex-row gap-2 border-b border-vision-line pb-2">
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === 'topics' }}
              onPress={() => setActiveTab('topics')}
              className={`min-h-[44px] flex-1 items-center justify-center rounded-2xl py-2.5 ${
                activeTab === 'topics' ? 'bg-vision-black' : 'bg-white'
              }`}>
              <Text
                className={`text-xs font-extrabold ${
                  activeTab === 'topics' ? 'text-white' : 'text-vision-gray'
                }`}>
                Tópicos & Checklist
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === 'notes' }}
              onPress={() => setActiveTab('notes')}
              className={`min-h-[44px] flex-1 items-center justify-center rounded-2xl py-2.5 ${
                activeTab === 'notes' ? 'bg-vision-black' : 'bg-white'
              }`}>
              <Text
                className={`text-xs font-extrabold ${
                  activeTab === 'notes' ? 'text-white' : 'text-vision-gray'
                }`}>
                Resumo & Teoria
              </Text>
            </Pressable>
          </View>

          {/* Conteúdo da Aba */}
          {activeTab === 'topics' ? (
            <View className="mt-4 gap-2.5">
              <Text className="text-xs font-bold uppercase tracking-[1.3px] text-vision-gray mb-1">
                Marque os pontos compreendidos
              </Text>
              {lesson.topics.map((topic) => {
                const isDone = completedTopics.includes(topic.id);
                return (
                  <View
                    key={topic.id}
                    className="rounded-2xl border border-vision-line bg-white px-4 py-1.5">
                    <TaskCheckbox
                      checked={isDone}
                      onToggle={() => toggleTopic(topic.id)}
                      label={topic.label}
                      accessibilityLabel={`Tópico: ${topic.label}, ${isDone ? 'Concluído' : 'Pendente'}`}
                    />
                  </View>
                );
              })}
            </View>
          ) : (
            <View className="mt-4 gap-4">
              <View className="rounded-3xl border border-vision-line bg-white p-5">
                <Text className="text-sm font-black text-vision-black mb-2">
                  Visão Geral do Conteúdo
                </Text>
                <Text className="text-xs font-medium leading-6 text-vision-gray">
                  {lesson.summary}
                </Text>
              </View>

              <View className="rounded-3xl border border-vision-green/30 bg-vision-green/10 p-5">
                <View className="flex-row items-center gap-2 mb-3">
                  <Icon
                    name={{ ios: 'lightbulb.fill', android: 'tips_and_updates', web: 'tips_and_updates' }}
                    color={palette.greenDeep}
                    size={20}
                  />
                  <Text className="text-xs font-black uppercase tracking-[1.4px] text-vision-deep">
                    Pontos-Chave para o ENEM
                  </Text>
                </View>
                {lesson.keyTakeaways.map((point, index) => (
                  <View key={index} className="flex-row items-start gap-2.5 mt-2">
                    <Text className="text-sm font-black text-vision-deep">•</Text>
                    <Text className="flex-1 text-xs font-medium leading-5 text-vision-black">
                      {point}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Ação Principal: Praticar no Simulado */}
          <View className="mt-8 gap-3">
            <AppButton
              variant="primary"
              size="lg"
              fullWidth
              title="Praticar Questões Desta Matéria"
              icon={{ ios: 'doc.text.fill', android: 'quiz', web: 'quiz' }}
              onPress={() => router.push('/simulado/math-1')}
            />

            <AppButton
              variant="outline"
              size="md"
              fullWidth
              title="Voltar ao Cronograma"
              onPress={() => router.back()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
