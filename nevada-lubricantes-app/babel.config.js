module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@/components': './src/components',
            '@/features': './src/features',
            '@/services': './src/services',
            '@/hooks': './src/hooks',
            '@/store': './src/store',
            '@/types': './src/types',
            '@/utils': './src/utils',
            '@/constants': './src/constants',
            '@/theme': './src/theme',
            '@/lib': './src/lib',
          },
        },
      ],
      // Reanimated plugin SIEMPRE debe ir el último
      'react-native-reanimated/plugin',
    ],
  };
};
