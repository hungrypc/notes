# Financial Markets W1

## Lesson 2

### Variance at Risk (VaR)

> A measure used to quantify risk of an investment or portfolio

- VaR is usually quoted in unites of $ for a given probability and time horizon
- 1% one-year VaR of $10 million means that there's a 1% chance that a portfolio will lose $10 million in a year

Stress Tests
> Testing firms' ability to withstand economic crisis. It's a method of assessing risk to firms or portfolios.

The idea of a stress test is looking at a portfolio, not just by its historical returns, but at the details of the portfolio and ask what vulnerabilities there are at times of crisis. These are usually ordered by governments.

The Dodd Frank Act of 2010 requires the Federal Reserves to do annual sterss tests for nonbacnk financial institutions it supervises for at least three different economic scenarios.


### S&P 500

Variance: Apple vs S&P500
- Standard deviation of Apple capital gain in decade shown is 12.8% a month
- Standard deviation of S&P500 return in decade shown is 4.7%

There is a correlation (as represented with a regression line on a scatter diagram). Apple is more variable though, it tends to overreact to what happens in the aggregate stock market.


#### Beta

> The regression slope coefficient when the return on the ith asset is regressed on the return on the market. Put simply, the Beta of a stock is the measure of how it relates to the stock market.

- If the beta is 1, then the asset tends to go up and down one for one in terms of return with the aggregate market
- The CAPM implies that the expected return on the ith asset is determined form its beta

The concept here is: market risk vs idiosyncratic risk. Market risk is the risk of the whole stock market. For an Apple investment, the market risk of that investment is the risk that Apple will do something in reaction to the aggregate stock market. But idiosyncratic risk is Apple only risk (eg death of Steve Jobs, product flop, etc).

```
variance of the return on a stock = beta^2 * variance of the market return (systematic risk) + variance of the residual in the regression (idiosyncratic risk)
```

> A regression line is a single line that best fits the data in a scatter plot. The vertical distance between a given dot and the regression line is that dot's residual (also known as the error of your proposed line with regard to that single dot). To minimize some combination of all residuals, statistics proposes using the least squares method.

Equation for a line -> y = mx + B.

The slop m is how much y changes for a 1 unit increase in x. In finance:
- y = return on Apple stock
- x = return on the market
- m = beta
- B = Alpha

Slope beta tells how much a partifular stock co-moves with the market and thus as a measure of the stock systematic risk. Idiosyncratic risk is the risk that the point will lie above or below that line.


### Distribution and Outliers

The distribution has two parameters, its mean and its standard deviation. Many random variables in nature tend to follow a bell curve of distribution, but finance tends NOT to follow this distribution - we tend to have outliers or fat tails.

There are other distributions that are more characteristic of financial returns, one of which is called the Cauchy distribution. With normal distribution, you would not see it deviate too much, it tends to have a uniform kind of look to it through time. The Cauchy looks normal for some intervcals of time, then suddenly deviate greatly. In other words, the distribution under Cauchy is fat tailed. You can be deceived by a fat tailed distribution like the Cauchy into thinking that you're living in a fairly stable world, but the problem is that there are these big events that occur from time to time.

The Central Limit Theorem in Statistics says that, averages of a large number of independent identically distributed shocks or random variables is approximately normally distributed, but that central limit theorem assumes that the underlying shocks do not have fat tails. If you're taking the average of stock market returns which tend to be fat tailed, then your average is not a good inication of the real average over long intervals of time because you might have gotten a sample where none of the fat tail outlier stocks occured.


### Chalk Talk - Covariance

Let's sasy there are two start ups, both trying some risky new venture. Both have a 50% chance of succeeding. If they succeed they're worth a million dollars, and if they fail they're worth 0 dollars. So we have two probability distributions. The question is, are these two businesses really independent?

There's 4 possiblities, the COV (Covariance).
  - They both succeed (.5 * .5)
  - They both fail (-.5 * -.5)
  - One succeeds and one doesnt (-.5 * .5)

```
COV = .25(.5 * .5) + .25(-.5 * -.5) + .5(-.5 * .5) = 0
```
We like that, we want to see independent investments.

BUT that's not actually the case, these two companies are betting on the same idea, so these numbers are incorrect. It turns into this:

