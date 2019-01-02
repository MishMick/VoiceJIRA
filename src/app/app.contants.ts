export const Content: any = {

    dashboardTitle: 'Pay and transfer',
    /* Page overlay spinner content */
    pageOverlayCopy: '' +
        '<strong>Please wait...</strong>' +
        '<br>' +
        'Loading content' + '',

    /* Loading spinner content */
    loadingSpinnerText: '' +
        '<strong>Please wait...</strong>' +
        '<br>' +
        'Loading content' + '',

    /* From account content */
    fromHeading: 'From',
    accountLabel: 'Account',
    selectDroptionPlaceholder: 'Choose an account',
    toSectionEnabledAccessibilityHelpText: 'To section is enabled, please press tab to continue.',

    /* To account content */
    toHeading: 'To',
    selectAnOptionLabel: 'Select an option',
    selectAnOptionYourAccountsHeader: 'Your accounts or someone you have paid before',
    selectAnOptionYourAccountsDescription: 'Transfer between your own accounts or send money to someone from your payee list.',
    selectAnOptionPayCompanyHeader: 'Pay a company you have paid before',
    selectAnOptionPayCompanyDescription: 'Send money to a company from your payee list.',
    selectAnOptionNewPaymentPersonHeader: 'New payment to a person',
    selectAnOptionNewPaymentPersonDescription: 'Send money to a someone for the first time. You will need their bank details for this',
    selectAnOptionNewPaymentCompanyHeader: 'New payment to a company',
    // tslint:disable-next-line:max-line-length
    selectAnOptionNewPaymentCompanyDescription: 'Send money to a company for the first time. We have a predefined list for you to choose from.',
    opensInAnOverlayText: 'opens in an overlay',
    opensInANewPageText: 'opens in a new page',

    companyLabel: 'Company',
    companyBtnText: 'Choose company',
    companyBtnAltText: 'Choose a company to pay',

    /* Details content */
    detailsHeading: 'Details',
    currencyCode: 'INR',
    amountLabel: 'Amount',
    amountPlaceholterText: 'Please enter an amount',
    recurringLabel: 'Recurring',
    recurringNoLabel: 'No',
    recurringYesLabel: 'Yes',
    checkboxLabel: 'Checkbox',
    dateLabel: 'Date',
    datePlaceholder: 'MM / DD / YYYY',
    dateButtonAltText: 'Open the calender to select a date',

    /* Modal content */
    modalHeading: 'Modal sample heading text',
    modalDescription: 'Modal sample description text.',
    modalCloseBtnAltText: 'close this message',
    modalCancelBtnText: 'Cancel',
    modalCancelBtnAltText: 'Cancel',
    modalContinueBtnText: 'Continue',
    modalContinueBtnAltText: 'Continue with your payment',

    /*Amount errors */
    invalidCharError: 'You have entered an invalid character',
    invalidAmtError: 'Please enter valid amount',
    maxLengthError: 'You have exceeded max value',
    negativeAmtError: 'Please enter amount greater than 0',
    blankAmtError: 'Please enter amount',

    /*Memo error*/
    invalidMemoMsg: 'Please enter valid memo'
};

export const errorContent: any = {
    '404': 'Page not found',
    'errorMessage': 'We are sorry, the service is temprarily unavailable. Please try again later.'
};

export const FREQUENCYLIST: any =
    [{ label: 'Please select', value: "0", isMonthEnd: "N" },
    { label: 'Daily', value: "8", isMonthEnd: "N" },
    { label: 'Weekly', value: "0", isMonthEnd: "N" },
    { label: 'Fortnightly', value: "1", isMonthEnd: "N" },
    { label: 'Monthly', value: "2", isMonthEnd: "N" },
    { label: 'Last day of month', value: "3", isMonthEnd: "Y" },
    { label: 'Bi-monthly', value: "4", isMonthEnd: "N" },
    { label: 'Quarterly', value: "5", isMonthEnd: "N" },
    { label: 'Half yearly', value: "6", isMonthEnd: "N" },
    { label: 'Yearly', value: "7", isMonthEnd: "N" }];
