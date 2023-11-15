const chartconfig = {
    autosize: true,
    fullscreen: true,
    symbol: 'AAPL',
    interval: '30',
    container: "tradingchart",
    container_id: "tradingchart",
    datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),
    library_path: "/assets/charting_library/",
    locale: "en",
    disabled_features: ["header_compare", "header_settings", "header_undo_redo", "header_symbol_search", "save_chart_properties_to_local_storage"],
    favorites: {
        intervals: ['1', '5', '30', '60', '1D'],
        chartTypes: ["Candles", "Bars", "Line"]
    },
    enable_publishing: false,
    hide_side_toolbar: false,
    theme: 'dark',
    overrides: {
        "paneProperties.background": "#0c1835",
        "paneProperties.vertGridProperties.color": "#1e2136",
        "paneProperties.horzGridProperties.color": "#1e2136",
        "scalesProperties.textColor" : "#8c8fae",
        'mainSeriesProperties.candleStyle.upColor': '#0ec980',
        'mainSeriesProperties.candleStyle.downColor': '#e94158',
        'mainSeriesProperties.candleStyle.drawWick': true,
        'mainSeriesProperties.candleStyle.drawBorder': true,
        'mainSeriesProperties.candleStyle.borderColor': '#0ec980',
        'mainSeriesProperties.candleStyle.borderUpColor': '#0ec980',
        'mainSeriesProperties.candleStyle.borderDownColor': '#e94158',
        'mainSeriesProperties.candleStyle.wickUpColor': '#0ec980',
        'mainSeriesProperties.candleStyle.wickDownColor': '#e94158',
        'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.hollowCandleStyle.upColor': '#0ec980',
        'mainSeriesProperties.hollowCandleStyle.downColor': '#e94158',
        'mainSeriesProperties.hollowCandleStyle.drawWick': true,
        'mainSeriesProperties.hollowCandleStyle.drawBorder': true,
        'mainSeriesProperties.hollowCandleStyle.borderColor': '#0ec980',
        'mainSeriesProperties.hollowCandleStyle.borderUpColor': '#0ec980',
        'mainSeriesProperties.hollowCandleStyle.borderDownColor': '#e94158',
        'mainSeriesProperties.hollowCandleStyle.wickColor': '#0ec980',
        'mainSeriesProperties.haStyle.upColor': '#0ec980',
        'mainSeriesProperties.haStyle.downColor': '#e94158',
        'mainSeriesProperties.haStyle.drawWick': false,
        'mainSeriesProperties.haStyle.drawBorder': false,
        'mainSeriesProperties.haStyle.borderColor': '#e94158',
        'mainSeriesProperties.haStyle.borderUpColor': '#0ec980',
        'mainSeriesProperties.haStyle.borderDownColor': '#e94158',
        'mainSeriesProperties.haStyle.wickColor': '#e94158',
        'mainSeriesProperties.haStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.barStyle.upColor': '#0ec980',
        'mainSeriesProperties.barStyle.downColor': '#e94158',
        'mainSeriesProperties.areaStyle.color1': '#0ec980',
        'mainSeriesProperties.areaStyle.color2': '#e94158',
        'mainSeriesProperties.lineStyle.color': '#e94158',
        'symbolWatermarkProperties.color': 'rgba(0, 0, 0, 0.00)'
    },
    studies_overrides: {
        'volume.volume.color.0': '#e94158',
        'volume.volume.color.1': '#0ec980',
    },
    loading_screen: {
        backgroundColor: '#0c1835',
        foregroundColor: '#0c1835'
    },
    custom_css_url: 'css/style.css'
}

window['initOnReady'] = function initOnReady() {
    var widget = window.tvWidget = new TradingView.widget(chartconfig);
    widget.onChartReady(function () {
        widget.activeChart().createStudy('Moving Average', false, false, "", { "plot.color.0": '#2152fa' })
    });
};

setTimeout(() => {
    window['initOnReady']()
}, 500)