```
COV = .5(.5 * .5) + .5(-.5 * -.5) + 0(-.5 * .5) = .25
```
That's a flag that there is danger here. The fact that the covariance is positive indicates that these two stocks tend to move in the same direction, somewhat simultaneously. Covariance changes based on how we assign the probability of each pair of outcomes occuring. You should be looking for low covariance. The theory of capital S pricing tells you how to take account of covariance. Risk is determined by covariance, especially if you hold a large number of assets. Idiosyncratic risk doesn't matter, it all averages out. It's when they do the same thing that you have to worry about.

The beta of the i stock = COV with the market / variance of the return on the maret

```
beta  = COV(V1, Vmarket) / Var(Vmarket)
```

The basic CAPM says that the market demands higher returns from higher beta stock. That means high covariance with the market stock. And they are willing to take no returns if the beta is low, because that means it's less contributing to risk in the portfolio. The reason we care about covariance here is because we have the presumption that we're risk averse.

The real world is not so cut and died, the CAPM model is an abstraction/idealization. And it assumes that there are well-defined probabilities for everything, but things don't behave entirely in accordance with this model. It's just a great model as a first step in thinking about financial markets. This can prevent you from making a lot of mistakes.


## Lesson 3

### Insurance Fundamentals

Policyholders have a contract with the insurance company to protect t hem against certain well-defined risks, which they pay a premium for its standing ready to manage those risks. Risk pooling is the theory that, what is a risk for one person is not a risk for society at large if they are independent. By the Law of Large Numbers, the number of bad outcomes are fairly predictable. The average of the results obtained from a large number of trails should be close to the expected value and will tend to become closer as more trials are performed. This is important because it guarantees stable long-term results for the aveerages of some random events.

Moral hazard occurs when people take more risks knowing that they're insured. Selection bias is different, in that the insurance company may not be able to see all of the risk parameters that define risk.


### Insurance Milestones
Insurance developed because of specific technical advances, like the development of actuarial theory. It was in the 1600s when the first life tables were produced, which showed the probability of dying at each age. In 1840, Morris Robinson had the idea that insurance companies needed an insurance salesman. Henry Hyde in the 1880s having the sales appeal of having insurance with a large cash value - if you stop paying your insurance, you lost the cash value.

Note: this lesson is just history, not interesting at all.


## Lesson 4

### Eggs in One Basket

An alternative to insurance: managing risk, not through purchasing an insurance policy, but through diversifying your portfolio. Risk is inherent to investing. The core insight of this theory is that if I can serve quantified risks and returns and I calculate the optimal portfolio, it's going to be the same for everyone else. The difference comes from variation and tolerance to risk, which could be adjusted by leveraging your portfolio up and down. If you abstract from that adjustment, everyone should really be doing the same thing. So, what you would naturally care about is the mean and variance of the return of your whole portfolio. Care about the average return of your total portfolio, and care about how uncertain the total return of the whole portfolio is.


### Salon - Risk

Hedge funds are investment companies that are not approved for the general retail market. To invest in them, you have to be an accredited investor, not a general investor. This allows them to do sophisticated and dangerous things. Hedge funds are regulated for people who have professional advisors or family offices.

We are in a situation where we had heightened recodnition of the importance of regulating for dealing with systemic risk. A systemic risk is risk that the whole system will collapse, like a house of cards. Regulation before the 08-09 crisis was mostly mico-credential - that means that they wanted to make sure that you as an investor were not being ripped off by some stockbroker squirrelling away your money. They were thinking of you as an individual, but we've now had new ipetus for macro-credential regulation, and it's now regulation about how interconnected are you with some other big business, and what will happen if that other business fails? So, since the 09-09 financial crisis, we've seen a lot more macro-credential regulation and a lot more measures of risk that are being developed (stress tests, etc).


### Capital Asset Pricing Model (CAPM)

- CAPM asserts that all investors hold their optimal portfolio
- Consequence of the mutual fund theorem: all investors hold the same portfolio of risky assets, the tangency portfolio
- Therefore, the CAPM says that the tangency portfolio equals the market portfolio

The idea here is that individuals should diversify. But diversification is difficult for individual investors because, especially if you're a small investor, you'd have to buy fractional shares of each company. Stock brokers preger that you what's called round lots of 100 shares. You just can't do it, you're too small to diversify. SO, would you need some company to help you diversify your portfolio. People need investment funds to manage their portfolio for them and the investment funds can diversify optimally for them.

