Example:

```jsx
<ExchangeRateWidget
    apiUrl="https://api.exchangeratesapi.io/latest"
    currencies={['USD', 'GBP', 'EUR']}
    balance={{
        USD: 11111111111,
        GBP: 22222222222,
        EUR: 33333333333
    }}
    defaultFrom='USD'
    defaultTo='GBP'
    onCancel={() => alert('cancel)}
    onSubmit={({from, to, amount, ratio}) => ''}
/>
```
