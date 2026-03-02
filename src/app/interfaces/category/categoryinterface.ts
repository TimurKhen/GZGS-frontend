import { SubscriptionInterface } from "../subscribtions/subscription-interface";

export interface Categoryinterface {
    name: string,
    cost: number,
    subscriptions: SubscriptionInterface[]
}
