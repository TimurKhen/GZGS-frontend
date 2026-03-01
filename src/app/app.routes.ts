import { Routes } from '@angular/router';
import { DeviceService } from './global/services/device-service';
import { inject } from '@angular/core';
import { HomePage } from './desktop/pages/home-page/home-page';
import { SubscriptionsPage } from './desktop/pages/subscriptions-page/subscriptions-page';
import { AnalyticsPage } from './desktop/pages/analytics-page/analytics-page';
import { Subscription } from './desktop/pages/home-page/subscription/subscription';
import { Registration } from './desktop/pages/profile/registration/registration';
import { SignIn } from './desktop/pages/profile/sign-in/sign-in';
import { CreateNewSubscription } from './desktop/pages/home-page/create-new-subscription/create-new-subscription';
import { ProfilePage } from './desktop/pages/profile/profile-page/profile-page';
import { canActivateAuth } from './services/api/user-api/guards/token-guard-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./desktop/desktop-handler/desktop-handler').then(m => m.DesktopHandler),
        children: [
            {
                path: '',
                component: HomePage,
                canActivate: [canActivateAuth]
            },
            {
                path: 'subscription',
                component: Subscription,
                canActivate: [canActivateAuth]
            },
            {
                path: 'subscription/:id',
                component: Subscription,
                canActivate: [canActivateAuth]
            },
            {
                path: 'add',
                component: CreateNewSubscription,
                canActivate: [canActivateAuth]
            },
            {
                path: 'subscriptions',
                component: SubscriptionsPage,
                canActivate: [canActivateAuth]
            },
            {
                path: 'analytics',
                component: AnalyticsPage,
                canActivate: [canActivateAuth]
            },
            {
                path: 'reg',
                component: Registration
            },
            {
                path: 'sign',
                component: SignIn
            },
            {
                path: 'profile',
                component: ProfilePage,
                canActivate: [canActivateAuth]
            }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./mobile/pages/home-page/home-page').then(m => m.HomePage),
        canMatch: [() => inject(DeviceService).getIsMobile()]
    }
];
 