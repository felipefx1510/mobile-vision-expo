import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '@/components/brand-mark';
import { Icon } from '@/components/icon';
import { AppButton } from '@/components/ui/button';
import { palette } from '@/constants/design';
import { useAuth } from '@/context/auth-context';

const courses = [
  { id: 'med', label: 'Medicina', icon: { ios: 'cross.case.fill', android: 'medical_services', web: 'medical_services' } as const, cutoff: '810+ pts' },
  { id: 'eng', label: 'Engenharias', icon: { ios: 'gearshape.2.fill', android: 'engineering', web: 'engineering' } as const, cutoff: '740+ pts' },
  { id: 'dir', label: 'Direito', icon: { ios: 'building.columns.fill', android: 'gavel', web: 'gavel' } as const, cutoff: '760+ pts' },
  { id: 'tec', label: 'Tecnologia / CC', icon: { ios: 'laptopcomputer', android: 'computer', web: 'computer' } as const, cutoff: '750+ pts' },
];

const hourGoals = [
  { id: '10', hours: '10h/sem', desc: 'Ritmo Leve (2h/dia)' },
  { id: '15', hours: '15h/sem', desc: 'Ritmo Equilibrado (3h/dia)' },
  { id: '25', hours: '25h/sem', desc: 'Ritmo Intensivo (5h/dia)' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState('med');
  const [selectedHours, setSelectedHours] = useState('15');
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = async () => {
    setSubmitting(true);
    await signIn('aluno@vision.com');
    router.replace('/inicio');
  };

  return (
    <SafeAreaView className="flex-1 bg-vision-black">
      <ScrollView
        contentContainerClassName="flex-grow pb-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-xl flex-1 self-center px-5 pt-4">
          <BrandMark inverse />

          {/* Cabeçalho */}
          <View className="mb-6 mt-8">
            <View className="self-start rounded-full bg-vision-green/20 px-3 py-1">
              <Text className="text-[11px] font-black uppercase tracking-[1.5px] text-vision-green">
                Configuração Inicial • Passo 1 de 2
              </Text>
            </View>
            <Text className="mt-3 text-[30px] font-black tracking-[-1.3px] text-white">
              Qual é o seu objetivo no ENEM?
            </Text>
            <Text className="mt-2 text-sm leading-6 text-white/60">
              Personalizamos seu cronograma semanal e os simulados com base no curso e na sua disponibilidade.
            </Text>
          </View>

          {/* Seleção de Curso */}
          <View className="mb-6">
            <Text className="mb-3 text-xs font-bold uppercase tracking-[1.4px] text-white/70">
              Selecione seu curso pretendido
            </Text>
            <View className="gap-2.5">
              {courses.map((course) => {
                const isSelected = selectedCourse === course.id;
                return (
                  <Pressable
                    key={course.id}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={`${course.label}, nota de corte aproximada ${course.cutoff}`}
                    onPress={() => setSelectedCourse(course.id)}
                    className={`min-h-[54px] flex-row items-center justify-between rounded-2xl border px-4 py-3.5 active:scale-[0.99] ${
                      isSelected
                        ? 'border-vision-green bg-vision-surfaceCard'
                        : 'border-white/10 bg-white/[0.04]'
                    }`}>
                    <View className="flex-row items-center gap-3.5">
                      <View
                        className={`h-10 w-10 items-center justify-center rounded-xl ${
                          isSelected ? 'bg-vision-green' : 'bg-white/10'
                        }`}>
                        <Icon
                          name={course.icon}
                          color={isSelected ? palette.black : palette.white}
                          size={20}
                        />
                      </View>
                      <View>
                        <Text className="text-base font-extrabold text-white">
                          {course.label}
                        </Text>
                        <Text className="text-xs text-white/50">
                          Corte estimado: {course.cutoff}
                        </Text>
                      </View>
                    </View>

                    <View
                      className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                        isSelected
                          ? 'border-vision-green bg-vision-green'
                          : 'border-white/30 bg-transparent'
                      }`}>
                      {isSelected ? (
                        <Icon
                          name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                          color={palette.black}
                          size={14}
                        />
                      ) : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Meta Semanal de Horas */}
          <View className="mb-8">
            <Text className="mb-3 text-xs font-bold uppercase tracking-[1.4px] text-white/70">
              Sua meta de dedicação semanal
            </Text>
            <View className="gap-2.5">
              {hourGoals.map((goal) => {
                const isSelected = selectedHours === goal.id;
                return (
                  <Pressable
                    key={goal.id}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => setSelectedHours(goal.id)}
                    className={`min-h-[50px] flex-row items-center justify-between rounded-2xl border px-4 py-3 active:scale-[0.99] ${
                      isSelected
                        ? 'border-vision-green bg-vision-surfaceCard'
                        : 'border-white/10 bg-white/[0.04]'
                    }`}>
                    <View>
                      <Text className="text-sm font-black text-white">{goal.hours}</Text>
                      <Text className="text-xs text-white/50">{goal.desc}</Text>
                    </View>
                    <View
                      className={`h-5 w-5 items-center justify-center rounded-full border-2 ${
                        isSelected
                          ? 'border-vision-green bg-vision-green'
                          : 'border-white/30 bg-transparent'
                      }`}>
                      {isSelected ? (
                        <View className="h-2 w-2 rounded-full bg-vision-green" />
                      ) : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Botão de Conclusão */}
          <View className="gap-3">
            <AppButton
              variant="primary"
              size="lg"
              fullWidth
              loading={submitting}
              title="Começar Meus Estudos"
              icon={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
              onPress={handleFinish}
            />

            <Pressable
              accessibilityRole="button"
              onPress={() => router.replace('/login')}
              className="min-h-[44px] items-center justify-center py-2">
              <Text className="text-xs font-bold text-white/50">
                Já tem cadastro? <Text className="text-vision-green">Fazer login</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
