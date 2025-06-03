// styles.js
import { StyleSheet } from 'react-native';

export const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            backgroundColor: theme.colorBackground,
        },
        card: {
            backgroundColor: theme.colorCard,
            borderRadius: 20,
            padding: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 10,
            width: '100%',
            maxWidth: 600,
        },
        input: {
            width: '100%',
            padding: 16,
            borderWidth: 2,
            borderColor: theme.colorBorder,
            borderRadius: 12,
            backgroundColor: theme.colorBackground,
            color: theme.colorForeground,
            fontSize: 16,
        },
        label: {
            fontWeight: '600',
            marginBottom: 12,
            color: theme.colorForeground,
            textTransform: 'uppercase',
            fontSize: 12,
            letterSpacing: 1,
        },
        h1: {
            fontSize: 36,
            fontWeight: '800',
            marginBottom: 24,
            color: theme.colorPrimary,
        },
        h2: {
            fontSize: 28,
            fontWeight: '700',
            marginBottom: 16,
            color: theme.colorForeground,
        },
        h3: {
            fontSize: 22,
            fontWeight: '600',
            marginBottom: 12,
            color: theme.colorForeground,
        },
        textMuted: {
            color: theme.colorMuted,
        },
        center: {
            textAlign: 'center',
        },
    });
