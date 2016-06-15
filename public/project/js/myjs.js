$('.calendar-demo').calendar({

        startYear: new Date().getFullYear(),
        minDate: minDate,
        maxDate: maxDate,
        language: 'en', // or 'fr'
        allowOverlap: true,
        displayWeekNumber: false,
        displayDisabledDataSource: false,
        displayHeader: true,
        alwaysHalfDay: false,
        dataSource: [], // an array of data
        style: 'border',
        enableRangeSelection: flase,
        disabledDays: [],
        disabledWeekDays: [],
        hiddenWeekDays: [],
        roundRangeLimits: false,

// Callback Events
clickDay: null,
    daycontextMenu: null,
    selectRange: null,
    mouseOnDay: null,
    mouseOutDay: null,
    renderEnd: null

});
