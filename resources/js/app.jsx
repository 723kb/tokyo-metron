import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Header from './Layouts/Header';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
        <I18nextProvider i18n={i18n}>
            <App {...props}>
                
            </App>
        </I18nextProvider>);
    },
    progress: {
        color: '#4B5563',
    },
});
