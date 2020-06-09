# Calculating and Comparing Rates of Return

## Calculating a Security's Rate of Return
To determine whether your return was good, we need a measure that ensures comparability between investments with different market prices. To do this, we calculate a percentage rate of return of the investment. Once we do that, we can compare it to other investments.
> rate of return = ((ending price + dividend) - beginning price) / beginning price = ((ending price + dividend) / beginning price) - 1

This is called a simple rate of return. 

We can calculate the logarithmic return of the investment:
> log(ending price / beginning price) = log(ending price) - log(beginning price)

Simple and log returns provide slightly different results. So it's important to be consistent with the way we calculate returns.

Most econometricians believe simple returns are preferable when you have to deal with multiple assets over the same time frame. Log returns are preferable when you have to make calculations about a single asset over time. 

Always remember the time frame for when you calculated the rate of return. Investments with different holding periods shouldn't be compared. Typically, investors use daily, monthly, quarterly, or yearly returns. Most popular expression is annually. 
> annual return = [(daily return + 1)^365] * 100 - 1

We can't predict the future rate of return, but we **can** form a reasonable proxy and call that proxy expected rate of return. The best idea we can have about a financial security's expected rate of return is its past behavior. Historical performance can help us build expectations about the future.

## Rate of Return with Python

```py
import numpy as np
from pandas_datareader import data as wb
import matplotlib.pyplot as plt

PG = wb.DataReader('PG', data_source='yahoo', start='1995-1-1')
# importing Proctor and Gamble data from Yahoo Finance for the period from 1995-1-1

PG.head()   # first 5 data
PG.tail()   # last 5 data

# this is all we need to calculate PG's rate of return from 1995 to today

# when calculating the rate of return, we use the adjusted closing price, these adjustments reflect dividend payments to shareholders and operations such as stock splits

# so we do our rate of return calc starting from 1995-1-3 on 1995-1-4 and keep going down. best way to org data is do it in a column, here's how we create one

PG['simple_return'] = (PG['Adj Close'] / PG['Adj Close'].shift(1)) - 1
print(PG['simple_return'])
# this exhibits the percentage daily change of the adjusted closing price

# let's plot them on a graph:

PG['simple_return'].plot(figsize=(8, 5))
plt.show()
# in finance, we're accustomed to seeing negative returns that have a much higher magnitude of positive returns. 
# usually, positive returns accumulate over time and stock prices increase
# but when things go wrong, prices fall hella quick
# long run investors are mainly interested in avg rate of return

avg_returns_d = PG['simple_return'].mean() 
# avg RoR for entire data set
avg_returns_a = PG['simple_return'].mean() * 250
# avg RoR per year

print(str(round(avg_returns_a, 5) * 100) + ' %')


# Log Returns

# numpy = lib that provides tools for this computation
# it offers possibility of vectorized computation = ability to organize
# several kinds of data processing tasks as array expressions (vectors, matrices, etc)

PG.head()

PG['log_return'] = np.log(PG['Adj Close'] / PG['Adj Close'].shift(1))
print(PG['log_return'])

PG['log_return'].plot(figsize=(8, 5))
plt.show()

log_returns_d = PG['log_return'].mean() 
log_returns_a = PG['log_return'].mean() * 250

print(str(round(log_returns_a, 5) * 100) + ' %')
```

## What is a Portfolio of Securities and how to calculate its Rate of Return

Most investors own several stocks - investment portfolio. Every investor tries to select and add stocks that will optimize the overall rate of return of their portfolio. We want to calculate the historical rate of return of a portfolio because it will show us the rate of return that can be expected from this portfolio in the future. How should one do this?
> sum((avg return for a security * weight in portfolio) per security)



























