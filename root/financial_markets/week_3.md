# Financial Markets W3

## 1982 Savings Account

There used to be ads for savings accounts everywhere in 1982. Interest rates have gotten very low compared to then (used to be 7.4%). The term of a contract is the minimum amount of time that must pass before you can withdraw your money without penalty.

## Federal Funds and Interest Rates

The shortest term interest rate in the US is the Federal Fund Rate and it's an overnight rate. Most people who deal in this maturity of one day are banks, because individuals don't normally borrow money overnight - it's too short an interval. But it's a lively market, largly among bankers. Back in the day, interest rates used to be much higher. Now, it's very close to zero, and it's been at zero ever since the crisis. It;s an economic crisis that's brough equillibrium, short term interest rates down to zero. The European counterpart to the federal funds rate display the same behavior - it's an economic crisis thing, not a personality thing.

Why does a bank ever invest money at a negative rate when they can just pull the money out and hold cash? Cash by definition pay exactly zero interest, so why would a bank lend to another bank at a negative? First of all, if it becomes known that you have large amounts of cash in your vault, thieves might come to steal it, so you have to buy insurance against that. And then the insurance company will impost costs on you. Plus you have to hire trucks to drive it. Banks don't hold huge amounts of cash in their vaults. It's silly things like that that allow negative interest rates. (The European Federal Funds Rate is allowed to go negative because it's expensive for banks to store money).

So this brings us to causes of interest rates. Eugen Bohm von Bawek said that interest rates tend to be small positive numbers because of technical progress, time preferences and advatages to round aboutness. Why is it 3% or 5%? He said it's because the rate of progress is something like 3%. And that sounds plausible, the economy is moving forward. The other thing is that people are just naturally impatient. So we just want more today. And finally, advatages to round aboutness - that is advatages to more delayed and complicated production process. So all three of those were causes of interest.

There might be a connection that low interest rates are contributing to inequality. It's unfortunate that our efforts at policy can't help everybody. Monetary policy is a very blunt tool.

## Compound Interest

Suppose there's an annual rate of interest r, and suppose that you're putting your money in a savings account in a bank that promises to compound once per year. That means your interest is applied to the account once a year and you start earning interest on you interest at the end of the year. So if I put $100 into an account paying 3% compounding once a year, and I go to the bank after six months and I say I'd like to cash out of my account, what's it worth? They would say $100 because we haven't credited your annual interest yet. If you wait a full year, you can come back to the bank and now you get $103, now your account is marked up for compounding. If you go back to the bank in 18 months since you deposited, and you ask for your money, they'd say now you have $103 because we haven't credited your new interest for this year. You have to wait 2 years and after 2 years you have 1.03 * $1.03, which is a little over 1.06, if you have annual compounding. balance = (1 + r)^t after t years.

Now the banks often compound more often than once a year so suppose they compound twice per year. You put in $100 in a 3% compounding twice per year. If you went to get your money in the first 6 months, you'd still just get $100. After 6 months, you'd get $101.5, if you went after 9 months, you'd get $101.5. You'd have to wait one full year to get 1.015 * $100.

If it's compounded twice per year the balance is (1 + r/2)^2t after t years. Where t is any number, which is either one or, one plus, it's either an integer or an integer plus a half, in between it's a step function. And if it's compounded n-times a year, the balance = (1 + r/n)^nt.

Now if you take the limit of this expression as n goes to infinity, you get what's called continuous compounding, and then the balence is e^rt, where e is the natural number. So if they continuously compound, it improves your interest payments a little but more, unless r is really bit it's not, or t is really big, it's not a huge difference.

## Discount Bonds

Bond typically pay coupons. It used to be, that if you invested in a coporate bond or a gov bond it would be on a piece of paper that you would clip every six months where you'd take them to a bank and they'd give you the money. So, each coupon would be so much money. And then at the end of the maturity of the bond, you could take the whole thing back and get your amount. So a typical bond back then, in 1900 and going back, if you brought a $100 bond, and it was issued for $100, and had say as a $3 coupon. Then, you would pay $100. You'd wait six months, you'd clip a coupon, and it would say, pay to the bearer $1.5. You'd go to the bank and get your $1.5.

A discount bond is a bond that carries no coupon. Why would you buy a bond that carries no coupon? How do you get interest from it? The answer is because you buy it for less than $100, you buy it at a discount. There would be no other reason to buy it. We still call them discount bonds even if there's a negative interest rate than they're selling for more than $100 initially.

So if wwe look at the price of the discount bond, we can infer the yield to maturity from that bond. So if someones says, I have a bond that will pay $1 in T years, and it's compounding once a year, and the price I want is P, I can compute using this formula: P = 1 / (1 + r)^T. But typically, bonds pay interest every six months, so I might use this formula instead: P = 1 / (1 + r/2)^2T. If T is a number of years to maturity, and P is the price, then we will take P as the present value of the principle which I have as $1 here, divided by one plus 2 over 2, to the two T.

So the price today of the bond is called the present value. As a general rule, P is going to be less than one (discount).

We could do this continuously till you could say, what does that continously compounded yield to maturity. P = e^(-rT).

Now, we can define the present discounted value of any cash flow, not just a coupon flow, or the principal after T years for discount bond. Because we know that implicit in market prices for discount bonds, we can calculate the present discounted value of a dollar in any number of years. So what is a dollar one year today? What is the present discounted value of that? PDV (Present Discounted Value) of a dollar in one year = 1 / (1 + r). PDV of a dollar in n years = 1 / (1 + r)^n.

When you talk money with a banker, you're talking about money in future years, there's a little calculator going in his head, he has memorized the prices of all these discount bonds going out and he's translating it into present value or present discounted value.

On the other hand, we live in a good time for ignoring this, because right now, interest rates are virtually 0. But it will come back.

This is one famous formulas in finance. Now let's look at a conventional coupon varying bond which is issued at par. It's tradition to issue at par because you're getting your interest in the form of coupons. What they have to do is judge the market. If I want to issue with par, what coupon is the market demanding on a $100? Once I know that, I'll just pick that coupon, and I can be pretty sure that my bond will be picked up for $100 because I've got the market coupon. Full formula on lecture slide.

If I'm told the price of a bond, and I want to compute the yield to maturity r, I've got to solve this equation for r. It's not algebraically possible. Unless, t is very small. So you need a book. Maybe Wolfram Alpha. So many people think in terms of present values. And they want to know what the yield to maturity. What's the interest rate on a bond given its price.

## Console and Annuity

Consol is one that pays a quantity.

- Consol PDV = x / r where x is coupon.
- Growing Consol PDV = x / (r - g)
- Annuity PDV = x((1 - (1/(1 + r)^T)) / r)

This is an important point with bonds. The coupon is fixed at the time the bond is issues, but the market price of the bond changes through time. It's the market that does it, so bonds have market risk even if there is no default risk. If you buy a consol, you gov may live forever but you won't, so you're going to want to sell the coupon at some point. The gov doesn't guarentee the rate you will get for selling your consol, so there's market risk for our consol and for any long term debt instrument.

How can it be that if the interest rate is 0 then consols don't even converge. Doesn't the interest rate always have to be above the growth rate. I guess the answer is short term interest rates have 0 but longer term interest rates are still positive. The US doesn't have consols, but analogous to consols for example is land.

An annuity is like a consol except it stops after a certain number of years. A typical annuity is a home mortgage.

## Forward Rates and Expectation Theory

> Forward rates are interest rates that can be taken in advance using the term structure

Suppose I in 1925 expect to have 100 pounds to invest in 1926, but wan the money back by 1027. How can I guarentee th interest rate on the 100 pound investment today(1925)
How do I lock in an interest rate as an investor from 1926 to 1927? I buy in 1925, this number of two-period discount bonds maturing at 100 pounds in 192. They are two-year bonds. So if I'm buying a number of them, the cost to me is one pound over one plus r one. And then I have to short the 1925 one period dicount bond maturing at $100 in 1926. So I receive one over one plus r one pounds. I have locked in an interest rate equal one plus F which is equal to one plus this two-period yield-to-maturity squared all over one plus one period to maturity.

## Inflation
John Bates Clark invented the idea of the real interest rate.

The nominal interest rate is quoted in currency, but is not corrected for inflation. The real rate is quoted in terms of the market basket that underlines the price index.

If you are investing money at 3% for the next year and the inflation rate, consumer price index, is going up at 3%, what is your real rate? How much are you making in real terms? It's obvious, it's 0. If I have $3 more on my $100 investment, but everything that I want to buy has gone up by 3% then I have the same buying power. So I didn't get anything.

real rate = nominal rate - rate of inflation

Formula is more like this:

(1 + nominal rate) = (1 + real rate)(1 + rate of inflation)

Another really important investion in history is the investion of index bonds, which are bonds that pay coupons defined in real terms and a priciple, or one or the other in real terms. It was a clever idea, let's issue bonds whose coupons are just tied to the inflation rate, so that you know in real terms what you're getting.

## Leverage

If a company or an individual borrows money to buy assets, we say that person or company is leveraging.

> Leveraging means you are putting more money into the asset than you have.

That puts you in a riskier situation, but also both up and down. So if you bought $100 worth of stocks and it doubles in value to $200, you've make $100. But if you leveraged and the stock doubles in value, your portfolio goes from 200 - 100 to 400 - 100, or $300. So you double your profits. But on the other side is if the stock falls in value by 50%, then you're wiped out. Leveraging increases risk.

People look at how leveraged economies are and wonder about the chaos that might ensue in a market correction.

China is widely described as a highly leveraged country. Corporate debt, borrowing by corporations in China, is 160% of GDP in China. Whereas in the US, it's only 70%. This means that the Chinese economy is leveraged.

Debt leads to bankrupty - if you have no debt, you normally don't go bankrupt.

So what happens when there's a huge deflation and consumer price index goes down? That magnifies the real value of the debt. What ends up happening in a deflation is that the debtors get beaten down.

The overall level of debt in the economy (hence leverage) rises in real value because of deflation.

Why isn't debt indexed to inflation?

John Geanakoplos has written a number of papers on what he calls the Leverage Cycle. It points out that leverage has varied through time. Before the financial crisis, leverage became very high, particularly in the housing market.

## Market Capitalization by Country

> Market Capitalization is the price per share multiplied by the number of shares, and this is common stock.

































