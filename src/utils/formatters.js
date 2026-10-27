const integers = new Intl.NumberFormat('en-US');
export const formatNumber = value => integers.format(value);
export const formatPercent = value => `${value.toFixed(1)}%`;
