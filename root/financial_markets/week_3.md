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

The US Stock Market is not America. It's a claim on earnings of the coporate sector.

But what is the tangible assets that we can quantify and value through markets? According to the Federal Reserve, as of 2014, these assets were worth 98 trillion US. It asks people to add up everything they own (house, stocks, bond). But people don't own it free and clear, they have liabilities (for example people borrow money to buy the house, so they have debt). So we want to subtract off those liabilities.

What are mutual funds? They are collections of investments made by an investment company, who then sell shares to the public. Pension funds are investment companies that save for your retirement.

## The Corporation

So what is a stock? First, we have to think about the corporation. It's an organization that is incorporated, which means it's made as if it has a body, as if it's a person. A corporation is an artificial person. The idea is to create something that legally has a lot of the rights that individuals do.

Let's talk about a for-profit company. IT's governed by a board of directors that is elected by the shareholders. So it's called shareholder democracy. Typically, one share is one vote. The CEO is generally the top. So the CEO is hired by the board, serves as an employee, and has to report to the board of directors. Even non-profits are somewhat like this.

There are structures like in Germanym where a company will have two boards. A supervisory board which stands on top of the whole operation, and a board that does details, manages.

A for-profit is owned by shareholders and shareholders have one vote each share. The shareholders have a claim on the earnings of the company, and have to pay a coporate profits tax. The company has to pay a tax to the government on its earnings. Non-profit are not owned by anyone. The directors appoint their own successors. Generally the board appoints other people who have normally some idealistic commitment to the purposes of the non-profit. So the for-profit exists for shareholders. The non-profit exists for whatever the charter of the non-profit says. Non-profit doesn't mean they don't make profits, it means that they don't distribute profits to shareholders (the purpose is not to distribute profits).

- A for-profit has price per share, whereasa a non-profit is not traded in the market
- a for-profit is subject to corporate profits tax, which is not the case for a non-profit
- a for-profit is owned by shareholders, whereas a non-profit has self-perpetuating directors

## Shares and Dividends

My share of the company is equal to the total number of shares I own divded by the total number of shares outstanding for the company. So it's my number relative to the total. If I own half of the shares outstanding, then I own half of the company.

Companies do things called splits, where they will break a share in 2. Why do they do that? They seem to think that there's an optimal price per share that encourages investors. And so they will change the number of shares from time to time to try to hit a target for the price per share. This is essentially meaningless, all they're doing is changing the unit of measurement. So why do they do it? One reason is that they think if the share price gets too high, yuo can't buy a graction of the share - it gets too expensive and people like to buy in round lots because the brokers encourage that. It gets expensive you don't split. The compnay has a constitution, called the Coporate Charter, and the charter defines how things are done, but the general principle is guided by state laws. It's state governments that manage. You have to incorporate in a state, which means you choose a state to make your headquarters in. And that state then restricts what you can put into the coporate charter.

So the coporate law in the state defines the rights and responsiblities of shareholders and the board of directors.

You buy shares in a company to get dividends.

> A dividend is a distribution of money from the company's earnings to its shareholders.

It's like interest except its variable and tends to grow over time. The stock market goes up and down, creates capital gains and capital losses, but dividends are what's all about. Companies don't have to pay a dividend but typically young companies don't. Once they're mature they like to start paying dividends and it signals to the world that they're really making money.

So when a compnay pays a dividend, what happens to the share price? It's simple, it drops.  This is because the company used to have the money and now it doesn't, it paid it out. But I have to qualify that - it doesn't drop in value when you get the check in the mail for your dividend. So a company has to define what they call an X dividend date. That means they will pay out the dividend, typically chorally dividend every 3 months. They'll pay out this dividend to shareholders of record on this date. So company values drop routinely on the X dividend date. But that doesn't mean bad news about the company at all.

## Common vs Perferred

Common Stock:
> Dividend is at discretion of firm, subject to legal restrictions.

Preferred stock:
> Specified dividend that does not grow through time, and like common stock, it does not have to be paid. But firm cannot pay dividend on common stock unless all past preferred stock dividends are paid.

Typically, the deal is this: the company is supposed to pay out a fixed dividend to the preferred stockholders, but it doesn't have to. But, it cannoy pay a common stock dividend until it's paid up on its preferred stock dividends. In contrast, corporate bonds have a contractual obligation to pay a dividend. So that is, if the company gets in trouble and it doesn't pay out its coupon, the shareholders can come back and sue. Preferred stockholders can't do that.

## Corporate Charter

The basic coporate charter emphasizes that all common shareholders are treated equally. They don't have to pay out dividends to them, but if they do, it has to be that every share gets the same. That's where the word equity comes it, it's equality of shareholders.

The firm can also repurchase shares instead of paying a dividend. They can do what they want, but the fundamental thing that ties it down is that all shareholders have one vote, and they elect the board.