Before the 40s, we had what were called investment trusts, later to become knwon as mutual funds. A mutual fund or management company invests on your behalf in assets and it's mutual in that it doesn't skim off profits to a class of stockholders, it's divided up equally  among all the people who invest in the mutual fund. But the mutual fund puts together assets.

Often when we talk about CAPM, it is assumed that we're diversifying across all stocks and bonds. But, if you wanted to be completely diversified, you'd want to include other assets such as real state or commodities such as oil as well. What CAPM says is that it doesn't matter what your risk is, if you hold a wide range, it will average out to be the best for you.

Jeremy Siegel calculated the average rreturn on the stock market in the US from 1802 to 2012 (210 years). He finds that the real inflation corrected return on average for those 210 years was 6.6% a year. On the other hand, the US geometric average real short government return was only 2.7%. The premium of stocks over short term saving vehicles on average for 200 years was 3.9%. How can that be? This is called the equity premium puzzle - how can it be that one investment has done so much better overall for 200 years compared to another? Will Goetzmann said that, to some extent, the US quity premium is a problem of reflex, a selection bias problem. So looking at the success of stock market investments in the US is misleading. It seems like we may be making a fallacy in assuming that it is law that stocks outperform other investments


### Chalk Talk - Beta

Referring to the regression line.
- Slope of line = beta
  - If it has a slope of 1, that means the stock is reacting 1 for 1 with the market
  - e.g If a stock's beta is 1.5, it reacts more strongly with the market
- Company-specific risk = idiosyncratic risk
  - The theory of CAPM is that investors care more about beta than idiosyncratic risk, because idiosyncratic risks will average out and won't matter
- Gold might in many cases be a negative beta stock
  - When the market is doing well, gold might not necessarily be a great optionn in terms of returns.
  - But when we have a recession, that's when you'll see returns highest for hold
  - When constructing a portfolio, it matters. You'd like to have other things equal


### Chalk Talk - CAPM and Diversification

The most impressive conclusion of the capital asset pricing model in finance: a relationship between the expected return on an asset an its beta. What the equation says is that the expected return on the i asset is equal to the risk free rate expected. What this says is that this is a consequence of two things:
1. The theory of forming an optimal portfolio
2. The assumption that everybody does it

We're talking about a world in which everyone has a smart money manager who looks at variances in covariances and figures out. Then in that world, it should be that this equation holds, some assets have a higher return than other assets. Does that mean that investors were stupid who invested in other assets? No. The higher return is associated with higher beta, whcih means more risk. The smart investor would hold all of the stocks. All of the assets, whehter it's stocks, bonds, real estate, everything gets held and not everything has the same predicted return. You can predict that some will earn more than others, but it's always because of higher beta.

Some assets have a expected return return which is less than the riskless rate. Those are negative data assets, like gold. So why would we ever invest in gold when it has  alower return than the riskless rate? Because the negative beta is helping reduce the overall variance of their portfolio. Gold goes up when the stock market goes down, it offsets other risk.

So, this is a description of a world in which everybody is holding the tangency portfolio. It all fits a model of looking at beta and adjusting your portfolio so that you have the optimal mix. The problem is that actually not everyone is holding the optimal portfolio, we don't all own the same portfolio of risky assets. It's just a useful exercise to think about an idealized world where this holds.


## Short Sales

If we were to compute the optimal portfolio, given the risk and return of individual stocks, how do we know that you won't want to hold negative quantities of some assets?

This is what's called a short sale. You can hold negative quantities of a stock just as well as you can hold positive quantities. How do you own a negative quantity of a stock? What it means is you borrow the shares and you sell them. Now you owe the share to someone else. You would do this if you think the price is going to go down. Instead of not buying it, I'll buy a negative quantity of it.

It turns out, however, that if you really take the idea that everyone would do the same thing (CAPM model), no stock could ever have an optimal holding of a negative number because there would be a negative holding for everybody. Everyone would want to short it, and that can't add up. This brings up the question, who is providing the stock for you to short?

We're going to assume that everyone does careful calculations of the mean and standard deviation of their portfolio return. What that implies is that there will be an optimal portfolio and we should be on what's called an efficient portfolio frontier.


### Calculating the Optimal Portfolio

