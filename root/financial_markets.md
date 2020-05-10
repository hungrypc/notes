# Financial Markets

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

The concept here is: market risk vs idiosyncratic risk. Market risk is the risk of the whole stock market. For an Apple investment, the market ris of that investment is the risk that Apple will do something in reaction to the aggregate stock market. But idiosyncratic risk is Apple only risk (eg death of Steve Jobs, product flop, etc).

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


### Covariance

Let's sasy there are two start ups, both trying some risky new venture. Both have a 50% chance of succeeding. If they succeed they're worth a million dollars, and if they fail they're worth 0 dollars. So we have two probability distributions. The question is, are these two businesses really independent?

There's 4 possiblities, the COV (Covariance).
  - They both succeed (.5 * .5)
  - They both fail (-.5 * -.5)
  - One succeeds and one doesnt (-.5 * .5)

COV = .25(.5 * .5) + .25(-.5 * -.5) + .5(-.5 * .5) = 0



