But Berle and Means thought that it doesn't work so well for big companies. When there are millions of people voting, it doesn't work so well. Berle and Means said that, while in practice we have shareholder democracy, in practice the democracy is imperfect. It's really self-perpetuating Boards of Directors. And what that lead to was new regulation that tried to allow for takeovers of companies. They said that a lot of companies were ill managed and managed fro the interest of the board of directors. You can't influence the votes of so many people. So they made it easier, 1935 the Securities and Exchange Commission under authority of the act that had just created it in 1934, established rules for proxy contests. So that people who wanted to change the governance of the company could reach the shareholders and ask them to sign a contract to let you vote on my behalf. You would give them the right to be a proxy for you at the shareholder's meeting. In 1956, amendments made proxy contests difficult. But then people later as we move to a more free market governance, relaxed the 1956 amendment so that proxy contests came back.

Some companies have classes of shares, as permitted by state law. You can have both voting and non-voting shares. The NY Times have both class A shares and Class B shares. Class A has less voting rights than class B. Why? They think that the NYT serves a higher purpose. So they gave the original NYT family more voting rights that the other shareholders. This has been under criticism but is still maintained.

## Corporations Raise Money

There's three major ways to raise money as a company.

1. Retained earnings
  - You can wait until you've made enough money, and then build your new factory
  - But this is slow because you have to wait until you've got the retained earnings to do that
2. Borrow money, either through banks or issue debt and sell that through a broker
3. Issue new shares

When issuing new shares, shareholders are going to look at that and say wait a minute. I used to own 10% of the company and now I only own 5%. But then the board would say don't worry, we brought in millions of dollars, and you own a share of that so the company has more now.

When they issue more shares, your share in the company goes down, defined as the total shares you have divided by total shares. You've given up some voting power in order to get money to expand the company. But here's why they call it equity, because all common shareholders are equal.

Myers (prof in MIT) proposed what he called the Pecking Order Theory of coporate finance. The best way to raise money for corporate actions, according to what he said board think, is retained earnings. You feel most comoftable. But if you say let's go to the bank and borrow money, then they get a little nervous. The other thing you can say is let's issue new shares. Now they get creeped out, they're thinking I'm going to be giving up power to other people.

## Dilution

Sometimes companies will issue a dividend in shares, it's called a stock dividend. So you might get a letter from your broker saying the company has now paid a stock dividend of 5%, which means your 100 shares are now 105 shares. The price per share is $30, so you've got five new shares. It's like getting a dividend of $150. But that's what most people think. What is the next question you ask your broker? The company has issued new shares, so that I can be paid a dividend in shares, and now I have 105 shares, is that the same as getting $150 in cash? The question you would ask your broker is, wait a minute, every share holder is getting these share dividends, it's equity, they can't pay me a stock dividend without paying the other. So the total number of shares when up by 5%. Calculating what fraction of the company I own, it's the same. That means nothing.

Typically they issue stock dividends as kind of a trick. It's fishing for fools.

## Share Repurchase

Instead of issuing new shares to raise money, the company can repurchase shares outstanding. It's an alternative way of paying a dividend.

Imagine that a company is about to pay its dividend - it's been paying $2 a quarter regularly per share and they're about to pay it. And then someone says, why don't we send out a different letter this time? Instead of saying this is a dividend, let's send a letter that says this $2 is repurchasing 1% of your shares. Everyone gets the same letter. So if you get this in the mail, you would say what's this? I got my $2 dividend check and I also get a letter saying this is share repurchase. You might be confused, what does this mean? It's $2, and the share repurchase if it's everyone equal doesn't affect the fraction of the company that I own, so the letter is nonsense. It's just the same thing as paying a dividend.

Now, some people say that's because the stock market was low, and so companies were buying back their shares at a low price. But now prices are way back up aggain and companies are still repurchasing their shares. So what's going on here? It's been 2% of shares per year, which is comparable to the dividend rate. On the aggregate US stock market has been something like 2%. So how do they get that? It seems the important thing is that there's a tax break. If they do share repurchase instead of dividends, it's the same thing, buy you can fool the IRS. Suppose the company pays out a $2 dividend, and then I would get $2 in dividends, and then I would have to pay income taxes on those. But if they do share repurchase, if I didn't participate in selling my shares to the company, then my value of shares goes up by something like $. But I don't have to pay taxes on it because I don't have to pay taxes until I sell. So I can postpone them maybe indefinitely.

Capital gains taxes do not have to be paid until you sell the shares. So there's a tax incentive for share repurchase rather than dividends.

## PDV of Expected Dividends

Most of the return people have gotten historicall from stocks is in dividends, not in capital gains. It's correct ot think that efficient markets implies that what you're really pricing in the stock market is a claim on dividend. It's all about dividends.