So, let's just think about one risky assets and one riskless asset. Suppose I put X dollars into a risky asset one. Now suppose I'm going to invest $1 in total, the money i have left over after I invest is 1 - X, to help with that second asset, which is earning a sure but low return of rf. What is the expected value of the return on my portfolio? I have X dollars in the first asset so it's going to be X times the expected return on the first asset (risky asset). And I've got 1-X dollars in the riskless rate. So the total expected return is Xr1+1-X*rf. So, what is the variance of my return? The variance is just equal to X squared times the variance of the return on the first asset. So if X is one, that means I put it all in the first asset, then it's just the portfolio variance is the variance of the return on the first asset. What if I shorted? If I shorted, that doesn't sound like a smart move, generally, on average shorting the stock market and investing in the riskless asset. But I could do that. I could make X= -1, and then I would have $2 invested in the riskless asset. My portfolio variance would be the same, but I'd be on the wrong end of it. Assuming that the numbers are right, I would be shorting the high return asset and investing in the low return asset. You can compute the portfolio fo standard deviation which is just the square root of this portfolio variance. The standard deviation of the portfolio is linear in the expected return on the portfolio.

The real answer here is: you want an expect return, I can give it to you on stocks and anything you want, but I'll do it by exposing you to risk. You wan't 100% expected return? Great. I'll leverage it to the hilt, and then you'll have that expected return which will probably get wiped out because you've taken on to leverage that investment.

Let's illustrate the idea of how levering up to the hilt can give you any expected portfolio return you want. Let's say you start with $1 and there are only two investable assets in the world. Say the risky asset offers an expected return of 20% and a return standard deviation of 5%. The other asset is the risk free asset which guarantees a return of 10% with no risk. If you want 100% expected return on your $1 portfolio. First, borrow, AKA short, $8 frmo the risk free market, and now you have $9 to play with. Invest all $9 in the risky asset. This provides you with an expected return next period of 20%, so your portfolio now has $10.8 on average. Pay back what you owe, which is 8*1.1 = $8.8, you're left with $2 in your portfolio and you have this doubled your initial investment on average. Remember though, you took on an 8 to 1 leverage ratio to get here. Using the formula, the standard deviation of your portfolio return was 9 * 5%, or 45%. If the risky asset realized any return less than -2.2% which is half of one standard deviation away from the mean, you would have to file for bankruptcy.

Now, suppose we move from just one risky asset to two risky assets. Now I want to put $X1 in risky asset one, and 1-$1X1 in risky asset two. What is the portfolio expected return? The expected value of the return on my portfolio is equal to X1 (the dollars I put into asset 1 * the expected return on asset one + 1-$X1). Now what is the variance of this portfolio? It turns out that this is the formula: X1^2 * variance of the return on asset one + 1-X1^2 * variance of return on asset two + 2X1 * (1-X1) * covariance of returns. Now the covariances matter because if they covariate positively, that makes them interact in a positive way increase variance. So, positive covariance is bad for your portfolio because ir raises the variance of your portfolio. Negative covariance is good. If you can find two risky assets that move opposite each other, then covariance is negative and this reduces the portfolio variance.


### The Efficient Frontier

The efficient portfolio frontier expresses the standard deviation of the portfolio in terms of r, the expected return on the portfolio instead of X-1. You don't ever want to be below the minimum variance point (called the dominated).

Do more research on this, this course is more thought exercises than defining concepts.


### Chalk Talk - Gordon Growth Model

Myron Gordon gave a formula for the present value of a growing quantity.

Suppose we have an asset that is producing revenue for you every year, and the revenue is growing in value. It produces x the first year, then it produces x * (1 + growth rate) the next year, then it produces x * (1 + growth rate)^2 the next year, and it does that forever. So the question is what do you pay for this asset at year 0? Gordon suggested that the present value = x/(r - g), where r is the rate of discount. This applies as long as g < r. If g < r, then each term is smaller than the one before it and it sums to a finite number. If g = r, then every term is x/(1+r), so the sume would be infinite.

You can make a fortune investing in busineses that are declining as long as you're buying them for less than the present value.

This is a very useful formula because a lot of possible investmentss have a growth rate. You look at their earnings today and you think 'what is the stream of future earnings worth?'.

The key takeaway here is making sure you invest in something you can buy for less than its present value.


### Quiz notes

The expected return of a portfolio is computed as ... and the standard deviation of a portfolio is...

Answer:
- The weighted average of the expected returns of each asset in the portfolio, weighted by the investment by the investment in each asset
- NOT the weighted average of the standard deviations of each individual asset

standard deviation = (p(1 - p)/n)^.5























