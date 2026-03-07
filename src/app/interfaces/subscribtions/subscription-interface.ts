export interface SubscriptionInterface {
    name: string,
    cost: number,
    next_billing: string,
    cancellation_link: string,
    status: boolean
    subscription_avatar_url: string,
    category: string,
    url_service: string,
    use_in_this_month: boolean,
    subscription_id: string
    user_id: string
}