There's two important ratios:

1. Price earnings ration, price per share divided by earnings per share
2. Price dividend ratio, where its dividends per share divided by price per share

What does price earnings ratio mean? It's different for different companies, some have a high price earnings ratio. It could be as high as 100 (very unusual), which would mean that you'd have to wait 100 years to get your money back based on dividends, if you bought it. That's a long time to wait, more typically the price earnings ratio is something like 15. So you'd buy a share and in 15 years, if you're getting all the earnings as dividends, you'd have your money back.

So what determines the price earnings ratio? The efficient markets idea is that the price of a share is the present discounted value of its expected future dividends. And then I can apply the Gordon Rule, which says that the price should equal to earnings divided by r minus g (r is the discount rate, and g is the growth rate of earnings). So the price earnings ratio is 1 / (r - g).

This is an important model because it gives you a theory why some firms have high price earnings ratio and other firms have low price earnings ratio. It always has to do with r and g. So if a company has a low price earnings ratio, according to efficient markets, that means either r is high for that company or g is low for that company or a combination of both. Why would r be high for a company? The expected return on a stock is a function of its covariance with the market. So that would mean that companies whose return covaries with the market should tend to have via this r thing low price earnings ratio. In simple terms, they're riskier in that they co-vary with the market. The other thing is g. Some companies have very high growth prospects. But in efficient markets, that's not a reason to invest in them because the price will reflect the growth in earnings already, so it will already be discounted into the present value. So anyway, high growth companies should tend to have high PE, a low PE would be a low growth company.

The question is, does the efficient markets model work? It half works. But there's another approach to investing called value investing. Graham and Dodd wrote a textbook that outlined their thought that PE varies for other reasons than just this technical reason that we talked about, because companies go in and out of fashion. And when they're hot, people bid them up too high. And when they get ignored, they get low PEs. So value investing is still with us and it still works, although it hasn't worked int he last five years (generally it does work).

## Why Do Firms Pay Dividends?

ALmost all the value of the stock inherently is due to the dividends. But firms don't even have to pay dividends, and they often go through years and years without paying dividends. Firms can get money to their shareholders in another way besides paying dividends. You can buy back shares. But there are other reasons why firms pay dividends. Shefrin and Statman described what they call a self-control theory of dividend. There's a lot of people who invest in stocks and have a personal rule of thumb that I will never dip into principal. But if dividends go to zero, they're in trouble, they won't have any income.

Another theory is that they use dividends to prove to the public that they're really worth something. It's called signaling theory where you do something not for its intrinsic valye but because it proves something about you. And so firms are signaling. They pay dividends just to show that there's real money here. But this kind of signaling does impose taxes, whereas repurchase of shares will not involve any tax until you sell the shares again.

Linter interviewed people who set dividend policies for firms and asked how they did it. They said all sorts of things but the bottom line is, they just gradually adjust toward earnings per share. So they have some target payout ratio. They change the dividends only slightly each quarter, reglecting an adjustment toward the target dividend price ratio. Earnings jump around. So when earnings jump, you don't raise your dividends right away, you just lag behind.

Just to give you some idea, back in 1968, general public utilites court (utilities company) proposed a substitute stock dividend for cash dividends, and offered to sell the stock dividend to the stockholders for a minimal cost. They were saying "Instead of paying the dividends, we decided to buy back some of your shares. So you now have less shares, but you get the same check, and you're going to get the same check in the future because everybody's shares went down". He explained all this, and they didn't get it. He was trying to save them on taxes but instead he got death threats. Investors are emotional and they somehow didn't like the sound of this.

Quiz notes:

- Market capitalization is calculated by using: the price per share and total number of outstanding shares
- The greater an investors ownership in a corporation is, the greater: the total number of shares he/she owns with respect to the total number of shares outstanding
- A firm must make its dividend payments to preferred shareholders before it makes any dividend payments to its common shareholders
- The basic coporate charter:
  - does not say that the firm ever has to raise debt the board deciides
  - does not say that the firm ever has to issue warrants, convertible debt, or any other debt securities
- In the Pecking Order Theory, the companies prioritize their sources of financing in the following order: Internal financing, debt issuance, equity
- A dilution is: a reduction in the owndership percentage of a share stock caused by the issuance of new shares
- A share repurcahase is:
  - a program by which a company buys back its own shares from the marketplace or from its shareholders (at a fixed price)
  - the reverse of a dilution
  - an alternative to paying dividends in order to return cash to investors
- The price to earnings ratio:
  - effectively shows the number of years of earnings at which the company is valued given the current level of the share price
  - shows how much an investor is willing to pay for the stock of the company for each dollar of the company's earnings
- Generally, a reduction in dividend is interpreted by investors as: bad news, with often a drop in the stock price
