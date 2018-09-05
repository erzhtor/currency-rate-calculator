Example:

```jsx
<ExchangeRate
  amount={123}
  from={"USD"}
  to={"GBP"}
  ratio={1.13}
  currencies={["GBP", "USD", "EUR"]}
>
  <ExchangeRate.Header />
  <ExchangeRate.From
    onCurrencyChange={currency =>
      console.log("Changed from currency", currency)
    }
    balance={123456}
    onAmountChange={value => console.log("Changed amount value", value)}
  />
  <ExchangeRate.To
    balance={432532.12}
    onCurrencyChange={currency => console.log("Changed to currency", currency)}
  />
  <ExchangeRate.Footer onSubmit={() => console.log("submitted")} />
</ExchangeRate>
```
