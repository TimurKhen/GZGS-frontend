import { Routes } from '@angular/router';
import { DeviceService } from './global/services/device-service';
import { inject } from '@angular/core';
import { HomePage } from './desktop/pages/home-page/home-page';
import { SubscriptionsPage } from './desktop/pages/subscriptions-page/subscriptions-page';
import { AnalyticsPage } from './desktop/pages/analytics-page/analytics-page';
import { Subscription } from './desktop/pages/home-page/subscription/subscription';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./desktop/desktop-handler/desktop-handler').then(m => m.DesktopHandler),
        children: [
            {
                path: '',
                component: HomePage
            },
            {
                path: 'subscription',
                component: Subscription
            },
            {
                path: 'subscription/:id',
                component: Subscription
            },
            {
                path: 'subscriptions',
                component: SubscriptionsPage
            },
            {
                path: 'analytics',
                component: AnalyticsPage
            }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./mobile/pages/home-page/home-page').then(m => m.HomePage),
        canMatch: [() => inject(DeviceService).getIsMobile()]
    }
];
 