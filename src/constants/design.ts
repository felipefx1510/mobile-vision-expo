/**
 * Vision Design System Tokens (WCAG 2.0 / 2.1 / 2.2 Compliant)
 * Todos os pares de cores possuem taxa de contraste mínima validada:
 * - Texto regular: mínimo 4.5:1 (Nível AA)
 * - Texto grande / componentes: mínimo 3.0:1 (Nível AA)
 */

export const palette = {
  // Cores de marca
  green: '#A6FF00',       // Verde Vision Primário (Contraste 14.5:1 com preto #10130E)
  greenDeep: '#4E7600',   // Verde Escuro para textos/links em fundo claro (5.4:1 com branco)
  black: '#10130E',       // Preto Principal (Contraste 18.2:1 com branco)
  ink: '#252A21',         // Preto Suave para textos corridos escuros
  gray: '#485243',        // Cinza Escuro de alto contraste (5.3:1 com fundo claro #F4F7EF)
  grayLight: '#697064',   // Cinza para bordas e ícones auxiliares
  light: '#F4F7EF',       // Superfície Clara
  white: '#FFFFFF',       // Branco Puro
  line: '#DDE4D7',        // Borda e divisores sutis
  surfaceCard: '#1B2017', // Superfície de Card Escuro

  // Cores Semânticas de Feedback (WCAG AA validado)
  feedback: {
    error: '#C5221F',      // Erro texto/ícone (5.6:1 com branco #FFFFFF)
    errorBg: '#FDF2F2',    // Fundo de erro suave
    errorBorder: '#F8B4B4',// Borda de erro
    success: '#1B7339',    // Sucesso texto/ícone (4.8:1 com branco #FFFFFF)
    successBg: '#F3FAF7',  // Fundo de sucesso suave
    successBorder: '#A3E0C1',
    warning: '#9E6000',    // Alerta/Aviso (5.1:1 com branco #FFFFFF)
    warningBg: '#FFFBEB',  // Fundo de alerta suave
    warningBorder: '#FDE68A',
    info: '#1A56DB',       // Informação (7.2:1 com branco)
    infoBg: '#EBF5FF',
  },

  // Anéis de Foco Acessíveis (WCAG 2.4.11 / 2.4.13)
  focus: {
    light: '#4E7600',
    dark: '#A6FF00',
  },
} as const;

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

export const touchTarget = {
  min: 48, // Mínimo de 48x48px (supera o requisito WCAG 2.5.5 / 2.5.8 de 44x44px)
} as const;

export const typography = {
  h1: { fontSize: 32, lineHeight: 38, fontWeight: '800' as const, letterSpacing: -1.1 },
  h2: { fontSize: 24, lineHeight: 30, fontWeight: '700' as const, letterSpacing: -0.8 },
  h3: { fontSize: 18, lineHeight: 24, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: '500' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '700' as const },
} as const;
