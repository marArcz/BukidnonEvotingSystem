import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/custom.css'
import '../css/app.css';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css'
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import axios from 'axios';
import AppLogo from '../images/app-logo-white.png'
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
// local
axios.defaults.baseURL = 'http://localhost:8000/api';

createInertiaApp({
    title: (title) => `${title} - Bukidnon Evoting`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#433BA9',
    },
    
});
