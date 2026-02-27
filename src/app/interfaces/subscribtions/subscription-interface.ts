export interface SubscriptionInterface {
    name: string,
    cost: number,
    next_billind: string,
    // status: 'paid' | 'unpaid',
    cancellation_link: string,
    isPaid: boolean
    subscription_avatar_url: string,
    category: string,
    url_service: string,
    use_in_this_month: boolean,
    subscription_id: string
}
